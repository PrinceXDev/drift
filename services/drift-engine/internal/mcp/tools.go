package mcp

import (
	"context"
	"fmt"
	"regexp"
	"strings"
)

// ---------------------------------------------------------------------------
// initial_context — the outline
// ---------------------------------------------------------------------------

// OutlineEntry is one row of the Knowledge Base outline.
//
// The outline is small by design — small enough for an agent to hold in context
// for an entire conversation — which is also what makes it cheap for DRIFT to
// fetch on every build and diff.
type OutlineEntry struct {
	Path    string    `json:"path"`
	Summary string    `json:"summary"`
	Tier    EntryTier `json:"tier"`
}

// EntryTier mirrors the [core] / [peripheral] tagging the outline applies.
type EntryTier string

const (
	TierCore       EntryTier = "core"
	TierStandard   EntryTier = "standard"
	TierPeripheral EntryTier = "peripheral"
)

// Outline is the result of initial_context in Knowledge Base mode.
type Outline struct {
	Entries []OutlineEntry
	// Raw is kept so a build snapshot can be content-addressed over exactly what
	// the endpoint returned, rather than over our reconstruction of it.
	Raw string
}

// InitialContext fetches the outline: the orientation step at the start of a
// conversation, and for DRIFT the cheap way to see a build's shape.
func (c *Client) InitialContext(ctx context.Context) (*Outline, error) {
	raw, err := c.callTool(ctx, "initial_context", nil)
	if err != nil {
		return nil, err
	}
	text, err := decodeToolResult("initial_context", raw)
	if err != nil {
		return nil, err
	}
	return &Outline{Entries: parseOutline(text), Raw: text}, nil
}

// outlineLine matches an outline row: a path, a separator, a summary, and an
// optional bracketed tier tag.
//
// The outline is served as Markdown rather than as structured JSON, so this is
// a parser over prose — the one place in the engine where that is unavoidable.
// It is kept narrow and heavily tested for that reason, and `Outline.Raw`
// preserves the original so nothing downstream depends solely on this guess.
var outlineLine = regexp.MustCompile(
	`^\s*[-*]?\s*` + // optional bullet
		`` + "`" + `?([a-z0-9][a-z0-9\-]*(?:/[a-z0-9][a-z0-9\-]*)*)` + "`" + `?` + // path
		`\s*[-–—:]\s*` + // separator
		`(.+?)` + // summary
		`\s*(?:\[(core|peripheral)\])?\s*$`, // optional tier tag
)

func parseOutline(text string) []OutlineEntry {
	var entries []OutlineEntry
	for _, line := range strings.Split(text, "\n") {
		m := outlineLine.FindStringSubmatch(line)
		if m == nil {
			continue
		}
		tier := TierStandard
		switch m[3] {
		case "core":
			tier = TierCore
		case "peripheral":
			tier = TierPeripheral
		}
		entries = append(entries, OutlineEntry{
			Path:    m[1],
			Summary: strings.TrimSpace(m[2]),
			Tier:    tier,
		})
	}
	return entries
}

// ---------------------------------------------------------------------------
// knowledge_base_read — full entries
// ---------------------------------------------------------------------------

// Entry is one Knowledge Base entry: a Markdown document with citations back to
// the original sources. Entries belong to a build and cannot be edited by hand,
// which is the property the whole ledger rests on.
type Entry struct {
	Path     string
	Markdown string
}

// ReadEntries fetches full entries by path.
//
// The documented ceiling is 20 paths per call, so longer lists are chunked
// rather than truncated or rejected. Chunking is sequential on purpose: these
// calls are large, and hammering the endpoint with parallel multi-megabyte
// reads is a good way to discover a rate limit during a demo.
func (c *Client) ReadEntries(ctx context.Context, paths []string) ([]Entry, error) {
	if len(paths) == 0 {
		return nil, nil
	}

	out := make([]Entry, 0, len(paths))
	for start := 0; start < len(paths); start += MaxPathsPerRead {
		end := min(start+MaxPathsPerRead, len(paths))
		chunk := paths[start:end]

		raw, err := c.callTool(ctx, "knowledge_base_read", map[string]any{"paths": chunk})
		if err != nil {
			return nil, fmt.Errorf("read entries %d-%d of %d: %w", start, end, len(paths), err)
		}
		text, err := decodeToolResult("knowledge_base_read", raw)
		if err != nil {
			return nil, err
		}
		out = append(out, splitEntries(text, chunk)...)
	}
	return out, nil
}

// entryHeading matches the per-entry heading in a multi-entry response.
var entryHeading = regexp.MustCompile(
	`(?m)^#{1,3}\s+` + "`" + `?([a-z0-9][a-z0-9\-]*(?:/[a-z0-9][a-z0-9\-]*)*)` + "`" + `?\s*$`,
)

// splitEntries separates a concatenated response into per-path entries.
//
// When no headings are found — a single-path read, typically — the whole body
// is attributed to the single requested path. If several paths were requested
// and the response cannot be split, the text is returned under the first path
// rather than silently dropped, so nothing disappears without a trace.
func splitEntries(text string, requested []string) []Entry {
	locs := entryHeading.FindAllStringSubmatchIndex(text, -1)

	if len(locs) == 0 {
		if len(requested) == 0 {
			return nil
		}
		return []Entry{{Path: requested[0], Markdown: strings.TrimSpace(text)}}
	}

	entries := make([]Entry, 0, len(locs))
	for i, loc := range locs {
		path := text[loc[2]:loc[3]]
		bodyStart := loc[1]
		bodyEnd := len(text)
		if i+1 < len(locs) {
			bodyEnd = locs[i+1][0]
		}
		entries = append(entries, Entry{
			Path:     path,
			Markdown: strings.TrimSpace(text[bodyStart:bodyEnd]),
		})
	}
	return entries
}

// ReadAll fetches every entry the outline lists. Used by the ledger when
// capturing a build snapshot.
func (c *Client) ReadAll(ctx context.Context, outline *Outline) ([]Entry, error) {
	paths := make([]string, 0, len(outline.Entries))
	for _, e := range outline.Entries {
		paths = append(paths, e.Path)
	}
	return c.ReadEntries(ctx, paths)
}
