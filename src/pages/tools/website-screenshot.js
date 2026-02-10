/* global fetch */

import { borders, colors, layout, theme, transition, space } from 'theme'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
  Camera,
  Clipboard,
  Download,
  ExternalLink,
  Globe,
  ArrowRight,
  Code,
  Link2,
  Settings
} from 'react-feather'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import styled, { keyframes } from 'styled-components'
import get from 'dlv'
import mql from '@microlink/mql'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Choose from 'components/elements/Choose'
import Container from 'components/elements/Container'
import DotSpinner from 'components/elements/DotSpinner'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Image from 'components/elements/Image/Image'
import Input from 'components/elements/Input/Input'
import Label from 'components/elements/Label'
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

import { useClipboard } from 'components/hook/use-clipboard'
import { useLocalStorage } from 'components/hook/use-local-storage'
import { withTitle } from 'helpers/hoc/with-title'

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

const FORMAT_OPTIONS = [
  { value: 'png', label: 'PNG' },
  { value: 'jpeg', label: 'JPG' }
]

const LAYOUT_PIVOT = 1200
const MOBILE_BP = 768

const DEVICE_OPTIONS = [
  { value: 'desktop', label: 'Desktop' },
  { value: 'tablet', label: 'Tablet' },
  { value: 'mobile', label: 'Mobile' }
]

const FEATURES_LIST = [
  {
    title: 'Full-Page Capture',
    description:
      'Capture entire web pages from top to bottom, including below-the-fold content. No manual scrolling or stitching required.'
  },
  {
    title: 'Responsive Screenshots',
    description:
      'Emulate any device viewport — desktop, tablet, or mobile. Test responsive designs with pixel-perfect accuracy.'
  },
  {
    title: 'No Watermarks',
    description:
      'Every screenshot is clean and professional. No branding, overlays, or watermarks on your captured images.'
  },
  {
    title: 'Fast CDN Delivery',
    description:
      'Screenshots are served via a global CDN with 240+ edge locations. Lightning-fast delivery anywhere in the world.'
  },
  {
    title: 'Ad & Popup Blocking',
    description:
      'Automatically block ads, cookie banners, and popups for clean, distraction-free screenshots every time.'
  },
  {
    title: 'Custom Overlays',
    description:
      'Add professional browser chrome, gradient backgrounds, and custom styling to make screenshots presentation-ready.'
  },
  {
    title: 'Multiple Formats',
    description:
      'Export as PNG, JPG, or WebP. Optimize for size or visual fidelity as needed.'
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
    description:
      'Paste any website URL you want to capture. Our system accepts any public webpage.'
  },
  {
    icon: Settings,
    title: 'Configure Options',
    description:
      'Choose format, device viewport, and optional overlays to match your needs.'
  },
  {
    icon: Camera,
    title: 'Generate Screenshot',
    description:
      'Our headless browser renders the page and captures a pixel-perfect screenshot in seconds.'
  },
  {
    icon: Download,
    title: 'Download & Share',
    description:
      'Get your screenshot as a direct URL. Download it, embed it, or share it anywhere.'
  }
]

const USE_CASES = [
  {
    title: 'Visual Monitoring',
    description:
      'Track website changes over time. Detect visual regressions and layout issues automatically.'
  },
  {
    title: 'Automated Testing',
    description:
      'Integrate screenshots into CI/CD pipelines for visual regression testing across browsers and devices.'
  },
  {
    title: 'Social Sharing',
    description:
      'Generate dynamic og:image tags for link previews. Every page gets a unique, up-to-date social card.'
  },
  {
    title: 'Documentation',
    description:
      'Auto-generate screenshots for docs, tutorials, and guides. Always current, never outdated.'
  },
  {
    title: 'Competitor Analysis',
    description:
      'Capture and archive competitor websites at scale for design research and market intelligence.'
  },
  {
    title: 'Content Archiving',
    description:
      'Preserve web content as visual snapshots. Build searchable archives of pages over time.'
  }
]

/* ─── Styled helpers ───────────────────────────────────── */

const PanelSection = styled(Box)`
  ${theme({ pb: 3, mb: 3 })}
  border-bottom: 1px solid ${colors.black05};
`

const SectionLabel = styled(Text)`
  ${theme({
    fontSize: 0,
    fontWeight: 'bold',
    color: 'black80',
    pb: '12px',
    fontFamily: 'sans'
  })}
`

