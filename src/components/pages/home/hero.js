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
import Output from 'components/pages/home/output'
import FeatherIcon from 'components/icons/Feather'
import { WandSparkles } from 'components/icons/WandSparkles'
import { Link } from 'components/elements/Link'
import { PRODUCTS, VERTICAL_ORDER } from 'components/pages/home/catalog'
import { trackEvent } from 'helpers/plausible'
import {
  transition,
  timings,
  fonts,
  space,
  theme,
  colors,
  gradient
} from 'theme'
import { rgba } from 'polished'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import mql, { getApiUrl } from '@microlink/mql'
import GOOGLE_EXAMPLES from 'data/google-examples'

import {
  Copy as CopyIcon,
  Check as CheckIcon,
  ArrowRight as ArrowRightIcon
} from 'react-feather'

import analyticsData from '../../../../data/analytics.json'

const SEARCH_EXAMPLE = GOOGLE_EXAMPLES.search[0]

const reqsRounded = (() => {
  const [, value, unit] = analyticsData[0].reqs_pretty.match(/^([\d.]+)(\D+)$/)
  return `${Math.floor(Number(value) / 50) * 50}${unit}`
})()

const PINK = colors.secondary
const VIOLET = colors.grape7
const INK = colors.black
const GRADIENT = gradient

const SANS = fonts.sans
const MONO = fonts.mono

const SUCCESS = colors.green8
const ERROR = colors.red7

const SYNTAX = {
  key: colors.link,
  string: colors.gray9,
  literal: colors.secondary,
  number: colors.secondary,
  boolean: colors.secondary,
  fn: colors.link,
  muted: colors.gray5,
  body: colors.gray8
}

const reduceMotion = '@media (prefers-reduced-motion: reduce)'

const EASE_SMOOTH = 'cubic-bezier(0.22, 1, 0.36, 1)'

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 ${rgba(colors.secondary, 0.45)} }
  70% { box-shadow: 0 0 0 8px ${rgba(colors.secondary, 0)} }
  100% { box-shadow: 0 0 0 0 ${rgba(colors.secondary, 0)} }
