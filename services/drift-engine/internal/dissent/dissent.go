// Package dissent answers questions by finding the disagreement first.
//
// # Why this exists
//
// The standard grounded-answer agent retrieves a passage, cites it, and answers.
// That is honest about *where* an answer came from and silent about whether the
// organisation actually agrees with itself. When two sources say different
// things, retrieval picks one — usually whichever ranked higher — and the
// disagreement disappears into a confident sentence with a citation on it.
//
// Dissent inverts that. Before answering it asks: do my sources agree about
// this? When they do not, it does not answer. It presents the disagreement,
// names which source outranks which and why, and asks a human to settle it.
//
// # The part that makes it worth building
//
// Settling it does not just unblock the question. The adjudication is written
// back into the Knowledge Base as a standing Instruction, anchored to the
// sources that disagreed — so the *next build* is correct by construction and
// nobody is ever asked again.
//
// Using the agent improves the corpus. That is the whole idea.
//
// # Where the model is, and is not
//
// Nowhere in this package. Finding the disagreement is structural: Sanity's
// Knowledge Base raises a conflict at build time when the same fact appears with
// different values across sources, and this code reads those conflicts. Routing
// a question to candidate entries is lexical scoring over the outline.
//
// A model is needed only to phrase a final answer in prose once the facts are
// settled, and that happens in the caller. An agent whose central claim is "I
// found a contradiction" should not be asking a language model whether there is
// one.
package dissent

import (
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"sort"
	"strings"
	"unicode"

	"github.com/drift/drift-engine/internal/telemetry"
	"github.com/drift/drift-engine/pkg/driftv1"
)

// Verdict is what the agent returns. Exactly one of Answer or Adjudication is
// populated — the type makes "answered anyway despite a conflict" unrepresentable.
type Verdict struct {
	Question string `json:"question"`
	// BuildID pins the verdict to the state of belief it was produced from.
	// An answer without one is not checkable later.
	BuildID string `json:"buildId"`

	Answer       *Answer       `json:"answer,omitempty"`
	Adjudication *Adjudication `json:"adjudication,omitempty"`
}

// Answered reports whether the agent was willing to answer.
func (v Verdict) Answered() bool { return v.Answer != nil }

// Answer is returned when the sources agree.
type Answer struct {
	Claims []driftv1.Claim `json:"claims"`
	// Paths are the Knowledge Base entries consulted, so a reader can go and
	// check rather than take the agent's word for it.
	Paths []string `json:"paths"`
	// Citations are the source documents behind those claims.
	Citations []string `json:"citations"`
}

// Adjudication is returned instead of an answer when sources disagree.
type Adjudication struct {
	Path     string              `json:"path"`
	Tier     driftv1.ClaimTier   `json:"tier"`
	Sides    []Side              `json:"sides"`
	Proposed ProposedInstruction `json:"proposedInstruction"`
	Reason   string              `json:"reason"`
	Conflict driftv1.Conflict    `json:"-"`
}

// Side is one position in a disagreement, with the authority behind it.
type Side struct {
	Statement string   `json:"statement"`
	Value     *float64 `json:"value,omitempty"`
	Unit      string   `json:"unit,omitempty"`
	SourceID  string   `json:"sourceId"`
	Authority int      `json:"authority"`
	// Favoured marks the side the authority ranking points to. A suggestion for
	// the human to confirm, never a decision the agent has taken.
	Favoured bool `json:"favoured"`
}

// ProposedInstruction is the standing decision that would be written back to the
// Knowledge Base if the human accepts the favoured side.
type ProposedInstruction struct {
	Text       string   `json:"text"`
	AnchoredTo []string `json:"anchoredTo"`
}

// Corpus is the state of belief the agent reasons over: one Knowledge Base
// build, plus the sources it was built from.
type Corpus struct {
	Build   driftv1.BuildSnapshot
	Sources map[string]driftv1.Source
}

// Registrar is the slice of the surface registry this agent needs.
//
// An interface, and a deliberately small one: the agent may announce itself and
// may declare what it depends on. It cannot read the registry, cannot see the
// blast radius it is part of, and cannot mark itself correct. A dependent that
// can edit the dependency graph is not a dependent.
type Registrar interface {
	Register(s driftv1.Surface) error
	Depend(a driftv1.Assertion) error
}

// Agent answers questions, or refuses to.
type Agent struct {
	corpus Corpus
	// MaxEntries bounds how many claims one question may consult. The outline is
	// small enough to hold entirely, so the limit is about keeping an answer
	// legible rather than about context size.
	MaxEntries int

	registrar Registrar
	surfaceID string
	onErr     func(error)
}

