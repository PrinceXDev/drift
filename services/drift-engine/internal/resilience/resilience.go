// Package resilience holds the retry, backoff and circuit-breaker primitives
// used wherever DRIFT talks to something it does not control.
//
// # Why this is a package and not a helper in each caller
//
// There are three outbound dependencies — Context MCP, Agent Actions, and the
// Content Lake mutation API — and they fail in the same ways: a transient 5xx, a
// 429, a connection reset, a hung socket. Written per-caller, the retry policy
// drifts and only one of them ends up honouring `Retry-After`.
//
// # The rule that matters most
//
// **Only idempotent operations are retried.** A retry is a second attempt at the
// same effect, and that is only safe when repeating the effect is harmless. The
// caller says so explicitly: `Do` takes an operation that returns a
// `Retryable` error or not, rather than this package guessing from a status code.
//
// A publication retried blindly could publish twice. The write client therefore
// sends a deterministic transaction ID, so a repeat is the *same* transaction
// rather than a second one.
package resilience

import (
	"context"
	"errors"
	"fmt"
	"math"
	"math/rand"
	"sync"
	"time"
)

// ---------------------------------------------------------------------------
// Retry
// ---------------------------------------------------------------------------

// Policy configures backoff.
type Policy struct {
	// MaxAttempts includes the first try. 1 disables retrying.
	MaxAttempts int
	// Base is the first delay; each subsequent delay doubles it.
	Base time.Duration
	// Max caps a single delay.
	Max time.Duration
	// Jitter spreads retries so that a fleet recovering from an outage does not
	// synchronise into a thundering herd against a service that has only just
	// come back.
	Jitter float64
}

// DefaultPolicy is tuned for a content API: quick first retry for a blip, and a
// short total budget, because a person is usually waiting.
func DefaultPolicy() Policy {
	return Policy{MaxAttempts: 4, Base: 250 * time.Millisecond, Max: 4 * time.Second, Jitter: 0.3}
}

// retryable marks an error as worth another attempt.
type retryable struct {
	err   error
	after time.Duration // honours Retry-After when the server sent one
}

func (r retryable) Error() string { return r.err.Error() }
func (r retryable) Unwrap() error { return r.err }

// Retryable wraps an error to say "this may succeed if tried again".
//
// Callers must only use it for operations whose effect is safe to repeat.
func Retryable(err error) error {
	return retryable{err: err}
}

// RetryableAfter is Retryable plus a server-specified delay, for 429 responses
// that carry Retry-After. Honouring it is the difference between backing off and
// making an overloaded service worse.
func RetryableAfter(err error, after time.Duration) error {
	return retryable{err: err, after: after}
}

// IsRetryable reports whether an error was marked as worth retrying.
func IsRetryable(err error) bool {
	var r retryable
	return errors.As(err, &r)
}

// Do runs op until it succeeds, returns a non-retryable error, or exhausts the
// policy.
//
// Every wait respects context cancellation, so a shutdown does not have to wait
// out a four-second backoff.
func Do(ctx context.Context, p Policy, op func(ctx context.Context) error) error {
	if p.MaxAttempts < 1 {
		p = DefaultPolicy()
	}

	var lastErr error
	for attempt := 1; attempt <= p.MaxAttempts; attempt++ {
		if err := ctx.Err(); err != nil {
			return fmt.Errorf("giving up after %d attempt(s): %w", attempt-1, err)
		}

		err := op(ctx)
		if err == nil {
			return nil
		}
		lastErr = err

		var r retryable
		if !errors.As(err, &r) {
			// Not retryable. Returning immediately matters: retrying a 400 four
			// times turns one clear error into four confusing ones.
			return err
		}
		if attempt == p.MaxAttempts {
			break
		}

		wait := r.after
		if wait <= 0 {
			wait = backoff(p, attempt)
		}

		timer := time.NewTimer(wait)
		select {
		case <-ctx.Done():
			timer.Stop()
			return fmt.Errorf("cancelled during backoff after %d attempt(s): %w", attempt, ctx.Err())
		case <-timer.C:
		}
	}

	return fmt.Errorf("exhausted %d attempts: %w", p.MaxAttempts, lastErr)
}

func backoff(p Policy, attempt int) time.Duration {
	delay := float64(p.Base) * math.Pow(2, float64(attempt-1))
	if p.Jitter > 0 {
		// Full-spectrum jitter in both directions, so retries spread rather than
		// merely shifting the whole herd later.
		delay *= 1 + p.Jitter*(rand.Float64()*2-1)
	}
	if delay < 0 {
		delay = float64(p.Base)
	}
	if capped := float64(p.Max); delay > capped {
		delay = capped
	}
	return time.Duration(delay)
}

