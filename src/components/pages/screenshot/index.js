/* global fetch, ResizeObserver */

import { colors, layout, theme, transition, space } from 'theme'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
  Camera,
  Check,
  Clipboard,
  Code,
  Download,
  ExternalLink,
  Loader,
  X
} from 'react-feather'
import styled, { keyframes } from 'styled-components'
import get from 'dlv'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Choose from 'components/elements/Choose'
import Container from 'components/elements/Container'
import DotSpinner from 'components/elements/DotSpinner'
import Flex from 'components/elements/Flex'
import Label from 'components/elements/Label'
import Spinner from 'components/elements/Spinner'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import {
  ApiErrorTitle,
  ApiErrorBody
} from 'components/patterns/ApiError/ApiError'
import { getErrorMeta } from 'helpers/api-error'
import ArrowLink from 'components/patterns/ArrowLink'
import Caption from 'components/patterns/Caption/Caption'
import Tooltip from 'components/patterns/Tooltip/Tooltip'

import NerdStatsOverlay, {
  NerdStatsToggle
} from 'components/patterns/NerdStats/NerdStats'
import { useClipboard } from 'components/hook/use-clipboard'

/* ─── Shared Constants ─────────────────────────────────── */

export const LAYOUT_PIVOT = 1200
export const MOBILE_BP = 768
export const DEFAULT_THUMB_SIZE = 244
export const DEFAULT_THUMB_QUALITY = 0.85
export const MAX_HISTORY_ITEMS = 12
export const HISTORY_MAX_AGE_MS = 24 * 60 * 60 * 1000

export const FORMAT_OPTIONS = [
  { value: 'png', label: 'PNG' },
  { value: 'jpeg', label: 'JPG' }
]

/* ─── Styled Components ────────────────────────────────── */

export const PanelSection = styled(Box)`
  ${theme({ pb: 3, mb: 3 })}
  border-bottom: 1px solid ${colors.black05};
`

export const SectionLabel = styled(Text)`
  ${theme({
    fontSize: 0,
    fontWeight: 'bold',
    color: 'black80',
    pb: '12px',
    fontFamily: 'sans'
  })}
`

export const OptionLabel = styled(Label)`
  ${theme({
    display: 'block',
    pb: 1,
    fontWeight: 'regular',
    fontFamily: 'sans',
    fontSize: 0,
    color: 'black60'
  })}
`

export const SegmentedWrapper = styled(Flex)`
  background: #eef1f5;
  ${theme({ borderRadius: 2, p: '3px' })}
`

export const SegmentedOption = styled(Box)
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
    textAlign: 'center',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px'
  })}
  background: ${({ $active }) => ($active ? 'white' : 'transparent')};
  color: ${({ $active }) => ($active ? colors.black80 : colors.black70)};
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

export const GenerateButton = styled(Button)`
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

export const CheckboxLabel = styled(Flex).attrs({ as: 'label' })`
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

/* ─── Animations ───────────────────────────────────────── */

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
`

export const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`

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

/* ─── Preview Styled Components ────────────────────────── */

export const PreviewCanvas = styled(Box)`
  ${theme({
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative'
  })}
  background: #fcfcfc;
`

export const ViewportCard = styled(Box)`
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.04);
  overflow: hidden;
  width: 100%;
  margin: 0 auto;
`

export const SkeletonPulse = styled(Box)`
  background: linear-gradient(90deg, #e2e8f0 0%, #f1f5f9 40%, #e2e8f0 80%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.8s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    background: #e2e8f0;
  }
`

export const FadeIn = styled(Box)`
  animation: ${fadeIn} 400ms cubic-bezier(0.4, 0, 0.2, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

/* ─── Marketing Section Styled Components ──────────────── */

export const StepCard = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    p: 4,
    flex: ['0 0 calc(50% - 12px)', '0 0 calc(50% - 12px)', 1, 1],
    maxWidth: ['none', 'none', '240px', '240px']
  })}
`

export const IconCircle = styled(Flex)`
  ${theme({
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 3,
    background: 'black025'
  })}
`

