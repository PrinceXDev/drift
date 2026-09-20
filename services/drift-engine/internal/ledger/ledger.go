// Package ledger turns a live Knowledge Base into a comparable snapshot.
//
// This is the seam where an external, prose-shaped system becomes something the
// deterministic core can diff. Everything downstream of here is pure functions
// over data; everything upstream is network and Markdown.
//
// # Content addressing
//
// A snapshot's identity is the hash of what the endpoint actually returned —
// the raw outline text plus each entry's raw Markdown, in sorted path order.
// Two consequences that matter:
//
//   - If nothing changed, the hash is identical and the whole diff can be
//     skipped. Knowledge Base rebuilds are frequent and mostly uneventful.
//   - Re-running any historical diff reproduces byte-identical output, because
//     the inputs are pinned by content rather than by timestamp. The console can
//     therefore offer "re-run this diff" as evidence rather than as a slogan.
//
// The hash covers the *raw* text rather than the parsed claims deliberately. If
// our parser changes, we want that to be visible as a different snapshot, not
// silently absorbed.
package ledger

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"io"
	"regexp"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/drift/drift-engine/internal/mcp"
	"github.com/drift/drift-engine/pkg/driftv1"
)

// Reader is the slice of the MCP client the ledger needs. An interface so
// capture is testable without a network or credentials.
type Reader interface {
	InitialContext(ctx context.Context) (*mcp.Outline, error)
	ReadEntries(ctx context.Context, paths []string) ([]mcp.Entry, error)
}

// Capture reads the current Knowledge Base and returns it as a snapshot.
//
// `buildNumber` is supplied by the caller rather than derived, because the
// Knowledge Base does not expose one — the ledger's own sequence is what gives
// builds an order. `now` is injected so tests are not time-dependent.
//
// Every claim in the result is stamped as first seen in this build. Use
// CaptureAgainst when a previous snapshot exists, so lineage carries forward
// instead of resetting — a baseline capture is the only case where "every fact
// here is new" is true.
func Capture(
	ctx context.Context,
	r Reader,
	kbID string,
	buildNumber int,
	now time.Time,
) (driftv1.BuildSnapshot, error) {
	return CaptureAgainst(ctx, r, kbID, buildNumber, now, driftv1.BuildSnapshot{})
}

// CaptureAgainst reads the Knowledge Base and carries claim lineage forward
// from the previous snapshot.
//
// # Why the ledger owns lineage
//
// Provenance that a caller has to remember to maintain is provenance that is
// eventually wrong, and a wrong lineage is worse than none: it invites somebody
// to publish on the strength of a verification that never happened. Capture is
// the one place every claim passes through on its way into the system, so it is
// the one place the stamps can be applied without exception.
//
// # The three stamps
//
// For each claim in the new build, compared against the same claim ID in the
// previous one:
//
//	absent before   first seen here; verified here; never changed
//	same substance  first seen carried; verified here; last change carried
//	moved           first seen carried; verified NOT advanced; changed here
//
// The third line is the whole point. A build that changes a claim has not
// verified it — it has replaced it — so LastVerifiedBuild stays where it was
// and the pair reads as "last confirmed at 46, moved at 47". Advancing both
// would erase the distinction between a fact nobody has checked in a year and
// one that was re-confirmed yesterday.
func CaptureAgainst(
	ctx context.Context,
	r Reader,
	kbID string,
	buildNumber int,
	now time.Time,
	previous driftv1.BuildSnapshot,
) (driftv1.BuildSnapshot, error) {
	outline, err := r.InitialContext(ctx)
	if err != nil {
		return driftv1.BuildSnapshot{}, fmt.Errorf("capture build %d: read outline: %w", buildNumber, err)
	}

	paths := make([]string, 0, len(outline.Entries))
	for _, e := range outline.Entries {
		paths = append(paths, e.Path)
	}
	sort.Strings(paths)

	entries, err := r.ReadEntries(ctx, paths)
	if err != nil {
		return driftv1.BuildSnapshot{}, fmt.Errorf("capture build %d: read entries: %w", buildNumber, err)
	}

	// A short read is not a partial success. If the outline promised entries we
	// did not get, proceeding would make the differ report every absent claim as
	// retired — the engine would announce that the organisation abandoned half
	// its policies because one HTTP call came back small.
	if len(entries) != len(paths) {
		return driftv1.BuildSnapshot{}, fmt.Errorf(
			"capture build %d: outline listed %d entries but only %d were returned; "+
				"refusing to snapshot a partial build (it would read as mass retirement)",
			buildNumber, len(paths), len(entries))
	}

	tiers := make(map[string]driftv1.ClaimTier, len(outline.Entries))
	for _, e := range outline.Entries {
		tiers[e.Path] = tierFrom(e.Tier)
	}

	sort.Slice(entries, func(i, j int) bool { return entries[i].Path < entries[j].Path })

	buildID := fmt.Sprintf("build.%d", buildNumber)
	prior := indexClaims(previous)

	claims := make([]driftv1.Claim, 0, len(entries))
	for _, entry := range entries {
		claim := claimFromEntry(entry, tiers[entry.Path])
		claims = append(claims, claim.WithLineage(prior[claim.ID], buildID))
	}

	return driftv1.BuildSnapshot{
		ID:          buildID,
		KBID:        kbID,
		BuildNumber: buildNumber,
		BuiltAt:     now.UTC(),
		OutlineHash: hashBuild(outline.Raw, entries),
		Claims:      claims,
	}, nil
}

