import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  PATH_PRODUCTS,
  dashboardPathFromHref,
  dashboardUrl,
  eventLocation,
  loginUrl,
  productFromPath,
  signupUrl
} from '../../../src/helpers/dashboard-url.js'

const SIGNUP = 'https://dashboard.microlink.io/signup'
const LOGIN = 'https://dashboard.microlink.io/login'

const query = url => Object.fromEntries(new URL(url).searchParams)

describe('dashboard-url', () => {
  afterEach(() => vi.unstubAllGlobals())

  describe('productFromPath', () => {
    it('maps every landing family to its vertical', () => {
      expect(productFromPath('/screenshot')).toBe('screenshot')
      expect(productFromPath('/screenshot/nodejs')).toBe('screenshot')
      expect(productFromPath('/tools/website-screenshot/full-page')).toBe(
        'screenshot'
      )
      expect(productFromPath('/pdf/python')).toBe('pdf')
      expect(productFromPath('/tools/website-to-pdf')).toBe('pdf')
      expect(productFromPath('/metadata')).toBe('metadata')
      expect(productFromPath('/logo/go')).toBe('metadata')
      expect(productFromPath('/insights')).toBe('metadata')
      expect(productFromPath('/link-preview')).toBe('metadata')
      expect(productFromPath('/embed/providers')).toBe('metadata')
      expect(productFromPath('/tools/embed-url/youtube')).toBe('metadata')
      expect(productFromPath('/tools/sharing-debugger')).toBe('metadata')
      expect(productFromPath('/markdown')).toBe('extract')
      expect(productFromPath('/html/ruby')).toBe('extract')
      expect(productFromPath('/text')).toBe('extract')
      expect(productFromPath('/tools/url-to-markdown')).toBe('extract')
      expect(productFromPath('/file-conversion')).toBe('extract')
      expect(productFromPath('/function')).toBe('function')
      expect(productFromPath('/search')).toBe('search')
    })

    it('maps competitor, docs and use-case paths where the vertical is obvious', () => {
      expect(productFromPath('/alternative/screenshotone')).toBe('screenshot')
      expect(productFromPath('/alternative/firecrawl')).toBe('extract')
      expect(productFromPath('/alternative/serpapi')).toBe('search')
      expect(productFromPath('/docs/guides/pdf/basics')).toBe('pdf')
      expect(productFromPath('/use-cases/website-metadata/anything')).toBe(
        'metadata'
      )
      expect(productFromPath('/use-cases/scraping/behind-login')).toBe(
        'extract'
      )
    })

    it('matches whole path segments only', () => {
      expect(productFromPath('/screenshots')).toBeUndefined()
      expect(productFromPath('/pdfs')).toBeUndefined()
    })

    it('leaves unmapped paths out', () => {
      expect(productFromPath('/')).toBeUndefined()
      expect(productFromPath('/pricing')).toBeUndefined()
      expect(productFromPath('/media')).toBeUndefined()
      expect(productFromPath('/alternative/scrapingbee')).toBeUndefined()
      expect(productFromPath('/blog/some-post')).toBeUndefined()
    })

    it('only maps to products the dashboard accepts', () => {
      const accepted = [
        'screenshot',
        'pdf',
        'metadata',
        'extract',
        'function',
        'search'
      ]
      expect(Object.keys(PATH_PRODUCTS).sort()).toEqual(accepted.sort())
    })
  })

  describe('eventLocation', () => {
    it('uses the first path segment, or home', () => {
      expect(eventLocation('/')).toBe('home')
      expect(eventLocation('/screenshot/nodejs')).toBe('screenshot')
      expect(eventLocation('/alternative/urlbox')).toBe('alternative')
    })
  })

  describe('signupUrl', () => {
    it('is deterministic from the page path alone (SSR, no window)', () => {
      vi.stubGlobal('window', undefined)
      expect(
        signupUrl({ cta: 'screenshot:hero', pathname: '/screenshot' })
      ).toBe(
        `${SIGNUP}?from=/screenshot&product=screenshot&cta=screenshot:hero`
      )
    })

    it('omits product when the path is unmapped', () => {
      expect(signupUrl({ cta: 'home:hero', pathname: '/' })).toBe(
        `${SIGNUP}?from=/&cta=home:hero`
      )
    })

    it('prefers the first-touch landing and its vertical over the current page', () => {
      const url = signupUrl({
        cta: 'toolbar:dashboard',
        pathname: '/pricing',
        attribution: {
          landing: '/pdf',
          first_seen_at: '2026-10-07T10:00:00.000Z'
        }
      })
      expect(query(url)).toEqual({
        from: '/pdf',
        product: 'pdf',
        cta: 'toolbar:dashboard'
      })
    })

    it('lets the current page vertical win over the landing vertical', () => {
      const url = signupUrl({
        cta: 'markdown:hero',
        pathname: '/markdown',
        attribution: { landing: '/screenshot' }
      })
      expect(query(url)).toMatchObject({
        from: '/screenshot',
        product: 'extract'
      })
    })

    it('lets an explicit product override everything', () => {
      const url = signupUrl({
        cta: 'x:hero',
        pathname: '/screenshot',
        product: 'search',
        attribution: { landing: '/pdf' }
      })
      expect(query(url).product).toBe('search')
    })

    it('drops explicit products the dashboard does not accept', () => {
      const url = signupUrl({
        cta: 'x:hero',
        pathname: '/markdown',
        product: 'markdown'
      })
      expect(query(url).product).toBe('extract')
    })

    it('sends first-touch utms when stored', () => {
      const url = signupUrl({
        cta: 'screenshot:hero',
        pathname: '/screenshot',
        attribution: {
          landing: '/screenshot',
          utm_source: 'google',
          utm_medium: 'cpc'
        },
        search: '?utm_source=current'
      })
      expect(query(url)).toMatchObject({
        utm_source: 'google',
        utm_medium: 'cpc'
      })
    })

    it('falls back to the current url utms when the store has none', () => {
      const url = signupUrl({
        cta: 'screenshot:hero',
        pathname: '/screenshot',
        attribution: { landing: '/screenshot' },
        search: '?utm_source=twitter&utm_term=api'
      })
      expect(query(url)).toMatchObject({
        utm_source: 'twitter',
        utm_term: 'api'
      })
    })

    it('never invents utms', () => {
      const url = signupUrl({
        cta: 'screenshot:hero',
        pathname: '/screenshot',
        search: ''
      })
      expect(Object.keys(query(url))).toEqual(['from', 'product', 'cta'])
    })

    it('never sends ref, even from a legacy store with a referrer', () => {
      const url = signupUrl({
        cta: 'x',
        pathname: '/pdf',
        attribution: {
          landing: '/pdf',
          referrer: 'https://news.ycombinator.com/item'
        }
      })
      expect(query(url)).not.toHaveProperty('ref')
      expect(url).not.toContain('news.ycombinator.com')
    })

    it('encodes redirect and only accepts internal dashboard paths', () => {
      const ok = signupUrl({
        cta: 'x',
        pathname: '/pdf',
        redirect: '/playground?product=pdf'
      })
      expect(ok).toContain('redirect=/playground%3Fproduct%3Dpdf')
      expect(query(ok).redirect).toBe('/playground?product=pdf')
      expect(
        query(
          signupUrl({
            cta: 'x',
            pathname: '/pdf',
            redirect: 'https://evil.test'
          })
        )
      ).not.toHaveProperty('redirect')
      expect(
        query(
          signupUrl({ cta: 'x', pathname: '/pdf', redirect: '//evil.test' })
        )
      ).not.toHaveProperty('redirect')
      expect(
        query(signupUrl({ cta: 'x', pathname: '/pdf', redirect: 'playground' }))
      ).not.toHaveProperty('redirect')
    })

    it('caps every value at 200 characters', () => {
      const long = 'x'.repeat(500)
      const url = signupUrl({
        cta: long,
        pathname: `/${long}`,
        attribution: {
          landing: `/${long}`,
          utm_source: long
        },
        redirect: `/${long}`
      })
      Object.values(query(url)).forEach(value =>
        expect(value.length).toBeLessThanOrEqual(200)
      )
    })

    it('drops empty values and never duplicates params', () => {
      const url = signupUrl({
        cta: '',
        pathname: '/screenshot',
        attribution: { landing: '/screenshot', utm_source: '', utm_medium: ' ' }
      })
      const keys = [...new URL(url).searchParams.keys()]
      expect(keys).toEqual(['from', 'product'])
      expect(new Set(keys).size).toBe(keys.length)
    })

    it('encodes user-controlled characters', () => {
      const url = signupUrl({
        cta: 'x',
        pathname: '/screenshot',
        attribution: { landing: '/screenshot', utm_campaign: 'a b&c=d#e' }
      })
      expect(url).toContain('utm_campaign=a%20b%26c%3Dd%23e')
      expect(query(url).utm_campaign).toBe('a b&c=d#e')
    })
  })

  describe('loginUrl', () => {
    it('is deterministic from the page path alone (SSR, no window)', () => {
      vi.stubGlobal('window', undefined)
      expect(
        loginUrl({ cta: 'toolbar:sign-in', pathname: '/screenshot' })
      ).toBe(`${LOGIN}?from=/screenshot&product=screenshot&cta=toolbar:sign-in`)
    })

    it('keeps the first touch when the visitor moves on to the docs', () => {
      const url = loginUrl({
        cta: 'toolbar:sign-in',
        pathname: '/docs/api/getting-started/overview',
        attribution: {
          landing: '/screenshot',
          first_seen_at: '2026-10-14T10:00:00.000Z'
        }
      })
      expect(url).toBe(
        `${LOGIN}?from=/screenshot&product=screenshot&cta=toolbar:sign-in`
      )
    })

    it('carries first-touch utms', () => {
      const url = loginUrl({
        cta: 'toolbar-mobile:sign-in',
        pathname: '/pricing',
        attribution: {
          landing: '/pdf',
          utm_source: 'test',
          utm_medium: 'cpc',
          utm_campaign: 'launch',
          utm_content: 'banner',
          utm_term: 'pdf api'
        }
      })
      expect(query(url)).toEqual({
        from: '/pdf',
        product: 'pdf',
        utm_source: 'test',
        utm_medium: 'cpc',
        utm_campaign: 'launch',
        utm_content: 'banner',
        utm_term: 'pdf api',
        cta: 'toolbar-mobile:sign-in'
      })
    })

    it('falls back to the current url utms when the store has none', () => {
      const url = loginUrl({
        cta: 'toolbar:sign-in',
        pathname: '/screenshot',
        search: '?utm_source=test&utm_medium=cpc'
      })
      expect(url).toBe(
        `${LOGIN}?from=/screenshot&product=screenshot&utm_source=test&utm_medium=cpc&cta=toolbar:sign-in`
      )
    })

    it('never sends ref, even from a legacy store with a referrer', () => {
      const url = loginUrl({
        cta: 'toolbar:sign-in',
        pathname: '/',
        attribution: {
          landing: '/',
          referrer: 'https://news.ycombinator.com/item'
        }
      })
      expect(query(url)).not.toHaveProperty('ref')
      expect(query(url)).not.toHaveProperty('referrer')
      expect(url).not.toContain('news.ycombinator.com')
    })

    it('caps every value at 200 characters', () => {
      const long = 'x'.repeat(500)
      const url = loginUrl({
        cta: long,
        pathname: `/${long}`,
        attribution: { landing: `/${long}`, utm_source: long, utm_term: long }
      })
      Object.values(query(url)).forEach(value =>
        expect(value.length).toBeLessThanOrEqual(200)
      )
    })
  })

  describe('dashboardUrl', () => {
    it('only adds from when nothing else is known', () => {
      expect(dashboardUrl('/login', { pathname: undefined })).toBe(
        `${LOGIN}?from=/`
      )
    })
  })

  describe('dashboardPathFromHref', () => {
    it('sends the dashboard root to /login', () => {
      expect(dashboardPathFromHref('https://dashboard.microlink.io')).toBe(
        '/login'
      )
      expect(dashboardPathFromHref('https://dashboard.microlink.io/')).toBe(
        '/login'
      )
    })

    it('keeps any other dashboard path', () => {
      expect(
        dashboardPathFromHref('https://dashboard.microlink.io/signup')
      ).toBe('/signup')
      expect(
        dashboardPathFromHref('https://dashboard.microlink.io/billing/')
      ).toBe('/billing')
    })

    it('ignores everything that is not the dashboard', () => {
      expect(dashboardPathFromHref('/docs')).toBeUndefined()
      expect(dashboardPathFromHref('https://microlink.io')).toBeUndefined()
      expect(
        dashboardPathFromHref('https://dashboard.microlink.io.evil.test')
      ).toBeUndefined()
      expect(dashboardPathFromHref(undefined)).toBeUndefined()
    })
  })
})
