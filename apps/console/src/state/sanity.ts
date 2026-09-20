import {useQuery} from '@sanity/sdk-react'
import type {
  Assertion,
  BuildSnapshot,
  Claim,
  ContentPage,
  Source,
  Surface,
} from '@drift/fixtures'

/**
 * The live Sanity read layer.
 *
 * # Which half of the Control Room this is
 *
 * DRIFT has two kinds of data and they come from two different places, on
 * purpose:
 *
 *   content    claims, assertions, surfaces, pages, sources, builds
 *              → Sanity, read here, live, over the App SDK
 *
 *   computed   drift events, blast radius, gate decisions, the audit chain
 *              → the Go engine, which diffs builds and enforces the gate
 *
 * That split is not a compromise, it is the architecture. The engine's whole
 * claim is that its answers are deterministic and reproducible — folding them
 * into a GROQ query would make them a view over mutable documents rather than
 * the output of a golden-file-tested pipeline. Conversely, mirroring content
 * into the engine would make the console read a stale copy of documents Sanity
 * already serves in real time.
 *
 * So: Sanity is the source of truth for what the organisation *says*, and the
 * engine is the source of truth for what *changed*.
 *
 * # Why one query rather than six
 *
 * Every panel in the Control Room shows numbers derived from this data, and the
 * product exists to object to two screens disagreeing with each other. Six
 * subscriptions would resolve at six different moments, and the causal graph
 * could render an assertion against a claim revision the lineage panel had not
 * seen yet. One projection is one consistent read.
 *
 * # Real-time, not polled
 *
 * `useQuery` subscribes. Edit a claim in the Studio and the Control Room
 * re-renders — no refresh, no poll loop, no cache to invalidate. That is the
 * thing the App SDK buys that a REST fetch does not.
 */

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/**
 * The project this console reads.
 *
 * Both values are public — the project id travels in every request the browser
 * makes to Sanity — so they live in `VITE_*` variables rather than in the
 * engine's server-side environment. Nothing secret reaches the bundle.
 */
export const sanityProjectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined
export const sanityDataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) ?? 'production'

/**
 * Whether this build was pointed at a Sanity project at all.
 *
 * Checked before the App SDK is mounted, because `SanityApp` with no project
 * would put a login screen in front of a console that has nothing to log in
 * to — and the fixture path exists precisely so the Control Room is
 * demonstrable without an account.
 */
export function isSanityConfigured(): boolean {
  return typeof sanityProjectId === 'string' && sanityProjectId.length > 0
}

export const sanityConfig = {
  projectId: sanityProjectId ?? '',
  dataset: sanityDataset,
}

// ---------------------------------------------------------------------------
// The query
// ---------------------------------------------------------------------------

/**
 * Everything the Control Room renders, in one projection.
 *
 * Shaped to match the engine's `driftv1` contract exactly — `claimId` rather
 * than `claim->_id`, `pageId` rather than `page->_id` — so the panels are
 * identical whether the data arrived from Sanity or from committed fixtures.
 * The alternative, two shapes and a mapping layer inside each panel, is how a
 * UI ends up quietly depending on fixture-only behaviour.
 *
 * `body[].children[].text` flattens Portable Text to one string per block,
 * which is what an assertion's `fieldPath` (`body[1]`) addresses.
 */
