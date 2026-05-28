import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import {
  borders,
  colors,
  gradient,
  layout,
  radii,
  theme,
  transition
} from 'theme'
import {
  Check,
  CheckCircle,
  Clock,
  Code as CodeIcon,
  Edit3,
  FileText,
  GitMerge,
  Hexagon,
  MapPin,
  Search as SearchIcon,
  Star,
  Target,
  Zap
} from 'react-feather'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Container from 'components/elements/Container'
import FeatherIcon from 'components/icons/Feather'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Text from 'components/elements/Text'
import Faq from 'components/patterns/Faq/Faq'
import Layout from 'components/patterns/Layout'
import List from 'components/patterns/List/List'
import ArrowLink from 'components/patterns/ArrowLink'

import GOOGLE_VERTICAL_EXAMPLES_DATA from 'helpers/google-examples'
import {
  FAQ_ENTRIES,
  GOOGLE_VERTICALS,
  GOOGLE_VERTICAL_EXAMPLES,
  GUIDE_URL,
  HERO_EXAMPLES,
  HERO_IMAGE,
  PACKAGE_URL,
  STRUCTURED_DATA,
  SUPPORTED_GOOGLE_SERVICES
} from 'helpers/search-landing'

/* ────────────────────────── layout & timing constants ────────────────────────── */

const HERO_LAYOUT = {
  maxWidth: ['100%', '100%', '100%', `calc(${layout.large} * 1.7)`],
  mainWidth: '55%',
  secondaryWidth: '45%',
  gap: [1, 1, 1, 5]
}

const VERTICAL_RESPONSE_HEIGHT = ['476px', '476px', '512px', '552px']
const HERO_TYPING_OPTION_KEYS = ['type', 'location', 'period']
const HERO_TYPE_CHAR_MS = 32
const HERO_TYPE_GAP_MS = 260
const HERO_TYPE_START_MS = 80
const HERO_LOADING_MS = 1000
const HERO_RESULT_EXPANDED_MAX = '520px'
const VERTICAL_OUTPUT_TABS = [
  { id: 'json', label: 'JSON' },
  { id: 'preview', label: 'Preview' }
]

/* ────────────────────────── shared css snippets ────────────────────────── */

// One-line text ellipsis used across many result fragments.
const truncateLineCss = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

const tabletHelperTextCss = theme({
  m: 0,
  color: 'black70',
  fontSize: [0, 0, 1, 1],
  lineHeight: 1,
  ...truncateLineCss
})

/* ────────────────────────── payload helpers ────────────────────────── */

const shortenValueForEditor = value => {
  if (typeof value === 'string') {
    if (value === '[truncated data URL]') return 'data:image/webp;base64...'
    if (value.startsWith('data:')) return `${value.slice(0, 20)}...`
    return value
  }
  if (Array.isArray(value)) return value.map(shortenValueForEditor)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [
        key,
        shortenValueForEditor(item)
      ])
    )
  }
  return value
}

const parseJsonPayload = payload => {
  try {
    const parsed = typeof payload === 'string' ? JSON.parse(payload) : payload
    const root = Array.isArray(parsed?.results) ? parsed.results : parsed
    return shortenValueForEditor(root)
  } catch {
    return {}
  }
}

const toPreviewItems = payload => {
  if (Array.isArray(payload)) return payload.filter(Boolean).slice(0, 4)
  if (payload && typeof payload === 'object') return [payload]
  return []
}

const formatPriceLabel = price => {
  if (!price || typeof price !== 'object') return null
  if (typeof price.symbol === 'string' && typeof price.amount === 'number') {
    return `${price.symbol}${price.amount}`
  }
  if (typeof price.amount === 'number') return `${price.amount}`
  return null
}

// Per-vertical post-processing before rendering the preview.
const VERTICAL_PREVIEW_TRANSFORMS = {
  places: items =>
    items.map(item => ({
      ...item,
      reviewCount: item.reviewCount ?? item.ratingCount ?? item.rating?.reviews
    })),
  shopping: items =>
    items.map(item => ({ ...item, priceLabel: formatPriceLabel(item.price) })),
  patents: items =>
    items.map(item => ({
      ...item,
      publicationNumber: item.publication?.number
    }))
}

const getVerticalPreviewResult = (verticalId, payload) => {
  const items = toPreviewItems(payload)
  const transform = VERTICAL_PREVIEW_TRANSFORMS[verticalId]
  return { variant: verticalId, data: transform ? transform(items) : items }
}

const getPayloadResults = payload => {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  return []
}

