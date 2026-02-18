/* global fetch, ResizeObserver */

import { borders, colors, layout, theme, transition, space } from 'theme'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
  AlertTriangle,
  Camera,
  CheckCircle,
  Clipboard,
  Download,
  ExternalLink,
  Globe,
  ArrowRight,
  Code,
  HelpCircle,
  Link2,
  Settings,
  Trash2,
  X
} from 'react-feather'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import styled, { keyframes } from 'styled-components'
import get from 'dlv'
import mql from '@microlink/mql'
import JSZip from 'jszip'

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

const FORMAT_OPTIONS = [
  { value: 'png', label: 'PNG' },
  { value: 'jpeg', label: 'JPG' }
]

const SCREENSHOT_HISTORY_KEY = 'screenshot-history/bulk'
const MAX_HISTORY_ITEMS = 50
const MAX_URLS = 50
const HISTORY_MAX_AGE_MS = 24 * 60 * 60 * 1000
const THUMB_SIZE = 80
const THUMB_QUALITY = 0.8

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
    title: 'Paste your URLs',
    description: 'Add up to 50 URLs at once, one per line or comma-separated.'
  },
  {
    icon: Settings,
    title: 'Configure Options',
    description: 'Choose from desktop, tablet, or mobile viewports.'
  },
  {
    icon: Camera,
    title: 'Generate Screenshots',
    description:
      'Click the button and watch them captured one by one in real time.'
  },
  {
    icon: Download,
    title: 'Download ZIP',
    description:
      'Get all your screenshots in a single ZIP file saved to your desktop.'
  }
]

const REASON_TO_USE = [
  {
    title: 'Capture multiple URLs at once',
    description:
      'Paste up to 50 URLs and generate all screenshots in one batch. No need to capture them one by one — save hours of repetitive manual work.'
  },
  {
    title: 'Download everything as a ZIP',
    description:
      'All your bulk screenshots are packaged into a single ZIP file that downloads automatically. Ready to share with your team, archive, or use in your workflow.'
  },
  {
    title: 'Free + No login required',
    description:
      'Take up to 50 bulk website screenshots per day for free. No account needed, no credit card, no watermarks on your images.'
  },
  {
    title: 'Desktop, tablet, and mobile',
    description:
      'Choose from preset device viewports or enter custom dimensions. Capture how any website looks on every screen size in a single batch.'
  },
  {
    title: 'Full-page screenshots',
    description:
      'Capture the entire page from top to bottom, not just the visible viewport. Useful for long landing pages, documentation sites, or full website audits.'
  },
  {
    title: 'Block ads and cookie banners',
    description:
      'Automatically remove ads and cookie consent popups before capturing. Get clean, professional screenshots of every page without visual clutter.'
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
                whiteSpace: 'nowrap'
              })}
            >
              {formatHistoryUrl(item.data.url)}
            </Text>
          </Wrapper>
        )
      })}
    </Box>
  )
}

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

const OptionsPanel = ({
  options,
  setOptions,
  onSubmit,
  isLoading,
  bulkProgress
}) => {
  const [urlError, setUrlError] = useState('')
  const [viewportError, setViewportError] = useState('')

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
      requestAnimationFrame(() => {
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

    const width = Number(options.customWidth) || 1920
    const height = Number(options.customHeight) || 1080
    const perimeter = width + height

    if (perimeter > 8000) {
      setViewportError(
        'Viewport perimeter (width + height) is too big. Please use 8000px or less.'
      )
      return
    }

    setUrlError('')
    setViewportError('')
    onSubmit(normalized)
  }, [detectedUrls, options.customWidth, options.customHeight, onSubmit])

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
          id='ws-urls'
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
          aria-describedby={urlError ? 'ws-url-error' : undefined}
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
                Capturing {bulkProgress.current} of {bulkProgress.total}…
              </>
            ) : (
              <>
                <Camera size={16} />
                {detectedUrls.length > 1
                  ? `Generate ${Math.min(
                    detectedUrls.length,
                    MAX_URLS
                  )} screenshots`
                  : 'Generate screenshot'}
              </>
            )}
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
        /* crop from the top-left, square-fitted */
        const srcSize = Math.min(img.width, img.height)
        ctx.drawImage(img, 0, 0, srcSize, srcSize, 0, 0, THUMB_SIZE, THUMB_SIZE)
        resolve(canvas.toDataURL('image/jpeg', THUMB_QUALITY))
      } catch {
        resolve(null)
      }
    }
    img.onerror = () => resolve(null)
    img.src = imageUrl
  })

