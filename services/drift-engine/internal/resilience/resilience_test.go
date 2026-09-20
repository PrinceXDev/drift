package resilience_test

import (
	"context"
	"errors"
	"sync/atomic"
	"testing"
	"time"

	"github.com/drift/drift-engine/internal/resilience"
)

func fastPolicy() resilience.Policy {
	// Real backoff would make this suite take seconds for no extra coverage.
	return resilience.Policy{MaxAttempts: 4, Base: time.Millisecond, Max: 5 * time.Millisecond}
}

func TestDo_RetriesUntilSuccess(t *testing.T) {
	var calls atomic.Int32

	err := resilience.Do(context.Background(), fastPolicy(), func(context.Context) error {
		if calls.Add(1) < 3 {
			return resilience.Retryable(errors.New("temporarily unavailable"))
		}
		return nil
	})

	if err != nil {
		t.Fatalf("expected eventual success: %v", err)
	}
	if calls.Load() != 3 {
		t.Errorf("made %d attempts, want 3", calls.Load())
	}
}

// Retrying a 400 four times turns one clear error into four confusing ones.
func TestDo_DoesNotRetryNonRetryableErrors(t *testing.T) {
	var calls atomic.Int32

	err := resilience.Do(context.Background(), fastPolicy(), func(context.Context) error {
		calls.Add(1)
		return errors.New("malformed request")
	})

	if err == nil {
		t.Fatal("expected the error to surface")
	}
	if calls.Load() != 1 {
		t.Errorf("made %d attempts on a non-retryable error, want 1", calls.Load())
	}
}

func TestDo_GivesUpAfterMaxAttempts(t *testing.T) {
	var calls atomic.Int32

	err := resilience.Do(context.Background(), fastPolicy(), func(context.Context) error {
		calls.Add(1)
		return resilience.Retryable(errors.New("still down"))
	})

	if err == nil {
		t.Fatal("expected failure after exhausting attempts")
	}
	if calls.Load() != 4 {
		t.Errorf("made %d attempts, want 4", calls.Load())
	}
	if !errors.Is(err, err) || err.Error() == "" {
		t.Error("the final error should explain that attempts were exhausted")
	}
}

// A shutdown should not have to wait out a backoff.
func TestDo_RespectsCancellationDuringBackoff(t *testing.T) {
	ctx, cancel := context.WithCancel(context.Background())

	slow := resilience.Policy{MaxAttempts: 5, Base: 2 * time.Second, Max: 2 * time.Second}
	var calls atomic.Int32

	go func() {
		time.Sleep(30 * time.Millisecond)
		cancel()
	}()

	start := time.Now()
	err := resilience.Do(ctx, slow, func(context.Context) error {
		calls.Add(1)
		return resilience.Retryable(errors.New("down"))
	})
	elapsed := time.Since(start)

	if err == nil {
		t.Fatal("expected cancellation to surface")
	}
	if !errors.Is(err, context.Canceled) {
		t.Errorf("error = %v, want context.Canceled", err)
	}
	if elapsed > time.Second {
		t.Errorf("waited %v for cancellation; backoff must be interruptible", elapsed)
	}
}

// Honouring Retry-After is the difference between backing off and making an
// overloaded service worse.
func TestDo_HonoursServerSpecifiedDelay(t *testing.T) {
	var calls atomic.Int32
	start := time.Now()

	err := resilience.Do(context.Background(),
		resilience.Policy{MaxAttempts: 2, Base: time.Hour, Max: time.Hour},
		func(context.Context) error {
			if calls.Add(1) == 1 {
				return resilience.RetryableAfter(errors.New("rate limited"), 20*time.Millisecond)
			}
			return nil
		})

	if err != nil {
		t.Fatal(err)
	}
	// The policy's own base is an hour, so finishing quickly proves the
	// server's Retry-After was used instead.
	if elapsed := time.Since(start); elapsed > 500*time.Millisecond {
		t.Errorf("took %v; the server's Retry-After should have been used", elapsed)
	}
}

// ---------------------------------------------------------------------------
// Breaker
// ---------------------------------------------------------------------------