export const SectionIcon = ({ icon: Icon }) => (
  <IconCircle css={theme({ width: '80px', height: '80px' })}>
    <Icon size={32} color={colors.black80} />
  </IconCircle>
)

export const ApiDocsCard = ({
  title,
  description,
  guideHref = '/docs/guides/screenshot'
}) => (
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
      <Flex
        css={theme({
          justifyContent: 'center',
          pb: 4
        })}
      >
        <SectionIcon icon={Code} />
      </Flex>
      <Subhead css={theme({ fontSize: 4 })}>{title}</Subhead>
      <Caption
        css={theme({ pt: 3, maxWidth: layout.normal, mx: 'auto', fontSize: 3 })}
      >
        {description}
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
        <ArrowLink href={guideHref}>Getting started</ArrowLink>
      </Flex>
    </Box>
  </Container>
)

export const PreviewEmptyState = ({
  icon: Icon = Camera,
  text = 'Enter a URL and click Generate',
  subtext = 'Your screenshot will appear here'
}) => (
  <>
    <Box
      css={theme({
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 3,
        background: 'black025'
      })}
    >
      <Icon size={32} color={colors.black80} />
    </Box>
    <Text css={theme({ color: 'black60', fontSize: 2 })}>{text}</Text>
    <Text css={theme({ color: 'black60', fontSize: 1, pt: 1 })}>{subtext}</Text>
  </>
)

export const UseCaseCard = styled(Box)`
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

export const ActionButton = styled(Flex).attrs({ as: 'a' })`
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

/* ─── Layout Components ────────────────────────────────── */

export const ToolLayout = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  ${theme({ gap: [3, 3, 4, 4] })}

  @media (min-width: ${LAYOUT_PIVOT}px) {
    grid-template-columns: 360px 1fr;
    align-items: start;
  }
`

export const OptionsPanelOuter = styled(Box)`
  width: 100%;
  min-width: 0;

  @media (min-width: ${LAYOUT_PIVOT}px) {
    position: sticky;
    top: ${space[3]};
  }
`

export const PreviewOuter = styled(Box)`
  width: 100%;
  min-width: 0;
`

export const PanelRibbonLayout = styled(Flex)`
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

export const StickyGenerateWrapper = styled(Box)`
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

/* ─── History Styled Components ────────────────────────── */

export const HistoryScrollContainer = styled(Flex)`
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

export const HistoryThumbnail = styled(Box).withConfig({
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

export const ThumbnailDeleteButton = styled(Box).attrs({
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

/* ─── Segmented Control ────────────────────────────────── */

export const SegmentedControl = ({ options, value, onChange, name }) => {
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
            {opt.icon && <opt.icon />}
            {opt.label}
          </SegmentedOption>
        )
      })}
    </SegmentedWrapper>
  )
}

/* ─── Download File ────────────────────────────────────── */

export const downloadFile = async (fileUrl, filename) => {
  try {
    const response = await fetch(fileUrl)
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
    window.open(fileUrl, '_blank')
  }
}

/* ─── Thumbnail Generator ──────────────────────────────── */

export const createThumbnail = (
  imageUrl,
  size = DEFAULT_THUMB_SIZE,
  quality = DEFAULT_THUMB_QUALITY
) =>
  new Promise(resolve => {
    const img = new window.Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        const cropSize = Math.min(img.width, img.height)
        const sx = (img.width - cropSize) / 2
        ctx.drawImage(img, sx, 0, cropSize, cropSize, 0, 0, size, size)
        resolve(canvas.toDataURL('image/jpeg', quality))
      } catch {
        resolve(null)
      }
    }
    img.onerror = () => resolve(null)
    img.src = imageUrl
  })

/* ─── Screenshot History ───────────────────────────────── */

