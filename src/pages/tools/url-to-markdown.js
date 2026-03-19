import { borders, colors, layout, theme, space } from 'theme'
import React, { useState, useCallback } from 'react'
import {
  Globe,
  ArrowRight,
  HelpCircle,
  FileText,
  Settings,
  Download,
  Clipboard,
  Code,
  ChevronDown
} from 'react-feather'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import styled from 'styled-components'
import mql from '@microlink/mql'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import { Button } from 'components/elements/Button/Button'
import Choose from 'components/elements/Choose'
import Container from 'components/elements/Container'
import DotSpinner from 'components/elements/DotSpinner'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Input from 'components/elements/Input/Input'
import LineBreak from 'components/elements/LineBreak'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Spinner from 'components/elements/Spinner'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import Block from 'components/patterns/Block/Block'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import Tooltip from 'components/patterns/Tooltip/Tooltip'

import NerdStatsOverlay, {
  NerdStatsToggle,
  extractNerdStats,
  buildMqlQuery
} from 'components/patterns/NerdStats/NerdStats'
import { useClipboard } from 'components/hook/use-clipboard'
import { useLocalStorage } from 'components/hook/use-local-storage'
import { withTitle } from 'helpers/hoc/with-title'

import {
  PanelSection,
  OptionLabel,
  GenerateButton,
  CheckboxLabel,
  StepCard,
  SectionIcon,
  UseCaseCard,
  ToolLayout,
  OptionsPanelOuter,
  PreviewOuter,
  StickyGenerateWrapper,
  PreviewCanvas,
  FadeIn,
  SkeletonPulse,
  ActionButton,
  MOBILE_BP
} from 'components/pages/screenshot'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

/* ─── Constants ────────────────────────────────────────── */

const FEATURES_LIST = [
  {
    title: 'Fast CDN Delivery',
    description:
      'Markdown is generated and served via a global CDN with 240+ edge locations. Lightning-fast delivery anywhere in the world.'
  },
  {
    title: 'Smart Caching',
    description:
      "Automatic edge caching with configurable TTL. Cached responses are free and don't count against your plan."
  },
  {
    title: 'Zero-Config API',
    description:
      'Get started in minutes with a simple REST API. No browsers to manage, no infrastructure to maintain.'
  }
]

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: 'Enter URL',
    description: 'Paste any website address into the input field above.'
  },
  {
    icon: Settings,
    title: 'Configure Options',
    description:
      'Optionally target a specific HTML selector, enable ad blocking, or wait for dynamic content.'
  },
  {
    icon: FileText,
    title: 'Generate Markdown',
    description: 'Click the button and get clean markdown in seconds.'
  },
  {
    icon: Download,
    title: 'Copy & Download',
    description:
      'Copy the markdown to your clipboard or download as a .md file.'
  }
]

const REASON_TO_USE = [
  {
    title: 'Clean Markdown Output',
    description:
      'Get well-structured markdown from any webpage. Headers, lists, links, images, and code blocks are all preserved with proper formatting.'
  },
  {
    title: 'Works on Any Website',
    description: (
      <>
        Static sites, SPAs, JavaScript-rendered pages — it handles them all.
        Enable{' '}
        <Link href='/docs/guides/markdown/choosing-scope'>prerendering</Link>{' '}
        for client-side apps.
      </>
    )
  },
  {
    title: 'Target Specific Content',
    description: (
      <>
        Extract the full page by default, or use an HTML selector to target a
        specific section.{' '}
        <Link href='/docs/guides/markdown/choosing-scope'>
          Learn about choosing scope
        </Link>
        .
      </>
    )
  },
  {
    title: 'Block Ads and Banners',
    description:
      'Automatically strip ads, cookie banners, and other noise before extraction. Get only the content that matters.'
  },
  {
    title: 'Free + No Login',
    description:
      'Free markdown tool with 50 conversions per day. No account needed, no branding, no strings attached.'
  },
  {
    title: 'API Integration Ready',
    description: (
      <>
        Built on the <Link href='/markdown'>Microlink Markdown API</Link>.
        Integrate with any language via REST or the{' '}
        <Link href='https://www.npmjs.com/package/@microlink/mql'>
          @microlink/mql
        </Link>{' '}
        SDK.
      </>
    )
  }
]

