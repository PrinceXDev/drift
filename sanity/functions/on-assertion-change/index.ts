import type {DocumentEvent} from '@sanity/functions'

/**
 * A human edited a published page. Re-check the assertions that live on it.
 *
 * The case this exists for: an editor notices "30 days" is wrong and fixes it
 * directly in the Studio, without going near DRIFT. The assertion is still
 * flagged stale, the console still lists the page, and the remediation queue
 * still holds a draft for work that is already done.
 *
 * A tool that only stays accurate when everyone uses it is not an integrity
 * tool. So the graph has to notice unilateral edits and quietly settle up.
 */
export async function handler(event: DocumentEvent): Promise<void> {
  const url = process.env.DRIFT_ENGINE_URL
  const token = process.env.DRIFT_ENGINE_TOKEN

  if (!url || !token) {
    console.error('on-assertion-change: engine URL or token unset; skipping')
    return
  }

  const pageId = (event.data as {_id?: string} | undefined)?._id
  if (!pageId) {
    console.warn('on-assertion-change: event carried no document id')
    return
  }

  // Draft ids are prefixed. Reconcile against the published document: a draft
  // edit is not yet a claim about what the public site says.
  if (pageId.startsWith('drafts.')) {
    return
  }

  const response = await fetch(`${url}/v1/assertions/reconcile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({pageId, trigger: 'document'}),
  })

  if (!response.ok) {
    throw new Error(
      `on-assertion-change: engine returned ${response.status} ${await response.text()}`,
    )
  }

  const result = (await response.json()) as {reconciled: number; stillStale: number}
  console.log(
    `on-assertion-change: ${pageId} — ${result.reconciled} assertion(s) settled, ` +
      `${result.stillStale} still stale`,
  )
}
