import { borders, colors, layout, theme, transition, space } from 'theme'
import React, { useState, useCallback, useEffect } from 'react'
import {
  Camera,
  Globe,
  ArrowRight,
  Code,
  HelpCircle,
  Link2,
  Settings,
  Download
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

import ArrowLink from 'components/patterns/ArrowLink'
import Block from 'components/patterns/Block/Block'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import Tooltip from 'components/patterns/Tooltip/Tooltip'

import {
  extractNerdStats,
  buildMqlQuery
} from 'components/patterns/NerdStats/NerdStats'
import { useLocalStorage } from 'components/hook/use-local-storage'
import { withTitle } from 'helpers/hoc/with-title'

import {
  PanelSection,
  SectionLabel,
  OptionLabel,
  GenerateButton,
  CheckboxLabel,
  StepCard,
  IconCircle,
  UseCaseCard,
  ToolLayout,
  OptionsPanelOuter,
  PreviewOuter,
  PanelRibbonLayout,
  StickyGenerateWrapper,
  SegmentedControl,
  PreviewDisplay,
  ScreenshotHistory,
  createThumbnail,
  MAX_HISTORY_ITEMS,
  HISTORY_MAX_AGE_MS,
  FORMAT_OPTIONS,
  MOBILE_BP
} from 'components/pages/screenshot/shared'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

/* ─── Constants ────────────────────────────────────────── */

const SOLID_COLORS = [
  '#000000',
  '#FFFFFF',
  '#FF057C',
  '#321575',
  '#4158D0',
  '#C850C0',
  '#FFCC70',
  '#667eea',
  '#f093fb',
  '#f5576c',
  '#4facfe',
  '#00f2fe'
]

const GRADIENT_PRESETS = [
  'linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(225deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(180deg, #C850C0 0%, #FFCC70 100%)',
  'linear-gradient(135deg, #4158D0 0%, #C850C0 50%, #FFCC70 100%)',
  'linear-gradient(225deg, #FF057C 0%, #4158D0 100%)',
  'linear-gradient(45deg, #8D0B93 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #f5576c 0%, #FFCC70 100%)',
  'linear-gradient(225deg, #321575 0%, #4facfe 100%)',
  'linear-gradient(180deg, #667eea 0%, #f093fb 100%)',
  'linear-gradient(135deg, #764ba2 0%, #C850C0 50%, #FF057C 100%)'
]

const DEFAULT_OVERLAY_BG =
  'linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)'

const DEVICES = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 393, height: 852 }
}

const SCREENSHOT_HISTORY_KEY = 'screenshot-history'

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
    description: 'Paste any website address into the capture field above.'
  },
  {
    icon: Settings,
    title: 'Configure Options',
    description: 'Choose from desktop, tablet, or mobile viewports.'
  },
  {
    icon: Camera,
    title: 'Generate Screenshot',
    description: 'Click the button and wait a few seconds.'
  },
  {
    icon: Download,
    title: 'Download & Share',
    description: 'Save your screenshot to your device or share it with others.'
  }
]

const REASON_TO_USE = [
  {
    title: 'Fast Screen Capture',
    description:
      'Our advanced technology captures website screenshots as fast as possible. Whether you need a quick snapshot or bulk captures via API, we deliver speed and quality.'
  },
  {
    title: 'High-Resolution Website Images',
    description:
      'Get crystal-clear screenshots at any viewport size—mobile, tablet, desktop, or custom dimensions. Add custom backgrounds and choose from multiple formats.'
  },
  {
    title: 'No Installation Required',
    description:
      'Take web screenshots directly in your browser. No downloads, no plugins, no hassle. Just paste the URL and capture.'
  },
  {
    title: 'Free + No login',
    description:
      'Free screenshot tool with 50 screen captures per day. Every screenshot is clean and professional. No branding, overlays, or watermarks on your captured images.'
  },
  {
    title: 'Local Storage Support',
    description:
      'Save screenshots to your local storage for easy access. Access them for 24 hours so if you grab the perfect screenshot, you can come back and grab it again.'
  },
  {
    title: 'Block ads and banners',
    description:
      'Automatically block ads and cookie banners before the rendering. Get the cleanest screenshots possible.'
  }
]

/* ─── Page-specific Styled Components ──────────────────── */

const ColorSwatch = styled(Box).withConfig({
  shouldForwardProp: prop => !['isActive'].includes(prop)
})`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform ${transition.short}, box-shadow ${transition.short};

  ${({ isActive }) =>
    isActive ? `border: 2px solid ${colors.black80}` : null};

  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    transform: scale(1.15);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  @media (max-width: ${MOBILE_BP - 1}px) {
    width: 32px;
    height: 32px;
  }
`

