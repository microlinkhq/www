import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Dot from 'components/elements/Dot/Dot'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import Overlay from 'components/pages/home/overlay'
import Output from 'components/pages/home/output'
import FeatherIcon from 'components/icons/Feather'
import { WandSparkles } from 'components/icons/WandSparkles'
import { Focus } from 'components/icons/Focus'
import { Markdown } from 'components/icons/Markdown'
import { Metascraper } from 'components/icons/Metascraper'
import { PDF } from 'components/icons/PDF'
import { Lighthouse } from 'components/icons/Lighthouse'
import { Terminal } from 'components/icons/Terminal'
import {
  Link as LinkIcon,
  Code as CodeIcon,
  Search as SearchIcon,
  Image as ImageIcon,
  Layers as LayersIcon,
  AlignLeft as AlignLeftIcon,
  Video as VideoIcon,
  Music as MusicIcon
} from 'react-feather'
import { transition, timings, fonts, theme } from 'theme'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import mql, { getApiUrl } from '@microlink/mql'

import analyticsData from '../../../../data/analytics.json'

// round the request count down to the nearest 50 (e.g. 778M → 750M) so the
// hero shows a clean, never-overstated figure rather than the exact number
const reqsRounded = (() => {
  const [, value, unit] = analyticsData[0].reqs_pretty.match(/^([\d.]+)(\D+)$/)
  return `${Math.floor(Number(value) / 50) * 50}${unit}`
})()

const PINK = '#FF1E8C'
const VIOLET = '#9B26D6'
const INK = '#0A0A0A'
const GRADIENT = 'linear-gradient(99deg,#FF1E8C,#B026E0)'

const SANS = fonts.sans
const MONO = fonts.mono

// response/syntax-highlight palette (kept literal — these don't map to theme
// tokens and need to match the response viewer exactly)
const SYNTAX = {
  key: '#0E9488',
  string: '#16A34A',
  literal: '#E8743B',
  number: '#2D7FF9',
  boolean: '#E0218A',
  fn: '#1BA39C',
  muted: '#9A9AA0',
  body: '#3D3D42'
}

const reduceMotion = '@media (prefers-reduced-motion: reduce)'

// smooth ease-out for position/scale changes (dropdown, sliding tab indicator)
const EASE_SMOOTH = 'cubic-bezier(0.22, 1, 0.36, 1)'

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(255,30,140,.45) }
  70% { box-shadow: 0 0 0 8px rgba(255,30,140,0) }
  100% { box-shadow: 0 0 0 0 rgba(255,30,140,0) }
`

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`

// first-paint reveal: gentle blurred rise + fade, staggered across the hero
const riseIn = keyframes`
  from { opacity: 0; transform: translateY(8px); filter: blur(3px) }
  to { opacity: 1; transform: translateY(0); filter: blur(0) }
`

// slow highlight sweep that keeps the "live" label feeling alive
const shimmer = keyframes`
  0% { background-position: 100% 0 }
  100% { background-position: 0% 0 }
`

// gentle opacity pulse for skeleton placeholders while a request is in-flight
const skeletonPulse = keyframes`
  0%, 100% { opacity: 1 }
  50% { opacity: 0.45 }
`

// indeterminate bar that slides across the panel top during a request
const loadingSlide = keyframes`
  0% { transform: translateX(-100%) }
  100% { transform: translateX(400%) }
`

/* ----------------------------- routing logic ----------------------------- */

const PRESETS = {
  stripe: {
    domain: 'stripe.com',
    brand: 'Stripe',
    title: 'Stripe | Payment Processing Platform',
    desc: 'Financial infrastructure to grow your revenue.'
  },
  github: {
    domain: 'github.com',
    brand: 'GitHub',
    title: 'GitHub · Build and ship software',
    desc: "The world's most widely adopted AI-powered developer platform."
  },
  vercel: {
    domain: 'vercel.com',
    brand: 'Vercel',
    title: 'Vercel: Build and deploy the best web experiences',
    desc: 'Frameworks, workflows, and infrastructure for the web.'
  },
  figma: {
    domain: 'figma.com',
    brand: 'Figma',
    title: 'Figma: The collaborative interface design tool',
    desc: 'Design, prototype, and gather feedback all in one place.'
  }
}

// product icons — the same set the nav bar uses, so the hero stays consistent
// with the Products menu (local Svg + react-feather glyphs)
const ICONS = {
  screenshot: Focus,
  preview: LinkIcon,
  markdown: Markdown,
  html: CodeIcon,
  text: AlignLeftIcon,
  metadata: Metascraper,
  lighthouse: Lighthouse,
  technologies: LayersIcon,
  function: Terminal,
  search: SearchIcon,
  pdf: PDF,
  logo: ImageIcon,
  video: VideoIcon,
  audio: MusicIcon
}

// Metascraper ships its own coloured badge, so it must not sit inside the
// gradient icon badge like the monochrome (currentColor) glyphs
const SELF_BADGED = new Set(['metadata'])

const VertGlyph = ({ vertical, size = 16 }) => {
  const Icon = ICONS[vertical]
  // px units are required: the local Svg icons size via styled-system `layout`,
  // which drops bare numbers and lets the glyph balloon to fill its container
  const px = `${size}px`
  return Icon ? <Icon width={px} height={px} /> : null
}

const LABELS = {
  screenshot: 'Screenshot',
  preview: 'Link preview',
  markdown: 'Markdown',
  html: 'HTML',
  text: 'Text',
  metadata: 'Metadata',
  lighthouse: 'Lighthouse',
  technologies: 'Technologies',
  function: 'Function',
  search: 'Search',
  pdf: 'PDF',
  logo: 'Logo',
  video: 'Video',
  audio: 'Audio'
}

