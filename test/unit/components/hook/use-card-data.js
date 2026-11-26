import { act, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import { getApiUrl } from '@microlink/react'
import {
  FAILED,
  cardOptions,
  isLazy,
  loadCardData,
  useCardData
} from '../../../../src/components/hook/use-card-data'

vi.mock('helpers/microlink', () => ({
  default: {
    request: (...args) => globalThis.__cardRequest(...args)
  }
}))

const URL_TO_FETCH = 'https://example.com'
const MEDIA = ['iframe', 'video', 'image', 'logo']

describe('cardOptions', () => {
  test('asks for what @microlink/react would ask for', () => {
    expect(cardOptions({ media: MEDIA })).toEqual({
      audio: false,
      iframe: true,
      screenshot: false,
      video: true
    })
  })

  test('sends the same fetch options the SDK sends, including false', () => {
    const input = {
      media: ['screenshot'],
      apiKey: 'k',
      contrast: false,
      data: { title: 't' },
      endpoint: 'https://example.test',
      force: false,
      headers: { a: 'b' },
      prerender: false,
      proxy: false,
      ttl: '1d'
    }
    const [apiUrl, meta] = getApiUrl({ url: URL_TO_FETCH, ...input })
    const params = new URL(apiUrl).searchParams
    const options = cardOptions(input)

    expect(options).toEqual({
      audio: params.get('audio') === 'true',
      iframe: params.get('iframe') === 'true',
      screenshot: params.get('screenshot') === 'true',
      video: params.get('video') === 'true',
      palette: params.get('palette') === 'true',
      apiKey: meta.headers['x-api-key'],
      data: { title: params.get('data.title') },
      endpoint: new URL(apiUrl).origin,
      force: params.get('force') === 'true',
      headers: { a: params.get('headers.a') },
      prerender: params.get('prerender') === 'true',
      proxy: params.get('proxy') === 'true',
      ttl: params.get('ttl')
    })
  })
})

describe('loadCardData', () => {
  test('fetches through helpers/microlink and hands the data to the card', async () => {
    const request = vi.fn(async () => ({ data: { title: 'live' } }))
    const options = cardOptions({ media: MEDIA })
    expect(await loadCardData(URL_TO_FETCH, options, request)).toEqual({
      phase: 'ready',
      data: { title: 'live' }
    })
    expect(request).toHaveBeenCalledWith(URL_TO_FETCH, options)
  })

  test('a failed request fails the card', async () => {
    const request = vi.fn(async () => {
      throw Object.assign(new Error('limited'), { code: 'ERATE' })
    })
    expect(await loadCardData(URL_TO_FETCH, {}, request)).toBe(FAILED)
  })
})

describe('isLazy', () => {
  function Observer () {}

  test('waits for the viewport by default and with observer options', () => {
    expect(isLazy(true, Observer)).toBe(true)
    expect(isLazy({ rootMargin: '400px' }, Observer)).toBe(true)
  })

  test('fetches at once when lazy is off or the browser has no observer', () => {
    expect(isLazy(false, Observer)).toBe(false)
    expect(isLazy(true, undefined)).toBe(false)
  })

  test('null options are still an observer, the same as any object', () => {
    expect(isLazy(null, Observer)).toBe(true)
  })
})

const listen = () => {}

const makeNode = name => {
  const node = {
    nodeType: name === '#text' ? 3 : 1,
    nodeName: String(name).toUpperCase(),
    tagName: String(name).toUpperCase(),
    textContent: '',
    childNodes: [],
    style: {},
    ownerDocument: null,
    parentNode: null,
    namespaceURI: 'http://www.w3.org/1999/xhtml',
    get firstChild () {
      return this.childNodes[0] ?? null
    },
    get nextSibling () {
      if (!this.parentNode) return null
      const index = this.parentNode.childNodes.indexOf(this)
      return this.parentNode.childNodes[index + 1] ?? null
    },
    appendChild (child) {
      if (child.parentNode) child.parentNode.removeChild(child)
      child.parentNode = this
      this.childNodes.push(child)
      return child
    },
    removeChild (child) {
      const index = this.childNodes.indexOf(child)
      if (index >= 0) this.childNodes.splice(index, 1)
      child.parentNode = null
      return child
    },
    insertBefore (child, before) {
      if (child.parentNode) child.parentNode.removeChild(child)
      child.parentNode = this
      const index = before ? this.childNodes.indexOf(before) : -1
      if (index < 0) this.childNodes.push(child)
      else this.childNodes.splice(index, 0, child)
      return child
    },
    setAttribute () {},
    removeAttribute () {},
    getAttribute () {
      return null
    },
    hasAttribute () {
      return false
    },
    addEventListener: listen,
    removeEventListener: listen,
    focus () {},
    contains (other) {
      return this.childNodes.includes(other)
    }
  }
  return node
}

const installDocument = () => {
  const constructors = new Proxy(
    {},
    { get: (target, prop) => target[prop] || (target[prop] = class {}) }
  )
  const document = {
    nodeType: 9,
    nodeName: '#document',
    addEventListener: listen,
    removeEventListener: listen,
    createElement (name) {
      const node = makeNode(name)
      node.ownerDocument = document
      return node
    },
    createElementNS (_ns, name) {
      return this.createElement(name)
    },
    createTextNode (text) {
      const node = makeNode('#text')
      node.nodeType = 3
      node.textContent = String(text)
      node.ownerDocument = document
      return node
    },
    getSelection () {
      return null
    },
    activeElement: null
  }
  const window = new Proxy(
    {
      document,
      navigator: globalThis.navigator,
      getComputedStyle: () => ({}),
      setTimeout: globalThis.setTimeout.bind(globalThis),
      clearTimeout: globalThis.clearTimeout.bind(globalThis),
      requestAnimationFrame: cb => setTimeout(cb, 0),
      cancelAnimationFrame: id => clearTimeout(id),
      addEventListener: listen,
      removeEventListener: listen,
      getSelection: () => null,
      HTMLElement: class HTMLElement {},
      Element: class Element {},
      Node: class Node {}
    },
    {
      get (target, prop, receiver) {
        if (Reflect.has(target, prop)) {
          return Reflect.get(target, prop, receiver)
        }
        if (typeof prop === 'string' && /^[A-Z]/.test(prop)) {
          return constructors[prop]
        }
        return undefined
      }
    }
  )
  document.defaultView = window
  document.documentElement = document.createElement('html')
  document.body = document.createElement('body')
  document.documentElement.appendChild(document.body)
  globalThis.window = window
  globalThis.document = document
  globalThis.HTMLElement = window.HTMLElement
  globalThis.Element = window.Element
  globalThis.Node = window.Node
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
}

class FakeObserver {
  constructor (callback, options) {
    this.callback = callback
    this.options = options
    this.nodes = []
    this.disconnected = false
    globalThis.__observers.push(this)
  }

  observe (node) {
    this.nodes.push(node)
  }

  disconnect () {
    this.disconnected = true
  }

  intersect (value) {
    this.callback([{ isIntersecting: value, target: this.nodes[0] }])
  }
}

const deferred = () => {
  let resolve
  const promise = new Promise(_resolve => {
    resolve = _resolve
  })
  return { promise, resolve }
}

describe('useCardData', () => {
  const roots = []

  beforeAll(() => {
    installDocument()
    globalThis.IntersectionObserver = FakeObserver
  })

  afterEach(async () => {
    await act(async () => {
      roots.splice(0).forEach(root => root.unmount())
    })
    globalThis.__observers = []
  })

  const renderCard = async ({ url, options }) => {
    globalThis.__observers = globalThis.__observers || []
    const el = document.createElement('div')
    document.body.appendChild(el)
    const root = createRoot(el)
    roots.push(root)
    const view = { card: null }
    const Probe = props => {
      const [card, ref] = useCardData(props.url, props.options)
      view.card = card
      return createElement('div', { ref })
    }
    await act(async () => {
      root.render(createElement(Probe, { url, options }))
    })
    return {
      view,
      rerender: async next => {
        await act(async () => {
          root.render(createElement(Probe, next))
        })
      }
    }
  }

  test('the first render is loading when it will fetch and idle when it will not', () => {
    const Probe = ({ enabled }) => {
      const [card] = useCardData(URL_TO_FETCH, {
        enabled,
        media: ['image'],
        lazy: false
      })
      return card.phase
    }
    expect(renderToStaticMarkup(createElement(Probe, { enabled: true }))).toBe(
      'loading'
    )
    expect(renderToStaticMarkup(createElement(Probe, { enabled: false }))).toBe(
      'idle'
    )
  })

  test('a card that should not fetch stays idle and is not observed', async () => {
    globalThis.__cardRequest = vi.fn()
    globalThis.__observers = []
    const rendered = await renderCard({
      url: URL_TO_FETCH,
      options: { enabled: false, media: ['image'] }
    })
    expect(rendered.view.card.phase).toBe('idle')
    expect(globalThis.__cardRequest).not.toHaveBeenCalled()
    expect(globalThis.__observers).toHaveLength(0)
  })

  test('an off-screen card waits, and a miss does not fetch', async () => {
    globalThis.__cardRequest = vi.fn(async () => ({ data: { title: 'live' } }))
    globalThis.__observers = []
    const rendered = await renderCard({
      url: URL_TO_FETCH,
      options: { enabled: true, media: ['image'], lazy: true }
    })
    expect(globalThis.__cardRequest).not.toHaveBeenCalled()
    expect(rendered.view.card.phase).toBe('loading')
    const observer = globalThis.__observers[0]
    expect(observer.options).toBeUndefined()
    await act(async () => {
      observer.intersect(false)
    })
    expect(globalThis.__cardRequest).not.toHaveBeenCalled()
    await act(async () => {
      observer.intersect(true)
    })
    expect(globalThis.__cardRequest).toHaveBeenCalledTimes(1)
    expect(observer.disconnected).toBe(true)
    expect(rendered.view.card).toEqual({
      phase: 'ready',
      data: { title: 'live' }
    })
  })

  test('observer options are the lazy object, including null', async () => {
    globalThis.__cardRequest = vi.fn(async () => ({ data: { title: 'live' } }))
    globalThis.__observers = []
    await renderCard({
      url: URL_TO_FETCH,
      options: {
        enabled: true,
        media: ['image'],
        lazy: { rootMargin: '400px' }
      }
    })
    expect(globalThis.__observers[0].options).toEqual({ rootMargin: '400px' })
    globalThis.__observers = []
    await renderCard({
      url: URL_TO_FETCH,
      options: { enabled: true, media: ['image'], lazy: null }
    })
    expect(globalThis.__observers[0].options).toBeNull()
  })

  test('lazy off fetches at once, and false query props are sent', async () => {
    globalThis.__cardRequest = vi.fn(async () => ({ data: { title: 'live' } }))
    globalThis.__observers = []
    const rendered = await renderCard({
      url: URL_TO_FETCH,
      options: {
        enabled: true,
        media: ['image'],
        lazy: false,
        force: false,
        apiKey: 'k'
      }
    })
    expect(globalThis.__observers).toHaveLength(0)
    expect(globalThis.__cardRequest).toHaveBeenCalledWith(
      URL_TO_FETCH,
      expect.objectContaining({ force: false, apiKey: 'k', iframe: false })
    )
    expect(rendered.view.card.phase).toBe('ready')
  })

  test('turning the fetch off ignores the load already in flight', async () => {
    const pending = deferred()
    globalThis.__cardRequest = vi.fn(() => pending.promise)
    const rendered = await renderCard({
      url: URL_TO_FETCH,
      options: { enabled: true, media: ['image'], lazy: false }
    })
    await rendered.rerender({
      url: URL_TO_FETCH,
      options: { enabled: false, media: ['image'], lazy: false }
    })
    expect(rendered.view.card.phase).toBe('idle')
    await act(async () => {
      pending.resolve({ data: { title: 'late' } })
      await pending.promise
    })
    expect(rendered.view.card.phase).toBe('idle')
  })

  test('a superseded load does not replace the card', async () => {
    const first = deferred()
    const second = deferred()
    globalThis.__cardRequest = vi
      .fn()
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise)
    const rendered = await renderCard({
      url: 'https://example.com/a',
      options: { enabled: true, media: ['image'], lazy: false }
    })
    await rendered.rerender({
      url: 'https://example.com/b',
      options: { enabled: true, media: ['image'], lazy: false }
    })
    await act(async () => {
      second.resolve({ data: { title: 'new' } })
      await second.promise
    })
    expect(rendered.view.card).toEqual({
      phase: 'ready',
      data: { title: 'new' }
    })
    await act(async () => {
      first.resolve({ data: { title: 'old' } })
      await first.promise
    })
    expect(rendered.view.card.data.title).toBe('new')
  })

  test('a changed query fetches again and an unrelated prop does not', async () => {
    globalThis.__cardRequest = vi.fn(async () => ({ data: { title: 'x' } }))
    const rendered = await renderCard({
      url: URL_TO_FETCH,
      options: { enabled: true, media: ['image'], lazy: false }
    })
    await rendered.rerender({
      url: URL_TO_FETCH,
      options: { enabled: true, media: ['image'], lazy: false, ttl: '1d' }
    })
    expect(globalThis.__cardRequest.mock.lastCall[1].ttl).toBe('1d')
    const calls = globalThis.__cardRequest.mock.calls.length
    await rendered.rerender({
      url: URL_TO_FETCH,
      options: {
        enabled: true,
        media: ['image'],
        lazy: false,
        ttl: '1d',
        size: 'large'
      }
    })
    expect(globalThis.__cardRequest).toHaveBeenCalledTimes(calls)
  })

  test('leaving the page disconnects the observer and does not observe null', async () => {
    globalThis.__cardRequest = vi.fn(async () => ({ data: { title: 'x' } }))
    globalThis.__observers = []
    const rendered = await renderCard({
      url: URL_TO_FETCH,
      options: { enabled: true, media: ['image'], lazy: true }
    })
    const observer = globalThis.__observers[0]
    await rendered.rerender({
      url: URL_TO_FETCH,
      options: { enabled: true, media: ['image'], lazy: true }
    })
    expect(observer.nodes.every(node => node !== null)).toBe(true)
    await act(async () => {
      roots.splice(0).forEach(root => root.unmount())
    })
    expect(observer.disconnected).toBe(true)
    expect(
      globalThis.__observers.every(item =>
        item.nodes.every(node => node !== null)
      )
    ).toBe(true)
  })
})
