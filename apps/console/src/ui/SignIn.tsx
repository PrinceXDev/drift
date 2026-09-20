import {useState} from 'react'

import * as api from '../state/api'
import type {Me, Mode} from '../state/model'

/**
 * Identity switcher.
 *
 * # Why a picker and not a login form
 *
 * The demo actors are not secrets — they grant access to committed demo data in
 * a process that touches no Sanity project. Presenting them as a password field
 * would imply a security boundary that is not there, and would hide the thing
 * worth showing: that the *same screen* behaves differently for four different
 * principals.
 *
 * Switching between viewer, editor, steward and agent is the fastest way to see
 * least privilege working. The agent entry exists specifically so you can watch
 * an unattended principal be refused at the publication gate.
 *
 * # Why the token is not persisted
 *
 * It lives in a module variable for the session. This credential can approve a
 * publication, and a token in localStorage is one XSS away from being someone
 * else's. Reloading signs you out, which is the correct inconvenience.
 */

interface DemoActor {
  token: string
  label: string
  role: string
  can: string
}

const DEMO_ACTORS: DemoActor[] = [
  {
    token: 'demo-viewer',
    label: 'Vic · viewer',
    role: 'viewer',
    can: 'Read the ledger. Nothing else — no gate, no audit, no publishing.',
  },
  {
    token: 'demo-editor',
    label: 'Dana · editor',
    role: 'editor',
    can: 'Owns pages. Can run the gate, approve and publish, and read the audit trail.',
  },
  {
    token: 'demo-steward',
    label: 'Sam · steward',
    role: 'steward',
    can: 'Owns the knowledge base. Everything an editor can do, plus resolving conflicts and writing standing instructions.',
  },
  {
    token: 'demo-agent',
    label: 'Drafter · agent',
    role: 'agent',
    can: 'Unattended. May draft and simulate. Cannot publish, whatever roles it is given.',
  },
]

export function SignIn({
  me,
  mode,
  onChanged,
}: {
  me: Me
  mode: Mode
  onChanged: () => void
}) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  async function signInAs(actor: DemoActor | null) {
    setBusy(true)
    api.setToken(actor?.token ?? null)
    setOpen(false)
    onChanged()
    // Give the reload a beat so the button does not flicker back instantly.
    window.setTimeout(() => setBusy(false), 250)
  }

  return (
    <div style={{position: 'relative'}}>
      <button
        type="button"
        className="btn ghost"
        onClick={() => setOpen((v) => !v)}
        disabled={busy}
        aria-expanded={open}
        style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 0}}
      >
        <span className="stat-k">Signed in as</span>
        <span className="stat-v" style={{fontSize: 12}}>
          {mode === 'live' ? me.id : 'not signed in'}
          <span className="faint"> · {mode === 'live' ? me.roles.join(', ') : 'read-only'}</span>
        </span>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 'calc(100% + 6px)',
            width: 330,
            zIndex: 50,
            border: '1px solid var(--line-strong)',
            borderRadius: 'var(--r)',
            background: 'var(--raised)',
            boxShadow: '0 12px 32px rgb(0 0 0 / 45%)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '9px 12px',
              borderBottom: '1px solid var(--line)',
              fontSize: 11,
              color: 'var(--text-2)',
              lineHeight: 1.5,
            }}
          >
            Switch principal to see least privilege work. The same screen behaves differently
            for each.
          </div>

          {DEMO_ACTORS.map((actor) => (
            <button
              key={actor.token}
              type="button"
              className="feed-row"
              style={{gridTemplateColumns: '1fr', borderLeft: 0, padding: '10px 12px'}}
              onClick={() => void signInAs(actor)}
            >
              <div>
                <div style={{fontWeight: 600, fontSize: 12.5}}>
                  {actor.label}
                  {actor.role === 'agent' && (
                    <span className="chip major" style={{marginLeft: 7}}>
                      unattended
                    </span>
                  )}
                </div>
                <div className="faint" style={{fontSize: 11, marginTop: 2, lineHeight: 1.45}}>
                  {actor.can}
                </div>
              </div>
            </button>
          ))}

          <button
            type="button"
            className="feed-row"
            style={{gridTemplateColumns: '1fr', borderLeft: 0, padding: '10px 12px', borderBottom: 0}}
            onClick={() => void signInAs(null)}
          >
            <div>
              <div style={{fontWeight: 600, fontSize: 12.5}}>Sign out</div>
              <div className="faint" style={{fontSize: 11, marginTop: 2}}>
                Back to read-only committed output.
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}
