import {
  borders,
  breakpoints,
  layout,
  colors,
  theme,
  transition,
  gradient,
  fontSizes,
  space,
  radii
} from 'theme'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { cdnUrl } from 'helpers/cdn-url'
import { trimMs } from 'helpers/trim-ms'
import styled, { css, keyframes } from 'styled-components'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Hide from 'components/elements/Hide'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import LineBreak from 'components/elements/LineBreak'

import { Check as CheckIcon, Star as StarIcon } from 'react-feather'
import FeatherIcon from 'components/icons/Feather'
import { Focus as FocusIcon } from 'components/icons/Focus'
import { PDF as PDFIcon } from 'components/icons/PDF'
import { rotate, dash, fadeInDown, highlight } from 'components/keyframes'
import ArrowLink from 'components/patterns/ArrowLink'
import Block from 'components/patterns/Block/Block'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import Microlink from 'components/patterns/Microlink/Microlink'
import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'
import { FeaturedToolCard } from 'components/patterns/Tools/ToolCards'
import { TOOLS as TOOL_CATALOG } from 'components/patterns/Tools/toolCatalog'

import { useHealthcheck } from 'components/hook/use-healthcheck'
import {
  ApiErrorTitle,
  ApiErrorBody
} from 'components/patterns/ApiError/ApiError'
import { normalizeApiError } from 'helpers/api-error'
import { extractDomain } from 'helpers/extract-domain'

import analyticsData from '../../data/analytics.json'
import ossData from '../../data/oss.json'

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1
})
const formatCompactCount = number =>
  COMPACT_NUMBER_FORMATTER.format(number).toLowerCase()
const OSS_STARS_BY_NAME = new Map(
  ossData.map(({ name, stars }) => [name, stars])
)
const getRepoStarsLabel = (repo, asNumber = false) => {
  const liveStars = OSS_STARS_BY_NAME.get(repo.name)
  if (asNumber) return liveStars
  return typeof liveStars === 'number' && !asNumber
    ? formatCompactCount(liveStars)
    : repo.stars
}

const FEATURES = [
  {
    title: 'Unified Metadata Extraction',
    description:
      'Normalize Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa, and raw HTML tags into a single, predictable JSON response. One API call, every source merged.'
  },
  {
    title: 'Free to Start',
    description:
      'Extract metadata from any URL immediately. No setup fees, no credit card required, and pay-as-you-grow pricing that scales with your link preview and ingestion workloads.'
  },
  {
    title: 'Global Edge Delivery',
    description:
      'Metadata responses are cached and distributed across 240+ edge locations powered by Cloudflare, ensuring sub-second link previews and feed ingestion worldwide.'
  },
  {
    title: 'Language-Agnostic REST API',
    description:
      'A single REST endpoint designed for developers. Integrate in minutes using official SDKs for Node.js, Python, Ruby, and Go, or any standard HTTP client.'
  },
  {
    title: 'Smart Color Palette Detection',
    description:
      'Extract brand palettes and dominant image colors automatically. Perfect for theming link previews, hero cards, and chat unfurls with zero manual art direction.'
  },
  {
    title: 'Rich Media & Provider Support',
    description:
      'Detect logos, favicons, videos, audio, and embeddable iframes across 250+ verified providers, from YouTube and Spotify to Figma and CodeSandbox.'
  },
  {
    title: 'JavaScript-Rendered Pages',
    description:
      'Full headless browser execution means React, Vue, and Next.js sites that inject meta tags at runtime are captured correctly every time — no stale SSR required.'
  },
  {
    title: 'Smart TTL Caching',
    description:
      'Configure Time-To-Live caching rules to keep your metadata fresh. Stay up to date with source changes while maintaining sub-second API performance at scale.'
  },
  {
    title: 'Zero-Config Integration',
    description:
      'Interactive documentation packed with live code examples. Copy-paste ready snippets get you from URL to structured metadata in under a minute.'
  }
]

const PLAYGROUND_TOOL_PATHS = ['/tools/sharing-debugger']
const METADATA_TOOLS =
  TOOL_CATALOG.find(section => section.category === 'Metadata')?.tools ?? []
const PLAYGROUND_TOOLS = PLAYGROUND_TOOL_PATHS.map(path =>
  METADATA_TOOLS.find(tool => tool.href === path)
).filter(Boolean)

const ACCENT = '#3e55ff'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const FIRST_URL = 'https://stripe.com'

const DEMO_URLS = ['unavatar.io', 'plausible.io']

const HERO_LAYOUT = {
  maxWidth: ['100%', '100%', '100%', `calc(${layout.large} * 1.7)`],
  mainWidth: '55%',
  secondaryWidth: '45%',
  gap: [1, 1, 1, 5]
}
const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]

// --- Styled Components ---

const BrowserWindow = styled('div')`
  ${theme({
    borderRadius: 5,
    bg: 'white',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    position: 'relative'
  })};
  border: ${borders[1]} ${colors.black05};
  box-shadow: 0 8px 24px ${colors.black10};

  &:hover:not(:has(.meta-api-bar:hover)) .address-bar {
    background: ${colors.gray1};
    border-color: ${colors.black10};
    box-shadow: none;

    input {
      color: ${colors.gray8};
    }
  }
`

const BrowserHeader = styled(Flex)`
  ${theme({
    bg: 'white',
    height: fontSizes[4],
    alignItems: 'center',
    px: 2,
    gap: 2,
    flexShrink: 0,
    minWidth: 0,
    position: 'relative',
    zIndex: 2
  })};
  border-bottom: ${borders[1]} ${colors.black05};
  border-radius: ${radii[5]} ${radii[5]} 0 0;
`

const NavButtons = styled(Flex)`
  ${theme({ alignItems: 'center', gap: 1, flexShrink: 0 })};
`

const NavArrow = styled('button')`
  ${theme({
    bg: 'transparent',
    p: 1,
    color: 'gray5',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 1,
    lineHeight: 0
  })};
  border: none;
  cursor: default;
  transition: color ${transition.short}, background ${transition.short},
    border-color ${transition.short};

  &:not(:disabled) {
    cursor: pointer;
    color: ${colors.gray6};

    &:hover {
      color: ${colors.gray8};
      background: ${colors.gray1};
    }

    &:active {
      color: ${colors.black60};
    }
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.black40};
  }
`

const caretPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 2px ${colors.black20};
    border-color: ${colors.gray6};
    background: ${colors.white};
  }
  50% {
    box-shadow: 0 0 0 1px ${colors.black10};
    border-color: ${colors.black20};
    background: ${colors.white95};
  }
`

const AddressBar = styled(Flex)`
  ${theme({
    flex: 1,
    bg: 'gray1',
    borderRadius: 4,
    height: space[4],
    alignItems: 'center',
    justifyContent: 'center',
    px: 2,
    gap: 2,
    minWidth: 0
  })};
  border: ${borders[1]} transparent;
  position: relative;
  transition: box-shadow ${transition.medium}, background ${transition.medium},
    border-color ${transition.medium};

  &:hover {
    background: ${colors.gray1};
    border-color: ${colors.black10};
    box-shadow: none;

    input {
      color: ${colors.gray8};
    }
  }

  ${({ $glowing }) =>
    $glowing &&
    css`
      background: ${colors.white};
      border-color: ${colors.black10};
      box-shadow: 0 0 0 1px ${colors.black10};
    `}

  ${({ $isPulsing }) =>
    $isPulsing &&
    css`
      animation: ${caretPulse} 2s ease-in-out 2;
    `}

  ${({ $active, $isPulsing }) =>
    $active &&
    !$isPulsing &&
    css`
      background: ${colors.white};
      border-color: ${colors.black10};
      box-shadow: 0 0 0 1px ${colors.black10};
    `}

  &:focus-within {
    background: ${colors.white};
    border-color: ${colors.black10};
    box-shadow: 0 0 0 1px ${colors.black10};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    animation: none;
    box-shadow: none;
  }
`

const AddressInput = styled('input')`
  ${theme({
    bg: 'transparent',
    p: 0,
    m: 0,
    flex: 1,
    width: 0,
    minWidth: '0',
    fontSize: 0,
    fontFamily: 'sans',
    letterSpacing: 0
  })};
  border: none;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  font-weight: 400;
  color: ${({ $active }) => ($active ? colors.gray8 : colors.gray6)};
  text-align: left;
  transition: color ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  caret-color: ${colors.gray8};

  &::selection {
    background: ${colors.black20};
    color: ${colors.black};
  }

  &:focus {
    outline: none;
    color: ${colors.black};
    text-align: left;
  }
`

const addressPromptArrowNudge = keyframes`
  0%, 100% {
    transform: translateX(0);
    opacity: 0.75;
  }
  50% {
    transform: translateX(-${space[1]});
    opacity: 1;
  }
`

const AddressPrompt = styled('span')`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    mr: 1,
    fontSize: 0,
    fontFamily: 'sans',
    letterSpacing: 0
  })};
  background-image: ${gradient};
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  transition: opacity 0.2s ease, transform 0.2s ease, color 0.2s ease;
  opacity: ${p => (p.$visible ? 1 : 0)};
  transform: translateX(${p => (p.$visible ? 0 : space[1])});

  .address-prompt__arrow {
    ${theme({
      display: 'inline-flex',
      alignItems: 'center',
      mr: 1,
      fontSize: 1,
      lineHeight: 0,
      mt: 1
    })};
    background-image: ${gradient};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${addressPromptArrowNudge} 1.2s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .address-prompt__arrow {
      animation: none;
    }
  }
`

const MetaApiBar = styled(Flex)`
  background: white;
  min-width: 0;
  overflow: hidden;
  border-radius: 0 0 ${radii[5]} ${radii[5]};

  .codecopy__button {
    top: 0;
    opacity: 0.85;
    transition: opacity ${transition.short};

    &:hover {
      opacity: 1;
    }

    &::before,
    &::after {
      display: none !important;
    }
  }

  .codecopy__icon {
    fill: ${colors.black80} !important;
  }
`

const shimmer = keyframes`
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`

const MetaOverlay = styled('div')`
  ${theme({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: [`-${space[2]}`, `-${space[3]}`, `-${space[3]}`, `-${space[3]}`],
    bottom: 0,
    left: [`-${space[3]}`, `-${space[4]}`, `-${space[4]}`, `-${space[4]}`],
    right: [`-${space[3]}`, `-${space[4]}`, 0, 0]
  })};
  background: ${({ $dim }) => ($dim ? colors.black10 : colors.gray0)};
  pointer-events: none;
  overflow: hidden;
  transition: background ${transition.medium};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${colors.white80} 50%,
      transparent 100%
    );
    animation: ${shimmer} 1.8s ease-in-out infinite;
    opacity: ${({ $dim }) => ($dim ? 0 : 1)};

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }
`

const SkeletonLines = styled('div')`
  ${theme({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    px: 4,
    py: 4
  })};
  inset: 0;
  pointer-events: none;
`

const SkeletonLine = styled('div')`
  height: ${({ $h }) => $h || '12px'};
  width: ${({ $w }) => $w || '100%'};
  background: ${colors.black05};
  border-radius: 6px;
`

const Spinner = styled('svg')`
  animation: ${rotate} 1.4s linear infinite;
  z-index: 1;
`

const SpinnerCircle = styled('circle')`
  animation: ${dash} 1.4s ease-in-out infinite;
  stroke: ${colors.black40};
  stroke-linecap: round;
`

const CopyButton = styled('button')`
  ${theme({
    bg: 'transparent',
    p: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: 'black60'
  })};
  border: none;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: color ${transition.short}, transform ${transition.short};

  &:hover {
    color: ${colors.black};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.black40};
    outline-offset: ${radii[2]};
    border-radius: ${radii[2]};
  }

  svg.icon-check {
    animation: ${fadeInDown} 0.2s ease both;
    color: ${colors.green5};
  }
`

const HistoryDropdown = styled('div')`
  ${theme({ position: 'absolute', borderRadius: 4, bg: 'white' })};
  top: calc(100% + ${space[1]});
  left: 0;
  right: 0;
  border: ${borders[1]} ${colors.black20};
  overflow: hidden;
  box-shadow: 0 16px 40px ${colors.black20};
  z-index: 100;
`

const HistoryItem = styled('button')`
  ${theme({
    width: '100%',
    minWidth: '0',
    bg: 'transparent',
    p: 2,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    color: 'black70',
    fontSize: 0,
    fontFamily: 'sans'
  })};
  border: none;
  cursor: pointer;
  text-align: left;
  font-weight: 500;
  transition: background ${transition.short}, color ${transition.short};

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    flex: 1;
  }

  svg {
    flex-shrink: 0;
  }

  &:hover,
  &:focus-visible {
    background: ${colors.blue0};
    color: ${colors.black};
    outline: none;
  }

  & + & {
    border-top: ${borders[1]} ${colors.black10};
  }
`

const ErrorModalOverlay = styled('div')`
  ${theme({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })};
  background: ${colors.black60};
  backdrop-filter: blur(${space[1]});
  z-index: 2;
`

const ErrorModalWindow = styled('div')`
  ${theme({ bg: 'black95', borderRadius: 4 })};
  border: ${borders[1]} ${colors.red7};
  width: 340px;
  box-shadow: 0 24px 64px ${colors.black80}, 0 4px 16px ${colors.black40};
  overflow: hidden;
`

const ErrorModalHeader = styled('div')`
  ${theme({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  })};
  padding: ${space[3]} ${space[3]} ${space[2]};
  border-bottom: ${borders[1]} ${colors.white05};
`

const ErrorModalBody = styled('div')`
  ${theme({ p: 3 })};
`

const ErrorCloseButton = styled('button')`
  ${theme({
    bg: 'white10',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white50',
    flexShrink: 0,
    lineHeight: 0,
    fontSize: 0
  })};
  border: none;
  width: ${fontSizes[2]};
  height: ${fontSizes[2]};
  cursor: pointer;
  transition: background ${transition.short}, color ${transition.short};

  &:hover {
    background: ${colors.white20};
    color: ${colors.white90};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.white30};
    outline-offset: ${radii[1]};
  }
`

// --- Metadata Preview Pane (JSON) ---

const HeroPreviewWrapper = styled(Box)`
  ${theme({
    position: 'relative',
    bg: 'gray0',
    px: [3, 4, 4, 4],
    pt: [2, 3, 3, 3],
    pb: 0,
    zIndex: 1
  })};
  aspect-ratio: 16/10;
  overflow: hidden;
`

const JsonScroll = styled(Box)`
  ${theme({ width: '100%', height: '100%' })};
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: ${colors.black20} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.black20};
    border-radius: 3px;
  }
`

const JsonPre = styled('pre')`
  ${theme({
    m: 0,
    fontFamily: 'mono',
    fontSize: ['12px', '13px', '13px', '13px'],
    lineHeight: 2,
    color: 'black80'
  })};
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: anywhere;
  min-width: 0;
  tab-size: 2;

  .json-punct {
    color: ${colors.black40};
  }
  .json-key {
    color: ${colors.black};
    font-weight: 600;
  }
  .json-string {
    color: ${colors.black};
  }
  .json-string a {
    color: ${ACCENT};
    text-decoration: none;
    text-underline-offset: 2px;
  }
  .json-string a:hover,
  .json-string a:focus-visible {
    text-decoration: underline;
    text-decoration-color: ${ACCENT};
  }
  .json-number {
    color: ${colors.grape7};
  }
  .json-boolean {
    color: ${colors.orange7};
    font-weight: 600;
  }
  .json-null {
    color: ${colors.black40};
    font-style: italic;
  }
