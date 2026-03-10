import { borders, layout, colors, theme, transition } from 'theme'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { cdnUrl } from 'helpers/cdn-url'
import { trimMs } from 'helpers/trim-ms'
import humanizeUrl from 'humanize-url'
import styled, { css, keyframes } from 'styled-components'
import get from 'dlv'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Hide from 'components/elements/Hide'
import Image from 'components/elements/Image/Image'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from 'react-compare-slider'
import {
  Check as CheckIcon,
  Terminal as TerminalIcon,
  Star as StarIcon,
  GitBranch as ForkIcon,
  Camera,
  Play,
  ArrowRight
} from 'react-feather'
import FeatherIcon from 'components/icons/Feather'
import NerdStatsOverlay, {
  extractNerdStats,
  buildMqlQuery
} from 'components/patterns/NerdStats/NerdStats'
import { rotate, dash, fadeInDown, highlight } from 'components/keyframes'
import { TerminalButton } from 'components/elements/Terminal/Terminal'
import ArrowLink from 'components/patterns/ArrowLink'
import Block from 'components/patterns/Block/Block'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import FetchProvider from 'components/patterns/FetchProvider'
import Layout from 'components/patterns/Layout'
import MultiCodeEditorInteractive from 'components/patterns/MultiCodeEditor/MultiCodeEditorInteractive'

import { useHealthcheck } from 'components/hook/use-healthcheck'

import { findDemoLinkById } from 'helpers/demo-links'

import analyticsData from '../../data/analytics.json'

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

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)

const Caption = withTitle(CaptionBase)

const HERO_MQ = '@media (min-width: 1200px) and (max-width: 1750px)'

const NerdButton = styled('button')`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(74, 222, 128, 0.06);
  border: 1px solid rgba(74, 222, 128, 0.25);
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Operator Mono', 'Fira Code', 'SF Mono', monospace;
  color: #4ade80;
  opacity: 0.7;
  flex-shrink: 0;
  letter-spacing: 0.02em;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.15s ease, background 0.15s ease, border-color 0.15s ease,
    box-shadow 0.15s ease;
  white-space: nowrap;

  &:hover {
    opacity: 1;
    background: rgba(74, 222, 128, 0.12);
    border-color: rgba(74, 222, 128, 0.4);
    box-shadow: 0 0 8px rgba(74, 222, 128, 0.15);
  }

  &:focus-visible {
    outline: 2px solid rgba(74, 222, 128, 0.4);
    outline-offset: 2px;
  }
`

const tooltipFloat = keyframes`
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-3px); }
`

const tooltipFadeIn = keyframes`
  from { opacity: 0; transform: translateX(-50%) translateY(4px); }
  to { opacity: 1; transform: translateX(-50%) translateY(0); }
`

const HintTooltip = styled('span')`
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  animation: ${tooltipFadeIn} 0.35s ease both,
    ${tooltipFloat} 3s ease-in-out 0.35s infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: ${tooltipFadeIn} 0.01s ease both;
  }
`

const HintTooltipLabel = styled('span')`
  color: #4ade80;
  font-family: 'Operator Mono', 'Fira Code', 'SF Mono', 'Roboto Mono', Menlo,
    monospace;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.01em;
  white-space: nowrap;
  background: #111113;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 7px 14px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 640px) {
    font-size: 10px;
    padding: 5px 12px;
  }
`

const HintTooltipArrow = styled('span')`
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid #111113;
`

const BrowserWindow = styled('div')`
  border-radius: 10px;
  overflow: hidden;
  background: #1c1c1e;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25), 0 4px 16px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;

  &:hover:not(:has(.screenshot-api-bar:hover)) .address-bar {
    background: rgba(255, 255, 255, 0.11);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.65),
      0 0 12px 1px rgba(255, 255, 255, 0.15);

    input {
      color: rgba(255, 255, 255, 0.85);
    }
  }
`

const BrowserHeader = styled(Flex)`
  background: #2c2c2e;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  height: 44px;
  align-items: center;
  padding: 0 12px;
  gap: 8px;
  flex-shrink: 0;
`

const TrafficLights = styled(Flex)`
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`

const NavButtons = styled(Flex)`
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
`

const NavArrow = styled('button')`
  background: none;
  border: none;
  padding: 4px 9px;
  cursor: default;
  color: rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  border-radius: 4px;
  line-height: 1;
  transition: color 0.15s ease;

  &:not(:disabled) {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.65);

    &:hover {
      color: rgba(255, 255, 255, 0.95);
    }

    &:active {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.3);
    outline-offset: 2px;
  }
`

const caretPulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 2px rgba(255,255,255,0.65), 0 0 10px 1px rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.12);
  }
  50% {
    box-shadow: 0 0 0 2px rgba(255,255,255,0.15), 0 0 4px 0px rgba(255,255,255,0.04);
    background: rgba(255,255,255,0.07);
  }
`

const AddressBar = styled(Flex)`
  flex: 1;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 6px;
  height: 26px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  gap: 10px;
  min-width: 0;
  position: relative;
  transition: box-shadow 0.3s ease, background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.11);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.65),
      0 0 12px 1px rgba(255, 255, 255, 0.15);

    input {
      color: rgba(255, 255, 255, 0.85);
    }
  }

  ${({ $glowing }) =>
    $glowing &&
    css`
      background: rgba(255, 255, 255, 0.11);
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.7),
        0 0 12px 1px rgba(255, 255, 255, 0.15);
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
      background: rgba(255, 255, 255, 0.11);
      box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.65),
        0 0 10px 1px rgba(255, 255, 255, 0.12);
    `}

  &:focus-within {
    background: rgba(255, 255, 255, 0.11);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.12);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    animation: none;
    box-shadow: none;
  }
`

const AddressInput = styled('input')`
  background: none;
  border: none;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  padding: 0;
  margin: 0;
  flex: 1;
  min-width: 0;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: ${({ $active }) =>
    $active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)'};
  text-align: left;
  letter-spacing: 0.01em;
  transition: color 0.2s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  caret-color: rgba(255, 255, 255, 0.7);

  &::selection {
    background: rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.9);
  }

  &:focus {
    outline: none;
    color: rgba(255, 255, 255, 0.85);
    text-align: left;
  }
`

const ScreenshotApiBar = styled(Flex)`
  background: #111113;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  .codecopy__button {
    top: 0;
    opacity: 0.85;
    transition: opacity 0.15s ease;

    &:hover {
      opacity: 1;
    }

    &::before,
    &::after {
      display: none !important;
    }
  }

  .codecopy__icon {
    fill: rgba(255, 255, 255, 0.9) !important;
  }
