import Box from 'components/elements/Box'
import Spinner from 'components/elements/Spinner'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Dot from 'components/elements/Dot/Dot'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import Heading from 'components/elements/Heading'
import Caption from 'components/patterns/Caption/Caption'
import Overlay from 'components/pages/home/overlay'
import Output, { PANEL_HEIGHT } from 'components/pages/home/output'
import FeatherIcon from 'components/icons/Feather'
import { WandSparkles } from 'components/icons/WandSparkles'
import {
  PRODUCTS,
  SEARCH_EXAMPLE,
  VERTICAL_ORDER
} from 'components/pages/home/catalog'
import heroDemoRequests from 'components/pages/home/hero-demo-requests'
import { blink } from 'components/keyframes'
import { trackEvent } from 'helpers/plausible'
import { isRateLimited } from 'helpers/api-error'
import { escText } from 'helpers/link-card'
import { parseServerTimingEntries } from 'helpers/server-timing'
import {
  REDUCED_MOTION_MEDIA,
  prefersReducedMotion
} from 'helpers/reduced-motion'
import {
  transition,
  timings,
  space,
  theme,
  colors,
  gradient,
  gradientStops
} from 'theme'
import { rgba } from 'polished'
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import styled, { css, keyframes } from 'styled-components'
import mql, { getApiUrl } from '@microlink/mql'

import { Copy as CopyIcon, Check as CheckIcon } from 'react-feather'

import analyticsData from '../../../../data/analytics.json'
import screenshotSnapshot from '../../../../static/data/hero-demo/screenshot.json'

const [{ reqs_pretty: reqsPretty }] = analyticsData

const VIOLET = colors.grape7
const INK = colors.black
const GRADIENT = gradient

const SUCCESS = colors.green8
const ERROR = colors.red7
const WARN = colors.orange7

const SYNTAX = {
  key: 'link',
  string: 'gray9',
  literal: 'secondary',
  number: 'secondary',
  boolean: 'secondary',
  fn: 'link',
  muted: 'gray5',
  body: 'gray8'
}

const reduceMotion = REDUCED_MOTION_MEDIA

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

const EASE_SMOOTH = timings.smooth

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`

const riseIn = keyframes`
  from { opacity: 0; transform: translateY(8px); filter: blur(3px) }
  to { opacity: 1; transform: translateY(0); filter: blur(0) }
`

const shimmer = keyframes`
  0% { background-position: 100% 0 }
  100% { background-position: 0% 0 }
`

const skeletonPulse = keyframes`
  0%, 100% { opacity: 1 }
  50% { opacity: 0.45 }
`

const loadingSlide = keyframes`
  0% { transform: translateX(-100%) }
  100% { transform: translateX(400%) }
`

const VertGlyph = ({ vertical, size = 16 }) => {
  const Icon = PRODUCTS[vertical] && PRODUCTS[vertical].icon
  const px = `${size}px`
  return Icon ? <Icon width={px} height={px} /> : null
}

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

const {
  FN_SNIPPET,
  REQUEST_OPTS,
  SNAPSHOT_URLS,
  INITIAL_VERTICAL,
  heroDemoPath,
  shortUrl,
  canonicalDemoUrl
} = heroDemoRequests

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
  const expected = Object.keys(PRODUCTS).filter(key => !except.includes(key))
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

const TIMING_COLORS = ['green5', 'blue5', 'yellow5', 'pink5', 'grape5', 'teal5']

const headersToRows = headers => {
  if (!headers) return []
  return Object.entries(headers)
    .map(([k, v]) => ({ k, v }))
    .sort((a, b) => a.k.localeCompare(b.k))
}

const parseServerTiming = raw => {
  if (!raw) return { bars: [], rows: [], totalMs: null }

  const entries = parseServerTimingEntries(raw).map(e => ({
    name: e.name,
    dur: e.dur ?? 0
  }))

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

const GUTTER_X = `clamp(${space[3]}, 4vw, 40px)`
const PADDING_BOTTOM = `clamp(${space[4]}, 5vw, ${space[5]})`

const Section = styled.section`
  -webkit-font-smoothing: antialiased;
  padding-right: ${GUTTER_X};
  padding-bottom: ${PADDING_BOTTOM};
  padding-left: ${GUTTER_X};
  ${theme({
    position: 'relative',
    fontFamily: 'sans',
    color: 'black'
  })};
`

const Content = styled(Container)`
  ${theme({
    position: 'relative',
    zIndex: 1,
    maxWidth: '1080px',
    alignItems: 'center',
    textAlign: 'center',
    p: 0
  })};

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

  ${reduceMotion} {
    & > * {
      animation-name: ${fadeIn};
    }
  }
`

const Badge = styled.span`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '9px',
    fontSize: 0,
    fontWeight: 'regular',
    bg: 'white',
    color: 'gray8',
    border: 1,
    borderColor: 'gray2',
    py: '7px',
    px: 3,
    borderRadius: '999px',
    mb: '26px'
  })};
`

const composerFocus = css`
  ${theme({
    borderColor: rgba(colors.grape7, 0.45),
    boxShadow: `0 0 6px 3px ${rgba(colors.grape7, 0.14)}`
  })};
`

const Composer = styled.div`
  transition: border-color ${transition.short}, box-shadow ${transition.short};
  ${theme({
    position: 'relative',
    zIndex: 20,
    width: '100%',
    maxWidth: '680px',
    mt: '38px',
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: '18px',
    p: '6px',
    boxShadow: `0 0 6px 0 ${rgba(colors.grape7, 0)}`,
    textAlign: 'left'
  })};

  &:has([contenteditable='true']:focus) {
    ${composerFocus}
  }

  ${reduceMotion} {
    transition: none;
  }