const FLAGS = {
  screenshot: 'screenshot',
  preview: 'embed',
  markdown: 'markdown',
  html: 'html',
  text: 'text',
  metadata: 'meta',
  lighthouse: 'insights',
  technologies: 'insights',
  function: 'function',
  search: 'q',
  pdf: 'pdf',
  logo: 'logo',
  video: 'video',
  audio: 'audio'
}

// the actual mql options sent per vertical — every one is a real API call that
// returns real data; verticals without a dedicated free-tier flag fall back to
// the default metadata response
const REQUEST_OPTS = {
  screenshot: { screenshot: true },
  preview: { screenshot: true },
  markdown: { data: { markdown: { attr: 'markdown' } } },
  html: { data: { html: { attr: 'html' } }, meta: false, ping: false },
  text: { data: { text: { attr: 'text' } }, meta: false, ping: false },
  metadata: {},
  // skip metadata + technology detection so the lighthouse audit resolves faster
  lighthouse: {
    insights: { lighthouse: true, technologies: false },
    meta: false,
    ping: false
  },
  technologies: { insights: { lighthouse: false, technologies: true } },
  function: {
    function: "({ page }) => page.$$eval('a', els => els.map(a => a.href))",
    meta: false,
    ping: false
  },
  search: {},
  pdf: { pdf: true },
  logo: { palette: true },
  video: { video: true },
  audio: { audio: true }
}

const VERTICAL_ORDER = [
  'screenshot',
  'preview',
  'markdown',
  'html',
  'text',
  'metadata',
  'lighthouse',
  'technologies',
  'function',
  'pdf',
  'logo',
  'video',
  'audio'
]

const CYCLE = [
  'take a screenshot',
  'create a PDF',
  'run a lighthouse report',
  'detect the technologies',
  'extract the text',
  'run a function',
  'get the markdown',
  'fetch the logo'
]

const EXAMPLES = [
  'take a screenshot',
  'lighthouse report',
  'detect technologies',
  'run a function',
  'extract markdown',
  'fetch the logo'
]

