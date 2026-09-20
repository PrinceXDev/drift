package surface_test

import (
	"context"
	"errors"
	"sync"
	"testing"

	"github.com/drift/drift-engine/internal/surface"
	"github.com/drift/drift-engine/pkg/driftv1"
)

func bot() driftv1.Surface {
	return driftv1.Surface{
		ID: "surface.bot", Kind: driftv1.SurfaceAgent,
		Title: "Support Bot", Owner: "support@example.com",
	}
}

func registered(t *testing.T) *surface.Registry {
	t.Helper()
	r := surface.NewRegistry()
	if err := r.Register(bot()); err != nil {
		t.Fatalf("register: %v", err)
	}
	return r
}

// The integration that matters: a registered agent appears in the same walk
// that finds the pages. If this ever returns only pages, the project's central
// claim — that the dependency walk is provably complete — is false.
func TestAgentDependencyAppearsInTheSameWalkAsPages(t *testing.T) {
	r := registered(t)

	page := driftv1.Assertion{
		ID: "assert.faq", ClaimID: "claim.returns", PageID: "page.faq",
		FieldPath: "body[1]", BlockKey: "b01",
	}
	answer := driftv1.Assertion{
		ID: "dep.bot.returns", ClaimID: "claim.returns", SurfaceID: "surface.bot",
		FieldPath: "answer", RenderedText: "How long do I have to return something?",
	}
	for _, a := range []driftv1.Assertion{page, answer} {
		if err := r.Depend(a); err != nil {
			t.Fatalf("depend %s: %v", a.ID, err)
		}
	}

	found, err := r.AssertionsReferencing(context.Background(), "claim.returns")
	if err != nil {
		t.Fatalf("walk: %v", err)
	}
	if len(found) != 2 {
		t.Fatalf("blast radius = %d, want 2 (one page, one agent)", len(found))
	}

	var pages, surfaces int
	for _, a := range found {
		if a.OnPage() {
			pages++
		} else {
			surfaces++
		}
	}
	if pages != 1 || surfaces != 1 {
		t.Errorf("got %d pages and %d surfaces, want 1 and 1", pages, surfaces)
	}
}

// A dependent whose surface was never registered has no owner, and an unowned
// surface is one nobody can be asked to fix. Refusing is the point.
func TestDependOnAnUnregisteredSurfaceIsRefused(t *testing.T) {
	r := surface.NewRegistry()
	err := r.Depend(driftv1.Assertion{
		ID: "dep.ghost", ClaimID: "claim.returns", SurfaceID: "surface.nobody-declared-this",
	})
	if !errors.Is(err, surface.ErrUnknownSurface) {
		t.Fatalf("err = %v, want ErrUnknownSurface", err)
	}
}

func TestDependRejectsAmbiguousAndIncompleteEdges(t *testing.T) {
	r := registered(t)

	cases := []struct {
		name string
		a    driftv1.Assertion
		want error
	}{
		{
			name: "both a page and a surface",
			a: driftv1.Assertion{
				ID: "dep.both", ClaimID: "claim.x",
				PageID: "page.faq", SurfaceID: "surface.bot",
			},
			want: surface.ErrAmbiguous,
		},
		{
			name: "neither a page nor a surface",
			a:    driftv1.Assertion{ID: "dep.nowhere", ClaimID: "claim.x"},
			want: surface.ErrIncomplete,
		},
		{
			name: "no claim",
			a:    driftv1.Assertion{ID: "dep.nothing", PageID: "page.faq"},
			want: surface.ErrIncomplete,
		},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if err := r.Depend(tc.a); !errors.Is(err, tc.want) {
				t.Fatalf("err = %v, want %v", err, tc.want)
			}
		})
	}
}

// An agent answering the same question twice is one dependent, not two. A blast
// radius counts places a fact is published, and inflating it with repeat
// traffic would make the number meaningless exactly when it is being used to
// decide whether a correction is complete.
func TestRepeatedRegistrationIsOneDependency(t *testing.T) {
	r := registered(t)

	for i := 0; i < 3; i++ {
		if err := r.Depend(driftv1.Assertion{
			ID: "dep.bot.returns", ClaimID: "claim.returns", SurfaceID: "surface.bot",
			FieldPath: "answer",
		}); err != nil {
			t.Fatalf("depend: %v", err)
		}
	}

	found, _ := r.AssertionsReferencing(context.Background(), "claim.returns")
	if len(found) != 1 {
		t.Fatalf("dependencies = %d, want 1", len(found))
	}
}

