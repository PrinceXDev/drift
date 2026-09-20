package contentlake_test

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync/atomic"
	"testing"

	"github.com/drift/drift-engine/internal/contentlake"
)

func quiet() *slog.Logger { return slog.New(slog.NewTextHandler(io.Discard, nil)) }

// fakeLake records what DRIFT sends to the Content Lake.
type fakeLake struct {
	t         *testing.T
	calls     atomic.Int32
	body      map[string]any
	query     map[string]string
	auth      string
	path      string
	status    int
	response  string
	failFirst int32 // fail this many calls before succeeding
}

func (f *fakeLake) handler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		n := f.calls.Add(1)

		f.auth = r.Header.Get("Authorization")
		f.path = r.URL.Path
		f.query = map[string]string{}
		for k, v := range r.URL.Query() {
			if len(v) > 0 {
				f.query[k] = v[0]
			}
		}
		if err := json.NewDecoder(r.Body).Decode(&f.body); err != nil {
			f.t.Fatalf("undecodable request: %v", err)
		}

		if n <= f.failFirst {
			w.WriteHeader(http.StatusBadGateway)
			_, _ = w.Write([]byte(`{"error":"upstream"}`))
			return
		}
		if f.status != 0 {
			w.WriteHeader(f.status)
			_, _ = w.Write([]byte(f.response))
			return
		}

		w.Header().Set("Content-Type", "application/json")
		_, _ = w.Write([]byte(`{"transactionId":"drift-abc","results":[
			{"operation":"patch","documentId":"page.returns"},
			{"operation":"patch","documentId":"assert.returns-1"}]}`))
	}
}

func newPublisher(t *testing.T, f *fakeLake) *contentlake.Publisher {
	t.Helper()
	srv := httptest.NewServer(f.handler())
	t.Cleanup(srv.Close)

	p, err := contentlake.New(contentlake.Config{
		ProjectID: "abc123", Dataset: "production", Token: "write-token",
		HTTPClient: srv.Client(), BaseURL: srv.URL, Logger: quiet(),
	})
	if err != nil {
		t.Fatalf("new publisher: %v", err)
	}
	return p
}

func request() contentlake.Request {
	return contentlake.Request{
		AssertionID:    "assert.returns-1",
		PageID:         "page.returns",
		BlockKey:       "b01",
		Text:           "You have 45 days from delivery to start a return.",
		BuildID:        "build.47",
		IdempotencyKey: "approve:assert.returns-1:build.47:dana",
	}
}

// The mutations the page and the assertion must both travel in.
func mutationsOf(t *testing.T, f *fakeLake) []map[string]any {
	t.Helper()
	raw, ok := f.body["mutations"].([]any)
	if !ok {
		t.Fatalf("no mutations in body: %+v", f.body)
	}
	out := make([]map[string]any, 0, len(raw))
	for _, m := range raw {
		out = append(out, m.(map[string]any))
	}
	return out
}

// ---------------------------------------------------------------------------

// The central guarantee: page text and assertion stamp in ONE transaction.
// Two requests would allow a corrected page whose integrity record still says
// stale — or an assertion marked verified against a page never updated, which
// is a false clean bill of health.
func TestPublish_PatchesPageAndAssertionInOneTransaction(t *testing.T) {
	f := &fakeLake{t: t}
	p := newPublisher(t, f)

	if err := p.Publish(context.Background(), request()); err != nil {
		t.Fatalf("publish: %v", err)
	}

	if f.calls.Load() != 1 {
		t.Errorf("made %d requests, want 1 — the two patches must be atomic", f.calls.Load())
	}

	mutations := mutationsOf(t, f)
	if len(mutations) != 2 {
		t.Fatalf("sent %d mutations, want 2", len(mutations))
	}

	var sawPage, sawAssertion bool
	for _, m := range mutations {
		patch := m["patch"].(map[string]any)
		set := patch["set"].(map[string]any)

		switch patch["id"] {
		case "page.returns":
			sawPage = true
			// Key-addressed, never positional — see ADR-0007.
			want := `body[_key=="b01"].children[0].text`
			if _, ok := set[want]; !ok {
				t.Errorf("page patch path is wrong; keys present: %v", keysOf(set))
			}
		case "assert.returns-1":
			sawAssertion = true
			if set["state"] != "verified" {
				t.Errorf("assertion state = %v, want verified", set["state"])
			}
			ref, ok := set["verifiedAgainstBuild"].(map[string]any)
			if !ok || ref["_ref"] != "build.47" {
				t.Errorf("assertion not stamped with the build: %v", set["verifiedAgainstBuild"])
			}
		}
	}
	if !sawPage || !sawAssertion {
		t.Error("both the page and its assertion must be patched")
	}
}

