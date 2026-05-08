import { colors, layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

const TestimonialCardBase = styled(Box)`
  ${theme({
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderLeft: '4px solid',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    width: '100%',
    maxWidth: layout.small,
    mx: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: [2, 2, 3, 3]
  })}
  box-shadow: 0 1px 2px ${colors.black05};
`

const Quote = styled(Text).attrs({ as: 'blockquote' })`
  ${theme({
    m: 0,
    color: 'black',
    fontSize: ['16px', '17px', '19px', '20px'],
    fontStyle: 'italic',
    fontWeight: 'normal',
    lineHeight: 2,
    letterSpacing: '-0.005em'
  })}
`

const QuoteMarkBase = styled(Text).attrs({
  as: 'span',
  'aria-hidden': 'true'
})`
  ${theme({
    fontSize: ['28px', '32px', '36px', '40px'],
    fontWeight: 'bold',
    lineHeight: 0,
    display: 'block'
  })}
`

const Author = styled(Flex)`
  ${theme({
    alignItems: 'center',
    gap: 3
  })}
`

const AuthorAvatarBase = styled(Box)`
  ${theme({
    border: 1,
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'mono',
    fontSize: 0,
    fontWeight: 'bold',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  })}
`

const AuthorName = styled(Text)`
  ${theme({
    color: 'black',
    fontSize: 1,
    fontWeight: 'bold',
    lineHeight: 1
  })}
`

const AuthorRole = styled(Text)`
  ${theme({
    color: 'black60',
    fontSize: 0,
    pt: 1
  })}
`

export const Testimonial = ({
  accent,
  quote,
  author,
  role,
  company,
  initials,
  maxWidth = layout.small
}) => (
  <TestimonialCardBase
    as='figure'
    css={theme({
      borderLeftColor: accent.highlight,
      maxWidth,
      my: [4, 4, 5, 5]
    })}
  >
    <QuoteMarkBase css={theme({ color: accent.text })}>“</QuoteMarkBase>
    <Quote>{quote}</Quote>
    <Author as='figcaption'>
      <AuthorAvatarBase
        aria-hidden='true'
        css={theme({
          bg: accent.bgSoft,
          borderColor: accent.bgEdge,
          color: accent.text
        })}
      >
        {initials}
      </AuthorAvatarBase>
      <Box>
        <AuthorName>{author}</AuthorName>
        <AuthorRole>
          {role} · {company}
        </AuthorRole>
      </Box>
    </Author>
  </TestimonialCardBase>
)