// ---------------------------------------------------------------------------
// Circuit breaker
// ---------------------------------------------------------------------------

// State of a breaker.
type State string

const (
	// Closed: traffic flows normally.
	Closed State = "closed"
	// Open: the dependency is failing, so calls fail immediately instead of
	// queueing behind a service that cannot answer.
	Open State = "open"
	// HalfOpen: one probe is allowed through to see whether it has recovered.
	HalfOpen State = "half-open"
)

// ErrOpen is returned while the breaker is open.
//
// It names the dependency and when the next probe is due, because "circuit
// open" alone tells an operator nothing they can act on.
type ErrOpen struct {
	Name  string
	Until time.Time
}

func (e *ErrOpen) Error() string {
	return fmt.Sprintf("%s is unavailable: circuit open, next probe at %s",
		e.Name, e.Until.UTC().Format(time.RFC3339))
}

// Breaker stops hammering a dependency that is already failing.
//
// # Why DRIFT needs one
//
// The poll ticker runs every five minutes and the console holds open streams.
// When the Knowledge Base endpoint is down, retrying every call from every
// caller turns our outage into their outage too — and, worse, fills the logs
// with noise that hides the one error that explains it.
//
// Opening the circuit also gives the rest of the system a clean signal to
// degrade to the last known-good build rather than discovering failure one
// timeout at a time.
type Breaker struct {
	name      string
	threshold int
	cooldown  time.Duration

	mu          sync.Mutex
	failures    int
	state       State
	openedAt    time.Time
	probing     bool
	lastFailure error
	now         func() time.Time // injectable for tests
}

// NewBreaker returns a closed breaker that opens after `threshold` consecutive
// failures and probes again after `cooldown`.
func NewBreaker(name string, threshold int, cooldown time.Duration) *Breaker {
	if threshold < 1 {
		threshold = 5
	}
	if cooldown <= 0 {
		cooldown = 30 * time.Second
	}
	return &Breaker{
		name: name, threshold: threshold, cooldown: cooldown,
		state: Closed, now: time.Now,
	}
}

// State reports the current state, for health endpoints and logs.
func (b *Breaker) State() State {
	b.mu.Lock()
	defer b.mu.Unlock()
	b.refresh()
	return b.state
}

// LastFailure reports why the breaker opened, so an operator does not have to
// go and find the original error in the logs.
func (b *Breaker) LastFailure() error {
	b.mu.Lock()
	defer b.mu.Unlock()
	return b.lastFailure
}

// refresh moves an expired Open into HalfOpen. Caller holds the lock.
func (b *Breaker) refresh() {
	if b.state == Open && b.now().Sub(b.openedAt) >= b.cooldown {
		b.state = HalfOpen
		b.probing = false
	}
}

// Do runs op unless the circuit is open.
//
// In HalfOpen exactly one call is admitted. Letting a crowd through on the first
// probe is how a service that has just come back gets knocked over again.
func (b *Breaker) Do(ctx context.Context, op func(ctx context.Context) error) error {
	if err := b.admit(); err != nil {
		return err
	}

	err := op(ctx)

	b.mu.Lock()
	defer b.mu.Unlock()

	if err != nil {
		b.failures++
		b.lastFailure = err
		if b.state == HalfOpen || b.failures >= b.threshold {
			b.state = Open
			b.openedAt = b.now()
		}
		b.probing = false
		return err
	}

	b.failures = 0
	b.lastFailure = nil
	b.state = Closed
	b.probing = false
	return nil
}

func (b *Breaker) admit() error {
	b.mu.Lock()
	defer b.mu.Unlock()
	b.refresh()

	switch b.state {
	case Open:
		return &ErrOpen{Name: b.name, Until: b.openedAt.Add(b.cooldown)}
	case HalfOpen:
		if b.probing {
			return &ErrOpen{Name: b.name, Until: b.openedAt.Add(b.cooldown)}
		}
		b.probing = true
		return nil
	default:
		return nil
	}
}

// SetClock replaces the time source. Test-only; keeps breaker tests fast and
// deterministic rather than sleeping through real cooldowns.
func (b *Breaker) SetClock(now func() time.Time) {
	b.mu.Lock()
	defer b.mu.Unlock()
	b.now = now
}
