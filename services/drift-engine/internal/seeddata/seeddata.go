// Package seeddata is the canonical demo fixture, defined exactly once.
//
// Both the engine's golden tests and the Sanity dataset import derive from this
// package (`cmd/seed` emits NDJSON from the same values the tests assert on).
// That matters more than it looks: if the demo dataset and the test fixtures
// were maintained separately they would diverge, and we would be shipping a
// knowledge-integrity tool whose own demo data contradicted its own test suite.
//
// # The scenario
//
// Northwind Audio sells headphones and speakers. In March they extended their
// return window from 30 days to 45 — the legal team updated the policy PDF and
// told the support lead, who updated the help centre header and nothing else.
//
// Five months later, seven published pages still say 30 days. Nobody noticed,
// because nothing in the stack connects "the policy PDF changed" to "these seven
// paragraphs are now wrong".
//
// The company is deliberately ordinary. A demo dataset with real stakes and
// boring subject matter is far more convincing than an exotic one, because every
// judge has worked somewhere this exact thing happened.
package seeddata

import (
	"time"

	"github.com/drift/drift-engine/internal/surface"
	"github.com/drift/drift-engine/pkg/driftv1"
)

func f(v float64) *float64 { return &v }

// stamp applies claim lineage exactly as a live capture would.
//
// The demo's provenance is not hand-written. It is produced by the same
// `driftv1.Claim.WithLineage` the ledger calls on every real capture, so the
// lineage a judge reads in the Control Room is lineage the engine computed, not
// lineage somebody typed. `TestSeedLineageMatchesLedger` holds that line.
//
// Build 46 is the baseline: it is the earliest snapshot this dataset retains,
// so every claim in it is stamped as first seen there. That is not a claim that
// Northwind had no policies before 12 September — it is the ledger saying it
// has no record older than the oldest thing it kept, which is the only honest
// thing it can say.
func stamp(claims []driftv1.Claim, prior []driftv1.Claim, buildID string) []driftv1.Claim {
	index := make(map[string]*driftv1.Claim, len(prior))
	for i := range prior {
		index[prior[i].ID] = &prior[i]
	}
	out := make([]driftv1.Claim, 0, len(claims))
	for _, c := range claims {
		out = append(out, c.WithLineage(index[c.ID], buildID))
	}
	return out
}

var (
	build46At = time.Date(2026, 9, 12, 9, 14, 0, 0, time.UTC)
	build47At = time.Date(2026, 9, 19, 11, 2, 0, 0, time.UTC)
)

// Source IDs, referenced from claims' citations.
const (
	SrcReturnsPolicy = "source.returns-policy-v4"
	SrcHelpCentre    = "source.help-centre-returns"
	SrcWarranty      = "source.warranty-terms"
	SrcShipping      = "source.shipping-policy"
	SrcEUAddendum    = "source.eu-distance-selling"
	SrcBrandGuide    = "source.brand-voice-guide"
)

