/**
 * Engine output, committed.
 *
 * `fixtures.json` is emitted by `go run ./cmd/seed -format=fixtures`, which runs
 * the real diff and blast-radius pipeline over the seed builds. It is not
 * hand-written mock data: both the console and the public site render exactly
 * what the engine produces, so a change in engine behaviour surfaces in the UI
 * the moment fixtures are regenerated.
 *
 *     pnpm --filter @drift/fixtures generate
 */
import type {DriftData} from './types'
import data from './fixtures.json'

export const fixtures = data as unknown as DriftData
export default fixtures

export * from './types'
