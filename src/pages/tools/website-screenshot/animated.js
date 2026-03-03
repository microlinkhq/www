/* global fetch, ResizeObserver */

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
  HelpCircle,
  Link2,
  Settings,
  X,
  Film
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

const DEVICES = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 393, height: 852 }
}

const SCREENSHOT_HISTORY_KEY = 'animated-screenshot-history'
const MAX_HISTORY_ITEMS = 12
const HISTORY_MAX_AGE_MS = 24 * 60 * 60 * 1000
const THUMB_SIZE = 244
const THUMB_QUALITY = 0.85

const LAYOUT_PIVOT = 1200
const MOBILE_BP = 768
const MAX_SCREENSHOT_PREVIEW_HEIGHT = 750

const MAX_WIDTH = 2500
const MAX_HEIGHT = 1200

const MIN_DURATION_S = 2
const MAX_DURATION_S = 15
const DEFAULT_DURATION_S = 5

const DEVICE_OPTIONS = [
  { value: 'desktop', label: 'Desktop' },
  { value: 'tablet', label: 'Tablet' },
  { value: 'mobile', label: 'Mobile' }
]

const FEATURES_LIST = [
  {
    title: 'Fast CDN Delivery',
    description:
      'Animated screenshots are served via a global CDN with 240+ edge locations. Lightning-fast delivery anywhere in the world.'
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
    icon: Film,
    title: 'Generate Recording',
    description: 'Click the button and wait while the page is recorded.'
  },
  {
    icon: Download,
    title: 'Download & Share',
    description: 'Save your animated screenshot as MP4 or share it with others.'
  }
]

