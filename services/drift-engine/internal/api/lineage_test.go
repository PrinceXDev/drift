package api_test

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/drift/drift-engine/internal/api"
	"github.com/drift/drift-engine/internal/authz"
	"github.com/drift/drift-engine/internal/eventlog"
	"github.com/drift/drift-engine/internal/remediation"
	"github.com/drift/drift-engine/pkg/driftv1"
)

type stubLineage struct {
	lineage driftv1.ClaimLineage
	found   bool
	err     error
	asked   []string
}

func (l *stubLineage) Lineage(_ context.Context, claimID string) (driftv1.ClaimLineage, bool, error) {
	l.asked = append(l.asked, claimID)
	return l.lineage, l.found, l.err
}

func (l *stubLineage) Surfaces(context.Context) ([]driftv1.Surface, error) {
	return []driftv1.Surface{
		{ID: "page.faq", Kind: driftv1.SurfacePage, Title: "FAQ"},
		{ID: "surface.support-bot", Kind: driftv1.SurfaceAgent, Title: "Support Bot"},
	}, nil
}

func sampleLineage() driftv1.ClaimLineage {
	return driftv1.ClaimLineage{
		Claim: driftv1.Claim{
			ID: "claim.returns-window", Path: "support/returns",
			Statement: "Returns are accepted within 45 days of delivery.",
			Tier:      driftv1.TierCore, Status: driftv1.ClaimActive,
			FirstSeenBuild: "build.46", LastVerifiedBuild: "build.46",
			LastChangedBuild: "build.47",
		},
		Sources:   []driftv1.Source{{ID: "source.returns-policy-v4", Authority: 5}},
		FirstSeen: &driftv1.BuildSnapshot{ID: "build.46", BuildNumber: 46},
		Dependents: []driftv1.Dependent{
			{
				Assertion: driftv1.Assertion{ID: "assert.returns-1", PageID: "page.returns"},
				Surface:   driftv1.Surface{ID: "page.returns", Kind: driftv1.SurfacePage},
			},
			{
				Assertion: driftv1.Assertion{ID: "dep.bot.returns", SurfaceID: "surface.support-bot"},
				Surface:   driftv1.Surface{ID: "surface.support-bot", Kind: driftv1.SurfaceAgent},
			},
		},
	}
}

func lineageHarness(t *testing.T, stub *stubLineage) harness {
	t.Helper()

	rem := &stubRemediator{outcome: remediation.Outcome{Applied: true, EventID: "evt_x"}}
	store := eventlog.NewMemStore()
	log := eventlog.New(store)

	srv := httptest.NewServer(
		api.New(&stubEngine{result: sampleResult()}, registry(), "acme", quietLog()).
			WithRemediator(rem).
			WithAuditLog(log).
			WithLineage(stub).
			Handler(),
	)
	t.Cleanup(srv.Close)

	return harness{url: srv.URL, remediator: rem, store: store, log: log}
}

// One request returns all six branches, assembled from one build. A client that
// fetched them separately could render a claim's provenance from two different
// builds and have no way of knowing.
func TestLineage_ReturnsEveryBranchInOneRequest(t *testing.T) {
	stub := &stubLineage{lineage: sampleLineage(), found: true}
	h := lineageHarness(t, stub)

	resp := do(t, h, http.MethodGet, "/v1/claims/claim.returns-window/lineage", tokViewer, "")
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("status = %d, want 200", resp.StatusCode)
	}

	var got driftv1.ClaimLineage
	if err := json.NewDecoder(resp.Body).Decode(&got); err != nil {
		t.Fatal(err)
	}

	if got.Claim.ID != "claim.returns-window" {
		t.Errorf("claim = %q", got.Claim.ID)
	}
	if len(got.Sources) != 1 {
		t.Errorf("sources = %d, want 1", len(got.Sources))
	}
	if got.FirstSeen == nil || got.FirstSeen.BuildNumber != 46 {
		t.Error("the created branch must resolve to a build a reader can date")
	}
	if got.Claim.LastVerifiedBuild == got.Claim.LastChangedBuild {
		t.Error("verified and changed collapsed into the same build; the panel can no " +
			"longer say how long the fact stood before it moved")
	}

	var pages, agents int
	for _, d := range got.Dependents {
		switch d.Surface.Kind {
		case driftv1.SurfacePage:
			pages++
		case driftv1.SurfaceAgent:
			agents++
		}
	}
	if pages != 1 || agents != 1 {
		t.Errorf("dependents = %d pages and %d agents, want 1 and 1: the published "+
			"branch has to name the bot as well as the page", pages, agents)
	}

	if len(stub.asked) != 1 || stub.asked[0] != "claim.returns-window" {
		t.Errorf("claim id did not reach the reader: %v", stub.asked)
	}
}

