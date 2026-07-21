import React, { useState, useCallback, useRef, useEffect } from 'react'
import styled from 'styled-components'
import {
  borders,
  colors,
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
import { ApiErrorBody } from 'components/patterns/ApiError/ApiError'
import NerdStatsOverlay, {
  extractNerdStats,
  buildMqlQuery
} from 'components/patterns/NerdStats/NerdStats'
import { fadeInDown } from 'components/keyframes'
import { normalizeApiError } from 'helpers/api-error'
import { withTitle } from 'helpers/hoc/with-title'
import { trackEvent } from 'helpers/plausible'
import {
  Caption,
  DocumentViewer,
  DocumentHeader,
  SourceBar,
  SourceInput,
  SourcePrompt,
  MarkdownContentArea,
  MarkdownOverlay,
  Spinner,
  SpinnerCircle,
  WordCountBadge,
  ErrorInline,
  ErrorDismissButton,
  countWords,
  ensureProtocol,
  estimateTokens,
  formatCompactNumber,
  stripForDisplay,
  stripProtocol,
  highlightMarkdown,
  HERO_LAYOUT
} from './shared'

const FIRST_URL = 'https://stripe.com'

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
    background: ${colors.orange0};
    color: ${colors.black};
    outline: none;
  }

  & + & {
    border-top: ${borders[1]} ${colors.black10};
  }
`

const MAX_HISTORY = 6

const DEFAULT_HISTORY = [
  'https://microlink.io',
  'https://unavatar.io',
  'https://stripe.com'
]

const addToHistory = (history, url) => {
  const filtered = history.filter(u => u !== url)
  return [url, ...filtered].slice(0, MAX_HISTORY)
}

const STREAM_CHARS_PER_FRAME = 12
const STREAM_CHARS_PER_FRAME_FAST = 120
const STREAM_FRAME_MS = 33
const STREAM_FAST_AFTER_WORDS = 200

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
        setNavStack(s => [...s, normalized].slice(-MAX_HISTORY))
        setNavIndex(i + 1)
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
    trackEvent('demo copy', { product: 'markdown' })
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

  const fetchMarkdown = useCallback(
    async (url, { track } = {}) => {
      if (track) trackEvent('demo submit', { product: 'markdown' })
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
          setError(normalizeApiError(json, res))
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
        if (fetchResolverRef.current) {
          fetchResolverRef.current()
          fetchResolverRef.current = null
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(normalizeApiError.fromNetwork(err))
        }
        if (fetchResolverRef.current) {
          fetchResolverRef.current()
          fetchResolverRef.current = null
        }
      } finally {
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
    fetchMarkdown(normalized, { track: true })
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
              maxWidth: ['100%', '100%', '100%', '640px'],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            URL to markdown API for AI agents
          </Heading>
          <Caption
            css={theme({
              pt: [3, 3, 4, 4],
              px: [1, 2, 4, 0],
              maxWidth: ['100%', layout.small, layout.small, '640px'],
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
            <ArrowLink href='/docs/guides/content-conversion/url-to-markdown'>
              Get Started
            </ArrowLink>
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
                      <ApiErrorBody
                        code={error.code}
                        fallback={error.message}
                      />
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
              </DocumentFooter>
            </DocumentViewer>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
