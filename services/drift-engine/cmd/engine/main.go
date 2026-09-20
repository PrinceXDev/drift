// Command engine runs DRIFT: poll the Knowledge Base, diff builds, serve the API.
//
//	# no credentials needed — serves the committed seed diff
//	go run ./cmd/engine -fixtures
//
//	# live
//	export DRIFT_MCP_ENDPOINT=https://api.sanity.io/v1/context/organizations/ORG/mcp/NAME
//	export DRIFT_MCP_TOKEN=...   # ORGANISATION token, Context Viewer permission
//	go run ./cmd/engine -kb kb.northwind-policies
//
// The poll ticker lives here rather than in a Sanity Scheduled Function because
// deploying those via Blueprints is still alpha and not publicly available —
// see sanity/sanity.blueprint.ts. It is a better home anyway: this process
// already holds the MCP client and the previous snapshot, so an uneventful poll
// is one outline fetch and a hash comparison against memory.
package main

import (
	"context"
	"errors"
	"flag"
	"fmt"
	"log/slog"
	"net"
	"net/http"
	"os"
	"os/signal"
	"sort"
	"strings"
	"sync"
	"syscall"
	"time"

	"github.com/drift/drift-engine/internal/agent"
	"github.com/drift/drift-engine/internal/api"
	"github.com/drift/drift-engine/internal/authz"
	"github.com/drift/drift-engine/internal/contentlake"
	"github.com/drift/drift-engine/internal/dissent"
	"github.com/drift/drift-engine/internal/eventlog"
	"github.com/drift/drift-engine/internal/gate"
	"github.com/drift/drift-engine/internal/graph"
	"github.com/drift/drift-engine/internal/ledger"
	"github.com/drift/drift-engine/internal/mcp"
	"github.com/drift/drift-engine/internal/pipeline"
	"github.com/drift/drift-engine/internal/remediation"
	"github.com/drift/drift-engine/internal/seeddata"
	"github.com/drift/drift-engine/internal/surface"
	"github.com/drift/drift-engine/internal/telemetry"
	"github.com/drift/drift-engine/pkg/driftv1"
)

func main() {
	var (
		addr      = flag.String("addr", "127.0.0.1:8080", "listen address")
		pollEvery = flag.Duration("poll", 5*time.Minute, "how often to check for a rebuild")
		kbID      = flag.String("kb", "", "knowledge base id (live mode)")
		fixtures  = flag.Bool("fixtures", false, "serve the committed seed diff; no credentials needed")
		verbose   = flag.Bool("v", false, "debug logging")
	)
	flag.Parse()

	level := slog.LevelInfo
	if *verbose {
		level = slog.LevelDebug
	}
	log := slog.New(slog.NewTextHandler(os.Stderr, &slog.HandlerOptions{Level: level}))

	if err := run(*addr, *pollEvery, *kbID, *fixtures, log); err != nil {
		log.Error("fatal", "err", err)
		os.Exit(1)
	}
}

