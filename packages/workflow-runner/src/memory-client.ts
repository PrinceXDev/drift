/**
 * An in-memory {@link WorkflowClient}, so the deployed workflow definition can
 * be run without a Sanity project.
 *
 * # Why this exists rather than a real client
 *
 * `drift-remediation` spent its life typechecking. Typechecking proves the
 * shape of a definition, not that the machine it describes behaves the way the
 * comments claim — in particular it proves nothing at all about the one
 * sentence the whole design rests on: *the agent cannot reach `published`*.
 *
 * Proving that needs the engine to actually run, which needs a client. A real
 * `@sanity/client` would make the proof depend on a project id, two tokens and
 * a network, none of which a reviewer reading this repository has. So the
 * proof runs against this instead: the same `createEngine`, the same deployed
 * definition, the same `fireAction` code path, over documents held in a Map.
 *
 * # What is real and what is not
 *
 * Real: the engine. Every transition, every role check, every condition is
 * evaluated by `@sanity/workflow-engine@0.33.0` itself. Nothing here reimplements
 * or approximates a workflow.
 *
 * Not real: durability and concurrency. Documents live for the length of the
 * process. Revisions are checked (`ifRevisionId` fails loudly on a mismatch)
 * because the engine's optimistic locking depends on it, but there is no
 * second writer to race.
 *
 * # Identity
 *
 * The engine never accepts an actor as an argument. It resolves one from the
 * client's token:
 *
 *   > The engine resolves the actor from the client's token via
 *   > `client.request({url: '/users/me'})`.
 *
 * That is the seam this file implements. `request()` answers `/users/me` from
 * the token the client is bound to, and role names come back on that response
 * exactly as a project host would report them. To act as somebody else you
 * construct a second client over a second token — never mutate one in place,
 * because the engine caches the resolution per client object.
 *
 * Principal ids carry their own namespace: `g…` is an account-global user and
 * `p-…` is a robot token. Anything else classifies as project-scoped, which
 * the engine refuses to act as. See `principals.ts`.
 */
import {evaluate, parse} from 'groq-js'

/** A stored document. Everything the Content Lake would stamp, stamped here. */
export interface StoredDocument {
  _id: string
  _type: string
  _rev: string
  _createdAt: string
  _updatedAt: string
  [key: string]: unknown
}

/** What `/users/me` answers for one token. */
export interface Principal {
  /** `g…` for a person, `p-…` for a robot token — see the file header. */
  id: string
  /** Display name, for the transcript. Not read by the engine. */
  label: string
  /**
   * Role names, reported the way a project host reports them. `Action.roles`
   * OR-matches against this list by literal string membership, so the names
   * here are the names the definition writes.
   */
  roles: string[]
  /**
   * Whether this principal is an unattended token rather than a person.
   *
   * The engine reads it during deploy: a robot's roles do not count as a
   * *holder* of a role, so a definition routing work to a role only robots
   * carry is reported as having no recipient. Setting it honestly is what
   * makes that check mean something here.
   */
  isRobot?: boolean
}

export interface MemoryStoreOptions {
  projectId: string
  dataset: string
  /** token -> principal. A client is bound to exactly one token. */
  principals: Record<string, Principal>
  /**
   * Every role name the project defines.
   *
   * `deployDefinitions` refuses a definition that gates an action on a role
   * the project does not have — a genuinely useful check, and one that only
   * fires if the catalog is real. It is listed separately from the
   * principals' roles on purpose: a project can define a role nobody holds,
   * and conflating the two would hide exactly the case the engine warns about.
   */
  roleCatalog: string[]
}

/**
 * The shared document store. Every client derived from it — siblings from
 * `withConfig`, the human's client, the agent's client — reads and writes the
 * same documents, which is what makes a two-actor run meaningful.
 */
export class MemoryStore {
  readonly projectId: string
  readonly dataset: string
  readonly principals: Record<string, Principal>
  readonly roleCatalog: string[]
  private readonly docs = new Map<string, StoredDocument>()
  private revCounter = 0

  constructor(options: MemoryStoreOptions) {
    this.projectId = options.projectId
    this.dataset = options.dataset
    this.principals = options.principals
    this.roleCatalog = options.roleCatalog
  }

