// Package remediation is the vertical slice: turning a detected drift into a
// published, verified correction, with a human in the middle.
//
// # The order of operations is the design
//
//	authenticate  -> who is this
//	authorize     -> may they, in this tenant, for this resource
//	gate          -> should this still be published at all
//	record        -> append the decision before acting on it
//	apply         -> perform the publication
//	record        -> append the outcome
//
// Two details in that list are deliberate and easy to get wrong.
//
// The gate runs *after* authorization but *before* any write. An unauthorized
// caller must not be able to learn what the gate would have said — the checks
// disclose which pages depend on a claim, which is exactly the map an attacker
// would want.
//
// The decision is recorded *before* the publication is applied, not after. If
// the process dies mid-publish, the audit trail says "we decided to publish and
// then something happened", which is recoverable. The reverse ordering loses
// the fact that a decision was ever made.
//
// # Idempotency
//
// Approval is keyed on (assertion, build, actor). Approving twice — a double
// click, a retried request, a replayed queue message — records once and
// publishes once. The key includes the build so that re-approving after a
// rebuild is correctly treated as a new decision rather than a duplicate.
package remediation

import (
	"context"
	"errors"
	"fmt"
	"log/slog"

	"github.com/drift/drift-engine/internal/authz"
	"github.com/drift/drift-engine/internal/eventlog"
	"github.com/drift/drift-engine/internal/gate"
	"github.com/drift/drift-engine/internal/telemetry"
	"github.com/drift/drift-engine/pkg/driftv1"
)

// PublishRequest is one approved correction, ready to write.
//
// A struct rather than five positional strings. The earlier signature was
// `Publish(ctx, assertionID, blockKey, text, buildID string)` — five arguments
// of the same type, in an order nothing enforces. Transposing two of them would
// have compiled and written the wrong thing to the wrong place.
type PublishRequest struct {
	AssertionID string
	PageID      string
	// BlockKey addresses the paragraph by Portable Text `_key`, never by
	// position — see ADR-0007.
	BlockKey string
	Text     string
	// BuildID is stamped onto the assertion, so staleness stays derived rather
	// than remembered.
	BuildID string
	// IdempotencyKey makes the write safe to retry. The Content Lake publisher
	// turns it into a deterministic transaction ID.
	IdempotencyKey string
}

// Publisher applies an approved correction to published content.
//
// Defined here rather than imported from the infrastructure package, so this
// package depends on nothing below it. `cmd/engine` adapts the Content Lake
// client to this shape.
//
// Nothing here fabricates a success when the publisher is absent: a nil
// publisher is a configuration error, reported as one.
type Publisher interface {
	// Publish must be idempotent on (AssertionID, BuildID), and must write the
	// page text and the assertion stamp atomically. A page corrected without its
	// assertion re-stamped leaves the Control Room nagging about finished work;
	// the reverse is a false clean bill of health.
	Publish(ctx context.Context, req PublishRequest) error
}

// CorpusReader supplies current belief.
type CorpusReader interface {
	CurrentBuild(ctx context.Context) (driftv1.BuildSnapshot, error)
	Assertion(ctx context.Context, id string) (driftv1.Assertion, bool, error)
}

// Draft is a proposed correction awaiting a decision.
type Draft struct {
	AssertionID         string   `json:"assertionId"`
	ProposedText        string   `json:"proposedText"`
	DraftedAgainstBuild string   `json:"draftedAgainstBuild"`
	DraftedBlastRadius  []string `json:"draftedBlastRadius"`
	TouchedFieldPath    string   `json:"touchedFieldPath"`
	// DraftedBy records which agent produced it, so an approval is always an
	// approval *of something by someone*, never an anonymous act.
	DraftedBy string `json:"draftedBy"`
}

