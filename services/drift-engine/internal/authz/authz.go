// Package authz decides who may do what.
//
// # The design constraint
//
// The brief says "enforce authorization on every mutation". The hard part of
// that is not writing the check — it is guaranteeing nobody forgets one. A
// permission system that relies on each handler remembering to call it will
// eventually have a handler that does not.
//
// So a mutation here cannot be performed with a boolean. It requires a
// *Grant — a value that only Authorize can mint. Handlers take a Grant as an
// argument, so a route that skipped authorization does not compile rather than
// silently permitting the action. It is the same trick as a capability: the
// proof of permission and the permission itself are the same object.
//
// # Least privilege
//
// Roles are additive and deliberately narrow. The important line is between
// Agent and everyone human: an agent can draft and propose, and there is no
// combination of roles that lets it publish or resolve a core conflict. That
// is checked in tests, because it is the product's central promise.
package authz

import (
	"errors"
	"fmt"
	"sort"
	"strings"
	"time"
)

// Role is a named bundle of permissions.
type Role string

const (
	// RoleViewer can read the drift ledger and the graph. Nothing else.
	RoleViewer Role = "viewer"

	// RoleAgent is an unattended process — the claim extractor and the
	// remediation drafter. It may propose. It may never dispose.
	RoleAgent Role = "agent"

	// RoleEditor owns pages and approves corrections to them.
	RoleEditor Role = "editor"

	// RoleSteward owns the knowledge base: resolves conflicts, writes standing
	// instructions, declares and closes incidents.
	RoleSteward Role = "steward"

	// RoleAdmin can do everything a steward can, plus manage actors.
	RoleAdmin Role = "admin"
)

// Permission is one thing an actor might be allowed to do.
type Permission string

const (
	PermReadDrift        Permission = "drift:read"
	PermReadAudit        Permission = "audit:read"
	PermPollBuild        Permission = "build:poll"
	PermDraftCorrection  Permission = "correction:draft"
	PermApprovePublish   Permission = "correction:publish"
	PermResolveConflict  Permission = "conflict:resolve"
	PermWriteInstruction Permission = "instruction:write"
	PermDeclareIncident  Permission = "incident:declare"
	PermCloseIncident    Permission = "incident:close"
	PermSimulate         Permission = "simulation:run"
	PermManageActors     Permission = "actor:manage"
)

// rolePermissions is the whole policy, in one readable table.
//
// Kept as data rather than as branching logic so that "what can a steward do?"
// is answered by reading eleven lines, and so the authorization tests can
// enumerate it exhaustively rather than guessing at cases.
var rolePermissions = map[Role]map[Permission]bool{
	RoleViewer: {
		PermReadDrift: true,
	},
	RoleAgent: {
		PermReadDrift:       true,
		PermDraftCorrection: true,
		PermSimulate:        true,
		// Deliberately absent: publish, resolve, instruction:write, incident:*.
		// An agent proposes. A human disposes. See TestAgentCanNeverPublish.
	},
	RoleEditor: {
		PermReadDrift:       true,
		PermReadAudit:       true,
		PermDraftCorrection: true,
		PermApprovePublish:  true,
		PermSimulate:        true,
	},
	RoleSteward: {
		PermReadDrift:        true,
		PermReadAudit:        true,
		PermPollBuild:        true,
		PermDraftCorrection:  true,
		PermApprovePublish:   true,
		PermResolveConflict:  true,
		PermWriteInstruction: true,
		PermDeclareIncident:  true,
		PermCloseIncident:    true,
		PermSimulate:         true,
	},
	RoleAdmin: {
		PermReadDrift:        true,
		PermReadAudit:        true,
		PermPollBuild:        true,
		PermDraftCorrection:  true,
		PermApprovePublish:   true,
		PermResolveConflict:  true,
		PermWriteInstruction: true,
		PermDeclareIncident:  true,
		PermCloseIncident:    true,
		PermSimulate:         true,
		PermManageActors:     true,
	},
}

// Actor is an authenticated principal — a person or an unattended process.
type Actor struct {
	ID    string
	Email string
	Roles []Role
	// Tenant scopes everything this actor can see. DRIFT is designed to hold
	// several projects' knowledge in one organisation, so a missing tenant check
	// is a cross-project data leak rather than a mere bug. Every Grant carries
	// it and every resource access is checked against it.
	Tenant string
	// IsAgent marks unattended principals. Belt-and-braces alongside RoleAgent:
	// no combination of roles lets an agent publish, even if someone
	// misconfigures the role list.
	IsAgent bool
}

// Human reports whether a person is behind this actor.
func (a Actor) Human() bool { return !a.IsAgent }

// Has reports whether any of the actor's roles grants the permission.
func (a Actor) Has(p Permission) bool {
	for _, role := range a.Roles {
		if rolePermissions[role][p] {
			return true
		}
	}
	return false
}

