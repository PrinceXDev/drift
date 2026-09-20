import {fixtures} from '@drift/fixtures'
import type {Claim, ClaimTier, Conflict, Source} from '@drift/fixtures'

/**
 * The browser's view of the Dissent agent.
 *
 * Two ways to run:
 *
 *   live   POST /v1/dissent, proxied to the Go engine. The real agent.
 *   local  the same routing and adjudication, reimplemented here.
 *
 * The local path exists so the UI works with nothing else running, and so the
 * demo has a fallback if the engine is unreachable. It is a genuine duplicate of
 * logic that lives in Go, which is a cost worth naming rather than hiding: the
 * Go implementation is authoritative and tested, and `agent.contract.test`-style
 * parity checking is on the list. Until then the local path is explicitly
 * labelled in the UI so nobody mistakes it for the real thing.
 */

export interface Side {
  statement: string
  value?: number
  unit?: string
  sourceId: string
  authority: number
  favoured?: boolean
}

export interface Adjudication {
  path: string
  tier: ClaimTier
  sides: Side[]
  reason: string
  proposedInstruction: {text: string; anchoredTo: string[]}
}

export interface Answer {
  claims?: Claim[]
  paths?: string[]
  citations?: string[]
}

export interface Verdict {
  question: string
  buildId: string
  answer?: Answer
  adjudication?: Adjudication
}

export type Mode = 'live' | 'local'

const data = fixtures
const build = data.builds.reduce((a, b) => (b.buildNumber > a.buildNumber ? b : a))
const sourcesById = new Map<string, Source>(data.sources.map((s) => [s.id, s]))

export function sourceTitle(id: string): string {
  return sourcesById.get(id)?.title ?? id
}

/** Tries the engine first; falls back to local reasoning. */
export async function ask(question: string): Promise<{verdict: Verdict; mode: Mode}> {
  try {
    const response = await fetch('/v1/dissent', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({question}),
    })
    if (response.ok) {
      return {verdict: (await response.json()) as Verdict, mode: 'live'}
    }
  } catch {
    // Engine not running. Fall through rather than showing the visitor a
    // network error for something they can still use.
  }
  return {verdict: askLocally(question), mode: 'local'}
}

// ---------------------------------------------------------------------------
// Local reasoning — mirrors internal/dissent in Go
// ---------------------------------------------------------------------------

const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'do', 'does', 'did', 'i', 'we', 'you',
  'my', 'our', 'your', 'to', 'of', 'for', 'in', 'on', 'at', 'it', 'and', 'or',
  'how', 'what', 'when', 'can', 'have', 'has', 'get', 'long', 'much', 'many',
])

function stem(word: string): string {
  if (word.endsWith('ies') && word.length > 4) return `${word.slice(0, -3)}y`
  if (word.endsWith('s') && !word.endsWith('ss') && word.length > 3) return word.slice(0, -1)
  return word
}

function tokenise(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 2 && !STOP_WORDS.has(t))
    .map(stem)
}

const TIER_RANK: Record<ClaimTier, number> = {core: 0, standard: 1, peripheral: 2}

function route(question: string): Claim[] {
  const terms = tokenise(question)
  if (terms.length === 0) return []

  const ranked = data.claims
    .filter((c) => c.status === 'active')
    .map((claim) => {
      const pathTerms = tokenise(claim.path.replace(/\//g, ' '))
      const statementTerms = tokenise(claim.statement)
      let score = 0
      for (const term of terms) {
        if (pathTerms.includes(term)) score += 3
        else if (statementTerms.includes(term)) score += 1
      }
      if (score > 0 && claim.tier === 'core') score += 1
      return {claim, score}
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score || a.claim.path.localeCompare(b.claim.path))

  const top = ranked[0]
  if (!top) return []

  // Strictly more than half the best score — see the Go implementation for why
  // strict rather than inclusive.
  const best = top.score
  return ranked
    .slice(0, 5)
    .filter((r) => 2 * r.score > best)
    .map((r) => r.claim)
}

function tierOf(path: string): ClaimTier {
  return data.claims.find((c) => c.path === path)?.tier ?? 'standard'
}

function unresolvedConflictsFor(paths: Set<string>): Conflict[] {
  return (build.conflicts ?? [])
    .filter((c) => !c.resolvedBy && paths.has(c.path))
    .sort((a, b) => TIER_RANK[tierOf(a.path)] - TIER_RANK[tierOf(b.path)] || a.path.localeCompare(b.path))
}

function adjudicate(conflict: Conflict): Adjudication {
  const sides: Side[] = conflict.competingValues
    .map((cv) => {
      const side: Side = {
        statement: cv.statement,
        sourceId: cv.sourceId,
        authority: cv.authority || (sourcesById.get(cv.sourceId)?.authority ?? 0),
      }
      // Assigned conditionally rather than as `value: cv.value`: under
      // exactOptionalPropertyTypes an explicit `undefined` is not the same as an
      // absent key, and a side with no typed value should simply not have one.
      if (cv.value !== undefined) side.value = cv.value
      if (cv.unit !== undefined) side.unit = cv.unit
      return side
    })
    .sort((a, b) => b.authority - a.authority || a.sourceId.localeCompare(b.sourceId))

  const [first, second] = sides
  let reason = 'Sources disagree and no standing instruction settles it.'

  if (first && second && first.authority > second.authority) {
    first.favoured = true
    reason =
      `Sources disagree. ${sourceTitle(first.sourceId)} carries higher authority, ` +
      'but nothing on record says it wins.'
  } else if (first && second) {
    reason =
      'Sources disagree and carry equal authority. ' +
      'There is no basis to prefer either; a human has to decide.'
  }

  const subject = conflict.path.split('/').pop()?.replace(/-/g, ' ') ?? conflict.path
  const others = sides.slice(1).map((s) => sourceTitle(s.sourceId))

  return {
    path: conflict.path,
    tier: tierOf(conflict.path),
    sides,
    reason,
    proposedInstruction: {
      text:
        first && others.length > 0
          ? `When ${sourceTitle(first.sourceId)} and ${others.join(', ')} disagree about ` +
            `${subject}, ${sourceTitle(first.sourceId)} is authoritative.`
          : '',
      anchoredTo: sides.map((s) => s.sourceId).sort(),
    },
  }
}

function askLocally(question: string): Verdict {
  const verdict: Verdict = {question, buildId: build.id}

  const candidates = route(question)
  if (candidates.length === 0) {
    verdict.answer = {}
    return verdict
  }

  const [mostConsequential] = unresolvedConflictsFor(new Set(candidates.map((c) => c.path)))
  if (mostConsequential) {
    verdict.adjudication = adjudicate(mostConsequential)
    return verdict
  }

  const citations = [...new Set(candidates.flatMap((c) => c.citations))].sort()
  verdict.answer = {claims: candidates, paths: candidates.map((c) => c.path), citations}
  return verdict
}

/** Questions that show each of the three behaviours, for the empty state. */
export const SAMPLE_QUESTIONS = [
  'How long do I have to return something?',
  'What is the warranty period?',
  'When do I get free shipping?',
  'Do you sell bicycles?',
]
