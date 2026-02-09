/* global fetch */

import { borders, colors, layout, theme, transition, space } from 'theme'
import React, { useState, useCallback } from 'react'
import {
  Camera,
  ChevronDown,
  ChevronUp,
  Clipboard,
  Download,
  ExternalLink,
  Globe,
  ArrowRight,
  Code,
  Settings
} from 'react-feather'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import styled from 'styled-components'
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
import Select from 'components/elements/Select/Select'
import Spinner from 'components/elements/Spinner'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Toggle from 'components/elements/Toggle/Toggle'

import ArrowLink from 'components/patterns/ArrowLink'
import Block from 'components/patterns/Block/Block'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import Tooltip from 'components/patterns/Tooltip/Tooltip'

import { useClipboard } from 'components/hook/use-clipboard'
import { withTitle } from 'helpers/hoc/with-title'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

/* ─── Constants ────────────────────────────────────────── */

const SOLID_COLORS = [
  '#FF057C',
  '#8D0B93',
  '#321575',
  '#4158D0',
  '#C850C0',
  '#FFCC70',
  '#667eea',
  '#764ba2',
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
  mobile: { width: 375, height: 812 }
}

const FORMAT_OPTIONS = [
  { value: 'png', label: 'PNG' },
  { value: 'jpeg', label: 'JPG' }
]

const QUALITY_PRESETS = {
  low: 30,
  good: 75,
  high: 95
}

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
      'Export as PNG, JPG, or WebP with configurable quality. Optimize for size or visual fidelity as needed.'
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
      'Choose format, quality, device viewport, and optional overlays to match your needs.'
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

const OptionGroup = styled(Box)`
  ${theme({ pb: 3 })}
`

const OptionLabel = styled(Label)`
  ${theme({
    display: 'block',
    pb: 1,
    fontWeight: 'bold',
    fontFamily: 'sans',
    fontSize: 0,
    color: 'black60'
  })}
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
`

