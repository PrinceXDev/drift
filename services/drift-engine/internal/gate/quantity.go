package gate

import (
	"regexp"
	"strconv"
	"strings"
)

// quantity is a number and its unit, lifted out of prose.
type quantity struct {
	value float64
	unit  string
}

// quantityPattern matches "<number> <unit>" for the units DRIFT's claims use.
//
// Deliberately conservative. A looser pattern would extract numbers that are
// not claims — version numbers, street addresses, figures inside unrelated
// prose — and every false extraction here becomes a false contradiction that
// blocks a legitimate publication. Operators who are blocked spuriously learn
// to click through warnings, which costs more than the misses this pattern has.
var quantityPattern = regexp.MustCompile(
	`(?i)\b(\d+(?:\.\d+)?)\s*(days?|months?|years?|hours?|percent|%|USD|EUR|GBP)\b`)

// unitAliases folds the spellings a human might write into the canonical unit
// stored on a claim.
var unitAliases = map[string]string{
	"day": "days", "days": "days",
	"month": "months", "months": "months",
	"year": "years", "years": "years",
	"hour": "hours", "hours": "hours",
	"percent": "percent", "%": "percent",
	"usd": "USD", "eur": "EUR", "gbp": "GBP",
}

// extractQuantities pulls every typed quantity out of a sentence.
func extractQuantities(text string) []quantity {
	matches := quantityPattern.FindAllStringSubmatch(text, -1)
	out := make([]quantity, 0, len(matches))
	for _, m := range matches {
		value, err := strconv.ParseFloat(m[1], 64)
		if err != nil {
			continue
		}
		unit, ok := unitAliases[strings.ToLower(m[2])]
		if !ok {
			continue
		}
		out = append(out, quantity{value: value, unit: unit})
	}
	return out
}

// sameUnit compares units after folding aliases, so "45 day" and a claim stored
// in "days" are recognised as comparable.
func sameUnit(a, b string) bool {
	if a == "" || b == "" {
		return false
	}
	ca, aok := unitAliases[strings.ToLower(a)]
	cb, bok := unitAliases[strings.ToLower(b)]
	if !aok {
		ca = a
	}
	if !bok {
		cb = b
	}
	return ca == cb
}

// ---------------------------------------------------------------------------
// Topic matching
// ---------------------------------------------------------------------------

// genericPathTokens are path segments that carry no topic information. They
// appear across most claims, so matching on them would make every claim look
// related to every sentence.
var genericPathTokens = map[string]bool{
	"support": true, "general": true, "policy": true, "info": true,
	"terms": true, "time": true,
}

// pathTokens reduces a claim path to its distinguishing terms, stemmed so that
// "returns" in a path matches "return" in a sentence.
func pathTokens(path string) map[string]bool {
	out := map[string]bool{}
	for _, part := range strings.FieldsFunc(path, func(r rune) bool {
		return r == '/' || r == '-' || r == '_'
	}) {
		part = strings.ToLower(part)
		if len(part) < 2 || genericPathTokens[part] {
			continue
		}
		out[stemToken(part)] = true
	}
	return out
}

// textTokenSet reduces a sentence to a stemmed token set.
func textTokenSet(text string) map[string]bool {
	out := map[string]bool{}
	for _, word := range strings.FieldsFunc(strings.ToLower(text), func(r rune) bool {
		return !('a' <= r && r <= 'z') && !('0' <= r && r <= '9')
	}) {
		if len(word) < 2 {
			continue
		}
		out[stemToken(word)] = true
	}
	return out
}

// stemToken folds the plurals that matter here. Not a real stemmer: a real one
// would be more machinery than this needs and harder to reason about when a
// publication is blocked for a surprising reason.
func stemToken(word string) string {
	switch {
	case strings.HasSuffix(word, "ies") && len(word) > 4:
		return word[:len(word)-3] + "y"
	case strings.HasSuffix(word, "s") && !strings.HasSuffix(word, "ss") && len(word) > 3:
		return word[:len(word)-1]
	default:
		return word
	}
}
