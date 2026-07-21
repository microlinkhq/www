import React, { useState, useCallback, useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { SECTION_VERTICAL_SPACING, borders, colors, space, theme } from 'theme'
import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import Text from 'components/elements/Text'
import { ApiErrorBody } from 'components/patterns/ApiError/ApiError'
import { normalizeApiError } from 'helpers/api-error'
import { CDN_EDGES } from 'helpers/cdn-edges'
import {
  Subhead,
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

const formatCompactNumberRound = n => {
  if (n >= 10000) return `${Math.round(n / 1000)}k`
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return `${n}`
}

const useIsSmallMobile = () => {
  const [small, setSmall] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 30em)')
    setSmall(mq.matches)
    const handler = e => setSmall(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return small
}

const COUNTER_DURATION_MS = 900
const COUNTER_STEPS = 20

const useAnimatedCount = target => {
  const [display, setDisplay] = useState(0)
  const prevRef = useRef(0)
  useEffect(() => {
    if (target === 0) {
      setDisplay(0)
      prevRef.current = 0
      return
    }
    const from = prevRef.current
    const diff = target - from
    if (diff === 0) return
    let step = 0
    const interval = setInterval(() => {
      step++
      if (step >= COUNTER_STEPS) {
        setDisplay(target)
        prevRef.current = target
        clearInterval(interval)
      } else {
        const progress = step / COUNTER_STEPS
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(Math.round(from + diff * eased))
      }
    }, COUNTER_DURATION_MS / COUNTER_STEPS)
    return () => clearInterval(interval)
  }, [target])
  return display
}

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
        <polyline points='22 12 18 12 15 21 9 3 6 12 2 12' />
      </svg>
    ),
    title: '80% fewer tokens',
    description:
      'Markdown reduces token usage by 80% compared to raw HTML. A 20,000-token page becomes 4,000 tokens — fit 5x more content into every LLM context window.'
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
        <circle cx='11' cy='11' r='8' />
        <path d='M21 21l-4.35-4.35' />
      </svg>
    ),
    title: 'Flexible scope control',
    description:
      'Extract the whole page, narrow to a CSS selector like main or article, or combine multiple selectors with fallback arrays for precise content targeting.'
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
        <path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' />
        <polyline points='14 2 14 8 20 8' />
        <line x1='16' y1='13' x2='8' y2='13' />
        <line x1='16' y1='17' x2='8' y2='17' />
        <polyline points='10 9 9 9 8 9' />
      </svg>
    ),
    title: 'YAML frontmatter metadata',
    description:
      'Enable the meta parameter to get title, author, date, description, word count, and reading time as structured YAML frontmatter prepended to the markdown output.'
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
    title: 'Sub-second cached responses',
    description: `Cached responses return in milliseconds from ${CDN_EDGES} Cloudflare edge locations. Configure TTL caching rules to keep your content fresh with minimal latency.`
  }
]

const CapabilityItem = styled(Flex)`
  ${theme({ gap: 2, alignItems: 'flex-start' })};
`

const CapabilityIcon = styled(Flex)`
  ${theme({
    width: space[4],
    height: space[4],
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: 'orange7'
  })};
`

const CAP_DEFAULT_URL = 'https://github.com/trending'

const SplitPaneLabel = styled(Flex)`
  ${theme({
    px: 2,
    py: 2,
    fontSize: 1,
    fontWeight: 'bold',
    fontFamily: 'sans',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: ['wrap', 'wrap', 'nowrap', 'nowrap'],
    gap: 1,
    flexShrink: 0
  })};
`

const HtmlContentArea = styled('pre')`
  ${theme({
    m: 0,
    p: 3,
    fontFamily: 'mono',
    fontSize: 0,
    lineHeight: 2,
    color: 'black80'
  })};
  overflow-y: auto;
  white-space: pre-wrap;
  word-break: break-all;
  -webkit-overflow-scrolling: touch;
`