`

const JsonExpandToggle = styled('button')`
  ${theme({
    m: 0,
    p: 0,
    bg: 'transparent',
    color: 'black40',
    fontFamily: 'mono',
    fontSize: 'inherit',
    lineHeight: 'inherit'
  })};
  border: none;
  cursor: pointer;
  vertical-align: baseline;
  transition: color ${transition.short};

  &:hover,
  &:focus-visible {
    color: ${ACCENT};
  }

  &:focus-visible {
    outline: ${borders[1]} ${colors.black20};
    outline-offset: 2px;
    border-radius: 2px;
  }
`

const jsonCaret = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`

const JsonCaret = styled('span')`
  ${theme({ display: 'inline-block', color: 'black60' })};
  width: 0.5em;
  animation: ${jsonCaret} 0.9s step-end infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const HeroMicrolink = styled(Microlink)`
  --microlink-max-width: 100%;
  --microlink-hover-background-color: white;
  width: 100%;
  max-width: 100%;
`

const JSON_KEYS = [
  'title',
  'description',
  'lang',
  'author',
  'publisher',
  'date',
  'url',
  'image',
  'logo',
  'video',
  'audio'
]

const JsonKeyList = styled('ul')`
  ${theme({
    m: 0,
    p: 0,
    display: 'grid',
    gridTemplateColumns: [
      'repeat(3, minmax(0, 1fr))',
      'repeat(6, minmax(0, 1fr))',
      '1fr',
      '1fr'
    ],
    gap: 2,
    fontFamily: 'mono',
    fontSize: 0
  })};
  list-style: none;
`

const JsonKeyItem = styled('li')`
  ${theme({
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    color: 'black70',
    minWidth: 0
  })};
`

const KeyDot = styled('span')`
  ${theme({ width: '8px', height: '8px', borderRadius: '50%' })};
  background: ${({ $present }) => ($present ? colors.green7 : colors.black20)};
  flex-shrink: 0;
`

const DetectedColumn = styled(Box)`
  ${theme({
    width: ['100%', '100%', '160px', '160px'],
    flexShrink: 0,
    order: [1, 1, 2, 2],
    pl: [0, 0, 3, 3],
    pb: [3, 3, 0, 0]
  })};
  display: none;
  border-bottom: ${borders[1]} ${colors.gray3};
  border-left: 0;

  @media (min-width: ${breakpoints[0]}) {
    display: block;
  }

  @media (min-width: ${breakpoints[1]}) {
    border-bottom: 0;
    border-left: ${borders[1]} ${colors.gray3};
  }
