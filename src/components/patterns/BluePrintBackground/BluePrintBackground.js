import React from 'react'
import styled from 'styled-components'
import { colors, fontSizes, space, theme } from 'theme'

import Box from 'components/elements/Box'

const GRID_SIZE = fontSizes[2]
const MASK_DASH = '3px'
const MASK_STEP = space[2]
export const BLUEPRINT_OPACITY = 0.8

const Root = styled(Box)`
  position: relative;
  overflow: hidden;
  width: 100%;
`

const Pattern = styled(Box)`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: linear-gradient(
      to right,
      ${colors.gray2} 1px,
      transparent 1px
    ),
    linear-gradient(to bottom, ${colors.gray2} 1px, transparent 1px);
  background-size: ${GRID_SIZE} ${GRID_SIZE};
  background-position: 0 0, 0 0;
  mask-image: repeating-linear-gradient(
      to right,
      #000 0px,
      #000 ${MASK_DASH},
      transparent ${MASK_DASH},
      transparent ${MASK_STEP}
    ),
    repeating-linear-gradient(
      to bottom,
      #000 0px,
      #000 ${MASK_DASH},
      transparent ${MASK_DASH},
      transparent ${MASK_STEP}
    ),
    radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%);
  -webkit-mask-image: repeating-linear-gradient(
      to right,
      #000 0px,
      #000 ${MASK_DASH},
      transparent ${MASK_DASH},
      transparent ${MASK_STEP}
    ),
    repeating-linear-gradient(
      to bottom,
      #000 0px,
      #000 ${MASK_DASH},
      transparent ${MASK_DASH},
      transparent ${MASK_STEP}
    ),
    radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%);
  mask-composite: intersect;
  -webkit-mask-composite: source-in;
  opacity: ${({ $opacity = BLUEPRINT_OPACITY }) => $opacity};
`

const BluePrintBackground = ({
  as = 'section',
  css = {},
  contentCss = {},
  opacity = BLUEPRINT_OPACITY,
  children,
  ...props
}) => (
  <Root
    as={as}
    css={[
      theme({ position: 'relative', overflow: 'hidden', width: '100%' }),
      css
    ]}
    {...props}
  >
    <Pattern aria-hidden='true' $opacity={opacity} />
    <Box
      css={[
        theme({ position: 'relative', zIndex: 1, width: '100%' }),
        contentCss
      ]}
    >
      {children}
    </Box>
  </Root>
)

export default BluePrintBackground
