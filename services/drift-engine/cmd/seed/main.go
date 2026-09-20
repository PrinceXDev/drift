// Command seed emits the demo dataset as NDJSON for `sanity dataset import`.
//
//	go run ./cmd/seed > ../../sanity/seed/northwind.ndjson
//	npx sanity dataset import sanity/seed/northwind.ndjson production --replace
//
// The values come from internal/seeddata — the same package the engine's golden
// tests assert against. There is deliberately no second copy of the demo data:
// a knowledge-integrity tool whose own fixtures drifted apart from its own demo
// would be a poor advertisement.
//
// Document IDs are stable and human-readable (`page.returns`, `claim.returns-window`)
// so that re-running the import updates documents in place rather than creating
// duplicates, and so a judge reading the dataset can follow the references by eye.
package main

import (
	"bufio"
	"context"
	"encoding/json"
	"flag"
	"fmt"
	"os"

	"github.com/drift/drift-engine/internal/pipeline"
	"github.com/drift/drift-engine/internal/seeddata"
	"github.com/drift/drift-engine/pkg/driftv1"
)

// ref builds a Sanity reference value.
func ref(id string) map[string]any {
	return map[string]any{"_type": "reference", "_ref": id}
}

// keyed adds the `_key` every item in a Sanity array needs.
func keyed(i int, v map[string]any) map[string]any {
	v["_key"] = fmt.Sprintf("k%02d", i)
	return v
}

// block turns a plain string into a Portable Text block.
func block(i int, text string) map[string]any {
	return map[string]any{
		"_type": "block",
		"_key":  fmt.Sprintf("b%02d", i),
		"style": "normal",
		"children": []map[string]any{{
			"_type": "span",
			"_key":  fmt.Sprintf("s%02d", i),
			"text":  text,
		}},
	}
}

// Fixtures is the payload the console renders before live credentials exist.
// Emitting it from the same package the engine tests use means the UI is always
// developed against real engine output, never against hand-written mock JSON
// that quietly disagrees with what the engine actually produces.
type Fixtures struct {
	Builds []driftv1.BuildSnapshot `json:"builds"`
	Claims []driftv1.Claim         `json:"claims"`
	Pages  []driftv1.ContentPage   `json:"pages"`
	// Assertions is every dependency: pages and non-page surfaces alike. The
	// name is kept because that is what the documents are called; what changed
	// is that a page is no longer the only thing that can carry one.
	Assertions []driftv1.Assertion  `json:"assertions"`
	Surfaces   []driftv1.Surface    `json:"surfaces"`
	Sources    []driftv1.Source     `json:"sources"`
	Events     []driftv1.DriftEvent `json:"events"`
	Summary    pipeline.Summary     `json:"summary"`
}

