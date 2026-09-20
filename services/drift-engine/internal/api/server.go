// Package api serves the engine's HTTP surface.
//
// # Authorization is structural, not conventional
//
// Every route is registered through `guard`, which resolves the bearer token to
// an Actor, authorizes a named permission, and hands the handler an
// *authz.Grant. A handler's signature therefore requires a grant it cannot
// manufacture, so a route that skipped authorization does not compile.
//
// That is why the middleware returns a grant rather than a boolean. "Remember
// to check permissions in each handler" is a convention, and conventions are
// broken by tired people on a Friday afternoon.
//
// # What the edge is responsible for
//
//   - minting a correlation ID, putting it on the context and echoing it back
//   - resolving identity, and never logging the credential
//   - mapping authorization failures to statuses that do not leak policy
//   - bounding request bodies
//
// # Routes
//
//	GET  /healthz                    open; liveness only, discloses no content
//	GET  /v1/me                      authenticated; who am I, what may I do
//	GET  /v1/drift                   drift:read
//	GET  /v1/drift/stream            drift:read          (SSE)
//	GET  /v1/claims/{id}/lineage     drift:read
//	GET  /v1/surfaces                drift:read
//	POST /v1/dissent                 drift:read
//	POST /v1/builds/poll             build:poll
//	POST /v1/assertions/reconcile    build:poll
//	POST /v1/corrections/draft       correction:draft
//	POST /v1/corrections/preview     simulation:run
//	POST /v1/corrections/approve     correction:publish  (humans only)
//	POST /v1/corrections/reject      correction:publish  (humans only)
//	GET  /v1/audit                   audit:read
//	GET  /v1/audit/verify            audit:read
//
// SSE rather than WebSockets for the stream: it is one-directional, survives
// proxies that mangle upgrades, and reconnects on its own.
package api

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/drift/drift-engine/internal/authz"
	"github.com/drift/drift-engine/internal/dissent"
	"github.com/drift/drift-engine/internal/eventlog"
	"github.com/drift/drift-engine/internal/gate"
	"github.com/drift/drift-engine/internal/pipeline"
	"github.com/drift/drift-engine/internal/remediation"
	"github.com/drift/drift-engine/internal/telemetry"
	"github.com/drift/drift-engine/pkg/driftv1"
)

// maxBody bounds every request. Generous for JSON, small enough that a
// malformed or hostile client cannot exhaust memory.
const maxBody = 1 << 20

// Engine is what the API needs from the pipeline.
type Engine interface {
	Poll() (result pipeline.Result, changed bool, err error)
	Latest() pipeline.Result
	Reconcile(pageID string) (reconciled, stillStale int, err error)
}

// Asker is the Dissent agent. Optional: an engine without a corpus still serves
// drift, it just cannot take questions.
type Asker interface {
	Ask(question string) dissent.Verdict
}

// LineageReader assembles the provenance of one claim: where it came from,
// when it was created, verified and last changed, and every published surface
// that depends on it.
//
// Optional, like the other capabilities: an engine with no corpus can still
// serve drift, it just cannot answer where a fact came from.
type LineageReader interface {
	Lineage(ctx context.Context, claimID string) (driftv1.ClaimLineage, bool, error)
	// Surfaces lists every registered dependent, so an operator can see what is
	// publishing before picking a claim.
	Surfaces(ctx context.Context) ([]driftv1.Surface, error)
}

// Drafter proposes the words of a correction.
//
// This is the one place a language model is allowed near a published page, and
// it is deliberately the narrowest interface in the file: given an assertion, a
// claim and the drift between them, return proposed text. It cannot publish,
// cannot choose what to correct, and cannot reach anything outside the block
// the assertion declares — see internal/agent for the three independent
// guarantees behind that.
type Drafter interface {
	DraftCorrection(ctx context.Context, assertionID string) (any, error)
}

