package authz

import (
	"crypto/sha256"
	"crypto/subtle"
	"encoding/hex"
	"errors"
	"fmt"
	"os"
	"strings"
	"sync"
)

// Registry maps bearer tokens to actors.
//
// # Why tokens are stored hashed
//
// The registry holds sha256 digests, never the tokens themselves. A memory
// dump, a core file, or a stray `%+v` of the server struct therefore cannot
// leak a working credential. Lookup hashes the presented token and compares
// digests in constant time.
//
// This is cheap to do and removes a whole category of accident. The tokens are
// bearer credentials for an API that can publish content; treating them with
// the same care as passwords costs twenty lines.
//
// # Why lookup is constant-time
//
// A map lookup on the digest would be faster and would leak nothing useful,
// since the digest is already a one-way function of the secret. But the
// comparison is written with subtle.ConstantTimeCompare anyway, because the
// next person to touch this file might reasonably add a prefix match or a
// fallback, and the habit is worth more than the microseconds.
type Registry struct {
	mu      sync.RWMutex
	byToken map[string]Actor // sha256 hex -> actor
}

// NewRegistry returns an empty registry.
func NewRegistry() *Registry {
	return &Registry{byToken: map[string]Actor{}}
}

var (
	ErrUnknownToken = errors.New("unrecognised bearer token")
	ErrNoTenant     = errors.New("actor has no tenant")
)

func digest(token string) string {
	sum := sha256.Sum256([]byte(token))
	return hex.EncodeToString(sum[:])
}

// Add registers an actor under a token. The plaintext is hashed immediately and
// the caller's copy is the only one that ever exists.
func (r *Registry) Add(token string, actor Actor) error {
	if token == "" {
		return errors.New("empty token")
	}
	if actor.ID == "" {
		return errors.New("actor has no id")
	}
	if actor.Tenant == "" {
		return fmt.Errorf("%w: %s", ErrNoTenant, actor.ID)
	}
	r.mu.Lock()
	defer r.mu.Unlock()
	r.byToken[digest(token)] = actor
	return nil
}

// Resolve identifies the actor behind a bearer token.
func (r *Registry) Resolve(token string) (Actor, error) {
	if token == "" {
		return Actor{}, ErrUnknownToken
	}
	presented := digest(token)

	r.mu.RLock()
	defer r.mu.RUnlock()

	for stored, actor := range r.byToken {
		if subtle.ConstantTimeCompare([]byte(stored), []byte(presented)) == 1 {
			return actor, nil
		}
	}
	return Actor{}, ErrUnknownToken
}

// Size reports how many actors are registered, for a startup log line that
// says something useful without naming anybody.
func (r *Registry) Size() int {
	r.mu.RLock()
	defer r.mu.RUnlock()
	return len(r.byToken)
}

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

// LoadFromEnv builds a registry from DRIFT_ACTORS.
//
// Format, one actor per entry, semicolon-separated:
//
//	token:actorID:tenant:role1|role2[:agent]
//
// For example:
//
//	DRIFT_ACTORS="tok_a:dana:acme:editor;tok_b:sam:acme:steward;tok_c:drafter:acme:agent:agent"
//
// Environment configuration is the right shape for a demo and for a
// single-tenant deployment. A real multi-tenant install would resolve actors
// from Sanity's own identity rather than a variable; the Registry interface is
// what makes that swap local.
//
// Nothing here is logged. A malformed entry reports its position, never its
// content, because position is enough to fix it and content is a credential.
func LoadFromEnv() (*Registry, error) {
	raw := os.Getenv("DRIFT_ACTORS")
	if strings.TrimSpace(raw) == "" {
		return nil, nil
	}

	registry := NewRegistry()
	for i, entry := range strings.Split(raw, ";") {
		entry = strings.TrimSpace(entry)
		if entry == "" {
			continue
		}

		parts := strings.Split(entry, ":")
		if len(parts) < 4 {
			return nil, fmt.Errorf(
				"DRIFT_ACTORS entry %d is malformed: want token:id:tenant:roles[:agent]", i+1)
		}

		token, id, tenant, roleList := parts[0], parts[1], parts[2], parts[3]

		var roles []Role
		for _, name := range strings.Split(roleList, "|") {
			role := Role(strings.TrimSpace(name))
			if _, known := rolePermissions[role]; !known {
				return nil, fmt.Errorf("DRIFT_ACTORS entry %d names unknown role %q", i+1, role)
			}
			roles = append(roles, role)
		}

		isAgent := len(parts) > 4 && parts[4] == "agent"

		if err := registry.Add(token, Actor{
			ID: id, Email: id, Roles: roles, Tenant: tenant, IsAgent: isAgent,
		}); err != nil {
			return nil, fmt.Errorf("DRIFT_ACTORS entry %d: %w", i+1, err)
		}
	}
	return registry, nil
}

// DemoRegistry returns the actors used in fixture mode.
//
// Fixture mode has no real credentials and never touches Sanity, so these
// tokens grant access to committed demo data and nothing else. They are
// deliberately obvious rather than random: a token that looks like a secret
// invites someone to treat it as one.
func DemoRegistry() *Registry {
	r := NewRegistry()
	_ = r.Add("demo-viewer", Actor{
		ID: "viewer@demo", Email: "viewer@demo", Tenant: "demo",
		Roles: []Role{RoleViewer},
	})
	_ = r.Add("demo-editor", Actor{
		ID: "dana@demo", Email: "dana@demo", Tenant: "demo",
		Roles: []Role{RoleEditor},
	})
	_ = r.Add("demo-steward", Actor{
		ID: "sam@demo", Email: "sam@demo", Tenant: "demo",
		Roles: []Role{RoleSteward},
	})
	_ = r.Add("demo-agent", Actor{
		ID: "drafter@demo", Email: "drafter@demo", Tenant: "demo",
		Roles: []Role{RoleAgent}, IsAgent: true,
	})
	return r
}
