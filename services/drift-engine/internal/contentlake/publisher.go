// Package contentlake writes approved corrections back to Sanity.
//
// This is the last mile: the only place in DRIFT that mutates published
// content. Everything upstream — the diff, the graph walk, the gate, the human
// approval — exists to decide whether this package should run.
//
// # One transaction, never two writes
//
// Publishing a correction means two changes:
//
//  1. the page's paragraph gets the corrected text
//  2. the assertion is re-stamped with the build it was verified against
//
// These go in a single mutation request, because Sanity's mutation API is
// transactional: "if the operation succeeds you can rest assured that every
// mutation you submitted was executed".
//
// If they were two requests, a failure between them would leave a page that has
// been corrected but an assertion that still says "stale" — so the Control Room
// would keep nagging about work already done — or worse, an assertion marked
// verified against a page that was never updated. The second is the dangerous
// one: it is a false clean bill of health, which is precisely the failure this
// product exists to catch.
//
// # Addressing by key, not by position
//
// The patch path is `body[_key=="b01"].children[0].text`. The key comes from the
// assertion, not from an array index — see ADR-0007. A positional path would
// rewrite the wrong paragraph the moment somebody reorders the page.
//
// # Credentials
//
// This needs a *project* token with write access, which is a different
// credential from the organisation token Context MCP requires. Mixing them up is
// the most likely setup mistake, so the error messages say which is which.
package contentlake

import (
	"bytes"
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/drift/drift-engine/internal/resilience"
	"github.com/drift/drift-engine/internal/telemetry"
)

// DefaultAPIVersion pins the Content Lake API.
//
// Pinned rather than floating so a server-side change cannot alter how a
// correction is written between a human approving it and the write landing.
const DefaultAPIVersion = "2026-09-01"

// Config describes a Publisher.
type Config struct {
	ProjectID string
	Dataset   string
	// Token must be a PROJECT token with write access — not the organisation
	// token used for Context MCP.
	Token      string
	APIVersion string
	HTTPClient *http.Client
	BaseURL    string
	Logger     *slog.Logger
}

// Publisher writes approved corrections to the Content Lake.
type Publisher struct {
	projectID  string
	dataset    string
	token      string
	apiVersion string
	http       *http.Client
	baseURL    string
	log        *slog.Logger
	breaker    *resilience.Breaker
	retry      resilience.Policy
}

var (
	ErrNotConfigured = errors.New("content lake publisher is not configured")
	// ErrAlreadyApplied reports that this exact transaction has already landed.
	// Returned rather than swallowed so the caller can record a duplicate
	// honestly rather than logging a second publication that never happened.
	ErrAlreadyApplied = errors.New("this correction has already been published")
)

// New returns a Publisher, or an error naming everything missing at once.
func New(cfg Config) (*Publisher, error) {
	var missing []string
	if cfg.ProjectID == "" {
		missing = append(missing, "project id")
	}
	if cfg.Dataset == "" {
		missing = append(missing, "dataset")
	}
	if cfg.Token == "" {
		missing = append(missing, "write token (a PROJECT token with write access, "+
			"not the organisation token used for Context MCP)")
	}
	if len(missing) > 0 {
		return nil, fmt.Errorf("%w: needs %s", ErrNotConfigured, strings.Join(missing, ", "))
	}

	p := &Publisher{
		projectID:  cfg.ProjectID,
		dataset:    cfg.Dataset,
		token:      cfg.Token,
		apiVersion: cfg.APIVersion,
		http:       cfg.HTTPClient,
		baseURL:    cfg.BaseURL,
		log:        cfg.Logger,
		// Five consecutive failures is a dependency problem, not bad luck.
		// Thirty seconds is long enough to ride out a deploy.
		breaker: resilience.NewBreaker("content-lake", 5, 30*time.Second),
		retry:   resilience.DefaultPolicy(),
	}
	if p.apiVersion == "" {
		p.apiVersion = DefaultAPIVersion
	}
	if p.http == nil {
		p.http = &http.Client{Timeout: 30 * time.Second}
	}
	if p.baseURL == "" {
		p.baseURL = fmt.Sprintf("https://%s.api.sanity.io", p.projectID)
	}
	if p.log == nil {
		p.log = slog.Default()
	}
	return p, nil
}