`

const ScreenshotOverlay = styled('div')`
  position: absolute;
  inset: 0;
  background: ${({ $dim }) => ($dim ? 'rgba(0, 0, 0, 0.55)' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`

const Spinner = styled('svg')`
  animation: ${rotate} 1.4s linear infinite;
`

const SpinnerCircle = styled('circle')`
  animation: ${dash} 1.4s ease-in-out infinite;
  stroke: rgba(255, 255, 255, 0.85);
  stroke-linecap: round;
`

const CopyButton = styled('button')`
  background: none;
  border: none;
  padding: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: rgba(255, 255, 255, 0.9);
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.15s ease, transform 0.15s ease;

  &:hover {
    color: #fff;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.3);
    outline-offset: 3px;
    border-radius: 3px;
  }

  svg.icon-check {
    animation: ${fadeInDown} 0.2s ease both;
    color: #4ade80;
  }
`

const HistoryDropdown = styled('div')`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: #2c2c2e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
  z-index: 10;
`

const HistoryItem = styled('button')`
  width: 100%;
  min-width: 0;
  background: none;
  border: none;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  text-align: left;
  color: rgba(255, 255, 255, 0.6);
  font-size: 13px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  transition: background 0.1s ease, color 0.1s ease;

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
    background: rgba(255, 255, 255, 0.07);
    color: rgba(255, 255, 255, 0.9);
    outline: none;
  }

  & + & {
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }
`

const ErrorModalOverlay = styled('div')`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`

const ErrorModalWindow = styled('div')`
  background: #1c1c1e;
  border: 1px solid rgba(255, 80, 80, 0.25);
  border-radius: 12px;
  width: 340px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.7), 0 4px 16px rgba(0, 0, 0, 0.4);
  overflow: hidden;
`

const ErrorModalHeader = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
`

const ErrorModalBody = styled('div')`
  padding: 16px;
`

const ErrorCloseButton = styled('button')`
  background: rgba(255, 255, 255, 0.07);
  border: none;
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
  line-height: 1;
  font-size: 14px;
  transition: background 0.15s ease, color 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.13);
    color: rgba(255, 255, 255, 0.9);
  }

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.3);
    outline-offset: 2px;
  }
`

const HeroTextContainer = styled(Flex)`
  ${HERO_MQ} {
    h1 {
      font-size: 48px !important;
    }
    h2 {
      font-size: 24px !important;
      padding-top: 20px !important;
      max-width: 580px !important;
    }
    & > div:last-child {
      font-size: 26px !important;
    }
  }
`

const SUGGESTIONS = [
  { theme: 'dark', id: 'apple' },
  { theme: 'light', id: 'mdn' },
  { theme: 'light', id: 'stackoverflow' },
  { theme: 'light', id: 'producthunt' },
  { theme: 'dark', id: 'nasa' }
].map(({ theme, id }) => {
  const filename = `${id}.png`
  const { url } = findDemoLinkById(id).data

  return {
    cdnUrl: cdnUrl(`screenshot/browser/${theme}/${filename}`),
    filename,
    id,
    url,
    value: humanizeUrl(url)
  }
})