`

const ComposerEditor = styled.div`
  outline: none;
  cursor: text;
  scrollbar-width: none;
  ${theme({
    width: '100%',
    fontFamily: 'sans',
    fontSize: '18px',
    color: 'black',
    pt: '18px',
    px: '18px',
    pb: '10px',
    whiteSpace: 'pre',
    overflowX: 'auto',
    overflowY: 'hidden'
  })};

  &::-webkit-scrollbar {
    display: none;
  }

  &:empty::before {
    content: attr(data-placeholder);
    ${theme({ color: 'gray4' })};
  }

  [data-url-tag] {
    text-shadow: rgba(0, 0, 0, 0.05) 0px 1px;
    ${theme({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      color: 'secondary',
      fontFamily: 'mono',
      fontWeight: 'normal',
      px: '4px'
    })};
  }

  [data-url-action] {
    cursor: pointer;
    ${theme({
      display: 'none',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 'none',
      width: '16px',
      height: '16px',
      color: 'inherit'
    })};
  }

  [data-url-tag]:hover [data-url-action] {
    display: inline-flex;
  }

  [data-caret] {
    animation: ${blink} 1s cubic-bezier(1, 0, 0, 1) infinite;
    ${theme({
      display: 'inline-block',
      width: '2px',
      height: '1.05em',
      ml: '1px',
      verticalAlign: 'text-bottom',
      borderRadius: '1px',
      bg: 'secondary'
    })};
  }

  ${reduceMotion} {
    [data-caret] {
      animation: none;
      opacity: 1;
    }
  }
`

const CLOSE_ICON_SVG =
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'

const composerHtml = (segments, { caret }) => {
  let html = ''
  if (segments.before) html += escText(segments.before)
  if (segments.url) {
    html +=
      '<span data-url-tag contenteditable="false">' +
      escText(segments.url) +
      '<span data-url-action role="button" tabindex="-1" aria-label="Remove URL">' +
      CLOSE_ICON_SVG +
      '</span>' +
      '</span>'
  }
  if (segments.after) html += escText(segments.after)
  if (caret) html += '<span data-caret aria-hidden="true"></span>'
  return html
}

const readComposerText = el =>
  (el.textContent || '').replace(/\u00a0/g, ' ').replace(/[\r\n]+/g, ' ')

const getCaretOffset = el => {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return null
  const range = sel.getRangeAt(0)
  if (!el.contains(range.endContainer)) return null
  const pre = range.cloneRange()
  pre.selectNodeContents(el)
  pre.setEnd(range.endContainer, range.endOffset)
  return pre.toString().length
}

const setCaretOffset = (el, offset) => {
  const sel = window.getSelection()
  if (!sel) return
  const range = document.createRange()
  const walker = document.createTreeWalker(el, window.NodeFilter.SHOW_TEXT)
  let remaining = offset
  let placed = false
  let node
  while ((node = walker.nextNode())) {
    const len = node.textContent.length
    if (remaining <= len) {
      const atomic =
        node.parentElement && node.parentElement.closest('[data-url-tag]')
      if (atomic) {
        if (remaining === 0) range.setStartBefore(atomic)
        else range.setStartAfter(atomic)
      } else {
        range.setStart(node, remaining)
      }
      placed = true
      break
    }
    remaining -= len
  }
  if (!placed) range.selectNodeContents(el)
  range.collapse(placed)
  sel.removeAllRanges()
  sel.addRange(range)
}

const VertChip = styled.button`
  cursor: pointer;
  font: inherit;
  color: inherit;
  border: 1px solid ${props => props.$border};
  transition: transform ${transition.short};
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2,
    flexShrink: 0,
    textAlign: 'left',
    bg: 'white',
    borderRadius: '10px',
    py: '5px',
    pr: '9px',
    pl: '6px'
  })};

  &:active {
    transform: scale(0.98);
  }
`

const RunButton = styled.button`
  cursor: pointer;
  background: ${GRADIENT};
  transition: transform ${transition.short}, filter ${transition.short};
  ${theme({
    border: 0,
    width: '42px',
    height: '42px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  })};

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
  transition: border-color ${transition.short}, color ${transition.short},
    transform ${transition.short};
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    fontFamily: 'sans',
    fontSize: '13px',
    bg: 'white',
    color: 'gray7',
    border: 1,
    borderColor: 'gray2',
    py: 2,
    px: '13px',
    borderRadius: '999px'
  })};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${props => props.$border};
      ${theme({ color: 'black' })};
    }
  }

  &:active {
    transform: scale(0.97);
  }
`

const HeroActions = styled(Flex)`
  ${theme({
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    mt: '22px',
    flexWrap: 'wrap'
  })};
`

const actionPill = css`
  cursor: pointer;
  transition: border-color ${transition.short}, color ${transition.short},
    background ${transition.short}, transform ${transition.short};
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    fontFamily: 'sans',
    fontSize: '13px',
    fontWeight: 'regular',
    py: '9px',
    px: 3,
    borderRadius: '999px'
  })};

  &:active {
    transform: scale(0.97);
  }
`

const CopyPromptButton = styled.button`
  ${actionPill};
  ${theme({
    bg: 'white',
    color: 'gray7',
    border: 1,
    borderColor: 'gray2'
  })};

  &[data-copied='true'] {
    ${theme({ color: 'green8', borderColor: 'green8' })};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      ${theme({ borderColor: 'grape7', color: 'black' })};
    }
  }
`

const Panel = styled.div`
  ${theme({
    position: 'relative',
    width: '100%',
    maxWidth: '980px',
    mt: '14px',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 5,
    overflow: 'hidden',
    bg: 'white',
    textAlign: 'left',
    boxShadow: '0 24px 60px -40px rgba(40, 10, 60, 0.35)'
  })};
`

const TabBar = styled.div`
  ${theme({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '28px'
  })};
`

const TabButton = styled.button`
  cursor: pointer;
  color: ${props => (props.$active ? INK : colors.gray6)};
  transition: color ${transition.short};
  ${theme({
    border: 0,
    bg: 'transparent',
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'regular',
    textTransform: 'uppercase',
    letterSpacing: 2,
    pt: 0,
    px: 0,
    pb: '14px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2
  })};

  &:focus-visible {
    ${theme({ borderRadius: 2 })};
  }
