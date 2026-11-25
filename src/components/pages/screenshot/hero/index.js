import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { borders, colors, shadows, theme } from 'theme'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { useDemoUi } from 'components/hook/use-demo-ui'
import { HERO_LAYOUT } from '../shared'
import {
  ensureProtocol,
  handleProtocolPaste,
  stripForDisplay,
  stripProtocol
} from './url'
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
  const [nerdStats, setNerdStats] = useState(null)
  const [nerdQuery, setNerdQuery] = useState(null)
  const [nerdResponse, setNerdResponse] = useState(null)
  const [navStack, setNavStack] = useState(['https://apple.com'])
  const [navIndex, setNavIndex] = useState(0)
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

  const displayValue = isFocused
    ? stripProtocol(inputUrl)
    : stripForDisplay(inputUrl)
  const apiUrl = `https://api.microlink.io?screenshot&url=${encodeURIComponent(
    inputUrl
  )}`

  const handleChange = e => {
    setInputUrl(ensureProtocol(stripProtocol(e.target.value)))
    stopAttract()
  }

  const handlePaste = e => {
    handleProtocolPaste(e, value => {
      setInputUrl(value)
      stopAttract()
    })
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
