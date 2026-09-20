import {defineField, defineType} from 'sanity'
import {DRIFT_KINDS, WORKFLOW_STATES, asOptions} from '../constants'

/**
 * `driftEvent` — the diff between two builds, for one claim.
 *
 * A stream of these *is* the changelog of organisational truth. Every row in the
 * Drift Feed is one of these documents.
 *
 * `blastRadius` is precomputed by the Go engine at diff time rather than resolved
 * lazily in the UI, so the console can render "7 pages affected" without a
 * traversal on every paint.
 */
export const driftEvent = defineType({
  name: 'driftEvent',
  title: 'Drift event',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({name: 'fromBuild', type: 'reference', to: [{type: 'buildSnapshot'}]}),
    defineField({name: 'toBuild', type: 'reference', to: [{type: 'buildSnapshot'}]}),
    defineField({name: 'claim', type: 'reference', to: [{type: 'claim'}]}),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {list: asOptions(DRIFT_KINDS)},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'before',
      title: 'Before',
      type: 'text',
      rows: 2,
      description: 'The statement as of the earlier build. Empty for `added`.',
    }),
    defineField({
      name: 'after',
      title: 'After',
      type: 'text',
      rows: 2,
      description: 'The statement as of the later build. Empty for `retired`.',
    }),
    defineField({
      name: 'confidence',
      title: 'Confidence',
      type: 'number',
      description:
        '1.0 when both builds carried a typed value and the comparison was arithmetic. Below ' +
        '1.0 when the change was inferred from prose. Anything under the threshold goes to a ' +
        'human rather than being applied silently.',
      validation: (rule) => rule.required().min(0).max(1),
    }),
    defineField({
      name: 'detectedBy',
      title: 'Detected by',
      type: 'string',
      options: {
        list: asOptions(['typed_value', 'citation_graph', 'instruction_lifecycle', 'semantic'] as const),
      },
      description: 'Which detector fired. Deterministic detectors are preferred and tried first.',
    }),
    defineField({
      name: 'blastRadius',
      title: 'Blast radius',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'assertion'}]}],
      description: 'Every published assertion that depends on this claim. Precomputed at diff time.',
    }),
    defineField({
      name: 'workflowState',
      title: 'Workflow state',
      type: 'string',
      options: {list: asOptions(WORKFLOW_STATES)},
      initialValue: 'detected',
    }),
    defineField({
      name: 'workflowInstanceId',
      title: 'Workflow instance ID',
      type: 'string',
      description: 'Returned by `sanity-workflows start`. Links this event to its remediation run.',
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'newest',
      by: [{field: 'toBuild.builtAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {kind: 'kind', path: 'claim.path', before: 'before', after: 'after', state: 'workflowState'},
    prepare: ({kind, path, before, after, state}) => ({
      title: `${kind.toUpperCase()} · ${path ?? 'unknown claim'}`,
      subtitle: kind === 'added' ? after : kind === 'retired' ? before : `${before} → ${after} (${state})`,
    }),
  },
})