func run(addr string, pollEvery time.Duration, kbID string, useFixtures bool, log *slog.Logger) error {
	// Identity comes from a server-side registry of hashed tokens. There is no
	// "auth off" mode: an engine serving the drift ledger without identity is
	// serving a map of everything the organisation currently gets wrong in
	// public, to anyone who asks.
	actors, err := authz.LoadFromEnv()
	if err != nil {
		return err
	}
	tenant := os.Getenv("DRIFT_TENANT")

	if actors == nil {
		if !useFixtures {
			return errors.New(
				"live mode requires DRIFT_ACTORS (token:id:tenant:roles[:agent], semicolon-separated). " +
					"Run with -fixtures to use the demo actors against committed data")
		}
		// Fixture mode has no real credentials and touches no Sanity project, so
		// the demo actors grant access to committed demo data and nothing else.
		actors, tenant = authz.DemoRegistry(), "demo"
		log.Warn("fixture mode: using demo actors",
			"tokens", "demo-viewer | demo-editor | demo-steward | demo-agent",
			"tenant", tenant)
	}
	if tenant == "" {
		return errors.New("DRIFT_TENANT is required: every grant and every audit entry is scoped to it")
	}

	// The surface registry is the live dependency graph: the seven pages and the
	// Support Bot to begin with, plus anything that registers itself while the
	// process is running. Everything that walks a blast radius — the pipeline,
	// the gate, the lineage endpoint — walks it through this one object, so a
	// dependency an agent declares at 11:02 is in the next approval's
	// recomputed radius without anything being wired up twice.
	registry, err := seeddata.NewRegistry()
	if err != nil {
		return fmt.Errorf("seed the surface registry: %w", err)
	}

	var engine api.Engine
	if useFixtures {
		result, ferr := fixtureResult(registry)
		if ferr != nil {
			return ferr
		}
		engine = &api.StaticEngine{Result: result}
		log.Info("fixture mode: serving the committed seed diff, no Sanity calls will be made",
			"events", len(result.Events))
	} else {
		live, lerr := newLiveEngine(kbID, registry, log)
		if lerr != nil {
			return lerr
		}
		engine = live
		defer live.startPolling(pollEvery, log)()
	}

	// The append-only spine. Audit, idempotency, replay and time-travel are all
	// reads of this one structure — see internal/eventlog.
	auditLog := eventlog.New(eventlog.NewMemStore())

	// Remediation: the gated path from a drafted correction to a published one.
	publisher, err := newPublisher(useFixtures, log)
	if err != nil {
		return err
	}

	corpus := &seedCorpus{engine: engine}
	remediator := remediation.New(
		gate.New(registry),
		auditLog,
		corpus,
		publisher,
		log,
	)

	// Dissent reasons over the same build the drift ledger was computed from, so
	// an answer and a drift event can never disagree about current belief.
	asker := dissent.New(dissent.Corpus{
		Build:   engine.Latest().To,
		Sources: sourceIndex(),
	})

	// The agent announces itself as a published surface and records what it
	// answers from. This is the half of the blast radius that page-shaped
	// thinking misses: when the bot says "30 days" it is exactly as wrong as the
	// FAQ, and now exactly as visible.
	if err := asker.RegisterWith(registry, driftv1.Surface{
		ID:      seeddata.SurfSupportBot,
		Kind:    driftv1.SurfaceAgent,
		Title:   "Support Bot",
		Owner:   "support@northwind.example",
		Locator: "dissent://northwind/support",
	}, func(err error) {
		// Not fatal to the answer, but never silent: an unrecorded dependency is
		// a page the next blast radius will not name.
		log.Error("dissent could not record a dependency", "err", err)
	}); err != nil {
		return err
	}

	drafter, err := newDrafter(log)
	if err != nil {
		return err
	}

	server := api.New(engine, actors, tenant, log).
		WithAsker(asker).
		WithRemediator(remediator).
		WithAuditLog(auditLog).
		WithLineage(&seedLineage{engine: engine, registry: registry})

	if drafter != nil {
		server = server.WithDrafter(draftAdapter{drafter: drafter, engine: engine, corpus: corpus})
	}

	log.Info("authorization enabled", "tenant", tenant, "actors", actors.Size())

	srv := &http.Server{
		Addr:              addr,
		Handler:           server.Handler(),
		ReadHeaderTimeout: 10 * time.Second,
		// No WriteTimeout: /v1/drift/stream is deliberately long-lived, and a
		// write deadline would sever it mid-demo.
		IdleTimeout: 120 * time.Second,
	}

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	errCh := make(chan error, 1)
	go func() {
		log.Info("engine listening", "addr", addr, "tenant", tenant)
		if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			errCh <- err
		}
	}()

	select {
	case err := <-errCh:
		return err
	case <-ctx.Done():
		log.Info("shutting down")
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		return srv.Shutdown(shutdownCtx)
	}
}

// ---------------------------------------------------------------------------
// fixture mode
// ---------------------------------------------------------------------------

func fixtureResult(reader graph.AssertionReader) (pipeline.Result, error) {
	return pipeline.Run(
		context.Background(),
		seeddata.Build46(), seeddata.Build47(),
		reader,
		pipeline.DefaultConfig(),
	)
}

// ---------------------------------------------------------------------------
// live mode
// ---------------------------------------------------------------------------

type liveEngine struct {
	client *mcp.Client
	reader graph.AssertionReader
	kbID   string
	log    *slog.Logger

	mu       sync.RWMutex
	previous driftv1.BuildSnapshot
	latest   pipeline.Result
	buildNum int
}

