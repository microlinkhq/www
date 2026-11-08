const escAttr = value =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const safeDecode = value => {
  try {
    return decodeURIComponent(value)
  } catch {
    return value
  }
}

const YOUTUBE_VIDEO_ID_RE =
  /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/|live\/)|youtu\.be\/)([\w-]{11})/i

const youtubeIframeHtml = videoId =>
  `<div style="left:0;width:100%;height:0;position:relative;padding-bottom:56.25%"><iframe src="https://www.youtube.com/embed/${videoId}?rel=0" style="top:0;left:0;width:100%;height:100%;position:absolute;border:0" allowfullscreen scrolling="no" allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *;" referrerpolicy="strict-origin"></iframe></div>`

const buildYouTubeResponse = (url, videoId) => ({
  url,
  title: 'YouTube video',
  description: '',
  publisher: 'YouTube',
  image: {
    url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    palette: ['#FF0000', '#0F0F0F']
  },
  logo: {
    url: 'https://www.youtube.com/s/desktop/47009d78/img/favicon_144x144.png'
  },
  iframe: {
    html: youtubeIframeHtml(videoId),
    scripts: []
  }
})

const NYTIMES_DOMAIN_RE = /(?:^|\.)nytimes\.com$/i
const NYTIMES_OEMBED_ENDPOINT = 'https://www.nytimes.com/svc/oembed/json/'
const NYTIMES_DEFAULT_IMAGE =
  'https://static01.nyt.com/newsgraphics/images/icons/defaultPromoCrop.png'
const NYTIMES_LOGO =
  'https://static01.nyt.com/images/icons/t_logo_291_black.png'
const NYTIMES_PUBLISHED_SUFFIX_RE = /\s*\(Published \d{4}\)\s*$/i
const NYTIMES_BYLINE_PREFIX_RE = /^by\s+/i
const LONG_DATE_RE = /^([a-z]+)\s+(\d{1,2}),\s+(\d{4})$/i
const MONTHS = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december'
]

const humanizeSlug = slug =>
  slug
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase())

const titleFromPath = pathname => {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length === 0) return ''
  return humanizeSlug(segments[segments.length - 1])
}

const parseLongDate = value => {
  const match = String(value ?? '')
    .trim()
    .match(LONG_DATE_RE)
  if (!match) return null
  const monthIndex = MONTHS.indexOf(match[1].toLowerCase())
  if (monthIndex === -1) return null
  return new Date(Number(match[3]), monthIndex, Number(match[2])).toISOString()
}

const cleanText = value => String(value ?? '').trim()

const buildNYTimesResponse = (url, parsed) => ({
  url,
  title: titleFromPath(parsed.pathname) || 'The New York Times',
  description: '',
  publisher: 'The New York Times',
  image: {
    url: NYTIMES_DEFAULT_IMAGE,
    palette: ['#000000', '#ffffff']
  },
  logo: {
    url: NYTIMES_LOGO
  }
})

const mergeNYTimesOEmbed = (fallback, oembed) => {
  const title = cleanText(oembed?.title).replace(
    NYTIMES_PUBLISHED_SUFFIX_RE,
    ''
  )
  const author = cleanText(oembed?.author_name).replace(
    NYTIMES_BYLINE_PREFIX_RE,
    ''
  )
  const date = parseLongDate(oembed?.publication_date)
  const imageUrl = cleanText(oembed?.thumbnail_url)
  return {
    ...fallback,
    title: title || fallback.title,
    description: cleanText(oembed?.summary) || fallback.description,
    ...(author && { author }),
    ...(date && { date }),
    image: { ...fallback.image, url: imageUrl || fallback.image.url }
  }
}

const resolveNYTimesResponse = async (url, parsed, { fetchImpl, timeout }) => {
  const fallback = buildNYTimesResponse(url, parsed)
  try {
    const response = await fetchImpl(
      `${NYTIMES_OEMBED_ENDPOINT}?url=${encodeURIComponent(url)}`,
      { signal: AbortSignal.timeout(timeout) }
    )
    if (!response.ok) return fallback
    return mergeNYTimesOEmbed(fallback, await response.json())
  } catch {
    return fallback
  }
}

const FIGMA_EMBED_HOST_RE = /^embed\.figma\.com$/i

const figmaIframeHtml = url =>
  `<div style="position:relative;width:100%;height:0;padding-bottom:56.25%;overflow:hidden"><iframe src="${escAttr(
    url
  )}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0" allowfullscreen></iframe></div>`

const titleFromFigmaPath = pathname => {
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length >= 3) {
    return humanizeSlug(safeDecode(segments[2]))
  }
  return ''
}

