import {defineField, defineType} from 'sanity'

/**
 * `contentPage` — published, customer-facing content. This is the stuff that drifts.
 *
 * Kept deliberately thin. The interesting structure lives in `assertion`, which
 * points *into* this document at a specific `fieldPath`. A page does not declare
 * its own dependencies; assertions declare them on its behalf, which means a page
 * can be authored normally and still participate in the integrity graph.
 */
export const contentPage = defineType({
  name: 'contentPage',
  title: 'Content page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
      description:
        'Assertions address paragraphs in here by index, e.g. "body[3]". The remediation agent ' +
        'rewrites a single block and nothing else.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'owner',
      title: 'Owner',
      type: 'string',
      description: 'Who reviews corrections to this page.',
      validation: (rule) => rule.required().email(),
    }),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current'},
    prepare: ({title, slug}) => ({title, subtitle: `/${slug ?? ''}`}),
  },
})
