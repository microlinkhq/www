import { colors, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2
} from 'react-feather'

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

export const TOOLBAR_HEIGHT = '36px'
export const ZOOM_STEPS = [0.5, 0.75, 1, 1.25, 1.5, 2]
export const DEFAULT_ZOOM_INDEX = 2

const PdfViewerToolbar = ({
  totalPages,
  renderedPages,
  scale,
  zoomIndex,
  setZoomIndex,
  containerRef
}) => (
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
          : 'Loading…'}
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
          setZoomIndex(i => Math.min(ZOOM_STEPS.length - 1, i + 1))}
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
)

export default PdfViewerToolbar
