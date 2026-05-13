const FAVICON_SERVICE = 'https://www.google.com/s2/favicons?sz=128&domain='

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
    url: `${FAVICON_SERVICE}youtube.com`
  },
  iframe: {
    html: youtubeIframeHtml(videoId),
    scripts: []
  }
})

const NYTIMES_DOMAIN_RE = /^(?:www\.)?nytimes\.com$/i

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

const buildNYTimesResponse = (url, parsed) => ({
  url,
  title: titleFromPath(parsed.pathname) || 'The New York Times',
  description: '',
  publisher: 'The New York Times',
  image: {
    url: '',
    palette: ['#000000', '#ffffff']
  },
  logo: {
    url: `${FAVICON_SERVICE}nytimes.com`
  }
})

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
    build: (url, ctx) => buildNYTimesResponse(url, ctx.parsed)
  }
]

export const buildLocalEmbedResponse = url => {
  if (!url || typeof url !== 'string') return null
  for (const provider of PROVIDERS) {
    const ctx = provider.test(url)
    if (ctx) return provider.build(url, ctx)
  }
  return null
}