const getVerticalQuery = code => {
  const match = code.match(/google\(\s*(['"])([\s\S]*?)\1/)
  return match ? match[2] : 'ai agents'
}

const getVerticalExampleCode = (query, verticalId) =>
  `const page = await google('${query}', { type: '${verticalId}' })`

const VERTICAL_QUERY_EXAMPLES = {
  search: [
    {
      query: 'ai agents',
      description: 'Find current articles and guides about agent workflows.'
    },
    {
      query: 'openclaw',
      description: 'Track product, package, and documentation mentions.'
    },
    {
      query: 'site:developer.mozilla.org fetch api',
      description: 'Use operators to narrow results to a specific source.'
    }
  ],
  news: [
    {
      query: 'openai api developers',
      description: 'Monitor developer platform announcements.'
    },
    {
      query: 'ai startups',
      description: 'Follow market coverage across major publishers.'
    },
    {
      query: 'search api',
      description: 'Watch category news for search infrastructure.'
    }
  ],
  images: [
    {
      query: 'kubernetes architecture diagram',
      description: 'Collect diagrams with source attribution.'
    },
    {
      query: 'ai agent workflow diagram',
      description: 'Find visual references for technical explainers.'
    },
    {
      query: 'search interface screenshot',
      description: 'Gather UI references from indexed pages.'
    }
  ]
}

const DEFAULT_VERTICAL_QUERY_EXAMPLES = [
  {
    query: 'ai agents',
    description: 'Run the default example for this Google surface.'
  },
  {
    query: 'openclaw',
    description: 'Swap the query while keeping the same response shape.'
  },
  {
    query: 'microlink',
    description: 'Inspect another query with the same product settings.'
  }
]

const getVerticalExampleOptions = (verticalId, example) => {
  const payload = parseJsonPayload(example.payload)
  const results = getPayloadResults(payload)
  const defaultQuery = getVerticalQuery(example.code || '')
  const queryExamples =
    VERTICAL_QUERY_EXAMPLES[verticalId] ?? DEFAULT_VERTICAL_QUERY_EXAMPLES
  const normalizedExamples = queryExamples.map((item, index) =>
    index === 0 && item.query !== defaultQuery
      ? { ...item, query: defaultQuery }
      : item
  )

  if (results.length === 0) {
    return normalizedExamples.map(item => ({
      id: item.query,
      label: item.query,
      description: item.description,
      code: getVerticalExampleCode(item.query, verticalId),
      payload: example.payload
    }))
  }

  return normalizedExamples.map((item, index) => ({
    id: item.query,
    label: item.query,
    description: item.description,
    code: getVerticalExampleCode(item.query, verticalId),
    payload: results.slice(index, index + 3).length
      ? results.slice(index, index + 3)
      : results.slice(0, 3)
  }))
}

/* ────────────────────────── hero typing animation ────────────────────────── */

const extractHeroTypingTargets = code => {
  if (!code) return []
  const targets = []
  const queryMatch = code.match(/google\(\s*(['"])([\s\S]*?)\1/)
  if (queryMatch) targets.push(queryMatch[2])
  HERO_TYPING_OPTION_KEYS.forEach(key => {
    const pattern = new RegExp(`${key}\\s*:\\s*(['"])([\\s\\S]*?)\\1`)
    const match = code.match(pattern)
    if (match) targets.push(match[2])
  })
  return targets
}

const findHeroTypingSpans = (root, targets) => {
  const spans = Array.from(root.querySelectorAll('.sh__token--string'))
  const remaining = [...targets]
  const matches = []
  for (const span of spans) {
    if (remaining.length === 0) break
    const text = span.textContent
    const idx = remaining.indexOf(text)
    if (idx === -1) continue
    remaining.splice(idx, 1)
    matches.push({ span, text })
  }
  return matches.length === targets.length ? matches : null
}

const runHeroTypingSequence = (matches, prefersReducedMotion, onComplete) => {
  const timers = []
  let cancelled = false

  const caret = document.createElement('span')
  caret.className = 'hero-code-caret'
  caret.setAttribute('aria-hidden', 'true')

  matches.forEach(match => {
    match.span.textContent = ''
  })

  if (prefersReducedMotion) {
    matches.forEach(match => {
      match.span.textContent = match.text
    })
    if (onComplete) onComplete()
    return () => {}
  }

  const finish = () => {
    if (cancelled) return
    if (caret.parentNode) caret.parentNode.removeChild(caret)
    if (onComplete) onComplete()
  }

  const typeInto = (match, onDone) => {
    if (cancelled) return
    match.span.textContent = ''
    match.span.appendChild(caret)
    let i = 0

    const tick = () => {
      if (cancelled) return
      i += 1
      match.span.insertBefore(
        document.createTextNode(match.text.charAt(i - 1)),
        caret
      )
      if (i < match.text.length) {
        timers.push(window.setTimeout(tick, HERO_TYPE_CHAR_MS))
      } else {
        onDone()
      }
    }

    timers.push(window.setTimeout(tick, HERO_TYPE_CHAR_MS))
  }

  const runIndex = index => {
    if (cancelled) return
    if (index >= matches.length) return finish()
    typeInto(matches[index], () => {
      if (cancelled) return
      if (index + 1 < matches.length) {
        timers.push(
          window.setTimeout(() => runIndex(index + 1), HERO_TYPE_GAP_MS)
        )
      } else {
        finish()
      }
    })
  }

  timers.push(window.setTimeout(() => runIndex(0), HERO_TYPE_START_MS))

  return () => {
    cancelled = true
    timers.forEach(id => window.clearTimeout(id))
    if (caret.parentNode) caret.parentNode.removeChild(caret)
  }
}

/* ────────────────────────── formatting helpers ────────────────────────── */

const formatBytes = bytes => {
  if (typeof bytes !== 'number') return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

const formatRelativeTime = isoDate => {
  if (!isoDate) return ''
  const then = new Date(isoDate).getTime()
  if (Number.isNaN(then)) return ''
  const diffMs = Date.now() - then
  const hours = Math.round(diffMs / (1000 * 60 * 60))
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.round(days / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.round(months / 12)
  return `${years}y ago`
}

const formatCoordinate = (value, positiveLabel, negativeLabel) => {
  if (typeof value !== 'number') return null
  const direction = value >= 0 ? positiveLabel : negativeLabel
  return `${Math.abs(value).toFixed(4)}° ${direction}`
}

const buildBreadcrumb = url => {
  try {
    const parsed = new URL(url)
    const host = parsed.host.replace(/^www\./, '')
    const segments = parsed.pathname
      .split('/')
      .filter(Boolean)
      .slice(0, 2)
      .join(' › ')
    return {
      host,
      path: segments ? ` › ${segments}` : '',
      origin: parsed.origin
    }
  } catch {
    return { host: url, path: '', origin: '' }
  }
}

/* ────────────────────────── brand icon helpers ────────────────────────── */

const HOST_BRAND_MAP = {
  'techcrunch.com': { icon: 'techcrunch', tint: '#FFFFFF' },
  'google.com': { icon: 'google', tint: '#FFFFFF' }
}

const HOST_MONOGRAM_OVERRIDES = {
  'openai.com': { label: 'AI', tint: '#10A37F' },
  'theverge.com': { label: 'V', tint: '#5200FF' },
  'ft.com': { label: 'FT', tint: '#FFF1E5', color: '#990F3D' }
}

const MONOGRAM_PALETTE = [
  '#5B8DEF',
  '#4DA167',
  '#F2994A',
  '#EB5757',
  '#9B51E0',
  '#2D9CDB',
  '#219653'
]

const monogramTintFor = seed => {
  if (!seed) return MONOGRAM_PALETTE[0]
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  }
  return MONOGRAM_PALETTE[hash % MONOGRAM_PALETTE.length]
}

const monogramFor = host => {
  if (!host) return '•'
  const base = host.replace(/^www\./, '').split('.')[0]
  return base.slice(0, 2).toUpperCase()
}

const lookupHost = (map, host) => {
  if (!host) return null
  const normalized = host.replace(/^www\./, '').toLowerCase()
  if (map[normalized]) return map[normalized]
  const match = Object.keys(map).find(key => normalized.endsWith(`.${key}`))
  return match ? map[match] : null
}

const brandMatchFor = host => lookupHost(HOST_BRAND_MAP, host)
const monogramOverrideFor = host => lookupHost(HOST_MONOGRAM_OVERRIDES, host)

/* ────────────────────────── shared tablist keyboard handler ────────────────────────── */

const createTablistKeyHandler =
  ({ items, onSelect, focusTab }) =>
  (event, index) => {
    const lastIndex = items.length - 1
    let nextIndex = null

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = index === lastIndex ? 0 : index + 1
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = index === 0 ? lastIndex : index - 1
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = lastIndex
    }

    if (nextIndex === null) return
    event.preventDefault()
    const nextId = items[nextIndex].id
    onSelect(nextId)
    if (focusTab) focusTab(nextId)
  }

/* ────────────────────────── styled primitives ────────────────────────── */

// Outer hero wrapper — keeps overflow visible so drop shadows can peek.
const HeroSection = styled(Box)`
  ${theme({ position: 'relative', overflow: 'visible' })};
`

const ActionRow = styled(Flex)`
  ${theme({
    mt: 4,
    gap: [2, 2, 3, 3],
    flexWrap: 'wrap',
    alignItems: 'center',
    width: '100%',
    justifyContent: ['center', 'center', 'center', 'flex-start']
  })};
`

const HeroExampleShell = styled(Box)`
  ${theme({
    bg: 'white',
    overflow: 'hidden',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    height: ['auto', 'auto', '620px', '620px']
  })};
`

// Generic horizontal tab used in both the hero panel and the vertical output
// panel. `$active` toggles the selected styling. When `$withBottomGap` is
// true, a 1px white "::after" line bleeds the tab into the active panel; the
// vertical output bar doesn't need that extra line.
const Tab = styled('button').withConfig({
  shouldForwardProp: prop => !['$active', '$withBottomGap'].includes(prop)
})`
  ${theme({
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    minHeight: '58px',
    px: [2, 3, 3, 4],
    py: 2,
    border: 1,
    borderColor: 'transparent',
    borderRight: 1,
    borderRightColor: 'black10',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    bg: 'transparent',
    color: 'black60',
    fontFamily: 'sans',
    fontSize: [1, 1, 2, 2],
    fontWeight: 'normal',
    letterSpacing: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    cursor: 'pointer',
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
    position: 'relative'
  })};
  ${({ $active }) =>
    theme({
      bg: $active ? 'white' : 'gray0',
      borderColor: $active ? 'gray3' : 'transparent',
      borderBottomColor: $active ? 'white' : 'transparent',
      color: $active ? 'black' : 'black60',
      fontWeight: $active ? 'bold' : 'normal'
    })};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background-color ${transition.short}, color ${transition.short};

  ${({ $withBottomGap }) =>
    $withBottomGap
      ? `
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -1px;
      height: 1px;
      background-color: transparent;
      transition: background-color ${transition.short};
    }
  `
      : ''}
  ${({ $active, $withBottomGap }) =>
    $active && $withBottomGap
      ? `&::after { background-color: ${colors.white}; }`
      : ''}

  &:last-child {
    border-right: 0;
  }

  &:hover {
    background-color: ${colors.white};
    color: ${colors.black};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: -2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &::after {
      transition: none;
    }
  }
`

const HeroExampleCodePanel = styled(Box)`
  ${theme({
    bg: 'white',
    minWidth: 0,
    minHeight: 0,
    display: 'flex',
    flex: 1,
    overflow: 'auto',
    height: ['420px', '420px', 'auto', 'auto'],
    borderBottom: 1,
    borderBottomColor: 'black05'
  })};

  .hero-code-caret {
    display: inline-block;
    width: 2px;
    height: 1em;
    margin: 0 1px -2px 0;
    vertical-align: text-bottom;
    background-color: ${colors.black};
    animation: heroCodeCaretBlink 900ms steps(2, start) infinite;
  }

  @keyframes heroCodeCaretBlink {
    to {
      visibility: hidden;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .hero-code-caret {
      animation: none;
    }
  }
`

const HeroResultDock = styled(Box)
  .withConfig({
    shouldForwardProp: prop => prop !== '$visible'
  })
  .attrs({ 'aria-live': 'polite' })`
  ${theme({
    position: 'static',
    left: 0,
    right: 0,
    bottom: 0,
    bg: 'transparent',
    borderTop: 0,
    display: 'flex',
    flexDirection: 'column'
  })};
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
`

const HeroResultCardShell = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black05',
    borderRadius: 5,
    overflow: 'hidden',
    height: ['260px', '260px', '280px', '280px']
  })};
`

const HeroResultBodyWrap = styled(Box)`
  overflow: hidden;
  max-height: ${HERO_RESULT_EXPANDED_MAX};
  opacity: 1;
  transition: max-height 260ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 200ms ease;
  -webkit-mask-image: none;
  mask-image: none;

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 120ms linear;
  }
`

const HeroResultSkeletonLine = styled(Box).withConfig({
  shouldForwardProp: prop => !['$width', '$height'].includes(prop)
})`
  ${theme({ borderRadius: '4px' })};
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '12px'};
  background: linear-gradient(
    90deg,
    ${colors.black05} 0%,
    ${colors.black10} 50%,
    ${colors.black05} 100%
  );
  background-size: 200% 100%;
  animation: heroResultShimmer 1400ms ease-in-out infinite;

  @keyframes heroResultShimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  & + & {
    ${theme({ mt: 2 })};
  }
`

const HeroResultBrand = styled(Flex)
  .withConfig({
    shouldForwardProp: prop => !['$size', '$tint'].includes(prop)
  })
  .attrs({ as: 'span', 'aria-hidden': 'true' })`
  ${theme({
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: '9999px',
    bg: 'white',
    overflow: 'hidden'
  })};
  width: ${({ $size }) => $size || '20px'};
  height: ${({ $size }) => $size || '20px'};
  border: 1px solid ${colors.black10};
  background-color: ${({ $tint }) => $tint || colors.white};

  img {
    width: 62%;
    height: 62%;
    object-fit: contain;
    display: block;
  }
`

const HeroResultMonogram = styled('span').withConfig({
  shouldForwardProp: prop => !['$tint', '$color'].includes(prop)
})`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    fontFamily: 'sans',
    fontSize: '10px',
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: 1
  })};
  background-color: ${({ $tint }) => $tint || colors.black80};
  color: ${({ $color }) => $color || colors.white};
  text-transform: uppercase;
`

// Inline breadcrumb wrapper reused across every result list variant.
const HeroResultBreadcrumb = styled(Flex).attrs({ as: 'div' })`
  ${theme({
    alignItems: 'center',
    gap: 2,
    color: 'black70',
    fontSize: [0, 0, 1, 1]
  })};
  min-width: 0;
`

const HeroResultSite = styled(Text).attrs({ as: 'span' })`
  ${theme({
    m: 0,
    color: 'black',
    fontSize: [1, 1, 1, 1],
    fontWeight: 'normal',
    lineHeight: 1
  })};
`

const HeroResultPath = styled(Text).attrs({ as: 'span' })`
  ${theme({
    m: 0,
    color: 'black60',
    fontSize: [1, 1, 1, 1],
    lineHeight: 1,
    ...truncateLineCss
  })};
  min-width: 0;
`

const HeroResultTitle = styled(Text).attrs({ as: 'button', type: 'button' })`
  ${theme({
    appearance: 'none',
    m: 0,
    mt: 2,
    p: 0,
    display: 'block',
    maxWidth: '100%',
    color: 'link',
    fontFamily: 'sans',
    fontSize: [1, 1, 2, 2],
    fontWeight: 'normal',
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: 'left',
    textDecoration: 'none',
    ...truncateLineCss,
    cursor: 'default'
  })};
  background: transparent;
  border: 0;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
    border-radius: 2px;
  }
`

const HeroResultDescription = styled(Text).attrs({ as: 'p' })`
  ${theme({
    m: 0,
    mt: 2,
    color: 'black80',
    fontSize: [0, 0, 1, 1],
    lineHeight: 2
  })};
`

const HeroResultMeta = styled(Flex).attrs({ as: 'div' })`
  ${theme({
    alignItems: 'center',
    gap: 2,
    mt: 2,
    color: 'black60',
    fontSize: [0, 0, 1, 1],
    flexWrap: 'wrap'
  })};
`

const HeroResultBadge = styled(Text).attrs({ as: 'span' })`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    px: 2,
    py: 1,
    borderRadius: '9999px',
    bg: 'gray0',
    color: 'black80',
    fontFamily: 'mono',
    fontSize: [0, 0, 1, 1],
    lineHeight: 1
  })};
  border: 1px solid ${colors.black10};
`

const HeroResultBadgeSmall = styled(Text).attrs({ as: 'span' })`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    px: 2,
    py: 1,
    borderRadius: '9999px',
    bg: 'gray0',
    color: 'black80',
    fontFamily: 'mono',
    fontSize: '11px',
    lineHeight: 1,
    letterSpacing: 0
  })};
  border: 1px solid ${colors.black10};

  svg {
    width: 12px;
    height: 12px;
  }
