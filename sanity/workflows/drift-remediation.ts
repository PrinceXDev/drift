import {
  defineAction,
  defineActivity,
  defineField,
  defineStage,
  defineTransition,
  defineWorkflow,
} from '@sanity/workflow-engine/define'

/**
 * drift-remediation — what happens after the engine notices the organisation
 * changed its mind.
 *
 * The shape follows the principle the Workflows cookbook states outright:
 * "conditions route work to a human only when a check fails". The deterministic
 * work (diffing two builds, walking the reference graph to find every affected
 * page) has already happened in the Go engine before an instance is ever
 * started. This workflow exists for the part that genuinely needs judgement:
 * deciding whether a change is real, and approving the words that replace it.
 *
 * Stage map:
 *
 *   detected  → triage    a drift event with a non-empty blast radius
 *   triage    → drafting  a human confirmed the change is real
 *   triage    → dismissed a human rejected it (false positive, or intended)
 *   drafting  → review    the Transform agent rewrote the affected spans
 *   review    → published an owner approved; assertions are re-stamped
 *   review    → drafting  an owner sent the draft back
 *
 * The agent is never able to reach `published`. The only action that routes there
 * is gated by `roles: ['administrator', 'editor']`, which desugars to an actor-role
 * membership condition the engine evaluates. An unattended agent carries no such
 * role, so the edge is closed to it by the deployed definition rather than by a
 * prompt asking it nicely.
 *
 * # Why each decision is written down before it is routed on
 *
 * A transition with no `when` defaults to `$allActivitiesDone`. Two such
 * transitions leaving one stage are therefore both satisfied the moment the
 * stage's activity resolves, and the engine takes the first — so `reject` would
 * have routed to `drafting` and `send-back` would have *published*.
 *
 * That is not a hypothetical. It is what the definition did, discovered the
 * first time anything actually ran it (`packages/workflow-runner`), and it is
 * the argument for instantiating a workflow rather than typechecking one: the
 * types were correct throughout.
 *
 * The fix is to make the decision a value rather than an implication. Each
 * adjudicating action records what was decided in a workflow field, and each
 * transition reads it. A stage can then only leave by the edge somebody chose,
 * and the instance carries the reason it went that way.
 *
 * (Worth noting for the build log: the stage-level `requireAssignment` /
 * `requireValidation` properties that several write-ups mention do not exist in
 * @sanity/workflow-engine 0.33.0. Gating is expressed on actions via `roles`.)
 */
