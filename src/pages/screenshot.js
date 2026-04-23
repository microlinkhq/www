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
  ReactCompareSlider,
  ReactCompareSliderImage
} from 'react-compare-slider'
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
import {
  ApiErrorTitle,
  ApiErrorBody
} from 'components/patterns/ApiError/ApiError'
import { normalizeApiError } from 'helpers/api-error'
import { extractDomain } from 'helpers/extract-domain'

import analyticsData from '../../data/analytics.json'
import ossData from '../../data/oss.json'

const FIRST_URL = 'https://apple.com'
const FIRST_IMAGE_URL = cdnUrl('www/apple.png')
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
    title: 'Enterprise-Grade Infrastructure',
    description:
      'Production-ready and built for scale. Handle millions of browser sessions with a 99.95% uptime SLA and guaranteed latency limits for business-critical workflows.'
  },
  {
    title: 'Generous Free Tier',
    description:
      'Start capturing immediately. No setup fees, no credit card required, and pay-as-you-grow pricing that scales seamlessly as your infrastructure needs increase.'
  },
  {
    title: 'Global Edge Delivery',
    description:
      'Assets are automatically cached and distributed across 240+ edge locations powered by Cloudflare, ensuring lightning-fast image delivery worldwide.'
  },
  {
    title: 'Language-Agnostic API',
    description:
      'A single REST endpoint designed for developers. Pass any link to our URL screenshot API and integrate in minutes using our official SDKs for Node.js, Python, Ruby, and Go, or standard HTTP requests.'
  },
  {
    title: 'Full Headless Browser Control',
    description:
      'Complete Puppeteer and Playwright capabilities. Configure custom viewports, full-page captures, device emulation, user agents, and geolocation natively.'
  },
  {
    title: 'Custom Injections & Overlays',
    description:
      'Execute custom JavaScript, inject CSS, click specific DOM elements, hide ad banners, or wait for network events before the capture is finalized.'
  },
  {
    title: 'Smart TTL Caching',
    description:
      'Configure Time-To-Live (TTL) caching rules to keep your snapshots fresh. Stay up to date with target website changes while maintaining sub-second API performance.'
  },
  {
    title: 'Optimized Output Formats',
    description:
      'Our website capture API exports directly to WebP, JPEG, or PNG formats with configurable compression. Optimize image payloads for web performance without sacrificing visual fidelity.'
  },
  {
    title: 'Zero-Config Integration',
    description:
      'Interactive documentation packed with live code examples. Copy-paste ready snippets allow you to bypass complex infrastructure setup and ship to production faster.'
  }
]

const PLAYGROUND_TOOL_PATHS = [
  '/tools/website-screenshot',
  '/tools/website-screenshot/bulk'
]
const SCREENSHOT_TOOLS =
  TOOL_CATALOG.find(section => section.category === 'Screenshots')?.tools ?? []
