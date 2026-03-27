import { borders, colors, layout, theme, transition, space } from 'theme'
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
  Loader
} from 'react-feather'
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
import LineBreak from 'components/elements/LineBreak'
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

import {
  extractNerdStats,
  buildMqlQuery
} from 'components/patterns/NerdStats/NerdStats'
import NerdStatsOverlay, {
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
  StepCard,
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
  HISTORY_MAX_AGE_MS,
  MOBILE_BP
} from 'components/pages/screenshot'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

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
    title: 'Fast CDN Delivery',
    description:
      'PDFs are served via a global CDN with 240+ edge locations. Lightning-fast delivery anywhere in the world.'
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
    description: 'Choose paper format, orientation, scale, margins, and more.'
  },
  {
    icon: FileText,
    title: 'Generate PDF',
    description: 'Click the button and wait a few seconds.'
  },
  {
    icon: Download,
    title: 'Download & Share',
    description: 'Save your PDF to your device or share it with others.'
  }
]

const REASON_TO_USE = [
  {
    title: 'Fast PDF Generation',
    description: (
      <>
        Our advanced technology converts websites to PDF as fast as possible.
        Whether you need a quick document or bulk conversions via API, we
        deliver <Link href='/pdf'>speed and quality</Link>.
      </>
    )
  },
  {
    title: 'High-Quality Documents',
    description: (
      <>
        Get clean, well-formatted PDFs with configurable paper size, margins,
        and scaling.{' '}
        <Link href='/docs/guides/pdf/page-size-and-layout'>
          Customize page layout
        </Link>{' '}
        for any use case.
      </>
    )
  },
  {
    title: 'No Installation Required',
    description:
      'Convert any website to PDF directly in your browser. No downloads, no plugins, no hassle. Just paste the URL and generate.'
  },
  {
    title: 'Free + No login',
    description:
      'Free PDF tool with 50 conversions per day. Every PDF is clean and professional. No branding, overlays, or watermarks on your documents.'
  },
  {
    title: 'Local Storage Support',
    description:
      'Save PDF previews to your local storage for easy access. Access them for 24 hours so if you generate the perfect document, you can come back and grab it again.'
  },
  {
    title: 'Block ads and banners',
    description: (
      <>
        Automatically block ads and cookie banners before generating the PDF.
        Get the cleanest documents possible. Learn more about{' '}
        <Link href='/docs/guides/pdf/page-preparation'>
          page preparation options
        </Link>
        .
      </>
    )
  }
]