func main() {
	format := flag.String("format", "ndjson",
		"ndjson for `sanity dataset import`, or fixtures for the console")
	flag.Parse()

	out := bufio.NewWriter(os.Stdout)
	defer out.Flush()

	if *format == "fixtures" {
		emitFixtures(out)
		return
	}

	enc := json.NewEncoder(out)
	emit := func(doc map[string]any) {
		if err := enc.Encode(doc); err != nil {
			fmt.Fprintf(os.Stderr, "encode %v: %v\n", doc["_id"], err)
			os.Exit(1)
		}
	}

	for _, s := range seeddata.Sources() {
		emit(map[string]any{
			"_id": s.ID, "_type": "source",
			"title": s.Title, "kind": s.Kind, "uri": s.URI,
			"owner": s.Owner, "authority": s.Authority,
			"lastChangedAt": s.ChangedAt.Format("2006-01-02T15:04:05Z"),
			"kbSourceRef":   s.ID,
			"body":          sourceBody(s.ID),
		})
	}

	for _, p := range seeddata.Pages() {
		body := make([]map[string]any, 0, len(p.Body))
		for i, text := range p.Body {
			body = append(body, block(i, text))
		}
		emit(map[string]any{
			"_id": p.ID, "_type": "contentPage",
			"title":   p.Title,
			"slug":    map[string]any{"_type": "slug", "current": p.Slug},
			"summary": p.Summary, "owner": p.Owner, "body": body,
		})
	}

	// Build 46 first: claims reference the build they were first seen in, so the
	// snapshots have to land before the claims that point at them. NDJSON import
	// tolerates forward references, but ordering the file the way the data
	// actually depends makes it readable.
	for _, b := range []driftv1.BuildSnapshot{seeddata.Build46(), seeddata.Build47()} {
		emit(buildDoc(b))
	}

	// Claims are emitted from the latest build — that is current belief. Retired
	// claims are emitted separately below so history stays traversable.
	// The lineage refs come off the claim itself rather than being written here.
	// They used to be the literal strings "build.46" and "build.47" for every
	// claim, which made the Studio show a dataset where nothing had ever been
	// re-verified and everything had changed at once — a lineage that was
	// uniform, confident and wrong.
	current := seeddata.Build47()
	seen := map[string]bool{}
	for _, c := range current.Claims {
		seen[c.ID] = true
		emit(claimDoc(c, driftv1.ClaimActive))
	}
	for _, c := range seeddata.Build46().Claims {
		if !seen[c.ID] {
			// Present in 46, gone in 47: the organisation stopped asserting it.
			emit(claimDoc(c, driftv1.ClaimRetired))
		}
	}

	// Surfaces land before the assertions that reference them, so the dataset
	// reads in dependency order.
	for _, s := range seeddata.Surfaces() {
		emit(map[string]any{
			"_id": surfaceDocID(s.ID), "_type": "surface",
			"surfaceId": s.ID, "kind": string(s.Kind),
			"title": s.Title, "owner": s.Owner, "locator": s.Locator,
		})
	}

	// Dependencies(), not Assertions(): the Support Bot depends on two claims
	// and is as much a part of the graph as the seven pages.
	for _, a := range seeddata.Dependencies() {
		doc := map[string]any{
			"_id": a.ID, "_type": "assertion",
			"claim":     ref(a.ClaimID),
			"fieldPath": a.FieldPath,
			// The published sentence for a page; the question asked, for an
			// agent. Either way it is what a human reads to decide whether this
			// dependent is still saying the right thing.
			"renderedText":         a.RenderedText,
			"verifiedAgainstBuild": ref(a.VerifiedAt),
			"state":                string(a.State),
		}
		if a.OnPage() {
			doc["page"] = ref(a.PageID)
			doc["blockKey"] = a.BlockKey
		} else {
			doc["surface"] = ref(surfaceDocID(a.SurfaceID))
		}
		emit(doc)
	}
}

// surfaceDocID namespaces a surface document so a page's surface record does
// not collide with the page itself. They are different documents about the same
// thing: the page is the content, the surface is the registration.
func surfaceDocID(id string) string { return id + ".surface" }

func claimDoc(c driftv1.Claim, status driftv1.ClaimStatus) map[string]any {
	citations := make([]map[string]any, 0, len(c.Citations))
	for i, id := range c.Citations {
		citations = append(citations, keyed(i, ref(id)))
	}
	doc := map[string]any{
		"_id": c.ID, "_type": "claim",
		"path": c.Path, "statement": c.Statement,
		"tier": string(c.Tier), "status": string(status),
		"citations": citations,
	}
	// A stamp naming a build the dataset does not carry is omitted rather than
	// emitted as a dangling reference. A provenance view is the last place to
	// render a link that goes nowhere.
	for field, buildID := range map[string]string{
		"firstSeenBuild":    c.FirstSeenBuild,
		"lastVerifiedBuild": c.LastVerifiedBuild,
		"lastChangedBuild":  c.LastChangedBuild,
	} {
		if buildID != "" {
			doc[field] = ref(buildID)
		}
	}
	if c.HasTypedValue() {
		doc["value"] = *c.Value
		doc["unit"] = c.Unit
	}
	return doc
}

func buildDoc(b driftv1.BuildSnapshot) map[string]any {
	conflicts := make([]map[string]any, 0, len(b.Conflicts))
	for i, c := range b.Conflicts {
		competing := make([]map[string]any, 0, len(c.CompetingValues))
		for j, cv := range c.CompetingValues {
			v := map[string]any{
				"_type": "competingValue", "statement": cv.Statement,
				"source": ref(cv.SourceID),
			}
			if cv.Value != nil {
				v["value"] = *cv.Value
				v["unit"] = cv.Unit
			}
			competing = append(competing, keyed(j, v))
		}
		conflicts = append(conflicts, keyed(i, map[string]any{
			"_type": "conflict", "path": c.Path, "competingValues": competing,
		}))
	}
	return map[string]any{
		"_id": b.ID, "_type": "buildSnapshot",
		"kbId": b.KBID, "buildNumber": b.BuildNumber,
		"builtAt":     b.BuiltAt.Format("2006-01-02T15:04:05Z"),
		"outlineHash": b.OutlineHash, "entryCount": b.EntryCount(),
		"conflicts": conflicts,
	}
}

