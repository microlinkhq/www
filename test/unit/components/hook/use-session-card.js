import { act, createElement } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeAll, describe, expect, test, vi } from 'vitest'
import {
  FAILED,
  KEYLESS,
  cardOptions,
  loadSessionCard,
  useSessionCard
} from '../../../../src/components/hook/use-session-card'

vi.mock('helpers/microlink', () => ({
  default: {
    request: (...args) => globalThis.__sessionCardRequest(...args)
  }
}))

vi.mock('helpers/session-request', () => ({
  isSignedIn: () => globalThis.__sessionCardSignedIn !== false
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

  test('passes the card query props and drops the unset ones', () => {
    expect(
      cardOptions({
        media: ['screenshot'],
        contrast: true,
        data: { title: 't' },
        force: true,
        headers: { a: 'b' },
        prerender: true,
        proxy: true,
        ttl: '1d',
        size: 'large'
      })
    ).toEqual({
      audio: false,
      iframe: false,
      screenshot: true,
      video: false,
      palette: true,
      data: { title: 't' },
      force: true,
      headers: { a: 'b' },
      prerender: true,
      proxy: true,
      ttl: '1d'
    })
  })
})

describe('loadSessionCard', () => {
  test('a signed-out visitor leaves the fetch to the card, keyless', async () => {
    const request = vi.fn()
    expect(
      await loadSessionCard(
        URL_TO_FETCH,
        { media: MEDIA },
        { signedIn: () => false, request }
      )
    ).toBe(KEYLESS)
    expect(request).not.toHaveBeenCalled()
  })

  test('a signed-in visitor gets the data from the session request', async () => {
    const request = vi.fn(async () => ({ data: { title: 'live' } }))
    expect(
      await loadSessionCard(
        URL_TO_FETCH,
        { media: MEDIA },
        { signedIn: () => true, request }
      )
    ).toEqual({ phase: 'session', data: { title: 'live' } })
    expect(request).toHaveBeenCalledWith(
      URL_TO_FETCH,
      cardOptions({ media: MEDIA })
    )
  })

  test('a failed session request fails the card instead of going keyless', async () => {
    const request = vi.fn(async () => {
      throw Object.assign(new Error('limited'), { code: 'ERATE' })
    })
    expect(
      await loadSessionCard(
        URL_TO_FETCH,
        { media: MEDIA },
        { signedIn: () => true, request }
      )
    ).toBe(FAILED)
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
        if (Reflect.has(target, prop)) { return Reflect.get(target, prop, receiver) }
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

const deferred = () => {
  let resolve
  const promise = new Promise(_resolve => {
    resolve = _resolve
  })
  return { promise, resolve }
}

describe('useSessionCard', () => {
  const roots = []

  beforeAll(installDocument)

  afterEach(async () => {
    await act(async () => {
      roots.splice(0).forEach(root => root.unmount())
    })
  })

  const renderCard = async ({ url, options }) => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const root = createRoot(el)
    roots.push(root)
    const view = { card: null }
    const Probe = props => {
      view.card = useSessionCard(props.url, props.options)
      return null
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

  test('a card that should not fetch stays idle', async () => {
    globalThis.__sessionCardRequest = vi.fn()
    const rendered = await renderCard({
      url: URL_TO_FETCH,
      options: { enabled: false, media: ['image'] }
    })
    expect(rendered.view.card.phase).toBe('idle')
    expect(globalThis.__sessionCardRequest).not.toHaveBeenCalled()
  })

  test('turning the fetch off ignores the load already in flight', async () => {
    const pending = deferred()
    globalThis.__sessionCardRequest = vi.fn(() => pending.promise)
    const rendered = await renderCard({
      url: URL_TO_FETCH,
      options: { enabled: true, media: ['image'] }
    })
    await rendered.rerender({
      url: URL_TO_FETCH,
      options: { enabled: false, media: ['image'] }
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
    globalThis.__sessionCardRequest = vi
      .fn()
      .mockReturnValueOnce(first.promise)
      .mockReturnValueOnce(second.promise)
    const rendered = await renderCard({
      url: 'https://example.com/a',
      options: { enabled: true, media: ['image'] }
    })
    await rendered.rerender({
      url: 'https://example.com/b',
      options: { enabled: true, media: ['image'] }
    })
    await act(async () => {
      second.resolve({ data: { title: 'new' } })
      await second.promise
    })
    expect(rendered.view.card).toEqual({
      phase: 'session',
      data: { title: 'new' }
    })
    await act(async () => {
      first.resolve({ data: { title: 'old' } })
      await first.promise
    })
    expect(rendered.view.card.data.title).toBe('new')
  })

  test('a changed card query fetches again and an unrelated prop does not', async () => {
    globalThis.__sessionCardRequest = vi.fn(async () => ({
      data: { title: 'x' }
    }))
    let options = { enabled: true, media: ['image'] }
    const rendered = await renderCard({ url: URL_TO_FETCH, options })
    const changes = [
      ['contrast', true, 'palette', true],
      ['data', { x: 1 }, 'data', { x: 1 }],
      ['force', true, 'force', true],
      ['headers', { a: 'b' }, 'headers', { a: 'b' }],
      ['prerender', true, 'prerender', true],
      ['proxy', true, 'proxy', true],
      ['ttl', '1d', 'ttl', '1d'],
      ['media', ['screenshot'], 'screenshot', true]
    ]
    for (const [field, fieldValue, queryKey, queryValue] of changes) {
      options = { ...options, [field]: fieldValue }
      await rendered.rerender({ url: URL_TO_FETCH, options })
      expect(
        globalThis.__sessionCardRequest.mock.lastCall[1][queryKey]
      ).toEqual(queryValue)
    }
    expect(globalThis.__sessionCardRequest).toHaveBeenCalledTimes(
      1 + changes.length
    )
    await rendered.rerender({
      url: URL_TO_FETCH,
      options: { ...options, size: 'large' }
    })
    expect(globalThis.__sessionCardRequest).toHaveBeenCalledTimes(
      1 + changes.length
    )
  })
})