export const driftRemediation = defineWorkflow({
  name: 'drift-remediation',
  title: 'Drift remediation',
  description:
    'Takes one drift event from detection, through human triage and agent drafting, ' +
    'to an approved correction published across every affected page.',
  initialStage: 'detected',
  fields: [
    defineField({
      type: 'subject',
      name: 'subject',
      title: 'Drift event',
      required: true,
      description: 'The driftEvent document this instance moves through the stages.',
      initialValue: {type: 'input'},
    }),
    defineField({
      type: 'string',
      name: 'triageDecision',
      title: 'Triage decision',
      description:
        'What the human concluded in triage: `confirmed` or `dismissed`. Written by the ' +
        'action, read by the transitions, and left on the instance afterwards so the ' +
        'record says why it went the way it did.',
    }),
    defineField({
      type: 'string',
      name: 'reviewDecision',
      title: 'Review decision',
      description:
        'What the owner concluded in review: `approved` or `sent-back`. The DRIFT gate is ' +
        'what decides which of those the owner is allowed to record — see ' +
        'packages/workflow-runner/src/engine-gate.ts.',
    }),
  ],
  stages: [
    defineStage({
      name: 'detected',
      title: 'Detected',
      description:
        'The engine diffed two Knowledge Base builds and found a claim that changed. ' +
        'Blast radius is already computed.',
      activities: [
        defineActivity({
          name: 'acknowledge',
          title: 'Acknowledge the drift',
          actions: [defineAction({name: 'open', title: 'Open for triage', status: 'done'})],
        }),
      ],
      transitions: [
        defineTransition({name: 'to-triage', title: 'Send to triage', to: 'triage'}),
      ],
    }),

    defineStage({
      name: 'triage',
      title: 'Triage',
      description:
        'A human decides whether the organisation really changed its mind. Core claims and ' +
        'low-confidence detections always land here; certain peripheral changes skip it.',
      activities: [
        defineActivity({
          name: 'adjudicate',
          title: 'Confirm or reject the change',
          actions: [
            defineAction({
              name: 'confirm',
              title: 'Confirm — this is real',
              status: 'done',
              roles: ['administrator', 'editor'],
              ops: [
                {
                  type: 'field.set',
                  target: {scope: 'workflow', field: 'triageDecision'},
                  value: {type: 'literal', value: 'confirmed'},
                },
              ],
            }),
            defineAction({
              name: 'reject',
              title: 'Reject — false positive',
              status: 'done',
              roles: ['administrator', 'editor'],
              ops: [
                {
                  type: 'field.set',
                  target: {scope: 'workflow', field: 'triageDecision'},
                  value: {type: 'literal', value: 'dismissed'},
                },
              ],
            }),
          ],
        }),
      ],
      transitions: [
        defineTransition({
          name: 'to-drafting',
          title: 'Draft corrections',
          to: 'drafting',
          when: '$allActivitiesDone && $fields.triageDecision == "confirmed"',
        }),
        defineTransition({
          name: 'to-dismissed',
          title: 'Dismiss',
          to: 'dismissed',
          when: '$allActivitiesDone && $fields.triageDecision == "dismissed"',
        }),
      ],
    }),

    defineStage({
      name: 'drafting',
      title: 'Drafting',
      description:
        'The Transform agent rewrites the minimum span on each affected page. It may only ' +
        'touch the fieldPath each assertion declares — never anything outside it.',
      activities: [
        defineActivity({
          name: 'draft',
          title: 'Draft corrections for every affected assertion',
          actions: [defineAction({name: 'drafted', title: 'Drafts ready', status: 'done'})],
        }),
      ],
      transitions: [
        defineTransition({name: 'to-review', title: 'Send for approval', to: 'review'}),
      ],
    }),

    defineStage({
      name: 'review',
      title: 'Review',
      description:
        'The page owner approves the wording. Nothing reaches the public site without ' +
        'passing through here.',
      activities: [
        defineActivity({
          name: 'approve',
          title: 'Approve the corrections',
          actions: [
            // Only a human in one of these roles can fire the action that leads to
            // `published`. The drafting agent holds no role, so the edge is closed to it.
            defineAction({
              name: 'approve',
              title: 'Approve and publish',
              status: 'done',
              roles: ['administrator', 'editor'],
              ops: [
                {
                  type: 'field.set',
                  target: {scope: 'workflow', field: 'reviewDecision'},
                  value: {type: 'literal', value: 'approved'},
                },
              ],
            }),
            defineAction({
              name: 'send-back',
              title: 'Send back for redraft',
              status: 'done',
              roles: ['administrator', 'editor'],
              ops: [
                {
                  type: 'field.set',
                  target: {scope: 'workflow', field: 'reviewDecision'},
                  value: {type: 'literal', value: 'sent-back'},
                },
              ],
            }),
          ],
        }),
      ],
      transitions: [
        defineTransition({
          name: 'to-published',
          title: 'Publish',
          to: 'published',
          when: '$allActivitiesDone && $fields.reviewDecision == "approved"',
        }),
        defineTransition({
          name: 'back-to-drafting',
          title: 'Redraft',
          to: 'drafting',
          when: '$allActivitiesDone && $fields.reviewDecision == "sent-back"',
        }),
      ],
    }),

    defineStage({
      name: 'published',
      title: 'Published',
      description:
        'Corrections are live and every affected assertion has been re-stamped with the ' +
        'build it was verified against. The loop is closed.',
    }),

    defineStage({
      name: 'dismissed',
      title: 'Dismissed',
      description:
        'The change was intended, or the detection was wrong. Kept in the ledger either way — ' +
        'a dismissed event is still a record of what the organisation looked at and decided.',
    }),
  ],
})
