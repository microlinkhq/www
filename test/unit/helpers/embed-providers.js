import { describe, expect, it } from 'vitest'

import { buildLocalEmbedResponse } from '../../../src/helpers/embed-providers.js'

const NYTIMES_URLS = [
  'https://www.nytimes.com/interactive/2019/08/14/magazine/1619-america-slavery.html',
  'https://nytimes.com/2024/01/01/world/example.html',
  'https://cooking.nytimes.com/recipes/1017518-panzanella'
]

describe('buildLocalEmbedResponse', () => {
  it.each(NYTIMES_URLS)('leaves %s to the Microlink API', url => {
    expect(buildLocalEmbedResponse(url)).toBeNull()
  })

  it('still answers YouTube videos locally', () => {
    const response = buildLocalEmbedResponse(
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    )
    expect(response.publisher).toBe('YouTube')
    expect(response.iframe.html).toContain('youtube.com/embed/dQw4w9WgXcQ')
  })

  it('returns null for invalid input', () => {
    expect(buildLocalEmbedResponse('')).toBeNull()
    expect(buildLocalEmbedResponse(undefined)).toBeNull()
    expect(buildLocalEmbedResponse('not a url')).toBeNull()
  })
})
