/* global fetch */

import { borders, colors, layout, theme, transition, space } from 'theme'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
  AlertTriangle,
  FileText,
  CheckCircle,
  ChevronDown,
  Download,
  Globe,
  ArrowRight,
  HelpCircle,
  Settings,
  Trash2,
  X
} from 'react-feather'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import styled, { keyframes } from 'styled-components'
import mql from '@microlink/mql'
import JSZip from 'jszip'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
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
  PreviewCanvas,
  FadeIn,
  SectionIcon,
  UseCaseCard,
  ToolLayout,
  OptionsPanelOuter,
  PreviewOuter,
  PanelRibbonLayout,
  StickyGenerateWrapper,
  SegmentedControl,
  PreviewEmptyState,
  createThumbnail,
  LAYOUT_PIVOT,
  MOBILE_BP
} from 'components/pages/screenshot'

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

/* ─── Constants ────────────────────────────────────────── */

const PDF_HISTORY_KEY = 'pdf-history/batch'
const MAX_HISTORY_ITEMS = 50
const MAX_URLS = 50
const HISTORY_MAX_AGE_MS = 24 * 60 * 60 * 1000

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
    title: 'Bulk URL to PDF Processing',
    description:
      'Paste up to 50 URLs and bulk convert them all to PDF in sequence. Real-time progress tracking shows each document as it completes.'
  },
  {
    title: 'One-Click ZIP Download',
    description:
      'All batch PDFs are packaged into a single ZIP file automatically. Select individual documents or bulk download them all at once.'
  },
  {
    title: 'Simple REST API',
    description:
      'Automate bulk PDF generation from a URL list with a single HTTP request per document. No headless browsers to manage.'
  }
]

const HOW_IT_WORKS = [
  {
    icon: Globe,
    title: 'Paste your URL list',
    description: (
      <>
        Add up to <b>50 URLs</b> at once — one per line or comma-separated. Any
        publicly accessible <b>web page</b>, <b>article</b>, or <b>dashboard</b>{' '}
        works.
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
          <b>orientation</b>. Use <b>PDF&nbsp;Appearance</b> to switch between{' '}
          <b>Screen View</b> or <b>Print Version</b>. Enable{' '}
          <b>Wait for full load</b> if pages have lazy images.
        </span>
        <span style={{ display: 'block', paddingTop: '8px' }}>
          Use <b>Zoom scale</b> to make the content larger or smaller, and
          explore <b>Advanced</b> to fine-tune <b>margins</b>, custom{' '}
          <b>width</b> and <b>height</b>, and set a <b>page range</b> to export
          only the pages you need.
        </span>
      </>
    )
  },
  {
    icon: FileText,
    title: 'Bulk convert to PDF',
    description: (
      <>
        Click <b>Generate PDFs</b> and watch every URL converted one by one with{' '}
        <b>real-time progress</b>. Failed URLs are skipped automatically so the
        batch keeps going.
      </>
    )
  },
  {
    icon: Download,
    title: 'Download all as ZIP',
    description: (
      <>
        <b>Bulk download</b> all your PDFs as a single <b>ZIP file</b>, or
        select individual documents. Every batch is saved in your{' '}
        <b>local history</b> for 24&nbsp;hours.
      </>
    )
  }
]

const REASON_TO_USE = [
  {
    title: 'Bulk convert multiple URLs to PDF',
    description: (
      <>
        Paste up to 50 URLs and <b>bulk convert them to PDF</b> in one go. No
        need to process them one by one — save hours of repetitive manual work.
        Need a single URL instead? Use the{' '}
        <Link href='/tools/website-to-pdf'>webpage to PDF tool</Link>.
      </>
    )
  },
  {
    title: 'Bulk download PDFs as a ZIP',
    description: (
      <>
        All your <b>batch PDFs</b> are packaged into a single ZIP file and{' '}
        <b>bulk downloaded</b> automatically. Configure{' '}
        <Link href='/docs/guides/pdf/page-size-and-layout'>
          paper format and layout
        </Link>{' '}
        — ready to share, archive, or use in any workflow.
      </>
    )
  },
  {
    title: 'Free online — no login required',
    description: (
      <>
        <b>Batch convert URLs to PDF</b> for free — up to 50 per day. No account
        needed, no credit card, no watermarks on your documents.
      </>
    )
  },
  {
    title: 'Configurable paper format',
    description: (
      <>
        Choose from standard paper sizes (A4, Letter, Legal, Tabloid) or set
        custom dimensions. Control orientation, margins, and scaling for every
        PDF in the <b>batch</b>.
      </>
    )
  },
  {
    title: 'Clean, ad-free documents',
    description: (
      <>
        Automatically remove ads and cookie popups before generating PDFs. Get
        clean, professional documents from every URL in your list. Learn more in
        the{' '}
        <Link href='/docs/guides/pdf/page-preparation'>
          page preparation guide
        </Link>
        .
      </>
    )
  },
  {
    title: 'Smart caching',
    description: (
      <>
        PDFs are cached on our global CDN by default. Cached responses are
        served instantly and <b>don't count against your limit</b>. Re-run the
        same <b>URL list</b> and cached entries resolve immediately. Read the{' '}
        <Link href='/docs/guides/pdf/caching-and-performance'>
          caching guide
        </Link>
        .
      </>
    )
  }
]

/* ─── Helpers ──────────────────────────────────────────── */

const buildPdfFilename = sourceUrl => {
  try {
    const parsed = new URL(sourceUrl)
    return (parsed.hostname + parsed.pathname)
      .replace(/\/+$/g, '')
      .replace(/[^a-zA-Z0-9.-]/g, '-')
      .replace(/-+/g, '-')
  } catch {
    return 'document'
  }
}

const formatHistoryUrl = url => {
  try {
    const u = new URL(url)
    return u.hostname + (u.pathname !== '/' ? u.pathname : '')
  } catch {
    return url
  }
}

const formatFileSize = bytes => {
  if (!bytes) return null
  const kb = bytes / 1000
  return kb >= 1000 ? `${(kb / 1000).toFixed(2)} MB` : `${kb.toFixed(0)} KB`
}

const formatDuration = (ms, { forceSeconds = false } = {}) => {
  if (ms == null) return null
  const totalSeconds = ms / 1000
  if (!forceSeconds && totalSeconds >= 60) {
    const mins = Math.floor(totalSeconds / 60)
    const secs = Math.round(totalSeconds % 60)
    return `${mins}m ${secs}s`
  }
  return `${totalSeconds.toFixed(3)} seconds`
}

/* ─── Preview Animations (bulk-specific) ────────────────── */

const resultEnter = keyframes`
  from { opacity: 0; transform: translateY(10px); max-height: 0; }
  to { opacity: 1; transform: translateY(0); max-height: 40px; }
`

