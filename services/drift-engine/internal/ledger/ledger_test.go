package ledger_test

import (
	"context"
	"strings"
	"testing"
	"time"

	"github.com/drift/drift-engine/internal/ledger"
	"github.com/drift/drift-engine/internal/mcp"
)

type fakeKB struct {
	outlineRaw string
	entries    map[string]string
	tiers      map[string]mcp.EntryTier
	dropOne    bool
}

func (f *fakeKB) InitialContext(context.Context) (*mcp.Outline, error) {
	var es []mcp.OutlineEntry
	for path := range f.entries {
		tier := mcp.TierStandard
		if t, ok := f.tiers[path]; ok {
			tier = t
		}
		es = append(es, mcp.OutlineEntry{Path: path, Summary: "summary", Tier: tier})
	}
	return &mcp.Outline{Entries: es, Raw: f.outlineRaw}, nil
}

func (f *fakeKB) ReadEntries(_ context.Context, paths []string) ([]mcp.Entry, error) {
	var out []mcp.Entry
	for i, p := range paths {
		if f.dropOne && i == 0 {
			continue // simulate a short read
		}
		out = append(out, mcp.Entry{Path: p, Markdown: f.entries[p]})
	}
	return out, nil
}

var at = time.Date(2026, 9, 19, 12, 0, 0, 0, time.UTC)

func newKB() *fakeKB {
	return &fakeKB{
		outlineRaw: "- support/returns - the return window [core]\n",
		entries: map[string]string{
			"support/returns": "Returns are accepted within 45 days of delivery.\n\n" +
				"Longer text follows, mentioning 15 percent and other numbers.\n\n" +
				"[1]: https://northwind.example/legal/returns-v4.pdf\n" +
				"[2]: https://northwind.example/help/returns\n",
			"brand/tone": "Write plainly and directly.\n\n[1]: https://northwind.example/brand/voice\n",
		},
		tiers: map[string]mcp.EntryTier{
			"support/returns": mcp.TierCore,
			"brand/tone":      mcp.TierPeripheral,
		},
	}
}

func TestCapture_ExtractsTypedValuesAndCitations(t *testing.T) {
	snap, err := ledger.Capture(context.Background(), newKB(), "kb.northwind", 47, at)
	if err != nil {
		t.Fatalf("capture: %v", err)
	}

	if snap.ID != "build.47" || snap.BuildNumber != 47 {
		t.Errorf("identity = %s/%d", snap.ID, snap.BuildNumber)
	}
	if len(snap.Claims) != 2 {
		t.Fatalf("got %d claims, want 2", len(snap.Claims))
	}

	var returns, tone bool
	for _, c := range snap.Claims {
		switch c.Path {
		case "support/returns":
			returns = true
			if !c.HasTypedValue() {
				t.Fatal("support/returns must carry a typed value — it is what gives the " +
					"contradiction check confidence 1.0")
			}
			if *c.Value != 45 || c.Unit != "days" {
				t.Errorf("value = %v %s, want 45 days", *c.Value, c.Unit)
			}
			if c.Tier != "core" {
				t.Errorf("tier = %q, want core (from the outline tag)", c.Tier)
			}
			if len(c.Citations) != 2 {
				t.Errorf("citations = %v, want both sources — they are the evidence chain", c.Citations)
			}
		case "brand/tone":
			tone = true
			if c.HasTypedValue() {
				t.Error("brand/tone has no quantity; inventing one would fake certainty")
			}
			if c.Tier != "peripheral" {
				t.Errorf("tier = %q, want peripheral", c.Tier)
			}
		}
	}
	if !returns || !tone {
		t.Error("not all entries became claims")
	}
}

// The quantity extractor reads the statement, not the whole entry. An entry that
// mentions several numbers must not have an arbitrary one attached — a wrong
// typed value reports confidence 1.0 on a meaningless comparison, which is worse
// than extracting nothing.
func TestCapture_DoesNotPickUpStrayNumbersFromTheBody(t *testing.T) {
	snap, err := ledger.Capture(context.Background(), newKB(), "kb", 1, at)
	if err != nil {
		t.Fatal(err)
	}
	for _, c := range snap.Claims {
		if c.Path == "support/returns" && *c.Value == 15 {
			t.Error("picked up '15 percent' from the body instead of '45 days' from the statement")
		}
	}
}

// Identical content must produce an identical hash, so an uneventful rebuild can
// skip the diff entirely.
func TestCapture_ContentAddressingIsStable(t *testing.T) {
	a, _ := ledger.Capture(context.Background(), newKB(), "kb", 47, at)
	b, _ := ledger.Capture(context.Background(), newKB(), "kb", 48, at.Add(time.Hour))

	if a.OutlineHash != b.OutlineHash {
		t.Errorf("same content hashed differently: %s vs %s", a.OutlineHash, b.OutlineHash)
	}
	if !ledger.Unchanged(a, b) {
		t.Error("Unchanged should be true for identical content")
	}
}

