import { describe, expect, it } from 'vitest'

import {
  authorsByPathname,
  cardMetadata,
  decodeEntities,
  inlineAvatars,
  metaContent,
  pageMetadata,
  withoutTrailingSlash
} from '../../../src/helpers/og-card-metadata.js'

const meta = (property, content) =>
  `<meta property="${property}" content="${content}" data-gatsby-head="true"/>`

const BLOG_HTML = [
  meta('og:title', 'Optimizing Microlink Functions — Microlink Blog'),
  meta('og:description', 'Two speedups &amp; a bug hunt'),
  meta('article:published_time', '2026-10-01T00:00:00.000Z'),
  meta('article:modified_time', '2026-10-02T00:00:00.000Z')
].join('')

const AUTHORS = [
  { key: 'kiko', name: 'Kiko Beats', avatar: 'https://avatars.test/kiko' },
  { key: 'joseba', name: 'Joseba Legarreta', avatar: undefined }
]

const imageResponse = (contentType, body = 'avatar') => ({
  ok: true,
  headers: new Headers({ 'content-type': contentType }),
  arrayBuffer: async () => new TextEncoder().encode(body).buffer
})

describe('decodeEntities', () => {
  it('decodes named, decimal and hex entities', () => {
    expect(decodeEntities('&lt;a&gt; &quot;b&quot; &#39;c&#x27; &amp;')).toBe(
      '<a> "b" \'c\' &'
    )
  })

  it('decodes astral code points and drops out-of-range ones', () => {
    expect(decodeEntities('&#x1F680;')).toBe('🚀')
    expect(decodeEntities('a&#x110000;b')).toBe('ab')
  })

  it('does not double-decode an escaped ampersand', () => {
    expect(decodeEntities('&amp;lt;')).toBe('&lt;')
  })
})

describe('metaContent', () => {
  it('reads and decodes a meta property', () => {
    expect(metaContent(BLOG_HTML, 'og:description')).toBe(
      'Two speedups & a bug hunt'
    )
  })

  it('returns undefined when the property is absent', () => {
    expect(metaContent(BLOG_HTML, 'og:video')).toBe(undefined)
    expect(metaContent('', 'og:title')).toBe(undefined)
  })
})

describe('pageMetadata', () => {
  it('returns only the title and description', () => {
    expect(pageMetadata(BLOG_HTML)).toEqual({
      title: 'Optimizing Microlink Functions — Microlink Blog',
      description: 'Two speedups & a bug hunt'
    })
  })
})

describe('cardMetadata', () => {
  it('carries title, description, date and authors', () => {
    const authors = [{ name: 'Kiko Beats', avatar: 'data:image/png;base64,' }]
    expect(cardMetadata({ html: BLOG_HTML, authors })).toEqual({
      title: 'Optimizing Microlink Functions — Microlink Blog',
      description: 'Two speedups & a bug hunt',
      date: '2026-10-02T00:00:00.000Z',
      authors
    })
  })

  it('falls back to the published date when there is no modified date', () => {
    const html = meta('article:published_time', '2026-10-01T00:00:00.000Z')
    expect(cardMetadata({ html }).date).toBe('2026-10-01T00:00:00.000Z')
  })

  it('leaves date and authors undefined for a page without them', () => {
    const card = cardMetadata({ html: meta('og:title', 'Pricing') })
    expect(card.date).toBe(undefined)
    expect(card.authors).toBe(undefined)
  })
})

describe('withoutTrailingSlash', () => {
  it('strips trailing slashes and keeps the root', () => {
    expect(withoutTrailingSlash('/blog/post/')).toBe('/blog/post')
    expect(withoutTrailingSlash('/blog/post')).toBe('/blog/post')
    expect(withoutTrailingSlash('/')).toBe('/')
  })
})

describe('authorsByPathname', () => {
  it('maps a post slug to its authors in frontmatter order', () => {
    const map = authorsByPathname({
      posts: [{ slug: '/blog/post/', authorKeys: ['joseba', 'kiko'] }],
      authors: AUTHORS
    })
    expect(map.get('/blog/post')).toEqual([
      { name: 'Joseba Legarreta', avatar: undefined },
      { name: 'Kiko Beats', avatar: 'https://avatars.test/kiko' }
    ])
  })

  it('skips unknown author keys and posts without authors', () => {
    const map = authorsByPathname({
      posts: [
        { slug: '/blog/ghost/', authorKeys: ['nobody'] },
        { slug: '/docs/api/', authorKeys: null },
        { slug: undefined, authorKeys: ['kiko'] },
        { slug: '/blog/mixed/', authorKeys: ['nobody', 'kiko'] }
      ],
      authors: AUTHORS
    })
    expect(map.has('/blog/ghost')).toBe(false)
    expect(map.has('/')).toBe(false)
    expect(map.has('/docs/api')).toBe(false)
    expect(map.get('/blog/mixed')).toEqual([
      { name: 'Kiko Beats', avatar: 'https://avatars.test/kiko' }
    ])
  })
})

describe('inlineAvatars', () => {
  it('replaces each avatar url with a data uri, fetching once per author', async () => {
    const requested = []
    const fetchImage = async url => {
      requested.push(url)
      return imageResponse('image/jpeg; charset=binary')
    }
    const [kiko, joseba] = await inlineAvatars(AUTHORS, { fetchImage })
    expect(kiko).toEqual({
      key: 'kiko',
      name: 'Kiko Beats',
      avatar: `data:image/jpeg;base64,${Buffer.from('avatar').toString(
        'base64'
      )}`
    })
    expect(joseba.avatar).toBe(undefined)
    expect(requested).toEqual(['https://avatars.test/kiko'])
  })

  it('gives every request an abort signal so a stalled host cannot hang the build', async () => {
    const signals = []
    const fetchImage = async (_, { signal }) => {
      signals.push(signal)
      return imageResponse('image/png')
    }
    await inlineAvatars(AUTHORS, { fetchImage })
    expect(signals).toHaveLength(1)
    expect(signals[0]).toBeInstanceOf(AbortSignal)
  })

  it('drops the avatar and reports why when it cannot be inlined', async () => {
    const failures = [
      [async () => ({ ok: false, status: 429 }), 'responded with 429'],
      [
        async () => {
          throw new Error('offline')
        },
        'offline'
      ],
      [async () => imageResponse('text/html'), 'is not an image (text/html)']
    ]
    for (const [fetchImage, reason] of failures) {
      const reported = []
      const [kiko] = await inlineAvatars(AUTHORS, {
        fetchImage,
        onError: (author, error) => reported.push([author.key, error.message])
      })
      expect(kiko.name).toBe('Kiko Beats')
      expect(kiko.avatar).toBe(undefined)
      expect(reported).toEqual([['kiko', reason]])
    }
  })

  it('still drops the avatar when no error handler is given', async () => {
    const [kiko] = await inlineAvatars(AUTHORS, {
      fetchImage: async () => ({ ok: false, status: 500 })
    })
    expect(kiko.avatar).toBe(undefined)
  })
})
