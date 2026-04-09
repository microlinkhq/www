import { borders, colors, layout, theme, space } from 'theme'
import React, { useState, useCallback, useEffect } from 'react'
import {
  Camera,
  Crosshair,
  Download,
  Globe,
  HelpCircle,
  Maximize,
  Settings,
  XSquare,
  Zap
} from 'react-feather'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import styled from 'styled-components'
import mql from '@microlink/mql'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Input from 'components/elements/Input/Input'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import Block from 'components/patterns/Block/Block'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import Tooltip from 'components/patterns/Tooltip/Tooltip'

import { useLocalStorage } from 'components/hook/use-local-storage'
import { normalizeApiError } from 'helpers/api-error'
import { withTitle } from 'helpers/hoc/with-title'
import {
  extractNerdStats,
  buildMqlQuery
} from 'components/patterns/NerdStats/NerdStats'

import {
  PanelSection,
  SectionLabel,
  OptionLabel,
  GenerateButton,
  CheckboxLabel,
  StepCard,
  IconCircle,
  SectionIcon,
  UseCaseCard,
  ToolLayout,
  OptionsPanelOuter,
  PreviewOuter,
  PanelRibbonLayout,
  StickyGenerateWrapper,
  LAYOUT_PIVOT,
  MAX_HISTORY_ITEMS,
  HISTORY_MAX_AGE_MS,
  FORMAT_OPTIONS,
  DEFAULT_THUMB_SIZE,
  DEFAULT_THUMB_QUALITY,
  SegmentedControl,
  ScreenshotHistory,
  PreviewDisplay,
  createThumbnail,
  ApiDocsCard
} from 'components/pages/screenshot'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

/* ─── Page-specific Constants ────────────────────────────── */

const DEVICES = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 393, height: 852 }
}

const SCREENSHOT_HISTORY_KEY = 'screenshot-history/full-page'
const MAX_SCREENSHOT_PREVIEW_HEIGHT = 542

const DEVICE_OPTIONS = [
  { value: 'desktop', label: 'Desktop' },
  { value: 'tablet', label: 'Tablet' },
  { value: 'mobile', label: 'Mobile' }
]

const FEATURES_LIST = [
  {
    title: 'Fast CDN Delivery',
    description:
      'Screenshots are served via a global CDN with 240+ edge locations. Lightning-fast delivery anywhere in the world.'
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
    description: 'Enter the full web address of the page you want to capture.'
  },
  {
    icon: Settings,
    title: 'Configure Options',
    description: 'Choose from desktop, tablet, or mobile viewports.'
  },
  {
    icon: Camera,
    title: 'Generate Full Page Screenshot',
    description: 'Click the button and wait a few seconds.'
  },
  {
    icon: Download,
    title: 'Download & Share',
    description: 'Save your complete page screenshot or share it with others.'
  }
]

const REASON_TO_USE = [
  {
    icon: Maximize,
    title: 'Capture the Entire Webpage, Not Just the Visible Area',
    description: (
      <>
        Most screenshot tools only capture what's visible on screen. Our tool
        scrolls and renders the entire web page.
        <br />
        <br />
        Every section, every pixel, into a single high-resolution image. Whether
        it's a long landing page or an infinite-scroll blog, you get the whole
        site screenshot. See the{' '}
        <Link href='/docs/guides/screenshot/customizing-output#full-page-screenshots'>
          customizing output guide
        </Link>{' '}
        for all capture options.
      </>
    )
  },
  {
    icon: XSquare,
    title: 'No Extension, No Install — 100% Online and Free',
    description: (
      <>
        This is a full page screenshot tool that works entirely in your browser.
        No Chrome extensions, no desktop apps, no sign-ups required to start.
        <br />
        <br />
        Capture any website for free — it's a full page screen capture online,
        with no hidden limits or trials. Just a fast, online screenshot capture
        experience.
      </>
    )
  },
  {
    icon: Crosshair,
    title: 'Pixel-Perfect at Any Resolution',
    description: (
      <>
        Need a full screen website screenshot at 1440px? 1920px? Custom
        dimensions?
        <br />
        <br />
        Choose your viewport width and get a crisp, accurate capture every time.
        Configure{' '}
        <Link href='/docs/guides/screenshot/browser-settings'>
          browser settings
        </Link>{' '}
        for device emulation and dark mode. Perfect for designers, QA teams, and
        agencies that need reliable web page screenshots.
      </>
    )
  },
  {
    icon: Zap,
    title: 'Blazing Fast, Zero Ads',
    description: (
      <>
        Our rendering engine captures full webpage screenshots in seconds, even
        for pages that are thousands of pixels tall.
        <br />
        <br />
        Automatically{' '}
        <Link href='/docs/guides/screenshot/page-interaction'>
          block ads and cookie banners
        </Link>{' '}
        before the rendering. No timeouts, no broken renders.
      </>
    )
  }
]

