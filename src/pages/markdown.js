import {
  borders,
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
import Button from 'components/elements/Button/Button'
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

import {
  Check as CheckIcon,
  Terminal as TerminalIcon,
  Star as StarIcon
} from 'react-feather'
import FeatherIcon from 'components/icons/Feather'
import NerdStatsOverlay, {
  extractNerdStats,
  buildMqlQuery
} from 'components/patterns/NerdStats/NerdStats'
import { rotate, dash, fadeInDown, highlight } from 'components/keyframes'
import ArrowLink from 'components/patterns/ArrowLink'
import Block from 'components/patterns/Block/Block'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'
import { FeaturedToolCard } from 'components/patterns/Tools/ToolCards'
import { TOOLS as TOOL_CATALOG } from 'components/patterns/Tools/toolCatalog'

import { useHealthcheck } from 'components/hook/use-healthcheck'
import { extractDomain } from 'helpers/extract-domain'
import analyticsData from '../../data/analytics.json'
import ossData from '../../data/oss.json'

const FIRST_URL = 'https://stripe.com'
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
  if (asNumber) {
    return liveStars
  }
  return typeof liveStars === 'number' && !asNumber
    ? formatCompactCount(liveStars)
    : repo.stars
}

const FEATURES = [
  {
    title: 'Token Efficient by Default',
    description:
      'Return clean markdown instead of HTML noise so your agents spend context budget on meaning, not markup. 80% fewer tokens on average.'
  },
  {
    title: 'Works on Any Website',
    description:
      'Our HTML to markdown converter processes any public URL without the target site needing CDN opt-in or special configuration. The entire web is your dataset.'
  },
  {
    title: 'Built for Agent Workloads',
    description:
      'Purpose-built for AI crawling, summarization, RAG indexing, LangChain, LlamaIndex, and large-scale LLM data preparation.'
  },
  {
    title: 'Streaming Friendly',
    description:
      'Compact markdown payloads move cleanly through queues, workers, and inference services with lower latency than HTML.'
  },
  {
    title: 'Metadata Included',
    description:
      'Pair markdown content with structured metadata — title, description, author, date — for better chunking, ranking, and traceability.'
  },
  {
    title: 'Fast Integration',
    description:
      'Ship quickly from browser demos, server workers, or SDK clients. One URL in, clean markdown out. Minimal glue code.'
  },
  {
    title: 'Flexible Scope Control',
    description:
      'Extract the whole page, narrow to a CSS selector like main or article, or combine multiple selectors with fallback arrays for precise content targeting.'
  },
  {
    title: 'YAML Frontmatter',
    description:
      'Enable the meta parameter to prepend structured YAML frontmatter — title, author, date, description — for downstream chunking and traceability.'
  },
  {
    title: 'Shortcut Endpoint',
    description:
      'Skip the full API call. Use markdown.microlink.io/{url} for direct markdown output — ideal for quick scripts, curl one-liners, and pipeline prototyping.'
  }
]

const PLAYGROUND_TOOL_PATHS = ['/tools/tools']
const MARKDOWN_TOOLS =
  TOOL_CATALOG.find(section => section.category === 'Markdown')?.tools ?? []
const PLAYGROUND_TOOLS = PLAYGROUND_TOOL_PATHS.map(path =>
  MARKDOWN_TOOLS.find(tool => tool.href === path)
).filter(Boolean)

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)

const Caption = withTitle(CaptionBase)

const NerdButton = styled(Button).attrs({ variant: 'black' })`
  &&& {
    ${theme({
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      height: space[4],
      minHeight: space[4],
      maxHeight: space[4],
      width: space[4],
      minWidth: space[4],
      p: 0,
      borderRadius: 4,
      flexShrink: 0,
      whiteSpace: 'nowrap'
    })};
    background: ${p => (p.$active ? colors.black : 'transparent')};
    border: ${borders[1]} ${p => (p.$active ? colors.black : colors.black10)};
    box-shadow: none;
    color: ${p => (p.$active ? colors.white : colors.gray6)};
    transition: background ${transition.short}, border-color ${transition.short},
      color ${transition.short}, box-shadow ${transition.short};
  }

  &&&:hover:not(:disabled) {
    background: ${p => (p.$active ? colors.black : colors.gray1)};
    border-color: ${p => (p.$active ? colors.gray7 : colors.black20)};
    color: ${p => (p.$active ? colors.white : colors.gray7)};
    box-shadow: none;
  }

  &&&:focus-visible {
    outline: ${borders[2]} ${colors.black40};
    outline-offset: ${radii[1]};
  }
`

const DocumentViewer = styled('div')`
  ${theme({
    borderRadius: 3,
    bg: 'white',
    display: 'flex',
    flexDirection: 'column'
  })};
  overflow: hidden;
  border: ${borders[1]} ${colors.black10};
  box-shadow: 0 2px 8px ${colors.black05}, 0 12px 32px ${colors.black05};
`

const DocumentHeader = styled(Flex)`
  ${theme({
    bg: 'white',
    alignItems: 'center',
    px: [2, 2, 3, 3],
    py: '10px',
    gap: 2,
    flexShrink: 0,
    minWidth: '0'
  })};
  border-bottom: ${borders[1]} ${colors.black05};
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
  transition: color ${transition.short}, background ${transition.short};

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
    outline-offset: ${radii[1]};
  }
`

const caretPulse = keyframes`
  0%, 100% {
    border-color: ${colors.black10};
    background: ${colors.white};
  }
  50% {
    border-color: ${colors.black20};
    background: ${colors.gray0};
  }
`

const SourceBar = styled(Flex)`
  ${theme({
    flex: 1,
    bg: 'white',
    borderRadius: 2,
    alignItems: 'center',
    px: 2,
    gap: 2,
    minWidth: '0',
    height: space[4]
  })};
  border: ${borders[1]} transparent;
  position: relative;
  transition: border-color ${transition.medium}, background ${transition.medium};

  ${({ $glowing }) =>
    $glowing &&
    css`
      border-color: ${colors.black10};
      background: ${colors.gray0};
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
      border-color: ${colors.black10};
      background: ${colors.gray0};
    `}

  &:focus-within {
    border-color: ${colors.black20};
    background: ${colors.gray0};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    animation: none;
  }
`