// Remediator performs gated corrections. Optional.
type Remediator interface {
	Preview(ctx context.Context, grant *authz.Grant, draft remediation.Draft) (gate.Decision, error)
	Approve(ctx context.Context, grant *authz.Grant, draft remediation.Draft) (remediation.Outcome, error)
	Reject(ctx context.Context, grant *authz.Grant, draft remediation.Draft, reason string) (remediation.Outcome, error)
}

// Server is the engine's HTTP API.
type Server struct {
	engine     Engine
	actors     *authz.Registry
	tenant     string
	log        *slog.Logger
	asker      Asker
	remediator Remediator
	auditLog   *eventlog.Log
	lineage    LineageReader
	drafter    Drafter

	mu          sync.RWMutex
	subscribers map[chan pipeline.Result]struct{}
}

// New returns a Server.
//
// The registry is required. There is no "auth disabled" mode: the drift ledger
// is a map of everything an organisation currently gets wrong in public, and
// serving it without identity is not a thing that should be one flag away.
func New(engine Engine, actors *authz.Registry, tenant string, log *slog.Logger) *Server {
	return &Server{
		engine:      engine,
		actors:      actors,
		tenant:      tenant,
		log:         log,
		subscribers: map[chan pipeline.Result]struct{}{},
	}
}

// WithAsker enables the Dissent endpoint.
func (s *Server) WithAsker(a Asker) *Server { s.asker = a; return s }

// WithRemediator enables the correction endpoints.
func (s *Server) WithRemediator(r Remediator) *Server { s.remediator = r; return s }

// WithAuditLog enables the audit endpoints.
func (s *Server) WithAuditLog(l *eventlog.Log) *Server { s.auditLog = l; return s }

// WithLineage enables the claim-provenance endpoints.
func (s *Server) WithLineage(l LineageReader) *Server { s.lineage = l; return s }

// WithDrafter enables Agent Actions drafting.
func (s *Server) WithDrafter(d Drafter) *Server { s.drafter = d; return s }

// Handler returns the routed handler.
func (s *Server) Handler() http.Handler {
	mux := http.NewServeMux()

	// Open: reports that the process is alive and nothing about the content.
	mux.HandleFunc("GET /healthz", s.handleHealth)

	mux.HandleFunc("GET /v1/me", s.identified(s.handleMe))

	mux.HandleFunc("GET /v1/drift", s.guard(authz.PermReadDrift, s.handleDrift))
	mux.HandleFunc("GET /v1/drift/stream", s.guard(authz.PermReadDrift, s.handleStream))
	mux.HandleFunc("POST /v1/dissent", s.guard(authz.PermReadDrift, s.handleDissent))

	// Lineage reads under drift:read rather than audit:read. It discloses the
	// same dependency graph the drift feed already shows — which pages depend on
	// which fact — and nothing about who did what, which is the audit log's job
	// and stays behind the audit permission.
	mux.HandleFunc("GET /v1/claims/{id}/lineage", s.guard(authz.PermReadDrift, s.handleLineage))
	mux.HandleFunc("GET /v1/surfaces", s.guard(authz.PermReadDrift, s.handleSurfaces))

	mux.HandleFunc("POST /v1/builds/poll", s.guard(authz.PermPollBuild, s.handlePoll))
	mux.HandleFunc("POST /v1/assertions/reconcile", s.guard(authz.PermPollBuild, s.handleReconcile))

	// Drafting is the agent's permission, and only the agent's kind of work: an
	// actor holding correction:draft may propose words and nothing else. The
	// route that publishes them is a different permission no agent can hold.
	mux.HandleFunc("POST /v1/corrections/draft", s.guard(authz.PermDraftCorrection, s.handleDraft))
	mux.HandleFunc("POST /v1/corrections/preview", s.guard(authz.PermSimulate, s.handlePreview))
	mux.HandleFunc("POST /v1/corrections/approve", s.guard(authz.PermApprovePublish, s.handleApprove))
	mux.HandleFunc("POST /v1/corrections/reject", s.guard(authz.PermApprovePublish, s.handleReject))

	mux.HandleFunc("GET /v1/audit", s.guard(authz.PermReadAudit, s.handleAudit))
	mux.HandleFunc("GET /v1/audit/verify", s.guard(authz.PermReadAudit, s.handleAuditVerify))

	return s.withCorrelation(mux)
}