const OptionLabel = styled(Label)`
  ${theme({
    display: 'block',
    pb: 1,
    fontWeight: 'regular',
    fontFamily: 'sans',
    fontSize: 0,
    color: 'black50'
  })}
`

const SegmentedWrapper = styled(Flex)`
  background: #eef1f5;
  ${theme({ borderRadius: 2, p: '3px' })}
`

const SegmentedOption = styled(Box)
  .withConfig({
    shouldForwardProp: prop => !['$active'].includes(prop)
  })
  .attrs({ as: 'button', type: 'button' })`
  ${theme({
    px: 3,
    py: '7px',
    borderRadius: '4px',
    border: 0,
    cursor: 'pointer',
    fontFamily: 'sans',
    fontSize: 0,
    fontWeight: 'regular',
    flex: 1,
    textAlign: 'center'
  })}
  background: ${({ $active }) => ($active ? 'white' : 'transparent')};
  color: ${({ $active }) => ($active ? colors.black80 : colors.black50)};
  box-shadow: ${({ $active }) =>
    $active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};
  transition: background ${transition.medium}, color ${transition.medium},
    box-shadow ${transition.medium};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    color: ${colors.black80};
  }

  &:active {
    background: ${({ $active }) => ($active ? 'white' : 'rgba(0, 0, 0, 0.03)')};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: -2px;
  }

  @media (max-width: ${MOBILE_BP - 1}px) {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const GenerateButton = styled(Button)`
  &&& {
    background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
    box-shadow: 0 4px 14px 0 rgba(236, 72, 153, 0.39);
    color: white;
    border: none;
    width: 100%;
    max-width: 420px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    justify-content: center;
    transition: opacity ${transition.medium}, transform ${transition.short},
      box-shadow ${transition.medium};

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    &:hover:not(:disabled) {
      opacity: 0.92;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px 0 rgba(236, 72, 153, 0.45);
      background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
      color: white;
    }

    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 2px 8px 0 rgba(236, 72, 153, 0.3);
    }

    &:focus-visible {
      outline: 2px solid ${colors.link};
      outline-offset: 2px;
    }

    &:disabled {
      opacity: 0.7;
      cursor: wait;
      background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
      color: white;
    }
  }
