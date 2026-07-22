import React, { useState, useRef } from 'react'
import { SECTION_VERTICAL_SPACING, theme } from 'theme'
import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import {
  Subhead,
  DocumentViewer,
  countWords,
  ensureProtocol,
  estimateTokens,
  formatCompactNumber,
  stripForDisplay,
  stripProtocol,
  HERO_LAYOUT
} from '../shared'
import { formatCompactNumberRound } from './format'
import { useIsSmallMobile } from './use-is-small-mobile'
import { useAnimatedCount } from './use-animated-count'
import { useFetchCapMarkdown } from './use-fetch-cap-markdown'
import { useAttractTyping } from './use-attract-typing'
import { CapSourceBar } from './source-bar'
import { CapSplitPane } from './split-pane'
import { CapabilityList } from './capability-list'

export const Capabilities = () => {
  const [capUrl, setCapUrl] = useState('')
  const [capFocused, setCapFocused] = useState(false)
  const [capMarkdown, setCapMarkdown] = useState('')
  const [capHtml, setCapHtml] = useState('')
  const [capLoading, setCapLoading] = useState(false)
  const [capHtmlLoading, setCapHtmlLoading] = useState(false)
  const [capError, setCapError] = useState(null)
  const capAbortRef = useRef(null)
  const capHtmlAbortRef = useRef(null)
  const capInputRef = useRef(null)
  const capHasContentRef = useRef(false)
  const capSkipBlurRef = useRef(false)
  const capLastFetchedRef = useRef('')
  const [capHasInteracted, setCapHasInteracted] = useState(false)
  const capSectionRef = useRef(null)
  const capTriggeredRef = useRef(false)
  const capTypeTimerRef = useRef(null)

  const isSmallMobile = useIsSmallMobile()
  const capFmt = isSmallMobile ? formatCompactNumberRound : formatCompactNumber

  const capDisplayed = capMarkdown || ''
  const capHtmlDisplayed = capHtml || ''

  const capMdWords = countWords(capDisplayed)
  const capMdTokens = estimateTokens(capDisplayed)
  const capHtmlWords = countWords(capHtmlDisplayed)
  const capHtmlTokens = estimateTokens(capHtmlDisplayed)

  const animatedCapMdWords = useAnimatedCount(capMdWords)
  const animatedCapMdTokens = useAnimatedCount(capMdTokens)
  const animatedCapHtmlWords = useAnimatedCount(capHtmlWords)
  const animatedCapHtmlTokens = useAnimatedCount(capHtmlTokens)

  const fetchCapMarkdown = useFetchCapMarkdown({
    capAbortRef,
    capHtmlAbortRef,
    capHasContentRef,
    capLastFetchedRef,
    setCapLoading,
    setCapHtmlLoading,
    setCapError,
    setCapMarkdown,
    setCapHtml
  })

  useAttractTyping({
    capSectionRef,
    capTriggeredRef,
    capTypeTimerRef,
    setCapUrl,
    fetchCapMarkdown
  })

  const capDisplayValue = capFocused
    ? stripProtocol(capUrl)
    : stripForDisplay(capUrl)

  const submitCapUrl = url => {
    const normalized = ensureProtocol(url)
    setCapFocused(false)
    if (!normalized) return
    setCapUrl(normalized)
    fetchCapMarkdown(normalized)
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
          flexDirection: 'column',
          alignItems: 'center',
          gap: [4, 4, 5, 5]
        })}
      >
        <Subhead
          css={theme({
            textAlign: 'center',
            width: '100%'
          })}
        >
          Any webpage to markdown,
          <LineBreak />
          <span css={theme({ color: 'orange7' })}>one API call away</span>
        </Subhead>
        <Box
          as='figure'
          css={theme({
            width: ['100%', '100%', '85%', '80%'],
            display: 'inline-flex',
            flexDirection: 'column',
            position: 'relative',
            m: 0
          })}
        >
          <DocumentViewer
            ref={capSectionRef}
            onClick={e => {
              if (
                !e.target.closest('input') &&
                !e.target.closest('.document-footer')
              ) {
                setCapFocused(false)
              }
            }}
          >
            <CapSourceBar
              capInputRef={capInputRef}
              capFocused={capFocused}
              capDisplayValue={capDisplayValue}
              capHasInteracted={capHasInteracted}
              setCapUrl={setCapUrl}
              setCapFocused={setCapFocused}
              setCapHasInteracted={setCapHasInteracted}
              capTypeTimerRef={capTypeTimerRef}
              capHasContentRef={capHasContentRef}
              capSkipBlurRef={capSkipBlurRef}
              capLastFetchedRef={capLastFetchedRef}
              fetchCapMarkdown={fetchCapMarkdown}
              submitCapUrl={submitCapUrl}
            />
            <CapSplitPane
              capDisplayed={capDisplayed}
              capHtmlDisplayed={capHtmlDisplayed}
              capLoading={capLoading}
              capHtmlLoading={capHtmlLoading}
              capHasContentRef={capHasContentRef}
              capError={capError}
              setCapError={setCapError}
              capFmt={capFmt}
              animatedCapMdWords={animatedCapMdWords}
              animatedCapMdTokens={animatedCapMdTokens}
              animatedCapHtmlWords={animatedCapHtmlWords}
              animatedCapHtmlTokens={animatedCapHtmlTokens}
            />
          </DocumentViewer>
          <noscript>
            <figcaption style={{ display: 'none' }}>
              Interactive demonstration comparing raw website HTML against
              Microlink's structured Markdown API output. Converting raw HTML
              DOM to Markdown reduces LLM context window token usage by 80%
              while preserving semantic metadata, text, and structure.
            </figcaption>
          </noscript>
        </Box>
        <CapabilityList />
      </Flex>
    </Container>
  )
}