/* ─── Local Layout Overrides ────────────────────────────── */

const FullPageOptionsPanelOuter = styled(OptionsPanelOuter)`
  @media (min-width: ${LAYOUT_PIVOT}px) {
    min-height: 550px;
  }
`

const FullPagePreviewOuter = styled(PreviewOuter)`
  @media (min-width: ${LAYOUT_PIVOT}px) {
    min-height: 542px;
  }
`

/* ─── Options Panel ────────────────────────────────────── */

const OptionsPanel = ({ options, setOptions, onSubmit, isLoading }) => {
  const [urlError, setUrlError] = useState('')
  const [viewportError, setViewportError] = useState('')

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
    setViewportError('')
    onSubmit(url)
  }, [options.url, options.customWidth, onSubmit, normalizeUrl, setOptions])

  const handleDeviceChange = useCallback(
    val => {
      const device = DEVICES[val]
      if (device) {
        setOptions(prev => ({
          ...prev,
          device: val,
          customWidth: String(device.width)
        }))
      }
    },
    [setOptions]
  )

  return (
    <Box
      css={theme({
        p: [3, 4],
        border: 1,
        borderColor: 'black10',
        borderRadius: 3
      })}
    >
      {/* ── Primary Input ───────────────────── */}
      <PanelSection>
        <OptionLabel as='span'>Website URL</OptionLabel>
        <Input
          id='ws-url'
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
          aria-describedby={urlError ? 'ws-url-error' : undefined}
          aria-invalid={!!urlError}
        />
        {urlError && (
          <Text
            id='ws-url-error'
            role='alert'
            css={theme({ color: 'fullscreen', fontSize: 0, pt: 1 })}
          >
            {urlError}
          </Text>
        )}
      </PanelSection>

      {/* ── Settings Groups (Ribbon on tablet) ── */}
      <PanelRibbonLayout>
        {/* ── Display Settings ────────────────── */}
        <PanelSection>
          <Box css={theme({ pb: '12px' })}>
            <OptionLabel as='span'>Device</OptionLabel>
            <SegmentedControl
              name='Device'
              options={DEVICE_OPTIONS}
              value={options.device}
              onChange={handleDeviceChange}
            />
          </Box>

          <Box css={theme({ pb: '12px' })}>
            <OptionLabel as='span'>Width in px</OptionLabel>
            <Flex css={{ alignItems: 'center' }}>
              <Box css={{ flex: 1, maxWidth: '100px' }}>
                <Input
                  id='ws-width'
                  type='number'
                  inputMode='numeric'
                  placeholder='1920'
                  aria-label='Viewport width in pixels'
                  value={options.customWidth}
                  onChange={e => {
                    setOptions(prev => ({
                      ...prev,
                      customWidth: e.target.value,
                      device: 'custom'
                    }))
                    if (viewportError) setViewportError('')
                  }}
                  css={theme({
                    width: '100%',
                    fontSize: 1,
                    height: '18px'
                  })}
                />
              </Box>
            </Flex>
            {viewportError && (
              <Text
                role='alert'
                css={theme({ color: 'fullscreen', fontSize: 0, pt: 1 })}
              >
                {viewportError}
              </Text>
            )}
          </Box>
        </PanelSection>

        {/* ── Output Settings ─────────────────── */}
        <PanelSection>
          <Box>
            <OptionLabel as='span'>Format</OptionLabel>
            <SegmentedControl
              name='Format'
              options={FORMAT_OPTIONS}
              value={options.type}
              onChange={val => setOptions(prev => ({ ...prev, type: val }))}
            />
          </Box>
        </PanelSection>

        {/* ── Advanced ────────────────────────── */}
        <Box css={theme({ pb: 3 })}>
          <SectionLabel>Advanced</SectionLabel>

          <CheckboxLabel>
            <input
              type='checkbox'
              checked={options.adblock}
              onChange={e =>
                setOptions(prev => ({ ...prev, adblock: e.target.checked }))
              }
            />
            <Text css={theme({ pl: 2, fontSize: 1, color: 'black80' })}>
              Block ads and banners
            </Text>
            <Tooltip
              content={
                <Tooltip.Content>
                  Removes all the ads and cookie banners before the rendering
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
                setOptions(prev => ({ ...prev, cache: e.target.checked }))
              }
            />
            <Text css={theme({ pl: 2, fontSize: 1, color: 'black80' })}>
              Use cache
            </Text>
            <Tooltip
              content={
                <Tooltip.Content>
                  Uses the cached screenshot if available, otherwise generates a
                  new one
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
        </Box>
      </PanelRibbonLayout>

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
            <Camera size={16} />
            Generate screenshot
          </Flex>
        </GenerateButton>
      </StickyGenerateWrapper>
    </Box>
  )
}