`

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
  search: 'search Google and return structured results',
  pdf: 'generate a PDF of',
  logo: 'fetch the logo of',
  video: 'extract the video from',
  audio: 'extract the audio from'
}

const agentPrompt = ({ vertical, fullUrl }) => {
  const task =
    vertical === 'search'
      ? `search Google for "${SEARCH_EXAMPLE.query}" and return the structured results`
      : `${
        AGENT_TASK[vertical] || 'fetch data from'
      } ${fullUrl} and return the structured result`
  return `Using the Microlink API, ${task}.\n\nSet up Microlink for your agent first: ${SKILL_INSTALL}`
}

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

const CYCLE = [
  'take a screenshot',
  'record an animated screenshot',
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

const PROMPTS = {
  screenshot: 'take a screenshot',
  animated: 'record an animated screenshot',
  preview: 'generate a link preview',
  embed: 'embed a URL',
  markdown: 'get the markdown',
  html: 'get the HTML',
  text: 'extract the text',
  metadata: 'extract the metadata',
  lighthouse: 'run a lighthouse report',
  technologies: 'detect the technologies',
  function: 'run a function',
  search: 'search the web',
  pdf: 'create a PDF',
  logo: 'fetch the logo',
  video: 'detect the video',
  audio: 'detect the audio'
}

const parseLocal = text => {
  const t = (text || '').toLowerCase()
  const rules = [
    ['animated', /\banimated\b|animation|screen ?cast|\bgif\b|\brecord\b/],
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
    ['embed', /\bembed\b|embeddable|\biframe\b|oembed/],
    ['preview', /preview|unfurl|link ?card|rich card/]
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
  const raw = m ? m[0] : ''
  if (m) {
    url = m[0]
    if (!/^https?:\/\//.test(url)) url = 'https://' + url
  }
  return { vertical, url, raw, hasUrl: !!url }
}

const DEFAULT_URLS = {
  screenshot: 'https://www.apple.com/music',
  animated: 'https://sauron-webgl.vercel.app/',
  preview: 'https://github.com/microlinkhq/metascraper',
  embed: 'https://www.youtube.com/watch?v=9P6rdqiybaw',
  markdown: 'https://microlink.io/docs/api/getting-started/overview',
  html: 'https://example.com',
  text: 'https://en.wikipedia.org/wiki/Lorem_ipsum',
  metadata: 'https://github.com/microlinkhq/metascraper',
  lighthouse: 'https://simonwillison.net/2024/Oct/25/pelicans-on-a-bicycle/',
  technologies: 'https://vercel.com',
  function: 'https://example.com',
  search: `https://www.google.com/search?q=${encodeURIComponent(
    SEARCH_EXAMPLE.query
  )}`,
  pdf: 'https://www.raycast.com',
  logo: 'https://github.com',
  video: 'https://www.w3schools.com/html/html5_video.asp',
  audio: 'https://open.spotify.com/track/1W2919zs8SBCLTrOB1ftQT'
}
const FALLBACK_URL = 'https://example.com'

const EXAMPLE_CHIPS = EXAMPLES.map(text => ({
  text,
  vertical: parseLocal(text).vertical
}))

const derive = (text, override) => {
  const p = parseLocal(text)
  const v = override || p.vertical
  const fullUrl = p.url || DEFAULT_URLS[v] || FALLBACK_URL
  return {
    vertical: v,
    label: PRODUCTS[v].label,
    fullUrl,
    vertBorder: override ? rgba(colors.grape7, 0.45) : colors.gray2
  }
}

const TIMING_COLORS = [
  colors.green5,
  colors.blue5,
  colors.yellow5,
  colors.pink5,
  colors.grape5,
  colors.teal5
]

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

const GUTTER_X = `clamp(${space[3]}, 4vw, 40px)`
const PADDING_BOTTOM = `clamp(${space[4]}, 5vw, ${space[5]})`

const Section = styled.section`
  position: relative;
  font-family: ${SANS};
  color: ${INK};
  -webkit-font-smoothing: antialiased;

  padding-right: ${GUTTER_X};
  padding-bottom: ${PADDING_BOTTOM};
  padding-left: ${GUTTER_X};
`

const Content = styled(Container)`
  position: relative;
  z-index: 1;
  max-width: 1080px;
  align-items: center;
  text-align: center;
  padding: 0;

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

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 14px;
  font-weight: 600;
  color: ${VIOLET};
  background: ${rgba(colors.secondary, 0.07)};
  border: 1px solid ${rgba(colors.grape7, 0.18)};
  padding: 7px 16px;
  border-radius: 999px;
  margin-bottom: 26px;
`

const Composer = styled.div`
  position: relative;
  z-index: 20;
  width: 100%;
  max-width: 680px;
  margin-top: 38px;
  background: #fff;
  border: 1px solid ${colors.gray2};
  border-radius: 18px;
  padding: 6px;
  box-shadow: 0 24px 60px -30px rgba(40, 10, 60, 0.4);
  text-align: left;
`

const ComposerInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  border-radius: 12px;
  font-family: ${SANS};
  font-size: 18px;
  color: ${INK};
  background: transparent;
  padding: 18px 18px 10px;

  &:focus-visible {
    box-shadow: 0 0 0 3px ${rgba(colors.link, 0.25)};
  }

  &::placeholder {
    color: ${colors.gray4};
  }
`

const VertChip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  cursor: pointer;
  font: inherit;
  color: inherit;
  text-align: left;
  background: ${colors.gray0};
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
  color: ${colors.gray7};
  background: #fff;
  border: 1px solid ${colors.gray2};
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

const HeroActions = styled(Flex)`
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 22px;
  flex-wrap: wrap;
`

const actionPill = css`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-family: ${SANS};
  font-size: 13px;
  font-weight: 500;
  padding: 9px 16px;
  border-radius: 999px;
  transition: border-color ${transition.short}, color ${transition.short},
    background ${transition.short}, transform ${transition.short};

  &:active {
    transform: scale(0.97);
  }
`