`

const HeroResultList = styled(Box).attrs({ as: 'ul', role: 'list' })`
  ${theme({
    m: 0,
    p: 0,
    listStyle: 'none',
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    mx: [-3, -3, -4, -4]
  })};
  scrollbar-width: thin;
  scrollbar-color: ${colors.black20} transparent;
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0,
    ${colors.black} 12px,
    ${colors.black} calc(100% - 20px),
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0,
    ${colors.black} 12px,
    ${colors.black} calc(100% - 20px),
    transparent 100%
  );

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.black20};
    border-radius: 9999px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`

const HeroResultListItem = styled(Box).attrs({ as: 'li' })`
  ${theme({
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    px: [3, 3, 4, 4],
    py: [2, 2, 3, 3]
  })};
  border-bottom: 1px solid ${colors.black05};
  transition: background-color ${transition.short};

  &:last-child {
    border-bottom: 0;
  }
  &:hover {
    background-color: ${colors.gray0};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const HeroResultListTitle = styled(Text).attrs({
  as: 'button',
  type: 'button'
})`
  ${theme({
    appearance: 'none',
    m: 0,
    p: 0,
    display: 'block',
    maxWidth: '100%',
    color: 'link',
    fontFamily: 'sans',
    fontSize: [1, 1, 2, 2],
    fontWeight: 'normal',
    lineHeight: 1,
    letterSpacing: 0,
    textAlign: 'left',
    textDecoration: 'none',
    ...truncateLineCss,
    cursor: 'default'
  })};
  background: transparent;
  border: 0;
  flex: 1;
  min-width: 0;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
    border-radius: 2px;
  }
`

const VerticalExampleShell = styled(Box).withConfig({
  shouldForwardProp: prop => prop !== '$accentColor'
})`
  ${theme({
    mt: [4, 4, 5, 5],
    overflow: 'hidden',
    minWidth: 0
  })};
  position: relative;
`

const VerticalExampleGrid = styled(Box)`
  ${theme({
    display: 'grid',
    gridTemplateColumns: [
      '1fr',
      '1fr',
      '1fr',
      'minmax(0, 0.98fr) minmax(0, 1.02fr)'
    ],
    gap: [3, 3, 4, 4],
    pt: 4,
    height: '100%'
  })};
`

const VerticalExamplePanel = styled(Box)`
  ${theme({
    bg: 'white',
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    borderRadius: 4,
    overflow: 'hidden'
  })};
`

const VerticalPreviewContent = styled(Box)`
  ${theme({ minWidth: 0 })};

  /* Neutralize the hero-style list container's inner scroll region when it's
     reused inside the preview pane (the preview already scrolls on its own). */
  ${HeroResultList} {
    max-height: none;
    height: auto;
    flex: none;
  }
`

const VerticalResultList = styled(Box).attrs({ as: 'ol' })`
  ${theme({
    m: 0,
    p: 0,
    display: 'grid',
    gap: 0,
    listStyle: 'none'
  })};

  > li {
    ${theme({
      py: [3, 3, 4, 4],
      borderBottom: 1,
      borderBottomColor: 'black10'
    })};
  }

  > li:last-of-type {
    border-bottom: 0;
  }
`

const VerticalExampleIcon = styled(Flex).attrs({ as: 'span' })`
  ${theme({
    alignItems: 'center',
    justifyContent: 'center',
    width: ['44px', '44px', '48px', '48px'],
    height: ['44px', '44px', '48px', '48px'],
    flexShrink: 0,
    borderRadius: '9999px',
    bg: 'white',
    color: 'black70',
    border: 1,
    borderColor: 'black20',
    lineHeight: 1
  })};

  svg {
    width: 18px;
    height: 18px;
  }
`

const VerticalExampleOptionIcon = styled(VerticalExampleIcon).withConfig({
  shouldForwardProp: prop => prop !== '$active'
})`
  ${({ $active }) =>
    theme({
      color: $active ? 'link' : 'black70',
      borderColor: $active ? 'link' : 'black20'
    })};
`

const VerticalExampleOption = styled('button').withConfig({
  shouldForwardProp: prop => prop !== '$active'
})`
  ${theme({
    appearance: 'none',
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 3,
    p: [3, 3, 4, 4],
    bg: 'transparent',
    border: 0,
    borderBottom: 1,
    borderBottomColor: 'black10',
    color: 'black',
    textAlign: 'left',
    cursor: 'pointer'
  })};
  background-color: ${({ $active }) =>
    $active ? colors.gray0 : 'transparent'};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background-color ${transition.short}, color ${transition.short};

  &:hover {
    background-color: ${colors.gray0};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.link};
    outline-offset: -2px;
  }

  &:last-child {
    border-bottom: 0;
  }
`

const VerticalOutputTab = styled('button').withConfig({
  shouldForwardProp: prop => prop !== '$active'
})`
  ${theme({
    appearance: 'none',
    px: 2,
    py: 1,
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    borderRadius: 4,
    letterSpacing: 0,
    lineHeight: 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    cursor: 'pointer'
  })};
  background: ${({ $active }) => ($active ? colors.black : 'transparent')};
  color: ${({ $active }) => ($active ? colors.white : colors.black70)};
  border: ${borders[1]}
    ${({ $active }) => ($active ? colors.black : colors.black10)};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background ${transition.short}, color ${transition.short},
    border-color ${transition.short};

  &:hover {
    color: ${({ $active }) => ($active ? colors.white : colors.black)};
    border-color: ${({ $active }) => ($active ? colors.black : colors.black40)};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.black40};
    outline-offset: ${radii[1]};
  }
`

const VerticalTabButton = styled('button').withConfig({
  shouldForwardProp: prop => !['$active', '$activeColor'].includes(prop)
})`
  ${theme({
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    position: 'relative',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    bg: 'transparent',
    py: 2,
    px: 3,
    minHeight: '40px',
    color: 'black80',
    fontFamily: 'sans',
    fontWeight: 'normal',
    fontSize: [0, 0, 1, 1],
    lineHeight: 1,
    letterSpacing: 0,
    whiteSpace: 'nowrap',
    textAlign: 'left',
    cursor: 'pointer',
    flexShrink: 0
  })};
  ${({ $active, $activeColor }) =>
    theme({
      borderColor: $active ? 'black' : 'black10',
      bg: $active ? 'black' : 'transparent',
      color: $active ? 'white' : 'black80',
      fontWeight: $active ? 'bold' : 'normal'
    })};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: color ${transition.short}, border-color ${transition.short},
    background-color ${transition.short};

  &:hover {
    border-color: ${colors.black20};
    background-color: ${colors.gray0};
    color: ${colors.black};
  }
  ${({ $active, $activeColor }) =>
    $active
      ? `
    &:hover {
      border-color: ${colors.black};
      background-color: ${colors.black};
      color: ${colors.white};
    }
  `
      : ''};

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const TutorialTimeline = styled(Box)`
  ${theme({
    mt: 0,
    position: 'relative',
    maxWidth: '100%',
    mx: 'auto'
  })};

  &::before {
    content: '';
    ${theme({
      display: ['none', 'none', 'block', 'block'],
      position: 'absolute',
      top: '22px',
      bottom: '22px',
      left: '35px',
      width: '2px',
      bg: 'black10'
    })};
  }
`

const PageSection = styled(Container)`
  ${theme({
    pt: [5, 5, 6, 6],
    pb: 0,
    px: [3, 3, 4, 4],
    maxWidth: layout.large,
    alignItems: 'stretch'
  })};
`

const SectionCaption = ({ color, children, centered = false }) => (
  <Flex
    css={theme({
      alignItems: 'center',
      mb: 3,
      justifyContent: centered ? 'center' : 'flex-start'
    })}
  >
    <Flex
      as='span'
      css={theme({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        px: 3,
        py: 2,
        bg: 'white',
        border: 1,
        borderColor: color,
        borderRadius: 5
      })}
    >
      <Text
        as='span'
        css={theme({
          m: 0,
          color,
          fontWeight: 'bold',
          fontSize: [0, 0, 0, 0],
          textTransform: 'uppercase',
          letterSpacing: 2,
          lineHeight: 0
        })}
      >
        {children}
      </Text>
    </Flex>
  </Flex>
)

const PricingCard = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    borderRadius: 4,
    bg: 'white',
    px: [3, 3, 4, 4],
    py: [3, 3, 4, 4],
    flex: 1,
    minWidth: 0,
    maxWidth: ['100%', '100%', '520px', '520px'],
    width: '100%',
    border: 2,
    borderColor: 'orange5'
  })};
`

/* ────────────────────────── small display-only components ────────────────────────── */

// Sibling spacing for bullets, used both in retrieval cards and the
// tutorial feature list. Raw CSS keeps the responsive value working
// inside a nested selector (styled-system aliases only resolve at the
// root level).
const BulletItem = styled(Flex).attrs({ as: 'li' })`
  ${theme({
    alignItems: 'flex-start',
    gap: 2,
    color: 'black80',
    fontSize: [1, 1, 2, 2],
    lineHeight: 2
  })};

  &:not(:first-of-type) {
    ${theme({ mt: [2, 2, 3, 3] })};
  }
`

const Bullet = ({ children }) => (
  <BulletItem>
    <FeatherIcon
      icon={CheckCircle}
      color='close'
      size={[1, 1, 2, 2]}
      css={theme({ flexShrink: 0, mr: 1, alignSelf: 'flex-start' })}
    />
    <Text
      as='span'
      css={theme({
        color: 'black80',
        fontSize: [0, 0, 1, 1],
        lineHeight: 2
      })}
    >
      {children}
    </Text>
  </BulletItem>
)

const BulletList = ({ children }) => (
  <Box
    as='ul'
    css={theme({
      m: 0,
      mt: [3, 3, 4, 4],
      p: 0,
      listStyle: 'none'
    })}
  >
    {children}
  </Box>
)

const PricingCheck = ({ children }) => (
  <Flex css={theme({ alignItems: 'center', pt: 2, gap: 2 })}>
    <Box
      css={theme({
        display: 'inline-flex',
        color: 'orange7',
        flexShrink: 0
      })}
    >
      <Check size={16} aria-hidden='true' />
    </Box>
    <Text as='span' css={theme({ fontSize: [0, 0, 1, 1], color: 'black90' })}>
      {children}
    </Text>
  </Flex>
)

const RETRIEVAL_ICONS = {
  markdown: FileText,
  bolt: Zap,
  search: SearchIcon
}

const RETRIEVAL_FEATURE_ACCENTS = {
  blue: {
    color: 'blue6',
    bg: 'blue0',
    borderColor: 'blue1'
  },
  teal: {
    color: 'teal7',
    bg: 'teal0',
    borderColor: 'teal1'
  }
}

const RetrievalFeatureCard = ({
  icon,
  accent,
  title,
  description,
  divider = true
}) => {
  const Icon = RETRIEVAL_ICONS[icon]
  const iconAccent = RETRIEVAL_FEATURE_ACCENTS[accent]

  return (
    <Flex
      css={theme({
        gap: [3, 3, 4, 5],
        alignItems: 'flex-start'
      })}
    >
      <Box
        css={theme({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: ['72px', '72px', '82px', '82px'],
          height: ['72px', '72px', '82px', '82px'],
          borderRadius: '50%',
          flexShrink: 0,
          border: 1,
          borderColor: iconAccent.borderColor,
          bg: iconAccent.bg,
          color: iconAccent.color,
          position: 'relative'
        })}
      >
        <Icon size={32} strokeWidth={2.25} aria-hidden='true' />
      </Box>
      <Box
        css={theme({
          minWidth: 0,
          flex: 1,
          pb: divider ? [4, 4, 5, 5] : 0,
          borderBottom: divider ? 1 : 0,
          borderBottomColor: 'black05'
        })}
      >
        <Text
          as='h3'
          css={theme({
            m: 0,
            color: 'black',
            fontWeight: 'bold',
            fontSize: [2, 2, 2, 2],
            lineHeight: 1,
            letterSpacing: 0
          })}
        >
          {title}
        </Text>
        <Text
          as='p'
          css={theme({
            m: 0,
            mt: 2,
            color: 'black70',
            fontSize: [1, 1, 1, 1],
            lineHeight: 3
          })}
        >
          {description}
        </Text>
      </Box>
    </Flex>
  )
}

const HostBrandIcon = ({ host, size = '20px' }) => {
  const brand = brandMatchFor(host)
  if (brand) {
    return (
      <HeroResultBrand $size={size} $tint={brand.tint}>
        <img
          src={`https://cdn.simpleicons.org/${brand.icon}`}
          alt=''
          aria-hidden='true'
          loading='lazy'
        />
      </HeroResultBrand>
    )
  }
  const override = monogramOverrideFor(host)
  if (override) {
    return (
      <HeroResultBrand $size={size} $tint={override.tint}>
        <HeroResultMonogram $tint={override.tint} $color={override.color}>
          {override.label}
        </HeroResultMonogram>
      </HeroResultBrand>
    )
  }
  return (
    <HeroResultBrand $size={size} $tint={colors.white}>
      <HeroResultMonogram $tint={monogramTintFor(host)}>
        {monogramFor(host)}
      </HeroResultMonogram>
    </HeroResultBrand>
  )
}

const HeroResultSkeleton = () => (
  <Box css={theme({ width: '100%' })}>
    <HeroResultSkeletonLine $width='160px' $height='10px' />
    <HeroResultSkeletonLine $width='85%' $height='16px' />
    <HeroResultSkeletonLine $width='96%' $height='10px' />
    <HeroResultSkeletonLine $width='70%' $height='10px' />
  </Box>
)

/* ────────────────────────── hero result variants ────────────────────────── */

const Dot = () => (
  <Text as='span' css={theme({ color: 'black50', fontSize: [0, 0, 1, 1] })}>
    •
  </Text>
)

const RelativeTime = ({ date }) => (
  <Flex css={theme({ alignItems: 'center', gap: 1 })}>
    <Clock size={12} aria-hidden='true' />
    <Text as='span' css={theme({ color: 'black60', fontSize: [0, 0, 1, 1] })}>
      {formatRelativeTime(date)}
    </Text>
  </Flex>
)

const ListDescription = ({ children }) => (
  <Text as='p' css={tabletHelperTextCss}>
    {children}
  </Text>
)

const HeroSearchResultCard = ({ data, badge = null }) => {
  const { host, path, origin } = buildBreadcrumb(data.url)
  return (
    <Box>
      <HeroResultBreadcrumb>
        <HostBrandIcon host={host} size='28px' />
        <Flex
          css={theme({
            flexDirection: 'column',
            minWidth: 0,
            lineHeight: 1
          })}
        >
          <HeroResultSite>{host}</HeroResultSite>
          <HeroResultPath>
            {origin}
            {path}
          </HeroResultPath>
        </Flex>
      </HeroResultBreadcrumb>
      <HeroResultTitle>{data.title}</HeroResultTitle>
      <HeroResultDescription>{data.description}</HeroResultDescription>
      {badge && <HeroResultMeta>{badge}</HeroResultMeta>}
    </Box>
  )
}

const HeroNewsResultCard = ({ data }) => (
  <Box>
    <HeroResultBreadcrumb>
      <HeroResultSite>{data.publisher}</HeroResultSite>
      <Dot />
      <RelativeTime date={data.date} />
    </HeroResultBreadcrumb>
    <HeroResultTitle>{data.title}</HeroResultTitle>
    <HeroResultDescription>{data.description}</HeroResultDescription>
  </Box>
)

const HeroPlacesResultCard = ({ data }) => (
  <Box>
    <Flex css={theme({ alignItems: 'center', gap: 2, minWidth: 0 })}>
      <HeroResultBrand $size='28px' $tint={colors.white}>
        <img
          src='https://cdn.simpleicons.org/googlemaps'
          alt=''
          aria-hidden='true'
          loading='lazy'
        />
      </HeroResultBrand>
      <Text
        as='span'
        css={theme({
          m: 0,
          color: 'black',
          fontSize: [1, 1, 2, 2],
          fontWeight: 'bold',
          lineHeight: 1,
          ...truncateLineCss,
          minWidth: 0
        })}
      >
        {data.title}
      </Text>
      <HeroResultBadge>{data.category}</HeroResultBadge>
    </Flex>
    <HeroResultMeta>
      <Flex
        as='span'
        css={theme({
          alignItems: 'center',
          gap: 1,
          color: 'black',
          fontSize: [1, 1, 2, 2]
        })}
      >
        <Star
          size={14}
          fill={colors.yellow5}
          color={colors.yellow5}
          aria-hidden='true'
        />
        <Text
          as='span'
          css={theme({
            color: 'black',
            fontSize: [1, 1, 2, 2],
            fontWeight: 'bold'
          })}
        >
          {data.rating.toFixed(1)}
        </Text>
        <Text
          as='span'
          css={theme({ color: 'black60', fontSize: [0, 0, 1, 1] })}
        >
          ({data.reviewCount.toLocaleString()})
        </Text>
      </Flex>
    </HeroResultMeta>
    <Flex css={theme({ alignItems: 'center', gap: 2, mt: 2 })}>
      <MapPin size={14} aria-hidden='true' color={colors.black70} />
      <Text as='span' css={theme({ color: 'black80', fontSize: [1, 1, 2, 2] })}>
        {data.address}
      </Text>
    </Flex>
    <Text
      as='span'
      css={theme({
        display: 'block',
        mt: 1,
        color: 'black50',
        fontFamily: 'mono',
        fontSize: [0, 0, 1, 1]
      })}
    >
      {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}
    </Text>
  </Box>
)

const HeroResultListRow = ({ children }) => (
  <Flex
    css={theme({
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 3,
      width: '100%',
      minWidth: 0
    })}
  >
    {children}
  </Flex>
)

const HeroResultBadgeGroup = ({ children }) => (
  <Flex css={theme({ alignItems: 'center', gap: 1, flexShrink: 0 })}>
    {children}
  </Flex>
)

const HeroSearchListItem = ({ item }) => {
  const { host, path, origin } = buildBreadcrumb(item.url)
  return (
    <HeroResultListItem>
      <HeroResultBreadcrumb>
        <HostBrandIcon host={host} size='20px' />
        <Flex
          css={theme({
            flexDirection: 'column',
            minWidth: 0,
            lineHeight: 1
          })}
        >
          <HeroResultSite>{host}</HeroResultSite>
          <HeroResultPath>
            {origin}
            {path}
          </HeroResultPath>
        </Flex>
      </HeroResultBreadcrumb>
      <HeroResultListTitle>{item.title}</HeroResultListTitle>
      {item.description && (
        <ListDescription>{item.description}</ListDescription>
      )}
    </HeroResultListItem>
  )
}

const HeroNewsListItem = ({ item }) => {
  const { host } = buildBreadcrumb(item.url)
  return (
    <HeroResultListItem>
      <HeroResultBreadcrumb>
        <HostBrandIcon host={host} size='20px' />
        <HeroResultSite>{item.publisher}</HeroResultSite>
        <Dot />
        <RelativeTime date={item.date} />
      </HeroResultBreadcrumb>
      <HeroResultListTitle>{item.title}</HeroResultListTitle>
      {item.description && (
        <ListDescription>{item.description}</ListDescription>
      )}
    </HeroResultListItem>
  )
}

const HeroSearchEnrichedListItem = ({ item }) => {
  const { host } = buildBreadcrumb(item.url)
  return (
    <HeroResultListItem>
      <HeroResultListRow>
        <HeroResultBreadcrumb>
          <HostBrandIcon host={host} size='20px' />
          <HeroResultSite>{host}</HeroResultSite>
        </HeroResultBreadcrumb>
        <HeroResultBadgeGroup>
          <HeroResultBadgeSmall>
            <CodeIcon aria-hidden='true' />
            html · {formatBytes(item.htmlBytes)}
          </HeroResultBadgeSmall>
          {typeof item.mdBytes === 'number' && (
            <HeroResultBadgeSmall>
              <FileText aria-hidden='true' />
              md · {formatBytes(item.mdBytes)}
            </HeroResultBadgeSmall>
          )}
        </HeroResultBadgeGroup>
      </HeroResultListRow>
      <HeroResultListTitle>{item.title}</HeroResultListTitle>
      {item.description && (
        <ListDescription>{item.description}</ListDescription>
      )}
    </HeroResultListItem>
  )
}

const HeroImageListItem = ({ item }) => {
  const { host } = buildBreadcrumb(item.url)
  const width = item.image?.width ?? item.thumbnail?.width
  const height = item.image?.height ?? item.thumbnail?.height

  return (
    <HeroResultListItem>
      <HeroResultListRow>
        <HeroResultBreadcrumb>
          <HostBrandIcon host={host} size='20px' />
          <HeroResultSite>{host}</HeroResultSite>
        </HeroResultBreadcrumb>
        {(width || height) && (
          <HeroResultBadgeSmall>
            {width || '?'} × {height || '?'}
          </HeroResultBadgeSmall>
        )}
      </HeroResultListRow>
      <HeroResultListTitle>{item.title}</HeroResultListTitle>
    </HeroResultListItem>
  )
}

const HeroVideoListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <HeroResultBreadcrumb>
        <HeroResultSite>{item.publisher || item.channel}</HeroResultSite>
        {item.date && (
          <>
            <Dot />
            <RelativeTime date={item.date} />
          </>
        )}
      </HeroResultBreadcrumb>
      {item.duration_pretty && (
        <HeroResultBadgeSmall>{item.duration_pretty}</HeroResultBadgeSmall>
      )}
    </HeroResultListRow>
    <HeroResultListTitle>{item.title}</HeroResultListTitle>
    {item.description && <ListDescription>{item.description}</ListDescription>}
  </HeroResultListItem>
)

const HeroPlacesListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <Text
        as='span'
        css={theme({
          m: 0,
          color: 'black',
          fontSize: [1, 1, 2, 2],
          fontWeight: 'bold',
          lineHeight: 1,
          ...truncateLineCss,
          minWidth: 0
        })}
      >
        {item.title}
      </Text>
      {item.category && (
        <HeroResultBadgeSmall>{item.category}</HeroResultBadgeSmall>
      )}
    </HeroResultListRow>
    <HeroResultMeta css={theme({ mt: 1 })}>
      {typeof item.rating === 'number' && (
        <Flex
          as='span'
          css={theme({
            alignItems: 'center',
            gap: 1,
            color: 'black',
            fontSize: [1, 1, 2, 2]
          })}
        >
          <Star
            size={12}
            fill={colors.yellow5}
            color={colors.yellow5}
            aria-hidden='true'
          />
          <Text
            as='span'
            css={theme({
              color: 'black',
              fontSize: [0, 0, 1, 1],
              fontWeight: 'bold'
            })}
          >
            {item.rating.toFixed(1)}
          </Text>
          {typeof item.reviewCount === 'number' && (
            <Text
              as='span'
              css={theme({ color: 'black60', fontSize: [0, 0, 1, 1] })}
            >
              ({item.reviewCount.toLocaleString()})
            </Text>
          )}
        </Flex>
      )}
    </HeroResultMeta>
    {item.address && <ListDescription>{item.address}</ListDescription>}
  </HeroResultListItem>
)