  /** Every document, as GROQ wants it: a flat array. */
  all(): StoredDocument[] {
    return [...this.docs.values()]
  }

  get(id: string): StoredDocument | undefined {
    return this.docs.get(id)
  }

  nextRev(): string {
    this.revCounter += 1
    return `rev-${this.revCounter}`
  }

  /** A snapshot for transaction rollback. Documents are treated as immutable. */
  snapshot(): Map<string, StoredDocument> {
    return new Map(this.docs)
  }

  restore(snapshot: Map<string, StoredDocument>): void {
    this.docs.clear()
    for (const [id, doc] of snapshot) this.docs.set(id, doc)
  }

  put(doc: StoredDocument): void {
    this.docs.set(doc._id, doc)
  }

  remove(id: string): void {
    this.docs.delete(id)
  }
}

/** Raised for the failures a real client raises, so engine error paths behave. */
export class MemoryClientError extends Error {
  readonly statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.name = 'MemoryClientError'
    this.statusCode = statusCode
  }
}

interface ClientConfig {
  projectId?: string
  dataset?: string
  apiHost?: string
  apiVersion?: string
  requestTagPrefix?: string
  useProjectHostname?: boolean
  resource?: {type: string; id: string}
}

type PatchOp =
  | {kind: 'set'; props: Record<string, unknown>}
  | {kind: 'setIfMissing'; props: Record<string, unknown>}
  | {kind: 'unset'; paths: string[]}

/**
 * A patch handle. Built, passed around, and drained either by its own
 * `commit()` or by a transaction — the engine does both, so `apply()` is
 * separate from `commit()`.
 */
class MemoryPatch {
  readonly documentId: string
  private readonly store: MemoryStore
  private readonly ops: PatchOp[] = []
  private revisionGuard: string | undefined

  constructor(store: MemoryStore, documentId: string) {
    this.store = store
    this.documentId = documentId
  }

  set(props: Record<string, unknown>): this {
    this.ops.push({kind: 'set', props})
    return this
  }

  setIfMissing(props: Record<string, unknown>): this {
    this.ops.push({kind: 'setIfMissing', props})
    return this
  }

  unset(paths: string[]): this {
    this.ops.push({kind: 'unset', paths})
    return this
  }

  ifRevisionId(rev: string): this {
    this.revisionGuard = rev
    return this
  }

  /**
   * Apply in place.
   *
   * The revision guard is enforced rather than ignored. The engine's whole
   * concurrency story is `patch(...).ifRevisionId(rev)` failing when somebody
   * else committed first; a store that waved that through would let a bug in
   * the engine's read-modify-write pass unnoticed here and fail in production.
   */
  apply(): StoredDocument {
    const current = this.store.get(this.documentId)
    if (current === undefined) {
      throw new MemoryClientError(`document ${this.documentId} does not exist`, 404)
    }
    if (this.revisionGuard !== undefined && current._rev !== this.revisionGuard) {
      throw new MemoryClientError(
        `revision mismatch on ${this.documentId}: expected ${this.revisionGuard}, found ${current._rev}`,
        409,
      )
    }

    const next: StoredDocument = structuredClone(current)
    for (const op of this.ops) {
      if (op.kind === 'set') {
        for (const [path, value] of Object.entries(op.props)) setPath(next, path, value)
      } else if (op.kind === 'setIfMissing') {
        for (const [path, value] of Object.entries(op.props)) {
          if (readPath(next, path) === undefined) setPath(next, path, value)
        }
      } else {
        for (const path of op.paths) unsetPath(next, path)
      }
    }

    next._rev = this.store.nextRev()
    next._updatedAt = new Date().toISOString()
    this.store.put(next)
    return next
  }

  async commit(): Promise<StoredDocument> {
    return this.apply()
  }
}

type TxOp =
  | {kind: 'create'; doc: {_id: string; _type: string; [key: string]: unknown}}
  | {kind: 'patch'; patch: MemoryPatch}
  | {kind: 'delete'; id: string}

/**
 * A transaction. All or nothing, by snapshot-and-restore.
 *
 * Worth having rather than stubbing: the engine rolls a guard back by
 * committing a revision-checked patch and a delete in one transaction, and
 * that only means anything if a failure part-way leaves nothing behind.
 */