`

const CheckboxLabel = styled(Flex).attrs({ as: 'label' })`
  ${theme({
    alignItems: 'center',
    cursor: 'pointer',
    fontFamily: 'sans',
    py: 1
  })}
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  input[type='checkbox'] {
    accent-color: ${colors.link};
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  @media (max-width: ${MOBILE_BP - 1}px) {
    min-height: 44px;

    input[type='checkbox'] {
      width: 20px;
      height: 20px;
    }
  }
`

const ColorSwatch = styled(Box).withConfig({
  shouldForwardProp: prop => !['isActive'].includes(prop)
})`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  transition: transform ${transition.short}, box-shadow ${transition.short};
  border: 2px solid
    ${({ isActive }) => (isActive ? colors.black80 : 'transparent')};
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

/* ─── Preview Animations ──────────────────────────────── */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`

/* ─── Preview Styled Components ───────────────────────── */

const PreviewCanvas = styled(Box)`
  ${theme({
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative'
  })}
  min-height: 380px;
  background: #f1f5f9;
  transition: min-height 300ms cubic-bezier(0.4, 0, 0.2, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (min-width: ${LAYOUT_PIVOT}px) {
    min-height: 520px;
  }
`

const ViewportCard = styled(Box)`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.04);
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
  transition: max-width 600ms cubic-bezier(0.4, 0, 0.2, 1);

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const SkeletonPulse = styled(Box)`
  background: linear-gradient(90deg, #e2e8f0 0%, #f1f5f9 40%, #e2e8f0 80%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.8s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background: #e2e8f0;
  }
`

const FadeIn = styled(Box)`
  animation: ${fadeIn} 400ms cubic-bezier(0.4, 0, 0.2, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const StepCard = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    p: 4,
    flex: 1,
    maxWidth: '240px'
  })}
`

const IconCircle = styled(Flex)`
  ${theme({
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 3
  })}
  background: linear-gradient(225deg, #FF057C22 0%, #32157522 100%);
`

const UseCaseCard = styled(Box)`
  ${theme({
    p: 4,
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    bg: 'white'
  })}
  transition: box-shadow ${transition.medium}, transform ${transition.medium};
  touch-action: manipulation;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`

const ActionButton = styled(Flex).attrs({ as: 'a' })`
  ${theme({
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    py: '10px',
    px: 3,
    borderRadius: 2,
    fontSize: 1,
    fontWeight: 'bold',
    cursor: 'pointer',
    flex: 1,
    textAlign: 'center'
  })}
  text-decoration: none;
  transition: background ${transition.medium}, box-shadow ${transition.medium},
    transform ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }
`

/* ─── Responsive Layout Components ────────────────────── */

const ToolLayout = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  ${theme({ gap: [3, 3, 4, 4] })}

  @media (min-width: ${LAYOUT_PIVOT}px) {
    grid-template-columns: 360px 1fr;
    align-items: start;
  }
`

const OptionsPanelOuter = styled(Box)`
  width: 100%;
  min-width: 0;

  @media (min-width: ${LAYOUT_PIVOT}px) {
    position: sticky;
    top: ${space[3]};
    min-height: 550px;
  }
`

const PreviewOuter = styled(Box)`
  width: 100%;
  min-width: 0;

  @media (min-width: ${LAYOUT_PIVOT}px) {
    min-height: 550px;
  }
`

const PanelRibbonLayout = styled(Flex)`
  flex-direction: column;

  @media (min-width: ${MOBILE_BP}px) and (max-width: ${LAYOUT_PIVOT - 1}px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${space[3]};
    border-bottom: 1px solid ${colors.black05};
    padding-bottom: ${space[3]};
    margin-bottom: ${space[3]};

    > * {
      flex: 1 1 200px;
    }

    ${PanelSection} {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: ${space[1]};
    }

    ${SectionLabel} {
      padding-bottom: 8px;
    }
  }
`

const StickyGenerateWrapper = styled(Box)`
  @media (max-width: ${MOBILE_BP - 1}px) {
    position: sticky;
    bottom: 0;
    z-index: 10;
    padding-top: ${space[3]};
    margin-left: -${space[3]};
    margin-right: -${space[3]};
    padding-left: ${space[3]};
    padding-right: ${space[3]};
    background: linear-gradient(to top, #f8fafc 80%, transparent);
  }
`

/* ─── Color Picker Component ──────────────────────────── */

const ColorPicker = ({ value, onChange }) => {
  return (
    <Box css={theme({ pt: 2 })}>
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
            isActive={value === color}
            style={{ background: color }}
            onClick={() => onChange(color)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onChange(color)
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
            isActive={value === grad}
            style={{ background: grad }}
            onClick={() => onChange(grad)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onChange(grad)
              }
            }}
          />
        ))}
      </Flex>
    </Box>
  )
}

/* ─── Segmented Control ───────────────────────────────── */

const SegmentedControl = ({ options, value, onChange, name }) => {
  const handleKeyDown = useCallback(
    e => {
      const currentIndex = options.findIndex(opt => opt.value === value)
      let nextIndex
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        nextIndex = (currentIndex + 1) % options.length
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        nextIndex = (currentIndex - 1 + options.length) % options.length
      } else {
        return
      }
      onChange(options[nextIndex].value)
    },
    [options, value, onChange]
  )

  return (
    <SegmentedWrapper role='radiogroup' aria-label={name}>
      {options.map(opt => {
        const isActive = value === opt.value
        return (
          <SegmentedOption
            key={opt.value}
            role='radio'
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            $active={isActive}
            onClick={() => onChange(opt.value)}
            onKeyDown={handleKeyDown}
          >
            {opt.label}
          </SegmentedOption>
        )
      })}
    </SegmentedWrapper>
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
              onChange={e =>
                setOptions(prev => ({ ...prev, fullPage: e.target.checked }))
              }
            />
            <Text css={theme({ pl: 2, fontSize: '16px', color: 'black80' })}>
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
              Block ads
            </Text>
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
          </CheckboxLabel>
          <Box>
            <CheckboxLabel>
              <input
                type='checkbox'
                checked={options.overlayEnabled}
                onChange={e =>
                  setOptions(prev => ({
                    ...prev,
                    overlayEnabled: e.target.checked
                  }))
                }
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
                />
              </Box>
            )}
          </Box>
        </Box>
      </PanelRibbonLayout>

      {/* ── Generate ────────────────────────── */}
      <StickyGenerateWrapper css={{ textAlign: 'center' }}>
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

/* ─── Preview Panel ────────────────────────────────────── */

const downloadScreenshot = async (imageUrl, filename) => {
  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = filename || 'screenshot.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(blobUrl)
  } catch {
    window.open(imageUrl, '_blank')
  }
}

const PreviewDisplay = ({
  data,
  isLoading,
  error,
  onRetry,
  url,
  viewportWidth,
  viewportHeight
}) => {
  const [ClipboardComponent, toClipboard] = useClipboard()
  const [isPreviewTooBig, setIsPreviewTooBig] = useState(false)
  const [imagePainted, setImagePainted] = useState(false)
  const prevImageUrlRef = useRef(null)
  const imageUrl = get(data, 'screenshot.url')
  const maxHeight = viewportHeight > 750 ? 750 : viewportHeight
  const maxWidth = (viewportWidth * 2) / 3
  const aspectRatio = (maxHeight / maxWidth) * 100

  const showSkeleton = isLoading || (!!imageUrl && !imagePainted)

  useEffect(() => {
    if (isLoading) {
      setIsPreviewTooBig(false)
      setImagePainted(false)
    }
  }, [isLoading])

  useEffect(() => {
    if (imageUrl && imageUrl !== prevImageUrlRef.current) {
      prevImageUrlRef.current = imageUrl
      setImagePainted(false)
    }
  }, [imageUrl])

  return (
    <PreviewCanvas>
      <Choose>
        {/* ── Loading / waiting for image: skeleton until image is painted ─── */}
        <Choose.When condition={showSkeleton}>
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
                p: [3, 4],
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              })}
            >
              {imageUrl && !isLoading && (
                <img
                  src={imageUrl}
                  alt=''
                  aria-hidden
                  onLoad={() => setImagePainted(true)}
                  style={{
                    position: 'absolute',
                    opacity: 0,
                    pointerEvents: 'none',
                    width: 0,
                    height: 0
                  }}
                />
              )}
              <ViewportCard
                style={{
                  maxWidth: `${maxWidth}px`,
                  maxHeight: `${maxHeight}px`
                }}
              >
                <SkeletonPulse
                  role='progressbar'
                  aria-label={
                    isLoading ? 'Loading screenshot' : 'Loading image'
                  }
                  style={{
                    width: '100%',
                    paddingBottom: `${Math.min(aspectRatio, 180)}%`
                  }}
                />
              </ViewportCard>
            </Box>
            {/* Action bar: loading state */}
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
              aria-label={isLoading ? 'Capturing screenshot' : 'Loading image'}
            >
              <Spinner width='20px' height='14px' />
              <Text
                css={theme({
                  color: 'black50',
                  fontSize: 1,
                  fontFamily: 'sans'
                })}
              >
                {isLoading ? (
                  <>
                    Capturing screenshot
                    <DotSpinner />
                  </>
                ) : (
                  <>
                    Loading image
                    <DotSpinner />
                  </>
                )}
              </Text>
            </Flex>
          </FadeIn>
        </Choose.When>

        {/* ── Error state ────────────────────── */}
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
            <Text css={theme({ color: 'fullscreen', fontSize: 2, pb: 3 })}>
              {error?.statusCode === 429 ? (
                <>
                  You've reached your free daily limit.{' '}
                  <Link href='/payment'>Get an&nbsp;API&nbsp;key</Link> or come
                  back tomorrow.
                </>
              ) : (
                error?.message || 'Something went wrong. Please try again.'
              )}
            </Text>
            {error?.statusCode !== 429 && (
              <Button onClick={onRetry}>
                <Caps css={theme({ fontSize: 0 })}>Try again</Caps>
              </Button>
            )}
          </FadeIn>
        </Choose.When>

        {/* ── Screenshot result (only after image has painted) ──────────────── */}
        <Choose.When condition={!!imageUrl && imagePainted}>
          <FadeIn
            key='result'
            css={theme({
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            })}
          >
            {/* Scrollable image area */}
            <Box
              css={theme({
                p: [3],
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                maxHeight: ['60vh', '750px', '750px'],
                minHeight: ['380px', '380px'],
                WebkitOverflowScrolling: 'touch'
              })}
            >
              {isPreviewTooBig ? (
                <Flex
                  css={theme({
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100%'
                  })}
                >
                  <ViewportCard
                    as='section'
                    aria-live='polite'
                    aria-label='Screenshot preview notice'
                    style={{ maxWidth: `${maxWidth}px` }}
                  >
                    <Flex
                      css={theme({
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: [4, 5],
                        textAlign: 'center',
                        bg: 'gray0'
                      })}
                    >
                      <Box
                        css={theme({
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 3
                        })}
                        style={{
                          background:
                            'linear-gradient(225deg, #FF057C11 0%, #32157511 100%)'
                        }}
                      >
                        <ExternalLink size={26} color={colors.link} />
                      </Box>
                      <Text
                        role='status'
                        css={theme({
                          fontSize: 2,
                          fontWeight: 'bold',
                          color: 'black80',
                          fontFamily: 'sans'
                        })}
                      >
                        This screenshot is too large to preview here.
                      </Text>
                      <Text
                        css={theme({
                          pt: 2,
                          fontSize: 1,
                          color: 'black60',
                          maxWidth: '420px',
                          fontFamily: 'sans'
                        })}
                      >
                        You can still download the full image or open it in a
                        new browser tab using the options below.
                      </Text>
                    </Flex>
                  </ViewportCard>
                </Flex>
              ) : (
                <ViewportCard style={{ maxWidth: `${maxWidth}px` }}>
                  <Image
                    alt={`Screenshot of ${url}`}
                    src={imageUrl}
                    css={theme({
                      width: '100%',
                      maxWidth: '100%',
                      display: 'block'
                    })}
                    style={isImgLoading =>
                      isImgLoading
                        ? {
                          objectFit: 'contain',
                          imageRendering: '-webkit-optimize-contrast'
                        }
                        : {
                          objectFit: 'contain',
                          imageRendering: '-webkit-optimize-contrast'
                        }
                    }
                    onLazyError={() => setIsPreviewTooBig(true)}
                  />
                </ViewportCard>
              )}
            </Box>

            {/* Action buttons bar */}
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
                role='button'
                tabIndex={0}
                onClick={e => {
                  e.preventDefault()
                  downloadScreenshot(imageUrl, `screenshot-${Date.now()}.png`)
                }}
                css={theme({
                  bg: 'black',
                  color: 'white',
                  _hover: { bg: 'black80' }
                })}
              >
                <Download size={15} />
                <Caps css={theme({ fontSize: 0 })}>Download</Caps>
              </ActionButton>

              <Tooltip
                type='copy'
                tooltipsOpts={Tooltip.TEXT.OPTIONS}
                content={
                  <Tooltip.Content>{Tooltip.TEXT.COPY('URL')}</Tooltip.Content>
                }
              >
                <ActionButton
                  as='button'
                  type='button'
                  onClick={() =>
                    toClipboard({
                      copy: imageUrl,
                      text: Tooltip.TEXT.COPIED('URL')
                    })
                  }
                  css={theme({
                    bg: 'white',
                    color: 'black80',
                    border: 1,
                    borderColor: 'black10',
                    width: '100%',
                    _hover: { bg: 'gray1', borderColor: 'black20' }
                  })}
                >
                  <Clipboard size={15} />
                  <Caps css={theme({ fontSize: 0 })}>Copy URL</Caps>
                </ActionButton>
              </Tooltip>

              <ActionButton
                href={imageUrl}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Open screenshot in new tab'
                css={theme({
                  bg: 'white',
                  color: 'black80',
                  border: 1,
                  borderColor: 'black10',
                  _hover: { bg: 'gray1', borderColor: 'black20' }
                })}
              >
                <ExternalLink size={15} />
                <Caps css={theme({ fontSize: 0 })}>Open</Caps>
              </ActionButton>
            </Flex>
          </FadeIn>
          <ClipboardComponent />
        </Choose.When>

        {/* ── Empty state ────────────────────── */}
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
                mb: 3
              })}
              style={{
                background:
                  'linear-gradient(225deg, #FF057C11 0%, #32157511 100%)'
              }}
            >
              <Camera size={32} color={colors.black20} />
            </Box>
            <Text css={theme({ color: 'black40', fontSize: 2 })}>
              Enter a URL and click Generate
            </Text>
            <Text css={theme({ color: 'black20', fontSize: 1, pt: 1 })}>
              Your screenshot will appear here
            </Text>
          </FadeIn>
        </Choose.Otherwise>
      </Choose>
    </PreviewCanvas>
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
    overlayBackground: DEFAULT_OVERLAY_BG
  })

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [lastUrl, setLastUrl] = useState('')
  const [requestedViewport, setRequestedViewport] = useState({
    width: 1920,
    height: 1080
  })

  const [localStorageData] = useLocalStorage('mql-api-key')

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
      setLastUrl(url)

      try {
        const mqlOpts = {
          apiKey: localStorageData.apiKey,
          screenshot: {
            type: options.type,
            fullPage: options.fullPage
          },
          viewport,
          adblock: options.adblock,
          force: !options.cache
        }

        if (options.overlayEnabled) {
          mqlOpts.screenshot.overlay = {
            background: options.overlayBackground
          }
        }

        const response = await mql(url, mqlOpts)
        setData(response.data)
      } catch (err) {
        console.error('Screenshot error:', err)
        setError({
          message:
            err.description || err.message || 'Failed to capture screenshot.',
          statusCode: err.statusCode || err.code
        })
      } finally {
        setIsLoading(false)
      }
    },
    [options]
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
        pt: [3, 3, 5, 5]
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
    <Heading css={theme({ px: [4, 5], maxWidth: layout.large })}>
      Capture perfect website screenshots
    </Heading>
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [3, 3, 4, 4],
        px: 4,
        maxWidth: layout.large
      })}
    >
      Automate high-quality screenshots of any webpage with our powerful API.
      Perfect for developers, designers, and marketers.
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
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      pb: [5, 5, 6, 6]
    })}
  >
    <Subhead variant='gradient'>How it works</Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: layout.small
      })}
    >
      From URL to screenshot in four simple steps.
    </Caption>
    <Flex
      css={theme({
        pt: [4, 4, 5, 5],
        flexDirection: ['column', 'column', 'row', 'row'],
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: [3, 3, 4, 4]
      })}
    >
      {HOW_IT_WORKS.map(({ icon: Icon, title, description }) => (
        <StepCard key={title}>
          <IconCircle>
            <Icon size={24} color={colors.link} />
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

/* ─── Use Cases ────────────────────────────────────────── */

const UseCases = () => (
  <Container
    as='section'
    id='use-cases'
    css={theme({
      alignItems: 'center',
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      pb: [5, 5, 6, 6]
    })}
  >
    <Subhead variant='gradient'>Use cases</Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: layout.small
      })}
    >
      Powerful screenshot automation for every workflow.
    </Caption>
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr'],
        gap: 3,
        pt: [4, 4, 5, 5],
        width: '100%'
      })}
    >
      {USE_CASES.map(({ title, description }) => (
        <UseCaseCard key={title}>
          <Caps as='h3' css={theme({ fontWeight: 'bold', pb: 2, fontSize: 0 })}>
            {title}
          </Caps>
          <Text css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}>
            {description}
          </Text>
        </UseCaseCard>
      ))}
    </Box>
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
      pb: [5, 5, 6, 6]
    })}
  >
    <Box
      css={theme({
        width: '100%',
        p: [4, 5],
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
          pb: 3
        })}
      >
        <IconCircle>
          <Code size={24} color={colors.link} />
        </IconCircle>
      </Flex>
      <Subhead css={theme({ fontSize: [3, 3, 4, 4] })}>
        API documentation
      </Subhead>
      <Caption css={theme({ pt: 3, maxWidth: layout.small, mx: 'auto' })}>
        Explore the full Screenshot API reference with interactive examples,
        SDKs for every language, and ready-to-use code snippets.
      </Caption>
      <Flex
        css={theme({
          pt: [3, 3, 4, 4],
          justifyContent: 'center',
          gap: 3,
          flexWrap: 'wrap'
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

/* ─── Pricing / Limits ─────────────────────────────────── */

const PricingLimits = () => (
  <Block
    forwardedAs='section'
    id='pricing'
    flexDirection='column'
    css={theme({
      px: 4,
      pb: [5, 5, 6, 6],
      width: '100%',
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
          Start free{' '}
          <span css={theme({ display: 'block', color: 'white60' })}>
            Scale as you grow
          </span>
        </Subhead>
      </Flex>
    }
    blockTwo={
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          justifyContent: 'center',
          alignItems: 'baseline',
          width: '100%',
          maxWidth: layout.normal,
          gap: [4, 4, 5, 5],
          flexWrap: 'wrap'
        })}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        <Flex
          css={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <Subhead
            forwardedAs='div'
            css={theme({
              fontSize: [3, 4, 4, 4],
              color: 'white',
              fontWeight: 'bold'
            })}
          >
            50
            <Caption
              forwardedAs='div'
              css={theme({
                ml: 2,
                color: 'white',
                display: 'inline',
                fontWeight: 'bold'
              })}
              titleize={false}
            >
              /day
            </Caption>
          </Subhead>
          <Caption forwardedAs='div' css={theme({ color: 'white60', pt: 2 })}>
            {['Free', 'requests'].map(children => (
              <Caps
                key={children}
                css={theme({ fontWeight: 'bold', fontSize: [0, 2, 2, 2] })}
              >
                {children}
              </Caps>
            ))}
          </Caption>
        </Flex>

        <Flex
          css={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <Subhead
            forwardedAs='div'
            css={theme({
              fontSize: [3, 4, 4, 4],
              color: 'white',
              fontWeight: 'bold'
            })}
          >
            99.9
            <Caption
              forwardedAs='div'
              css={theme({
                ml: 2,
                color: 'white',
                display: 'inline',
                fontWeight: 'bold'
              })}
              titleize={false}
            >
              %
            </Caption>
          </Subhead>
          <Caption forwardedAs='div' css={theme({ color: 'white60', pt: 2 })}>
            {['Uptime', 'SLA'].map(children => (
              <Caps
                key={children}
                css={theme({ fontWeight: 'bold', fontSize: [0, 2, 2, 2] })}
              >
                {children}
              </Caps>
            ))}
          </Caption>
        </Flex>

        <Flex
          css={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          }}
        >
          <Subhead
            forwardedAs='div'
            css={theme({
              fontSize: [3, 4, 4, 4],
              color: 'white',
              fontWeight: 'bold'
            })}
          >
            240
            <Caption
              forwardedAs='div'
              css={theme({
                ml: 2,
                color: 'white',
                display: 'inline',
                fontWeight: 'bold'
              })}
              titleize={false}
            >
              +
            </Caption>
          </Subhead>
          <Caption forwardedAs='div' css={theme({ color: 'white60', pt: 2 })}>
            {['CDN', 'edges'].map(children => (
              <Caps
                key={children}
                css={theme({ fontWeight: 'bold', fontSize: [0, 2, 2, 2] })}
              >
                {children}
              </Caps>
            ))}
          </Caption>
        </Flex>
      </Flex>
    }
  />
)

/* ─── Related Tools ────────────────────────────────────── */

const RelatedTools = () => (
  <Container
    as='section'
    id='related'
    css={theme({
      alignItems: 'center',
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      pb: [5, 5, 6, 6]
    })}
  >
    <Subhead css={theme({ fontSize: [3, 3, 4, 4] })}>Related tools</Subhead>
    <Caption css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.small })}>
      Explore more developer tools powered by Microlink.
    </Caption>
    <Box
      css={theme({
        display: 'grid',
        gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr'],
        gap: 3,
        pt: [4, 4, 5, 5],
        width: '100%'
      })}
    >
      {[
        {
          title: 'Screenshot API',
          description:
            'The core screenshot endpoint with full browser control and device emulation.',
          href: '/screenshot'
        },
        {
          title: 'PDF Generation',
          description:
            'Convert any webpage to a professional PDF document with a single API call.',
          href: '/pdf'
        },
        {
          title: 'Sharing Debugger',
          description:
            'Debug and validate Open Graph, Twitter Cards, and other metadata markup.',
          href: '/tools/sharing-debugger'
        },
        {
          title: 'Metadata API',
          description:
            'Extract structured metadata from any URL — titles, images, descriptions, and more.',
          href: '/metadata'
        },
        {
          title: 'Insights',
          description:
            'Get Lighthouse performance audits and technology stack detection for any URL.',
          href: '/insights'
        },
        {
          title: 'Microlink SDK',
          description:
            'Beautiful link previews for your website with a single React component.',
          href: '/sdk'
        }
      ].map(({ title, description, href }) => (
        <Link key={href} href={href} externalIcon={false}>
          <UseCaseCard css={theme({ height: '100%' })}>
            <Caps
              as='h3'
              css={theme({ fontWeight: 'bold', pb: 2, fontSize: 0 })}
            >
              {title}
            </Caps>
            <Text css={theme({ fontSize: 1, color: 'black60', lineHeight: 2 })}>
              {description}
            </Text>
            <Flex css={theme({ pt: 2, alignItems: 'center', color: 'link' })}>
              <Text css={theme({ fontSize: 0, fontWeight: 'bold' })}>
                Learn more
              </Text>
              <ArrowRight size={14} />
            </Flex>
          </UseCaseCard>
        </Link>
      ))}
    </Box>
  </Container>
)

/* ─── Product Information (FAQ) ────────────────────────── */

const ProductInformation = () => (
  <Faq
    title='Product information'
    caption='Everything you need to know about the Website Screenshot tool.'
    css={theme({
      pb: [5, 5, 6, 6],
      bg: 'pinky',
      borderTop: `${borders[1]} ${colors.pinkest}`,
      borderBottom: `${borders[1]} ${colors.pinkest}`
    })}
    questions={[
      {
        question: 'Is the screenshot tool free to use?',
        answer: (
          <>
            <div>
              Yes! You can take up to <b>50&nbsp;screenshots per day</b> for
              free, with no credit card required. Free screenshots include all
              features — full-page capture, device emulation, overlays, and
              multiple formats.
            </div>
            <div>
              Need more? Check our <Link href='/payment'>pricing plans</Link>{' '}
              for higher limits and priority processing.
            </div>
          </>
        )
      },
      {
        question: 'What formats are available?',
        answer: (
          <>
            <div>
              Export screenshots as <b>PNG</b> (lossless), <b>JPG</b>, or{' '}
              <b>WebP</b> (modern format, smaller file sizes). Choose the format
              that best fits your use case.
            </div>
            <div>
              Full-page screenshots, custom viewports, ad blocking, and
              professional overlay effects are all included at no extra cost.
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
              <b>don't count against your quota</b>. You can configure the cache
              TTL via the{' '}
              <Link href='/docs/api/parameters/ttl'>ttl parameter</Link>.
            </div>
            <div>
              Use <Link href='/docs/api/parameters/force'>force: true</Link> to
              bypass the cache and get a fresh screenshot.
            </div>
          </>
        )
      },
      {
        question: 'Other questions?',
        answer: (
          <div>
            We're always available at{' '}
            <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
          </div>
        )
      }
    ]}
  />
)

/* ─── Page Head (SEO) ──────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Capture perfect website screenshots'
    description='Automate high-quality screenshots of any webpage with a powerful API. Full-page capture, device emulation, overlays, and multiple formats. Free to use.'
    image='https://cdn.microlink.io/banner/screenshot.jpeg'
    schemaType='SoftwareApplication'
    structured={{
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://microlink.io/tools/website-screenshot',
      name: 'Microlink Website Screenshot Tool',
      description:
        'Capture high-quality screenshots of any webpage with full-page support, device emulation, overlays, and multiple formats.',
      url: 'https://microlink.io/tools/website-screenshot',
      applicationCategory: ['DeveloperApplication', 'Tool'],
      keywords: [
        'website screenshot tool',
        'screenshot API',
        'webpage capture',
        'full page screenshot',
        'website screenshot generator',
        'responsive screenshot',
        'browser automation',
        'visual testing',
        'web scraping screenshots',
        'automated screenshots'
      ],
      about: [
        { '@type': 'Thing', name: 'Website Screenshot Tool' },
        { '@type': 'Thing', name: 'Screenshot API' },
        { '@type': 'Thing', name: 'Visual Documentation' },
        { '@type': 'Thing', name: 'Browser Automation' }
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
    <UseCases />
    <Features
      css={theme({ px: 4 })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          High performance,{' '}
          <span
            css={{
              display: 'block',
              color: '#fd494a',
              width: '100%',
              textAlign: 'left'
            }}
          >
            with no compromises.
          </span>
        </Subhead>
      }
      caption={
        <>
          No servers to maintain, no load balancers, no paying for capacity you
          don't use. Microlink lets you spend more time building and less time
          configuring — easy integration via{' '}
          <Link href='/docs/api/getting-started/overview'>API</Link>.
        </>
      }
      features={FEATURES_LIST}
    />
    <ApiDocs />
    <PricingLimits />
    <RelatedTools />
    <ProductInformation />
  </Layout>
)

export default WebsiteScreenshotPage
