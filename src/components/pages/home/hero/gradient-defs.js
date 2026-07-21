import { gradientStops } from 'theme'
import React from 'react'
import styled from 'styled-components'

import { GLYPH_FILL_GRADIENT_ID, GLYPH_STROKE_GRADIENT_ID } from './primitives'

const GradientDefs = styled.svg`
  position: absolute;
  width: 0;
  height: 0;
`

export const HeroGradientDefs = () => (
  <GradientDefs aria-hidden='true' focusable='false'>
    <linearGradient
      id={GLYPH_STROKE_GRADIENT_ID}
      gradientUnits='userSpaceOnUse'
      x1='0'
      y1='0'
      x2='24'
      y2='0'
    >
      {gradientStops.map(([offset, stopColor]) => (
        <stop key={offset} offset={offset} stopColor={stopColor} />
      ))}
    </linearGradient>
    <linearGradient id={GLYPH_FILL_GRADIENT_ID} x1='0' y1='0' x2='1' y2='0'>
      {gradientStops.map(([offset, stopColor]) => (
        <stop key={offset} offset={offset} stopColor={stopColor} />
      ))}
    </linearGradient>
  </GradientDefs>
)
