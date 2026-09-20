import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from '@drift/schema'

/**
 * The Studio is where sources are edited — and therefore where drift starts.
 *
 * The desk is organised around that. `source` documents come first because
 * changing one is the only way to change what the organisation asserts: entries
 * belong to a Knowledge Base build and cannot be hand-edited, so the source is
 * the single writable truth in the system.
 *
 * The ledger types (`buildSnapshot`, `driftEvent`) are visible but read-only.
 * They are shown because an auditor should be able to inspect the raw record,
 * and read-only because a hand-edited audit trail is not an audit trail.
 */
export default defineConfig({
  name: 'drift',
  title: 'DRIFT — Northwind Audio',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? 'PROJECT_ID',
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Sources')
              .child(
                S.documentTypeList('source')
                  .title('Sources')
                  .defaultOrdering([{field: 'authority', direction: 'desc'}]),
              ),
            S.listItem()
              .title('Published pages')
              .child(S.documentTypeList('contentPage').title('Published pages')),

            S.divider(),

            S.listItem()
              .title('Claims')
              .child(
                S.documentTypeList('claim')
                  .title('Claims')
                  .defaultOrdering([{field: 'path', direction: 'asc'}]),
              ),
            S.listItem()
              .title('Assertions')
              .child(S.documentTypeList('assertion').title('Assertions')),
            S.listItem()
              .title('Instructions')
              .child(S.documentTypeList('instruction').title('Standing decisions')),

            S.divider(),

            // The ledger. Append-only by design; the schema marks both types
            // readOnly so the Studio cannot edit history.
            S.listItem()
              .title('Build snapshots')
              .child(
                S.documentTypeList('buildSnapshot')
                  .title('Build snapshots')
                  .defaultOrdering([{field: 'buildNumber', direction: 'desc'}]),
              ),
            S.listItem()
              .title('Drift events')
              .child(S.documentTypeList('driftEvent').title('Drift events')),
          ]),
    }),
  ],

  schema: {types: schemaTypes},
})