// Request is one approved correction, ready to write.
type Request struct {
	AssertionID string
	PageID      string
	// BlockKey is the Portable Text `_key` of the paragraph being corrected.
	BlockKey string
	Text     string
	// BuildID is stamped onto the assertion so staleness stays derived rather
	// than remembered.
	BuildID string
	// IdempotencyKey makes the write safe to retry. It becomes the Sanity
	// transaction ID, which must be unique per dataset — so a repeat of the same
	// logical publication is the same transaction rather than a second one.
	IdempotencyKey string
}

func (r Request) validate() error {
	var missing []string
	if r.AssertionID == "" {
		missing = append(missing, "assertion id")
	}
	if r.PageID == "" {
		missing = append(missing, "page id")
	}
	if r.BlockKey == "" {
		// Refusing here rather than falling back to a positional path. A
		// positional fallback is exactly how the wrong paragraph gets rewritten.
		missing = append(missing, "block key (required: positional paths are not safe to write through)")
	}
	if strings.TrimSpace(r.Text) == "" {
		missing = append(missing, "text (refusing to publish an empty correction)")
	}
	if r.BuildID == "" {
		missing = append(missing, "build id")
	}
	if len(missing) > 0 {
		return fmt.Errorf("invalid publish request: missing %s", strings.Join(missing, ", "))
	}
	return nil
}

// mutation payloads

type patch struct {
	ID  string         `json:"id"`
	Set map[string]any `json:"set,omitempty"`
}

type mutation struct {
	Patch patch `json:"patch"`
}

type mutateBody struct {
	Mutations []mutation `json:"mutations"`
}

type mutateResponse struct {
	TransactionID string `json:"transactionId"`
	Results       []struct {
		Operation  string `json:"operation"`
		DocumentID string `json:"documentId"`
	} `json:"results"`
}

// Publish writes the corrected paragraph and re-stamps the assertion, atomically.
func (p *Publisher) Publish(ctx context.Context, req Request) error {
	if err := req.validate(); err != nil {
		return err
	}

	log := telemetry.Logger(ctx, p.log).With(
		slog.String("assertion", req.AssertionID),
		slog.String("page", req.PageID),
		slog.String("build", req.BuildID),
		// The corrected text is fingerprinted, never logged. Published content
		// can contain prices, contract terms and customer names.
		slog.String("text", telemetry.Fingerprint(req.Text)),
	)

	body := mutateBody{Mutations: []mutation{
		{Patch: patch{
			ID: req.PageID,
			Set: map[string]any{
				// Key-addressed, so reordering the page cannot redirect the write.
				fmt.Sprintf("body[_key==%q].children[0].text", req.BlockKey): req.Text,
			},
		}},
		{Patch: patch{
			ID: req.AssertionID,
			Set: map[string]any{
				"renderedText":         req.Text,
				"state":                "verified",
				"verifiedAgainstBuild": map[string]any{"_type": "reference", "_ref": req.BuildID},
			},
		}},
	}}

	transactionID := transactionIDFor(req.IdempotencyKey)

	err := p.breaker.Do(ctx, func(ctx context.Context) error {
		return resilience.Do(ctx, p.retry, func(ctx context.Context) error {
			return p.mutate(ctx, body, transactionID)
		})
	})

	if err != nil {
		if errors.Is(err, ErrAlreadyApplied) {
			log.Info("correction was already published", slog.String("txn", transactionID))
			return err
		}
		log.Error("publish failed", slog.String("err", err.Error()))
		return err
	}

	log.Info("correction published", slog.String("txn", transactionID))
	return nil
}

