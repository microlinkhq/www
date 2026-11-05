import { describe, expect, test, vi } from 'vitest'

import {
  MICROLINK_API_ENDPOINT,
  createWebMcpTools,
  getModelContext,
  registerWebMcpTools,
  toSitePathname
} from '../../../src/helpers/webmcp.js'

const jsonResponse = (payload, status = 200) => ({
  status,
  json: async () => payload
})

const success = data => jsonResponse({ status: 'success', data })

const setup = payload => {
  const fetch = vi.fn(async () => payload)
  const navigate = vi.fn(async () => {})
  const tools = Object.fromEntries(
    createWebMcpTools({ fetch, navigate }).map(tool => [tool.name, tool])
  )
  const requestedQuery = () =>
    Object.fromEntries(new URL(fetch.mock.calls[0][0]).searchParams)
  return { fetch, navigate, tools, requestedQuery }
}

describe('WebMCP tool definitions', () => {
  test('every tool satisfies the ModelContextTool dictionary', () => {
    const { tools } = setup()
    for (const tool of Object.values(tools)) {
      expect(tool.name).toMatch(/^[a-z][a-z0-9_]*$/)
      expect(tool.description.length).toBeGreaterThan(20)
      expect(tool.inputSchema.type).toBe('object')
      expect(tool.inputSchema.required.length).toBeGreaterThan(0)
      for (const key of tool.inputSchema.required) {
        expect(tool.inputSchema.properties).toHaveProperty(key)
      }
      expect(typeof tool.execute).toBe('function')
    }
  })

  test('exposes metadata, screenshot, markdown, and navigation', () => {
    const { tools } = setup()
    expect(Object.keys(tools)).toEqual([
      'get_url_metadata',
      'take_screenshot',
      'get_url_markdown',
      'open_microlink_page'
    ])
  })

  test('tools that read third-party pages flag untrusted content', () => {
    const { tools } = setup()
    for (const name of [
      'get_url_metadata',
      'take_screenshot',
      'get_url_markdown'
    ]) {
      expect(tools[name].annotations).toEqual({
        readOnlyHint: true,
        untrustedContentHint: true
      })
    }
  })
})

describe('get_url_metadata', () => {
  test('calls the free endpoint and returns the data payload', async () => {
    const data = { title: 'Example', url: 'https://example.com/' }
    const { fetch, tools, requestedQuery } = setup(success(data))
    await expect(
      tools.get_url_metadata.execute({ url: 'https://example.com' })
    ).resolves.toEqual(data)
    expect(
      fetch.mock.calls[0][0].startsWith(`${MICROLINK_API_ENDPOINT}?`)
    ).toBe(true)
    expect(requestedQuery()).toEqual({ url: 'https://example.com/' })
  })

  test('forwards the execution abort signal to fetch', async () => {
    const { fetch, tools } = setup(success({}))
    const { signal } = new AbortController()
    await tools.get_url_metadata.execute(
      { url: 'https://example.com' },
      { signal }
    )
    expect(fetch.mock.calls[0][1]).toEqual({ signal })
  })

  test('encodes URLs carrying their own query string', async () => {
    const { fetch, tools, requestedQuery } = setup(success({}))
    await tools.get_url_metadata.execute({
      url: 'https://example.com/?a=1&b=2'
    })
    expect(fetch.mock.calls[0][0]).toContain(
      'url=https%3A%2F%2Fexample.com%2F%3Fa%3D1%26b%3D2'
    )
    expect(requestedQuery()).toEqual({ url: 'https://example.com/?a=1&b=2' })
  })

  test.each([
    '',
    'example.com',
    'javascript:alert(1)',
    'file:///etc/passwd',
    undefined
  ])('rejects %j before any request', async url => {
    const { fetch, tools } = setup(success({}))
    await expect(tools.get_url_metadata.execute({ url })).rejects.toThrow(
      TypeError
    )
    expect(fetch).not.toHaveBeenCalled()
  })

  test('surfaces the API error code and message', async () => {
    const { tools } = setup(
      jsonResponse(
        {
          status: 'fail',
          code: 'ERATE',
          message: 'Your daily rate limit has been reached'
        },
        429
      )
    )
    await expect(
      tools.get_url_metadata.execute({ url: 'https://example.com' })
    ).rejects.toThrow('ERATE: Your daily rate limit has been reached')
  })

  test('falls back to the HTTP status when the error has no code', async () => {
    const { tools } = setup(jsonResponse({ status: 'error' }, 500))
    await expect(
      tools.get_url_metadata.execute({ url: 'https://example.com' })
    ).rejects.toThrow('500: Microlink API request failed')
  })
})

