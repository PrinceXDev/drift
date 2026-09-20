import {Children, isValidElement} from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import {CodeBlock} from './CodeBlock'

/**
 * Markdown → React, with four deliberate deviations from the default rendering.
 *
 *  - fenced code becomes a `CodeBlock` with a language label and copy button
 *  - tables are wrapped so they scroll horizontally instead of bursting the column
 *  - `> [!NOTE]` blockquotes become callouts, matching GitHub's alert syntax so
 *    the source files stay readable in an editor and on a repository host
 *  - headings get a hover anchor, linking to the id `rehype-slug` generated
 */

type CalloutKind = 'note' | 'tip' | 'warning' | 'danger'

const CALLOUT_LABEL: Record<CalloutKind, string> = {
  note: 'Note',
  tip: 'Tip',
  warning: 'Careful',
  danger: 'Do not',
}

function CalloutIcon({kind}: {kind: CalloutKind}) {
  if (kind === 'tip') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
      </svg>
    )
  }
  if (kind === 'warning' || kind === 'danger') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinejoin="round" d="M12 4.5 2.5 20h19L12 4.5Z" />
        <path strokeLinecap="round" d="M12 10v4.5" />
        <circle cx="12" cy="17.3" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M12 11v5.5" />
      <circle cx="12" cy="7.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

/** Recovers the plain text of a rendered markdown subtree. */
function textOf(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textOf).join('')
  if (isValidElement<{children?: React.ReactNode}>(node)) return textOf(node.props.children)
  return ''
}

function HeadingAnchor({id}: {id?: string | undefined}) {
  if (!id) return null
  return (
    <a className="heading-anchor" href={`#${id}`} aria-label="Link to this section">
      #
    </a>
  )
}

export function Markdown({children}: {children: string}) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, [rehypeHighlight, {detect: true, ignoreMissing: true}]]}
        components={{
          h2: ({children: kids, ...props}) => (
            <h2 {...props}>
              {kids}
              <HeadingAnchor id={props.id} />
            </h2>
          ),
          h3: ({children: kids, ...props}) => (
            <h3 {...props}>
              {kids}
              <HeadingAnchor id={props.id} />
            </h3>
          ),

          // `pre` rather than `code`: react-markdown v10 dropped the `inline`
          // flag, and the wrapper element is the reliable signal for "this is a
          // fenced block, not an inline span".
          pre: ({children: kids}) => {
            const first = Children.toArray(kids)[0]
            let language = ''
            let inner: React.ReactNode = kids

            if (isValidElement<{className?: string; children?: React.ReactNode}>(first)) {
              const match = /language-([\w-]+)/.exec(first.props.className ?? '')
              language = match?.[1] ?? ''
              inner = first
            }

            return <CodeBlock language={language}>{inner}</CodeBlock>
          },

          table: ({children: kids}) => (
            <div className="table-wrap">
              <table>{kids}</table>
            </div>
          ),

          blockquote: ({children: kids}) => {
            const raw = textOf(kids).trimStart()
            const match = /^\[!(NOTE|TIP|WARNING|DANGER|IMPORTANT|CAUTION)\]\s*/i.exec(raw)
            if (!match) return <blockquote>{kids}</blockquote>

            const token = (match[1] ?? 'NOTE').toUpperCase()
            const kind: CalloutKind =
              token === 'TIP'
                ? 'tip'
                : token === 'WARNING' || token === 'CAUTION'
                  ? 'warning'
                  : token === 'DANGER' || token === 'IMPORTANT'
                    ? 'danger'
                    : 'note'

            // Strip the marker from the first text node, leaving the rest of
            // the blockquote's formatting intact.
            const stripped = Children.map(kids, (child, index) => {
              if (index !== 0) return child
              if (!isValidElement<{children?: React.ReactNode}>(child)) return child
              const inner = Children.toArray(child.props.children)
              const head = inner[0]
              if (typeof head === 'string') {
                inner[0] = head.replace(/^\s*\[![A-Z]+\]\s*/i, '')
              }
              return <p>{inner}</p>
            })

            return (
              <div className="callout" data-kind={kind}>
                <CalloutIcon kind={kind} />
                <div className="callout__body">
                  <span className="callout__title">{CALLOUT_LABEL[kind]}</span>
                  {stripped}
                </div>
              </div>
            )
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