// Sources returns the authoritative inputs the Knowledge Base is built from.
//
// Authority is what lets a conflict resolve deterministically. The signed policy
// PDF outranks the help centre page, so when the two disagree about the return
// window the engine knows which one to believe — and only asks a human because
// the claim is tier `core`, not because it is confused.
func Sources() []driftv1.Source {
	return []driftv1.Source{
		{
			ID: SrcReturnsPolicy, Title: "Returns & Refunds Policy v4",
			Kind: "policy", URI: "https://northwind.example/legal/returns-v4.pdf",
			Owner: "legal@northwind.example", Authority: 5,
			ChangedAt: time.Date(2026, 9, 19, 10, 47, 0, 0, time.UTC),
		},
		{
			ID: SrcHelpCentre, Title: "Help Centre — Returns",
			Kind: "page", URI: "https://northwind.example/help/returns",
			Owner: "support@northwind.example", Authority: 2,
			ChangedAt: time.Date(2026, 3, 2, 14, 0, 0, 0, time.UTC),
		},
		{
			ID: SrcWarranty, Title: "Limited Warranty Terms",
			Kind: "contract", URI: "https://northwind.example/legal/warranty.pdf",
			Owner: "legal@northwind.example", Authority: 5,
			ChangedAt: time.Date(2025, 11, 4, 9, 0, 0, 0, time.UTC),
		},
		{
			ID: SrcShipping, Title: "Shipping & Dispatch Policy",
			Kind: "policy", URI: "https://northwind.example/legal/shipping.pdf",
			Owner: "ops@northwind.example", Authority: 4,
			ChangedAt: time.Date(2026, 6, 21, 8, 30, 0, 0, time.UTC),
		},
		{
			ID: SrcEUAddendum, Title: "EU Distance Selling Addendum",
			Kind: "contract", URI: "https://northwind.example/legal/eu-addendum.pdf",
			Owner: "legal@northwind.example", Authority: 5,
			ChangedAt: time.Date(2025, 8, 14, 9, 0, 0, 0, time.UTC),
		},
		{
			ID: SrcBrandGuide, Title: "Brand Voice Guide",
			Kind: "spec", URI: "https://northwind.example/brand/voice",
			Owner: "marketing@northwind.example", Authority: 3,
			ChangedAt: time.Date(2026, 9, 18, 16, 5, 0, 0, time.UTC),
		},
	}
}

// Build46 is what Northwind asserted as of 12 September — before legal updated
// the returns policy.
func Build46() driftv1.BuildSnapshot {
	return driftv1.BuildSnapshot{
		ID: "build.46", KBID: "kb.northwind-policies", BuildNumber: 46,
		BuiltAt:     build46At,
		OutlineHash: "sha256:9f2c41ab7e05d3c8",
		Claims:      stamp(build46Claims(), nil, "build.46"),
	}
}

func build46Claims() []driftv1.Claim {
	return []driftv1.Claim{
		{
			ID: "claim.returns-window", Path: "support/returns",
			Statement: "Returns are accepted within 30 days of delivery.",
			Value:     f(30), Unit: "days", Tier: driftv1.TierCore,
			Citations: []string{SrcReturnsPolicy, SrcHelpCentre},
			Status:    driftv1.ClaimActive,
		},
		{
			ID: "claim.returns-eu", Path: "support/returns-eu",
			Statement: "EU customers have a 14 day cooling-off period in addition to the standard window.",
			Value:     f(14), Unit: "days", Tier: driftv1.TierCore,
			Citations: []string{SrcEUAddendum}, Status: driftv1.ClaimActive,
		},
		{
			ID: "claim.restocking-fee", Path: "support/restocking-fee",
			Statement: "Opened items are subject to a 15% restocking fee.",
			Value:     f(15), Unit: "percent", Tier: driftv1.TierStandard,
			Citations: []string{SrcReturnsPolicy}, Status: driftv1.ClaimActive,
		},
		{
			ID: "claim.warranty", Path: "support/warranty",
			Statement: "All products carry a 24 month limited warranty.",
			Value:     f(24), Unit: "months", Tier: driftv1.TierCore,
			Citations: []string{SrcWarranty}, Status: driftv1.ClaimActive,
		},
		{
			ID: "claim.free-shipping", Path: "shipping/free-threshold",
			Statement: "Orders over 75 USD ship free within the contiguous US.",
			Value:     f(75), Unit: "USD", Tier: driftv1.TierStandard,
			Citations: []string{SrcShipping}, Status: driftv1.ClaimActive,
		},
		{
			ID: "claim.dispatch", Path: "shipping/dispatch-time",
			Statement: "Orders are dispatched within 2 business days.",
			Value:     f(2), Unit: "days", Tier: driftv1.TierStandard,
			Citations: []string{SrcShipping}, Status: driftv1.ClaimActive,
		},
		{
			// Untyped on purpose: the fallback path has to be visible in the
			// demo, and visibly weaker than the typed one.
			ID: "claim.brand-tone", Path: "brand/tone",
			Statement: "Write warmly and enthusiastically. Exclamation marks are welcome.",
			Tier:      driftv1.TierPeripheral,
			Citations: []string{SrcBrandGuide}, Status: driftv1.ClaimActive,
		},
	}
}