describe('take_screenshot', () => {
  const screenshot = {
    url: 'https://iad.microlink.io/x.png',
    width: 1280,
    height: 800
  }

  test('requests a viewport screenshot without metadata', async () => {
    const { tools, requestedQuery } = setup(success({ screenshot }))
    await expect(
      tools.take_screenshot.execute({ url: 'https://example.com' })
    ).resolves.toEqual(screenshot)
    expect(requestedQuery()).toEqual({
      url: 'https://example.com/',
      screenshot: 'true',
      meta: 'false'
    })
  })

  test('adds fullPage only when asked', async () => {
    const { tools, requestedQuery } = setup(success({ screenshot }))
    await tools.take_screenshot.execute({
      url: 'https://example.com',
      fullPage: true
    })
    expect(requestedQuery()['screenshot.fullPage']).toBe('true')
  })
})

describe('get_url_markdown', () => {
  test('uses the markdown MQL rule and returns url + markdown', async () => {
    const { tools, requestedQuery } = setup(
      success({ url: 'https://example.com/', markdown: '# Example' })
    )
    await expect(
      tools.get_url_markdown.execute({ url: 'https://example.com' })
    ).resolves.toEqual({ url: 'https://example.com/', markdown: '# Example' })
    expect(requestedQuery()).toEqual({
      url: 'https://example.com/',
      'data.markdown.attr': 'markdown',
      meta: 'false'
    })
  })
})

describe('open_microlink_page', () => {
  test('navigates within the site', async () => {
    const { navigate, tools } = setup()
    await expect(
      tools.open_microlink_page.execute({ path: '/pricing' })
    ).resolves.toEqual({ path: '/pricing' })
    expect(navigate).toHaveBeenCalledWith('/pricing')
  })

  test.each(['https://evil.com', '//evil.com', 'pricing', '', undefined])(
    'refuses %j',
    async path => {
      const { navigate, tools } = setup()
      await expect(tools.open_microlink_page.execute({ path })).rejects.toThrow(
        TypeError
      )
      expect(navigate).not.toHaveBeenCalled()
    }
  )

  test('toSitePathname trims whitespace', () => {
    expect(toSitePathname('  /docs  ')).toBe('/docs')
  })
})

describe('registerWebMcpTools', () => {
  const fakeModelContext = () => ({ registerTool: vi.fn(async () => {}) })
  const deps = { fetch: vi.fn(), navigate: vi.fn() }

  test('prefers document.modelContext over navigator.modelContext', () => {
    const document = { modelContext: fakeModelContext() }
    const navigator = { modelContext: fakeModelContext() }
    expect(getModelContext({ document, navigator })).toBe(document.modelContext)
    expect(getModelContext({ document: {}, navigator })).toBe(
      navigator.modelContext
    )
  })

  test('is a no-op where WebMCP is unsupported', () => {
    expect(
      registerWebMcpTools({ document: {}, navigator: {}, ...deps })
    ).toBeNull()
    expect(registerWebMcpTools({ ...deps })).toBeNull()
  })

  test('registers every tool with one abort signal and unregisters on abort', async () => {
    const modelContext = fakeModelContext()
    const registration = registerWebMcpTools({
      document: { modelContext },
      navigator: {},
      ...deps
    })
    await registration.ready
    const names = modelContext.registerTool.mock.calls.map(
      ([tool]) => tool.name
    )
    expect(names).toHaveLength(4)
    const signals = new Set(
      modelContext.registerTool.mock.calls.map(([, { signal }]) => signal)
    )
    expect(signals.size).toBe(1)
    const [signal] = signals
    expect(signal.aborted).toBe(false)
    registration.unregister()
    expect(signal.aborted).toBe(true)
  })

  test('one failing registration does not block the others', async () => {
    const modelContext = {
      registerTool: vi.fn(async tool => {
        if (tool.name === 'take_screenshot') { throw new Error('InvalidStateError') }
      })
    }
    const registration = registerWebMcpTools({
      document: { modelContext },
      ...deps
    })
    const results = await registration.ready
    expect(results.map(result => result.status)).toEqual([
      'fulfilled',
      'rejected',
      'fulfilled',
      'fulfilled'
    ])
  })

  test('a synchronous throw from registerTool is contained', async () => {
    const modelContext = {
      registerTool: vi.fn(() => {
        throw new TypeError('bad dictionary')
      })
    }
    const registration = registerWebMcpTools({
      document: { modelContext },
      ...deps
    })
    const results = await registration.ready
    expect(results.every(result => result.status === 'rejected')).toBe(true)
  })
})