// New returns an Agent over one build.
func New(corpus Corpus) *Agent {
	return &Agent{corpus: corpus, MaxEntries: 5}
}

// RegisterWith announces this agent as a published surface and makes every
// answer it gives a recorded dependency on the claims behind it.
//
// # Why an agent registers at all
//
// Because it is publishing. When Dissent tells a customer the return window is
// 30 days, that sentence is as live and as wrong-able as the same sentence on
// the FAQ page — and until it was registered, the blast radius for
// `claim.returns-window` said seven pages when the true answer was seven pages
// and a bot. A dependency walk that is complete over pages is not complete.
//
// # What gets recorded
//
// One dependency per claim consulted, keyed on (surface, question, claim) so a
// question asked twice updates rather than accumulates. The locator is the
// question, truncated: it is what an operator needs to reproduce the answer,
// and the full text of user questions is not something a knowledge ledger
// should be quietly retaining.
//
// A refusal records nothing. The agent did not publish a fact, so no surface
// now depends on one — and recording refusals would inflate every blast radius
// with places that are, in fact, already correct.
func (a *Agent) RegisterWith(r Registrar, s driftv1.Surface, onErr func(error)) error {
	if r == nil {
		return errors.New("dissent: cannot register with a nil registrar")
	}
	if s.Kind == "" {
		s.Kind = driftv1.SurfaceAgent
	}
	if err := r.Register(s); err != nil {
		return fmt.Errorf("dissent: register surface %s: %w", s.ID, err)
	}
	a.registrar, a.surfaceID, a.onErr = r, s.ID, onErr
	return nil
}

// record declares a dependency for every claim an answer rested on.
//
// Failures are reported to the caller's handler and do not affect the answer.
// A registry that is briefly unavailable should not stop the agent answering a
// customer — but it must not be silent either, because the consequence is an
// under-reported blast radius, and this project's whole argument is that the
// blast radius is complete.
func (a *Agent) record(question string, claims []driftv1.Claim) {
	if a.registrar == nil || len(claims) == 0 {
		return
	}
	locator := telemetry.Excerpt(question)
	digest := sha256.Sum256([]byte(question))
	asked := hex.EncodeToString(digest[:])[:10]

	for _, c := range claims {
		err := a.registrar.Depend(driftv1.Assertion{
			ID:        fmt.Sprintf("%s.%s.%s", a.surfaceID, asked, c.ID),
			ClaimID:   c.ID,
			SurfaceID: a.surfaceID,
			FieldPath: "answer",
			// The question, not the answer. The answer is regenerated from the
			// claim on every ask, so storing it would be storing a copy of the
			// claim under a different name; the question is the thing that makes
			// this dependency reproducible.
			RenderedText: locator,
			VerifiedAt:   a.corpus.Build.ID,
			State:        driftv1.AssertionVerified,
		})
		if err != nil && a.onErr != nil {
			a.onErr(err)
		}
	}
}

// Ask routes a question to candidate claims and decides whether it may answer.
//
// The order matters and is the point of the package: conflicts are checked
// *before* an answer is assembled, so there is no code path in which a
// contradiction is noticed and then answered over anyway.
func (a *Agent) Ask(question string) Verdict {
	verdict := Verdict{Question: question, BuildID: a.corpus.Build.ID}

	candidates := a.route(question)
	if len(candidates) == 0 {
		// No entry covers this. Saying so is a real answer — better than
		// stretching an unrelated claim to fit, which is how a grounded agent
		// produces its most confident nonsense.
		verdict.Answer = &Answer{}
		return verdict
	}

	// Any unresolved conflict touching a candidate path stops the answer. The
	// most consequential conflict is presented first: core before standard,
	// then by path for determinism.
	if conflicts := a.conflictsAmong(candidates); len(conflicts) > 0 {
		verdict.Adjudication = a.adjudicate(conflicts[0])
		return verdict
	}

	claims := make([]driftv1.Claim, 0, len(candidates))
	paths := make([]string, 0, len(candidates))
	seenCitation := map[string]bool{}
	citations := []string{}

	for _, c := range candidates {
		claims = append(claims, c)
		paths = append(paths, c.Path)
		for _, src := range c.Citations {
			if !seenCitation[src] {
				seenCitation[src] = true
				citations = append(citations, src)
			}
		}
	}
	sort.Strings(citations)

	// Recorded only now, at the point the agent has committed to publishing
	// these facts to whoever asked. Registering earlier — at routing time, say —
	// would mark the agent as depending on claims it went on to refuse to answer
	// over, and the blast radius would name a surface that is already correct.
	a.record(question, claims)

	verdict.Answer = &Answer{Claims: claims, Paths: paths, Citations: citations}
	return verdict
}