export const Capabilities = () => {
  const [capUrl, setCapUrl] = useState('')
  const [capFocused, setCapFocused] = useState(false)
  const [capMarkdown, setCapMarkdown] = useState('')
  const [capDisplayed, setCapDisplayed] = useState('')
  const [capHtml, setCapHtml] = useState('')
  const [capHtmlDisplayed, setCapHtmlDisplayed] = useState('')
  const [capLoading, setCapLoading] = useState(false)
  const [capHtmlLoading, setCapHtmlLoading] = useState(false)
  const [capError, setCapError] = useState(null)
  const capAbortRef = useRef(null)
  const capHtmlAbortRef = useRef(null)
  const capInputRef = useRef(null)
  const capHasContentRef = useRef(false)
  const [capHasInteracted, setCapHasInteracted] = useState(false)
  const capSectionRef = useRef(null)
  const capTriggeredRef = useRef(false)
  const capTypeTimerRef = useRef(null)

  const isSmallMobile = useIsSmallMobile()
  const capFmt = isSmallMobile ? formatCompactNumberRound : formatCompactNumber

  const capMdWords = countWords(capDisplayed)
  const capMdTokens = estimateTokens(capDisplayed)
  const capHtmlWords = countWords(capHtmlDisplayed)
  const capHtmlTokens = estimateTokens(capHtmlDisplayed)

  const animatedCapMdWords = useAnimatedCount(capMdWords)
  const animatedCapMdTokens = useAnimatedCount(capMdTokens)
  const animatedCapHtmlWords = useAnimatedCount(capHtmlWords)
  const animatedCapHtmlTokens = useAnimatedCount(capHtmlTokens)

  useEffect(() => {
    setCapDisplayed(capMarkdown || '')
  }, [capMarkdown])

  useEffect(() => {
    setCapHtmlDisplayed(capHtml || '')
  }, [capHtml])

  const fetchCapMarkdown = useCallback(async url => {
    if (capAbortRef.current) capAbortRef.current.abort()
    if (capHtmlAbortRef.current) capHtmlAbortRef.current.abort()
    capAbortRef.current = new window.AbortController()
    capHtmlAbortRef.current = new window.AbortController()
    setCapLoading(true)
    setCapHtmlLoading(true)
    setCapError(null)

    const htmlPromise = window
      .fetch(
        `https://api.microlink.io/?data.html.attr=html&meta=false&url=${encodeURIComponent(
          url
        )}`,
        { signal: capHtmlAbortRef.current.signal }
      )
      .then(r =>
        r.json().then(json => {
          if (!r.ok) return { error: normalizeApiError(json, r) }
          const html = json?.data?.html
          return {
            html: html
              ? typeof html === 'string'
                ? html
                : JSON.stringify(html)
              : ''
          }
        })
      )
      .catch(err => {
        if (err.name === 'AbortError') return { aborted: true }
        return { error: normalizeApiError.fromNetwork(err) }
      })

    const mdPromise = window
      .fetch(
        `https://api.microlink.io?url=${encodeURIComponent(
          url
        )}&data.markdown.attr=markdown&meta=true`,
        { signal: capAbortRef.current.signal }
      )
      .then(r =>
        r.json().then(json => {
          if (!r.ok) return { error: normalizeApiError(json, r) }
          const md = json?.data?.markdown
          return {
            md: md ? (typeof md === 'string' ? md : JSON.stringify(md)) : ''
          }
        })
      )
      .catch(err => {
        if (err.name === 'AbortError') return { aborted: true }
        return { error: normalizeApiError.fromNetwork(err) }
      })

    let aborted = false
    try {
      const [htmlResult, mdResult] = await Promise.all([htmlPromise, mdPromise])

      aborted = Boolean(htmlResult.aborted || mdResult.aborted)
      if (aborted) return

      const capErr = htmlResult.error || mdResult.error
      if (capErr) {
        setCapError(capErr)
        return
      }

      if (mdResult.md) {
        capHasContentRef.current = true
        setCapMarkdown(mdResult.md)
      }
      if (htmlResult.html) setCapHtml(htmlResult.html)
    } finally {
      if (!aborted) {
        setCapLoading(false)
        setCapHtmlLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    const el = capSectionRef.current
    if (!el) return

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || capTriggeredRef.current) return
        capTriggeredRef.current = true
        observer.disconnect()

        const target = stripProtocol(CAP_DEFAULT_URL)
        let i = 0
        const typeStep = () => {
          i++
          setCapUrl('https://' + target.slice(0, i))
          if (i < target.length) {
            capTypeTimerRef.current = setTimeout(typeStep, 60)
          } else {
            capTypeTimerRef.current = null
            setCapUrl(CAP_DEFAULT_URL)
            fetchCapMarkdown(CAP_DEFAULT_URL)
          }
        }
        capTypeTimerRef.current = setTimeout(typeStep, 300)
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (capTypeTimerRef.current) {
        clearTimeout(capTypeTimerRef.current)
        capTypeTimerRef.current = null
      }
    }
  }, [fetchCapMarkdown])

  const capDisplayValue = capFocused
    ? stripProtocol(capUrl)
    : stripForDisplay(capUrl)

  const submitCapUrl = url => {
    const normalized = ensureProtocol(url)
    setCapUrl(normalized)
    setCapFocused(false)
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
            <DocumentHeader>
              <SourceBar>
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
                  ref={capInputRef}
                  $active={capFocused}
                  css={css`
                    ${theme({ fontSize: 1 })};
                    text-align: ${capFocused ? 'left' : 'center'};
                  `}
                  type='url'
                  size='1'
                  value={capDisplayValue}
                  onChange={e =>
                    setCapUrl(ensureProtocol(stripProtocol(e.target.value)))}
                  onFocus={() => {
                    setCapFocused(true)
                    setCapHasInteracted(true)
                    if (capTypeTimerRef.current) {
                      clearTimeout(capTypeTimerRef.current)
                      capTypeTimerRef.current = null
                      setCapUrl(CAP_DEFAULT_URL)
                      if (!capHasContentRef.current) {
                        fetchCapMarkdown(CAP_DEFAULT_URL)
                      }
                    }
                  }}
                  onBlur={e => {
                    setTimeout(() => {
                      const normalized = ensureProtocol(e.target.value)
                      setCapUrl(normalized)
                      setCapFocused(false)
                    }, 150)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.target.blur()
                      submitCapUrl(e.target.value)
                    }
                    if (e.key === 'Escape') {
                      e.target.blur()
                      setCapFocused(false)
                    }
                  }}
                  aria-label='Source URL'
                  spellCheck={false}
                  autoComplete='off'
                  autoCorrect='off'
                  autoCapitalize='off'
                />
                <SourcePrompt
                  $visible={!capFocused && !capHasInteracted}
                  aria-hidden='true'
                  css={css`
                    position: absolute;
                    right: ${space[2]};
                    top: 50%;
                    transform: translateY(-50%)
                      ${!capFocused && !capHasInteracted
                        ? ''
                        : `translateX(${space[1]})`};
                    margin: 0;
                    @media (max-width: 40em) {
                      display: none;
                    }
                  `}
                >
                  <span className='source-prompt__arrow'>←</span>
                  Type any URL
                </SourcePrompt>
              </SourceBar>
            </DocumentHeader>
            <Flex css={{ width: '100%', position: 'relative' }}>
              <Box
                css={theme({
                  flex: 1,
                  position: 'relative',
                  height: ['280px', '320px', '380px', '420px'],
                  overflow: 'hidden',
                  borderRight: `${borders[1]} ${colors.black05}`
                })}
              >
                <SplitPaneLabel
                  css={theme({
                    color: 'black80',
                    bg: 'white',
                    borderBottom: `${borders[1]} ${colors.black05}`,
                    position: 'relative',
                    zIndex: 1
                  })}
                >
                  <Box
                    css={theme({
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      bg: 'close',
                      flexShrink: 0
                    })}
                  />
                  Markdown
                  {capDisplayed && (
                    <WordCountBadge
                      css={theme({
                        fontSize: 0,
                        color: 'black60',
                        flexBasis: ['100%', '100%', 'auto', 'auto'],
                        textAlign: 'center'
                      })}
                    >
                      <Box
                        as='span'
                        css={theme({
                          display: ['none', 'none', 'inline', 'inline']
                        })}
                      >
                        ·{' '}
                      </Box>
                      {capFmt(animatedCapMdWords)} words ·{' '}
                      {capFmt(animatedCapMdTokens)} tokens
                    </WordCountBadge>
                  )}
                </SplitPaneLabel>
                <MarkdownContentArea
                  css={theme({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    pt: 5
                  })}
                >
                  {highlightMarkdown(capDisplayed)}
                </MarkdownContentArea>
                {capLoading && (
                  <MarkdownOverlay
                    $dim={capHasContentRef.current}
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
              </Box>
              <Box
                css={theme({
                  flex: 1,
                  position: 'relative',
                  height: ['280px', '320px', '380px', '420px'],
                  overflow: 'hidden'
                })}
              >
                <SplitPaneLabel
                  css={theme({
                    color: 'black60',
                    bg: 'gray0',
                    borderBottom: `${borders[1]} ${colors.black05}`,
                    position: 'relative',
                    zIndex: 1
                  })}
                >
                  <Box
                    css={theme({
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      bg: 'red6',
                      flexShrink: 0
                    })}
                  />
                  HTML
                  {capHtmlDisplayed && (
                    <WordCountBadge
                      css={theme({
                        fontSize: 0,
                        color: 'black60',
                        flexBasis: ['100%', '100%', 'auto', 'auto'],
                        textAlign: 'center'
                      })}
                    >
                      <Box
                        as='span'
                        css={theme({
                          display: ['none', 'none', 'inline', 'inline']
                        })}
                      >
                        ·{' '}
                      </Box>
                      {capFmt(animatedCapHtmlWords)} words ·{' '}
                      {capFmt(animatedCapHtmlTokens)} tokens
                    </WordCountBadge>
                  )}
                </SplitPaneLabel>
                <HtmlContentArea
                  css={theme({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    pt: 5
                  })}
                >
                  <code>{capHtmlDisplayed}</code>
                </HtmlContentArea>
                {capHtmlLoading && (
                  <MarkdownOverlay
                    $dim={!!capHtmlDisplayed}
                    aria-label='Loading HTML'
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
              </Box>
              {capError && (
                <ErrorInline
                  role='alert'
                  aria-label='Error'
                  css={theme({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 2
                  })}
                >
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
                      code={capError.code}
                      fallback={capError.message}
                    />
                  </Text>
                  <ErrorDismissButton
                    type='button'
                    aria-label='Dismiss error'
                    onClick={() => setCapError(null)}
                  >
                    Dismiss
                  </ErrorDismissButton>
                </ErrorInline>
              )}
            </Flex>
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
        <Box
          css={theme({
            display: 'grid',
            gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr'],
            gap: [3, 3, 4, 4],
            width: ['100%', '100%', '85%', '80%'],
            mx: 'auto'
          })}
        >
          {CAPABILITIES.map(({ icon, title, description }) => (
            <CapabilityItem key={title}>
              <CapabilityIcon>{icon}</CapabilityIcon>
              <Flex css={theme({ flexDirection: 'column', gap: 1 })}>
                <Text
                  as='h3'
                  css={theme({
                    fontWeight: 'bold',
                    fontSize: [1, 1, 2, 2]
                  })}
                >
                  {title}
                </Text>
                <Text css={theme({ fontSize: [0, 0, 1, 1] })}>
                  {description}
                </Text>
              </Flex>
            </CapabilityItem>
          ))}
        </Box>
      </Flex>
    </Container>
  )
}
