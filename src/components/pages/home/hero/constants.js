import { PRODUCTS, SEARCH_EXAMPLE } from 'components/pages/home/catalog'
import heroDemoRequests from 'components/pages/home/hero-demo-requests'
import { colors } from 'theme'
import { rgba } from 'polished'

const { FN_SNIPPET, REQUEST_OPTS, shortUrl, canonicalDemoUrl } =
  heroDemoRequests

const SKILL_INSTALL =
  'npx skills add https://github.com/microlinkhq/skills --skill microlink-api'

const AGENT_TASK = {
  screenshot: 'capture a screenshot of',
  animated: 'record an animated screenshot of',
  preview: 'generate a link preview for',
  embed: 'return an embeddable rich card for',
  markdown: 'extract the content as markdown from',
  html: 'get the rendered HTML of',
  text: 'extract the readable text from',
  metadata: 'extract the metadata from',
  lighthouse: 'run a Lighthouse performance audit on',
  technologies: 'detect the technologies used by',
  function: 'run a custom function against',
  pdf: 'generate a PDF of',
  logo: 'fetch the logo of',
  video: 'extract the video from',
  audio: 'extract the audio from'
}

const agentPrompt = ({ vertical, fullUrl }) => {
  const task =
    vertical === 'search'
      ? `search Google for "${SEARCH_EXAMPLE.query}" and return the structured results`
      : `${AGENT_TASK[vertical]} ${fullUrl} and return the structured result`
  return `Using the Microlink API, ${task}.\n\nSet up Microlink for your agent first: ${SKILL_INSTALL}`
}

const INSTALL_COMMENT = '// npm install microlink.io'

const CODE_TAB = {
  screenshot: {
    binding: 'screenshot',
    method: 'screenshot',
    log: 'screenshot.url',
    comment: 'hosted screenshot URL'
  },
  animated: {
    binding: 'animated',
    method: 'screenshot',
    opts: { animated: true },
    log: 'animated.url',
    comment: 'hosted animation URL'
  },
  embed: {
    binding: 'embed',
    method: 'embed',
    log: 'embed.html',
    comment: 'embeddable iframe markup'
  },
  markdown: {
    binding: 'markdown',
    method: 'markdown',
    log: 'markdown',
    comment: 'page content as Markdown'
  },
  html: {
    binding: 'html',
    method: 'html',
    log: 'html',
    comment: 'rendered HTML string'
  },
  text: {
    binding: 'text',
    method: 'text',
    log: 'text',
    comment: 'readable text string'
  },
  metadata: {
    binding: 'metadata',
    method: 'metadata',
    log: 'metadata.title',
    comment: 'normalized page metadata'
  },
  lighthouse: {
    binding: 'report',
    method: 'lighthouse',
    log: 'report.categories',
    comment: 'full Lighthouse report'
  },
  technologies: {
    binding: 'technologies',
    method: 'technologies',
    log: 'technologies',
    comment: "[{ name: 'Vercel', … }]"
  },
  function: {
    binding: '{ value }',
    method: 'run',
    code: FN_SNIPPET,
    log: 'value',
    comment: 'every link on the page'
  },
  search: {
    binding: 'page',
    method: 'search',
    query: true,
    log: 'page.results',
    comment: '[{ title, url, description }, …]'
  },
  pdf: {
    binding: 'pdf',
    method: 'pdf',
    log: 'pdf.url',
    comment: 'hosted PDF URL'
  },
  logo: {
    binding: 'logo',
    method: 'logo',
    opts: { palette: true },
    log: 'logo.url',
    comment: 'the brand logo URL'
  },
  video: {
    binding: 'video',
    method: 'video',
    log: 'video.url',
    comment: 'direct video file URL'
  },
  audio: {
    binding: 'audio',
    method: 'audio',
    log: 'audio.url',
    comment: 'direct audio file URL'
  }
}

CODE_TAB.preview = CODE_TAB.metadata

const PROMPTS = {
  screenshot: 'take screenshot',
  animated: 'record animated screenshot',
  preview: 'generate link preview',
  embed: 'embed URL',
  markdown: 'get markdown',
  html: 'get HTML',
  text: 'extract text',
  metadata: 'extract metadata',
  lighthouse: 'run lighthouse report',
  technologies: 'detect technologies',
  function: 'run function',
  search: 'search the web',
  pdf: 'create PDF',
  logo: 'grab logo',
  video: 'detect video',
  audio: 'detect audio'
}

