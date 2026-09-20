import {defineField, defineType} from 'sanity'

/**
 * `buildSnapshot` — one immutable Sanity Knowledge Base build, captured as a document.
 *
 * This is the type that makes DRIFT possible at all.
 *
 * Sanity Knowledge Base entries "belong to a build and cannot be edited by hand".
 * That single product decision means every build is a timestamped, immutable
 * snapshot of what an organisation currently asserts to be true — and two
 * snapshots can be diffed. A knowledge base stops being a corpus you read and
 * becomes a time series you can ask questions of.
 *
 * `outlineHash` is content-addressed, so re-running any diff produces byte-identical
 * output. Golden-file tests in the Go engine depend on that property.
 */
export const buildSnapshot = defineType({
  name: 'buildSnapshot',
  title: 'Build snapshot',
  type: 'document',
  // Snapshots are an append-only ledger. Nothing in the UI may edit one.
  readOnly: true,
  fields: [
    defineField({name: 'kbId', title: 'Knowledge Base ID', type: 'string'}),
    defineField({name: 'buildNumber', title: 'Build number', type: 'number'}),
    defineField({name: 'builtAt', title: 'Built at', type: 'datetime'}),
    defineField({
      name: 'outlineHash',
      title: 'Outline hash',
      type: 'string',
      description: 'Content address of the outline. Equal hashes mean nothing changed.',
    }),
    defineField({name: 'entryCount', title: 'Entry count', type: 'number'}),
    defineField({
      name: 'conflicts',
      title: 'Conflicts',
      type: 'array',
      description:
        'Raised by the Knowledge Base build itself when the same fact appears with different ' +
        'values across sources. Most systems treat these as build noise. Here they are the product.',
      of: [
        {
          type: 'object',
          name: 'conflict',
          fields: [
            defineField({name: 'path', title: 'Claim path', type: 'string'}),
            defineField({
              name: 'competingValues',
              title: 'Competing values',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'competingValue',
                  fields: [
                    defineField({name: 'statement', type: 'text', rows: 2}),
                    defineField({name: 'value', type: 'number'}),
                    defineField({name: 'unit', type: 'string'}),
                    defineField({name: 'source', type: 'reference', to: [{type: 'source'}]}),
                  ],
                },
              ],
            }),
            defineField({
              name: 'resolvedBy',
              title: 'Resolved by instruction',
              type: 'reference',
              to: [{type: 'instruction'}],
              description:
                'When a human adjudicates this conflict, DRIFT writes a standing Instruction ' +
                'back into the Knowledge Base so the NEXT build is correct by construction.',
            }),
          ],
          preview: {
            select: {path: 'path', resolved: 'resolvedBy'},
            prepare: ({path, resolved}) => ({
              title: path,
              subtitle: resolved ? 'resolved' : 'UNRESOLVED',
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'instructionsActive',
      title: 'Active instructions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'instruction'}]}],
    }),
    defineField({
      name: 'instructionsArchived',
      title: 'Archived instructions',
      type: 'array',
      description:
        'Sanity auto-archives an instruction when its anchoring source changes. That is a ' +
        'signal a governing decision has become unmoored from its justification — worth an alert.',
      of: [{type: 'reference', to: [{type: 'instruction'}]}],
    }),
  ],
  preview: {
    select: {n: 'buildNumber', builtAt: 'builtAt', count: 'entryCount'},
    prepare: ({n, builtAt, count}) => ({
      title: `Build ${n}`,
      subtitle: `${count ?? 0} entries · ${builtAt ?? 'unknown time'}`,
    }),
  },
})
