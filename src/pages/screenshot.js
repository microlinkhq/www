import { borders, layout, colors, theme } from 'theme'
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

import { useHealthcheck } from 'components/hook/use-healthcheck'

import { findDemoLinkById } from 'helpers/demo-links'

import analyticsData from '../../data/analytics.json'

const FEATURES = [
  {
    title: 'Enterprise-Grade Screenshot Service',
    description:
      'Production-ready screenshot API service built for scale. Handle millions of web captures with 99.9% uptime SLA and guaranteed performance for business-critical workflows.'
  },
  {
    title: 'Free Screenshot API',
    description:
      'Start using the free website screenshot API immediately. No setup fees, pay-as-you-grow pricing that scales with your screen capture needs.'
  },
  {
    title: 'Global CDN Network',
    description:
      'Web screenshot service distributed across 240+ edge locations powered by Cloudflare. Lightning-fast site screenshot delivery from anywhere worldwide.'
  },
  {
    title: 'Developer-First URL Screenshot API',
    description:
      'RESTful screenshot API designed for developers. Language-agnostic integration with comprehensive SDKs to capture any URL as an image.'
  },
  {
    title: 'Browser Screenshot Control',
    description:
      'Full browser screenshot API with device emulation. Capture screenshots exactly as users see them across any device, viewport, or interaction.'
  },
  {
    title: 'HTML Screenshot & Customization',
    description:
      'Complete HTML screenshot API control. Custom CSS injection, JavaScript execution, overlays, and precise element targeting for pixel-perfect screen captures.'
  },
  {
    title: 'Always-Fresh Web Snapshots',
    description:
      'Smart caching with automatic refresh keeps your URL snapshots current. Stay up to date with website changes while maintaining optimal screenshot service performance.'
  },
  {
    title: 'Multiple Output Formats',
    description:
      'Flexible website capture API formats including WebP optimization. Full-page captures, custom viewports, and high-quality image exports for any use case.'
  },
  {
    title: 'Zero-Config Integration',
    description:
      'Interactive documentation with live code examples. Get started with our web API screenshot integration in minutes with copy-paste snippets and embed-ready code.'
  }
]

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)

const Caption = withTitle(CaptionBase)

const HERO_MQ = '@media (min-width: 1200px) and (max-width: 1750px)'

