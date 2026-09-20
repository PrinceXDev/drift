import {Component, StrictMode} from 'react'
import type {ErrorInfo, ReactNode} from 'react'
import {createRoot} from 'react-dom/client'
import {AuthBoundary, SanityApp} from '@sanity/sdk-react'

import {App} from './App'
import {isSanityConfigured, sanityConfig, useSanityContent} from './state/sanity'
import './styles.css'

/**
 * Two ways to boot the Control Room, chosen by configuration rather than by a flag.
 *
 * With `VITE_SANITY_PROJECT_ID` set, the console mounts as a real App SDK app:
 * it authenticates as *you* through Sanity, subscribes to your content, and
 * re-renders when a document changes. Without it, the same UI renders committed
 * engine output so the product is demonstrable with no account at all.
 *
 * Deciding here rather than inside `App` matters: `SanityApp` owns
 * authentication, and putting a login screen in front of a console with no
 * project to log into would make the credential-free path unusable.
 */
function Root() {
  if (!isSanityConfigured()) {
    return <App />
  }

  return (
    <SanityApp config={sanityConfig} fallback={<Booting label="Connecting to Sanity…" />}>
      <AuthBoundary>
        <LiveConsole />
      </AuthBoundary>
    </SanityApp>
  )
}

/**
 * The console over live content.
 *
 * `useSanityContent` suspends on first load, so this component exists purely to
 * sit *inside* the boundary that provides the fallback. Drift events still come
 * from the Go engine — Sanity is the source of truth for what the organisation
 * says, the engine for what changed.
 */
function LiveConsole() {
  const {content, isPending} = useSanityContent()
  return <App sanityContent={content} sanityPending={isPending} />
}

/**
 * Nothing renders a blank page.
 *
 * React unmounts the whole tree when a render throws, and the result is a white
 * screen with the reason visible only in the developer console. That is an
 * unacceptable failure mode for an operations console in general, and a
 * particularly poor one here: the first thing a new user does is point this at
 * an empty dataset, and the first thing they used to get was nothing at all.
 *
 * Class component because React still offers no hook equivalent of
 * `componentDidCatch`.
 */
class Boundary extends Component<{children: ReactNode}, {error: Error | null}> {
  override state: {error: Error | null} = {error: null}

  static getDerivedStateFromError(error: Error) {
    return {error}
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    // Kept for the developer console; the user gets the message below.
    console.error('Control Room crashed', error, info.componentStack)
  }

  override render() {
    if (!this.state.error) return this.props.children

    return (
      <div style={{padding: 32, maxWidth: 680}}>
        <div className="banner crit">
          <div>
            <strong>The Control Room hit an error and stopped rendering.</strong>
            <div className="muted" style={{marginTop: 6, lineHeight: 1.6}}>
              {this.state.error.message}
            </div>
            <div className="muted" style={{marginTop: 10}}>
              This is a bug. Reload to try again; the full stack is in the browser console.
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function Booting({label}: {label: string}) {
  return (
    <div style={{padding: 32}} className="muted">
      {label}
    </div>
  )
}

const container = document.getElementById('root')
if (!container) throw new Error('#root not found')

createRoot(container).render(
  <StrictMode>
    <Boundary>
      <Root />
    </Boundary>
  </StrictMode>,
)
