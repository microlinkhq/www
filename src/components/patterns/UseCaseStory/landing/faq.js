import { space, theme, SECTION_VERTICAL_SPACING } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'

import {
  SECTION_MAX_WIDTH,
  SECTION_PX
} from 'components/patterns/CustomerStory/primitives'
import Faq from 'components/patterns/Faq/Faq'

import { inline } from './inline-links'
import { ACCENT } from '../use-cases'

const toAnswer = answer =>
  Array.isArray(answer)
    ? (
      <>
        {answer.map(paragraph => (
          <div key={paragraph}>{inline(paragraph)}</div>
        ))}
      </>
      )
    : (
      <div>{inline(answer)}</div>
      )

export const toFaqQuestions = faq =>
  faq.map(({ question, answer }) => ({ question, answer: toAnswer(answer) }))

export const UseCaseFaqSection = ({ questions }) => (
  <Box
    css={theme({
      bg: ACCENT.bgSoft,
      borderTop: 1,
      borderTopColor: ACCENT.bgEdge,
      borderBottom: 1,
      borderBottomColor: ACCENT.bgEdge,
      width: '100%'
    })}
  >
    <Box css={theme({ maxWidth: SECTION_MAX_WIDTH, mx: 'auto' })}>
      <Faq
        css={theme({
          py: SECTION_VERTICAL_SPACING,
          px: SECTION_PX,
          scrollMarginTop: space[5]
        })}
        title='FAQ'
        questions={toFaqQuestions(questions)}
      />
    </Box>
  </Box>
)
