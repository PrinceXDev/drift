import {defineField, defineType} from 'sanity'
import {SURFACE_KINDS, asOptions} from '../constants'

/**
 * `surface` — a published place that can depend on a claim.
 *
 * A content page is one kind of surface. An agent that answers questions from
 * the Knowledge Base is another, and so is a syndicated feed or an email
 * template. They differ in how you correct them and not at all in how they go
 * wrong: each one repeats a fact to a customer, and each one keeps repeating it
 * after the organisation stops believing it.
 *
 * # Why this exists as a document
 *
 * Before it did, `assertion.page` was the only way to depend on a claim, and
 * the blast radius was therefore complete over pages and silent about
 * everything else. The Dissent agent answers from the same claims; when it told
 * a customer "30 days" and the policy moved to 45, that answer was as wrong as
 * the seven pages and invisible to the query that found them.
 *
 * Completeness over pages is not completeness. Registering a non-page dependent
 * as a `surface`, and its dependency as an ordinary `assertion`, keeps the one
 * query answering the whole question:
 *
 *     *[_type == "assertion" && references($claimId)]
 *
 * # What a surface cannot do
 *
 * Mark itself correct. `kind` decides whether a correction can even be drafted:
 * only `page` has a document to patch, and the engine's `correctable_surface`
 * gate check blocks anything else. A bot stops repeating the old value when the
 * Knowledge Base rebuilds, not when somebody approves a paragraph, and a queue
 * item nobody can publish is worse than no queue item.
 */
export const surface = defineType({
  name: 'surface',
  title: 'Surface',
  type: 'document',
  fields: [
    defineField({
      name: 'surfaceId',
      title: 'Surface ID',
      type: 'string',
      description:
        'Stable identifier an agent registers itself under. Separate from the document ID ' +
        'so that a content page and its surface record can coexist without colliding.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      description:
        'How this surface is corrected. Only `page` can be patched; everything else is ' +
        'downstream of the Knowledge Base and is fixed by fixing the claim.',
      options: {list: asOptions(SURFACE_KINDS), layout: 'radio', direction: 'horizontal'},
      initialValue: 'page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'What an operator would call it: "Support Bot", "Returns & Refunds".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'owner',
      title: 'Owner',
      type: 'string',
      description:
        'Who is accountable when this surface is wrong. A dependent with no owner is one ' +
        'nobody can be asked to fix, which is why registration requires this.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'locator',
      title: 'Locator',
      type: 'string',
      description: 'Where a human goes to see it — a path, a URL, a channel, a queue name.',
    }),
  ],
  preview: {
    select: {title: 'title', kind: 'kind', owner: 'owner', locator: 'locator'},
    prepare: ({title, kind, owner, locator}) => ({
      title,
      subtitle: `${kind} · ${owner}${locator ? ` · ${locator}` : ''}`,
    }),
  },
})