const NativeColorPicker = styled.input.attrs({ type: 'color' })`
  width: 28px;
  height: 28px;
  min-width: 28px;
  padding: 0;
  border: 2px solid ${colors.black10};
  border-radius: 50%;
  cursor: pointer;
  background: none;
  -webkit-appearance: none;
  appearance: none;
  overflow: hidden;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
  }

  &::-moz-color-swatch {
    border: none;
    border-radius: 50%;
  }

  &:hover {
    border-color: ${colors.black20};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  @media (max-width: ${MOBILE_BP - 1}px) {
    width: 44px;
    height: 44px;
    min-width: 44px;
  }
`

const HexTextInput = styled.input`
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
  flex: 1;
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

/* ─── Color Picker Component ──────────────────────────── */

const ColorPicker = ({ value, onChange, customHex, onCustomHexChange }) => {
  const hasCustomHex = customHex && customHex.length > 0

  const nativePickerValue =
    hasCustomHex && /^#?[0-9A-Fa-f]{6}$/.test(customHex)
      ? customHex.startsWith('#')
        ? customHex
        : `#${customHex}`
      : '#000000'

  const handlePresetClick = preset => {
    onChange(preset)
    onCustomHexChange('')
  }

  return (
    <Box css={theme({ pt: 1 })}>
      <OptionLabel as='span' id='solid-colors-label'>
        Solid colors
      </OptionLabel>
      <Flex
        role='group'
        aria-labelledby='solid-colors-label'
        css={{ flexWrap: 'wrap', gap: space[2] }}
      >
        {SOLID_COLORS.map(color => (
          <ColorSwatch
            key={color}
            role='button'
            tabIndex={0}
            aria-label={`Select color ${color}`}
            isActive={!hasCustomHex && value === color}
            style={{ background: color }}
            onClick={() => handlePresetClick(color)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handlePresetClick(color)
              }
            }}
          />
        ))}
      </Flex>

      <OptionLabel as='span' css={theme({ pt: 3 })} id='gradients-label'>
        Gradients
      </OptionLabel>
      <Flex
        role='group'
        aria-labelledby='gradients-label'
        mb={2}
        css={{ flexWrap: 'wrap', gap: space[2] }}
      >
        {GRADIENT_PRESETS.map(grad => (
          <ColorSwatch
            key={grad}
            role='button'
            tabIndex={0}
            aria-label='Select gradient'
            isActive={!hasCustomHex && value === grad}
            style={{ background: grad }}
            onClick={() => handlePresetClick(grad)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handlePresetClick(grad)
              }
            }}
          />
        ))}
      </Flex>

      <OptionLabel as='span' css={theme({ pt: 2 })} id='custom-color-label'>
        Custom color
      </OptionLabel>
      <Flex
        aria-labelledby='custom-color-label'
        css={{ alignItems: 'center', gap: space[2] }}
      >
        <NativeColorPicker
          value={nativePickerValue}
          onChange={e => onCustomHexChange(e.target.value)}
          aria-label='Pick a custom color'
        />
        <HexTextInput
          placeholder='#FF057C'
          value={customHex}
          onChange={e => onCustomHexChange(e.target.value.trim())}
          aria-label='Enter hex color code'
          spellCheck={false}
          autoComplete='off'
          maxLength={7}
        />
      </Flex>
    </Box>
  )
}

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

    const width = Number(options.customWidth) || 1920
    const height = Number(options.customHeight) || 1080
    const perimeter = width + height

    if (perimeter > 8000) {
      setViewportError(
        'Viewport perimeter (width + height) is too big. Please use 8000px or less.'
      )
      return
    }

    setOptions(prev => ({ ...prev, url }))
    setUrlError('')
    setViewportError('')
    onSubmit(url)
  }, [
    options.url,
    options.customWidth,
    options.customHeight,
    onSubmit,
    normalizeUrl,
    setOptions
  ])

  const handleDeviceChange = useCallback(
    val => {
      const device = DEVICES[val]
      if (device) {
        setOptions(prev => ({
          ...prev,
          device: val,
          customWidth: String(device.width),
          customHeight: String(device.height)
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
            <OptionLabel as='span'>Viewport</OptionLabel>
            <Flex css={{ alignItems: 'center' }}>
              <Box css={{ flex: 1 }}>
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
                    fontSize: '16px',
                    height: '18px'
                  })}
                />
              </Box>
              <Flex
                css={theme({
                  px: '6px',
                  color: 'black20',
                  alignItems: 'center'
                })}
              >
                <Link2 size={14} />
              </Flex>
              <Box css={{ flex: 1 }}>
                <Input
                  id='ws-height'
                  type='number'
                  inputMode='numeric'
                  placeholder='1080'
                  aria-label='Viewport height in pixels'
                  disabled={options.fullPage}
                  value={options.customHeight}
                  onChange={e => {
                    setOptions(prev => ({
                      ...prev,
                      customHeight: e.target.value,
                      device: 'custom'
                    }))
                    if (viewportError) setViewportError('')
                  }}
                  css={theme({
                    width: '100%',
                    fontSize: '16px',
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

          <CheckboxLabel>
            <input
              type='checkbox'
              checked={options.fullPage}
              disabled={options.overlayEnabled}
              onChange={e => {
                const checked = e.target.checked
                setOptions(prev => ({
                  ...prev,
                  fullPage: checked,
                  overlayEnabled: checked ? false : prev.overlayEnabled
                }))
              }}
            />
            <Text css={theme({ pl: 2, fontSize: '16px', color: 'black80' })}>
              Capture entire page
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
          <Box>
            <CheckboxLabel>
              <input
                type='checkbox'
                checked={options.overlayEnabled}
                disabled={options.fullPage}
                onChange={e => {
                  const checked = e.target.checked
                  setOptions(prev => ({
                    ...prev,
                    overlayEnabled: checked,
                    fullPage: checked ? false : prev.fullPage
                  }))
                }}
              />
              <Text css={theme({ pl: 2, fontSize: 1, color: 'black80' })}>
                Add background color
              </Text>
            </CheckboxLabel>

            {options.overlayEnabled && (
              <Box css={theme({ pt: 1, pl: 0 })}>
                <ColorPicker
                  value={options.overlayBackground}
                  onChange={val =>
                    setOptions(prev => ({ ...prev, overlayBackground: val }))
                  }
                  customHex={options.overlayCustomHex}
                  onCustomHexChange={val =>
                    setOptions(prev => ({ ...prev, overlayCustomHex: val }))
                  }
                />
              </Box>
            )}
          </Box>
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
    customWidth: '1920',
    customHeight: '1080',
    overlayEnabled: false,
    overlayBackground: DEFAULT_OVERLAY_BG,
    overlayCustomHex: ''
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
      const viewport = {
        width: Number(options.customWidth) || 1920,
        height: Number(options.customHeight) || 1080
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

        if (options.overlayEnabled) {
          const customHex = options.overlayCustomHex
            ? options.overlayCustomHex.startsWith('#')
              ? options.overlayCustomHex
              : `#${options.overlayCustomHex}`
            : ''

          mqlOpts.screenshot.overlay = {
            background: customHex || options.overlayBackground
          }
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
                  device: options.device,
                  customWidth: options.customWidth,
                  customHeight: options.customHeight,
                  overlayEnabled: options.overlayEnabled,
                  overlayBackground: options.overlayBackground,
                  overlayCustomHex: options.overlayCustomHex,
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
    setOptions({
      url: settings.url,
      type: settings.type,
      fullPage: settings.fullPage,
      device: settings.device,
      customWidth: settings.customWidth,
      customHeight: settings.customHeight,
      overlayEnabled: settings.overlayEnabled,
      overlayBackground: settings.overlayBackground || DEFAULT_OVERLAY_BG,
      overlayCustomHex: settings.overlayCustomHex || '',
      adblock: settings.adblock !== undefined ? settings.adblock : true,
      cache: settings.cache !== undefined ? settings.cache : true
    })
    setData({ screenshot })
    setLastUrl(settings.url)
    setNerdStats(entry.nerdStats || null)
    setMqlQuery(entry.mqlQuery || null)
    setResponseData(entry.responseData || null)
    setRequestedViewport({
      width: Number(settings.customWidth) || 1920,
      height: Number(settings.customHeight) || 1080
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
      Generate Website Screenshots Instantly
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
      Capture any website screenshot online in seconds
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
      How to take a high quality screenshot of a website
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
          <IconCircle css={theme({ width: '80px', height: '80px' })}>
            <Icon size={32} color='rgba(0, 0, 0, 0.8)' />
          </IconCircle>
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
      css={theme({ fontSize: [3, '30px', '35px', '45px'] })}
    >
      Why choose our free screenshot tool?
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
        <Link href='/screenshot'>screenshot API</Link>—the same infrastructure
        processing millions of screenshots per week for paying customers. You
        get enterprise performance at no cost.
      </Text>
    </Caption>
  </Container>
)

/* ─── API Docs Card ────────────────────────────────────── */

const ApiDocs = () => (
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
      style={{
        background: 'linear-gradient(225deg, #FF057C08 0%, #32157508 100%)'
      }}
    >
      <Flex
        css={theme({
          justifyContent: 'center',
          p: 1
        })}
      >
        <IconCircle>
          <Code size={24} color={colors.link} />
        </IconCircle>
      </Flex>
      <Subhead css={theme({ fontSize: 3 })}>
        Screenshot API documentation
      </Subhead>
      <Caption
        css={theme({ pt: 3, maxWidth: layout.small, mx: 'auto', fontSize: 2 })}
      >
        Explore the full Screenshot API reference with interactive examples,
        SDKs for every language, and ready-to-use code snippets.
      </Caption>
      <Flex
        css={theme({
          pt: [3, 3, 4, 4],
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap',
          fontSize: [1, 1, 2, 2]
        })}
      >
        <ArrowLink href='/docs/api/parameters/screenshot'>
          API reference
        </ArrowLink>
        <ArrowLink href='/docs/api/getting-started/overview'>
          Getting started
        </ArrowLink>
      </Flex>
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
    title: 'For Web Designers',
    items: [
      'Create portfolio screenshots of live websites',
      'Add the screenshots to AI tools to turn them in HTML',
      'Generate client approval mockups instantly',
      'Capture responsive layouts across devices'
    ],
    link: {
      href: '/blog/using-screenshot-design',
      alt: 'Screenshot for designers use case',
      text: 'Check out how to xxxx'
    }
  },
  {
    title: 'For Digital Marketers',
    items: [
      'Screenshot competitor websites for analysis',
      'Create case study visuals with before/after shots',
      'Capture landing pages for ad compliance records',
      'Generate social media preview images'
    ],
    link: {
      href: '/use-cases/generate-og-img-previews',
      alt: 'Screenshot for og:images',
      text: 'Check out this use case xxxx'
    }
  },
  {
    title: 'For Developers',
    items: [
      'Screenshot webpages for bug reports',
      'Automate visual regression testing via API',
      'Capture site states at specific timestamps',
      'Generate and previews of multiple websites without effort'
    ],
    link: {
      href: '/screenshot',
      alt: 'Screenshot API',
      text: 'Check out the API'
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
      css={theme({ fontSize: [3, '30px', '35px', '45px'] })}
    >
      Use cases for website screen capture
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
                >
                  {item}
                </Text>
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
        question: 'Is this website screenshot tool really free?',
        answer: (
          <>
            <div>
              Yes! You can take up to <b>50&nbsp;screenshots per day</b> for
              free, with no credit card required. Free screenshots include all
              features — full-page capture, device emulation, overlays, and
              multiple formats.
            </div>
            <div>
              Need more? Check our <Link href='/#pricing'>pricing plans</Link>{' '}
              for higher limits and priority processing.
            </div>
          </>
        )
      },
      {
        question: "What's the maximum screenshot size?",
        answer: (
          <>
            <div>
              On the screenshot tool, the maximum resolution area goes up to
              8000px. Even if the preview shows a smaller area, the actual
              screenshot will be the full size.
            </div>
            <div>
              On the API, there's no maximum size limit. You can take
              screenshots of any size you need.
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
        question: 'Can I integrate this into my application?',
        answer: (
          <>
            <div>
              Absolutely. The tool is built on the{' '}
              <Link href='/docs/api/parameters/screenshot'>
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
              We only recomend turning of the cache if you need to take a
              screenshot of a page that changes frequently.
            </div>
          </>
        )
      },
      {
        question: 'Any question or issue?',
        answer: (
          <>
            <span>
              We're are always available at:{' '}
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
    title='Website Screenshot Generator - Free URL Screen Capture'
    noSuffix
    description='Generate high-quality website screenshots from any URL. Free, no-login online screen capture tool powered by a fast, reliable, and high resolution API.'
    image='https://cdn.microlink.io/banner/screenshot.jpeg' // TODO: generate banner
    schemaType='SoftwareApplication'
    structured={{
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://microlink.io/tools/website-screenshot',
      name: 'Microlink Website Screenshot Tool',
      description:
        'Capture high-quality screenshots of any webpage with full-page support, device emulation, overlays, and multiple formats.', // TODO: add json-ld description
      url: 'https://microlink.io/tools/website-screenshot',
      applicationCategory: ['DeveloperApplication', 'Tool'],
      keywords: [
        'website screenshot tool',
        'screenshot API',
        'webpage capture',
        'take web screenshot',
        'website screenshot generator',
        'responsive screenshot',
        'screen capture site',
        'web page screen capture online'
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
    <ApiDocs />
    <ProductInformation />
  </Layout>
)

export default WebsiteScreenshotPage