class MemoryTransaction {
  private readonly store: MemoryStore
  private readonly client: MemoryClient
  private readonly ops: TxOp[] = []

  constructor(store: MemoryStore, client: MemoryClient) {
    this.store = store
    this.client = client
  }

  create(doc: {_id: string; _type: string; [key: string]: unknown}): this {
    this.ops.push({kind: 'create', doc})
    return this
  }

  patch(patch: MemoryPatch): this {
    this.ops.push({kind: 'patch', patch})
    return this
  }

  delete(id: string): this {
    this.ops.push({kind: 'delete', id})
    return this
  }

  async commit(): Promise<{documentIds: string[]}> {
    const before = this.store.snapshot()
    const touched: string[] = []
    try {
      for (const op of this.ops) {
        if (op.kind === 'create') {
          const created = await this.client.create(op.doc)
          touched.push(created._id)
        } else if (op.kind === 'patch') {
          touched.push(op.patch.apply()._id)
        } else {
          this.store.remove(op.id)
          touched.push(op.id)
        }
      }
    } catch (error) {
      this.store.restore(before)
      throw error
    }
    return {documentIds: touched}
  }
}

/**
 * One client, bound to one token.
 *
 * `withConfig` returns a sibling over the same store. It deliberately keeps the
 * same token: the engine uses `withConfig` for api-version normalisation and
 * host routing, never to change who is acting.
 */
export class MemoryClient {
  readonly store: MemoryStore
  private readonly token: string
  private readonly cfg: ClientConfig

  constructor(store: MemoryStore, token: string, cfg: ClientConfig = {}) {
    this.store = store
    this.token = token
    this.cfg = {
      projectId: store.projectId,
      dataset: store.dataset,
      resource: {type: 'dataset', id: `${store.projectId}.${store.dataset}`},
      ...cfg,
    }
    if (store.principals[token] === undefined) {
      throw new MemoryClientError(`no principal registered for token ${token}`, 401)
    }
  }

  /** The principal this client acts as. Exposed for the run transcript. */
  get principal(): Principal {
    // Checked in the constructor; the store is append-only for principals.
    return this.store.principals[this.token] as Principal
  }

  config(): ClientConfig {
    return {...this.cfg}
  }

  withConfig(config: ClientConfig): MemoryClient {
    return new MemoryClient(this.store, this.token, {...this.cfg, ...config})
  }

  async fetch<T = unknown>(query: string, params: Record<string, unknown> = {}): Promise<T> {
    const tree = parse(query, {params})
    const value = await evaluate(tree, {dataset: this.store.all(), params})
    return (await value.get()) as T
  }

  async getDocument<T = StoredDocument>(id: string): Promise<T | null> {
    return (this.store.get(id) as T | undefined) ?? null
  }

  async create<T extends {_id: string; _type: string}>(doc: T): Promise<T & StoredDocument> {
    if (this.store.get(doc._id) !== undefined) {
      throw new MemoryClientError(`document ${doc._id} already exists`, 409)
    }
    const now = new Date().toISOString()
    const stored = {
      ...structuredClone(doc),
      _rev: this.store.nextRev(),
      _createdAt: now,
      _updatedAt: now,
    } as T & StoredDocument
    this.store.put(stored)
    return stored
  }

  patch(documentId: string): MemoryPatch {
    return new MemoryPatch(this.store, documentId)
  }

  transaction(): MemoryTransaction {
    return new MemoryTransaction(this.store, this)
  }

  /**
   * The raw request transport.
   *
   * Only the endpoints the engine actually reaches are served, and anything
   * else throws rather than returning a plausible empty shape. A silent `{}`
   * from an unimplemented endpoint is how a harness ends up proving something
   * other than what it claims.
   */
  async request<T>(opts: {url: string}): Promise<T> {
    const path = opts.url.split('?')[0] ?? opts.url

    if (path === '/users/me') {
      const me = this.principal
      return {
        id: me.id,
        name: me.label,
        roles: me.roles.map((name) => ({name, title: name})),
      } as T
    }

    const projectId = this.cfg.projectId

    if (path === `/projects/${projectId}/roles`) {
      return this.store.roleCatalog.map((name) => ({name, title: name})) as T
    }

    if (path === `/projects/${projectId}`) {
      return {id: projectId, members: this.members()} as T
    }

    if (path.startsWith(`/projects/${projectId}/users/`)) {
      const wanted = new Set(decodeURIComponent(path.split('/users/')[1] ?? '').split(','))
      return this.members().filter((member) => wanted.has(member.id)) as T
    }

    throw new MemoryClientError(`memory client does not serve ${opts.url}`, 404)
  }

