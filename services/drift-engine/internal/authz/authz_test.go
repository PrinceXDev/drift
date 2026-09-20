package authz_test

import (
	"errors"
	"testing"

	"github.com/drift/drift-engine/internal/authz"
)

func actor(id string, tenant string, isAgent bool, roles ...authz.Role) authz.Actor {
	return authz.Actor{ID: id, Email: id + "@example.com", Roles: roles, Tenant: tenant, IsAgent: isAgent}
}

// The product's central promise, asserted exhaustively rather than by example.
//
// No combination of roles — including admin — lets an unattended process
// publish, resolve a conflict, write a standing instruction, or close an
// incident. If this test ever fails, the thing DRIFT claims about itself is
// no longer true.
func TestAgentCanNeverDispose(t *testing.T) {
	forbidden := []authz.Permission{
		authz.PermApprovePublish,
		authz.PermResolveConflict,
		authz.PermWriteInstruction,
		authz.PermCloseIncident,
		authz.PermManageActors,
	}

	// Every role, including admin, attached to an unattended principal.
	for _, role := range authz.AllRoles() {
		agent := actor("agent.drafter", "acme", true, role, authz.RoleAdmin)
		for _, p := range forbidden {
			t.Run(string(role)+"/"+string(p), func(t *testing.T) {
				grant, err := authz.Authorize(agent, p, "acme", "claim.returns")
				if err == nil {
					t.Fatalf("an agent with roles %s obtained %s", agent.RoleNames(), p)
				}
				if !errors.Is(err, authz.ErrAgentForbidden) {
					t.Errorf("error = %v, want ErrAgentForbidden", err)
				}
				if grant != nil {
					t.Error("a denied authorization must not return a grant")
				}
			})
		}
	}
}

// MustBeHuman is a second, independent check at the point of publication.
// Redundant on purpose: publication is unrecoverable.
func TestMustBeHuman_IsAnIndependentSecondCheck(t *testing.T) {
	human := actor("dana", "acme", false, authz.RoleEditor)
	grant, err := authz.Authorize(human, authz.PermApprovePublish, "acme", "assert.returns-1")
	if err != nil {
		t.Fatalf("editor should be able to approve: %v", err)
	}
	if err := authz.MustBeHuman(grant); err != nil {
		t.Errorf("a human's grant failed the human check: %v", err)
	}

	if err := authz.MustBeHuman(nil); err == nil {
		t.Error("a nil grant must fail the human check, not pass it")
	}
}

// Cross-tenant access is refused before the permission is even considered, so
// an actor from another tenant cannot probe what they would have been allowed.
func TestTenantIsolation_IsCheckedBeforePermission(t *testing.T) {
	admin := actor("root", "acme", false, authz.RoleAdmin)

	_, err := authz.Authorize(admin, authz.PermReadDrift, "globex", "claim.returns")
	if err == nil {
		t.Fatal("an acme admin read a globex resource")
	}
	if !errors.Is(err, authz.ErrWrongTenant) {
		t.Errorf("error = %v, want ErrWrongTenant", err)
	}
	// The failure must be about tenancy, not about permissions — otherwise the
	// error message itself discloses the policy to an outsider.
	if errors.Is(err, authz.ErrDenied) {
		t.Error("a cross-tenant refusal should not also report a permission denial")
	}
}

// The full role × permission matrix, asserted rather than sampled. Any future
// widening of a role has to be made deliberately here.
func TestRoleMatrix(t *testing.T) {
	expected := map[authz.Role][]authz.Permission{
		authz.RoleViewer: {authz.PermReadDrift},
		authz.RoleAgent: {
			authz.PermReadDrift, authz.PermDraftCorrection, authz.PermSimulate,
		},
		authz.RoleEditor: {
			authz.PermReadDrift, authz.PermReadAudit, authz.PermDraftCorrection,
			authz.PermApprovePublish, authz.PermSimulate,
		},
		authz.RoleSteward: {
			authz.PermReadDrift, authz.PermReadAudit, authz.PermPollBuild,
			authz.PermDraftCorrection, authz.PermApprovePublish,
			authz.PermResolveConflict, authz.PermWriteInstruction,
			authz.PermDeclareIncident, authz.PermCloseIncident, authz.PermSimulate,
		},
		authz.RoleAdmin: authz.AllPermissions(),
	}

	for role, want := range expected {
		granted := map[authz.Permission]bool{}
		for _, p := range want {
			granted[p] = true
		}

		a := actor("someone", "acme", false, role)
		for _, p := range authz.AllPermissions() {
			hasIt := a.Has(p)
			if hasIt != granted[p] {
				t.Errorf("%s: Has(%s) = %v, want %v", role, p, hasIt, granted[p])
			}
		}
	}
}

func TestViewerCannotMutateAnything(t *testing.T) {
	viewer := actor("reader", "acme", false, authz.RoleViewer)

	mutations := []authz.Permission{
		authz.PermPollBuild, authz.PermDraftCorrection, authz.PermApprovePublish,
		authz.PermResolveConflict, authz.PermWriteInstruction,
		authz.PermDeclareIncident, authz.PermCloseIncident, authz.PermManageActors,
	}
	for _, p := range mutations {
		if _, err := authz.Authorize(viewer, p, "acme", "r"); err == nil {
			t.Errorf("viewer obtained %s", p)
		}
	}

	if _, err := authz.Authorize(viewer, authz.PermReadDrift, "acme", "r"); err != nil {
		t.Errorf("viewer should be able to read drift: %v", err)
	}
}

// An editor approves corrections but does not own the knowledge base, so they
// cannot settle a source conflict or write a standing instruction.
func TestEditorCannotResolveConflictsOrWriteInstructions(t *testing.T) {
	editor := actor("dana", "acme", false, authz.RoleEditor)

	for _, p := range []authz.Permission{
		authz.PermResolveConflict, authz.PermWriteInstruction,
		authz.PermDeclareIncident, authz.PermCloseIncident,
	} {
		if _, err := authz.Authorize(editor, p, "acme", "r"); err == nil {
			t.Errorf("editor obtained %s; that belongs to a steward", p)
		}
	}
}

func TestUnauthenticated(t *testing.T) {
	_, err := authz.Authorize(authz.Actor{}, authz.PermReadDrift, "acme", "r")
	if !errors.Is(err, authz.ErrNoActor) {
		t.Errorf("error = %v, want ErrNoActor", err)
	}
}

// The grant records everything the audit entry needs, so no caller has to
// reassemble it from ambient state.
func TestGrantCarriesFullProvenance(t *testing.T) {
	steward := actor("sam", "acme", false, authz.RoleSteward)
	grant, err := authz.Authorize(steward, authz.PermResolveConflict, "acme", "support/returns")
	if err != nil {
		t.Fatal(err)
	}

	if grant.ActorID() != "sam" {
		t.Errorf("actor = %q", grant.ActorID())
	}
	if grant.Permission() != authz.PermResolveConflict {
		t.Errorf("permission = %q", grant.Permission())
	}
	if grant.Tenant() != "acme" {
		t.Errorf("tenant = %q", grant.Tenant())
	}
	if grant.Resource() != "support/returns" {
		t.Errorf("resource = %q — the audit entry must name what was touched", grant.Resource())
	}
	if grant.GrantedAt().IsZero() {
		t.Error("grant has no timestamp")
	}
}
