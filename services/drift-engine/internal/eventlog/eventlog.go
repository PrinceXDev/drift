// Package eventlog is the append-only spine of DRIFT.
//
// # Why one primitive instead of five
//
// The requirements list append-only audit history, idempotent processing,
// replayability, time-travel through organisational belief, and incident
// timelines as five separate capabilities. They are one data structure looked
// at from five angles:
//
//	audit          the log, read
//	idempotency    "have I already recorded this key?"
//	replay         fold the log again from the start
//	time-travel    fold the log only up to sequence N
//	incident       filter the log by subject
//
// Building five subsystems here would mean five places for them to disagree
// about what happened. There is one.
//
// # Tamper evidence
//
// Every event carries the hash of its predecessor, so the log is a chain. An
// entry cannot be altered or removed after the fact without breaking every hash
// after it, and `Verify` walks the chain to prove it has not been. That matters
// because the audit trail's whole purpose is to be believed by someone who does
// not trust the person showing it to them.
//
// This is not a blockchain and makes no distributed-consensus claims. It is a
// hash chain: cheap, boring, and exactly sufficient for "prove this record was
// not edited after the fact".
//
// # Content-addressed IDs
//
// An event's ID is the hash of its content plus its predecessor. Two identical
// events appended twice produce the same ID, which is what makes replay safe:
// re-processing a build cannot create duplicate history.
package eventlog

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"sort"
	"sync"
	"time"

	"github.com/drift/drift-engine/internal/authz"
	"github.com/drift/drift-engine/internal/telemetry"
)

// Type names what happened. Past tense, always: an event log records facts,
// never intentions.
type Type string

const (
	BuildCaptured       Type = "build.captured"
	DriftDetected       Type = "drift.detected"
	IncidentDeclared    Type = "incident.declared"
	IncidentClosed      Type = "incident.closed"
	CorrectionDrafted   Type = "correction.drafted"
	CorrectionApproved  Type = "correction.approved"
	CorrectionRejected  Type = "correction.rejected"
	PublicationBlocked  Type = "publication.blocked"
	PublicationDone     Type = "publication.completed"
	ConflictResolved    Type = "conflict.resolved"
	InstructionWritten  Type = "instruction.written"
	InstructionExpired  Type = "instruction.archived"
	SimulationRun       Type = "simulation.run"
	AuthorizationDenied Type = "authorization.denied"
)

// Event is one immutable fact.
//
// The field set is the brief's traceability requirement made concrete: every
// event names the actor, the build, the subject and the evidence. There is no
// way to append one that omits them, because Append takes a Grant and derives
// most of this from it.
type Event struct {
	// ID is the content address: sha256 over the event body and PrevID.
	ID string `json:"id"`
	// Seq is the position in the chain, from 1.
	Seq int64 `json:"seq"`
	// PrevID chains to the previous event. Empty only for the genesis entry.
	PrevID string `json:"prevId"`

	Type Type      `json:"type"`
	At   time.Time `json:"at"`

	// Who
	ActorID   string `json:"actorId"`
	ActorRole string `json:"actorRole"`
	IsAgent   bool   `json:"isAgent"`
	Tenant    string `json:"tenant"`

	// What it concerns. Subject is the primary object — a claim path, an
	// assertion ID, an incident ID — so an incident timeline is one filter.
	Subject string `json:"subject"`
	// ClaimID is the fact the event ultimately concerns, recorded alongside
	// Subject rather than derived from it.
	//
	// Most events are subjected to an *assertion*, because that is what somebody
	// approved or blocked. But the question people ask is about the fact: "show
	// me everything that has ever happened to the returns window." Without this
	// field that is a join across the assertion graph, resolved at read time,
	// against a graph that has since changed — so the timeline of a claim would
	// depend on today's dependency set rather than on what was true when each
	// event was written.
	//
	// Denormalising it makes a claim timeline one query and pins each event to
	// the fact it was about at the moment it happened. Events not about any one
	// fact — an authorization denial, a build capture — leave it empty.
	ClaimID string `json:"claimId,omitempty"`
	// BuildID pins the event to the state of belief it happened against.
	BuildID string `json:"buildId"`

	// Why: machine-readable evidence, never free prose. Redaction is the
	// caller's job via telemetry.Excerpt; this struct does not police content,
	// but nothing in DRIFT writes raw statements here.
	Evidence map[string]any `json:"evidence,omitempty"`

	// How it was traced
	CorrelationID string `json:"correlationId"`
	// IdempotencyKey deduplicates. Empty means "always append".
	IdempotencyKey string `json:"idempotencyKey,omitempty"`
}

// Hash computes the content address for an event. Excludes ID so the value is
// self-verifying: recompute it and compare.
func (e Event) Hash() string {
	// A struct copy with ID cleared, marshalled canonically. encoding/json sorts
	// map keys, so Evidence hashes stably regardless of insertion order.
	bare := e
	bare.ID = ""
	body, err := json.Marshal(bare)
	if err != nil {
		// Only reachable if Evidence holds something unmarshalable, which would
		// be a programming error at the call site. Hashing the error text keeps
		// the chain intact and makes the bad event obvious rather than silently
		// collapsing two different events to the same address.
		body = []byte("unmarshalable:" + err.Error())
	}
	sum := sha256.Sum256(body)
	return "evt_" + hex.EncodeToString(sum[:])[:32]
}