const parseLocal = text => {
  const t = (text || '').toLowerCase()
  const rules = [
    [
      'screenshot',
      /screenshot|screen ?shot|capture|snap|take a (pic|photo|picture|shot)|image of|how .* looks?/
    ],
    ['pdf', /\bpdf\b|print|printable|to a doc|as a doc/],
    ['logo', /\blogo\b|favicon|brand ?mark|brand icon|\bicon of\b/],
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
    ['preview', /preview|unfurl|link ?card|rich card|\bembed\b/]
  ]
  let vertical = 'screenshot'
  for (const [k, re] of rules) {
    if (re.test(t)) {
      vertical = k
      break
    }
  }
  let url = ''
  const m =
    (text || '').match(/https?:\/\/[^\s]+/) ||
    (text || '').match(
      /[a-z0-9][a-z0-9-]*(?:\.[a-z0-9-]+)*\.[a-z]{2,}(?:\/[^\s]*)?/i
    )
  if (m) {
    url = m[0]
    if (!/^https?:\/\//.test(url)) url = 'https://' + url
  }
  return { vertical, url, hasUrl: !!url }
}

// when the prompt names no domain we fall back to the same example URL each
// product's documentation uses; the user can type any domain to override it
const DEFAULT_URLS = {
  screenshot: 'https://www.apple.com/music',
  preview: 'https://news.ycombinator.com/item?id=13713480',
  markdown: 'https://microlink.io/docs/api/getting-started/overview',
  html: 'https://example.com',
  text: 'https://en.wikipedia.org/wiki/Lorem_ipsum',
  metadata: 'https://www.youtube.com/watch?v=9P6rdqiybaw',
  lighthouse: 'https://simonwillison.net/2024/Oct/25/pelicans-on-a-bicycle/',
  technologies: 'https://vercel.com',
  function: 'https://example.com',
  pdf: 'https://www.raycast.com',
  logo: 'https://github.com',
  video: 'https://www.w3schools.com/html/html5_video.asp',
  audio: 'https://open.spotify.com/track/1W2919zs8SBCLTrOB1ftQT'
}
const FALLBACK_URL = 'https://example.com'

const derive = (text, override) => {
  const p = parseLocal(text)
  const v = override || p.vertical
  // the request honours the full path (e.g. vercel.com/blog); falls back to the
  // documentation example for the product when the prompt doesn't include one
  const fullUrl = p.url || DEFAULT_URLS[v] || FALLBACK_URL
  const domain = fullUrl.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const knownKey = Object.keys(PRESETS).find(k => fullUrl.includes(k))
  const known = knownKey ? PRESETS[knownKey] : null
  const brand = known
    ? known.brand
    : (domain.split('.')[0] || 'site').replace(/^./, c => c.toUpperCase())
  return {
    vertical: v,
    label: LABELS[v],
    url: fullUrl,
    hasUrl: true,
    domain,
    fullUrl,
    optName: FLAGS[v],
    encUrl: encodeURIComponent(fullUrl),
    vertBorder: override ? 'rgba(160,40,200,.45)' : '#EAEAEC',
    brand,
    title: known ? known.title : brand,
    desc: known ? known.desc : 'Structured data resolved from ' + domain + '.'
  }
}

// palette cycled across the timing bars so each metric reads as its own colour
const TIMING_COLORS = [
  SYNTAX.string,
  SYNTAX.number,
  '#F59E0B',
  '#EC4899',
  VIOLET,
  SYNTAX.fn
]

// the fetch Response carries a Headers instance; flatten + sort it for display
const headersToRows = headers => {
  if (!headers) return []
  const rows = []
  if (typeof headers.forEach === 'function') {
    headers.forEach((v, k) => rows.push({ k, v }))
  } else {
    Object.entries(headers).forEach(([k, v]) => rows.push({ k, v: String(v) }))
  }
  return rows.sort((a, b) => a.k.localeCompare(b.k))
}

// turn the `server-timing` header (e.g. "total;dur=34,ssrf;dur=1") into the
// bars + rows the Timing tab renders
const parseServerTiming = headers => {
  const raw =
    headers && typeof headers.get === 'function'
      ? headers.get('server-timing')
      : headers && headers['server-timing']
  if (!raw) return { bars: [], rows: [], totalMs: null }

  const entries = raw.split(',').map(part => {
    const [name, ...rest] = part.split(';')
    const dur = rest.find(p => p.trim().startsWith('dur='))
    return { name: name.trim(), dur: dur ? parseFloat(dur.split('=')[1]) : 0 }
  })

  const total =
    entries.find(e => e.name === 'total')?.dur ??
    entries.reduce((sum, e) => sum + e.dur, 0)

  const pct = dur => (total ? (dur / total) * 100 : 0)

  const bars = entries.map((e, i) => ({
    name: e.name,
    dur: `${e.dur.toFixed(1)}ms`,
    pct: `${Math.max(2, Math.round(pct(e.dur)))}%`,
    color: TIMING_COLORS[i % TIMING_COLORS.length]
  }))

  const rows = entries.map(e => ({
    name: e.name,
    dur: `${e.dur.toFixed(1)}ms`,
    pct: `${pct(e.dur).toFixed(1)}%`
  }))

  return { bars, rows, totalMs: total }
}

/* ------------------------------- presentation ------------------------------ */

const Section = styled.section`
  position: relative;
  font-family: ${SANS};
  color: ${INK};
  -webkit-font-smoothing: antialiased;

  padding-right: clamp(16px, 4vw, 40px);
  padding-bottom: clamp(96px, 14vw, 220px);
  padding-left: clamp(16px, 4vw, 40px);
`

// the centered content column — Container gives flex-column + mx:auto; the
// outer <Section> owns the vertical/horizontal padding, so reset Container's
const Content = styled(Container)`
  position: relative;
  z-index: 1;
  max-width: 1080px;
  align-items: center;
  text-align: center;
  padding: 0;

  /* staggered first-paint reveal, top to bottom */
  & > * {
    animation: ${riseIn} 440ms ${timings.short} both;
  }
  & > *:nth-child(2) {
    animation-delay: 45ms;
  }
  & > *:nth-child(3) {
    animation-delay: 90ms;
  }
  & > *:nth-child(4) {
    animation-delay: 135ms;
  }
  & > *:nth-child(5) {
    animation-delay: 180ms;
  }
  & > *:nth-child(6) {
    animation-delay: 225ms;
  }
  & > *:nth-child(7) {
    animation-delay: 270ms;
  }

  /* reduced motion: keep the fade, drop the movement */
  ${reduceMotion} {
    & > * {
      animation-name: ${fadeIn};
    }
  }
`

const PulseDot = styled(Dot)`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${PINK};
  animation: ${pulse} 2s infinite;
  ${reduceMotion} {
    animation: none;
  }
`

const Headline = styled.h1`
  font-size: clamp(36px, 6.5vw, 62px);
  line-height: 1.04;
  font-weight: 700;
  letter-spacing: -0.035em;
  margin: 0;
  color: ${INK};

  span {
    background: ${GRADIENT};
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`

const Subtitle = styled.p`
  font-size: clamp(16px, 2.4vw, 19px);
  color: #3d3d42;
  margin: 18px 0 0;
  line-height: 1.5;
`

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 14px;
  font-weight: 600;
  color: ${VIOLET};
  background: rgba(255, 30, 140, 0.07);
  border: 1px solid rgba(160, 40, 200, 0.18);
  padding: 7px 16px;
  border-radius: 999px;
  margin-bottom: 26px;
`

const Composer = styled.div`
  width: 100%;
  max-width: 680px;
  margin-top: 38px;
  background: #fff;
  border: 1px solid #e6e4ea;
  border-radius: 18px;
  padding: 6px;
  box-shadow: 0 24px 60px -30px rgba(40, 10, 60, 0.4);
  text-align: left;
`

const ComposerInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-family: ${SANS};
  font-size: 18px;
  color: ${INK};
  background: transparent;
  padding: 18px 18px 10px;

  &::placeholder {
    color: #b3b3ba;
  }
`

const VertChip = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  background: #fafafb;
  border: 1px solid ${props => props.$border};
  border-radius: 10px;
  padding: 5px 9px 5px 6px;
  transition: transform ${transition.short};

  &:active {
    transform: scale(0.98);
  }
`

const RunButton = styled.button`
  border: none;
  cursor: pointer;
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: ${GRADIENT};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform ${transition.short}, filter ${transition.short};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translateY(-1px);
      filter: brightness(1.06);
    }
  }

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    opacity: 0.45;
    cursor: default;
    transform: none;
    filter: none;
  }
`

const ExampleChip = styled.button`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: ${SANS};
  font-size: 13px;
  color: #5a5a60;
  background: #fff;
  border: 1px solid #e4e4e8;
  padding: 8px 13px;
  border-radius: 999px;
  transition: border-color ${transition.short}, color ${transition.short},
    transform ${transition.short};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${props => props.$border};
      color: ${INK};
    }
  }

  &:active {
    transform: scale(0.97);
  }
`

const Panel = styled.div`
  position: relative;
  width: 100%;
  max-width: 980px;
  margin-top: 14px;
  border: 1px solid #e9e7ec;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  text-align: left;
  box-shadow: 0 24px 60px -40px rgba(40, 10, 60, 0.35);
`

// the tab row owns positioning context for the sliding indicator
const TabBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 28px;
`

