/**
 * Capture the screenshots and the walkthrough recording the docs site uses.
 *
 * Everything this produces is a recording of software actually running — the
 * engine in fixture mode, the real console, the real public site. A marketing
 * page for a knowledge-integrity tool should not be illustrated with mockups.
 *
 *   node tools/capture/capture.mjs              capture whatever is reachable
 *   node tools/capture/capture.mjs --video      also record the walkthrough
 *   node tools/capture/capture.mjs --only=console
 *
 * Each target is independent: if the Studio is not running, the console and the
 * site are still captured and the script says which ones it skipped. A capture
 * run that fails entirely because one optional server is down would just teach
 * everybody to stop running it.
 */
import {mkdir, rm} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(HERE, '..', '..')
const SHOTS = path.join(ROOT, 'apps', 'site', 'public', 'shots')
const MEDIA = path.join(ROOT, 'apps', 'site', 'public', 'media')

const VIEWPORT = {width: 1440, height: 900}

const args = process.argv.slice(2)
const wantVideo = args.includes('--video')
const only = args.find((a) => a.startsWith('--only='))?.slice('--only='.length)

/** Targets. `wait` is a selector or text the page must show before we shoot. */
const TARGETS = [
  {
    name: 'console-feed',
    url: 'http://localhost:3336',
    label: 'Control Room — drift feed',
    steps: [],
  },
  {
    name: 'console-conflicts',
    url: 'http://localhost:3336',
    label: 'Control Room — conflict room',
    steps: [{press: '2'}],
  },
  {
    name: 'console-lineage',
    url: 'http://localhost:3336',
    label: 'Control Room — claim lineage',
    steps: [{press: '3'}],
  },
  {
    name: 'console-queue',
    url: 'http://localhost:3336',
    label: 'Control Room — remediation queue',
    steps: [{press: '4'}],
  },
  {
    name: 'console-audit',
    url: 'http://localhost:3336',
    label: 'Control Room — audit trail',
    steps: [{press: '5'}],
  },
  {name: 'dissent', url: 'http://localhost:3335', label: 'Dissent agent', steps: []},
  {name: 'web-returns', url: 'http://localhost:3000/returns', label: 'Public site — Returns', steps: []},
  {name: 'studio', url: 'http://localhost:3334', label: 'Sanity Studio', steps: []},
]

async function main() {
  let chromium
  try {
    ;({chromium} = await import('playwright'))
  } catch {
    console.error(
      'playwright is not installed. Run:\n' +
        '  pnpm add -D -w playwright && npx playwright install chromium',
    )
    process.exit(1)
  }

  await mkdir(SHOTS, {recursive: true})
  await mkdir(MEDIA, {recursive: true})

  const browser = await chromium.launch()
  const captured = []
  const skipped = []

  for (const target of TARGETS) {
    if (only && !target.name.startsWith(only)) continue

    const context = await browser.newContext({
      viewport: VIEWPORT,
      deviceScaleFactor: 2,
      colorScheme: 'dark',
    })
    const page = await context.newPage()

    try {
      await page.goto(target.url, {waitUntil: 'networkidle', timeout: 8000})
      // Give client-rendered panels a beat to settle. `networkidle` says the
      // requests stopped, not that React finished.
      await page.waitForTimeout(900)

      for (const step of target.steps) {
        if (step.press) await page.keyboard.press(step.press)
        if (step.click) await page.click(step.click)
        await page.waitForTimeout(700)
      }

      await page.screenshot({path: path.join(SHOTS, `${target.name}.png`)})
      captured.push(target.name)
    } catch (error) {
      skipped.push({name: target.name, url: target.url, reason: String(error).split('\n')[0]})
    } finally {
      await context.close()
    }
  }

  if (wantVideo) {
    await recordWalkthrough(browser)
  }

  await browser.close()

  console.log(`\ncaptured  ${captured.length}`)
  for (const name of captured) console.log(`  ✓ ${name}`)
  if (skipped.length) {
    console.log(`\nskipped   ${skipped.length}  (server not reachable)`)
    for (const s of skipped) console.log(`  · ${s.name.padEnd(20)} ${s.url}`)
  }
}

/**
 * Records the walkthrough the landing page plays.
 *
 * Playwright writes WebM per context, so the recording is one context driven
 * through the five panels with pauses long enough to read. No narration track:
 * the page has captions, and a silent loop is what somebody scrolling past will
 * actually watch.
 */
async function recordWalkthrough(browser) {
  const context = await browser.newContext({
    viewport: VIEWPORT,
    colorScheme: 'dark',
    recordVideo: {dir: MEDIA, size: VIEWPORT},
  })
  const page = await context.newPage()

  try {
    await page.goto('http://localhost:3336', {waitUntil: 'networkidle', timeout: 8000})
    await page.waitForTimeout(2200)

    // 1 feed · 2 conflicts · 3 lineage · 4 queue · 5 audit — the order an
    // operator actually moves through, which is why the rail is ordered that way.
    for (const key of ['2', '3', '4', '5', '1']) {
      await page.keyboard.press(key)
      await page.waitForTimeout(2600)
    }

    await context.close()

    // Playwright names the file after the page's internal id; rename it to the
    // stable path the landing page references.
    const video = await page.video()
    if (video) {
      const produced = await video.path()
      await rm(path.join(MEDIA, 'control-room.webm'), {force: true})
      const {rename} = await import('node:fs/promises')
      await rename(produced, path.join(MEDIA, 'control-room.webm'))
      console.log('  ✓ media/control-room.webm')
    }
  } catch (error) {
    await context.close().catch(() => {})
    console.log(`  · walkthrough skipped — ${String(error).split('\n')[0]}`)
  }
}

await main()