// Build47 is what Northwind asserts as of 19 September, after legal published
// Returns & Refunds Policy v4.
//
// Four things moved, and they exercise four different detectors:
//
//	support/returns          30 -> 45 days     typed value, confidence 1.0, tier core
//	support/restocking-fee   removed entirely  retired, confidence 1.0
//	support/price-match      new claim         added, confidence 1.0
//	brand/tone               reworded prose    semantic, confidence 0.55
//
// And one deliberate non-event: shipping/dispatch-time is reworded but still
// says 2 days, so it must produce nothing at all.
func Build47() driftv1.BuildSnapshot {
	return driftv1.BuildSnapshot{
		ID: "build.47", KBID: "kb.northwind-policies", BuildNumber: 47,
		BuiltAt:     build47At,
		OutlineHash: "sha256:3d81e6f0ac94b527",
		Claims:      stamp(build47Claims(), Build46().Claims, "build.47"),
		// The build itself flagged that two sources disagree about the return
		// window. Most systems would treat this as build noise. Here it is the
		// Conflict Inbox, and resolving it writes a standing Instruction back into
		// the Knowledge Base so build 48 is correct by construction.
		Conflicts: []driftv1.Conflict{
			{
				Path: "support/returns",
				CompetingValues: []driftv1.CompetingValue{
					{
						Statement: "Returns are accepted within 45 days of delivery.",
						Value:     f(45), Unit: "days",
						SourceID: SrcReturnsPolicy, Authority: 5,
					},
					{
						Statement: "You have 30 days from delivery to start a return.",
						Value:     f(30), Unit: "days",
						SourceID: SrcHelpCentre, Authority: 2,
					},
				},
			},
		},
	}
}

func build47Claims() []driftv1.Claim {
	return []driftv1.Claim{
		{
			ID: "claim.returns-window", Path: "support/returns",
			Statement: "Returns are accepted within 45 days of delivery.",
			Value:     f(45), Unit: "days", Tier: driftv1.TierCore,
			Citations: []string{SrcReturnsPolicy, SrcHelpCentre},
			Status:    driftv1.ClaimActive,
		},
		{
			ID: "claim.returns-eu", Path: "support/returns-eu",
			Statement: "EU customers have a 14 day cooling-off period in addition to the standard window.",
			Value:     f(14), Unit: "days", Tier: driftv1.TierCore,
			Citations: []string{SrcEUAddendum}, Status: driftv1.ClaimActive,
		},
		// claim.restocking-fee is absent: v4 abolished the fee.
		{
			ID: "claim.warranty", Path: "support/warranty",
			Statement: "All products carry a 24 month limited warranty.",
			Value:     f(24), Unit: "months", Tier: driftv1.TierCore,
			Citations: []string{SrcWarranty}, Status: driftv1.ClaimActive,
		},
		{
			ID: "claim.free-shipping", Path: "shipping/free-threshold",
			Statement: "Orders over 75 USD ship free within the contiguous US.",
			Value:     f(75), Unit: "USD", Tier: driftv1.TierStandard,
			Citations: []string{SrcShipping}, Status: driftv1.ClaimActive,
		},
		{
			// Reworded, same value. Must NOT drift. This is the noise-control
			// case and the one most likely to regress.
			ID: "claim.dispatch", Path: "shipping/dispatch-time",
			Statement: "We dispatch orders within 2 business days of purchase.",
			Value:     f(2), Unit: "days", Tier: driftv1.TierStandard,
			Citations: []string{SrcShipping}, Status: driftv1.ClaimActive,
		},
		{
			ID: "claim.brand-tone", Path: "brand/tone",
			Statement: "Write plainly and directly. Avoid exclamation marks.",
			Tier:      driftv1.TierPeripheral,
			Citations: []string{SrcBrandGuide}, Status: driftv1.ClaimActive,
		},
		{
			ID: "claim.price-match", Path: "support/price-match",
			Statement: "We match any advertised price from an authorised reseller within 14 days of purchase.",
			Value:     f(14), Unit: "days", Tier: driftv1.TierStandard,
			Citations: []string{SrcReturnsPolicy}, Status: driftv1.ClaimActive,
		},
	}
}

