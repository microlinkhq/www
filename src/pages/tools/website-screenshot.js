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
  HelpCircle,
  Link2,
  Settings,
  X
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

const SCREENSHOT_HISTORY_KEY = 'screenshot-history'
const MAX_HISTORY_ITEMS = 12
const HISTORY_MAX_AGE_MS = 24 * 60 * 60 * 1000
const THUMB_SIZE = 244
const THUMB_QUALITY = 0.85

const LAYOUT_PIVOT = 1200
const MOBILE_BP = 768
const MAX_SCREENSHOT_PREVIEW_HEIGHT = 750

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

  const viewportCardRef = useRef(null)
  const [actualWidth, setActualWidth] = useState(0)

  useEffect(() => {
    if (!viewportCardRef.current) return

    const updateWidth = () => {
      if (viewportCardRef.current) {
        setActualWidth(viewportCardRef.current.offsetWidth - 32) // 32 px padding
      }
    }

    updateWidth()

    const resizeObserver = new ResizeObserver(updateWidth)
    resizeObserver.observe(viewportCardRef.current)

    return () => resizeObserver.disconnect()
  }, [])

  /* scale width to preview the screenshot with a better aspect ratio and quality */
  const maxWidthScaled = (viewportWidth * 2) / 3
  const maxWidth = maxWidthScaled > actualWidth ? actualWidth : maxWidthScaled

  /* scale height proportional to the width lost */
  const fractionLost = (viewportWidth - maxWidth) / viewportWidth
  const maxHeightScaled = viewportHeight - viewportHeight * fractionLost
  const maxHeight =
    maxHeightScaled > MAX_SCREENSHOT_PREVIEW_HEIGHT
      ? MAX_SCREENSHOT_PREVIEW_HEIGHT
      : maxHeightScaled

  const containerHeight = maxHeight + 32 // 32 px padding

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
    <PreviewCanvas ref={viewportCardRef}>
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
                p: [3],
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
                    height: `${maxHeight}px`
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
                minHeight: `${containerHeight}px`,
                maxHeight: ['60vh', '750px', '750px'],
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
                  <img
                    alt={`Screenshot of ${url}`}
                    src={imageUrl}
                    loading='lazy'
                    decoding='async'
                    onError={() => setIsPreviewTooBig(true)}
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      display: 'block',
                      objectFit: 'contain',
                      imageRendering: '-webkit-optimize-contrast'
                    }}
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

/* ─── Screenshot Thumbnail Generator ──────────────────── */

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
        /* crop from the top, square-fitted */
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

  /* Scroll to the start when a new screenshot is prepended */
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
          Recent screenshots
        </Text>
      </Flex>
      <HistoryScrollContainer
        ref={scrollRef}
        role='list'
        aria-label='Screenshot history'
      >
        {entries.map(entry => (
          <HistoryThumbnail
            key={entry.id}
            role='listitem'
            $active={entry.id === activeId}
            tabIndex={disabled ? -1 : 0}
            aria-label={`Load screenshot of ${entry.settings.url}`}
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
              src={entry.thumbnail || entry.screenshot.url}
              alt={`Screenshot of ${entry.settings.url}`}
              loading='lazy'
              draggable='false'
            />
            <ThumbnailDeleteButton
              aria-label={`Delete screenshot of ${entry.settings.url}`}
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
          const customHex = options.overlayCustomHex
            ? options.overlayCustomHex.startsWith('#')
              ? options.overlayCustomHex
              : `#${options.overlayCustomHex}`
            : ''

          mqlOpts.screenshot.overlay = {
            background: customHex || options.overlayBackground
          }
        }

        let response = null
        try {
          response = await mql(url, mqlOpts)
          setData(response.data)
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
            <Icon size={32} color={colors.link} />
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
    title: 'For Web Designers & Developers',
    items: [
      'Create portfolio screenshots of live websites',
      'Document design iterations and A/B tests',
      'Generate client approval mockups instantly',
      'Capture responsive layouts across devices'
    ]
  },
  {
    title: 'For Digital Marketers',
    items: [
      'Screenshot competitor websites for analysis',
      'Create case study visuals with before/after shots',
      'Capture landing pages for ad compliance records',
      'Generate social media preview images'
    ]
  },
  {
    title: 'For QA & Testing Teams',
    items: [
      'Screenshot webpages for bug reports',
      'Automate visual regression testing via API',
      'Capture site states at specific timestamps',
      'Document cross-browser rendering issues'
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
      pt: [2, 2, 3, 3],
      pb: [3, 3, 4, 4],
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
        question: 'What formats are available?',
        answer: (
          <>
            <div>
              Export screenshots as <b>PNG</b> (lossless) and <b>JPG</b>(modern
              format, smaller file sizes). Choose the format that best fits your
              use case.
            </div>
            <div>
              Full-page screenshots, custom viewports, ad blocking, and
              professional overlay effects are all included at no extra cost.
            </div>
          </>
        )
      },
      {
        question: 'Whats the quality of the screenshots?',
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