// RoleNames renders roles for logs and audit entries.
func (a Actor) RoleNames() string {
	names := make([]string, 0, len(a.Roles))
	for _, r := range a.Roles {
		names = append(names, string(r))
	}
	sort.Strings(names)
	return strings.Join(names, ",")
}

// ---------------------------------------------------------------------------
// Grants
// ---------------------------------------------------------------------------

// Grant is proof that an action was authorized.
//
// Unexported fields and no exported constructor: the only way to obtain one is
// Authorize. A function that requires a *Grant therefore cannot be called
// without a permission check having happened first, and that is enforced by the
// compiler rather than by review.
type Grant struct {
	actor      Actor
	permission Permission
	tenant     string
	resource   string
	grantedAt  time.Time
}

func (g *Grant) Actor() Actor           { return g.actor }
func (g *Grant) Permission() Permission { return g.permission }
func (g *Grant) Tenant() string         { return g.tenant }
func (g *Grant) Resource() string       { return g.resource }
func (g *Grant) GrantedAt() time.Time   { return g.grantedAt }

// ActorID is the convenience the audit log reaches for most.
func (g *Grant) ActorID() string { return g.actor.ID }

// Errors are distinguishable so the API can map them to different statuses and
// so logs can tell "you are not allowed" apart from "that is not yours".
var (
	ErrDenied          = errors.New("authorization denied")
	ErrWrongTenant     = errors.New("resource belongs to another tenant")
	ErrAgentForbidden  = errors.New("agents may propose but never dispose")
	ErrNoActor         = errors.New("no authenticated actor")
	ErrHumanOnlyAction = errors.New("this action requires a human")
)

// humanOnly are the actions no unattended process may take, whatever roles it
// somehow accumulated.
//
// This is the product's central promise expressed as a list. It is checked
// before the role table, so a misconfigured agent with RoleAdmin still cannot
// publish.
var humanOnly = map[Permission]bool{
	PermApprovePublish:   true,
	PermResolveConflict:  true,
	PermWriteInstruction: true,
	PermCloseIncident:    true,
	PermManageActors:     true,
}

// Authorize is the only way to obtain a Grant.
//
// `resource` is the thing being acted on — a claim path, an assertion ID, an
// incident ID. It is recorded on the Grant and carried into the audit entry, so
// every logged action names what it touched, not merely what kind of action it was.
func Authorize(actor Actor, p Permission, tenant, resource string) (*Grant, error) {
	if actor.ID == "" {
		return nil, ErrNoActor
	}

	// Tenant first. An actor from another tenant should not even learn whether
	// they would have had the permission.
	if actor.Tenant != tenant {
		return nil, fmt.Errorf("%w: actor %s is in %q, resource is in %q",
			ErrWrongTenant, actor.ID, actor.Tenant, tenant)
	}

	if actor.IsAgent && humanOnly[p] {
		return nil, fmt.Errorf("%w: %s requires a human, actor %s is unattended",
			ErrAgentForbidden, p, actor.ID)
	}

	if !actor.Has(p) {
		return nil, fmt.Errorf("%w: actor %s (%s) lacks %s",
			ErrDenied, actor.ID, actor.RoleNames(), p)
	}

	return &Grant{
		actor:      actor,
		permission: p,
		tenant:     tenant,
		resource:   resource,
		grantedAt:  time.Now().UTC(),
	}, nil
}

// MustBeHuman re-asserts at the point of use that a grant came from a person.
//
// Redundant with Authorize by design. Publication is the one place where a
// mistake is unrecoverable — the content is live and a customer has read it —
// so it is worth paying for a second check that cannot be bypassed by a future
// refactor of the permission table.
func MustBeHuman(g *Grant) error {
	if g == nil {
		return ErrNoActor
	}
	if g.actor.IsAgent {
		return fmt.Errorf("%w: %s", ErrHumanOnlyAction, g.permission)
	}
	return nil
}

// Permissions lists everything a role grants, sorted. For the UI, so a person
// can see their own capabilities rather than discovering them by being refused.
func Permissions(role Role) []Permission {
	perms := rolePermissions[role]
	out := make([]Permission, 0, len(perms))
	for p := range perms {
		out = append(out, p)
	}
	sort.Slice(out, func(i, j int) bool { return out[i] < out[j] })
	return out
}

// AllRoles is used by the UI and by the exhaustive authorization tests.
func AllRoles() []Role {
	return []Role{RoleViewer, RoleAgent, RoleEditor, RoleSteward, RoleAdmin}
}

// AllPermissions is used by the exhaustive authorization tests, which assert
// the full role × permission matrix rather than sampling it.
func AllPermissions() []Permission {
	return []Permission{
		PermReadDrift, PermReadAudit, PermPollBuild, PermDraftCorrection,
		PermApprovePublish, PermResolveConflict, PermWriteInstruction,
		PermDeclareIncident, PermCloseIncident, PermSimulate, PermManageActors,
	}
}