// adjudicate turns a build conflict into a decision a human can make in one click.
func (a *Agent) adjudicate(conflict driftv1.Conflict) *Adjudication {
	sides := make([]Side, 0, len(conflict.CompetingValues))
	for _, cv := range conflict.CompetingValues {
		authority := cv.Authority
		if src, ok := a.corpus.Sources[cv.SourceID]; ok && authority == 0 {
			authority = src.Authority
		}
		sides = append(sides, Side{
			Statement: cv.Statement, Value: cv.Value, Unit: cv.Unit,
			SourceID: cv.SourceID, Authority: authority,
		})
	}

	// Highest authority first; ties broken by source id so the output is stable.
	sort.SliceStable(sides, func(i, j int) bool {
		if sides[i].Authority != sides[j].Authority {
			return sides[i].Authority > sides[j].Authority
		}
		return sides[i].SourceID < sides[j].SourceID
	})

	reason := "Sources disagree and no standing instruction settles it."
	// Only mark a favourite when one side genuinely outranks the others. A tie
	// means the agent has nothing useful to suggest, and pretending otherwise
	// would turn a coin-flip into an apparent recommendation.
	if len(sides) > 1 && sides[0].Authority > sides[1].Authority {
		sides[0].Favoured = true
		reason = "Sources disagree. " + a.title(sides[0].SourceID) +
			" carries higher authority, but nothing on record says it wins."
	} else if len(sides) > 1 {
		reason = "Sources disagree and carry equal authority. " +
			"There is no basis to prefer either; a human has to decide."
	}

	return &Adjudication{
		Path:     conflict.Path,
		Tier:     a.tierOf(conflict.Path),
		Sides:    sides,
		Reason:   reason,
		Conflict: conflict,
		Proposed: a.proposeInstruction(conflict, sides),
	}
}

// proposeInstruction drafts the standing decision in plain language, which is
// the form a Knowledge Base Instruction takes.
func (a *Agent) proposeInstruction(conflict driftv1.Conflict, sides []Side) ProposedInstruction {
	anchored := make([]string, 0, len(sides))
	for _, s := range sides {
		anchored = append(anchored, s.SourceID)
	}
	sort.Strings(anchored)

	subject := conflict.Path
	if i := strings.LastIndex(subject, "/"); i >= 0 {
		subject = subject[i+1:]
	}
	subject = strings.ReplaceAll(subject, "-", " ")

	if len(sides) < 2 {
		return ProposedInstruction{AnchoredTo: anchored}
	}

	others := make([]string, 0, len(sides)-1)
	for _, s := range sides[1:] {
		others = append(others, a.title(s.SourceID))
	}

	return ProposedInstruction{
		Text: "When " + a.title(sides[0].SourceID) + " and " + strings.Join(others, ", ") +
			" disagree about " + subject + ", " + a.title(sides[0].SourceID) + " is authoritative.",
		AnchoredTo: anchored,
	}
}

func (a *Agent) title(sourceID string) string {
	if src, ok := a.corpus.Sources[sourceID]; ok && src.Title != "" {
		return src.Title
	}
	return sourceID
}

func (a *Agent) tierOf(path string) driftv1.ClaimTier {
	for _, c := range a.corpus.Build.Claims {
		if c.Path == path {
			return c.Tier
		}
	}
	return driftv1.TierStandard
}

// conflictsAmong returns unresolved conflicts touching any candidate path,
// most consequential first.
func (a *Agent) conflictsAmong(candidates []driftv1.Claim) []driftv1.Conflict {
	paths := make(map[string]bool, len(candidates))
	for _, c := range candidates {
		paths[c.Path] = true
	}

	var out []driftv1.Conflict
	for _, conflict := range a.corpus.Build.Conflicts {
		// A conflict with a resolving instruction is settled: the next build will
		// carry the decision, and the agent should not keep asking.
		if conflict.ResolvedBy != "" {
			continue
		}
		if paths[conflict.Path] {
			out = append(out, conflict)
		}
	}

	sort.SliceStable(out, func(i, j int) bool {
		ti, tj := a.tierOf(out[i].Path), a.tierOf(out[j].Path)
		if ti != tj {
			return tierRank(ti) < tierRank(tj)
		}
		return out[i].Path < out[j].Path
	})
	return out
}