// A rebuild can route the same question to a different claim. The old edge has
// to go, or the previous claim keeps a dependent that no longer exists and its
// blast radius over-reports forever.
func TestReRegisteringAgainstANewClaimMovesTheEdge(t *testing.T) {
	r := registered(t)
	ctx := context.Background()

	base := driftv1.Assertion{
		ID: "dep.bot.q", SurfaceID: "surface.bot", FieldPath: "answer",
	}
	base.ClaimID = "claim.old"
	if err := r.Depend(base); err != nil {
		t.Fatal(err)
	}
	base.ClaimID = "claim.new"
	if err := r.Depend(base); err != nil {
		t.Fatal(err)
	}

	if old, _ := r.AssertionsReferencing(ctx, "claim.old"); len(old) != 0 {
		t.Errorf("claim.old still has %d dependents, want 0", len(old))
	}
	if now, _ := r.AssertionsReferencing(ctx, "claim.new"); len(now) != 1 {
		t.Errorf("claim.new has %d dependents, want 1", len(now))
	}
}

// DependentsOf is what the lineage panel renders, so every edge must come back
// carrying the surface that owns it.
func TestDependentsOfResolvesTheOwningSurface(t *testing.T) {
	r := registered(t)
	if err := r.Depend(driftv1.Assertion{
		ID: "dep.bot.returns", ClaimID: "claim.returns", SurfaceID: "surface.bot",
	}); err != nil {
		t.Fatal(err)
	}

	dependents := r.DependentsOf("claim.returns")
	if len(dependents) != 1 {
		t.Fatalf("dependents = %d, want 1", len(dependents))
	}
	if got := dependents[0].Surface.Title; got != "Support Bot" {
		t.Errorf("surface title = %q, want %q", got, "Support Bot")
	}
	if dependents[0].Surface.Kind.Correctable() {
		t.Error("an agent surface must not be reported as correctable: " +
			"there is no document to patch, and a queue item nobody can publish " +
			"is worse than no queue item")
	}
}

// A page assertion whose surface was never registered still has to appear.
// Dropping a dependent from a provenance view is the one failure this package
// exists to prevent, and it must not be reachable through a missing row.
func TestAnUnregisteredPageIsStillReportedAsADependent(t *testing.T) {
	r := surface.NewRegistry()
	if err := r.Depend(driftv1.Assertion{
		ID: "assert.faq", ClaimID: "claim.returns", PageID: "page.never-registered",
	}); err != nil {
		t.Fatalf("a page dependency must not require a registered surface: %v", err)
	}

	dependents := r.DependentsOf("claim.returns")
	if len(dependents) != 1 {
		t.Fatalf("dependents = %d, want 1 — a dependent must never be silently dropped", len(dependents))
	}
	if dependents[0].Surface.ID != "" {
		t.Errorf("surface = %q, want empty rather than invented", dependents[0].Surface.ID)
	}
}

// The agent registers on whatever goroutine served a request while the gate
// recomputes a blast radius. The race detector makes this test worth having.
func TestConcurrentRegistrationAndWalking(t *testing.T) {
	r := registered(t)
	ctx := context.Background()

	var wg sync.WaitGroup
	for i := 0; i < 25; i++ {
		wg.Add(2)
		go func(n int) {
			defer wg.Done()
			_ = r.Depend(driftv1.Assertion{
				ID:        "dep.bot." + string(rune('a'+n%26)),
				ClaimID:   "claim.returns",
				SurfaceID: "surface.bot",
			})
		}(i)
		go func() {
			defer wg.Done()
			if _, err := r.AssertionsReferencing(ctx, "claim.returns"); err != nil {
				t.Error(err)
			}
		}()
	}
	wg.Wait()

	if r.Generation() == 0 {
		t.Error("generation did not advance despite 25 registrations")
	}
}
