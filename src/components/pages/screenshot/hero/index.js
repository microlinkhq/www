import React, { useCallback, useReducer, useRef, useState } from 'react'
import styled from 'styled-components'
import { borders, colors, shadows, theme } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { HERO_LAYOUT } from '../shared'
import { ensureProtocol, stripForDisplay, stripProtocol } from './url'
import { addToHistory, MAX_HISTORY } from './history'
import { BrowserToolbar } from './browser-toolbar'
import { Footer } from './footer'
import { HeroIntro } from './intro'
import { Viewport } from './viewport'
import { useAttractLoop } from './use-attract-loop'
import { useFetchScreenshot } from './use-fetch-screenshot'

const FIRST_URL = 'https://apple.com'
const FIRST_IMAGE_URL = 'https://cdn.microlink.io/www/apple.png'

const DEFAULT_HISTORY = [
  'https://apple.com',
  'https://microlink.io',
  'https://unavatar.io'
]

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
  const [screenshotSrc, setScreenshotSrc] = useState(FIRST_IMAGE_URL)
  const [imgKey, setImgKey] = useState(0)
  const [imgVisible, setImgVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showNerdStats, setShowNerdStats] = useState(false)
  const [nerdStats, setNerdStats] = useState(null)
  const [nerdQuery, setNerdQuery] = useState(null)
  const [nerdResponse, setNerdResponse] = useState(null)
  const [navStack, setNavStack] = useState(['https://apple.com'])
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
  const hasImageRef = useRef(false)
  const skipBlurRef = useRef(false)
  const imageLoadResolverRef = useRef(null)

  const fetchScreenshot = useFetchScreenshot({
    onRequestTiming,
    abortRef,
    setIsLoading,
    setError,
    setShowNerdStats,
    setNerdStats,
    setNerdQuery,
    setNerdResponse,
    setScreenshotSrc,
    setImgKey,
    setImgVisible
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
      fetchScreenshot,
      imageLoadResolverRef
    }
  })

  const displayValue = isFocused
    ? stripProtocol(inputUrl)
    : stripForDisplay(inputUrl)
  const apiUrl = `https://api.microlink.io?screenshot&url=${inputUrl}`

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

  const handleNerdClick = () => {
    stopAttract()

    if (!nerdStats) {
      setShowNerdStats(true)
      fetchScreenshot(inputUrl)
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
              <BrowserToolbar
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
                imgKey={imgKey}
                screenshotSrc={screenshotSrc}
                imgVisible={imgVisible}
                setImgVisible={setImgVisible}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                hasImageRef={hasImageRef}
                imageLoadResolverRef={imageLoadResolverRef}
                showNerdStats={showNerdStats}
                nerdStats={nerdStats}
                nerdQuery={nerdQuery}
                nerdResponse={nerdResponse}
                error={error}
                setError={setError}
              />
              <Footer apiUrl={apiUrl} />
            </BrowserWindow>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
