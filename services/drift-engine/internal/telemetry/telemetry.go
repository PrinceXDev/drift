// Package telemetry carries correlation through the system.
//
// Every externally-triggered action gets a correlation ID at the edge, and that
// ID travels with the request context through authorization, the gate, the
// event log and out into the logs. When something goes wrong at 2am, one grep
// reconstructs the whole causal chain: which actor, which build, which claim,
// which decision, which failure.
//
// # Why redaction lives here
//
// DRIFT indexes an organisation's policy documents. Those documents contain
// prices, contract terms, customer names and occasionally things nobody
// intended to publish. Structured logs are the easiest place to leak all of it
// by accident — a single `slog.Info("claim", "statement", claim.Statement)` and
// a contract clause is in a log aggregator with a six-month retention.
//
// So the logger here refuses to take free text. Callers log identifiers,
// hashes, counts and enums. When human-readable content genuinely must appear,
// `Excerpt` truncates and marks it, so the log records that content existed
// without reproducing it in full.
package telemetry

import (
	"context"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"log/slog"
	"strings"
	"time"
)

type ctxKey int

const (
	correlationKey ctxKey = iota
	actorKey
)

// CorrelationID identifies one externally-triggered action and everything it caused.
type CorrelationID string

// NewCorrelationID mints an ID. Prefixed so it is obvious in a log line what
// kind of thing it identifies.
func NewCorrelationID() CorrelationID {
	var b [12]byte
	if _, err := rand.Read(b[:]); err != nil {
		// A correlation ID is diagnostic, never a security boundary. Falling back
		// to a timestamp keeps the request alive; an unreadable trace is a much
		// smaller problem than a failed mutation.
		return CorrelationID(fmt.Sprintf("cor_ts_%d", time.Now().UnixNano()))
	}
	return CorrelationID("cor_" + hex.EncodeToString(b[:]))
}

// WithCorrelation attaches an ID to the context.
func WithCorrelation(ctx context.Context, id CorrelationID) context.Context {
	return context.WithValue(ctx, correlationKey, id)
}

// Correlation reads the ID, minting one if the context has none. Never returns
// empty: an unlabelled log line is worse than a synthetic label.
func Correlation(ctx context.Context) CorrelationID {
	if id, ok := ctx.Value(correlationKey).(CorrelationID); ok && id != "" {
		return id
	}
	return NewCorrelationID()
}

// WithActor records who is responsible for the work in this context.
func WithActor(ctx context.Context, actorID string) context.Context {
	return context.WithValue(ctx, actorKey, actorID)
}

// Actor reads the responsible party, or "system" for internal work such as the
// poll ticker. Never empty, because "an action with no actor" is not a state
// the audit trail should be able to represent.
func Actor(ctx context.Context) string {
	if id, ok := ctx.Value(actorKey).(string); ok && id != "" {
		return id
	}
	return "system"
}

// Logger returns a logger pre-tagged with the context's correlation and actor.
func Logger(ctx context.Context, base *slog.Logger) *slog.Logger {
	return base.With(
		slog.String("correlation_id", string(Correlation(ctx))),
		slog.String("actor", Actor(ctx)),
	)
}

// ---------------------------------------------------------------------------
// Redaction
// ---------------------------------------------------------------------------

// MaxExcerpt is how much content may appear in a log line.
const MaxExcerpt = 48

// Excerpt renders content safe to log.
//
// Returns a truncated prefix plus a content hash. The hash is what makes this
// useful rather than merely cautious: two log lines with the same hash refer to
// the same text, so a support engineer can correlate occurrences without any
// line ever containing the full statement.
func Excerpt(content string) string {
	trimmed := strings.TrimSpace(content)
	if trimmed == "" {
		return "<empty>"
	}

	sum := sha256.Sum256([]byte(trimmed))
	digest := hex.EncodeToString(sum[:])[:8]

	if len(trimmed) <= MaxExcerpt {
		return fmt.Sprintf("%q#%s", trimmed, digest)
	}
	return fmt.Sprintf("%q…(+%d)#%s", trimmed[:MaxExcerpt], len(trimmed)-MaxExcerpt, digest)
}

// Fingerprint reduces content to a stable short hash with no prefix at all.
// Used where even a truncated excerpt is too much — token material, source
// bodies, anything a viewer has not been authorised to see.
func Fingerprint(content string) string {
	sum := sha256.Sum256([]byte(content))
	return "sha256:" + hex.EncodeToString(sum[:])[:12]
}

// RedactToken renders a credential loggable: its shape, never its value.
//
// Called wherever a token might otherwise reach a log line — an auth failure
// path is exactly where somebody reaches for "let me just log what was sent".
func RedactToken(token string) string {
	if token == "" {
		return "<none>"
	}
	return fmt.Sprintf("<token len=%d %s>", len(token), Fingerprint(token))
}