`

const HERO_JSON_KEY_ORDER = [
  'title',
  'description',
  'lang',
  'author',
  'publisher',
  'date',
  'url',
  'image',
  'logo',
  'video',
  'audio',
  'iframe',
  'palette'
]

const compactMedia = value => {
  if (!value || typeof value !== 'object') return value
  const { url, type, width, height, size_pretty: sizePretty } = value
  const compact = { url }
  if (type) compact.type = type
  if (width) compact.width = width
  if (height) compact.height = height
  if (sizePretty) compact.size_pretty = sizePretty
  return compact
}

const reshapeForHero = data => {
  if (!data) return null
  const shaped = {}
  for (const key of HERO_JSON_KEY_ORDER) {
    if (data[key] == null) continue
    if (['image', 'logo', 'video', 'audio'].includes(key)) {
      shaped[key] = compactMedia(data[key])
    } else if (key === 'iframe') {
      shaped[key] =
        typeof data[key] === 'object' && data[key].html
          ? { html: '…' }
          : data[key]
    } else {
      shaped[key] = data[key]
    }
  }
  for (const key of Object.keys(data)) {
    if (shaped[key] === undefined && data[key] != null) {
      shaped[key] = data[key]
    }
  }
  return shaped
}

const STRING_TRUNCATE_AT = 64

const URL_REGEX = /^https?:\/\/\S+$/i

const renderStringContent = value => {
  if (URL_REGEX.test(value)) {
    return (
      <a href={value} target='_blank' rel='noopener noreferrer'>
        {value}
      </a>
    )
  }
  return value
}

const renderJson = (value, path = 'root', expanded, onToggle, indent = 0) => {
  const pad = '  '.repeat(indent)
  const padInner = '  '.repeat(indent + 1)

  if (value === null) return <span className='json-null'>null</span>
  if (typeof value === 'boolean') {
    return <span className='json-boolean'>{String(value)}</span>
  }
  if (typeof value === 'number') {
    return <span className='json-number'>{value}</span>
  }
  if (typeof value === 'string') {
    const isUrl = URL_REGEX.test(value)
    const isLong = !isUrl && value.length > STRING_TRUNCATE_AT
    const isOpen = expanded.has(path)
    if (!isLong || isOpen) {
      return (
        <>
          <span className='json-string'>"{renderStringContent(value)}"</span>
          {isLong && (
            <>
              {' '}
              <JsonExpandToggle
                type='button'
                aria-label='Collapse value'
                onClick={() => onToggle(path)}
              >
                [collapse]
              </JsonExpandToggle>
            </>
          )}
        </>
      )
    }
    const truncated = value.slice(0, STRING_TRUNCATE_AT).trimEnd()
    return (
      <>
        <span className='json-string'>"{truncated}</span>
        <JsonExpandToggle
          type='button'
          aria-label='Expand value'
          title={`${value.length - truncated.length} more characters`}
          onClick={() => onToggle(path)}
        >
          …
        </JsonExpandToggle>
        <span className='json-string'>"</span>
      </>
    )
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return <span className='json-punct'>[]</span>
    return (
      <>
        <span className='json-punct'>[</span>
        {'\n'}
        {value.map((item, i) => (
          <React.Fragment key={i}>
            {padInner}
            {renderJson(item, `${path}.${i}`, expanded, onToggle, indent + 1)}
            {i < value.length - 1 && <span className='json-punct'>,</span>}
            {'\n'}
          </React.Fragment>
        ))}
        {pad}
        <span className='json-punct'>]</span>
      </>
    )
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value)
    if (entries.length === 0) return <span className='json-punct'>{'{}'}</span>
    return (
      <>
        <span className='json-punct'>{'{'}</span>
        {'\n'}
        {entries.map(([k, v], i) => (
          <React.Fragment key={k}>
            {padInner}
            <span className='json-key'>"{k}"</span>
            <span className='json-punct'>: </span>
            {renderJson(v, `${path}.${k}`, expanded, onToggle, indent + 1)}
            {i < entries.length - 1 && <span className='json-punct'>,</span>}
            {'\n'}
          </React.Fragment>
        ))}
        {pad}
        <span className='json-punct'>{'}'}</span>
      </>
    )
  }

  return String(value)
}

// Flatten the JSON into an ordered list of renderable "lines" so we can
// reveal them one-by-one at a constant cadence. Each line is a React node
// that already includes the right indentation, trailing comma, etc.
const flattenToLines = (value, expanded, onToggle) => {
  const lines = []
  const indentStr = depth => '  '.repeat(depth)

  const renderLeaf = (v, path) => renderJson(v, path, expanded, onToggle, 0)

  const pushValue = (v, path, depth, trailingComma) => {
    const pad = indentStr(depth)
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      const entries = Object.entries(v)
      if (entries.length === 0) {
        lines.push(
          <>
            {pad}
            <span className='json-punct'>{'{}'}</span>
            {trailingComma && <span className='json-punct'>,</span>}
          </>
        )
        return
      }
      lines.push(
        <>
          {pad}
          <span className='json-punct'>{'{'}</span>
        </>
      )
      entries.forEach(([k, child], i) => {
        pushEntry(k, child, `${path}.${k}`, depth + 1, i < entries.length - 1)
      })
      lines.push(
        <>
          {pad}
          <span className='json-punct'>{'}'}</span>
          {trailingComma && <span className='json-punct'>,</span>}
        </>
      )
      return
    }
    if (Array.isArray(v)) {
      if (v.length === 0) {
        lines.push(
          <>
            {pad}
            <span className='json-punct'>[]</span>
            {trailingComma && <span className='json-punct'>,</span>}
          </>
        )
        return
      }
      lines.push(
        <>
          {pad}
          <span className='json-punct'>[</span>
        </>
      )
      v.forEach((child, i) => {
        pushValue(child, `${path}.${i}`, depth + 1, i < v.length - 1)
      })
      lines.push(
        <>
          {pad}
          <span className='json-punct'>]</span>
          {trailingComma && <span className='json-punct'>,</span>}
        </>
      )
      return
    }
    lines.push(
      <>
        {pad}
        {renderLeaf(v, path)}
        {trailingComma && <span className='json-punct'>,</span>}
      </>
    )
  }

  const pushEntry = (k, v, path, depth, trailingComma) => {
    const pad = indentStr(depth)
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      const entries = Object.entries(v)
      if (entries.length === 0) {
        lines.push(
          <>
            {pad}
            <span className='json-key'>"{k}"</span>
            <span className='json-punct'>: </span>
            <span className='json-punct'>{'{}'}</span>
            {trailingComma && <span className='json-punct'>,</span>}
          </>
        )
        return
      }
      lines.push(
        <>
          {pad}
          <span className='json-key'>"{k}"</span>
          <span className='json-punct'>: </span>
          <span className='json-punct'>{'{'}</span>
        </>
      )
      entries.forEach(([ck, cv], i) => {
        pushEntry(ck, cv, `${path}.${ck}`, depth + 1, i < entries.length - 1)
      })
      lines.push(
        <>
          {pad}
          <span className='json-punct'>{'}'}</span>
          {trailingComma && <span className='json-punct'>,</span>}
        </>
      )
      return
    }
    if (Array.isArray(v)) {
      if (v.length === 0) {
        lines.push(
          <>
            {pad}
            <span className='json-key'>"{k}"</span>
            <span className='json-punct'>: </span>
            <span className='json-punct'>[]</span>
            {trailingComma && <span className='json-punct'>,</span>}
          </>
        )
        return
      }
      lines.push(
        <>
          {pad}
          <span className='json-key'>"{k}"</span>
          <span className='json-punct'>: </span>
          <span className='json-punct'>[</span>
        </>
      )
      v.forEach((child, i) => {
        pushValue(child, `${path}.${i}`, depth + 1, i < v.length - 1)
      })
      lines.push(
        <>
          {pad}
          <span className='json-punct'>]</span>
          {trailingComma && <span className='json-punct'>,</span>}
        </>
      )
      return
    }
    lines.push(
      <>
        {pad}
        <span className='json-key'>"{k}"</span>
        <span className='json-punct'>: </span>
        {renderLeaf(v, path)}
        {trailingComma && <span className='json-punct'>,</span>}
      </>
    )
  }

  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const entries = Object.entries(value)
    lines.push(<span className='json-punct'>{'{'}</span>)
    entries.forEach(([k, v], i) => {
      pushEntry(k, v, `root.${k}`, 1, i < entries.length - 1)
    })
    lines.push(<span className='json-punct'>{'}'}</span>)
  }

  return lines
}

const STREAM_MS_PER_LINE = 40

const useRevealLines = (totalLines, signature) => {
  const [revealed, setRevealed] = useState(0)

  useEffect(() => {
    if (totalLines === 0) {
      setRevealed(0)
      return
    }
    setRevealed(0)
    const timers = []
    for (let i = 1; i <= totalLines; i++) {
      timers.push(setTimeout(() => setRevealed(i), i * STREAM_MS_PER_LINE))
    }
    return () => timers.forEach(clearTimeout)
  }, [totalLines, signature])

  return revealed
}

const StreamedJsonObject = ({ value, expanded, onToggle }) => {
  const lines = value ? flattenToLines(value, expanded, onToggle) : []
  const signature = value
    ? `${Object.keys(value).length}:${Object.keys(value).join(',')}:${
      value.url || value.title || ''
    }`
    : ''
  const revealed = useRevealLines(lines.length, signature)
  const isStreaming = revealed < lines.length
  const visible = lines.slice(0, revealed)

  return (
    <JsonPre aria-label='Metadata JSON response'>
      {visible.map((line, i) => (
        <React.Fragment key={i}>
          {line}
          {'\n'}
        </React.Fragment>
      ))}
      {isStreaming && <JsonCaret aria-hidden='true'>▍</JsonCaret>}
    </JsonPre>
  )
}

const JsonPreview = ({ data }) => {
  const shaped = reshapeForHero(data)
  const [expanded, setExpanded] = useState(() => new Set())
  const onToggle = useCallback(path => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(path)) next.delete(path)
      else next.add(path)
      return next
    })
  }, [])

  return (
    <StreamedJsonObject
      value={shaped}
      expanded={expanded}
      onToggle={onToggle}
    />
  )
}

const MetadataPreview = ({ url, data, isLoading }) => (
  <HeroPreviewWrapper>
    <Flex
      css={theme({
        width: '100%',
        height: '100%',
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: 'stretch',
        gap: 0
      })}
    >
      <Box
        css={theme({
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          width: '100%',
          order: [2, 2, 1, 1],
          pt: [2, 2, 0, 0],
          pr: [0, 0, 2, 2],
          position: 'relative'
        })}
      >
        <Box
          css={[
            theme({ width: '100%', height: '100%' }),
            {
              filter: isLoading && data ? 'blur(6px)' : 'blur(0px)',
              transition: 'filter 0.5s ease'
            }
          ]}
        >
          <JsonScroll>
            <JsonPreview data={data} />
          </JsonScroll>
        </Box>
        {isLoading && (
          <MetaOverlay
            $dim={Boolean(data)}
            aria-label='Loading metadata…'
            role='status'
          >
            {!data && (
              <SkeletonLines aria-hidden='true'>
                <SkeletonLine $w='55%' $h='18px' />
                <SkeletonLine $w='90%' />
                <SkeletonLine $w='80%' />
                <SkeletonLine $w='85%' />
                <SkeletonLine $w='40%' />
                <Box css={theme({ height: '12px' })} />
                <SkeletonLine $w='45%' $h='16px' />
                <SkeletonLine $w='95%' />
                <SkeletonLine $w='70%' />
              </SkeletonLines>
            )}
            <Spinner
              width='36'
              height='36'
              viewBox='0 0 50 50'
              aria-hidden='true'
            >
              <SpinnerCircle
                cx='25'
                cy='25'
                r='20'
                fill='none'
                strokeWidth='4'
              />
            </Spinner>
          </MetaOverlay>
        )}
      </Box>
      <DetectedColumn aria-label='Detected metadata fields'>
        <Hide breakpoints={[0, 1]}>
          <Caps
            css={theme({
              fontSize: 0,
              fontWeight: 'bold',
              color: 'black60',
              pb: 2,
              letterSpacing: 2
            })}
          >
            Detected
          </Caps>
        </Hide>
        <JsonKeyList>
          {JSON_KEYS.map(key => {
            const present = !isLoading && data && data[key] != null
            return (
              <JsonKeyItem key={key}>
                <KeyDot $present={present} />
                <span
                  css={theme({
                    color: present ? 'black' : 'black40',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  })}
                >
                  {key}
                </span>
              </JsonKeyItem>
            )
          })}
        </JsonKeyList>
      </DetectedColumn>
    </Flex>
  </HeroPreviewWrapper>
)

// --- Helpers ---

const ensureProtocol = value => {
  const trimmed = value.trim()
  if (!trimmed) return trimmed
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

const stripProtocol = url => url.replace(/^https?:\/\//i, '')
const stripForDisplay = url => stripProtocol(url).replace(/\?.*$/, '')

const MAX_HISTORY = 6

const DEFAULT_HISTORY = [
  FIRST_URL,
  'https://unavatar.io',
  'https://plausible.io'
]

const addToHistory = (history, url) => {
  const filtered = history.filter(u => u !== url)
  return [url, ...filtered].slice(0, MAX_HISTORY)
}

// --- Hero ---

const Hero = function Hero ({ onRequestTiming, onUrlChange, onDataChange }) {
  const [inputUrl, setInputUrl] = useState(FIRST_URL)
  const [isFocused, setIsFocused] = useState(false)
  const [history, setHistory] = useState(DEFAULT_HISTORY)
  const inputRef = useRef(null)
  const [metaData, setMetaData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isCopied, setIsCopied] = useState(false)
  const [isGlowing, setIsGlowing] = useState(false)
  const [isAttractMode, setIsAttractMode] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [navStack, setNavStack] = useState([FIRST_URL])
  const [navIndex, setNavIndex] = useState(0)
  const abortRef = useRef(null)
  const copyTimerRef = useRef(null)
  const skipBlurRef = useRef(false)

  const fetchMetadata = useCallback(
    async url => {
      if (abortRef.current) abortRef.current.abort()
      abortRef.current = new window.AbortController()

      setIsLoading(true)
      setError(null)

      const t0 = Date.now()

      try {
        const endpoint =
          `https://api.microlink.io?url=${encodeURIComponent(url)}` +
          '&palette&video&audio'
        const res = await window.fetch(endpoint, {
          signal: abortRef.current.signal
        })
        const json = await res.json()
        const elapsedMs = Date.now() - t0

        if (!res.ok) {
          setError(normalizeApiError(json, res))
          setIsLoading(false)
          return
        }

        onRequestTiming?.(elapsedMs, url)

        const data = json?.data
        if (data) {
          setMetaData(data)
          onUrlChange?.(url)
          onDataChange?.(data)
        }
        setIsLoading(false)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(normalizeApiError.fromNetwork(err))
        }
        setIsLoading(false)
      }
    },
    [onRequestTiming, onUrlChange, onDataChange]
  )

  useEffect(() => {
    fetchMetadata(FIRST_URL)
  }, [])

  useEffect(() => {
    if (hasInteracted) return

    const timeouts = []
    let cancelled = false
    const delay = ms =>
      new Promise(resolve => {
        timeouts.push(setTimeout(resolve, ms))
      })
    const check = () => cancelled || hasInteracted

    const typeUrl = async url => {
      setInputUrl('')
      for (let i = 1; i <= url.length; i++) {
        await delay(80)
        if (check()) return false
        setInputUrl('https://' + url.slice(0, i))
      }
      await delay(250)
      setIsGlowing(false)
      return true
    }

    const run = async () => {
      await delay(5000)
      if (check()) return

      for (let i = 0; i < DEMO_URLS.length; i++) {
        const url = DEMO_URLS[i]
        if (check()) return

        setIsGlowing(true)
        await delay(250)
        if (check()) return

        const completed = await typeUrl(url)
        if (!completed) return

        await delay(50)
        if (check()) return

        const normalized = ensureProtocol(url)
        setInputUrl(normalized)
        setHistory(h => addToHistory(h, normalized))
        setNavStack(s => {
          const next = [...s, normalized].slice(-MAX_HISTORY)
          setNavIndex(next.length - 1)
          return next
        })
        fetchMetadata(normalized)

        await delay(8000)
        if (check()) return

        if (i >= DEMO_URLS.length - 1) {
          setIsGlowing(true)
          setIsFocused(true)
          setIsAttractMode(true)
          setIsPulsing(true)
          await delay(5000)
          if (check()) return
          setIsPulsing(false)
        }
      }
    }

    run()

    return () => {
      cancelled = true
      timeouts.forEach(clearTimeout)
    }
  }, [hasInteracted])

  const apiUrl = `https://api.microlink.io?url=${inputUrl}`

  const handleCopy = () => {
    const markCopied = () => {
      setIsCopied(true)
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current)
      copyTimerRef.current = setTimeout(() => setIsCopied(false), 1500)
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(apiUrl)
        .then(markCopied)
        .catch(() => {
          fallbackCopy(apiUrl) && markCopied()
        })
    } else {
      fallbackCopy(apiUrl) && markCopied()
    }
  }

  const fallbackCopy = text => {
    try {
      const el = document.createElement('textarea')
      el.value = text
      el.setAttribute('readonly', '')
      el.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0'
      document.body.appendChild(el)
      el.focus()
      el.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(el)
      return ok
    } catch {
      return false
    }
  }

  const displayValue = isFocused
    ? stripProtocol(inputUrl)
    : stripForDisplay(inputUrl)

  const handleChange = e => {
    setInputUrl(ensureProtocol(stripProtocol(e.target.value)))
    stopAttract()
  }

  const handlePaste = e => {
    const pastedText = e.clipboardData?.getData('text') ?? ''
    const trimmedText = pastedText.trim()
    const strippedText = stripProtocol(trimmedText)
    if (strippedText === trimmedText) return
    e.preventDefault()
    const inputEl = e.currentTarget
    const start = inputEl.selectionStart ?? inputEl.value.length
    const end = inputEl.selectionEnd ?? inputEl.value.length
    const nextValue =
      inputEl.value.slice(0, start) + strippedText + inputEl.value.slice(end)
    setInputUrl(ensureProtocol(stripProtocol(nextValue)))
    stopAttract()
    setTimeout(() => {
      const cursorPosition = start + strippedText.length
      inputEl.setSelectionRange(cursorPosition, cursorPosition)
    }, 0)
  }

  const stopAttract = () => {
    setIsGlowing(false)
    setIsAttractMode(false)
    setIsPulsing(false)
    setHasInteracted(true)
  }

  const handleFocus = () => {
    setIsFocused(true)
    stopAttract()
  }

  const submitUrl = url => {
    const normalized = ensureProtocol(url)
    const newStack = [...navStack.slice(0, navIndex + 1), normalized].slice(
      -MAX_HISTORY
    )
    const newIndex = newStack.length - 1
    setInputUrl(normalized)
    setIsFocused(false)
    setHistory(h => addToHistory(h, normalized))
    setNavStack(newStack)
    setNavIndex(newIndex)
    fetchMetadata(normalized)
  }

  const handleBack = () => {
    if (navIndex === 0) return
    stopAttract()
    const newIndex = navIndex - 1
    const url = navStack[newIndex]
    setNavIndex(newIndex)
    setInputUrl(url)
    fetchMetadata(url)
  }

  const handleForward = () => {
    if (navIndex >= navStack.length - 1) return
    stopAttract()
    const newIndex = navIndex + 1
    const url = navStack[newIndex]
    setNavIndex(newIndex)
    setInputUrl(url)
    fetchMetadata(url)
  }

  const handleBlur = e => {
    setTimeout(() => {
      if (skipBlurRef.current) {
        skipBlurRef.current = false
        return
      }
      const normalized = ensureProtocol(e.target.value)
      setInputUrl(normalized)
      setIsFocused(false)
      if (normalized && normalized !== inputUrl) {
        setHistory(h => addToHistory(h, normalized))
        fetchMetadata(normalized)
      }
    }, 150)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.target.blur()
      submitUrl(e.target.value)
    }
    if (e.key === 'Escape') {
      e.target.blur()
      setIsFocused(false)
    }
  }

  const handleHistoryClick = url => {
    skipBlurRef.current = true
    stopAttract()
    inputRef.current?.blur()
    submitUrl(url)
  }

  return (
    <Flex
      id='hero'
      as='section'
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        pt: [3, 3, 1, 0],
        pb: [4, 4, 5, 5],
        px: [2, 3, 4, 5]
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          maxWidth: HERO_LAYOUT.maxWidth,
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
          <Heading
            css={theme({
              px: [2, 3, 4, 0],
              fontSize: [4, 4, 5, 5],
              maxWidth: ['100%', '100%', '100%', '640px'],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            Website Metadata API{' '}
            <span style={{ whiteSpace: 'nowrap' }}>for developers</span>
          </Heading>
          <Caption
            forwardedAs='h2'
            css={theme({
              pt: [3, 3, 4, 4],
              px: [1, 2, 4, 0],
              maxWidth: ['100%', layout.small, layout.small, '640px'],
              fontSize: 2,
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            Turn any URL into normalized JSON. A single REST endpoint that
            executes JavaScript, merges Open Graph, JSON-LD, and HTML tags, and
            returns structured data instantly.
          </Caption>
          <Flex
            css={theme({
              pt: [3, 3, 4, 4],
              px: [4, 4, 4, 0],
              width: '100%',
              fontSize: [2, 2, 3, 3],
              justifyContent: ['center', 'center', 'center', 'flex-start'],
              gap: [3, 3, 4, 4],
              flexDirection: ['column', 'row', 'row', 'row'],
              alignItems: ['flex-start', 'center', 'center', 'center']
            })}
          >
            <ArrowLink href='/docs/guides/metadata'>Get Started</ArrowLink>
          </Flex>
        </Flex>
        <Flex
          css={theme({
            width: ['100%', '100%', '100%', HERO_LAYOUT.mainWidth],
            minWidth: 0,
            pt: [4, 4, 5, 0],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          })}
        >
          <Box
            css={theme({
              display: 'flex',
              flexDirection: 'column',
              maxWidth: ['100%', '95%', '85%', '100%'],
              width: ['100%', '95%', '85%', '100%'],
              minWidth: 0,
              position: 'relative'
            })}
          >
            <BrowserWindow
              onClick={e => {
                if (
                  !e.target.closest('input') &&
                  !e.target.closest('[role="listbox"]') &&
                  !e.target.closest('.meta-api-bar')
                ) {
                  setIsFocused(false)
                }
              }}
            >
              <BrowserHeader>
                <NavButtons>
                  <NavArrow
                    type='button'
                    aria-label='Go back'
                    disabled={navIndex === 0}
                    onClick={handleBack}
                  >
                    <svg
                      width='7'
                      height='12'
                      viewBox='0 0 7 12'
                      fill='none'
                      aria-hidden='true'
                    >
                      <path
                        d='M6 1L1 6l5 5'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </NavArrow>
                  <NavArrow
                    type='button'
                    aria-label='Go forward'
                    disabled={navIndex >= navStack.length - 1}
                    onClick={handleForward}
                  >
                    <svg
                      width='7'
                      height='12'
                      viewBox='0 0 7 12'
                      fill='none'
                      aria-hidden='true'
                    >
                      <path
                        d='M1 1l5 5-5 5'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </NavArrow>
                </NavButtons>
                <AddressBar
                  className='address-bar'
                  $glowing={isGlowing}
                  $active={isAttractMode}
                  $isPulsing={isPulsing}
                >
                  <svg
                    width='11'
                    height='13'
                    viewBox='0 0 11 13'
                    fill='none'
                    aria-hidden='true'
                    css={theme({ flexShrink: 0 })}
                  >
                    <rect
                      x='1'
                      y='5.5'
                      width='9'
                      height='7'
                      rx='1.5'
                      fill={colors.black40}
                    />
                    <path
                      d='M3 5.5V3.5a2.5 2.5 0 015 0v2'
                      stroke={colors.black40}
                      strokeWidth='1.4'
                      strokeLinecap='round'
                    />
                  </svg>
                  <AddressInput
                    ref={inputRef}
                    $active={isFocused || isAttractMode}
                    type='url'
                    size='1'
                    value={displayValue}
                    onChange={handleChange}
                    onPaste={handlePaste}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    aria-label='Browser address bar'
                    spellCheck={false}
                    autoComplete='off'
                    autoCorrect='off'
                    autoCapitalize='off'
                  />
                  <AddressPrompt
                    $visible={!isFocused && !hasInteracted}
                    aria-hidden='true'
                  >
                    <span className='address-prompt__arrow'>&larr;</span>
                    Type any URL
                  </AddressPrompt>

                  {isFocused && history.length > 0 && (
                    <HistoryDropdown role='listbox' aria-label='Recent URLs'>
                      {history.map(url => (
                        <HistoryItem
                          key={url}
                          role='option'
                          type='button'
                          onMouseDown={e => {
                            e.preventDefault()
                            handleHistoryClick(url)
                          }}
                        >
                          <svg
                            width='12'
                            height='12'
                            viewBox='0 0 12 12'
                            fill='none'
                            aria-hidden='true'
                          >
                            <circle
                              cx='5'
                              cy='5'
                              r='3.5'
                              stroke={colors.black40}
                              strokeWidth='1.3'
                            />
                            <path
                              d='M8 8l2 2'
                              stroke={colors.black40}
                              strokeWidth='1.3'
                              strokeLinecap='round'
                            />
                          </svg>
                          <span>{stripProtocol(url)}</span>
                        </HistoryItem>
                      ))}
                    </HistoryDropdown>
                  )}
                </AddressBar>
              </BrowserHeader>
              <Box
                css={theme({
                  position: 'relative',
                  zIndex: 1,
                  bg: 'gray0'
                })}
              >
                <MetadataPreview
                  url={inputUrl}
                  data={metaData}
                  isLoading={isLoading}
                />
                {error && (
                  <ErrorModalOverlay
                    role='dialog'
                    aria-modal='true'
                    aria-label='Error'
                    onClick={e => {
                      if (e.target === e.currentTarget) setError(null)
                    }}
                  >
                    <ErrorModalWindow>
                      <ErrorModalHeader>
                        <Flex css={theme({ alignItems: 'center', gap: 2 })}>
                          <svg
                            width='16'
                            height='16'
                            viewBox='0 0 16 16'
                            fill='none'
                            aria-hidden='true'
                          >
                            <circle
                              cx='8'
                              cy='8'
                              r='7'
                              stroke={colors.red6}
                              strokeWidth='1.5'
                            />
                            <path
                              d='M8 5v3M8 10.5v.5'
                              stroke={colors.red5}
                              strokeWidth='1.5'
                              strokeLinecap='round'
                            />
                          </svg>
                          <Text
                            as='span'
                            css={theme({
                              color: 'red5',
                              fontSize: 0,
                              fontWeight: 'bold',
                              letterSpacing: 0
                            })}
                          >
                            <ApiErrorTitle code={error.code} />
                          </Text>
                        </Flex>
                        <ErrorCloseButton
                          type='button'
                          aria-label='Dismiss error'
                          onClick={() => setError(null)}
                        >
                          &times;
                        </ErrorCloseButton>
                      </ErrorModalHeader>
                      <ErrorModalBody>
                        <Text
                          as='p'
                          css={theme({
                            color: 'white90',
                            fontSize: 1,
                            lineHeight: 2,
                            m: 0
                          })}
                        >
                          <ApiErrorBody
                            code={error.code}
                            fallback={error.message}
                          />
                        </Text>
                      </ErrorModalBody>
                    </ErrorModalWindow>
                  </ErrorModalOverlay>
                )}
              </Box>
              <MetaApiBar
                className='meta-api-bar'
                css={theme({
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: [2, 3, 3, 3],
                  py: '10px',
                  gap: 2
                })}
              >
                <Text
                  as='span'
                  css={theme({
                    fontSize: ['13px', '13px', '14px', '14px'],
                    fontFamily: 'mono',
                    letterSpacing: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    minWidth: '0',
                    color: 'black70'
                  })}
                >
                  https://api.microlink.io?
                  <strong css={theme({ color: 'black' })}>
                    url={inputUrl}
                  </strong>
                </Text>
                <CopyButton
                  type='button'
                  onClick={handleCopy}
                  aria-label={isCopied ? 'Copied!' : 'Copy API URL'}
                >
                  {isCopied
                    ? (
                      <svg
                        className='icon-check'
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='none'
                        aria-hidden='true'
                      >
                        <path
                          d='M3 8l3.5 3.5L13 4.5'
                          stroke='currentColor'
                          strokeWidth='1.8'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                      )
                    : (
                      <svg
                        width='16'
                        height='16'
                        viewBox='0 0 16 16'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fillRule='evenodd'
                          d='M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z'
                        />
                      </svg>
                      )}
                </CopyButton>
              </MetaApiBar>
            </BrowserWindow>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

// --- Timings ---

const HIGHLIGHT_DURATION = 1000

const TimingHighlight = styled('span')`
  animation: ${highlight} ${HIGHLIGHT_DURATION}ms ease both;
  border-radius: ${radii[1]};
  padding: 0 ${radii[1]};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const formatTiming = ms =>
  ms < 100 ? `${Math.round(ms)}` : (ms / 1000).toFixed(2)
const timingUnit = ms => (ms < 100 ? 'ms' : 'secs')

const LiveTiming = ({ timingMs, timingUrl, timingHistory }) => {
  const [displayMs, setDisplayMs] = useState(null)
  const [displayUrl, setDisplayUrl] = useState(null)
  const [key, setKey] = useState(0)
  const idleTimerRef = useRef(null)
  const historyRef = useRef(timingHistory)
  const prevTimingMsRef = useRef(undefined)
  const displayUrlRef = useRef(null)

  useEffect(() => {
    historyRef.current = timingHistory
  }, [timingHistory])

  const show = useCallback((ms, url) => {
    displayUrlRef.current = url
    setDisplayMs(ms)
    setDisplayUrl(url)
    setKey(k => k + 1)
  }, [])

  useEffect(() => {
    if (timingMs == null) return
    if (
      timingMs === prevTimingMsRef.current &&
      timingUrl === prevTimingMsRef.currentUrl
    ) {
      return
    }
    prevTimingMsRef.current = timingMs
    prevTimingMsRef.currentUrl = timingUrl
    show(timingMs, timingUrl)

    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)

    const scheduleIdle = () => {
      idleTimerRef.current = setTimeout(() => {
        const history = historyRef.current
        if (history.length < 3) return
        const others = history.filter(e => e.url !== displayUrlRef.current)
        const pick = others[Math.floor(Math.random() * others.length)]
        show(pick.ms, pick.url)
        scheduleIdle()
      }, 5000)
    }
    scheduleIdle()

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [timingMs, timingUrl, show])

  const hasValue = displayMs != null
  const isCache = hasValue && displayMs < 500
  const value = hasValue ? formatTiming(displayMs) : null
  const unit = hasValue ? timingUnit(displayMs) : 'secs'
  const domain = displayUrl ? extractDomain(displayUrl) : null

  return (
    <Flex
      css={theme({
        display: 'inline-flex',
        px: [2, 2, 2, 3],
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      })}
    >
      <Subhead
        forwardedAs='div'
        css={theme({
          fontSize: ['28px', '34px', '42px', '42px'],
          color: 'white',
          fontWeight: 'bold',
          fontVariantNumeric: 'tabular-nums'
        })}
      >
        {hasValue
          ? (
            <>
              <TimingHighlight key={key}>{value}</TimingHighlight>
              <Caption
                forwardedAs='div'
                css={theme({
                  ml: 1,
                  color: 'white',
                  display: 'inline',
                  fontWeight: 'bold',
                  fontSize: ['22px', '28px', '32px', '32px']
                })}
                titleize={false}
              >
                {unit}
              </Caption>
            </>
            )
          : (
              '-'
            )}
      </Subhead>
      <Caption forwardedAs='div' css={theme({ color: 'white60', pt: 1 })}>
        <Caps css={theme({ fontWeight: 'bold', fontSize: ['12px', 1, 1, 1] })}>
          {hasValue
            ? isCache
              ? `${domain} · cached`
              : `${domain} · cold`
            : 'loading…'}
        </Caps>
      </Caption>
    </Flex>
  )
}

const Timings = ({ timingMs, timingUrl, timingHistory }) => {
  const healthcheck = useHealthcheck()

  const blockOne = (
    <Flex
      css={theme({
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      })}
    >
      <Subhead css={theme({ fontSize: [2, 3, 3, '44px'], color: 'white' })}>
        Send the URL{' '}
        <span css={theme({ display: 'block', color: 'white60' })}>
          Get the metadata back
        </span>
      </Subhead>
    </Flex>
  )

  const blockTwo = (
    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        justifyContent: 'center',
        alignItems: 'baseline',
        width: '100%',
        maxWidth: layout.large,
        gap: [1, 3, 4, 5],
        fontVariantNumeric: 'tabular-nums'
      })}
    >
      <Flex
        css={theme({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        })}
      >
        <Subhead
          forwardedAs='div'
          css={theme({
            fontSize: ['20px', '26px', '32px', '32px'],
            color: 'white',
            fontWeight: 'bold'
          })}
        >
          {trimMs(healthcheck.meta.p95_pretty)}
          <Caption
            forwardedAs='div'
            css={theme({
              ml: 1,
              color: 'white',
              display: 'inline',
              fontWeight: 'bold'
            })}
            titleize={false}
          >
            secs
          </Caption>
        </Subhead>
        <Caption forwardedAs='div' css={theme({ color: 'white60', pt: 1 })}>
          <Caps
            css={theme({ fontWeight: 'bold', fontSize: ['12px', 1, 1, 1] })}
          >
            P95 cold response
          </Caps>
        </Caption>
      </Flex>
      <Hide breakpoints={[1, 2, 3]}>
        <Box css={theme({ px: 2 })} />
      </Hide>
      <LiveTiming
        timingMs={timingMs}
        timingUrl={timingUrl}
        timingHistory={timingHistory}
      />
      <Flex
        css={theme({
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        })}
      >
        <Subhead
          forwardedAs='div'
          css={theme({
            fontSize: ['20px', '26px', '32px', '32px'],
            color: 'white',
            fontWeight: 'bold'
          })}
        >
          99.9
          <Caption
            forwardedAs='div'
            css={theme({
              ml: 1,
              color: 'white',
              display: 'inline',
              fontWeight: 'bold'
            })}
          >
            %
          </Caption>
        </Subhead>
        <Caption forwardedAs='div' css={theme({ color: 'white60', pt: 1 })}>
          <Caps
            css={theme({ fontWeight: 'bold', fontSize: ['12px', 1, 1, 1] })}
          >
            SLA Guaranteed
          </Caps>
        </Caption>
      </Flex>
    </Flex>
  )

  return (
    <Block
      forwardedAs='section'
      id='timings'
      flexDirection='column'
      css={theme({
        px: 4,
        py: SECTION_VERTICAL_SPACING,
        width: '100%',
        backgroundImage: `radial-gradient(
          circle at center right,
          ${colors.blue9} 0%,
          ${colors.blue9} 48%,
          ${colors.blue8} 48%,
          ${colors.blue8} 52%,
          ${colors.blue7} 52%,
          ${colors.blue7} 65%,
          ${colors.blue6} 65%,
          ${colors.blue6} 79%,
          ${ACCENT} 79%,
          ${ACCENT} 100%
        )`,
        borderTop: `${borders[1]} ${colors.white20}`,
        borderBottom: `${borders[1]} ${colors.white20}`
      })}
      blockOne={blockOne}
      blockTwo={blockTwo}
    />
  )
}

// --- Capabilities (metadata preview card) ---

const CAPABILITIES = [
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <path d='M9 4H8a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1' />
        <path d='M15 4h1a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1' />
      </svg>
    ),
    title: 'Every source merged, zero parsing',
    description: (
      <>
        Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa, and HTML
        tags combined into <b>one unified schema</b>. Stop writing{' '}
        <b>per-site fallback logic</b> and ship consistent previews at scale.
      </>
    )
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <rect x='3' y='3' width='18' height='18' rx='2' />
        <circle cx='9' cy='9' r='2' />
        <path d='m21 15-5-5L5 21' />
      </svg>
    ),
    title: 'Brand-ready visuals out of the box',
    description: (
      <>
        Get high-resolution images, logos, favicons, and the{' '}
        <b>dominant color palette</b> for every URL — perfect for{' '}
        <b>rich link cards and theming</b> without manual art direction.
      </>
    )
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <path d='M13 2 3 14h9l-1 8 10-12h-9l1-8z' />
      </svg>
    ),
    title: 'Real browser, SPA-ready rendering',
    description: (
      <>
        Every request runs in a <b>real headless Chrome session</b> that
        executes JavaScript, hydrates SPAs, and waits for selectors — so you get
        accurate metadata from dynamic pages that <b>plain scrapers miss</b>.
      </>
    )
  },
  {
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <circle cx='12' cy='12' r='10' />
        <path d='M2 12h20' />
        <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
      </svg>
    ),
    title: 'Production-grade edge infrastructure',
    description: (
      <>
        Global CDN caching, automatic retries, and <b>99.9% uptime</b> handle
        the scraping complexity for you — with a{' '}
        <b>free tier of 50 requests per day</b> to get started.
      </>
    )
  }
]

const CapabilityItem = styled(Flex)`
  ${theme({ gap: 2, alignItems: 'flex-start' })};
`

const CapabilityIcon = styled(Flex)`
  ${theme({
    width: space[4],
    height: space[4],
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  })};
  color: ${ACCENT};
`

const PaletteChip = styled('span')`
  ${theme({ width: space[3], height: space[3], borderRadius: '50%' })};
  display: inline-block;
  background: ${({ $color }) => $color};
  border: ${borders[1]} ${colors.black10};
  box-shadow: 0 1px 3px ${colors.black10};
`

const toColor = entry => {
  if (!entry) return null
  if (typeof entry === 'string') return entry
  if (Array.isArray(entry)) return `rgb(${entry.join(',')})`
  return entry.color || entry.rgb || null
}

const extractPalette = data => {
  if (!data) return []
  const candidates = [
    data.palette,
    data.image?.palette,
    data.logo?.palette
  ].filter(Boolean)
  for (const candidate of candidates) {
    if (Array.isArray(candidate) && candidate.length) return candidate
  }
  return []
}

const extractLogoUrl = data => {
  if (!data) return null
  const logo = data.logo
  if (!logo) return null
  if (typeof logo === 'string') return logo
  return logo.url || null
}

const LogoThumb = styled('span')`
  ${theme({
    display: 'inline-block',
    width: space[4],
    height: space[4],
    borderRadius: '50%',
    bg: 'white'
  })};
  background-image: ${({ $src }) => `url(${$src})`};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: ${borders[1]} ${colors.black10};
  box-shadow: 0 1px 3px ${colors.black10};
  flex-shrink: 0;
`

const SOCIAL_PROVIDERS = [
  { key: 'opengraph', label: 'Open Graph' },
  { key: 'twitter', label: 'Twitter Cards' },
  { key: 'jsonld', label: 'JSON-LD' },
  { key: 'oembed', label: 'oEmbed' },
  { key: 'microdata', label: 'Microdata' },
  { key: 'html', label: 'HTML' }
]

const SourceBadge = styled('span')`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    px: 2,
    py: 1,
    borderRadius: 4,
    bg: 'white',
    fontFamily: 'mono',
    fontSize: 0,
    color: 'black70',
    fontWeight: 'bold'
  })};
  border: ${borders[1]} ${colors.black10};
`

const Capabilities = ({ currentUrl, currentData }) => {
  const [capCopied, setCapCopied] = useState(false)
  const capCopyTimerRef = useRef(null)

  const capApiUrl = `https://api.microlink.io?meta&palette&url=${
    currentUrl || FIRST_URL
  }`

  const handleCapCopy = () => {
    const markCopied = () => {
      setCapCopied(true)
      if (capCopyTimerRef.current) clearTimeout(capCopyTimerRef.current)
      capCopyTimerRef.current = setTimeout(() => setCapCopied(false), 1500)
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard
        .writeText(capApiUrl)
        .then(markCopied)
        .catch(() => {})
    }
  }

  const palette = extractPalette(currentData)
    .map(toColor)
    .filter(Boolean)
    .slice(0, 6)
  const logoUrl = extractLogoUrl(currentData)

  return (
    <Container
      id='capabilities'
      as='section'
      css={theme({
        alignItems: 'center',
        maxWidth: '100%',
        bg: 'pinky',
        px: [3, 3, 4, 5],
        py: SECTION_VERTICAL_SPACING
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          maxWidth: HERO_LAYOUT.maxWidth,
          mx: 'auto',
          flexDirection: ['column', 'column', 'column', 'row'],
          alignItems: ['center', 'center', 'center', 'stretch'],
          gap: [4, 4, 5, HERO_LAYOUT.gap[3]]
        })}
      >
        <Flex
          css={theme({
            width: ['100%', '100%', '100%', HERO_LAYOUT.mainWidth],
            pt: [4, 4, 5, 0],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: [3, 3, 4, 4]
          })}
        >
          <Box
            css={theme({
              width: ['100%', '100%', '80%', '100%'],
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: `0 8px 32px ${colors.black10}`,
              bg: 'white'
            })}
          >
            <Box css={theme({ p: [3, 3, 4, 4], bg: 'white' })}>
              <HeroMicrolink
                key={currentUrl}
                size='large'
                url={(currentData && currentData.url) || currentUrl}
                fetchData={!currentData}
                setData={currentData ? () => currentData : undefined}
                media={['image', 'logo']}
              />
              {(palette.length > 0 || logoUrl) && (
                <Flex
                  css={theme({
                    pt: [3, 3, 4, 4],
                    alignItems: 'center',
                    gap: 2,
                    flexWrap: 'wrap'
                  })}
                  aria-label='Detected brand logo and palette'
                >
                  {logoUrl && (
                    <>
                      <Caps
                        css={theme({
                          fontSize: 0,
                          fontWeight: 'bold',
                          color: 'black60',
                          letterSpacing: 2,
                          pr: 2
                        })}
                      >
                        Logo
                      </Caps>
                      <LogoThumb
                        $src={logoUrl}
                        role='img'
                        aria-label='Detected logo'
                        title={logoUrl}
                      />
                    </>
                  )}
                  {palette.length > 0 && (
                    <>
                      <Caps
                        css={theme({
                          fontSize: 0,
                          fontWeight: 'bold',
                          color: 'black60',
                          letterSpacing: 2,
                          pl: logoUrl ? 3 : 0,
                          pr: 2
                        })}
                      >
                        Palette
                      </Caps>
                      {palette.map((color, i) => (
                        <PaletteChip
                          key={`${color}-${i}`}
                          $color={color}
                          aria-label={`Detected color ${color}`}
                        />
                      ))}
                    </>
                  )}
                </Flex>
              )}
              <Flex
                css={theme({
                  pt: [3, 3, 4, 4],
                  alignItems: 'center',
                  gap: 2,
                  flexWrap: 'wrap'
                })}
              >
                <Caps
                  css={theme({
                    fontSize: 0,
                    fontWeight: 'bold',
                    color: 'black60',
                    letterSpacing: 2,
                    pr: 2
                  })}
                >
                  Sources merged
                </Caps>
                {SOCIAL_PROVIDERS.map(({ key, label }) => (
                  <SourceBadge key={key}>{label}</SourceBadge>
                ))}
              </Flex>
            </Box>
            <MetaApiBar
              className='meta-api-bar'
              css={theme({
                alignItems: 'center',
                justifyContent: 'space-between',
                px: [2, 3, 3, 3],
                py: '10px',
                gap: 2,
                borderTop: 1,
                borderColor: 'black05'
              })}
            >
              <Text
                as='span'
                css={theme({
                  fontSize: ['13px', '13px', '14px', '14px'],
                  fontFamily: 'mono',
                  letterSpacing: 0,
                  flex: 1,
                  minWidth: '0',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: 'black70'
                })}
              >
                https://api.microlink.io?
                <strong css={theme({ color: 'black' })}>
                  palette&url={currentUrl || FIRST_URL}
                </strong>
              </Text>
              <CopyButton
                type='button'
                onClick={handleCapCopy}
                aria-label={capCopied ? 'Copied!' : 'Copy API URL'}
              >
                {capCopied
                  ? (
                    <svg
                      className='icon-check'
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      aria-hidden='true'
                    >
                      <path
                        d='M3 8l3.5 3.5L13 4.5'
                        stroke='currentColor'
                        strokeWidth='1.8'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    )
                  : (
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z'
                      />
                    </svg>
                    )}
              </CopyButton>
            </MetaApiBar>
          </Box>
          <ArrowLink css={theme({ fontSize: [1, 1, 2, 2] })} href='/sdk'>
            Drop-in link previews in one line of code
          </ArrowLink>
        </Flex>
        <Flex
          css={theme({
            flexDirection: 'column',
            width: ['100%', '100%', '100%', HERO_LAYOUT.secondaryWidth],
            justifyContent: 'center',
            alignItems: ['center', 'center', 'center', 'flex-start'],
            gap: [3, 3, 4, 4]
          })}
        >
          <Subhead
            css={theme({
              fontSize: [3, 4, 4, 4],
              textAlign: ['center', 'center', 'center', 'left'],
              width: '100%'
            })}
          >
            Build social previews
            <LineBreak />
            <span css={{ color: ACCENT }}>that actually render</span>
          </Subhead>
          <Caption
            forwardedAs='div'
            css={theme({
              maxWidth: layout.small,
              textAlign: ['center', 'center', 'center', 'left'],
              fontSize: [1, 1, 2, 2]
            })}
          >
            Microlink returns a unified JSON response — plus the brand color
            palette, logo, and favicon. Everything you need to render a
            pixel-perfect link preview or URL preview on the first try.
          </Caption>
          <Flex
            css={[
              theme({ gap: [3, 3, 3, 4], width: '100%' }),
              {
                flexDirection: 'column',
                '@media (min-width: 768px) and (max-width: 1199px)': {
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  '& > *': { width: 'calc(50% - 12px)' }
                }
              }
            ]}
          >
            {CAPABILITIES.map(({ icon, title, description }) => (
              <CapabilityItem key={title}>
                <CapabilityIcon>{icon}</CapabilityIcon>
                <Flex css={theme({ flexDirection: 'column', gap: 1 })}>
                  <Text
                    css={theme({
                      fontWeight: 'bold',
                      fontSize: [1, 1, 2, 2]
                    })}
                  >
                    {title}
                  </Text>
                  <Text
                    css={theme({
                      fontSize: [0, 0, 1, 1],
                      color: 'black70',
                      lineHeight: 2
                    })}
                  >
                    {description}
                  </Text>
                </Flex>
              </CapabilityItem>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}

// --- Stack with Microlink platform ---

const STACK_UTILITIES = [
  {
    key: 'markdown',
    eyebrow: 'Metadata × Markdown',
    title: 'Clean content for LLMs and RAG pipelines',
    description:
      'Strip pages down to clean Markdown for embeddings, summarization, or content ingestion — and ship the structured metadata alongside as front-matter. Your AI pipeline gets both the readable body and the trustworthy source signals in one request.',
    href: '/markdown',
    cta: 'Explore Markdown API',
    accentColor: colors.orange7,
    accentSoft: colors.orange0,
    apiCall: 'api.microlink.io?meta&markdown&url=',
    icon: (
      <svg
        width='22'
        height='22'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <rect x='3' y='5' width='18' height='14' rx='2' />
        <path d='M7 15V9l3 3 3-3v6' />
        <path d='M17 9v6m0 0l-2-2m2 2l2-2' />
      </svg>
    )
  },
  {
    key: 'screenshot',
    eyebrow: 'Metadata × Screenshot',
    title: 'Visual link previews, every time',
    description:
      'Pair structured metadata with a real browser screenshot when og:image is missing, low-resolution, or mismatched. Render rich link previews and social cards that always look intentional — even for pages without proper Open Graph tags.',
    href: '/screenshot',
    cta: 'Explore Screenshot API',
    accentColor: colors.red6,
    accentSoft: colors.red0,
    apiCall: 'api.microlink.io?meta&screenshot&url=',
    icon: <FocusIcon width='24' height='24' />
  },
  {
    key: 'pdf',
    eyebrow: 'Metadata × PDF',
    title: 'Document-grade archives with provenance',
    description:
      'Convert any URL into a high-fidelity PDF and attach the unified metadata as machine-readable context — title, author, language, publication date, canonical URL. Perfect for legal archives, research evidence, and audit trails.',
    href: '/pdf',
    cta: 'Explore PDF API',
    accentColor: 'rgb(224, 0, 172)',
    accentSoft: colors.pink0,
    apiCall: 'api.microlink.io?meta&pdf&url=',
    icon: <PDFIcon width='24' height='24' />
  },
  {
    key: 'palette',
    eyebrow: 'Metadata × Palette & Logo',
    title: 'Brand-aware UI without manual art direction',
    description:
      'Add palette=true to extract dominant colors from the og:image or logo, and get the logo / favicon URLs in the same response. Theme link cards, chat unfurls, and notification UI to match the source — pixel by pixel, brand by brand.',
    href: '/logo',
    cta: 'Read palette docs',
    accentColor: ACCENT,
    accentSoft: colors.blue0,
    apiCall: 'api.microlink.io?meta&palette&url=',
    icon: (
      <svg
        width='22'
        height='22'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
        aria-hidden='true'
      >
        <path d='M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2 0-.5-.2-1-.6-1.4-.4-.4-.6-.9-.6-1.4 0-1.1.9-2 2-2H17a4 4 0 0 0 4-4c0-4.4-4-8-9-8z' />
        <circle cx='7.5' cy='10.5' r='1' />
        <circle cx='12' cy='7.5' r='1' />
        <circle cx='16.5' cy='10.5' r='1' />
      </svg>
    )
  }
]

const StackCard = styled('a')`
  ${theme({
    display: 'flex',
    flexDirection: 'column',
    p: [3, 3, 4, 4],
    bg: 'white',
    borderRadius: 3,
    gap: 3
  })};
  position: relative;
  text-decoration: none;
  color: inherit;
  border: ${borders[1]} ${colors.black10};
  box-shadow: 0 1px 2px ${colors.black05};
  transition: transform ${transition.medium}, box-shadow ${transition.medium},
    border-color ${transition.medium};
  overflow: hidden;
  isolation: isolate;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ $accent }) => $accent};
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform ${transition.medium};
  }

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 12px 32px ${colors.black10};
    border-color: ${colors.black20};
  }

  &:hover::before,
  &:focus-visible::before {
    transform: scaleX(1);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover,
    &:focus-visible {
      transform: none;
    }
  }
