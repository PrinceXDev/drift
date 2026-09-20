// Package mcp is a Context MCP client for Sanity Knowledge Bases.
//
// Context MCP speaks JSON-RPC 2.0 over HTTP. The endpoint is created in the
// Context app in the Sanity Dashboard and served at:
//
//	https://api.sanity.io/v1/context/organizations/:organizationId/mcp/:mcpEndpointName
//
// Two things about authentication are worth stating loudly, because both cost
// time to discover:
//
//   - The token must be an ORGANISATION-level API token with the Context Viewer
//     permission (grant `sanity.knowledge-base.read`). Project-level tokens are
//     rejected. `ErrProjectToken` tries to say so in as many words.
//   - The endpoint derives its mode from its configured sources. A malformed
//     dataset ID is silently skipped, which can flip an endpoint from GROQ mode
//     to Knowledge Base mode without warning. `Mode` is therefore pinned
//     explicitly on the request rather than left to inference.
//
// Tool surface in Knowledge Base mode:
//
//	initial_context     the outline — entry paths plus one-line summaries
//	knowledge_base_read full entries, up to 20 paths per call
//
// The response envelopes are implemented against the documented contract. They
// have NOT yet been validated against a live endpoint — see docs/BUILD-LOG.md.
// `decodeToolResult` is deliberately lenient about envelope shape and strict
// about JSON-RPC errors, so a shape surprise produces a clear parse failure
// rather than silently empty data.
package mcp

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"strings"
	"sync/atomic"
	"time"
)

// MaxPathsPerRead is the documented ceiling on knowledge_base_read.
// Larger requests are chunked rather than rejected.
const MaxPathsPerRead = 20

// Mode pins the endpoint's retrieval mode on the request URL.
type Mode string

const (
	ModeKnowledgeBase Mode = "knowledge_base"
	ModeGROQ          Mode = "groq"
)

var (
	// ErrProjectToken is returned for the single most likely setup mistake.
	ErrProjectToken = errors.New(
		"context mcp rejected the token: it must be an ORGANISATION-level API token with " +
			"Context Viewer permission (Manage > API > Tokens at the organisation level); " +
			"project-level tokens are not accepted")

	// ErrNoReadableKnowledgeBase maps JSON-RPC -32005, which Knowledge Base mode
	// returns when the endpoint serves no bases the token can read.
	ErrNoReadableKnowledgeBase = errors.New(
		"context mcp served no readable knowledge bases: check the endpoint's sources, and that " +
			"Context Knowledge Bases is enabled for the organisation on the Labs page")
)

// Client talks to one Context MCP endpoint.
type Client struct {
	endpoint string
	token    string
	mode     Mode
	http     *http.Client
	nextID   atomic.Int64
}

// Option configures a Client.
type Option func(*Client)

// WithHTTPClient supplies a custom transport — used by tests, and by anything
// that needs its own timeouts or instrumentation.
func WithHTTPClient(h *http.Client) Option {
	return func(c *Client) { c.http = h }
}

// WithMode overrides the retrieval mode. Defaults to Knowledge Base mode, which
// is what DRIFT needs; the override exists because relying on the endpoint's
// inferred mode is how a malformed source ID silently changes behaviour.
func WithMode(m Mode) Option {
	return func(c *Client) { c.mode = m }
}

// New returns a Client for the given endpoint URL and organisation token.
func New(endpoint, token string, opts ...Option) *Client {
	c := &Client{
		endpoint: strings.TrimRight(endpoint, "/"),
		token:    token,
		mode:     ModeKnowledgeBase,
		http:     &http.Client{Timeout: 30 * time.Second},
	}
	for _, opt := range opts {
		opt(c)
	}
	return c
}

// ---------------------------------------------------------------------------
// JSON-RPC plumbing
// ---------------------------------------------------------------------------

type rpcRequest struct {
	JSONRPC string `json:"jsonrpc"`
	ID      int64  `json:"id"`
	Method  string `json:"method"`
	Params  any    `json:"params,omitempty"`
}

type rpcError struct {
	Code    int             `json:"code"`
	Message string          `json:"message"`
	Data    json.RawMessage `json:"data,omitempty"`
}

func (e *rpcError) Error() string {
	return fmt.Sprintf("context mcp error %d: %s", e.Code, e.Message)
}