`

const TabIndicator = styled.span`
  transform: translateX(0);
  transition: transform 250ms ${EASE_SMOOTH}, width 250ms ${EASE_SMOOTH};
  will-change: transform, width;
  ${theme({
    position: 'absolute',
    bottom: '-1px',
    left: 0,
    height: '2px',
    width: 0,
    bg: 'black',
    pointerEvents: 'none'
  })};

  ${reduceMotion} {
    transition: none;
  }
`

const VertMenu = styled(Box)`
  will-change: transform, opacity;

  &[data-state='pre'] {
    opacity: 0;
    transform: translateY(-8px);
    pointer-events: none;
  }
  &[data-state='open'] {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 200ms ${EASE_SMOOTH}, transform 220ms ${EASE_SMOOTH};
  }
  &[data-state='closing'] {
    opacity: 0;
    transform: translateY(-6px);
    pointer-events: none;
    transition: opacity 140ms ${EASE_SMOOTH}, transform 160ms ${EASE_SMOOTH};
  }

  ${reduceMotion} {
    transition: none;
    transform: none;
  }
`

const TabContent = styled.div`
  animation: ${fadeIn} ${transition.short};
  ${theme({ minHeight: [null, null, PANEL_HEIGHT, PANEL_HEIGHT] })};

  ${reduceMotion} {
    animation: none;
  }
`

const Mono = styled(Text).attrs({ as: 'span' })`
  ${theme({ fontFamily: 'mono' })};
`

const ShimmerText = styled.span`
  ${theme({
    position: 'relative',
    display: 'inline-block',
    color: 'grape7'
  })};

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
  error: { color: ERROR, background: colors.red0 },
  warning: { color: WARN, background: colors.orange0 }
}

const StatusPill = styled.span`
  color: ${p => PILL_TONES[p.$tone].color};
  background: ${p => PILL_TONES[p.$tone].background};
  ${theme({
    fontFamily: 'mono',
    fontSize: '13px',
    fontWeight: 'regular',
    py: '5px',
    px: '12px',
    borderRadius: '999px',
    whiteSpace: 'nowrap'
  })};
`

const RateLimitLink = styled.a`
  ${theme({
    fontFamily: 'sans',
    fontSize: '13px',
    fontWeight: 'regular',
    color: 'grape7',
    textDecoration: 'none'
  })};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      text-decoration: underline;
    }
  }
`

const Code = styled.pre`
  ${theme({
    m: 0,
    p: '22px',
    fontFamily: 'mono',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    maxHeight: PANEL_HEIGHT,
    overflow: 'auto'
  })};
`

const JSON_TOKEN =
  /("(?:\\.|[^"\\])*")(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g

const tokenizeJson = src => {
  const text = JSON.stringify(src, null, 2)
  const nodes = []
  let last = 0
  let key = 0
  let match

  JSON_TOKEN.lastIndex = 0
  while ((match = JSON_TOKEN.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const token = match[0]

    if (match[1] && match[2] !== undefined) {
      nodes.push(
        <Box as='span' key={key++} css={theme({ color: SYNTAX.key })}>
          {match[1]}
        </Box>
      )
      nodes.push(match[2])
    } else if (match[1]) {
      nodes.push(
        <Box as='span' key={key++} css={theme({ color: SYNTAX.string })}>
          {token}
        </Box>
      )
    } else {
      const color =
        token === 'true' || token === 'false'
          ? SYNTAX.boolean
          : token === 'null'
            ? SYNTAX.literal
            : SYNTAX.number
      nodes.push(
        <Box as='span' key={key++} css={theme({ color })}>
          {token}
        </Box>
      )
    }

    last = JSON_TOKEN.lastIndex
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

const jsonNodesCache = new WeakMap()

const JsonView = ({ src }) => {
  let nodes = jsonNodesCache.get(src)
  if (!nodes) {
    nodes = tokenizeJson(src)
    jsonNodesCache.set(src, nodes)
  }

  return (
    <Code css={theme({ fontSize: 0, lineHeight: 1.85, color: SYNTAX.body })}>
      {nodes}
    </Code>
  )
}

const LoadingBar = styled.span`
  background: ${GRADIENT};
  animation: ${loadingSlide} 1s ease-in-out infinite;
  ${theme({
    position: 'absolute',
    top: 0,
    left: 0,
    height: '2px',
    width: '25%'
  })};
  ${reduceMotion} {
    animation: none;
    width: 100%;
    opacity: 0.4;
  }
`

const SkeletonLine = styled.span`
  animation: ${skeletonPulse} 1.2s ease-in-out infinite;
  ${theme({
    display: 'block',
    height: '12px',
    borderRadius: 3,
    bg: 'gray1'
  })};
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

const IconBadge = styled(Box)`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '7px',
    flexShrink: 0
  })};
`

const GLYPH_STROKE_GRADIENT_ID = 'microlinkGlyphStroke'
const GLYPH_FILL_GRADIENT_ID = 'microlinkGlyphFill'

const GradientDefs = styled.svg`
  position: absolute;
  width: 0;
  height: 0;