// Lineage reads under drift:read. A viewer can see where a fact came from and
// what depends on it — the same graph the drift feed already shows — without
// holding the audit permission.
func TestLineage_IsReadableByAViewer(t *testing.T) {
	h := lineageHarness(t, &stubLineage{lineage: sampleLineage(), found: true})

	resp := do(t, h, http.MethodGet, "/v1/claims/claim.returns-window/lineage", tokViewer, "")
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("a viewer got %d for lineage; provenance is not privileged information",
			resp.StatusCode)
	}
}

func TestLineage_RequiresACredential(t *testing.T) {
	h := lineageHarness(t, &stubLineage{lineage: sampleLineage(), found: true})

	for _, path := range []string{"/v1/claims/claim.x/lineage", "/v1/surfaces"} {
		resp := do(t, h, http.MethodGet, path, "", "")
		if resp.StatusCode != http.StatusUnauthorized {
			t.Errorf("%s returned %d without a credential, want 401", path, resp.StatusCode)
		}
	}
}

// Cross-tenant reads are 404, not 403, on this route as on every other:
// confirming a claim exists is itself a disclosure.
func TestLineage_CrossTenantIsNotFound(t *testing.T) {
	h := lineageHarness(t, &stubLineage{lineage: sampleLineage(), found: true})

	resp := do(t, h, http.MethodGet, "/v1/claims/claim.returns-window/lineage", tokOther, "")
	if resp.StatusCode != http.StatusNotFound {
		t.Fatalf("status = %d, want 404", resp.StatusCode)
	}
}

func TestLineage_UnknownClaimIsNotFound(t *testing.T) {
	h := lineageHarness(t, &stubLineage{found: false})

	resp := do(t, h, http.MethodGet, "/v1/claims/claim.nope/lineage", tokViewer, "")
	if resp.StatusCode != http.StatusNotFound {
		t.Fatalf("status = %d, want 404", resp.StatusCode)
	}
}

// Without a configured reader the route says so rather than returning an empty
// lineage, which would read as "this fact came from nowhere".
func TestLineage_UnconfiguredIsUnavailableRatherThanEmpty(t *testing.T) {
	h := newHarness(t, &stubEngine{result: sampleResult()})

	resp := do(t, h, http.MethodGet, "/v1/claims/claim.x/lineage", tokViewer, "")
	if resp.StatusCode != http.StatusServiceUnavailable {
		t.Fatalf("status = %d, want 503", resp.StatusCode)
	}
}

// The claim timeline the lineage panel renders: one query, spanning every
// assertion that ever expressed the fact.
func TestAudit_FiltersByClaimID(t *testing.T) {
	h := lineageHarness(t, &stubLineage{lineage: sampleLineage(), found: true})
	ctx := context.Background()

	grant, err := authz.Authorize(
		authz.Actor{ID: "sam", Tenant: "acme", Roles: []authz.Role{authz.RoleSteward}},
		authz.PermApprovePublish, "acme", "assert.returns-1")
	if err != nil {
		t.Fatal(err)
	}
	for _, a := range []eventlog.Append{
		{Type: eventlog.CorrectionApproved, Subject: "assert.returns-1", ClaimID: "claim.returns-window"},
		{Type: eventlog.PublicationBlocked, Subject: "assert.returns-7", ClaimID: "claim.returns-window"},
		{Type: eventlog.CorrectionApproved, Subject: "assert.warranty-1", ClaimID: "claim.warranty"},
	} {
		if _, err := h.log.Record(ctx, grant, a); err != nil {
			t.Fatal(err)
		}
	}

	resp := do(t, h, http.MethodGet, "/v1/audit?claimId=claim.returns-window", tokSteward, "")
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("status = %d, want 200", resp.StatusCode)
	}

	var body struct {
		Events []eventlog.Event `json:"events"`
		Count  int              `json:"count"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
		t.Fatal(err)
	}
	if body.Count != 2 {
		t.Fatalf("count = %d, want 2 (two assertions, one fact)", body.Count)
	}
	for _, e := range body.Events {
		if e.ClaimID != "claim.returns-window" {
			t.Errorf("event %s leaked from claim %s", e.ID, e.ClaimID)
		}
	}
}

func TestSurfaces_ListsPagesAndAgentsTogether(t *testing.T) {
	h := lineageHarness(t, &stubLineage{lineage: sampleLineage(), found: true})

	resp := do(t, h, http.MethodGet, "/v1/surfaces", tokViewer, "")
	if resp.StatusCode != http.StatusOK {
		t.Fatalf("status = %d, want 200", resp.StatusCode)
	}

	var body struct {
		Surfaces []driftv1.Surface `json:"surfaces"`
		Count    int               `json:"count"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&body); err != nil {
		t.Fatal(err)
	}
	if body.Count != 2 {
		t.Fatalf("count = %d, want 2", body.Count)
	}
}
