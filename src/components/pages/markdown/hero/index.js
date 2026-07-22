import React, { useCallback, useReducer, useRef, useState } from 'react'
import { theme } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import {
  DocumentViewer,
  ensureProtocol,
  stripForDisplay,
  stripProtocol,
  HERO_LAYOUT
} from '../shared'
import { addToHistory, MAX_HISTORY } from './history'
import { Footer } from './footer'
import { HeroIntro } from './intro'
import { SourceToolbar } from './source-toolbar'
import { Viewport } from './viewport'
import { useAttractLoop } from './use-attract-loop'
import { useFetchMarkdown } from './use-fetch-markdown'
import { useStreamedContent } from './use-streamed-content'

const FIRST_URL = 'https://stripe.com'

const DEFAULT_HISTORY = [
  'https://microlink.io',
  'https://unavatar.io',
  'https://stripe.com'
]

const UI_INITIAL_STATE = {
  isGlowing: false,
  isAttractMode: false,
  isPulsing: false,
  isFocused: false,
  hasInteracted: false
}

const setUiFlag = (state, flag, value) => {
  const next = typeof value === 'function' ? value(state[flag]) : value
  return Object.is(state[flag], next) ? state : { ...state, [flag]: next }
}

const uiReducer = (state, action) => {
  switch (action.type) {
    case 'glow':
      return setUiFlag(state, 'isGlowing', action.value)
    case 'attract':
      return setUiFlag(state, 'isAttractMode', action.value)
    case 'pulse':
      return setUiFlag(state, 'isPulsing', action.value)
    case 'focus':
      return setUiFlag(state, 'isFocused', action.value)
    case 'interact':
      return setUiFlag(state, 'hasInteracted', action.value)
    default:
      return state
  }
}

export const Hero = function Hero ({
  onRequestTiming,
  heroLayout = HERO_LAYOUT
}) {
  const [inputUrl, setInputUrl] = useState(FIRST_URL)
  const [history, setHistory] = useState(DEFAULT_HISTORY)
  const inputRef = useRef(null)
  const [markdownContent, setMarkdownContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showNerdStats, setShowNerdStats] = useState(false)
  const [nerdStats, setNerdStats] = useState(null)
  const [nerdQuery, setNerdQuery] = useState(null)
  const [nerdResponse, setNerdResponse] = useState(null)
  const [navStack, setNavStack] = useState(['https://stripe.com'])
  const [navIndex, setNavIndex] = useState(0)
  const [ui, dispatchUi] = useReducer(uiReducer, UI_INITIAL_STATE)
  const { isGlowing, isAttractMode, isPulsing, isFocused, hasInteracted } = ui
  const setIsGlowing = useCallback(
    value => dispatchUi({ type: 'glow', value }),
    []
  )
  const setIsAttractMode = useCallback(
    value => dispatchUi({ type: 'attract', value }),
    []
  )
  const setIsPulsing = useCallback(
    value => dispatchUi({ type: 'pulse', value }),
    []
  )
  const setIsFocused = useCallback(
    value => dispatchUi({ type: 'focus', value }),
    []
  )
  const setHasInteracted = useCallback(
    value => dispatchUi({ type: 'interact', value }),
    []
  )
  const abortRef = useRef(null)
  const hasContentRef = useRef(false)
  const skipBlurRef = useRef(false)
  const fetchResolverRef = useRef(null)

  const { displayedContent, streamRef } = useStreamedContent(markdownContent)

  const fetchMarkdown = useFetchMarkdown({
    onRequestTiming,
    abortRef,
    streamRef,
    hasContentRef,
    fetchResolverRef,
    setIsLoading,
    setError,
    setShowNerdStats,
    setNerdStats,
    setNerdQuery,
    setNerdResponse,
    setMarkdownContent
  })

  useAttractLoop({
    hasInteracted,
    actions: {
      setInputUrl,
      setIsGlowing,
      setIsFocused,
      setIsAttractMode,
      setIsPulsing,
      setHistory,
      setNavStack,
      setNavIndex,
      fetchMarkdown,
      fetchResolverRef
    }
  })

  const apiUrl = `https://markdown.microlink.io/${stripProtocol(inputUrl)}`

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

  const handleNerdClick = () => {
    stopAttract()

    if (!nerdStats) {
      setShowNerdStats(true)
      fetchMarkdown(inputUrl)
      return
    }

    setShowNerdStats(s => !s)
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
        <HeroIntro heroLayout={heroLayout} />
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
              <SourceToolbar
                navIndex={navIndex}
                navStack={navStack}
                handleBack={handleBack}
                handleForward={handleForward}
                ui={{
                  isGlowing,
                  isAttractMode,
                  isPulsing,
                  isFocused,
                  hasInteracted
                }}
                inputRef={inputRef}
                displayValue={displayValue}
                handleChange={handleChange}
                handlePaste={handlePaste}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                handleKeyDown={handleKeyDown}
                history={history}
                handleHistoryClick={handleHistoryClick}
                showNerdStats={showNerdStats}
                handleNerdClick={handleNerdClick}
              />
              <Viewport
                displayedContent={displayedContent}
                isLoading={isLoading}
                hasContentRef={hasContentRef}
                showNerdStats={showNerdStats}
                nerdStats={nerdStats}
                nerdQuery={nerdQuery}
                nerdResponse={nerdResponse}
                error={error}
                setError={setError}
              />
              <Footer apiUrl={apiUrl} displayedContent={displayedContent} />
            </DocumentViewer>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