const HeroMapListItem = ({ item }) => (
  <HeroResultListItem>
    <Box css={theme({ minWidth: 0 })}>
      <HeroResultListRow>
        <Text
          as='span'
          css={theme({
            m: 0,
            color: 'black',
            fontSize: [1, 1, 2, 2],
            fontWeight: 'bold',
            lineHeight: 1,
            ...truncateLineCss,
            minWidth: 0
          })}
        >
          {item.title}
        </Text>
        <HeroResultBadgeSmall>map</HeroResultBadgeSmall>
      </HeroResultListRow>

      {item.address && (
        <Flex css={theme({ alignItems: 'flex-start', gap: 2, mt: 2 })}>
          <Text
            as='p'
            css={theme({
              m: 0,
              color: 'black70',
              fontSize: [0, 0, 1, 1],
              lineHeight: 2
            })}
          >
            {item.address}
          </Text>
        </Flex>
      )}

      {(typeof item.latitude === 'number' ||
        typeof item.longitude === 'number') && (
        <Box
          css={theme({
            mt: 2,
            p: 2,
            borderRadius: 3,
            bg: 'gray0',
            border: 1,
            borderColor: 'black05'
          })}
        >
          <Text
            as='p'
            css={theme({
              m: 0,
              color: 'black50',
              fontFamily: 'mono',
              fontSize: [0, 0, 1, 1],
              fontWeight: 'bold',
              lineHeight: 1
            })}
          >
            Coordinates
          </Text>
          <Flex css={theme({ gap: 2, mt: 2, flexWrap: 'wrap' })}>
            {typeof item.latitude === 'number' && (
              <HeroResultBadgeSmall>
                lat · {formatCoordinate(item.latitude, 'N', 'S')}
              </HeroResultBadgeSmall>
            )}
            {typeof item.longitude === 'number' && (
              <HeroResultBadgeSmall>
                lng · {formatCoordinate(item.longitude, 'E', 'W')}
              </HeroResultBadgeSmall>
            )}
          </Flex>
        </Box>
      )}

      {item.place?.id && (
        <HeroResultMeta css={theme({ mt: 2, gap: 1 })}>
          <HeroResultBadgeSmall>place · {item.place.id}</HeroResultBadgeSmall>
        </HeroResultMeta>
      )}
    </Box>
  </HeroResultListItem>
)

const HeroShoppingListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <HeroResultBreadcrumb>
        <HeroResultSite>{item.publisher}</HeroResultSite>
      </HeroResultBreadcrumb>
      {item.priceLabel && (
        <HeroResultBadgeSmall>{item.priceLabel}</HeroResultBadgeSmall>
      )}
    </HeroResultListRow>
    <HeroResultListTitle>{item.title}</HeroResultListTitle>
  </HeroResultListItem>
)

const HeroScholarListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <HeroResultBadgeGroup>
        {item.year && <HeroResultBadgeSmall>{item.year}</HeroResultBadgeSmall>}
        {typeof item.citations === 'number' && (
          <HeroResultBadgeSmall>
            {item.citations.toLocaleString()} cites
          </HeroResultBadgeSmall>
        )}
      </HeroResultBadgeGroup>
    </HeroResultListRow>
    <HeroResultListTitle>{item.title}</HeroResultListTitle>
    {item.publisher && <ListDescription>{item.publisher}</ListDescription>}
  </HeroResultListItem>
)

const HeroPatentListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <HeroResultBadgeGroup>
        {item.publicationNumber && (
          <HeroResultBadgeSmall>{item.publicationNumber}</HeroResultBadgeSmall>
        )}
        {item.language && (
          <HeroResultBadgeSmall>{item.language}</HeroResultBadgeSmall>
        )}
      </HeroResultBadgeGroup>
    </HeroResultListRow>
    <HeroResultListTitle>{item.title}</HeroResultListTitle>
    <ListDescription>{item.assignee || item.inventor}</ListDescription>
  </HeroResultListItem>
)

const HeroAutocompleteListItem = ({ item }) => (
  <HeroResultListItem>
    <HeroResultListRow>
      <HeroResultBadgeSmall>suggestion</HeroResultBadgeSmall>
    </HeroResultListRow>
    <HeroResultListTitle>{item.value}</HeroResultListTitle>
  </HeroResultListItem>
)

// Variant configs: one place to map a `variant` id to its list item
// component, single-result fallback, and stable-key extractor.
const RESULT_VARIANTS = {
  search: {
    ItemComponent: HeroSearchListItem,
    SingleComponent: HeroSearchResultCard,
    keyOf: item => item.url
  },
  news: {
    ItemComponent: HeroNewsListItem,
    SingleComponent: HeroNewsResultCard,
    keyOf: item => item.url
  },
  images: {
    ItemComponent: HeroImageListItem,
    SingleComponent: HeroSearchResultCard,
    keyOf: item => item.url
  },
  videos: {
    ItemComponent: HeroVideoListItem,
    SingleComponent: HeroSearchResultCard,
    keyOf: item => item.url
  },
  places: {
    ItemComponent: HeroPlacesListItem,
    SingleComponent: HeroPlacesResultCard,
    keyOf: item => item.cid || item.title
  },
  maps: {
    ItemComponent: HeroMapListItem,
    SingleComponent: HeroSearchResultCard,
    keyOf: item => item.cid || item.title
  },
  shopping: {
    ItemComponent: HeroShoppingListItem,
    SingleComponent: HeroSearchResultCard,
    keyOf: item => item.id || item.title
  },
  scholar: {
    ItemComponent: HeroScholarListItem,
    SingleComponent: HeroSearchResultCard,
    keyOf: item => item.id || item.title
  },
  patents: {
    ItemComponent: HeroPatentListItem,
    SingleComponent: HeroSearchResultCard,
    keyOf: item => item.publicationNumber || item.title
  },
  autocomplete: {
    ItemComponent: HeroAutocompleteListItem,
    SingleComponent: HeroSearchResultCard,
    keyOf: item => item.value
  },
  'search-enriched': {
    ItemComponent: HeroSearchEnrichedListItem,
    SingleComponent: ({ data }) => (
      <HeroSearchResultCard
        data={data}
        badge={
          <HeroResultBadge>
            <CodeIcon size={12} aria-hidden='true' />
            html · {formatBytes(data.htmlBytes)}
          </HeroResultBadge>
        }
      />
    ),
    keyOf: item => item.url
  }
}

const HeroResultCard = ({ result }) => {
  if (!result) return null
  const { variant, data } = result
  const config = RESULT_VARIANTS[variant] ?? RESULT_VARIANTS.search

  if (Array.isArray(data)) {
    const { ItemComponent, keyOf } = config
    return (
      <HeroResultList>
        {data.map(item => (
          <ItemComponent key={keyOf(item)} item={item} />
        ))}
      </HeroResultList>
    )
  }

  const { SingleComponent } = config
  return <SingleComponent data={data} />
}

/* ────────────────────────── page-level data ────────────────────────── */

const INTEGRATION_TUTORIAL_STEPS = [
  {
    step: '1',
    title: 'Install and initialize',
    icon: Target,
    description:
      'Install "@microlink/google", add your Microlink API key, and create one client you can reuse across every supported search surface.',
    panel: {
      type: 'code',
      language: 'bash',
      content: `npm i @microlink/google
const google = require('@microlink/google')({
  apiKey: process.env.MICROLINK_API_KEY
})`
    }
  },
  {
    step: '2',
    title: 'Run the first query',
    icon: Hexagon,
    description:
      'Choose the surface you need with the type option and keep the client shape for search, news, images, maps, shopping, and more.',
    panel: {
      type: 'code',
      language: 'javascript',
      content: `const page = await google('ai agents', {
  type: 'search'
})

console.log(page.results)`
    }
  },
  {
    step: '3',
    title: 'Paginate and enrich',
    icon: GitMerge,
    description:
      'Chain pages with .next() and fetch full markup with .html() or .markdown() only for the results that deserve deeper inspection.',
    panel: {
      type: 'features',
      items: [
        'Any surface. Any locale. International + LLM-ready Markdown on demand.',
        'Use .next() to paginate through all result pages.',
        'Fetch .html() or .markdown() only when a workflow needs the full page.',
        'Lightweight results first, deeper content second — less tokens, less cost.'
      ]
    }
  }
]

// Step-specific editor heights keep the timeline's proportions.
const TUTORIAL_CODE_HEIGHT_BY_TITLE = {
  'Install and initialize': ['140px', '140px', '150px', '150px'],
  'Run the first query': ['200px', '200px', '220px', '220px']
}
const TUTORIAL_CODE_HEIGHT_DEFAULT = ['160px', '160px', '180px', '180px']

/* ────────────────────────── page ────────────────────────── */

const heroProofListItemCss = theme({
  m: 0,
  mb: 0,
  color: 'black80',
  fontSize: [1, 1, 2, 2],
  textAlign: 'left',
  alignItems: 'flex-start',
  justifyContent: 'flex-start'
})

const HERO_PROOF_POINTS = [
  'No scraped content — purchase from day one.',
  'Structured results plus LLM-ready Markdown and HTML for top websites.',
  'Structured data for people, news, companies, and citations.',
  'Proxy-backed requests from the first call.'
]