const TabButton = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  font-family: ${SANS};
  font-size: 17px;
  /* weight stays constant so the active tab doesn't reflow its width and
     shift its siblings — active is signalled by color + the sliding indicator */
  font-weight: 500;
  color: ${props => (props.$active ? INK : '#8a8a90')};
  padding: 0 0 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color ${transition.short};
`

// the active-tab underline that slides between tabs; JS writes its
// transform/width from the active tab's offsetLeft/offsetWidth
const TabIndicator = styled.span`
  position: absolute;
  bottom: -1px;
  left: 0;
  height: 2px;
  width: 0;
  background: ${INK};
  transform: translateX(0);
  transition: transform 250ms ${EASE_SMOOTH}, width 250ms ${EASE_SMOOTH};
  will-change: transform, width;
  pointer-events: none;

  ${reduceMotion} {
    transition: none;
  }
`

// origin-aware popover: scales in from the chip (bottom-left) on open and
// scales back down on close — data-state drives both directions
const VertMenu = styled(Box)`
  transform-origin: bottom left;
  will-change: transform, opacity;

  &[data-state='pre'] {
    opacity: 0;
    transform: scale(0.97);
    pointer-events: none;
  }
  &[data-state='open'] {
    opacity: 1;
    transform: scale(1);
    transition: transform 250ms ${EASE_SMOOTH}, opacity 250ms ${EASE_SMOOTH};
  }
  &[data-state='closing'] {
    opacity: 0;
    transform: scale(0.99);
    pointer-events: none;
    transition: transform 150ms ${EASE_SMOOTH}, opacity 150ms ${EASE_SMOOTH};
  }

  ${reduceMotion} {
    transition: none;
  }
`

// fade the result body on tab change (opacity only — no layout motion)
const TabContent = styled.div`
  animation: ${fadeIn} ${transition.short};

  ${reduceMotion} {
    animation: none;
  }
`

const Mono = styled(Text).attrs({ as: 'span' })`
  font-family: ${MONO};
`

// sweeps a highlight band across the label's glyphs (clip-to-text); the
// ::before duplicates the text via data-text and only paints the moving band
const ShimmerText = styled.span`
  position: relative;
  display: inline-block;
  color: ${VIOLET};

  &::before {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      transparent 40%,
      rgba(255, 255, 255, 0.95) 50%,
      transparent 60%,
      transparent 100%
    );
    background-size: 220% 100%;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    animation: ${shimmer} 3.2s ease-in-out infinite;
  }

  ${reduceMotion} {
    &::before {
      animation: none;
    }
  }
`

const PILL_TONES = {
  success: { color: SYNTAX.string, background: '#e7f7ed' },
  error: { color: '#DC2626', background: '#FDECEC' },
  loading: { color: VIOLET, background: 'rgba(155,38,214,.08)' }
}

const StatusPill = styled.span`
  font-family: ${MONO};
  font-size: 13px;
  font-weight: 500;
  color: ${p => (PILL_TONES[p.$tone] || PILL_TONES.success).color};
  background: ${p => (PILL_TONES[p.$tone] || PILL_TONES.success).background};
  padding: 5px 12px;
  border-radius: 999px;
  white-space: nowrap;
`

const Code = styled.pre`
  margin: 0;
  padding: 22px;
  font-family: ${MONO};
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 380px;
  overflow: auto;
`

// colours for each JSON token type, matched to the rest of the panel
const JSON_COLORS = {
  key: SYNTAX.key,
  string: SYNTAX.string,
  number: SYNTAX.number,
  boolean: SYNTAX.boolean,
  null: SYNTAX.literal
}

// matches a quoted string (optionally an object key when followed by a colon),
// a literal (true/false/null) or a number — enough to colourise pretty JSON
const JSON_TOKEN =
  /("(?:\\.|[^"\\])*")(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g

// pretty-print + syntax-highlight a response payload without pulling in a
// JSON-viewer dependency (keeps the homepage bundle lean and avoids the legacy
// react-json-view warnings)
const JsonView = ({ src }) => {
  const text = JSON.stringify(src, null, 2)
  const nodes = []
  let last = 0
  let key = 0
  let match

  while ((match = JSON_TOKEN.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const token = match[0]

    if (match[1] && match[2] !== undefined) {
      // object key — colour the quoted name, leave the colon neutral
      nodes.push(
        <Box as='span' key={key++} css={{ color: JSON_COLORS.key }}>
          {match[1]}
        </Box>
      )
      nodes.push(match[2])
    } else if (match[1]) {
      nodes.push(
        <Box as='span' key={key++} css={{ color: JSON_COLORS.string }}>
          {token}
        </Box>
      )
    } else {
      const color =
        token === 'true' || token === 'false'
          ? JSON_COLORS.boolean
          : token === 'null'
            ? JSON_COLORS.null
            : JSON_COLORS.number
      nodes.push(
        <Box as='span' key={key++} css={{ color }}>
          {token}
        </Box>
      )
    }

    last = JSON_TOKEN.lastIndex
  }
  if (last < text.length) nodes.push(text.slice(last))

  return (
    <Code css={theme({ fontSize: 0, lineHeight: 1.85, color: SYNTAX.body })}>
      {nodes}
    </Code>
  )
}

// indeterminate progress bar pinned to the panel header while a request runs
const LoadingBar = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  width: 25%;
  background: ${GRADIENT};
  animation: ${loadingSlide} 1s ease-in-out infinite;
  ${reduceMotion} {
    animation: none;
    width: 100%;
    opacity: 0.4;
  }
`

const SkeletonLine = styled.span`
  display: block;
  height: 12px;
  border-radius: 6px;
  background: #ececed;
  animation: ${skeletonPulse} 1.2s ease-in-out infinite;
  ${reduceMotion} {
    animation: none;
  }
`