/* ─── Main Tool Section ────────────────────────────────── */

const ScreenshotTool = () => {
  const [options, setOptions] = useState({
    url: '',
    type: 'png',
    fullPage: false,
    adblock: true,
    cache: true,
    device: 'desktop',
    customWidth: '1920'
  })

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [lastUrl, setLastUrl] = useState('')
  const [nerdStats, setNerdStats] = useState(null)
  const [mqlQuery, setMqlQuery] = useState(null)
  const [responseData, setResponseData] = useState(null)
  const [showNerdStats, setShowNerdStats] = useState(false)
  const [requestedViewport, setRequestedViewport] = useState({
    width: 1920,
    height: 1080
  })

  const [localStorageData] = useLocalStorage('mql-api-key')
  const [history, setHistory] = useLocalStorage(SCREENSHOT_HISTORY_KEY, [])
  const [activeHistoryId, setActiveHistoryId] = useState(null)
  const [historyReady, setHistoryReady] = useState(false)

  useEffect(() => {
    setHistory(prev => {
      if (!Array.isArray(prev)) return []
      const now = Date.now()
      const cleaned = prev.filter(
        entry => now - entry.createdAt < HISTORY_MAX_AGE_MS
      )
      return cleaned.length !== prev.length ? cleaned : prev
    })
    setHistoryReady(true)
  }, [setHistory])

  const handleSubmit = useCallback(
    async url => {
      const viewport = {
        width: Number(options.customWidth) || 1920
      }

      setRequestedViewport(viewport)
      setIsLoading(true)
      setError(null)
      setData(null)
      setShowNerdStats(false)
      setLastUrl(url)

      try {
        const mqlOpts = {
          apiKey: localStorageData?.apiKey,
          meta: false,
          screenshot: {
            type: options.type,
            fullPage: true
          },
          viewport,
          adblock: options.adblock,
          force: !options.cache
        }

        const queryStr = buildMqlQuery(url, mqlOpts)
        setMqlQuery(queryStr)

        let response = null
        let headerStats = null
        try {
          response = await mql(url, mqlOpts)
          setData(response.data)
          headerStats = extractNerdStats(response.response?.headers)
          setNerdStats(headerStats)
          setResponseData(
            JSON.stringify(
              { status: response.status, data: response.data },
              null,
              2
            )
          )
        } catch (err) {
          setError(
            normalizeApiError.fromMql(err, 'Failed to capture screenshot.')
          )
        }

        if (response?.data?.screenshot) {
          const entryId = String(Date.now())
          const thumbnail = await createThumbnail(
            response.data.screenshot.url,
            DEFAULT_THUMB_SIZE,
            DEFAULT_THUMB_QUALITY
          )
          setHistory(prev => {
            const items = Array.isArray(prev) ? prev : []
            return [
              {
                id: entryId,
                createdAt: Date.now(),
                screenshot: response.data.screenshot,
                thumbnail,
                nerdStats: headerStats,
                mqlQuery: queryStr,
                responseData: JSON.stringify(
                  { status: response.status, data: response.data },
                  null,
                  2
                ),
                settings: {
                  url,
                  type: options.type,
                  fullPage: options.fullPage,
                  device: options.device,
                  customWidth: options.customWidth,
                  adblock: options.adblock,
                  cache: options.cache
                }
              },
              ...items
            ].slice(0, MAX_HISTORY_ITEMS)
          })
          setActiveHistoryId(entryId)
        }
      } catch (err) {
        setError(
          normalizeApiError.fromMql(err, 'Failed to capture screenshot.')
        )
      } finally {
        setIsLoading(false)
      }
    },
    [options, setHistory]
  )

  const handleHistorySelect = useCallback(entry => {
    const { settings, screenshot } = entry
    setOptions({
      url: settings.url,
      type: settings.type,
      fullPage: settings.fullPage,
      device: settings.device,
      customWidth: settings.customWidth,
      adblock: settings.adblock !== undefined ? settings.adblock : true,
      cache: settings.cache !== undefined ? settings.cache : true
    })
    setData({ screenshot })
    setLastUrl(settings.url)
    setNerdStats(entry.nerdStats || null)
    setMqlQuery(entry.mqlQuery || null)
    setResponseData(entry.responseData || null)
    setRequestedViewport({
      width: Number(settings.customWidth) || 1920
    })
    setError(null)
    setActiveHistoryId(entry.id)
  }, [])

  const handleHistoryDelete = useCallback(
    id => {
      setHistory(prev => {
        const items = Array.isArray(prev) ? prev : []
        return items.filter(entry => entry.id !== id)
      })
      setActiveHistoryId(prev => (prev === id ? null : prev))
    },
    [setHistory]
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
        <FullPageOptionsPanelOuter>
          <OptionsPanel
            options={options}
            setOptions={setOptions}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </FullPageOptionsPanelOuter>

        <FullPagePreviewOuter>
          <PreviewDisplay
            data={data}
            isLoading={isLoading}
            error={error}
            onRetry={handleRetry}
            url={lastUrl}
            viewportWidth={requestedViewport.width}
            viewportHeight={requestedViewport.height}
            nerdStats={nerdStats}
            mqlQuery={mqlQuery}
            responseData={responseData}
            showNerdStats={showNerdStats}
            onToggleNerdStats={() => setShowNerdStats(prev => !prev)}
            maxPreviewHeight={MAX_SCREENSHOT_PREVIEW_HEIGHT}
            loadingText='Capturing full webpage screenshot'
            emptyText='Enter a URL and click Generate Screenshot'
            emptySubtext='Your full page screenshot will appear here'
          />
        </FullPagePreviewOuter>
      </ToolLayout>

      {historyReady && (
        <ScreenshotHistory
          entries={Array.isArray(history) ? history : []}
          activeId={activeHistoryId}
          onSelect={handleHistorySelect}
          onDelete={handleHistoryDelete}
          disabled={isLoading}
        />
      )}
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
        fontSize: ['35px', '40px', '45px', '55px']
      })}
    >
      Full Page Screenshot Tool
      <Text
        css={theme({
          fontSize: [3, '30px', '35px', '40px'],
          color: 'black80',
          WebkitTextFillColor: 'initial',
          backgroundImage: 'none'
        })}
      >
        Capture Any Entire Website
      </Text>
    </Heading>
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [2, 2, 3, 3],
        px: 3,
        maxWidth: layout.large,
        fontSize: [2, 2, 2, '26px']
      })}
    >
      Paste any URL and get a pixel-perfect, full page screenshot of the entire
      website. No extension to install, no software to download. Just results in
      seconds.
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
      How to Take a Full Page Screenshot of Any Website
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
          <Caps as='h3' css={theme({ fontWeight: 'bold', pb: 2, fontSize: 0 })}>
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
      Why Choose Our Full Page Screen Capture Tool?
    </Subhead>
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr'],
        gap: 3,
        pt: [4, 4, 5, 5],
        maxWidth: [layout.normal, layout.normal, layout.large, layout.large]
      })}
    >
      {REASON_TO_USE.map(({ icon: Icon, title, description }) => (
        <UseCaseCard key={title}>
          {/* Mobile: inline icon as bullet */}
          <Flex
            css={theme({
              display: ['flex', 'flex', 'none', 'none'],
              alignItems: 'center',
              pb: 2,
              gap: '8px'
            })}
          >
            <Icon size={16} color={colors.black80} style={{ flexShrink: 0 }} />
            <Caps as='h3' css={theme({ fontWeight: 'bold', fontSize: 1 })}>
              {title}
            </Caps>
          </Flex>
          {/* Desktop: centered icon above title */}
          <Flex
            css={theme({
              display: ['none', 'none', 'flex', 'flex'],
              justifyContent: 'center',
              pb: 3
            })}
          >
            <IconCircle>
              <Icon size={24} color={colors.black80} />
            </IconCircle>
          </Flex>
          <Caps
            as='h3'
            css={theme({
              display: ['none', 'none', 'block', 'block'],
              fontWeight: 'bold',
              pb: 2,
              fontSize: 1,
              textAlign: 'center'
            })}
          >
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
        <Link href='/screenshot'>screenshot API</Link>—the same infrastructure
        processing millions of screenshots per week for paying customers. You
        get enterprise performance at no cost.
      </Text>
    </Caption>
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
          Screenshot API{' '}
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
          alignItems: 'flex-start',
          maxHeight: ['200px', '300px', '400px', '650px'],
          overflow: 'hidden'
        })}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        <img
          css={theme({
            width: ['300px', '500px', '700px', '900px']
          })}
          src='/images/screenshot-tool-landing.png'
          alt='Screenshot API'
        />
      </Flex>
    }
  />
)

