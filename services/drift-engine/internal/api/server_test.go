package api_test

import (
	"bufio"
	"context"
	"encoding/json"
	"errors"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"

	"github.com/drift/drift-engine/internal/api"
	"github.com/drift/drift-engine/internal/authz"
	"github.com/drift/drift-engine/internal/eventlog"
	"github.com/drift/drift-engine/internal/gate"
	"github.com/drift/drift-engine/internal/pipeline"
	"github.com/drift/drift-engine/internal/remediation"
	"github.com/drift/drift-engine/pkg/driftv1"
)

func quietLog() *slog.Logger { return slog.New(slog.NewTextHandler(io.Discard, nil)) }

// ---------------------------------------------------------------------------
// fixtures
// ---------------------------------------------------------------------------

type stubEngine struct {
	result   pipeline.Result
	changed  bool
	pollErr  error
	reconErr error
}

func (e *stubEngine) Poll() (pipeline.Result, bool, error) {
	if e.pollErr != nil {
		return pipeline.Result{}, false, e.pollErr
	}
	return e.result, e.changed, nil
}
func (e *stubEngine) Latest() pipeline.Result { return e.result }
func (e *stubEngine) Reconcile(string) (int, int, error) {
	if e.reconErr != nil {
		return 0, 0, e.reconErr
	}
	return 3, 1, nil
}

type stubRemediator struct {
	decision  gate.Decision
	outcome   remediation.Outcome
	err       error
	previewed int
	approved  int
	rejected  int
}

func (r *stubRemediator) Preview(context.Context, *authz.Grant, remediation.Draft) (gate.Decision, error) {
	r.previewed++
	return r.decision, r.err
}
func (r *stubRemediator) Approve(context.Context, *authz.Grant, remediation.Draft) (remediation.Outcome, error) {
	r.approved++
	return r.outcome, r.err
}
func (r *stubRemediator) Reject(context.Context, *authz.Grant, remediation.Draft, string) (remediation.Outcome, error) {
	r.rejected++
	return r.outcome, r.err
}

func sampleResult() pipeline.Result {
	return pipeline.Result{
		From: driftv1.BuildSnapshot{ID: "build.46", BuildNumber: 46},
		To:   driftv1.BuildSnapshot{ID: "build.47", BuildNumber: 47},
		Events: []driftv1.DriftEvent{{
			ClaimPath: "support/returns", Kind: driftv1.DriftContradicted,
			Confidence: 1, Tier: driftv1.TierCore,
			BlastRadius: []string{"a1", "a2"}, State: driftv1.StateTriage,
		}},
	}
}

// Tokens are deliberately readable; the registry stores only their hashes.
const (
	tokViewer  = "t-viewer"
	tokEditor  = "t-editor"
	tokSteward = "t-steward"
	tokAgent   = "t-agent"
	tokOther   = "t-other-tenant"
)

func registry() *authz.Registry {
	r := authz.NewRegistry()
	_ = r.Add(tokViewer, authz.Actor{ID: "vic", Tenant: "acme", Roles: []authz.Role{authz.RoleViewer}})
	_ = r.Add(tokEditor, authz.Actor{ID: "dana", Tenant: "acme", Roles: []authz.Role{authz.RoleEditor}})
	_ = r.Add(tokSteward, authz.Actor{ID: "sam", Tenant: "acme", Roles: []authz.Role{authz.RoleSteward}})
	_ = r.Add(tokAgent, authz.Actor{ID: "bot", Tenant: "acme", Roles: []authz.Role{authz.RoleAgent}, IsAgent: true})
	_ = r.Add(tokOther, authz.Actor{ID: "mallory", Tenant: "globex", Roles: []authz.Role{authz.RoleAdmin}})
	return r
}

type harness struct {
	url        string
	remediator *stubRemediator
	store      *eventlog.MemStore
	log        *eventlog.Log
}

func newHarness(t *testing.T, engine api.Engine) harness {
	t.Helper()

	rem := &stubRemediator{outcome: remediation.Outcome{Applied: true, EventID: "evt_x"}}
	store := eventlog.NewMemStore()
	log := eventlog.New(store)

	srv := httptest.NewServer(
		api.New(engine, registry(), "acme", quietLog()).
			WithRemediator(rem).
			WithAuditLog(log).
			Handler(),
	)
	t.Cleanup(srv.Close)

	return harness{url: srv.URL, remediator: rem, store: store, log: log}
}