// ---------------------------------------------------------------------------
// middleware
// ---------------------------------------------------------------------------

// withCorrelation mints an ID for every request and echoes it, so a client can
// quote it in a bug report and an operator can reconstruct the causal chain.
func (s *Server) withCorrelation(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := telemetry.CorrelationID(r.Header.Get("X-Correlation-ID"))
		if id == "" {
			id = telemetry.NewCorrelationID()
		}
		ctx := telemetry.WithCorrelation(r.Context(), id)
		w.Header().Set("X-Correlation-ID", string(id))

		started := time.Now()
		next.ServeHTTP(w, r.WithContext(ctx))

		// Streams are long-lived and health checks are noise.
		if r.URL.Path != "/v1/drift/stream" && r.URL.Path != "/healthz" {
			telemetry.Logger(ctx, s.log).Debug("request",
				slog.String("method", r.Method),
				slog.String("path", r.URL.Path),
				slog.Duration("dur", time.Since(started).Round(time.Millisecond)))
		}
	})
}

type grantedHandler func(w http.ResponseWriter, r *http.Request, grant *authz.Grant)
type identifiedHandler func(w http.ResponseWriter, r *http.Request, actor authz.Actor)

func (s *Server) resolve(r *http.Request) (authz.Actor, error) {
	header := r.Header.Get("Authorization")
	if !strings.HasPrefix(header, "Bearer ") {
		return authz.Actor{}, authz.ErrUnknownToken
	}
	return s.actors.Resolve(strings.TrimPrefix(header, "Bearer "))
}

// identified requires authentication but no particular permission.
func (s *Server) identified(next identifiedHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		actor, err := s.resolve(r)
		if err != nil {
			s.denyAuth(w, r)
			return
		}
		next(w, r.WithContext(telemetry.WithActor(r.Context(), actor.ID)), actor)
	}
}

// guard authenticates, authorizes, and hands the handler its proof.
func (s *Server) guard(perm authz.Permission, next grantedHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		actor, err := s.resolve(r)
		if err != nil {
			s.denyAuth(w, r)
			return
		}

		r = r.WithContext(telemetry.WithActor(r.Context(), actor.ID))

		grant, err := authz.Authorize(actor, perm, s.tenant, r.URL.Path)
		if err != nil {
			s.denyPermission(w, r, actor, perm, err)
			return
		}

		next(w, r, grant)
	}
}

// denyAuth handles an unrecognised credential.
//
// The response says nothing about why. The log records the credential's shape
// and fingerprint, never its value — an auth-failure path is exactly where
// somebody reaches for "let me just log what was sent".
func (s *Server) denyAuth(w http.ResponseWriter, r *http.Request) {
	presented := strings.TrimPrefix(r.Header.Get("Authorization"), "Bearer ")

	telemetry.Logger(r.Context(), s.log).Warn("authentication failed",
		slog.String("path", r.URL.Path),
		slog.String("credential", telemetry.RedactToken(presented)))

	w.Header().Set("WWW-Authenticate", `Bearer realm="drift"`)
	writeErr(w, http.StatusUnauthorized, "authentication required")
}

// denyPermission handles an authenticated actor who may not do this.
//
// A cross-tenant attempt returns 404, not 403. Telling an outsider that a
// resource exists but belongs to someone else is itself a disclosure; as far as
// they are concerned it is simply not there.
func (s *Server) denyPermission(w http.ResponseWriter, r *http.Request, actor authz.Actor, perm authz.Permission, err error) {
	log := telemetry.Logger(r.Context(), s.log)

	switch {
	case errors.Is(err, authz.ErrWrongTenant):
		log.Warn("cross-tenant access refused",
			slog.String("path", r.URL.Path),
			slog.String("actor_tenant", actor.Tenant),
			slog.String("server_tenant", s.tenant))
		writeErr(w, http.StatusNotFound, "not found")

	case errors.Is(err, authz.ErrAgentForbidden):
		log.Warn("agent attempted a human-only action",
			slog.String("path", r.URL.Path),
			slog.String("permission", string(perm)))
		writeErr(w, http.StatusForbidden,
			"this action requires a human approver; agents may propose but never dispose")

	default:
		log.Warn("permission denied",
			slog.String("path", r.URL.Path),
			slog.String("permission", string(perm)),
			slog.String("roles", actor.RoleNames()))
		writeErr(w, http.StatusForbidden,
			fmt.Sprintf("your roles (%s) do not include %s", actor.RoleNames(), perm))
	}
}