func tierRank(t driftv1.ClaimTier) int {
	switch t {
	case driftv1.TierCore:
		return 0
	case driftv1.TierStandard:
		return 1
	default:
		return 2
	}
}

// ---------------------------------------------------------------------------
// Routing
// ---------------------------------------------------------------------------

// route picks candidate claims for a question by lexical overlap.
//
// Deliberately simple and deliberately deterministic. The Knowledge Base outline
// is compiled to be navigable — entry paths plus one-line summaries, small
// enough to hold whole — so routing is a scoring problem over a short list, not
// a retrieval problem over a corpus.
//
// Scoring: a term matching the path scores higher than one matching the
// statement, because a path is curated and a statement is prose. Core entries
// get a small boost, so a question that could plausibly go either way lands on
// the load-bearing claim.
func (a *Agent) route(question string) []driftv1.Claim {
	terms := tokenise(question)
	if len(terms) == 0 {
		return nil
	}

	type scored struct {
		claim driftv1.Claim
		score int
	}
	var ranked []scored

	for _, claim := range a.corpus.Build.Claims {
		pathTerms := tokenise(strings.ReplaceAll(claim.Path, "/", " "))
		statementTerms := tokenise(claim.Statement)

		score := 0
		for _, term := range terms {
			if containsTerm(pathTerms, term) {
				score += 3
			} else if containsTerm(statementTerms, term) {
				score++
			}
		}
		if score == 0 {
			continue
		}
		if claim.Tier == driftv1.TierCore {
			score++
		}
		ranked = append(ranked, scored{claim, score})
	}

	sort.SliceStable(ranked, func(i, j int) bool {
		if ranked[i].score != ranked[j].score {
			return ranked[i].score > ranked[j].score
		}
		return ranked[i].claim.Path < ranked[j].claim.Path
	})

	if len(ranked) == 0 {
		return nil
	}

	limit := a.MaxEntries
	if limit > len(ranked) || limit <= 0 {
		limit = len(ranked)
	}

	// Relevance cutoff: a claim must score strictly more than half the best score.
	//
	// Without it, "what is the warranty period?" also returns the EU cooling-off
	// claim, because that claim's statement happens to contain the word "period".
	// One weak match beside a strong one does not read as thoroughness; it reads
	// as the agent not knowing which claim the question was about.
	//
	// Strictly greater, not greater-or-equal: a path match scores 3 and the core
	// tier adds 1, so a single incidental word match on a core claim lands on
	// exactly half of a clean path match. That is the case this exists to drop.
	//
	// Relative rather than absolute, because a two-word question scores lower
	// across the board than a ten-word one — a fixed threshold would silently
	// change behaviour with question length.
	best := ranked[0].score

	out := make([]driftv1.Claim, 0, limit)
	for _, r := range ranked[:limit] {
		if 2*r.score <= best {
			break
		}
		out = append(out, r.claim)
	}
	return out
}

// stopWords are terms too common to discriminate between entries.
var stopWords = map[string]bool{
	"a": true, "an": true, "the": true, "is": true, "are": true, "was": true,
	"do": true, "does": true, "did": true, "i": true, "we": true, "you": true,
	"my": true, "our": true, "your": true, "to": true, "of": true, "for": true,
	"in": true, "on": true, "at": true, "it": true, "and": true, "or": true,
	"how": true, "what": true, "when": true, "can": true, "have": true,
	"has": true, "get": true, "long": true, "much": true, "many": true,
}

func tokenise(s string) []string {
	fields := strings.FieldsFunc(strings.ToLower(s), func(r rune) bool {
		return !unicode.IsLetter(r) && !unicode.IsDigit(r)
	})
	out := make([]string, 0, len(fields))
	for _, f := range fields {
		if len(f) < 2 || stopWords[f] {
			continue
		}
		out = append(out, stem(f))
	}
	return out
}

// stem folds the plurals that matter here. Not a real stemmer — a real one would
// be more accuracy than this routing problem needs, and harder to reason about
// when a question routes somewhere surprising.
func stem(word string) string {
	switch {
	case strings.HasSuffix(word, "ies") && len(word) > 4:
		return word[:len(word)-3] + "y"
	case strings.HasSuffix(word, "s") && !strings.HasSuffix(word, "ss") && len(word) > 3:
		return word[:len(word)-1]
	default:
		return word
	}
}

func containsTerm(haystack []string, term string) bool {
	for _, h := range haystack {
		if h == term {
			return true
		}
	}
	return false
}