const SourceInput = styled('input')`
  ${theme({
    bg: 'transparent',
    p: 0,
    m: 0,
    flex: 1,
    minWidth: '0',
    fontSize: 0,
    fontFamily: 'sans',
    letterSpacing: 0,
    fontWeight: 'bold'
  })};
  border: none;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  color: ${({ $active }) => ($active ? colors.black : colors.black80)};
  text-align: left;
  transition: color ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  caret-color: ${colors.black};

  &::selection {
    background: ${colors.black20};
    color: ${colors.black};
  }

  &:focus {
    outline: none;
    color: ${colors.black};
    font-weight: 400;
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

const SourcePrompt = styled('span')`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    flexShrink: 0,
    mr: 1,
    fontSize: 0,
    fontFamily: 'sans',
    letterSpacing: 0
  })};
  background-image: linear-gradient(
    135deg,
    ${colors.orange7},
    ${colors.orange9}
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
  opacity: ${p => (p.$visible ? 1 : 0)};
  transform: translateX(${p => (p.$visible ? 0 : space[1])});

  .source-prompt__arrow {
    ${theme({
      display: 'inline-flex',
      alignItems: 'center',
      mr: 1,
      fontSize: 1,
      lineHeight: 0,
      mt: 1
    })};
    background-image: linear-gradient(
      135deg,
      ${colors.orange7},
      ${colors.orange9}
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ${addressPromptArrowNudge} 1.2s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .source-prompt__arrow {
      animation: none;
    }
  }
`

const DocumentFooter = styled(Flex)`
  ${theme({
    bg: 'gray0',
    px: [2, 3, 3, 3],
    py: '10px',
    gap: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    minWidth: '0'
  })};
  border-top: ${borders[1]} ${colors.black05};
`

const WordCountBadge = styled('span')`
  ${theme({
    fontSize: '11px',
    fontFamily: 'sans',
    color: 'black40',
    letterSpacing: 0,
    fontWeight: 'bold',
    flexShrink: 0
  })};
  white-space: nowrap;
`

const MarkdownContentArea = styled('pre')`
  ${theme({
    m: 0,
    p: 3,
    fontFamily: 'mono',
    fontSize: 0,
    lineHeight: 2,
    color: 'black80'
  })};
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-word;
  -webkit-overflow-scrolling: touch;

  .md-heading {
    font-weight: 700;
  }

  .md-link {
    color: ${colors.blue7};
  }

  .md-bold {
    font-weight: 700;
    color: ${colors.black};
  }

  .md-list {
    color: ${colors.black60};
  }

  .md-meta-fence {
    color: ${colors.black40};
  }

  .md-meta-key {
    font-weight: 700;
    color: rgba(0, 0, 0, 0.8);
  }

  .md-meta-value {
    color: ${colors.blue7};
  }
`

const MarkdownOverlay = styled('div')`
  ${theme({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })};
  background: ${({ $dim }) => ($dim ? colors.black60 : 'transparent')};
  pointer-events: none;
`

const Spinner = styled('svg')`
  animation: ${rotate} 1.4s linear infinite;
`

const SpinnerCircle = styled('circle')`
  animation: ${dash} 1.4s ease-in-out infinite;
  stroke: ${colors.white90};
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
  z-index: 10;
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
    background: ${colors.orange0};
    color: ${colors.black};
    outline: none;
  }

  & + & {
    border-top: ${borders[1]} ${colors.black10};
  }
`

const ErrorInline = styled('div')`
  ${theme({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    px: 4,
    bg: 'white'
  })};
  z-index: 2;
`

const ErrorDismissButton = styled('button')`
  ${theme({
    bg: 'transparent',
    borderRadius: 2,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 1,
    color: 'black50',
    fontSize: 0,
    fontFamily: 'sans',
    fontWeight: 'bold',
    mt: 3,
    px: 3,
    py: 2
  })};
  border: ${borders[1]} ${colors.black10};
  cursor: pointer;
  transition: background ${transition.short}, color ${transition.short},
    border-color ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: ${colors.gray1};
    color: ${colors.black80};
    border-color: ${colors.black20};
  }

  &:focus-visible {
    outline: ${borders[2]} ${colors.black40};
    outline-offset: ${radii[1]};
  }