const buildFigmaResponse = (url, parsed) => ({
  url,
  title: titleFromFigmaPath(parsed.pathname) || 'Figma file',
  description: '',
  publisher: 'Figma',
  image: {
    url: 'https://cdn.sanity.io/images/599r6htc/regionalized/342e17642c7afa81206490b0dd21c3e5724ae040-2400x1260.png?w=1200&q=70&fit=max&auto=format',
    palette: ['#1E1E1E', '#F24E1E']
  },
  logo: {
    url: 'https://static.figma.com/app/icon/2/icon-256.png'
  },
  iframe: {
    html: figmaIframeHtml(url),
    scripts: []
  }
})

const MEDIUM_DOMAIN_RE = /(?:^|\.)medium\.com$/i

const buildMediumResponse = url => ({
  url,
  title: 'Medium: Read and write stories.',
  description:
    'On Medium, anyone can share insightful perspectives, useful knowledge, and life wisdom with the world.',
  publisher: 'Medium',
  author: 'Medium',
  image: {
    url: 'https://miro.medium.com/v2/da:true/167cff2a3d17ac1e64d0762539978f2d54c0058886e8b3c8a03a725a83012ec0',
    palette: ['#000000', '#1A8917']
  },
  logo: {
    url: 'https://miro.medium.com/v2/resize:fill:190:190/10fd5c419ac61637245384e7099e131627900034828f4f386bdaa47a74eae156'
  }
})

const SUNO_DOMAIN_RE = /^(?:www\.)?suno\.com$/i
const SUNO_SONG_PATH_RE = /^\/song\/([^/?#]+)/i

const sunoIframeHtml = songId =>
  `<iframe src="https://suno.com/embed/song/${songId}" style="width:100%;max-width:760px;height:240px;border:0;border-radius:8px;display:block" allow="autoplay" allowfullscreen></iframe>`

const buildSunoResponse = (url, parsed) => {
  const songMatch = parsed && parsed.pathname.match(SUNO_SONG_PATH_RE)
  const songId = songMatch ? songMatch[1] : null
  const base = {
    url,
    title: 'Suno | AI Music Generator',
    description:
      'Create stunning original music for free in seconds using our AI generator. Make your own masterpieces, share with friends, and discover music from artists worldwide.',
    publisher: 'Suno',
    author: 'Suno',
    image: {
      url: 'https://cdn-o.suno.com/meta-preview.jpg',
      palette: ['#0F0F0F', '#A78BFA']
    },
    logo: {
      url: 'https://cdn-o.suno.com/favicon-512x512.png'
    }
  }
  if (!songId) return base
  return {
    ...base,
    iframe: {
      html: sunoIframeHtml(songId),
      scripts: []
    }
  }
}

const PROVIDERS = [
  {
    name: 'youtube',
    test: url => {
      const m = url.match(YOUTUBE_VIDEO_ID_RE)
      return m ? { videoId: m[1] } : null
    },
    build: (url, ctx) => buildYouTubeResponse(url, ctx.videoId)
  },
  {
    name: 'nytimes',
    test: url => {
      let parsed
      try {
        parsed = new URL(url)
      } catch {
        return null
      }
      return NYTIMES_DOMAIN_RE.test(parsed.hostname) ? { parsed } : null
    },
    build: (url, ctx) => buildNYTimesResponse(url, ctx.parsed),
    resolve: (url, ctx, options) =>
      resolveNYTimesResponse(url, ctx.parsed, options)
  },
  {
    name: 'figma',
    test: url => {
      let parsed
      try {
        parsed = new URL(url)
      } catch {
        return null
      }
      return FIGMA_EMBED_HOST_RE.test(parsed.hostname) ? { parsed } : null
    },
    build: (url, ctx) => buildFigmaResponse(url, ctx.parsed)
  },
  {
    name: 'suno',
    test: url => {
      let parsed
      try {
        parsed = new URL(url)
      } catch {
        return null
      }
      return SUNO_DOMAIN_RE.test(parsed.hostname) ? { parsed } : null
    },
    build: (url, ctx) => buildSunoResponse(url, ctx.parsed)
  },
  {
    name: 'medium',
    test: url => {
      let parsed
      try {
        parsed = new URL(url)
      } catch {
        return null
      }
      return MEDIUM_DOMAIN_RE.test(parsed.hostname) ? {} : null
    },
    build: url => buildMediumResponse(url)
  }
]

const LOCAL_RESOLVE_TIMEOUT_MS = 5000

const matchProvider = url => {
  if (!url || typeof url !== 'string') return null
  for (const provider of PROVIDERS) {
    const ctx = provider.test(url)
    if (ctx) return { provider, ctx }
  }
  return null
}

export const buildLocalEmbedResponse = url => {
  const match = matchProvider(url)
  return match ? match.provider.build(url, match.ctx) : null
}

export const resolveLocalEmbedResponse = async (
  url,
  {
    fetch: fetchImpl = globalThis.fetch,
    timeout = LOCAL_RESOLVE_TIMEOUT_MS
  } = {}
) => {
  const match = matchProvider(url)
  if (!match) return null
  const { provider, ctx } = match
  return provider.resolve
    ? provider.resolve(url, ctx, { fetchImpl, timeout })
    : provider.build(url, ctx)
}