// Pages are the published documents. Seven of them assert the return window —
// which is the number that turns red in the demo.
func Pages() []driftv1.ContentPage {
	return []driftv1.ContentPage{
		{
			ID: "page.returns", Title: "Returns & Refunds", Slug: "returns",
			Owner:   "support@northwind.example",
			Summary: "How to return a Northwind Audio product.",
			Body: []string{
				"Changed your mind? No problem.",
				"You have 30 days from delivery to start a return.",
				"Opened items are subject to a 15% restocking fee.",
				"Refunds are issued to the original payment method.",
			},
		},
		{
			ID: "page.faq", Title: "Frequently Asked Questions", Slug: "faq",
			Owner:   "support@northwind.example",
			Summary: "Answers to the questions we get most often.",
			Body: []string{
				"How long do I have to return something?",
				"Our return window is 30 days from the date your order is delivered.",
				"Do you ship internationally?",
				"Yes, to 34 countries.",
			},
		},
		{
			ID: "page.aurora", Title: "Aurora Wireless Headphones", Slug: "products/aurora",
			Owner:   "marketing@northwind.example",
			Summary: "Reference-grade wireless headphones.",
			Body: []string{
				"Forty hours of playback. Adaptive noise cancellation.",
				"Free shipping on orders over 75 USD, and a 30 day return window if they are not for you.",
				"Covered by our 24 month limited warranty.",
			},
		},
		{
			ID: "page.tide", Title: "Tide Portable Speaker", Slug: "products/tide",
			Owner:   "marketing@northwind.example",
			Summary: "A speaker that survives the beach.",
			Body: []string{
				"IP67 rated. Twelve hour battery.",
				"Try it for 30 days. If it is not for you, send it back.",
			},
		},
		{
			ID: "page.checkout-terms", Title: "Checkout Terms", Slug: "checkout-terms",
			Owner:   "legal@northwind.example",
			Summary: "The terms you accept when you place an order.",
			Body: []string{
				"By completing this order you agree to the following terms.",
				"Returns may be initiated within 30 days of delivery.",
				"EU customers additionally have a 14 day cooling-off period.",
			},
		},
		{
			ID: "page.contact", Title: "Contact Support", Slug: "support/contact",
			Owner:   "support@northwind.example",
			Summary: "How to reach a human.",
			Body: []string{
				"Our support team replies within one business day.",
				"Before you write in: most return questions are answered by our 30 day policy page.",
			},
		},
		{
			ID: "page.holiday-guide", Title: "Holiday Shopping Guide", Slug: "blog/holiday-guide",
			Owner:   "marketing@northwind.example",
			Summary: "What to buy, and how long you have to change your mind.",
			Body: []string{
				"Shopping early this year? Here is what to know.",
				"Every order is covered by a 30 day return window, so you can buy with confidence.",
				"Orders over 75 USD ship free.",
			},
		},
	}
}

