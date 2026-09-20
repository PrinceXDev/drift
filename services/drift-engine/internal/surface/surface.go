// Package surface is the registry of published things that depend on a claim.
//
// # Why this exists
//
// The original model had exactly one kind of dependent: a content page,
// addressed by an assertion at a field path. That was enough to make the
// argument — seven pages still say 30 days, and the reference walk finds
// exactly seven — but it was not the whole truth about where a fact gets
// repeated to a customer.
//
// The Dissent agent answers questions from the same Knowledge Base. When it
// answers "you have 30 days to return it" and the claim then moves to 45, that
// answer is wrong in precisely the way the seven pages are wrong. It was
// invisible to the blast radius because it was not a page, and an honest answer
// to "which published surfaces depend on this claim?" cannot exclude a
// dependent for being the wrong shape.
//
// # The design in one line
//
// A dependency is an Assertion either way.
//
// A page assertion carries a PageID and a field path; a surface assertion
// carries a SurfaceID and a locator. Both are documents referencing a claim, so
// the blast-radius walk is unchanged:
//
//	*[_type == "assertion" && references($claimId)]
//
// That matters more than the extra type. This project's central claim is that
// the dependency walk is provably complete — adding a second, parallel way to
// depend on a claim would have quietly falsified it, because completeness over
// pages is not completeness. Registering agents as assertions keeps one query
// answering the whole question.
//
// # What a surface may do
//
// Register, and depend. A surface cannot mark itself correct, cannot resolve
// its own drift, and cannot publish. Correction is only defined for pages —
// there is a document to patch — and everything else is fixed by fixing the
// claim and rebuilding. SurfaceKind.Correctable is where that is decided, and
// callers read it rather than assuming.
package surface

import (
	"context"
	"errors"
	"fmt"
	"sort"
	"sync"

	"github.com/drift/drift-engine/pkg/driftv1"
)

var (
	// ErrUnknownSurface is returned when a dependency names a surface that was
	// never registered. Deliberately an error rather than an implicit create: a
	// dependent that appeared without ever announcing itself has no owner, and
	// an unowned surface is one nobody can be asked to fix.
	ErrUnknownSurface = errors.New("surface is not registered")
	// ErrIncomplete is returned for a dependency missing a claim or a target.
	ErrIncomplete = errors.New("dependency is incomplete")
	// ErrAmbiguous is returned when an assertion names both a page and a surface.
	ErrAmbiguous = errors.New("an assertion addresses a page or a surface, never both")
)

// Registry holds the surfaces, and the dependencies between them and claims.
//
// Safe for concurrent use: the Dissent agent registers dependencies while it
// answers, on whatever goroutine served the request, and the gate reads the
// same maps while recomputing a blast radius.
type Registry struct {
	mu         sync.RWMutex
	surfaces   map[string]driftv1.Surface
	byClaim    map[string][]driftv1.Assertion
	byID       map[string]driftv1.Assertion
	generation uint64
}

// NewRegistry returns an empty registry.
func NewRegistry() *Registry {
	return &Registry{
		surfaces: map[string]driftv1.Surface{},
		byClaim:  map[string][]driftv1.Assertion{},
		byID:     map[string]driftv1.Assertion{},
	}
}

// Register adds or replaces a surface.
//
// Idempotent on ID, so an agent that re-registers at every startup does not
// accumulate duplicates of itself.
func (r *Registry) Register(s driftv1.Surface) error {
	if s.ID == "" {
		return fmt.Errorf("%w: a surface needs an id", ErrIncomplete)
	}
	if s.Kind == "" {
		return fmt.Errorf("%w: surface %s has no kind", ErrIncomplete, s.ID)
	}
	r.mu.Lock()
	defer r.mu.Unlock()
	r.surfaces[s.ID] = s
	r.generation++
	return nil
}

