import { borders, colors, layout, theme, space } from 'theme'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
  FileText,
  Globe,
  ArrowRight,
  HelpCircle,
  Settings,
  Download,
  Clipboard,
  Check,
  ChevronDown,
  ExternalLink,
  Code,
  Loader,
  Zap
} from 'react-feather'
import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from 'react-compare-slider'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import styled, { keyframes } from 'styled-components'
import mql from '@microlink/mql'
import get from 'dlv'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Choose from 'components/elements/Choose'
import Container from 'components/elements/Container'
import DotSpinner from 'components/elements/DotSpinner'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Input from 'components/elements/Input/Input'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Select from 'components/elements/Select/Select'
import Spinner from 'components/elements/Spinner'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import Block from 'components/patterns/Block/Block'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import Layout from 'components/patterns/Layout'
import Tooltip from 'components/patterns/Tooltip/Tooltip'
import ArrowLink from 'components/patterns/ArrowLink'

import NerdStatsOverlay, {
  extractNerdStats,
  buildMqlQuery,
  NerdStatsToggle
} from 'components/patterns/NerdStats/NerdStats'
import { useClipboard } from 'components/hook/use-clipboard'
import { useLocalStorage } from 'components/hook/use-local-storage'
import { withTitle } from 'helpers/hoc/with-title'

import {
  PanelSection,
  SectionLabel,
  OptionLabel,
  GenerateButton,
  CheckboxLabel,
  SectionIcon,
  UseCaseCard,
  ToolLayout,
  OptionsPanelOuter,
  PreviewOuter,
  PanelRibbonLayout,
  StickyGenerateWrapper,
  SegmentedControl,
  ActionButton,
  PreviewCanvas,
  SkeletonPulse,
  FadeIn,
  PreviewEmptyState,
  ViewportCard,
  ScreenshotHistory,
  createThumbnail,
  downloadFile,
  MAX_HISTORY_ITEMS,
  HISTORY_MAX_AGE_MS
} from 'components/pages/screenshot'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

/* ─── Compare Slider ──────────────────────────────────── */

const CompareSliderBlock = styled('span')`
  display: block;
  ${theme({
    mt: 3,
    mb: 3,
    mx: 'auto',
    width: ['100%', '100%', '80%', '80%'],
    borderRadius: 3,
    overflow: 'hidden',
    border: 1,
    borderColor: 'black10',
    lineHeight: 0
  })}
`

const CompareSliderFooter = styled('span')`
  display: flex;
  ${theme({
    justifyContent: 'space-between',
    px: 3,
    py: 2,
    bg: 'white',
    borderTop: 1,
    borderTopColor: 'black10',
    fontSize: 1,
    color: 'black80',
    lineHeight: 2
  })}
`

const SettingsCompareSlider = () => {
  const [activeLabel, setActiveLabel] = useState(null)

  const handlePositionChange = useCallback(position => {
    if (position < 49) setActiveLabel('print')
    else if (position > 51) setActiveLabel('screen')
    else setActiveLabel(null)
  }, [])

  return (
    <CompareSliderBlock>
      <ReactCompareSlider
        onPositionChange={handlePositionChange}
        itemOne={
          <ReactCompareSliderImage
            src='/images/pdf-example-screen.jpg'
            alt='PDF generated with Screen View — web layout preserved'
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src='/images/pdf-example-print.jpg'
            alt='PDF generated with Print Version — print-optimized layout'
          />
        }
      />
      <CompareSliderFooter>
        <span
          style={{ color: activeLabel === 'print' ? colors.link : undefined }}
        >
          ← <b>Print Version</b>
        </span>
        <span
          style={{ color: activeLabel === 'screen' ? colors.link : undefined }}
        >
          <b>Screen View</b> →
        </span>
      </CompareSliderFooter>
    </CompareSliderBlock>
  )
}

/* ─── Constants ────────────────────────────────────────── */

const PDF_HISTORY_KEY = 'pdf-history'

const FORMAT_OPTIONS = [
  { value: 'A4', label: 'A4 (210 × 297 mm)' },
  { value: 'Letter', label: 'Letter (8.5 × 11 in)' },
  { value: 'Legal', label: 'Legal (8.5 × 14 in)' },
  { value: 'Tabloid', label: 'Tabloid (11 × 17 in)' },
  { value: 'A0', label: 'A0 (841 × 1189 mm)' },
  { value: 'A1', label: 'A1 (594 × 841 mm)' },
  { value: 'A2', label: 'A2 (420 × 594 mm)' },
  { value: 'A3', label: 'A3 (297 × 420 mm)' },
  { value: 'A5', label: 'A5 (148 × 210 mm)' },
  { value: 'A6', label: 'A6 (105 × 148 mm)' }
]

const ORIENTATION_OPTIONS = [
  { value: 'portrait', label: 'Portrait' },
  { value: 'landscape', label: 'Landscape' }
]

const MEDIA_TYPE_OPTIONS = [
  { value: 'screen', label: 'Screen View' },
  { value: 'print', label: 'Print Version' }
]