type rpcResponse struct {
	JSONRPC string          `json:"jsonrpc"`
	ID      int64           `json:"id"`
	Result  json.RawMessage `json:"result,omitempty"`
	Error   *rpcError       `json:"error,omitempty"`
}

type toolCallParams struct {
	Name      string         `json:"name"`
	Arguments map[string]any `json:"arguments,omitempty"`
}

// callTool issues one tools/call and returns the raw result payload.
func (c *Client) callTool(ctx context.Context, tool string, args map[string]any) (json.RawMessage, error) {
	body, err := json.Marshal(rpcRequest{
		JSONRPC: "2.0",
		ID:      c.nextID.Add(1),
		Method:  "tools/call",
		Params:  toolCallParams{Name: tool, Arguments: args},
	})
	if err != nil {
		return nil, fmt.Errorf("marshal %s request: %w", tool, err)
	}

	url := fmt.Sprintf("%s?mode=%s", c.endpoint, c.mode)
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, url, bytes.NewReader(body))
	if err != nil {
		return nil, fmt.Errorf("build %s request: %w", tool, err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Accept", "application/json, text/event-stream")
	req.Header.Set("Authorization", "Bearer "+c.token)

	resp, err := c.http.Do(req)
	if err != nil {
		return nil, fmt.Errorf("call %s: %w", tool, err)
	}
	defer resp.Body.Close()

	raw, err := io.ReadAll(io.LimitReader(resp.Body, 32<<20))
	if err != nil {
		return nil, fmt.Errorf("read %s response: %w", tool, err)
	}

	switch resp.StatusCode {
	case http.StatusOK:
		// fall through
	case http.StatusUnauthorized, http.StatusForbidden:
		// The most common cause by a distance is a project token. Say so rather
		// than surfacing a bare 401 and letting the operator guess.
		return nil, fmt.Errorf("%w (HTTP %d: %s)", ErrProjectToken, resp.StatusCode, snippet(raw))
	default:
		return nil, fmt.Errorf("call %s: HTTP %d: %s", tool, resp.StatusCode, snippet(raw))
	}

	var out rpcResponse
	if err := json.Unmarshal(raw, &out); err != nil {
		return nil, fmt.Errorf("decode %s response: %w (body: %s)", tool, err, snippet(raw))
	}
	if out.Error != nil {
		if out.Error.Code == -32005 {
			return nil, fmt.Errorf("%w (%s)", ErrNoReadableKnowledgeBase, out.Error.Message)
		}
		return nil, out.Error
	}
	return out.Result, nil
}

func snippet(b []byte) string {
	const max = 300
	s := strings.TrimSpace(string(b))
	if len(s) > max {
		return s[:max] + "…"
	}
	return s
}

// ---------------------------------------------------------------------------
// MCP tool result envelope
// ---------------------------------------------------------------------------

// toolResult is the standard MCP content envelope: a list of content blocks,
// of which we care about the text ones.
type toolResult struct {
	Content []struct {
		Type string `json:"type"`
		Text string `json:"text"`
	} `json:"content"`
	IsError bool `json:"isError"`
}

// decodeToolResult flattens the envelope to text.
//
// Lenient by design: some MCP servers return the payload directly rather than
// wrapped in `content`. Rather than fail on an envelope we did not predict, we
// fall back to the raw JSON and let the caller's parser decide. A wrong guess
// then surfaces as an explicit parse error naming the tool, which is far easier
// to debug than an empty result that looks like "the knowledge base is empty".
func decodeToolResult(tool string, raw json.RawMessage) (string, error) {
	if len(raw) == 0 {
		return "", fmt.Errorf("%s returned an empty result", tool)
	}

	var env toolResult
	if err := json.Unmarshal(raw, &env); err == nil && len(env.Content) > 0 {
		if env.IsError {
			return "", fmt.Errorf("%s reported a tool error: %s", tool, joinText(env))
		}
		return joinText(env), nil
	}

	return string(raw), nil
}

func joinText(env toolResult) string {
	var b strings.Builder
	for _, block := range env.Content {
		if block.Type != "" && block.Type != "text" {
			continue
		}
		if b.Len() > 0 {
			b.WriteString("\n")
		}
		b.WriteString(block.Text)
	}
	return b.String()
}
