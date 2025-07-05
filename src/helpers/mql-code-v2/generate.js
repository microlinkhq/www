import { writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'
import path from 'path'

import { hash } from './hash.js'
import { mqlCode } from './script.js'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const CASES = [
  ['https://github.com/microlinkhq'],
  ['https://github.com/microlinkhq', { apiKey: 'YOUR_API_TOKEN' }],
  ['https://github.com/microlinkhq', { headers: { userAgent: 'googlebot' } }],
  [
    'https://github.com/microlinkhq',
    { headers: { apiKey: 'YOUR_API_TOKEN', userAgent: 'googlebot' } }
  ],
  ['https://github.com/microlinkhq', { headers: { user_agent: 'googlebot' } }],
  ['https://www.youtube.com', { adblock: true }],
  ['https://vercel.com', { screenshot: true, animations: false }],
  ['https://open.spotify.com/track/1W2919zs8SBCLTrOB1ftQT', { audio: true }],
  ['https://microlink.io', { screenshot: true, click: '#features' }],
  [
    'https://googlechromelabs.github.io/dark-mode-toggle/demo',
    { screenshot: true, colorScheme: 'dark' }
  ],
  [
    'https://kikobeats.com',
    {
      data: {
        avatar: {
          selector: '#avatar',
          type: 'image',
          attr: 'src'
        }
      }
    }
  ],
  ['https://microlink.io', { screenshot: true, device: 'iPad' }],
  [
    'https://news.ycombinator.com/item?id=13713480',
    { screenshot: true, embed: 'screenshot.url' }
  ],
  [
    'https://news.ycombinator.com/item?id=13713480',
    { screenshot: true, embed: 'title' }
  ],
  [
    'https://padlet.com/padlets/mjl7vtq8a26g/exports/print',
    { pdf: true, filename: 'solar-system' }
  ],
  [
    'https://microlink.io',
    {
      function: '({ page }) => page.evaluate("jQuery.fn.jquery")',
      scripts: ['https://code.jquery.com/jquery-3.5.0.min.js']
    }
  ],
  ['https://news.ycombinator.com', { filter: 'url,title' }],
  ['https://time.kikobeats.com/html', { force: true }],
  [
    'https://news.ycombinator.com',
    { headers: { 'user-agent': 'googlebot', 'accept-language': 'en-US' } }
  ],
  ['https://www.youtube.com/watch?v=9P6rdqiybaw', { iframe: true }],
  ['https://www.youtube.com/watch?v=9P6rdqiybaw', { meta: true }],
  ['https://www.youtube.com/watch?v=9P6rdqiybaw', { video: true }],
  [
    'https://www.youtube.com/watch?v=9P6rdqiybaw',
    { meta: { author: true, title: true } }
  ],
  [
    'https://www.youtube.com/watch?v=9P6rdqiybaw',
    { meta: { image: false, logo: false } }
  ],
  ['https://www.youtube.com/watch?v=9P6rdqiybaw', { meta: false }],
  [
    'https://www.youtube.com/watch?v=9P6rdqiybaw',
    {
      iframe: {
        maxWidth: 350
      }
    }
  ],
  ['https://vercel.com', { insights: true }],
  [
    'https://vercel.com',
    { insights: { lighthouse: true, technologies: false } }
  ],
  [
    'https://css-tricks.com/nerds-guide-color-web',
    {
      insights: {
        lighthouse: true
      }
    }
  ],
  [
    'https://css-tricks.com/nerds-guide-color-web',
    {
      insights: {
        lighthouse: { output: 'html' }
      }
    }
  ],
  [
    'https://css-tricks.com/nerds-guide-color-web',
    {
      insights: {
        lighthouse: { onlyCategories: ['accesibility'] }
      }
    }
  ],
  [
    'https://css-tricks.com/nerds-guide-color-web',
    {
      insights: {
        lighthouse: { preset: 'desktop' }
      }
    }
  ],
  [
    'https://microlink.io',
    {
      insights: {
        technologies: true
      }
    }
  ],
  ['https://news.ycombinator.com', { javascript: true }],
  [
    'https://blog.alexmaccaw.com/advice-to-my-younger-self',
    { pdf: true, mediaType: 'screen' }
  ],
  [
    'https://microlink.io',
    {
      screenshot: true,
      modules: [
        'https://cdn.jsdelivr.net/npm/@microlink/mql@0.3.12/src/browser.js',
        "document.body.style.backgroundColor = 'red'"
      ]
    }
  ],
  ['https://microlink.io', { palette: true }],
  [
    'https://rauchg.com/2014/7-principles-of-rich-web-applications',
    { pdf: true }
  ],
  [
    'https://rauchg.com/2014/7-principles-of-rich-web-applications',
    { pdf: true, scale: 1, margin: '0.4cm' }
  ],
  ['https://keygen.sh/blog/i-quit', { pdf: { format: 'A4' } }],
  ['https://oxide.computer', { pdf: { height: '480px' } }],
  ['https://www.algolia.com', { pdf: { landscape: true } }],
  ['https://basecamp.com/shapeup/0.3-chapter-01', { pdf: { margin: '4mm' } }],
  ['https://stripe.com', { pdf: { landscape: { pageRanges: '1-1' } } }],
  [
    'https://varnish-cache.org/docs/trunk/phk/thatslow.html',
    { pdf: { scale: 1 } }
  ],
  ['https://www.raycast.com', { pdf: { width: '640px' } }],
  ['https://microlink.io', { ping: true }],
  ['https://microlink.io', { ping: { audio: false } }],
  ['https://microlink.io', { ping: false }],
  [
    'https://www.sportsnet.ca/hockey/nhl/leafs-john-tavares-return-new-york-hope-positive',
    { prerender: 'auto' }
  ],
  [
    'https://www.sportsnet.ca/hockey/nhl/leafs-john-tavares-return-new-york-hope-positive',
    { prerender: false }
  ],
  [
    'https://geolocation.microlink.io',
    { proxy: 'https://myproxy:603f60f5@superproxy.cool:8001' }
  ],
  ['https://cloverapp.co', { retry: 2 }],
  ['https://www.netflix.com/title/80057281', { screenshot: true }],
  [
    'https://www.netflix.com/title/80057281',
    { screenshot: true, element: '#section-hero' }
  ],
  [
    'https://emojipedia-api.vercel.app',
    { screenshot: { codeScheme: 'atom-dark' } }
  ],
  [
    'https://codepen.io/fossheim/full/oNjxrZa',
    { screenshot: { element: '#result-iframe-wrap' } }
  ],
  ['https://microlink.io/recipes', { screenshot: { fullPage: true } }],
  [
    'https://www.apple.com/music',
    {
      screenshot: {
        overlay: {
          background:
            'linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)',
          browser: 'dark'
        }
      }
    }
  ],
  ['https://kikobeats.com', { screenshot: { omitBackground: true } }],
  [
    'https://microlink.io',
    {
      screenshot: true,
      scripts: [
        '%5B%5D.forEach.call(document.querySelectorAll(%22*%22)%2Cfunction(a)%7Ba.style.outline%3D%221px%20solid%20%23%22%2B(~~(Math.random()*(1%3C%3C24))).toString(16)%7D)'
      ]
    }
  ],
  [
    'https://microlink.io',
    {
      screenshot: true,
      scroll: '#pricing'
    }
  ],
  [
    'https://example.com',
    {
      screenshot: true,
      styles: [
        'body { background: white; }',
        'div { border: 1px solid gray; font-family: "Comic Sans MS", "Comic Sans", cursive; }'
      ]
    }
  ],
  ['https://microlink.io', { ttl: '1d', staleTtl: 0 }],
  ['https://microlink.io', { timeout: '10s' }],
  ['https://kikobeats.com'],
  ['https://kikobeats.com?ref=microlink'],
  [
    'https://en.wikipedia.org/wiki/Bob_Dylan',
    {
      screenshot: true,
      viewport: {
        width: 640,
        height: 400,
        deviceScaleFactor: 2,
        isMobile: true
      }
    }
  ],
  [
    'https://en.wikipedia.org/wiki/Bob_Dylan',
    {
      screenshot: true,
      viewport: {
        deviceScaleFactor: 0.5
      }
    }
  ],
  ['https://dev.to', { screenshot: true, waitForSelector: 'main' }],
  ['https://dev.to', { screenshot: true, waitForTimeout: 3000 }],
  ['https://dev.to', { screenshot: true, waitUntil: 'domcontentloaded' }],
  [
    'https://dev.to',
    {
      screenshot: true,
      waitUntil: 'domcontentloaded',
      waitForSelector: 'h1'
    }
  ],
  ['https://microlink.io', { screenshot: { type: 'jpeg' } }]
]

const output = CASES.reduce((acc, [url, options]) => {
  const key = hash(url, options)
  if (acc[key]) throw new Error(`Duplicate key: ${key}`)
  acc[key] = mqlCode(url, options)
  return acc
}, {})

const filepath = path.join(__dirname, 'definitions.json')
await writeFile(filepath, JSON.stringify(output, null, 2))