func newLiveEngine(kbID string, reader graph.AssertionReader, log *slog.Logger) (*liveEngine, error) {
	endpoint := os.Getenv("DRIFT_MCP_ENDPOINT")
	token := os.Getenv("DRIFT_MCP_TOKEN")

	var missing []string
	if endpoint == "" {
		missing = append(missing, "DRIFT_MCP_ENDPOINT")
	}
	if token == "" {
		missing = append(missing, "DRIFT_MCP_TOKEN")
	}
	if kbID == "" {
		missing = append(missing, "-kb")
	}
	if len(missing) > 0 {
		return nil, fmt.Errorf(
			"live mode needs %s. DRIFT_MCP_TOKEN must be an ORGANISATION-level token with "+
				"Context Viewer permission — project tokens are rejected. "+
				"Run with -fixtures to start without credentials",
			strings.Join(missing, ", "))
	}

	return &liveEngine{
		client: mcp.New(endpoint, token),
		// Until a Sanity write client exists, blast radius resolves against the
		// in-process surface registry. Swapping this for a GROQ-backed reader is
		// the only change needed here once credentials land — the registry
		// already implements the same one-method interface.
		reader: reader,
		kbID:   kbID,
		log:    log,
	}, nil
}

// Poll captures the current build and diffs it against the previous one.
func (e *liveEngine) Poll() (pipeline.Result, bool, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()

	e.mu.RLock()
	previous, n := e.previous, e.buildNum
	e.mu.RUnlock()

	// CaptureAgainst rather than Capture: the previous snapshot is what carries
	// claim lineage forward. Capturing without it would re-stamp every fact as
	// first seen in this build, and the Control Room would report an
	// organisation that invented all its policies five minutes ago.
	current, err := ledger.CaptureAgainst(ctx, e.client, e.kbID, n+1, time.Now(), previous)
	if err != nil {
		return pipeline.Result{}, false, err
	}

	// Content addressing earns its keep here: most polls change nothing, and an
	// unchanged hash means we can skip the diff and the graph walk entirely.
	if ledger.Unchanged(previous, current) {
		e.log.Debug("no rebuild", "hash", current.OutlineHash)
		return e.Latest(), false, nil
	}

	// The very first capture has nothing to compare against. Record it as the
	// baseline rather than reporting every existing claim as newly added.
	if previous.ID == "" {
		e.mu.Lock()
		e.previous, e.buildNum = current, current.BuildNumber
		e.latest = pipeline.Result{From: current, To: current}
		e.mu.Unlock()
		e.log.Info("baseline captured", "build", current.BuildNumber, "claims", current.EntryCount())
		return e.Latest(), false, nil
	}

	result, err := pipeline.Run(ctx, previous, current, e.reader, pipeline.DefaultConfig())
	if err != nil {
		return pipeline.Result{}, false, err
	}

	e.mu.Lock()
	e.previous, e.buildNum, e.latest = current, current.BuildNumber, result
	e.mu.Unlock()

	s := result.Summarise()
	e.log.Info("drift detected",
		"build", current.BuildNumber, "events", s.TotalEvents,
		"affected", s.AffectedDependents, "review", s.NeedingReview)

	return result, true, nil
}

func (e *liveEngine) Latest() pipeline.Result {
	e.mu.RLock()
	defer e.mu.RUnlock()
	return e.latest
}

// Reconcile re-checks one page after a human edited it directly.
//
// Not implemented yet, and it returns an error saying so rather than a number.
//
// Confirming that a hand-edit actually fixed the text requires reading the live
// document and re-comparing it against the claim, which requires a Sanity write
// client this build does not have. The tempting alternative — count matching
// assertions and return that — would report a confident `0 reconciled` that the
// console would then display as fact.
//
// A knowledge-integrity tool is the last place to ship a plausible number that
// nothing actually checked. The Document Function turns this into a visible
// failed invocation in Sanity's logs, which is the correct amount of noise for
// a feature that does not exist.
func (e *liveEngine) Reconcile(pageID string) (int, int, error) {
	return 0, 0, fmt.Errorf(
		"reconcile is not implemented for %s: it needs a Sanity write client to re-read the "+
			"published document. Returning a count without checking would be a fabrication",
		pageID)
}

