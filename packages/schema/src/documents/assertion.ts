import {defineField, defineType} from 'sanity'
import {ASSERTION_STATES, asOptions} from '../constants'

/**
 * `assertion` — a specific place on a published surface where a claim is expressed.
 *
 * This document type is the single most important design decision in DRIFT.
 *
 * `assertion.claim` is the edge the entire product walks. Because it is a real
 * Sanity reference, computing blast radius is:
 *
 *     *[_type == "assertion" && references($claimId)]
 *
 * — exact, instant, and provably complete. The alternative (vector search over
 * prose to guess which pages "probably mention" a policy) is approximate and
 * unprovable. That difference is why structured content is the mechanism here
 * rather than decoration.
 *
 * An assertion hangs off exactly one of two things: a `page`, which has a
 * paragraph to patch, or a `surface`, which is any other published dependent —
 * an agent, a feed, a template. Keeping both shapes in *one* document type is
 * deliberate. A second, parallel way to depend on a claim would have quietly
 * falsified the completeness argument above, because completeness over pages is
 * not completeness. One document type means one query, and one query means the
 * answer is still provable.
 */
export const assertion = defineType({
  name: 'assertion',
  title: 'Assertion',
  type: 'document',
  fields: [
    defineField({
      name: 'claim',
      title: 'Claim',
      type: 'reference',
      to: [{type: 'claim'}],
      description: 'The fact this piece of published text depends on.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{type: 'contentPage'}],
      description:
        'The published document that carries this assertion. Set for page assertions; ' +
        'leave empty and set `surface` instead for an agent, a feed or a template.',
      validation: (rule) =>
        rule.custom((page, context) => {
          const surface = (context.document as {surface?: unknown} | undefined)?.surface
          if (page && surface) {
            return 'An assertion addresses a page or a surface, never both.'
          }
          if (!page && !surface) {
            return 'An assertion must name either a page or a surface.'
          }
          return true
        }),
    }),
    defineField({
      name: 'surface',
      title: 'Surface',
      type: 'reference',
      to: [{type: 'surface'}],
      description:
        'A non-page dependent: an agent that answered from this claim, a syndicated feed, ' +
        'an email template. Registered rather than authored — the Dissent agent writes one ' +
        'of these every time it answers, which is what puts it in the blast radius alongside ' +
        'the pages instead of being invisible to the walk that finds them.',
    }),
    defineField({
      name: 'fieldPath',
      title: 'Field path',
      type: 'string',
      description:
        'Where inside the page the claim is expressed, e.g. "body[3]". The remediation agent ' +
        'is only ever permitted to rewrite this span — never anything outside it.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'blockKey',
      title: 'Block key',
      type: 'string',
      description:
        "The Portable Text `_key` of the addressed block. `fieldPath` is for humans; this is " +
        'what the remediation agent targets. A positional path points at different text the ' +
        'moment someone reorders two paragraphs, and the agent would then rewrite the wrong ' +
        'sentence — an addressing scheme that goes quietly out of date, in a tool about ' +
        'content going quietly out of date. Required for page assertions; a surface has no ' +
        'Portable Text to key into.',
      validation: (rule) =>
        rule.custom((blockKey, context) => {
          const page = (context.document as {page?: unknown} | undefined)?.page
          if (page && !blockKey) {
            return 'A page assertion must address its block by `_key`, never by position.'
          }
          return true
        }),
    }),
    defineField({
      name: 'renderedText',
      title: 'Rendered text',
      type: 'text',
      rows: 3,
      description: 'The exact published sentence, as a human would read it.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'verifiedAgainstBuild',
      title: 'Verified against build',
      type: 'reference',
      to: [{type: 'buildSnapshot'}],
      description:
        'The build this text was last confirmed correct against. This is what makes "approved" ' +
        'mean something: staleness is derived by comparing this to the current build, not remembered.',
      readOnly: true,
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      options: {list: asOptions(ASSERTION_STATES), layout: 'radio'},
      initialValue: 'verified',
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      text: 'renderedText',
      state: 'state',
      pageTitle: 'page.title',
      surfaceTitle: 'surface.title',
      surfaceKind: 'surface.kind',
      claimPath: 'claim.path',
    },
    prepare: ({text, state, pageTitle, surfaceTitle, surfaceKind, claimPath}) => {
      const where = pageTitle ?? (surfaceTitle ? `${surfaceTitle} (${surfaceKind})` : 'unknown surface')
      return {
        title: text,
        subtitle: `${state} · ${where} ← ${claimPath ?? 'unknown claim'}`,
      }
    },
  },
})