const CopyPromptButton = styled.button`
  ${actionPill};
  color: ${colors.gray7};
  background: #fff;
  border: 1px solid ${colors.gray2};

  &[data-copied='true'] {
    color: ${SUCCESS};
    border-color: ${SUCCESS};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${VIOLET};
      color: ${INK};
    }
  }
`

const ProductCta = styled(Link)`
  ${actionPill};
  color: #fff;
  background: ${GRADIENT};
  border: 1px solid transparent;
  box-shadow: 0 8px 20px -12px ${rgba(colors.grape6, 0.75)};

  svg {
    transition: transform ${transition.short};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: #fff;
      svg {
        transform: translateX(2px);
      }
    }
  }
`

const Panel = styled.div`
  position: relative;
  width: 100%;
  max-width: 980px;
  margin-top: 14px;
  border: 1px solid ${colors.gray2};
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  text-align: left;
  box-shadow: 0 24px 60px -40px rgba(40, 10, 60, 0.35);
`

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
  font-weight: 500;
  color: ${props => (props.$active ? INK : colors.gray6)};
  padding: 0 0 14px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color ${transition.short};

  &:focus-visible {
    border-radius: 4px;
  }
`

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

  ${reduceMotion} {
    animation: none;
  }
`

const Mono = styled(Text).attrs({ as: 'span' })`
  font-family: ${MONO};
`

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
  success: { color: SUCCESS, background: colors.green0 },
  error: { color: ERROR, background: colors.red0 },
  loading: { color: VIOLET, background: rgba(colors.grape7, 0.08) }
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

const JSON_COLORS = {
  key: SYNTAX.key,
  string: SYNTAX.string,
  number: SYNTAX.number,
  boolean: SYNTAX.boolean,
  null: SYNTAX.literal
}

const JSON_TOKEN =
  /("(?:\\.|[^"\\])*")(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g

const JsonView = ({ src }) => {
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
  background: ${colors.gray1};
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

const IconBadge = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 7px;
  flex-shrink: 0;
`

const MenuBadge = styled(IconBadge)`
  width: 26px;
  height: 26px;
  background: ${colors.gray1};
  color: ${colors.gray5};
`

const MenuLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${INK};
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
`

const menuItemHighlight = css`
  background: ${rgba(colors.secondary, 0.06)};
  ${MenuBadge} {
    background: ${GRADIENT};
    color: #fff;
  }
`

const MenuItem = styled(Flex)`
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  min-width: 0;
  border: 0;
  font: inherit;
  color: inherit;
  text-align: left;
  background: transparent;
  transition: background ${transition.short};

  &:focus-visible {
    outline-offset: -2px;
  }
  &[data-active='true'] {
    ${menuItemHighlight}
    ${MenuLabel} {
      font-weight: 600;
    }
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      ${menuItemHighlight}
    }
  }
`

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

const ResultPanel = React.memo(({ tab, setTab, req }) => {
  const { D, status, body, headerRows, bars, rows, totalMs } = req
  const isLoading = status === 'loading'
  const isError = status === 'error'
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
          borderBottom: `1px solid ${colors.gray1}`
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
          <Box as='span' css={theme({ color: SUCCESS, fontWeight: 600 })}>
            GET
          </Box>{' '}
          {req.apiUrl}
        </Mono>
      </Flex>

      <TabBar
        ref={barRef}
        role='tablist'
        aria-label='Response views'
        onKeyDown={onTabKeyDown}
        css={theme({ pt: 3, px: 3, borderBottom: `1px solid ${colors.gray1}` })}
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
            {t.badge && (
              <StatusPill css={theme({ fontSize: 0, py: 1, px: 2 })}>
                {t.badge}
              </StatusPill>
            )}
          </TabButton>
        ))}
        <TabIndicator ref={indicatorRef} />
      </TabBar>

      <TabContent
        key={isError ? 'error' : tab}
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
                      borderBottom: `1px solid ${colors.gray1}`,
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
                          background: colors.gray1,
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
                      borderBottom: `1px solid ${colors.gray1}`,
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
                        borderBottom: `1px solid ${colors.gray1}`,
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
})

