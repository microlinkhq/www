export const RECOVERY_LINKS = [
  {
    href: '/',
    title: 'Home',
    description: 'Every product Microlink exposes, with live examples.'
  },
  {
    href: '/docs/api/getting-started/overview',
    title: 'API documentation',
    description: 'Endpoints, query parameters, response format and error codes.'
  },
  {
    href: '/openapi.json',
    title: 'OpenAPI specification',
    description: 'The whole API surface as a machine-readable OpenAPI document.'
  },
  {
    href: '/llms.txt',
    title: 'llms.txt',
    description: 'Every page on this site as a markdown link, for agents.'
  },
  {
    href: '/sitemap-index.xml',
    title: 'Sitemap',
    description: 'The canonical index of every URL published here.'
  },
  {
    href: '/contact',
    title: 'Contact',
    description: 'Reach a human when none of the above answers the question.'
  }
]

const SITE_URL = 'https://microlink.io'

const CONTEXT =
  'That path does not exist on microlink.io. These indexes lead everywhere else:'

export const buildNotFoundMarkdown = () =>
  [
    '# Page not found',
    '',
    CONTEXT,
    '',
    RECOVERY_LINKS.map(
      ({ href, title, description }) =>
        `- [${title}](${SITE_URL}${href}) — ${description}`
    ).join('\n'),
    ''
  ].join('\n')