// Assertions are the edges the blast-radius walk follows.
//
// Seven of these reference claim.returns-window. When the return window changes,
// the query finds exactly these seven — not six, not eight, and not "pages that
// probably mention returns".
func Assertions() []driftv1.Assertion {
	return []driftv1.Assertion{
		// The seven that make the graph turn red.
		{
			ID: "assert.returns-1", ClaimID: "claim.returns-window", PageID: "page.returns",
			FieldPath: "body[1]", BlockKey: "b01", RenderedText: "You have 30 days from delivery to start a return.",
			VerifiedAt: "build.46", State: driftv1.AssertionVerified,
		},
		{
			ID: "assert.returns-2", ClaimID: "claim.returns-window", PageID: "page.faq",
			FieldPath: "body[1]", BlockKey: "b01", RenderedText: "Our return window is 30 days from the date your order is delivered.",
			VerifiedAt: "build.46", State: driftv1.AssertionVerified,
		},
		{
			ID: "assert.returns-3", ClaimID: "claim.returns-window", PageID: "page.aurora",
			FieldPath: "body[1]", BlockKey: "b01", RenderedText: "Free shipping on orders over 75 USD, and a 30 day return window if they are not for you.",
			VerifiedAt: "build.46", State: driftv1.AssertionVerified,
		},
		{
			ID: "assert.returns-4", ClaimID: "claim.returns-window", PageID: "page.tide",
			FieldPath: "body[1]", BlockKey: "b01", RenderedText: "Try it for 30 days. If it is not for you, send it back.",
			VerifiedAt: "build.46", State: driftv1.AssertionVerified,
		},
		{
			ID: "assert.returns-5", ClaimID: "claim.returns-window", PageID: "page.checkout-terms",
			FieldPath: "body[1]", BlockKey: "b01", RenderedText: "Returns may be initiated within 30 days of delivery.",
			VerifiedAt: "build.46", State: driftv1.AssertionVerified,
		},
		{
			ID: "assert.returns-6", ClaimID: "claim.returns-window", PageID: "page.contact",
			FieldPath: "body[1]", BlockKey: "b01", RenderedText: "Before you write in: most return questions are answered by our 30 day policy page.",
			VerifiedAt: "build.46", State: driftv1.AssertionVerified,
		},
		{
			ID: "assert.returns-7", ClaimID: "claim.returns-window", PageID: "page.holiday-guide",
			FieldPath: "body[1]", BlockKey: "b01", RenderedText: "Every order is covered by a 30 day return window, so you can buy with confidence.",
			VerifiedAt: "build.46", State: driftv1.AssertionVerified,
		},

		// The restocking fee, asserted in one place. When the claim is retired,
		// this page is left asserting a policy that no longer exists — a different
		// failure from a wrong number, and worth showing separately.
		{
			ID: "assert.restocking-1", ClaimID: "claim.restocking-fee", PageID: "page.returns",
			FieldPath: "body[2]", BlockKey: "b02", RenderedText: "Opened items are subject to a 15% restocking fee.",
			VerifiedAt: "build.46", State: driftv1.AssertionVerified,
		},

		// Unaffected assertions. They exist so the demo shows a graph with edges
		// that stay green — a screen where everything is red proves nothing.
		{
			ID: "assert.warranty-1", ClaimID: "claim.warranty", PageID: "page.aurora",
			FieldPath: "body[2]", BlockKey: "b02", RenderedText: "Covered by our 24 month limited warranty.",
			VerifiedAt: "build.46", State: driftv1.AssertionVerified,
		},
		{
			ID: "assert.shipping-1", ClaimID: "claim.free-shipping", PageID: "page.holiday-guide",
			FieldPath: "body[2]", BlockKey: "b02", RenderedText: "Orders over 75 USD ship free.",
			VerifiedAt: "build.46", State: driftv1.AssertionVerified,
		},
		{
			ID: "assert.shipping-2", ClaimID: "claim.free-shipping", PageID: "page.aurora",
			FieldPath: "body[1]", BlockKey: "b01", RenderedText: "Free shipping on orders over 75 USD, and a 30 day return window if they are not for you.",
			VerifiedAt: "build.46", State: driftv1.AssertionVerified,
		},
		{
			ID: "assert.eu-1", ClaimID: "claim.returns-eu", PageID: "page.checkout-terms",
			FieldPath: "body[2]", BlockKey: "b02", RenderedText: "EU customers additionally have a 14 day cooling-off period.",
			VerifiedAt: "build.46", State: driftv1.AssertionVerified,
		},
	}
}