`

const glyphGradientFill = css`
  svg[fill='none'] {
    stroke: url(#${GLYPH_STROKE_GRADIENT_ID});
  }

  svg:not([fill='none']),
  svg:not([fill='none']) * {
    fill: url(#${GLYPH_FILL_GRADIENT_ID});
  }
`

const GlyphBadge = styled(IconBadge)`
  ${theme({ bg: 'transparent' })};
  ${glyphGradientFill}
`

const MenuBadge = styled(IconBadge)`
  ${theme({ width: '26px', height: '26px', bg: 'transparent' })};
  ${glyphGradientFill}
`

const MenuLabel = styled.span`
  ${theme({
    fontSize: 0,
    fontWeight: 'regular',
    color: 'black',
    whiteSpace: 'nowrap',
    minWidth: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  })};
`

const menuItemHighlight = css`
  ${theme({ bg: `color-mix(in oklch, ${colors.secondary} 6%, transparent)` })};
`

const MenuItem = styled(Flex)`
  cursor: pointer;
  font: inherit;
  color: inherit;
  transition: background ${transition.short};
  ${theme({
    alignItems: 'center',
    gap: 2,
    p: 2,
    borderRadius: 4,
    width: '100%',
    minWidth: 0,
    border: 0,
    textAlign: 'left',
    bg: 'transparent'
  })};

  &:focus-visible {
    outline-offset: -2px;
  }
  &[data-active='true'] {
    ${menuItemHighlight}
    ${MenuLabel} {
      ${theme({ fontWeight: 'bold' })};
    }
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      ${menuItemHighlight}
    }
  }
`

const Str = styled.span`
  ${theme({ color: SYNTAX.string })};
`
const Num = styled.span`
  ${theme({ color: SYNTAX.number })};
`
const Bool = styled.span`
  ${theme({ color: SYNTAX.boolean })};
`
const Fn = styled.span`
  ${theme({ color: SYNTAX.fn })};
`
const Comment = styled.span`
  ${theme({ color: SYNTAX.muted })};
`

const renderJsValue = (value, keyBase) => {
  if (typeof value === 'boolean') return <Bool>{String(value)}</Bool>
  if (typeof value === 'number') return <Num>{value}</Num>
  if (typeof value === 'string') {
    const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
    return <Str>{`'${escaped}'`}</Str>
  }
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

const jsValueText = value => {
  if (typeof value === 'string') {
    return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
  }
  if (typeof value !== 'object' || value === null) return String(value)
  return `{ ${Object.entries(value)
    .map(([k, v]) => `${k}: ${jsValueText(v)}`)
    .join(', ')} }`
}

const snippetText = (snippet, arg) => {
  const call = snippet.code
    ? `(\n  '${arg}',\n  ${snippet.code}\n)`
    : `('${arg}'${snippet.opts ? `, ${jsValueText(snippet.opts)}` : ''})`
  return [
    INSTALL_COMMENT,
    "import createClient from 'microlink.io'",
    '',
    'const microlink = createClient({ apiKey: process.env.MICROLINK_API_KEY })',
    '',
    `const ${snippet.binding} = await microlink.${snippet.method}${call}`,
    '',
    `// ${snippet.comment}`,
    `console.log(${snippet.log})`
  ].join('\n')
}

const copyBody = (req, tab, snippet, snippetArg) => {
  if (tab === 'headers') {
    return (req.headerRows || []).map(({ k, v }) => `${k}: ${v}`).join('\n')
  }
  if (tab === 'timing') {
    return (req.rows || [])
      .map(({ name, dur, pct }) => `${name}  ${dur}  ${pct}`)
      .join('\n')
  }
  if (tab === 'code') return snippetText(snippet, snippetArg)
  return JSON.stringify(req.body, null, 2)
}

const copyPayload = (req, tab, snippet, snippetArg) =>
  `// ${req.apiUrl}\n${copyBody(req, tab, snippet, snippetArg)}`

const CopyResultButton = styled.button`
  cursor: pointer;
  transition: color ${transition.short};
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 0,
    bg: 'transparent',
    color: 'gray6',
    p: 1,
    pb: '14px',
    borderRadius: 2
  })};

  &[data-copied='true'] {
    ${theme({ color: 'green8' })};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      ${theme({ color: 'black' })};
    }
  }
`

