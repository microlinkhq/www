import { borders, colors, layout, theme, space } from 'theme'
import React, { useState, useCallback, useEffect } from 'react'
import {
  Camera,
  ArrowRight,
  Download,
  HelpCircle,
  Settings,
  Smartphone
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
  ToolLayout,
  OptionsPanelOuter,
  PreviewOuter,
  PanelRibbonLayout,
  StickyGenerateWrapper,
  SegmentedControl,
  StepCard,
  SectionIcon,
  UseCaseCard,
  PreviewDisplay,
  ScreenshotHistory,
  createThumbnail,
  ApiDocsCard,
  FORMAT_OPTIONS,
  MAX_HISTORY_ITEMS,
  HISTORY_MAX_AGE_MS,
  MOBILE_BP
} from 'components/pages/screenshot'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

/* ─── Constants ────────────────────────────────────────── */

const PHONE_DEVICES = [
  {
    id: 'iphone-17',
    label: 'iPhone 17',
    width: 393,
    height: 852
  },
  {
    id: 'iphone-17-pro-max',
    label: 'iPhone 17 Pro Max',
    width: 440,
    height: 956
  },
  {
    id: 'iphone-17-pro',
    label: 'iPhone 17 Pro',
    width: 402,
    height: 874
  },
  {
    id: 'iphone-17-air',
    label: 'iPhone 17 Air',
    width: 414,
    height: 896
  },
  {
    id: 'galaxy-s25-ultra',
    label: 'Samsung Galaxy S26 Ultra',
    width: 412,
    height: 915
  },
  {
    id: 'galaxy-s25',
    label: 'Samsung Galaxy S26',
    width: 360,
    height: 800
  },
  {
    id: 'galaxy-a16',
    label: 'Samsung Galaxy A16',
    width: 360,
    height: 780
  },
  {
    id: 'galaxy-a06',
    label: 'Samsung Galaxy A06',
    width: 360,
    height: 800
  },
  {
    id: 'pixel-10-pro',
    label: 'Google Pixel 10 Pro',
    width: 412,
    height: 892
  },
  {
    id: 'pixel-10-pro-xl',
    label: 'Google Pixel 10 Pro XL',
    width: 448,
    height: 968
  },
  {
    id: 'pixel-10',
    label: 'Google Pixel 10',
    width: 412,
    height: 892
  }
]

const SCREENSHOT_HISTORY_KEY = 'screenshot-history/mobile'

const PortraitIcon = () => <Smartphone size={14} aria-hidden='true' />

const LandscapeIcon = () => (
  <Smartphone
    size={14}
    aria-hidden='true'
    style={{ transform: 'rotate(90deg)' }}
  />
)

const ORIENTATION_OPTIONS = [
  { value: 'portrait', label: 'Portrait', icon: PortraitIcon },
  { value: 'landscape', label: 'Landscape', icon: LandscapeIcon }
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
    icon: Smartphone,
    title: 'Choose a Phone',
    description: 'Select from the most popular smartphones to emulate.'
  },
  {
    icon: Settings,
    title: 'Configure Options',
    description: 'Choose portrait or landscape, full page capture, and more.'
  },
  {
    icon: Camera,
    title: 'Generate Mobile Screenshot',
    description: 'Click the button and wait a few seconds.'
  },
  {
    icon: Download,
    title: 'Download & Share',
    description:
      'Save your mobile screenshot to your device or share it with others.'
  }
]

const REASON_TO_USE = [
  {
    title: 'Accurate Mobile Emulation',
    description:
      'Emulate real phone viewports for pixel-perfect mobile screenshots. Choose from the latest iPhones, Samsung Galaxy, and Google Pixel devices.'
  },
  {
    title: 'Portrait & Landscape',
    description:
      'Capture screenshots in both orientations. Toggle between portrait and landscape mode to see exactly how your site looks on mobile.'
  },
  {
    title: 'Full Page Capture',
    description:
      "Capture the entire scrollable page, not just what's visible. Perfect for reviewing complete mobile layouts and long-scrolling content."
  },
  {
    title: 'Free + No login',
    description:
      'Free mobile screenshot tool with 50 screen captures per day. Every screenshot is clean and professional. No branding, overlays, or watermarks.'
  },
  {
    title: 'Local Storage Support',
    description:
      'Save screenshots to your local storage for easy access. Access them for 24 hours so if you grab the perfect screenshot, you can come back and grab it again.'
  },
  {
    title: 'Block ads and banners',
    description:
      'Automatically block ads and cookie banners before the rendering. Get the cleanest mobile screenshots possible.'
  }
]