`

const StackIconWrap = styled('span')`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: 2
  })};
  background: ${({ $soft }) => $soft};
  color: ${({ $accent }) => $accent};
  flex-shrink: 0;

  & > svg {
    display: block;
    width: 22px !important;
    height: 22px !important;
    flex-shrink: 0;
  }
`

const StackEyebrow = styled('span')`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    letterSpacing: 1
  })};
  color: ${({ $accent }) => $accent};
  text-transform: uppercase;
`

const StackApiCode = styled('code')`
  ${theme({
    display: 'block',
    fontFamily: 'mono',
    fontSize: 0,
    color: 'black70',
    bg: 'gray0',
    px: 2,
    py: 2,
    borderRadius: 2,
    mt: 'auto'
  })};
  border: ${borders[1]} ${colors.black05};
  word-break: break-all;
  line-height: 1.5;

  & .stack-api-param {
    color: ${({ $accent }) => $accent};
    font-weight: bold;
  }
`

const StackCta = styled('span')`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'sans',
    fontSize: 1,
    fontWeight: 'bold'
  })};
  color: ${({ $accent }) => $accent};
  gap: 6px;
  transition: gap ${transition.short};

  ${StackCard}:hover &,
  ${StackCard}:focus-visible & {
    gap: 10px;
  }

  &::after {
    content: '→';
    display: inline-block;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    ${StackCard}:hover &,
    ${StackCard}:focus-visible & {
      gap: 6px;
    }
  }