func do(t *testing.T, h harness, method, path, token, body string) *http.Response {
	t.Helper()
	var reader io.Reader
	if body != "" {
		reader = strings.NewReader(body)
	}
	req, err := http.NewRequest(method, h.url+path, reader)
	if err != nil {
		t.Fatal(err)
	}
	if token != "" {
		req.Header.Set("Authorization", "Bearer "+token)
	}
	req.Header.Set("Content-Type", "application/json")
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = resp.Body.Close() })
	return resp
}

// ---------------------------------------------------------------------------
// authentication and authorization
// ---------------------------------------------------------------------------

// Every data route is closed to an unauthenticated caller. Health is not,
// because it discloses nothing.
func TestAuth_EveryDataRouteRequiresACredential(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult()})

	routes := []struct{ method, path, body string }{
		{http.MethodGet, "/v1/me", ""},
		{http.MethodGet, "/v1/drift", ""},
		{http.MethodGet, "/v1/drift/stream", ""},
		{http.MethodPost, "/v1/dissent", `{"question":"x"}`},
		{http.MethodPost, "/v1/builds/poll", `{}`},
		{http.MethodPost, "/v1/assertions/reconcile", `{"pageId":"p"}`},
		{http.MethodPost, "/v1/corrections/preview", `{}`},
		{http.MethodPost, "/v1/corrections/approve", `{}`},
		{http.MethodPost, "/v1/corrections/reject", `{"reason":"x"}`},
		{http.MethodGet, "/v1/audit", ""},
		{http.MethodGet, "/v1/audit/verify", ""},
	}

	for _, route := range routes {
		t.Run(route.path, func(t *testing.T) {
			resp := do(t, h, route.method, route.path, "", route.body)
			if resp.StatusCode != http.StatusUnauthorized {
				t.Errorf("anonymous %s %s = %d, want 401", route.method, route.path, resp.StatusCode)
			}
			if resp.Header.Get("WWW-Authenticate") == "" {
				t.Error("401 without a WWW-Authenticate header")
			}
		})
	}

	if resp := do(t, h, http.MethodGet, "/healthz", "", ""); resp.StatusCode != http.StatusOK {
		t.Errorf("healthz = %d, want 200; probes carry no token", resp.StatusCode)
	}
}

// The central promise at the HTTP boundary: an agent cannot reach publication.
func TestAuth_AgentCannotApproveOverHTTP(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult()})

	resp := do(t, h, http.MethodPost, "/v1/corrections/approve", tokAgent, `{"assertionId":"a1"}`)
	if resp.StatusCode != http.StatusForbidden {
		t.Fatalf("agent approve = %d, want 403", resp.StatusCode)
	}
	if h.remediator.approved != 0 {
		t.Error("the request reached the remediator despite being forbidden")
	}

	var body map[string]string
	_ = json.NewDecoder(resp.Body).Decode(&body)
	if !strings.Contains(body["error"], "human") {
		t.Errorf("the refusal should explain why, got %q", body["error"])
	}
}

// A viewer can read drift and nothing else.
func TestAuth_ViewerIsReadOnly(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult()})

	if resp := do(t, h, http.MethodGet, "/v1/drift", tokViewer, ""); resp.StatusCode != http.StatusOK {
		t.Errorf("viewer GET /v1/drift = %d, want 200", resp.StatusCode)
	}

	forbidden := []struct{ path, body string }{
		{"/v1/builds/poll", `{}`},
		{"/v1/corrections/approve", `{"assertionId":"a1"}`},
		{"/v1/corrections/preview", `{"assertionId":"a1"}`},
	}
	for _, f := range forbidden {
		resp := do(t, h, http.MethodPost, f.path, tokViewer, f.body)
		if resp.StatusCode != http.StatusForbidden {
			t.Errorf("viewer POST %s = %d, want 403", f.path, resp.StatusCode)
		}
	}
	// audit:read is not a viewer permission.
	if resp := do(t, h, http.MethodGet, "/v1/audit", tokViewer, ""); resp.StatusCode != http.StatusForbidden {
		t.Errorf("viewer GET /v1/audit = %d, want 403", resp.StatusCode)
	}
}

// Cross-tenant callers get 404, not 403. Confirming that a resource exists but
// belongs to someone else is itself a disclosure.
func TestAuth_CrossTenantLooksLikeNotFound(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult()})

	resp := do(t, h, http.MethodGet, "/v1/drift", tokOther, "")
	if resp.StatusCode != http.StatusNotFound {
		t.Errorf("cross-tenant admin = %d, want 404 (403 would confirm the resource exists)",
			resp.StatusCode)
	}
}

