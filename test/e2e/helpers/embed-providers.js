import { describe, expect, test } from 'vitest'

import {
  buildLocalEmbedResponse,
  resolveLocalEmbedResponse
} from '../../../src/helpers/embed-providers.js'

const REQUEST_TIMEOUT = 15_000

const ARTICLE_URL =
  'https://www.nytimes.com/interactive/2019/08/14/magazine/1619-america-slavery.html'

describe('nytimes oEmbed endpoint', () => {
  test(
    'serves cross-origin article metadata the embed tool relies on',
    async () => {
      const response = await fetch(
        `https://www.nytimes.com/svc/oembed/json/?url=${encodeURIComponent(
          ARTICLE_URL
        )}`,
        { headers: { origin: 'https://microlink.io' } }
      )
      expect(response.status).toBe(200)
      expect(response.headers.get('access-control-allow-origin')).toBe('*')
    },
    REQUEST_TIMEOUT
  )

  test(
    'resolves a real article into a populated preview card',
    async () => {
      const data = await resolveLocalEmbedResponse(ARTICLE_URL)
      expect(data.title).toBe('The 1619 Project')
      expect(data.description.length).toBeGreaterThan(0)
      expect(new Date(data.date).getDate()).toBe(14)
      expect(data.image.url).toMatch(/^https:\/\/static01\.nyt\.com\/images\//)
    },
    REQUEST_TIMEOUT
  )

  test(
    'serves the static card image and logo',
    async () => {
      const { image, logo } = buildLocalEmbedResponse(ARTICLE_URL)
      for (const url of [image.url, logo.url]) {
        const response = await fetch(url, { method: 'HEAD' })
        expect(response.status, url).toBe(200)
        expect(response.headers.get('content-type'), url).toMatch(/^image\//)
      }
    },
    REQUEST_TIMEOUT
  )
})
