import { describe, expect, test, vi } from 'vitest'
import {
  FAILED,
  cardOptions,
  isLazy,
  loadCardData
} from '../../../../src/components/hook/use-card-data'

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
        force: true,
        ttl: '1d'
      })
    ).toEqual({
      audio: false,
      iframe: false,
      screenshot: true,
      video: false,
      palette: true,
      force: true,
      ttl: '1d'
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
})