const BrowserWindow = styled('div')`
  border-radius: 10px;
  overflow: hidden;
  background: #1c1c1e;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
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
      animation: ${caretPulse} 2s ease-in-out 5;
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
  'https://vercel.com'
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
  const [screenshotSrc, setScreenshotSrc] = useState(
    `https://api.microlink.io?url=${encodeURIComponent(
      'https://apple.com'
    )}&screenshot&embed=screenshot.url`
  )
  const [imgKey, setImgKey] = useState(0)
  const [imgVisible, setImgVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isCopied, setIsCopied] = useState(false)
  const [isGlowing, setIsGlowing] = useState(false)
  const [isAttractMode, setIsAttractMode] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [navStack, setNavStack] = useState(['https://apple.com'])
  const [navIndex, setNavIndex] = useState(0)
  const abortRef = useRef(null)
  const copyTimerRef = useRef(null)
  const hasImageRef = useRef(false)
  const skipBlurRef = useRef(false)

  const DEMO_URLS = ['vercel.com', 'microlink.io']

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
      await delay(1800)
      if (check()) return

      for (let i = 0; i < DEMO_URLS.length; i++) {
        const url = DEMO_URLS[i]
        if (check()) return

        if (i === 0) {
          // first url: glow then wait before typing
          setIsGlowing(true)
          await delay(250)
          if (check()) return
        }
        // subsequent urls: glow+clear already done between iterations, type immediately

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
        fetchScreenshot(normalized)

        if (i < DEMO_URLS.length - 1) {
          await delay(3000)
          if (check()) return
          setIsGlowing(true)
          await delay(250)
          if (check()) return
          setInputUrl('')
        } else {
          // last url loaded — attract mode after screenshot loads
          await delay(2000)
          if (check()) return
          setIsGlowing(true)
          setIsFocused(true)
          setIsAttractMode(true)
          setIsPulsing(true)
          await delay(5000) // 5 cycles × 2s
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

      const t0 = Date.now()

      try {
        const res = await fetch(
          `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot`,
          { cache: 'no-store', signal: abortRef.current.signal }
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
    const newIndex = navIndex - 1
    const url = navStack[newIndex]
    setNavIndex(newIndex)
    setInputUrl(url)
    fetchScreenshot(url)
  }

  const handleForward = () => {
    if (navIndex >= navStack.length - 1) return
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
            The web screenshot service that turns any URL into a pixel-perfect
            image. Capture site screenshots with full browser control, device
            emulation, and professional output.
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
            <ArrowLink href='https://github.com/microlinkhq/browserless'>
              See on GitHub
            </ArrowLink>
          </Flex>
        </HeroTextContainer>
        <Flex
          css={[
            theme({
              width: ['100%', '100%', '100%', '50%'],
              pt: [4, 4, 4, 0],
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
          >
            <BrowserWindow
              onClick={e => {
                if (
                  !e.target.closest('input') &&
                  !e.target.closest('[role="listbox"]')
                ) {
                  setIsFocused(false)
                  stopAttract()
                }
              }}
            >
              <BrowserHeader>
                <TrafficLights>
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
                  onLoad={() => {
                    hasImageRef.current = true
                    setImgVisible(true)
                    setIsLoading(false)
                  }}
                  onError={() => setIsLoading(false)}
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
    )
      return
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
          Get a screenshot back
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

const Resume = () => (
  <Container
    as='section'
    id='resume'
    css={theme({
      alignItems: 'center',
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      pb: [5, 5, 6, 6]
    })}
  >
    <Subhead variant='gradient'>Website capture API for every use case</Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      <b>Microlink screenshot API</b> delivers enterprise-grade screen capture
      through a developer-friendly web API. Automatically take screenshots of
      any website for documentation, monitoring, archiving, and visual content
      creation.
    </Caption>

    <Block
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Always-fresh web snapshots from the screenshot API'
          src='https://cdn.microlink.io/illustrations/genius-idea.svg'
        />
      }
      blockTwo={
        <Flex
          css={theme({
            px: [4, 0, 0, 0],
            flexDirection: 'column',
            alignItems: 'baseline'
          })}
        >
          <Subhead
            css={theme({
              pt: [4, 4, 4, 0],
              fontSize: [3, 3, 4, 4],
              textAlign: 'left'
            })}
          >
            Always-fresh web snapshots
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Every URL snapshot is cached on the edge, respecting{' '}
            <Link href='/docs/api/parameters/ttl'>ttl</Link>. Consuming cached
            screenshot responses doesn’t affect your plan, keeping your web
            snapshots fast and cost-effective.
          </Text>
        </Flex>
      }
    />

    <Block
      flexDirection='row-reverse'
      blockTwo={
        <Flex
          css={theme({
            px: [4, 0, 0, 0],
            flexDirection: 'column',
            alignItems: 'baseline'
          })}
        >
          <Subhead
            css={theme({
              pt: [4, 4, 4, 0],
              fontSize: [3, 3, 4, 4],
              textAlign: 'left'
            })}
          >
            Browser screenshot API with full control
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Full browser automation and device emulation for automated website
            screenshots. Our site screenshot API captures pages exactly as users
            experience them with custom viewports, interactions, and responsive
            design testing across all devices and screen sizes.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Browser screenshot API with full device control'
          src='https://cdn.microlink.io/illustrations/robots.svg'
        />
      }
    />

    <Block
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Professional screen capture and website screenshot output'
          src='https://cdn.microlink.io/illustrations/abstract-page-is-under-construction.svg'
        />
      }
      blockTwo={
        <Flex
          css={theme({
            px: [4, 0, 0, 0],
            flexDirection: 'column',
            alignItems: 'baseline'
          })}
        >
          <Subhead
            css={theme({
              pt: [4, 4, 4, 0],
              fontSize: [3, 3, 4, 4],
              textAlign: 'left'
            })}
          >
            Professional screen capture output
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Create stunning visual compositions with{' '}
            <Link href='/docs/api/parameters/screenshot/overlay'>
              overlay effects
            </Link>
            , custom backgrounds, and professional presentation. The best
            website screenshot tool for marketing materials, documentation, and
            branded content creation.
          </Text>
        </Flex>
      }
    />
  </Container>
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
      pt: [4, 4, 5, 5],
      pb: [2, 2, 3, 3]
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
      'Sub-second cached responses with P95 cold starts under 3 seconds. Global edge network ensures low latency worldwide.'
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
      'Inject CSS, execute JavaScript, click elements, scroll, wait for selectors — automate any interaction before capture.'
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

  const capApiUrl = `api.microlink.io?screenshot&url=https://ft.com&adblock=${adblock}`

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
        pb: [5, 5, 6, 6]
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
            gap: [4, 4, 5, 5]
          })}
        >
          <Box
            css={[
              theme({
                width: ['100%', '100%', '70%', '50%'],
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
              style={{ lineHeight: 1 }}
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

const ProductInformation = () => {
  return (
    <Faq
      title='Screenshot API FAQ'
      caption='Everything you need to know about our website screenshot API and web screenshot service.'
      css={theme({
        pb: [5, 5, 6, 6],
        bg: 'pinky',
        borderTop: `${borders[1]} ${colors.pinkest}`,
        borderBottom: `${borders[1]} ${colors.pinkest}`
      })}
      questions={[
        {
          question: 'What is a screenshot API and what can I build with it?',
          answer: (
            <>
              <div>
                A screenshot API is a web service that programmatically captures
                screenshots of any URL or HTML page. Microlink's website
                screenshot API lets you build visual monitoring systems,
                automated screen capture workflows, visual regression testing,
                content archiving, and documentation generators at scale.
              </div>
              <div>
                Perfect for developers building visual testing suites, content
                management platforms, social media automation, and any
                application that needs a reliable site screenshot API.
              </div>
            </>
          )
        },
        {
          question: 'Is this a free screenshot API?',
          answer: (
            <>
              <div>
                Yes — Microlink offers a free website screenshot API tier to get
                started immediately. The free screenshot API includes full
                access to all features: browser screenshot capture, HTML
                screenshot rendering, device emulation, and custom overlays. No
                credit card required.
              </div>
              <div>
                As your screenshot needs grow, pay-as-you-grow pricing ensures
                you only pay for what you use. The website screenshot API free
                tier is perfect for prototyping and small projects.
              </div>
            </>
          )
        },
        {
          question: 'What makes this the best screenshot API?',
          answer: (
            <>
              <div>
                Microlink stands out as the best screenshot API for its
                combination of speed, reliability, and developer experience. Our
                screenshot service delivers sub-second captures with a 99.9%
                uptime SLA, distributed across 240+ edge locations worldwide.
              </div>
              <div>
                Unlike other screenshot API services, Microlink provides a
                unified web screenshot API with built-in browser automation,
                full device emulation, and advanced customization — all through
                a single REST endpoint. It's the best website screenshot tool
                for teams that need production-grade reliability.
              </div>
            </>
          )
        },
        {
          question: 'How do I automate website screenshots?',
          answer: (
            <>
              <div>
                Automate website screenshots by calling our URL screenshot API
                with any target page. The API lets you programmatically take
                screenshots of web pages with a simple HTTP request — no
                headless browser infrastructure to manage. Schedule automated
                screenshots of web pages using cron jobs, CI/CD pipelines, or
                event-driven webhooks.
              </div>
              <div>
                Whether you need to automatically take screenshots of a website
                on a schedule or capture an automatic screenshot of a website in
                response to events, our web API screenshot endpoint handles it.
              </div>
            </>
          )
        },
        {
          question:
            'Does the screenshot API support HTML rendering and browser control?',
          answer: (
            <>
              <div>
                Yes. The HTML screenshot API renders any markup with full
                Chromium support, including CSS, web fonts, and JavaScript
                execution. Our browser screenshot API provides complete control
                over viewports, device emulation, scroll position, element
                targeting, and wait conditions for dynamic content.
              </div>
              <div>
                You can inject custom CSS and JavaScript before capture, making
                it the most flexible screen capture API for complex pages that
                require interaction or authentication.
              </div>
            </>
          )
        },
        {
          question: 'How reliable is the web screenshot service?',
          answer: (
            <>
              <div>
                Enterprise-grade reliability with 99.9% uptime SLA. Our website
                screenshot service runs on optimized Chromium infrastructure
                that handles complex websites, dynamic content, and custom
                interactions with consistent high-quality results.
              </div>
              <div>
                Every request runs in isolated browser instances for security.
                Screenshots are delivered via global CDN for optimal web
                screenshot service performance worldwide.
              </div>
            </>
          )
        },
        {
          question: 'How do I get started with the screenshot API?',
          answer: (
            <>
              <div>
                Start free with our screenshot API service. Visit our{' '}
                <Link href='/docs/api/getting-started/overview'>
                  documentation
                </Link>{' '}
                for interactive examples, SDKs in multiple languages, and
                ready-to-use code snippets. No infrastructure setup required —
                just pass a URL and get a screenshot back.
              </div>
              <div>
                Have questions? Contact us at{' '}
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
    title='Screenshot API — capture any website screenshot'
    description='The best screenshot API and web screenshot service to capture any URL as an image. Free website screenshot API with browser control, device emulation, and HTML screenshot support.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='SoftwareApplication'
    structured={{
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://microlink.io/screenshot',
      name: 'Microlink Screenshot API',
      description:
        'Website screenshot API service to capture any site screenshot or web snapshot via a simple URL. Free screenshot API with browser automation and HTML rendering.',
      url: 'https://microlink.io/screenshot',
      applicationCategory: ['DeveloperApplication', 'API'],
      keywords: [
        'screenshot api',
        'website screenshot api',
        'web screenshot api',
        'site screenshot api',
        'screenshot service',
        'browser screenshot api',
        'url screenshot api',
        'html screenshot api',
        'free screenshot api',
        'website capture api',
        'screen capture api',
        'web screenshot service',
        'website screenshot service',
        'screenshot api service',
        'best screenshot api',
        'automated website screenshots',
        'web snapshot',
        'url snapshot',
        'screenshot url tool'
      ],
      about: [
        { '@type': 'Thing', name: 'Screenshot API' },
        { '@type': 'Thing', name: 'Website Screenshot Service' },
        { '@type': 'Thing', name: 'Website Capture API' },
        { '@type': 'Thing', name: 'Web Screenshot Service' },
        { '@type': 'Thing', name: 'Browser Screenshot API' }
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
              <Clients />
              <Features
                css={theme({ px: 4, pb: 6 })}
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
                    capacity you don’t use — our screenshot service lets you
                    spend more time building, less time configuring, with easy
                    integration via{' '}
                    <Link href='/docs/api/getting-started/overview'>
                      web screenshot API
                    </Link>
                    .
                  </>
                }
                features={FEATURES}
              />
              <Resume />
              <ProductInformation />
            </>
          )
        }}
      </FetchProvider>
    </Layout>
  )
}

export default ScreenshotPage
