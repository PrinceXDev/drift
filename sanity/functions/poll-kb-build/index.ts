import type {DocumentEvent} from '@sanity/functions'

/**
 * Scheduled poll: has the Knowledge Base rebuilt?
 *
 * Deliberately thin. All this does is wake the engine, which fetches the
 * outline, content-addresses it, and returns early if the hash is unchanged.
 * Putting the comparison here instead would mean doing it inside a 10-second
 * function budget with no ability to retry usefully.
 *
 * Drift that goes unnoticed for five minutes is not a problem. Drift that goes
 * unnoticed for five months is the problem this product exists for.
 */
export async function handler(_event: DocumentEvent): Promise<void> {
  const url = process.env.DRIFT_ENGINE_URL
  const token = process.env.DRIFT_ENGINE_TOKEN

  if (!url || !token) {
    console.error('poll-kb-build: DRIFT_ENGINE_URL or DRIFT_ENGINE_TOKEN is unset; skipping')
    return
  }

  const response = await fetch(`${url}/v1/builds/poll`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({trigger: 'cron'}),
  })

  if (!response.ok) {
    // Throwing marks the invocation failed so it shows up in Sanity's function
    // logs. Swallowing it would make a silently dead poller look healthy, which
    // is the one failure this system must not have.
    throw new Error(`poll-kb-build: engine returned ${response.status} ${await response.text()}`)
  }

  const result = (await response.json()) as {
    changed: boolean
    build?: number
    events?: number
  }

  console.log(
    result.changed
      ? `poll-kb-build: build ${result.build} produced ${result.events ?? 0} drift events`
      : 'poll-kb-build: no rebuild since last poll',
  )
}