const ResultPanel = React.memo(({ tab, setTab, req }) => {
  const { D, status, body, headerRows, bars, rows, totalMs } = req
  const isLoading = status === 'loading'
  const isError = status === 'error'
  const isRateLimited = status === 'rate-limited'
  const hideTabs = isError || isRateLimited
  const snippet = CODE_TAB[D.vertical]
  const snippetArg = snippet.query ? SEARCH_EXAMPLE.query : D.fullUrl

  const [copied, setCopied] = useState(false)
  const copiedTimer = useRef(null)
  useEffect(() => () => clearTimeout(copiedTimer.current), [])

  const copyResult = () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    navigator.clipboard
      .writeText(copyPayload(req, tab, snippet, snippetArg))
      .then(() => {
        trackEvent('hero copy result', { tab, product: D.vertical })
        setCopied(true)
        clearTimeout(copiedTimer.current)
        copiedTimer.current = setTimeout(() => setCopied(false), 1500)
      })
      .catch(() => {})
  }

  const tabs = [
    { key: 'output', label: 'Output' },
    { key: 'data', label: 'Data' },
    { key: 'headers', label: 'Headers' },
    { key: 'timing', label: 'Timing' },
    { key: 'code', label: 'Code' }
  ]

  const barRef = useRef(null)
  const indicatorRef = useRef(null)
  const firstPaint = useRef(true)

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
        pill.getBoundingClientRect()
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

  const onTabKeyDown = e => {
    const keys = tabs.map(t => t.key)
    const i = keys.indexOf(tab)
    let next = null
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      next = (i + 1) % keys.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      next = (i - 1 + keys.length) % keys.length
    } else if (e.key === 'Home') {
      next = 0
    } else if (e.key === 'End') {
      next = keys.length - 1
    }
    if (next === null) return
    e.preventDefault()
    setTab(keys[next])
    const btns =
      barRef.current && barRef.current.querySelectorAll('[role="tab"]')
    if (btns && btns[next]) btns[next].focus()
  }

  return (
    <Panel>
      {isLoading && <LoadingBar />}

      <Flex
        css={theme({
          alignItems: 'center',
          gap: 3,
          py: 3,
          px: 3,
          borderBottom: 1,
          borderBottomColor: 'gray1'
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
          <Box as='span' css={theme({ color: 'green8', fontWeight: 'bold' })}>
            GET
          </Box>{' '}
          {req.apiUrl}
        </Mono>
      </Flex>

      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'space-between',
          pt: 3,
          px: 3,
          borderBottom: 1,
          borderBottomColor: 'gray1'
        })}
      >
        <TabBar
          ref={barRef}
          role='tablist'
          aria-label='Response views'
          onKeyDown={onTabKeyDown}
        >
          {tabs.map(t => (
            <TabButton
              key={t.key}
              id={`hero-tab-${t.key}`}
              role='tab'
              aria-selected={tab === t.key}
              aria-controls='hero-tabpanel'
              tabIndex={tab === t.key ? 0 : -1}
              data-active={tab === t.key}
              $active={tab === t.key}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </TabButton>
          ))}
          <TabIndicator ref={indicatorRef} />
        </TabBar>
        {!hideTabs && !isLoading && body && (
          <CopyResultButton
            type='button'
            data-copied={copied}
            aria-label='Copy result'
            onClick={copyResult}
          >
            {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
          </CopyResultButton>
        )}
      </Flex>

      <TabContent
        key={isError ? 'error' : isRateLimited ? 'rate-limited' : tab}
        id='hero-tabpanel'
        role='tabpanel'
        aria-labelledby={`hero-tab-${tab}`}
        tabIndex={0}
      >
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

        {isRateLimited && (
          <Box css={theme({ p: 4 })}>
            <Flex
              css={theme({
                alignItems: 'center',
                gap: 2,
                mb: 3,
                flexWrap: 'wrap'
              })}
            >
              <StatusPill $tone='warning'>rate limited</StatusPill>
            </Flex>
            <Mono
              css={theme({
                fontSize: 0,
                color: SYNTAX.body,
                lineHeight: 1.6,
                wordBreak: 'break-word'
              })}
            >
              You&rsquo;ve hit the public demo rate limit. Get an API key for
              higher limits.
            </Mono>
            <Flex css={theme({ alignItems: 'center', gap: 2, mt: 3 })}>
              <RateLimitLink href='/pricing'>View plans →</RateLimitLink>
            </Flex>
          </Box>
        )}

        {!hideTabs &&
          tab === 'output' &&
          (isLoading || !body ? <Skeleton /> : <Output req={req} />)}

        {!hideTabs &&
          tab === 'data' &&
          (isLoading || !body ? <Skeleton /> : <JsonView src={body} />)}

        {!hideTabs &&
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
                  maxHeight: PANEL_HEIGHT,
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
                      borderBottom: 1,
                      borderBottomColor: 'gray1',
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

        {!hideTabs &&
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
                <Box
                  css={theme({ p: 3, maxHeight: PANEL_HEIGHT, overflow: 'auto' })}
                >
                  <Flex
                    css={theme({
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 3
                    })}
                  >
                    <Box
                      as='span'
                      css={theme({
                        fontSize: 1,
                        fontWeight: 'bold',
                        color: 'black'
                      })}
                    >
                      Total server time
                    </Box>
                    <Box
                      as='span'
                      css={theme({
                        fontSize: 2,
                        fontWeight: 'bold',
                        color: 'black'
                      })}
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
                        <Mono css={theme({ fontSize: 0, color: 'black' })}>
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
                          bg: 'gray1',
                          overflow: 'hidden'
                        })}
                      >
                        <Box
                          css={theme({
                            height: '100%',
                            borderRadius: '999px',
                            width: b.pct,
                            bg: b.color
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
                      borderBottom: 1,
                      borderBottomColor: 'gray1',
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
                        borderBottom: 1,
                        borderBottomColor: 'gray1',
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

        {!hideTabs && tab === 'code' && (
          <Code
            css={theme({
              pt: 4,
              px: 3,
              pb: 4,
              fontSize: 0,
              lineHeight: '2',
              maxHeight: PANEL_HEIGHT,
              color: 'black'
            })}
          >
            <Comment>{INSTALL_COMMENT}</Comment>
            {'\n'}
            <Num>import</Num> createClient <Num>from</Num>{' '}
            <Str>'microlink.io'</Str>
            {'\n\n'}
            <Num>const</Num> microlink = <Fn>createClient</Fn>({'{'} apiKey:
            process.env.MICROLINK_API_KEY {'}'}){'\n\n'}
            <Num>const</Num> {snippet.binding} = <Num>await</Num> microlink.
            <Fn>{snippet.method}</Fn>(
            {snippet.code
              ? (
                <>
                  {'\n  '}
                  <Str>'{snippetArg}'</Str>,{'\n  '}
                  {snippet.code}
                  {'\n'}
                </>
                )
              : (
                <>
                  <Str>'{snippetArg}'</Str>
                  {snippet.opts && <>, {renderJsValue(snippet.opts, 'opts')}</>}
                </>
                )}
            ){'\n\n'}
            <Comment>{`// ${snippet.comment}`}</Comment>
            {'\n'}
            console.<Fn>log</Fn>({snippet.log})
          </Code>
        )}
      </TabContent>
    </Panel>
  )
})

const fmtDuration = ms =>
  ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`

const requestStatus = req => {
  if (req.status === 'loading') {
    return { text: 'running…', color: VIOLET, live: true }
  }
  if (req.status === 'rate-limited') {
    return { text: 'rate limited', color: WARN }
  }
  const took = req.elapsedMs != null ? ` in ${fmtDuration(req.elapsedMs)}` : ''
  if (req.status === 'error') {
    return { text: `error${took}`, color: ERROR }
  }
  return {
    text: `${req.body?.status || 'success'}${took}`,
    color: SUCCESS
  }
}

const SHARE_QUERY_KEY = 'q'
const SHARE_PRODUCT_KEY = 'product'

const readSharedState = () => {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  const q = params.get(SHARE_QUERY_KEY)
  if (!q || !q.trim()) return null
  const product = params.get(SHARE_PRODUCT_KEY)
  return { q, product: product && PRODUCTS[product] ? product : null }
}

const writeSharedState = (text, vertical) => {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  params.set(SHARE_QUERY_KEY, text)
  if (vertical) params.set(SHARE_PRODUCT_KEY, vertical)
  else params.delete(SHARE_PRODUCT_KEY)
  const { pathname, hash } = window.location
  window.history.replaceState(
    window.history.state,
    '',
    `${pathname}?${params.toString()}${hash}`
  )
}

const loadingReq = snapshot => ({
  status: 'loading',
  D: snapshot,
  apiUrl: getApiUrl(snapshot.fullUrl, REQUEST_OPTS[snapshot.vertical] || {})[0]
})

const demoSnapshots = new Map()

const fetchDemoSnapshot = vertical => {
  let promise = demoSnapshots.get(vertical)
  if (!promise) {
    promise = window
      .fetch(heroDemoPath(vertical))
      .then(res => (res.ok ? res.json() : null))
      .catch(() => null)
    demoSnapshots.set(vertical, promise)
  }
  return promise
}

const snapshotReq = (snapshot, cached, elapsedMs) => ({
  status: 'success',
  D: snapshot,
  apiUrl: cached.apiUrl,
  body: cached.body,
  headerRows: headersToRows(cached.headers),
  ...parseServerTiming(cached.headers['server-timing']),
  elapsedMs
})

demoSnapshots.set(INITIAL_VERTICAL, Promise.resolve(screenshotSnapshot))

const INITIAL_SNAPSHOT = derive(CYCLE[0])

const INITIAL_REQ =
  INITIAL_SNAPSHOT.vertical === INITIAL_VERTICAL &&
  screenshotSnapshot.apiUrl === loadingReq(INITIAL_SNAPSHOT).apiUrl
    ? snapshotReq(INITIAL_SNAPSHOT, screenshotSnapshot)
    : loadingReq(INITIAL_SNAPSHOT)

const Hero = () => {
  const [dText, setDText] = useState(CYCLE[0])
  const [dTab, setDTab] = useState('output')
  const [dVert, setDVert] = useState(null)
  const [menuState, setMenuState] = useState(null)
  const [req, setReq] = useState(INITIAL_REQ)
  const reqId = useRef(0)
  const anim = useRef({
    ci: 0,
    phase: 'pause',
    userTook: false,
    timer: null,
    text: CYCLE[0]
  })
  const chipRef = useRef(null)
  const editorRef = useRef(null)
  const pendingCaret = useRef(null)
  const menuRef = useRef(null)
  const menuTimer = useRef(null)
  const menuRaf = useRef(null)
  const [promptCopied, setPromptCopied] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const copyTimer = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => () => clearTimeout(copyTimer.current), [])

  const copyPrompt = () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return
    navigator.clipboard
      .writeText(agentPrompt(D))
      .then(() => {
        trackEvent('hero copy prompt', { product: D.vertical })
        setPromptCopied(true)
        clearTimeout(copyTimer.current)
        copyTimer.current = setTimeout(() => setPromptCopied(false), 1500)
      })
      .catch(() => {})
  }

  const stopTyping = () => {
    anim.current.userTook = true
    clearTimeout(anim.current.timer)
  }

  const takeOver = text => {
    stopTyping()
    anim.current.text = text
    setDText(text)
  }

  const openMenu = () => {
    clearTimeout(menuTimer.current)
    setMenuState('pre')
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

  const menuVisible = menuState === 'open' || menuState === 'pre'

  const toggleMenu = () => {
    if (menuVisible) closeMenu()
    else openMenu()
  }

  const runRequest = useCallback(async snapshot => {
    if (snapshot.vertical === 'search') {
      reqId.current += 1
      setReq({
        status: 'success',
        D: snapshot,
        apiUrl: `https://pro.microlink.io/?url=${encodeURIComponent(
          snapshot.fullUrl
        )}`,
        body: {
          status: 'success',
          data: {
            query: SEARCH_EXAMPLE.query,
            results: SEARCH_EXAMPLE.payload
          },
          statusCode: 200
        },
        headerRows: [],
        bars: [],
        rows: [],
        totalMs: null,
        elapsedMs: 0
      })
      return
    }

    const opts = REQUEST_OPTS[snapshot.vertical] || {}
    const loading = loadingReq(snapshot)
    const { apiUrl } = loading
    const id = ++reqId.current

    if (snapshot.fullUrl === SNAPSHOT_URLS[snapshot.vertical]) {
      const cachedT0 = window.performance.now()
      const loadingTimer = window.setTimeout(() => {
        if (id === reqId.current) setReq(loading)
      }, 150)
      const cached = await fetchDemoSnapshot(snapshot.vertical)
      window.clearTimeout(loadingTimer)
      if (id !== reqId.current) return
      if (cached && cached.body && cached.apiUrl === apiUrl) {
        setReq(
          snapshotReq(
            snapshot,
            cached,
            Math.round(window.performance.now() - cachedT0) || undefined
          )
        )
        return
      }
    }

    setReq(loading)
    const t0 = window.performance.now()
    try {
      const { response, ...body } = await mql(snapshot.fullUrl, opts)
      if (id !== reqId.current) return
      const headers = response
        ? Object.fromEntries(response.headers.entries())
        : null
      setReq(
        snapshotReq(
          snapshot,
          { apiUrl, body, headers: headers || {} },
          Math.round(window.performance.now() - t0)
        )
      )
    } catch (err) {
      if (id !== reqId.current) return
      if (err && (isRateLimited(err.statusCode) || isRateLimited(err.code))) {
        setReq({ status: 'rate-limited', D: snapshot, apiUrl })
        return
      }
      setReq({
        status: 'error',
        D: snapshot,
        apiUrl,
        error: (err && err.message) || 'The request could not be completed.',
        elapsedMs: Math.round(window.performance.now() - t0)
      })
    }
  }, [])

  useEffect(() => {
    if (readSharedState() || prefersReducedMotion()) {
      return undefined
    }
    const a = anim.current
    a.paused = false
    a.inView = true
    const apply = t => {
      a.text = t
      setDText(t)
    }
    const tick = () => {
      if (a.userTook || a.paused) return
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
    const syncActivity = () => {
      const shouldPause = document.hidden || !a.inView
      if (shouldPause === a.paused) return
      a.paused = shouldPause
      clearTimeout(a.timer)
      if (!shouldPause && !a.userTook) a.timer = setTimeout(tick, 600)
    }
    document.addEventListener('visibilitychange', syncActivity)
    let observer
    if (window.IntersectionObserver && sectionRef.current) {
      observer = new window.IntersectionObserver(([entry]) => {
        a.inView = entry.isIntersecting
        syncActivity()
      })
      observer.observe(sectionRef.current)
    }
    a.timer = setTimeout(tick, 2400)
    return () => {
      clearTimeout(a.timer)
      document.removeEventListener('visibilitychange', syncActivity)
      if (observer) observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (menuState !== 'open') return undefined
    const onDown = e => {
      const inChip = chipRef.current && chipRef.current.contains(e.target)
      const inMenu = menuRef.current && menuRef.current.contains(e.target)
      if (!inChip && !inMenu) closeMenu()
    }
    const onKey = e => {
      if (e.key === 'Escape') {
        closeMenu()
        if (chipRef.current) chipRef.current.focus()
      }
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuState])

  useEffect(() => {
    if (menuState !== 'open') return
    const el =
      menuRef.current && menuRef.current.querySelector('[data-active="true"]')
    if (el) el.focus()
  }, [menuState])

  useEffect(() => {
    const shared = readSharedState()
    if (shared) {
      takeOver(shared.q)
      setDVert(shared.product)
      runRequest(derive(shared.q, shared.product))
    } else if (INITIAL_REQ.status !== 'success') {
      runRequest(INITIAL_SNAPSHOT)
    }
  }, [runRequest])

  const D = useMemo(() => derive(dText, dVert), [dText, dVert])
  const liveStatus = requestStatus(req)
  const canRun = dText.trim().length > 0 && req.status !== 'loading'

  const dSegments = useMemo(() => {
    const { raw } = parseLocal(dText)
    const index = raw ? dText.indexOf(raw) : -1
    if (index === -1) return { before: dText, url: '', after: '' }
    return {
      before: dText.slice(0, index),
      url: raw,
      after: dText.slice(index + raw.length)
    }
  }, [dText])

  const handleRun = () => {
    if (!canRun) return
    stopTyping()
    closeMenu()
    writeSharedState(dText, dVert)
    runRequest(D)
  }

  const onEditorInput = () => {
    const el = editorRef.current
    if (!el) return
    const text = readComposerText(el)
    pendingCaret.current = getCaretOffset(el)
    takeOver(text)
    setDVert(null)
    closeMenu()
  }

  const onEditorPaste = e => {
    e.preventDefault()
    const text = (e.clipboardData?.getData('text/plain') || '').replace(
      /[\r\n]+/g,
      ' '
    )
    document.execCommand('insertText', false, text)
  }

  const onEditorFocus = () => {
    if (!anim.current.userTook) {
      const target = CYCLE[anim.current.ci]
      if (dText !== target) pendingCaret.current = target.length
      takeOver(target)
    } else {
      stopTyping()
    }
    setIsFocused(true)
  }

  useIsomorphicLayoutEffect(() => {
    const el = editorRef.current
    if (!el || pendingCaret.current == null) return
    if (document.activeElement === el) setCaretOffset(el, pendingCaret.current)
    pendingCaret.current = null
  })

  const removeUrl = () => {
    const { raw } = parseLocal(dText)
    if (!raw) return
    const text = dText.replace(raw, '').replace(/ {2,}/g, ' ')
    if (editorRef.current) {
      editorRef.current.focus()
      pendingCaret.current = text.length
    }
    takeOver(text)
    writeSharedState(text, dVert)
  }

  const typedUrl = () => {
    const p = parseLocal(dText)
    if (!p.raw) return null
    const v = dVert || p.vertical
    return canonicalDemoUrl(p.url, v) === DEFAULT_URLS[v] ? null : p.raw
  }

  const pickExample = value => () => {
    const vertical = parseLocal(value).vertical
    const url = typedUrl() || shortUrl(DEFAULT_URLS[vertical])
    const text = `${value} of ${url}`
    takeOver(text)
    setDVert(null)
    closeMenu()
    writeSharedState(text, null)
    runRequest(derive(text))
  }

  const pickVertical = k => {
    const template = PROMPTS[k] || ''
    const url = typedUrl() || (k !== 'search' && shortUrl(DEFAULT_URLS[k]))
    const prompt = url ? `${template} of ${url}` : template
    takeOver(prompt)
    setDVert(k)
    closeMenu()
    if (chipRef.current) chipRef.current.focus()
    writeSharedState(prompt, k)
    runRequest(derive(prompt, k))
  }

  const MENU_COLS = 3
  const onMenuKeyDown = e => {
    const items = menuRef.current
      ? Array.from(menuRef.current.querySelectorAll('[data-menuitem]'))
      : []
    if (items.length === 0) return
    const i = items.indexOf(document.activeElement)
    if (i < 0) return
    let next = null
    if (e.key === 'ArrowRight') next = Math.min(items.length - 1, i + 1)
    else if (e.key === 'ArrowLeft') next = Math.max(0, i - 1)
    else if (e.key === 'ArrowDown') {
      next = Math.min(items.length - 1, i + MENU_COLS)
    } else if (e.key === 'ArrowUp') next = Math.max(0, i - MENU_COLS)
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = items.length - 1
    if (next === null) return
    e.preventDefault()
    items[next].focus()
  }

  return (
    <Section id='hero' ref={sectionRef}>
      <GradientDefs aria-hidden='true' focusable='false'>
        <linearGradient
          id={GLYPH_STROKE_GRADIENT_ID}
          gradientUnits='userSpaceOnUse'
          x1='0'
          y1='0'
          x2='24'
          y2='0'
        >
          {gradientStops.map(([offset, stopColor]) => (
            <stop key={offset} offset={offset} stopColor={stopColor} />
          ))}
        </linearGradient>
        <linearGradient id={GLYPH_FILL_GRADIENT_ID} x1='0' y1='0' x2='1' y2='0'>
          {gradientStops.map(([offset, stopColor]) => (
            <stop key={offset} offset={offset} stopColor={stopColor} />
          ))}
        </linearGradient>
      </GradientDefs>
      <Overlay start='60%' />
      <Content>
        <Badge>
          <Dot.Success />
          Handling +{reqsPretty} requests every month
        </Badge>

        <Heading variant={null}>
          The web,{' '}
          <Heading
            forwardedAs='span'
            css={theme({ fontSize: 'inherit', fontStyle: 'italic' })}
          >
            transformed
          </Heading>
        </Heading>

        <Caption forwardedAs='p' css={theme({ pt: 3 })}>
          AI-ready infrastructure for interacting with the web. Built on real
          browsers. Exposed through a single API.
        </Caption>

        <Composer>
          <ComposerEditor
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            role='textbox'
            aria-multiline='false'
            aria-label='Tell Microlink what to do'
            data-placeholder='Tell Microlink what to do…'
            spellCheck={false}
            onInput={onEditorInput}
            onPaste={onEditorPaste}
            onMouseDown={e => {
              if (e.target.closest('[data-url-action]')) e.preventDefault()
            }}
            onClick={e => {
              if (e.target.closest('[data-url-action]')) removeUrl()
            }}
            onFocus={onEditorFocus}
            onBlur={() => setIsFocused(false)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault()
                e.target.blur()
                handleRun()
              }
            }}
            dangerouslySetInnerHTML={{
              __html: composerHtml(dSegments, {
                caret: !isFocused && !!dText
              })
            }}
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
              css={theme({
                alignItems: 'center',
                gap: 2,
                minHeight: '34px',
                flex: 1,
                minWidth: 0
              })}
            >
              <VertChip
                ref={chipRef}
                type='button'
                $border={D.vertBorder}
                aria-haspopup='true'
                aria-expanded={menuVisible}
                aria-label={`Product: ${D.label}. Change product`}
                onClick={e => {
                  e.stopPropagation()
                  stopTyping()
                  toggleMenu()
                }}
              >
                <GlyphBadge css={theme({ width: '24px', height: '24px' })}>
                  <VertGlyph vertical={D.vertical} size={15} />
                </GlyphBadge>
                <Box
                  as='span'
                  css={theme({
                    fontSize: 0,
                    fontWeight: 'bold',
                    color: 'black'
                  })}
                >
                  {D.label}
                </Box>
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke={colors.gray5}
                  strokeWidth='2.2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  aria-hidden='true'
                >
                  <g
                    css={theme({
                      transformBox: 'fill-box',
                      transformOrigin: 'center',
                      transition: `transform ${transition.short}`,
                      transform: menuVisible ? 'rotate(180deg)' : 'none'
                    })}
                  >
                    <path d='m6 9 6 6 6-6' />
                  </g>
                </svg>
              </VertChip>
              {menuState && (
                <Box
                  ref={menuRef}
                  aria-hidden={menuState !== 'open'}
                  css={theme({
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 30,
                    width: 'max-content',
                    maxWidth: 'calc(100vw - 32px)'
                  })}
                >
                  <VertMenu
                    data-state={menuState}
                    role='group'
                    aria-label='Products'
                    onKeyDown={onMenuKeyDown}
                    css={theme({
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, minmax(0, max-content))',
                      maxWidth: '100%',
                      gap: '2px',
                      bg: 'white',
                      border: 1,
                      borderColor: 'gray2',
                      borderRadius: 5,
                      boxShadow: '0 24px 48px -20px rgba(40,10,60,.35)',
                      p: 2
                    })}
                  >
                    {VERTICAL_ORDER.map(k => {
                      const active = k === D.vertical
                      return (
                        <MenuItem
                          key={k}
                          as='button'
                          type='button'
                          data-menuitem
                          data-active={active}
                          tabIndex={active ? 0 : -1}
                          aria-current={active ? 'true' : undefined}
                          onClick={e => {
                            e.stopPropagation()
                            pickVertical(k)
                          }}
                        >
                          <MenuBadge>
                            <VertGlyph vertical={k} size={16} />
                          </MenuBadge>
                          <MenuLabel>{PRODUCTS[k].label}</MenuLabel>
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
                              aria-hidden='true'
                              css={theme({ ml: 'auto' })}
                            >
                              <path d='M20 6 9 17l-5-5' />
                            </svg>
                          )}
                        </MenuItem>
                      )
                    })}
                  </VertMenu>
                </Box>
              )}
            </Flex>
            <RunButton
              type='button'
              aria-label='Run'
              aria-busy={req.status === 'loading'}
              onClick={handleRun}
              disabled={!canRun}
            >
              {req.status === 'loading'
                ? (
                  <Spinner
                    color='white'
                    width='20px'
                    height='20px'
                    style={{ padding: 0 }}
                  />
                  )
                : (
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
                  )}
            </RunButton>
          </Flex>
        </Composer>

        <Flex
          css={theme({
            gap: 2,
            mt: 3,
            flexWrap: 'wrap',
            justifyContent: 'center'
          })}
        >
          {EXAMPLE_CHIPS.map(({ text, vertical }) => (
            <ExampleChip
              key={text}
              $border={D.vertBorder}
              onClick={pickExample(text)}
            >
              <Box as='span' css={theme({ color: 'grape7', display: 'flex' })}>
                <VertGlyph vertical={vertical} size={15} />
              </Box>
              {text}
            </ExampleChip>
          ))}
        </Flex>

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

        <HeroActions>
          <CopyPromptButton
            type='button'
            data-copied={promptCopied}
            onClick={copyPrompt}
            aria-label={`Copy an agent prompt for the ${D.label} API`}
          >
            {promptCopied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
            {promptCopied ? 'Copied' : 'Copy prompt'}
          </CopyPromptButton>
        </HeroActions>
      </Content>
    </Section>
  )
}

export default Hero