const resultExit = keyframes`
  from { opacity: 1; transform: translateY(0); max-height: 40px; }
  to { opacity: 0; transform: translateY(-10px); max-height: 0; padding-top: 0; padding-bottom: 0; }
`

const VISIBLE_RESULTS = 8
const RESULT_ANIM_MS = 280

const ResultItemBase = styled(Flex)`
  ${theme({ gap: 2, py: '4px', alignItems: 'center' })}
  overflow: hidden;
`

const ResultItemEnter = styled(ResultItemBase)`
  animation: ${resultEnter} ${RESULT_ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1)
    both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const ResultItemExit = styled(ResultItemBase)`
  animation: ${resultExit} ${RESULT_ANIM_MS}ms cubic-bezier(0.4, 0, 0.2, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

const AnimatedResultsList = ({ results }) => {
  const [displayItems, setDisplayItems] = useState([])
  const processedRef = useRef(0)

  useEffect(() => {
    if (results.length === 0) {
      setDisplayItems([])
      processedRef.current = 0
      return
    }

    const count = results.length
    const prev = processedRef.current
    if (count <= prev) return

    setDisplayItems(current => {
      const active = current.filter(it => !it.exiting)
      const additions = results.slice(prev, count).map((r, i) => ({
        data: r,
        id: prev + i,
        entering: true,
        exiting: false
      }))

      const all = [...active, ...additions]
      const overflow = all.length - VISIBLE_RESULTS
      if (overflow > 0) {
        for (let i = 0; i < overflow; i++) {
          all[i] = { ...all[i], exiting: true, entering: false }
        }
      }

      return all
    })

    processedRef.current = count

    const timer = setTimeout(() => {
      setDisplayItems(prev =>
        prev.filter(it => !it.exiting).map(it => ({ ...it, entering: false }))
      )
    }, RESULT_ANIM_MS)

    return () => clearTimeout(timer)
  }, [results.length])

  if (displayItems.length === 0) return null

  return (
    <Box
      css={theme({
        width: '100%',
        maxWidth: '400px',
        textAlign: 'left'
      })}
    >
      {displayItems.map(item => {
        const Wrapper = item.exiting
          ? ResultItemExit
          : item.entering
            ? ResultItemEnter
            : ResultItemBase

        return (
          <Wrapper key={item.id}>
            {item.data.success ? (
              <CheckCircle
                size={14}
                color='#22c55e'
                style={{ flexShrink: 0 }}
              />
            ) : (
              <AlertTriangle
                size={14}
                color='#ef4444'
                style={{ flexShrink: 0 }}
              />
            )}
            <Text
              css={theme({
                fontSize: 0,
                color: item.data.success ? 'black60' : 'fullscreen',
                fontFamily: 'sans',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1
              })}
            >
              {formatHistoryUrl(item.data.url)}
            </Text>
            {item.data.sizePretty && (
              <Text
                css={theme({
                  fontSize: '11px',
                  color: 'black30',
                  fontFamily: 'mono',
                  flexShrink: 0,
                  pl: 2
                })}
              >
                {item.data.sizePretty}
              </Text>
            )}
            {item.data.duration != null && (
              <Text
                css={theme({
                  fontSize: '11px',
                  color: 'black30',
                  fontFamily: 'mono',
                  flexShrink: 0,
                  pl: 1
                })}
              >
                · {formatDuration(item.data.duration)}
              </Text>
            )}
          </Wrapper>
        )
      })}
    </Box>
  )
}

/* ─── History Styled Components (bulk-specific) ─────────── */

const HISTORY_ROW_H = 61
const HISTORY_VISIBLE_ROWS = 4
const HISTORY_MAX_H = HISTORY_ROW_H * HISTORY_VISIBLE_ROWS + 8

const HistoryListContainer = styled(Box)`
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  max-height: ${HISTORY_MAX_H}px;
  display: grid;
  grid-template-columns: 1fr;
  ${theme({ pt: 1, pb: 1 })}
  scrollbar-width: thin;
  scrollbar-color: ${colors.black10} transparent;

  @media (min-width: ${MOBILE_BP}px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${LAYOUT_PIVOT}px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.black10};
    border-radius: 2px;
  }
`

const HistoryRow = styled(Flex).withConfig({
  shouldForwardProp: prop => !['$active'].includes(prop)
})`
  position: relative;
  align-items: center;
  min-width: 0;
  overflow: hidden;
  ${theme({ gap: '12px', px: '12px', py: '8px', borderRadius: 2 })}
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? 'rgba(59, 130, 246, 0.06)' : 'transparent'};
  border-left: 3px solid
    ${({ $active }) => ($active ? colors.link : 'transparent')};
  transition: background ${transition.medium}, border-color ${transition.medium};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  border-bottom: 1px solid ${colors.black05};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    background: ${({ $active }) =>
      $active ? 'rgba(59, 130, 246, 0.08)' : 'rgba(0, 0, 0, 0.03)'};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: -2px;
  }

  &:last-child {
    border-bottom: none;
  }

  @media (min-width: ${MOBILE_BP}px) {
    border-bottom: none;
    border-right: 1px solid ${colors.black05};

    &:nth-child(2n) {
      border-right: none;
    }

    &:nth-child(n + 3) {
      border-top: 1px solid ${colors.black05};
    }
  }

  @media (min-width: ${LAYOUT_PIVOT}px) {
    border-right: 1px solid ${colors.black05};

    &:nth-child(2n) {
      border-right: 1px solid ${colors.black05};
    }

    &:nth-child(3n) {
      border-right: none;
    }

    &:nth-child(n + 3) {
      border-top: none;
    }

    &:nth-child(n + 4) {
      border-top: 1px solid ${colors.black05};
    }
  }
`

const HistoryRowThumb = styled(Box)`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid ${colors.black10};
  background: #f1f5f9;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const RowDeleteButton = styled(Box).attrs({
  as: 'button',
  type: 'button'
})`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  min-height: 24px;
  border-radius: 50%;
  background: transparent;
  color: ${colors.black30};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity ${transition.short}, color ${transition.short},
    background ${transition.short};
  padding: 0;
  margin-left: auto;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  ${HistoryRow}:hover &,
  ${HistoryRow}:focus-within & {
    opacity: 1;
  }

  &:hover {
    color: white;
    background: rgba(220, 38, 38, 0.85);
  }

  &:focus-visible {
    opacity: 1;
    outline: 2px solid ${colors.link};
    outline-offset: 1px;
  }

  @media (max-width: ${MOBILE_BP - 1}px) {
    opacity: 1;
  }
`

const HistoryRowCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  min-width: 16px;
  cursor: pointer;
  accent-color: ${colors.link};
  margin: 0;
  flex-shrink: 0;

  @media (max-width: ${MOBILE_BP - 1}px) {
    width: 20px;
    height: 20px;
    min-width: 20px;
  }
`

const DownloadZipButton = styled(Flex).attrs({
  as: 'button',
  type: 'button'
})`
  ${theme({
    alignItems: 'center',
    gap: '6px',
    py: '6px',
    px: '12px',
    borderRadius: 2,
    fontSize: 0,
    fontWeight: 'bold',
    fontFamily: 'sans',
    cursor: 'pointer',
    border: 0
  })}
  white-space: nowrap;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  color: white;
  transition: opacity ${transition.medium}, transform ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }
`

const DeleteSelectedButton = styled(Flex).attrs({
  as: 'button',
  type: 'button'
})`
  ${theme({
    alignItems: 'center',
    gap: '6px',
    py: '6px',
    px: '12px',
    borderRadius: 2,
    fontSize: 0,
    fontWeight: 'bold',
    fontFamily: 'sans',
    cursor: 'pointer',
    border: 1,
    borderColor: 'black10'
  })}
  white-space: nowrap;
  background: white;
  color: ${colors.black60};
  transition: color ${transition.short}, border-color ${transition.short},
    background ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover:not(:disabled) {
    color: #dc2626;
    border-color: #dc2626;
    background: #fef2f2;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }
`

/* ─── Bulk Input & Progress ──────────────────────────── */

const BulkTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  max-height: 300px;
  resize: vertical;
  font-size: 16px;
  line-height: 1.6;
  ${theme({
    fontFamily: 'sans',
    p: '12px',
    borderRadius: 2,
    border: 1,
    borderColor: 'black10',
    color: 'black80'
  })}
  background: white;
  outline: none;
  transition: border-color ${transition.medium};

  &::placeholder {
    color: ${colors.black20};
  }

  &:focus {
    border-color: ${colors.link};
  }

  &[aria-invalid='true'] {
    border-color: #ef4444;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (max-width: ${MOBILE_BP - 1}px) {
    font-size: 16px;
  }
`

const ProgressBarTrack = styled(Box)`
  width: 100%;
  max-width: 400px;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
`

const ProgressBarFill = styled(Box)`
  height: 100%;
  background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%);
  border-radius: 3px;
  transition: width 300ms ease-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
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
  bulkProgress,
  onMediaTypeChange
}) => {
  const [urlError, setUrlError] = useState('')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleUrlsChange = useCallback(
    e => {
      const val = e.target.value
      setOptions(prev => ({ ...prev, urlsText: val }))
      if (urlError) setUrlError('')
    },
    [setOptions, urlError]
  )

  const handlePaste = useCallback(
    e => {
      e.preventDefault()
      const pasted = e.clipboardData.getData('text/plain')
      const el = e.target
      const { selectionStart, selectionEnd, value } = el
      const next =
        value.substring(0, selectionStart) +
        pasted +
        value.substring(selectionEnd)
      setOptions(prev => ({ ...prev, urlsText: next }))
      if (urlError) setUrlError('')
      const cursor = selectionStart + pasted.length
      window.requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = cursor
      })
    },
    [setOptions, urlError]
  )

  const parseUrls = useCallback(text => {
    if (!text || !text.trim()) return []
    return [
      ...new Set(
        text
          .split(/[\n,]+/)
          .map(s => s.trim())
          .filter(Boolean)
      )
    ]
  }, [])

  const detectedUrls = parseUrls(options.urlsText)

  const handleSubmit = useCallback(() => {
    if (detectedUrls.length === 0) {
      setUrlError('Please enter at least one URL')
      return
    }

    if (detectedUrls.length > MAX_URLS) {
      setUrlError(
        `Maximum ${MAX_URLS} URLs allowed. You entered ${detectedUrls.length}.`
      )
      return
    }

    const normalized = detectedUrls.map(u => prependHttp(u.trim()))
    const invalid = normalized.filter(u => !isUrl(u))

    if (invalid.length > 0) {
      setUrlError(
        invalid.length === 1
          ? `"${invalid[0]}" is not a valid URL`
          : `${invalid.length} invalid URLs found. Please check your list.`
      )
      return
    }

    setUrlError('')
    onSubmit(normalized)
  }, [detectedUrls, onSubmit])

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
        <Flex
          css={theme({
            justifyContent: 'space-between',
            alignItems: 'baseline'
          })}
        >
          <OptionLabel as='span'>Website URLs</OptionLabel>
          {detectedUrls.length > 0 && (
            <Text
              css={theme({
                fontSize: '11px',
                color:
                  detectedUrls.length > MAX_URLS ? 'fullscreen' : 'black30',
                fontFamily: 'sans',
                fontVariantNumeric: 'tabular-nums'
              })}
            >
              {detectedUrls.length}/{MAX_URLS}
            </Text>
          )}
        </Flex>
        <BulkTextarea
          id='pdf-urls'
          placeholder={
            'https://example.com\nhttps://github.com\nhttps://google.com\n…'
          }
          value={options.urlsText}
          onChange={handleUrlsChange}
          onPaste={handlePaste}
          onKeyDown={e => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
              if (isLoading) {
                e.preventDefault()
                return
              }
              e.preventDefault()
              handleSubmit()
            }
          }}
          rows={5}
          spellCheck={false}
          aria-describedby={urlError ? 'pdf-url-error' : undefined}
          aria-invalid={!!urlError}
        />
        <Text
          css={theme({
            fontSize: '11px',
            color: 'black30',
            fontFamily: 'sans',
            pt: '4px'
          })}
        >
          One URL per line or comma-separated ·&nbsp;⌘+Enter to generate
        </Text>
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
            aria-controls='pdf-batch-advanced-options'
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
              id='pdf-batch-advanced-options'
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
          disabled={isLoading}
          loading={isLoading}
        >
          <Flex
            css={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: space[2]
            }}
          >
            {isLoading ? (
              <>
                <Spinner width='16px' height='14px' />
                Generating {bulkProgress.current} of {bulkProgress.total}…
              </>
            ) : (
              <>
                <FileText size={16} />
                {detectedUrls.length > 1
                  ? `Generate ${Math.min(detectedUrls.length, MAX_URLS)} PDFs`
                  : 'Generate PDF'}
              </>
            )}
          </Flex>
        </GenerateButton>
      </StickyGenerateWrapper>
    </Box>
  )
}

