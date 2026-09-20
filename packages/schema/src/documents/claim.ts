import {defineField, defineType} from 'sanity'
import {CLAIM_STATUSES, CLAIM_TIERS, asOptions} from '../constants'

/**
 * `claim` — one atomic, checkable fact, mirrored from a Knowledge Base entry.
 *
 * This is the pivot of the whole model. A claim is deliberately *not* a
 * paragraph: it carries an optional typed `value` + `unit` so that contradiction
 * between two builds is a numeric comparison rather than an LLM judgement.
 * `30 days` vs `45 days` is decidable. "our policy has been updated" is not.
 *
 * Claims are never authored by hand. They are proposed by the claim-extraction
 * agent from Knowledge Base entries and confirmed into the ledger by the engine.
 */
export const claim = defineType({
  name: 'claim',
  title: 'Claim',
  type: 'document',
  fields: [
    defineField({
      name: 'path',
      title: 'Path',
      type: 'string',
      description:
        'Mirrors the Knowledge Base outline path, e.g. "support/returns". This is how the ' +
        'engine maps a claim back to the entry it came from.',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*$/, {
            name: 'lowercase slash-separated path',
          }),
    }),
    defineField({
      name: 'statement',
      title: 'Statement',
      type: 'text',
      rows: 2,
      description: 'The fact in one sentence. "Returns are accepted within 30 days of delivery."',
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'number',
      description:
        'The typed quantity this claim asserts, when it has one. Present means contradiction ' +
        'can be detected deterministically; absent means it falls back to semantic comparison.',
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      description: 'e.g. "days", "USD", "kg". Required whenever `value` is set.',
      validation: (rule) =>
        rule.custom((unit, context) => {
          const value = (context.document as {value?: number} | undefined)?.value
          if (typeof value === 'number' && !unit) return 'Unit is required when a value is set.'
          return true
        }),
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'string',
      description:
        'Mirrors the Knowledge Base outline tagging. Drives routing: core drift pages a human, ' +
        'peripheral drift batches to a weekly digest.',
      options: {list: asOptions(CLAIM_TIERS), layout: 'radio', direction: 'horizontal'},
      initialValue: 'standard',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'citations',
      title: 'Citations',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'source'}]}],
      description: 'Inherited from the Knowledge Base entry. A claim with no citation is a bug.',
      validation: (rule) => rule.required().min(1),
    }),
    // ---- lineage ----------------------------------------------------------
    //
    // Three build references, each answering a different question somebody asks
    // about a fact they are about to rely on: where did it come from, when was
    // it last re-confirmed, and when did it last move.
    //
    // All three are maintained by the engine's ledger on every capture and are
    // read-only here. A provenance field an editor can type into is a
    // provenance field that will eventually be wrong, and a wrong lineage is
    // worse than none — it invites somebody to publish on the strength of a
    // verification that never happened.
    defineField({
      name: 'firstSeenBuild',
      title: 'First seen in build',
      type: 'reference',
      to: [{type: 'buildSnapshot'}],
      description: 'The build this claim first appeared in.',
      readOnly: true,
    }),
    defineField({
      name: 'lastVerifiedBuild',
      title: 'Last verified in build',
      type: 'reference',
      to: [{type: 'buildSnapshot'}],
      description:
        'The most recent build in which this claim was re-asserted unchanged. It does not ' +
        'advance on a build that altered the claim: "we checked and it still said this" and ' +
        '"it says something else now" are different facts and must not share a field.',
      readOnly: true,
    }),
    defineField({
      name: 'lastChangedBuild',
      title: 'Last changed in build',
      type: 'reference',
      to: [{type: 'buildSnapshot'}],
      description:
        "The most recent build in which the claim's substance moved. Empty for a claim that " +
        'has never changed since it appeared. Read beside `lastVerifiedBuild` this is the ' +
        'sentence a reader wants: last confirmed at 46, moved at 47.',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {list: asOptions(CLAIM_STATUSES), layout: 'radio', direction: 'horizontal'},
      initialValue: 'active',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'supersededBy',
      title: 'Superseded by',
      type: 'reference',
      to: [{type: 'claim'}],
      description:
        'Makes belief history traversable. Walk this chain backwards to answer "what would we ' +
        'have told a customer in March?" — impossible if prose is overwritten in place.',
      readOnly: true,
    }),
  ],
  preview: {
    select: {path: 'path', statement: 'statement', tier: 'tier', status: 'status'},
    prepare: ({path, statement, tier, status}) => ({
      title: path,
      subtitle: `${tier} · ${status} · ${statement}`,
    }),
  },
})