const fromCache = (variations, opts) => {
  const suggestion = SUGGESTIONS.find(({ url }) => variations.includes(url))
  if (!suggestion) return

  const { data } = findDemoLinkById(suggestion.id)
  const theme = get(opts, 'overlay.browser')

  const screenshotUrl = cdnUrl(
    theme
      ? `screenshot/browser/${theme}/${suggestion.filename}`
      : `screenshot/${suggestion.filename}`
  )

  return { data: { ...data, screenshot: { url: screenshotUrl } } }
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
const DEFAULT_HISTORY = [
  'https://apple.com',
  'https://microlink.io',
  'https://unavatar.io'
]

const addToHistory = (history, url) => {
  const filtered = history.filter(u => u !== url)
  return [url, ...filtered].slice(0, MAX_HISTORY)
}

const Hero = function Hero ({ onRequestTiming }) {
  const [inputUrl, setInputUrl] = useState('https://apple.com')
  const [isFocused, setIsFocused] = useState(false)
  const [history, setHistory] = useState(DEFAULT_HISTORY)
  const inputRef = useRef(null)
  const [screenshotSrc, setScreenshotSrc] = useState(cdnUrl('www/apple.png'))
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
  const [showTooltip, setShowTooltip] = useState(false)
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
          setTimeout(() => setShowTooltip(true), 50)
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
          setShowTooltip(false)
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

  const displayValue = isFocused ? inputUrl : stripForDisplay(inputUrl)
  const apiUrl = `https://api.microlink.io?screenshot&url=${inputUrl}`

  const fetchScreenshot = useCallback(
    async url => {
      if (abortRef.current) abortRef.current.abort()
      abortRef.current = new AbortController()

      setIsLoading(true)
      setError(null)
      setShowNerdStats(false)

      const t0 = Date.now()

      try {
        const res = await fetch(
          `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot`,
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
          setError(err.message || 'Something went wrong.')
        }
        setIsLoading(false)
      }
    },
    [onRequestTiming]
  )

  const handleChange = e => {
    setInputUrl(e.target.value)
    stopAttract()
  }

  const stopAttract = () => {
    setIsGlowing(false)
    setIsAttractMode(false)
    setIsPulsing(false)
    setHasInteracted(true)
    setShowTooltip(false)
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
    setShowTooltip(false)
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
      setShowTooltip(false)
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
      setShowTooltip(false)
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
      as='section'
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        pt: [4, 4, 4, 5],
        pb: [5, 5, 5, 6]
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          mx: 'auto',
          flexDirection: ['column', 'column', 'column', 'row'],
          alignItems: ['center', 'center', 'center', 'stretch'],
          gap: [0, 0, 3, 4],
          px: [1, 1, 1, 5]
        })}
      >
        <HeroTextContainer
          css={theme({
            width: ['100%', '100%', '100%', '50%'],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: ['center', 'center', 'center', 'flex-start']
          })}
        >
          <Heading
            css={theme({
              maxWidth: layout.large,
              fontSize: [4, 4, 4, 5],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            Website screenshot API <br /> for developers
          </Heading>
          <Caption
            forwardedAs='h2'
            css={theme({
              pt: [3, 3, 3, 4],
              fontSize: [2, 2, '24px', 3],
              maxWidth: [
                layout.small,
                layout.small,
                layout.normal,
                layout.large
              ],
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
              fontSize: [2, 2, '26px', 3],
              justifyContent: ['center', 'center', 'center', 'flex-start']
            })}
          >
            <ArrowLink
              css={theme({ pr: [2, 4, 4, 4] })}
              href='/docs/api/parameters/screenshot'
            >
              Get Started
            </ArrowLink>
          </Flex>
        </HeroTextContainer>
        <Flex
          css={[
            theme({
              width: ['100%', '100%', '100%', '50%'],
              pt: [5, 5, 5, 0],
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }),
            { '@media (min-width: 2100px)': { width: '42%' } }
          ]}
        >
          <Box
            css={theme({
              display: 'inline-flex',
              flexDirection: 'column',
              maxWidth: ['100%', '85%', '70%', '100%'],
              width: ['100%', '85%', '70%', '100%']
            })}
            style={{ position: 'relative' }}
          >
            {showTooltip && (
              <HintTooltip aria-hidden='true'>
                <HintTooltipLabel>
                  Type any URL to capture a screenshot
                </HintTooltipLabel>
                <HintTooltipArrow />
              </HintTooltip>
            )}
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
                <TrafficLights
                  css={theme({
                    display: ['none', 'inherit', 'inherit', 'inherit']
                  })}
                >
                  <TerminalButton.Red />
                  <TerminalButton.Yellow />
                  <TerminalButton.Green />
                </TrafficLights>
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
                    style={{ flexShrink: 0 }}
                  >
                    <rect
                      x='1'
                      y='5.5'
                      width='9'
                      height='7'
                      rx='1.5'
                      fill='rgba(255,255,255,0.3)'
                    />
                    <path
                      d='M3 5.5V3.5a2.5 2.5 0 015 0v2'
                      stroke='rgba(255,255,255,0.3)'
                      strokeWidth='1.4'
                      strokeLinecap='round'
                    />
                  </svg>
                  <AddressInput
                    ref={inputRef}
                    $active={isFocused || isAttractMode}
                    type='url'
                    value={displayValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    aria-label='Browser address bar'
                    spellCheck={false}
                    autoComplete='off'
                    autoCorrect='off'
                    autoCapitalize='off'
                  />

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
                              stroke='rgba(255,255,255,0.3)'
                              strokeWidth='1.3'
                            />
                            <path
                              d='M8 8l2 2'
                              stroke='rgba(255,255,255,0.3)'
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
                {nerdStats && (
                  <NerdButton
                    type='button'
                    aria-label={
                      showNerdStats ? 'Hide nerd stats' : 'Show nerd stats'
                    }
                    aria-pressed={showNerdStats}
                    onClick={() => {
                      stopAttract()
                      setShowNerdStats(s => !s)
                    }}
                    style={
                      showNerdStats
                        ? { opacity: 1, color: '#4ade80' }
                        : undefined
                    }
                  >
                    <TerminalIcon size={13} aria-hidden='true' />{' '}
                    <span
                      css={theme({
                        display: ['none', 'none', 'inline', 'inline']
                      })}
                    >
                      Nerd
                    </span>{' '}
                    Stats
                  </NerdButton>
                )}
                <Box css={{ width: '4px', flexShrink: 0 }} />
              </BrowserHeader>
              <div
                style={{
                  position: 'relative',
                  aspectRatio: '16/10',
                  overflow: 'hidden'
                }}
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
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    filter: imgVisible ? 'blur(0px)' : 'blur(6px)',
                    transition: 'filter 0.5s ease'
                  }}
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
                        <Flex css={{ alignItems: 'center', gap: '8px' }}>
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
                              stroke='rgba(255,80,80,0.8)'
                              strokeWidth='1.5'
                            />
                            <path
                              d='M8 5v3M8 10.5v.5'
                              stroke='rgba(255,80,80,0.9)'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                            />
                          </svg>
                          <Text
                            as='span'
                            style={{
                              color: 'rgba(255,255,255,0.9)',
                              fontSize: '13px',
                              fontWeight: 600,
                              letterSpacing: '0.01em'
                            }}
                          >
                            Request failed
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
                          css={theme({ fontFamily: 'mono' })}
                          style={{
                            color: 'rgba(255,120,120,0.9)',
                            fontSize: '12px',
                            lineHeight: '1.6',
                            margin: 0
                          }}
                        >
                          {error}
                        </Text>
                      </ErrorModalBody>
                    </ErrorModalWindow>
                  </ErrorModalOverlay>
                )}
              </div>
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
                    fontSize: ['12px', '12px', '13px', '13px'],
                    fontFamily: 'mono',
                    letterSpacing: '0.01em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    minWidth: 0
                  })}
                  style={{ color: '#4ade80' }}
                >
                  {apiUrl}
                </Text>
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
  border-radius: 2px;
  padding: 0 2px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const extractDomain = url => {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

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
          fontWeight: 'bold'
        })}
        style={{ fontVariantNumeric: 'tabular-nums' }}
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
      css={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
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
        gap: [1, 3, 4, 5]
      })}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      <Flex
        css={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
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
        css={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
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
        pt: [4, 4, 5, 5],
        pb: [4, 4, 5, 5],
        width: '100%',
        // https://www.gradientmagic.com/collection/radialstripes
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
    languageColor: '#f1e05a',
    stars: '1.8k',
    forks: '87',
    primary: true
  },
  {
    name: 'metascraper',
    org: 'microlinkhq',
    description:
      'A library to easily scrape metadata from an article on the web using Open Graph, JSON+LD, and HTML metadata.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: '2.3k',
    forks: '183'
  },
  {
    name: 'unavatar',
    org: 'microlinkhq',
    description:
      'Get the unified avatar for a username, email, or domain — from any provider, in one call.',
    language: 'JavaScript',
    languageColor: '#f1e05a',
    stars: '1.2k',
    forks: '78'
  }
]

const RepoCard = styled('a')`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid ${colors.black10};
  background: white;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    border-color: ${colors.black20};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: 2px solid #067df7;
    outline-offset: 2px;
  }
`

const RepoCardPrimary = styled(RepoCard)`
  padding: 24px;
  border: 2px solid transparent;
  background: linear-gradient(white, white) padding-box,
    linear-gradient(90deg, #f76698, #c03fa2 60%, #8c1bab 100%) border-box;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03);

  &:hover {
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }
`

const RepoMeta = styled(Flex)`
  align-items: center;
  gap: 16px;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif;
  color: ${colors.black60};
`