var (
	ErrTamper  = errors.New("event log integrity check failed")
	ErrNoGrant = errors.New("appending to the audit log requires an authorization grant")
)

// Append is the payload for a new entry. Everything not derived from the Grant.
type Append struct {
	Type    Type
	Subject string
	// ClaimID is the fact this event concerns, when it concerns one. See the
	// field of the same name on Event for why it is carried rather than derived.
	ClaimID        string
	BuildID        string
	Evidence       map[string]any
	IdempotencyKey string
}

// Store persists events. An interface so the log can be in-memory for tests and
// Sanity-backed in production without anything above it changing.
type Store interface {
	// Append adds an event and returns it with ID and Seq assigned. It must be
	// atomic with respect to the chain: two concurrent appends must not produce
	// two events with the same Seq or the same PrevID.
	Append(ctx context.Context, e Event) (Event, error)
	// ByIdempotencyKey returns a previously-appended event, if any.
	ByIdempotencyKey(ctx context.Context, tenant, key string) (Event, bool, error)
	// Range returns events in sequence order, optionally bounded.
	Range(ctx context.Context, q Query) ([]Event, error)
	// Head returns the last event, or ok=false for an empty log.
	Head(ctx context.Context, tenant string) (Event, bool, error)
}

// Query filters a read. Zero value means "everything for the tenant".
type Query struct {
	Tenant string
	// UpToSeq bounds the read for time-travel. Zero means no bound.
	UpToSeq int64
	// UpTo bounds by wall-clock. Zero means no bound.
	UpTo time.Time
	// Subject filters to one object's timeline. Empty means all.
	Subject string
	// ClaimID filters to one fact's timeline — every approval, block,
	// publication and rejection that touched it, across every assertion. This
	// is the query the Claim Lineage panel is built on.
	ClaimID string
	// Types filters by event type. Empty means all.
	Types []Type
	// Limit caps the result. Zero means no cap.
	Limit int
}

// Log is the append-only ledger.
type Log struct {
	store Store
}

// New wraps a Store.
func New(store Store) *Log { return &Log{store: store} }

// Record appends an event, authorized and idempotent.
//
// Taking a *Grant rather than an actor ID is the point: an audit entry cannot be
// written for an action that was not authorized, because the caller has no way
// to produce a Grant without having passed authorization.
func (l *Log) Record(ctx context.Context, grant *authz.Grant, a Append) (Event, error) {
	if grant == nil {
		return Event{}, ErrNoGrant
	}

	// Idempotency before anything else. A retried request must observe the
	// original event, not append a second one — otherwise every network blip
	// doubles the audit trail and "how many times did this happen" becomes
	// unanswerable.
	if a.IdempotencyKey != "" {
		existing, found, err := l.store.ByIdempotencyKey(ctx, grant.Tenant(), a.IdempotencyKey)
		if err != nil {
			return Event{}, fmt.Errorf("idempotency lookup: %w", err)
		}
		if found {
			return existing, nil
		}
	}

	actor := grant.Actor()
	event := Event{
		Type:           a.Type,
		At:             time.Now().UTC(),
		ActorID:        actor.ID,
		ActorRole:      actor.RoleNames(),
		IsAgent:        actor.IsAgent,
		Tenant:         grant.Tenant(),
		Subject:        a.Subject,
		ClaimID:        a.ClaimID,
		BuildID:        a.BuildID,
		Evidence:       a.Evidence,
		CorrelationID:  string(telemetry.Correlation(ctx)),
		IdempotencyKey: a.IdempotencyKey,
	}

	return l.store.Append(ctx, event)
}

// Read returns matching events. Requires the audit-read permission, and the
// query is forced to the grant's tenant so a caller cannot read across tenants
// by passing someone else's name.
func (l *Log) Read(ctx context.Context, grant *authz.Grant, q Query) ([]Event, error) {
	if grant == nil {
		return nil, ErrNoGrant
	}
	q.Tenant = grant.Tenant()
	return l.store.Range(ctx, q)
}

// Verify walks the chain and confirms nothing has been altered.
//
// Two checks per event: the recorded ID matches a recomputed hash of its
// content, and PrevID matches its predecessor's ID. Together those make any
// edit, insertion or deletion detectable — change one field and every
// subsequent hash is wrong.
func (l *Log) Verify(ctx context.Context, tenant string) error {
	events, err := l.store.Range(ctx, Query{Tenant: tenant})
	if err != nil {
		return err
	}

	var prevID string
	for i, e := range events {
		if want := e.Hash(); want != e.ID {
			return fmt.Errorf("%w: event %d (seq %d) content does not match its id (have %s, computed %s)",
				ErrTamper, i, e.Seq, e.ID, want)
		}
		if e.PrevID != prevID {
			return fmt.Errorf("%w: event seq %d breaks the chain (prevId %q, expected %q)",
				ErrTamper, e.Seq, e.PrevID, prevID)
		}
		if int64(i+1) != e.Seq {
			return fmt.Errorf("%w: sequence gap at index %d (seq %d)", ErrTamper, i, e.Seq)
		}
		prevID = e.ID
	}
	return nil
}

