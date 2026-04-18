import React from 'react'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import LineBreak from 'components/elements/LineBreak'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import CaptionBase from 'components/patterns/Caption/Caption'
import { useOssTotalStars } from 'components/hook/use-oss-total-stars'
import { withTitle } from 'helpers/hoc/with-title'
import { colors, layout, theme } from 'theme'

const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const COMPACT_NUMBER_FORMATTER = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 1
})

const formatCompact = number =>
  COMPACT_NUMBER_FORMATTER.format(number).toLowerCase()

const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]

const Dot = () => (
  <Text
    as='span'
    aria-hidden='true'
    css={theme({ color: 'black30', px: [2, 2, 3, 3], display: 'inline-block' })}
  >
    ·
  </Text>
)

const Hero = () => {
  const totalStars = useOssTotalStars()

  return (
    <Container
      as='section'
      css={theme({
        alignItems: 'center',
        textAlign: 'center',
        bg: 'white',
        maxWidth: '100%',
        pt: SECTION_VERTICAL_SPACING,
        pb: SECTION_VERTICAL_SPACING,
        px: [3, 3, 4, 4]
      })}
    >
      <Subhead
        titleize={false}
        css={theme({
          fontSize: ['34px', '42px', '54px', '62px'],
          maxWidth: layout.large,
          textAlign: 'center'
        })}
      >
        Pricing built for builders,
        <LineBreak />
        not for <span css={theme({ color: 'pink7' })}>procurement.</span>
      </Subhead>

      <Caption
        forwardedAs='div'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
        })}
      >
        Start free. Scale to millions of requests on Pro. Talk to us when you
        need dedicated infrastructure. No seats, no minimums, no surprises.
      </Caption>

      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: [0, 0, 1, 1],
          color: 'black60',
          fontWeight: 'bold',
          letterSpacing: 1
        })}
      >
        <Text as='span'>
          <Text as='span' css={theme({ color: 'black' })}>
            {formatCompact(totalStars)}
          </Text>{' '}
          GitHub stars
        </Text>
        <Dot />
        <Text as='span'>
          <Text as='span' css={theme({ color: 'black' })}>
            641M+
          </Text>{' '}
          requests last month
        </Text>
        <Dot />
        <Text as='span'>
          <Text as='span' css={theme({ color: 'black' })}>
            99.9%
          </Text>{' '}
          SLA
        </Text>
      </Flex>

      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          flexDirection: ['column', 'row', 'row', 'row'],
          gap: [2, 3, 3, 3],
          alignItems: 'center',
          justifyContent: 'center'
        })}
      >
        <Link
          href='#pricing-plans'
          css={theme({
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 4,
            py: 3,
            borderRadius: 5,
            bg: 'black',
            color: 'white',
            fontWeight: 'bold',
            fontSize: [1, 1, 2, 2],
            textDecoration: 'none',
            minHeight: '44px',
            transition: 'transform 150ms cubic-bezier(.25,.8,.25,1)',
            '&:hover': {
              transform: 'translateY(-1px)'
            }
          })}
        >
          See plans ↓
        </Link>
        <Link
          href='mailto:hello@microlink.io?subject=Microlink%20pricing'
          css={theme({
            color: 'black80',
            fontWeight: 'bold',
            fontSize: [1, 1, 2, 2],
            textDecoration: 'none',
            borderBottom: 1,
            borderBottomColor: 'black20',
            pb: 1,
            '&:hover': {
              borderBottomColor: 'pink7',
              color: 'pink7'
            }
          })}
        >
          Talk to sales →
        </Link>
      </Flex>

      <Box
        aria-hidden='true'
        css={`
          margin-top: 32px;
          width: 100%;
          max-width: ${layout.normal};
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            ${colors.black10},
            transparent
          );
        `}
      />
    </Container>
  )
}

export default Hero