// The API version in the path needs its leading `v`.
//
// Without it the Content Lake answers `404 {"message":"no Route matched with
// those values"}` — an error that reads like a wrong project or a wrong
// dataset and says nothing about the version. This shipped broken: the gate
// passed, the approval was audited, and every real publication 404ed, because
// the fake lake here served any path at all.
//
// So the path is asserted, not just the body. A test double that answers
// whatever it is asked cannot fail the way production does.
func TestPublish_AddressesAVersionedAPIPath(t *testing.T) {
	f := &fakeLake{t: t}
	p := newPublisher(t, f)

	if err := p.Publish(context.Background(), request()); err != nil {
		t.Fatalf("publish: %v", err)
	}

	want := "/" + contentlake.DefaultAPIVersion + "/data/mutate/production"
	if f.path != want {
		t.Errorf("wrote to %q, want %q", f.path, want)
	}
	if !strings.HasPrefix(contentlake.DefaultAPIVersion, "v") {
		t.Errorf("DefaultAPIVersion = %q; the Content Lake only routes `vYYYY-MM-DD`",
			contentlake.DefaultAPIVersion)
	}
}

// A caller supplying an unprefixed version must not be able to reintroduce the
// same 404 the default was fixed to avoid.
func TestNew_NormalisesAnUnprefixedAPIVersion(t *testing.T) {
	f := &fakeLake{t: t}
	srv := httptest.NewServer(f.handler())
	t.Cleanup(srv.Close)

	p, err := contentlake.New(contentlake.Config{
		ProjectID: "abc123", Dataset: "production", Token: "write-token",
		APIVersion: "2026-09-01",
		HTTPClient: srv.Client(), BaseURL: srv.URL, Logger: quiet(),
	})
	if err != nil {
		t.Fatalf("new publisher: %v", err)
	}
	if err := p.Publish(context.Background(), request()); err != nil {
		t.Fatalf("publish: %v", err)
	}

	if want := "/v2026-09-01/data/mutate/production"; f.path != want {
		t.Errorf("wrote to %q, want %q", f.path, want)
	}
}

// visibility=sync matters: the Control Room refreshes right after an approval,
// and an async write would let it read back the pre-correction state.
func TestPublish_WaitsForTheWriteToBeQueryable(t *testing.T) {
	f := &fakeLake{t: t}
	p := newPublisher(t, f)

	if err := p.Publish(context.Background(), request()); err != nil {
		t.Fatal(err)
	}
	if f.query["visibility"] != "sync" {
		t.Errorf("visibility = %q, want sync", f.query["visibility"])
	}
	if f.auth != "Bearer write-token" {
		t.Errorf("auth = %q", f.auth)
	}
}

// The same logical publication must produce the same transaction ID, so a retry
// is the same transaction rather than a second one.
func TestPublish_TransactionIDIsDerivedFromTheIdempotencyKey(t *testing.T) {
	f1, f2 := &fakeLake{t: t}, &fakeLake{t: t}
	p1, p2 := newPublisher(t, f1), newPublisher(t, f2)

	if err := p1.Publish(context.Background(), request()); err != nil {
		t.Fatal(err)
	}
	if err := p2.Publish(context.Background(), request()); err != nil {
		t.Fatal(err)
	}

	if f1.query["transactionId"] == "" {
		t.Fatal("no transaction id sent")
	}
	if f1.query["transactionId"] != f2.query["transactionId"] {
		t.Errorf("the same publication produced different transaction ids: %q vs %q",
			f1.query["transactionId"], f2.query["transactionId"])
	}

	// A different approval must not collide with it.
	other := request()
	other.IdempotencyKey = "approve:assert.returns-2:build.47:dana"
	f3 := &fakeLake{t: t}
	if err := newPublisher(t, f3).Publish(context.Background(), other); err != nil {
		t.Fatal(err)
	}
	if f3.query["transactionId"] == f1.query["transactionId"] {
		t.Error("two different publications share a transaction id")
	}
}

// A reused transaction id means the write already landed. That is a success
// reported honestly, not a failure and not a silent second write.
func TestPublish_DuplicateTransactionIsReportedAsAlreadyApplied(t *testing.T) {
	f := &fakeLake{
		t: t, status: http.StatusConflict,
		response: `{"error":"transaction id already exists"}`,
	}
	p := newPublisher(t, f)

	err := p.Publish(context.Background(), request())
	if !errors.Is(err, contentlake.ErrAlreadyApplied) {
		t.Fatalf("error = %v, want ErrAlreadyApplied", err)
	}
}

// An unrecognised 409 must NOT be assumed to be a duplicate: wrongly reporting
// "already published" means a correction silently never lands.
func TestPublish_UnknownConflictIsNotTreatedAsSuccess(t *testing.T) {
	f := &fakeLake{
		t: t, status: http.StatusConflict,
		response: `{"error":"document was modified concurrently"}`,
	}
	p := newPublisher(t, f)

	err := p.Publish(context.Background(), request())
	if err == nil {
		t.Fatal("expected an error")
	}
	if errors.Is(err, contentlake.ErrAlreadyApplied) {
		t.Error("an unrelated conflict was misread as a duplicate publication")
	}
}