// A person should be able to see their own capabilities rather than
// discovering them by being refused.
func TestMe_ReportsCapabilities(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult()})

	resp := do(t, h, http.MethodGet, "/v1/me", tokEditor, "")
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("status = %d", resp.StatusCode)
	}

	var me struct {
		ID          string          `json:"id"`
		Tenant      string          `json:"tenant"`
		IsAgent     bool            `json:"isAgent"`
		Permissions map[string]bool `json:"permissions"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&me); err != nil {
		t.Fatal(err)
	}

	if me.ID != "dana" || me.Tenant != "acme" || me.IsAgent {
		t.Errorf("identity wrong: %+v", me)
	}
	if !me.Permissions["correction:publish"] {
		t.Error("editor should report the publish permission")
	}
	if me.Permissions["conflict:resolve"] {
		t.Error("editor should not report the resolve permission")
	}
}

// Every response carries a correlation ID, so a user can quote it and an
// operator can reconstruct the causal chain.
func TestCorrelationID_IsAlwaysEchoed(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult()})

	resp := do(t, h, http.MethodGet, "/v1/drift", tokEditor, "")
	if resp.Header.Get("X-Correlation-ID") == "" {
		t.Error("no correlation id on a successful response")
	}

	// Including on a refusal, which is when it is most useful.
	denied := do(t, h, http.MethodGet, "/v1/drift", "", "")
	if denied.Header.Get("X-Correlation-ID") == "" {
		t.Error("no correlation id on a 401")
	}
}

// A caller-supplied correlation ID is honoured, so a trace spanning several
// services stays joined up.
func TestCorrelationID_HonoursTheCaller(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult()})

	req, _ := http.NewRequest(http.MethodGet, h.url+"/v1/drift", nil)
	req.Header.Set("Authorization", "Bearer "+tokEditor)
	req.Header.Set("X-Correlation-ID", "cor_from_upstream")
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()

	if got := resp.Header.Get("X-Correlation-ID"); got != "cor_from_upstream" {
		t.Errorf("correlation id = %q, want the caller's", got)
	}
}

// ---------------------------------------------------------------------------
// corrections
// ---------------------------------------------------------------------------

// A gate refusal is a successful request with an unsuccessful outcome: 422,
// not 403. A client deciding whether to retry needs that distinction.
func TestApprove_GateRefusalIs422(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult()})
	h.remediator.outcome = remediation.Outcome{
		Applied: false,
		Decision: gate.Decision{Allowed: false, Checks: []gate.Check{
			{Name: gate.CheckBuildCurrent, Passed: false, Blocking: true, Detail: "rebuilt since drafting"},
		}},
	}

	resp := do(t, h, http.MethodPost, "/v1/corrections/approve", tokEditor, `{"assertionId":"a1"}`)
	if resp.StatusCode != http.StatusUnprocessableEntity {
		t.Errorf("blocked approval = %d, want 422", resp.StatusCode)
	}
}

func TestApprove_SucceedsForAnEditor(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult()})

	resp := do(t, h, http.MethodPost, "/v1/corrections/approve", tokEditor, `{"assertionId":"a1"}`)
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("status = %d", resp.StatusCode)
	}
	if h.remediator.approved != 1 {
		t.Errorf("remediator called %d times", h.remediator.approved)
	}
}

// Preview needs only simulate, so an agent can check consequences without
// being able to cause them.
func TestPreview_IsAvailableToAnAgent(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult()})

	resp := do(t, h, http.MethodPost, "/v1/corrections/preview", tokAgent, `{"assertionId":"a1"}`)
	if resp.StatusCode != http.StatusOK {
		t.Errorf("agent preview = %d, want 200 — agents may simulate", resp.StatusCode)
	}
	if h.remediator.previewed != 1 {
		t.Error("preview did not reach the remediator")
	}
}

// A rejection without a reason teaches the drafter nothing.
func TestReject_RequiresAReason(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult()})

	resp := do(t, h, http.MethodPost, "/v1/corrections/reject", tokEditor, `{"assertionId":"a1"}`)
	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("reject without a reason = %d, want 400", resp.StatusCode)
	}
	if h.remediator.rejected != 0 {
		t.Error("a reasonless rejection reached the remediator")
	}
}

// ---------------------------------------------------------------------------
// audit
// ---------------------------------------------------------------------------

func TestAudit_VerifyReportsAnIntactChain(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult()})

	grant, err := authz.Authorize(
		authz.Actor{ID: "sam", Tenant: "acme", Roles: []authz.Role{authz.RoleSteward}},
		authz.PermApprovePublish, "acme", "a1")
	if err != nil {
		t.Fatal(err)
	}
	for _, subject := range []string{"a1", "a2"} {
		if _, err := h.log.Record(context.Background(), grant, eventlog.Append{
			Type: eventlog.CorrectionApproved, Subject: subject, BuildID: "build.47",
		}); err != nil {
			t.Fatal(err)
		}
	}

	resp := do(t, h, http.MethodGet, "/v1/audit/verify", tokSteward, "")
	var body struct {
		Intact bool `json:"intact"`
	}
	_ = json.NewDecoder(resp.Body).Decode(&body)
	if !body.Intact {
		t.Error("a clean chain reported as tampered")
	}

	// And it detects tampering, which is the only reason the endpoint exists.
	events, _ := h.store.Range(context.Background(), eventlog.Query{Tenant: "acme"})
	altered := events[0]
	altered.Subject = "rewritten"
	h.store.Overwrite(0, altered)

	resp2 := do(t, h, http.MethodGet, "/v1/audit/verify", tokSteward, "")
	var after struct {
		Intact bool `json:"intact"`
	}
	_ = json.NewDecoder(resp2.Body).Decode(&after)
	if after.Intact {
		t.Error("a tampered chain reported as intact")
	}
}

// Time travel over HTTP is a bounded read of the same log.
func TestAudit_TimeTravelBoundsTheRead(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult()})

	grant, _ := authz.Authorize(
		authz.Actor{ID: "sam", Tenant: "acme", Roles: []authz.Role{authz.RoleSteward}},
		authz.PermApprovePublish, "acme", "a")
	for i := 0; i < 5; i++ {
		_, _ = h.log.Record(context.Background(), grant,
			eventlog.Append{Type: eventlog.DriftDetected, Subject: "s"})
	}

	resp := do(t, h, http.MethodGet, "/v1/audit?upToSeq=3", tokSteward, "")
	var body struct {
		Count int `json:"count"`
	}
	_ = json.NewDecoder(resp.Body).Decode(&body)
	if body.Count != 3 {
		t.Errorf("as-of seq 3 returned %d events, want 3", body.Count)
	}
}

// ---------------------------------------------------------------------------
// existing behaviour, preserved
// ---------------------------------------------------------------------------

func TestPoll_ReportsBuildAndEventCount(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult(), changed: true})

	resp := do(t, h, http.MethodPost, "/v1/builds/poll", tokSteward, `{}`)
	var out struct {
		Changed bool `json:"changed"`
		Build   int  `json:"build"`
		Events  int  `json:"events"`
	}
	_ = json.NewDecoder(resp.Body).Decode(&out)

	if !out.Changed || out.Build != 47 || out.Events != 1 {
		t.Errorf("got %+v, want changed=true build=47 events=1", out)
	}
}

func TestPoll_UpstreamFailureIs502(t *testing.T) {
	h := newHarness(t, &stubEngine{pollErr: errors.New("context mcp unreachable")})

	resp := do(t, h, http.MethodPost, "/v1/builds/poll", tokSteward, `{}`)
	if resp.StatusCode != http.StatusBadGateway {
		t.Errorf("status = %d, want 502", resp.StatusCode)
	}
}

func TestReconcile_RequiresAPageID(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult()})

	resp := do(t, h, http.MethodPost, "/v1/assertions/reconcile", tokSteward, `{"trigger":"document"}`)
	if resp.StatusCode != http.StatusBadRequest {
		t.Errorf("status = %d, want 400", resp.StatusCode)
	}
}

func TestStream_SendsCurrentStateImmediately(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult()})

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	req, _ := http.NewRequestWithContext(ctx, http.MethodGet, h.url+"/v1/drift/stream", nil)
	req.Header.Set("Authorization", "Bearer "+tokEditor)
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()

	if ct := resp.Header.Get("Content-Type"); ct != "text/event-stream" {
		t.Errorf("content-type = %q, want text/event-stream", ct)
	}

	reader := bufio.NewReader(resp.Body)
	var sawData bool
	for i := 0; i < 4; i++ {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		if strings.HasPrefix(line, "data: ") {
			sawData = true
			var payload struct {
				Build   int              `json:"build"`
				Summary pipeline.Summary `json:"summary"`
			}
			if err := json.Unmarshal([]byte(strings.TrimPrefix(line, "data: ")), &payload); err != nil {
				t.Fatalf("stream payload is not valid JSON: %v", err)
			}
			if payload.Build != 47 {
				t.Errorf("build = %d, want 47", payload.Build)
			}
		}
	}
	if !sawData {
		t.Error("stream did not open with the current state")
	}
}

func TestStaticEngine_NeverReportsChange(t *testing.T) {
	e := &api.StaticEngine{Result: sampleResult()}
	if _, changed, err := e.Poll(); err != nil || changed {
		t.Errorf("fixture engine should be inert, got changed=%v err=%v", changed, err)
	}
}
