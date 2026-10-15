import {
  UTM_KEYS,
  hasUtms,
  normalizePath,
  parseUtms,
  pickUtms,
  truncate
} from './attribution'

export const DASHBOARD_URL = 'https://dashboard.microlink.io'
export const SIGNUP_PATH = '/signup'
export const LOGIN_PATH = '/login'

export const PRODUCTS = [
  'screenshot',
  'pdf',
  'metadata',
  'extract',
  'function',
  'search',
  'other'
]

const SCREENSHOT_COMPETITORS = [
  'apiflash',
  'cloudflare',
  'screenshotapi',
  'screenshotlayer',
  'screenshotmachine',
  'screenshotone',
  'thumio',
  'url2png',
  'urlbox'
]

export const PATH_PRODUCTS = {
  screenshot: [
    '/screenshot',
    '/tools/website-screenshot',
    '/benchmarks/screenshot-api',
    '/extensions/chrome/website-screenshot',
    '/use-cases/website-screenshot',
    '/docs/guides/screenshot',
    '/docs/api/parameters/screenshot',
    ...SCREENSHOT_COMPETITORS.map(slug => `/alternative/${slug}`)
  ],
  pdf: [
    '/pdf',
    '/tools/website-to-pdf',
    '/extensions/chrome/website-pdf',
    '/use-cases/website-to-pdf',
    '/docs/guides/pdf',
    '/docs/api/parameters/pdf'
  ],
  metadata: [
    '/metadata',
    '/logo',
    '/insights',
    '/link-preview',
    '/embed',
    '/tools/embed-url',
    '/tools/sharing-debugger',
    '/extensions/chrome/sharing-debugger',
    '/use-cases/website-metadata',
    '/docs/guides/metadata',
    '/docs/guides/embed',
    '/docs/guides/insights',
    '/docs/api/parameters/insights',
    '/alternative/embedly',
    '/alternative/iframely',
    '/alternative/context-dev'
  ],
  extract: [
    '/markdown',
    '/html',
    '/text',
    '/file-conversion',
    '/tools/url-to-markdown',
    '/use-cases/website-to-markdown',
    '/use-cases/scraping',
    '/features/scraping',
    '/docs/guides/content-conversion',
    '/docs/guides/data-extraction',
    '/alternative/firecrawl'
  ],
  function: [
    '/function',
    '/features/function',
    '/docs/guides/function',
    '/docs/api/parameters/function'
  ],
  search: [
    '/search',
    '/use-cases/search-api',
    '/docs/guides/search',
    '/alternative/serpapi'
  ]
}

const PATH_PREFIXES = Object.entries(PATH_PRODUCTS)
  .flatMap(([product, prefixes]) => prefixes.map(prefix => [prefix, product]))
  .sort(([a], [b]) => b.length - a.length)

const matchesPrefix = (path, prefix) =>
  path === prefix || path.startsWith(`${prefix}/`)

export const productFromPath = pathname => {
  const path = normalizePath(pathname)
  const match = PATH_PREFIXES.find(([prefix]) => matchesPrefix(path, prefix))
  return match ? match[1] : undefined
}

const isProduct = value => PRODUCTS.includes(value)

const isInternalRedirect = value =>
  typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')

const encode = value =>
  encodeURIComponent(value).replace(/%2F/g, '/').replace(/%3A/g, ':')

export const eventLocation = pathname => {
  const [segment] = normalizePath(pathname).slice(1).split('/')
  return segment || 'home'
}

export const dashboardParams = ({
  cta,
  product,
  redirect,
  pathname,
  attribution,
  search
} = {}) => {
  const currentPath = normalizePath(pathname)
  const landing =
    attribution && attribution.landing
      ? normalizePath(attribution.landing)
      : currentPath
  const resolvedProduct = [
    product,
    productFromPath(currentPath),
    productFromPath(landing)
  ].find(isProduct)
  const utms = hasUtms(attribution) ? pickUtms(attribution) : parseUtms(search)

  const params = [
    ['from', landing],
    ['product', resolvedProduct],
    ...UTM_KEYS.map(key => [key, utms[key]]),
    ['cta', cta],
    ['redirect', isInternalRedirect(redirect) ? redirect : undefined]
  ]

  return params
    .map(([key, value]) => [key, truncate(value)])
    .filter(([, value]) => Boolean(value))
}

const splitOnce = (value, separator) => {
  const index = value.indexOf(separator)
  return index === -1
    ? [value, '']
    : [value.slice(0, index), value.slice(index + 1)]
}

export const dashboardPathname = dashboardPath =>
  splitOnce(splitOnce(dashboardPath, '#')[0], '?')[0]

export const dashboardUrl = (dashboardPath = '/', options) => {
  const [pathAndQuery, hash] = splitOnce(dashboardPath, '#')
  const [path, destinationQuery] = splitOnce(pathAndQuery, '?')
  const destinationKeys = new Set(new URLSearchParams(destinationQuery).keys())
  const query = [
    destinationQuery,
    ...dashboardParams(options)
      .filter(([key]) => !destinationKeys.has(key))
      .map(([key, value]) => `${key}=${encode(value)}`)
  ]
    .filter(Boolean)
    .join('&')
  return `${DASHBOARD_URL}${path}${query ? `?${query}` : ''}${
    hash ? `#${hash}` : ''
  }`
}

export const signupUrl = options => dashboardUrl(SIGNUP_PATH, options)

export const loginUrl = options => dashboardUrl(LOGIN_PATH, options)

export const dashboardPathFromHref = href => {
  if (typeof href !== 'string') return undefined
  let url
  try {
    url = new URL(href)
  } catch {
    return undefined
  }
  if (url.origin !== DASHBOARD_URL) return undefined
  const path = normalizePath(url.pathname)
  return `${path === '/' ? LOGIN_PATH : path}${url.search}${url.hash}`
}
