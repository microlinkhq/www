import { describe, expect, it, vi } from 'vitest'

import {
  buildLocalEmbedResponse,
  resolveLocalEmbedResponse
} from '../../../src/helpers/embed-providers.js'
import { formatDate } from '../../../src/helpers/link-card.js'

const ARTICLE_URL =
  'https://www.nytimes.com/interactive/2019/08/14/magazine/1619-america-slavery.html'

const OEMBED_PAYLOAD = {
  type: 'rich',
  title: 'The 1619 Project (Published 2019)',
  summary: 'American slavery began 400 years ago this month.',
  author_name: 'By Nikole Hannah-Jones',
  publication_date: 'August 14, 2019',
  url: ARTICLE_URL,
  provider_name: 'The New York Times',
  thumbnail_url:
    'https://static01.nyt.com/images/2019/08/18/magazine/18mag-1619landing-hp1/18mag-1619landing-hp1-largeHorizontalJumbo.jpg'
}

const jsonResponse = (body, { ok = true } = {}) => ({
  ok,
  json: async () => body
})

describe('resolveLocalEmbedResponse for The New York Times', () => {
  it('reads the article metadata from the nytimes oEmbed endpoint', async () => {
    const fetch = vi.fn(async () => jsonResponse(OEMBED_PAYLOAD))
    const data = await resolveLocalEmbedResponse(ARTICLE_URL, { fetch })

    expect(fetch).toHaveBeenCalledWith(
      `https://www.nytimes.com/svc/oembed/json/?url=${encodeURIComponent(
        ARTICLE_URL
      )}`,
      { signal: expect.any(AbortSignal) }
    )
    expect(data).toMatchObject({
      url: ARTICLE_URL,
      title: 'The 1619 Project',
      description: 'American slavery began 400 years ago this month.',
      author: 'Nikole Hannah-Jones',
      publisher: 'The New York Times',
      image: { url: OEMBED_PAYLOAD.thumbnail_url }
    })
  })

  it('keeps the publication day in the viewer timezone', async () => {
    const fetch = vi.fn(async () => jsonResponse(OEMBED_PAYLOAD))
    const { date } = await resolveLocalEmbedResponse(ARTICLE_URL, { fetch })
    expect(formatDate(date)).toBe(formatDate(new Date(2019, 7, 14)))
  })

  it('matches nytimes subdomains such as cooking.nytimes.com', async () => {
    const fetch = vi.fn(async () =>
      jsonResponse({ ...OEMBED_PAYLOAD, title: 'Chocolate Chip Cookies' })
    )
    const data = await resolveLocalEmbedResponse(
      'https://cooking.nytimes.com/recipes/1015819-chocolate-chip-cookies',
      { fetch }
    )
    expect(data.title).toBe('Chocolate Chip Cookies')
  })

  it('keeps fallback fields when oEmbed returns blanks', async () => {
    const fetch = vi.fn(async () =>
      jsonResponse({
        title: ' (Published 2017)',
        summary: '',
        author_name: '',
        publication_date: 'not a date',
        thumbnail_url: ''
      })
    )
    const data = await resolveLocalEmbedResponse(
      'https://www.nytimes.com/section/technology',
      { fetch }
    )
    expect(data.title).toBe('Technology')
    expect(data.description).toBe('')
    expect(data).not.toHaveProperty('author')
    expect(data).not.toHaveProperty('date')
    expect(data.image.url).toMatch(/^https:\/\/static01\.nyt\.com\//)
  })

  it.each([
    ['a non-ok response', async () => jsonResponse({}, { ok: false })],
    [
      'a network failure',
      async () => {
        throw new TypeError('Failed to fetch')
      }
    ],
    [
      'an invalid json body',
      async () => ({
        ok: true,
        json: async () => {
          throw new SyntaxError('Unexpected token')
        }
      })
    ]
  ])('falls back to the static card on %s', async (_, impl) => {
    const data = await resolveLocalEmbedResponse(ARTICLE_URL, {
      fetch: vi.fn(impl)
    })
    expect(data).toEqual(buildLocalEmbedResponse(ARTICLE_URL))
  })

  it('gives up on a hanging oEmbed request and renders the static card', async () => {
    const fetch = vi.fn(
      (_, { signal }) =>
        new Promise((resolve, reject) => {
          signal.addEventListener('abort', () => reject(signal.reason))
        })
    )
    const data = await resolveLocalEmbedResponse(ARTICLE_URL, {
      fetch,
      timeout: 10
    })
    expect(data).toEqual(buildLocalEmbedResponse(ARTICLE_URL))
  })

  it('never renders an empty image in the static card', () => {
    expect(buildLocalEmbedResponse(ARTICLE_URL).image.url).toMatch(
      /^https:\/\//
    )
  })
})

describe('resolveLocalEmbedResponse for other providers', () => {
  it('returns null for urls no local provider handles', async () => {
    const fetch = vi.fn()
    expect(
      await resolveLocalEmbedResponse('https://example.com', { fetch })
    ).toBe(null)
    expect(fetch).not.toHaveBeenCalled()
  })

  it('builds synchronous providers without touching the network', async () => {
    const fetch = vi.fn()
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    expect(await resolveLocalEmbedResponse(url, { fetch })).toEqual(
      buildLocalEmbedResponse(url)
    )
    expect(fetch).not.toHaveBeenCalled()
  })

  it.each([undefined, null, '', 42])('returns null for %s', async value => {
    expect(await resolveLocalEmbedResponse(value)).toBe(null)
  })
})