func TestPublish_RetriesTransientServerErrors(t *testing.T) {
	f := &fakeLake{t: t, failFirst: 2}
	p := newPublisher(t, f)

	if err := p.Publish(context.Background(), request()); err != nil {
		t.Fatalf("should have recovered: %v", err)
	}
	if f.calls.Load() != 3 {
		t.Errorf("made %d attempts, want 3 (two failures then success)", f.calls.Load())
	}
}

// A bad token is a configuration problem. Retrying it four times just delays
// the moment someone reads the error.
func TestPublish_DoesNotRetryAuthFailures(t *testing.T) {
	f := &fakeLake{t: t, status: http.StatusForbidden, response: `{"error":"no write access"}`}
	p := newPublisher(t, f)

	err := p.Publish(context.Background(), request())
	if err == nil {
		t.Fatal("expected an error")
	}
	if f.calls.Load() != 1 {
		t.Errorf("made %d attempts on a 403, want 1", f.calls.Load())
	}
	// The most likely setup mistake is the wrong kind of token, so the message
	// has to name which one is needed.
	if !strings.Contains(err.Error(), "PROJECT token") {
		t.Errorf("the error should say which credential is required, got: %v", err)
	}
	if strings.Contains(err.Error(), "write-token") {
		t.Error("the error leaked the credential")
	}
}

// A partial apply means the page and its integrity record now disagree. That
// must be loud.
func TestPublish_RejectsAPartialApply(t *testing.T) {
	f := &fakeLake{
		t: t, status: http.StatusOK,
		response: `{"transactionId":"t","results":[{"operation":"patch","documentId":"page.returns"}]}`,
	}
	p := newPublisher(t, f)

	err := p.Publish(context.Background(), request())
	if err == nil {
		t.Fatal("a one-patch result should not be reported as success")
	}
	if !strings.Contains(err.Error(), "disagree") {
		t.Errorf("the error should explain the consequence, got: %v", err)
	}
}

// Validation refuses anything that could write to the wrong place.
func TestPublish_ValidatesBeforeWriting(t *testing.T) {
	cases := map[string]func(*contentlake.Request){
		"no block key": func(r *contentlake.Request) { r.BlockKey = "" },
		"empty text":   func(r *contentlake.Request) { r.Text = "   " },
		"no build id":  func(r *contentlake.Request) { r.BuildID = "" },
		"no page id":   func(r *contentlake.Request) { r.PageID = "" },
		"no assertion": func(r *contentlake.Request) { r.AssertionID = "" },
	}

	for name, mutate := range cases {
		t.Run(name, func(t *testing.T) {
			f := &fakeLake{t: t}
			p := newPublisher(t, f)

			req := request()
			mutate(&req)

			if err := p.Publish(context.Background(), req); err == nil {
				t.Error("expected validation to refuse this")
			}
			if f.calls.Load() != 0 {
				t.Error("an invalid request reached the Content Lake")
			}
		})
	}
}

// A missing block key must never fall back to a positional path — that is how
// the wrong paragraph gets rewritten.
func TestPublish_RefusesPositionalFallback(t *testing.T) {
	f := &fakeLake{t: t}
	p := newPublisher(t, f)

	req := request()
	req.BlockKey = ""

	err := p.Publish(context.Background(), req)
	if err == nil || !strings.Contains(err.Error(), "positional") {
		t.Errorf("the refusal should explain why a positional path is unsafe, got: %v", err)
	}
}

func TestNew_NamesEveryMissingSetting(t *testing.T) {
	_, err := contentlake.New(contentlake.Config{})
	if err == nil {
		t.Fatal("expected an error")
	}
	for _, want := range []string{"project id", "dataset", "write token", "PROJECT token"} {
		if !strings.Contains(err.Error(), want) {
			t.Errorf("error should mention %q; got: %v", want, err)
		}
	}
}

// After repeated failures the breaker opens and stops hammering a dependency
// that is already down.
func TestPublish_CircuitOpensAfterRepeatedFailures(t *testing.T) {
	f := &fakeLake{t: t, status: http.StatusBadGateway, response: `{"error":"down"}`}
	p := newPublisher(t, f)

	for i := 0; i < 6; i++ {
		_ = p.Publish(context.Background(), request())
	}

	if p.BreakerState() != "open" {
		t.Errorf("breaker = %s, want open after sustained failure", p.BreakerState())
	}

	before := f.calls.Load()
	_ = p.Publish(context.Background(), request())
	if f.calls.Load() != before {
		t.Error("an open breaker still sent a request to the dependency")
	}
}

func keysOf(m map[string]any) []string {
	out := make([]string, 0, len(m))
	for k := range m {
		out = append(out, k)
	}
	return out
}