/* ─── Use Cases ───────────────────────────────────────── */

const USE_CASES = [
  {
    title: 'Designers & Agencies',
    content: (
      <>
        Capture full website screenshots for client presentations, design
        audits, and portfolio showcases.
        <br />
        <br />
        Save entire webpages as images with one click — no more stitching
        screenshots together. Learn about{' '}
        <Link href='/docs/guides/screenshot/embedding'>
          embedding and delivery options
        </Link>
        .
      </>
    )
  },
  {
    title: 'QA & Development Teams',
    content: (
      <>
        Take full page screenshots across different viewports and resolutions to
        catch layout issues before launch.
        <br />
        <br />
        Create any kind of product, automation or integration with our{' '}
        <Link href='/screenshot'>screenshot API</Link>. Need to capture pages
        behind a login? See the{' '}
        <Link href='/docs/guides/screenshot/private-pages'>
          private pages guide
        </Link>
        .
      </>
    )
  },
  {
    title: 'Marketing & SEO Professionals',
    content: (
      <>
        Screenshot competitor landing pages, track design changes over time, or
        capture long web pages for reports.
        <br />
        <br />
        Get a snapshot of any entire website without ever visiting it. For quick
        viewport screenshots, try the{' '}
        <Link href='/tools/website-screenshot'>standard screenshot tool</Link>.
      </>
    )
  }
]