// startPolling runs the ticker and returns a stop function.
func (e *liveEngine) startPolling(every time.Duration, log *slog.Logger) func() {
	ctx, cancel := context.WithCancel(context.Background())
	go func() {
		// Poll once at startup so the console is not blank until the first tick.
		if _, _, err := e.Poll(); err != nil {
			log.Error("initial poll failed", "err", err)
		}

		ticker := time.NewTicker(every)
		defer ticker.Stop()
		for {
			select {
			case <-ctx.Done():
				return
			case <-ticker.C:
				if _, _, err := e.Poll(); err != nil {
					// Keep ticking. A Knowledge Base endpoint that is briefly
					// unavailable should not silently stop drift detection for
					// the rest of the process's life.
					log.Error("poll failed", "err", err)
				}
			}
		}
	}()
	log.Info("polling for rebuilds", "every", every)
	return cancel
}

var _ api.Engine = (*liveEngine)(nil)

func isLoopback(addr string) bool {
	host, _, err := net.SplitHostPort(addr)
	if err != nil {
		return false
	}
	if host == "" || host == "localhost" {
		return true
	}
	ip := net.ParseIP(host)
	return ip != nil && ip.IsLoopback()
}

// sourceIndex gives the Dissent agent the source titles and authorities it needs
// to explain a disagreement. Reads from the seed until a Sanity read client
// exists; the shape is identical either way.
func sourceIndex() map[string]driftv1.Source {
	out := map[string]driftv1.Source{}
	for _, s := range seeddata.Sources() {
		out[s.ID] = s
	}
	return out
}

// seedCorpus supplies current belief to the remediation service.
//
// Reads the build from whichever engine is running — fixture or live — and
// resolves assertions from the seed graph until a Sanity read client exists.
// Swapping this one type is the whole change when credentials land.
type seedCorpus struct {
	engine api.Engine
}

func (c *seedCorpus) CurrentBuild(context.Context) (driftv1.BuildSnapshot, error) {
	build := c.engine.Latest().To
	if build.ID == "" {
		return driftv1.BuildSnapshot{}, errors.New(
			"no build captured yet: the engine has not completed its first poll")
	}
	return build, nil
}

func (c *seedCorpus) Assertion(_ context.Context, id string) (driftv1.Assertion, bool, error) {
	// Dependencies(), not Assertions(): an operator can open a surface
	// dependency in the queue, and resolving it to "not found" would read as a
	// bug rather than as the gate's honest answer that a bot has no paragraph
	// to patch. Let it resolve, and let CheckCorrectableSurface explain.
	for _, a := range seeddata.Dependencies() {
		if a.ID == id {
			return a, true, nil
		}
	}
	return driftv1.Assertion{}, false, nil
}

// ---------------------------------------------------------------------------
// Publisher wiring
// ---------------------------------------------------------------------------

// lakeAdapter bridges the Content Lake client to the remediation contract.
//
// The adapter exists so `internal/remediation` imports nothing beneath it. It
// declares the shape it needs; the infrastructure satisfies it here, at the
// composition root, rather than the business logic reaching downwards.
type lakeAdapter struct {
	lake *contentlake.Publisher
}

func (a lakeAdapter) Publish(ctx context.Context, req remediation.PublishRequest) error {
	err := a.lake.Publish(ctx, contentlake.Request{
		AssertionID:    req.AssertionID,
		PageID:         req.PageID,
		BlockKey:       req.BlockKey,
		Text:           req.Text,
		BuildID:        req.BuildID,
		IdempotencyKey: req.IdempotencyKey,
	})
	// A duplicate transaction means the write already landed. That is the
	// success case for a retry, so it is reported as success — the caller's
	// event log already records the original publication.
	if errors.Is(err, contentlake.ErrAlreadyApplied) {
		return nil
	}
	return err
}

