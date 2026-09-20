import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

/**
 * Deployed compute for DRIFT.
 *
 * # Why there is only one function here
 *
 * The original design had two: a `sanity.function.cron` poller asking the
 * Knowledge Base whether it rebuilt, and this document function. The cron half
 * is not deployable.
 *
 * `defineScheduledFunction` exists in `@sanity/blueprints` (checked 0.24.0 and
 * 0.26.1) but its own doc comment says:
 *
 *   @alpha Deploying Scheduled Functions via Blueprints is experimental.
 *          This feature is not available publicly yet.
 *
 * So the periodic poll lives in the Go engine's own ticker instead
 * (`cmd/engine`, `-poll` flag). That is a better home for it regardless: the
 * engine is a long-running service that already holds the MCP client and the
 * previous snapshot, a poll is a hash comparison against state it has in
 * memory, and Sanity Functions cap at 10s by default where a full capture plus
 * diff plus blast-radius walk can exceed that on a large content lake.
 *
 * `functions/poll-kb-build/` is kept as the HTTP shim for when the alpha lands —
 * it already calls the same engine endpoint the ticker does.
 *
 * The one function that *is* deployed does something a long-running service
 * genuinely cannot: react the instant an editor changes a page.
 */
export default defineBlueprint({
  resources: [
    /**
     * Re-checks assertions when a human edits the page they live on.
     *
     * The case this exists for: an editor notices "30 days" is wrong and fixes
     * it directly in the Studio, without going near DRIFT. Without this the
     * assertion stays flagged stale for ever, the console keeps listing the
     * page, and the remediation queue holds a draft for work already done.
     *
     * A tool that only stays accurate when everybody uses it is not an
     * integrity tool. The graph has to notice unilateral edits and settle up.
     */
    defineDocumentFunction({
      name: 'on-assertion-change',
      src: './functions/on-assertion-change',
      memory: 1,
      timeout: 30,
      event: {
        on: ['create', 'update'],
        filter: "_type == 'contentPage'",
        projection: '{_id, _type, title}',
      },
    }),
  ],
})
