/**
 * Rail icons.
 *
 * Hand-drawn rather than pulled from a library: there are five of them, an icon
 * dependency is ~40kb for that, and these need to read at 18px where most sets
 * blur. Each is `aria-hidden` — the button carries the label, and the rail's
 * tooltip spells it out, because icon-only navigation without names is a puzzle.
 */
export function Icon({name}: {name: 'feed' | 'conflict' | 'lineage' | 'queue' | 'audit'}) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (name) {
    // A pulse: the feed is a heartbeat of belief change.
    case 'feed':
      return (
        <svg {...common}>
          <path d="M3 12h3.5l2-6 3.5 12 2.5-8 1.8 4H21" />
        </svg>
      )

    // Two arrows meeting head-on: sources pointing at each other.
    case 'conflict':
      return (
        <svg {...common}>
          <path d="M4 8h7M8 5l3 3-3 3" />
          <path d="M20 16h-7m4-3-3 3 3 3" />
        </svg>
      )

    // A root and two branches: one fact, and what grew from it.
    case 'lineage':
      return (
        <svg {...common}>
          <circle cx="5" cy="12" r="2" />
          <circle cx="19" cy="6" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="M7 12h4l6-5.4M11 12l6 5.4" />
        </svg>
      )

    // A checklist: work waiting for a person.
    case 'queue':
      return (
        <svg {...common}>
          <path d="M9 6h11M9 12h11M9 18h11" />
          <path d="M4 5.6 5 6.7 7 4.6" />
          <path d="M4 11.6 5 12.7 7 10.6" />
          <circle cx="5" cy="18" r="1.2" />
        </svg>
      )

    // Links in a chain: the hash chain, literally.
    case 'audit':
      return (
        <svg {...common}>
          <rect x="3" y="9.5" width="8" height="5" rx="2.5" />
          <rect x="13" y="9.5" width="8" height="5" rx="2.5" />
          <path d="M11 12h2" />
        </svg>
      )
  }
}