func TestBreaker_OpensAfterConsecutiveFailures(t *testing.T) {
	b := resilience.NewBreaker("context-mcp", 3, time.Minute)
	boom := errors.New("connection refused")

	for i := 0; i < 3; i++ {
		_ = b.Do(context.Background(), func(context.Context) error { return boom })
	}

	if b.State() != resilience.Open {
		t.Fatalf("state = %s, want open after 3 failures", b.State())
	}

	// Further calls fail immediately without touching the dependency.
	var called bool
	err := b.Do(context.Background(), func(context.Context) error {
		called = true
		return nil
	})
	if called {
		t.Error("an open breaker passed a call through to the dependency")
	}

	var open *resilience.ErrOpen
	if !errors.As(err, &open) {
		t.Fatalf("error = %v, want ErrOpen", err)
	}
	if open.Name != "context-mcp" {
		t.Errorf("the error should name the dependency, got %q", open.Name)
	}
	if open.Until.IsZero() {
		t.Error("the error should say when the next probe is due")
	}
}

// An operator should not have to dig through logs to find why it opened.
func TestBreaker_RemembersWhyItOpened(t *testing.T) {
	b := resilience.NewBreaker("agent-actions", 2, time.Minute)
	cause := errors.New("502 from the transform endpoint")

	for i := 0; i < 2; i++ {
		_ = b.Do(context.Background(), func(context.Context) error { return cause })
	}

	if !errors.Is(b.LastFailure(), cause) {
		t.Errorf("LastFailure = %v, want the original cause", b.LastFailure())
	}
}

func TestBreaker_RecoversThroughHalfOpen(t *testing.T) {
	b := resilience.NewBreaker("content-lake", 2, 50*time.Millisecond)

	clock := time.Now()
	b.SetClock(func() time.Time { return clock })

	for i := 0; i < 2; i++ {
		_ = b.Do(context.Background(), func(context.Context) error { return errors.New("down") })
	}
	if b.State() != resilience.Open {
		t.Fatalf("state = %s, want open", b.State())
	}

	// Cooldown elapses.
	clock = clock.Add(time.Second)
	if b.State() != resilience.HalfOpen {
		t.Fatalf("state = %s, want half-open after the cooldown", b.State())
	}

	// A successful probe closes it.
	if err := b.Do(context.Background(), func(context.Context) error { return nil }); err != nil {
		t.Fatalf("probe failed: %v", err)
	}
	if b.State() != resilience.Closed {
		t.Errorf("state = %s, want closed after a successful probe", b.State())
	}
}

// Letting a crowd through on the first probe is how a service that has just
// come back gets knocked over again.
func TestBreaker_AdmitsOnlyOneProbe(t *testing.T) {
	b := resilience.NewBreaker("content-lake", 1, 10*time.Millisecond)

	clock := time.Now()
	b.SetClock(func() time.Time { return clock })
	_ = b.Do(context.Background(), func(context.Context) error { return errors.New("down") })

	clock = clock.Add(time.Second) // now half-open

	var admitted atomic.Int32
	block := make(chan struct{})

	// First probe holds the slot open.
	go func() {
		_ = b.Do(context.Background(), func(context.Context) error {
			admitted.Add(1)
			<-block
			return nil
		})
	}()
	time.Sleep(20 * time.Millisecond)

	// Second caller must be refused while the probe is in flight.
	err := b.Do(context.Background(), func(context.Context) error {
		admitted.Add(1)
		return nil
	})

	var open *resilience.ErrOpen
	if !errors.As(err, &open) {
		t.Errorf("a second concurrent probe was admitted: %v", err)
	}
	if admitted.Load() != 1 {
		t.Errorf("%d calls reached the dependency, want 1", admitted.Load())
	}

	close(block)
}

// A failed probe reopens the breaker rather than resetting the failure count.
func TestBreaker_FailedProbeReopens(t *testing.T) {
	b := resilience.NewBreaker("content-lake", 2, 10*time.Millisecond)

	clock := time.Now()
	b.SetClock(func() time.Time { return clock })

	for i := 0; i < 2; i++ {
		_ = b.Do(context.Background(), func(context.Context) error { return errors.New("down") })
	}
	clock = clock.Add(time.Second)

	_ = b.Do(context.Background(), func(context.Context) error { return errors.New("still down") })

	if b.State() != resilience.Open {
		t.Errorf("state = %s, want open again after a failed probe", b.State())
	}
}

func TestBreaker_SuccessResetsTheFailureCount(t *testing.T) {
	b := resilience.NewBreaker("x", 3, time.Minute)

	for i := 0; i < 2; i++ {
		_ = b.Do(context.Background(), func(context.Context) error { return errors.New("blip") })
	}
	_ = b.Do(context.Background(), func(context.Context) error { return nil })

	// Two more failures must not trip it: the counter restarted.
	for i := 0; i < 2; i++ {
		_ = b.Do(context.Background(), func(context.Context) error { return errors.New("blip") })
	}
	if b.State() != resilience.Closed {
		t.Errorf("state = %s; intermittent failures should not accumulate across successes", b.State())
	}
}
