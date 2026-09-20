package mcp_test

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/drift/drift-engine/internal/mcp"
)

// fakeContext stands in for a Sanity Context MCP endpoint.
//
// Recorded against the documented contract rather than a live endpoint — the
// organisation Labs flag is not enabled yet. When it is, the first job is to
// capture a real response and check it against these fixtures; anything that
// differs is a bug in the client, not in the test. Tracked in docs/BUILD-LOG.md.
type fakeContext struct {
	t          *testing.T
	outline    string
	entries    map[string]string
	calls      []recordedCall
	status     int
	rpcError   *struct{ Code int }
	maxPerRead int
}

type recordedCall struct {
	tool  string
	paths []string
	mode  string
	auth  string
}

func (f *fakeContext) handler() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if f.status != 0 {
			w.WriteHeader(f.status)
			_, _ = w.Write([]byte(`{"error":"unauthorized"}`))
			return
		}

		var req struct {
			ID     int64 `json:"id"`
			Method string
			Params struct {
				Name      string `json:"name"`
				Arguments struct {
					Paths []string `json:"paths"`
				} `json:"arguments"`
			} `json:"params"`
		}
		if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
			f.t.Fatalf("fake server could not decode request: %v", err)
		}

		f.calls = append(f.calls, recordedCall{
			tool:  req.Params.Name,
			paths: req.Params.Arguments.Paths,
			mode:  r.URL.Query().Get("mode"),
			auth:  r.Header.Get("Authorization"),
		})

		if f.rpcError != nil {
			writeJSON(w, map[string]any{
				"jsonrpc": "2.0", "id": req.ID,
				"error": map[string]any{"code": f.rpcError.Code, "message": "no readable knowledge bases"},
			})
			return
		}

		var text string
		switch req.Params.Name {
		case "initial_context":
			text = f.outline
		case "knowledge_base_read":
			if f.maxPerRead > 0 && len(req.Params.Arguments.Paths) > f.maxPerRead {
				f.t.Errorf("server received %d paths in one call, ceiling is %d",
					len(req.Params.Arguments.Paths), f.maxPerRead)
			}
			var b strings.Builder
			for _, p := range req.Params.Arguments.Paths {
				fmt.Fprintf(&b, "## %s\n\n%s\n\n", p, f.entries[p])
			}
			text = b.String()
		default:
			f.t.Fatalf("unexpected tool %q", req.Params.Name)
		}

		writeJSON(w, map[string]any{
			"jsonrpc": "2.0", "id": req.ID,
			"result": map[string]any{
				"content": []map[string]any{{"type": "text", "text": text}},
			},
		})
	}
}

func writeJSON(w http.ResponseWriter, v any) {
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(v)
}

const sampleOutline = `# Northwind policies

- ` + "`support/returns`" + ` - the standard return window [core]
- ` + "`support/returns-eu`" + ` - EU cooling-off period [core]
- ` + "`shipping/free-threshold`" + ` - when shipping is free
- ` + "`brand/tone`" + ` - how we write [peripheral]

Not an entry line at all.
`

func newFake(t *testing.T) (*fakeContext, *mcp.Client) {
	t.Helper()
	f := &fakeContext{
		t:       t,
		outline: sampleOutline,
		entries: map[string]string{
			"support/returns":         "Returns are accepted within 45 days.\n\n[1]: returns-v4.pdf",
			"support/returns-eu":      "EU customers have 14 days.\n\n[1]: eu-addendum.pdf",
			"shipping/free-threshold": "Free over 75 USD.",
			"brand/tone":              "Write plainly.",
		},
		maxPerRead: mcp.MaxPathsPerRead,
	}
	srv := httptest.NewServer(f.handler())
	t.Cleanup(srv.Close)
	return f, mcp.New(srv.URL, "org-token", mcp.WithHTTPClient(srv.Client()))
}

func TestInitialContext_ParsesOutlineAndTiers(t *testing.T) {
	f, client := newFake(t)

	outline, err := client.InitialContext(context.Background())
	if err != nil {
		t.Fatalf("initial_context: %v", err)
	}

	if len(outline.Entries) != 4 {
		t.Fatalf("parsed %d entries, want 4: %+v", len(outline.Entries), outline.Entries)
	}

	want := map[string]mcp.EntryTier{
		"support/returns":         mcp.TierCore,
		"support/returns-eu":      mcp.TierCore,
		"shipping/free-threshold": mcp.TierStandard,
		"brand/tone":              mcp.TierPeripheral,
	}
	for _, e := range outline.Entries {
		if want[e.Path] != e.Tier {
			t.Errorf("%s tier = %q, want %q", e.Path, e.Tier, want[e.Path])
		}
		if e.Summary == "" {
			t.Errorf("%s has an empty summary", e.Path)
		}
	}

	// Raw is preserved so a build snapshot can be content-addressed over what the
	// endpoint actually said, not over our parse of it.
	if outline.Raw != sampleOutline {
		t.Error("Outline.Raw must preserve the endpoint's response verbatim")
	}

	// Mode is pinned explicitly: a malformed dataset source can otherwise flip an
	// endpoint's mode silently.
	if f.calls[0].mode != "knowledge_base" {
		t.Errorf("mode = %q, want knowledge_base pinned on the request", f.calls[0].mode)
	}
	if f.calls[0].auth != "Bearer org-token" {
		t.Errorf("auth header = %q", f.calls[0].auth)
	}
}