  /** The project member directory, derived from the registered principals. */
  private members(): {id: string; isRobot: boolean; roles: {name: string; title: string}[]}[] {
    return Object.values(this.store.principals).map((principal) => ({
      id: principal.id,
      isRobot: principal.isRobot === true,
      roles: principal.roles.map((name) => ({name, title: name})),
    }))
  }
}

// ---------------------------------------------------------------------------
// Patch paths
// ---------------------------------------------------------------------------

type Segment = {kind: 'key'; key: string} | {kind: 'keyed'; key: string; match: string}

/**
 * Parse a Sanity patch path.
 *
 * Two forms occur in the engine's own writes: plain dotted keys
 * (`history`, `stages`, `lastChangedAt`) and keyed array addressing
 * (`pendingEffects[_key=="abc"].claim`). Positional indexing is deliberately
 * unsupported — the engine does not use it, and ADR-0007 is the reason it
 * should not start.
 */
function parsePath(path: string): Segment[] {
  const segments: Segment[] = []
  for (const raw of path.split('.')) {
    const keyed = /^([A-Za-z0-9_]+)\[_key\s*==\s*"([^"]+)"\]$/.exec(raw)
    if (keyed?.[1] !== undefined && keyed[2] !== undefined) {
      segments.push({kind: 'keyed', key: keyed[1], match: keyed[2]})
      continue
    }
    if (/[[\]]/.test(raw)) {
      throw new MemoryClientError(`unsupported patch path segment: ${raw}`, 400)
    }
    segments.push({kind: 'key', key: raw})
  }
  return segments
}

function descend(node: unknown, segment: Segment, create: boolean): unknown {
  if (typeof node !== 'object' || node === null) return undefined
  const container = node as Record<string, unknown>
  if (segment.kind === 'key') {
    if (container[segment.key] === undefined && create) container[segment.key] = {}
    return container[segment.key]
  }
  const list = container[segment.key]
  if (!Array.isArray(list)) return undefined
  return list.find((item) => (item as {_key?: string} | null)?._key === segment.match)
}

function setPath(doc: Record<string, unknown>, path: string, value: unknown): void {
  const segments = parsePath(path)
  const last = segments.at(-1)
  if (last === undefined) return

  let node: unknown = doc
  for (const segment of segments.slice(0, -1)) {
    node = descend(node, segment, true)
    if (node === undefined) {
      throw new MemoryClientError(`patch path ${path} does not resolve`, 400)
    }
  }

  if (last.kind === 'key') {
    ;(node as Record<string, unknown>)[last.key] = value
    return
  }
  const list = (node as Record<string, unknown>)[last.key]
  if (!Array.isArray(list)) throw new MemoryClientError(`patch path ${path} does not resolve`, 400)
  const index = list.findIndex((item) => (item as {_key?: string} | null)?._key === last.match)
  if (index === -1) throw new MemoryClientError(`patch path ${path} matches no item`, 400)
  list[index] = value
}

function readPath(doc: Record<string, unknown>, path: string): unknown {
  let node: unknown = doc
  for (const segment of parsePath(path)) {
    node = descend(node, segment, false)
    if (node === undefined) return undefined
  }
  return node
}

function unsetPath(doc: Record<string, unknown>, path: string): void {
  const segments = parsePath(path)
  const last = segments.at(-1)
  if (last === undefined) return

  let node: unknown = doc
  for (const segment of segments.slice(0, -1)) {
    node = descend(node, segment, false)
    if (node === undefined) return
  }

  if (last.kind === 'key') {
    delete (node as Record<string, unknown>)[last.key]
    return
  }
  const list = (node as Record<string, unknown>)[last.key]
  if (!Array.isArray(list)) return
  const index = list.findIndex((item) => (item as {_key?: string} | null)?._key === last.match)
  if (index !== -1) list.splice(index, 1)
}