`

const countWords = text => {
  if (!text) return 0
  return text.split(/\s+/).filter(Boolean).length
}

const estimateTokens = text => {
  if (!text) return 0

  const chunks = text.match(/\b\w+\b|[^\w\s]/g)
  if (!chunks) return 0

  return Math.ceil(chunks.length * 1.15)
}

const formatCompactNumber = n => {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return `${n}`
}

const formatCompactNumberRound = n => {
  if (n >= 10000) return `${Math.round(n / 1000)}k`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return `${n}`
}

const useIsSmallMobile = () => {
  const [small, setSmall] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 30em)')
    setSmall(mq.matches)
    const handler = e => setSmall(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return small
}

const COUNTER_DURATION_MS = 900
const COUNTER_STEPS = 20

const useAnimatedCount = target => {
  const [display, setDisplay] = useState(0)
  const prevRef = useRef(0)
  useEffect(() => {
    if (target === 0) {
      setDisplay(0)
      prevRef.current = 0
      return
    }
    const from = prevRef.current
    const diff = target - from
    if (diff === 0) return
    let step = 0
    const interval = setInterval(() => {
      step++
      if (step >= COUNTER_STEPS) {
        setDisplay(target)
        prevRef.current = target
        clearInterval(interval)
      } else {
        const progress = step / COUNTER_STEPS
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(Math.round(from + diff * eased))
      }
    }, COUNTER_DURATION_MS / COUNTER_STEPS)
    return () => clearInterval(interval)
  }, [target])
  return display
}

const ensureProtocol = value => {
  const trimmed = value.trim()
  if (!trimmed) return trimmed
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

const stripProtocol = url => url.replace(/^https?:\/\//i, '')
const stripForDisplay = url => stripProtocol(url).replace(/\?.*$/, '')

const MAX_HISTORY = 6

const HERO_LAYOUT = {
  maxWidth: ['100%', '100%', '100%', `calc(${layout.large} * 1.7)`],
  mainWidth: '55%',
  secondaryWidth: '45%',
  gap: [1, 1, 1, 5]
}
const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]

const DEFAULT_HISTORY = [
  'https://microlink.io',
  'https://unavatar.io',
  'https://stripe.com'
]

const addToHistory = (history, url) => {
  const filtered = history.filter(u => u !== url)
  return [url, ...filtered].slice(0, MAX_HISTORY)
}

const highlightMarkdown = text => {
  if (!text) return null
  const lines = text.split('\n')
  let inFrontmatter = false
  let fenceCount = 0
  return lines.map((line, i) => {
    if (/^---\s*$/.test(line) && fenceCount < 2) {
      fenceCount++
      inFrontmatter = fenceCount === 1
      if (fenceCount === 2) inFrontmatter = false
      return (
        <span key={i}>
          <span className='md-meta-fence'>{line}</span>
          {'\n'}
        </span>
      )
    }
    if (inFrontmatter) {
      const colonIdx = line.indexOf(':')
      if (colonIdx > 0) {
        return (
          <span key={i}>
            <span className='md-meta-key'>{line.slice(0, colonIdx)}</span>:
            <span className='md-meta-value'>{line.slice(colonIdx + 1)}</span>
            {'\n'}
          </span>
        )
      }
    }
    if (/^#{1,6}\s/.test(line)) {
      return (
        <span key={i}>
          <span className='md-heading'>{line}</span>
          {'\n'}
        </span>
      )
    }
    if (/^[-*]\s/.test(line)) {
      return (
        <span key={i}>
          <span className='md-list'>{line.charAt(0)}</span>
          {line.slice(1)}
          {'\n'}
        </span>
      )
    }
    return (
      <span key={i}>
        {line}
        {'\n'}
      </span>
    )
  })
}

const STREAM_CHARS_PER_FRAME = 12
const STREAM_CHARS_PER_FRAME_FAST = 120
const STREAM_FRAME_MS = 33
const STREAM_FAST_AFTER_WORDS = 200

const Hero = function Hero ({ onRequestTiming, heroLayout = HERO_LAYOUT }) {
  const [inputUrl, setInputUrl] = useState(FIRST_URL)
  const [isFocused, setIsFocused] = useState(false)
  const [history, setHistory] = useState(DEFAULT_HISTORY)
  const inputRef = useRef(null)
  const [markdownContent, setMarkdownContent] = useState('')
  const [displayedContent, setDisplayedContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isCopied, setIsCopied] = useState(false)
  const [isGlowing, setIsGlowing] = useState(false)
  const [showNerdStats, setShowNerdStats] = useState(false)
  const [nerdStats, setNerdStats] = useState(null)
  const [nerdQuery, setNerdQuery] = useState(null)
  const [nerdResponse, setNerdResponse] = useState(null)
  const [isAttractMode, setIsAttractMode] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [navStack, setNavStack] = useState(['https://stripe.com'])
  const [navIndex, setNavIndex] = useState(0)
  const abortRef = useRef(null)
  const copyTimerRef = useRef(null)
  const hasContentRef = useRef(false)
  const skipBlurRef = useRef(false)
  const fetchResolverRef = useRef(null)
  const streamRef = useRef(null)

  useEffect(() => {
    if (!markdownContent) {
      setDisplayedContent('')
      return
    }

    if (streamRef.current) clearTimeout(streamRef.current)

    let pos = 0
    const text = markdownContent

    let fastThreshold = text.length
    let wordCount = 0
    for (let i = 0; i < text.length; i++) {
      if (/\s/.test(text[i]) && i > 0 && !/\s/.test(text[i - 1])) {
        wordCount++
        if (wordCount >= STREAM_FAST_AFTER_WORDS) {
          fastThreshold = i
          break
        }
      }
    }

    const step = () => {
      const chunkSize =
        pos >= fastThreshold
          ? STREAM_CHARS_PER_FRAME_FAST
          : STREAM_CHARS_PER_FRAME
      pos = Math.min(pos + chunkSize, text.length)
      setDisplayedContent(text.slice(0, pos))
      if (pos < text.length) {
        streamRef.current = setTimeout(step, STREAM_FRAME_MS)
      } else {
        streamRef.current = null
      }
    }

    streamRef.current = setTimeout(step, STREAM_FRAME_MS)

    return () => {
      if (streamRef.current) clearTimeout(streamRef.current)
    }
  }, [markdownContent])

  const DEMO_URLS = ['unavatar.io', 'microlink.io']

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
        await delay(130)
        if (check()) return false
        setInputUrl('https://' + url.slice(0, i))
      }
      await delay(250)
      setIsGlowing(false)
      return true
    }

    const run = async () => {
      // Initial load for first URL
      fetchMarkdown('https://stripe.com')
      await delay(3200)
      if (check()) return

      for (let i = 0; i < DEMO_URLS.length; i++) {
        const url = DEMO_URLS[i]
        if (check()) return

        if (i === 0) {
          setIsGlowing(true)
          await delay(250)
          if (check()) return
        }

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
        const fetchDone = new Promise(resolve => {
          fetchResolverRef.current = resolve
        })
        fetchMarkdown(normalized)

        await Promise.race([fetchDone, delay(15000)])
        if (check()) return

        if (i < DEMO_URLS.length - 1) {
          await delay(6000)
          if (check()) return
          setIsGlowing(true)
          await delay(250)
          if (check()) return
          setInputUrl('')
        } else {
          await delay(4000)
          if (check()) return
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
      if (fetchResolverRef.current) {
        fetchResolverRef.current()
        fetchResolverRef.current = null
      }
    }
  }, [hasInteracted])

  const apiUrl = `https://markdown.microlink.io/${stripProtocol(inputUrl)}`

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

  const fetchMarkdown = useCallback(
    async url => {
      if (abortRef.current) abortRef.current.abort()
      abortRef.current = new window.AbortController()
      if (streamRef.current) {
        clearTimeout(streamRef.current)
        streamRef.current = null
      }

      setIsLoading(true)
      setError(null)
      setShowNerdStats(false)

      const t0 = Date.now()

      try {
        const res = await window.fetch(
          `https://api.microlink.io?url=${encodeURIComponent(
            url
          )}&data.markdown.attr=markdown&meta=false`,
          { signal: abortRef.current.signal }
        )
        const json = await res.json()
        const elapsedMs = Date.now() - t0

        if (!res.ok) {
          const message =
            res.status === 429
              ? 'Rate limit reached — try again in a moment.'
              : json.message || `Error ${res.status}`
          setError(message)
          setIsLoading(false)
          return
        }

        onRequestTiming?.(elapsedMs, url)

        const stats = extractNerdStats(res.headers)
        setNerdStats(stats)
        setNerdQuery(
          buildMqlQuery(url, {
            data: { markdown: { attr: 'markdown' } },
            meta: false
          })
        )
        setNerdResponse(JSON.stringify(json.data, null, 2))

        const md = json?.data?.markdown
        if (md) {
          hasContentRef.current = true
          setMarkdownContent(typeof md === 'string' ? md : JSON.stringify(md))
        }
        setIsLoading(false)
        if (fetchResolverRef.current) {
          fetchResolverRef.current()
          fetchResolverRef.current = null
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong.')
        }
        setIsLoading(false)
        if (fetchResolverRef.current) {
          fetchResolverRef.current()
          fetchResolverRef.current = null
        }
      }
    },
    [onRequestTiming]
  )

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
    fetchMarkdown(normalized)
  }

  const handleBack = () => {
    if (navIndex === 0) return
    stopAttract()
    const newIndex = navIndex - 1
    const url = navStack[newIndex]
    setNavIndex(newIndex)
    setInputUrl(url)
    fetchMarkdown(url)
  }

  const handleForward = () => {
    if (navIndex >= navStack.length - 1) return
    stopAttract()
    const newIndex = navIndex + 1
    const url = navStack[newIndex]
    setNavIndex(newIndex)
    setInputUrl(url)
    fetchMarkdown(url)
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
        fetchMarkdown(normalized)
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
          maxWidth: heroLayout.maxWidth,
          mx: 'auto',
          flexDirection: ['column', 'column', 'column', 'row'],
          alignItems: ['center', 'center', 'center', 'stretch'],
          gap: heroLayout.gap
        })}
      >
        <Flex
          css={theme({
            flexDirection: 'column',
            width: ['100%', '100%', '100%', heroLayout.secondaryWidth],
            justifyContent: 'center',
            alignItems: ['center', 'center', 'center', 'flex-start']
          })}
        >
          <Heading
            css={theme({
              px: [2, 3, 4, 0],
              fontSize: [3, 3, 4, 4],
              maxWidth: ['100%', '100%', '100%', '640px'],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            URL to <span style={{ whiteSpace: 'nowrap' }}>markdown API</span>{' '}
            <span style={{ whiteSpace: 'nowrap' }}>for AI agents</span>
          </Heading>
          <Caption
            css={theme({
              pt: [3, 3, 4, 4],
              px: [1, 2, 4, 0],
              maxWidth: ['100%', layout.small, layout.small, '640px'],
              fontSize: [2, 2, 2, 2],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            The URL to markdown API that converts any web page to clean markdown
            with 80% fewer tokens than raw HTML. Built for AI agent crawling,
            LLM ingestion, and RAG pipelines.
          </Caption>
          <Flex
            css={theme({
              pt: [3, 3, 4, 4],
              px: [4, 4, 4, 0],
              width: '100%',
              fontSize: [2, 2, 3, 3],
              justifyContent: ['center', 'center', 'center', 'flex-start']
            })}
          >
            <ArrowLink href='/docs/guides/markdown'>Get Started</ArrowLink>
          </Flex>
        </Flex>
        <Flex
          css={theme({
            width: ['100%', '100%', '100%', heroLayout.mainWidth],
            pt: [4, 4, 5, 0],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          })}
        >
          <Box
            css={theme({
              display: 'inline-flex',
              flexDirection: 'column',
              maxWidth: ['100%', '95%', '85%', '100%'],
              width: ['100%', '95%', '85%', '100%'],
              position: 'relative'
            })}
          >
            <DocumentViewer
              onClick={e => {
                if (
                  !e.target.closest('input') &&
                  !e.target.closest('[role="listbox"]') &&
                  !e.target.closest('.document-footer')
                ) {
                  setIsFocused(false)
                }
              }}
            >
              <DocumentHeader>
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
                <SourceBar
                  $glowing={isGlowing}
                  $active={isAttractMode}
                  $isPulsing={isPulsing}
                >
                  <svg
                    width='14'
                    height='14'
                    viewBox='0 0 24 24'
                    fill='none'
                    aria-hidden='true'
                    css={theme({ flexShrink: 0, color: 'black30' })}
                  >
                    <circle
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='1.5'
                    />
                    <path
                      d='M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z'
                      stroke='currentColor'
                      strokeWidth='1.5'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                  <SourceInput
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
                    aria-label='Source URL'
                    spellCheck={false}
                    autoComplete='off'
                    autoCorrect='off'
                    autoCapitalize='off'
                  />
                  <SourcePrompt
                    $visible={!isFocused && !hasInteracted}
                    aria-hidden='true'
                  >
                    <span className='source-prompt__arrow'>←</span>
                    Type any URL
                  </SourcePrompt>

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
                </SourceBar>
                <NerdButton
                  $active={showNerdStats}
                  type='button'
                  aria-label={
                    showNerdStats ? 'Hide nerd stats' : 'Show nerd stats'
                  }
                  aria-pressed={showNerdStats}
                  onClick={() => {
                    stopAttract()

                    if (!nerdStats) {
                      setShowNerdStats(true)
                      fetchMarkdown(inputUrl)
                      return
                    }

                    setShowNerdStats(s => !s)
                  }}
                >
                  <TerminalIcon size={16} aria-hidden='true' />
                </NerdButton>
              </DocumentHeader>
              <Box
                css={theme({
                  position: 'relative',
                  height: ['240px', '280px', '320px', '360px'],
                  overflow: 'hidden'
                })}
              >
                <MarkdownContentArea
                  css={theme({
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%'
                  })}
                >
                  {highlightMarkdown(displayedContent)}
                </MarkdownContentArea>
                {isLoading && (
                  <MarkdownOverlay
                    $dim={hasContentRef.current}
                    aria-label='Loading markdown'
                    role='status'
                  >
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
                  </MarkdownOverlay>
                )}
                {showNerdStats && nerdStats && (
                  <NerdStatsOverlay
                    stats={nerdStats}
                    mqlQuery={nerdQuery}
                    responseData={nerdResponse}
                  />
                )}
                {error && (
                  <ErrorInline role='alert' aria-label='Error'>
                    <svg
                      width='20'
                      height='20'
                      viewBox='0 0 20 20'
                      fill='none'
                      aria-hidden='true'
                    >
                      <circle
                        cx='10'
                        cy='10'
                        r='9'
                        stroke={colors.red5}
                        strokeWidth='1.5'
                      />
                      <path
                        d='M10 6v4M10 13v.5'
                        stroke={colors.red5}
                        strokeWidth='1.5'
                        strokeLinecap='round'
                      />
                    </svg>
                    <Text
                      as='p'
                      css={theme({
                        fontFamily: 'sans',
                        color: 'black60',
                        fontSize: 1,
                        lineHeight: 2,
                        m: 0,
                        pt: 2,
                        textAlign: 'center',
                        maxWidth: '300px'
                      })}
                    >
                      {error}
                    </Text>
                    <ErrorDismissButton
                      type='button'
                      aria-label='Dismiss error'
                      onClick={() => setError(null)}
                    >
                      Dismiss
                    </ErrorDismissButton>
                  </ErrorInline>
                )}
              </Box>
              <DocumentFooter className='document-footer'>
                <Text
                  as='span'
                  css={theme({
                    fontSize: ['12px', '12px', '13px', '13px'],
                    fontFamily: 'mono',
                    letterSpacing: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    minWidth: '0',
                    color: 'black80'
                  })}
                >
                  {apiUrl}
                </Text>
                {displayedContent && (
                  <WordCountBadge>
                    {formatCompactNumber(countWords(displayedContent))} words
                    {' · '}
                    {formatCompactNumber(estimateTokens(displayedContent))}{' '}
                    tokens
                  </WordCountBadge>
                )}
                <CopyButton
                  type='button'
                  onClick={handleCopy}
                  aria-label={isCopied ? 'Copied!' : 'Copy API URL'}
                >
                  {isCopied ? (
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
                  ) : (
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
              </DocumentFooter>
            </DocumentViewer>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

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
        if (history.length < 3) {
          return
        }
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
        {hasValue ? (
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
        ) : (
          '—'
        )}
      </Subhead>
      <Caption forwardedAs='div' css={theme({ color: 'white60', pt: 1 })}>
        <Caps css={theme({ fontWeight: 'bold', fontSize: ['12px', 1, 1, 1] })}>
          {hasValue
            ? isCache
              ? `${domain} · cached`
              : `${domain} · cold`
            : 'loading\u2026'}
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
          Get clean markdown back
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
          ${colors.orange9} 0%,
          ${colors.orange9} 48%,
          ${colors.orange8} 48%,
          ${colors.orange8} 52%,
          ${colors.orange7} 52%,
          ${colors.orange7} 65%,
          ${colors.orange6} 65%,
          ${colors.orange6} 79%,
          ${colors.orange5} 79%,
          ${colors.orange5} 100%
        )`,
        borderTop: `${borders[1]} ${colors.white20}`,
        borderBottom: `${borders[1]} ${colors.white20}`
      })}
      blockOne={blockOne}
      blockTwo={blockTwo}
    />
  )
}

const REPOS = [
  {
    name: 'browserless',
    org: 'microlinkhq',
    description:
      'The headless Chrome/Chromium driver on top of Puppeteer. Fast, scalable, and reliable browser automation.',
    language: 'JavaScript',
    languageColor: colors.yellow3,
    stars: '1.8k',
    primary: true
  },
  {
    name: 'html-get',
    org: 'microlinkhq',
    description:
      'Get the HTML from any website, using prerendering when necessary.',
    language: 'JavaScript',
    languageColor: colors.yellow3,
    stars: '100'
  },
  {
    name: 'metascraper',
    org: 'microlinkhq',
    description:
      'A library to easily scrape metadata from an article on the web using Open Graph, JSON+LD, and HTML metadata.',
    language: 'JavaScript',
    languageColor: colors.yellow3,
    stars: '2.3k'
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
          Built on <span css={theme({ color: 'orange7' })}>open source</span>,
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
            textAlign: ['center', 'center', 'center', 'left']
          })}
        >
          The Microlink markdown engine is powered by battle-tested open source
          libraries used by thousands of developers worldwide. Explore the code,
          contribute, or run it yourself.
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

const livePulse = keyframes`
  0%, 62% { color: inherit; }
  70%, 90% { color: ${colors.orange7}; }
  100% { color: inherit; }
`

const LiveText = styled('span')`
  animation: ${livePulse} 1.5s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    color: ${colors.orange7};
  }
`

const Playground = () => {
  return (
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
          Skip the setup. Our interactive markdown tool lets you test the API
          instantly — paste any URL, configure options, and see the result in
          real time.
        </Caption>

        <Flex
          css={theme({
            width: '100%',
            justifyContent: 'center',
            maxWidth: layout.large,
            pt: 4,
            gap: [4, 4, 4, 4],
            flexDirection: ['column', 'column', 'row', 'row'],
            alignItems: ['center', 'center', 'center', 'center']
          })}
        >
          {PLAYGROUND_TOOLS.map(tool => (
            <Box
              key={tool.href}
              css={theme({
                width: '100%'
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
}

const TokenSavings = () => (
  <section
    id='token-savings'
    css={{
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      backgroundImage: `radial-gradient(
        circle at center right,
        ${colors.orange9} 0%,
        ${colors.orange9} 48%,
        ${colors.orange8} 48%,
        ${colors.orange8} 52%,
        ${colors.orange7} 52%,
        ${colors.orange7} 65%,
        ${colors.orange6} 65%,
        ${colors.orange6} 79%,
        ${colors.orange5} 79%,
        ${colors.orange5} 100%
      )`,
      borderTop: `${borders[1]} ${colors.white20}`,
      borderBottom: `${borders[1]} ${colors.white20}`
    }}
  >
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
        80% fewer tokens per page{' '}
        <span css={theme({ display: 'block', color: 'white60' })}>
          5x more content per context window
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
        A markdown converter for LLMs: 20,000 HTML tokens becomes 4,000 markdown
        tokens.
        <br />
        Feed more content into every LLM call and cut inference costs at scale.
      </Caption>
      <ArrowLink
        href='/docs/guides/markdown'
        css={theme({
          fontSize: ['22px', '24px', '26px', '26px'],
          color: 'white'
        })}
        style={{ color: 'white' }}
      >
        See how it works
      </ArrowLink>
    </Flex>
  </section>
)

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
const CLIENTS_STATS_VALUE_FONT_SIZE = [3, 3, '42px']
const CLIENTS_STATS_LABEL_FONT_SIZE = [0, 1, 1, 1]

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
                fontSize: CLIENTS_STATS_VALUE_FONT_SIZE,
                fontWeight: 'bold',
                color: 'black'
              })}
            >
              {value}
            </Subhead>
            <Caps
              css={theme({
                pt: 1,
                fontSize: CLIENTS_STATS_LABEL_FONT_SIZE,
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
            css={theme({
              fontWeight: 'bold',
              fontSize: 1,
              color: 'black'
            })}
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
  ${theme({ color: 'orange7' })};
`

const TypedCursor = styled('span')`
  ${theme({ display: 'inline-block', ml: 1, color: 'orange7' })};
  animation: ${cursorBlink} 1s step-end infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const CodeExample = () => {
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

    const timeoutId = setTimeout(() => {
      if (hasTypedWholeWord) {
        setIsDeleting(true)
        return
      }

      if (hasDeletedWholeWord) {
        setIsDeleting(false)
        setLanguageIndex(prev => (prev + 1) % CODE_EXAMPLE_LANGUAGES.length)
        return
      }

      setTypedLanguage(prev =>
        isDeleting
          ? currentLanguage.slice(0, Math.max(0, prev.length - 1))
          : currentLanguage.slice(0, prev.length + 1)
      )
    }, delay)

    return () => clearTimeout(timeoutId)
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
            URL to markdown API <LineBreak /> in{' '}
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
            Microlink URL to Markdown API delivers enterprise-grade URL to
            markdown conversion through a developer-friendly REST API endpoint.
          </Caption>
          <Flex
            css={theme({
              pt: [3, 3, 4, 4],
              width: '100%',
              fontSize: [2, 2, 3, 3],
              justifyContent: ['center', 'center', 'center', 'flex-start']
            })}
          >
            <ArrowLink href='/docs/guides/markdown'>Read the docs</ArrowLink>
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
                url: 'https://stripe.com/docs/api',
                data: {
                  markdown: {
                    attr: 'markdown'
                  }
                },
                embed: 'markdown'
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}

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
        <polyline points='22 12 18 12 15 21 9 3 6 12 2 12' />
      </svg>
    ),
    title: '80% fewer tokens',
    description:
      'Markdown reduces token usage by 80% compared to raw HTML. A 20,000-token page becomes 4,000 tokens — fit 5x more content into every LLM context window.'
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
        <circle cx='11' cy='11' r='8' />
        <path d='M21 21l-4.35-4.35' />
      </svg>
    ),
    title: 'Flexible scope control',
    description:
      'Extract the whole page, narrow to a CSS selector like main or article, or combine multiple selectors with fallback arrays for precise content targeting.'
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
        <path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' />
        <polyline points='14 2 14 8 20 8' />
        <line x1='16' y1='13' x2='8' y2='13' />
        <line x1='16' y1='17' x2='8' y2='17' />
        <polyline points='10 9 9 9 8 9' />
      </svg>
    ),
    title: 'YAML frontmatter metadata',
    description:
      'Enable the meta parameter to get title, author, date, description, word count, and reading time as structured YAML frontmatter prepended to the markdown output.'
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
        <polyline points='12 6 12 12 16 14' />
      </svg>
    ),
    title: 'Sub-second cached responses',
    description:
      'Cached responses return in milliseconds from 240+ Cloudflare edge locations. Configure TTL caching rules to keep your content fresh with minimal latency.'
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
    flexShrink: 0,
    color: 'orange7'
  })};
`

const CAP_DEFAULT_URL = 'https://github.com/trending'

const SplitPaneLabel = styled(Flex)`
  ${theme({
    px: 2,
    py: 2,
    fontSize: 1,
    fontWeight: 'bold',
    fontFamily: 'sans',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: ['wrap', 'wrap', 'nowrap', 'nowrap'],
    gap: 1,
    flexShrink: 0
  })};
`

const HtmlContentArea = styled('pre')`
  ${theme({
    m: 0,
    p: 3,
    fontFamily: 'mono',
    fontSize: 0,
    lineHeight: 2,
    color: 'black80'
  })};
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-all;
  -webkit-overflow-scrolling: touch;
`

const Capabilities = () => {
  const [capUrl, setCapUrl] = useState('')
  const [capFocused, setCapFocused] = useState(false)
  const [capMarkdown, setCapMarkdown] = useState('')
  const [capDisplayed, setCapDisplayed] = useState('')
  const [capHtml, setCapHtml] = useState('')
  const [capHtmlDisplayed, setCapHtmlDisplayed] = useState('')
  const [capLoading, setCapLoading] = useState(false)
  const [capHtmlLoading, setCapHtmlLoading] = useState(false)
  const [capError, setCapError] = useState(null)
  const capAbortRef = useRef(null)
  const capHtmlAbortRef = useRef(null)
  const capInputRef = useRef(null)
  const capHasContentRef = useRef(false)
  const [capHasInteracted, setCapHasInteracted] = useState(false)
  const capSectionRef = useRef(null)
  const capTriggeredRef = useRef(false)
  const capTypeTimerRef = useRef(null)

  const isSmallMobile = useIsSmallMobile()
  const capFmt = isSmallMobile ? formatCompactNumberRound : formatCompactNumber

  const capMdWords = countWords(capDisplayed)
  const capMdTokens = estimateTokens(capDisplayed)
  const capHtmlWords = countWords(capHtmlDisplayed)
  const capHtmlTokens = estimateTokens(capHtmlDisplayed)

  const animatedCapMdWords = useAnimatedCount(capMdWords)
  const animatedCapMdTokens = useAnimatedCount(capMdTokens)
  const animatedCapHtmlWords = useAnimatedCount(capHtmlWords)
  const animatedCapHtmlTokens = useAnimatedCount(capHtmlTokens)

  useEffect(() => {
    setCapDisplayed(capMarkdown || '')
  }, [capMarkdown])

  useEffect(() => {
    setCapHtmlDisplayed(capHtml || '')
  }, [capHtml])

  const fetchCapMarkdown = useCallback(async url => {
    if (capAbortRef.current) capAbortRef.current.abort()
    if (capHtmlAbortRef.current) capHtmlAbortRef.current.abort()
    capAbortRef.current = new window.AbortController()
    capHtmlAbortRef.current = new window.AbortController()
    setCapLoading(true)
    setCapHtmlLoading(true)
    setCapError(null)

    const htmlPromise = window
      .fetch(
        `https://api.microlink.io/?data.html.attr=html&meta=false&url=${encodeURIComponent(
          url
        )}`,
        { signal: capHtmlAbortRef.current.signal }
      )
      .then(r => {
        if (r.status === 429) {
          return { error: 'Rate limit reached — try again in a moment.' }
        }
        return r.json()
      })
      .then(json => {
        if (json?.error) return json
        const html = json?.data?.html
        return {
          html: html
            ? typeof html === 'string'
              ? html
              : JSON.stringify(html)
            : ''
        }
      })
      .catch(err => {
        if (err.name === 'AbortError') return { aborted: true }
        return { error: err.message }
      })

    const mdPromise = window
      .fetch(
        `https://api.microlink.io?url=${encodeURIComponent(
          url
        )}&data.markdown.attr=markdown&meta=true`,
        { signal: capAbortRef.current.signal }
      )
      .then(r => {
        if (r.status === 429) {
          return { error: 'Rate limit reached — try again in a moment.' }
        }
        return r.json().then(json => {
          if (!r.ok) return { error: json.message || `Error ${r.status}` }
          const md = json?.data?.markdown
          return {
            md: md ? (typeof md === 'string' ? md : JSON.stringify(md)) : ''
          }
        })
      })
      .catch(err => {
        if (err.name === 'AbortError') return { aborted: true }
        return { error: err.message || 'Something went wrong.' }
      })

    const [htmlResult, mdResult] = await Promise.all([htmlPromise, mdPromise])

    if (htmlResult.aborted || mdResult.aborted) return

    const error = htmlResult.error || mdResult.error
    if (error) {
      setCapError(error)
      setCapLoading(false)
      setCapHtmlLoading(false)
      return
    }

    if (mdResult.md) {
      capHasContentRef.current = true
      setCapMarkdown(mdResult.md)
    }
    if (htmlResult.html) setCapHtml(htmlResult.html)
    setCapLoading(false)
    setCapHtmlLoading(false)
  }, [])

  useEffect(() => {
    const el = capSectionRef.current
    if (!el) return

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || capTriggeredRef.current) return
        capTriggeredRef.current = true
        observer.disconnect()

        const target = stripProtocol(CAP_DEFAULT_URL)
        let i = 0
        const typeStep = () => {
          i++
          setCapUrl('https://' + target.slice(0, i))
          if (i < target.length) {
            capTypeTimerRef.current = setTimeout(typeStep, 60)
          } else {
            capTypeTimerRef.current = null
            setCapUrl(CAP_DEFAULT_URL)
            fetchCapMarkdown(CAP_DEFAULT_URL)
          }
        }
        capTypeTimerRef.current = setTimeout(typeStep, 300)
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (capTypeTimerRef.current) {
        clearTimeout(capTypeTimerRef.current)
        capTypeTimerRef.current = null
      }
    }
  }, [fetchCapMarkdown])

  const capDisplayValue = capFocused
    ? stripProtocol(capUrl)
    : stripForDisplay(capUrl)

  const submitCapUrl = url => {
    const normalized = ensureProtocol(url)
    setCapUrl(normalized)
    setCapFocused(false)
    fetchCapMarkdown(normalized)
  }

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
          flexDirection: 'column',
          alignItems: 'center',
          gap: [4, 4, 5, 5]
        })}
      >
        <Subhead
          css={theme({
            fontSize: [3, 4, 4, 4],
            textAlign: 'center',
            width: '100%'
          })}
        >
          Any webpage to markdown,
          <LineBreak />
          <span css={theme({ color: 'orange7' })}>one API call away</span>
        </Subhead>
        <Box
          as='figure'
          css={theme({
            width: ['100%', '100%', '85%', '80%'],
            display: 'inline-flex',
            flexDirection: 'column',
            position: 'relative',
            m: 0
          })}
        >
          <DocumentViewer
            ref={capSectionRef}
            onClick={e => {
              if (
                !e.target.closest('input') &&
                !e.target.closest('.document-footer')
              ) {
                setCapFocused(false)
              }
            }}
          >
            <DocumentHeader>
              <SourceBar>
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  aria-hidden='true'
                  css={theme({ flexShrink: 0, color: 'black30' })}
                >
                  <circle
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='1.5'
                  />
                  <path
                    d='M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z'
                    stroke='currentColor'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <SourceInput
                  ref={capInputRef}
                  $active={capFocused}
                  css={css`
                    ${theme({ fontSize: 1 })};
                    text-align: ${capFocused ? 'left' : 'center'};
                  `}
                  type='url'
                  size='1'
                  value={capDisplayValue}
                  onChange={e =>
                    setCapUrl(ensureProtocol(stripProtocol(e.target.value)))
                  }
                  onFocus={() => {
                    setCapFocused(true)
                    setCapHasInteracted(true)
                    if (capTypeTimerRef.current) {
                      clearTimeout(capTypeTimerRef.current)
                      capTypeTimerRef.current = null
                      setCapUrl(CAP_DEFAULT_URL)
                      if (!capHasContentRef.current) {
                        fetchCapMarkdown(CAP_DEFAULT_URL)
                      }
                    }
                  }}
                  onBlur={e => {
                    setTimeout(() => {
                      const normalized = ensureProtocol(e.target.value)
                      setCapUrl(normalized)
                      setCapFocused(false)
                    }, 150)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.target.blur()
                      submitCapUrl(e.target.value)
                    }
                    if (e.key === 'Escape') {
                      e.target.blur()
                      setCapFocused(false)
                    }
                  }}
                  aria-label='Source URL'
                  spellCheck={false}
                  autoComplete='off'
                  autoCorrect='off'
                  autoCapitalize='off'
                />
                <SourcePrompt
                  $visible={!capFocused && !capHasInteracted}
                  aria-hidden='true'
                  css={css`
                    position: absolute;
                    right: ${space[2]};
                    top: 50%;
                    transform: translateY(-50%)
                      ${!capFocused && !capHasInteracted
                        ? ''
                        : `translateX(${space[1]})`};
                    margin: 0;
                    @media (max-width: 40em) {
                      display: none;
                    }
                  `}
                >
                  <span className='source-prompt__arrow'>←</span>
                  Type any URL
                </SourcePrompt>
              </SourceBar>
            </DocumentHeader>
            <Flex css={{ width: '100%', position: 'relative' }}>
              <Box
                css={theme({
                  flex: 1,
                  position: 'relative',
                  height: ['280px', '320px', '380px', '420px'],
                  overflow: 'hidden',
                  borderRight: `${borders[1]} ${colors.black05}`
                })}
              >
                <SplitPaneLabel
                  css={theme({
                    color: 'black80',
                    bg: 'white',
                    borderBottom: `${borders[1]} ${colors.black05}`,
                    position: 'relative',
                    zIndex: 1
                  })}
                >
                  <Box
                    css={theme({
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      bg: 'close',
                      flexShrink: 0
                    })}
                  />
                  Markdown
                  {capDisplayed && (
                    <WordCountBadge
                      css={theme({
                        fontSize: 0,
                        color: 'black60',
                        flexBasis: ['100%', '100%', 'auto', 'auto'],
                        textAlign: 'center'
                      })}
                    >
                      <Box
                        as='span'
                        css={theme({
                          display: ['none', 'none', 'inline', 'inline']
                        })}
                      >
                        ·{' '}
                      </Box>
                      {capFmt(animatedCapMdWords)} words ·{' '}
                      {capFmt(animatedCapMdTokens)} tokens
                    </WordCountBadge>
                  )}
                </SplitPaneLabel>
                <MarkdownContentArea
                  css={theme({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    pt: 5
                  })}
                >
                  {highlightMarkdown(capDisplayed)}
                </MarkdownContentArea>
                {capLoading && (
                  <MarkdownOverlay
                    $dim={capHasContentRef.current}
                    aria-label='Loading markdown'
                    role='status'
                  >
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
                  </MarkdownOverlay>
                )}
              </Box>
              <Box
                css={theme({
                  flex: 1,
                  position: 'relative',
                  height: ['280px', '320px', '380px', '420px'],
                  overflow: 'hidden'
                })}
              >
                <SplitPaneLabel
                  css={theme({
                    color: 'black60',
                    bg: 'gray0',
                    borderBottom: `${borders[1]} ${colors.black05}`,
                    position: 'relative',
                    zIndex: 1
                  })}
                >
                  <Box
                    css={theme({
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      bg: 'red6',
                      flexShrink: 0
                    })}
                  />
                  HTML
                  {capHtmlDisplayed && (
                    <WordCountBadge
                      css={theme({
                        fontSize: 0,
                        color: 'black60',
                        flexBasis: ['100%', '100%', 'auto', 'auto'],
                        textAlign: 'center'
                      })}
                    >
                      <Box
                        as='span'
                        css={theme({
                          display: ['none', 'none', 'inline', 'inline']
                        })}
                      >
                        ·{' '}
                      </Box>
                      {capFmt(animatedCapHtmlWords)} words ·{' '}
                      {capFmt(animatedCapHtmlTokens)} tokens
                    </WordCountBadge>
                  )}
                </SplitPaneLabel>
                <HtmlContentArea
                  css={theme({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    pt: 5
                  })}
                >
                  <code>{capHtmlDisplayed}</code>
                </HtmlContentArea>
                {capHtmlLoading && (
                  <MarkdownOverlay
                    $dim={!!capHtmlDisplayed}
                    aria-label='Loading HTML'
                    role='status'
                  >
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
                  </MarkdownOverlay>
                )}
              </Box>
              {capError && (
                <ErrorInline
                  role='alert'
                  aria-label='Error'
                  css={theme({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 2
                  })}
                >
                  <svg
                    width='20'
                    height='20'
                    viewBox='0 0 20 20'
                    fill='none'
                    aria-hidden='true'
                  >
                    <circle
                      cx='10'
                      cy='10'
                      r='9'
                      stroke={colors.red5}
                      strokeWidth='1.5'
                    />
                    <path
                      d='M10 6v4M10 13v.5'
                      stroke={colors.red5}
                      strokeWidth='1.5'
                      strokeLinecap='round'
                    />
                  </svg>
                  <Text
                    as='p'
                    css={theme({
                      fontFamily: 'sans',
                      color: 'black60',
                      fontSize: 1,
                      lineHeight: 2,
                      m: 0,
                      pt: 2,
                      textAlign: 'center',
                      maxWidth: '300px'
                    })}
                  >
                    {capError}
                  </Text>
                  <ErrorDismissButton
                    type='button'
                    aria-label='Dismiss error'
                    onClick={() => setCapError(null)}
                  >
                    Dismiss
                  </ErrorDismissButton>
                </ErrorInline>
              )}
            </Flex>
          </DocumentViewer>
          <noscript>
            <figcaption style={{ display: 'none' }}>
              Interactive demonstration comparing raw website HTML against
              Microlink's structured Markdown API output. Converting raw HTML
              DOM to Markdown reduces LLM context window token usage by 80%
              while preserving semantic metadata, text, and structure.
            </figcaption>
          </noscript>
        </Box>
        <Box
          css={theme({
            display: 'grid',
            gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr'],
            gap: [3, 3, 4, 4],
            width: ['100%', '100%', '85%', '80%'],
            mx: 'auto'
          })}
        >
          {CAPABILITIES.map(({ icon, title, description }) => (
            <CapabilityItem key={title}>
              <CapabilityIcon>{icon}</CapabilityIcon>
              <Flex css={theme({ flexDirection: 'column', gap: 1 })}>
                <Text
                  as='h3'
                  css={theme({
                    fontWeight: 'bold',
                    fontSize: [1, 1, 2, 2]
                  })}
                >
                  {title}
                </Text>
                <Text css={theme({ fontSize: [0, 0, 1, 1] })}>
                  {description}
                </Text>
              </Flex>
            </CapabilityItem>
          ))}
        </Box>
      </Flex>
    </Container>
  )
}

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
      Free to start, scales when ready
    </Subhead>
    <Caption
      forwardedAs='div'
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      No login required. No credit card needed. URL to markdown API free to use
      — just start calling it.
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
          as='h3'
          css={theme({
            fontSize: ['20px', '20px', '24px', '24px'],
            fontWeight: 'bold',
            m: 0
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
        <Text
          css={theme({
            pt: 2,
            fontSize: [1, 1, '18px', '18px']
          })}
        >
          Markdown API free — 50 requests/day, no login, no credit card.
        </Text>
        <Box css={theme({ pt: 3 })}>
          <PricingCheck>Markdown extraction</PricingCheck>
          <PricingCheck>CSS selector scoping</PricingCheck>
          <PricingCheck>Metadata + YAML frontmatter</PricingCheck>
          <PricingCheck>Adblock & cookie banners</PricingCheck>
          <PricingCheck>Headless browser rendering</PricingCheck>
        </Box>
        <Flex
          css={theme({ pt: 4, fontSize: ['18px', '18px', '20px', '20px'] })}
        >
          <ArrowLink href='/docs/guides/markdown'>Get started free</ArrowLink>
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
          as='h3'
          css={theme({
            fontSize: ['20px', '20px', '24px', '24px'],
            fontWeight: 'bold',
            m: 0
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
            €39
          </Text>
          <Text css={theme({ color: 'black60', fontSize: [0, 0, 1, 1] })}>
            /month
          </Text>
        </Flex>
        <Text
          css={theme({
            pt: 2,
            fontSize: [1, 1, '18px', '18px']
          })}
        >
          46,000 requests/month for production workloads.
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
    ${on + 0.01}%, ${off - 0.01}% { color: ${colors.orange7}; }
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
  ${CTA_SWEEP_PCT + 0.01}%, 100% { color: ${colors.orange7}; }
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
        Get 50&nbsp;requests/day free — our URL to markdown API needs no account
        and no credit card. Just call the API and start converting URLs to
        markdown in seconds.
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
          href='/docs/guides/markdown'
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

const ProductInformation = () => {
  return (
    <Faq
      title='Product Information'
      titleSize={['40px', 4, 5, 5]}
      caption={
        <>
          Everything you need to know about <LineBreak /> Microlink URL to
          markdown API.
        </>
      }
      css={theme({
        pb: [5, 5, 6, 6],
        bg: 'pinky',
        borderTop: `${borders[1]} ${colors.pinkest}`,
        borderBottom: `${borders[1]} ${colors.pinkest}`
      })}
      questions={[
        {
          question: 'What is Microlink Markdown?',
          answer: (
            <>
              <div>
                Microlink Markdown is an extraction API that takes any URL and
                returns clean markdown content ready for AI workflows. It is
                built on the same{' '}
                <Link href='/docs/api/getting-started/overview'>
                  Microlink API
                </Link>{' '}
                surface your team already uses for metadata, screenshots, and
                PDFs.
              </div>
              <div>
                Use it for{' '}
                <Link href='/docs/guides/markdown'>
                  crawling, summarization, and RAG ingestion
                </Link>{' '}
                where clean text beats noisy HTML.
              </div>
            </>
          )
        },
        {
          question: 'Why do AI agents prefer markdown over HTML?',
          answer: (
            <>
              <div>
                HTML pages are padded with navigation bars, script tags, class
                attributes, and styling that carry zero semantic value for AI.
                Markdown's explicit structure lets AI models focus on meaning,
                not markup, which improves comprehension and reduces LLM API
                costs at scale.
              </div>
              <div>
                You can further tune extraction with{' '}
                <Link href='/docs/guides/markdown/choosing-scope#start-with-the-smallest-useful-wrapper'>
                  CSS selector scoping
                </Link>{' '}
                to target only the content your agents need.
              </div>
            </>
          )
        },
        {
          question: 'How much do I save on tokens by converting to markdown?',
          answer: (
            <>
              <div>
                On average, markdown reduces token usage by 80% compared to raw
                HTML. A page costing 20,000 tokens as HTML costs around 4,000
                tokens as markdown. Giving you 5x more content per context
                window.
              </div>
              <div>
                This directly lowers your LLM API costs and increases how much
                information you can process per request. Try it instantly in the{' '}
                <Link href='/tools/tools'>
                  interactive HTML to Markdown tool
                </Link>
                .
              </div>
            </>
          )
        },
        {
          question: 'Does it work on any website?',
          answer: (
            <>
              <div>
                Yes. Microlink extracts markdown from any public URL. The target
                website does not need to natively serve markdown or have any
                special CDN or server-level configuration.
              </div>
              <div>
                Unlike solutions that require opt-in at the infrastructure
                layer, Microlink works on the entire web immediately. See{' '}
                <Link href='/docs/guides/markdown/delivery-and-response#use-a-fast-default-for-production'>
                  delivery and response
                </Link>{' '}
                for production configuration options.
              </div>
            </>
          )
        },
        {
          question: 'Can I control what content is extracted?',
          answer: (
            <>
              <div>
                Absolutely. Use the{' '}
                <Link href='/docs/guides/markdown/choosing-scope#start-with-the-smallest-useful-wrapper'>
                  selector parameter
                </Link>{' '}
                to target specific DOM elements — narrow to main, article, or
                any CSS selector. You can also use fallback arrays that try
                selectors in order.
              </div>
              <div>
                Omit the selector entirely to convert the whole page, or combine
                multiple fields to extract different sections of the same page
                in a single API call.
              </div>
            </>
          )
        },
        {
          question: 'Can I get metadata alongside the markdown?',
          answer: (
            <>
              <div>
                Yes. Set <i>meta: true</i> to prepend a YAML frontmatter block
                with normalized metadata — title, description, author,
                publisher, date, word count, and reading time.
              </div>
              <div>
                This structure supports LLM and RAG pipelines by providing
                source context without additional requests. See{' '}
                <Link href='/metadata'>structured metadata extraction</Link> for
                details.
              </div>
            </>
          )
        },
        {
          question: 'How do I integrate it?',
          answer: (
            <>
              <div>
                In minutes. Visit our{' '}
                <Link href='/docs/guides/markdown'>documentation</Link> for
                interactive playground examples, official{' '}
                <Link href='/docs/mql/getting-started/overview'>
                  MQL client
                </Link>{' '}
                (Node.js, Python, Ruby, Go, etc.), and copy-paste code snippets.
              </div>
              <div>
                Or use the shortcut endpoint markdown.microlink.io/{'<url>'} for
                the simplest possible integration — just an HTTP GET.
              </div>
            </>
          )
        },
        {
          question: 'Where can I see all parameters?',
          answer: (
            <>
              <div>
                Visit the{' '}
                <Link href='/docs/api/getting-started/overview'>
                  Microlink API documentation
                </Link>{' '}
                for parameter details, request examples, and SDK usage guides.
              </div>
              <div>
                Key parameters include{' '}
                <Link href='/docs/api/parameters/embed'>embed</Link> for raw
                markdown output,{' '}
                <Link href='/docs/api/parameters/ttl'>ttl</Link> for cache
                control, and the data extraction rules for{' '}
                <Link href='/docs/guides/markdown/choosing-scope'>
                  CSS selector scoping
                </Link>
                .
              </div>
            </>
          )
        },
        {
          question: 'Is the URL to markdown API free?',
          answer: (
            <>
              <div>
                Yes. The URL to markdown API is free to use with
                50&nbsp;requests per day — no login, no credit card, and no
                setup required. Just call the endpoint and get clean markdown
                back.
              </div>
              <div>
                For production workloads that need higher volume, automatic
                proxy rotation, and priority support, see our{' '}
                <Link href='/#pricing'>Pro plans</Link>.
              </div>
            </>
          )
        },
        {
          question: 'What is a URL to markdown service and how does it work?',
          answer: (
            <>
              <div>
                A URL to markdown service takes any web page URL as input,
                fetches the page with a full headless browser, strips away HTML
                noise (ads, navigation, scripts), and returns clean, structured
                markdown text.
              </div>
              <div>
                Microlink&rsquo;s URL to markdown API does this in a single REST
                call:{' '}
                <i>
                  https://api.microlink.io?url=example.com&data.markdown.attr=markdown
                </i>
                . The result is ready for AI agents, RAG pipelines, or any
                downstream text processing.
              </div>
            </>
          )
        },
        {
          question: 'How do I convert a web page to markdown for AI or LLMs?',
          answer: (
            <>
              <div>
                Send the page URL to the Microlink API with the markdown data
                extraction rule. The API renders the page, removes clutter, and
                returns clean markdown with up to 80% fewer tokens than raw
                HTML.
              </div>
              <div>
                You can also use the shortcut endpoint{' '}
                <code>markdown.microlink.io/&#123;url&#125;</code> for quick
                scripts and pipeline prototyping. Try it live in our{' '}
                <Link href='/tools/url-to-markdown'>
                  interactive URL to Markdown tool
                </Link>
                .
              </div>
            </>
          )
        }
      ]}
    />
  )
}

export const Head = () => (
  <Meta
    title='URL to Markdown API — Convert Any URL to Markdown Free'
    description='Free URL to markdown API — convert any web page to clean markdown with 80% fewer tokens. Built for AI agents, RAG pipelines, and LLM ingestion. No login required.'
    image={cdnUrl('logo/banner.jpeg')}
    structured={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          '@id': 'https://microlink.io/markdown',
          name: 'Microlink URL to Markdown API',
          description:
            'Free URL to markdown API — convert any web page to clean markdown with 80% fewer tokens than raw HTML. Purpose-built for AI agents, RAG ingestion, and LLM content processing at scale.',
          url: 'https://microlink.io/markdown',
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
            priceCurrency: 'USD',
            description:
              'Free tier available for experimentation, 50 requests per day. Pro plans scale for high concurrency.'
          },
          keywords:
            'url to markdown api, url to markdown free, web to markdown api, html to markdown api, url to markdown service, markdown for AI agents, RAG ingestion, LLM preprocessing, token-efficient content',
          interactionStatistic: {
            '@type': 'InteractionCounter',
            interactionType: {
              '@type': 'https://schema.org/LikeAction'
            },
            userInteractionCount: getRepoStarsLabel(REPOS[1], true),
            interactionService: {
              '@type': 'WebSite',
              name: 'GitHub',
              url: `https://github.com/microlinkhq/${REPOS[1].name}`
            }
          },
          about: [
            {
              '@type': 'Thing',
              name: 'HTML to Markdown Conversion',
              sameAs: 'https://en.wikipedia.org/wiki/Markdown'
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
          '@id': 'https://microlink.io/markdown#faq',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is Microlink Markdown?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Microlink Markdown is an extraction API that takes any URL and returns clean markdown content ready for AI workflows. It is built on the same Microlink API surface your team already uses for metadata, screenshots, and PDFs. Use it for crawling, summarization, and RAG ingestion where clean text beats noisy HTML.'
              }
            },
            {
              '@type': 'Question',
              name: 'Why do AI agents prefer markdown over HTML?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'HTML pages are padded with navigation bars, script tags, class attributes, and styling that carry zero semantic value for AI. Markdown’s explicit structure lets AI models focus on meaning, not markup, which improves comprehension and reduces LLM API costs at scale. You can further tune extraction with CSS selector scoping to target only the content your agents need.'
              }
            },
            {
              '@type': 'Question',
              name: 'How much do I save on tokens by converting to markdown?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'On average, markdown reduces token usage by 80% compared to raw HTML. A page costing 20,000 tokens as HTML costs around 4,000 tokens as markdown. Giving you 5x more content per context window. This directly lowers your LLM API costs and increases how much information you can process per request.'
              }
            },
            {
              '@type': 'Question',
              name: 'Does it work on any website?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Microlink extracts markdown from any public URL. The target website does not need to natively serve markdown or have any special CDN or server-level configuration. Unlike solutions that require opt-in at the infrastructure layer, Microlink works on the entire web immediately.'
              }
            },
            {
              '@type': 'Question',
              name: 'Can I control what content is extracted?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Absolutely. Use the selector parameter to target specific DOM elements — narrow to main, article, or any CSS selector. You can also use fallback arrays that try selectors in order. Omit the selector entirely to convert the whole page, or combine multiple fields to extract different sections of the same page in a single API call.'
              }
            },
            {
              '@type': 'Question',
              name: 'Can I get metadata alongside the markdown?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Set meta: true to prepend a YAML frontmatter block with normalized metadata — title, description, author, publisher, date, word count, and reading time. This structure supports LLM and RAG pipelines by providing source context without additional requests.'
              }
            },
            {
              '@type': 'Question',
              name: 'How do I integrate it?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'In minutes. Visit our documentation for interactive playground examples, official SDKs (Node.js, Python, Ruby, Go), and copy-paste code snippets. Or use the shortcut endpoint markdown.microlink.io/{url} for the simplest possible integration — just an HTTP GET.'
              }
            },
            {
              '@type': 'Question',
              name: 'Where can I see all parameters?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Visit the Microlink API documentation for parameter details, request examples, and SDK usage guides. Key parameters include embed for raw markdown output, ttl for cache control, and the data extraction rules for CSS selector scoping.'
              }
            },
            {
              '@type': 'Question',
              name: 'Is the URL to markdown API free?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. The URL to markdown API is free to use with 50 requests per day — no login, no credit card, and no setup required. Just call the endpoint and get clean markdown back. For production workloads that need higher volume, automatic proxy rotation, and priority support, see our Pro plans.'
              }
            },
            {
              '@type': 'Question',
              name: 'What is a URL to markdown service and how does it work?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'A URL to markdown service takes any web page URL as input, fetches the page with a full headless browser, strips away HTML noise (ads, navigation, scripts), and returns clean, structured markdown text. Microlink’s URL to markdown API does this in a single REST call. The result is ready for AI agents, RAG pipelines, or any downstream text processing.'
              }
            },
            {
              '@type': 'Question',
              name: 'How do I convert a web page to markdown for AI or LLMs?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Send the page URL to the Microlink API with the markdown data extraction rule. The API renders the page, removes clutter, and returns clean markdown with up to 80% fewer tokens than raw HTML. You can also use the shortcut endpoint markdown.microlink.io/{url} for quick scripts and pipeline prototyping.'
              }
            }
          ]
        }
      ]
    }}
  />
)

