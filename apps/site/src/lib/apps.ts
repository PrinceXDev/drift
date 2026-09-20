/**
 * Where the rest of DRIFT is running.
 *
 * The documentation site is one of five processes, and on a developer's machine
 * each one is a different port. A docs site that never mentions the app it
 * documents leaves the reader to guess, so these are surfaced on the landing
 * page and on the Quickstart.
 *
 * Each is overridable, because the ports are only the local defaults: in a
 * deployment they are four different hostnames, and hard-coding localhost into
 * a published page would send every visitor to a machine that is not running
 * anything.
 */

export type LiveApp = {
  name: string
  href: string
  port: string
  what: string
  run: string
  /** Whether the engine has to be up for this to show anything. */
  needsEngine: boolean
}

const env = (key: string, fallback: string) => process.env[key] ?? fallback

export const ENGINE_URL = env('NEXT_PUBLIC_DRIFT_ENGINE_URL', 'http://localhost:8080')

export const LIVE_APPS: LiveApp[] = [
  {
    name: 'Knowledge Control Room',
    href: env('NEXT_PUBLIC_CONSOLE_URL', 'http://localhost:3333'),
    port: '3333',
    what: 'The operator console — drift feed, conflicts, lineage, remediation queue and the hash-chained audit trail.',
    run: 'pnpm --filter @drift/console dev',
    needsEngine: true,
  },
  {
    name: 'Dissent',
    href: env('NEXT_PUBLIC_DISSENT_URL', 'http://localhost:3335'),
    port: '3335',
    what: 'The agent. Ask it about returns and watch it refuse, because its sources disagree.',
    run: 'pnpm --filter @drift/dissent dev',
    needsEngine: true,
  },
  {
    name: 'Northwind Audio',
    href: env('NEXT_PUBLIC_WEB_URL', 'http://localhost:3000'),
    port: '3000',
    what: 'The published site — the content that drifts. Each page carries an integrity strip.',
    run: 'pnpm --filter @drift/web dev',
    needsEngine: false,
  },
  {
    name: 'Sanity Studio',
    href: env('NEXT_PUBLIC_STUDIO_URL', 'http://localhost:3334'),
    port: '3334',
    what: 'Where sources are edited, which is where drift starts. Needs a Sanity project.',
    run: 'pnpm --filter @drift/studio dev',
    needsEngine: false,
  },
]
