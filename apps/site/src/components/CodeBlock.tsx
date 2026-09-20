'use client'

import {useCallback, useRef, useState} from 'react'

/**
 * A fenced code block with a language label and a copy button.
 *
 * The copy reads from the rendered DOM rather than from a prop, so what lands
 * on the clipboard is exactly what is on screen — including the syntax
 * highlighting's whitespace decisions.
 */
export function CodeBlock({
  language,
  children,
}: {
  language: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const copy = useCallback(() => {
    const text = ref.current?.innerText ?? ''
    void navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
      })
      .catch(() => {
        // Clipboard access can be refused — an insecure origin, a permissions
        // policy. The text is still selectable; saying nothing is better than
        // an error dialog for something the reader can do by hand.
      })
  }, [])

  return (
    <div className="code">
      <div className="code__bar">
        <span className="code__lang">{language || 'text'}</span>
        <button type="button" className="code__copy" onClick={copy} data-copied={copied}>
          {copied ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
              </svg>
              Copied
            </>
          ) : (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15V6a2 2 0 0 1 2-2h8" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>
      <pre ref={ref}>{children}</pre>
    </div>
  )
}