// ---------------------------------------------------------------------------
// handlers
// ---------------------------------------------------------------------------

// handleMe lets the UI show a person their own capabilities, rather than
// letting them discover the boundaries by being refused.
func (s *Server) handleMe(w http.ResponseWriter, _ *http.Request, actor authz.Actor) {
	perms := map[string]bool{}
	for _, p := range authz.AllPermissions() {
		perms[string(p)] = actor.Has(p)
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"id":          actor.ID,
		"email":       actor.Email,
		"roles":       strings.Split(actor.RoleNames(), ","),
		"tenant":      actor.Tenant,
		"isAgent":     actor.IsAgent,
		"permissions": perms,
	})
}

func (s *Server) handleHealth(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

type pollResponse struct {
	Changed bool `json:"changed"`
	Build   int  `json:"build,omitempty"`
	Events  int  `json:"events,omitempty"`
}

func (s *Server) handlePoll(w http.ResponseWriter, r *http.Request, _ *authz.Grant) {
	result, changed, err := s.engine.Poll()
	if err != nil {
		// 502 rather than 500: the failure is almost always the Knowledge Base
		// endpoint, not us, and the distinction matters at 2am.
		telemetry.Logger(r.Context(), s.log).Error("poll failed", slog.String("err", err.Error()))
		writeErr(w, http.StatusBadGateway, err.Error())
		return
	}
	if changed {
		s.broadcast(result)
	}
	writeJSON(w, http.StatusOK, pollResponse{
		Changed: changed, Build: result.To.BuildNumber, Events: len(result.Events),
	})
}

func (s *Server) handleReconcile(w http.ResponseWriter, r *http.Request, _ *authz.Grant) {
	var req struct {
		PageID  string `json:"pageId"`
		Trigger string `json:"trigger"`
	}
	if !decode(w, r, &req) {
		return
	}
	if req.PageID == "" {
		writeErr(w, http.StatusBadRequest, "pageId is required")
		return
	}

	reconciled, stale, err := s.engine.Reconcile(req.PageID)
	if err != nil {
		telemetry.Logger(r.Context(), s.log).Error("reconcile failed", slog.String("err", err.Error()))
		writeErr(w, http.StatusBadGateway, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]int{"reconciled": reconciled, "stillStale": stale})
}

func (s *Server) handleDrift(w http.ResponseWriter, _ *http.Request, _ *authz.Grant) {
	result := s.engine.Latest()
	writeJSON(w, http.StatusOK, map[string]any{
		"events":  result.Events,
		"summary": result.Summarise(),
		"from":    result.From.ID,
		"to":      result.To.ID,
	})
}

func (s *Server) handleDissent(w http.ResponseWriter, r *http.Request, _ *authz.Grant) {
	if s.asker == nil {
		writeErr(w, http.StatusServiceUnavailable,
			"no corpus loaded: the Dissent agent needs a Knowledge Base build to reason over")
		return
	}
	var req struct {
		Question string `json:"question"`
	}
	if !decode(w, r, &req) {
		return
	}
	if strings.TrimSpace(req.Question) == "" {
		writeErr(w, http.StatusBadRequest, "question is required")
		return
	}

	verdict := s.asker.Ask(req.Question)
	telemetry.Logger(r.Context(), s.log).Info("dissent",
		slog.Bool("answered", verdict.Answered()),
		slog.String("question", telemetry.Excerpt(req.Question)))
	writeJSON(w, http.StatusOK, verdict)
}

// ---------------------------------------------------------------------------
// lineage
// ---------------------------------------------------------------------------

// handleLineage answers "where did this statement come from, and what still
// depends on it?" in one request.
//
// One request on purpose. The six branches — sources, created, verified,
// published, changed, and the claim itself — are assembled server-side from the
// same build and the same registry, so they cannot disagree with each other. A
// client that fetched them separately would eventually render a claim's
// provenance from two different builds and have no way of knowing.
func (s *Server) handleLineage(w http.ResponseWriter, r *http.Request, _ *authz.Grant) {
	if s.lineage == nil {
		writeErr(w, http.StatusServiceUnavailable,
			"lineage is not configured: it needs a corpus and a surface registry")
		return
	}

	claimID := r.PathValue("id")
	if claimID == "" {
		writeErr(w, http.StatusBadRequest, "a claim id is required")
		return
	}

	lineage, found, err := s.lineage.Lineage(r.Context(), claimID)
	if err != nil {
		telemetry.Logger(r.Context(), s.log).Error("lineage failed",
			slog.String("claim", claimID), slog.String("err", err.Error()))
		writeErr(w, http.StatusBadGateway, err.Error())
		return
	}
	if !found {
		writeErr(w, http.StatusNotFound, "no such claim in the current or previous build")
		return
	}
	writeJSON(w, http.StatusOK, lineage)
}

// handleSurfaces lists every registered dependent.
func (s *Server) handleSurfaces(w http.ResponseWriter, r *http.Request, _ *authz.Grant) {
	if s.lineage == nil {
		writeErr(w, http.StatusServiceUnavailable, "the surface registry is not configured")
		return
	}
	surfaces, err := s.lineage.Surfaces(r.Context())
	if err != nil {
		writeErr(w, http.StatusBadGateway, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"surfaces": surfaces, "count": len(surfaces)})
}

// ---------------------------------------------------------------------------
// corrections
// ---------------------------------------------------------------------------

// handleDraft asks Sanity's Transform action to rewrite one stale sentence.
//
// The response is a *proposal*. `noWrite: true` means Sanity returns the
// rewritten document without mutating anything, so nothing about calling this
// changes published content — which is what makes it safe to expose to an
// unattended principal.
func (s *Server) handleDraft(w http.ResponseWriter, r *http.Request, _ *authz.Grant) {
	if s.drafter == nil {
		writeErr(w, http.StatusServiceUnavailable,
			"drafting is not configured: Agent Actions need SANITY_PROJECT_ID, SANITY_DATASET, "+
				"SANITY_WRITE_TOKEN and SANITY_SCHEMA_ID (run `sanity schema deploy`)")
		return
	}

	var req struct {
		AssertionID string `json:"assertionId"`
	}
	if !decode(w, r, &req) {
		return
	}
	if strings.TrimSpace(req.AssertionID) == "" {
		writeErr(w, http.StatusBadRequest, "assertionId is required")
		return
	}

	draft, err := s.drafter.DraftCorrection(r.Context(), req.AssertionID)
	if err != nil {
		telemetry.Logger(r.Context(), s.log).Error("draft failed",
			slog.String("assertion", req.AssertionID), slog.String("err", err.Error()))
		// 502: drafting failures are almost always the Agent Actions endpoint,
		// not us, and that distinction is what an operator needs at 2am.
		writeErr(w, http.StatusBadGateway, err.Error())
		return
	}

	telemetry.Logger(r.Context(), s.log).Info("correction drafted",
		slog.String("assertion", req.AssertionID))
	writeJSON(w, http.StatusOK, draft)
}

func (s *Server) handlePreview(w http.ResponseWriter, r *http.Request, grant *authz.Grant) {
	if s.remediator == nil {
		writeErr(w, http.StatusServiceUnavailable, "remediation is not configured")
		return
	}
	var draft remediation.Draft
	if !decode(w, r, &draft) {
		return
	}

	decision, err := s.remediator.Preview(r.Context(), grant, draft)
	if err != nil {
		s.remediationError(w, r, err)
		return
	}
	writeJSON(w, http.StatusOK, decision)
}

func (s *Server) handleApprove(w http.ResponseWriter, r *http.Request, grant *authz.Grant) {
	if s.remediator == nil {
		writeErr(w, http.StatusServiceUnavailable, "remediation is not configured")
		return
	}
	var draft remediation.Draft
	if !decode(w, r, &draft) {
		return
	}

	outcome, err := s.remediator.Approve(r.Context(), grant, draft)
	if err != nil {
		s.remediationError(w, r, err)
		return
	}

	// A gate refusal is a successful request with an unsuccessful outcome.
	// 422 rather than 403: the caller was allowed to ask, the content was not
	// ready. A client deciding whether to retry needs that distinction.
	status := http.StatusOK
	if !outcome.Applied {
		status = http.StatusUnprocessableEntity
	}
	writeJSON(w, status, outcome)
}

func (s *Server) handleReject(w http.ResponseWriter, r *http.Request, grant *authz.Grant) {
	if s.remediator == nil {
		writeErr(w, http.StatusServiceUnavailable, "remediation is not configured")
		return
	}
	var req struct {
		remediation.Draft
		Reason string `json:"reason"`
	}
	if !decode(w, r, &req) {
		return
	}
	if strings.TrimSpace(req.Reason) == "" {
		writeErr(w, http.StatusBadRequest,
			"a reason is required: a rejection without one teaches the drafter nothing")
		return
	}

	outcome, err := s.remediator.Reject(r.Context(), grant, req.Draft, req.Reason)
	if err != nil {
		s.remediationError(w, r, err)
		return
	}
	writeJSON(w, http.StatusOK, outcome)
}

func (s *Server) remediationError(w http.ResponseWriter, r *http.Request, err error) {
	log := telemetry.Logger(r.Context(), s.log)
	switch {
	case errors.Is(err, authz.ErrDenied), errors.Is(err, authz.ErrAgentForbidden):
		log.Warn("remediation refused", slog.String("err", err.Error()))
		writeErr(w, http.StatusForbidden, err.Error())
	case errors.Is(err, remediation.ErrUnknownAssertion):
		writeErr(w, http.StatusNotFound, err.Error())
	default:
		log.Error("remediation failed", slog.String("err", err.Error()))
		writeErr(w, http.StatusBadGateway, err.Error())
	}
}

// ---------------------------------------------------------------------------
// audit
// ---------------------------------------------------------------------------

func (s *Server) handleAudit(w http.ResponseWriter, r *http.Request, grant *authz.Grant) {
	if s.auditLog == nil {
		writeErr(w, http.StatusServiceUnavailable, "audit log is not configured")
		return
	}

	// Two filters, two different questions. `subject` is one object's timeline —
	// this assertion, this incident. `claimId` is one *fact's* timeline, across
	// every assertion that ever expressed it, which is the query the Claim
	// Lineage panel is built on and which used to require a join the schema did
	// not support.
	q := eventlog.Query{
		Subject: r.URL.Query().Get("subject"),
		ClaimID: r.URL.Query().Get("claimId"),
		Limit:   intParam(r, "limit", 100),
	}
	// Time travel: bound the fold. Same mechanism as replay.
	if upTo := intParam(r, "upToSeq", 0); upTo > 0 {
		q.UpToSeq = int64(upTo)
	}

	events, err := s.auditLog.Read(r.Context(), grant, q)
	if err != nil {
		writeErr(w, http.StatusBadGateway, err.Error())
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"events": events, "count": len(events)})
}

