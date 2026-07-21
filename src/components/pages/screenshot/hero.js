import React, { useState, useCallback, useRef, useEffect } from 'react'
import styled, { css, keyframes } from 'styled-components'
import {
  borders,
  colors,
  fontSizes,
  gradient,
  layout,
  radii,
  shadows,
  space,
  theme,
  transition
} from 'theme'
import { Terminal as TerminalIcon } from 'react-feather'
import Box from 'components/elements/Box'
import Button from 'components/elements/Button/Button'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Text from 'components/elements/Text'
import ArrowLink from 'components/patterns/ArrowLink'
import {
  ApiErrorTitle,
  ApiErrorBody
} from 'components/patterns/ApiError/ApiError'
import NerdStatsOverlay, {
  extractNerdStats,
  buildMqlQuery
} from 'components/patterns/NerdStats/NerdStats'
import { rotate, dash } from 'components/keyframes'
import { normalizeApiError } from 'helpers/api-error'
import { withTitle } from 'helpers/hoc/with-title'
import { trackEvent } from 'helpers/plausible'
import { Caption, CopyButton, HERO_LAYOUT, ScreenshotApiBar } from './shared'

const FIRST_URL = 'https://apple.com'
const FIRST_IMAGE_URL = 'https://cdn.microlink.io/www/apple.png'

const Heading = withTitle(HeadingBase)

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
  box-shadow: ${shadows[3]};

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
    color: ${colors.gray7};

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
    box-shadow: ${shadows[0]};
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
      box-shadow: ${shadows[0]};
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
      box-shadow: ${shadows[0]};
    `}

  &:focus-within {
    background: ${colors.white};
    border-color: ${colors.black10};
    box-shadow: ${shadows[0]};
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

const HistoryDropdown = styled('div')`
  ${theme({ position: 'absolute', borderRadius: 4, bg: 'white' })};
  top: calc(100% + ${space[1]});
  left: 0;
  right: 0;
  border: ${borders[1]} ${colors.black20};
  overflow: hidden;
  box-shadow: ${shadows[4]};
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

const DEFAULT_HISTORY = [
  'https://apple.com',
  'https://microlink.io',
  'https://unavatar.io'
]

const addToHistory = (history, url) => {
  const filtered = history.filter(u => u !== url)
  return [url, ...filtered].slice(0, MAX_HISTORY)
}

const DEMO_URLS = ['unavatar.io', 'microlink.io']

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

export const Hero = function Hero ({
  onRequestTiming,
  heroLayout = HERO_LAYOUT
}) {
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
      if (check()) return false
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
        setNavStack(s => [...s, normalized].slice(-MAX_HISTORY))
        setNavIndex(i + 1)
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

  const displayValue = isFocused
    ? stripProtocol(inputUrl)
    : stripForDisplay(inputUrl)
  const apiUrl = `https://api.microlink.io?screenshot&url=${inputUrl}`

  const fetchScreenshot = useCallback(
    async (url, { track } = {}) => {
      if (track) trackEvent('demo submit', { product: 'screenshot' })
      if (abortRef.current) abortRef.current.abort()
      abortRef.current = new window.AbortController()

      setIsLoading(true)
      setError(null)
      setShowNerdStats(false)

      const t0 = Date.now()

      let waitForImageLoad = false
      try {
        const res = await window.fetch(
          `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot`,
          { signal: abortRef.current.signal }
        )
        const json = await res.json()
        const elapsedMs = Date.now() - t0

        if (!res.ok) {
          setError(normalizeApiError(json, res))
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
          waitForImageLoad = true
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(normalizeApiError.fromNetwork(err))
        }
      } finally {
        if (!waitForImageLoad) setIsLoading(false)
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
    fetchScreenshot(normalized, { track: true })
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
              maxWidth: ['100%', '100%', '100%', '640px'],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            Website screenshot API for developers
          </Heading>
          <Caption
            forwardedAs='h2'
            css={theme({
              pt: [3, 3, 4, 4],
              px: [1, 2, 4, 0],
              maxWidth: ['100%', layout.small, layout.small, '640px'],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            Turn any URL into a pixel-perfect image with one screenshot API call
            — full browser control, device emulation, and professional output.
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