const FEATURES_LIST = [
  {
    title: 'Global CDN Delivery',
    description:
      'Every PDF you generate is served via a global CDN with 240+ edge locations. Save web pages as PDF and deliver them fast, anywhere in the world.'
  },
  {
    title: 'Smart Caching',
    description:
      "Converted pages are cached automatically. Cached PDFs are served instantly and don't count against your daily limit — ideal for pages you convert often."
  },
  {
    title: 'Simple REST API',
    description:
      'Convert any URL to a PDF document with a single HTTP request. No headless browsers to manage, no infrastructure to maintain.'
  }
]

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: 'Paste the URL',
    description: (
      <>
        Enter the <b>link</b> to any web page you want to download as PDF. It
        can be a full <b>website</b>, a single <b>article</b>, a{' '}
        <b>dashboard</b>, or any publicly accessible URL.
      </>
    )
  },
  {
    icon: Settings,
    title: 'Choose your settings',
    description: (
      <>
        <span>
          Pick a <b>paper format</b> (A4, Letter, Legal, and more) and{' '}
          <b>orientation</b> (portrait or landscape). If some images or content
          appear blank in the PDF, the page may need more time to finish loading
          — enable <b>Wait for full load</b> to give it extra time. Explore{' '}
          <b>Advanced</b> to fine-tune <b>margins</b>, custom <b>width</b> and{' '}
          <b>height</b>, and select a <b>page range</b> to export only the pages
          you need.
        </span>
        <SettingsCompareSlider />
        <span style={{ display: 'block', paddingTop: '12px' }}>
          Use <b>PDF&nbsp;Appearance</b> to choose between <b>Screen View</b> —
          a faithful visual match of the webpage, preserving colors,
          backgrounds, and layout exactly as you see them on screen — or{' '}
          <b>Print Version</b>, which applies the page's print stylesheet,
          stripping navigation, ads, and non-essential elements for a cleaner,
          ink-friendly document.
        </span>
        <span style={{ display: 'block', paddingTop: '8px' }}>
          Adjust <b>Zoom scale</b> to make the content larger or smaller —
          values below 1 shrink the page to fit more content per sheet, while
          values above 1 enlarge text and images for easier reading.
        </span>
      </>
    )
  },
  {
    icon: FileText,
    title: 'Generate the PDF',
    description: (
      <>
        Click <b>Generate PDF</b> and the page is rendered and converted in
        seconds. A <b>live preview</b> appears so you can inspect the result
        before downloading. Open the <b>Nerd Stats</b> panel to see response
        time, cache status, and other API details.
      </>
    )
  },
  {
    icon: Download,
    title: 'Download, copy, or share',
    description: (
      <>
        <b>Download</b> the PDF to your device, <b>copy the direct URL</b> to
        share it, or <b>open it in a new tab</b>. Every conversion is saved in
        your <b>local history</b> for 24&nbsp;hours, so you can come back and
        grab it again without re-converting.
      </>
    )
  }
]

const REASON_TO_USE = [
  {
    title: 'Convert HTML to PDF Instantly',
    description: (
      <>
        Transform any HTML page into a clean PDF document in seconds. Whether
        you need to save a single web page or convert pages to PDF in bulk, our{' '}
        <Link href='/pdf'>PDF API</Link> delivers speed and quality.
      </>
    )
  },
  {
    title: 'Save Web Pages with Perfect Layout',
    description: (
      <>
        Get high-fidelity PDFs that match the original webpage. Configure paper
        size, margins, and scaling to{' '}
        <Link href='/docs/guides/pdf/page-size-and-layout'>
          customize page layout
        </Link>{' '}
        for any document.
      </>
    )
  },
  {
    title: 'Online Tool — No Install Needed',
    description:
      'Save any internet page as PDF directly in your browser. No downloads, no plugins, no desktop software. Just paste the URL and convert the webpage to PDF.'
  },
  {
    title: 'Free + No Login Required',
    description:
      'Convert up to 50 web pages to PDF per day for free. Every PDF is clean and professional — no watermarks, no branding, no overlays on your documents.'
  },
  {
    title: 'History & Local Storage',
    description:
      'Every PDF you generate is saved locally for 24 hours. Come back and download the document again without re-converting the page.'
  },
  {
    title: 'Block Ads Before Converting',
    description: (
      <>
        Automatically remove ads and cookie banners before saving the webpage as
        PDF. Get the cleanest documents possible. Learn more about{' '}
        <Link href='/docs/guides/pdf/page-preparation'>page preparation</Link>.
      </>
    )
  }
]

const USE_CASES = [
  {
    title: 'Save Internet Pages for Research',
    items: [
      'Save a web page as PDF for offline reading and long-term archiving',
      'Convert articles and reports into shareable PDF documents',
      'Preserve website content as a PDF before it changes or disappears',
      'Turn any link into a citation-ready PDF document'
    ],
    link: {
      href: '/docs/guides/pdf/page-preparation',
      alt: 'Page preparation guide for saving web pages as PDF',
      text: 'Page preparation guide'
    }
  },
  {
    title: 'Convert Web Pages for Legal & Compliance',
    items: [
      'Save a website page as PDF for legal evidence and court filings',
      'Convert terms of service and policy pages to timestamped PDFs',
      'Turn compliance web documents into PDF records',
      'Change a webpage to PDF to produce auditable snapshots'
    ],
    link: {
      href: '/docs/guides/pdf/embedding',
      alt: 'Guide to embedding and delivering PDFs',
      text: 'PDF delivery guide'
    }
  },
  {
    title: 'Convert HTML to PDF via API',
    items: [
      'Transform HTML reports and dashboards into PDF via REST API',
      'Automate invoice and receipt generation from web applications',
      'Convert web documentation into downloadable PDF files',
      'Build "save page as PDF" features into any product'
    ],
    link: {
      href: '/pdf',
      alt: 'HTML to PDF API for developers',
      text: 'Explore the PDF API'
    }
  }
]

/* ─── Helpers ──────────────────────────────────────────── */