func (p *Publisher) mutate(ctx context.Context, body mutateBody, transactionID string) error {
	payload, err := json.Marshal(body)
	if err != nil {
		return fmt.Errorf("marshal mutation: %w", err)
	}

	// visibility=sync: wait until the write is queryable. The Control Room
	// refreshes immediately after an approval, and an async write would let it
	// read back the pre-correction state and report the page as still stale.
	url := fmt.Sprintf("%s/%s/data/mutate/%s?visibility=sync&returnIds=true&transactionId=%s",
		p.baseURL, p.apiVersion, p.dataset, transactionID)

	request, err := http.NewRequestWithContext(ctx, http.MethodPost, url, bytes.NewReader(payload))
	if err != nil {
		return err
	}
	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+p.token)

	resp, err := p.http.Do(request)
	if err != nil {
		// Transport failures are worth another go: a reset connection says
		// nothing about whether the request was valid.
		return resilience.Retryable(fmt.Errorf("mutate: %w", err))
	}
	defer resp.Body.Close()

	raw, err := io.ReadAll(io.LimitReader(resp.Body, 4<<20))
	if err != nil {
		return resilience.Retryable(fmt.Errorf("read mutation response: %w", err))
	}

	switch {
	case resp.StatusCode >= 200 && resp.StatusCode < 300:
		var out mutateResponse
		if err := json.Unmarshal(raw, &out); err != nil {
			// The write landed but we cannot read the confirmation. Reporting
			// success would be a guess; reporting a retryable failure would risk
			// a second write. Surface it as-is and let the caller's audit trail
			// show a completed approval with an unconfirmed publication.
			return fmt.Errorf("mutation succeeded but its response was unreadable: %w", err)
		}
		if len(out.Results) != 2 {
			return fmt.Errorf(
				"mutation applied %d patches, expected 2 (page and assertion); "+
					"the page and its integrity record may now disagree", len(out.Results))
		}
		return nil

	case resp.StatusCode == http.StatusConflict:
		// A reused transaction ID. Sanity requires them to be unique per dataset,
		// so this is the signature of a retry of a publication that already
		// landed — which is a success, not a failure.
		if looksLikeDuplicateTransaction(raw) {
			return ErrAlreadyApplied
		}
		return fmt.Errorf("mutation conflict: %s", snippet(raw))

	case resp.StatusCode == http.StatusTooManyRequests:
		return resilience.RetryableAfter(
			fmt.Errorf("content lake rate limited: %s", snippet(raw)),
			retryAfter(resp),
		)

	case resp.StatusCode == http.StatusUnauthorized, resp.StatusCode == http.StatusForbidden:
		// Never retried, and never logs the credential.
		return fmt.Errorf(
			"content lake rejected the write token (HTTP %d). It must be a PROJECT token "+
				"with write access to %s/%s — not the organisation token used for Context MCP",
			resp.StatusCode, p.projectID, p.dataset)

	case resp.StatusCode >= 500:
		return resilience.Retryable(
			fmt.Errorf("content lake error (HTTP %d): %s", resp.StatusCode, snippet(raw)))

	default:
		// 4xx: the request is wrong, so trying again will produce the same wrong.
		return fmt.Errorf("mutation rejected (HTTP %d): %s", resp.StatusCode, snippet(raw))
	}
}

// BreakerState exposes the circuit state for health reporting.
func (p *Publisher) BreakerState() string { return string(p.breaker.State()) }

// ---------------------------------------------------------------------------

// transactionIDFor derives a stable Sanity transaction ID from an idempotency key.
//
// Hashed rather than passed through, for two reasons: the key contains actor and
// assertion identifiers that need not be exposed in transaction metadata, and
// hashing guarantees a shape the API will accept regardless of what the caller
// put in the key.
func transactionIDFor(key string) string {
	if key == "" {
		// No key means the caller did not ask for deduplication. A time-based ID
		// is still unique; it simply offers no protection against a double write,
		// which is why remediation always supplies one.
		return fmt.Sprintf("drift-%d", time.Now().UnixNano())
	}
	sum := sha256.Sum256([]byte(key))
	return "drift-" + hex.EncodeToString(sum[:])[:32]
}

// looksLikeDuplicateTransaction distinguishes a reused transaction ID from other
// conflicts.
//
// Matched on the response text because the exact error shape has not been
// verified against a live project — see docs/BUILD-LOG.md. It is deliberately
// conservative: an unrecognised 409 is reported as a conflict rather than
// assumed to be a duplicate, because wrongly reporting "already published" would
// mean a correction silently never lands.
func looksLikeDuplicateTransaction(body []byte) bool {
	text := strings.ToLower(string(body))
	return strings.Contains(text, "transaction") &&
		(strings.Contains(text, "already") ||
			strings.Contains(text, "duplicate") ||
			strings.Contains(text, "exists"))
}

func retryAfter(resp *http.Response) time.Duration {
	if v := resp.Header.Get("Retry-After"); v != "" {
		if seconds, err := strconv.Atoi(v); err == nil && seconds >= 0 {
			return time.Duration(seconds) * time.Second
		}
	}
	return 0 // fall back to the policy's own backoff
}

func snippet(b []byte) string {
	const max = 300
	s := strings.TrimSpace(string(b))
	if len(s) > max {
		return s[:max] + "…"
	}
	return s
}
