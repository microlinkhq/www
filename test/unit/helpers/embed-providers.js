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
    const card = buildLocalEmbedResponse(ARTICLE_URL)
    expect(data).toMatchObject({
      url: ARTICLE_URL,
      title: 'The 1619 Project',
      description: 'American slavery began 400 years ago this month.',
      author: 'Nikole Hannah-Jones',
      publisher: 'The New York Times',
      image: { url: OEMBED_PAYLOAD.thumbnail_url, palette: card.image.palette },
      logo: card.logo
    })
  })

  it('keeps the publication day in the viewer timezone', async () => {
    const fetch = vi.fn(async () => jsonResponse(OEMBED_PAYLOAD))
    const { date } = await resolveLocalEmbedResponse(ARTICLE_URL, { fetch })
    expect(formatDate(date)).toBe(formatDate(new Date(2019, 7, 14)))
  })

  it.each([
    ['January', 0],
    ['February', 1],
    ['March', 2],
    ['April', 3],
    ['May', 4],
    ['June', 5],
    ['July', 6],
    ['August', 7],
    ['September', 8],
    ['October', 9],
    ['November', 10],
    ['December', 11]
  ])('parses a %s publication date', async (month, monthIndex) => {
    const fetch = vi.fn(async () =>
      jsonResponse({
        ...OEMBED_PAYLOAD,
        publication_date: `${month} 14, 2019`
      })
    )
    const { date } = await resolveLocalEmbedResponse(ARTICLE_URL, { fetch })
    expect(formatDate(date)).toBe(formatDate(new Date(2019, monthIndex, 14)))
  })

  it('parses a padded single-digit publication day', async () => {
    const fetch = vi.fn(async () =>
      jsonResponse({
        ...OEMBED_PAYLOAD,
        publication_date: '  August 4, 2019  '
      })
    )
    const { date } = await resolveLocalEmbedResponse(ARTICLE_URL, { fetch })
    expect(formatDate(date)).toBe(formatDate(new Date(2019, 7, 4)))
  })

  it('keeps a leap-day publication date', async () => {
    const fetch = vi.fn(async () =>
      jsonResponse({
        ...OEMBED_PAYLOAD,
        publication_date: 'February 29, 2020'
      })
    )
    const { date } = await resolveLocalEmbedResponse(ARTICLE_URL, { fetch })
    expect(formatDate(date)).toBe(formatDate(new Date(2020, 1, 29)))
  })

  it.each([
    'February 29, 2019',
    'February 31, 2019',
    'April 31, 2019',
    'August 0, 2019',
    'August 00, 2019',
    'August 32, 2019'
  ])('omits an impossible publication date (%s)', async publicationDate => {
    const fetch = vi.fn(async () =>
      jsonResponse({ ...OEMBED_PAYLOAD, publication_date: publicationDate })
    )
    const data = await resolveLocalEmbedResponse(ARTICLE_URL, { fetch })
    expect(data).not.toHaveProperty('date')
  })

  it('omits a publication month it does not recognize', async () => {
    const fetch = vi.fn(async () =>
      jsonResponse({ ...OEMBED_PAYLOAD, publication_date: 'Smarch 1, 2019' })
    )
    const data = await resolveLocalEmbedResponse(ARTICLE_URL, { fetch })
    expect(data).not.toHaveProperty('date')
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

  it('matches an apex nytimes.com article', async () => {
    const fetch = vi.fn(async () => jsonResponse(OEMBED_PAYLOAD))
    const url = 'https://nytimes.com/2024/01/02/us/politics/example.html'
    const data = await resolveLocalEmbedResponse(url, { fetch })
    expect(data.url).toBe(url)
    expect(fetch).toHaveBeenCalled()
  })

  it.each([
    'https://notnytimes.com/2024/01/02/us/story.html',
    'https://nytimes.com.evil.com/2024/01/02/us/story.html',
    'https://evilnytimes.com/story.html'
  ])('ignores %s', async url => {
    const fetch = vi.fn()
    expect(await resolveLocalEmbedResponse(url, { fetch })).toBe(null)
    expect(fetch).not.toHaveBeenCalled()
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

  it('trims oEmbed text before filling the card', async () => {
    const fetch = vi.fn(async () =>
      jsonResponse({
        title: '  The 1619 Project (Published 2019)  ',
        summary: '  hello  ',
        author_name: '  By Nikole Hannah-Jones  ',
        publication_date: 'August 14, 2019',
        thumbnail_url: '   '
      })
    )
    const data = await resolveLocalEmbedResponse(ARTICLE_URL, { fetch })
    expect(data.title).toBe('The 1619 Project')
    expect(data.description).toBe('hello')
    expect(data.author).toBe('Nikole Hannah-Jones')
    expect(data.image.url).toBe(buildLocalEmbedResponse(ARTICLE_URL).image.url)
  })

  it('keeps the static card when oEmbed omits its fields', async () => {
    const fetch = vi.fn(async () => jsonResponse({}))
    const url = 'https://www.nytimes.com/'
    const data = await resolveLocalEmbedResponse(url, { fetch })
    const card = buildLocalEmbedResponse(url)
    expect(data.title).toBe('The New York Times')
    expect(data.description).toBe('')
    expect(data).not.toHaveProperty('author')
    expect(data).not.toHaveProperty('date')
    expect(data.image).toEqual(card.image)
    expect(data.logo).toEqual(card.logo)
  })

  it.each(['By', 'By '])('drops a byline that is only %j', async authorName => {
    const fetch = vi.fn(async () =>
      jsonResponse({ ...OEMBED_PAYLOAD, author_name: authorName })
    )
    const data = await resolveLocalEmbedResponse(ARTICLE_URL, { fetch })
    expect(data).not.toHaveProperty('author')
  })

  it('keeps an author whose name starts with by', async () => {
    const fetch = vi.fn(async () =>
      jsonResponse({ ...OEMBED_PAYLOAD, author_name: 'Byron Smith' })
    )
    const data = await resolveLocalEmbedResponse(ARTICLE_URL, { fetch })
    expect(data.author).toBe('Byron Smith')
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
