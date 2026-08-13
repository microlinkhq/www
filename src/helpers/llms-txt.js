import { toMarkdownPath } from './page-markdown.js'

const SITE_URL = 'https://microlink.io'

const HEADING = '# Microlink'

const SUMMARY =
  '> Turn any website into data. APIs for link previews, screenshots, PDF generation, and web scraping.'

const TITLE_SUFFIX = /\s+—\s+Microlink(\s+\w+)?$/

const SECTIONS = [
  ['/docs/api', 'API'],
  ['/docs/cards', 'Cards'],
  ['/docs/mql', 'MQL'],
  ['/docs/guides', 'Guides'],
  ['/docs/sdk', 'SDK'],
  ['/features', 'Features'],
  ['/use-cases', 'Use cases'],
  ['/alternative', 'Alternatives'],
  ['/integrations', 'Integrations'],
  ['/extensions', 'Extensions'],
  ['/skills', 'Skills'],
  ['/screenshot', 'Screenshot'],
  ['/tools', 'Tools'],
  ['/blog', 'Blog']
]

export const cleanTitle = title => title.replace(TITLE_SUFFIX, '').trim()

export const titleFromPathname = pathname => {
  const slug = pathname.split('/').filter(Boolean).pop()
  if (!slug) return 'Home'
  return slug
    .replace(/[-_]/g, ' ')
    .replace(/^./, character => character.toUpperCase())
}

export const sectionFor = pathname => {
  for (const [prefix, title] of SECTIONS) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) return title
  }
  return 'Pages'
}

export const toMarkdownUrl = pathname =>
  `${SITE_URL}/${toMarkdownPath(pathname)}`

const toEntry = ({ pathname, title, description }) => {
  const label = title ? cleanTitle(title) : titleFromPathname(pathname)
  const url = toMarkdownUrl(pathname)
  return `- [${label}](${url})${description ? `: ${description}` : ''}`
}

export const buildLlmsTxt = pages => {
  const grouped = new Map(SECTIONS.map(([, title]) => [title, []]))
  grouped.set('Pages', [])

  for (const page of pages.toSorted((a, b) =>
    a.pathname.localeCompare(b.pathname)
  )) {
    grouped.get(sectionFor(page.pathname)).push(toEntry(page))
  }

  const body = [...grouped]
    .flatMap(([title, entries]) =>
      entries.length > 0 ? `## ${title}\n\n${entries.join('\n')}` : []
    )
    .join('\n\n')

  return `${HEADING}\n\n${SUMMARY}\n\n${body}\n`
}
