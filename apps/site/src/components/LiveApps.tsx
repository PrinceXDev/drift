'use client'

import {useEffect, useState} from 'react'

import type {LiveApp} from '@/lib/apps'

/**
 * The other four processes, and whether they are answering.
 *
 * Liveness is probed with a no-cors fetch: the response is opaque, so this can
 * tell that *something* answered on that port and nothing more. That is exactly
 * the claim the badge makes — "reachable", not "healthy" — because a docs page
 * asserting a service is fine when it has not looked is the same failure this
 * whole product is about.
 */
type State = 'checking' | 'reachable' | 'down'

export function LiveApps({apps, engineUrl}: {apps: LiveApp[]; engineUrl: string}) {
  const [states, setStates] = useState<Record<string, State>>({})
  const [engine, setEngine] = useState<State>('checking')

  useEffect(() => {
    let cancelled = false

    const probe = async (url: string): Promise<State> => {
      const abort = new AbortController()
      const timer = setTimeout(() => abort.abort(), 2500)
      try {
        await fetch(url, {mode: 'no-cors', signal: abort.signal, cache: 'no-store'})
        return 'reachable'
      } catch {
        return 'down'
      } finally {
        clearTimeout(timer)
      }
    }

    void (async () => {
      const results = await Promise.all(apps.map((app) => probe(app.href)))
      if (cancelled) return
      setStates(Object.fromEntries(apps.map((app, i) => [app.href, results[i] as State])))
      setEngine(await probe(`${engineUrl}/healthz`))
    })()

    return () => {
      cancelled = true
    }
  }, [apps, engineUrl])

  return (
    <>
      <div className="engine-line">
        <span className="dot" data-state={engine} />
        <code>{engineUrl}</code>
        <span>
          {engine === 'checking'
            ? 'checking the engine…'
            : engine === 'reachable'
              ? 'engine reachable — the Control Room and Dissent have something to read'
              : 'engine not running. Start it first: everything below reads from it.'}
        </span>
      </div>

      {engine === 'down' ? (
        <div className="engine-run">
          <code>cd services/drift-engine &amp;&amp; go run ./cmd/engine -fixtures</code>
        </div>
      ) : null}

      <div className="grid-2">
        {apps.map((app) => {
          const state = states[app.href] ?? 'checking'
          return (
            <a
              className="app-card"
              key={app.href}
              href={app.href}
              target="_blank"
              rel="noreferrer noopener"
              data-state={state}
            >
              <div className="app-card__top">
                <span className="dot" data-state={state} />
                <span className="app-card__name">{app.name}</span>
                <span className="app-card__port">:{app.port}</span>
              </div>
              <p className="app-card__what">{app.what}</p>
              <div className="app-card__foot">
                {state === 'reachable' ? (
                  <span className="app-card__open">Open →</span>
                ) : (
                  <code>{app.run}</code>
                )}
                {app.needsEngine ? <span className="app-card__needs">needs the engine</span> : null}
              </div>
            </a>
          )
        })}
      </div>
    </>
  )
}