const LanguageDot = styled('span')`
  width: 12px;
  height: 12px;
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
      pt: [5, 5, 5, 6],
      pb: [4, 4, 4, 5],
      px: [1, 1, 5, 5]
    })}
  >
    <Flex
      css={[
        theme({
          width: '100%',
          mx: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          gap: [4, 4, 5, 5]
        }),
        {
          '@media (min-width: 1500px)': {
            flexDirection: 'row-reverse',
            alignItems: 'center',
            paddingBottom: '30px'
          }
        }
      ]}
    >
      {/* Text side */}
      <Flex
        css={[
          theme({
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center'
          }),
          {
            '@media (min-width: 1500px)': {
              width: '55%',
              alignItems: 'flex-start'
            }
          }
        ]}
      >
        <Subhead
          css={[
            theme({
              textAlign: 'center',
              fontSize: ['34px', '42px', '54px', '62px']
            }),
            {
              '@media (min-width: 1500px)': {
                textAlign: 'left'
              }
            }
          ]}
        >
          Built on <span css={{ color: '#fd494a' }}>open source</span>,
          <br />
          trusted by developers
        </Subhead>
        <Caption
          css={[
            theme({
              pt: [3, 3, 4, 4],
              px: [4, 4, 4, 0],
              maxWidth: [
                layout.small,
                layout.small,
                layout.normal,
                layout.normal
              ],
              textAlign: 'center'
            }),
            {
              '@media (min-width: 1500px)': {
                textAlign: 'left'
              }
            }
          ]}
        >
          The Microlink screenshot engine is powered by battle-tested open
          source libraries used by thousands of developers worldwide. Explore
          the code, contribute, or run it yourself.
        </Caption>
        <Flex
          css={[
            {
              display: 'none'
            },
            {
              '@media (min-width: 1500px)': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '16px',
                paddingTop: '32px'
              }
            }
          ]}
        >
          <ArrowLink
            href='https://github.com/microlinkhq'
            css={theme({ fontSize: ['20px', '20px', '24px', '24px'] })}
          >
            Explore all repos on GitHub
          </ArrowLink>
        </Flex>
      </Flex>

      {/* Repo cards side */}
      <Flex
        css={[
          theme({
            width: '100%',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: layout.normal
          }),
          {
            '@media (min-width: 1500px)': {
              width: '45%',
              marginLeft: '5%',
              maxWidth: 'none',
              flexShrink: 0
            }
          }
        ]}
      >
        {REPOS.filter(r => r.primary).map(repo => (
          <RepoCardPrimary
            key={repo.name}
            href={`https://github.com/${repo.org}/${repo.name}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <Flex css={{ alignItems: 'center', gap: '10px' }}>
              <svg
                width='20'
                height='20'
                viewBox='0 0 16 16'
                fill={colors.black80}
                aria-hidden='true'
              >
                <path d='M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z' />
              </svg>
              <Text
                css={theme({ fontWeight: 'bold', fontSize: [2, 2, 3, 3] })}
                style={{ color: colors.black }}
              >
                {repo.org}/{repo.name}
              </Text>
            </Flex>
            <Text
              css={theme({ fontSize: [1, 1, 2, 2] })}
              style={{ color: colors.black70, lineHeight: 1.5 }}
            >
              {repo.description}
            </Text>
            <RepoMeta style={{ fontSize: '15px' }}>
              <Flex css={{ alignItems: 'center', gap: '5px' }}>
                <LanguageDot style={{ background: repo.languageColor }} />
                {repo.language}
              </Flex>
              <Flex css={{ alignItems: 'center', gap: '5px' }}>
                <StarIcon size={16} aria-hidden='true' />
                {repo.stars}
              </Flex>
              <Flex css={{ alignItems: 'center', gap: '5px' }}>
                <ForkIcon size={16} aria-hidden='true' />
                {repo.forks}
              </Flex>
            </RepoMeta>
          </RepoCardPrimary>
        ))}

        <Flex
          css={theme({
            gap: '16px',
            flexDirection: ['column', 'column', 'row', 'row']
          })}
        >
          {REPOS.filter(r => !r.primary).map(repo => (
            <RepoCard
              key={repo.name}
              href={`https://github.com/${repo.org}/${repo.name}`}
              target='_blank'
              rel='noopener noreferrer'
              css={{ flex: 1 }}
            >
              <Flex css={{ alignItems: 'center', gap: '8px' }}>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill={colors.black60}
                  aria-hidden='true'
                >
                  <path d='M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z' />
                </svg>
                <Text
                  css={theme({ fontWeight: 'bold', fontSize: [2, 2, 2, 2] })}
                  style={{ color: colors.black }}
                >
                  {repo.name}
                </Text>
              </Flex>
              <Text
                style={{
                  color: colors.black60,
                  fontSize: '15px',
                  lineHeight: 1.5,
                  flex: 1
                }}
              >
                {repo.description}
              </Text>
              <RepoMeta>
                <Flex css={{ alignItems: 'center', gap: '5px' }}>
                  <LanguageDot style={{ background: repo.languageColor }} />
                  {repo.language}
                </Flex>
                <Flex css={{ alignItems: 'center', gap: '5px' }}>
                  <StarIcon size={14} aria-hidden='true' />
                  {repo.stars}
                </Flex>
                <Flex css={{ alignItems: 'center', gap: '5px' }}>
                  <ForkIcon size={14} aria-hidden='true' />
                  {repo.forks}
                </Flex>
              </RepoMeta>
            </RepoCard>
          ))}
        </Flex>
      </Flex>

      {/* Links — always below cards on small screens, under text on large */}
      <Flex
        css={[
          theme({
            gap: [4, 4, 4, 4],
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%'
          }),
          {
            '@media (min-width: 1500px)': {
              display: 'none'
            }
          }
        ]}
      >
        <ArrowLink
          href='https://github.com/microlinkhq'
          css={theme({ fontSize: ['20px', '20px', '24px', '24px'] })}
        >
          Explore all repos on GitHub
        </ArrowLink>
      </Flex>
    </Flex>
  </Container>
)

const livePulse = keyframes`
  0%, 62% { color: inherit; }
  70%, 90% { color: #fd494a; }
  100% { color: inherit; }
`

const LiveText = styled('span')`
  animation: ${livePulse} 5s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    color: #fd494a;
  }
`

const ToolCardBase = styled(Flex)`
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid ${colors.black10};
  background: white;
  flex-direction: column;
  transition: border-color ${transition.medium}, box-shadow ${transition.medium};

  &:hover {
    border-color: ${colors.black20};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
`

const ToolImagePreview = styled(Flex)`
  overflow: hidden;
  align-items: flex-end;
  justify-content: center;
  background: ${colors.black03};
`

const ToolArrowIndicator = styled(Flex)`
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${colors.black05};
  flex-shrink: 0;
  transition: background ${transition.medium}, transform ${transition.medium};

  ${({ $hover }) =>
    $hover &&
    css`
      background: #fd494a;
      transform: translateX(2px);

      svg {
        color: white;
      }
    `}
`