/* ─── PDF History ────────────────────────────────────── */

const PdfHistory = ({
  entries,
  activeId,
  onSelect,
  onDelete,
  disabled,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
  onDownloadZip,
  onDeleteSelected,
  isZipping
}) => {
  const scrollRef = useRef(null)
  const prevFirstIdRef = useRef(null)
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const confirmTimerRef = useRef(null)

  useEffect(() => {
    const firstId = entries?.[0]?.id
    if (firstId && firstId !== prevFirstIdRef.current && scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
    prevFirstIdRef.current = firstId
  }, [entries])

  useEffect(() => {
    if (!confirmingDelete) return
    confirmTimerRef.current = setTimeout(() => setConfirmingDelete(false), 3000)
    return () => clearTimeout(confirmTimerRef.current)
  }, [confirmingDelete])

  useEffect(() => {
    setConfirmingDelete(false)
  }, [selectedIds])

  if (!entries || entries.length === 0) return null

  const allSelected = selectedIds.length === entries.length
  const someSelected = selectedIds.length > 0

  return (
    <Box css={theme({ pt: [3, 3, 4, 4] })}>
      <Flex
        css={theme({
          alignItems: 'baseline',
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
          Recent PDFs
        </Text>
        <Text
          css={theme({
            fontSize: '11px',
            color: 'black30',
            fontFamily: 'sans',
            fontVariantNumeric: 'tabular-nums'
          })}
        >
          {entries.length}/{MAX_HISTORY_ITEMS}
        </Text>
      </Flex>
      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'space-between',
          pb: 2,
          gap: 2
        })}
      >
        <CheckboxLabel>
          <input
            type='checkbox'
            checked={allSelected}
            ref={el => {
              if (el) el.indeterminate = someSelected && !allSelected
            }}
            onChange={() => (allSelected ? onDeselectAll() : onSelectAll())}
          />
          <Text css={theme({ pl: 2, fontSize: 0, color: 'black60' })}>
            Select all
          </Text>
        </CheckboxLabel>
        {someSelected && (
          <Flex css={theme({ alignItems: 'center', gap: 2 })}>
            <Text
              css={theme({
                fontSize: '11px',
                color: 'black40',
                fontFamily: 'sans',
                fontVariantNumeric: 'tabular-nums'
              })}
            >
              {selectedIds.length} selected
            </Text>
            <DeleteSelectedButton
              onClick={() => {
                if (confirmingDelete) {
                  setConfirmingDelete(false)
                  onDeleteSelected()
                } else {
                  setConfirmingDelete(true)
                }
              }}
              disabled={disabled}
              aria-label={
                confirmingDelete
                  ? `Confirm deletion of ${selectedIds.length} PDFs`
                  : `Delete ${selectedIds.length} selected PDFs`
              }
              style={
                confirmingDelete
                  ? {
                    color: '#dc2626',
                    borderColor: '#dc2626',
                    background: '#fef2f2'
                  }
                  : undefined
              }
            >
              <Trash2 size={14} />
              {confirmingDelete ? 'Are you sure?' : 'Delete'}
            </DeleteSelectedButton>
            <DownloadZipButton
              onClick={onDownloadZip}
              disabled={isZipping || disabled}
            >
              {isZipping ? (
                <>
                  <Spinner width='14px' height='14px' />
                  Creating ZIP…
                </>
              ) : (
                <>
                  <Download size={14} />
                  Download ZIP
                </>
              )}
            </DownloadZipButton>
          </Flex>
        )}
      </Flex>
      <Box
        css={theme({
          border: 1,
          borderColor: 'black10',
          borderRadius: 3,
          overflow: 'hidden',
          bg: 'white'
        })}
      >
        <HistoryListContainer
          ref={scrollRef}
          role='list'
          aria-label='PDF history'
        >
          {entries.map(entry => {
            const isSelected = selectedIds.includes(entry.id)
            return (
              <HistoryRow
                key={entry.id}
                role='listitem'
                $active={entry.id === activeId}
                tabIndex={disabled ? -1 : 0}
                aria-label={`Load PDF of ${entry.settings.url}`}
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
                <HistoryRowCheckbox
                  checked={isSelected}
                  onClick={e => e.stopPropagation()}
                  onChange={() => onToggleSelect(entry.id)}
                  aria-label={`Select PDF of ${entry.settings.url}`}
                />
                <HistoryRowThumb>
                  <img
                    src={entry.thumbnail || entry.screenshot?.url}
                    alt={`Preview of ${entry.settings.url}`}
                    loading='lazy'
                    draggable='false'
                  />
                </HistoryRowThumb>
                <Box css={{ flex: 1, minWidth: 0 }}>
                  <Text
                    css={theme({
                      fontSize: '13px',
                      fontFamily: 'sans',
                      color: entry.id === activeId ? 'link' : 'black80',
                      fontWeight: entry.id === activeId ? 'bold' : 'regular',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    })}
                    title={entry.settings.url}
                  >
                    {formatHistoryUrl(entry.settings.url)}
                  </Text>
                  <Text
                    css={theme({
                      fontSize: '11px',
                      color: 'black30',
                      fontFamily: 'sans',
                      pt: '2px'
                    })}
                  >
                    {entry.settings.format}
                    {entry.settings.landscape ? ' · Landscape' : ''}
                  </Text>
                </Box>
                <RowDeleteButton
                  aria-label={`Delete PDF of ${entry.settings.url}`}
                  disabled={disabled || undefined}
                  onClick={e => {
                    e.stopPropagation()
                    if (!disabled) onDelete(entry.id)
                  }}
                >
                  <X size={14} />
                </RowDeleteButton>
              </HistoryRow>
            )
          })}
        </HistoryListContainer>
      </Box>
    </Box>
  )
}

/* ─── Bulk Preview Panel ──────────────────────────────── */

const BulkPreview = ({
  bulkState,
  bulkProgress,
  bulkResults,
  bulkTotalMs,
  bulkTotalBytes,
  onDownloadZip,
  isZipping,
  onReset
}) => {
  const successCount = bulkResults.filter(r => r.success).length
  const failedResults = bulkResults.filter(r => !r.success)
  const hasRateLimit = failedResults.some(r => r.error?.statusCode === 429)

  if (bulkState === 'idle') {
    return (
      <PreviewCanvas>
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
            text='Paste your URLs and click Generate'
            subtext={`Up to ${MAX_URLS} PDFs at once`}
          />
        </FadeIn>
      </PreviewCanvas>
    )
  }

  if (bulkState === 'processing') {
    const completedCount = bulkResults.length
    const pct =
      bulkProgress.total > 0 ? (completedCount / bulkProgress.total) * 100 : 0

    return (
      <PreviewCanvas>
        <FadeIn
          key='processing'
          css={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '380px',
            '@media screen and (min-width: 40em)': { minHeight: '520px' }
          }}
        >
          <Flex
            css={theme({
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              px: 4,
              pt: 4,
              pb: 3,
              textAlign: 'center',
              gap: 3
            })}
          >
            <Spinner width='32px' height='24px' />
            <Box>
              <Text
                aria-live='polite'
                css={theme({
                  fontSize: 3,
                  fontWeight: 'bold',
                  color: 'black80',
                  fontFamily: 'sans'
                })}
              >
                Generating PDF {bulkProgress.current} of {bulkProgress.total}…
              </Text>
              <Box css={{ minHeight: '24px' }}>
                {bulkProgress.currentUrl && (
                  <Text
                    css={theme({
                      fontSize: '18px',
                      color: 'black50',
                      fontFamily: 'sans',
                      pt: 1,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '400px',
                      mx: 'auto'
                    })}
                  >
                    {formatHistoryUrl(bulkProgress.currentUrl)}
                  </Text>
                )}
              </Box>
            </Box>
            <ProgressBarTrack>
              <ProgressBarFill style={{ width: `${pct}%` }} />
            </ProgressBarTrack>
          </Flex>
          <Flex
            css={theme({
              flexDirection: 'column',
              alignItems: 'center',
              px: 4,
              pt: 3,
              pb: 4
            })}
          >
            <AnimatedResultsList results={bulkResults} />
          </Flex>
        </FadeIn>
      </PreviewCanvas>
    )
  }

  /* bulkState === 'done' */
  return (
    <PreviewCanvas>
      <FadeIn
        key='done'
        css={theme({
          display: 'flex',
          flexDirection: 'column',
          minHeight: ['380px', '380px', '520px']
        })}
      >
        <Flex
          css={theme({
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            px: 4,
            textAlign: 'center',
            gap: 3
          })}
        >
          {failedResults.length === 0 ? (
            <>
              <Box
                css={theme({
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                })}
                style={{
                  background:
                    'linear-gradient(225deg, #22c55e22 0%, #16a34a22 100%)'
                }}
              >
                <CheckCircle size={28} color='#22c55e' />
              </Box>
              <Text
                css={theme({
                  fontSize: 3,
                  fontWeight: 'bold',
                  color: 'black80',
                  fontFamily: 'sans'
                })}
              >
                {bulkResults.length === 1
                  ? 'PDF ready!'
                  : `All ${bulkResults.length} PDFs ready!`}
              </Text>
              <Text
                css={theme({
                  fontSize: 1,
                  color: 'black50',
                  fontFamily: 'sans'
                })}
              >
                Your ZIP file is downloading. Check your downloads folder.
              </Text>
              {(bulkTotalMs != null || bulkTotalBytes > 0) && (
                <Text
                  css={theme({
                    fontSize: 0,
                    color: 'black30',
                    fontFamily: 'mono'
                  })}
                >
                  {[
                    bulkTotalMs != null &&
                      `Total time: ${formatDuration(bulkTotalMs)}`,
                    bulkTotalBytes > 0 && formatFileSize(bulkTotalBytes)
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </Text>
              )}
            </>
          ) : (
            <>
              <Box
                css={theme({
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mt: 4
                })}
                style={{
                  background:
                    'linear-gradient(225deg, #f59e0b22 0%, #d9770622 100%)'
                }}
              >
                <AlertTriangle size={28} color='#f59e0b' />
              </Box>
              <Text
                css={theme({
                  fontSize: 3,
                  fontWeight: 'bold',
                  color: 'black80',
                  fontFamily: 'sans'
                })}
              >
                {successCount} of {bulkResults.length} PDFs ready
              </Text>
              {successCount > 0 && (
                <DownloadZipButton onClick={onDownloadZip} disabled={isZipping}>
                  {isZipping ? (
                    <>
                      <Spinner width='14px' height='14px' />
                      Creating ZIP…
                    </>
                  ) : (
                    <>
                      <Download size={14} />
                      Download ZIP ({successCount}{' '}
                      {successCount === 1 ? 'PDF' : 'PDFs'})
                    </>
                  )}
                </DownloadZipButton>
              )}
              <Box
                css={theme({
                  width: '100%',
                  maxWidth: '500px',
                  textAlign: 'left',
                  border: 1,
                  borderColor: 'black10',
                  borderRadius: 2,
                  p: 3,
                  bg: 'white'
                })}
              >
                <Text
                  css={theme({
                    fontSize: 0,
                    fontWeight: 'bold',
                    color: 'black60',
                    fontFamily: 'sans',
                    pb: 2
                  })}
                >
                  Failed requests
                </Text>
                <Box
                  css={theme({
                    maxHeight: `${5 * 46}px`,
                    overflowY: 'auto',
                    overscrollBehavior: 'contain'
                  })}
                >
                  {failedResults.map((r, i) => (
                    <Flex
                      key={i}
                      css={theme({
                        gap: 2,
                        py: '6px',
                        alignItems: 'flex-start',
                        borderBottom: i < failedResults.length - 1 ? 1 : 0,
                        borderColor: 'black05'
                      })}
                    >
                      <X
                        size={14}
                        color='#ef4444'
                        style={{ flexShrink: 0, marginTop: '5px' }}
                      />
                      <Box css={{ minWidth: 0, flex: 1 }}>
                        <Text
                          css={theme({
                            fontSize: 0,
                            color: 'black80',
                            fontFamily: 'sans',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          })}
                        >
                          {r.url}
                        </Text>
                        <Text
                          css={theme({
                            fontSize: '11px',
                            color: 'black40',
                            fontFamily: 'sans',
                            pt: '2px'
                          })}
                        >
                          {r.error?.message}
                        </Text>
                      </Box>
                    </Flex>
                  ))}
                </Box>
              </Box>
              {hasRateLimit && (
                <Box
                  css={theme({
                    width: '100%',
                    maxWidth: '500px',
                    textAlign: 'left',
                    borderRadius: 2,
                    p: 3,
                    mb: 4
                  })}
                  style={{
                    background: '#fffbeb',
                    border: '1px solid #fef3c7'
                  }}
                >
                  <Text
                    css={theme({
                      fontSize: 1,
                      fontWeight: 'bold',
                      fontFamily: 'sans',
                      pb: 1
                    })}
                    style={{ color: '#92400e' }}
                  >
                    Daily limit reached
                  </Text>
                  <Text
                    css={theme({
                      fontSize: 0,
                      fontFamily: 'sans',
                      lineHeight: 2
                    })}
                    style={{ color: '#78350f' }}
                  >
                    Free users can generate up to 50 PDFs per day. Your limit
                    will reset tomorrow. For unlimited access, check out our{' '}
                    <Link href='/#pricing'>API plans</Link> or write to{' '}
                    <Link href='mailto:hello@microlink.io'>
                      hello@microlink.io
                    </Link>{' '}
                    if you need something else.
                  </Text>
                </Box>
              )}
              {(bulkTotalMs != null || bulkTotalBytes > 0) && (
                <Text
                  css={theme({
                    fontSize: 0,
                    color: 'black30',
                    fontFamily: 'mono'
                  })}
                >
                  {[
                    bulkTotalBytes > 0 && formatFileSize(bulkTotalBytes),
                    bulkTotalMs != null &&
                      `Total time: ${formatDuration(bulkTotalMs)}`
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </Text>
              )}
            </>
          )}
          {!hasRateLimit && (
            <Button
              onClick={onReset}
              css={theme({ mt: 2 })}
              aria-label='Start a new batch of PDFs'
            >
              <Caps css={theme({ fontSize: 0 })}>Generate more PDFs</Caps>
            </Button>
          )}
        </Flex>
      </FadeIn>
    </PreviewCanvas>
  )
}

/* ─── Main Tool Section ────────────────────────────────── */

const PdfBatchTool = () => {
  const [options, setOptions] = useState({
    urlsText: '',
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

  const [bulkState, setBulkState] = useState('idle')
  const [bulkProgress, setBulkProgress] = useState({
    current: 0,
    total: 0,
    currentUrl: ''
  })
  const [bulkResults, setBulkResults] = useState([])
  const [bulkTotalMs, setBulkTotalMs] = useState(null)
  const [bulkTotalBytes, setBulkTotalBytes] = useState(null)

  const [localStorageData] = useLocalStorage('mql-api-key')
  const [history, setHistory] = useLocalStorage(PDF_HISTORY_KEY, [])
  const [savedMediaType, setSavedMediaType] = useLocalStorage(
    'pdf-media-type',
    'screen'
  )
  const [activeHistoryId, setActiveHistoryId] = useState(null)
  const [historyReady, setHistoryReady] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const [isZipping, setIsZipping] = useState(false)

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

  const downloadZipFromEntries = useCallback(async selected => {
    if (selected.length === 0) return
    setIsZipping(true)
    try {
      const zip = new JSZip()
      const nameCount = {}
      await Promise.all(
        selected.map(async entry => {
          try {
            const resp = await fetch(entry.pdf.url)
            const blob = await resp.blob()
            const slug = buildPdfFilename(entry.settings.url)
            nameCount[slug] = (nameCount[slug] || 0) + 1
            const suffix = nameCount[slug] > 1 ? `-${nameCount[slug]}` : ''
            zip.file(`${slug}${suffix}.pdf`, blob)
          } catch {
            /* skip failed fetches */
          }
        })
      )
      const content = await zip.generateAsync({ type: 'blob' })
      const blobUrl = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = 'microlink-pdfs.zip'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(blobUrl)
    } catch {
      /* zip generation failed */
    } finally {
      setIsZipping(false)
    }
  }, [])

  const handleBulkSubmit = useCallback(
    async urls => {
      setBulkState('processing')
      setBulkProgress({ current: 0, total: urls.length, currentUrl: '' })
      setBulkResults([])
      setBulkTotalMs(null)
      setBulkTotalBytes(null)

      const results = []
      const newEntryIds = []
      let hitRateLimit = false

      for (let i = 0; i < urls.length; i++) {
        const url = urls[i]
        setBulkProgress({
          current: i + 1,
          total: urls.length,
          currentUrl: url
        })

        if (hitRateLimit) {
          const result = {
            url,
            success: false,
            duration: null,
            error: {
              message: 'Skipped — daily rate limit reached',
              statusCode: 429
            }
          }
          results.push(result)
          setBulkResults([...results])
          continue
        }

        const reqStart = Date.now()
        try {
          const pdfOpts = {
            format: options.format,
            landscape: options.landscape,
            scale: Number(options.scale) || 0.6
          }
          if (options.margin.trim()) pdfOpts.margin = options.margin.trim()
          if (options.width.trim()) pdfOpts.width = options.width.trim()
          if (options.height.trim()) pdfOpts.height = options.height.trim()

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
            mediaType: options.mediaType,
            ...(options.waitForLoad && { waitForTimeout: 4000 })
          }
          const queryStr = buildMqlQuery(url, mqlOpts)
          const response = await mql(url, mqlOpts)
          const duration = Date.now() - reqStart
          const headerStats = extractNerdStats(response?.response?.headers)
          const responseData = JSON.stringify(
            { status: response.status, data: response.data },
            null,
            2
          )

          if (response?.data?.pdf) {
            const { size_pretty: sizePretty, size: sizeBytes } =
              response.data.pdf
            results.push({
              url,
              success: true,
              duration,
              sizePretty,
              sizeBytes,
              data: response.data,
              nerdStats: headerStats,
              responseData,
              mqlQuery: queryStr
            })
            setBulkResults([...results])

            const entryId = `${Date.now()}-${i}`
            const thumbnail = response.data.screenshot
              ? await createThumbnail(response.data.screenshot.url, 80, 0.8)
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
                  responseData,
                  mqlQuery: queryStr,
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
            newEntryIds.push(entryId)
          } else {
            results.push({
              url,
              success: false,
              duration,
              error: { message: 'No PDF returned' }
            })
            setBulkResults([...results])
          }
        } catch (err) {
          const duration = Date.now() - reqStart
          const statusCode = err.statusCode || err.code
          if (statusCode === 429) hitRateLimit = true
          results.push({
            url,
            success: false,
            duration,
            error: {
              message:
                err.description || err.message || 'Failed to generate PDF',
              statusCode
            }
          })
          setBulkResults([...results])
        }
      }

      setBulkTotalMs(results.reduce((sum, r) => sum + (r.duration ?? 0), 0))
      setBulkTotalBytes(results.reduce((sum, r) => sum + (r.sizeBytes ?? 0), 0))
      setBulkState('done')
      setSelectedIds(newEntryIds)

      const allSucceeded = results.every(r => r.success)
      if (allSucceeded && results.length > 0) {
        const successEntries = results
          .filter(r => r.success)
          .map((r, idx) => ({
            pdf: r.data.pdf,
            settings: { url: r.url },
            id: newEntryIds[idx]
          }))
        await downloadZipFromEntries(successEntries)
      }
    },
    [options, localStorageData, setHistory, downloadZipFromEntries]
  )

  const handleHistorySelect = useCallback(entry => {
    setActiveHistoryId(entry.id)
    if (entry.pdf?.url) {
      window.open(entry.pdf.url, '_blank', 'noopener,noreferrer')
    }
  }, [])

  const handleHistoryDelete = useCallback(
    id => {
      setHistory(prev => {
        const items = Array.isArray(prev) ? prev : []
        return items.filter(entry => entry.id !== id)
      })
      setActiveHistoryId(prev => (prev === id ? null : prev))
      setSelectedIds(prev => prev.filter(x => x !== id))
    },
    [setHistory]
  )

  const handleToggleSelect = useCallback(id => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }, [])

  const handleSelectAll = useCallback(() => {
    const entries = Array.isArray(history) ? history : []
    setSelectedIds(entries.map(e => e.id))
  }, [history])

  const handleDeselectAll = useCallback(() => {
    setSelectedIds([])
  }, [])

  const handleDeleteSelected = useCallback(() => {
    if (selectedIds.length === 0) return
    setHistory(prev => {
      const items = Array.isArray(prev) ? prev : []
      return items.filter(entry => !selectedIds.includes(entry.id))
    })
    setActiveHistoryId(prev => (selectedIds.includes(prev) ? null : prev))
    setSelectedIds([])
  }, [selectedIds, setHistory])

  const handleDownloadZip = useCallback(async () => {
    const entries = Array.isArray(history) ? history : []
    const selected = entries.filter(e => selectedIds.includes(e.id))
    await downloadZipFromEntries(selected)
  }, [history, selectedIds, downloadZipFromEntries])

  const handleReset = useCallback(() => {
    setBulkState('idle')
    setBulkResults([])
    setBulkTotalMs(null)
    setBulkTotalBytes(null)
    setBulkProgress({ current: 0, total: 0, currentUrl: '' })
  }, [])

  const isProcessing = bulkState === 'processing'

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
        <OptionsPanelOuter
          css={theme({ minHeight: ['auto', 'auto', 550, 550] })}
        >
          <OptionsPanel
            options={options}
            setOptions={setOptions}
            onSubmit={handleBulkSubmit}
            isLoading={isProcessing}
            bulkProgress={bulkProgress}
            onMediaTypeChange={setSavedMediaType}
          />
        </OptionsPanelOuter>

        <PreviewOuter css={theme({ minHeight: ['auto', 'auto', 550, 550] })}>
          <BulkPreview
            bulkState={bulkState}
            bulkProgress={bulkProgress}
            bulkResults={bulkResults}
            bulkTotalMs={bulkTotalMs}
            bulkTotalBytes={bulkTotalBytes}
            onDownloadZip={handleDownloadZip}
            isZipping={isZipping}
            onReset={handleReset}
          />
        </PreviewOuter>
      </ToolLayout>

      {historyReady && (
        <PdfHistory
          entries={Array.isArray(history) ? history : []}
          activeId={activeHistoryId}
          onSelect={handleHistorySelect}
          onDelete={handleHistoryDelete}
          disabled={isProcessing}
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onDownloadZip={handleDownloadZip}
          onDeleteSelected={handleDeleteSelected}
          isZipping={isZipping}
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
      Bulk Convert Multiple URLs to PDF
    </Heading>
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [2, 2, 3, 3],
        px: 3,
        maxWidth: '100%',
        fontSize: [2, 2, '24px', '28px']
      })}
    >
      Paste a URL list to batch convert up to 50 web pages into PDF documents.
      Download your results instantly as a ZIP file.
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
      How to bulk download PDFs from a URL list
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
                color: 'black60',
                lineHeight: 2,
                pt: 1
              })}
            >
              {step.description}
            </Text>
          </Box>
        </Flex>
      ))}
    </Box>
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
      Why bulk convert URLs to PDF?
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
        How can a bulk URL to PDF tool be free?
      </Text>
      <Text
        css={theme({ fontSize: 2, color: 'black80', lineHeight: 2, mt: 2 })}
      >
        This <b>batch PDF converter</b> is built on{' '}
        <Link href='/pdf'>Microlink's PDF API</Link> — the same infrastructure
        that processes millions of requests per week for paying customers. You
        get the same speed, quality, and reliability at no cost for bulk
        downloads.
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
          alt='Code snippet demonstrating how to bulk convert URLs to PDF using the Microlink Node.js API'
        />
      </Flex>
    }
  />
)

