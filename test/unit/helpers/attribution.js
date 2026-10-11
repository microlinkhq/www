import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  ATTRIBUTION_MAX_AGE_MS,
  ATTRIBUTION_STORAGE_KEY,
  clearAttribution,
  getAttribution,
  normalizePath,
  parseUtms,
  recordAttribution
} from '../../../src/helpers/attribution.js'

const NOW = Date.parse('2026-10-07T10:00:00.000Z')

const createStorage = (initial = {}) => {
  const data = { ...initial }
  return {
    data,
    getItem: key => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = String(value)
    },
    removeItem: key => {
      delete data[key]
    }
  }
}

const throwingStorage = () => ({
  getItem: () => {
    throw new Error('SecurityError')
  },
  setItem: () => {
    throw new Error('QuotaExceededError')
  },
  removeItem: () => {
    throw new Error('SecurityError')
  }
})

const location = (pathname, search = '') => ({
  pathname,
  search,
  hostname: 'microlink.io'
})

const stored = storage => JSON.parse(storage.data[ATTRIBUTION_STORAGE_KEY])

describe('attribution', () => {
  beforeEach(() => {
    vi.stubGlobal('window', { localStorage: createStorage() })
  })

  afterEach(() => vi.unstubAllGlobals())

  describe('normalizePath', () => {
    it('keeps the path only, without host, query or trailing slash', () => {
      expect(normalizePath('/screenshot/')).toBe('/screenshot')
      expect(normalizePath('/screenshot?utm_source=x#hero')).toBe('/screenshot')
      expect(normalizePath('/')).toBe('/')
      expect(normalizePath(undefined)).toBe('/')
      expect(normalizePath('https://evil.test/x')).toBe('/')
    })

    it('caps the value at 200 characters', () => {
      expect(normalizePath(`/${'a'.repeat(400)}`)).toHaveLength(200)
    })
  })

  describe('parseUtms', () => {
    it('reads only the five utm params and trims them', () => {
      expect(
        parseUtms('?utm_source= google &utm_medium=cpc&utm_foo=bar&gclid=1')
      ).toEqual({ utm_source: 'google', utm_medium: 'cpc' })
    })

    it('drops empty values and caps long ones', () => {
      const utms = parseUtms(`?utm_source=&utm_campaign=${'c'.repeat(300)}`)
      expect(utms.utm_source).toBeUndefined()
      expect(utms.utm_campaign).toHaveLength(200)
    })
  })

  describe('recordAttribution', () => {
    it('stores the first touch with landing, utms and timestamp', () => {
      const storage = createStorage()
      recordAttribution({
        location: location('/screenshot/', '?utm_source=google&utm_medium=cpc'),
        now: NOW,
        storage
      })
      expect(stored(storage)).toEqual({
        landing: '/screenshot',
        utm_source: 'google',
        utm_medium: 'cpc',
        first_seen_at: '2026-10-07T10:00:00.000Z'
      })
    })

    it('never stores the referrer', () => {
      const storage = createStorage()
      vi.stubGlobal('document', {
        referrer: 'https://news.ycombinator.com/item'
      })
      recordAttribution({ location: location('/pdf'), now: NOW, storage })
      vi.unstubAllGlobals()
      expect(stored(storage)).not.toHaveProperty('referrer')
    })

    it('still reads a legacy entry that has a referrer field', () => {
      const legacy = {
        landing: '/pdf',
        referrer: 'https://www.google.com/',
        first_seen_at: new Date(NOW).toISOString()
      }
      const storage = createStorage({
        [ATTRIBUTION_STORAGE_KEY]: JSON.stringify(legacy)
      })
      expect(getAttribution({ now: NOW, storage })).toMatchObject({
        landing: '/pdf'
      })
      recordAttribution({
        location: location('/screenshot'),
        now: NOW,
        storage
      })
      expect(stored(storage).landing).toBe('/pdf')
    })

    it('keeps the first touch on later visits', () => {
      const storage = createStorage()
      recordAttribution({
        location: location('/screenshot', '?utm_source=google'),
        now: NOW,
        storage
      })
      recordAttribution({
        location: location('/pdf', '?utm_source=twitter'),
        now: NOW + 1000,
        storage
      })
      expect(stored(storage)).toMatchObject({
        landing: '/screenshot',
        utm_source: 'google'
      })
    })

    it('adds utms to a utm-less entry without touching the landing', () => {
      const storage = createStorage()
      recordAttribution({
        location: location('/screenshot'),
        now: NOW,
        storage
      })
      recordAttribution({
        location: location('/pdf', '?utm_source=newsletter&utm_campaign=oct'),
        now: NOW + 1000,
        storage
      })
      expect(stored(storage)).toMatchObject({
        landing: '/screenshot',
        utm_source: 'newsletter',
        utm_campaign: 'oct',
        first_seen_at: '2026-10-07T10:00:00.000Z'
      })
    })

    it('never overwrites existing utms', () => {
      const storage = createStorage()
      recordAttribution({
        location: location('/screenshot', '?utm_source=google'),
        now: NOW,
        storage
      })
      recordAttribution({
        location: location('/pdf', '?utm_source=bing&utm_medium=cpc'),
        now: NOW + 1000,
        storage
      })
      expect(stored(storage)).toMatchObject({ utm_source: 'google' })
      expect(stored(storage)).not.toHaveProperty('utm_medium')
    })

    it('starts over after 30 days', () => {
      const storage = createStorage()
      recordAttribution({
        location: location('/screenshot'),
        now: NOW,
        storage
      })
      recordAttribution({
        location: location('/pdf'),
        now: NOW + ATTRIBUTION_MAX_AGE_MS + 1,
        storage
      })
      expect(stored(storage).landing).toBe('/pdf')
    })

    it('does not write when consent was denied', () => {
      vi.stubGlobal('window', {
        localStorage: createStorage({ 'microlink-cookie-consent': 'denied' })
      })
      const storage = createStorage()
      expect(
        recordAttribution({
          location: location('/screenshot'),
          now: NOW,
          storage
        })
      ).toBeUndefined()
      expect(storage.data).toEqual({})
    })

    it('survives storage that throws', () => {
      expect(() =>
        recordAttribution({
          location: location('/screenshot'),
          now: NOW,
          storage: throwingStorage()
        })
      ).not.toThrow()
    })

    it('returns undefined without a window', () => {
      vi.stubGlobal('window', undefined)
      expect(recordAttribution()).toBeUndefined()
    })
  })

  describe('getAttribution', () => {
    it('returns the stored entry while it is fresh', () => {
      const storage = createStorage()
      recordAttribution({ location: location('/markdown'), now: NOW, storage })
      expect(getAttribution({ now: NOW + 1000, storage })).toMatchObject({
        landing: '/markdown'
      })
    })

    it('expires and removes entries older than 30 days', () => {
      const storage = createStorage()
      recordAttribution({ location: location('/markdown'), now: NOW, storage })
      expect(
        getAttribution({ now: NOW + ATTRIBUTION_MAX_AGE_MS + 1, storage })
      ).toBeUndefined()
      expect(storage.data).toEqual({})
    })

    it('ignores corrupted entries', () => {
      const storage = createStorage({ [ATTRIBUTION_STORAGE_KEY]: '{not json' })
      expect(getAttribution({ now: NOW, storage })).toBeUndefined()
    })

    it('returns undefined when storage throws or is missing', () => {
      expect(
        getAttribution({ now: NOW, storage: throwingStorage() })
      ).toBeUndefined()
      vi.stubGlobal('window', undefined)
      expect(getAttribution()).toBeUndefined()
    })
  })

  describe('clearAttribution', () => {
    it('removes the entry and tolerates storage errors', () => {
      const storage = createStorage()
      recordAttribution({ location: location('/markdown'), now: NOW, storage })
      clearAttribution({ storage })
      expect(storage.data).toEqual({})
      expect(() =>
        clearAttribution({ storage: throwingStorage() })
      ).not.toThrow()
    })
  })
})
