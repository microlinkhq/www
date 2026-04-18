import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import CaptionBase from 'components/patterns/Caption/Caption'
import { withTitle } from 'helpers/hoc/with-title'
import { borders, colors, layout, theme } from 'theme'

const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]

// TODO: replace with real customer quotes once collected.
const TESTIMONIALS = [
  {
    quote:
      'We swapped our headless cluster for the Microlink API in an afternoon. Costs dropped, p99 latency halved, on-call pages went away.',
    author: 'Alex Rivera',
    role: 'Staff Engineer',
    company: 'Beam Analytics'
  },
  {
    quote:
      'Pricing is the part nobody likes about infra APIs. With Microlink we know exactly what we pay before we ship — and the unit price is hard to beat.',
    author: 'Priya Patel',
    role: 'Head of Platform',
    company: 'Spool'
  },
  {
    quote:
      'Free plan got us to MVP. Pro carried us to product-market fit. Now Enterprise runs the whole pipeline. One vendor for the entire journey.',
    author: 'Marco Bianchi',
    role: 'Co-founder & CTO',
    company: 'Lumen Labs'
  }
]

const initialsOf = name =>
  name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const Card = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    flex: ['1 1 100%', '1 1 100%', '1 1 0', '1 1 0'],
    minWidth: 0,
    bg: 'white',
    borderRadius: 3,
    p: [3, 3, 4, 4],
    position: 'relative'
  })}
  border: ${borders[1]};
  box-shadow: 0 2px 8px ${colors.black05};
  transition: box-shadow 200ms ease, transform 200ms ease;

  &:hover {
    box-shadow: 0 8px 24px ${colors.black10};
    transform: translateY(-2px);
  }
`

const QuoteGlyph = styled(Text)`
  ${theme({
    fontSize: ['54px', '54px', '64px', '64px'],
    color: 'pink7',
    fontWeight: 'bold',
    lineHeight: 0
  })}
  position: absolute;
  top: 12px;
  left: 16px;
  user-select: none;
  pointer-events: none;
`

const Avatar = styled(Flex)`
  ${theme({
    width: '40px',
    height: '40px',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    bg: 'pinkest',
    color: 'pink7',
    fontWeight: 'bold',
    fontSize: 1,
    flexShrink: 0
  })}
`

const Testimonial = ({ quote, author, role, company }) => (
  <Card as='figure' css={{ margin: 0 }}>
    <QuoteGlyph aria-hidden='true' as='span'>
      &ldquo;
    </QuoteGlyph>

    <Text
      as='blockquote'
      css={theme({
        m: 0,
        pt: [4, 4, 5, 5],
        fontSize: [1, 2, 2, 2],
        lineHeight: 2,
        color: 'black',
        flex: 1
      })}
    >
      {quote}
    </Text>

    <Flex
      as='figcaption'
      css={theme({
        pt: [3, 3, 4, 4],
        gap: 3,
        alignItems: 'center'
      })}
    >
      <Avatar aria-hidden='true'>{initialsOf(author)}</Avatar>
      <Box>
        <Text
          css={theme({
            fontSize: [1, 1, '15px', '15px'],
            fontWeight: 'bold',
            color: 'black'
          })}
        >
          {author}
        </Text>
        <Text css={theme({ fontSize: 0, color: 'black60' })}>
          {role} · {company}
        </Text>
      </Box>
    </Flex>
  </Card>
)

const Testimonials = () => (
  <Container
    as='section'
    id='testimonials'
    css={theme({
      bg: 'white',
      maxWidth: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [3, 3, 4, 4],
      alignItems: 'center'
    })}
  >
    <Box
      css={theme({
        textAlign: 'center',
        maxWidth: layout.normal,
        pb: [4, 4, 5, 5]
      })}
    >
      <Subhead
        titleize={false}
        css={theme({
          fontSize: ['28px', '34px', '42px', '46px']
        })}
      >
        Loved by teams
        <LineBreak />
        in <span css={theme({ color: 'pink7' })}>production</span>.
      </Subhead>
      <Caption
        forwardedAs='div'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          fontSize: [1, 2, 2, 2]
        })}
      >
        Engineers, founders and platform teams pick Microlink because it just
        works — and stays out of the way.
      </Caption>
    </Box>

    <Flex
      css={theme({
        width: '100%',
        maxWidth: layout.large,
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: 'stretch',
        gap: [3, 3, 4, 4]
      })}
    >
      {TESTIMONIALS.map(t => (
        <Testimonial key={t.author} {...t} />
      ))}
    </Flex>
  </Container>
)

export default Testimonials