const GooglePage = () => {
  const [activeHeroExampleId, setActiveHeroExampleId] = useState(
    HERO_EXAMPLES[0].id
  )
  const [activeVerticalId, setActiveVerticalId] = useState(
    GOOGLE_VERTICALS[0].id
  )
  const [activeVerticalExampleIndex, setActiveVerticalExampleIndex] =
    useState(0)
  const [activeOutputTab, setActiveOutputTab] = useState('json')
  const [heroPhase, setHeroPhase] = useState('typing')

  const heroCodeRef = useRef(null)

  const activeHeroExample = useMemo(
    () =>
      HERO_EXAMPLES.find(example => example.id === activeHeroExampleId) ??
      HERO_EXAMPLES[0],
    [activeHeroExampleId]
  )

  const heroTypingTargets = useMemo(
    () => extractHeroTypingTargets(activeHeroExample.code),
    [activeHeroExample.code]
  )

  const activeVertical = useMemo(
    () =>
      GOOGLE_VERTICALS.find(vertical => vertical.id === activeVerticalId) ??
      GOOGLE_VERTICALS[0],
    [activeVerticalId]
  )

  const activeVerticalService = useMemo(
    () =>
      SUPPORTED_GOOGLE_SERVICES.find(
        service => service.id === activeVertical.id
      ) ?? null,
    [activeVertical.id]
  )

  const baseVerticalExample = useMemo(
    () =>
      GOOGLE_VERTICAL_EXAMPLES_DATA[activeVertical.id] ??
      GOOGLE_VERTICAL_EXAMPLES[activeVertical.id] ?? { code: '', payload: '' },
    [activeVertical.id]
  )

  const activeVerticalExamples = useMemo(
    () => getVerticalExampleOptions(activeVertical.id, baseVerticalExample),
    [activeVertical.id, baseVerticalExample]
  )

  const activeVerticalExample =
    activeVerticalExamples[activeVerticalExampleIndex] ??
    activeVerticalExamples[0] ?? { code: '', payload: '' }

  const activeVerticalPayload = useMemo(
    () => parseJsonPayload(activeVerticalExample.payload),
    [activeVerticalExample.payload]
  )

  const activeVerticalPayloadText = useMemo(
    () => JSON.stringify(activeVerticalPayload, null, 2),
    [activeVerticalPayload]
  )

  const activeVerticalPreview = useMemo(
    () => getVerticalPreviewResult(activeVertical.id, activeVerticalPayload),
    [activeVertical.id, activeVerticalPayload]
  )

  /* ─── hero typing / result phase orchestration ─── */

  useEffect(() => {
    setHeroPhase('typing')
  }, [activeHeroExampleId])

  useEffect(() => {
    if (heroPhase !== 'loading') return undefined
    const timer = window.setTimeout(() => {
      setHeroPhase('result')
    }, HERO_LOADING_MS)
    return () => window.clearTimeout(timer)
  }, [heroPhase, activeHeroExampleId])

  useEffect(() => {
    const container = heroCodeRef.current
    if (!container || heroTypingTargets.length === 0) {
      setHeroPhase('result')
      return undefined
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let cancelSequence = null
    let rafId = null
    let observer = null
    let activeSpans = []

    const start = () => {
      const matches = findHeroTypingSpans(container, heroTypingTargets)
      if (!matches) return false
      if (cancelSequence) cancelSequence()
      activeSpans = matches.map(match => match.span)
      cancelSequence = runHeroTypingSequence(
        matches,
        prefersReducedMotion,
        () => {
          if (observer) observer.disconnect()
          activeSpans = []
          setHeroPhase(current => (current === 'typing' ? 'loading' : current))
        }
      )
      return true
    }

    const schedule = () => {
      if (rafId !== null) return
      rafId = window.requestAnimationFrame(() => {
        rafId = null
        start()
      })
    }

    const isInsideActiveSpan = node => {
      if (!node) return false
      return activeSpans.some(span => span === node || span.contains(node))
    }

    const isInternalNode = node => {
      if (!node) return true
      if (node.nodeType === 1 && node.classList?.contains('hero-code-caret')) {
        return true
      }
      return isInsideActiveSpan(node.parentNode || node)
    }

    observer = new window.MutationObserver(mutations => {
      if (activeSpans.length === 0) return
      const external = mutations.some(mutation => {
        if (!isInsideActiveSpan(mutation.target)) return true
        const nodes = [
          ...Array.from(mutation.addedNodes || []),
          ...Array.from(mutation.removedNodes || [])
        ]
        return nodes.some(node => !isInternalNode(node))
      })
      if (external) schedule()
    })
    observer.observe(container, { childList: true, subtree: true })
    schedule()

    return () => {
      if (observer) observer.disconnect()
      if (rafId !== null) window.cancelAnimationFrame(rafId)
      if (cancelSequence) cancelSequence()
    }
  }, [activeHeroExampleId, heroTypingTargets])

  useEffect(() => {
    setActiveOutputTab('json')
    setActiveVerticalExampleIndex(0)
  }, [activeVerticalId])

  /* ─── stable handlers ─── */

  const selectHeroExample = useCallback(tabId => {
    setHeroPhase('typing')
    setActiveHeroExampleId(tabId)
  }, [])

  const focusElement = id => {
    const el = typeof document !== 'undefined' && document.getElementById(id)
    if (el) el.focus()
  }

  const handleHeroExampleTabKeyDown = useMemo(
    () =>
      createTablistKeyHandler({
        items: HERO_EXAMPLES,
        onSelect: selectHeroExample,
        focusTab: id => focusElement(`hero-example-tab-${id}`)
      }),
    [selectHeroExample]
  )

  const handleVerticalTabKeyDown = useMemo(
    () =>
      createTablistKeyHandler({
        items: GOOGLE_VERTICALS,
        onSelect: setActiveVerticalId,
        focusTab: id => focusElement(`google-vertical-chip-${id}`)
      }),
    []
  )

  const handleOutputTabKeyDown = useMemo(
    () =>
      createTablistKeyHandler({
        items: VERTICAL_OUTPUT_TABS,
        onSelect: setActiveOutputTab,
        focusTab: id => focusElement(`vertical-output-tab-${id}`)
      }),
    []
  )

  return (
    <Layout>
      <Container
        as='section'
        id='google-verticals'
        css={theme({ pt: 0, maxWidth: HERO_LAYOUT.maxWidth })}
      >
        <Box css={theme({ width: '100%', mx: 'auto' })}>
          <Box
            css={theme({
              maxWidth: ['100%', '100%', layout.normal, layout.medium],
              mx: 'auto'
            })}
          >
            <Text
              as='h2'
              css={theme({
                m: 0,
                color: 'black',
                fontWeight: 'bold',
                letterSpacing: 1,
                lineHeight: [1, 1, 0, 0],
                fontSize: [4, 4, 5, 5],
                textAlign: 'center'
              })}
            >
              One API for AI <br />
              <span
                style={{
                  background: gradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Search intelligence
              </span>
            </Text>
            <Text
              as='p'
              css={theme({
                m: 0,
                mt: [3, 3, 3, 3],
                maxWidth: '100%',
                mx: 'auto',
                color: 'black80',
                fontSize: [2, 2, 3, 3],
                lineHeight: 2,
                textAlign: 'center'
              })}
            >
              Search keeps the output consistent so monitoring jobs, SEO
              tooling, and AI agents need less parser logic.
            </Text>
          </Box>

          <Box id='playground' as='section' css={theme({ mt: [4, 4, 5, 5] })}>
            <VerticalExampleShell $accentColor={activeVertical.accentColor}>
              <Flex
                css={theme({
                  alignItems: 'center',
                  justifyContent: 'flex-start'
                })}
              >
                <Box
                  role='tablist'
                  aria-label='Supported search surfaces'
                  css={theme({
                    pt: 0,
                    pb: 0,
                    px: 0,
                    display: 'flex',
                    flexWrap: 'nowrap',
                    alignItems: 'stretch',
                    justifyContent: [
                      'flex-start',
                      'flex-start',
                      'center',
                      'center'
                    ],
                    gap: [1, 1, 2, 2],
                    width: '100%',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    border: 0
                  })}
                >
                  {GOOGLE_VERTICALS.map((vertical, index) => {
                    const verticalService = SUPPORTED_GOOGLE_SERVICES.find(
                      service => service.id === vertical.id
                    )

                    return (
                      <VerticalTabButton
                        key={vertical.id}
                        id={`google-vertical-chip-${vertical.id}`}
                        type='button'
                        $active={activeVertical.id === vertical.id}
                        $activeColor={vertical.accentColor}
                        aria-pressed={activeVertical.id === vertical.id}
                        onClick={() => setActiveVerticalId(vertical.id)}
                        onKeyDown={event =>
                          handleVerticalTabKeyDown(event, index)
                        }
                      >
                        {verticalService && (
                          <Box
                            as='img'
                            src={verticalService.iconUrl}
                            alt=''
                            aria-hidden='true'
                            css={theme({
                              width: '14px',
                              height: '14px',
                              flexShrink: 0
                            })}
                          />
                        )}
                        {vertical.name}
                      </VerticalTabButton>
                    )
                  })}
                </Box>
              </Flex>

              <VerticalExampleGrid>
                <VerticalExamplePanel
                  css={theme({
                    alignSelf: 'stretch',
                    minHeight: 0,
                    height: VERTICAL_RESPONSE_HEIGHT,
                    justifyContent: 'flex-start',
                    border: 1,
                    borderColor: 'black10'
                  })}
                >
                  <Box
                    css={theme({
                      px: [3, 3, 4, 4],
                      py: [3, 3, 4, 4],
                      borderBottom: 1,
                      borderBottomColor: 'black10'
                    })}
                  >
                    <Flex css={theme({ alignItems: 'flex-start', gap: 3 })}>
                      {activeVerticalService && (
                        <HeroResultBrand $size='64px'>
                          <Box
                            as='img'
                            src={activeVerticalService.iconUrl}
                            alt=''
                            aria-hidden='true'
                          />
                        </HeroResultBrand>
                      )}
                      <Box css={theme({ minWidth: 0 })}>
                        <Text
                          as='h4'
                          css={theme({
                            m: 0,
                            color: 'black',
                            fontSize: [2, 2, 3, 3],
                            fontWeight: 'bold',
                            lineHeight: 1
                          })}
                        >
                          {activeVerticalService?.label ?? activeVertical.name}
                        </Text>
                        <Text
                          as='p'
                          css={theme({
                            m: 0,
                            mt: 2,
                            color: 'black70',
                            fontSize: [1, 1, 2, 2],
                            lineHeight: 2
                          })}
                        >
                          {activeVertical.description}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>

                  <Box
                    css={theme({
                      px: [3, 3, 4, 4],
                      minWidth: 0,
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      minHeight: 0
                    })}
                  >
                    <VerticalResultList>
                      {activeVerticalExamples.map((example, index) => {
                        const isActive = index === activeVerticalExampleIndex

                        return (
                          <Box as='li' key={example.id}>
                            <VerticalExampleOption
                              type='button'
                              $active={isActive}
                              aria-pressed={isActive}
                              onClick={() => setActiveVerticalExampleIndex(index)}
                            >
                              <VerticalExampleOptionIcon
                                $active={isActive}
                                aria-hidden='true'
                              >
                                <Edit3 />
                              </VerticalExampleOptionIcon>
                              <Box css={theme({ minWidth: 0, pt: 1 })}>
                                <Text
                                  as='p'
                                  css={theme({
                                    m: 0,
                                    color: isActive ? 'link' : 'black70',
                                    fontSize: [1, 1, 2, 2],
                                    fontWeight: 'bold',
                                    lineHeight: 1
                                  })}
                                >
                                  {example.label}
                                </Text>
                                <Text
                                  as='p'
                                  css={theme({
                                    m: 0,
                                    mt: 2,
                                    color: 'black70',
                                    fontSize: [0, 0, 1, 1],
                                    lineHeight: 2
                                  })}
                                >
                                  {example.description}
                                </Text>
                              </Box>
                            </VerticalExampleOption>
                          </Box>
                        )
                      })}
                    </VerticalResultList>

                    <Text
                      as='p'
                      css={theme({
                        m: 0,
                        mt: 'auto',
                        pt: 3,
                        color: 'black60',
                        fontSize: [0, 0, 1, 1],
                        textAlign: 'center',
                        borderTop: 1,
                        borderTopColor: 'black10'
                      })}
                    >
                      Pick an example to update code and output
                    </Text>
                  </Box>
                </VerticalExamplePanel>

                <Box
                  css={theme({
                    alignSelf: 'flex-start',
                    minHeight: 0,
                    height: VERTICAL_RESPONSE_HEIGHT,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3
                  })}
                >
                  <VerticalExamplePanel
                    css={theme({
                      border: 1,
                      borderColor: 'black10',
                      height: ['160px', '160px', '180px', '190px'],
                      flexShrink: 0
                    })}
                  >
                    <Box
                      id='vertical-output-panel-code'
                      role='tabpanel'
                      aria-label='Code example'
                      css={theme({
                        display: 'flex',
                        flexDirection: 'column',
                        flex: 1,
                        minHeight: 0,
                        height: '100%',
                        py: [1, 1, 2, 2],
                        px: 0
                      })}
                    >
                      <CodeEditor
                        language='javascript'
                        showFade={false}
                        showHeader={false}
                        showWindowButtons={false}
                        showTitle={false}
                        showAction={false}
                        css={theme({
                          width: '100%',
                          height: '100%',
                          minHeight: 0,
                          flex: 1,
                          border: 0,
                          borderRadius: 0,
                          pt: 1
                        })}
                      >
                        {activeVerticalExample.code}
                      </CodeEditor>
                    </Box>
                  </VerticalExamplePanel>

                  <VerticalExamplePanel
                    css={theme({
                      border: 1,
                      borderColor: 'black10',
                      flex: 1,
                      minHeight: 0
                    })}
                  >
                    <Box
                      role='tablist'
                      aria-label='Output format'
                      css={theme({
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        gap: 2,
                        bg: 'transparent',
                        borderBottom: 1,
                        borderBottomColor: 'black10',
                        px: [3, 3, 4, 4],
                        py: 3,
                        flexShrink: 0
                      })}
                    >
                      {VERTICAL_OUTPUT_TABS.map((tab, index) => {
                        const isActive = activeOutputTab === tab.id
                        return (
                          <VerticalOutputTab
                            key={tab.id}
                            id={`vertical-output-tab-${tab.id}`}
                            type='button'
                            role='tab'
                            $active={isActive}
                            aria-selected={isActive}
                            aria-controls={`vertical-output-panel-${tab.id}`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => setActiveOutputTab(tab.id)}
                            onKeyDown={event =>
                              handleOutputTabKeyDown(event, index)
                            }
                          >
                            {tab.label}
                          </VerticalOutputTab>
                        )
                      })}
                    </Box>

                    {activeOutputTab === 'json' && (
                      <Box
                        id='vertical-output-panel-json'
                        role='tabpanel'
                        aria-labelledby='vertical-output-tab-json'
                        css={theme({
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 1,
                          minHeight: 0,
                          height: '100%',
                          py: [2, 2, 3, 3],
                          px: 0
                        })}
                      >
                        <CodeEditor
                          language='json'
                          showFade={false}
                          showHeader={false}
                          showWindowButtons={false}
                          showTitle={false}
                          showAction={false}
                          css={theme({
                            width: '100%',
                            height: '100%',
                            minHeight: 0,
                            flex: 1,
                            border: 0,
                            borderRadius: 0,
                            pt: 2
                          })}
                        >
                          {activeVerticalPayloadText}
                        </CodeEditor>
                      </Box>
                    )}

                    {activeOutputTab === 'preview' && (
                      <Box
                        id='vertical-output-panel-preview'
                        role='tabpanel'
                        aria-labelledby='vertical-output-tab-preview'
                        css={theme({
                          borderTop: 1,
                          borderTopColor: 'white',
                          bg: 'white',
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                          minHeight: 0,
                          flex: 1,
                          minWidth: 0
                        })}
                      >
                        <Box
                          css={theme({
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            minHeight: 0,
                            overflowY: 'auto',
                            overflowX: 'hidden'
                          })}
                        >
                          <VerticalPreviewContent>
                            <Box
                              css={theme({
                                px: [3, 3, 4, 4],
                                py: 0,
                                bg: 'white',
                                overflow: 'hidden'
                              })}
                            >
                              <HeroResultCard result={activeVerticalPreview} />
                            </Box>
                          </VerticalPreviewContent>
                        </Box>
                      </Box>
                    )}
                  </VerticalExamplePanel>
                </Box>
              </VerticalExampleGrid>
            </VerticalExampleShell>
          </Box>

          <Box id='features' as='section' css={theme({ mt: [4, 4, 5, 5] })}>
            <Box
              as='ul'
              css={theme({
                listStyle: 'none',
                p: 0,
                m: 0,
                mt: 4,
                width: 'max-content',
                maxWidth: '100%',
                mx: 'auto'
              })}
            >
              {HERO_PROOF_POINTS.map(point => (
                <List.Item key={point} css={heroProofListItemCss}>
                  {point}
                </List.Item>
              ))}
            </Box>
          </Box>

          <Box
            id='cta'
            css={theme({ display: 'flex', justifyContent: 'center' })}
          >
            <ActionRow
              css={theme({
                flexDirection: 'row',
                flexWrap: 'nowrap',
                alignItems: 'center',
                justifyContent: 'center'
              })}
            >
              <Button as='a' href='/pricing'>
                Get the API keys
              </Button>
              <ArrowLink
                href={GUIDE_URL}
                css={theme({ fontSize: [1, 1, 2, 2] })}
              >
                View docs
              </ArrowLink>
            </ActionRow>
          </Box>
        </Box>
      </Container>

      <Box
        as='section'
        id='retrieval-workflows'
        css={theme({ bg: 'white', py: 7 })}
      >
        <Container
          css={theme({
            maxWidth: [
              '100%',
              '100%',
              layout.large,
              `calc(${layout.large} * 1.63)`
            ],
            pt: 0,
            px: [3, 3, 0, 0]
          })}
        >
          <Flex
            css={theme({
              width: '100%',
              maxWidth: [
                '100%',
                '100%',
                layout.large,
                `calc(${layout.large} * 1.63)`
              ],
              mx: 'auto',
              flexDirection: ['column', 'column', 'row', 'row'],
              alignItems: ['stretch', 'stretch', 'center', 'center']
            })}
          >
            <Box
              css={theme({
                width: ['100%', '100%', '42%', '42%'],
                flexShrink: 0,
                pt: [0, 0, 2, 2]
              })}
            >
              <SectionCaption color={colors.red7}>
                Built for agentic workflows
              </SectionCaption>
              <Text
                as='h2'
                css={theme({
                  m: 0,
                  color: 'black',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  lineHeight: [1, 1, 0, 0],
                  fontSize: [3, 4, 4, 4],
                  textAlign: 'left'
                })}
              >
                Built for retrieval loops, <br />
                <span css={theme({ color: 'red7' })}>
                  not just result pages
                </span>
              </Text>
              <Text
                as='p'
                css={theme({
                  m: 0,
                  mt: 3,
                  color: 'black80',
                  fontSize: [1, 1, 2, 2],
                  lineHeight: 2,
                  textAlign: 'left',
                  maxWidth: ['100%', '100%', layout.small, layout.small]
                })}
              >
                Search stays lightweight on the first pass so technical
                workflows can stay fast under real production load.
              </Text>
            </Box>

            <Box
              css={theme({
                width: ['100%', '100%', '58%', '58%'],
                display: 'grid',
                ml: 6,
                gap: [4, 4, 5, 5]
              })}
            >
              <RetrievalFeatureCard
                icon='markdown'
                accent='blue'
                title='Ship LLM-ready Markdown'
                description='Rich previews with clean HTML. They work out of the box across inlined, remote, static, or navigation markup sites.'
              />
              <RetrievalFeatureCard
                icon='bolt'
                accent='blue'
                title='Lazy-load the web'
                description='Search more like a two-step system: lightweight results first, deeper content second. That keeps the pipeline snappy, the agents focused, and your costs down.'
              />
              <RetrievalFeatureCard
                icon='search'
                accent='teal'
                title='Turn Search into a document discovery engine'
                divider={false}
                description={
                  <>
                    Combine operators like <code>site:</code>,{' '}
                    <code>intitle:</code>, and <code>filetype:</code> to hunt
                    for papers, docs, filings, changelogs, or PDFs before you
                    spend anything.
                  </>
                }
              />
            </Box>
          </Flex>
        </Container>
      </Box>

      <Box
        as='section'
        id='pricing'
        css={theme({
          bg: 'orange0',
          py: [5, 5, 5, 5],
          borderTop: 1,
          borderBottom: 1,
          borderColor: 'orange0'
        })}
      >
        <Container
          css={theme({
            px: [3, 3, 4, 4],
            maxWidth: [
              '100%',
              '100%',
              layout.large,
              `calc(${layout.large} * 1.63)`
            ]
          })}
        >
          <Flex
            css={theme({
              flexDirection: ['column', 'column', 'row', 'row'],
              alignItems: ['center', 'center', 'center', 'center'],
              width: '100%'
            })}
          >
            <Box
              css={theme({
                width: ['100%', '100%', '48%', '48%'],
                flexShrink: 0
              })}
            >
              <SectionCaption color={colors.orange7}>
                Simple, predictable pricing
              </SectionCaption>
              <Text
                as='h2'
                css={theme({
                  m: 0,
                  color: 'black',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  lineHeight: [1, 1, 0, 0],
                  fontSize: [3, 4, 4, 4],
                  textAlign: 'left'
                })}
              >
                One dollar,
                <br />
                <span css={theme({ color: 'orange7' })}>
                  one thousand requests
                </span>
              </Text>
              <Text
                as='p'
                css={theme({
                  m: 0,
                  mt: 3,
                  color: 'black80',
                  fontSize: [1, 1, 2, 2],
                  lineHeight: 2,
                  textAlign: 'left',
                  maxWidth: layout.small
                })}
              >
                Search has no free tier because reliable result collection
                depends on managed proxy capacity, regional routing, and
                production safeguards on every call.
              </Text>
            </Box>

            <PricingCard as='section'>
              <Text
                as='h3'
                css={theme({
                  m: 0,
                  color: 'black',
                  fontWeight: 'bold',
                  fontSize: [2, 2, 3, 3]
                })}
              >
                Pro
              </Text>

              <Flex css={theme({ alignItems: 'baseline' })}>
                <Text
                  css={theme({
                    color: 'black',
                    fontSize: [4, 4, 5, 5],
                    fontWeight: 'bold',
                    lineHeight: 0,
                    mb: 2
                  })}
                >
                  $39
                </Text>
                <Text
                  css={theme({
                    m: 0,
                    color: 'black60',
                    fontSize: [0, 0, 1, 1]
                  })}
                >
                  /month
                </Text>
              </Flex>

              <Box>
                <Text
                  css={theme({
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: [1, 1, 2, 2],
                    lineHeight: 1
                  })}
                >
                  40,000 requests/month included
                </Text>
              </Box>

              <Box css={theme({ py: 4 })}>
                <PricingCheck>Managed proxy-backed requests</PricingCheck>
                <PricingCheck>10 requests saved as snippets</PricingCheck>
                <PricingCheck>Structured normalized results</PricingCheck>
                <PricingCheck>Location and geocode controls</PricingCheck>
                <PricingCheck>
                  Pagination with <code>next()</code>
                </PricingCheck>
                <PricingCheck>
                  Optional plugins: Markdown or HTML via{' '}
                  <code>microlink/html</code> and <code>microlink/md</code>
                </PricingCheck>
              </Box>

              <Flex
                css={theme({
                  color: 'orange7',
                  fontSize: ['18px', '18px', '20px', '20px']
                })}
              >
                <ArrowLink
                  href='/pricing'
                  css={theme({
                    fontWeight: 'bold'
                  })}
                >
                  See all plans
                </ArrowLink>
              </Flex>
            </PricingCard>
          </Flex>
        </Container>
      </Box>

      <Box
        as='section'
        id='google-api-integration'
        css={theme({ bg: 'white', py: [5, 5, 5, 5] })}
      >
        <Container
          css={theme({
            p: 0,
            maxWidth: [
              '100%',
              '100%',
              layout.large,
              `calc(${layout.large} * 1.63)`
            ]
          })}
        >
          <Flex
            css={theme({
              flexDirection: ['column', 'column', 'row', 'row'],
              alignItems: ['center', 'center', 'center', 'center'],
              width: '100%'
            })}
          >
            <Box
              css={theme({
                width: ['100%', '100%', '48%', '48%'],
                flexShrink: 0
              })}
            >
              <SectionCaption color={colors.green7}>
                Automate without scraper debt
              </SectionCaption>
              <Text
                as='h2'
                css={theme({
                  m: 0,
                  color: 'black',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  lineHeight: [1, 1, 0, 0],
                  fontSize: [3, 3, '36px', '36px'],
                  textAlign: 'left'
                })}
              >
                Automate Web Discovery
                <br />
                <span css={theme({ color: 'green7' })}>
                  without scraper debt
                </span>
              </Text>
              <Text
                as='p'
                css={theme({
                  m: 0,
                  mt: 3,
                  color: 'black80',
                  fontSize: [1, 1, 2, 2],
                  lineHeight: 2,
                  textAlign: 'left',
                  maxWidth: layout.small
                })}
              >
                Initialize once, choose the surface you need, then paginate or
                enrich only when a workflow needs more context.
              </Text>
            </Box>

            <Box
              css={theme({
                width: ['100%', '100%', '52%', '52%'],
                minWidth: 0
              })}
            >
              <TutorialTimeline>
                {INTEGRATION_TUTORIAL_STEPS.map(step => (
                  <TutorialStep key={step.step} step={step} />
                ))}
              </TutorialTimeline>

              <ActionRow
                css={theme({
                  mt: [4, 4, 5, 5],
                  ml: [0, 0, '104px', '104px'],
                  justifyContent: 'flex-start'
                })}
              >
                <Button as='a' href={PACKAGE_URL}>
                  Add Web Discovery to your stack
                </Button>
                <ArrowLink href={GUIDE_URL}>Read the Search guide</ArrowLink>
              </ActionRow>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Box
        as='section'
        id='final-cta'
        css={theme({ bg: 'blue0', py: [5, 5, 6, 6] })}
      >
        <Container
          css={theme({
            p: 0,
            maxWidth: [
              '100%',
              '100%',
              layout.large,
              `calc(${layout.large} * 1.63)`
            ]
          })}
        >
          <Flex
            css={theme({
              display: 'grid',
              gridTemplateColumns: ['1fr', '1fr', '48% 52%', '48% 52%'],
              gap: [5, 5, 6, 7],
              alignItems: ['center', 'center', 'center', 'center'],
              width: '100%'
            })}
          >
            <Box
              css={theme({
                width: '100%',
                flexShrink: 0,
                maxWidth: ['100%', '100%', layout.small, layout.small]
              })}
            >
              <SectionCaption color={colors.blue6}>
                Connect everything
              </SectionCaption>
              <Text
                as='h2'
                css={theme({
                  m: 0,
                  color: 'black',
                  fontWeight: 'bold',
                  letterSpacing: 1,
                  lineHeight: 1,
                  fontSize: [4, 4, '42px', '42px'],
                  textAlign: 'left'
                })}
              >
                Plug <span css={theme({ color: 'blue6' })}>Microlink</span>
                <br />
                <span css={theme({ whiteSpace: 'nowrap' })}>
                  into your workflow
                </span>
              </Text>
              <Text
                as='p'
                css={theme({
                  m: 0,
                  mt: 3,
                  color: 'black80',
                  fontSize: [1, 1, 2, 2],
                  lineHeight: 2,
                  textAlign: 'left'
                })}
              >
                Combine Search with <Link href='/metadata'>Metadata</Link>,{' '}
                <Link href='/screenshot'>Screenshot</Link>, and{' '}
                <Link href='/markdown'>Markdown</Link> to turn discovered URLs
                into richer outputs for structured fields, visual captures, and
                AI-ready page context, all under the same paid Microlink plan.
              </Text>
            </Box>

            <Box
              css={theme({
                width: '100%',
                minWidth: 0
              })}
            >
              <Flex
                css={theme({
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: [3, 3, 4, 5],
                  flexDirection: ['column', 'row', 'row', 'row'],
                  position: 'relative'
                })}
              >
                <Box
                  aria-hidden='true'
                  css={theme({
                    display: ['none', 'block', 'block', 'block'],
                    position: 'absolute',
                    left: '20%',
                    right: '20%',
                    top: '50%',
                    height: '2px',
                    borderTop: 1,
                    borderTopColor: 'blue2',
                    zIndex: 0
                  })}
                  style={{ borderTopStyle: 'dotted' }}
                />
                {[
                  {
                    label: 'Search',
                    href: '/search',
                    icon: <SearchIcon size={58} strokeWidth={2} />
                  },
                  {
                    label: 'Metadata',
                    href: '/metadata',
                    icon: <FileText size={54} strokeWidth={2} />
                  },
                  {
                    label: 'Markdown',
                    href: '/markdown',
                    icon: (
                      <Text
                        as='span'
                        css={theme({
                          m: 0,
                          color: 'blue6',
                          fontWeight: 'bold',
                          fontSize: [4, 4, 4, 4],
                          fontFamily: 'mono',
                          lineHeight: 1,
                          border: 2,
                          borderColor: 'blue6',
                          borderRadius: 2,
                          px: 2,
                          py: 1
                        })}
                      >
                        M↓
                      </Text>
                    )
                  }
                ].map(product => (
                  <Box
                    as='a'
                    key={product.label}
                    href={product.href}
                    css={theme({
                      position: 'relative',
                      zIndex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4,
                      width: ['150px', '150px', '150px', '160px'],
                      minWidth: ['150px', '150px', '150px', '160px'],
                      height: ['190px', '190px', '200px', '210px'],
                      borderRadius: 4,
                      bg: 'white',
                      border: 1,
                      borderColor: 'black05',
                      textDecoration: 'none',
                      color: 'black',
                      transition: `border-color ${transition.short}`
                    })}
                  >
                    <Box
                      css={theme({
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'blue6',
                        minHeight: '72px'
                      })}
                    >
                      {product.icon}
                    </Box>
                    <Text
                      as='span'
                      css={theme({
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: [1, 1, 2, 2],
                        lineHeight: 1
                      })}
                    >
                      {product.label}
                    </Text>
                  </Box>
                ))}
              </Flex>
              <Flex
                css={theme({
                  mt: [4, 4, 5, 6],
                  justifyContent: [
                    'center',
                    'center',
                    'flex-start',
                    'flex-start'
                  ],
                  pl: [0, 0, 0, 0]
                })}
              >
                <ArrowLink
                  href='/pricing'
                  css={theme({
                    color: 'blue6',
                    fontWeight: 'bold',
                    fontSize: [1, 1, 2, 2]
                  })}
                >
                  See all plans
                </ArrowLink>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Flex
        css={theme({
          py: [4, 4, 5, 5],
          gap: [3, 3, 5, 5],
          flexWrap: 'wrap',
          justifyContent: 'center',
          borderTop: 1,
          borderTopColor: 'black05'
        })}
      >
        {FINAL_CTA_BADGES.map(label => (
          <Flex
            key={label}
            css={theme({
              alignItems: 'center',
              gap: 2,
              color: 'black80',
              fontSize: [0, 0, 1, 1]
            })}
          >
            <Check size={14} color={colors.black60} aria-hidden='true' />
            <Text as='span'>{label}</Text>
          </Flex>
        ))}
      </Flex>
    </Layout>
  )
}

const RetrievalCommandStrong = styled(Text).attrs({ as: 'strong' })`
  ${theme({
    color: 'black',
    fontFamily: 'mono',
    fontSize: [0, 0, 1, 1],
    lineHeight: 1,
    fontWeight: 'bold'
  })};
`

const RetrievalCardItem = styled(Box).attrs({ as: 'li' })`
  ${theme({
    display: 'block',
    minWidth: 0,
    py: [3, 3, 4, 4]
  })};

  &:not(:first-of-type) {
    border-top: 1px solid ${colors.black05};
  }
`

const RetrievalCard = ({ label, title, description, children }) => (
  <RetrievalCardItem>
    <Flex css={theme({ alignItems: 'flex-start', minWidth: 0 })}>
      <Box css={theme({ minWidth: 0, width: '100%' })}>
        <Text
          as='p'
          css={theme({
            m: 0,
            color: 'black50',
            fontFamily: 'mono',
            fontSize: [0, 0, 1, 1],
            lineHeight: 1,
            letterSpacing: 1,
            textTransform: 'uppercase'
          })}
        >
          {label}
        </Text>
        <Text
          as='h3'
          css={theme({
            m: 0,
            mt: 1,
            color: 'black',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3],
            lineHeight: 1
          })}
        >
          {title}
        </Text>
      </Box>
    </Flex>
    <Box>
      <Text
        as='p'
        css={theme({
          m: 0,
          mt: 2,
          color: 'black70',
          fontSize: [1, 1, 2, 2],
          lineHeight: 2
        })}
      >
        {description}
      </Text>
      {children}
    </Box>
  </RetrievalCardItem>
)

/* ────────────────────────── tutorial step ────────────────────────── */

const TutorialStepContainer = styled(Box).attrs({ as: 'section' })`
  ${theme({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: ['1fr', '1fr', '72px 1fr', '72px 1fr'],
    columnGap: [0, 0, 4, 4],
    pb: [4, 4, 5, 6]
  })};

  &:last-child {
    padding-bottom: 0;

    &::after {
      content: '';
      ${theme({
        display: ['none', 'none', 'block', 'block'],
        position: 'absolute',
        top: '44px',
        bottom: 0,
        left: '35px',
        width: '2px',
        bg: 'white',
        zIndex: 1
      })};
    }
  }
`

const TutorialStep = ({ step }) => {
  return (
    <TutorialStepContainer>
      <Flex
        aria-hidden='true'
        css={theme({
          display: ['none', 'none', 'flex', 'flex'],
          position: 'relative',
          zIndex: 2,
          justifyContent: 'center'
        })}
      >
        <Box
          css={theme({
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
            borderRadius: '9999px',
            bg: 'gray9',
            color: 'white',
            position: 'relative',
            zIndex: 1,
            fontWeight: 'bold',
            fontSize: 2
          })}
        >
          {step.step}
        </Box>
      </Flex>

      <Box css={theme({ minWidth: 0 })}>
        <Text
          as='p'
          css={theme({
            m: 0,
            display: ['block', 'block', 'none', 'none'],
            color: 'black50',
            fontFamily: 'mono',
            fontSize: [0, 0, 1, 1],
            fontWeight: 'bold',
            letterSpacing: 1
          })}
        >
          {step.step}
        </Text>
        <Text
          as='h3'
          css={theme({
            m: 0,
            mt: 2,
            color: 'black',
            fontWeight: 'bold',
            fontSize: [2, 2, 3, 3],
            lineHeight: 1
          })}
        >
          {step.title}
        </Text>
        <Text
          as='p'
          css={theme({
            m: 0,
            mt: 2,
            color: 'black70',
            fontSize: [1, 1, 2, 2],
            lineHeight: 2,
            maxWidth: ['100%', '100%', layout.normal, layout.normal]
          })}
        >
          {step.description}
        </Text>

        <TutorialStepPanel panel={step.panel} title={step.title} />
      </Box>
    </TutorialStepContainer>
  )
}

const TutorialStepPanel = ({ panel, title }) => {
  if (panel.type === 'features') {
    return (
      <BulletList>
        {panel.items.map(item => (
          <Bullet key={item}>{item}</Bullet>
        ))}
      </BulletList>
    )
  }

  const panelWrapperCss = theme({
    mt: [3, 3, 4, 4],
    border: 1,
    borderColor: 'black10',
    borderRadius: 4,
    bg: 'white',
    overflow: 'hidden'
  })

  if (panel.type === 'terminal') {
    return (
      <Box css={panelWrapperCss}>
        <Text
          as='pre'
          css={theme({
            m: 0,
            p: [3, 3, 4, 4],
            bg: 'gray0',
            color: 'black80',
            fontFamily: 'mono',
            fontSize: [0, 0, 1, 1],
            lineHeight: 2,
            whiteSpace: 'pre-wrap'
          })}
        >
          {panel.content}
        </Text>
      </Box>
    )
  }

  return (
    <Box css={panelWrapperCss}>
      <CodeEditor
        language={panel.language}
        blinkCursor={false}
        showWindowButtons={false}
        showTitle={false}
        showAction={false}
        css={theme({
          width: '100%',
          height:
            TUTORIAL_CODE_HEIGHT_BY_TITLE[title] ??
            TUTORIAL_CODE_HEIGHT_DEFAULT,
          border: 0,
          borderRadius: 0
        })}
      >
        {panel.content}
      </CodeEditor>
    </Box>
  )
}

const FINAL_CTA_BADGES = [
  'Paid from day one',
  'Managed proxy layer included',
  'Built for SEO and AI workflows'
]

export const Head = () => (
  <Meta
    title='Search API for SEO, Monitoring, and AI Workflows'
    description='Microlink Search is a paid search intelligence API for querying and normalizing public results from Google Search, News, Maps, Shopping, Scholar, and more.'
    image={HERO_IMAGE}
    structured={STRUCTURED_DATA}
  />
)

export default GooglePage
