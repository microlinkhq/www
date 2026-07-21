import { theme } from 'theme'
import React, { useMemo } from 'react'
import styled from 'styled-components'

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

const PdfViewerCanvasList = ({ totalPages, canvasRefs }) => {
  const canvasElements = useMemo(() => {
    if (totalPages === 0) return null

    return Array.from({ length: totalPages }, (_, i) => (
      <PageCanvas
        key={i}
        ref={el => {
          canvasRefs.current[i] = el
        }}
        css={theme({ mb: i < totalPages - 1 ? 2 : 0 })}
      />
    ))
  }, [totalPages, canvasRefs])

  return canvasElements
}

export default PdfViewerCanvasList