export const CONTENT_QUERY = `{
  "builds": *[_type == "buildSnapshot"] | order(buildNumber asc) {
    "id": _id,
    kbId,
    buildNumber,
    builtAt,
    outlineHash,
    "conflicts": conflicts[]{
      path,
      "competingValues": competingValues[]{
        statement,
        value,
        unit,
        "sourceId": source->_id,
        "authority": source->authority
      }
    },
    "instructionsActive": null,
    "instructionsArchived": null,
    "claims": null
  },
  "claims": *[_type == "claim"] | order(path asc) {
    "id": _id,
    path,
    statement,
    value,
    unit,
    tier,
    status,
    "citations": citations[]->_id,
    "firstSeenBuild": firstSeenBuild->_id,
    "lastVerifiedBuild": lastVerifiedBuild->_id,
    "lastChangedBuild": lastChangedBuild->_id
  },
  "pages": *[_type == "contentPage"] | order(title asc) {
    "id": _id,
    title,
    "slug": slug.current,
    summary,
    owner,
    "body": body[].children[0].text
  },
  "assertions": *[_type == "assertion"] | order(_id asc) {
    "id": _id,
    "claimId": claim->_id,
    "pageId": page->_id,
    "surfaceId": surface->surfaceId,
    fieldPath,
    blockKey,
    renderedText,
    "verifiedAgainstBuild": verifiedAgainstBuild->_id,
    state
  },
  "surfaces": *[_type == "surface"] | order(surfaceId asc) {
    "id": surfaceId,
    kind,
    title,
    owner,
    locator
  },
  "sources": *[_type == "source"] | order(authority desc) {
    "id": _id,
    title,
    kind,
    uri,
    owner,
    authority,
    "changedAt": lastChangedAt
  }
}`

/** The content half of `DriftData` — everything except computed drift. */
export interface SanityContent {
  builds: BuildSnapshot[]
  claims: Claim[]
  pages: ContentPage[]
  assertions: Assertion[]
  surfaces: Surface[]
  sources: Source[]
}

/**
 * Subscribes to the project's content.
 *
 * Suspends on first load — `SanityApp` supplies the fallback — and thereafter
 * re-renders on every relevant document change. `isPending` covers a refetch in
 * flight, which is worth surfacing rather than hiding: an operator deciding
 * whether seven pages are wrong should be able to see that the number is
 * currently being recomputed.
 */
export function useSanityContent(): {content: SanityContent; isPending: boolean} {
  const {data, isPending} = useQuery<SanityContent>({
    query: CONTENT_QUERY,
    projectId: sanityConfig.projectId,
    dataset: sanityConfig.dataset,
  })

  return {content: normalise(data), isPending}
}

/**
 * Fills in what GROQ leaves absent.
 *
 * A projection returns `null` for a missing field and omits nothing, so an
 * assertion with no `surface` arrives as `surfaceId: null` rather than as an
 * absent key. The TypeScript contract says optional, and `exactOptionalPropertyTypes`
 * means `null` is not the same as absent — so the boundary is cleaned here,
 * once, rather than defended against in every panel.
 *
 * Arrays are defaulted rather than left nullish for the same reason: a console
 * that crashes on an empty dataset is a console nobody can set up.
 */
function normalise(data: SanityContent | undefined): SanityContent {
  if (!data) {
    return {builds: [], claims: [], pages: [], assertions: [], surfaces: [], sources: []}
  }

  return {
    builds: (data.builds ?? []).map((b) => ({
      ...b,
      claims: b.claims ?? [],
      conflicts: b.conflicts ?? [],
      instructionsActive: b.instructionsActive ?? [],
      instructionsArchived: b.instructionsArchived ?? [],
    })),
    claims: (data.claims ?? []).map((c) => ({...c, citations: c.citations ?? []})),
    pages: (data.pages ?? []).map((p) => ({...p, body: (p.body ?? []).filter(Boolean)})),
    assertions: (data.assertions ?? []).map(stripNulls),
    surfaces: data.surfaces ?? [],
    sources: data.sources ?? [],
  }
}

/** Drops `pageId` / `surfaceId` when GROQ returned null for them. */
function stripNulls(assertion: Assertion): Assertion {
  const out: Assertion = {
    id: assertion.id,
    claimId: assertion.claimId,
    fieldPath: assertion.fieldPath,
    renderedText: assertion.renderedText,
    verifiedAgainstBuild: assertion.verifiedAgainstBuild,
    state: assertion.state,
  }
  if (assertion.pageId) out.pageId = assertion.pageId
  if (assertion.surfaceId) out.surfaceId = assertion.surfaceId
  if (assertion.blockKey) out.blockKey = assertion.blockKey
  return out
}
