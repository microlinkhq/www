import React from 'react'
import { SECTION_VERTICAL_SPACING, borders, colors, theme } from 'theme'

import Faq from 'components/patterns/Faq/Faq'

export const ProductFaq = ({
  title = 'Product Information',
  caption,
  questions,
  pt = SECTION_VERTICAL_SPACING
}) => (
  <Faq
    title={title}
    caption={caption}
    questions={questions}
    css={theme({
      pt,
      pb: SECTION_VERTICAL_SPACING,
      bg: 'pinky',
      borderTop: `${borders[1]} ${colors.pinkest}`,
      borderBottom: `${borders[1]} ${colors.pinkest}`
    })}
  />
)