const REASON_TO_USE = [
  {
    title: 'Animated Screen Capture',
    description:
      'Record any website as a 5-second MP4 video. Show scrolling, animations, and interactive content that static screenshots miss.'
  },
  {
    title: 'High-Resolution Recordings',
    description:
      'Get crystal-clear animated screenshots at any viewport size\u2014mobile, tablet, desktop, or custom dimensions up to 2500\u00D71200.'
  },
  {
    title: 'No Installation Required',
    description:
      'Record animated website screenshots directly in your browser. No downloads, no plugins, no hassle. Just paste the URL and capture.'
  },
  {
    title: 'Free + No login',
    description:
      'Free animated screenshot tool with 50 captures per day. Every recording is clean and professional. No branding, overlays, or watermarks.'
  },
  {
    title: 'Local Storage Support',
    description:
      'Save recordings to your local storage for easy access. Access them for 24 hours so you can come back and grab them again.'
  },
  {
    title: 'Block ads and banners',
    description:
      'Automatically block ads and cookie banners before the recording. Get the cleanest animated screenshots possible.'
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
  background: #f1f5f9;
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
    flex: ['0 0 calc(50% - 12px)', '0 0 calc(50% - 12px)', 1, 1],
    maxWidth: ['none', 'none', '240px', '240px']
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

/* ─── Screenshot History Styled Components ────────────── */

const HistoryScrollContainer = styled(Flex)`
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x mandatory;
  ${theme({ gap: 2, pb: 2, pt: 2 })}
  scrollbar-width: thin;
  scrollbar-color: ${colors.black10} transparent;

  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.black10};
    border-radius: 2px;
  }
`

const HistoryThumbnail = styled(Box).withConfig({
  shouldForwardProp: prop => !['$active'].includes(prop)
})`
  position: relative;
  flex-shrink: 0;
  width: 122px;
  height: 122px;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  scroll-snap-align: start;
  border: 2px solid ${({ $active }) => ($active ? colors.link : colors.black10)};
  transition: border-color ${transition.medium}, box-shadow ${transition.medium},
    transform ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    border-color: ${({ $active }) => ($active ? colors.link : colors.black20)};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const ThumbnailDeleteButton = styled(Box).attrs({
  as: 'button',
  type: 'button'
})`
  position: absolute;
  top: 3px;
  right: 3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity ${transition.short}, background ${transition.short};
  z-index: 1;
  padding: 0;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  ${HistoryThumbnail}:hover &,
  ${HistoryThumbnail}:focus-within & {
    opacity: 1;
  }

  &:hover {
    background: rgba(220, 38, 38, 0.9);
  }

  &:focus-visible {
    opacity: 1;
    outline: 2px solid white;
    outline-offset: 1px;
  }
`

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

    const width = Math.min(Number(options.customWidth) || 1920, MAX_WIDTH)
    const height = Math.min(Number(options.customHeight) || 1080, MAX_HEIGHT)
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
            <Text
              css={theme({
                color: 'black30',
                fontSize: '11px',
                pt: 1,
                fontFamily: 'sans'
              })}
            >
              Max {MAX_WIDTH}&times;{MAX_HEIGHT}
            </Text>
            {viewportError && (
              <Text
                role='alert'
                css={theme({ color: 'fullscreen', fontSize: 0, pt: 1 })}
              >
                {viewportError}
              </Text>
            )}
          </Box>

          <Box css={theme({ pb: '12px' })}>
            <OptionLabel as='span'>Animation duration (seconds)</OptionLabel>
            <Flex css={{ alignItems: 'center', gap: space[2] }}>
              <Box css={{ flex: 1 }}>
                <input
                  id='ws-duration'
                  type='range'
                  min={MIN_DURATION_S}
                  max={MAX_DURATION_S}
                  step={1}
                  value={Number(options.duration) || DEFAULT_DURATION_S}
                  onChange={e =>
                    setOptions(prev => ({ ...prev, duration: e.target.value }))
                  }
                  aria-label='Animation duration in seconds'
                  style={{ width: '100%', accentColor: colors.link }}
                />
              </Box>
              <Input
                id='ws-duration-input'
                type='number'
                inputMode='numeric'
                min={MIN_DURATION_S}
                max={MAX_DURATION_S}
                step={1}
                placeholder={String(DEFAULT_DURATION_S)}
                aria-label='Animation duration in seconds'
                value={options.duration}
                onChange={e => {
                  const raw = e.target.value
                  setOptions(prev => ({ ...prev, duration: raw }))
                }}
                onBlur={() => {
                  const n = Number(options.duration)
                  if (!n || n < MIN_DURATION_S) {
                    setOptions(prev => ({
                      ...prev,
                      duration: String(MIN_DURATION_S)
                    }))
                  } else if (n > MAX_DURATION_S) {
                    setOptions(prev => ({
                      ...prev,
                      duration: String(MAX_DURATION_S)
                    }))
                  }
                }}
                css={theme({
                  width: '70px',
                  fontSize: '16px',
                  height: '18px',
                  textAlign: 'center'
                })}
              />
              <Text
                css={theme({
                  fontFamily: 'sans',
                  fontSize: 0,
                  color: 'black50',
                  flexShrink: 0
                })}
              >
                s
              </Text>
            </Flex>
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
                  Removes all the ads and cookie banners before the recording
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
                  Uses the cached recording if available, otherwise generates a
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
            <Film size={16} />
            Generate animated screenshot
          </Flex>
        </GenerateButton>
      </StickyGenerateWrapper>
    </Box>
  )
}

/* ─── Preview Panel ────────────────────────────────────── */

const downloadFile = async (fileUrl, filename) => {
  try {
    const response = await fetch(fileUrl)
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = filename || 'animated-screenshot.mp4'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(blobUrl)
  } catch {
    window.open(fileUrl, '_blank')
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
  const [videoPainted, setVideoPainted] = useState(false)
  const prevVideoUrlRef = useRef(null)

  const videoUrl = get(data, 'screenshot.animated.url')
  const previewImageUrl = get(data, 'screenshot.url')

  const viewportCardRef = useRef(null)
  const [actualWidth, setActualWidth] = useState(0)

  useEffect(() => {
    if (!viewportCardRef.current) return

    const updateWidth = () => {
      if (viewportCardRef.current) {
        setActualWidth(viewportCardRef.current.offsetWidth - 32)
      }
    }

    updateWidth()

    const resizeObserver = new ResizeObserver(updateWidth)
    resizeObserver.observe(viewportCardRef.current)

    return () => resizeObserver.disconnect()
  }, [])

  const maxWidthScaled = (viewportWidth * 2) / 3
  const maxWidth = maxWidthScaled > actualWidth ? actualWidth : maxWidthScaled

  const fractionLost = (viewportWidth - maxWidth) / viewportWidth
  const maxHeightScaled = viewportHeight - viewportHeight * fractionLost
  const maxHeight =
    maxHeightScaled > MAX_SCREENSHOT_PREVIEW_HEIGHT
      ? MAX_SCREENSHOT_PREVIEW_HEIGHT
      : maxHeightScaled

  const containerHeight = maxHeight + 32

  const showSkeleton = isLoading || (!!videoUrl && !videoPainted)

  useEffect(() => {
    if (isLoading) {
      setVideoPainted(false)
    }
  }, [isLoading])

  useEffect(() => {
    if (videoUrl && videoUrl !== prevVideoUrlRef.current) {
      prevVideoUrlRef.current = videoUrl
      setVideoPainted(false)
    }
  }, [videoUrl])

  return (
    <PreviewCanvas ref={viewportCardRef}>
      <Choose>
        {/* ── Loading / waiting for video ─── */}
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
                p: [3],
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              })}
            >
              {videoUrl && !isLoading && (
                <video
                  src={videoUrl}
                  poster={previewImageUrl}
                  onLoadedData={() => setVideoPainted(true)}
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
                    isLoading
                      ? 'Recording animated screenshot'
                      : 'Loading video'
                  }
                  style={{
                    width: '100%',
                    height: `${maxHeight}px`
                  }}
                />
              </ViewportCard>
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
              aria-label={
                isLoading ? 'Recording animated screenshot' : 'Loading video'
              }
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
                    Recording animated screenshot
                    <DotSpinner />
                  </>
                ) : (
                  <>
                    Loading video
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
            <Text css={theme({ color: 'fullscreen', fontSize: 3, pb: 3 })}>
              {error?.statusCode === 429 ? (
                <>
                  You've reached your free daily limit.
                  <Text css={theme({ fontSize: 2, color: 'black60' })}>
                    We allow 50 requests per day for free users.
                  </Text>
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

        {/* ── Video result ──────────────── */}
        <Choose.When condition={!!videoUrl && videoPainted}>
          <FadeIn
            key='result'
            css={theme({
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            })}
          >
            <Box
              css={theme({
                p: [3],
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                minHeight: `${containerHeight}px`,
                maxHeight: ['60vh', '750px', '750px'],
                WebkitOverflowScrolling: 'touch'
              })}
            >
              <ViewportCard style={{ maxWidth: `${maxWidth}px` }}>
                <video
                  src={videoUrl}
                  poster={previewImageUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: '100%',
                    maxWidth: '100%',
                    display: 'block',
                    objectFit: 'contain'
                  }}
                >
                  <track kind='descriptions' label='Animated screenshot' />
                </video>
              </ViewportCard>
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
                  downloadFile(
                    videoUrl,
                    `animated-screenshot-${Date.now()}.mp4`
                  )
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
                      copy: videoUrl,
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
                href={videoUrl}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Open animated screenshot in new tab'
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
              <Film size={32} color={colors.black80} />
            </Box>
            <Text css={theme({ color: 'black60', fontSize: 2 })}>
              Enter a URL and click Generate
            </Text>
            <Text css={theme({ color: 'black40', fontSize: 1, pt: 1 })}>
              Your animated screenshot will appear here
            </Text>
          </FadeIn>
        </Choose.Otherwise>
      </Choose>
    </PreviewCanvas>
  )
}

/* ─── Thumbnail from preview image ───────────────────── */

const createThumbnail = imageUrl =>
  new Promise(resolve => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = THUMB_SIZE
        canvas.height = THUMB_SIZE
        const ctx = canvas.getContext('2d')
        const size = Math.min(img.width, img.height)
        const sx = (img.width - size) / 2
        ctx.drawImage(img, sx, 0, size, size, 0, 0, THUMB_SIZE, THUMB_SIZE)
        resolve(canvas.toDataURL('image/jpeg', THUMB_QUALITY))
      } catch {
        resolve(null)
      }
    }
    img.onerror = () => resolve(null)
    img.src = imageUrl
  })

/* ─── Screenshot History ──────────────────────────────── */

const ScreenshotHistory = ({
  entries,
  activeId,
  onSelect,
  onDelete,
  disabled
}) => {
  const scrollRef = useRef(null)
  const prevFirstIdRef = useRef(null)

  useEffect(() => {
    const firstId = entries?.[0]?.id
    if (firstId && firstId !== prevFirstIdRef.current && scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
    prevFirstIdRef.current = firstId
  }, [entries])

  if (!entries || entries.length === 0) return null

  return (
    <Box css={theme({ pt: [3, 3, 4, 4] })}>
      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 2
        })}
      >
        <Text
          css={theme({
            fontSize: 0,
            fontWeight: 'bold',
            color: 'black50',
            fontFamily: 'sans'
          })}
        >
          Recent recordings
        </Text>
      </Flex>
      <HistoryScrollContainer
        ref={scrollRef}
        role='list'
        aria-label='Animated screenshot history'
      >
        {entries.map(entry => (
          <HistoryThumbnail
            key={entry.id}
            role='listitem'
            $active={entry.id === activeId}
            tabIndex={disabled ? -1 : 0}
            aria-label={`Load recording of ${entry.settings.url}`}
            aria-disabled={disabled || undefined}
            onClick={() => !disabled && onSelect(entry)}
            onKeyDown={e => {
              if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                onSelect(entry)
              }
            }}
            style={
              disabled ? { opacity: 0.5, cursor: 'not-allowed' } : undefined
            }
          >
            <img
              src={entry.thumbnail || entry.previewImage}
              alt={`Recording of ${entry.settings.url}`}
              loading='lazy'
              draggable='false'
            />
            <ThumbnailDeleteButton
              aria-label={`Delete recording of ${entry.settings.url}`}
              disabled={disabled || undefined}
              onClick={e => {
                e.stopPropagation()
                if (!disabled) onDelete(entry.id)
              }}
            >
              <X size={12} />
            </ThumbnailDeleteButton>
          </HistoryThumbnail>
        ))}
      </HistoryScrollContainer>
    </Box>
  )
}

/* ─── Main Tool Section ────────────────────────────────── */

const AnimatedScreenshotTool = () => {
  const [options, setOptions] = useState({
    url: '',
    adblock: true,
    cache: true,
    device: 'desktop',
    customWidth: '1920',
    customHeight: '1080',
    duration: String(DEFAULT_DURATION_S)
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
      const width = Math.min(Number(options.customWidth) || 1920, MAX_WIDTH)
      const height = Math.min(Number(options.customHeight) || 1080, MAX_HEIGHT)
      const viewport = { width, height }

      setRequestedViewport(viewport)
      setIsLoading(true)
      setError(null)
      setData(null)
      setLastUrl(url)

      try {
        const durationS = Math.min(
          Math.max(
            Number(options.duration) || DEFAULT_DURATION_S,
            MIN_DURATION_S
          ),
          MAX_DURATION_S
        )

        const mqlOpts = {
          apiKey: localStorageData.apiKey,
          meta: false,
          screenshot: {
            animated: {
              duration: durationS * 1000
            }
          },
          viewport,
          adblock: options.adblock,
          force: !options.cache
        }

        let response = null
        try {
          response = await mql(url, mqlOpts)
          setData(response.data)
        } catch (err) {
          setError({
            message:
              err.description ||
              err.message ||
              'Failed to capture animated screenshot.',
            statusCode: err.statusCode || err.code
          })
        }

        if (response?.data?.screenshot) {
          const entryId = String(Date.now())
          const previewImage = response.data.screenshot.url
          const thumbnail = await createThumbnail(previewImage)
          setHistory(prev => {
            const items = Array.isArray(prev) ? prev : []
            return [
              {
                id: entryId,
                createdAt: Date.now(),
                screenshot: response.data.screenshot,
                previewImage,
                thumbnail,
                settings: {
                  url,
                  device: options.device,
                  customWidth: options.customWidth,
                  customHeight: options.customHeight,
                  duration: options.duration,
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
            err.description ||
            err.message ||
            'Failed to capture animated screenshot.',
          statusCode: err.statusCode || err.code
        })
      } finally {
        setIsLoading(false)
      }
    },
    [options, setHistory, localStorageData]
  )

  const handleHistorySelect = useCallback(entry => {
    const { settings, screenshot } = entry
    setOptions({
      url: settings.url,
      adblock: settings.adblock !== undefined ? settings.adblock : true,
      cache: settings.cache !== undefined ? settings.cache : true,
      device: settings.device,
      customWidth: settings.customWidth,
      customHeight: settings.customHeight,
      duration: settings.duration || String(DEFAULT_DURATION_S)
    })
    setData({ screenshot })
    setLastUrl(settings.url)
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
        <OptionsPanelOuter>
          <OptionsPanel
            options={options}
            setOptions={setOptions}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </OptionsPanelOuter>

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
      Generate Animated Website Screenshots
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
      Record any website as a short MP4 video in seconds
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
      How to capture an animated website screenshot
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
      Why choose our animated screenshot tool?
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
        Explore the full Screenshot API reference with animated capture support,
        interactive examples, SDKs, and ready-to-use code snippets.
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
    title: 'For Product Teams',
    items: [
      'Record animated walkthroughs of feature flows',
      'Capture interactive UI states that static shots miss',
      'Generate demo recordings for stakeholder presentations',
      'Document onboarding flows with real interactions'
    ]
  },
  {
    title: 'For Digital Marketers',
    items: [
      'Record competitor website animations for analysis',
      'Create eye-catching social media content from any website',
      'Capture dynamic landing pages for ad creative research',
      'Generate animated previews for email campaigns'
    ]
  },
  {
    title: 'For Developers',
    items: [
      'Record animated bug reproductions automatically',
      'Capture CSS animations and transitions via API',
      'Generate animated previews for documentation',
      'Automate visual regression testing with video'
    ]
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
      Use cases for animated screen capture
    </Subhead>
    <Caption css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.small })}>
      From product demos to automated testing, animated screenshots capture what
      static images cannot.
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
      {USE_CASES.map(({ title, items }) => (
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
        question: 'Is this animated screenshot tool really free?',
        answer: (
          <>
            <div>
              Yes! You can capture up to{' '}
              <b>50&nbsp;animated screenshots per day</b> for free, with no
              credit card required. Free captures include all features — device
              emulation, ad blocking, and caching.
            </div>
            <div>
              Need more? Check our <Link href='/#pricing'>pricing plans</Link>{' '}
              for higher limits and priority processing.
            </div>
          </>
        )
      },
      {
        question: 'How long are the animated screenshots?',
        answer: (
          <div>
            Each animated screenshot records <b>5&nbsp;seconds</b> of the
            website. This is enough to capture page load animations, scrolling
            behavior, and interactive elements.
          </div>
        )
      },
      {
        question: 'What format are the recordings?',
        answer: (
          <div>
            All animated screenshots are delivered as <b>MP4</b> video files
            using the H.264 codec (avc1). This ensures the best compatibility
            across all browsers and devices while maintaining high quality with
            small file sizes.
          </div>
        )
      },
      {
        question: "What's the maximum viewport size?",
        answer: (
          <>
            <div>
              The animated screenshot tool supports viewports up to{' '}
              <b>2500&times;1200</b> pixels. Choose from desktop, tablet, or
              mobile presets, or enter custom dimensions within this range.
            </div>
            <div>
              On the API, you can use custom viewport sizes beyond these limits.
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
              , which provides a simple REST endpoint with animated screenshot
              support. Integrate with any language — Node.js, Python, Ruby, or
              plain cURL.
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
              Animated screenshots are cached on our global CDN by default.
              Cached responses are served instantly and{' '}
              <b>don't count against your limit</b>. Cache lasts for 24 hours.
            </div>
            <div>
              We only recommend turning off the cache if you need to capture a
              page that changes frequently.
            </div>
          </>
        )
      },
      {
        question: 'Any question or issue?',
        answer: (
          <span>
            We're always available at:{' '}
            <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>
          </span>
        )
      }
    ]}
  />
)

/* ─── Page Head (SEO) ──────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Animated Website Screenshot Generator - Free URL Screen Capture'
    noSuffix
    description='Generate animated website screenshots as MP4 videos from any URL. Free, no-login online screen capture tool powered by a fast, reliable, and high resolution API.'
    image='https://cdn.microlink.io/banner/screenshot.jpeg'
    schemaType='SoftwareApplication'
    structured={{
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://microlink.io/tools/website-screenshot/animated',
      name: 'Microlink Animated Website Screenshot Tool',
      description:
        'Record animated screenshots of any webpage as MP4 videos with device emulation, ad blocking, and caching.',
      url: 'https://microlink.io/tools/website-screenshot/animated',
      applicationCategory: ['DeveloperApplication', 'Tool'],
      keywords: [
        'animated website screenshot',
        'website screen recording',
        'animated screenshot tool',
        'website to video',
        'webpage recording',
        'animated screen capture',
        'website video capture',
        'MP4 screenshot'
      ],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        description: 'Free tier with 50 animated screenshots per day'
      }
    }}
  />
)

/* ─── Page Component ───────────────────────────────────── */

const AnimatedWebsiteScreenshotPage = () => (
  <Layout>
    <Hero />
    <AnimatedScreenshotTool />
    <HowItWorks />
    <Explanation />
    <UseCases />
    <Banner />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          Screenshot API{' '}
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

export default AnimatedWebsiteScreenshotPage