// sourceBody supplies the prose a Knowledge Base would actually index.
//
// This is the text a demo operator edits to trigger drift: change 45 back to 30
// in the returns policy, rebuild, and watch the feed react.
func sourceBody(id string) string {
	switch id {
	case seeddata.SrcReturnsPolicy:
		return "Returns & Refunds Policy, version 4, effective 19 September 2026.\n\n" +
			"Returns are accepted within 45 days of delivery. This supersedes the 30 day " +
			"window stated in version 3.\n\n" +
			"The restocking fee previously applied to opened items is abolished with " +
			"immediate effect.\n\n" +
			"We match any advertised price from an authorised reseller within 14 days of purchase."
	case seeddata.SrcHelpCentre:
		return "Returns\n\nYou have 30 days from delivery to start a return. " +
			"Head to your order history and choose Start a return."
	case seeddata.SrcWarranty:
		return "All Northwind Audio products carry a 24 month limited warranty against " +
			"defects in materials and workmanship, beginning on the date of delivery."
	case seeddata.SrcShipping:
		return "Orders over 75 USD ship free within the contiguous United States. " +
			"We dispatch orders within 2 business days of purchase."
	case seeddata.SrcEUAddendum:
		return "Customers in the European Union have a 14 day cooling-off period under the " +
			"Consumer Rights Directive, in addition to any return window offered by Northwind Audio."
	case seeddata.SrcBrandGuide:
		return "Voice: write plainly and directly. Avoid exclamation marks. " +
			"Prefer short sentences to enthusiastic ones."
	default:
		return ""
	}
}

// emitFixtures runs the real pipeline over the seed builds and writes everything
// the console needs as one JSON document.
func emitFixtures(out *bufio.Writer) {
	from, to := seeddata.Build46(), seeddata.Build47()

	registry, err := seeddata.NewRegistry()
	if err != nil {
		fmt.Fprintf(os.Stderr, "surface registry: %v\n", err)
		os.Exit(1)
	}

	res, err := pipeline.Run(
		context.Background(), from, to, registry, pipeline.DefaultConfig(),
	)
	if err != nil {
		fmt.Fprintf(os.Stderr, "pipeline: %v\n", err)
		os.Exit(1)
	}

	enc := json.NewEncoder(out)
	enc.SetIndent("", "  ")
	if err := enc.Encode(Fixtures{
		Builds:     []driftv1.BuildSnapshot{from, to},
		Claims:     allClaims(from, to),
		Pages:      seeddata.Pages(),
		Assertions: seeddata.Dependencies(),
		Surfaces:   seeddata.Surfaces(),
		Sources:    seeddata.Sources(),
		Events:     res.Events,
		Summary:    res.Summarise(),
	}); err != nil {
		fmt.Fprintf(os.Stderr, "encode fixtures: %v\n", err)
		os.Exit(1)
	}
}

// allClaims returns current belief plus everything the organisation has stopped
// asserting.
//
// Emitting only the latest build's claims would make retired claims unresolvable
// — a page still advertising an abolished restocking fee would render with a bare
// document ID and no statement, which is precisely the kind of dangling reference
// this product exists to catch. Belief history has to stay traversable.
func allClaims(from, to driftv1.BuildSnapshot) []driftv1.Claim {
	out := make([]driftv1.Claim, 0, len(to.Claims)+len(from.Claims))
	seen := make(map[string]bool, len(to.Claims))

	for _, c := range to.Claims {
		c.Status = driftv1.ClaimActive
		seen[c.ID] = true
		out = append(out, c)
	}
	for _, c := range from.Claims {
		if !seen[c.ID] {
			c.Status = driftv1.ClaimRetired
			out = append(out, c)
		}
	}
	return out
}
