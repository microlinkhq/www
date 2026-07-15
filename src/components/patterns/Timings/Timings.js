import React from 'react'

import { theme, borders, colors, SECTION_VERTICAL_SPACING } from 'theme'

import Block from 'components/patterns/Block/Block'

const Timings = ({ accent, title, stats, ...props }) => (
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