func TestCapture_ChangedContentChangesTheHash(t *testing.T) {
	before, _ := ledger.Capture(context.Background(), newKB(), "kb", 46, at)

	changed := newKB()
	changed.entries["support/returns"] = strings.Replace(
		changed.entries["support/returns"], "45 days", "30 days", 1)
	after, _ := ledger.Capture(context.Background(), changed, "kb", 47, at)

	if before.OutlineHash == after.OutlineHash {
		t.Error("a changed return window must change the build hash")
	}
	if ledger.Unchanged(before, after) {
		t.Error("Unchanged must be false when content differs")
	}
}

// The failure mode that would embarrass the product most: a short read looks
// like every missing claim was retired, so the engine would announce that the
// organisation abandoned half its policies.
func TestCapture_RefusesAPartialBuild(t *testing.T) {
	kb := newKB()
	kb.dropOne = true

	_, err := ledger.Capture(context.Background(), kb, "kb", 47, at)
	if err == nil {
		t.Fatal("expected an error: a partial snapshot would read as mass retirement")
	}
	if !strings.Contains(err.Error(), "mass retirement") {
		t.Errorf("the error should explain why a partial build is refused, got: %v", err)
	}
}

func TestCapture_ClaimIDsAreStableAcrossBuilds(t *testing.T) {
	a, _ := ledger.Capture(context.Background(), newKB(), "kb", 46, at)
	b, _ := ledger.Capture(context.Background(), newKB(), "kb", 47, at)

	ids := map[string]bool{}
	for _, c := range a.Claims {
		ids[c.ID] = true
	}
	for _, c := range b.Claims {
		if !ids[c.ID] {
			t.Errorf("claim ID %q is not stable across builds; the differ matches on path "+
				"but the ledger must not churn IDs either", c.ID)
		}
	}
}

// A qualifier between the number and its unit is how policy prose is actually
// written, and the value has to survive it.
//
// This is not cosmetic. An untyped claim is compared as prose, so *any*
// rewording of it is reported as a contradiction at 0.55 — which means a
// shipping policy reworded without changing its commitment would have raised a
// drift event. Staying silent on a reworded-but-unchanged fact is the hardest
// thing the differ does, and it rests on this extraction.
func TestCapture_TypesAQuantityWrittenWithAQualifier(t *testing.T) {
	for _, tc := range []struct {
		name      string
		statement string
		want      float64
		unit      string
	}{
		{"business days", "Orders are dispatched within 2 business days.", 2, "days"},
		{"working days", "Refunds are issued within 5 working days.", 5, "days"},
		{"calendar days", "The hold lasts 30 calendar days.", 30, "days"},
		{"no qualifier", "Returns are accepted within 45 days of delivery.", 45, "days"},
		// `%` never matched before: the trailing word boundary had no word
		// character to sit against.
		{"percent sign", "Opened items are subject to a 15% restocking fee.", 15, "percent"},
		{"percent word", "Opened items are subject to a 15 percent restocking fee.", 15, "percent"},
	} {
		t.Run(tc.name, func(t *testing.T) {
			kb := newKB()
			kb.entries = map[string]string{"support/x": tc.statement + "\n"}
			kb.tiers = nil

			snap, err := ledger.Capture(context.Background(), kb, "kb.test", 1, at)
			if err != nil {
				t.Fatalf("capture: %v", err)
			}
			claim := snap.Claims[0]
			if claim.Value == nil {
				t.Fatalf("%q extracted no typed value; it would fall to the semantic path", tc.statement)
			}
			if *claim.Value != tc.want || claim.Unit != tc.unit {
				t.Errorf("extracted %g %s, want %g %s", *claim.Value, claim.Unit, tc.want, tc.unit)
			}
		})
	}
}

// The qualifier list is closed on purpose.
//
// Only `business`, `working` and `calendar` may sit between the number and its
// unit. Allowing any word would make the extraction guess at what a number
// refers to, and a wrong typed value is worse than no typed value: it reports
// confidence 1.0 on a comparison of two numbers that do not mean the same thing.
//
// Note what this test does NOT claim. Plain adjacency still wins wherever it
// occurs, so a sentence containing "3 days" anywhere types as three days even
// if the surrounding prose means something else. That is the documented,
// pre-existing conservatism of the rule, not a gap this widening opened, and
// pretending otherwise here would be a test asserting a promise nobody made.
func TestCapture_DoesNotBridgeNumberAndUnitWithAnArbitraryWord(t *testing.T) {
	kb := newKB()
	kb.entries = map[string]string{
		"support/x": "Returns are inspected within 2 supplementary days.\n",
	}
	kb.tiers = nil

	snap, err := ledger.Capture(context.Background(), kb, "kb.test", 1, at)
	if err != nil {
		t.Fatalf("capture: %v", err)
	}
	if v := snap.Claims[0].Value; v != nil {
		t.Errorf("invented a typed value of %g from an unlisted qualifier; it must stay untyped", *v)
	}
}