// handleAuditVerify walks the hash chain and reports whether history is intact.
//
// An endpoint rather than a background job, because the answer is only worth
// anything if the person who doubts the trail can run the check themselves.
func (s *Server) handleAuditVerify(w http.ResponseWriter, r *http.Request, grant *authz.Grant) {
	if s.auditLog == nil {
		writeErr(w, http.StatusServiceUnavailable, "audit log is not configured")
		return
	}

	if err := s.auditLog.Verify(r.Context(), grant.Tenant()); err != nil {
		telemetry.Logger(r.Context(), s.log).Error("audit chain failed verification",
			slog.String("err", err.Error()))
		writeJSON(w, http.StatusOK, map[string]any{"intact": false, "detail": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{
		"intact": true,
		"detail": "every event's content matches its hash and every link in the chain is sound",
	})
}

// ---------------------------------------------------------------------------
// streaming
// ---------------------------------------------------------------------------

func (s *Server) handleStream(w http.ResponseWriter, r *http.Request, _ *authz.Grant) {
	flusher, ok := w.(http.Flusher)
	if !ok {
		writeErr(w, http.StatusInternalServerError, "streaming unsupported")
		return
	}

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.WriteHeader(http.StatusOK)

	ch := s.subscribe()
	defer s.unsubscribe(ch)

	// Open with current state so a reconnecting client is never briefly blank.
	s.sendEvent(w, flusher, s.engine.Latest())

	// Rebuilds can be an hour apart; many proxies reap an idle connection long
	// before that.
	keepalive := time.NewTicker(25 * time.Second)
	defer keepalive.Stop()

	for {
		select {
		case <-r.Context().Done():
			return
		case result := <-ch:
			s.sendEvent(w, flusher, result)
		case <-keepalive.C:
			fmt.Fprint(w, ": keepalive\n\n")
			flusher.Flush()
		}
	}
}

func (s *Server) sendEvent(w http.ResponseWriter, f http.Flusher, result pipeline.Result) {
	payload, err := json.Marshal(map[string]any{
		"events": result.Events, "summary": result.Summarise(), "build": result.To.BuildNumber,
	})
	if err != nil {
		s.log.Error("marshal sse payload", slog.String("err", err.Error()))
		return
	}
	fmt.Fprintf(w, "event: drift\ndata: %s\n\n", payload)
	f.Flush()
}

func (s *Server) subscribe() chan pipeline.Result {
	// Buffered: a slow console must not block the poll loop.
	ch := make(chan pipeline.Result, 4)
	s.mu.Lock()
	s.subscribers[ch] = struct{}{}
	s.mu.Unlock()
	return ch
}

func (s *Server) unsubscribe(ch chan pipeline.Result) {
	s.mu.Lock()
	delete(s.subscribers, ch)
	s.mu.Unlock()
	close(ch)
}

func (s *Server) broadcast(result pipeline.Result) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	for ch := range s.subscribers {
		select {
		case ch <- result:
		default:
			// Drop rather than block. The next event carries full state, so a
			// slow client catches up rather than falling permanently behind.
			s.log.Warn("dropped sse event for a slow subscriber")
		}
	}
}

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

func decode(w http.ResponseWriter, r *http.Request, into any) bool {
	if err := json.NewDecoder(http.MaxBytesReader(w, r.Body, maxBody)).Decode(into); err != nil {
		writeErr(w, http.StatusBadRequest, "malformed body: "+err.Error())
		return false
	}
	return true
}

func intParam(r *http.Request, name string, fallback int) int {
	raw := r.URL.Query().Get(name)
	if raw == "" {
		return fallback
	}
	v, err := strconv.Atoi(raw)
	if err != nil || v < 0 {
		return fallback
	}
	return v
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func writeErr(w http.ResponseWriter, status int, msg string) {
	writeJSON(w, status, map[string]string{"error": msg})
}

// StaticEngine serves a fixed result. Used by `cmd/engine -fixtures`, which
// lets the whole HTTP surface be exercised with no Sanity credentials.
type StaticEngine struct {
	Result pipeline.Result
}

func (e *StaticEngine) Poll() (pipeline.Result, bool, error) { return e.Result, false, nil }
func (e *StaticEngine) Latest() pipeline.Result              { return e.Result }
func (e *StaticEngine) Reconcile(string) (int, int, error)   { return 0, 0, nil }

var _ Engine = (*StaticEngine)(nil)