// Outcome is what happened to an approval attempt.
type Outcome struct {
	Applied  bool          `json:"applied"`
	Decision gate.Decision `json:"decision"`
	// EventID is the audit entry. Returned so a caller can link straight to the
	// record of their own action.
	EventID string `json:"eventId"`
	// Duplicate reports that this exact approval had already been processed.
	Duplicate bool `json:"duplicate"`
}

var (
	ErrNoPublisher      = errors.New("no publisher configured: refusing to report a publication that did not happen")
	ErrUnknownAssertion = errors.New("assertion not found")
)

// Service performs remediation decisions.
type Service struct {
	gate      *gate.Gate
	log       *eventlog.Log
	corpus    CorpusReader
	publisher Publisher
	logger    *slog.Logger
}

// New wires the service. A nil publisher is allowed at construction — the
// service is still useful for evaluating gates and recording rejections — but
// any attempt to actually publish will fail loudly rather than pretend.
func New(g *gate.Gate, log *eventlog.Log, corpus CorpusReader, pub Publisher, logger *slog.Logger) *Service {
	return &Service{gate: g, log: log, corpus: corpus, publisher: pub, logger: logger}
}

// Preview evaluates the gate without deciding anything.
//
// This is "preview the blast radius before publishing": the operator sees every
// check, the recomputed dependency set, and what would happen — before they
// commit to it. It requires only the simulate permission, so a viewer-adjacent
// role can inspect consequences without being able to cause them.
func (s *Service) Preview(ctx context.Context, grant *authz.Grant, draft Draft) (gate.Decision, error) {
	if grant == nil {
		return gate.Decision{}, authz.ErrNoActor
	}

	build, assertion, err := s.load(ctx, draft.AssertionID)
	if err != nil {
		return gate.Decision{}, err
	}

	decision, err := s.gate.Evaluate(ctx, grant, request(draft, assertion), gate.Corpus{Build: build})
	if err != nil {
		return gate.Decision{}, err
	}

	telemetry.Logger(ctx, s.logger).Info("gate preview",
		slog.String("assertion", draft.AssertionID),
		slog.String("build", build.ID),
		slog.Bool("would_allow", decision.Allowed),
		slog.String("reason", decision.Reason()),
		slog.Int("blast_radius", len(decision.BlastRadius)))

	return decision, nil
}