const buildPdfFilename = sourceUrl => {
  try {
    const parsed = new URL(sourceUrl)
    const slug = (parsed.hostname + parsed.pathname)
      .replace(/\/+$/g, '')
      .replace(/[^a-zA-Z0-9.-]/g, '-')
      .replace(/-+/g, '-')
    const now = new Date()
    const pad = n => String(n).padStart(2, '0')
    const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(
      now.getDate()
    )}-${pad(now.getHours())}${pad(now.getMinutes())}`
    return `${slug}-${stamp}.pdf`
  } catch {
    return `document-${Date.now()}.pdf`
  }
}

/* ─── Animations ───────────────────────────────────────── */

const spinAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const SpinningLoader = styled(Loader)`
  animation: ${spinAnimation} 1s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
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
`

/* ─── Options Panel ────────────────────────────────────── */

const OptionsPanel = ({
  options,
  setOptions,
  onSubmit,
  isLoading,
  onMediaTypeChange
}) => {
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
          id='pdf-url'
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
          aria-describedby={urlError ? 'pdf-url-error' : undefined}
          aria-invalid={!!urlError}
        />
        {urlError && (
          <Text
            id='pdf-url-error'
            role='alert'
            css={theme({ color: 'fullscreen', fontSize: 0, pt: 1 })}
          >
            {urlError}
          </Text>
        )}
      </PanelSection>

      {/* ── Settings Groups (Ribbon on tablet) ── */}
      <PanelRibbonLayout>
        {/* ── Page Setup ─────────────────────── */}
        <PanelSection>
          <Box css={theme({ pb: '12px' })}>
            <OptionLabel as='span'>Paper Format</OptionLabel>
            <Select
              id='pdf-format'
              aria-label='Paper format'
              value={options.format}
              onChange={e =>
                setOptions(prev => ({ ...prev, format: e.target.value }))
              }
              css={theme({ width: '100%', fontSize: 1, bg: 'white' })}
            >
              {FORMAT_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </Box>

          <Box>
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

          <Box css={theme({ mt: 3 })}>
            <Box css={{ display: 'flex', alignItems: 'center' }}>
              <OptionLabel as='span' css={{ marginBottom: 0 }}>
                PDF Appearance
              </OptionLabel>
              <Tooltip
                content={
                  <Tooltip.Content>
                    <b>Screen View</b> is a perfect visual match of your current
                    digital display. <b>Print Version</b> is optimized for
                    paper, hiding non-essential web elements.
                  </Tooltip.Content>
                }
              >
                <HelpCircle
                  size={16}
                  color={colors.black60}
                  style={{ marginLeft: '6px' }}
                />
              </Tooltip>
            </Box>
            <SegmentedControl
              name='PDF Appearance'
              options={MEDIA_TYPE_OPTIONS}
              value={options.mediaType}
              onChange={val => {
                setOptions(prev => ({ ...prev, mediaType: val }))
                onMediaTypeChange(val)
              }}
            />
          </Box>

          <Box css={theme({ mt: 3 })}>
            <Box css={{ display: 'flex', alignItems: 'center' }}>
              <OptionLabel as='span' css={{ marginBottom: 0 }}>
                Zoom scale
              </OptionLabel>
              <Tooltip
                content={
                  <Tooltip.Content>
                    If the text in the PDF appears too small or too large,
                    adjust this value to scale the page content up or down.
                  </Tooltip.Content>
                }
              >
                <HelpCircle
                  size={16}
                  color={colors.black60}
                  style={{ marginLeft: '6px' }}
                />
              </Tooltip>
            </Box>
            <Flex css={theme({ alignItems: 'center', gap: 2, pt: 1 })}>
              <input
                id='pdf-scale-range'
                type='range'
                min='0.1'
                max='2'
                step='0.1'
                value={options.scale || '0.6'}
                onChange={e =>
                  setOptions(prev => ({ ...prev, scale: e.target.value }))
                }
                aria-label='PDF zoom scale'
                style={{ flex: 1, accentColor: colors.link }}
              />
              <Input
                id='pdf-scale'
                type='number'
                inputMode='decimal'
                step='0.1'
                min='0.1'
                max='2'
                aria-label='PDF zoom scale value'
                value={options.scale}
                onChange={e =>
                  setOptions(prev => ({ ...prev, scale: e.target.value }))
                }
                css={theme({
                  width: '60px',
                  fontSize: 1,
                  height: '18px',
                  textAlign: 'center'
                })}
              />
            </Flex>
          </Box>
        </PanelSection>

        {/* ── Preferences ────────────────────── */}
        <Box css={theme({ pb: 3 })}>
          <SectionLabel>Preferences</SectionLabel>

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
                  Removes all the ads and cookie banners before generating the
                  PDF
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
                  Uses the cached PDF if available, otherwise generates a new
                  one
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
              Wait for full load
            </Text>
            <Tooltip
              content={
                <Tooltip.Content>
                  Adds extra time for lazy images, animations, and dynamic
                  content to finish loading. Produces more complete PDFs but
                  takes longer.
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

        {/* ── Advanced (collapsible) ─────────── */}
        <PanelSection>
          <AdvancedToggle
            onClick={() => setShowAdvanced(prev => !prev)}
            aria-expanded={showAdvanced}
            aria-controls='pdf-advanced-options'
          >
            <ChevronDown
              size={16}
              style={{
                transform: showAdvanced ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            />
            Advanced
          </AdvancedToggle>

          {showAdvanced && (
            <Box
              id='pdf-advanced-options'
              css={theme({
                pt: 1,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              })}
            >
              <Box css={{ gridColumn: '1 / -1' }}>
                <Box css={{ display: 'flex', alignItems: 'center' }}>
                  <OptionLabel as='span' css={{ marginBottom: 0 }}>
                    Page Range
                  </OptionLabel>
                  <Tooltip
                    content={
                      <Tooltip.Content>
                        Export only a subset of pages. Leave empty to include
                        all pages.
                      </Tooltip.Content>
                    }
                  >
                    <HelpCircle
                      size={14}
                      color={colors.black40}
                      style={{ marginLeft: '4px' }}
                    />
                  </Tooltip>
                </Box>
                <Box
                  css={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    alignItems: 'center'
                  }}
                >
                  <Input
                    id='pdf-page-from'
                    type='number'
                    inputMode='numeric'
                    min='1'
                    step='1'
                    placeholder='First page'
                    aria-label='Start page'
                    value={options.pageFrom}
                    onChange={e =>
                      setOptions(prev => ({
                        ...prev,
                        pageFrom: e.target.value
                      }))
                    }
                    css={theme({ width: '100%', fontSize: 1, height: '18px' })}
                  />
                  <Input
                    id='pdf-page-to'
                    type='number'
                    inputMode='numeric'
                    min='1'
                    step='1'
                    placeholder='Last page'
                    aria-label='End page'
                    value={options.pageTo}
                    onChange={e =>
                      setOptions(prev => ({
                        ...prev,
                        pageTo: e.target.value
                      }))
                    }
                    css={theme({ width: '100%', fontSize: 1, height: '18px' })}
                  />
                </Box>
              </Box>

              <Box>
                <Box css={{ display: 'flex', alignItems: 'center' }}>
                  <OptionLabel as='span' css={{ marginBottom: 0 }}>
                    Margin
                  </OptionLabel>
                  <Tooltip
                    content={
                      <Tooltip.Content>
                        Margins around the PDF content. Accepts CSS units: px,
                        in, cm, mm.
                      </Tooltip.Content>
                    }
                  >
                    <HelpCircle
                      size={14}
                      color={colors.black40}
                      style={{ marginLeft: '4px' }}
                    />
                  </Tooltip>
                </Box>
                <Input
                  id='pdf-margin'
                  type='text'
                  placeholder='e.g. 10px'
                  aria-label='PDF margin'
                  value={options.margin}
                  onChange={e =>
                    setOptions(prev => ({ ...prev, margin: e.target.value }))
                  }
                  spellCheck={false}
                  autoComplete='off'
                  css={theme({ width: '100%', fontSize: 1, height: '18px' })}
                />
              </Box>

              <Box>
                <Box css={{ display: 'flex', alignItems: 'center' }}>
                  <OptionLabel as='span' css={{ marginBottom: 0 }}>
                    Width
                  </OptionLabel>
                  <Tooltip
                    content={
                      <Tooltip.Content>
                        Override paper width with a CSS value, e.g.
                        &quot;640px&quot;, &quot;8.5in&quot;, or
                        &quot;210mm&quot;.
                      </Tooltip.Content>
                    }
                  >
                    <HelpCircle
                      size={14}
                      color={colors.black40}
                      style={{ marginLeft: '4px' }}
                    />
                  </Tooltip>
                </Box>
                <Input
                  id='pdf-width'
                  type='text'
                  placeholder='e.g. 640px'
                  aria-label='Custom paper width'
                  value={options.width}
                  onChange={e =>
                    setOptions(prev => ({ ...prev, width: e.target.value }))
                  }
                  spellCheck={false}
                  autoComplete='off'
                  css={theme({ width: '100%', fontSize: 1, height: '18px' })}
                />
              </Box>

              <Box>
                <Box css={{ display: 'flex', alignItems: 'center' }}>
                  <OptionLabel as='span' css={{ marginBottom: 0 }}>
                    Height
                  </OptionLabel>
                  <Tooltip
                    content={
                      <Tooltip.Content>
                        Override paper height with a CSS value, e.g.
                        &quot;480px&quot;, &quot;11in&quot;, or
                        &quot;297mm&quot;.
                      </Tooltip.Content>
                    }
                  >
                    <HelpCircle
                      size={14}
                      color={colors.black40}
                      style={{ marginLeft: '4px' }}
                    />
                  </Tooltip>
                </Box>
                <Input
                  id='pdf-height'
                  type='text'
                  placeholder='e.g. 480px'
                  aria-label='Custom paper height'
                  value={options.height}
                  onChange={e =>
                    setOptions(prev => ({ ...prev, height: e.target.value }))
                  }
                  spellCheck={false}
                  autoComplete='off'
                  css={theme({ width: '100%', fontSize: 1, height: '18px' })}
                />
              </Box>
            </Box>
          )}
        </PanelSection>
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
            <FileText size={16} />
            Generate PDF
          </Flex>
        </GenerateButton>
      </StickyGenerateWrapper>
    </Box>
  )
}

/* ─── PDF Preview Display ──────────────────────────────── */

const PdfPreviewDisplay = ({
  data,
  isLoading,
  error,
  onRetry,
  url,
  nerdStats,
  mqlQuery,
  responseData,
  showNerdStats,
  onToggleNerdStats
}) => {
  const [ClipboardComponent, toClipboard] = useClipboard()
  const [copied, setCopied] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const scrollAreaRef = useRef(null)
  const pdfUrl = get(data, 'pdf.url')

  useEffect(() => {
    if (showNerdStats && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0
    }
  }, [showNerdStats])

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
                p: [3],
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              })}
            >
              <ViewportCard style={{ maxWidth: '600px', maxHeight: '500px' }}>
                <SkeletonPulse
                  role='progressbar'
                  aria-label='Generating PDF'
                  style={{ width: '100%', height: '500px' }}
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
              aria-label='Generating PDF'
            >
              <Spinner width='20px' height='14px' />
              <Text
                css={theme({
                  color: 'black50',
                  fontSize: 1,
                  fontFamily: 'sans'
                })}
              >
                Generating PDF
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
              <Caps
                as='button'
                onClick={onRetry}
                css={theme({
                  fontSize: 0,
                  cursor: 'pointer',
                  border: 1,
                  borderColor: 'black10',
                  borderRadius: 2,
                  px: 3,
                  py: 2,
                  bg: 'white'
                })}
              >
                Try again
              </Caps>
            )}
          </FadeIn>
        </Choose.When>

        <Choose.When condition={!!pdfUrl}>
          <FadeIn
            key='result'
            css={theme({
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            })}
          >
            <Box
              ref={scrollAreaRef}
              css={theme({
                flex: 1,
                position: 'relative',
                minHeight: ['400px', '500px', '650px'],
                maxHeight: ['60vh', '750px', '750px']
              })}
            >
              {showNerdStats && nerdStats && (
                <NerdStatsOverlay
                  stats={nerdStats}
                  mqlQuery={mqlQuery}
                  responseData={responseData}
                />
              )}
              <iframe
                src={pdfUrl}
                title='PDF preview'
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: 'block',
                  minHeight: 'inherit'
                }}
              />
            </Box>

            <Flex
              css={theme({
                p: 3,
                gap: 2,
                borderTop: 1,
                borderColor: 'black05',
                bg: 'white',
                flexWrap: 'wrap'
              })}
            >
              <ActionButton
                role='button'
                tabIndex={0}
                onClick={e => {
                  e.preventDefault()
                  downloadFile(pdfUrl, buildPdfFilename(url))
                  setDownloaded(true)
                  setTimeout(() => setDownloaded(false), 1500)
                }}
                css={theme({
                  bg: 'black',
                  color: 'white',
                  _hover: { bg: 'black80' }
                })}
              >
                {downloaded ? (
                  <SpinningLoader size={15} />
                ) : (
                  <Download size={15} />
                )}
                <Caps css={theme({ fontSize: 0 })}>
                  {downloaded ? 'Saving' : 'Download'}
                </Caps>
              </ActionButton>

              <ActionButton
                as='button'
                type='button'
                onClick={() => {
                  toClipboard({
                    copy: pdfUrl,
                    text: Tooltip.TEXT.COPIED('URL')
                  })
                  setCopied(true)
                  setTimeout(() => setCopied(false), 1500)
                }}
                css={theme({
                  bg: 'white',
                  color: 'black80',
                  border: 1,
                  borderColor: 'black10',
                  width: '100%',
                  _hover: { bg: 'gray1', borderColor: 'black20' }
                })}
              >
                {copied ? <Check size={15} /> : <Clipboard size={15} />}
                <Caps css={theme({ fontSize: 0 })}>
                  {copied ? 'Copied' : 'Copy URL'}
                </Caps>
              </ActionButton>

              <ActionButton
                href={pdfUrl}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Open PDF in new tab'
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
            <PreviewEmptyState
              icon={FileText}
              text='Enter a URL and click Generate'
              subtext='Your PDF will appear here'
            />
          </FadeIn>
        </Choose.Otherwise>
      </Choose>
    </PreviewCanvas>
  )
}

/* ─── Main Tool Section ────────────────────────────────── */

const PdfTool = () => {
  const [options, setOptions] = useState({
    url: '',
    format: 'A4',
    landscape: false,
    mediaType: 'screen',
    scale: '0.6',
    margin: '10px',
    width: '',
    height: '',
    pageFrom: '',
    pageTo: '',
    adblock: true,
    cache: true,
    waitForLoad: false
  })

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [lastUrl, setLastUrl] = useState('')
  const [nerdStats, setNerdStats] = useState(null)
  const [mqlQuery, setMqlQuery] = useState(null)
  const [responseData, setResponseData] = useState(null)
  const [showNerdStats, setShowNerdStats] = useState(false)

  const [localStorageData] = useLocalStorage('mql-api-key')
  const [history, setHistory] = useLocalStorage(PDF_HISTORY_KEY, [])
  const [savedMediaType, setSavedMediaType] = useLocalStorage(
    'pdf-media-type',
    'screen'
  )
  const [activeHistoryId, setActiveHistoryId] = useState(null)
  const [historyReady, setHistoryReady] = useState(false)

  useEffect(() => {
    if (savedMediaType) {
      setOptions(prev => ({ ...prev, mediaType: savedMediaType }))
    }
  }, [savedMediaType])

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
      setIsLoading(true)
      setError(null)
      setData(null)
      setShowNerdStats(false)
      setLastUrl(url)

      try {
        const pdfOpts = {
          format: options.format,
          landscape: options.landscape,
          scale: Number(options.scale) || 0.6
        }

        if (options.margin.trim()) {
          pdfOpts.margin = options.margin.trim()
        }
        if (options.width.trim()) {
          pdfOpts.width = options.width.trim()
        }
        if (options.height.trim()) {
          pdfOpts.height = options.height.trim()
        }

        const rawFrom = parseInt(options.pageFrom, 10)
        const rawTo = parseInt(options.pageTo, 10)
        const to = rawTo >= 1 ? rawTo : NaN
        const from = to >= 1 && !(rawFrom >= 1) ? 1 : rawFrom
        if (from >= 1 && to >= 1) {
          pdfOpts.pageRanges = `${Math.min(from, to)}-${Math.max(from, to)}`
        } else if (from >= 1) {
          pdfOpts.pageRanges = `${from}-`
        }

        const mqlOpts = {
          apiKey: localStorageData?.apiKey,
          meta: false,
          pdf: pdfOpts,
          screenshot: true,
          adblock: options.adblock,
          force: !options.cache,
          prerender: true,
          mediaType: options.mediaType,
          ...(options.waitForLoad && { waitForTimeout: 4000 })
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
              err.description || err.message || 'Failed to generate PDF.',
            statusCode: err.statusCode || err.code
          })
        }

        if (response?.data?.pdf) {
          const entryId = String(Date.now())
          const thumbnail = response.data.screenshot
            ? await createThumbnail(response.data.screenshot.url)
            : null
          setHistory(prev => {
            const items = Array.isArray(prev) ? prev : []
            return [
              {
                id: entryId,
                createdAt: Date.now(),
                pdf: response.data.pdf,
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
                  format: options.format,
                  landscape: options.landscape,
                  mediaType: options.mediaType,
                  scale: options.scale,
                  margin: options.margin,
                  width: options.width,
                  height: options.height,
                  adblock: options.adblock,
                  cache: options.cache,
                  waitForLoad: options.waitForLoad
                }
              },
              ...items
            ].slice(0, MAX_HISTORY_ITEMS)
          })
          setActiveHistoryId(entryId)
        }
      } catch (err) {
        setError({
          message: err.description || err.message || 'Failed to generate PDF.',
          statusCode: err.statusCode || err.code
        })
      } finally {
        setIsLoading(false)
      }
    },
    [options, setHistory, localStorageData]
  )

  const handleHistorySelect = useCallback(entry => {
    const { settings, pdf, screenshot } = entry
    setOptions({
      url: settings.url,
      format: settings.format || 'A4',
      landscape: settings.landscape || false,
      mediaType: settings.mediaType || 'screen',
      scale: settings.scale || '0.6',
      margin: settings.margin || '10px',
      width: settings.width || '',
      height: settings.height || '',
      pageFrom: settings.pageFrom || '',
      pageTo: settings.pageTo || '',
      adblock: settings.adblock !== undefined ? settings.adblock : true,
      cache: settings.cache !== undefined ? settings.cache : true,
      waitForLoad: settings.waitForLoad || false
    })
    setData({ pdf, screenshot })
    setLastUrl(settings.url)
    setNerdStats(entry.nerdStats || null)
    setMqlQuery(entry.mqlQuery || null)
    setResponseData(entry.responseData || null)
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
            onMediaTypeChange={setSavedMediaType}
          />
        </OptionsPanelOuter>

        <PreviewOuter>
          <PdfPreviewDisplay
            data={data}
            isLoading={isLoading}
            error={error}
            onRetry={handleRetry}
            url={lastUrl}
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
          entityLabel='PDF'
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
      Save HTML Webpage as PDF
    </Heading>
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [2, 2, 3, 3],
        px: 3,
        maxWidth: layout.large,
        fontSize: [2, 2, '28px', '28px']
      })}
    >
      Use our free online tool to turn any URL into a high-fidelity PDF
      document.
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
        pb: [2, 2, 3, 3],
        px: 3,
        maxWidth: layout.large,
        fontSize: [3, 3, 3, '28px']
      })}
    >
      How to save a webpage as PDF online
    </Caption>
    <Box
      css={theme({
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        pt: [3, 3, 4, 4],
        maxWidth: layout.normal,
        px: [3, 3, 0, 0],
        width: '100%'
      })}
    >
      {HOW_IT_WORKS.map((step, index) => (
        <Flex
          key={step.title}
          css={theme({
            gap: 3,
            alignItems: 'stretch',
            pb: index < HOW_IT_WORKS.length - 1 ? 0 : 0
          })}
        >
          <Flex
            css={{
              flexShrink: 0,
              flexDirection: 'column',
              alignItems: 'center',
              width: '24px'
            }}
          >
            <Text
              css={theme({
                fontWeight: 'bold',
                fontSize: '16px',
                color: 'black30',
                fontFamily: 'mono',
                lineHeight: 0,
                mt: '1px'
              })}
            >
              {`0${index + 1}`}
            </Text>
            {index < HOW_IT_WORKS.length - 1 && (
              <Box
                css={theme({
                  flex: 1,
                  width: '1px',
                  bg: 'black10',
                  mt: 2,
                  mb: 2
                })}
              />
            )}
          </Flex>
          <Box
            css={theme({
              flex: 1,
              minWidth: 0,
              pb: 4
            })}
          >
            <Text
              as='h3'
              css={theme({
                fontWeight: 'bold',
                fontSize: '18px',
                color: 'black',
                lineHeight: 0,
                m: 0
              })}
            >
              {step.title}
            </Text>
            <Text
              css={theme({
                fontSize: 1,
                color: 'black80',
                lineHeight: 2,
                pt: 2
              })}
            >
              {step.description}
            </Text>
          </Box>
        </Flex>
      ))}
    </Box>

    <Flex
      css={theme({
        mt: 2,
        mx: [3, 3, 0, 0],
        py: 3,
        px: [3, 3, 4, 4],
        maxWidth: layout.normal,
        width: '100%',
        borderRadius: 3,
        border: 1,
        borderColor: 'black10',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 3
      })}
    >
      <Box css={{ flex: 1, minWidth: '200px' }}>
        <Text
          css={theme({ fontSize: '16px', fontWeight: 'bold', color: 'black' })}
        >
          Need to convert multiple pages?
        </Text>
        <Text css={theme({ fontSize: '16px', color: 'black80', pt: 1 })}>
          Paste up to 50&nbsp;URLs and download all PDFs as a ZIP file.
        </Text>
      </Box>
      <ArrowLink href='/tools/website-to-pdf/bulk' css={theme({ fontSize: 1 })}>
        Bulk URLs to PDFs tool
      </ArrowLink>
    </Flex>

    <Flex
      css={theme({
        mt: 2,
        mx: [3, 3, 0, 0],
        py: 3,
        px: [3, 3, 4, 4],
        maxWidth: layout.normal,
        width: '100%',
        borderRadius: 3,
        alignItems: 'flex-start',
        gap: 3
      })}
      style={{
        background: colors.yellow0,
        border: `1px solid ${colors.yellow2}`
      }}
    >
      <Flex
        css={theme({
          flexShrink: 0,
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          alignItems: 'center',
          justifyContent: 'center',
          mt: '1px'
        })}
        style={{ background: colors.yellow2 }}
      >
        <Zap size={13} color={colors.yellow8} fill={colors.yellow8} />
      </Flex>
      <Box css={{ flex: 1, minWidth: 0 }}>
        <Text css={theme({ fontSize: 1, fontWeight: 'bold', color: 'black' })}>
          Tip - Need a pixel-perfect image instead of a PDF?
        </Text>
        <Text
          css={theme({
            fontSize: '16px',
            color: 'black80',
            pt: 1,
            lineHeight: 2
          })}
        >
          If the PDF doesn't capture the page exactly as it looks on screen, try
          our{' '}
          <Link href='/tools/website-screenshot/full-page'>
            full-page screenshot tool
          </Link>{' '}
          — it renders the entire webpage as a high-resolution image, preserving
          every visual detail.
        </Text>
      </Box>
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
      Why use our URL to PDF converter?
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
        How is this HTML to PDF converter free?
      </Text>
      <Text
        css={theme({ fontSize: 2, color: 'black80', lineHeight: 2, mt: 2 })}
      >
        This online tool runs on <b>Microlink's</b>{' '}
        <Link href='/pdf'>PDF API</Link> — the same infrastructure that converts
        millions of web pages to PDF every week for paying customers. You get
        enterprise-grade webpage to PDF conversion at no cost.
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
          PDF API{' '}
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
          alt='Code snippet demonstrating how to convert HTML to PDF using the Microlink Node.js API'
        />
      </Flex>
    }
  />
)

/* ─── Use Cases ───────────────────────────────────────── */

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
      Who saves web pages as PDF?
    </Subhead>
    <Caption css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.large })}>
      From archiving internet pages to converting HTML to PDF at scale,
      webpage-to-PDF conversion powers workflows across every industry.
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
        question: 'How do I save a web page as a PDF?',
        answer: (
          <>
            <div>
              Paste the URL of the page you want to save, choose your paper
              format and options, then click <b>Generate PDF</b>. The webpage is
              converted to a downloadable PDF document in seconds — no login, no
              install.
            </div>
            <div>
              See the <Link href='/docs/guides/pdf'>getting started guide</Link>{' '}
              for a full walkthrough.
            </div>
          </>
        )
      },
      {
        question: 'My PDF looks different from the webpage. What can I do?',
        answer: (
          <>
            <div>
              Try switching <b>PDF Appearance</b> to <b>Screen View</b> for a
              closer visual match. Enable <b>Wait for full load</b> if the page
              has lazy-loaded images or animations. You can also adjust scale
              and margins for a better fit.
            </div>
            <div>
              Check the{' '}
              <Link href='/docs/guides/pdf/troubleshooting'>
                troubleshooting guide
              </Link>{' '}
              for more tips, or reach us at{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
            </div>
          </>
        )
      },
      {
        question: 'How do I export only specific pages from a PDF?',
        answer: (
          <>
            <div>
              Open the <b>Advanced</b> section in the sidebar and use the{' '}
              <b>Page Range</b> inputs. Set <b>First page</b> and{' '}
              <b>Last page</b> to control which pages are included in the final
              PDF.
            </div>
            <div>
              For example, enter <b>1</b> and <b>1</b> to export just the first
              page, <b>2</b> and <b>4</b> to get pages two through four, or
              leave <b>Last page</b> empty to export everything from your
              starting page to the end. If you only set <b>Last page</b>, the
              first page defaults to&nbsp;1 automatically.
            </div>
          </>
        )
      },
      {
        question: 'Is this online HTML to PDF converter free?',
        answer: (
          <>
            <div>
              Yes! You can convert up to <b>50&nbsp;web pages to PDF per day</b>{' '}
              for free, with no credit card required. Every conversion includes
              all features — paper format, margins, scaling, and landscape mode.
            </div>
            <div>
              Need higher limits? Check our{' '}
              <Link href='/#pricing'>pricing plans</Link> for priority
              processing and more daily conversions.
            </div>
          </>
        )
      },
      {
        question:
          'Can I convert any URL to PDF, including private or authenticated pages?',
        answer: (
          <>
            <div>
              You can turn any publicly accessible link into a PDF document. For
              authenticated or private pages behind a login, use the{' '}
              <Link href='/docs/guides/pdf/private-pages'>
                private pages guide
              </Link>{' '}
              to pass session cookies or headers via the API.
            </div>
          </>
        )
      },
      {
        question:
          'What paper formats does the webpage to PDF converter support?',
        answer: (
          <>
            <div>
              The converter supports all standard paper sizes: A0 through A6,
              Letter, Legal, and Tabloid. You can also set custom width and
              height using CSS units (px, in, cm, mm).
            </div>
            <div>
              See the{' '}
              <Link href='/docs/guides/pdf/page-size-and-layout'>
                page size and layout guide
              </Link>{' '}
              for detailed examples.
            </div>
          </>
        )
      },
      {
        question:
          'Can I integrate HTML to PDF conversion into my own application?',
        answer: (
          <>
            <div>
              Absolutely. This tool is built on the{' '}
              <Link href='/docs/api/parameters/pdf'>Microlink PDF API</Link> — a
              simple REST endpoint that converts any URL to a PDF document.
              Integrate with Node.js, Python, Ruby, or plain cURL.
            </div>
            <div>
              Use the{' '}
              <Link href='https://www.npmjs.com/package/@microlink/mql'>
                @microlink/mql
              </Link>{' '}
              SDK or hit the API directly. Check the{' '}
              <Link href='/docs/guides/pdf/embedding'>embedding guide</Link> for
              delivery and integration patterns.
            </div>
          </>
        )
      },
      {
        question: 'How does caching work when converting web pages to PDF?',
        answer: (
          <>
            <div>
              PDFs are cached on our global CDN by default. Cached responses are
              served instantly and <b>don't count against your daily limit</b>.
              Cache lasts 24&nbsp;hours.
            </div>
            <div>
              Turn off caching only when you need to save a page that changes
              frequently. Read the{' '}
              <Link href='/docs/guides/pdf/caching-and-performance'>
                caching and performance guide
              </Link>{' '}
              for advanced strategies.
            </div>
          </>
        )
      }
    ]}
  />
)

/* ─── API Docs Card ────────────────────────────────────── */

const PdfApiDocsCard = () => (
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
      <Subhead css={theme({ fontSize: 4 })}>
        HTML to PDF API Documentation
      </Subhead>
      <Caption
        css={theme({ pt: 3, maxWidth: layout.normal, mx: 'auto', fontSize: 3 })}
      >
        Convert any URL to a PDF document programmatically. Explore the full API
        reference, SDKs for every language, and ready-to-use code snippets.
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
        <ArrowLink href='/docs/guides/pdf'>Getting started</ArrowLink>
      </Flex>
    </Box>
  </Container>
)

/* ─── Page Head (SEO) ──────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Save Webpage as PDF — Free Online HTML to PDF Converter'
    noSuffix
    description='Save any web page as a PDF for free. Convert HTML to PDF, turn a URL into a downloadable document, or save an internet page as PDF — no login, no install. Supports custom paper size, margins, and orientation.'
    image='https://cdn.microlink.io/banner/pdf.jpeg'
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/website-to-pdf',
        name: 'Website to PDF Converter — Save Web Pages as PDF Online',
        description:
          'Free online tool to save a webpage as PDF, convert HTML to PDF, or turn any URL into a downloadable PDF document. No login required.',
        url: 'https://microlink.io/tools/website-to-pdf',
        applicationCategory: ['DeveloperApplication', 'UtilitiesApplication'],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description:
            'Free tier — save up to 50 web pages as PDF per day, no credit card required'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How do I save a web page as a PDF?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Paste the URL of the web page you want to save, choose your paper format and options, then click Generate PDF. Your PDF is ready to download in seconds — no login or install needed.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do I export only specific pages from a PDF?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Open the Advanced section and use the Page Range inputs. Set First page and Last page to control which pages are included — for example, 1 to 1 for a single page, or 2 to 4 for pages two through four. Leave Last page empty to export from your starting page to the end.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is this online HTML to PDF converter free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. You can convert up to 50 web pages to PDF per day for free, with no credit card required. Every PDF includes all features — paper format, margins, scaling, and landscape mode.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I convert a URL to PDF or a link to a PDF document?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Absolutely. Just paste any URL — a full website, a single internet page, or a direct link — and the tool will convert it into a downloadable PDF document.'
            }
          },
          {
            '@type': 'Question',
            name: 'What paper formats does the webpage to PDF converter support?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The converter supports all standard paper sizes: A0 through A6, Letter, Legal, and Tabloid. You can also set custom width and height using CSS units (px, in, cm, mm).'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I integrate HTML to PDF conversion into my application?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. This tool is built on the Microlink PDF API, a simple REST endpoint. Integrate with Node.js, Python, Ruby, or plain cURL. Use the @microlink/mql SDK or hit the API directly from any HTTP client.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does caching work when converting web pages to PDF?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: "PDFs are cached on a global CDN by default. Cached responses are served instantly and don't count against your daily limit. Cache lasts 24 hours."
            }
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to convert a webpage to PDF',
        description:
          'Use the free Microlink tool to save any web page as a PDF document in three steps.',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Paste the URL',
            text: 'Enter the link to any web page, article, or website you want to convert to PDF.',
            url: 'https://microlink.io/tools/website-to-pdf#tool'
          },
          {
            '@type': 'HowToStep',
            name: 'Choose your settings',
            text: 'Pick a paper format, orientation, PDF appearance (Screen View or Print Version), and optionally adjust scale, margins, or page range under Advanced.',
            url: 'https://microlink.io/tools/website-to-pdf#tool'
          },
          {
            '@type': 'HowToStep',
            name: 'Generate and Download',
            text: 'Click Generate PDF to convert the page. Preview the result, then download it, copy the direct URL, or open it in a new tab.',
            url: 'https://microlink.io/tools/website-to-pdf#tool'
          }
        ]
      }
    ]}
  />
)

/* ─── Page Component ───────────────────────────────────── */

const WebsiteToPdfPage = () => (
  <Layout>
    <Hero />
    <PdfTool />
    <HowItWorks />
    <Explanation />
    <UseCases />
    <Banner />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          HTML to PDF API{' '}
          <span
            css={{
              display: 'block',
              color: '#fd494a',
              width: '100%',
              textAlign: 'left'
            }}
          >
            Convert Web Pages to PDF at Scale.
          </span>
        </Subhead>
      }
      caption={
        <>
          No servers to maintain, no headless browsers to configure. Convert any
          URL to a PDF document with a single API call — easy integration via{' '}
          <Link href='/pdf'>API</Link>.
        </>
      }
      features={FEATURES_LIST}
    />
    <PdfApiDocsCard />
    <ProductInformation />
  </Layout>
)

export default WebsiteToPdfPage
