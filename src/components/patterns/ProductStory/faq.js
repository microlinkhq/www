import React from 'react'
import { SECTION_VERTICAL_SPACING, borders, colors, theme } from 'theme'

import Faq from 'components/patterns/Faq/Faq'

export const ProductFaq = ({
  title = 'Product Information',
  caption,
  questions
}) => (
  <Faq
    title={title}
    caption={caption}
    questions={questions}
    css={theme({
      py: SECTION_VERTICAL_SPACING,
      bg: 'pinky',
      borderTop: `${borders[1]} ${colors.pinkest}`,
      borderBottom: `${borders[1]} ${colors.pinkest}`
    })}
  />
)
