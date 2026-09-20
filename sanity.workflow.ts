import {defineWorkflowConfig} from '@sanity/workflow-engine/define'
import {driftRemediation} from './sanity/workflows/drift-remediation'

/**
 * Workflow deployment config.
 *
 * Replace PROJECT_ID before the first `npx sanity-workflows deploy`. The
 * dataset is named here rather than read from env because a workflow definition
 * is deployed infrastructure: it should be obvious from the file which dataset
 * a given deployment targets.
 */
export default defineWorkflowConfig({
  deployments: [
    {
      name: 'dev',
      tag: 'dev',
      expectedMinReaderModel: 10,
      workflowResource: {type: 'dataset', id: 'PROJECT_ID.development'},
      definitions: [driftRemediation],
    },
    {
      name: 'production',
      tag: 'production',
      expectedMinReaderModel: 10,
      workflowResource: {type: 'dataset', id: 'PROJECT_ID.production'},
      definitions: [driftRemediation],
    },
  ],
})