// Depend records that a surface expresses a claim.
//
// Idempotent on assertion ID: an agent answering the same question twice
// updates its existing dependency rather than adding a second one, so a blast
// radius counts places, not incidents. A caller that wants each answer recorded
// separately should say so in the ID.
func (r *Registry) Depend(a driftv1.Assertion) error {
	switch {
	case a.ID == "":
		return fmt.Errorf("%w: a dependency needs an id", ErrIncomplete)
	case a.ClaimID == "":
		return fmt.Errorf("%w: %s names no claim", ErrIncomplete, a.ID)
	case a.PageID != "" && a.SurfaceID != "":
		return fmt.Errorf("%w: %s names page %s and surface %s",
			ErrAmbiguous, a.ID, a.PageID, a.SurfaceID)
	case a.DependentID() == "":
		return fmt.Errorf("%w: %s names neither a page nor a surface", ErrIncomplete, a.ID)
	}

	r.mu.Lock()
	defer r.mu.Unlock()

	if a.SurfaceID != "" {
		if _, ok := r.surfaces[a.SurfaceID]; !ok {
			return fmt.Errorf("%w: %s (declared by %s)", ErrUnknownSurface, a.SurfaceID, a.ID)
		}
	}

	if previous, ok := r.byID[a.ID]; ok {
		// Replacing in place. The claim can move between registrations — an
		// agent asked the same question against a rebuilt Knowledge Base may
		// land on a different claim — so the old index entry has to go.
		r.byClaim[previous.ClaimID] = without(r.byClaim[previous.ClaimID], a.ID)
	}

	r.byID[a.ID] = a
	list := append(r.byClaim[a.ClaimID], a)
	sort.Slice(list, func(i, j int) bool { return list[i].ID < list[j].ID })
	r.byClaim[a.ClaimID] = list
	r.generation++
	return nil
}

// AssertionsReferencing implements graph.AssertionReader.
//
// This is the whole integration: the pipeline, the gate and the console all
// walk blast radius through this one method, and none of them needs to know
// that some of what comes back is a bot rather than a paragraph.
func (r *Registry) AssertionsReferencing(_ context.Context, claimID string) ([]driftv1.Assertion, error) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	found := r.byClaim[claimID]
	out := make([]driftv1.Assertion, len(found))
	copy(out, found)
	return out, nil
}

// DependentsOf pairs every dependency on a claim with the surface carrying it.
//
// A dependency whose surface was never registered still comes back, with an
// empty Surface, rather than being dropped: silently omitting a dependent from
// a provenance view is the one failure mode this package exists to prevent.
func (r *Registry) DependentsOf(claimID string) []driftv1.Dependent {
	r.mu.RLock()
	defer r.mu.RUnlock()

	found := r.byClaim[claimID]
	out := make([]driftv1.Dependent, 0, len(found))
	for _, a := range found {
		out = append(out, driftv1.Dependent{
			Assertion: a,
			Surface:   r.surfaces[a.DependentID()],
		})
	}
	return out
}

// Surface returns one registered surface.
func (r *Registry) Surface(id string) (driftv1.Surface, bool) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	s, ok := r.surfaces[id]
	return s, ok
}

// Surfaces returns every registered surface, ordered by ID.
func (r *Registry) Surfaces() []driftv1.Surface {
	r.mu.RLock()
	defer r.mu.RUnlock()
	out := make([]driftv1.Surface, 0, len(r.surfaces))
	for _, s := range r.surfaces {
		out = append(out, s)
	}
	sort.Slice(out, func(i, j int) bool { return out[i].ID < out[j].ID })
	return out
}

// Dependencies returns every recorded dependency, ordered by ID.
func (r *Registry) Dependencies() []driftv1.Assertion {
	r.mu.RLock()
	defer r.mu.RUnlock()
	out := make([]driftv1.Assertion, 0, len(r.byID))
	for _, a := range r.byID {
		out = append(out, a)
	}
	sort.Slice(out, func(i, j int) bool { return out[i].ID < out[j].ID })
	return out
}

// Generation increments on every mutation.
//
// The console polls the drift ledger, not this registry, so an agent that
// starts depending on a claim between two polls would otherwise be invisible
// until something else changed. A cheap counter lets a caller notice.
func (r *Registry) Generation() uint64 {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return r.generation
}

func without(list []driftv1.Assertion, id string) []driftv1.Assertion {
	out := make([]driftv1.Assertion, 0, len(list))
	for _, a := range list {
		if a.ID != id {
			out = append(out, a)
		}
	}
	return out
}