const USE_CASES = [
  {
    title: 'For AI & LLM Pipelines',
    items: [
      'Feed web pages into AI agents as markdown context',
      'Build RAG pipelines with clean extracted content',
      'Reduce token usage with structured markdown vs raw HTML',
      'Automate web research for LLM workflows'
    ],
    link: {
      href: '/docs/guides/markdown',
      alt: 'Markdown extraction guide',
      text: 'Read the markdown guide'
    }
  },
  {
    title: 'For Content Teams',
    items: [
      'Migrate website content to markdown-based CMS',
      'Archive web pages in a portable format',
      'Repurpose blog posts and articles',
      'Extract documentation for offline use'
    ],
    link: {
      href: '/docs/guides/markdown/choosing-scope',
      alt: 'Choosing scope guide for targeted extraction',
      text: 'Learn about scope options'
    }
  },
  {
    title: 'For Developers',
    items: [
      'Automate markdown extraction via API',
      'Build content pipelines with clean data',
      'Convert web documentation to markdown files',
      'Integrate into CI/CD for content syncing'
    ],
    link: {
      href: '/markdown',
      alt: 'Markdown API landing page',
      text: 'Explore the Markdown API'
    }
  }
]

/* ─── Page-specific Styled Components ──────────────────── */

const MarkdownPre = styled.pre`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    lineHeight: 2,
    color: 'black80',
    p: 3,
    m: 0
  })}
  white-space: pre-wrap;
  word-break: break-word;
  overflow-y: auto;
  max-height: 600px;
  min-height: 200px;
  flex: 1;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: ${colors.black10} transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.black10};
    border-radius: 3px;
  }
`

const SelectorInput = styled.input`
  ${theme({
    fontFamily: 'mono',
    fontSize: 0,
    px: 2,
    py: '7px',
    borderRadius: '6px',
    border: 1,
    borderColor: 'black10',
    color: 'black80'
  })}
  width: 100%;
  min-width: 0;
  background: white;

  &::placeholder {
    color: ${colors.black30};
  }

  &:focus {
    outline: none;
    border-color: ${colors.link};
    box-shadow: 0 0 0 1px ${colors.link};
  }

  &:focus-visible {
    outline: none;
  }

  @media (max-width: ${MOBILE_BP - 1}px) {
    font-size: 16px;
    min-height: 44px;
  }
`

const AdvancedToggle = styled(Flex).attrs({ as: 'button', type: 'button' })`
  ${theme({
    alignItems: 'center',
    gap: '6px',
    py: 2,
    px: 0,
    fontSize: 0,
    fontWeight: 'bold',
    fontFamily: 'sans',
    color: 'black60',
    cursor: 'pointer'
  })}
  background: none;
  border: none;
  width: 100%;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    color: ${colors.black80};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  svg {
    transition: transform 200ms ease;
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      transition: none;
    }
  }
`

/* ─── Markdown Preview Display ─────────────────────────── */