`

const renderStackApi = (apiCall, currentUrl) => {
  const parts = apiCall.split(
    /(\bmeta&\b|\bscreenshot\b|\bpdf\b|\bmarkdown\b|\bpalette\b)/g
  )
  const url = currentUrl || FIRST_URL
  return (
    <>
      {parts.map((part, i) =>
        /^(meta&|screenshot|pdf|markdown|palette)$/.test(part)
          ? (
            <span key={i} className='stack-api-param'>
              {part}
            </span>
            )
          : (
              part
            )
      )}
      {url}
    </>
  )
}

const Stack = ({ currentUrl }) => {
  return (
    <Container
      id='stack'
      as='section'
      css={theme({
        alignItems: 'center',
        width: '100%',
        pt: [4, 4, 4, 4],
        pb: [4, 4, 5, 6],
        px: [3, 3, 4, 5]
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          maxWidth: HERO_LAYOUT.maxWidth,
          mx: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          gap: [4, 4, 5, 5]
        })}
      >
        <Flex
          css={theme({
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 3,
            maxWidth: layout.large,
            mx: 'auto'
          })}
        >
          <Caps
            css={theme({
              fontSize: 1,
              fontWeight: 'bold',
              color: 'black60',
              letterSpacing: 2
            })}
          >
            One API, every layer of context
          </Caps>
          <Subhead
            css={theme({
              fontSize: [3, 3, 4, 5],
              textAlign: 'center'
            })}
          >
            Metadata is the foundation.
            <br />
            <span css={{ color: ACCENT }}>Stack the rest on top.</span>
          </Subhead>
          <Caption
            forwardedAs='div'
            css={theme({
              fontSize: [2, 2, 2, 2],
              textAlign: 'center',
              maxWidth: layout.normal,
              mx: 'auto'
            })}
          >
            Use the metadata API on its own to power link previews, knowledge
            graphs, content moderation, or SEO tooling. Combine it with the
            other Microlink utilities in a single request to enrich the response
            with screenshots, PDFs, clean Markdown, and brand colors — no extra
            roundtrips, same predictable JSON, same browser session.
          </Caption>
        </Flex>
        <Box
          css={theme({
            display: 'grid',
            width: '100%',
            gridTemplateColumns: [
              '1fr',
              '1fr',
              'repeat(2, 1fr)',
              'repeat(2, 1fr)'
            ],
            gap: [3, 3, 4, 4]
          })}
        >
          {STACK_UTILITIES.map(item => (
            <StackCard
              key={item.key}
              href={item.href}
              $accent={item.accentColor}
              aria-label={`${item.title} — ${item.cta}`}
            >
              <Flex
                css={theme({
                  alignItems: 'center',
                  gap: 3
                })}
              >
                <StackIconWrap
                  $accent={item.accentColor}
                  $soft={item.accentSoft}
                >
                  {item.icon}
                </StackIconWrap>
                <Flex
                  css={theme({
                    flexDirection: 'column',
                    gap: 1,
                    minWidth: 0
                  })}
                >
                  <StackEyebrow $accent={item.accentColor}>
                    {item.eyebrow}
                  </StackEyebrow>
                  <Subhead
                    titleize={false}
                    css={theme({
                      fontSize: [2, 2, 3, 3],
                      textAlign: 'left'
                    })}
                  >
                    {item.title}
                  </Subhead>
                </Flex>
              </Flex>
              <Caption
                forwardedAs='div'
                css={theme({
                  fontSize: [1, 1, 2, 2],
                  textAlign: 'left'
                })}
              >
                {item.description}
              </Caption>
              <StackApiCode $accent={item.accentColor}>
                {renderStackApi(item.apiCall, currentUrl)}
              </StackApiCode>
              <StackCta $accent={item.accentColor}>{item.cta}</StackCta>
            </StackCard>
          ))}
        </Box>
      </Flex>
    </Container>
  )
}

// --- Code Example ---

const CODE_EXAMPLE_LANGUAGES = ['JavaScript', 'Python', 'Ruby', 'PHP', 'Golang']
const TYPE_SPEED_MS = 90
const DELETE_SPEED_MS = 60
const HOLD_TYPED_MS = 2000
const BETWEEN_WORDS_MS = 250

const cursorBlink = keyframes`
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
`

const TypedLanguage = styled('span')`
  color: ${ACCENT};