// newPublisher returns the Content Lake writer, or nil in fixture mode.
//
// Returning nil is deliberate rather than substituting a no-op that logs
// "published!". `remediation.Approve` reports `ErrNoPublisher` when it is
// absent, so the audit trail records an approval and no publication — which is
// exactly what happened. A fake publisher would put a completed publication in
// the trail for content that was never touched, and an audit trail that lies is
// worse than no audit trail.
func newPublisher(useFixtures bool, log *slog.Logger) (remediation.Publisher, error) {
	projectID := os.Getenv("SANITY_PROJECT_ID")
	dataset := os.Getenv("SANITY_DATASET")
	token := os.Getenv("SANITY_WRITE_TOKEN")

	if projectID == "" && dataset == "" && token == "" {
		if useFixtures {
			log.Warn("no Content Lake credentials: approvals will be gated and audited, " +
				"but no content will be written. Set SANITY_PROJECT_ID, SANITY_DATASET and " +
				"SANITY_WRITE_TOKEN to publish for real")
			return nil, nil
		}
		return nil, errors.New(
			"live mode needs SANITY_PROJECT_ID, SANITY_DATASET and SANITY_WRITE_TOKEN " +
				"(a PROJECT token with write access — not the organisation token used for " +
				"Context MCP). Run with -fixtures to start without them")
	}

	lake, err := contentlake.New(contentlake.Config{
		ProjectID: projectID,
		Dataset:   dataset,
		Token:     token,
		Logger:    log,
	})
	if err != nil {
		return nil, err
	}

	log.Info("content lake publisher ready",
		"project", projectID, "dataset", dataset,
		"token", telemetry.RedactToken(token))

	return lakeAdapter{lake: lake}, nil
}

// ---------------------------------------------------------------------------
// Lineage
// ---------------------------------------------------------------------------

// seedLineage assembles claim provenance from the engine's current result and
// the live surface registry.
//
// Everything it returns is derived, never stored: the claim and its lineage
// stamps come from the build the engine last captured, the dependents come from
// the registry as it stands right now, and the drift comes from the same result
// the Drift Feed is rendering. A lineage view that read from its own table
// would be one more thing that can disagree with the ledger, in a product whose
// entire argument is that nothing should.
type seedLineage struct {
	engine   api.Engine
	registry *surface.Registry
}

func (l *seedLineage) Lineage(_ context.Context, claimID string) (driftv1.ClaimLineage, bool, error) {
	result := l.engine.Latest()

	claim, found := findClaim(result, claimID)
	if !found {
		return driftv1.ClaimLineage{}, false, nil
	}

	lineage := driftv1.ClaimLineage{
		Claim:      claim,
		Sources:    sourcesFor(claim),
		Dependents: l.registry.DependentsOf(claimID),
	}

	// Resolve the three build stamps to the builds themselves, so a reader gets
	// a date rather than an opaque "build.46". A stamp naming a build this
	// engine no longer holds resolves to nothing rather than to a guess — the
	// panel says "build 31, snapshot not retained", which is true, instead of
	// inventing a timestamp.
	lineage.FirstSeen = buildByID(result, claim.FirstSeenBuild)
	lineage.LastVerified = buildByID(result, claim.LastVerifiedBuild)
	lineage.LastChanged = buildByID(result, claim.LastChangedBuild)

	for i := range result.Events {
		if result.Events[i].ClaimID == claimID {
			lineage.Drift = &result.Events[i]
			break
		}
	}

	return lineage, true, nil
}

func (l *seedLineage) Surfaces(context.Context) ([]driftv1.Surface, error) {
	return l.registry.Surfaces(), nil
}

// findClaim looks in the later build first, then the earlier one.
//
// The order matters: a claim retired between the two builds is absent from
// current belief but is exactly the claim somebody is most likely to be asking
// about, because a page is still asserting it. Falling back to the earlier
// build is what lets the lineage panel explain a retired fact rather than
// returning 404 for the most interesting case in the dataset.
func findClaim(result pipeline.Result, claimID string) (driftv1.Claim, bool) {
	for _, b := range []driftv1.BuildSnapshot{result.To, result.From} {
		for _, c := range b.Claims {
			if c.ID == claimID {
				return c, true
			}
		}
	}
	return driftv1.Claim{}, false
}