export const ScreenshotHistory = ({
  entries,
  activeId,
  onSelect,
  onDelete,
  disabled,
  entityLabel = 'screenshot',
  getThumbnailSrc
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

  const defaultGetThumbnailSrc = entry =>
    entry.thumbnail || entry.screenshot?.url

  const resolveThumbnail = getThumbnailSrc || defaultGetThumbnailSrc

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
          Recent {entityLabel}s
        </Text>
      </Flex>
      <HistoryScrollContainer
        ref={scrollRef}
        role='list'
        aria-label={`${
          entityLabel.charAt(0).toUpperCase() + entityLabel.slice(1)
        } history`}
      >
        {entries.map(entry => (
          <HistoryThumbnail
            key={entry.id}
            role='listitem'
            $active={entry.id === activeId}
            tabIndex={disabled ? -1 : 0}
            aria-label={`Load ${entityLabel} of ${entry.settings.url}`}
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
              src={resolveThumbnail(entry)}
              alt={`${
                entityLabel.charAt(0).toUpperCase() + entityLabel.slice(1)
              } of ${entry.settings.url}`}
              loading='lazy'
              draggable='false'
            />
            <ThumbnailDeleteButton
              aria-label={`Delete ${entityLabel} of ${entry.settings.url}`}
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

/* ─── Preview Display (for image-based screenshot tools) ─ */

export const PreviewDisplay = ({
  data,
  isLoading,
  error,
  onRetry,
  url,
  viewportWidth,
  viewportHeight,
  nerdStats,
  mqlQuery,
  responseData,
  showNerdStats,
  onToggleNerdStats,
  maxPreviewHeight = 750,
  loadingText = 'Capturing screenshot',
  emptyIcon: EmptyIcon = Camera,
  emptyText = 'Enter a URL and click Generate',
  emptySubtext = 'Your screenshot will appear here'
}) => {
  const [ClipboardComponent, toClipboard] = useClipboard()
  const [isPreviewTooBig, setIsPreviewTooBig] = useState(false)
  const [imagePainted, setImagePainted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const prevImageUrlRef = useRef(null)
  const scrollAreaRef = useRef(null)
  const imageUrl = get(data, 'screenshot.url')

  useEffect(() => {
    if (showNerdStats && scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0
    }
  }, [showNerdStats])

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
  const maxHeightScaled =
    viewportHeight != null
      ? viewportHeight - viewportHeight * fractionLost
      : maxPreviewHeight
  const maxHeight =
    maxHeightScaled > maxPreviewHeight ? maxPreviewHeight : maxHeightScaled

  const containerHeight = maxHeight + 32

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
                  aria-label={isLoading ? loadingText : 'Loading image'}
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
              aria-label={isLoading ? loadingText : 'Loading image'}
            >
              <Spinner width='20px' height='14px' />
              <Text
                css={theme({
                  color: 'black50',
                  fontSize: 1,
                  fontFamily: 'sans'
                })}
              >
                {isLoading ? loadingText : 'Loading image'}
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
              <ApiErrorTitle code={error?.code} />
              <Text css={theme({ fontSize: 2, color: 'black60', pt: 2 })}>
                <ApiErrorBody
                  code={error?.code}
                  fallback={
                    error?.message || 'Something went wrong. Please try again.'
                  }
                />
              </Text>
            </Text>
            {getErrorMeta(error?.code).showRetry && (
              <Button onClick={onRetry}>
                <Caps css={theme({ fontSize: 0 })}>Try again</Caps>
              </Button>
            )}
          </FadeIn>
        </Choose.When>

        <Choose.When condition={!!imageUrl && imagePainted}>
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
                p: [3],
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                minHeight: `${containerHeight}px`,
                maxHeight: ['60vh', '750px', '750px'],
                WebkitOverflowScrolling: 'touch',
                position: 'relative'
              })}
            >
              {showNerdStats && nerdStats && (
                <NerdStatsOverlay
                  stats={nerdStats}
                  mqlQuery={mqlQuery}
                  responseData={responseData}
                />
              )}
              {isPreviewTooBig && (
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
                          background: colors.black025
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
              )}
              {!isPreviewTooBig && (
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
                  downloadFile(imageUrl, `screenshot-${Date.now()}.png`)
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
                    copy: imageUrl,
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
              icon={EmptyIcon}
              text={emptyText}
              subtext={emptySubtext}
            />
          </FadeIn>
        </Choose.Otherwise>
      </Choose>
    </PreviewCanvas>
  )
}