const USE_CASES = [
  {
    title: 'For Archivists & Researchers',
    items: [
      'Archive web pages as PDF documents for long-term storage',
      'Convert articles and reports to shareable offline formats',
      'Preserve website content before it changes or disappears',
      'Generate citation-ready document snapshots'
    ],
    link: {
      href: '/docs/guides/pdf/page-preparation',
      alt: 'Page preparation guide for PDF generation',
      text: 'Learn about page preparation'
    }
  },
  {
    title: 'For Legal & Compliance',
    items: [
      'Create PDF records of web pages for legal evidence',
      'Archive terms of service and policy changes',
      'Generate compliance documentation from live pages',
      'Produce timestamped website snapshots'
    ],
    link: {
      href: '/docs/guides/pdf/embedding',
      alt: 'Embedding guide for PDF delivery',
      text: 'Learn about PDF delivery'
    }
  },
  {
    title: 'For Developers',
    items: [
      'Convert web reports and dashboards to PDF via API',
      'Automate invoice and receipt generation from web apps',
      'Generate PDF documentation from live sites',
      'Build PDF export features into your application'
    ],
    link: {
      href: '/pdf',
      alt: 'PDF API',
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
              onChange={val =>
                setOptions(prev => ({ ...prev, mediaType: val }))
              }
            />
          </Box>
        </PanelSection>

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
              <Box>
                <Box css={{ display: 'flex', alignItems: 'center' }}>
                  <OptionLabel as='span' css={{ marginBottom: 0 }}>
                    Scale
                  </OptionLabel>
                  <Tooltip
                    content={
                      <Tooltip.Content>
                        Scales the page content. Values between 0.1 and 2. Lower
                        values fit more content per page.
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
                  id='pdf-scale'
                  type='number'
                  inputMode='decimal'
                  step='0.1'
                  min='0.1'
                  max='2'
                  placeholder='0.6'
                  aria-label='PDF scale factor'
                  value={options.scale}
                  onChange={e =>
                    setOptions(prev => ({ ...prev, scale: e.target.value }))
                  }
                  css={theme({ width: '100%', fontSize: 1, height: '18px' })}
                />
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
    adblock: true,
    cache: true
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

        const mqlOpts = {
          apiKey: localStorageData?.apiKey,
          meta: false,
          pdf: pdfOpts,
          screenshot: true,
          adblock: options.adblock,
          force: !options.cache,
          prerender: true,
          mediaType: options.mediaType
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
                  scale: options.scale,
                  margin: options.margin,
                  width: options.width,
                  height: options.height,
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
      scale: settings.scale || '0.6',
      margin: settings.margin || '10px',
      width: settings.width || '',
      height: settings.height || '',
      adblock: settings.adblock !== undefined ? settings.adblock : true,
      cache: settings.cache !== undefined ? settings.cache : true
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
      Convert Any Website <LineBreak breakpoints={[0, 1]} /> to PDF Instantly
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
      Generate PDFs from any URL in seconds
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
      How to convert a website to PDF
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
      Why choose our free PDF tool?
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
        This tool runs on <b>Microlink's</b> <Link href='/pdf'>PDF API</Link>
        —the same infrastructure processing millions of requests per week for
        paying customers. You get enterprise performance at no cost.
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
          alt='PDF API'
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
      Use cases for website to PDF conversion
    </Subhead>
    <Caption css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.small })}>
      From web archiving to automated document generation, website-to-PDF
      conversion powers workflows across every team.
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
        question: 'Is this website to PDF tool really free?',
        answer: (
          <>
            <div>
              Yes! You can generate up to <b>50&nbsp;PDFs per day</b> for free,
              with no credit card required. Free PDFs include all features —
              paper format, margins, scaling, and landscape mode.
            </div>
            <div>
              Need more? Check our <Link href='/#pricing'>pricing plans</Link>{' '}
              for higher limits and priority processing.
            </div>
          </>
        )
      },
      {
        question: 'What paper formats are supported?',
        answer: (
          <>
            <div>
              We support all standard paper sizes: A0 through A6, Letter, Legal,
              and Tabloid. You can also set custom width and height using CSS
              units (px, in, cm, mm).
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
        question: 'Can I integrate this into my application?',
        answer: (
          <>
            <div>
              Absolutely. The tool is built on the{' '}
              <Link href='/docs/api/parameters/pdf'>Microlink PDF API</Link>,
              which provides a simple REST endpoint. Integrate with any language
              — Node.js, Python, Ruby, or plain cURL.
            </div>
            <div>
              Use the{' '}
              <Link href='https://www.npmjs.com/package/@microlink/mql'>
                @microlink/mql
              </Link>{' '}
              SDK for Node.js, or hit the API directly from any HTTP client.
              Check the{' '}
              <Link href='/docs/guides/pdf/embedding'>embedding guide</Link> for
              delivery and integration patterns.
            </div>
          </>
        )
      },
      {
        question: 'How does caching work?',
        answer: (
          <>
            <div>
              PDFs are cached on our global CDN by default. Cached responses are
              served instantly and <b>don't count against your limit</b>. It
              lasts for 24 hours.
            </div>
            <div>
              We only recommend turning off the cache if you need to convert a
              page that changes frequently. Read the{' '}
              <Link href='/docs/guides/pdf/caching-and-performance'>
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
              <Link href='/docs/guides/pdf/troubleshooting'>
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
      <Subhead css={theme({ fontSize: 4 })}>PDF API documentation</Subhead>
      <Caption
        css={theme({ pt: 3, maxWidth: layout.normal, mx: 'auto', fontSize: 3 })}
      >
        Explore the full PDF API reference with interactive examples, SDKs for
        every language, and ready-to-use code snippets.
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
    title='Website to PDF Converter - Free Online URL to PDF Tool'
    noSuffix
    description='Convert any website to a high-quality PDF document. Free, no-login online tool with configurable paper size, margins, scaling, and orientation. Powered by a fast, reliable API.'
    image='https://cdn.microlink.io/banner/pdf.jpeg'
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/website-to-pdf',
        name: 'Microlink Website to PDF Tool',
        description:
          'Convert any webpage to a high-quality PDF document with configurable paper format, margins, scaling, and orientation.',
        url: 'https://microlink.io/tools/website-to-pdf',
        applicationCategory: ['DeveloperApplication', 'Tool'],
        keywords: [
          'website to pdf',
          'url to pdf converter',
          'webpage to pdf',
          'convert website to pdf',
          'web page to pdf online',
          'pdf generator',
          'html to pdf',
          'save webpage as pdf',
          'pdf api'
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free tier with 50 PDF conversions per day'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is this website to PDF tool really free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can generate up to 50 PDFs per day for free, with no credit card required. Free PDFs include all features — paper format, margins, scaling, and landscape mode.'
            }
          },
          {
            '@type': 'Question',
            name: 'What paper formats are supported?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'We support all standard paper sizes: A0 through A6, Letter, Legal, and Tabloid. You can also set custom width and height using CSS units (px, in, cm, mm).'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I integrate this into my application?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Absolutely. The tool is built on the Microlink PDF API, which provides a simple REST endpoint. Integrate with any language — Node.js, Python, Ruby, or plain cURL. Use the @microlink/mql SDK for Node.js, or hit the API directly from any HTTP client.'
            }
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
          Website to PDF API{' '}
          <span
            css={{
              display: 'block',
              color: '#fd494a',
              width: '100%',
              textAlign: 'left'
            }}
          >
            for Automated Conversions.
          </span>
        </Subhead>
      }
      caption={
        <>
          No servers to maintain, no load balancers, no paying for capacity you
          don't use. Microlink lets you spend more time building and less time
          configuring — easy integration via <Link href='/pdf'>API</Link>.
        </>
      }
      features={FEATURES_LIST}
    />
    <PdfApiDocsCard />
    <ProductInformation />
  </Layout>
)

export default WebsiteToPdfPage