const PLAYGROUND_TOOLS = PLAYGROUND_TOOL_PATHS.map(path =>
  SCREENSHOT_TOOLS.find(tool => tool.href === path)
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

const BrowserWindow = styled('div')`
  ${theme({
    borderRadius: 5,
    bg: 'white',
    display: 'flex',
    flexDirection: 'column'
  })};
  overflow: hidden;
  border: ${borders[1]} ${colors.black05};
  box-shadow: 0 8px 24px ${colors.black10};

  &:hover:not(:has(.screenshot-api-bar:hover)) .address-bar {
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
    gap: 1,
    flexShrink: 0,
    minWidth: '0'
  })};
  border-bottom: ${borders[1]} ${colors.black05};
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
    outline-offset: ${radii[1]};
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
    minWidth: '0'
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

const ScreenshotApiBar = styled(Flex)`
  background: 'white';

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

const ScreenshotOverlay = styled('div')`
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
  'https://apple.com',
  'https://microlink.io',
  'https://unavatar.io'
]

const addToHistory = (history, url) => {
  const filtered = history.filter(u => u !== url)
  return [url, ...filtered].slice(0, MAX_HISTORY)
}

const Hero = function Hero ({ onRequestTiming, heroLayout = HERO_LAYOUT }) {
  const [inputUrl, setInputUrl] = useState(FIRST_URL)
  const [isFocused, setIsFocused] = useState(false)
  const [history, setHistory] = useState(DEFAULT_HISTORY)
  const inputRef = useRef(null)
  const [screenshotSrc, setScreenshotSrc] = useState(FIRST_IMAGE_URL)
  const [imgKey, setImgKey] = useState(0)
  const [imgVisible, setImgVisible] = useState(true)
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
  const [navStack, setNavStack] = useState(['https://apple.com'])
  const [navIndex, setNavIndex] = useState(0)
  const abortRef = useRef(null)
  const copyTimerRef = useRef(null)
  const hasImageRef = useRef(false)
  const skipBlurRef = useRef(false)
  const imageLoadResolverRef = useRef(null)

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
      await delay(1200)
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
        const imageLoaded = new Promise(resolve => {
          imageLoadResolverRef.current = resolve
        })
        fetchScreenshot(normalized)

        await Promise.race([imageLoaded, delay(15000)])
        if (check()) return

        if (i < DEMO_URLS.length - 1) {
          await delay(4000)
          if (check()) return
          setIsGlowing(true)
          await delay(250)
          if (check()) return
          setInputUrl('')
        } else {
          await delay(2000)
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
      if (imageLoadResolverRef.current) {
        imageLoadResolverRef.current()
        imageLoadResolverRef.current = null
      }
    }
  }, [hasInteracted])

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
  const apiUrl = `https://api.microlink.io?screenshot&url=${inputUrl}`

  const fetchScreenshot = useCallback(
    async url => {
      if (abortRef.current) abortRef.current.abort()
      abortRef.current = new window.AbortController()

      setIsLoading(true)
      setError(null)
      setShowNerdStats(false)

      const t0 = Date.now()

      try {
        const res = await window.fetch(
          `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot`,
          { signal: abortRef.current.signal }
        )
        const json = await res.json()
        const elapsedMs = Date.now() - t0

        if (!res.ok) {
          setError(normalizeApiError(json, res))
          setIsLoading(false)
          return
        }

        onRequestTiming?.(elapsedMs, url)

        const stats = extractNerdStats(res.headers)
        setNerdStats(stats)
        setNerdQuery(buildMqlQuery(url, { screenshot: true }))
        setNerdResponse(JSON.stringify(json.data, null, 2))

        const src = json?.data?.screenshot?.url
        if (src) {
          setScreenshotSrc(src)
          setImgKey(k => k + 1)
          setImgVisible(false)
        } else {
          setIsLoading(false)
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(normalizeApiError.fromNetwork(err))
        }
        setIsLoading(false)
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
    fetchScreenshot(normalized)
  }

  const handleBack = () => {
    if (navIndex === 0) return
    stopAttract()
    const newIndex = navIndex - 1
    const url = navStack[newIndex]
    setNavIndex(newIndex)
    setInputUrl(url)
    fetchScreenshot(url)
  }

  const handleForward = () => {
    if (navIndex >= navStack.length - 1) return
    stopAttract()
    const newIndex = navIndex + 1
    const url = navStack[newIndex]
    setNavIndex(newIndex)
    setInputUrl(url)
    fetchScreenshot(url)
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
        fetchScreenshot(normalized)
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
            Website <span style={{ whiteSpace: 'nowrap' }}>screenshot API</span>{' '}
            <span style={{ whiteSpace: 'nowrap' }}>for developers</span>
          </Heading>
          <Caption
            forwardedAs='h2'
            css={theme({
              pt: [3, 3, 4, 4],
              px: [1, 2, 4, 0],
              maxWidth: ['100%', layout.small, layout.small, '640px'],
              fontSize: [2, 2, 2, 2],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            The website screenshot service that turns any URL into a
            pixel-perfect image. Capture site screenshots with full browser
            control, device emulation, and professional output.
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
            <ArrowLink href='/docs/guides/screenshot'>Get Started</ArrowLink>
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
            <BrowserWindow
              onClick={e => {
                if (
                  !e.target.closest('input') &&
                  !e.target.closest('[role="listbox"]') &&
                  !e.target.closest('.screenshot-api-bar')
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
                    <span className='address-prompt__arrow'>←</span>
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
                      fetchScreenshot(inputUrl)
                      return
                    }

                    setShowNerdStats(s => !s)
                  }}
                >
                  <TerminalIcon size={16} aria-hidden='true' />
                </NerdButton>
              </BrowserHeader>
              <Box
                css={theme({
                  position: 'relative',
                  aspectRatio: '16/10',
                  overflow: 'hidden'
                })}
              >
                <img
                  key={imgKey}
                  src={screenshotSrc}
                  alt='Website screenshot'
                  decoding='async'
                  loading='eager'
                  fetchpriority='high'
                  onLoad={() => {
                    hasImageRef.current = true
                    setImgVisible(true)
                    setIsLoading(false)
                    if (imageLoadResolverRef.current) {
                      imageLoadResolverRef.current()
                      imageLoadResolverRef.current = null
                    }
                  }}
                  onError={() => {
                    setIsLoading(false)
                    if (imageLoadResolverRef.current) {
                      imageLoadResolverRef.current()
                      imageLoadResolverRef.current = null
                    }
                  }}
                  css={[
                    theme({
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }),
                    {
                      filter: imgVisible ? 'blur(0px)' : 'blur(6px)',
                      transition: 'filter 0.5s ease'
                    }
                  ]}
                />
                {isLoading && (
                  <ScreenshotOverlay
                    $dim={hasImageRef.current}
                    aria-label='Loading screenshot'
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
                  </ScreenshotOverlay>
                )}
                {showNerdStats && nerdStats && (
                  <NerdStatsOverlay
                    stats={nerdStats}
                    mqlQuery={nerdQuery}
                    responseData={nerdResponse}
                  />
                )}
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
                          ×
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
              <ScreenshotApiBar
                className='screenshot-api-bar'
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
                  {apiUrl}
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
              </ScreenshotApiBar>
            </BrowserWindow>
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
          Get a web snapshot back
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
          {trimMs(healthcheck.screenshot.p95_pretty)}
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
          99.95
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
        // https://www.gradientmagic.com/collection/radialstripes
        backgroundImage: `radial-gradient(
          circle at center right,
          ${colors.grape9} 0%,
          ${colors.grape9} 48%,
          ${colors.grape8} 48%,
          ${colors.grape8} 52%,
          ${colors.pink8} 52%,
          ${colors.pink8} 65%,
          ${colors.pink7} 65%,
          ${colors.pink7} 79%,
          ${colors.red6} 79%,
          ${colors.red6} 100%
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
    name: 'metascraper',
    org: 'microlinkhq',
    description:
      'A library to easily scrape metadata from an article on the web using Open Graph, JSON+LD, and HTML metadata.',
    language: 'JavaScript',
    languageColor: colors.yellow3,
    stars: '2.3k'
  },
  {
    name: 'html-get',
    org: 'microlinkhq',
    description:
      'Get the HTML from any website, using prerendering when necessary.',
    language: 'JavaScript',
    languageColor: colors.yellow3,
    stars: '100'
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
          Built on <span css={theme({ color: 'red6' })}>open source</span>,
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
          The Microlink screenshot engine is powered by battle-tested open
          source libraries used by thousands of developers worldwide. Explore
          the code, contribute, or run it yourself.
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
  70%, 90% { color: ${colors.red6}; }
  100% { color: inherit; }
`

const LiveText = styled('span')`
  animation: ${livePulse} 1.5s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    color: ${colors.red6};
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
          Skip the setup. Our interactive screenshot url tool lets you test the
          screenshot API instantly — paste any URL, configure options, and see
          the result in real time.
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

        <ArrowLink
          href='/tools'
          css={theme({
            fontSize: ['20px', '20px', '24px', '24px'],
            pt: [3, 3, 4, 4]
          })}
        >
          See all the screenshot tools
        </ArrowLink>
      </Flex>
    </Container>
  )
}

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
        #850ba7 0%,
        #850ba7 48%,
        #a31b91 48%,
        #a31b91 52%,
        #c12a78 52%,
        #c12a78 65%,
        #df3a61 65%,
        #df3a61 79%,
        #fd494a 79%,
        #fd494a 100%
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
        The fastest screenshot API{' '}
        <span css={theme({ display: 'block', color: 'white60' })}>
          50% faster than competitors
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
        Benchmarked against every major web screenshot API provider.
        <br />
        From cold start to pixel delivery, Microlink consistently finishes
        first.
      </Caption>
      <ArrowLink
        href='/benchmarks/screenshot-api'
        css={theme({
          fontSize: ['22px', '24px', '26px', '26px'],
          color: 'white'
        })}
        style={{ color: 'white' }}
      >
        See the benchmarks
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
  // {
  //   name: 'Vercel',
  //   description: 'Frontend cloud platform',
  //   url: 'https://vercel.com',
  //   logo: (
  //     <img
  //       src='/images/clients/vercel.com.png'
  //       alt='Vercel'
  //       width='28'
  //       height='28'
  //       aria-hidden='true'
  //     />
  //   )
  // },
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
  ${theme({ color: 'red6' })};
`

const TypedCursor = styled('span')`
  ${theme({ display: 'inline-block', ml: 1, color: 'red6' })};
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
            Website capture API <LineBreak /> in{' '}
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
            Microlink screenshot API delivers enterprise-grade screen capture
            API through a developer-friendly web screenshot service.
          </Caption>
          <Flex
            css={theme({
              pt: [3, 3, 4, 4],
              width: '100%',
              fontSize: [2, 2, 3, 3],
              justifyContent: ['center', 'center', 'center', 'flex-start']
            })}
          >
            <ArrowLink href='/docs/guides/screenshot'>Read the docs</ArrowLink>
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
                url: 'https://www.netflix.com/title/80057281',
                screenshot: {
                  type: 'jpeg'
                },
                viewport: {
                  width: 1920,
                  height: 1080,
                  deviceScaleFactor: 2
                }
              }}
            />
          </Flex>
        </Flex>
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
      No login required. No credit card needed. Screenshot API free to use —
      just start calling it.
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
        <Text
          css={theme({
            pt: 2,
            fontSize: [1, 1, '18px', '18px']
          })}
        >
          Website screenshot API free — 50 requests/day, no login, no credit
          card.
        </Text>
        <Box css={theme({ pt: 3 })}>
          <PricingCheck>Screenshot API</PricingCheck>
          <PricingCheck>Browser control & emulation</PricingCheck>
          <PricingCheck>Metadata, PDF, logos, and more</PricingCheck>
          <PricingCheck>Adblock & cookie banners</PricingCheck>
          <PricingCheck>Full browser control</PricingCheck>
        </Box>
        <Flex
          css={theme({ pt: 4, fontSize: ['18px', '18px', '20px', '20px'] })}
        >
          <ArrowLink href='/docs/guides/screenshot'>Get started free</ArrowLink>
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
          <ArrowLink href='/pricing'>See all plans</ArrowLink>
        </Flex>
      </PricingCard>
    </Flex>
  </Container>
)

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
        <path d='M18 6L6 18M6 6l12 12' />
      </svg>
    ),
    title: 'Blocks ads & cookie banners',
    description:
      'Built-in adblock removes ads, trackers, and cookie consent popups automatically. Get clean captures without custom scripts.'
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
        <rect x='2' y='3' width='20' height='14' rx='2' ry='2' />
        <path d='M8 21h8M12 17v4' />
      </svg>
    ),
    title: 'Any viewport, any device',
    description:
      'Capture at any resolution with full device emulation — mobile, tablet, desktop, or custom viewports up to full-page.'
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
    title: 'Fastest screenshot API',
    description:
      'Sub-second cached responses with P95 cold starts under 3 seconds. The fastest site screenshot API with a global edge network for low latency worldwide.'
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
        <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
      </svg>
    ),
    title: 'Isolated & secure',
    description:
      'Every request runs in its own browser instance. No shared state, no data leaks — enterprise-grade isolation by default.'
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
        <path d='M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z' />
      </svg>
    ),
    title: 'Full browser control',
    description:
      'Inject CSS, execute JavaScript, click elements, scroll, wait for selectors — a complete screen capture API to automate any interaction before capture.'
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
        <polyline points='16 18 22 12 16 6' />
        <polyline points='8 6 2 12 8 18' />
      </svg>
    ),
    title: 'Simple integration',
    description:
      'A single REST endpoint that works from any language or framework. No SDKs required — just an HTTP call with your URL.'
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
    color: 'red6'
  })};
`

const Capabilities = () => {
  const [adblock, setAdblock] = useState(true)
  const [capCopied, setCapCopied] = useState(false)
  const capCopyTimerRef = useRef(null)

  const handlePositionChange = useCallback(position => {
    setAdblock(position < 51)
  }, [])

  const capApiUrl = `https://api.microlink.io?screenshot&url=https://ft.com&adblock=${adblock}`

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
            css={[
              theme({
                width: ['100%', '100%', '80%', '100%'],
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: `0 8px 32px ${colors.black10}`,
                lineHeight: 0
              }),
              {
                '& img': { display: 'block', width: '100%', height: 'auto' }
              }
            ]}
          >
            <ReactCompareSlider
              onPositionChange={handlePositionChange}
              itemOne={
                <ReactCompareSliderImage
                  src='/images/M4jeZNS.png'
                  alt='Website screenshot without adblock — cookie banner visible'
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src='/images/FrmIQOj.png'
                  alt='Website screenshot with adblock — clean capture'
                />
              }
            />
            <ScreenshotApiBar
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
                  flex: 1,
                  minWidth: '0',
                  color: 'black70',
                  wordBreak: 'break-all'
                })}
              >
                {capApiUrl}
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
            </ScreenshotApiBar>
          </Box>
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
            Everything you need,
            <LineBreak />
            <span css={theme({ color: 'red6' })}>one API call away</span>
          </Subhead>
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
                  <Text css={theme({ fontSize: [0, 0, 1, 1] })}>
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
    ${on + 0.01}%, ${off - 0.01}% { color: ${colors.red6}; }
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
  ${CTA_SWEEP_PCT + 0.01}%, 100% { color: ${colors.red6}; }
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
        Get 50&nbsp;requests/day with zero commitment — screenshot API free to
        use, no account, and no credit card. Just call the API and start
        capturing screenshots in seconds.
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
          href='/docs/guides/screenshot'
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
          Everything you need to know about <LineBreak /> Microlink website
          screenshot API.
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
          question: 'Do I need to manage my own Headless Chrome instances?',
          answer: (
            <>
              <div>
                No. Microlink acts as a fully managed, "backendless"{' '}
                <Link href='/blog/what-is-a-headless-browser'>
                  browser service
                </Link>
                . We maintain the underlying Chromium infrastructure, manage the
                instance pool, and handle{' '}
                <Link href='/blog/edge-cdn'>edge caching</Link>.
              </div>
              <div>
                You simply make a REST API call and receive a structured JSON
                payload or a{' '}
                <Link href='/docs/guides/screenshot/embedding#direct-image-with-embed'>
                  binary image directly
                </Link>{' '}
                — the easiest way to automatically take screenshots of website
                pages without maintaining{' '}
                <Link href='https://pptr.dev/'>Puppeteer</Link> or{' '}
                <Link href='https://playwright.dev/'>Playwright</Link> on your
                own servers.
              </div>
            </>
          )
        },
        {
          question: 'Is there a free tier for testing and local development?',
          answer: (
            <>
              <div>
                Yes. Our free screenshot API tier provides 50 requests per day
                with unrestricted access to all browser automation features,
                including{' '}
                <Link href='/docs/api/parameters/device'>device emulation</Link>
                ,{' '}
                <Link href='/docs/api/parameters/headers'>
                  custom HTTP headers
                </Link>
                , and{' '}
                <Link href='/docs/guides/screenshot/page-interaction#injecting-custom-css'>
                  CSS injection
                </Link>
                .
              </div>
              <div>
                No credit card, account creation, or API key is required to
                start developing. Try it instantly in the{' '}
                <Link href='/tools/website-screenshot'>
                  screenshot playground
                </Link>{' '}
                or point your code at the endpoint and begin capturing.
              </div>
            </>
          )
        },
        {
          question: 'How do you handle cookie banners and ad popups?',
          answer: (
            <>
              <div>
                By default, our engine includes a built-in, frequently updated{' '}
                <Link href='/blog/microlink-adblock-now-handles-cookie-banners'>
                  adblocker
                </Link>
                . It automatically dismisses GDPR cookie consent banners, closes
                newsletter popups, and removes injected ads.
              </div>
              <div>
                This ensures your programmatic captures remain clean and focused
                on the actual page content without requiring you to write custom
                dismissal scripts.
              </div>
            </>
          )
        },
        {
          question:
            'Can I interact with the DOM or run scripts before capturing?',
          answer: (
            <>
              <div>
                Absolutely. Our HTML screenshot API provides complete{' '}
                <Link href='/docs/guides/screenshot/browser-settings'>
                  browser control
                </Link>
                . You can execute arbitrary JavaScript via our{' '}
                <Link href='/docs/guides/function'>functions integration</Link>,
                or use native parameters to{' '}
                <Link href='/docs/guides/screenshot/page-interaction'>
                  scroll, click, and wait
                </Link>{' '}
                for specific DOM elements and network events to load.
              </div>
              <div>
                It is built to handle complex, dynamic SPA (Single Page
                Application) rendering and visual regression testing workflows
                with pixel-perfect accuracy.
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
                reliability with a 99.95% uptime SLA. Every request runs in an
                isolated browser instance to guarantee security and avoid
                shared-state leaks. Check real-time availability on the{' '}
                <Link href='/status'>status page</Link>.
              </div>
              <div>
                For latency: assets are distributed via Cloudflare's 240+ edge
                locations, meaning{' '}
                <Link href='/docs/guides/screenshot/caching-and-performance'>
                  cached responses
                </Link>{' '}
                are delivered in milliseconds. For cold starts, our optimized
                Chromium pool typically responds in under 3&nbsp;seconds (P95).
                See our{' '}
                <Link href='/benchmarks/screenshot-api'>
                  independent benchmark
                </Link>{' '}
                for detailed provider comparisons.
              </div>
            </>
          )
        },
        {
          question: 'What output formats are supported?',
          answer: (
            <>
              <div>
                You can export captures as optimized{' '}
                <Link href='/docs/guides/screenshot/customizing-output'>
                  JPEG or PNG
                </Link>{' '}
                formats. We support specific viewport cropping, as well as{' '}
                <Link href='/tools/website-screenshot/full-page'>
                  full-page scrolling captures
                </Link>{' '}
                for long documents. If you need motion, you can even generate{' '}
                <Link href='/tools/website-screenshot/animated'>
                  animated recordings
                </Link>
                .
              </div>
              <div>
                Depending on your integration, you can request a raw image
                buffer via the{' '}
                <Link href='/docs/api/parameters/embed'>embed parameter</Link>,
                or a comprehensive JSON payload that includes the image URL
                alongside <Link href='/metadata'>metadata</Link>, performance
                timings, and HTTP headers.
              </div>
            </>
          )
        },
        {
          question: 'How quickly can I integrate this into my stack?',
          answer: (
            <>
              <div>
                In minutes. Visit our{' '}
                <Link href='/docs/guides/screenshot'>documentation</Link> for
                interactive playground examples, official{' '}
                <Link href='/sdk'>SDKs</Link> (Node.js, Python, Ruby, Go), and
                copy-paste code snippets.
              </div>
              <div>
                Need architectural advice or have custom requirements? Check our{' '}
                <Link href='/enterprise'>enterprise offering</Link> or contact
                our engineering team at{' '}
                <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>
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
    title='Website Screenshot API — Convert URL to Image'
    description='Capture pixel-perfect website screenshots with one API call. Free to start. Sub-second responses, full headless browser control, device emulation & ad-blocking.'
    image={cdnUrl('banner/screenshot.jpeg')}
    structured={{
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://microlink.io/screenshot',
      name: 'Microlink Screenshot API',
      description:
        'A developer-first API to capture pixel-perfect website screenshots programmatically. Sub-second cached responses, full Headless Chrome control, device emulation, and ad-blocking across a global edge network.',
      url: 'https://microlink.io/screenshot',
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
        'screenshot API, website screenshot, URL to image, headless chrome, website capture, web screenshot, puppeteer API',
      interactionStatistic: {
        '@type': 'InteractionCounter',
        interactionType: {
          '@type': 'https://schema.org/LikeAction'
        },
        userInteractionCount: getRepoStarsLabel(REPOS[0], true),
        interactionService: {
          '@type': 'WebSite',
          name: 'GitHub',
          url: 'https://github.com/microlinkhq/browserless'
        }
      },
      about: [
        {
          '@type': 'Thing',
          name: 'Application Programming Interface',
          sameAs: 'https://en.wikipedia.org/wiki/API'
        },
        {
          '@type': 'Thing',
          name: 'Headless browser',
          sameAs: 'https://en.wikipedia.org/wiki/Headless_browser'
        }
      ]
    }}
  />
)
const INITIAL_TIMING_MS = Math.floor(Math.random() * (25 - 14 + 1)) + 14

const ScreenshotPage = () => {
  const [timingMs, setTimingMs] = useState(INITIAL_TIMING_MS)
  const [timingUrl, setTimingUrl] = useState('https://apple.com')
  const [timingHistory, setTimingHistory] = useState([
    { ms: INITIAL_TIMING_MS, url: 'https://apple.com' }
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
            The best screenshot API,{' '}
            <span
              css={theme({
                display: 'block',
                color: 'red6',
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
            No more servers to maintain, load balancers, or paying for capacity
            you don’t use — our screenshot service API lets you spend more time
            building, less time configuring, with easy integration via{' '}
            <Link href='/docs/guides/screenshot'>web screenshot API</Link>.
          </>
        }
        features={FEATURES}
      />
      <CallToAction />
      <ProductInformation />
    </Layout>
  )
}

export default ScreenshotPage