const PARSE_RULES = [
  ['animated', /\banimated\b|animation|screen ?cast|\bgif\b|\brecord\b/],
  [
    'screenshot',
    /screenshot|screen ?shot|capture|snap|take a (pic|photo|picture|shot)|image of|how .* looks?/
  ],
  ['pdf', /\bpdf\b|print|printable|to a doc|as a doc/],
  ['logo', /\blogo\b|favicon|\bbrand\b|\bicon of\b/],
  [
    'lighthouse',
    /lighthouse|performance|page ?speed|web ?vitals|\binsights?\b|audit|core web/
  ],
  [
    'technologies',
    /technolog|tech ?stack|built ?with|wappalyzer|frameworks? used|stack of/
  ],
  ['html', /\bhtml\b|raw html|page source|source code|markup/],
  [
    'function',
    /\bfunction\b|run (a |some )?(code|js|script)|custom (js|code|script)|evaluate|execute|\$\$?eval/
  ],
  ['video', /\bvideo\b|\bmp4\b|extract video|video from/],
  ['audio', /\baudio\b|\bmp3\b|\bsound\b|podcast/],
  [
    'text',
    /plain ?text|readable text|extract (the )?text|just the text|\btext of\b|\btext from\b/
  ],
  [
    'metadata',
    /metadata|meta ?data|\bmeta\b|open ?graph|\bog:?\b|\bseo\b|title and description/
  ],
  [
    'markdown',
    /markdown|\bmd\b|clean text|readable|article text|page content|content of|in markdown/
  ],
  ['search', /\bsearch\b|google|serp|results for|look up|find .* (about|on)/],
  ['embed', /\bembed\b|embeddable|\biframe\b|oembed/],
  ['preview', /preview|unfurl|link ?card|rich card/]
]

const parseLocal = text => {
  const src = text || ''
  const m =
    src.match(/https?:\/\/[^\s]+/) ||
    src.match(/[a-z0-9][a-z0-9-]*(?:\.[a-z0-9-]+)*\.[a-z]{2,}(?:\/[^\s]*)?/i)
  const raw = m ? m[0] : ''
  let url = ''
  if (m) {
    url = raw
    if (!/^https?:\/\//.test(url)) url = 'https://' + url
  }
  const t = (raw ? src.replace(raw, ' ') : src).toLowerCase()
  let vertical = 'screenshot'
  for (const [k, re] of PARSE_RULES) {
    if (re.test(t)) {
      vertical = k
      break
    }
  }
  return { vertical, url, raw, hasUrl: !!url }
}

const DEFAULT_URLS = {
  ...heroDemoRequests.DEMO_URLS,
  search: `https://www.google.com/search?q=${encodeURIComponent(
    SEARCH_EXAMPLE.query
  )}`
}

const assertProductParity = (name, map, { except = [] } = {}) => {
  const exceptSet = new Set(except)
  const expected = Object.keys(PRODUCTS).filter(key => !exceptSet.has(key))
  const missing = expected.filter(key => !(key in map))
  const extra = Object.keys(map).filter(key => !(key in PRODUCTS))
  if (missing.length || extra.length) {
    throw new Error(
      `hero ${name} out of sync with PRODUCTS catalog (missing: ${
        missing.join(', ') || 'none'
      }; extra: ${extra.join(', ') || 'none'})`
    )
  }
}

assertProductParity('AGENT_TASK', AGENT_TASK, { except: ['search'] })
assertProductParity('REQUEST_OPTS', REQUEST_OPTS)
assertProductParity('CODE_TAB', CODE_TAB)
assertProductParity('PROMPTS', PROMPTS)
assertProductParity('DEFAULT_URLS', DEFAULT_URLS)
assertProductParity('PARSE_RULES', Object.fromEntries(PARSE_RULES))

const promptFor = vertical =>
  `${PROMPTS[vertical]} of ${shortUrl(DEFAULT_URLS[vertical])}`

const CYCLE = [
  'screenshot',
  'pdf',
  'lighthouse',
  'technologies',
  'text',
  'function',
  'markdown',
  'logo'
].map(promptFor)

const EXAMPLE_CHIPS = [
  'screenshot',
  'technologies',
  'metadata',
  'markdown',
  'logo'
].map(vertical => ({ text: PROMPTS[vertical], vertical }))

const VERT_BORDER_ACTIVE = rgba(colors.grape7, 0.45)

const derive = (text, override) => {
  const p = parseLocal(text)
  const v = override || p.vertical
  const fullUrl =
    v === 'search'
      ? DEFAULT_URLS.search
      : p.url
        ? canonicalDemoUrl(p.url, v)
        : DEFAULT_URLS[v]
  return {
    vertical: v,
    label: PRODUCTS[v].label,
    fullUrl,
    vertBorder: override ? VERT_BORDER_ACTIVE : colors.gray2
  }
}

export {
  agentPrompt,
  INSTALL_COMMENT,
  CODE_TAB,
  PROMPTS,
  parseLocal,
  DEFAULT_URLS,
  CYCLE,
  EXAMPLE_CHIPS,
  derive
}
