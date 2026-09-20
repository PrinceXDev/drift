import type {Metadata} from 'next'
import Link from 'next/link'

import './globals.css'

export const metadata: Metadata = {
  title: {default: 'Northwind Audio', template: '%s · Northwind Audio'},
  description: 'Headphones and speakers, and the policies that govern them.',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <div className="site">
          <header className="masthead">
            <Link href="/" className="brand">
              Northwind Audio
            </Link>
            <nav>
              <Link href="/returns">Returns</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/support/contact">Support</Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  )
}
