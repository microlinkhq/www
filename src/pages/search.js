import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { colors, gradient, layout, theme, transition } from 'theme'
import {
  ArrowRight,
  Check,
  CheckCircle,
  ChevronDown,
  Clock,
  Code as CodeIcon,
  FileText,
  GitMerge,
  Hexagon,
  MapPin,
  Star,
  Target
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
const HERO_RESULT_COLLAPSED_PEEK = '64px'
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

const extractRequestConfig = code => {
  if (!code) return { query: '', options: [] }
  const queryMatch = code.match(/google\(\s*(['"])([\s\S]*?)\1/)
  const optionsBlockMatch = code.match(/\{([\s\S]*?)\}/)

  return {
    query: queryMatch?.[2] ?? '',
    options: Array.from(
      optionsBlockMatch?.[1]?.matchAll(/(\w+)\s*:\s*(['"])([\s\S]*?)\2/g) ?? []
    ).map(([, key, , value]) => ({ key, value }))
  }
}

const buildRequestSnippet = ({ query, options }) => {
  const serializedOptions = options.length
    ? options.map(({ key, value }) => `  ${key}: '${value}'`).join(',\n')
    : "  type: 'search'"

  return `const google = require('@microlink/google')({
  apiKey: process.env.MICROLINK_API_KEY
})

const page = await google('${query}', {
${serializedOptions}
})

console.log(page.results)`
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
    borderRadius: 4,
    border: 1,
    borderColor: 'black10',
    bg: 'white',
    overflow: 'hidden',
    minWidth: 0,
    boxShadow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: ['auto', 'auto', '550px', '550px']
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
    minHeight: '44px',
    px: [2, 3, 3, 4],
    py: 2,
    border: 0,
    borderRight: 1,
    borderRightColor: 'black10',
    bg: 'gray0',
    color: 'black60',
    fontFamily: 'mono',
    fontSize: [0, 1, 1, 1],
    fontWeight: 'normal',
    letterSpacing: 0,
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    flex: 1,
    minWidth: 0,
    position: 'relative'
  })};
  ${({ $active }) =>
    theme({
      bg: $active ? 'white' : 'gray0',
      color: $active ? 'black' : 'black60',
      fontWeight: $active ? 'bold' : 'normal'
    })};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background-color ${transition.short}, color ${transition.short};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 2px;
    background-color: ${({ $active }) =>
      $active ? colors.black : 'transparent'};
    transition: background-color ${transition.short};
  }

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
    &::before,
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
    height: ['420px', '420px', 'auto', 'auto']
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
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    bg: 'white',
    borderTop: 1,
    borderTopColor: 'black10',
    boxShadow: '0 -8px 24px rgba(0, 0, 0, 0.06)',
    display: 'flex',
    flexDirection: 'column'
  })};
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
`

const HeroResultStatusDot = styled(Box).withConfig({
  shouldForwardProp: prop => prop !== '$loading'
})`
  ${theme({
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '9999px'
  })};
  background-color: ${({ $loading }) =>
    $loading ? colors.yellow6 : colors.green6};
  ${({ $loading }) =>
    $loading ? 'animation: heroResultPulse 1200ms ease-in-out infinite;' : ''};

  @keyframes heroResultPulse {
    0%,
    100% {
      opacity: 0.45;
      transform: scale(0.9);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const HeroResultBodyWrap = styled(Box).withConfig({
  shouldForwardProp: prop => prop !== '$collapsed'
})`
  overflow: hidden;
  max-height: ${({ $collapsed }) =>
    $collapsed ? HERO_RESULT_COLLAPSED_PEEK : HERO_RESULT_EXPANDED_MAX};
  opacity: ${({ $collapsed }) => ($collapsed ? 0.6 : 1)};
  transition: max-height 260ms cubic-bezier(0.22, 1, 0.36, 1),
    opacity 200ms ease;
  -webkit-mask-image: ${({ $collapsed }) =>
    $collapsed
      ? `linear-gradient(to bottom, ${colors.black} 0, transparent 100%)`
      : 'none'};
  mask-image: ${({ $collapsed }) =>
    $collapsed
      ? `linear-gradient(to bottom, ${colors.black} 0, transparent 100%)`
      : 'none'};

  @media (prefers-reduced-motion: reduce) {
    transition: opacity 120ms linear;
  }
`

const HeroResultToggle = styled('button').withConfig({
  shouldForwardProp: prop => prop !== '$collapsed'
})`
  ${theme({
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    p: 0,
    m: 0,
    borderRadius: '9999px',
    bg: 'transparent',
    color: 'black70'
  })};
  border: 1px solid ${colors.black10};
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: color ${transition.short}, background-color ${transition.short},
    border-color ${transition.short};

  svg {
    transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
    transform: rotate(${({ $collapsed }) => ($collapsed ? '180deg' : '0deg')});
  }

  &:hover {
    color: ${colors.black};
    background-color: ${colors.gray0};
    border-color: ${colors.black20};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    svg {
      transition: none;
    }
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
    maxHeight: ['180px', '180px', '200px', '220px'],
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
    mt: 3,
    borderRadius: 4,
    border: 1,
    borderColor: 'black10',
    bg: 'white',
    overflow: 'hidden',
    minWidth: 0,
    boxShadow: 1
  })};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 2px;
    background: ${({ $accentColor }) => colors[$accentColor] || colors.black};
  }
`

const VerticalExampleGrid = styled(Box)`
  ${theme({
    display: 'grid',
    gridTemplateColumns: [
      '1fr',
      '1fr',
      '1fr',
      'minmax(0, 0.96fr) minmax(0, 1.04fr)'
    ],
    gap: [3, 3, 3, 4],
    p: [3, 3, 4, 4],
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

const VerticalTabButton = styled('button').withConfig({
  shouldForwardProp: prop => !['$active', '$activeColor'].includes(prop)
})`
  ${theme({
    appearance: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2,
    border: 1,
    borderColor: 'black10',
    borderRadius: 4,
    bg: 'gray0',
    py: 1,
    px: 2,
    minHeight: '36px',
    color: 'black80',
    fontFamily: 'mono',
    fontWeight: 'normal',
    fontSize: [0, 0, 1, 1],
    lineHeight: 1,
    textTransform: 'lowercase',
    letterSpacing: 0,
    whiteSpace: 'nowrap',
    textAlign: 'left',
    cursor: 'pointer',
    flexShrink: 0
  })};
  ${({ $active, $activeColor }) =>
    theme({
      borderColor: $active ? $activeColor : 'black10',
      bg: $active ? 'white' : 'gray0',
      color: $active ? 'black' : 'black80',
      fontWeight: $active ? 'bold' : 'normal'
    })};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: color ${transition.short}, border-color ${transition.short},
    background-color ${transition.short};

  &:hover {
    border-color: ${colors.black20};
    background-color: ${colors.white};
    color: ${colors.black};
  }
  ${({ $active, $activeColor }) =>
    $active
      ? `
    &:hover {
      border-color: ${colors[$activeColor] || $activeColor};
      background-color: ${colors.white};
      color: ${colors.black};
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
    mt: [5, 5, 6, 6],
    position: 'relative',
    maxWidth: ['100%', '100%', layout.medium, layout.medium],
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

const PricingCard = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    borderRadius: 3,
    bg: 'white',
    px: [3, 3, 4, 4],
    py: [3, 3, 4, 4],
    flex: 1,
    minWidth: 0,
    maxWidth: ['100%', '100%', '400px', '400px'],
    width: '100%'
  })};
  border: 2px solid transparent;
  background: linear-gradient(${colors.white}, ${colors.white}) padding-box,
    ${gradient} border-box;
  box-shadow: 0 12px 32px ${colors.black10};
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
        color: 'black',
        flexShrink: 0
      })}
    >
      <Check size={16} aria-hidden='true' />
    </Box>
    <Text as='span' css={theme({ fontSize: [1, 1, 2, 2], color: 'black90' })}>
      {children}
    </Text>
  </Flex>
)

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
    step: 'STEP 01',
    title: 'Install and initialize',
    icon: Target,
    description:
      'Install `@microlink/google`, add your Microlink API key, and create one client you can reuse across every supported search surface.',
    panel: {
      type: 'code',
      language: 'bash',
      content: `pnpm add @microlink/google

export MICROLINK_API_KEY=your_api_key`
    }
  },
  {
    step: 'STEP 02',
    title: 'Run the first query',
    icon: Hexagon,
    description:
      'Choose the surface you need with the `type` option and keep the same client shape for search, news, images, maps, shopping, and more.',
    panel: {
      type: 'code',
      language: 'javascript',
      content: `const google = require('@microlink/google')({
  apiKey: process.env.MICROLINK_API_KEY
})
      
const page = await google('technical seo checklist', {
  type: 'search',
  location: 'us',
  period: 'week'
})`
    }
  },
  {
    step: 'STEP 03',
    title: 'Lazy-load the web',
    icon: GitMerge,
    description:
      'Keep the first pass fast, then enrich only the winners. Browse lightweight result pages first and call `.markdown()` or `.html()` only for the top matches that deserve deeper inspection.',
    panel: {
      type: 'features',
      items: [
        'Any result with a URL exposes `.markdown()` for LLM-ready Markdown on demand.',
        'Call `.html()` only when your workflow actually needs raw page markup.',
        'Just call `.next()` to fetch the next page.',
        'Lazy-load the web: scan results at ~1s latency, then enrich only the top 3 matches.'
      ]
    }
  }
]

// Step-specific editor heights keep the timeline's proportions.
const TUTORIAL_CODE_HEIGHT_BY_TITLE = {
  'Install and initialize': ['120px', '120px', '130px', '130px'],
  'Run the first query': ['280px', '280px', '320px', '320px']
}
const TUTORIAL_CODE_HEIGHT_DEFAULT = ['180px', '180px', '200px', '200px']

/* ────────────────────────── page ────────────────────────── */

const heroProofListItemCss = theme({
  m: 0,
  mb: 0,
  color: 'black80',
  fontSize: [1, 1, 2, 2],
  justifyContent: ['center', 'center', 'center', 'flex-start']
})

const HERO_PROOF_POINTS = [
  '10 supported search surfaces in one client.',
  'Structured results plus LLM-ready Markdown and HTML for top matches.',
  'Structured results for prices, ratings, coordinates, and citations.',
  'Proxy-backed requests from the first call.'
]

const GooglePage = () => {
  const [activeHeroExampleId, setActiveHeroExampleId] = useState(
    HERO_EXAMPLES[0].id
  )
  const [activeVerticalId, setActiveVerticalId] = useState(
    GOOGLE_VERTICALS[0].id
  )
  const [activeOutputTab, setActiveOutputTab] = useState('json')
  const [heroPhase, setHeroPhase] = useState('typing')
  const [heroResultCollapsed, setHeroResultCollapsed] = useState(false)

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

  const activeVerticalExample = useMemo(
    () =>
      GOOGLE_VERTICAL_EXAMPLES_DATA[activeVertical.id] ??
      GOOGLE_VERTICAL_EXAMPLES[activeVertical.id] ?? { code: '', payload: '' },
    [activeVertical.id]
  )

  const activeVerticalPayload = useMemo(
    () => parseJsonPayload(activeVerticalExample.payload),
    [activeVerticalExample.payload]
  )

  const activeVerticalPayloadText = useMemo(
    () => JSON.stringify(activeVerticalPayload, null, 2),
    [activeVerticalPayload]
  )

  const activeVerticalRequestSnippet = useMemo(
    () => buildRequestSnippet(extractRequestConfig(activeVerticalExample.code)),
    [activeVerticalExample.code]
  )

  const activeVerticalPreview = useMemo(
    () => getVerticalPreviewResult(activeVertical.id, activeVerticalPayload),
    [activeVertical.id, activeVerticalPayload]
  )

  /* ─── hero typing / result phase orchestration ─── */

  useEffect(() => {
    setHeroPhase('typing')
    setHeroResultCollapsed(false)
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
  }, [activeVerticalId])

  /* ─── stable handlers ─── */

  const selectHeroExample = useCallback(tabId => {
    setHeroPhase('typing')
    setHeroResultCollapsed(false)
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

  const toggleHeroResultCollapsed = useCallback(
    () => setHeroResultCollapsed(value => !value),
    []
  )

  /* ─── derived hero status label ─── */

  const heroStatusLabel =
    heroPhase === 'loading'
      ? 'Running query…'
      : Array.isArray(activeHeroExample.result?.data)
        ? `200 OK · page.results (${activeHeroExample.result.data.length})`
        : '200 OK · page.results[0]'

  return (
    <Layout>
      <HeroSection>
        <Flex
          as='section'
          id='hero'
          css={theme({
            flexDirection: 'column',
            alignItems: 'center',
            pt: [3, 3, 4, 4],
            pb: [2, 2, 3, 3]
          })}
        >
          <Flex
            css={theme({
              width: '100%',
              maxWidth: HERO_LAYOUT.maxWidth,
              px: [2, 3, 4, 4],
              mx: 'auto',
              flexDirection: ['column', 'column', 'column', 'row'],
              alignItems: ['center', 'center', 'center', 'stretch'],
              gap: HERO_LAYOUT.gap
            })}
          >
            <Flex
              css={theme({
                flexDirection: 'column',
                width: ['100%', '100%', '100%', HERO_LAYOUT.secondaryWidth],
                justifyContent: 'center',
                alignItems: ['center', 'center', 'center', 'flex-start']
              })}
            >
              <Box css={theme({ px: [2, 3, 4, 0], width: '100%' })}>
                <Text
                  as='h1'
                  variant='gradient'
                  css={theme({
                    m: 0,
                    color: 'black',
                    fontWeight: 'bold',
                    letterSpacing: 1,
                    lineHeight: [1, 1, 0, 0],
                    fontSize: [4, 4, 5, 5],
                    textAlign: ['center', 'center', 'center', 'left'],
                    width: '100%',
                    maxWidth: ['100%', '100%', '100%', '640px']
                  })}
                >
                  Search intelligence API for AI agents
                </Text>

                <Box
                  as='ul'
                  css={theme({
                    listStyle: 'none',
                    p: 0,
                    m: 0,
                    mt: 4,
                    display: 'grid',
                    gap: 2,
                    width: '100%'
                  })}
                >
                  {HERO_PROOF_POINTS.map(point => (
                    <List.Item key={point} css={heroProofListItemCss}>
                      {point}
                    </List.Item>
                  ))}
                </Box>
              </Box>

              <Flex css={theme({ px: [4, 4, 4, 0], width: '100%' })}>
                <ActionRow
                  css={theme({
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    alignItems: ['center', 'center', 'center', 'flex-start'],
                    justifyContent: ['center', 'center', 'center', 'flex-start']
                  })}
                >
                  <ArrowLink
                    href='/pricing'
                    css={theme({ fontSize: [2, 2, 3, 3] })}
                  >
                    Get the API key
                  </ArrowLink>
                </ActionRow>
              </Flex>
            </Flex>

            <Flex
              css={theme({
                width: ['100%', '100%', '100%', HERO_LAYOUT.mainWidth],
                pt: [4, 4, 5, 0],
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              })}
            >
              <Box
                css={theme({
                  maxWidth: ['100%', '95%', '85%', '100%'],
                  width: ['100%', '95%', '85%', '100%'],
                  minWidth: 0
                })}
              >
                <HeroExampleShell>
                  <Box
                    role='tablist'
                    aria-label='Example scenarios'
                    css={theme({
                      display: 'flex',
                      width: '100%',
                      bg: 'gray0',
                      borderBottom: 1,
                      borderBottomColor: 'black10',
                      flexShrink: 0
                    })}
                  >
                    {HERO_EXAMPLES.map((example, index) => {
                      const isActive = activeHeroExampleId === example.id
                      return (
                        <Tab
                          key={example.id}
                          id={`hero-example-tab-${example.id}`}
                          type='button'
                          role='tab'
                          $active={isActive}
                          $withBottomGap
                          aria-selected={isActive}
                          aria-controls={`hero-example-panel-${example.id}`}
                          tabIndex={isActive ? 0 : -1}
                          onClick={() => selectHeroExample(example.id)}
                          onKeyDown={event =>
                            handleHeroExampleTabKeyDown(event, index)}
                        >
                          {example.title}
                        </Tab>
                      )
                    })}
                  </Box>

                  <Box
                    role='tabpanel'
                    id={`hero-example-panel-${activeHeroExample.id}`}
                    aria-labelledby={`hero-example-tab-${activeHeroExample.id}`}
                    css={theme({
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                      minWidth: 0,
                      minHeight: 0,
                      position: 'relative'
                    })}
                  >
                    <Box
                      css={theme({
                        bg: 'white',
                        borderBottom: 1,
                        borderBottomColor: 'black10',
                        px: [3, 3, 4, 4],
                        py: [2, 2, 3, 3],
                        flexShrink: 0
                      })}
                    >
                      <Text
                        as='p'
                        css={theme({
                          m: 0,
                          color: 'black',
                          fontSize: [1, 1, 1, 1],
                          lineHeight: 2
                        })}
                      >
                        {activeHeroExample.description}
                      </Text>
                    </Box>

                    <HeroExampleCodePanel ref={heroCodeRef}>
                      <CodeEditor
                        title='Node.js example'
                        language='javascript'
                        blinkCursor={false}
                        showWindowButtons={false}
                        showTitle={false}
                        showAction={false}
                        css={theme({
                          width: '100%',
                          height: ['420px', '420px', '100%', '100%'],
                          border: 0,
                          borderRadius: 0,
                          mt: '-24px'
                        })}
                      >
                        {activeHeroExample.code}
                      </CodeEditor>
                    </HeroExampleCodePanel>

                    <HeroResultDock
                      $visible={heroPhase !== 'typing'}
                      aria-busy={heroPhase === 'loading' ? 'true' : 'false'}
                    >
                      <Flex
                        css={theme({
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 2,
                          px: [3, 3, 4, 4],
                          py: 2,
                          bg: 'gray0',
                          borderBottom: 1,
                          borderBottomColor: 'black10'
                        })}
                      >
                        <Flex
                          as='span'
                          css={theme({
                            alignItems: 'center',
                            gap: 2,
                            color: 'black70',
                            fontFamily: 'mono',
                            fontSize: '14px',
                            letterSpacing: 0,
                            lineHeight: 1
                          })}
                        >
                          <HeroResultStatusDot
                            $loading={heroPhase === 'loading'}
                          />
                          {heroStatusLabel}
                        </Flex>
                        <HeroResultToggle
                          type='button'
                          onClick={toggleHeroResultCollapsed}
                          aria-expanded={!heroResultCollapsed}
                          aria-controls='hero-result-body'
                          aria-label={
                            heroResultCollapsed
                              ? 'Expand results'
                              : 'Collapse results'
                          }
                          $collapsed={heroResultCollapsed}
                        >
                          <ChevronDown size={16} aria-hidden='true' />
                        </HeroResultToggle>
                      </Flex>
                      <HeroResultBodyWrap
                        id='hero-result-body'
                        $collapsed={heroResultCollapsed}
                      >
                        <Box
                          css={theme({
                            px: [3, 3, 4, 4],
                            py: [3, 3, 3, 3],
                            bg: 'white',
                            overflow: 'hidden'
                          })}
                        >
                          {heroPhase === 'loading'
                            ? (
                              <HeroResultSkeleton />
                              )
                            : (
                              <HeroResultCard result={activeHeroExample.result} />
                              )}
                        </Box>
                      </HeroResultBodyWrap>
                    </HeroResultDock>
                  </Box>
                </HeroExampleShell>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </HeroSection>

      <PageSection
        as='section'
        id='google-verticals'
        css={theme({ pt: 6, maxWidth: HERO_LAYOUT.maxWidth })}
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
              One API for recurring{' '}
              <span css={theme({ color: '#3b82f6' })}>search workflows</span>
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
          <Box as='section' css={theme({ px: [5, 5, 6, 6], mt: [4, 4, 5, 5] })}>
            <VerticalExampleShell $accentColor={activeVertical.accentColor}>
              <Flex
                css={theme({
                  px: [3, 3, 4, 4],
                  py: [3, 3, 3, 3],
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  gap: 2,
                  bg: 'transparent',
                  borderBottom: 1,
                  borderBottomColor: 'black10'
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
                    flexWrap: 'wrap',
                    alignItems: 'stretch',
                    justifyContent: 'flex-start',
                    gap: 2,
                    width: '100%',
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
                          handleVerticalTabKeyDown(event, index)}
                      >
                        {verticalService && (
                          <Box
                            as='img'
                            src={verticalService.iconUrl}
                            alt=''
                            aria-hidden='true'
                            css={theme({
                              width: '16px',
                              height: '16px',
                              flexShrink: 0
                            })}
                          />
                        )}
                        {vertical.name.replace(/^Google\s+/, '')}
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
                    justifyContent: 'center'
                  })}
                >
                  <Box
                    css={theme({
                      px: [2, 2, 3, 3],
                      pt: [3, 3, 4, 4],
                      pb: [3, 3, 3, 3],
                      borderBottom: 1,
                      borderBottomColor: 'black05'
                    })}
                  >
                    <Flex css={theme({ alignItems: 'center', gap: 3 })}>
                      {activeVerticalService && (
                        <Box
                          as='img'
                          src={activeVerticalService.iconUrl}
                          alt=''
                          aria-hidden='true'
                          css={theme({
                            width: '36px',
                            height: '36px',
                            flexShrink: 0
                          })}
                        />
                      )}
                      <Box css={theme({ minWidth: 0 })}>
                        <Text
                          as='h4'
                          css={theme({
                            m: 0,
                            color: 'black',
                            fontSize: [1, 1, 2, 2],
                            fontWeight: 'bold',
                            lineHeight: 2
                          })}
                        >
                          {activeVertical.name}
                        </Text>
                        <Text
                          as='p'
                          css={theme({
                            m: 0,
                            mt: 1,
                            color: 'black70',
                            fontSize: [0, 0, 1, 1],
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
                      py: [2, 2, 3, 3],
                      px: [1, 1, 2, 2],
                      minWidth: 0,
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      minHeight: 0
                    })}
                  >
                    <CodeEditor
                      language='javascript'
                      blinkCursor={false}
                      showHeader={false}
                      showWindowButtons={false}
                      showTitle={false}
                      showAction={false}
                      showFade={false}
                      css={theme({
                        width: '100%',
                        height: 'auto',
                        border: 0,
                        borderRadius: 0,
                        overflow: 'visible',
                        pt: 2
                      })}
                    >
                      {activeVerticalRequestSnippet}
                    </CodeEditor>
                  </Box>
                </VerticalExamplePanel>

                <VerticalExamplePanel
                  css={theme({
                    alignSelf: 'flex-start',
                    minHeight: 0,
                    height: VERTICAL_RESPONSE_HEIGHT,
                    boxShadow: 1
                  })}
                >
                  <Box
                    role='tablist'
                    aria-label='Output format'
                    css={theme({
                      display: 'flex',
                      width: '100%',
                      bg: 'gray0',
                      flexShrink: 0
                    })}
                  >
                    {VERTICAL_OUTPUT_TABS.map((tab, index) => {
                      const isActive = activeOutputTab === tab.id
                      return (
                        <Tab
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
                            handleOutputTabKeyDown(event, index)}
                        >
                          {tab.label}
                        </Tab>
                      )
                    })}
                  </Box>

                  {activeOutputTab === 'json'
                    ? (
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
                      )
                    : (
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
              </VerticalExampleGrid>
            </VerticalExampleShell>
          </Box>
        </Box>
      </PageSection>

      <PageSection as='section' id='retrieval-workflows'>
        <Box
          css={theme({
            width: '100%',
            maxWidth: ['100%', '100%', layout.large, layout.large],
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
            Built for retrieval loops,
            <br />
            <span css={theme({ color: '#dc2626' })}>not just result pages</span>
          </Text>
          <Text
            as='p'
            css={theme({
              m: 0,
              mt: [3, 3, 3, 3],
              maxWidth: ['100%', '100%', layout.normal, layout.medium],
              mx: 'auto',
              color: 'black80',
              fontSize: [2, 2, 3, 3],
              lineHeight: 2,
              textAlign: 'center'
            })}
          >
            Search stays lightweight on the first pass so technical workflows
            can stay fast under real production load.
          </Text>

          <Box
            as='ul'
            css={theme({
              mt: [4, 4, 5, 5],
              p: 0,
              listStyle: 'none',
              width: '100%'
            })}
          >
            <RetrievalCard
              label={
                <>
                  A. The <code>.markdown()</code> helper
                </>
              }
              title='Ship LLM-ready Markdown'
              description='RAG pipelines rarely want raw HTML. They want cleaner text that is easier to embed, rerank, cite, and pass into prompts without wasting context on navigation or markup noise.'
            >
              <BulletList>
                <Bullet>
                  Use <code>.markdown()</code> when the model needs readable,
                  prompt-ready context.
                </Bullet>
                <Bullet>
                  Keep <code>.html()</code> for DOM-aware extraction or custom
                  downstream parsing.
                </Bullet>
              </BulletList>
            </RetrievalCard>

            <RetrievalCard
              label='B. The two-step retrieval model'
              title='Lazy-load the web'
              description='Search works best as a two-step system: lightweight results first, deeper content second. That keeps the browse step snappy, then spends the heavier extraction cost only where confidence is already high.'
            >
              <BulletList>
                <Bullet>
                  Browse structured results at roughly search latency instead of
                  fetching every page in full up front.
                </Bullet>
                <Bullet>
                  Shortlist the top 3 sources, then call{' '}
                  <code>.markdown()</code> or <code>.html()</code> only for
                  those winners.
                </Bullet>
                <Bullet>
                  Keep recurring jobs faster and cheaper because enrichment is
                  opt-in, not mandatory.
                </Bullet>
              </BulletList>
            </RetrievalCard>

            <RetrievalCard
              label='C. Advanced operators'
              title='Turn Search into a document discovery engine'
              description={
                <>
                  Combine operators like <code>site:</code> and{' '}
                  <code>filetype:</code> to hunt for papers, docs, filings,
                  changelogs, or PDFs before you enrich anything. That gives
                  technical teams much tighter recall from the first query:
                </>
              }
            >
              <Box
                as='ul'
                css={theme({
                  m: 0,
                  mt: [3, 3, 3, 3],
                  p: 0,
                  listStyle: 'none',
                  display: 'grid',
                  gap: 2
                })}
              >
                <Flex
                  as='li'
                  css={theme({
                    alignItems: 'flex-start',
                    flexDirection: ['column', 'column', 'row', 'row'],
                    gap: [1, 1, 2, 2],
                    minWidth: 0
                  })}
                >
                  <Flex
                    css={theme({
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 1,
                      minWidth: 0
                    })}
                  >
                    <RetrievalCommandStrong>
                      site:arxiv.org
                    </RetrievalCommandStrong>
                    <RetrievalCommandStrong>
                      "deep learning"
                    </RetrievalCommandStrong>
                    <RetrievalCommandStrong>
                      filetype:pdf
                    </RetrievalCommandStrong>
                  </Flex>
                </Flex>
              </Box>
              <Text
                as='p'
                css={theme({
                  m: 0,
                  mt: 3,
                  color: 'black70',
                  fontSize: [1, 1, 2, 2],
                  lineHeight: 2
                })}
              >
                The hero example above now uses an operator-driven query so the
                workflow reads like real technical research instead of a generic
                web search.
              </Text>
            </RetrievalCard>
          </Box>
        </Box>
      </PageSection>

      <PageSection as='section' id='pricing'>
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
          One dollar,
          <br />
          <span css={theme({ color: '#ca8a04' })}>one thousand requests</span>
        </Text>
        <Text
          as='p'
          css={theme({
            m: 0,
            mt: [3, 3, 3, 3],
            maxWidth: layout.normal,
            mx: 'auto',
            color: 'black80',
            fontSize: [2, 2, 3, 3],
            lineHeight: 2,
            textAlign: 'center'
          })}
        >
          Search has no free tier because reliable result collection depends on
          managed proxy capacity, regional routing, and production safeguards on
          every call.
        </Text>

        <Flex
          css={theme({
            pt: [4, 4, 5, 5],
            px: [2, 2, 3, 3],
            flexDirection: 'column',
            justifyContent: 'stretch',
            alignItems: 'center',
            gap: [3, 3, 4, 4],
            width: '100%'
          })}
        >
          <PricingCard as='section'>
            <Text
              as='h3'
              css={theme({
                m: 0,
                color: 'black',
                fontWeight: 'bold',
                fontSize: ['20px', '20px', '24px', '24px']
              })}
            >
              Pro
            </Text>

            <Flex css={theme({ alignItems: 'baseline', pt: 2, gap: 1 })}>
              <Text
                css={theme({
                  m: 0,
                  color: 'black',
                  fontSize: ['32px', '32px', '38px', '38px'],
                  fontWeight: 'bold',
                  lineHeight: 0
                })}
              >
                €39
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

            <Text
              css={theme({
                m: 0,
                pt: 2,
                color: 'black80',
                fontSize: [1, 1, 2, 2],
                lineHeight: 2
              })}
            >
              46,000 requests/month
            </Text>

            <Box css={theme({ pt: 3 })}>
              <PricingCheck>Managed proxy-backed requests</PricingCheck>
              <PricingCheck>10 supported search surfaces</PricingCheck>
              <PricingCheck>Structured normalized results</PricingCheck>
              <PricingCheck>Location and period controls</PricingCheck>
              <PricingCheck>
                Pagination with <code>.next()</code>
              </PricingCheck>
              <PricingCheck>
                Optional page Markdown or HTML via <code>.markdown()</code> and{' '}
                <code>.html()</code>
              </PricingCheck>
            </Box>

            <Flex
              css={theme({
                pt: 4,
                fontSize: ['18px', '18px', '20px', '20px']
              })}
            >
              <Link href='/pricing'>See all plans</Link>
            </Flex>
          </PricingCard>
        </Flex>
      </PageSection>

      <PageSection as='section' id='google-api-integration'>
        <Box
          css={theme({
            width: '100%',
            maxWidth: ['100%', '100%', layout.normal, layout.medium]
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
            Automate Web Discovery
            <br />
            <span css={theme({ color: '#16a34a' })}>without scraper debt</span>
          </Text>
          <Text
            as='p'
            css={theme({
              m: 0,
              mt: [3, 3, 3, 3],
              maxWidth: ['100%', '100%', layout.normal, layout.medium],
              mx: 'auto',
              color: 'black80',
              fontSize: [2, 2, 3, 3],
              lineHeight: 2,
              textAlign: 'center'
            })}
          >
            Initialize once, choose the surface you need, then paginate or
            enrich only when a workflow needs more context.
          </Text>

          <TutorialTimeline>
            {INTEGRATION_TUTORIAL_STEPS.map(step => (
              <TutorialStep key={step.step} step={step} />
            ))}
          </TutorialTimeline>

          <ActionRow
            css={theme({ mt: [4, 4, 5, 5], justifyContent: 'flex-start' })}
          >
            <Button as='a' href={PACKAGE_URL}>
              Add @microlink/google to your project
            </Button>
            <Button as='a' variant='white' href={GUIDE_URL}>
              <Flex as='span' css={theme({ alignItems: 'center', gap: 2 })}>
                Read the Search guide
                <ArrowRight size={16} aria-hidden='true' />
              </Flex>
            </Button>
          </ActionRow>
        </Box>
      </PageSection>

      <PageSection as='section' id='final-cta'>
        <Flex
          css={theme({
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            px: [2, 2, 3, 3]
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
              textAlign: 'center',
              maxWidth: layout.medium
            })}
          >
            Plug <span css={theme({ color: '#3b82f6' })}>Microlink</span>
            <br />
            into your workflow
          </Text>
          <Text
            as='p'
            css={theme({
              m: 0,
              mt: [3, 3, 3, 3],
              color: 'black80',
              fontSize: [2, 2, 3, 3],
              lineHeight: 2,
              textAlign: 'center',
              maxWidth: [
                layout.small,
                layout.small,
                layout.normal,
                layout.normal
              ]
            })}
          >
            Combine Search with <Link href='/metadata'>Metadata</Link>,{' '}
            <Link href='/screenshot'>Screenshot</Link>, and{' '}
            <Link href='/markdown'>Markdown</Link> to turn discovered URLs into
            richer outputs for structured fields, visual captures, and AI-ready
            page content, all under the same paid Microlink plan.
          </Text>

          <ActionRow
            css={theme({ mt: [4, 4, 5, 5], justifyContent: 'center' })}
          >
            <ArrowLink href='/pricing' css={theme({ fontSize: [2, 2, 3, 3] })}>
              See all plans
            </ArrowLink>
          </ActionRow>

          <Flex
            css={theme({
              mt: [4, 4, 5, 5],
              gap: [3, 3, 4, 4],
              flexWrap: 'wrap',
              justifyContent: 'center'
            })}
          >
            {FINAL_CTA_BADGES.map(label => (
              <Flex
                key={label}
                css={theme({
                  alignItems: 'center',
                  gap: 1,
                  color: 'black80',
                  fontSize: [0, 0, 1, 1]
                })}
              >
                <Check size={16} color={colors.close} aria-hidden='true' />
                <Text as='span'>{label}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </PageSection>

      <Faq
        title='Product Information'
        caption='Everything you need to know about Microlink Search, pricing, and supported search surfaces.'
        css={theme({ mt: [5, 5, 6, 6], bg: 'white' })}
        questions={FAQ_ENTRIES.map(({ question, answers }) => ({
          question,
          answer: (
            <>
              {answers.map((answer, index) => (
                <div key={`${question}-${index}`}>{answer}</div>
              ))}
            </>
          )
        }))}
      />
      <Container
        css={theme({
          justifyContent: 'center',
          pt: [3, 3, 4, 4],
          maxWidth: layout.small
        })}
      >
        <Text
          as='p'
          css={theme({
            m: 0,
            color: 'black60',
            fontSize: [0, 0, 1, 1],
            lineHeight: 2,
            textAlign: 'center'
          })}
        >
          Google is a trademark of Google LLC. Microlink Search is an
          independent product and is not affiliated with or endorsed by Google.
        </Text>
      </Container>
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
  }
`

const TutorialStep = ({ step }) => {
  const Icon = step.icon
  return (
    <TutorialStepContainer>
      <Flex
        aria-hidden='true'
        css={theme({
          display: ['none', 'none', 'flex', 'flex'],
          position: 'relative',
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
            boxShadow: 1
          })}
        >
          <Icon size={18} aria-hidden='true' />
        </Box>
      </Flex>

      <Box css={theme({ minWidth: 0 })}>
        <Text
          as='p'
          css={theme({
            m: 0,
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
    overflow: 'hidden',
    boxShadow: 1
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
