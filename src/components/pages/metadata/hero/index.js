import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { borders, colors, shadows, theme } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { useDemoUi } from 'components/hook/use-demo-ui'
import { FIRST_URL, HERO_LAYOUT } from '../shared'
import { ensureProtocol, stripProtocol, stripForDisplay } from './url'
import { addToHistory, MAX_HISTORY } from './history'
import { BrowserToolbar } from './browser-toolbar'
import { Footer } from './footer'
import { HeroIntro } from './intro'
import { Viewport } from './viewport'
import { useAttractLoop } from './use-attract-loop'
import { useFetchMetadata } from './use-fetch-metadata'

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
  box-shadow: ${shadows[3]};

  &:hover:not(:has(.meta-api-bar:hover)) .address-bar {
    background: ${colors.gray1};
    border-color: ${colors.black10};
    box-shadow: none;

    input {
      color: ${colors.gray8};
    }
  }
`

const DEFAULT_HISTORY = [
  FIRST_URL,
  'https://unavatar.io',
  'https://plausible.io'
]

export const Hero = function Hero ({
  onRequestTiming,
  onUrlChange,
  onDataChange
}) {
  const [inputUrl, setInputUrl] = useState(FIRST_URL)
  const [history, setHistory] = useState(DEFAULT_HISTORY)
  const inputRef = useRef(null)
  const [metaData, setMetaData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [navStack, setNavStack] = useState([FIRST_URL])
  const [navIndex, setNavIndex] = useState(0)
  const {
    isGlowing,
    isAttractMode,
    isPulsing,
    isFocused,
    hasInteracted,
    setIsGlowing,
    setIsAttractMode,
    setIsPulsing,
    setIsFocused,
    setHasInteracted
  } = useDemoUi()
  const abortRef = useRef(null)
  const skipBlurRef = useRef(false)

  const fetchMetadata = useFetchMetadata({
    onRequestTiming,
    onUrlChange,
    onDataChange,
    abortRef,
    setIsLoading,
    setError,
    setMetaData
  })

  useEffect(() => {
    fetchMetadata(FIRST_URL)
  }, [fetchMetadata])

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
      fetchMetadata
    }
  })

  const apiUrl = `https://api.microlink.io?url=${encodeURIComponent(inputUrl)}`

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
    skipBlurRef.current = false
    setIsFocused(true)
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
    setHistory(h => addToHistory(h, normalized))
    setNavStack(newStack)
    setNavIndex(newIndex)
    fetchMetadata(normalized, { track: true })
  }

  const handleBack = () => {
    if (navIndex === 0) return
    skipBlurRef.current = true
    stopAttract()
    const newIndex = navIndex - 1
    const url = navStack[newIndex]
    setNavIndex(newIndex)
    setInputUrl(url)
    fetchMetadata(url)
  }

  const handleForward = () => {
    if (navIndex >= navStack.length - 1) return
    skipBlurRef.current = true
    stopAttract()
    const newIndex = navIndex + 1
    const url = navStack[newIndex]
    setNavIndex(newIndex)
    setInputUrl(url)
    fetchMetadata(url)
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
    if (e.key === 'Enter') {
      skipBlurRef.current = true
      e.target.blur()
      submitUrl(e.target.value)
    }
    if (e.key === 'Escape') {
      skipBlurRef.current = true
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
        <HeroIntro />
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
              />
              <Viewport
                metaData={metaData}
                isLoading={isLoading}
                error={error}
                setError={setError}
              />
              <Footer apiUrl={apiUrl} inputUrl={inputUrl} />
            </BrowserWindow>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}
