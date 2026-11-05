import { KEYLESS_REQUESTS_PER_DAY } from './free-tier.js'

export const MICROLINK_API_ENDPOINT = 'https://api.microlink.io'

const URL_INPUT_SCHEMA = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
      format: 'uri',
      description: 'Public http(s) URL of the page, e.g. https://example.com'
    }
  },
  required: ['url']
}

const EXTERNAL_READ_ANNOTATIONS = {
  readOnlyHint: true,
  untrustedContentHint: true
}

const toHttpUrl = value => {
  let url
  try {
    url = new URL(String(value ?? '').trim())
  } catch {
    throw new TypeError(`Expected an absolute http(s) URL, received "${value}"`)
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new TypeError(`Expected an http(s) URL, received "${value}"`)
  }
  return url.href
}

export const toSitePathname = value => {
  const pathname = String(value ?? '').trim()
  if (!pathname.startsWith('/') || pathname.startsWith('//')) {
    throw new TypeError(
      `Expected a microlink.io path starting with "/", received "${value}"`
    )
  }
  return pathname
}

export const createMicrolinkRequest =
  ({ fetch }) =>
    async (query, { signal } = {}) => {
      const response = await fetch(
      `${MICROLINK_API_ENDPOINT}?${new URLSearchParams(query)}`,
      { signal }
      )
      const payload = await response.json()
      if (payload.status !== 'success') {
        throw new Error(
        `${payload.code ?? response.status}: ${
          payload.message ?? 'Microlink API request failed'
        }`
        )
      }
      return payload.data
    }

export const createWebMcpTools = ({ fetch, navigate }) => {
  const request = createMicrolinkRequest({ fetch })

  return [
    {
      name: 'get_url_metadata',
      title: 'Get URL metadata',
      description: `Fetch normalized metadata (title, description, author, publisher, date, image, logo, lang) for any public URL using Microlink API. Uses the free endpoint (${KEYLESS_REQUESTS_PER_DAY} requests per day without an API key).`,
      inputSchema: URL_INPUT_SCHEMA,
      annotations: EXTERNAL_READ_ANNOTATIONS,
      execute: async ({ url }, options) =>
        request({ url: toHttpUrl(url) }, options)
    },
    {
      name: 'take_screenshot',
      title: 'Take a screenshot',
      description:
        'Capture a screenshot of any public URL using Microlink API and return the image URL with its width, height, and size.',
      inputSchema: {
        ...URL_INPUT_SCHEMA,
        properties: {
          ...URL_INPUT_SCHEMA.properties,
          fullPage: {
            type: 'boolean',
            description:
              'Capture the full scrollable page instead of the viewport',
            default: false
          }
        }
      },
      annotations: EXTERNAL_READ_ANNOTATIONS,
      execute: async ({ url, fullPage = false }, options) => {
        const data = await request(
          {
            url: toHttpUrl(url),
            screenshot: 'true',
            meta: 'false',
            ...(fullPage ? { 'screenshot.fullPage': 'true' } : {})
          },
          options
        )
        return data.screenshot
      }
    },
    {
      name: 'get_url_markdown',
      title: 'Convert URL to Markdown',
      description:
        'Convert the main content of any public URL into Markdown using Microlink API.',
      inputSchema: URL_INPUT_SCHEMA,
      annotations: EXTERNAL_READ_ANNOTATIONS,
      execute: async ({ url }, options) => {
        const data = await request(
          {
            url: toHttpUrl(url),
            'data.markdown.attr': 'markdown',
            meta: 'false'
          },
          options
        )
        return { url: data.url, markdown: data.markdown }
      }
    },
    {
      name: 'open_microlink_page',
      title: 'Open a microlink.io page',
      description:
        'Navigate this tab to a microlink.io page, e.g. /docs/api/getting-started/overview, /pricing, /screenshot, or /docs/api/parameters/screenshot.',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: 'Site path starting with "/", e.g. /pricing'
          }
        },
        required: ['path']
      },
      execute: async ({ path }) => {
        const pathname = toSitePathname(path)
        await navigate(pathname)
        return { path: pathname }
      }
    }
  ]
}

export const getModelContext = ({ document, navigator }) =>
  document?.modelContext ?? navigator?.modelContext

export const registerWebMcpTools = ({
  document,
  navigator,
  fetch,
  navigate
}) => {
  const modelContext = getModelContext({ document, navigator })
  if (typeof modelContext?.registerTool !== 'function') return null

  const controller = new AbortController()
  const registrations = createWebMcpTools({ fetch, navigate }).map(async tool =>
    modelContext.registerTool(tool, { signal: controller.signal })
  )

  return {
    ready: Promise.allSettled(registrations),
    unregister: () => controller.abort()
  }
}