const Playground = () => {
  const [isHover, setIsHover] = React.useState(false)
  const [isHover2, setIsHover2] = React.useState(false)

  return (
    <Container
      as='section'
      id='playground'
      css={theme({
        alignItems: 'center',
        width: '100%',
        pt: [4, 4, 4, 4],
        pb: [5, 5, 6, 6],
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
          <Link
            href='/tools/website-screenshot'
            css={theme({
              textDecoration: 'none',
              color: 'inherit',
              _hover: { color: 'inherit' },
              display: 'block',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
              width: '100%',
              maxWidth: ['550px', '550px', 'none', 'none'],
              flex: [null, null, 1, 1]
            })}
          >
            <ToolCardBase
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              onTouchStart={() => setIsHover(true)}
              onTouchEnd={() => setIsHover(false)}
              onTouchCancel={() => setIsHover(false)}
              css={{ height: '100%' }}
            >
              <ToolImagePreview
                css={theme({
                  height: ['180px', '200px', '260px', '260px'],
                  borderBottom: 1,
                  borderColor: 'black05'
                })}
              >
                <Image
                  src={cdnUrl('screenshot/browser/dark/apple.png')}
                  alt='Website Screenshot'
                  css={theme({
                    maxHeight: '100%',
                    objectFit: 'contain',
                    transition: `transform ${transition.long}`,
                    transform: isHover
                      ? 'scale(1.35) translateY(5%)'
                      : 'scale(1.25) translateY(14%)'
                  })}
                />
              </ToolImagePreview>
              <Flex
                css={theme({
                  p: [3, 3, 4, 4],
                  flexDirection: 'column',
                  gap: 3
                })}
              >
                <Flex
                  css={theme({
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 3
                  })}
                >
                  <Box css={{ flex: 1, minWidth: 0 }}>
                    <Flex css={theme({ alignItems: 'center', gap: 2, mb: 2 })}>
                      <Flex
                        css={theme({
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '28px',
                          height: '28px',
                          borderRadius: 2,
                          bg: 'rgba(253, 73, 74, 0.08)',
                          color: '#fd494a',
                          flexShrink: 0
                        })}
                      >
                        <Camera size={16} aria-hidden='true' />
                      </Flex>
                      <Text
                        css={theme({
                          fontSize: [2, 2, 2, 2],
                          fontWeight: 'bold',
                          color: 'black'
                        })}
                      >
                        Website Screenshot
                      </Text>
                    </Flex>
                    <Text
                      css={theme({
                        fontSize: [0, 0, 1, 1],
                        color: 'black60',
                        lineHeight: 2
                      })}
                    >
                      The fastest way to capture any website. Paste a URL, pick
                      a viewport, and get a high-resolution PNG or JPEG in
                      seconds. Supports custom overlays and backgrounds.
                    </Text>
                  </Box>
                  <ToolArrowIndicator
                    $hover={isHover}
                    css={theme({ mt: [0, 0, '5px', '10px'] })}
                  >
                    <ArrowRight size={16} aria-hidden='true' />
                  </ToolArrowIndicator>
                </Flex>
              </Flex>
            </ToolCardBase>
          </Link>

          <Link
            href='/tools/website-screenshot/animated'
            css={theme({
              textDecoration: 'none',
              color: 'inherit',
              _hover: { color: 'inherit' },
              display: 'block',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation',
              width: '100%',
              maxWidth: ['550px', '550px', 'none', 'none'],
              flex: [null, null, 1, 1]
            })}
          >
            <ToolCardBase
              onMouseEnter={() => setIsHover2(true)}
              onMouseLeave={() => setIsHover2(false)}
              onTouchStart={() => setIsHover2(true)}
              onTouchEnd={() => setIsHover2(false)}
              onTouchCancel={() => setIsHover2(false)}
              css={{ height: '100%' }}
            >
              <ToolImagePreview
                css={theme({
                  height: ['180px', '200px', '260px', '260px'],
                  borderBottom: 1,
                  borderColor: 'black05'
                })}
              >
                <video
                  src={cdnUrl('www/tools/animated-screenshot.mp4')}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label='Animated Screenshot'
                  css={theme({
                    width: ['90%', '90%', '80%', '80%'],
                    marginTop: ['60px', '200px', '50px', '75px'],
                    transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    transform: isHover2
                      ? 'scale(1.2) translateY(5%)'
                      : 'scale(1)'
                  })}
                />
              </ToolImagePreview>
              <Flex
                css={theme({
                  p: [3, 3, 4, 4],
                  flexDirection: 'column',
                  gap: 3
                })}
              >
                <Flex
                  css={theme({
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: 3
                  })}
                >
                  <Box css={{ flex: 1, minWidth: 0 }}>
                    <Flex css={theme({ alignItems: 'center', gap: 2, mb: 2 })}>
                      <Flex
                        css={theme({
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '28px',
                          height: '28px',
                          borderRadius: 2,
                          bg: 'rgba(253, 73, 74, 0.08)',
                          color: '#fd494a',
                          flexShrink: 0
                        })}
                      >
                        <Play size={16} aria-hidden='true' />
                      </Flex>
                      <Text
                        css={theme({
                          fontSize: [2, 2, 2, 2],
                          fontWeight: 'bold',
                          color: 'black'
                        })}
                      >
                        Animated Screenshot
                      </Text>
                    </Flex>
                    <Text
                      css={theme({
                        fontSize: [0, 0, 1, 1],
                        color: 'black60',
                        lineHeight: 2
                      })}
                    >
                      Capture an animated screenshot of any website. Get a GIF
                      or MP4 file in seconds with the motion that the webpage
                      has. Create rich previews.
                    </Text>
                  </Box>
                  <ToolArrowIndicator
                    $hover={isHover2}
                    css={theme({ mt: [0, 0, '5px', '10px'] })}
                  >
                    <ArrowRight size={16} aria-hidden='true' />
                  </ToolArrowIndicator>
                </Flex>
              </Flex>
            </ToolCardBase>
          </Link>
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

const speedStreak = keyframes`
  0% {
    transform: translateX(-10vw);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    transform: translateX(100vw);
    opacity: 0;
  }
`

const SpeedLine = styled('div')`
  position: absolute;
  height: ${({ $h }) => $h || '2px'};
  border-radius: 2px;
  background: ${({ $color }) => $color || 'rgba(255, 255, 255, 0.3)'};
  top: ${({ $top }) => $top};
  animation: ${speedStreak} ${({ $dur }) => $dur || '2s'}
    ${({ $delay }) => $delay || '0s'} linear infinite;
  width: ${({ $w }) => $w || '800px'};
  box-shadow: 0 0 ${({ $glow }) => $glow || '4px'}
    ${({ $color }) => $color || 'rgba(255, 255, 255, 0.2)'};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
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
    {/* Speed lines — full width absolute overlay */}
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
        $dur='2.25s'
        $delay='0s'
        $color='rgba(255,255,255,0.45)'
        $glow='8px'
      />
      <SpeedLine
        $top='22%'
        $w='80px'
        $h='2px'
        $dur='3.15s'
        $delay='0.6s'
        $color='rgba(255,255,255,0.2)'
        $glow='4px'
      />
      <SpeedLine
        $top='32%'
        $w='110px'
        $h='2px'
        $dur='1.95s'
        $delay='0.15s'
        $color='rgba(255,255,255,0.55)'
        $glow='10px'
      />
      <SpeedLine
        $top='42%'
        $w='50px'
        $h='1px'
        $dur='3.75s'
        $delay='1.1s'
        $color='rgba(255,255,255,0.12)'
        $glow='3px'
      />
      <SpeedLine
        $top='52%'
        $w='130px'
        $h='3px'
        $dur='1.8s'
        $delay='0.3s'
        $color='rgba(255,255,255,0.6)'
        $glow='12px'
      />
      <SpeedLine
        $top='62%'
        $w='60px'
        $h='1px'
        $dur='3.4s'
        $delay='1.35s'
        $color='rgba(255,255,255,0.15)'
        $glow='3px'
      />
      <SpeedLine
        $top='17%'
        $w='90px'
        $h='2px'
        $dur='2.1s'
        $delay='0.2s'
        $color='rgba(255,255,255,0.35)'
        $glow='6px'
      />
      <SpeedLine
        $top='37%'
        $w='120px'
        $h='3px'
        $dur='1.65s'
        $delay='0s'
        $color='rgba(255,255,255,0.5)'
        $glow='10px'
      />
      <SpeedLine
        $top='47%'
        $w='45px'
        $h='1px'
        $dur='3.2s'
        $delay='0.8s'
        $color='rgba(255,255,255,0.18)'
        $glow='3px'
      />
      <SpeedLine
        $top='57%'
        $w='75px'
        $h='2px'
        $dur='2.4s'
        $delay='0.45s'
        $color='rgba(255,255,255,0.3)'
        $glow='5px'
      />
      <SpeedLine
        $top='67%'
        $w='105px'
        $h='3px'
        $dur='1.9s'
        $delay='0.15s'
        $color='rgba(255,255,255,0.5)'
        $glow='9px'
      />
      <SpeedLine
        $top='77%'
        $w='55px'
        $h='1px'
        $dur='3.5s'
        $delay='1.2s'
        $color='rgba(255,255,255,0.14)'
        $glow='3px'
      />
    </Box>

    {/* Content */}
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
          fontSize: [2, 3, '44px', '44px'],
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
          color: 'white70',
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
        href='/benchmarks/screenshot'
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

const [{ reqs_pretty: reqsPretty, bytes_pretty: bytesPretty }] = analyticsData

const analyticsBytes = (() => {
  const [value, unit] = bytesPretty.split(' ')
  return `${Number(value).toFixed(0)}${unit}`
})()

const STATS = [
  { value: reqsPretty, label: 'reqs per month' },
  { value: analyticsBytes, label: 'data served' }
]

const CLIENTS = [
  {
    name: 'Vercel',
    description: 'Frontend cloud platform',
    logo: (
      <svg
        width='28'
        height='28'
        viewBox='0 0 76 65'
        fill='currentColor'
        aria-hidden='true'
      >
        <path d='M37.5274 0L75.0548 65H0L37.5274 0Z' />
      </svg>
    )
  },
  {
    name: 'Stripe',
    description: 'Payment infrastructure',
    logo: (
      <svg
        width='28'
        height='28'
        viewBox='0 0 24 24'
        fill='currentColor'
        aria-hidden='true'
      >
        <path d='M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-7.076-2.19l-.893 5.575C4.746 22.72 7.311 24 11.326 24c2.588 0 4.737-.665 6.263-1.928 1.636-1.348 2.41-3.28 2.41-5.608 0-4.116-2.607-5.834-6.023-7.314z' />
      </svg>
    )
  },
  {
    name: 'GitHub',
    description: 'Developer platform',
    logo: (
      <svg
        width='28'
        height='28'
        viewBox='0 0 24 24'
        fill='currentColor'
        aria-hidden='true'
      >
        <path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
      </svg>
    )
  },
  {
    name: 'Notion',
    description: 'Workspace for teams',
    logo: (
      <svg
        width='28'
        height='28'
        viewBox='0 0 24 24'
        fill='currentColor'
        aria-hidden='true'
      >
        <path d='M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.98-.7-2.055-.607L2.58 2.514c-.467.047-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.166V6.354c0-.606-.233-.933-.748-.886l-15.177.887c-.56.046-.747.326-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.45.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V8.858l-1.168-.093c-.093-.42.14-1.026.793-1.073l3.455-.233 4.763 7.28v-6.44l-1.215-.14c-.093-.513.28-.886.747-.933zM1.44 1.2L15.26 0c1.68-.14 2.1.093 2.802.606l3.87 2.7c.467.326.606.42.606 1.026V22.04c0 1.026-.373 1.633-1.68 1.726L5.44 24.56c-.98.047-1.448-.093-1.962-.747l-3.13-4.06c-.56-.746-.793-1.306-.793-1.96V2.926c0-.84.373-1.54 1.886-1.726z' />
      </svg>
    )
  },
  {
    name: 'Linear',
    description: 'Issue tracking tool',
    logo: (
      <svg
        width='28'
        height='28'
        viewBox='0 0 24 24'
        fill='currentColor'
        aria-hidden='true'
      >
        <path d='M2.77 17.717l3.513 3.513a11.985 11.985 0 01-3.513-3.513zM1.085 14.09l8.825 8.825a12.077 12.077 0 01-2.417-.622L1.707 16.507a12.077 12.077 0 01-.622-2.417zM1.74 9.47l12.79 12.79a12.02 12.02 0 01-2.042.24L1.5 11.512a12.02 12.02 0 01.24-2.042zM3.132 6.345L17.655 20.868a11.946 11.946 0 01-1.584 1.03L2.103 7.929a11.946 11.946 0 011.03-1.584zM5.78 3.78l14.44 14.44a12.016 12.016 0 01-1.283 1.327L4.453 5.063A12.016 12.016 0 015.78 3.78zm3.564-2.072L21.272 13.636a11.906 11.906 0 01-.622 2.417L7.355 2.758a11.952 11.952 0 011.989-1.05zM12.488 1.5l10.012 10.012a12.02 12.02 0 01-.24 2.042L10.446 1.74a12.02 12.02 0 012.042-.24zm4.019.207L22.293 7.493a12.077 12.077 0 01.622 2.417l-8.825-8.825a12.077 12.077 0 012.417.622zm3.776 3.276A11.985 11.985 0 0121.217 2.77l-3.513 3.513a11.985 11.985 0 013.513-3.513z' />
      </svg>
    )
  }
]

const ClientLogo = styled(Flex)`
  transition: transform 0.2s ease, filter 0.3s ease;

  &:hover {
    transform: translateY(-2px) scale(1.05);
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.12))
      drop-shadow(0 0 6px rgba(0, 0, 0, 0.06));
  }
`

const StatSeparator = styled(Box)`
  width: 1px;
  align-self: stretch;
  background: ${colors.black10};
`

const Clients = () => (
  <Container
    as='section'
    css={theme({
      alignItems: 'center',
      maxWidth: layout.large,
      pt: [1, 1, 2, 2],
      pb: [5, 5, 6, 6]
    })}
  >
    <Caps
      css={theme({
        fontSize: ['14px', '14px', '16px', '16px'],
        fontWeight: 'bold',
        color: 'black50',
        letterSpacing: '0.1em'
      })}
    >
      Live usage this month across all clients
    </Caps>
    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        px: [3, 4, 0, 0],
        justifyContent: 'center',
        alignItems: 'center',
        gap: [3, 4, 5, 5],
        maxWidth: layout.large,
        width: '100%'
      })}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {STATS.map(({ value, label }, index) => (
        <React.Fragment key={label}>
          <Flex
            css={theme({
              flexDirection: 'column',
              alignItems: 'center',
              px: [1, 2, 3, 3]
            })}
          >
            <Subhead
              forwardedAs='div'
              titleize={false}
              css={theme({
                fontSize: ['24px', '32px', '42px', '42px'],
                fontWeight: 'bold',
                color: 'black'
              })}
            >
              {value}
            </Subhead>
            <Caps
              css={theme({
                pt: 1,
                fontSize: 0,
                fontWeight: 'bold',
                color: 'black50'
              })}
            >
              {label}
            </Caps>
          </Flex>
          {index < STATS.length - 1 && <StatSeparator />}
        </React.Fragment>
      ))}
    </Flex>
    <Caps
      css={theme({
        pt: [4, 4, 5, 5],
        fontSize: [1, 1, '16px', '16px'],
        fontWeight: 'bold',
        color: 'black50',
        letterSpacing: '0.1em',
        pb: [3, 3, 0, 0]
      })}
    >
      Some of our clients
    </Caps>
    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        px: [3, 4, 0, 0],
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: [4, 4, 5, 5],
        maxWidth: layout.large
      })}
    >
      {CLIENTS.map(({ name, description, logo }) => (
        <ClientLogo
          key={name}
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
          <Text css={theme({ fontSize: 0, color: 'black80' })}>
            {description}
          </Text>
        </ClientLogo>
      ))}
    </Flex>
  </Container>
)

const CodeExample = () => (
  <Container
    as='section'
    css={theme({
      alignItems: 'center',
      width: '100%',
      pt: [5, 5, 6, 6],
      pb: [3, 3, 5, 5],
      px: [1, 1, 5, 5]
    })}
  >
    <Flex
      css={[
        theme({
          width: '100%',
          mx: 'auto',
          flexDirection: 'column',
          alignItems: 'center',
          gap: [4, 4, 5, 5]
        }),
        {
          '@media (min-width: 1500px)': {
            flexDirection: 'row'
          }
        }
      ]}
    >
      <Flex
        css={[
          theme({
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }),
          {
            '@media (min-width: 1500px)': {
              width: '50%',
              alignItems: 'flex-start'
            }
          }
        ]}
      >
        <Subhead
          css={[
            theme({
              fontSize: [3, 3, 4, 4],
              textAlign: 'center'
            }),
            {
              '@media (min-width: 1500px)': {
                textAlign: 'left'
              }
            }
          ]}
        >
          Website capture API in any language
        </Subhead>
        <Caption
          forwardedAs='div'
          css={[
            theme({
              pt: [3, 3, 4, 4],
              fontSize: [2, 2, 3, 3],
              textAlign: 'center',
              maxWidth: [layout.small, layout.small, layout.normal, '700px']
            }),
            {
              '@media (min-width: 1500px)': {
                textAlign: 'left'
              }
            }
          ]}
        >
          Microlink screenshot API delivers enterprise-grade screen capture API
          through a developer-friendly web screenshot service.
        </Caption>
        <Flex
          css={[
            theme({
              pt: [3, 3, 4, 4],
              fontSize: [2, 2, 3, 3],
              justifyContent: 'center'
            }),
            {
              '@media (min-width: 1500px)': {
                justifyContent: 'flex-start'
              }
            }
          ]}
        >
          <ArrowLink href='/docs/api/parameters/screenshot'>
            Read the docs
          </ArrowLink>
        </Flex>
      </Flex>
      <Flex
        css={[
          theme({
            width: '100%',
            justifyContent: 'center',
            pb: [4, 4, 4, 5],
            px: [2, 3, 0, 0]
          }),
          {
            '@media (min-width: 1500px)': {
              width: '40%',
              justifyContent: 'flex-end',
              minWidth: '750px'
            },
            '& > div, & > div > div:first-child': {
              width: '100%',
              maxWidth: '750px'
            },
            '& > div > div:first-child': {
              boxShadow:
                '0 24px 64px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)'
            }
          }
        ]}
      >
        <MultiCodeEditorInteractive
          height={300}
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
  </Container>
)

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
  border: 1px solid;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`

const Pricing = () => (
  <Container
    as='section'
    id='pricing'
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'pinky',
      pt: 5,
      pb: [5, 5, 5, 6]
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
      <PricingCard css={{ borderColor: colors.black10 }}>
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
          <Text css={theme({ color: 'black50', fontSize: [0, 0, 1, 1] })}>
            /month
          </Text>
        </Flex>
        <Text
          css={theme({
            pt: 2,
            color: 'black60',
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
          css={theme({ pt: 3, fontSize: ['18px', '18px', '20px', '20px'] })}
        >
          <ArrowLink href='/docs/api/parameters/screenshot'>
            Get started free
          </ArrowLink>
        </Flex>
      </PricingCard>

      <PricingCard
        css={{
          borderColor: 'transparent',
          background:
            'linear-gradient(white, white) padding-box, linear-gradient(90deg, #f76698, #c03fa2 60%, #8c1bab 100%) border-box',
          border: '2px solid transparent'
        }}
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
          <Text css={theme({ color: 'black50', fontSize: [0, 0, 1, 1] })}>
            /month
          </Text>
        </Flex>
        <Text
          css={theme({
            pt: 2,
            color: 'black60',
            fontSize: [1, 1, '18px', '18px']
          })}
        >
          46,000 requests/month for production workloads.
        </Text>
        <Box css={theme({ pt: 3 })}>
          <PricingCheck>Everything in Free</PricingCheck>
          <PricingCheck>
            <Link href='/docs/api/parameters/proxy'>
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
          css={theme({ pt: 3, fontSize: ['18px', '18px', '20px', '20px'] })}
        >
          <ArrowLink href='/#pricing'>See all plans</ArrowLink>
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
  gap: 14px;
  align-items: flex-start;
`

const CapabilityIcon = styled(Flex)`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: rgba(253, 73, 74, 0.1);
  color: #fd494a;
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
      as='section'
      css={theme({
        alignItems: 'center',
        maxWidth: '100%',
        bg: 'pinky',
        pt: [4, 4, 5, 6],
        pb: [5, 5, 5, 5]
      })}
    >
      <Flex
        css={[
          theme({
            width: '100%',
            mx: 'auto',
            flexDirection: 'column',
            alignItems: 'center',
            gap: [4, 4, 5, 5],
            px: [4, 4, 5, 5]
          }),
          { '@media (min-width: 2100px)': { width: '80%' } }
        ]}
      >
        <Subhead
          css={[
            theme({
              fontSize: [3, 3, '40px', 4],
              textAlign: 'center',
              width: '100%'
            }),
            { '@media (min-width: 1200px)': { display: 'none' } }
          ]}
        >
          Everything you need,{' '}
          <span style={{ color: '#fd494a' }}>one API call away</span>
        </Subhead>
        <Flex
          css={theme({
            width: '100%',
            flexDirection: ['column', 'column', 'column', 'row'],
            alignItems: 'center',
            gap: [4, 4, 5, 6]
          })}
        >
          <Box
            css={[
              theme({
                width: ['100%', '100%', '65%', '50%'],
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }),
              {
                lineHeight: 0,
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
                  fontSize: ['12px', '12px', '13px', '13px'],
                  fontFamily: 'mono',
                  letterSpacing: '0.01em',
                  flex: 1,
                  minWidth: 0,
                  lineHeight: '20px'
                })}
                style={{ color: '#4ade80', wordBreak: 'break-all' }}
              >
                {capApiUrl}
              </Text>
              <CopyButton
                type='button'
                onClick={handleCapCopy}
                aria-label={capCopied ? 'Copied!' : 'Copy API URL'}
              >
                {capCopied ? (
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
            </ScreenshotApiBar>
          </Box>
          <Flex
            css={theme({
              width: ['100%', '100%', '100%', '50%'],
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 4
            })}
          >
            <Subhead
              css={[
                theme({
                  fontSize: 4,
                  textAlign: 'left',
                  pb: 1
                }),
                {
                  display: 'none',
                  '@media (min-width: 1200px)': { display: 'block' }
                }
              ]}
            >
              Everything you need,{' '}
              <span style={{ color: '#fd494a' }}>one API call away</span>
            </Subhead>
            <Flex
              css={[
                theme({ gap: [3, 3, 3, 4] }),
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
                  <Flex css={{ flexDirection: 'column', gap: '4px' }}>
                    <Text
                      css={theme({
                        fontWeight: 'bold',
                        fontSize: [1, 1, 2, 2]
                      })}
                    >
                      {title}
                    </Text>
                    <Text
                      css={theme({ color: 'black60', fontSize: [0, 0, 1, 1] })}
                    >
                      {description}
                    </Text>
                  </Flex>
                </CapabilityItem>
              ))}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  )
}

const CTA_DURATION = 6.2
const CTA_SWEEP_PCT = (1.2 / CTA_DURATION) * 100
const CTA_CHAR_PCT = CTA_SWEEP_PCT / 5

const ctaCharAnim = index => {
  const on = index * CTA_CHAR_PCT
  const off = on + CTA_CHAR_PCT
  return keyframes`
    0%, ${on}%, ${off}%, 100% { color: inherit; }
    ${on + 0.01}%, ${off - 0.01}% { color: #fd494a; }
  `
}

const ctaAnims = Array.from({ length: 5 }, (_, i) => ctaCharAnim(i))

const CtaChar = styled('span')`
  animation: ${({ $i }) => ctaAnims[$i]} ${CTA_DURATION}s step-end infinite;
`

const ctaNowAnim = keyframes`
  0%, ${CTA_SWEEP_PCT}% { color: inherit; }
  ${CTA_SWEEP_PCT + 0.01}%, 100% { color: #fd494a; }
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
      pt: 1,
      pb: [5, 5, 6, 6]
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
          fontSize: ['40px', '48px', '52px', '58px'],
          textAlign: 'center'
        })}
      >
        {'Start'.split('').map((char, i) => (
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
          textAlign: 'center'
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
          href='/docs/api/parameters/screenshot'
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
                color: 'black60',
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
      title='Screenshot API FAQ'
      titleSize={['40px', 4, 5, 5]}
      caption='Everything you need to know about our website screenshot API and web screenshot service.'
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
                No. Microlink acts as a fully managed, "backendless" browser
                service. We maintain the underlying Chromium infrastructure,
                manage the instance pool, and handle edge caching.
              </div>
              <div>
                You simply make a REST API call and receive a structured JSON
                payload or a binary image directly — the easiest way to
                automatically take screenshots of website pages without
                maintaining Puppeteer or Playwright on your own servers.
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
                including device emulation, custom HTTP headers, and CSS
                injection.
              </div>
              <div>
                No credit card, account creation, or API key is required to
                start developing. Just point your code at the endpoint and begin
                capturing.
              </div>
            </>
          )
        },
        {
          question: 'How do you handle cookie banners and ad popups?',
          answer: (
            <>
              <div>
                By default, our engine includes a built-in, frequently updated
                adblocker. It automatically dismisses GDPR cookie consent
                banners, closes newsletter popups, and removes injected ads.
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
                Absolutely. Our HTML screenshot API provides complete browser
                control. You can inject custom CSS, execute arbitrary
                JavaScript, scroll to specific coordinates, or wait for specific
                DOM elements or network events to load.
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
                We guarantee enterprise-grade reliability with a 99.95% uptime
                SLA. Every request runs in an isolated browser instance to
                guarantee security and avoid shared-state leaks.
              </div>
              <div>
                For latency: assets are distributed via Cloudflare's 240+ edge
                locations, meaning cached responses are delivered in
                milliseconds. For cold starts, our optimized Chromium pool
                typically responds in under 3 seconds (P95).
              </div>
            </>
          )
        },
        {
          question: 'What output formats are supported?',
          answer: (
            <>
              <div>
                You can export captures as optimized JPEG, PNG, or MP4 formats.
                We support specific viewport cropping as well as full-page
                scrolling captures.
              </div>
              <div>
                Depending on your integration, you can request a raw image
                buffer, or a comprehensive JSON payload that includes the image
                URL alongside metadata, performance timings, and HTTP headers.
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
                <Link href='/docs/api/parameters/screenshot'>
                  documentation
                </Link>{' '}
                for interactive playground examples, official SDKs (Node.js,
                Python, Ruby, Go), and copy-paste code snippets.
              </div>
              <div>
                Need architectural advice or have custom requirements? Contact
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
    title='Screenshot API | Fast, Automated Web Snapshots — Microlink'
    description='The best screenshot API and web screenshot service to capture any URL as an image. Built for developers. Features device emulation, ad-blocking, and edge caching. Start for free.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='SoftwareApplication'
    structured={{
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://microlink.io/screenshot',
      name: 'Microlink Screenshot API',
      description:
        'A backendless API for developers to programmatically capture website screenshots, generate web snapshots, and automate browser tasks using Headless Chrome.',
      url: 'https://microlink.io/screenshot',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web, Platform-Agnostic',
      provider: {
        '@type': 'Organization',
        name: 'Microlink',
        url: 'https://microlink.io'
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description:
          'Free tier available for experimentation. Pro plans scale for high concurrency.'
      },
      keywords:
        'screenshot API, website capture, automated screenshots, puppeteer API, headless chrome, web snapshot',
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
      <FetchProvider fromCache={fromCache} mqlOpts={{ screenshot: true }}>
        {({ data }) => {
          return (
            <>
              <Hero data={data} onRequestTiming={handleRequestTiming} />
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
                css={theme({ px: 4, pb: 5 })}
                title={
                  <Subhead css={{ width: '100%', textAlign: 'left' }}>
                    The best screenshot API,{' '}
                    <span
                      css={{
                        display: 'block',
                        color: '#fd494a',
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
                    No more servers to maintain, load balancers, or paying for
                    capacity you don’t use — our screenshot service API lets you
                    spend more time building, less time configuring, with easy
                    integration via{' '}
                    <Link href='/docs/api/parameters/screenshot'>
                      web screenshot API
                    </Link>
                    .
                  </>
                }
                features={FEATURES}
              />
              <CallToAction />
              <ProductInformation />
            </>
          )
        }}
      </FetchProvider>
    </Layout>
  )
}

export default ScreenshotPage
