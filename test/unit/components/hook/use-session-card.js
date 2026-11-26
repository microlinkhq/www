import { describe, expect, test, vi } from 'vitest'
import {
  FAILED,
  KEYLESS,
  cardOptions,
  loadSessionCard
} from '../../../../src/components/hook/use-session-card'

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
