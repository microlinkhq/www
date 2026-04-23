import { colors, theme } from 'theme'
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'react-feather'

const pulse = keyframes`
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
`

const SkeletonRect = styled('div')`
  border-radius: 4px;
  background: ${colors.black10};
  animation: ${pulse} 1.5s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0.5;
  }
`

const ToolbarButton = styled('button')`
  ${theme({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: 2,
    cursor: 'pointer',
    color: 'black60',
    bg: 'transparent'
  })}
  border: none;
  padding: 0;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 150ms ease, color 150ms ease;

  &:hover {
    background-color: ${colors.black05};
    color: ${colors.black};
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 1px;
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
    &:hover {
      background-color: transparent;
      color: ${colors.black60};
    }
  }
`

const PageCanvas = styled('canvas')`
  display: block;
  ${theme({ mx: 'auto' })}

  @media (max-width: 767px) {
    width: 100%;
    height: auto;
  }

  @media (min-width: 768px) {
    width: var(--pdf-w);
    height: var(--pdf-h);
    max-width: 100%;
  }
`

const TOOLBAR_HEIGHT = '36px'
const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2]
const DEFAULT_ZOOM_INDEX = 2
const PDFJS_CDN_VERSION = '4.10.38'
const PDFJS_CDN_BASE = `https://unpkg.com/pdfjs-dist@${PDFJS_CDN_VERSION}`

let pdfjsLibPromise = null

function getPdfjsLib () {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (pdfjsLibPromise) return pdfjsLibPromise

  const cdnUrl = `${PDFJS_CDN_BASE}/build/pdf.min.mjs`
  const workerUrl = `${PDFJS_CDN_BASE}/build/pdf.worker.min.mjs`

  const loaderCode = `import * as pdfjsLib from '${cdnUrl}'; window.__pdfjsLib = pdfjsLib;`
  const blob = new Blob([loaderCode], { type: 'text/javascript' })
  const blobUrl = URL.createObjectURL(blob)

  pdfjsLibPromise = import(/* webpackIgnore: true */ blobUrl).then(() => {
    URL.revokeObjectURL(blobUrl)
    const lib = window.__pdfjsLib
    if (!lib) throw new Error('pdfjs-dist failed to initialize')
    lib.GlobalWorkerOptions.workerSrc = workerUrl
    return lib
  })

  return pdfjsLibPromise
}

