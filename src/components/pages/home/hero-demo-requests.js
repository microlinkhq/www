'use strict'

const FN_SNIPPET = "({ page }) => page.$$eval('a', els => els.map(a => a.href))"

const REQUEST_OPTS = {
  screenshot: { screenshot: true },
  animated: { screenshot: { animated: true } },
  preview: {},
  embed: { iframe: true },
  markdown: { data: { markdown: { attr: 'markdown' } } },
  html: { data: { html: { attr: 'html' } }, meta: false, ping: false },
  text: { data: { text: { attr: 'text' } }, meta: false, ping: false },
  metadata: {},
  lighthouse: {
    insights: { lighthouse: true, technologies: false },
    meta: false,
    ping: false
  },
  technologies: { insights: { lighthouse: false, technologies: true } },
  function: {
    function: FN_SNIPPET,
    meta: false,
    ping: false
  },
  search: {},
  pdf: { pdf: true },
  logo: { palette: true },
  video: { video: true },
  audio: { audio: true }
}

const DEMO_URLS = {
  screenshot: 'https://www.apple.com/music',
  animated: 'https://sauron-webgl.vercel.app/',
  preview: 'https://github.com/',
  embed: 'https://www.ted.com/talks/tim_berners_lee_the_next_web',
  markdown: 'https://microlink.io/docs',
  html: 'https://example.com',
  text: 'https://en.wikipedia.org',
  metadata: 'https://github.com/',
  lighthouse: 'https://simonwillison.net',
  technologies: 'https://vercel.com',
  function: 'https://example.com',
  pdf: 'https://www.raycast.com',
  logo: 'https://github.com',
  video: 'https://www.w3schools.com/html/html5_video.asp',
  audio: 'https://open.spotify.com/track/1W2919zs8SBCLTrOB1ftQT'
}

const INITIAL_VERTICAL = 'screenshot'

const SNAPSHOT_SKIP = ['lighthouse']

const SNAPSHOT_URLS = Object.fromEntries(
  Object.entries(DEMO_URLS).filter(
    ([vertical]) => !SNAPSHOT_SKIP.includes(vertical)
  )
)

const heroDemoPath = vertical => `/data/hero-demo/${vertical}.json`

const shortUrl = url => url.replace(/^https?:\/\//, '').replace(/^www\./, '')

const demoKey = url => shortUrl(url).replace(/\/$/, '')

const canonicalDemoUrl = (url, vertical) => {
  const demo = DEMO_URLS[vertical]
  return demo && demoKey(url) === demoKey(demo) ? demo : url
}

module.exports = {
  FN_SNIPPET,
  REQUEST_OPTS,
  DEMO_URLS,
  SNAPSHOT_URLS,
  INITIAL_VERTICAL,
  heroDemoPath,
  shortUrl,
  demoKey,
  canonicalDemoUrl
}
