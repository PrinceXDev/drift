/**
 * The DRIFT content model.
 *
 * Read these eight types in this order and the product explains itself:
 *
 *   source        what the organisation has written down
 *   claim         one atomic fact, mirrored from a Knowledge Base entry
 *   contentPage   what the organisation has published
 *   assertion     a place where something depends on a claim ← the edge we walk
 *   surface       a published place that can carry one       ← a page, or an agent
 *   buildSnapshot one immutable Knowledge Base build        ← the time dimension
 *   driftEvent    the diff between two builds, per claim    ← the changelog
 *   instruction   a standing decision written back into the KB
 */
import type {SchemaTypeDefinition} from 'sanity'

import {source} from './documents/source'
import {claim} from './documents/claim'
import {contentPage} from './documents/contentPage'
import {assertion} from './documents/assertion'
import {surface} from './documents/surface'
import {buildSnapshot} from './documents/buildSnapshot'
import {driftEvent} from './documents/driftEvent'
import {instruction} from './documents/instruction'

export const schemaTypes: SchemaTypeDefinition[] = [
  source,
  claim,
  contentPage,
  assertion,
  surface,
  buildSnapshot,
  driftEvent,
  instruction,
]

export {source, claim, contentPage, assertion, surface, buildSnapshot, driftEvent, instruction}
export * from './constants'