// AssertionsByClaim indexes the fixture for the in-memory AssertionReader used
// by tests and by `cmd/replay`.
//
// Indexes Dependencies(), not Assertions(): the blast radius is every place a
// claim is published, and the Support Bot is one of those places. An index that
// quietly stopped at pages would report six dependents where there are seven,
// which is the precise failure this product exists to make impossible.
func AssertionsByClaim() map[string][]driftv1.Assertion {
	out := map[string][]driftv1.Assertion{}
	for _, a := range Dependencies() {
		out[a.ClaimID] = append(out[a.ClaimID], a)
	}
	return out
}

// ---------------------------------------------------------------------------
// Surfaces
// ---------------------------------------------------------------------------

// SurfSupportBot is the Dissent agent, registered as a published surface.
//
// It is in the seed rather than only registered at runtime for one reason: the
// committed fixtures have to be deterministic, and a dependency that only
// exists once somebody has asked the bot a question would make the console show
// a different blast radius depending on whether anyone had used it. The runtime
// registration in `cmd/engine` adds to this; it does not replace it.
const SurfSupportBot = "surface.support-bot"

// Surfaces returns every published place that can depend on a claim.
//
// The seven content pages are surfaces of kind `page`, and the Dissent agent is
// a surface of kind `agent`. Listing them together is the point: from the
// ledger's perspective they are the same kind of thing — somewhere a fact is
// being repeated to a customer — and they differ only in how you fix them.
func Surfaces() []driftv1.Surface {
	out := make([]driftv1.Surface, 0, len(Pages())+1)
	for _, p := range Pages() {
		out = append(out, driftv1.Surface{
			ID:      p.ID,
			Kind:    driftv1.SurfacePage,
			Title:   p.Title,
			Owner:   p.Owner,
			Locator: "/" + p.Slug,
		})
	}
	return append(out, driftv1.Surface{
		ID:      SurfSupportBot,
		Kind:    driftv1.SurfaceAgent,
		Title:   "Support Bot",
		Owner:   "support@northwind.example",
		Locator: "dissent://northwind/support",
	})
}

// AgentDependencies are the claims the Support Bot has answered from.
//
// This is the half of the blast radius that page-shaped thinking misses. The
// bot answered a returns question on 12 September against build 46 and has been
// repeating "30 days" ever since — exactly as wrong as the seven pages, and
// until surfaces existed, exactly as invisible.
//
// It is corrected differently, which is why the kind matters: there is no
// paragraph to rewrite. The bot is right again the moment it re-reads the
// Knowledge Base, and the Control Room says so rather than queueing a
// correction nobody can publish.
func AgentDependencies() []driftv1.Assertion {
	return []driftv1.Assertion{
		{
			ID: "dep.support-bot.returns", ClaimID: "claim.returns-window",
			SurfaceID: SurfSupportBot, FieldPath: "answer",
			RenderedText: "How long do I have to return something?",
			VerifiedAt:   "build.46", State: driftv1.AssertionVerified,
		},
		{
			ID: "dep.support-bot.warranty", ClaimID: "claim.warranty",
			SurfaceID: SurfSupportBot, FieldPath: "answer",
			RenderedText: "Is there a warranty on the Aurora headphones?",
			VerifiedAt:   "build.46", State: driftv1.AssertionVerified,
		},
	}
}

// Dependencies is every edge in the graph: page assertions and surface
// dependencies together. This is what the blast-radius walk sees.
func Dependencies() []driftv1.Assertion {
	return append(Assertions(), AgentDependencies()...)
}

// NewRegistry returns the seed graph as a live registry, ready for an agent to
// register further dependencies against at runtime.
func NewRegistry() (*surface.Registry, error) {
	r := surface.NewRegistry()
	for _, s := range Surfaces() {
		if err := r.Register(s); err != nil {
			return nil, err
		}
	}
	for _, a := range Dependencies() {
		if err := r.Depend(a); err != nil {
			return nil, err
		}
	}
	return r, nil
}
