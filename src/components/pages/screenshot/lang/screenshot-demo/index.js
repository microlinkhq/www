import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { borders, colors, shadows, theme } from 'theme'
import Box from 'components/elements/Box'
import { useDemoUi } from 'components/hook/use-demo-ui'
import { ensureProtocol, stripForDisplay, stripProtocol } from './url'
import { addToHistory, MAX_HISTORY } from './history'
import { BrowserToolbar } from './browser-toolbar'
import { Footer } from './footer'
import { Viewport } from './viewport'
import { useAttractLoop } from './use-attract-loop'
import { useErrorModalFocus } from 'components/hook/use-error-modal-focus'
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

const ScreenshotDemo = ({ onRequestTiming, alt = 'Website screenshot' }) => {
  const [inputUrl, setInputUrl] = useState(FIRST_URL)
  const [history, setHistory] = useState(DEFAULT_HISTORY)
  const inputRef = useRef(null)
  const [screenshotSrc, setScreenshotSrc] = useState(FIRST_IMAGE_URL)
  const [imgKey, setImgKey] = useState(0)
  const [imgVisible, setImgVisible] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [nerdStats, setNerdStats] = useState(null)
  const [nerdQuery, setNerdQuery] = useState(null)
  const [nerdResponse, setNerdResponse] = useState(null)
  const [navStack, setNavStack] = useState(['https://apple.com'])
  const [navIndex, setNavIndex] = useState(0)
  const [activeIndex, setActiveIndex] = useState(-1)
  const {
    isGlowing,
    isAttractMode,
    isPulsing,
    isFocused,
    hasInteracted,
    showNerdStats,
    setIsGlowing,
    setIsAttractMode,
    setIsPulsing,
    setIsFocused,
    setHasInteracted,
    setShowNerdStats
  } = useDemoUi()
  const abortRef = useRef(null)
  const hasImageRef = useRef(false)
  const skipBlurRef = useRef(false)
  const imageLoadResolverRef = useRef(null)
  const errorModalRef = useRef(null)

  const fetchScreenshot = useFetchScreenshot({
    onRequestTiming,
    abortRef,
    setIsLoading,
    setError,
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
      setShowNerdStats,
      fetchScreenshot,
      imageLoadResolverRef
    }
  })

  useErrorModalFocus({ error, setError, errorModalRef })

  const displayValue = isFocused
    ? stripProtocol(inputUrl)
    : stripForDisplay(inputUrl)
  const apiUrl = `https://api.microlink.io?screenshot&url=${encodeURIComponent(
    inputUrl
  )}`

  const handleChange = e => {
    setInputUrl(ensureProtocol(stripProtocol(e.target.value)))
    setActiveIndex(-1)
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
    skipBlurRef.current = false
    setIsFocused(true)
    setActiveIndex(-1)
    stopAttract()
  }

  const submitUrl = url => {
    const normalized = ensureProtocol(url)
    setIsFocused(false)
    if (!normalized) return
    const newStack = [...navStack.slice(0, navIndex + 1), normalized].slice(
      -MAX_HISTORY
    )
    const newIndex = newStack.length - 1
    setInputUrl(normalized)
    setShowNerdStats(false)
    setHistory(h => addToHistory(h, normalized))
    setNavStack(newStack)
    setNavIndex(newIndex)
    fetchScreenshot(normalized, { track: true })
  }

  const handleBack = () => {
    if (navIndex === 0) return
    skipBlurRef.current = true
    stopAttract()
    const newIndex = navIndex - 1
    const url = navStack[newIndex]
    setNavIndex(newIndex)
    setInputUrl(url)
    setShowNerdStats(false)
    fetchScreenshot(url)
  }

  const handleForward = () => {
    if (navIndex >= navStack.length - 1) return
    skipBlurRef.current = true
    stopAttract()
    const newIndex = navIndex + 1
    const url = navStack[newIndex]
    setNavIndex(newIndex)
    setInputUrl(url)
    setShowNerdStats(false)
    fetchScreenshot(url)
  }

  const handleBlur = e => {
    const value = e.target.value
    setTimeout(() => {
      if (skipBlurRef.current) {
        skipBlurRef.current = false
        return
      }
      const normalized = ensureProtocol(value)
      if (normalized && normalized !== navStack[navIndex]) {
        submitUrl(normalized)
      } else {
        setInputUrl(normalized)
        setIsFocused(false)
      }
    }, 150)
  }

  const handleKeyDown = e => {
    const isHistoryOpen = isFocused && history.length > 0

    if (isHistoryOpen && e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => (i + 1) % history.length)
      return
    }
    if (isHistoryOpen && e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => (i <= 0 ? history.length - 1 : i - 1))
      return
    }

    if (e.key === 'Enter') {
      if (isHistoryOpen && activeIndex >= 0) {
        e.preventDefault()
        handleHistoryClick(history[activeIndex])
        return
      }
      skipBlurRef.current = true
      e.target.blur()
      submitUrl(e.target.value)
    }
    if (e.key === 'Escape') {
      skipBlurRef.current = true
      setActiveIndex(-1)
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
          activeIndex={activeIndex}
          handleHistoryClick={handleHistoryClick}
          showNerdStats={showNerdStats}
          handleNerdClick={handleNerdClick}
        />
        <Viewport
          alt={alt}
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
          errorModalRef={errorModalRef}
        />
        <Footer apiUrl={apiUrl} />
      </BrowserWindow>
    </Box>
  )
}

export default ScreenshotDemo