const UseCases = () => (
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
      Who Needs Full Page Website Screenshots?
    </Subhead>
    <Caption css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.small })}>
      From design reviews to automated testing, website screenshots power
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
      {USE_CASES.map(({ title, content }) => (
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
            titleize={false}
            css={theme({ fontWeight: 'bold', pb: 3, fontSize: 1 })}
          >
            {title}
          </Caps>
          <Text
            css={theme({
              fontSize: 1,
              color: 'black60',
              lineHeight: 2
            })}
          >
            {content}
          </Text>
        </Box>
      ))}
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
        question: "What's the maximum screenshot size?",
        answer: (
          <>
            <div>
              On the screenshot tool, the maximum width goes up to 8000px. The
              height is not limited — it'll be as long as the page is. See the{' '}
              <Link href='/docs/guides/screenshot/browser-settings'>
                browser settings guide
              </Link>{' '}
              for viewport and device emulation options.
            </div>
          </>
        )
      },
      {
        question: 'Is this entire website screenshot tool really free?',
        answer: (
          <>
            <div>
              Yes! You can take up to{' '}
              <b>50&nbsp;full page screenshots per day</b> for free, with no
              credit card required.
            </div>
            <div>
              Need more? Check our <Link href='/#pricing'>pricing plans</Link>{' '}
              for higher limits and priority processing.
            </div>
          </>
        )
      },
      {
        question: "What's the quality of the screenshots?",
        answer: (
          <>
            <div>
              We always use the best quality settings for the full page
              screenshots. Then we compress the images to the smallest file size
              possible without losing quality. Learn about all the available
              options in the{' '}
              <Link href='/docs/guides/screenshot/customizing-output'>
                customizing output guide
              </Link>
              .
            </div>
          </>
        )
      },
      {
        question: 'Do you offer a screenshot API?',
        answer: (
          <>
            <div>
              Absolutely. The tool is built on the{' '}
              <Link href='/docs/guides/screenshot/customizing-output#full-page-screenshots'>
                Microlink Screenshot API
              </Link>
              , which provides a simple REST endpoint. Integrate with any
              language — Node.js, Python, Ruby, or plain cURL.
            </div>
            <div>
              Use the{' '}
              <Link href='https://www.npmjs.com/package/@microlink/mql'>
                @microlink/mql
              </Link>{' '}
              SDK for Node.js, or hit the API directly from any HTTP client.
              Check the{' '}
              <Link href='/docs/guides/screenshot/embedding'>
                embedding guide
              </Link>{' '}
              for delivery and integration patterns.
            </div>
          </>
        )
      },
      {
        question: 'How does caching work?',
        answer: (
          <>
            <div>
              Screenshots are cached on our global CDN by default. Cached
              responses are served instantly and{' '}
              <b>don't count against your limit</b>. It lasts for 24 hours.
            </div>
            <div>
              We only recommend turning off the cache if you need to take a
              screenshot of a page that changes frequently. Read the{' '}
              <Link href='/docs/guides/screenshot/caching-and-performance'>
                caching and performance guide
              </Link>{' '}
              for advanced strategies.
            </div>
          </>
        )
      },
      {
        question: 'Any question or issue?',
        answer: (
          <>
            <span>
              Check our{' '}
              <Link href='/docs/guides/screenshot/troubleshooting'>
                troubleshooting guide
              </Link>{' '}
              for common fixes, or reach us at:{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>
            </span>
          </>
        )
      }
    ]}
  />
)