const INITIAL_TIMING_MS = Math.floor(Math.random() * (25 - 14 + 1)) + 14

const MarkdownPage = () => {
  const [timingMs, setTimingMs] = useState(INITIAL_TIMING_MS)
  const [timingUrl, setTimingUrl] = useState('https://stripe.com')
  const [timingHistory, setTimingHistory] = useState([
    { ms: INITIAL_TIMING_MS, url: 'https://stripe.com' }
  ])

  const handleRequestTiming = useCallback((ms, url) => {
    setTimingMs(ms)
    setTimingUrl(url)
    setTimingHistory(prev => {
      const filtered = prev.filter(e => e.url !== url)
      return [{ ms, url }, ...filtered].slice(0, 20)
    })
  }, [])

  return (
    <Layout>
      <Hero onRequestTiming={handleRequestTiming} heroLayout={HERO_LAYOUT} />
      <Timings
        timingMs={timingMs}
        timingUrl={timingUrl}
        timingHistory={timingHistory}
      />
      <Capabilities />
      <CodeExample />
      <Clients />
      <Pricing />
      <OpenSource />
      <Playground />
      <TokenSavings />
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
            The best URL to markdown service,{' '}
            <span
              css={theme({
                display: 'block',
                color: 'orange7',
                width: '100%',
                textAlign: 'left'
              })}
            >
              with no compromises.
            </span>
          </Subhead>
        }
        caption={
          <>
            No more custom scrapers or brittle parsing — our URL to markdown API
            lets you convert any web page to markdown with easy integration via
            the{' '}
            <Link href='/docs/guides/markdown'>
              URL to Markdown API documentation
            </Link>
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

export default MarkdownPage