// Approve runs the gate and, if it passes, publishes.
//
// The grant must carry PermApprovePublish, which no agent can hold — and
// MustBeHuman inside the gate is an independent second check on the same fact.
func (s *Service) Approve(ctx context.Context, grant *authz.Grant, draft Draft) (Outcome, error) {
	if grant == nil {
		return Outcome{}, authz.ErrNoActor
	}
	if grant.Permission() != authz.PermApprovePublish {
		return Outcome{}, fmt.Errorf("%w: approval needs %s, grant carries %s",
			authz.ErrDenied, authz.PermApprovePublish, grant.Permission())
	}

	build, assertion, err := s.load(ctx, draft.AssertionID)
	if err != nil {
		return Outcome{}, err
	}
	log := telemetry.Logger(ctx, s.logger).With(
		slog.String("assertion", draft.AssertionID),
		slog.String("build", build.ID))

	decision, err := s.gate.Evaluate(ctx, grant, request(draft, assertion), gate.Corpus{Build: build})
	if err != nil {
		return Outcome{}, fmt.Errorf("evaluate gate: %w", err)
	}

	// The key includes the build: re-approving after a rebuild is a genuinely
	// new decision, not a duplicate of the old one.
	key := fmt.Sprintf("approve:%s:%s:%s", draft.AssertionID, build.ID, grant.ActorID())

	if !decision.Allowed {
		// A blocked publication is recorded. "Somebody tried and the system said
		// no" is exactly the kind of thing an audit trail exists to remember.
		event, err := s.log.Record(ctx, grant, eventlog.Append{
			Type:           eventlog.PublicationBlocked,
			Subject:        draft.AssertionID,
			ClaimID:        assertion.ClaimID,
			BuildID:        build.ID,
			Evidence:       blockedEvidence(decision, draft),
			IdempotencyKey: key + ":blocked",
		})
		if err != nil {
			return Outcome{}, fmt.Errorf("record blocked publication: %w", err)
		}
		log.Warn("publication blocked", slog.String("reason", decision.Reason()))
		return Outcome{Applied: false, Decision: decision, EventID: event.ID}, nil
	}

	// Record the decision before acting on it. If the process dies mid-publish,
	// the trail says a decision was made — which is recoverable. Recording after
	// would lose that fact entirely.
	approved, err := s.log.Record(ctx, grant, eventlog.Append{
		Type:           eventlog.CorrectionApproved,
		Subject:        draft.AssertionID,
		ClaimID:        assertion.ClaimID,
		BuildID:        build.ID,
		Evidence:       approvedEvidence(decision, draft, assertion),
		IdempotencyKey: key,
	})
	if err != nil {
		return Outcome{}, fmt.Errorf("record approval: %w", err)
	}

	// The event log answered from its idempotency index, so this approval has
	// already been processed. Return without publishing again.
	if approved.IdempotencyKey == key && approved.Seq > 0 && s.alreadyPublished(ctx, grant, draft, build.ID) {
		log.Info("approval already processed", slog.String("event", approved.ID))
		return Outcome{Applied: true, Decision: decision, EventID: approved.ID, Duplicate: true}, nil
	}

	if s.publisher == nil {
		// Never report a publication that did not happen. The approval stands in
		// the audit trail; the publication does not.
		log.Error("no publisher configured")
		return Outcome{Applied: false, Decision: decision, EventID: approved.ID}, ErrNoPublisher
	}

	if err := s.publisher.Publish(ctx, PublishRequest{
		AssertionID:    assertion.ID,
		PageID:         assertion.PageID,
		BlockKey:       assertion.BlockKey,
		Text:           draft.ProposedText,
		BuildID:        build.ID,
		IdempotencyKey: key,
	}); err != nil {
		log.Error("publish failed", slog.String("err", err.Error()))
		return Outcome{Applied: false, Decision: decision, EventID: approved.ID},
			fmt.Errorf("publish: %w", err)
	}

	done, err := s.log.Record(ctx, grant, eventlog.Append{
		Type:    eventlog.PublicationDone,
		Subject: draft.AssertionID,
		ClaimID: assertion.ClaimID,
		BuildID: build.ID,
		Evidence: map[string]any{
			"approvalEvent": approved.ID,
			"blockKey":      assertion.BlockKey,
			"textDigest":    telemetry.Fingerprint(draft.ProposedText),
			"blastRadius":   len(decision.BlastRadius),
		},
		IdempotencyKey: key + ":published",
	})
	if err != nil {
		// The content is live but the completion record failed. Say so rather
		// than swallowing it: a gap in the trail must be visible.
		log.Error("published but failed to record completion", slog.String("err", err.Error()))
		return Outcome{Applied: true, Decision: decision, EventID: approved.ID},
			fmt.Errorf("published, but the audit record failed: %w", err)
	}

	log.Info("publication completed",
		slog.String("event", done.ID),
		slog.Int("blast_radius", len(decision.BlastRadius)))

	return Outcome{Applied: true, Decision: decision, EventID: done.ID}, nil
}