/* ─── Styled (mobile-specific) ──────────────────────────── */

const StyledSelect = styled.select`
  ${theme({
    width: '100%',
    fontFamily: 'sans',
    fontSize: 1,
    px: 2,
    py: '10px',
    borderRadius: '6px',
    border: 1,
    borderColor: 'black10',
    color: 'black80'
  })}
  background: white;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;

  &:focus {
    outline: none;
    border-color: ${colors.link};
    box-shadow: 0 0 0 1px ${colors.link};
  }

  &:focus-visible {
    outline: none;
  }

  @media (max-width: ${MOBILE_BP - 1}px) {
    min-height: 44px;
  }
`

/* ─── Options Panel ────────────────────────────────────── */

const OptionsPanel = ({ options, setOptions, onSubmit, isLoading }) => {
  const [urlError, setUrlError] = useState('')

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
          id='ws-url'
          type='url'
          inputMode='url'
          autoComplete='url'
          placeholder='example.com'
          value={options.url}
          onChange={handleUrlChange}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              // Avoid triggering a new request while a screenshot is already being generated.
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
        {/* ── Device & Orientation ────────────── */}
        <PanelSection>
          <Box css={theme({ pb: '12px' })}>
            <OptionLabel as='span'>Phone</OptionLabel>
            <StyledSelect
              id='ws-phone'
              value={options.phoneId}
              onChange={e =>
                setOptions(prev => ({ ...prev, phoneId: e.target.value }))
              }
              aria-label='Select phone model'
            >
              {PHONE_DEVICES.map(phone => (
                <option key={phone.id} value={phone.id}>
                  {phone.label} ({phone.width}&times;{phone.height})
                </option>
              ))}
            </StyledSelect>
          </Box>

          <Box css={theme({ pb: '12px' })}>
            <OptionLabel as='span'>Orientation</OptionLabel>
            <SegmentedControl
              name='Orientation'
              options={ORIENTATION_OPTIONS}
              value={options.landscape ? 'landscape' : 'portrait'}
              onChange={val =>
                setOptions(prev => ({
                  ...prev,
                  landscape: val === 'landscape'
                }))
              }
            />
          </Box>

          <CheckboxLabel>
            <input
              type='checkbox'
              checked={options.fullPage}
              onChange={e =>
                setOptions(prev => ({
                  ...prev,
                  fullPage: e.target.checked
                }))
              }
            />
            <Text css={theme({ pl: 2, fontSize: 1, color: 'black80' })}>
              Full page screenshot
            </Text>
          </CheckboxLabel>
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
    phoneId: PHONE_DEVICES[0].id,
    landscape: false
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
    width: PHONE_DEVICES[0].width,
    height: PHONE_DEVICES[0].height
  })

  const [localStorageData] = useLocalStorage('mql-api-key')
  const [history, setHistory] = useLocalStorage(SCREENSHOT_HISTORY_KEY, [])
  const [activeHistoryId, setActiveHistoryId] = useState(null)
  const [historyReady, setHistoryReady] = useState(false)

  /* Clean expired entries (>24 h) on mount, then allow rendering */
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
      const phone =
        PHONE_DEVICES.find(p => p.id === options.phoneId) || PHONE_DEVICES[0]
      const viewport = options.landscape
        ? {
          width: phone.height,
          height: phone.width,
          isMobile: true,
          isLandscape: true
        }
        : {
          width: phone.width,
          height: phone.height,
          isMobile: true,
          isLandscape: false
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
            fullPage: options.fullPage
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
          setError({
            message:
              err.description || err.message || 'Failed to capture screenshot.',
            statusCode: err.statusCode || err.code
          })
        }

        if (response?.data?.screenshot) {
          const entryId = String(Date.now())
          const thumbnail = await createThumbnail(response.data.screenshot.url)
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
                  phoneId: options.phoneId,
                  landscape: options.landscape,
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
        setError({
          message:
            err.description || err.message || 'Failed to capture screenshot.',
          statusCode: err.statusCode || err.code
        })
      } finally {
        setIsLoading(false)
      }
    },
    [options, setHistory]
  )

  const handleHistorySelect = useCallback(entry => {
    const { settings, screenshot } = entry
    const phoneId = settings.phoneId || PHONE_DEVICES[0].id
    const phone = PHONE_DEVICES.find(p => p.id === phoneId) || PHONE_DEVICES[0]
    const landscape = settings.landscape || false
    setOptions({
      url: settings.url,
      type: settings.type,
      fullPage: settings.fullPage,
      phoneId,
      landscape,
      adblock: settings.adblock !== undefined ? settings.adblock : true,
      cache: settings.cache !== undefined ? settings.cache : true
    })
    setData({ screenshot })
    setLastUrl(settings.url)
    setNerdStats(entry.nerdStats || null)
    setMqlQuery(entry.mqlQuery || null)
    setResponseData(entry.responseData || null)
    setRequestedViewport(
      landscape
        ? { width: phone.height, height: phone.width }
        : { width: phone.width, height: phone.height }
    )
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
        {/* Options Panel */}
        <OptionsPanelOuter>
          <OptionsPanel
            options={options}
            setOptions={setOptions}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </OptionsPanelOuter>

        {/* Preview Canvas */}
        <PreviewOuter>
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
          />
        </PreviewOuter>
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
        fontSize: [3, '35px', '40px', '50px']
      })}
    >
      Mobile Website Screenshot Generator
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
      Take mobile screenshots of any website instantly.
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
      How to Take a Mobile Screenshot of Any Website
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
    id='use-cases'
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
      css={theme({ fontSize: [3, '30px', '35px', '40px'] })}
    >
      Why choose our mobile screenshot tool?
    </Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [1, 1, 3, 3],
        fontSize: [2, 2, '24px'],
        maxWidth: layout.large
      })}
    >
      Responsive design testing shouldn't require a drawer full of phones. Our
      tool lets you screenshot responsive website layouts across multiple device
      sizes in a single session.
    </Caption>
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr'],
        gap: 3,
        pt: [3, 3, 4, 4],
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
          src='/images/screenshot-tool-landing.png' // TODO: add the definitive landing image
          alt='Screenshot API'
        />
      </Flex>
    }
  />
)

