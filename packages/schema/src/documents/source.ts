import {defineField, defineType} from 'sanity'
import {SOURCE_KINDS, asOptions} from '../constants'

/**
 * `source` — an authoritative input that a Knowledge Base is built from.
 *
 * Sources are the only writable truth in the system. Knowledge Base entries are
 * immutable and belong to a build, so the only way to change what the
 * organisation asserts is to change a source (or add an `instruction`).
 *
 * `authority` is what lets the engine resolve a conflict deterministically when
 * two sources disagree: the higher-authority source wins by default, and the
 * human is only asked when authorities tie.
 */
export const source = defineType({
  name: 'source',
  title: 'Source',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {list: asOptions(SOURCE_KINDS), layout: 'radio', direction: 'horizontal'},
      initialValue: 'policy',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'uri',
      title: 'Canonical URI',
      type: 'url',
      description: 'Where this source lives. Cited by every claim derived from it.',
      validation: (rule) => rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'owner',
      title: 'Owner',
      type: 'string',
      description: 'Who is accountable for keeping this source correct.',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'authority',
      title: 'Authority',
      type: 'number',
      description:
        'How much this source outranks others when they disagree. 5 = signed contract or ' +
        'published policy; 1 = a wiki page someone wrote once. Used to auto-resolve conflicts.',
      options: {list: [1, 2, 3, 4, 5], layout: 'radio', direction: 'horizontal'},
      initialValue: 3,
      validation: (rule) => rule.required().min(1).max(5),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 12,
      description:
        'The source text the Knowledge Base indexes. Editing this is what triggers drift.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'lastChangedAt',
      title: 'Last changed at',
      type: 'datetime',
      description: 'Set by the on-source-change Document Function, not by hand.',
      readOnly: true,
    }),
    defineField({
      name: 'kbSourceRef',
      title: 'Knowledge Base source ref',
      type: 'string',
      description:
        'The identifier this document carries inside the Sanity Knowledge Base, used to map ' +
        'entry citations back to this document.',
    }),
  ],
  preview: {
    select: {title: 'title', kind: 'kind', authority: 'authority'},
    prepare: ({title, kind, authority}) => ({
      title,
      subtitle: `${kind} · authority ${authority}`,
    }),
  },
})