`

const TypedCursor = styled('span')`
  ${theme({ display: 'inline-block', ml: 1 })};
  color: ${ACCENT};
  animation: ${cursorBlink} 1s step-end infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const CodeExample = ({ currentUrl }) => {
  const [languageIndex, setLanguageIndex] = useState(0)
  const [typedLanguage, setTypedLanguage] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentLanguage = CODE_EXAMPLE_LANGUAGES[languageIndex]
    const hasTypedWholeWord = !isDeleting && typedLanguage === currentLanguage
    const hasDeletedWholeWord = isDeleting && typedLanguage.length === 0

    const delay = hasTypedWholeWord
      ? HOLD_TYPED_MS
      : hasDeletedWholeWord
        ? BETWEEN_WORDS_MS
        : isDeleting
          ? DELETE_SPEED_MS
          : TYPE_SPEED_MS

    const timer = setTimeout(() => {
      if (hasTypedWholeWord) {
        setIsDeleting(true)
      } else if (hasDeletedWholeWord) {
        setIsDeleting(false)
        setLanguageIndex(i => (i + 1) % CODE_EXAMPLE_LANGUAGES.length)
      } else if (isDeleting) {
        setTypedLanguage(prev => prev.slice(0, -1))
      } else {
        setTypedLanguage(currentLanguage.slice(0, typedLanguage.length + 1))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [typedLanguage, isDeleting, languageIndex])

  return (
    <Container
      id='code-example'
      as='section'
      css={theme({
        alignItems: 'center',
        width: '100%',
        py: SECTION_VERTICAL_SPACING,
        px: [1, 1, 5, 5]
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          maxWidth: HERO_LAYOUT.maxWidth,
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
          <Subhead
            css={theme({
              fontSize: [3, 3, 4, 4],
              textAlign: ['center', 'center', 'center', 'left'],
              width: '100%'
            })}
          >
            Metadata API <LineBreak /> in{' '}
            <TypedLanguage>
              {typedLanguage}
              <TypedCursor aria-hidden='true'>|</TypedCursor>
            </TypedLanguage>
          </Subhead>
          <Caption
            forwardedAs='div'
            css={theme({
              pt: [3, 3, 4, 4],
              fontSize: [2, 2, 2, 2],
              textAlign: ['center', 'center', 'center', 'left'],
              maxWidth: [
                layout.small,
                layout.small,
                layout.normal,
                layout.normal
              ]
            })}
          >
            The Microlink website metadata API delivers unified structured data
            through a developer-friendly HTTP endpoint. One URL in, normalized
            metadata out — ready to power link previews, URL previews, content
            ingestion, and social card generation.
          </Caption>
          <Flex
            css={theme({
              pt: [3, 3, 4, 4],
              width: '100%',
              fontSize: [2, 2, 3, 3],
              justifyContent: ['center', 'center', 'center', 'flex-start']
            })}
          >
            <ArrowLink href='/docs/guides/metadata'>Read the docs</ArrowLink>
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
          <Flex
            css={[
              theme({
                width: ['100%', '100%', '85%', '100%'],
                justifyContent: 'center',
                pt: [0, 0, 4, 4],
                pb: [4, 4, 4, 5],
                px: [2, 3, 0, 0]
              }),
              {
                '& > div, & > div > div:first-child': {
                  width: '100%'
                },
                '& > div > div:first-child': {
                  boxShadow: `0 24px 64px ${colors.black20}, 0 4px 16px ${colors.black10}`
                }
              }
            ]}
          >
            <MultiCodeEditorInteractive
              height={320}
              mqlCode={{
                url: currentUrl || FIRST_URL,
                meta: true
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}

// --- Clients ---

const [
  {
    reqs_pretty: reqsPretty,
    cached_reqs_percentage: cachedReqsPercentage,
    bytes_pretty: bytesPretty
  }
] = analyticsData

const analyticsBytes = (() => {
  const [value, unit] = bytesPretty.split(' ')
  return `${Number(value).toFixed(0)}${unit}`
})()

const STATS = [
  { value: reqsPretty, label: 'reqs per month' },
  { value: cachedReqsPercentage, label: 'cache hit rate' },
  { value: analyticsBytes, label: 'data served' }
]

const CLIENTS = [
  {
    name: 'Community',
    description: 'Fan engagement platform',
    url: 'https://community.com',
    logo: (
      <img
        src='/images/clients/community.com.png'
        alt='Community'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Impact',
    description: 'Partnership management',
    url: 'https://impact.com',
    logo: (
      <img
        src='/images/clients/impact.com.png'
        alt='Impact'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Mirror',
    description: 'Web3 publishing platform',
    url: 'https://mirror.xyz',
    logo: (
      <img
        src='/images/clients/mirror.xyz.png'
        alt='Mirror'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'Padlet',
    description: 'Visual collaboration tool',
    url: 'https://padlet.com',
    logo: (
      <img
        src='/images/clients/padlet.com.png'
        alt='Padlet'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  },
  {
    name: 'SkedSocial',
    description: 'Marketing platform',
    url: 'https://skedsocial.com',
    logo: (
      <img
        src='/images/clients/skedsocial.com.png'
        alt='Sked Social'
        width='28'
        height='28'
        aria-hidden='true'
      />
    )
  }
]

const ClientLogo = styled(Flex)`
  ${theme({ textDecoration: 'none' })};
  color: inherit;
  transition: transform ${transition.short};

  &:hover {
    transform: translateY(-${radii[1]}) scale(1.05);
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.link};
    outline-offset: ${radii[1]};
    border-radius: ${radii[3]};
  }
`

const StatSeparator = styled(Box)`
  ${theme({ width: '1px', alignSelf: 'stretch', bg: 'black10' })};
`

const Clients = () => (
  <Container
    id='clients'
    as='section'
    css={theme({
      alignItems: 'center',
      maxWidth: layout.large,
      pt: [3, 3, 2, 2],
      pb: [5, 5, 5, 5]
    })}
  >
    <Caps
      css={theme({
        fontSize: [1, 1, 2, 2],
        fontWeight: 'bold',
        color: 'black60',
        letterSpacing: 3
      })}
    >
      Last month usage
    </Caps>
    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        px: [3, 4, 0, 0],
        justifyContent: 'center',
        alignItems: 'center',
        gap: [3, 4, 5, 5],
        maxWidth: layout.large,
        width: '100%',
        fontVariantNumeric: 'tabular-nums',
        flexWrap: ['wrap', 'nowrap', 'nowrap', 'nowrap']
      })}
    >
      {STATS.map(({ value, label }, index) => (
        <React.Fragment key={label}>
          <Flex
            css={theme({
              flexDirection: 'column',
              alignItems: 'center',
              px: [3, 2, 3, 3],
              mt: index === STATS.length - 1 ? [2, 0, 0, 0] : undefined
            })}
          >
            <Subhead
              forwardedAs='div'
              titleize={false}
              css={theme({
                fontSize: [3, 3, '42px'],
                fontWeight: 'bold',
                color: 'black'
              })}
            >
              {value}
            </Subhead>
            <Caps
              css={theme({
                pt: 1,
                fontSize: [0, 1, 1, 1],
                fontWeight: 'bold',
                color: 'black80',
                whiteSpace: 'nowrap',
                lineHeight: 0
              })}
            >
              {label}
            </Caps>
          </Flex>
          {index < STATS.length - 1 && (
            <StatSeparator
              css={theme({
                display: ['none', 'none', 'block', 'block']
              })}
            />
          )}
        </React.Fragment>
      ))}
    </Flex>
    <Caps
      css={theme({
        pt: [4, 4, 5, 5],
        fontSize: [1, 1, 2, 2],
        fontWeight: 'bold',
        color: 'black60',
        letterSpacing: 3,
        pb: [3, 3, 0, 0]
      })}
    >
      some clients
    </Caps>
    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        px: [3, 4, 4, 0],
        flexWrap: ['wrap', 'wrap', 'nowrap', 'nowrap'],
        justifyContent: 'center',
        alignItems: 'center',
        gap: [4, 4, 5, 5],
        maxWidth: layout.large
      })}
    >
      {CLIENTS.map(({ name, description, logo, url }) => (
        <ClientLogo
          as='a'
          key={name}
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`Visit ${name}`}
          css={theme({
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1
          })}
        >
          <Box css={theme({ color: 'black' })}>{logo}</Box>
          <Text
            css={theme({ fontWeight: 'bold', fontSize: 1, color: 'black' })}
          >
            {name}
          </Text>
          <Text
            css={theme({ fontSize: 0, color: 'black80', textAlign: 'center' })}
          >
            {description}
          </Text>
        </ClientLogo>
      ))}
    </Flex>
  </Container>
)

// --- Pricing ---

const PricingCheck = ({ children }) => (
  <Flex css={theme({ alignItems: 'center', pt: 2 })}>
    <FeatherIcon
      css={theme({ display: 'inline-flex', pr: 2 })}
      icon={CheckIcon}
    />
    <Text as='span' css={theme({ fontSize: [1, 1, '18px', '18px'] })}>
      {children}
    </Text>
  </Flex>
)

const PricingCard = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    borderRadius: 3,
    bg: 'white',
    px: [3, 3, 4, 4],
    py: [3, 3, 4, 4],
    flex: 1,
    minWidth: 0,
    maxWidth: ['100%', '100%', '380px', '380px']
  })}
  border: ${borders[1]};
  box-shadow: 0 2px 8px ${colors.black05};
`

const Pricing = () => (
  <Container
    as='section'
    id='pricing'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'pinky',
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Subhead
      variant='gradient'
      css={theme({ fontSize: ['34px', '42px', '54px', '62px'] })}
    >
      Start free, scale when ready
    </Subhead>
    <Caption
      forwardedAs='div'
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      No login required. No credit card needed. The website metadata API is free
      to use — just start calling it.
    </Caption>
    <Flex
      css={theme({
        pt: [4, 4, 5, 5],
        px: [4, 4, 5, 5],
        flexDirection: ['column', 'column', 'row', 'row'],
        justifyContent: 'center',
        gap: [3, 3, 4, 4],
        width: ['100%', '420px', '100%', '100%']
      })}
    >
      <PricingCard css={theme({ borderColor: 'black10' })}>
        <Text
          css={theme({
            fontSize: ['20px', '20px', '24px', '24px'],
            fontWeight: 'bold'
          })}
        >
          Free
        </Text>
        <Flex css={theme({ alignItems: 'baseline', pt: 2, gap: 1 })}>
          <Text
            css={theme({
              fontSize: ['32px', '32px', '38px', '38px'],
              fontWeight: 'bold',
              lineHeight: 0
            })}
          >
            $0
          </Text>
          <Text css={theme({ color: 'black60', fontSize: [0, 0, 1, 1] })}>
            /month
          </Text>
        </Flex>
        <Text css={theme({ pt: 2, fontSize: [1, 1, '18px', '18px'] })}>
          Free metadata API — 50 requests/day, no login, no credit card.
        </Text>
        <Box css={theme({ pt: 3 })}>
          <PricingCheck>Unified metadata extraction</PricingCheck>
          <PricingCheck>Open Graph, Twitter, JSON-LD, oEmbed</PricingCheck>
          <PricingCheck>Color palette & logo detection</PricingCheck>
          <PricingCheck>Screenshots, PDF, and more</PricingCheck>
          <PricingCheck>Full browser control</PricingCheck>
        </Box>
        <Flex
          css={theme({ pt: 4, fontSize: ['18px', '18px', '20px', '20px'] })}
        >
          <ArrowLink href='/docs/guides/metadata'>Get started free</ArrowLink>
        </Flex>
      </PricingCard>

      <PricingCard
        css={[
          theme({ borderColor: 'transparent' }),
          {
            background: `linear-gradient(${colors.white}, ${colors.white}) padding-box, ${gradient} border-box`,
            border: '2px solid transparent'
          }
        ]}
      >
        <Text
          css={theme({
            fontSize: ['20px', '20px', '24px', '24px'],
            fontWeight: 'bold'
          })}
        >
          Pro
        </Text>
        <Flex css={theme({ alignItems: 'baseline', pt: 2, gap: 1 })}>
          <Text
            css={theme({
              fontSize: ['32px', '32px', '38px', '38px'],
              fontWeight: 'bold',
              lineHeight: 0
            })}
          >
            &euro;39
          </Text>
          <Text css={theme({ color: 'black60', fontSize: [0, 0, 1, 1] })}>
            /month
          </Text>
        </Flex>
        <Text css={theme({ pt: 2, fontSize: [1, 1, '18px', '18px'] })}>
          46,000 requests/month for production metadata workloads.
        </Text>
        <Box css={theme({ pt: 3 })}>
          <PricingCheck>Everything in Free</PricingCheck>
          <PricingCheck>
            <Link href='/docs/guides/common/proxy'>
              Automatic proxy resolution
            </Link>
          </PricingCheck>
          <PricingCheck>
            <Link href='/docs/api/parameters/headers'>Custom HTTP headers</Link>
          </PricingCheck>
          <PricingCheck>
            <Link href='/docs/api/parameters/ttl'>Configurable TTL</Link>
          </PricingCheck>
          <PricingCheck>
            <Link href='/docs/api/parameters/proxy'>Antibot protection</Link>
          </PricingCheck>
        </Box>
        <Flex
          css={theme({ pt: 4, fontSize: ['18px', '18px', '20px', '20px'] })}
        >
          <ArrowLink href='/#pricing'>See all plans</ArrowLink>
        </Flex>
      </PricingCard>
    </Flex>
  </Container>
)

// --- Open Source ---

const REPOS = [
  {
    name: 'metascraper',
    org: 'microlinkhq',
    description:
      'The rule-based library that powers Microlink metadata. Normalize Open Graph, JSON-LD, Twitter Cards, microdata, RDFa, oEmbed, and HTML tags from any website.',
    language: 'JavaScript',
    languageColor: colors.yellow3,
    stars: '2.6k',
    primary: true
  },
  {
    name: 'browserless',
    org: 'microlinkhq',
    description:
      'The headless Chrome/Chromium driver on top of Puppeteer. Renders JavaScript-heavy pages so metadata injected at runtime is captured correctly.',
    language: 'JavaScript',
    languageColor: colors.yellow3,
    stars: '1.8k'
  },
  {
    name: 'sdk',
    org: 'microlinkhq',
    description:
      'Make any URL embeddable. Turn any URL into a beautiful link preview using the metadata returned by the Microlink API.',
    language: 'JavaScript',
    languageColor: colors.yellow3,
    stars: '1.4k'
  }
]

const RepoCard = styled('a')`
  ${theme({
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    p: 3,
    borderRadius: 4,
    bg: 'white'
  })};
  border: ${borders[1]} ${colors.black10};
  text-decoration: none;
  color: inherit;
  transition: border-color ${transition.short}, box-shadow ${transition.short},
    background ${transition.short};

  .repo-github-icon {
    transition: fill ${transition.short};
  }

  &:hover {
    border-color: ${colors.black};
    box-shadow: 0 8px 24px ${colors.black10};

    .repo-github-icon {
      fill: ${colors.black};
    }
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.link};
    outline-offset: ${radii[1]};
  }
`

const RepoCardPrimary = styled(RepoCard)`
  ${theme({ p: 3 })};
  border: ${borders[1]} ${colors.black10};

  &:hover {
    border-color: ${colors.black};
    box-shadow: 0 8px 24px ${colors.black10};
  }
`

const RepoMeta = styled(Flex)`
  ${theme({
    alignItems: 'center',
    gap: 3,
    fontSize: 0,
    fontFamily: 'sans',
    color: 'black60'
  })};
`

const LanguageDot = styled('span')`
  ${theme({ width: fontSizes[0], height: fontSizes[0] })};
  background: ${({ $color }) => $color};
  border-radius: 50%;
  flex-shrink: 0;
`

const OpenSource = () => (
  <Container
    as='section'
    id='open-source'
    css={theme({
      alignItems: 'center',
      width: '100%',
      py: [5, 5, 5, 6],
      px: [1, 1, 5, 5]
    })}
  >
    <Flex
      css={theme({
        width: '100%',
        maxWidth: HERO_LAYOUT.maxWidth,
        mx: 'auto',
        flexDirection: ['column', 'column', 'column', 'row'],
        alignItems: ['center', 'center', 'center', 'stretch'],
        gap: HERO_LAYOUT.gap
      })}
    >
      <Flex
        css={theme({
          width: ['100%', '100%', '100%', HERO_LAYOUT.mainWidth],
          pt: [4, 4, 5, 0],
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        })}
      >
        <Flex
          css={theme({
            width: ['100%', '100%', '85%', '100%'],
            flexDirection: 'column',
            gap: [3, 3, 4, 4]
          })}
        >
          {REPOS.filter(r => r.primary).map(repo => (
            <RepoCardPrimary
              key={repo.name}
              href={`https://github.com/${repo.org}/${repo.name}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <Flex css={theme({ alignItems: 'center', gap: '10px' })}>
                <svg
                  className='repo-github-icon'
                  width='20'
                  height='20'
                  viewBox='0 0 16 16'
                  fill={colors.black80}
                  aria-hidden='true'
                >
                  <path d='M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z' />
                </svg>
                <Text
                  css={theme({
                    fontWeight: 'bold',
                    fontSize: [2, 2, 3, 3],
                    color: 'black80'
                  })}
                >
                  {repo.name}
                </Text>
              </Flex>
              <Text
                css={theme({
                  fontSize: [1, 1, 2, 2],
                  color: 'black60',
                  lineHeight: 1
                })}
              >
                {repo.description}
              </Text>
              <RepoMeta css={theme({ fontSize: 1 })}>
                <Flex css={theme({ alignItems: 'center', gap: 1 })}>
                  <LanguageDot $color={repo.languageColor} />
                  {repo.language}
                </Flex>
                <Flex css={theme({ alignItems: 'center', gap: 1 })}>
                  <StarIcon size={16} aria-hidden='true' />
                  {getRepoStarsLabel(repo)}
                </Flex>
              </RepoMeta>
            </RepoCardPrimary>
          ))}

          <Flex
            css={theme({
              gap: [3, 3, 4, 4],
              flexDirection: ['column', 'column', 'row', 'row']
            })}
          >
            {REPOS.filter(r => !r.primary).map(repo => (
              <RepoCard
                key={repo.name}
                href={`https://github.com/${repo.org}/${repo.name}`}
                target='_blank'
                rel='noopener noreferrer'
                css={theme({ flex: 1 })}
              >
                <Flex css={theme({ alignItems: 'center', gap: 2 })}>
                  <svg
                    className='repo-github-icon'
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill={colors.black60}
                    aria-hidden='true'
                  >
                    <path d='M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z' />
                  </svg>
                  <Text
                    css={theme({
                      fontWeight: 'bold',
                      fontSize: [2, 2, 2, 2],
                      color: 'black'
                    })}
                  >
                    {repo.name}
                  </Text>
                </Flex>
                <Text
                  css={theme({
                    color: 'black60',
                    fontSize: 1,
                    lineHeight: 1,
                    flex: 1
                  })}
                >
                  {repo.description}
                </Text>
                <RepoMeta>
                  <Flex css={theme({ alignItems: 'center', gap: 1 })}>
                    <LanguageDot $color={repo.languageColor} />
                    {repo.language}
                  </Flex>
                  <Flex css={theme({ alignItems: 'center', gap: 1 })}>
                    <StarIcon size={14} aria-hidden='true' />
                    {getRepoStarsLabel(repo)}
                  </Flex>
                </RepoMeta>
              </RepoCard>
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex
        css={theme({
          flexDirection: 'column',
          width: ['100%', '100%', '100%', HERO_LAYOUT.secondaryWidth],
          justifyContent: 'center',
          alignItems: ['center', 'center', 'center', 'flex-start'],
          order: [-1, -1, -1, 0]
        })}
      >
        <Subhead
          css={theme({
            textAlign: ['center', 'center', 'center', 'left'],
            fontSize: [3, 3, 4, 4],
            width: '100%'
          })}
        >
          Built on <span css={{ color: ACCENT }}>open source</span>,
          <br />
          trusted by developers
        </Subhead>
        <Caption
          css={theme({
            pt: [3, 3, 4, 4],
            px: [4, 4, 4, 0],
            maxWidth: [
              layout.small,
              layout.small,
              layout.normal,
              layout.normal
            ],
            fontSize: [1, 1, 2, 2],
            textAlign: ['center', 'center', 'center', 'left']
          })}
        >
          The Microlink metadata engine is powered by{' '}
          <Link href='https://metascraper.js.org'>metascraper</Link>, our
          battle-tested open source library used by thousands of developers
          worldwide. You can inspect the code, contribute, or self-host it.
        </Caption>
        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            width: '100%',
            justifyContent: ['center', 'center', 'center', 'flex-start']
          })}
        >
          <ArrowLink
            href='https://github.com/microlinkhq'
            css={theme({ fontSize: ['20px', '20px', '24px', '24px'] })}
          >
            Explore on GitHub
          </ArrowLink>
        </Flex>
      </Flex>
    </Flex>
  </Container>
)