const MarkdownPreviewDisplay = ({
  markdown,
  jsonData,
  isLoading,
  error,
  onRetry,
  nerdStats,
  mqlQuery,
  responseData,
  showNerdStats,
  onToggleNerdStats
}) => {
  const [ClipboardComponent, toClipboard] = useClipboard()

  const handleDownload = useCallback(() => {
    if (!markdown) return
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `markdown-${Date.now()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [markdown])

  const displayContent = jsonData || markdown

  return (
    <PreviewCanvas>
      <Choose>
        <Choose.When condition={isLoading}>
          <FadeIn
            key='loading'
            css={theme({
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            })}
          >
            <Box
              css={theme({
                p: 3,
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: ['380px', '380px', '520px']
              })}
            >
              <SkeletonPulse
                role='progressbar'
                aria-label='Converting to markdown'
                style={{ width: '100%', height: '300px', borderRadius: '8px' }}
              />
            </Box>
            <Flex
              css={theme({
                p: 3,
                gap: 2,
                borderTop: 1,
                borderColor: 'black05',
                bg: 'white',
                justifyContent: 'center',
                alignItems: 'center'
              })}
              aria-live='polite'
              aria-label='Converting to markdown'
            >
              <Spinner width='20px' height='14px' />
              <Text
                css={theme({
                  color: 'black50',
                  fontSize: 1,
                  fontFamily: 'sans'
                })}
              >
                Converting to markdown
                <DotSpinner />
              </Text>
            </Flex>
          </FadeIn>
        </Choose.When>

        <Choose.When condition={!!error}>
          <FadeIn
            key='error'
            css={theme({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: ['380px', '380px', '520px'],
              px: 4,
              textAlign: 'center'
            })}
          >
            <Text css={theme({ color: 'fullscreen', fontSize: 3, pb: 3 })}>
              {error?.statusCode === 429 && (
                <>
                  You've reached your free daily limit.
                  <Text css={theme({ fontSize: 2, color: 'black60' })}>
                    We allow 50 requests per day for free users.
                  </Text>
                </>
              )}
              {error?.statusCode !== 429 &&
                (error?.message || 'Something went wrong. Please try again.')}
            </Text>
            {error?.statusCode !== 429 && (
              <Button onClick={onRetry}>
                <Caps css={theme({ fontSize: 0 })}>Try again</Caps>
              </Button>
            )}
          </FadeIn>
        </Choose.When>

        <Choose.When condition={!!displayContent}>
          <FadeIn
            key='result'
            css={theme({
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              position: 'relative'
            })}
          >
            {showNerdStats && nerdStats ? (
              <Box
                css={theme({
                  flex: 1,
                  overflowY: 'auto',
                  maxHeight: ['60vh', '650px', '650px']
                })}
              >
                <NerdStatsOverlay
                  stats={nerdStats}
                  mqlQuery={mqlQuery}
                  responseData={responseData}
                />
              </Box>
            ) : (
              <MarkdownPre>
                <code>{displayContent}</code>
              </MarkdownPre>
            )}

            <Flex
              css={theme({
                p: 3,
                gap: 2,
                borderTop: 1,
                borderColor: 'black05',
                bg: 'white'
              })}
            >
              <ActionButton
                as='button'
                type='button'
                onClick={() => {
                  toClipboard({
                    copy: markdown || '',
                    text: Tooltip.TEXT.COPIED('Markdown')
                  })
                }}
                css={theme({
                  bg: 'black',
                  color: 'white',
                  _hover: { bg: 'black80' }
                })}
              >
                <Clipboard size={15} />
                <Caps css={theme({ fontSize: 0 })}>Copy</Caps>
              </ActionButton>

              <ActionButton
                as='button'
                type='button'
                onClick={handleDownload}
                css={theme({
                  bg: 'white',
                  color: 'black80',
                  border: 1,
                  borderColor: 'black10',
                  _hover: { bg: 'gray1', borderColor: 'black20' }
                })}
              >
                <Download size={15} />
                <Caps css={theme({ fontSize: 0 })}>Download .md</Caps>
              </ActionButton>

              {nerdStats && (
                <NerdStatsToggle
                  active={showNerdStats}
                  onClick={onToggleNerdStats}
                />
              )}
            </Flex>
          </FadeIn>
          <ClipboardComponent />
        </Choose.When>

        <Choose.Otherwise>
          <FadeIn
            key='empty'
            css={theme({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: ['380px', '380px', '520px'],
              px: 4,
              textAlign: 'center'
            })}
          >
            <Box
              css={theme({
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                background: 'black025'
              })}
            >
              <FileText size={32} color={colors.black20} />
            </Box>
            <Text css={theme({ color: 'black60', fontSize: 2 })}>
              Enter a URL and click Convert
            </Text>
            <Text css={theme({ color: 'black60', fontSize: 1, pt: 1 })}>
              Your markdown will appear here
            </Text>
          </FadeIn>
        </Choose.Otherwise>
      </Choose>
    </PreviewCanvas>
  )
}

/* ─── Options Panel ────────────────────────────────────── */

const OptionsPanel = ({ options, setOptions, onSubmit, isLoading }) => {
  const [urlError, setUrlError] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleUrlChange = useCallback(
    e => {
      const val = e.target.value
      setOptions(prev => ({ ...prev, url: val }))
      if (urlError) setUrlError('')
    },
    [setOptions, urlError]
  )

  const normalizeUrl = useCallback(rawUrl => {
    const trimmed = rawUrl.trim()
    if (!trimmed) return ''
    return prependHttp(trimmed)
  }, [])

  const handleSubmit = useCallback(() => {
    const url = normalizeUrl(options.url)
    if (!url || !isUrl(url)) {
      setUrlError('Please enter a valid URL (e.g., example.com)')
      return
    }

    setOptions(prev => ({ ...prev, url }))
    setUrlError('')
    onSubmit(url)
  }, [options.url, onSubmit, normalizeUrl, setOptions])

  return (
    <Box
      css={theme({
        p: [3, 4],
        border: 1,
        borderColor: 'black10',
        borderRadius: 3
      })}
      style={{ background: '#f8fafc' }}
    >
      {/* ── Primary Input ───────────────────── */}
      <PanelSection>
        <OptionLabel as='span'>Website URL</OptionLabel>
        <Input
          id='md-url'
          type='url'
          inputMode='url'
          autoComplete='url'
          placeholder='example.com'
          value={options.url}
          onChange={handleUrlChange}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              if (isLoading) {
                e.preventDefault()
                return
              }
              e.preventDefault()
              handleSubmit()
            }
          }}
          css={theme({ width: '100%', fontSize: '18px' })}
          aria-describedby={urlError ? 'md-url-error' : undefined}
          aria-invalid={!!urlError}
        />
        {urlError && (
          <Text
            id='md-url-error'
            role='alert'
            css={theme({ color: 'fullscreen', fontSize: 0, pt: 1 })}
          >
            {urlError}
          </Text>
        )}
      </PanelSection>

      {/* ── Advanced Options (collapsible) ──── */}
      <Box css={theme({ pb: 3 })}>
        <AdvancedToggle
          onClick={() => setShowAdvanced(prev => !prev)}
          aria-expanded={showAdvanced}
          aria-controls='md-advanced-options'
        >
          <ChevronDown
            size={16}
            style={{
              transform: showAdvanced ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
          />
          Advanced options
        </AdvancedToggle>

        {showAdvanced && (
          <Box id='md-advanced-options' css={theme({ pt: 1 })}>
            <CheckboxLabel>
              <input
                type='checkbox'
                checked={options.adblock}
                onChange={e =>
                  setOptions(prev => ({
                    ...prev,
                    adblock: e.target.checked
                  }))
                }
              />
              <Text css={theme({ pl: 2, fontSize: 1, color: 'black80' })}>
                Block ads and banners
              </Text>
              <Tooltip
                content={
                  <Tooltip.Content>
                    Removes ads and cookie banners before extraction
                  </Tooltip.Content>
                }
              >
                <HelpCircle
                  size={16}
                  color={colors.black60}
                  style={{ marginLeft: '6px', marginTop: '5px' }}
                />
              </Tooltip>
            </CheckboxLabel>

            <CheckboxLabel>
              <input
                type='checkbox'
                checked={options.cache}
                onChange={e =>
                  setOptions(prev => ({
                    ...prev,
                    cache: e.target.checked
                  }))
                }
              />
              <Text css={theme({ pl: 2, fontSize: 1, color: 'black80' })}>
                Use cache
              </Text>
              <Tooltip
                content={
                  <Tooltip.Content>
                    Uses cached markdown if available, otherwise generates fresh
                  </Tooltip.Content>
                }
              >
                <HelpCircle
                  size={16}
                  color={colors.black60}
                  style={{ marginLeft: '6px', marginTop: '5px' }}
                />
              </Tooltip>
            </CheckboxLabel>

            <CheckboxLabel>
              <input
                type='checkbox'
                checked={options.waitForLoad}
                onChange={e =>
                  setOptions(prev => ({
                    ...prev,
                    waitForLoad: e.target.checked
                  }))
                }
              />
              <Text css={theme({ pl: 2, fontSize: 1, color: 'black80' })}>
                Wait for all the elements to load
              </Text>
              <Tooltip
                content={
                  <Tooltip.Content>
                    Renders the page in a real browser and waits for every
                    resource to load — slower but sees all content including
                    lazy-loaded elements, SPAs, and client-side rendered pages
                  </Tooltip.Content>
                }
              >
                <HelpCircle
                  size={16}
                  color={colors.black60}
                  style={{ marginLeft: '6px', marginTop: '5px' }}
                />
              </Tooltip>
            </CheckboxLabel>

            <Box css={theme({ pt: 2 })}>
              <OptionLabel as='span'>HTML Selector</OptionLabel>
              <SelectorInput
                id='md-selector'
                type='text'
                placeholder='article, main, .content…'
                value={options.customSelector}
                onChange={e =>
                  setOptions(prev => ({
                    ...prev,
                    customSelector: e.target.value
                  }))
                }
                spellCheck={false}
                autoComplete='off'
                aria-label='HTML selector to target specific content'
              />
            </Box>
          </Box>
        )}
      </Box>

      {/* ── Generate ────────────────────────── */}
      <StickyGenerateWrapper css={{ textAlign: 'center', marginTop: '10px' }}>
        <GenerateButton
          type='button'
          onClick={handleSubmit}
          loading={isLoading}
        >
          <Flex
            css={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: space[2]
            }}
          >
            <FileText size={16} />
            Convert to Markdown
          </Flex>
        </GenerateButton>
      </StickyGenerateWrapper>
    </Box>
  )
}

/* ─── Main Tool Section ────────────────────────────────── */

const MarkdownTool = () => {
  const [options, setOptions] = useState({
    url: '',
    customSelector: '',
    adblock: true,
    cache: true,
    waitForLoad: false
  })

  const [isLoading, setIsLoading] = useState(false)
  const [markdown, setMarkdown] = useState(null)
  const [error, setError] = useState(null)
  const [lastUrl, setLastUrl] = useState('')
  const [nerdStats, setNerdStats] = useState(null)
  const [mqlQuery, setMqlQuery] = useState(null)
  const [responseData, setResponseData] = useState(null)
  const [showNerdStats, setShowNerdStats] = useState(false)

  const [localStorageData] = useLocalStorage('mql-api-key')
  console.log({ localStorageData })

  const handleSubmit = useCallback(
    async url => {
      setIsLoading(true)
      setError(null)
      setMarkdown(null)
      setShowNerdStats(false)
      setLastUrl(url)

      try {
        const selector = options.customSelector.trim()
        const dataRule = selector
          ? { selector, attr: 'markdown' }
          : { attr: 'markdown' }

        const mqlOpts = {
          apiKey: localStorageData,
          meta: false,
          data: { markdown: dataRule },
          adblock: options.adblock,
          force: !options.cache
        }

        if (options.waitForLoad) {
          mqlOpts.prerender = true
          mqlOpts.waitUntil = 'load'
        }

        const queryStr = buildMqlQuery(url, mqlOpts)
        setMqlQuery(queryStr)

        const response = await mql(url, mqlOpts)
        const md = response.data?.markdown || ''
        setMarkdown(md)

        const headerStats = extractNerdStats(response.response?.headers)
        setNerdStats(headerStats)
        setResponseData(
          JSON.stringify(
            { status: response.status, data: response.data },
            null,
            2
          )
        )
      } catch (err) {
        setError({
          message:
            err.description || err.message || 'Failed to convert to markdown.',
          statusCode: err.statusCode || err.code
        })
      } finally {
        setIsLoading(false)
      }
    },
    [options, localStorageData]
  )

  const handleRetry = useCallback(() => {
    if (lastUrl) handleSubmit(lastUrl)
  }, [lastUrl, handleSubmit])

  return (
    <Container
      as='section'
      id='tool'
      css={theme({
        px: ['16px', '25px'],
        maxWidth: ['100%', layout.normal, '1460px', '1460px'],
        pb: [2, 2, 4, 4],
        pt: [3, 3, 4, 5]
      })}
    >
      <ToolLayout>
        <OptionsPanelOuter>
          <OptionsPanel
            options={options}
            setOptions={setOptions}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </OptionsPanelOuter>

        <PreviewOuter>
          <MarkdownPreviewDisplay
            markdown={markdown}
            isLoading={isLoading}
            error={error}
            onRetry={handleRetry}
            nerdStats={nerdStats}
            mqlQuery={mqlQuery}
            responseData={responseData}
            showNerdStats={showNerdStats}
            onToggleNerdStats={() => setShowNerdStats(prev => !prev)}
          />
        </PreviewOuter>
      </ToolLayout>
    </Container>
  )
}

/* ─── Hero Section ─────────────────────────────────────── */

const Hero = () => (
  <Flex
    as='section'
    id='hero'
    css={theme({
      flexDirection: 'column',
      alignItems: 'center',
      pt: [1],
      pb: [1]
    })}
  >
    <Heading
      css={theme({
        px: [3, 3],
        maxWidth: layout.large,
        fontSize: [3, '35px', '40px', '50px']
      })}
    >
      Convert Any Website <LineBreak breakpoints={[0, 1]} /> to Markdown
      Instantly
    </Heading>
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [2, 2, 3, 3],
        px: 3,
        maxWidth: layout.large,
        fontSize: [2, 2, 3, '32px']
      })}
    >
      Turn any URL into clean, structured markdown in seconds
    </Caption>
  </Flex>
)

/* ─── How It Works ─────────────────────────────────────── */

const HowItWorks = () => (
  <Container
    as='section'
    id='how-it-works'
    css={theme({
      alignItems: 'center',
      width: '100%',
      pt: 0,
      pb: [2, 2, 3, 3],
      mt: 2
    })}
  >
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [3, 3, 4, 4],
        px: 3,
        maxWidth: layout.large,
        fontSize: [3, 3, 3, '28px']
      })}
    >
      How to convert a webpage to markdown
    </Caption>
    <Flex
      css={theme({
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: [3, 3, 4, 4],
        pt: [2, 2, 3, 3]
      })}
    >
      {HOW_IT_WORKS.map(({ icon: Icon, title, description }) => (
        <StepCard key={title}>
          <SectionIcon icon={Icon} />
          <Caps
            as='h3'
            css={theme({ fontWeight: 'regular', pb: 2, fontSize: 0 })}
          >
            {title}
          </Caps>
          <Text css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}>
            {description}
          </Text>
        </StepCard>
      ))}
    </Flex>
  </Container>
)

/* ─── Explanation ────────────────────────────────────── */

const Explanation = () => (
  <Container
    as='section'
    id='why-choose'
    css={theme({
      alignItems: 'center',
      pb: [4, 4, 5, 5],
      pt: [4, 4, 5, 5],
      mt: [3, 3, 4, 4],
      bg: 'pinky'
    })}
  >
    <Subhead
      variant='gradient'
      css={theme({ fontSize: [3, '30px', '35px', '45px'] })}
    >
      Why choose our free markdown tool?
    </Subhead>
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr'],
        gap: 3,
        pt: [4, 4, 5, 5],
        maxWidth: [layout.normal, layout.normal, layout.large, layout.large]
      })}
    >
      {REASON_TO_USE.map(({ title, description }) => (
        <UseCaseCard key={title}>
          <Caps as='h3' css={theme({ fontWeight: 'bold', pb: 2, fontSize: 1 })}>
            {title}
          </Caps>
          <Text css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}>
            {description}
          </Text>
        </UseCaseCard>
      ))}
    </Box>
    <Caption
      css={theme({
        pt: [4, 4, 5, 5],
        px: [1, 1, 3, 3],
        fontSize: '24px',
        maxWidth: layout.large
      })}
    >
      <Text css={theme({ fontSize: 3, color: 'black' })}>
        Wondering how we deliver this quality for free?
      </Text>
      <Text
        css={theme({ fontSize: 2, color: 'black80', lineHeight: 2, mt: 2 })}
      >
        This tool runs on <b>Microlink's</b>{' '}
        <Link href='/markdown'>Markdown API</Link>—the same infrastructure
        powering AI pipelines and content workflows for paying customers. You
        get enterprise performance at no cost.
      </Text>
    </Caption>
  </Container>
)

/* ─── Use Cases ───────────────────────────────────────── */

const UseCasesSection = () => (
  <Container
    as='section'
    id='use-cases'
    css={theme({
      alignItems: 'center',
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      pb: [5, 5, 6, 6],
      pt: [4, 4, 5, 5]
    })}
  >
    <Subhead
      variant='gradient'
      css={theme({ fontSize: [3, '30px', '35px', '45px'] })}
    >
      Use cases for URL to markdown conversion
    </Subhead>
    <Caption css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.small })}>
      From AI agent workflows to content migration, markdown extraction powers
      workflows across every team.
    </Caption>
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr 1fr', '1fr 1fr 1fr'],
        gap: 3,
        pt: [4, 4, 5, 5],
        width: '100%'
      })}
    >
      {USE_CASES.map(({ title, items, link }) => (
        <Box
          key={title}
          css={theme({
            p: 4,
            border: 1,
            borderColor: 'black10',
            borderRadius: 3,
            bg: 'white'
          })}
        >
          <Caps
            as='h3'
            titleize='false'
            css={theme({ fontWeight: 'bold', pb: 3, fontSize: 1 })}
          >
            {title}
          </Caps>
          <Box
            as='ul'
            css={{
              padding: 0,
              margin: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: space[2]
            }}
          >
            {items.map(item => (
              <Flex
                key={item}
                as='li'
                css={{
                  alignItems: 'baseline',
                  gap: space[2]
                }}
              >
                <ArrowRight
                  size={12}
                  css={{ flexShrink: 0, position: 'relative', top: 1 }}
                />
                <Text
                  css={theme({
                    fontSize: 1,
                    color: 'black60',
                    lineHeight: 2
                  })}
                >
                  {item}
                </Text>
              </Flex>
            ))}
          </Box>
          {link && (
            <Box css={theme({ pt: 3 })}>
              <Link href={link.href} aria-label={link.alt}>
                {link.text}
              </Link>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  </Container>
)

/* ─── Banner ─────────────────────────────────────────── */

const Banner = () => (
  <Block
    forwardedAs='section'
    id='pricing'
    flexDirection='column'
    css={theme({
      px: 4,
      maxHeight: '800px',
      pb: 0,
      pt: 5,
      width: '100%',
      overflow: 'hidden',
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
    blockOne={
      <Flex
        css={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Subhead css={theme({ fontSize: [3, 4, 6, 6], color: 'white' })}>
          Markdown API{' '}
          <span css={theme({ display: 'block', color: 'white60' })}>
            for developers
          </span>
        </Subhead>
      </Flex>
    }
    blockTwo={
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 3
        })}
      >
        <Text
          css={theme({
            fontSize: [2, 2, 3, 3],
            color: 'white80',
            textAlign: 'center',
            maxWidth: layout.small
          })}
        >
          Convert any URL to structured markdown with a single API call. Built
          for AI pipelines, content workflows, and data extraction at scale.
        </Text>
        <ArrowLink
          href='/markdown'
          css={theme({ color: 'white', fontSize: [2, 2, 3, 3] })}
        >
          Explore the Markdown API
        </ArrowLink>
      </Flex>
    }
  />
)

/* ─── API Docs Card ───────────────────────────────────── */

const MarkdownApiDocsCard = () => (
  <Container
    as='section'
    id='api-docs'
    css={theme({
      alignItems: 'center',
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      pb: [2, 2, 3, 3],
      pt: [5, 5, 5, 5],
      mb: [4, 4, 5, 5]
    })}
  >
    <Box
      css={theme({
        width: '100%',
        p: [3, 4],
        borderRadius: 3,
        textAlign: 'center'
      })}
    >
      <Flex css={theme({ justifyContent: 'center', pb: 4 })}>
        <SectionIcon icon={Code} />
      </Flex>
      <Subhead css={theme({ fontSize: 4 })}>Markdown API documentation</Subhead>
      <Caption
        css={theme({
          pt: 3,
          maxWidth: layout.normal,
          mx: 'auto',
          fontSize: 3
        })}
      >
        Explore the full Markdown API guide with interactive examples, scope
        options, caching strategies, and ready-to-use code snippets.
      </Caption>
      <Flex
        css={theme({
          pt: [3, 3, 4, 4],
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
          fontSize: [2, 2, 3, 3]
        })}
      >
        <ArrowLink href='/docs/guides/markdown'>Getting started</ArrowLink>
      </Flex>
    </Box>
  </Container>
)

/* ─── Product Information (FAQ) ────────────────────────── */

const ProductInformation = () => (
  <Faq
    css={theme({
      fontSize: [1, 1, 1, 1],
      pt: [2, 2, 4, 4],
      pb: 4,
      bg: 'pinky',
      borderTop: `${borders[1]} ${colors.pinkest}`,
      borderBottom: `${borders[1]} ${colors.pinkest}`
    })}
    questions={[
      {
        question: 'Is this URL to markdown tool really free?',
        answer: (
          <>
            <div>
              Yes! You can convert up to <b>50&nbsp;URLs per day</b> for free,
              with no credit card required. Free conversions include all
              features — scope control, ad blocking, prerendering, and custom
              selectors.
            </div>
            <div>
              Need more? Check our <Link href='/#pricing'>pricing plans</Link>{' '}
              for higher limits and priority processing.
            </div>
          </>
        )
      },
      {
        question: 'What content does it extract?',
        answer: (
          <>
            <div>
              The tool converts HTML to clean markdown, preserving headings,
              paragraphs, lists, links, images, code blocks, tables, and
              emphasis. It strips navigation, scripts, and non-content elements
              automatically.
            </div>
            <div>
              For best results, use the <b>Main content</b> scope to focus on
              the article or documentation body. See the{' '}
              <Link href='/docs/guides/markdown/choosing-scope'>
                choosing scope guide
              </Link>{' '}
              for details.
            </div>
          </>
        )
      },
      {
        question: 'Can I target specific sections of a page?',
        answer: (
          <>
            <div>
              Absolutely. Open <b>Advanced options</b> and enter any HTML
              selector in the <b>HTML Selector</b> field — for example{' '}
              <code>article</code>, <code>.post-body</code>, or{' '}
              <code>#main-content</code>. Only the matching element will be
              converted to markdown.
            </div>
          </>
        )
      },
      {
        question: 'How does it handle JavaScript-rendered pages?',
        answer: (
          <>
            <div>
              Enable <b>Wait for all the elements to load</b> in Advanced
              options and the tool will render the page in a real browser,
              waiting for every resource to finish loading before extracting
              content. This handles SPAs, client-side rendered frameworks, and
              lazy-loaded content.
            </div>
            <div>
              Learn more in the{' '}
              <Link href='/docs/guides/markdown/choosing-scope'>
                choosing scope guide
              </Link>
              .
            </div>
          </>
        )
      },
      {
        question: 'Can I integrate this into my application?',
        answer: (
          <>
            <div>
              Yes. The tool is built on the{' '}
              <Link href='/markdown'>Microlink Markdown API</Link>, which
              provides a simple REST endpoint. Integrate with any language —
              Node.js, Python, Ruby, or plain cURL.
            </div>
            <div>
              Use the{' '}
              <Link href='https://www.npmjs.com/package/@microlink/mql'>
                @microlink/mql
              </Link>{' '}
              SDK for Node.js, or hit the API directly from any HTTP client.
              Check the{' '}
              <Link href='/docs/guides/markdown/delivery-and-response'>
                delivery guide
              </Link>{' '}
              for response formats and embedding patterns.
            </div>
          </>
        )
      },
      {
        question: 'How does caching work?',
        answer: (
          <>
            <div>
              Markdown responses are cached on our global CDN by default. Cached
              responses are served instantly and{' '}
              <b>don't count against your limit</b>. Cache lasts for 24 hours.
            </div>
            <div>
              Uncheck <b>Use cache</b> if you need fresh content from a
              frequently updated page. Read the{' '}
              <Link href='/docs/guides/markdown/delivery-and-response'>
                delivery and response guide
              </Link>{' '}
              for advanced caching strategies.
            </div>
          </>
        )
      }
    ]}
  />
)

/* ─── Page Head (SEO) ──────────────────────────────────── */

export const Head = () => (
  <Meta
    title='URL to Markdown Converter - Free Website to Markdown Tool'
    noSuffix
    description='Convert any webpage to clean markdown instantly. Free online tool to turn URLs into structured markdown for AI pipelines, content migration, and data extraction.'
    image='https://cdn.microlink.io/banner/markdown.jpeg'
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/url-to-markdown',
        name: 'Microlink URL to Markdown Tool',
        description:
          'Convert any webpage to clean, structured markdown with scope control, ad blocking, CSS selectors, and JavaScript rendering support.',
        url: 'https://microlink.io/tools/url-to-markdown',
        applicationCategory: ['DeveloperApplication', 'Tool'],
        keywords: [
          'website to markdown',
          'url to markdown',
          'url to markdown file',
          'webpage to markdown',
          'web to markdown',
          'web to md',
          'web page to markdown',
          'url md',
          'html to markdown',
          'url to markdown converter'
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free tier with 50 conversions per day'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is this URL to markdown tool really free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can convert up to 50 URLs per day for free, with no credit card required. Free conversions include all features — scope control, ad blocking, prerendering, and custom selectors.'
            }
          },
          {
            '@type': 'Question',
            name: 'What content does it extract?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The tool converts HTML to clean markdown, preserving headings, paragraphs, lists, links, images, code blocks, tables, and emphasis. It strips navigation, scripts, and non-content elements automatically.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I target specific sections of a page?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Open Advanced options and enter any HTML selector — for example article, .post-body, or #main-content. Only the matching element will be converted to markdown.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does it handle JavaScript-rendered pages?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Enable "Wait for all the elements to load" in Advanced options and the tool will render the page in a real browser, waiting for every resource to finish loading before extracting content. This handles SPAs, client-side rendered frameworks, and lazy-loaded content.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I integrate this into my application?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. The tool is built on the Microlink Markdown API, which provides a simple REST endpoint. Integrate with any language — Node.js, Python, Ruby, or plain cURL. Use the @microlink/mql SDK for Node.js, or hit the API directly from any HTTP client.'
            }
          }
        ]
      }
    ]}
  />
)

/* ─── Page Component ───────────────────────────────────── */

const UrlToMarkdownPage = () => (
  <Layout>
    <Hero />
    <MarkdownTool />
    <HowItWorks />
    <Explanation />
    <UseCasesSection />
    <Banner />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          Markdown API{' '}
          <span
            css={{
              display: 'block',
              color: '#fd494a',
              width: '100%',
              textAlign: 'left'
            }}
          >
            for Automated Extraction.
          </span>
        </Subhead>
      }
      caption={
        <>
          No servers to maintain, no browsers to manage, no paying for capacity
          you don't use. Microlink lets you spend more time building and less
          time configuring — easy integration via{' '}
          <Link href='/markdown'>API</Link>.
        </>
      }
      features={FEATURES_LIST}
    />
    <MarkdownApiDocsCard />
    <ProductInformation />
  </Layout>
)

export default UrlToMarkdownPage