func buildByID(result pipeline.Result, id string) *driftv1.BuildSnapshot {
	if id == "" {
		return nil
	}
	for _, b := range []driftv1.BuildSnapshot{result.To, result.From} {
		if b.ID == id {
			// Header only. A lineage reader wants a build number, a timestamp
			// and a content address; shipping every claim in the build as well
			// would send the entire corpus three times over for one panel, and
			// invite a client to render belief from a snapshot it only asked
			// for the date of.
			header := b
			header.Claims, header.Conflicts = nil, nil
			return &header
		}
	}
	return nil
}

func sourcesFor(claim driftv1.Claim) []driftv1.Source {
	index := sourceIndex()
	out := make([]driftv1.Source, 0, len(claim.Citations))
	for _, id := range claim.Citations {
		if src, ok := index[id]; ok {
			out = append(out, src)
		}
	}
	// Highest authority first: in a disagreement that is the order that decides
	// it, so it is the order a reader should see the evidence in.
	sort.SliceStable(out, func(i, j int) bool { return out[i].Authority > out[j].Authority })
	return out
}

var _ api.LineageReader = (*seedLineage)(nil)

// ---------------------------------------------------------------------------
// Agent Actions
// ---------------------------------------------------------------------------

// draftAdapter resolves an assertion and its claim, then asks Sanity to rewrite
// the sentence.
//
// The adapter exists so `internal/api` declares only the shape it needs — an
// assertion id in, a proposal out — and never learns what a schema id is. It
// also puts the *lookup* on the engine side rather than trusting a client to
// say which claim a correction is about: a caller that could nominate both the
// assertion and the claim could ask the model to rewrite a returns sentence
// using the warranty claim, and the result would look entirely plausible.
type draftAdapter struct {
	drafter *agent.Drafter
	engine  api.Engine
	corpus  *seedCorpus
}

func (a draftAdapter) DraftCorrection(ctx context.Context, assertionID string) (any, error) {
	assertion, found, err := a.corpus.Assertion(ctx, assertionID)
	if err != nil {
		return nil, err
	}
	if !found {
		return nil, fmt.Errorf("%w: %s", remediation.ErrUnknownAssertion, assertionID)
	}
	if !assertion.OnPage() {
		// The same rule the gate enforces, applied earlier so no model time is
		// spent drafting words that could never be published.
		return nil, fmt.Errorf(
			"%s is not editable page content, so there is nothing to draft against",
			assertion.DependentID())
	}

	result := a.engine.Latest()

	var event driftv1.DriftEvent
	for _, e := range result.Events {
		if e.ClaimID == assertion.ClaimID {
			event = e
			break
		}
	}
	if event.ClaimID == "" {
		return nil, fmt.Errorf("no drift recorded for claim %s: nothing to correct toward",
			assertion.ClaimID)
	}

	var claim driftv1.Claim
	for _, c := range result.To.Claims {
		if c.ID == assertion.ClaimID {
			claim = c
			break
		}
	}

	return a.drafter.DraftCorrection(ctx, assertion, claim, event)
}

// newDrafter returns the Agent Actions drafter, or nil when it is not configured.
//
// Nil rather than a deterministic stand-in: the console already has a labelled
// substitute for demo purposes, and an engine that silently produced one would
// make "drafted by the model" untrue in an audit entry that says so.
func newDrafter(log *slog.Logger) (*agent.Drafter, error) {
	projectID := os.Getenv("SANITY_PROJECT_ID")
	dataset := os.Getenv("SANITY_DATASET")
	token := os.Getenv("SANITY_WRITE_TOKEN")
	schemaID := os.Getenv("SANITY_SCHEMA_ID")

	if projectID == "" && dataset == "" && token == "" && schemaID == "" {
		log.Warn("Agent Actions not configured: corrections must be written by hand. " +
			"Set SANITY_PROJECT_ID, SANITY_DATASET, SANITY_WRITE_TOKEN and SANITY_SCHEMA_ID " +
			"(from `sanity schema deploy`) to draft with the model")
		return nil, nil
	}

	drafter, err := agent.New(agent.Config{
		ProjectID: projectID, Dataset: dataset, SchemaID: schemaID, Token: token,
	})
	if err != nil {
		return nil, err
	}

	log.Info("agent actions ready",
		"project", projectID, "dataset", dataset, "schema", schemaID,
		"token", telemetry.RedactToken(token))
	return drafter, nil
}
