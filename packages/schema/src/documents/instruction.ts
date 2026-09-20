import {defineField, defineType} from 'sanity'
import {INSTRUCTION_STATUSES, asOptions} from '../constants'

/**
 * `instruction` — a standing decision, mirrored from the Knowledge Base.
 *
 * This is the "actually clever" beat of the product. Resolving a conflict in the
 * DRIFT console does not patch a page. It writes a plain-language standing
 * decision back into the Knowledge Base, anchored to the sources that disagreed.
 * The *next* build is then correct by construction.
 *
 * Sanity auto-archives an instruction when its anchoring source changes — which
 * gives us decision expiry for free: a rule that outlived its justification
 * surfaces as an `instruction_archived` drift event.
 */
export const instruction = defineType({
  name: 'instruction',
  title: 'Instruction',
  type: 'document',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
      description:
        'Plain language, as the Knowledge Base expects. "When the returns policy PDF and the ' +
        'help centre disagree on the return window, the PDF is authoritative."',
      validation: (rule) => rule.required().max(1000),
    }),
    defineField({
      name: 'anchoredTo',
      title: 'Anchored to',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'source'}]}],
      description: 'The sources this decision governs. Changing one of these archives the instruction.',
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: 'createdFrom',
      title: 'Created from drift event',
      type: 'reference',
      to: [{type: 'driftEvent'}],
      description: 'Provenance: which adjudication produced this standing decision.',
    }),
    defineField({
      name: 'decidedBy',
      title: 'Decided by',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {list: asOptions(INSTRUCTION_STATUSES), layout: 'radio', direction: 'horizontal'},
      initialValue: 'active',
    }),
    defineField({
      name: 'archivedReason',
      title: 'Archived reason',
      type: 'string',
      readOnly: true,
    }),
  ],
  preview: {
    select: {text: 'text', status: 'status'},
    prepare: ({text, status}) => ({title: text, subtitle: status}),
  },
})