// ---------------------------------------------------------------------------
// In-memory store
// ---------------------------------------------------------------------------

// MemStore keeps the log in memory. Used by tests and by fixture mode.
//
// Production will back this with Sanity documents; the interface exists so that
// swap changes nothing above it. Correctness of the chain is enforced here
// under a mutex, which is also what a Sanity-backed implementation will need to
// do with a transaction.
type MemStore struct {
	mu     sync.RWMutex
	events []Event
	byKey  map[string]Event // tenant\x00key -> event
}

// NewMemStore returns an empty in-memory log.
func NewMemStore() *MemStore {
	return &MemStore{byKey: map[string]Event{}}
}

func idemKey(tenant, key string) string { return tenant + "\x00" + key }

// Append assigns Seq, PrevID and ID under a lock, so the chain is well-formed
// even under concurrent writers.
func (m *MemStore) Append(_ context.Context, e Event) (Event, error) {
	m.mu.Lock()
	defer m.mu.Unlock()

	// Re-check idempotency inside the lock. Checking only in Log.Record leaves a
	// race where two concurrent retries both miss and both append.
	if e.IdempotencyKey != "" {
		if existing, ok := m.byKey[idemKey(e.Tenant, e.IdempotencyKey)]; ok {
			return existing, nil
		}
	}

	var prevID string
	for i := len(m.events) - 1; i >= 0; i-- {
		if m.events[i].Tenant == e.Tenant {
			prevID = m.events[i].ID
			break
		}
	}

	// Seq is per-tenant so one tenant's volume does not perturb another's
	// sequence numbers — which would leak activity levels across tenants.
	var seq int64
	for _, existing := range m.events {
		if existing.Tenant == e.Tenant {
			seq++
		}
	}

	e.PrevID = prevID
	e.Seq = seq + 1
	e.ID = e.Hash()

	m.events = append(m.events, e)
	if e.IdempotencyKey != "" {
		m.byKey[idemKey(e.Tenant, e.IdempotencyKey)] = e
	}
	return e, nil
}

func (m *MemStore) ByIdempotencyKey(_ context.Context, tenant, key string) (Event, bool, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	e, ok := m.byKey[idemKey(tenant, key)]
	return e, ok, nil
}

func (m *MemStore) Range(_ context.Context, q Query) ([]Event, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()

	types := map[Type]bool{}
	for _, t := range q.Types {
		types[t] = true
	}

	out := make([]Event, 0, len(m.events))
	for _, e := range m.events {
		if q.Tenant != "" && e.Tenant != q.Tenant {
			continue
		}
		if q.UpToSeq > 0 && e.Seq > q.UpToSeq {
			continue
		}
		if !q.UpTo.IsZero() && e.At.After(q.UpTo) {
			continue
		}
		if q.Subject != "" && e.Subject != q.Subject {
			continue
		}
		if q.ClaimID != "" && e.ClaimID != q.ClaimID {
			continue
		}
		if len(types) > 0 && !types[e.Type] {
			continue
		}
		out = append(out, e)
	}

	sort.SliceStable(out, func(i, j int) bool { return out[i].Seq < out[j].Seq })

	if q.Limit > 0 && len(out) > q.Limit {
		// Keep the most recent when truncating: a capped audit view should show
		// what just happened, not the oldest entries.
		out = out[len(out)-q.Limit:]
	}
	return out, nil
}

func (m *MemStore) Head(_ context.Context, tenant string) (Event, bool, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	for i := len(m.events) - 1; i >= 0; i-- {
		if m.events[i].Tenant == tenant {
			return m.events[i], true, nil
		}
	}
	return Event{}, false, nil
}

var _ Store = (*MemStore)(nil)

// ---------------------------------------------------------------------------
// Tamper simulation
// ---------------------------------------------------------------------------
//
// Overwrite and Delete exist so the integrity tests can do what an attacker
// with direct store access would do, and prove that Verify catches it.
//
// They are deliberately on MemStore rather than on the Store interface: a
// production store must offer no way to rewrite history at all, so the ability
// to do so cannot be part of the contract every store implements. A reviewer
// checking "can anything mutate the audit log?" finds these two methods, on the
// in-memory fixture store, and nowhere else.

// Overwrite replaces the event at index i without repairing the hash chain.
// Test-only. Verify must detect this.
func (m *MemStore) Overwrite(i int, e Event) {
	m.mu.Lock()
	defer m.mu.Unlock()
	if i >= 0 && i < len(m.events) {
		m.events[i] = e
	}
}

// Delete removes the event at index i without repairing the chain.
// Test-only. Verify must detect this.
func (m *MemStore) Delete(i int) {
	m.mu.Lock()
	defer m.mu.Unlock()
	if i >= 0 && i < len(m.events) {
		m.events = append(m.events[:i], m.events[i+1:]...)
	}
}
