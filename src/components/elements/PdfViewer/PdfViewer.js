import { colors, theme } from 'theme'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import { once } from 'helpers/once'

import PdfViewerCanvasList from './PdfViewerCanvasList'
import PdfViewerToolbar, {
  DEFAULT_ZOOM_INDEX,
  TOOLBAR_HEIGHT,
  ZOOM_STEPS
} from './PdfViewerToolbar'

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

const PDFJS_CDN_VERSION = '4.10.38'
const PDFJS_CDN_BASE = `https://unpkg.com/pdfjs-dist@${PDFJS_CDN_VERSION}`

const getPdfjsLib = once(() => {
  if (typeof window === 'undefined') return Promise.resolve(null)

  const cdnUrl = `${PDFJS_CDN_BASE}/build/pdf.min.mjs`
  const workerUrl = `${PDFJS_CDN_BASE}/build/pdf.worker.min.mjs`

  const loaderCode = `import * as pdfjsLib from '${cdnUrl}'; window.__pdfjsLib = pdfjsLib;`
  const blob = new Blob([loaderCode], { type: 'text/javascript' })
  const blobUrl = URL.createObjectURL(blob)

  return import(/* webpackIgnore: true */ blobUrl).then(() => {
    URL.revokeObjectURL(blobUrl)
    const lib = window.__pdfjsLib
    if (!lib) throw new Error('pdfjs-dist failed to initialize')
    lib.GlobalWorkerOptions.workerSrc = workerUrl
    return lib
  })
})

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
      let renderedCount = 0

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
          renderedCount += 1
          setRenderedPages(renderedCount)
          if (renderedCount === totalPages && onLoad) onLoad()
        } catch (err) {
          if (err?.name === 'RenderingCancelledException') return
          if (!cancelled && renderIdRef.current === currentRenderId) {
            setError(err?.message || 'Failed to render page')
          }
          return
        }
      }
    }

    renderPages()
    return () => {
      cancelled = true
    }
  }, [pdf, totalPages, scale, onLoad])

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
        <PdfViewerToolbar
          totalPages={totalPages}
          renderedPages={renderedPages}
          scale={scale}
          zoomIndex={zoomIndex}
          setZoomIndex={setZoomIndex}
          containerRef={containerRef}
        />
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

        <PdfViewerCanvasList totalPages={totalPages} canvasRefs={canvasRefs} />
      </Box>
    </Box>
  )
}

export default PdfViewer
