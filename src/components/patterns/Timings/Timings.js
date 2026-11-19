import React from 'react'

import { theme, borders, colors, SECTION_VERTICAL_SPACING } from 'theme'

import Block from 'components/patterns/Block/Block'

export const BRAND_BAND = `radial-gradient(
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
)`

const Timings = ({ accent = BRAND_BAND, title, stats, ...props }) => (
  <Block
    forwardedAs='section'
    id='timings'
    flexDirection='column'
    css={theme({
      px: 4,
      py: SECTION_VERTICAL_SPACING,
      width: '100%',
      backgroundImage: accent,
      borderTop: `${borders[1]} ${colors.white20}`,
      borderBottom: `${borders[1]} ${colors.white20}`
    })}
    blockOne={title}
    blockTwo={stats}
    {...props}
  />
)

export default Timings