/* ─── Screenshot History ──────────────────────────────── */

const formatHistoryUrl = url => {
  try {
    const u = new URL(url)
    return u.hostname + (u.pathname !== '/' ? u.pathname : '')
  } catch {
    return url
  }
}

const ScreenshotHistory = ({
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

  /* Scroll to the top when a new screenshot is prepended */
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

  /* Reset confirmation when selection changes */
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
          Recent screenshots
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
                  ? `Confirm deletion of ${selectedIds.length} screenshots`
                  : `Delete ${selectedIds.length} selected screenshots`
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
          aria-label='Screenshot history'
        >
          {entries.map(entry => {
            const isSelected = selectedIds.includes(entry.id)
            return (
              <HistoryRow
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
                <HistoryRowCheckbox
                  checked={isSelected}
                  onClick={e => e.stopPropagation()}
                  onChange={() => onToggleSelect(entry.id)}
                  aria-label={`Select screenshot of ${entry.settings.url}`}
                />
                <HistoryRowThumb>
                  <img
                    src={entry.thumbnail || entry.screenshot.url}
                    alt={`Screenshot of ${entry.settings.url}`}
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
                    {entry.settings.customWidth}&times;
                    {entry.settings.customHeight}
                    {entry.settings.fullPage ? ' · Full page' : ''}
                  </Text>
                </Box>
                <RowDeleteButton
                  aria-label={`Delete screenshot of ${entry.settings.url}`}
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
  urls,
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
            Paste your URLs and click Generate
          </Text>
          <Text css={theme({ color: 'black20', fontSize: 1, pt: 1 })}>
            Up to {MAX_URLS} screenshots at once
          </Text>
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
                Capturing screenshot {bulkProgress.current} of{' '}
                {bulkProgress.total}…
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
                  ? 'Screenshot ready!'
                  : `All ${bulkResults.length} screenshots ready!`}
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
                  justifyContent: 'center'
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
                {successCount} of {bulkResults.length} screenshots ready
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
                      {successCount === 1 ? 'image' : 'images'})
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
                      style={{ flexShrink: 0, marginTop: '2px' }}
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
              {hasRateLimit && (
                <Box
                  css={theme({
                    width: '100%',
                    maxWidth: '500px',
                    textAlign: 'left',
                    borderRadius: 2,
                    p: 3
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
                    Free users can take up to 50 screenshots per day. Your limit
                    will reset tomorrow. For unlimited access, check out our{' '}
                    <Link href='/#pricing'>API plans</Link> or write to{' '}
                    <Link href='mailto:hello@microlink.io'>
                      hello@microlink.io
                    </Link>{' '}
                    if you need something else.
                  </Text>
                </Box>
              )}
            </>
          )}
          <Button
            onClick={onReset}
            css={theme({ mt: 2 })}
            aria-label='Start a new batch of screenshots'
          >
            <Caps css={theme({ fontSize: 0 })}>Take more screenshots</Caps>
          </Button>
        </Flex>
      </FadeIn>
    </PreviewCanvas>
  )
}

/* ─── Main Tool Section ────────────────────────────────── */

const ScreenshotTool = () => {
  const [options, setOptions] = useState({
    urlsText: '',
    type: 'png',
    fullPage: false,
    adblock: true,
    cache: true,
    device: 'desktop',
    customWidth: '1920',
    customHeight: '1080'
  })

  const [bulkState, setBulkState] = useState('idle')
  const [bulkProgress, setBulkProgress] = useState({
    current: 0,
    total: 0,
    currentUrl: ''
  })
  const [bulkResults, setBulkResults] = useState([])
  const bulkUrlsRef = useRef([])

  const [localStorageData] = useLocalStorage('mql-api-key')
  const [history, setHistory] = useLocalStorage(SCREENSHOT_HISTORY_KEY, [])
  const [activeHistoryId, setActiveHistoryId] = useState(null)
  const [historyReady, setHistoryReady] = useState(false)
  const [selectedIds, setSelectedIds] = useState([])
  const [isZipping, setIsZipping] = useState(false)

  const [previewData, setPreviewData] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [previewViewport, setPreviewViewport] = useState({
    width: 1920,
    height: 1080
  })

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
            const resp = await fetch(entry.screenshot.url)
            const blob = await resp.blob()
            let hostname = 'screenshot'
            try {
              hostname = new URL(entry.settings.url).hostname.replace(
                /\./g,
                '-'
              )
            } catch {}
            const ext = entry.settings?.type || 'png'
            nameCount[hostname] = (nameCount[hostname] || 0) + 1
            const suffix =
              nameCount[hostname] > 1 ? `-${nameCount[hostname]}` : ''
            zip.file(`${hostname}${suffix}.${ext}`, blob)
          } catch {
            /* skip failed fetches */
          }
        })
      )
      const content = await zip.generateAsync({ type: 'blob' })
      const blobUrl = URL.createObjectURL(content)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = `screenshots-${Date.now()}.zip`
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
      setPreviewData(null)
      bulkUrlsRef.current = urls

      const results = []
      const newEntryIds = []
      let hitRateLimit = false

      const viewport = {
        width: Number(options.customWidth) || 1920,
        height: Number(options.customHeight) || 1080
      }

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
            error: {
              message: 'Skipped — daily rate limit reached',
              statusCode: 429
            }
          }
          results.push(result)
          setBulkResults([...results])
          continue
        }

        try {
          const response = await mql(url, {
            apiKey: localStorageData?.apiKey,
            meta: false,
            screenshot: { type: options.type, fullPage: options.fullPage },
            viewport,
            adblock: options.adblock,
            force: !options.cache
          })

          if (response?.data?.screenshot) {
            results.push({ url, success: true, data: response.data })
            setBulkResults([...results])

            const entryId = `${Date.now()}-${i}`
            const thumbnail = await createThumbnail(
              response.data.screenshot.url
            )
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
              error: { message: 'No screenshot returned' }
            })
            setBulkResults([...results])
          }
        } catch (err) {
          const statusCode = err.statusCode || err.code
          if (statusCode === 429) hitRateLimit = true
          results.push({
            url,
            success: false,
            error: {
              message:
                err.description ||
                err.message ||
                'Failed to capture screenshot',
              statusCode
            }
          })
          setBulkResults([...results])
        }
      }

      setBulkState('done')
      setSelectedIds(newEntryIds)

      const allSucceeded = results.every(r => r.success)
      if (allSucceeded && results.length > 0) {
        const successEntries = results
          .filter(r => r.success)
          .map((r, idx) => ({
            screenshot: r.data.screenshot,
            settings: {
              url: r.url,
              type: options.type
            },
            id: newEntryIds[idx]
          }))
        await downloadZipFromEntries(successEntries)
      }
    },
    [options, localStorageData, setHistory, downloadZipFromEntries]
  )

  const handleHistorySelect = useCallback(entry => {
    const { settings, screenshot } = entry
    setPreviewData({ screenshot })
    setPreviewUrl(settings.url)
    setPreviewViewport({
      width: Number(settings.customWidth) || 1920,
      height: Number(settings.customHeight) || 1080
    })
    setActiveHistoryId(entry.id)
    setBulkState('history-preview')
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
    setBulkProgress({ current: 0, total: 0, currentUrl: '' })
    setPreviewData(null)
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
        <OptionsPanelOuter>
          <OptionsPanel
            options={options}
            setOptions={setOptions}
            onSubmit={handleBulkSubmit}
            isLoading={isProcessing}
            bulkProgress={bulkProgress}
          />
        </OptionsPanelOuter>

        <PreviewOuter>
          {bulkState === 'history-preview' && previewData ? (
            <PreviewDisplay
              data={previewData}
              isLoading={false}
              error={null}
              onRetry={() => {}}
              url={previewUrl}
              viewportWidth={previewViewport.width}
              viewportHeight={previewViewport.height}
            />
          ) : (
            <BulkPreview
              bulkState={bulkState}
              bulkProgress={bulkProgress}
              bulkResults={bulkResults}
              urls={bulkUrlsRef.current}
              onDownloadZip={handleDownloadZip}
              isZipping={isZipping}
              onReset={handleReset}
            />
          )}
        </PreviewOuter>
      </ToolLayout>

      {historyReady && (
        <ScreenshotHistory
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
      Bulk website screenshot tool
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
      Paste up to 50 URLs, capture every page at once, and download all
      screenshots as a ZIP
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
      How to take bulk website screenshots
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
      Why use a bulk website screenshot tool?
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
        How can a bulk screenshot tool be free?
      </Text>
      <Text
        css={theme({ fontSize: 2, color: 'black80', lineHeight: 2, mt: 2 })}
      >
        This tool is built on <b>Microlink's</b>{' '}
        <Link href='/screenshot'>screenshot API</Link>—the same infrastructure
        that processes millions of screenshots per week for paying customers.
        You get the same speed, quality, and reliability at no cost.
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
        Automate bulk website screenshots with a simple REST call. Explore the
        full API reference with interactive examples, SDKs for every language,
        and ready-to-use code snippets.
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
    title: 'For QA & site audits',
    items: [
      'Take a screenshot of all pages in a website for visual QA',
      'Compare before and after a redesign or deployment',
      'Document the current state of every page for stakeholders',
      'Catch layout issues across desktop, tablet, and mobile'
    ],
    link: {
      href: '/screenshot',
      alt: 'Screenshot API for QA',
      text: 'Check out the API'
    }
  },
  {
    title: 'For digital marketers',
    items: [
      'Bulk screenshot competitor websites for analysis',
      'Archive landing pages for ad compliance records',
      'Create case study visuals with before/after shots',
      'Generate social media preview images at scale'
    ],
    link: {
      href: '/use-cases/generate-og-img-previews',
      alt: 'Screenshot for og:images',
      text: 'Check out this use case'
    }
  },
  {
    title: 'For developers',
    items: [
      'Automate bulk website screenshots via REST API',
      'Integrate visual regression testing into CI/CD',
      'Generate thumbnail previews for multiple URLs',
      'Build screenshot workflows with the Microlink SDK'
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
      Who needs bulk website screenshots?
    </Subhead>
    <Caption css={theme({ pt: [3, 3, 4, 4], maxWidth: layout.small })}>
      From site audits to competitive analysis, bulk screenshot capture saves
      time across every team.
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
        question: 'Is this bulk website screenshot tool really free?',
        answer: (
          <>
            <div>
              Yes! You can take up to <b>50&nbsp;bulk screenshots per day</b>{' '}
              for free, with no credit card or account required. Free
              screenshots include every feature — full-page capture, device
              emulation, ad blocking, and PNG/JPG formats.
            </div>
            <div>
              Need higher limits? Check our{' '}
              <Link href='/#pricing'>pricing plans</Link> for unlimited
              screenshots and priority processing, or write to{' '}
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
            </div>
          </>
        )
      },
      {
        question: 'How many URLs can I screenshot at once?',
        answer: (
          <>
            <div>
              You can capture up to <b>50&nbsp;URLs</b> in a single batch. Paste
              them one per line or comma-separated. Screenshots are processed
              sequentially and you can track progress in real time.
            </div>
            <div>
              All successful screenshots are packaged into a ZIP file that
              downloads automatically. They're also saved to your browser's
              local storage for 24&nbsp;hours so you can re-download anytime.
            </div>
          </>
        )
      },
      {
        question: 'Can I take a screenshot of all pages in a website?',
        answer: (
          <>
            <div>
              Yes. To screenshot all pages in a website, paste every URL you
              want to capture into the text area — one per line. The tool will
              process them all in order and deliver a ZIP with every screenshot.
            </div>
            <div>
              If you need to automate this (e.g., feed URLs from a sitemap), use
              the{' '}
              <Link href='/docs/api/parameters/screenshot'>
                Microlink screenshot API
              </Link>{' '}
              directly. You can parse your sitemap.xml, extract the URLs, and
              call the API for each one programmatically.
            </div>
          </>
        )
      },
      {
        question: 'What happens if some screenshots fail?',
        answer: (
          <>
            <div>
              If a screenshot fails, the tool continues with the remaining URLs.
              At the end you'll see a summary of which ones succeeded and which
              failed, along with the reason. Successful screenshots are
              automatically selected so you can download just the working ones
              as a ZIP.
            </div>
            <div>
              If you hit the daily rate limit (50 requests), the remaining URLs
              will be skipped. Your limit resets the next day.
            </div>
          </>
        )
      },
      {
        question: "What's the quality of the bulk screenshots?",
        answer: (
          <>
            <div>
              Every screenshot is rendered at the highest quality settings using
              a real Chromium browser. We then compress the images to the
              smallest file size possible without visible quality loss. You get
              the same output whether you capture one URL or fifty.
            </div>
          </>
        )
      },
      {
        question: 'Can I automate bulk website screenshots?',
        answer: (
          <>
            <div>
              Absolutely. This tool is built on the{' '}
              <Link href='/docs/api/parameters/screenshot'>
                Microlink screenshot API
              </Link>
              , which provides a simple REST endpoint. Send a URL, get back a
              screenshot — integrate with any language (Node.js, Python, Ruby,
              Go) or plain cURL.
            </div>
            <div>
              For Node.js, use the{' '}
              <Link href='https://www.npmjs.com/package/@microlink/mql'>
                @microlink/mql
              </Link>{' '}
              SDK. Loop over your URLs, call the API for each, and you have a
              fully automated bulk screenshot pipeline.
            </div>
          </>
        )
      },
      {
        question: 'How does caching work for bulk screenshots?',
        answer: (
          <>
            <div>
              Screenshots are cached on our global CDN (240+ edge locations) by
              default. Cached responses are served instantly and{' '}
              <b>don't count against your daily limit</b>. Cache lasts for
              24&nbsp;hours.
            </div>
            <div>
              This is especially useful for bulk captures — if you re-run the
              same batch, cached URLs will resolve immediately. Turn off caching
              only if you need a fresh screenshot of a page that changes
              frequently.
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

/* ─── Page Head (SEO) ──────────────────────────────────── */

export const Head = () => (
  <Meta
    title='Bulk website screenshot tool — capture up to 50 URLs at once'
    noSuffix
    description='Free bulk website screenshot tool. Paste up to 50 URLs, capture every page at once, and download all screenshots as a ZIP. No login required. Powered by Microlink screenshot API.'
    image='https://cdn.microlink.io/banner/screenshot.jpeg'
    schemaType='SoftwareApplication'
    structured={{
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://microlink.io/tools/website-screenshot/bulk',
      name: 'Microlink Bulk Website Screenshot Tool',
      description:
        'Free bulk website screenshot tool. Paste up to 50 URLs, generate screenshots for every page at once, and download them all as a ZIP file. Built on Microlink screenshot API.',
      url: 'https://microlink.io/tools/website-screenshot/bulk',
      applicationCategory: ['DeveloperApplication', 'DesignApplication'],
      keywords: [
        'bulk website screenshot',
        'bulk website screenshot tool',
        'take screenshot of all pages in a website',
        'batch website screenshot',
        'multiple website screenshots',
        'screenshot API',
        'bulk screen capture',
        'website screenshot generator',
        'download screenshots zip'
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
          Need to automate bulk website screenshots? No servers to maintain, no
          headless browsers to manage. Microlink's screenshot API handles the
          infrastructure so you can focus on building — easy integration via{' '}
          <Link href='/screenshot'>API</Link>.
        </>
      }
      features={FEATURES_LIST}
    />
    <ApiDocs />
    <ProductInformation />
  </Layout>
)

export default WebsiteScreenshotPage