const PreviewPanel = styled(Box)`
  ${theme({
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    bg: 'white',
    overflow: 'hidden',
    position: 'relative'
  })}
  min-height: 520px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 6px 24px rgba(0, 0, 0, 0.03);
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
        borderRadius: 3,
        bg: 'white'
      })}
    >
      {/* URL Input */}
      <OptionGroup>
        <OptionLabel htmlFor='ws-url'>Website URL</OptionLabel>
        <Input
          id='ws-url'
          type='url'
          inputMode='url'
          autoComplete='url'
          placeholder='example.com…'
          value={options.url}
          onChange={handleUrlChange}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSubmit()
            }
          }}
          css={theme({ width: '100%', fontSize: 2 })}
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
      </OptionGroup>

      {/* Format & Quality */}
      <Flex
        css={theme({
          gap: 3,
          pb: 3,
          flexDirection: ['column', 'row']
        })}
      >
        <Box css={{ flex: 1 }}>
          <OptionLabel htmlFor='ws-format'>Format</OptionLabel>
          <Select
            id='ws-format'
            value={options.type}
            onChange={e =>
              setOptions(prev => ({ ...prev, type: e.target.value }))
            }
            css={theme({ width: '100%', py: '10px' })}
          >
            {FORMAT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </Box>
        <Box css={{ flex: 1 }}>
          <OptionLabel as='span'>Quality</OptionLabel>
          <Toggle
            defaultValue='good'
            onChange={val =>
              setOptions(prev => ({
                ...prev,
                quality: QUALITY_PRESETS[val] || 75
              }))
            }
          >
            {['low', 'good', 'high']}
          </Toggle>
        </Box>
      </Flex>

      {/* Checkboxes */}
      <OptionGroup>
        <Flex css={{ flexWrap: 'wrap', gap: space[3] }}>
          {[
            { key: 'fullPage', label: 'Full page' },
            { key: 'adblock', label: 'Block ads' }
          ].map(({ key, label }) => (
            <CheckboxLabel key={key}>
              <input
                type='checkbox'
                checked={options[key]}
                onChange={e =>
                  setOptions(prev => ({ ...prev, [key]: e.target.checked }))
                }
              />
              <Text css={theme({ pl: 2, fontSize: 1, color: 'black80' })}>
                {label}
              </Text>
            </CheckboxLabel>
          ))}
        </Flex>
      </OptionGroup>

      {/* Device: Desktop / Tablet / Mobile */}
      <OptionGroup>
        <OptionLabel as='span'>Device</OptionLabel>
        <Toggle
          defaultValue='desktop'
          onChange={val => setOptions(prev => ({ ...prev, device: val }))}
        >
          {['desktop', 'tablet', 'mobile']}
        </Toggle>
      </OptionGroup>

      {/* Overlay Section */}
      <OptionGroup>
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
          <Text
            css={theme({
              pl: 2,
              fontSize: 1,
              fontWeight: 'bold',
              color: 'black80'
            })}
          >
            Enable overlay
          </Text>
        </CheckboxLabel>

        {options.overlayEnabled && (
          <Box css={theme({ pt: 2, pl: 0 })}>
            <ColorPicker
              value={options.overlayBackground}
              onChange={val =>
                setOptions(prev => ({ ...prev, overlayBackground: val }))
              }
            />
            <Box css={theme({ pt: 3 })}>
              <OptionLabel as='span'>Browser chrome</OptionLabel>
              <Toggle
                defaultValue={options.overlayBrowser}
                onChange={val =>
                  setOptions(prev => ({ ...prev, overlayBrowser: val }))
                }
              >
                {['dark', 'light']}
              </Toggle>
            </Box>
          </Box>
        )}
      </OptionGroup>

      {/* Advanced Options (collapsible) */}
      <OptionGroup>
        <Flex
          as='button'
          type='button'
          onClick={() => setShowAdvanced(prev => !prev)}
          aria-expanded={showAdvanced}
          aria-controls='ws-advanced-options'
          css={theme({
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            py: 2,
            px: 0,
            border: 0,
            borderTop: 1,
            borderColor: 'black05',
            bg: 'transparent',
            cursor: 'pointer',
            color: 'black60',
            fontSize: 1,
            fontWeight: 'bold'
          })}
        >
          <Caps css={theme({ fontSize: 0, color: 'black50' })}>
            Advanced options
          </Caps>
          {showAdvanced ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Flex>

        {showAdvanced && (
          <Box id='ws-advanced-options' css={theme({ pt: 3 })}>
            {/* Use cache */}
            <Box css={theme({ pb: 3 })}>
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
            </Box>

            {/* Custom viewport */}
            <Box>
              <OptionLabel as='span'>Custom viewport</OptionLabel>
              <Flex css={theme({ gap: 3, pt: 1 })}>
                <Box css={{ flex: 1 }}>
                  <OptionLabel htmlFor='ws-width'>Width (px)</OptionLabel>
                  <Input
                    id='ws-width'
                    type='number'
                    inputMode='numeric'
                    placeholder='1920'
                    value={options.customWidth}
                    onChange={e =>
                      setOptions(prev => ({
                        ...prev,
                        customWidth: e.target.value,
                        device: 'custom'
                      }))
                    }
                    css={theme({ width: '100%', fontSize: 1 })}
                  />
                </Box>
                <Box css={{ flex: 1 }}>
                  <OptionLabel htmlFor='ws-height'>Height (px)</OptionLabel>
                  <Input
                    id='ws-height'
                    type='number'
                    inputMode='numeric'
                    placeholder='1080'
                    value={options.customHeight}
                    onChange={e =>
                      setOptions(prev => ({
                        ...prev,
                        customHeight: e.target.value,
                        device: 'custom'
                      }))
                    }
                    css={theme({ width: '100%', fontSize: 1 })}
                  />
                </Box>
              </Flex>
            </Box>
          </Box>
        )}
      </OptionGroup>

      {/* Submit */}
      <Button
        type='button'
        onClick={handleSubmit}
        css={theme({ width: '100%' })}
        loading={isLoading}
        variant='gradient'
      >
        <Caps
          css={theme({
            fontSize: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: space[2]
          })}
        >
          <Camera size={16} /> Generate screenshot
        </Caps>
      </Button>
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

const PreviewDisplay = ({ data, isLoading, error, onRetry, url }) => {
  const [ClipboardComponent, toClipboard] = useClipboard()
  const imageUrl = get(data, 'screenshot.url')

  return (
    <PreviewPanel>
      <Choose>
        <Choose.When condition={isLoading}>
          <Flex
            css={theme({
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '520px',
              px: 4
            })}
          >
            <Spinner />
            <Text css={theme({ pt: 3, color: 'black60', fontSize: 1 })}>
              Capturing screenshot
              <DotSpinner />
            </Text>
          </Flex>
        </Choose.When>

        <Choose.When condition={!!error}>
          <Flex
            css={theme({
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '520px',
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
          </Flex>
        </Choose.When>

        <Choose.When condition={!!imageUrl}>
          <Flex css={theme({ flexDirection: 'column', height: '100%' })}>
            {/* Image area — scrollable when screenshot is taller than viewport */}
            <Box
              css={theme({
                p: [3, 4],
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                maxHeight: ['60vh', '65vh', '70vh', '70vh'],
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain'
              })}
              style={{
                background: 'linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%)'
              }}
            >
              <Image
                alt={`Screenshot of ${url}`}
                src={imageUrl}
                css={theme({
                  width: '100%',
                  maxWidth: '100%',
                  borderRadius: 2
                })}
                style={isImgLoading =>
                  isImgLoading
                    ? { objectFit: 'contain' }
                    : {
                      objectFit: 'contain',
                      filter: 'drop-shadow(rgba(0, 0, 0, 0.12) 0 8px 24px)',
                      borderRadius: '6px'
                    }
                }
              />
            </Box>

            {/* Action buttons bar */}
            <Flex
              css={theme({
                p: 3,
                gap: 2,
                borderTop: 1,
                borderColor: 'black05'
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
          </Flex>
          <ClipboardComponent />
        </Choose.When>

        <Choose.Otherwise>
          <Flex
            css={theme({
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '520px',
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
          </Flex>
        </Choose.Otherwise>
      </Choose>
    </PreviewPanel>
  )
}

/* ─── Main Tool Section ────────────────────────────────── */

const ScreenshotTool = () => {
  const [options, setOptions] = useState({
    url: '',
    type: 'png',
    quality: QUALITY_PRESETS.good,
    fullPage: false,
    adblock: true,
    cache: true,
    device: 'desktop',
    customWidth: '',
    customHeight: '',
    overlayEnabled: false,
    overlayBackground: DEFAULT_OVERLAY_BG,
    overlayBrowser: 'dark'
  })

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [lastUrl, setLastUrl] = useState('')

  const handleSubmit = useCallback(
    async url => {
      setIsLoading(true)
      setError(null)
      setData(null)
      setLastUrl(url)

      try {
        const viewport =
          options.device === 'custom'
            ? {
              width: Number(options.customWidth) || 1920,
              height: Number(options.customHeight) || 1080
            }
            : DEVICES[options.device] || DEVICES.desktop

        const mqlOpts = {
          screenshot: {
            type: options.type,
            ...(options.type !== 'png' && { quality: options.quality }),
            fullPage: options.fullPage
          },
          viewport,
          adblock: options.adblock,
          ...(options.cache && { force: false })
        }

        if (options.overlayEnabled) {
          mqlOpts.screenshot.overlay = {
            browser: options.overlayBrowser,
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
        maxWidth: [layout.normal, layout.normal, '1460px', '1460px'],
        pb: [4, 4, 5, 5]
      })}
    >
      <Flex
        css={theme({
          flexDirection: ['column', 'column', 'row', 'row'],
          gap: [3, 3, 4, 4],
          alignItems: 'flex-start'
        })}
      >
        {/* Left Panel — Options */}
        <Box
          css={theme({
            width: ['100%', '100%', '340px', '360px'],
            flexShrink: 0
          })}
        >
          <OptionsPanel
            options={options}
            setOptions={setOptions}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </Box>

        {/* Right Panel — Preview */}
        <Box
          css={theme({
            width: ['100%'],
            flex: [null, null, 1, 1],
            minWidth: 0
          })}
        >
          <PreviewDisplay
            data={data}
            isLoading={isLoading}
            error={error}
            onRetry={handleRetry}
            url={lastUrl}
          />
        </Box>
      </Flex>
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
      pt: [4, 4, 5, 5],
      pb: [3, 3, 4, 4]
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
        maxWidth: layout.small
      })}
    >
      Automate high-quality screenshots of any webpage with our powerful API.
      Perfect for developers, designers, and marketers.
    </Caption>
    <Flex css={theme({ pt: [3, 3, 4, 4], fontSize: [2, 2, 3, 3] })}>
      <ArrowLink
        css={theme({ pr: [2, 4] })}
        href='/docs/api/parameters/screenshot'
      >
        Get Started
      </ArrowLink>
      <ArrowLink href='https://github.com/microlinkhq/browserless'>
        See on GitHub
      </ArrowLink>
    </Flex>
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
        question: 'What formats and quality options are available?',
        answer: (
          <>
            <div>
              Export screenshots as <b>PNG</b> (lossless), <b>JPG</b>{' '}
              (configurable quality 0–100), or <b>WebP</b> (modern format,
              smaller file sizes). Choose the format that best fits your use
              case.
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