/* ─── Use Cases ───────────────────────────────────────── */

const USE_CASES = [
  {
    title: 'Developers',
    items: [
      "Capture visual regression bugs across device sizes before they reach production. <br><br> A website screenshot mobile capture is the fastest way to document what went wrong and prove it's fixed."
    ],
    link: {
      href: '',
      alt: '',
      text: ''
    }
  },
  {
    title: 'Designers',
    items: [
      'Verify that Figma-to-code handoffs look correct on real mobile viewports. <br><br> Our screenshot mobile website output gives you a pixel-level source of truth.'
    ],
    link: {
      href: '',
      alt: '',
      text: ''
    }
  },
  {
    title: 'Marketers and SEO',
    items: [
      'Document landing page performance, track competitor changes, and build visual audit reports. <br><br> All from a mobile screenshot online tool that requires no installs or configuration.'
    ],
    link: {
      href: '',
      alt: '',
      text: ''
    }
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
      css={theme({ fontSize: [3, '30px', '35px', '40px'] })}
    >
      Who Uses a Mobile Website Screenshot Generator?
    </Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [1, 1, 3, 3],
        fontSize: [2, 2, '24px'],
        maxWidth: layout.large
      })}
    >
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
            titleize={false}
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
                  color={colors.link}
                  css={{ flexShrink: 0, position: 'relative', top: 1 }}
                />
                <Text
                  css={theme({
                    fontSize: 1,
                    color: 'black60',
                    lineHeight: 2
                  })}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              </Flex>
            ))}
            {/* <Flex
              css={
                theme({
                  px: 2,
                  textAlign: 'center'
                })
              }
            >
              <Link alt={link.alt} href={link.href}>{link.text}</Link>
            </Flex> */}
          </Box>
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
        question: 'Is this mobile screenshot tool really free?',
        answer: (
          <>
            <div>
              Yes! You can take up to <b>50&nbsp;mobile screenshots per day</b>{' '}
              for free, with no credit card required. Free screenshots include
              all features — phone emulation, full-page capture, portrait and
              landscape modes, overlays, and multiple formats.
            </div>
            <div>
              Need more? Check our <Link href='/#pricing'>pricing plans</Link>{' '}
              for higher limits and priority processing.
            </div>
          </>
        )
      },
      {
        question: 'Which phones can I emulate?',
        answer: (
          <>
            <div>
              We support the 10 most popular smartphones including iPhone 17 Pro
              Max, iPhone 17 Pro, iPhone 17, iPhone 17 Air, Samsung Galaxy S25
              Ultra, Samsung Galaxy S24, Samsung Galaxy A16, Samsung Galaxy A06,
              Google Pixel 9 Pro, and Google Pixel 9.
            </div>
            <div>
              Each device uses its real CSS viewport dimensions for
              pixel-perfect mobile screenshots.
            </div>
            <div>
              <b>Need a custom size?</b> Use the{' '}
              <Link href='/tools/website-screenshot'>
                Advanced Screenshot Tool
              </Link>
              .
            </div>
          </>
        )
      },
      {
        question: 'Can I take landscape screenshots?',
        answer: (
          <>
            <div>
              Yes! Toggle between portrait and landscape orientation for any
              phone model. The viewport dimensions are automatically swapped to
              give you an accurate landscape view.
            </div>
          </>
        )
      },
      {
        question: "What's the quality of the screenshots?",
        answer: (
          <>
            <div>
              We always use the best quality settings for the screenshots. Then
              we compress the images to the smallest file size possible without
              losing quality.
            </div>
          </>
        )
      },
      {
        question:
          'Can I screenshot a website in different mobile devices at the same time?',
        answer: (
          <>
            <div>
              The free tool handles one device at a time. For batch captures
              across multiple devices simultaneously, use our{' '}
              <Link href='/screenshot'>Screenshot API</Link> which supports any
              custom viewport or preset device in a single request.
            </div>
          </>
        )
      },
      {
        question:
          "What's the difference between a viewport screenshot and a full page capture?",
        answer: (
          <>
            <div>
              A viewport screenshot captures only the visible area of the screen
              (what you'd see without scrolling). A full page screen capture
              mobile screenshot stitches together the entire page from top to
              bottom — ideal for documenting long pages.
            </div>
          </>
        )
      },
      {
        question: 'Any question or issue?',
        answer: (
          <>
            <span>
              We are always available at:{' '}
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
    title='Mobile Website Screenshot Generator — Free Online Tool'
    noSuffix
    description='Take full page screen capture mobile screenshots of any website. Test responsive designs across real device sizes. Free online tool + Screenshot API.'
    image='https://cdn.microlink.io/banner/screenshot.jpeg'
    schemaType='SoftwareApplication'
    structured={{
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://microlink.io/tools/website-screenshot/mobile',
      name: 'Microlink Mobile Screenshot Tool',
      description:
        'Capture mobile screenshots of any website using real smartphone viewports. Supports iPhone, Samsung Galaxy, and Google Pixel devices with portrait and landscape modes.',
      url: 'https://microlink.io/tools/website-screenshot/mobile',
      applicationCategory: ['DeveloperApplication', 'Tool'],
      keywords: [
        'mobile website screenshot generator',
        'mobile screenshot online',
        'full page screen capture mobile',
        'mobile screenshot of website',
        'screenshot responsive website',
        'website screenshot in different devices',
        'mobile website capture tool',
        'responsive design screenshot'
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free tier with 50 screenshots per day'
      }
    }}
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
