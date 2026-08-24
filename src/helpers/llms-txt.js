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
    'MCP server card',
    `${SITE_URL}/.well-known/mcp`,
    'The @microlink/mcp server described before connecting: every tool with its name and description, the npm package and how it is launched.'
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
    'Agent skills',
    `${SITE_URL}/.well-known/agent-skills/index.json`,
    'Every Microlink skill an agent can install and follow, each with its description and the digest of the SKILL.md served here.'
  ],
  [
    'Agentic resource catalog',
    `${SITE_URL}/.well-known/ai-catalog.json`,
    'One catalog of everything this site offers an agent: the API, the MCP server, the skills and this index.'
  ],
  [
    'Sitemap',
    `${SITE_URL}/sitemap-index.xml`,
    'The canonical index of every URL published on this site.'
  ]
]

const UNSECTIONED = 'Pages'

const FULL_INDEX = '/llms-full.txt'

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

const SECTION_INDEXES = [['/docs', 'Docs'], ...SECTIONS]

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
  return UNSECTIONED
}

export const toMarkdownUrl = pathname =>
  `${SITE_URL}/${toMarkdownPath(pathname)}`

export const sectionIndexUrl = prefix => `${SITE_URL}${prefix}/llms.txt`

const isUnder = prefix => pathname =>
  pathname === prefix || pathname.startsWith(`${prefix}/`)

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

const groupBySection = pages => {
  const grouped = new Map(SECTIONS.map(([, title]) => [title, []]))
  grouped.set(UNSECTIONED, [])

  for (const page of pages.toSorted((a, b) =>
    a.pathname.localeCompare(b.pathname)
  )) {
    grouped.get(sectionFor(page.pathname)).push(toEntry(page))
  }

  return grouped
}

const listing = grouped =>
  [...grouped]
    .flatMap(([title, entries]) =>
      entries.length > 0 ? `## ${title}\n\n${entries.join('\n')}` : []
    )
    .join('\n\n')

export const buildSectionIndexes = pages =>
  SECTION_INDEXES.flatMap(([prefix, title]) => {
    const scoped = pages
      .filter(({ pathname }) => isUnder(prefix)(pathname))
      .toSorted((a, b) => a.pathname.localeCompare(b.pathname))

    if (scoped.length === 0) return []

    return {
      prefix,
      title,
      pathname: `${prefix}/llms.txt`,
      contents: [
        `# Microlink — ${title}`,
        '',
        `> Everything under ${prefix} on ${SITE_URL}, one markdown link per page.`,
        '',
        `## ${title}`,
        '',
        scoped.map(toEntry).join('\n'),
        '',
        '## Optional',
        '',
        `- [Site index](${SITE_URL}/llms.txt): every section of this site.`,
        `- [Full index](${SITE_URL}${FULL_INDEX}): every page of this site in one file.`,
        ''
      ].join('\n')
    }
  })

export const buildLlmsTxt = pages => {
  const sections = buildSectionIndexes(pages).map(
    ({ prefix, title, pathname }) =>
      `- [${title}](${SITE_URL}${pathname}): every page under ${prefix}.`
  )

  const unsectioned = groupBySection(pages).get(UNSECTIONED)

  const body = [
    RESOURCES_SECTION,
    sections.length > 0 && `## Site sections\n\n${sections.join('\n')}`,
    unsectioned.length > 0 && `## ${UNSECTIONED}\n\n${unsectioned.join('\n')}`,
    `## Optional\n\n- [Full index](${SITE_URL}${FULL_INDEX}): every page of this site in one file, when a section index is not enough.`
  ]
    .filter(Boolean)
    .join('\n\n')

  return `${HEADING}\n\n${SUMMARY}\n\n${body}\n`
}

export const buildLlmsFullTxt = pages =>
  `${HEADING}\n\n${SUMMARY}\n\n${RESOURCES_SECTION}\n\n${listing(
    groupBySection(pages)
  )}\n`