/* ─── Page Head (SEO) ──────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Full Page Screenshot — Capture Any Website Instantly Free'
    noSuffix
    description='Take a full page screenshot of any website in seconds. Just paste a URL and capture the entire webpage. Free, fast, no extension needed. Try it now.'
    image='https://cdn.microlink.io/banner/screenshot.jpeg'
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/website-screenshot/full-page',
        name: 'Microlink Full Page Screenshot Tool',
        description:
          'Take a full page screenshot of any website. Scrolls and renders the entire webpage into a single high-resolution image with customizable viewport width.',
        url: 'https://microlink.io/tools/website-screenshot/full-page',
        applicationCategory: ['DeveloperApplication', 'Tool'],
        keywords: [
          'complete page screenshot',
          'capture full page screenshot',
          'full page screenshot',
          'full website screenshot generator',
          'full site screenshot',
          'entire page screenshot',
          'free full page screen capture',
          'full length website screenshot'
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free tier with 50 full page screenshots per day'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: "What's the maximum screenshot size?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: "On the screenshot tool, the maximum width goes up to 8000px. The height is not limited — it'll be as long as the page is."
            }
          },
          {
            '@type': 'Question',
            name: 'Is this entire website screenshot tool really free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can take up to 50 full page screenshots per day for free, with no credit card required.'
            }
          },
          {
            '@type': 'Question',
            name: "What's the quality of the screenshots?",
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We always use the best quality settings for the full page screenshots. Then we compress the images to the smallest file size possible without losing quality.'
            }
          },
          {
            '@type': 'Question',
            name: 'Do you offer a screenshot API?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Absolutely. The tool is built on the Microlink Screenshot API, which provides a simple REST endpoint. Integrate with any language — Node.js, Python, Ruby, or plain cURL. Use the @microlink/mql SDK for Node.js, or hit the API directly from any HTTP client.'
            }
          }
        ]
      }
    ]}
  />
)

/* ─── Page Component ───────────────────────────────────── */

const WebsiteScreenshotPage = () => (
  <Layout>
    <Hero />
    <ScreenshotTool />
    <HowItWorks />
    <Explanation />
    <UseCases />
    <Banner />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          Website Screenshot API{' '}
          <span
            css={{
              display: 'block',
              color: '#fd494a',
              width: '100%',
              textAlign: 'left'
            }}
          >
            for Automated Captures.
          </span>
        </Subhead>
      }
      caption={
        <>
          No servers to maintain, no load balancers, no paying for capacity you
          don't use. Microlink lets you spend more time building and less time
          configuring — easy integration via <Link href='/screenshot'>API</Link>
          .
        </>
      }
      features={FEATURES_LIST}
    />
    <ApiDocsCard
      title='Screenshot API documentation'
      description='Explore the full Screenshot API reference with interactive examples, SDKs for every language, and ready-to-use code snippets.'
    />
    <ProductInformation />
  </Layout>
)

export default WebsiteScreenshotPage
