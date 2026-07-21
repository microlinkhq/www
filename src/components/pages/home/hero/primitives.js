import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import { PRODUCTS } from 'components/pages/home/catalog'
import { PANEL_HEIGHT } from 'components/pages/home/output'
import { REDUCED_MOTION_MEDIA } from 'helpers/reduced-motion'
import { timings, theme, colors, gradient } from 'theme'
import React from 'react'
import styled, { css, keyframes } from 'styled-components'

export const VIOLET = colors.grape7
export const GRADIENT = gradient

export const ERROR = colors.red7
export const WARN = colors.orange7

export const SYNTAX = {
  key: 'link',
  string: 'gray9',
  literal: 'secondary',
  number: 'secondary',
  boolean: 'secondary',
  fn: 'link',
  muted: 'gray5',
  body: 'gray8'
}

export const reduceMotion = REDUCED_MOTION_MEDIA

export const EASE_SMOOTH = timings.smooth

export const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`

export const VertGlyph = ({ vertical, size = 16 }) => {
  const Icon = PRODUCTS[vertical] && PRODUCTS[vertical].icon
  const px = `${size}px`
  return Icon ? <Icon width={px} height={px} /> : null
}

export const Mono = styled(Text).attrs({ as: 'span' })`
  ${theme({ fontFamily: 'mono' })};
`

export const Code = styled.pre`
  ${theme({
    m: 0,
    p: '22px',
    fontFamily: 'mono',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    maxHeight: PANEL_HEIGHT,
    overflow: 'auto'
  })};
`

const IconBadge = styled(Box)`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '7px',
    flexShrink: 0
  })};
`

export const GLYPH_STROKE_GRADIENT_ID = 'microlinkGlyphStroke'
export const GLYPH_FILL_GRADIENT_ID = 'microlinkGlyphFill'

const glyphGradientFill = css`
  svg[fill='none'] {
    stroke: url(#${GLYPH_STROKE_GRADIENT_ID});
  }

  svg:not([fill='none']),
  svg:not([fill='none']) * {
    fill: url(#${GLYPH_FILL_GRADIENT_ID});
  }
`

export const GlyphBadge = styled(IconBadge)`
  ${theme({ bg: 'transparent' })};
  ${glyphGradientFill}
`

export const MenuBadge = styled(IconBadge)`
  ${theme({ width: '26px', height: '26px', bg: 'transparent' })};
  ${glyphGradientFill}
`