/* ─── Use Cases ───────────────────────────────────────── */

const USE_CASES = [
  {
    title: 'For archivists & researchers',
    items: [
      'Bulk download PDFs from a URL list for offline archival',
      'Batch convert entire websites to searchable PDF collections',
      'Preserve web content before it changes or disappears',
      'Generate citation-ready document snapshots at scale'
    ],
    link: {
      href: '/docs/guides/pdf/page-preparation',
      alt: 'PDF page preparation guide',
      text: 'Page preparation guide'
    }
  },
  {
    title: 'For legal & compliance',
    items: [
      'Bulk convert multiple URLs to PDF for evidence records',
      'Batch archive terms of service and policy changes across sites',
      'Generate compliance documentation from a URL list',
      'Produce timestamped website-to-PDF snapshots in bulk'
    ],
    link: {
      href: '/docs/guides/pdf/embedding',
      alt: 'PDF embedding and delivery',
      text: 'Embedding guide'
    }
  },
  {
    title: 'For developers',
    items: [
      'Automate batch URL to PDF generation via REST API',
      'Bulk convert multiple dashboards and reports to PDF',
      'Build batch PDF export pipelines for web applications',
      'Generate documentation PDFs from live sites at scale'
    ],
    link: {
      href: '/docs/api/parameters/pdf',
      alt: 'Bulk PDF API reference',
      text: 'API reference'
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
      Who needs to bulk convert URLs to PDF?
    </Subhead>
    <Caption css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.small })}>
      From web archiving to automated document generation, bulk PDF download
      from a URL list saves hours across every team.
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
            <Flex css={theme({ pt: 3, justifyContent: 'flex-start' })}>
              <Link alt={link.alt} href={link.href}>
                {link.text}
              </Link>
            </Flex>
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
        question: 'Is this bulk URL to PDF tool really free?',
        answer: (
          <>
            <div>
              Yes! You can <b>bulk convert up to 50&nbsp;URLs to PDF</b> per day
              for free, with no credit card or account required. Free PDFs
              include every feature — paper format, margins, scaling, page
              ranges, and landscape mode.
            </div>
            <div>
              Need higher limits for automated <b>batch URL to PDF</b>{' '}
              processing? Check our <Link href='/#pricing'>pricing plans</Link>{' '}
              for unlimited conversions and priority processing, or write to{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
            </div>
          </>
        )
      },
      {
        question: 'How do I bulk download PDFs from a URL list online?',
        answer: (
          <>
            <div>
              Paste your <b>URL list</b> (up to 50 links, one per line or
              comma-separated), choose your settings, and click{' '}
              <b>Generate PDFs</b>. The tool <b>batch converts</b> every page
              and packages all documents into a ZIP file that downloads
              automatically.
            </div>
            <div>
              All results are saved to your browser's local storage for
              24&nbsp;hours so you can re-download anytime. For a single URL,
              use the{' '}
              <Link href='/tools/website-to-pdf'>webpage to PDF converter</Link>
              .
            </div>
          </>
        )
      },
      {
        question: 'Can I set a page range when batch converting URLs to PDF?',
        answer: (
          <>
            <div>
              Yes. Under <b>Advanced</b> settings, set a <b>first page</b> and{' '}
              <b>last page</b> to export only the pages you need from each URL.
              Leave the fields empty to include all pages. The same page range
              applies to every URL in the batch. Read the{' '}
              <Link href='/docs/api/parameters/pdf/pageRanges'>
                pageRanges reference
              </Link>{' '}
              for more details.
            </div>
          </>
        )
      },
      {
        question: 'What happens if some PDFs fail during bulk conversion?',
        answer: (
          <>
            <div>
              If a URL fails, the tool continues processing the remaining
              entries in your list. At the end you'll see a summary of which
              succeeded and which failed, along with the reason. Successful PDFs
              are automatically selected so you can <b>bulk download</b> just
              the working ones as a ZIP. Check the{' '}
              <Link href='/docs/guides/pdf/troubleshooting'>
                troubleshooting guide
              </Link>{' '}
              for common failure causes.
            </div>
          </>
        )
      },
      {
        question: 'Can I automate batch URL to PDF conversion with an API?',
        answer: (
          <>
            <div>
              Absolutely. This tool is built on the{' '}
              <Link href='/docs/api/parameters/pdf'>Microlink PDF API</Link>,
              which provides a simple REST endpoint. Send a URL, get back a PDF
              — integrate with any language (Node.js, Python, Ruby, Go) or plain
              cURL.
            </div>
            <div>
              For Node.js, use the{' '}
              <Link href='https://www.npmjs.com/package/@microlink/mql'>
                @microlink/mql
              </Link>{' '}
              SDK. Loop over your URL list, call the API for each, and you have
              a fully automated <b>batch PDF pipeline</b>.
            </div>
          </>
        )
      },
      {
        question: 'How does caching work for bulk downloads?',
        answer: (
          <>
            <div>
              PDFs are cached on our global CDN (240+ edge locations) by
              default. Cached responses are served instantly and{' '}
              <b>don't count against your daily limit</b>. Cache lasts for
              24&nbsp;hours. Re-run the same URL list and cached entries resolve
              immediately. Read the{' '}
              <Link href='/docs/guides/pdf/caching-and-performance'>
                caching &amp; performance guide
              </Link>{' '}
              for fine-grained control.
            </div>
          </>
        )
      },
      {
        question:
          'What is the difference between the single and bulk PDF tool?',
        answer: (
          <>
            <div>
              The <Link href='/tools/website-to-pdf'>single tool</Link> converts
              one webpage at a time and lets you preview the PDF inline. This{' '}
              <b>bulk tool</b> accepts up to 50&nbsp;URLs, converts them all
              sequentially, and packages everything into a ZIP download.
            </div>
            <div>
              Both tools share the same settings — paper format, orientation,
              margins, scale, page ranges, and PDF&nbsp;appearance — and are
              powered by the same <Link href='/pdf'>Microlink PDF API</Link>.
            </div>
          </>
        )
      },
      {
        question: 'Any question or issue?',
        answer: (
          <>
            <span>
              We're always available at:{' '}
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
        <SectionIcon icon={FileText} />
      </Flex>
      <Subhead css={theme({ fontSize: 4 })}>
        Bulk URL to PDF API Documentation
      </Subhead>
      <Caption
        css={theme({ pt: 3, maxWidth: layout.normal, mx: 'auto', fontSize: 3 })}
      >
        Automate batch URL to PDF conversion with a single REST call. Explore
        the full API reference with interactive examples, SDKs for every
        language, and ready-to-use code snippets for bulk processing.
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
    title='Bulk Download PDF from URL List — Batch Webpage Converter'
    noSuffix
    description='Free online tool to bulk convert multiple URLs to PDF. Paste your URL list, batch process up to 50 web pages, and download them all as a single ZIP file.'
    image='https://cdn.microlink.io/banner/pdf.jpeg'
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        '@id': 'https://microlink.io/tools/website-to-pdf/batch',
        name: 'Microlink Bulk URL to PDF Converter',
        description:
          'Free bulk URL to PDF converter. Paste up to 50 URLs, batch convert every page to PDF, and download them all as a ZIP file. Built on Microlink PDF API.',
        url: 'https://microlink.io/tools/website-to-pdf/batch',
        applicationCategory: ['DeveloperApplication', 'Tool'],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Free tier with 50 bulk PDF conversions per day'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is this bulk URL to PDF tool really free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can bulk convert up to 50 URLs to PDF per day for free, with no credit card or account required. Free PDFs include every feature — paper format, margins, scaling, page ranges, and landscape mode.'
            }
          },
          {
            '@type': 'Question',
            name: 'How do I bulk download PDFs from a URL list online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Paste your URL list (up to 50 links, one per line or comma-separated), choose your settings, and click Generate PDFs. The tool batch converts every page and packages all documents into a ZIP file that downloads automatically.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I set a page range when batch converting URLs to PDF?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Under Advanced settings, set a first page and last page to export only the pages you need from each URL. Leave the fields empty to include all pages.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I automate batch URL to PDF conversion with an API?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Absolutely. This tool is built on the Microlink PDF API, which provides a simple REST endpoint. Send a URL, get back a PDF — integrate with any language (Node.js, Python, Ruby, Go) or plain cURL.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the difference between the single and bulk PDF tool?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The single tool converts one webpage at a time with inline preview. This bulk tool accepts up to 50 URLs, converts them all sequentially, and packages everything into a ZIP download. Both share the same settings and are powered by the Microlink PDF API.'
            }
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: 'How to bulk download PDFs from a URL list online',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Paste your URL list',
            text: 'Add up to 50 URLs at once — one per line or comma-separated. Any publicly accessible web page works.'
          },
          {
            '@type': 'HowToStep',
            name: 'Choose your settings',
            text: 'Pick a paper format (A4, Letter, Legal), orientation, PDF appearance, and optionally set advanced options like scale, margins, or page ranges.'
          },
          {
            '@type': 'HowToStep',
            name: 'Bulk convert and download',
            text: 'Click Generate PDFs and watch every URL converted one by one. Download all PDFs as a single ZIP file.'
          }
        ]
      }
    ]}
  />
)

/* ─── Page Component ───────────────────────────────────── */

const WebsiteToPdfBatchPage = () => (
  <Layout>
    <Hero />
    <PdfBatchTool />
    <HowItWorks />
    <Explanation />
    <UseCases />
    <Banner />
    <Features
      css={theme({ px: 4, pt: [5, 5, 6, 6] })}
      title={
        <Subhead css={{ width: '100%', textAlign: 'left' }}>
          Bulk URL to PDF API{' '}
          <span
            css={{
              display: 'block',
              color: '#fd494a',
              width: '100%',
              textAlign: 'left'
            }}
          >
            Batch Convert URLs at Scale.
          </span>
        </Subhead>
      }
      caption={
        <>
          Need to automate <b>batch URL to PDF</b> conversion? No servers to
          maintain, no headless browsers to manage. Microlink's{' '}
          <Link href='/pdf'>PDF API</Link> handles the infrastructure so you can
          bulk convert hundreds of URLs programmatically.
        </>
      }
      features={FEATURES_LIST}
    />
    <PdfApiDocsCard />
    <ProductInformation />
  </Layout>
)

export default WebsiteToPdfBatchPage
