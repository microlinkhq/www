import React from 'react'
import { SECTION_VERTICAL_SPACING, colors, layout, theme } from 'theme'
import { ArrowRight, Zap } from 'react-feather'
import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Caption from 'components/patterns/Caption/Caption'
import DotsBackground from 'components/patterns/DotsBackground/DotsBackground'
import { SignupLink } from 'components/patterns/SignupLink'
import { FREE_PLAN_REQUESTS_PER_DAY } from 'helpers/free-tier'

const CARD_WIDTH = ['100%', '100%', '400px', '400px']
const PILL_RADIUS = '999px'

const FreeKeyCard = ({ cta, children }) => (
  <Flex
    css={theme({
      flexDirection: 'column',
      alignItems: 'center',
      flexShrink: 0,
      width: CARD_WIDTH,
      p: [3, 3, 4, 4],
      bg: 'white',
      border: 1,
      borderColor: 'black10',
      borderRadius: 5,
      boxShadow: 3,
      textAlign: 'center'
    })}
  >
    <Flex
      css={theme({
        alignItems: 'center',
        gap: 2,
        px: [3, 3, 4, 4],
        py: 3,
        bg: 'blue0',
        borderRadius: PILL_RADIUS
      })}
    >
      <Zap size={22} color={colors.link} aria-hidden='true' />
      <Text
        as='span'
        css={theme({
          fontWeight: 'bold',
          fontVariantNumeric: 'tabular-nums',
          whiteSpace: 'nowrap'
        })}
      >
        {FREE_PLAN_REQUESTS_PER_DAY} requests/day
      </Text>
    </Flex>
    <Text css={theme({ pt: 3, color: 'black60', textWrap: 'balance' })}>
      Every Pro feature. No credit card.
    </Text>
    <SignupLink
      component={Button}
      forwardedAs='a'
      cta={cta}
      css={theme({
        mt: 4,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        fontSize: [1, 1, 2, 2],
        whiteSpace: 'normal'
      })}
    >
      Get your free API key
      <ArrowRight size={18} aria-hidden='true' />
    </SignupLink>
    {children && <Box css={theme({ pt: 4 })}>{children}</Box>}
  </Flex>
)

export const CallToAction = ({ id, outcome, cta, children }) => (
  <DotsBackground
    css={theme({
      minHeight: 'auto',
      overflow: 'hidden',
      isolation: 'isolate',
      bg: 'white'
    })}
  >
    <Container
      as='section'
      id={id}
      css={theme({
        alignItems: 'center',
        maxWidth: '100%',
        py: SECTION_VERTICAL_SPACING
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          maxWidth: layout.large,
          px: [0, 0, 4, 0],
          mx: 'auto',
          gap: [4, 4, 5, 5],
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: 'center',
          justifyContent: 'space-between'
        })}
      >
        <Flex
          css={theme({
            flexDirection: 'column',
            alignItems: ['center', 'center', 'flex-start', 'flex-start'],
            minWidth: 0
          })}
        >
          <Subhead
            css={theme({ textAlign: ['center', 'center', 'left', 'left'] })}
          >
            Start free
          </Subhead>
          <Caption
            forwardedAs='div'
            css={theme({
              pt: [3, 3, 4, 4],
              maxWidth: layout.small,
              textAlign: ['center', 'center', 'left', 'left']
            })}
          >
            Sign up, add the key to your requests, and start {outcome}.
          </Caption>
        </Flex>
        <FreeKeyCard cta={cta}>{children}</FreeKeyCard>
      </Flex>
    </Container>
  </DotsBackground>
)