// indexClaims maps a snapshot's claims by ID. Returns pointers so an absent
// claim is distinguishable from a zero-valued one — the difference between
// "this fact is new" and "this fact is blank" matters here.
func indexClaims(b driftv1.BuildSnapshot) map[string]*driftv1.Claim {
	out := make(map[string]*driftv1.Claim, len(b.Claims))
	for i := range b.Claims {
		out[b.Claims[i].ID] = &b.Claims[i]
	}
	return out
}

// hashBuild content-addresses a build over exactly what the endpoint returned.
func hashBuild(outlineRaw string, entries []mcp.Entry) string {
	sorted := make([]mcp.Entry, len(entries))
	copy(sorted, entries)
	sort.Slice(sorted, func(i, j int) bool { return sorted[i].Path < sorted[j].Path })

	h := sha256.New()
	_, _ = io.WriteString(h, "outline\x00")
	_, _ = io.WriteString(h, outlineRaw)
	for _, e := range sorted {
		_, _ = io.WriteString(h, "\x00entry\x00")
		_, _ = io.WriteString(h, e.Path)
		_, _ = io.WriteString(h, "\x00")
		_, _ = io.WriteString(h, e.Markdown)
	}
	return "sha256:" + hex.EncodeToString(h.Sum(nil))[:16]
}

// Unchanged reports whether two snapshots are the same build by content.
// Lets the scheduled poller skip a full diff when a rebuild produced nothing new.
func Unchanged(a, b driftv1.BuildSnapshot) bool {
	return a.OutlineHash != "" && a.OutlineHash == b.OutlineHash
}

func tierFrom(t mcp.EntryTier) driftv1.ClaimTier {
	switch t {
	case mcp.TierCore:
		return driftv1.TierCore
	case mcp.TierPeripheral:
		return driftv1.TierPeripheral
	default:
		return driftv1.TierStandard
	}
}

// ---------------------------------------------------------------------------
// Entry -> Claim
// ---------------------------------------------------------------------------

// citation matches a Markdown reference-style citation, which is how Knowledge
// Base entries link back to their sources.
var citation = regexp.MustCompile(`(?m)^\s*\[\d+\]:\s*(\S+)`)

// quantity pulls a typed value out of an entry's prose.
//
// This is the extraction that decides whether a claim gets the deterministic
// comparison path or the low-confidence semantic one. It is deliberately
// conservative: it only fires on an unambiguous "<number> <unit>" pair with a
// unit from a known list. A wrong typed value would be worse than no typed
// value, because it would report confidence 1.0 on a comparison of two numbers
// that do not mean the same thing.
//
// Anything this misses simply falls through to the semantic path, gets 0.55
// confidence, and reaches a human. Missing a typed value costs attention;
// inventing one costs trust.
var quantity = regexp.MustCompile(
	`(?i)\b(\d+(?:\.\d+)?)\s*(days?|months?|years?|hours?|percent|%|USD|EUR|GBP)\b`)

var unitCanonical = map[string]string{
	"day": "days", "days": "days",
	"month": "months", "months": "months",
	"year": "years", "years": "years",
	"hour": "hours", "hours": "hours",
	"percent": "percent", "%": "percent",
	"usd": "USD", "eur": "EUR", "gbp": "GBP",
}

func claimFromEntry(entry mcp.Entry, tier driftv1.ClaimTier) driftv1.Claim {
	statement := firstSentence(entry.Markdown)

	claim := driftv1.Claim{
		ID:        "claim." + strings.ReplaceAll(entry.Path, "/", "-"),
		Path:      entry.Path,
		Statement: statement,
		Tier:      tier,
		Citations: extractCitations(entry.Markdown),
		Status:    driftv1.ClaimActive,
	}

	// Extract from the statement, not the whole entry: a body mentioning several
	// numbers would otherwise attach an arbitrary one to the claim.
	if m := quantity.FindStringSubmatch(statement); m != nil {
		if v, err := strconv.ParseFloat(m[1], 64); err == nil {
			if unit, ok := unitCanonical[strings.ToLower(m[2])]; ok {
				claim.Value = &v
				claim.Unit = unit
			}
		}
	}

	return claim
}

func extractCitations(markdown string) []string {
	matches := citation.FindAllStringSubmatch(markdown, -1)
	seen := make(map[string]bool, len(matches))
	out := make([]string, 0, len(matches))
	for _, m := range matches {
		if !seen[m[1]] {
			seen[m[1]] = true
			out = append(out, m[1])
		}
	}
	sort.Strings(out)
	return out
}

// firstSentence takes the claim statement from the entry's opening sentence,
// skipping Markdown headings and blank lines.
func firstSentence(markdown string) string {
	for _, line := range strings.Split(markdown, "\n") {
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "#") || strings.HasPrefix(line, "[") {
			continue
		}
		if i := strings.IndexAny(line, ".!?"); i >= 0 {
			return strings.TrimSpace(line[:i+1])
		}
		return line
	}
	return ""
}