const PdfViewer = ({
  src,
  showToolbar = true,
  onLoad,
  style,
  className,
  ...rest
}) => {
  const [pdf, setPdf] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [renderedPages, setRenderedPages] = useState(0)
  const [isDocLoading, setIsDocLoading] = useState(true)
  const [error, setError] = useState(null)
  const [zoomIndex, setZoomIndex] = useState(DEFAULT_ZOOM_INDEX)
  const containerRef = useRef(null)
  const canvasRefs = useRef([])
  const loadTaskRef = useRef(null)
  const renderIdRef = useRef(0)

  const scale = ZOOM_STEPS[zoomIndex]

  const cleanup = useCallback(() => {
    if (loadTaskRef.current) {
      loadTaskRef.current.destroy().catch(() => {})
      loadTaskRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!src) {
      setPdf(null)
      setTotalPages(0)
      setRenderedPages(0)
      setIsDocLoading(false)
      return
    }

    let cancelled = false
    setIsDocLoading(true)
    setError(null)
    setPdf(null)
    setTotalPages(0)
    setRenderedPages(0)
    canvasRefs.current = []

    cleanup()

    getPdfjsLib().then(pdfjsLib => {
      if (cancelled || !pdfjsLib) return

      const task = pdfjsLib.getDocument({
        url: src,
        cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
        cMapPacked: true
      })
      loadTaskRef.current = task

      task.promise
        .then(pdfDoc => {
          if (cancelled) return
          setPdf(pdfDoc)
          setTotalPages(pdfDoc.numPages)
          setIsDocLoading(false)
        })
        .catch(err => {
          if (cancelled) return
          if (err?.name === 'RenderingCancelledException') return
          setError(err?.message || 'Failed to load PDF')
          setIsDocLoading(false)
        })
    })

    return () => {
      cancelled = true
      cleanup()
    }
  }, [src, cleanup])

  useEffect(() => {
    if (!pdf || totalPages === 0) return

    let cancelled = false
    const currentRenderId = ++renderIdRef.current
    setRenderedPages(0)

    const renderPages = async () => {
      const devicePixelRatio = window.devicePixelRatio || 1

      for (let i = 1; i <= totalPages; i++) {
        if (cancelled || renderIdRef.current !== currentRenderId) return

        try {
          const page = await pdf.getPage(i)
          if (cancelled || renderIdRef.current !== currentRenderId) return

          const viewport = page.getViewport({ scale: scale * devicePixelRatio })
          const canvas = canvasRefs.current[i - 1]
          if (!canvas) continue

          const cssWidth = viewport.width / devicePixelRatio
          const cssHeight = viewport.height / devicePixelRatio

          canvas.width = viewport.width
          canvas.height = viewport.height

          canvas.style.setProperty('--pdf-w', `${cssWidth}px`)
          canvas.style.setProperty('--pdf-h', `${cssHeight}px`)
          canvas.style.aspectRatio = `${viewport.width} / ${viewport.height}`

          const ctx = canvas.getContext('2d')
          await page.render({ canvasContext: ctx, viewport }).promise

          if (cancelled || renderIdRef.current !== currentRenderId) return
          setRenderedPages(prev => {
            const next = prev + 1
            if (next === totalPages && onLoad) onLoad()
            return next
          })
        } catch (err) {
          if (err?.name === 'RenderingCancelledException') return
          if (!cancelled) {
            setError(err?.message || 'Failed to render page')
          }
        }
      }
    }

    renderPages()
    return () => {
      cancelled = true
    }
  }, [pdf, totalPages, scale, onLoad])

  const canvasElements = useMemo(() => {
    if (totalPages === 0) return null
    canvasRefs.current = new Array(totalPages)

    return Array.from({ length: totalPages }, (_, i) => (
      <PageCanvas
        key={i}
        ref={el => {
          canvasRefs.current[i] = el
        }}
        css={theme({ mb: i < totalPages - 1 ? 2 : 0 })}
      />
    ))
  }, [totalPages])

  if (typeof window === 'undefined') {
    return <Box style={style} className={className} {...rest} />
  }

  if (error) {
    return (
      <Flex
        style={style}
        className={className}
        css={theme({
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          p: 4,
          color: 'black60'
        })}
        {...rest}
      >
        <Text css={theme({ fontSize: 1, textAlign: 'center' })}>
          Unable to display PDF preview
        </Text>
      </Flex>
    )
  }

  return (
    <Box
      style={style}
      className={className}
      css={theme({ position: 'relative', height: '100%' })}
      {...rest}
    >
      {showToolbar && totalPages > 0 && (
        <Flex
          css={theme({
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            px: 2,
            py: 1,
            bg: 'gray0',
            borderBottom: 1,
            borderBottomColor: 'black10',
            position: 'relative',
            zIndex: 2
          })}
        >
          <Flex css={theme({ alignItems: 'center', gap: 1 })}>
            <ToolbarButton
              aria-label='Previous page'
              disabled={totalPages <= 1}
              onClick={() => {
                const container = containerRef.current
                if (container) {
                  container.scrollBy({
                    top: -container.clientHeight * 0.8,
                    behavior: 'smooth'
                  })
                }
              }}
            >
              <ChevronLeft size={16} />
            </ToolbarButton>
            <Text
              css={theme({
                fontSize: 0,
                color: 'black60',
                fontFamily: 'mono',
                whiteSpace: 'nowrap',
                fontVariantNumeric: 'tabular-nums'
              })}
              aria-live='polite'
            >
              {renderedPages === totalPages
                ? `${totalPages} page${totalPages !== 1 ? 's' : ''}`
                : 'Loading\u2026'}
            </Text>
            <ToolbarButton
              aria-label='Next page'
              disabled={totalPages <= 1}
              onClick={() => {
                const container = containerRef.current
                if (container) {
                  container.scrollBy({
                    top: container.clientHeight * 0.8,
                    behavior: 'smooth'
                  })
                }
              }}
            >
              <ChevronRight size={16} />
            </ToolbarButton>
          </Flex>

          <Flex css={theme({ alignItems: 'center', gap: 1 })}>
            <ToolbarButton
              aria-label='Zoom out'
              disabled={zoomIndex === 0}
              onClick={() => setZoomIndex(i => Math.max(0, i - 1))}
            >
              <ZoomOut size={14} />
            </ToolbarButton>
            <Text
              css={theme({
                fontSize: 0,
                color: 'black60',
                fontFamily: 'mono',
                fontVariantNumeric: 'tabular-nums',
                minWidth: '36px',
                textAlign: 'center'
              })}
            >
              {Math.round(scale * 100)}%
            </Text>
            <ToolbarButton
              aria-label='Zoom in'
              disabled={zoomIndex === ZOOM_STEPS.length - 1}
              onClick={() =>
                setZoomIndex(i => Math.min(ZOOM_STEPS.length - 1, i + 1))
              }
            >
              <ZoomIn size={14} />
            </ToolbarButton>
            <ToolbarButton
              aria-label='Reset zoom'
              onClick={() => setZoomIndex(DEFAULT_ZOOM_INDEX)}
            >
              <Maximize2 size={13} />
            </ToolbarButton>
          </Flex>
        </Flex>
      )}

      <Box
        ref={containerRef}
        css={theme({
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'auto',
          p: totalPages > 0 ? 2 : 0,
          bg: totalPages > 0 ? 'gray2' : 'transparent'
        })}
        style={{
          top: showToolbar && totalPages > 0 ? TOOLBAR_HEIGHT : 0,
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain'
        }}
      >
        {isDocLoading && (
          <Flex
            css={theme({
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              p: 4,
              width: '100%'
            })}
          >
            <SkeletonRect style={{ width: '80%', height: '400px' }} />
          </Flex>
        )}

        {canvasElements}
      </Box>
    </Box>
  )
}

export default PdfViewer
