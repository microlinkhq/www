import { toMarkdownPath } from './page-markdown.js'

const SITE_URL = 'https://microlink.io'

const HEADING = '# Microlink'

const SUMMARY =
  '> Turn any website into data. APIs for link previews, screenshots, PDF generation, and web scraping.'

const TITLE_SUFFIX = /\s+—\s+Microlink(\s+\w+)?$/

const RESOURCES = [
  [
    'OpenAPI specification',
    `${SITE_URL}/openapi.json`,
    'The whole Microlink API as an OpenAPI 3.1 document: every query parameter typed, the response schema, the error code enum and the rate limit headers.'
  ],
  [
    'MCP server',
    `${SITE_URL}/docs/api/getting-started/mcp.md`,
    'Microlink API as MCP tools for Claude, Codex, Cursor and VS Code, published on npm as @microlink/mcp.'
  ],
  [
    'API reference',
    `${SITE_URL}/docs/api/getting-started/overview.md`,
    'The human-readable API documentation: endpoints, authentication, parameters and response format.'
  ],
  [
    'Error codes',
    `${SITE_URL}/docs/api/basics/error-codes.md`,
    'Every error code the API can return, with the cause and the fix for each one.'
  ],
  [
    'Versioning policy',
    `${SITE_URL}/docs/api/basics/versioning.md`,
    'How the API evolves: unversioned and additive-only, with six months of deprecation notice.'
  ],
  [
    'API catalog',
    `${SITE_URL}/.well-known/api-catalog`,
    'RFC 9727 catalog linking the API to its description, documentation and status page.'
  ],
  [
    'Sitemap',
    `${SITE_URL}/sitemap-index.xml`,
    'The canonical index of every URL published on this site.'
  ]
]

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

const RESOURCES_SECTION = [
  '## Developer resources',
  '',
  RESOURCES.map(
    ([label, url, description]) => `- [${label}](${url}): ${description}`
  ).join('\n')
].join('\n')

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

  return `${HEADING}\n\n${SUMMARY}\n\n${RESOURCES_SECTION}\n\n${body}\n`
}
