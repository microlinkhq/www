const SITE_URL = 'https://microlink.io'

const HEADING = '# Microlink'

const SUMMARY =
  '> Turn any website into data. APIs for link previews, screenshots, PDF generation, and web scraping.'

// Every page title ends with the site name; llms.txt already says which site
// this is.
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
  ['/blog', 'Blog'],
  ['/', 'Pages']
]

export const cleanTitle = title => title.replace(TITLE_SUFFIX, '').trim()

export const titleFromPathname = pathname =>
  pathname
    .split('/')
    .filter(Boolean)
    .pop()
    ?.replace(/[-_]/g, ' ')
    .replace(/^./, character => character.toUpperCase()) ?? 'Home'

export const sectionFor = pathname =>
  SECTIONS.find(
    ([prefix]) =>
      prefix === '/' || pathname === prefix || pathname.startsWith(`${prefix}/`)
  )[1]

export const toMarkdownUrl = pathname =>
  `${SITE_URL}${pathname === '/' ? '/index' : pathname}.md`

const toEntry = ({ pathname, title, description }) => {
  const label = title ? cleanTitle(title) : titleFromPathname(pathname)
  const url = toMarkdownUrl(pathname)
  return `- [${label}](${url})${description ? `: ${description}` : ''}`
}

export const buildLlmsTxt = pages => {
  const grouped = new Map(SECTIONS.map(([, title]) => [title, []]))

  for (const page of [...pages].sort((a, b) =>
    a.pathname.localeCompare(b.pathname)
  )) {
    grouped.get(sectionFor(page.pathname)).push(toEntry(page))
  }

  const body = [...grouped]
    .filter(([, entries]) => entries.length > 0)
    .map(([title, entries]) => `## ${title}\n\n${entries.join('\n')}`)
    .join('\n\n')

  return [HEADING, '', SUMMARY, '', body, ''].join('\n')
}