const Skeleton = () => (
  <Box css={theme({ p: '22px' })}>
    {[92, 64, 78, 54, 70, 48, 60].map((w, i) => (
      <SkeletonLine
        key={i}
        css={theme({ mb: 3, width: `${w}%`, animationDelay: `${i * 90}ms` })}
      />
    ))}
  </Box>
)

// rounded badge that holds a product glyph; the glyph inherits the badge's
// `color` via currentColor
const IconBadge = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  flex-shrink: 0;
`

// syntax-highlight tokens for the Code panel
const Str = styled.span`
  color: ${SYNTAX.string};
`
const Num = styled.span`
  color: ${SYNTAX.number};
`
const Bool = styled.span`
  color: ${SYNTAX.boolean};
`
const Fn = styled.span`
  color: ${SYNTAX.fn};
`
const Comment = styled.span`
  color: ${SYNTAX.muted};
`

// render an mql options value as colourised JS source (handles nested objects
// like the markdown data rule, not just `{ flag: true }`)
const renderJsValue = (value, keyBase) => {
  if (typeof value === 'boolean') return <Bool>{String(value)}</Bool>
  if (typeof value === 'number') return <Num>{value}</Num>
  if (typeof value === 'string') return <Str>'{value}'</Str>
  const entries = Object.entries(value)
  return (
    <>
      {'{ '}
      {entries.map(([k, v], i) => (
        <React.Fragment key={`${keyBase}.${k}`}>
          {i > 0 && ', '}
          {k}: {renderJsValue(v, `${keyBase}.${k}`)}
        </React.Fragment>
      ))}
      {' }'}
    </>
  )
}

/* --------------------------------- result -------------------------------- */

const ResultPanel = ({ tab, setTab, req }) => {
  const { D, status, body, headerRows, bars, rows, totalMs } = req
  const isLoading = status === 'loading'
  const isError = status === 'error'
  // the options actually sent for this vertical, so the snippet matches the
  // GET line and the live request exactly
  const opts = REQUEST_OPTS[D.vertical] || {}
  const hasOpts = Object.keys(opts).length > 0

  const tabs = [
    { key: 'output', label: 'Output' },
    { key: 'data', label: 'Data' },
    { key: 'headers', label: 'Headers' },
    {
      key: 'timing',
      label: 'Timing',
      badge: bars && bars.length ? String(bars.length) : null
    },
    { key: 'code', label: 'Code' }
  ]

  const barRef = useRef(null)
  const indicatorRef = useRef(null)
  const firstPaint = useRef(true)

  // slide the underline to the active tab; the first paint (and resize / font
  // load) snaps without a transition so it doesn't animate in from zero width
  useEffect(() => {
    const move = animate => {
      const bar = barRef.current
      const pill = indicatorRef.current
      const active = bar && bar.querySelector('[data-active="true"]')
      if (!bar || !pill || !active) return
      if (!animate) {
        const prev = pill.style.transition
        pill.style.transition = 'none'
        pill.style.transform = `translateX(${active.offsetLeft}px)`
        pill.style.width = `${active.offsetWidth}px`
        pill.getBoundingClientRect() // force reflow so the snap isn't animated
        pill.style.transition = prev
      } else {
        pill.style.transform = `translateX(${active.offsetLeft}px)`
        pill.style.width = `${active.offsetWidth}px`
      }
    }

    move(!firstPaint.current)
    if (firstPaint.current && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => move(false))
    }
    firstPaint.current = false

    const onResize = () => move(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [tab])

  return (
    <Panel>
      {isLoading && <LoadingBar />}

      {/* header — status now lives in the "live response" label above */}
      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 3,
          px: 3
        })}
      >
        <Flex css={theme({ alignItems: 'center', gap: 3 })}>
          <Box
            as='span'
            css={theme({
              fontSize: 2,
              fontWeight: 'bold',
              letterSpacing: '-.02em',
              color: INK
            })}
          >
            Result
          </Box>
          {req.elapsedMs != null && !isLoading && (
            <Mono css={theme({ fontSize: 0, color: SYNTAX.muted })}>
              {req.elapsedMs}ms
            </Mono>
          )}
        </Flex>
      </Flex>

      {/* GET url */}
      <Flex
        css={theme({
          alignItems: 'center',
          gap: 3,
          py: 3,
          px: 3,
          borderTop: '1px solid #EFEFF1',
          borderBottom: '1px solid #EFEFF1'
        })}
      >
        <Mono
          css={theme({
            fontSize: 0,
            color: SYNTAX.body,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          })}
        >
          <Box as='span' css={theme({ color: SYNTAX.string, fontWeight: 600 })}>
            GET
          </Box>{' '}
          {req.apiUrl}
        </Mono>
      </Flex>

      {/* tabs */}
      <TabBar
        ref={barRef}
        css={theme({ pt: 3, px: 3, borderBottom: '1px solid #EFEFF1' })}
      >
        {tabs.map(t => (
          <TabButton
            key={t.key}
            data-active={tab === t.key}
            $active={tab === t.key}
            onClick={() => setTab(t.key)}
          >
            {t.label}
            {t.badge && (
              <StatusPill css={theme({ fontSize: 0, py: 1, px: 2 })}>
                {t.badge}
              </StatusPill>
            )}
          </TabButton>
        ))}
        <TabIndicator ref={indicatorRef} />
      </TabBar>

      <TabContent key={isError ? 'error' : tab}>
        {isError && (
          <Box css={theme({ p: 4 })}>
            <Flex css={theme({ alignItems: 'center', gap: 2, mb: 2 })}>
              <StatusPill $tone='error'>request failed</StatusPill>
            </Flex>
            <Mono
              css={theme({
                fontSize: 0,
                color: SYNTAX.body,
                lineHeight: 1.6,
                wordBreak: 'break-word'
              })}
            >
              {req.error}
            </Mono>
          </Box>
        )}

        {!isError &&
          tab === 'output' &&
          (isLoading || !body ? <Skeleton /> : <Output req={req} />)}

        {!isError &&
          tab === 'data' &&
          (isLoading || !body ? <Skeleton /> : <JsonView src={body} />)}

        {!isError &&
          tab === 'headers' &&
          (isLoading || !headerRows
            ? (
              <Skeleton />
              )
            : (
              <Box
                css={theme({
                  pt: 2,
                  px: 3,
                  pb: 3,
                  maxHeight: '380px',
                  overflow: 'auto'
                })}
              >
                {headerRows.map(h => (
                  <Box
                    key={h.k}
                    css={theme({
                      display: 'grid',
                      gridTemplateColumns: '230px 1fr',
                      gap: 3,
                      py: 2,
                      borderBottom: '1px solid #F2F2F4',
                      fontFamily: 'mono',
                      fontSize: 0
                    })}
                  >
                    <Box as='span' css={theme({ color: SYNTAX.number })}>
                      {h.k}
                    </Box>
                    <Box
                      as='span'
                      css={theme({ color: SYNTAX.body, wordBreak: 'break-all' })}
                    >
                      {h.v}
                    </Box>
                  </Box>
                ))}
              </Box>
              ))}

        {!isError &&
          tab === 'timing' &&
          (isLoading || !bars
            ? (
              <Skeleton />
              )
            : bars.length === 0
              ? (
                <Box css={theme({ p: 4 })}>
                  <Mono css={theme({ fontSize: 0, color: SYNTAX.muted })}>
                    No server-timing header on this response.
                  </Mono>
                </Box>
                )
              : (
                <Box css={theme({ p: 3, maxHeight: '380px', overflow: 'auto' })}>
                  <Flex
                    css={theme({
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 3
                    })}
                  >
                    <Box
                      as='span'
                      css={theme({ fontSize: 1, fontWeight: 600, color: INK })}
                    >
                      Total server time
                    </Box>
                    <Box
                      as='span'
                      css={theme({ fontSize: 2, fontWeight: 'bold', color: INK })}
                    >
                      {totalMs != null ? `${Math.round(totalMs)}ms` : '—'}
                    </Box>
                  </Flex>
                  {bars.map(b => (
                    <Box key={b.name} css={theme({ mb: 3 })}>
                      <Flex
                        css={theme({
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          mb: 2
                        })}
                      >
                        <Mono css={theme({ fontSize: 0, color: INK })}>
                          {b.name}
                        </Mono>
                        <Mono css={theme({ fontSize: 0, color: SYNTAX.muted })}>
                          {b.dur}
                        </Mono>
                      </Flex>
                      <Box
                        css={theme({
                          height: '8px',
                          borderRadius: '999px',
                          background: '#F0F0F2',
                          overflow: 'hidden'
                        })}
                      >
                        <Box
                          css={theme({
                            height: '100%',
                            borderRadius: '999px',
                            width: b.pct,
                            background: b.color
                          })}
                        />
                      </Box>
                    </Box>
                  ))}
                  <Box
                    css={theme({
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: 2,
                      mt: 3,
                      pb: 2,
                      borderBottom: '1px solid #EFEFF1',
                      fontFamily: 'mono',
                      fontSize: 0,
                      letterSpacing: '.05em',
                      color: SYNTAX.muted,
                      textTransform: 'uppercase'
                    })}
                  >
                    <span>Metric</span>
                    <Box as='span' css={theme({ textAlign: 'right' })}>
                      Duration
                    </Box>
                    <Box as='span' css={theme({ textAlign: 'right' })}>
                      % of total
                    </Box>
                  </Box>
                  {rows.map(r => (
                    <Box
                      key={r.name}
                      css={theme({
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: 2,
                        py: 3,
                        borderBottom: '1px solid #F2F2F4',
                        fontFamily: 'mono',
                        fontSize: 0,
                        color: SYNTAX.body
                      })}
                    >
                      <span>{r.name}</span>
                      <Box
                        as='span'
                        css={theme({ textAlign: 'right', color: SYNTAX.muted })}
                      >
                        {r.dur}
                      </Box>
                      <Box
                        as='span'
                        css={theme({ textAlign: 'right', color: SYNTAX.muted })}
                      >
                        {r.pct}
                      </Box>
                    </Box>
                  ))}
                </Box>
                ))}

        {!isError && tab === 'code' && (
          <Box>
            <Box
              css={theme({
                fontFamily: 'mono',
                fontSize: 0,
                letterSpacing: '.06em',
                color: SYNTAX.muted,
                pt: 3,
                px: 3
              })}
            >
              JAVASCRIPT / NODE.JS
            </Box>
            <Code
              css={theme({
                pt: 3,
                px: 3,
                pb: 4,
                fontSize: 0,
                lineHeight: '2',
                maxHeight: '340px',
                color: INK
              })}
            >
              <Num>import</Num> mql <Num>from</Num> <Str>'@microlink/mql'</Str>
              {'\n\n'}
              <Num>const</Num> {'{'} status, data, headers, redirects {'}'} ={' '}
              <Num>await</Num> mql(<Str>'{D.fullUrl}'</Str>
              {hasOpts && <>, {renderJsValue(opts, 'opts')}</>}){'\n\n'}
              console.<Fn>log</Fn>(status){'     '}
              <Comment>{"// => 'success'"}</Comment>
              {'\n'}
              console.<Fn>log</Fn>(data){'       '}
              <Comment>{'// => response payload'}</Comment>
              {'\n'}
              console.<Fn>log</Fn>(headers){'    '}
              <Comment>{'// => response headers'}</Comment>
              {'\n'}
              console.<Fn>log</Fn>(redirects){'  '}
              <Comment>{'// => redirect chain'}</Comment>
            </Code>
          </Box>
        )}
      </TabContent>
    </Panel>
  )
}

// the live-response label reports request status: a shimmering "running…"
// while in flight, then the resolved status code (green) or error (red)
const requestStatus = req => {
  if (req.status === 'loading') {
    return { text: 'running…', color: VIOLET, live: true }
  }
  if (req.status === 'error') {
    return { text: `${req.statusCode || ''} error`.trim(), color: '#DC2626' }
  }
  return {
    text: `${req.statusCode} ${req.body?.status || 'success'}`,
    color: SYNTAX.string
  }
}

/* ---------------------------------- hero --------------------------------- */

const Hero = () => {
  const [dText, setDText] = useState(CYCLE[0])
  const [dTab, setDTab] = useState('output')
  const [dVert, setDVert] = useState(null)
  // null = unmounted; 'pre' → 'open' → 'closing' drives the popover transition
  const [menuState, setMenuState] = useState(null)
  // the executed request shown in the panel — decoupled from the live composer
  // so the typing animation never disturbs the last result
  const [req, setReq] = useState(() => {
    const d = derive(CYCLE[0])
    return {
      status: 'loading',
      D: d,
      apiUrl: getApiUrl(d.fullUrl, REQUEST_OPTS[d.vertical] || {})[0]
    }
  })
  // monotonic id so a slow response can't overwrite a newer one
  const reqId = useRef(0)
  const anim = useRef({
    ci: 0,
    phase: 'pause',
    userTook: false,
    timer: null,
    text: CYCLE[0]
  })
  const chipRef = useRef(null)
  const menuTimer = useRef(null)
  const menuRaf = useRef(null)

  const stopTyping = () => {
    anim.current.userTook = true
    clearTimeout(anim.current.timer)
  }

  const openMenu = () => {
    clearTimeout(menuTimer.current)
    setMenuState('pre')
    // two frames so the 'pre' (scaled-down) state paints before 'open' tweens
    menuRaf.current = window.requestAnimationFrame(() => {
      menuRaf.current = window.requestAnimationFrame(() => setMenuState('open'))
    })
  }

  const closeMenu = () => {
    clearTimeout(menuTimer.current)
    window.cancelAnimationFrame(menuRaf.current)
    setMenuState(s => (s ? 'closing' : s))
    menuTimer.current = setTimeout(() => setMenuState(null), 150)
  }

  const toggleMenu = () => {
    if (menuState === 'open' || menuState === 'pre') closeMenu()
    else openMenu()
  }

  // fire a real Microlink request for the given derived snapshot and stream the
  // result (data / headers / timing) into the panel
  const runRequest = useCallback(async snapshot => {
    if (!snapshot.hasUrl) return
    const opts = REQUEST_OPTS[snapshot.vertical] || {}
    const apiUrl = getApiUrl(snapshot.fullUrl, opts)[0]
    const id = ++reqId.current
    setReq({ status: 'loading', D: snapshot, apiUrl })
    const t0 = window.performance.now()
    try {
      const { response, ...body } = await mql(snapshot.fullUrl, opts)
      if (id !== reqId.current) return
      const headers = response && response.headers
      const { bars, rows, totalMs } = parseServerTiming(headers)
      setReq({
        status: 'success',
        D: snapshot,
        apiUrl,
        body,
        headerRows: headersToRows(headers),
        bars,
        rows,
        totalMs,
        statusCode: (response && response.statusCode) || 200,
        elapsedMs: Math.round(window.performance.now() - t0)
      })
    } catch (err) {
      if (id !== reqId.current) return
      setReq({
        status: 'error',
        D: snapshot,
        apiUrl,
        statusCode: err && err.statusCode,
        error: (err && err.message) || 'The request could not be completed.',
        elapsedMs: Math.round(window.performance.now() - t0)
      })
    }
  }, [])

  useEffect(() => {
    // respect reduced motion: keep a single static prompt, no auto-typing
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }
    const a = anim.current
    const apply = t => {
      a.text = t
      setDText(t)
    }
    const tick = () => {
      if (a.userTook) return
      if (a.phase === 'pause') {
        a.phase = 'deleting'
        a.timer = setTimeout(tick, 50)
        return
      }
      if (a.phase === 'deleting') {
        if (a.text.length > 0) {
          apply(a.text.slice(0, -1))
          a.timer = setTimeout(tick, 28)
          return
        }
        a.ci = (a.ci + 1) % CYCLE.length
        a.phase = 'typing'
        a.timer = setTimeout(tick, 160)
        return
      }
      const target = CYCLE[a.ci]
      if (a.text.length < target.length) {
        apply(target.slice(0, a.text.length + 1))
        a.timer = setTimeout(tick, 48 + Math.random() * 40)
        return
      }
      a.phase = 'pause'
      a.timer = setTimeout(tick, 2600)
    }
    a.timer = setTimeout(tick, 2400)
    return () => clearTimeout(a.timer)
  }, [])

  useEffect(() => {
    if (menuState !== 'open') return undefined
    const onDown = e => {
      if (chipRef.current && !chipRef.current.contains(e.target)) {
        closeMenu()
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [menuState])

  // execute the default example once on mount so the panel shows live data
  useEffect(() => {
    runRequest(derive(CYCLE[0]))
  }, [runRequest])

  const D = derive(dText, dVert)
  const liveStatus = requestStatus(req)

  const handleRun = () => {
    stopTyping()
    closeMenu()
    runRequest(D)
  }

  const onComposerChange = e => {
    stopTyping()
    anim.current.text = e.target.value
    setDText(e.target.value)
    setDVert(null)
    closeMenu()
  }

  const pickExample = value => () => {
    stopTyping()
    anim.current.text = value
    setDVert(null)
    closeMenu()
    setDText(value)
  }

  return (
    <Section id='hero'>
      <Overlay start='60%' />
      <Content>
        <Badge>
          <PulseDot />
          Trusted by apps, agents & AI · {reqsRounded}+ requests / month
        </Badge>

        <Headline>
          The web, <span>automated</span>
        </Headline>
        <Subtitle>Everything your software needs from any URL.</Subtitle>

        {/* composer */}
        <Composer>
          <ComposerInput
            value={dText}
            onChange={onComposerChange}
            onFocus={stopTyping}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.target.blur()
                handleRun()
              }
            }}
            placeholder='Ask Microlink anything…'
            aria-label='Ask Microlink anything'
          />
          <Flex
            css={theme({
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              p: 2
            })}
          >
            <Flex
              css={theme({ alignItems: 'center', gap: 2, minHeight: '34px' })}
            >
              <VertChip
                ref={chipRef}
                $border={D.vertBorder}
                onClick={e => {
                  e.stopPropagation()
                  stopTyping()
                  toggleMenu()
                }}
              >
                <IconBadge
                  css={theme({
                    width: '24px',
                    height: '24px',
                    background: SELF_BADGED.has(D.vertical) ? 'none' : GRADIENT,
                    color: 'white'
                  })}
                >
                  <VertGlyph
                    vertical={D.vertical}
                    size={SELF_BADGED.has(D.vertical) ? 24 : 15}
                  />
                </IconBadge>
                <Box
                  as='span'
                  css={theme({ fontSize: 0, fontWeight: 600, color: INK })}
                >
                  {D.label}
                </Box>
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#9A9AA0'
                  strokeWidth='2.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='m6 9 6 6 6-6' />
                </svg>
                {menuState && (
                  <VertMenu
                    data-state={menuState}
                    css={theme({
                      position: 'absolute',
                      bottom: 'calc(100% + 8px)',
                      left: 0,
                      zIndex: 30,
                      width: '230px',
                      background: 'white',
                      border: '1px solid #E6E4EA',
                      borderRadius: 5,
                      boxShadow: '0 24px 48px -20px rgba(40,10,60,.35)',
                      p: 2
                    })}
                  >
                    {VERTICAL_ORDER.map(k => {
                      const active = k === D.vertical
                      return (
                        <Flex
                          key={k}
                          onClick={e => {
                            e.stopPropagation()
                            setDVert(k)
                            closeMenu()
                          }}
                          css={theme({
                            alignItems: 'center',
                            gap: 2,
                            py: 2,
                            px: 2,
                            borderRadius: 4,
                            cursor: 'pointer',
                            background: active
                              ? 'rgba(255,30,140,.06)'
                              : 'transparent'
                          })}
                        >
                          <IconBadge
                            css={theme({
                              width: '26px',
                              height: '26px',
                              background: SELF_BADGED.has(k)
                                ? 'none'
                                : active
                                  ? GRADIENT
                                  : '#EDEBF0',
                              color: active ? '#fff' : '#9A9AA0'
                            })}
                          >
                            <VertGlyph
                              vertical={k}
                              size={SELF_BADGED.has(k) ? 26 : 16}
                            />
                          </IconBadge>
                          <Box
                            as='span'
                            css={theme({
                              fontSize: 0,
                              fontWeight: active ? 600 : 500,
                              color: INK
                            })}
                          >
                            {LABELS[k]}
                          </Box>
                          {active && (
                            <svg
                              width='15'
                              height='15'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke={VIOLET}
                              strokeWidth='3'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              css={theme({ ml: 'auto' })}
                            >
                              <path d='M20 6 9 17l-5-5' />
                            </svg>
                          )}
                        </Flex>
                      )
                    })}
                  </VertMenu>
                )}
              </VertChip>
              {D.hasUrl && (
                <Mono css={theme({ fontSize: 0, color: VIOLET })}>{D.url}</Mono>
              )}
            </Flex>
            <RunButton
              type='button'
              aria-label='Run'
              onClick={handleRun}
              disabled={!D.hasUrl || req.status === 'loading'}
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#fff'
                strokeWidth='2.4'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M5 12h14M13 6l6 6-6 6' />
              </svg>
            </RunButton>
          </Flex>
        </Composer>

        {/* example chips */}
        <Flex
          css={theme({
            gap: 2,
            mt: 4,
            flexWrap: 'wrap',
            justifyContent: 'center'
          })}
        >
          {EXAMPLES.map(ex => (
            <ExampleChip
              key={ex}
              $border={D.vertBorder}
              onClick={pickExample(ex)}
            >
              <Box as='span' css={theme({ color: VIOLET, display: 'flex' })}>
                <VertGlyph vertical={parseLocal(ex).vertical} size={15} />
              </Box>
              {ex}
            </ExampleChip>
          ))}
        </Flex>

        {/* live response — doubles as the request status reporter */}
        <Caps
          css={theme({
            display: 'inline-flex',
            alignItems: 'center',
            gap: 2,
            mt: 4,
            fontFamily: 'mono',
            fontSize: 0,
            color: liveStatus.color
          })}
        >
          <FeatherIcon icon={WandSparkles} size={0} color={liveStatus.color} />
          {liveStatus.live
            ? (
              <ShimmerText data-text={liveStatus.text}>
                {liveStatus.text}
              </ShimmerText>
              )
            : (
                liveStatus.text
              )}
        </Caps>

        <ResultPanel tab={dTab} setTab={setDTab} req={req} />
      </Content>
    </Section>
  )
}

export default Hero