const fmtDuration = ms =>
  ms >= 1000 ? `${(ms / 1000).toFixed(1)}s` : `${ms}ms`

const requestStatus = req => {
  if (req.status === 'loading') {
    return { text: 'running…', color: VIOLET, live: true }
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

const Hero = () => {
  const [dText, setDText] = useState(CYCLE[0])
  const [dTab, setDTab] = useState('output')
  const [dVert, setDVert] = useState(null)
  const [menuState, setMenuState] = useState(null)
  const [req, setReq] = useState(() => {
    const d = derive(CYCLE[0])
    return {
      status: 'loading',
      D: d,
      apiUrl: getApiUrl(d.fullUrl, REQUEST_OPTS[d.vertical] || {})[0]
    }
  })
  const reqId = useRef(0)
  const anim = useRef({
    ci: 0,
    phase: 'pause',
    userTook: false,
    timer: null,
    text: CYCLE[0]
  })
  const chipRef = useRef(null)
  const menuRef = useRef(null)
  const menuTimer = useRef(null)
  const menuRaf = useRef(null)
  const [promptCopied, setPromptCopied] = useState(false)
  const copyTimer = useRef(null)

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

  const handleProductCta = () =>
    trackEvent('hero product cta', { product: D.vertical })

  const stopTyping = () => {
    anim.current.userTook = true
    clearTimeout(anim.current.timer)
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

  const toggleMenu = () => {
    if (menuState === 'open' || menuState === 'pre') closeMenu()
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
        elapsedMs: Math.round(window.performance.now() - t0)
      })
    } catch (err) {
      if (id !== reqId.current) return
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
    runRequest(derive(CYCLE[0]))
  }, [runRequest])

  const D = useMemo(() => derive(dText, dVert), [dText, dVert])
  const liveStatus = requestStatus(req)
  const productPage = PRODUCTS[D.vertical] || PRODUCTS.screenshot

  const handleRun = () => {
    if (req.status === 'loading') return
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

  const pickVertical = k => {
    const template = PROMPTS[k] || ''
    const { raw } = parseLocal(dText)
    const prompt = raw ? `${template} of ${raw}` : template
    stopTyping()
    anim.current.text = prompt
    setDText(prompt)
    setDVert(k)
    closeMenu()
    if (chipRef.current) chipRef.current.focus()
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
    <Section id='hero'>
      <Overlay start='60%' />
      <Content>
        <Badge>
          <PulseDot />
          Trusted by apps, agents & AI · {reqsRounded}+ requests / month
        </Badge>

        <Heading variant={null} css={theme({ fontSize: [4, 4, 5, 5] })}>
          The web,{' '}
          <Heading as='span' css={theme({ fontSize: 'inherit' })}>
            automated
          </Heading>
        </Heading>

        <Caption css={theme({ pt: 3 })}>
          Everything your software needs from any URL. No credit card required.
        </Caption>

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
                aria-expanded={menuState === 'open' || menuState === 'pre'}
                aria-label={`Product: ${D.label}. Change product`}
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
                    background: GRADIENT,
                    color: 'white'
                  })}
                >
                  <VertGlyph vertical={D.vertical} size={15} />
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
                      transform:
                        menuState === 'open' || menuState === 'pre'
                          ? 'rotate(180deg)'
                          : 'none'
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
                      background: 'white',
                      border: `1px solid ${colors.gray2}`,
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
              <Mono
                css={theme({
                  fontSize: 0,
                  color: VIOLET,
                  flex: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                })}
              >
                {D.fullUrl}
              </Mono>
            </Flex>
            <RunButton
              type='button'
              aria-label='Run'
              aria-busy={req.status === 'loading'}
              onClick={handleRun}
              disabled={req.status === 'loading'}
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
            mt: 4,
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
              <Box as='span' css={theme({ color: VIOLET, display: 'flex' })}>
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
          <ProductCta href={productPage.href} onClick={handleProductCta}>
            Open {productPage.api}
            <ArrowRightIcon size={14} />
          </ProductCta>
        </HeroActions>
      </Content>
    </Section>
  )
}

export default Hero