// --- Playground ---

const livePulse = keyframes`
  0%, 62% { color: inherit; }
  70%, 90% { color: ${ACCENT}; }
  100% { color: inherit; }
`

const LiveText = styled('span')`
  animation: ${livePulse} 1.5s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    color: ${ACCENT};
  }
`

const Playground = () => (
  <Container
    as='section'
    id='playground'
    css={theme({
      alignItems: 'center',
      width: '100%',
      pt: [3, 3, 3, 3],
      pb: SECTION_VERTICAL_SPACING,
      px: [1, 1, 5, 5]
    })}
  >
    <Flex
      css={theme({
        width: '100%',
        mx: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3
      })}
    >
      <Subhead
        css={theme({
          fontSize: ['28px', '36px', '46px', '46px'],
          textAlign: 'center'
        })}
      >
        Try it <LiveText>live</LiveText>, right now
      </Subhead>
      <Caption
        css={theme({
          px: [4, 4, 4, 0],
          fontSize: ['20px', '20px', '24px', '24px'],
          maxWidth: layout.large,
          textAlign: 'center'
        })}
      >
        Skip the setup. Our sharing debugger tool lets you paste any URL, see
        every extracted metadata field, and preview how link unfurls render on
        Facebook, X, LinkedIn, WhatsApp, and Slack in real time.
      </Caption>

      <Flex
        css={theme({
          width: '100%',
          justifyContent: 'center',
          maxWidth: layout.large,
          pt: 4,
          gap: [4, 4, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: ['center', 'center', 'stretch', 'stretch']
        })}
      >
        {PLAYGROUND_TOOLS.map(tool => (
          <Box
            key={tool.href}
            css={theme({
              width: '100%',
              maxWidth: ['550px', '550px', 'none', 'none'],
              flex: [null, null, 1, 1]
            })}
          >
            <FeaturedToolCard
              {...tool}
              cardCss={{ height: '100%' }}
              titleCss={{ fontSize: [2, 2, 2, 2] }}
              descriptionCss={{ color: 'black60' }}
            />
          </Box>
        ))}
      </Flex>
    </Flex>
  </Container>
)

// --- Benchmark ---

const speedLineAnim = keyframes`
  from { transform: translateX(-200px); opacity: 1; }
  to   { transform: translateX(100vw); opacity: 0; }
`

const SpeedLine = styled('div')`
  position: absolute;
  left: 0;
  top: ${p => p.$top};
  width: ${p => p.$w};
  height: ${p => p.$h};
  background: ${p => p.$color};
  border-radius: 9999px;
  box-shadow: 0 0 ${p => p.$glow} ${p => p.$color};
  animation: ${speedLineAnim} ${p => p.$dur} linear ${p => p.$delay} infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const Benchmark = () => (
  <section
    id='benchmark'
    css={{
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      backgroundImage: `radial-gradient(
        circle at center right,
        ${colors.blue9} 0%,
        ${colors.blue9} 48%,
        ${colors.blue8} 48%,
        ${colors.blue8} 52%,
        ${colors.blue7} 52%,
        ${colors.blue7} 65%,
        ${colors.blue6} 65%,
        ${colors.blue6} 79%,
        ${ACCENT} 79%,
        ${ACCENT} 100%
      )`,
      borderTop: `${borders[1]} ${colors.white20}`,
      borderBottom: `${borders[1]} ${colors.white20}`
    }}
  >
    <Box
      css={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <SpeedLine
        $top='12%'
        $w='140px'
        $h='3px'
        $dur='1.27s'
        $delay='0s'
        $color='rgba(255,255,255,0.45)'
        $glow='8px'
      />
      <SpeedLine
        $top='22%'
        $w='80px'
        $h='2px'
        $dur='1.78s'
        $delay='0.6s'
        $color='rgba(255,255,255,0.2)'
        $glow='4px'
      />
      <SpeedLine
        $top='32%'
        $w='110px'
        $h='2px'
        $dur='1.1s'
        $delay='0.15s'
        $color='rgba(255,255,255,0.55)'
        $glow='10px'
      />
      <SpeedLine
        $top='42%'
        $w='50px'
        $h='1px'
        $dur='2.11s'
        $delay='1.1s'
        $color='rgba(255,255,255,0.12)'
        $glow='3px'
      />
      <SpeedLine
        $top='52%'
        $w='130px'
        $h='3px'
        $dur='1.01s'
        $delay='0.3s'
        $color='rgba(255,255,255,0.6)'
        $glow='12px'
      />
      <SpeedLine
        $top='62%'
        $w='60px'
        $h='1px'
        $dur='1.91s'
        $delay='1.35s'
        $color='rgba(255,255,255,0.15)'
        $glow='3px'
      />
      <SpeedLine
        $top='17%'
        $w='90px'
        $h='2px'
        $dur='1.19s'
        $delay='0.2s'
        $color='rgba(255,255,255,0.35)'
        $glow='6px'
      />
      <SpeedLine
        $top='37%'
        $w='120px'
        $h='3px'
        $dur='0.94s'
        $delay='0s'
        $color='rgba(255,255,255,0.5)'
        $glow='10px'
      />
      <SpeedLine
        $top='47%'
        $w='45px'
        $h='1px'
        $dur='1.8s'
        $delay='0.8s'
        $color='rgba(255,255,255,0.18)'
        $glow='3px'
      />
      <SpeedLine
        $top='57%'
        $w='75px'
        $h='2px'
        $dur='1.35s'
        $delay='0.45s'
        $color='rgba(255,255,255,0.3)'
        $glow='5px'
      />
      <SpeedLine
        $top='67%'
        $w='105px'
        $h='3px'
        $dur='1.08s'
        $delay='0.15s'
        $color='rgba(255,255,255,0.5)'
        $glow='9px'
      />
      <SpeedLine
        $top='77%'
        $w='55px'
        $h='1px'
        $dur='1.97s'
        $delay='1.2s'
        $color='rgba(255,255,255,0.14)'
        $glow='3px'
      />
    </Box>
    <Flex
      css={theme({
        position: 'relative',
        zIndex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: [4, 4, 5, 5],
        px: 4,
        gap: [3, 3, 4, 4]
      })}
    >
      <Subhead
        css={theme({
          fontSize: [3, 3, '44px', '44px'],
          color: 'white',
          textAlign: 'center'
        })}
      >
        The most complete website metadata API{' '}
        <span css={theme({ display: 'block', color: 'white60' })}>
          built for production workloads
        </span>
      </Subhead>
      <Caption
        forwardedAs='div'
        css={theme({
          color: 'white80',
          textAlign: 'center',
          width: '100%',
          fontSize: [2, 2, '22px', '22px'],
          px: [4, 4, 4, 0]
        })}
      >
        Six metadata sources merged into one JSON response.
        <br />
        From Open Graph to JSON-LD, Microlink extracts the full picture in a
        single round-trip — no brittle scrapers, no partial results.
      </Caption>
      <ArrowLink
        href='/docs/guides/metadata'
        css={theme({
          fontSize: ['22px', '24px', '26px', '26px'],
          color: 'white'
        })}
        style={{ color: 'white' }}
      >
        Read the metadata guides
      </ArrowLink>
    </Flex>
  </section>
)

// --- Call to Action ---

const CTA_DURATION = 6.2
const CTA_SWEEP_PCT = (1.2 / CTA_DURATION) * 100
const CTA_LEAD_TEXT = 'Start'
const CTA_LEAD_CHARS = CTA_LEAD_TEXT.split('')
const CTA_CHAR_PCT = CTA_SWEEP_PCT / CTA_LEAD_CHARS.length

const ctaCharAnim = index => {
  const on = index * CTA_CHAR_PCT
  const off = on + CTA_CHAR_PCT
  return keyframes`
    0%, ${on}%, ${off}%, 100% { color: inherit; }
    ${on + 0.01}%, ${off - 0.01}% { color: ${ACCENT}; }
  `
}

const ctaAnims = Array.from({ length: CTA_LEAD_CHARS.length }, (_, i) =>
  ctaCharAnim(i)
)

const CtaChar = styled('span')`
  animation: ${({ $i }) => ctaAnims[$i]} ${CTA_DURATION}s step-end infinite;
`

const ctaNowAnim = keyframes`
  0%, ${CTA_SWEEP_PCT}% { color: inherit; }
  ${CTA_SWEEP_PCT + 0.01}%, 100% { color: ${ACCENT}; }
`

const CtaNow = styled('span')`
  animation: ${ctaNowAnim} ${CTA_DURATION}s step-end infinite;
`

const CallToAction = () => (
  <Container
    as='section'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'white',
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: layout.normal,
        px: [4, 4, 4, 0],
        mx: 'auto'
      })}
    >
      <Subhead
        css={theme({
          fontSize: [4, 4, 5, 5],
          textAlign: 'center'
        })}
      >
        {CTA_LEAD_CHARS.map((char, i) => (
          <CtaChar key={i} $i={i}>
            {char}
          </CtaChar>
        ))}{' '}
        <CtaNow>now</CtaNow>
      </Subhead>
      <Caption
        forwardedAs='div'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal],
          textAlign: 'center',
          fontSize: [2, 2, 3, 3]
        })}
      >
        Get 50&nbsp;requests/day with zero commitment — the website metadata API
        is free to use, no account, and no credit card. Just call the API and go
        from URL to metadata in seconds.
      </Caption>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: 'center'
        })}
      >
        <ArrowLink
          href='/docs/guides/metadata'
          css={theme({ fontSize: ['24px', '28px', '30px', '32px'] })}
        >
          Get started free
        </ArrowLink>
      </Flex>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        {['No login needed', '50 reqs/day free', 'No credit card'].map(
          label => (
            <Flex
              key={label}
              css={theme({
                alignItems: 'center',
                gap: 1,
                color: 'black80',
                fontSize: [0, 0, 1, 1]
              })}
            >
              <CheckIcon size={16} color={colors.close} />
              <Text as='span'>{label}</Text>
            </Flex>
          )
        )}
      </Flex>
    </Flex>
  </Container>
)

// --- FAQ ---

const TOP_FAQ_ITEMS = [
  {
    question: 'What is a website metadata API and how does it work?',
    text: 'A website metadata API takes any URL as input, loads the page with a full headless browser, and returns a unified JSON response containing the title, description, image, logo, favicon, color palette, language, author, date, and other structured fields. Think of it as a programmable link to metadata: one URL in, fully normalized metadata out. Microlink merges Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa, and HTML tags in one call — so you never have to pick a single source.',
    answer: (
      <>
        <div>
          A <b>website metadata API</b> takes any URL as input, loads the page
          with a full{' '}
          <Link href='/blog/what-is-a-headless-browser'>headless browser</Link>,
          and returns a unified JSON response containing title, description,
          image, logo, favicon, color palette, language, author, date, and more.
          Think of it as a programmable link to metadata: one URL in, fully
          normalized metadata out.
        </div>
      </>
    )
  },
  {
    question: 'Which metadata sources does Microlink normalize?',
    text: 'Microlink normalizes Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa, and HTML head tags into one unified JSON response. The API prioritizes the most accurate source per field automatically, so you always get the best title, description, image, logo, author, date, language, and palette without writing custom parsing logic.',
    answer: (
      <>
        <div>
          Microlink normalizes seven sources into one response:{' '}
          <Link href='https://ogp.me'>Open Graph</Link>, Twitter Cards,{' '}
          <Link href='https://json-ld.org'>JSON-LD</Link>, oEmbed,{' '}
          <Link href='https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Microdata'>
            microdata
          </Link>
          , <Link href='https://rdfa.info'>RDFa</Link>, and HTML head tags.
        </div>
        <div>
          The API prioritizes the most accurate source per field automatically —
          you get the best title, description, image, logo, author, date,
          language, and palette without writing custom parsing logic or
          maintaining brittle scrapers.
        </div>
      </>
    )
  },
  {
    question: 'How do I convert a URL to metadata or a link preview?',
    text: 'Use the metadata API as a URL preview and link preview endpoint: send an HTTPS GET request to https://api.microlink.io?url=<your-url> and you will receive JSON with the normalized metadata, including og:title, og:description, og:image, og:type, and og:site_name. No authentication is required for the free tier. The response merges Open Graph with Twitter Cards, JSON-LD, and HTML fallbacks so you always get a complete preview.',
    answer: (
      <>
        <div>
          Use the metadata API as a <b>URL preview</b> and <b>link preview</b>{' '}
          endpoint. Send an HTTPS <code>GET</code> request to{' '}
          <code>https://api.microlink.io?url=&lt;your-url&gt;</code> and you
          will receive JSON with the normalized metadata — including{' '}
          <i>og:title</i>, <i>og:description</i>, <i>og:image</i>,{' '}
          <i>og:type</i>, and <i>og:site_name</i>.
        </div>
        <div>
          No authentication is required for the free tier. The response merges
          Open Graph with Twitter Cards, JSON-LD, and HTML fallbacks so you
          always get a complete preview — see the{' '}
          <Link href='/docs/guides/metadata'>metadata guide</Link> for all
          fields.
        </div>
      </>
    )
  },
  {
    question: 'Does Microlink handle JavaScript-rendered metadata?',
    text: 'Yes. Unlike regex-based scrapers, Microlink runs a full Chromium headless browser so React, Vue, Next.js, and other SPAs that inject meta tags at runtime are captured correctly. This means metadata added by frameworks like next/head, react-helmet, or useHead hooks is detected just as reliably as server-rendered tags.',
    answer: (
      <>
        <div>
          Yes. Unlike regex-based scrapers, Microlink runs a full Chromium
          headless browser. So React, Vue, Next.js, and other SPAs that inject
          meta tags at runtime are captured correctly.
        </div>
        <div>
          Metadata added by frameworks like <code>next/head</code>,{' '}
          <code>react-helmet</code>, or Nuxt <code>useHead</code> hooks is
          detected just as reliably as server-rendered tags. Stale SSR or
          partial hydration edge cases are handled out of the box.
        </div>
      </>
    )
  },
  {
    question: 'Can I extract favicons, logos, and brand color palettes?',
    text: 'Yes. Microlink returns the logo and favicon URLs for every page, with dimensions and MIME type. Add palette=true to the query and you also get the dominant color palette extracted from the og:image or the logo — perfect for theming link preview cards, chat unfurls, and brand-aware UI without manual design work.',
    answer: (
      <>
        <div>
          Yes. Microlink returns the <i>logo</i> and <i>favicon</i> URLs for
          every page, with dimensions and MIME type.
        </div>
        <div>
          Add <code>palette=true</code> to the query and you also get the
          dominant color palette extracted from the <i>og:image</i> or the logo.
          Perfect for theming link preview cards, chat unfurls, and brand-aware
          UI without manual design work.
        </div>
      </>
    )
  },
  {
    question: 'Why use a metadata API instead of scraping the HTML myself?',
    text: 'Metadata extraction looks simple until it is not. Social networks use inconsistent tag naming, some sites inject tags at runtime, JSON-LD can be deeply nested, oEmbed requires provider-specific endpoints, and encoding bugs are everywhere. Microlink handles headless browser rendering, rule-based normalization with metascraper, proxy rotation, caching, and concurrency at scale — so you ship features instead of fighting the long tail of the web.',
    answer: (
      <>
        <div>
          Metadata extraction looks simple until it is not. Social networks use
          inconsistent tag naming, some sites inject tags at runtime, JSON-LD
          can be deeply nested, <Link href='https://oembed.com'>oEmbed</Link>{' '}
          requires provider-specific endpoints, and encoding bugs are
          everywhere.
        </div>
        <div>
          Microlink handles{' '}
          <Link href='/blog/what-is-a-headless-browser'>headless browser</Link>{' '}
          rendering, rule-based normalization with{' '}
          <Link href='https://metascraper.js.org'>metascraper</Link>, proxy
          rotation, caching, and concurrency at scale — so you ship features
          instead of fighting the long tail of the web.
        </div>
      </>
    )
  },
  {
    question: 'Is there a free tier for the metadata API?',
    text: 'Yes. The metadata API is free to use with 50 requests per day — no login, no credit card, and no setup required. Just call the endpoint and get normalized metadata back. For production workloads that need higher volume, automatic proxy rotation, custom headers, configurable TTL, and priority support, see our Pro plans starting at €39/month.',
    answer: (
      <>
        <div>
          Yes. The metadata API is <b>free to use with 50 requests per day</b> —
          no login, no credit card, and no setup required. Just call the
          endpoint and get normalized metadata back.
        </div>
        <div>
          For production workloads that need higher volume,{' '}
          <Link href='/docs/guides/common/proxy'>automatic proxy rotation</Link>
          , <Link href='/docs/api/parameters/headers'>custom headers</Link>,{' '}
          <Link href='/docs/api/parameters/ttl'>configurable TTL</Link>, and
          priority support, see our <Link href='/#pricing'>Pro plans</Link>{' '}
          starting at €39/month.
        </div>
      </>
    )
  }
]

const ProductInformation = () => (
  <Faq
    title='Product Information'
    titleSize={['40px', 4, 5, 5]}
    caption={
      <>
        Everything you need to know about <LineBreak /> the Microlink metadata
        API.
      </>
    }
    css={theme({
      pb: [5, 5, 6, 6],
      bg: 'pinky',
      borderTop: `${borders[1]} ${colors.pinkest}`,
      borderBottom: `${borders[1]} ${colors.pinkest}`
    })}
    questions={[
      ...TOP_FAQ_ITEMS,
      {
        question: 'How do I integrate the metadata API with Node.js or Python?',
        answer: (
          <>
            <div>
              In minutes. Visit our{' '}
              <Link href='/docs/guides/metadata'>documentation</Link> for
              interactive playground examples, official{' '}
              <Link href='/sdk'>SDKs</Link> (Node.js, Python, Ruby, Go), and
              copy-paste code snippets for any language.
            </div>
            <div>
              The <Link href='/sdk'>Microlink SDK</Link> turns the metadata
              response into a rendered link preview component with{' '}
              <Link href='/docs/api/parameters/iframe/#providers-supported'>
                250+ verified providers
              </Link>{' '}
              supported out of the box.
            </div>
          </>
        )
      },
      {
        question: 'What is metascraper and how does it power the API?',
        answer: (
          <>
            <div>
              <Link href='https://metascraper.js.org'>metascraper</Link> is the
              open-source rule-based library that underpins Microlink. It
              evaluates each desired field (title, image, date, etc.) against a
              series of rules and only accepts values that satisfy a strict data
              shape.
            </div>
            <div>
              This approach means when the API detects a field, you can be
              confident it is what it claims to be — no false positives from
              truncated strings, empty images, or malformed dates. The library
              is{' '}
              <Link href='https://github.com/microlinkhq/metascraper'>
                open source on GitHub
              </Link>{' '}
              and you can contribute rules for your own edge cases.
            </div>
          </>
        )
      },
      {
        question: 'What is your uptime SLA and expected latency?',
        answer: (
          <>
            <div>
              We guarantee <Link href='/enterprise'>enterprise-grade</Link>{' '}
              reliability with a 99.9% uptime SLA. Every request runs in an
              isolated browser instance to guarantee security and avoid
              shared-state leaks. Check real-time availability on the{' '}
              <Link href='/status'>status page</Link>.
            </div>
            <div>
              For latency: metadata responses are distributed via Cloudflare's
              240+ edge locations, meaning{' '}
              <Link href='/docs/api/parameters/ttl'>cached responses</Link> are
              delivered in milliseconds. Our optimized Chromium pool handles
              cold starts efficiently for consistent P95 performance.
            </div>
          </>
        )
      },
      {
        question: 'Other questions?',
        answer: (
          <>
            <div>
              We’re always available at{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
            </div>
          </>
        )
      }
    ]}
  />
)

// --- Meta / SEO ---

export const Head = () => (
  <Meta
    title='Website Metadata API — URL to Metadata & Link Preview API'
    description='Website metadata API that turns any URL to metadata: Open Graph, JSON-LD, Twitter Cards, link preview & URL preview in one JSON call. 50 req/day free.'
    image={cdnUrl('banner/meta.jpeg')}
    structured={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          '@id': 'https://microlink.io/metadata',
          name: 'Microlink Website Metadata API',
          alternateName: [
            'Website Metadata API',
            'URL to Metadata API',
            'Link Preview API'
          ],
          description:
            'Website metadata API that extracts unified structured data from any URL — link preview, URL preview, Open Graph, Twitter Cards, JSON-LD, oEmbed, microdata, RDFa and HTML tags merged into a single JSON response, with images, logos, favicons and color palettes included.',
          url: 'https://microlink.io/metadata',
          applicationCategory: ['DeveloperApplication', 'WebAPI'],
          operatingSystem: 'Web, Platform-Agnostic',
          provider: {
            '@type': 'Organization',
            '@id': 'https://microlink.io/about',
            name: 'Microlink',
            url: 'https://microlink.io'
          },
          isPartOf: {
            '@type': 'WebSite',
            '@id': 'https://microlink.io',
            url: 'https://microlink.io',
            name: 'Microlink'
          },
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'EUR',
            description:
              'Free tier available (50 requests/day). Pro plans start at €39/month for production workloads.',
            url: 'https://microlink.io/#pricing'
          },
          keywords: [
            'website metadata api',
            'metadata api',
            'url to metadata',
            'link to metadata',
            'link preview api',
            'link preview',
            'url preview',
            'open graph api',
            'json-ld api',
            'twitter cards api',
            'oembed api',
            'unified metadata',
            'structured data extraction',
            'sharing debugger'
          ],
          interactionStatistic: {
            '@type': 'InteractionCounter',
            interactionType: {
              '@type': 'https://schema.org/LikeAction'
            },
            userInteractionCount: getRepoStarsLabel(REPOS[0], true),
            interactionService: {
              '@type': 'WebSite',
              name: 'GitHub',
              url: 'https://github.com/microlinkhq/metascraper'
            }
          },
          about: [
            {
              '@type': 'Thing',
              name: 'Open Graph protocol',
              sameAs:
                'https://en.wikipedia.org/wiki/Facebook_Platform#Open_Graph_protocol'
            },
            {
              '@type': 'Thing',
              name: 'Metadata',
              sameAs: 'https://en.wikipedia.org/wiki/Metadata'
            },
            {
              '@type': 'Thing',
              name: 'JSON-LD',
              sameAs: 'https://en.wikipedia.org/wiki/JSON-LD'
            },
            {
              '@type': 'Thing',
              name: 'Application Programming Interface',
              sameAs: 'https://en.wikipedia.org/wiki/API'
            }
          ]
        },
        {
          '@type': 'FAQPage',
          '@id': 'https://microlink.io/metadata#faq',
          url: 'https://microlink.io/metadata',
          mainEntity: TOP_FAQ_ITEMS.map(({ question, text }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: {
              '@type': 'Answer',
              text
            }
          }))
        }
      ]
    }}
  />
)

// --- Page Assembly ---

const INITIAL_TIMING_MS = Math.floor(Math.random() * (25 - 14 + 1)) + 14

const MetaPage = () => {
  const [timingMs, setTimingMs] = useState(INITIAL_TIMING_MS)
  const [timingUrl, setTimingUrl] = useState(FIRST_URL)
  const [timingHistory, setTimingHistory] = useState([
    { ms: INITIAL_TIMING_MS, url: FIRST_URL }
  ])
  const [currentUrl, setCurrentUrl] = useState(FIRST_URL)
  const [currentData, setCurrentData] = useState(null)

  const handleRequestTiming = useCallback((ms, url) => {
    setTimingMs(ms)
    setTimingUrl(url)
    setTimingHistory(prev => {
      const filtered = prev.filter(e => e.url !== url)
      return [{ ms, url }, ...filtered].slice(0, 20)
    })
  }, [])

  const handleUrlChange = useCallback(url => {
    setCurrentUrl(url)
  }, [])

  const handleDataChange = useCallback(data => {
    setCurrentData(data)
  }, [])

  return (
    <Layout>
      <Hero
        onRequestTiming={handleRequestTiming}
        onUrlChange={handleUrlChange}
        onDataChange={handleDataChange}
      />
      <Timings
        timingMs={timingMs}
        timingUrl={timingUrl}
        timingHistory={timingHistory}
      />
      <Capabilities currentUrl={currentUrl} currentData={currentData} />
      <CodeExample currentUrl={currentUrl} />
      <Clients />
      <Pricing />
      <OpenSource />
      <Stack currentUrl={currentUrl} />
      <Playground />
      <Benchmark />
      <Features
        css={theme({ px: 4, pb: 5, pt: [5, 5, 6, 6] })}
        title={
          <Subhead
            css={theme({
              width: '100%',
              textAlign: 'left',
              fontSize: [
                4,
                4,
                `calc(${fontSizes[6]} - 1px)`,
                `calc(${fontSizes[6]} - 1px)`
              ]
            })}
          >
            The most complete website metadata API,{' '}
            <span
              css={{
                display: 'block',
                color: ACCENT,
                width: '100%',
                textAlign: 'left'
              }}
            >
              with no compromises.
            </span>
          </Subhead>
        }
        caption={
          <>
            No more brittle scrapers, conflicting tag sources, or partial link
            previews — our website metadata API turns any URL to metadata in one
            predictable JSON response, with easy integration via the{' '}
            <Link href='/docs/guides/metadata'>metadata API documentation</Link>
            .
          </>
        }
        features={FEATURES}
      />
      <CallToAction />
      <ProductInformation />
    </Layout>
  )
}

export default MetaPage
