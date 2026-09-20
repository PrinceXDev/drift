import {defineCliConfig} from 'sanity/cli'

/**
 * Project id comes from the environment so the repo carries no account details.
 *
 * The `PROJECT_ID` fallback is a deliberate tripwire rather than a default: any
 * CLI command run without `SANITY_STUDIO_PROJECT_ID` set fails immediately with
 * an obviously-fake id, instead of silently targeting whatever project happens
 * to be configured elsewhere.
 */
export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'PROJECT_ID',
    dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',
  },
  // `sanity schema deploy` is a hard prerequisite for Context MCP in GROQ mode
  // (Studio v5.1.0+). Knowledge Base mode does not need it, but deploying the
  // schema anyway keeps the option open without a migration.
  autoUpdates: true,
})