// Reject records a human declining a draft.
//
// Recorded rather than discarded: "a person looked at this and said no" is a
// fact about the organisation's knowledge, and a drafter that keeps proposing
// the same rejected correction is something the ledger should make visible.
func (s *Service) Reject(ctx context.Context, grant *authz.Grant, draft Draft, reason string) (Outcome, error) {
	if grant == nil {
		return Outcome{}, authz.ErrNoActor
	}

	build, assertion, err := s.load(ctx, draft.AssertionID)
	if err != nil {
		return Outcome{}, err
	}

	event, err := s.log.Record(ctx, grant, eventlog.Append{
		Type:    eventlog.CorrectionRejected,
		Subject: draft.AssertionID,
		ClaimID: assertion.ClaimID,
		BuildID: build.ID,
		Evidence: map[string]any{
			"reason":     telemetry.Excerpt(reason),
			"draftedBy":  draft.DraftedBy,
			"textDigest": telemetry.Fingerprint(draft.ProposedText),
		},
		IdempotencyKey: fmt.Sprintf("reject:%s:%s:%s", draft.AssertionID, build.ID, grant.ActorID()),
	})
	if err != nil {
		return Outcome{}, err
	}

	telemetry.Logger(ctx, s.logger).Info("correction rejected",
		slog.String("assertion", draft.AssertionID),
		slog.String("event", event.ID))

	return Outcome{Applied: false, EventID: event.ID}, nil
}

// ---------------------------------------------------------------------------

func (s *Service) load(ctx context.Context, assertionID string) (driftv1.BuildSnapshot, driftv1.Assertion, error) {
	build, err := s.corpus.CurrentBuild(ctx)
	if err != nil {
		return driftv1.BuildSnapshot{}, driftv1.Assertion{}, fmt.Errorf("read current build: %w", err)
	}
	assertion, found, err := s.corpus.Assertion(ctx, assertionID)
	if err != nil {
		return driftv1.BuildSnapshot{}, driftv1.Assertion{}, fmt.Errorf("read assertion: %w", err)
	}
	if !found {
		return driftv1.BuildSnapshot{}, driftv1.Assertion{},
			fmt.Errorf("%w: %s", ErrUnknownAssertion, assertionID)
	}
	return build, assertion, nil
}

// alreadyPublished checks whether a completion record exists for this approval.
func (s *Service) alreadyPublished(ctx context.Context, grant *authz.Grant, draft Draft, buildID string) bool {
	events, err := s.log.Read(ctx, grant, eventlog.Query{
		Subject: draft.AssertionID,
		Types:   []eventlog.Type{eventlog.PublicationDone},
	})
	if err != nil {
		return false
	}
	for _, e := range events {
		if e.BuildID == buildID {
			return true
		}
	}
	return false
}

func request(draft Draft, assertion driftv1.Assertion) gate.Request {
	return gate.Request{
		Assertion:           assertion,
		ProposedText:        draft.ProposedText,
		DraftedAgainstBuild: draft.DraftedAgainstBuild,
		DraftedBlastRadius:  draft.DraftedBlastRadius,
		TouchedFieldPath:    draft.TouchedFieldPath,
	}
}

// blockedEvidence records why, in machine-readable form. Check names and
// booleans, never the content of the page.
func blockedEvidence(d gate.Decision, draft Draft) map[string]any {
	failed := make([]string, 0, len(d.Checks))
	for _, c := range d.Blocked() {
		failed = append(failed, string(c.Name))
	}
	return map[string]any{
		"failedChecks":   failed,
		"reason":         d.Reason(),
		"draftedBy":      draft.DraftedBy,
		"draftedAgainst": draft.DraftedAgainstBuild,
		"textDigest":     telemetry.Fingerprint(draft.ProposedText),
	}
}

// approvedEvidence is the answer to "why was this allowed?", six months later.
func approvedEvidence(d gate.Decision, draft Draft, assertion driftv1.Assertion) map[string]any {
	passed := make([]string, 0, len(d.Checks))
	for _, c := range d.Checks {
		if c.Passed {
			passed = append(passed, string(c.Name))
		}
	}
	return map[string]any{
		"passedChecks": passed,
		"claimId":      assertion.ClaimID,
		"fieldPath":    assertion.FieldPath,
		"blockKey":     assertion.BlockKey,
		"blastRadius":  len(d.BlastRadius),
		"draftedBy":    draft.DraftedBy,
		"beforeDigest": telemetry.Fingerprint(assertion.RenderedText),
		"afterDigest":  telemetry.Fingerprint(draft.ProposedText),
	}
}
