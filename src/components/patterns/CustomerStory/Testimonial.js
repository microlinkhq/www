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
    fontSize: ['32px', '36px', '40px', '44px'],
    fontWeight: 'bold',
    fontStyle: 'normal',
    display: 'inline',
    mr: 1
  })}
  line-height: 0;
  vertical-align: -0.25em;
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
    width: '50px',
    height: '50px',
    flex: '0 0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'mono',
    fontSize: '18px',
    fontWeight: 'bold',
    letterSpacing: '0.04em',
    textTransform: 'uppercase'
  })}
`

const AuthorAvatarImage = styled('img')`
  ${theme({
    border: 1,
    borderColor: 'black10',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    flex: '0 0 auto',
    display: 'block'
  })}
  object-fit: cover;
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
  avatar,
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
    <Quote>
      <QuoteMarkBase css={theme({ color: accent.text })}>“</QuoteMarkBase>
      {quote}
    </Quote>
    <Author as='figcaption'>
      {avatar
        ? (
          <AuthorAvatarImage
            src={avatar}
            alt={author}
            width='50'
            height='50'
            loading='lazy'
            decoding='async'
          />
          )
        : (
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
          )}
      <Box>
        <AuthorName>{author}</AuthorName>
        <AuthorRole>
          {role} · {company}
        </AuthorRole>
      </Box>
    </Author>
  </TestimonialCardBase>
)
