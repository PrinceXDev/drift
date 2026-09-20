import {fixtures} from '@drift/fixtures'
import type {Assertion, BuildSnapshot, Claim, ContentPage, DriftEvent} from '@drift/fixtures'

/**
 * The public site's read model.
 *
 * Same fixtures the console renders, same engine output. When the Sanity
 * credentials land this file swaps to `next-sanity` with a GROQ query and
 * nothing above it changes — which is the point of keeping the derivations here
 * rather than in components.
 */

const data = fixtures

/** The most recent Knowledge Base build. "Current belief". */
export function currentBuild(): BuildSnapshot {
  return data.builds.reduce((latest, b) => (b.buildNumber > latest.buildNumber ? b : latest))
}

export function allPages(): ContentPage[] {
  return data.pages
}

export function pageBySlug(slug: string): ContentPage | undefined {
  return data.pages.find((p) => p.slug === slug)
}

/**
 * Integrity of one published sentence.
 *
 * This is the whole reason the public site exists in the submission: a visitor
 * can see that a page is asserting something the organisation no longer
 * believes, and *why* we know that, without any of it being a matter of opinion.
 */
export interface AssertionStatus {
  assertion: Assertion
  claim: Claim | undefined
  /** The drift event that invalidated this assertion, if any. */
  drift: DriftEvent | undefined
  stale: boolean
  /** Which build this text was last confirmed correct against. */
  verifiedBuild: number
}

export interface PageIntegrity {
  statuses: AssertionStatus[]
  staleCount: number
  /** Assertion IDs keyed by the field path they address, for inline rendering. */
  byFieldPath: Map<string, AssertionStatus>
  /** True when every assertion on the page agrees with the current build. */
  clean: boolean
}

const claimsById = new Map(data.claims.map((c) => [c.id, c]))

/**
 * Drift events indexed by the assertions they invalidate.
 *
 * Built from `blastRadius`, which the Go engine computed by walking real Sanity
 * references. The site does not re-derive it and does not guess: it reads the
 * same answer the console shows, so the two can never disagree about whether a
 * page is stale.
 */
const driftByAssertion = new Map<string, DriftEvent>()
for (const event of data.events) {
  for (const assertionId of event.blastRadius) {
    driftByAssertion.set(assertionId, event)
  }
}

export function pageIntegrity(page: ContentPage): PageIntegrity {
  const statuses: AssertionStatus[] = data.assertions
    .filter((a) => a.pageId === page.id)
    .map((assertion) => {
      const drift = driftByAssertion.get(assertion.id)
      return {
        assertion,
        claim: claimsById.get(assertion.claimId),
        drift,
        stale: drift !== undefined,
        verifiedBuild: Number(assertion.verifiedAgainstBuild.replace('build.', '')),
      }
    })

  const byFieldPath = new Map(statuses.map((s) => [s.assertion.fieldPath, s]))
  const staleCount = statuses.filter((s) => s.stale).length

  return {statuses, byFieldPath, staleCount, clean: staleCount === 0}
}

/** Site-wide integrity, for the home page banner. */
export function siteIntegrity() {
  const pages = allPages()
  const perPage = pages.map((page) => ({page, integrity: pageIntegrity(page)}))
  return {
    perPage,
    affectedPages: perPage.filter((p) => p.integrity.staleCount > 0).length,
    totalPages: pages.length,
    staleAssertions: perPage.reduce((n, p) => n + p.integrity.staleCount, 0),
    build: currentBuild(),
  }
}