func TestReadEntries_SplitsByHeading(t *testing.T) {
	_, client := newFake(t)

	entries, err := client.ReadEntries(context.Background(),
		[]string{"support/returns", "support/returns-eu"})
	if err != nil {
		t.Fatalf("read: %v", err)
	}

	if len(entries) != 2 {
		t.Fatalf("got %d entries, want 2: %+v", len(entries), entries)
	}
	if entries[0].Path != "support/returns" {
		t.Errorf("first path = %q", entries[0].Path)
	}
	if !strings.Contains(entries[0].Markdown, "45 days") {
		t.Errorf("entry body lost its content: %q", entries[0].Markdown)
	}
	if !strings.Contains(entries[0].Markdown, "returns-v4.pdf") {
		t.Error("citations must survive parsing — they are the evidence chain")
	}
}

// The documented ceiling is 20 paths per call. Exceeding it should chunk, not
// fail and not silently truncate: a truncated read would look like "those claims
// no longer exist", which the differ would report as mass retirement.
func TestReadEntries_ChunksAtTheDocumentedCeiling(t *testing.T) {
	f, client := newFake(t)

	paths := make([]string, 47)
	for i := range paths {
		p := fmt.Sprintf("bulk/entry-%02d", i)
		paths[i] = p
		f.entries[p] = fmt.Sprintf("body %d", i)
	}

	entries, err := client.ReadEntries(context.Background(), paths)
	if err != nil {
		t.Fatalf("read: %v", err)
	}

	if len(entries) != 47 {
		t.Errorf("got %d entries, want all 47 — a truncated read would look like mass retirement",
			len(entries))
	}
	reads := 0
	for _, c := range f.calls {
		if c.tool == "knowledge_base_read" {
			reads++
		}
	}
	if reads != 3 {
		t.Errorf("made %d read calls for 47 paths, want 3 (20+20+7)", reads)
	}
}

// A 401/403 is overwhelmingly likely to be a project token used where an
// organisation token is required. The error should say that rather than make
// the operator go and find out.
func TestAuthFailure_NamesTheProjectTokenTrap(t *testing.T) {
	f, client := newFake(t)
	f.status = http.StatusUnauthorized

	_, err := client.InitialContext(context.Background())
	if !errors.Is(err, mcp.ErrProjectToken) {
		t.Fatalf("error = %v, want ErrProjectToken", err)
	}
	if !strings.Contains(err.Error(), "ORGANISATION-level") {
		t.Error("the error must spell out what kind of token is needed")
	}
}

// JSON-RPC -32005 in Knowledge Base mode means the endpoint served no bases the
// token can read — usually the Labs flag, not a code problem.
func TestNoReadableKnowledgeBase_IsIdentified(t *testing.T) {
	f, client := newFake(t)
	f.rpcError = &struct{ Code int }{Code: -32005}

	_, err := client.InitialContext(context.Background())
	if !errors.Is(err, mcp.ErrNoReadableKnowledgeBase) {
		t.Fatalf("error = %v, want ErrNoReadableKnowledgeBase", err)
	}
	if !strings.Contains(err.Error(), "Labs") {
		t.Error("the error should point at the Labs page, which is the usual cause")
	}
}

// A single-path read has no heading to split on. The body must still be
// attributed rather than dropped.
func TestReadEntries_SinglePathWithoutHeading(t *testing.T) {
	srv := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var req struct {
			ID int64 `json:"id"`
		}
		_ = json.NewDecoder(r.Body).Decode(&req)
		writeJSON(w, map[string]any{
			"jsonrpc": "2.0", "id": req.ID,
			"result": map[string]any{
				"content": []map[string]any{{"type": "text", "text": "Returns are accepted within 45 days."}},
			},
		})
	}))
	defer srv.Close()

	client := mcp.New(srv.URL, "tok", mcp.WithHTTPClient(srv.Client()))
	entries, err := client.ReadEntries(context.Background(), []string{"support/returns"})
	if err != nil {
		t.Fatalf("read: %v", err)
	}
	if len(entries) != 1 || entries[0].Path != "support/returns" {
		t.Fatalf("unheaded single read was not attributed: %+v", entries)
	}
}

func TestReadEntries_EmptyInputMakesNoCall(t *testing.T) {
	f, client := newFake(t)
	entries, err := client.ReadEntries(context.Background(), nil)
	if err != nil || entries != nil {
		t.Fatalf("got (%v, %v), want (nil, nil)", entries, err)
	}
	if len(f.calls) != 0 {
		t.Errorf("made %d calls for an empty path list", len(f.calls))
	}
}
