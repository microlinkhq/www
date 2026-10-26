import React from 'react'
import { SECTION_VERTICAL_SPACING, colors, layout, theme } from 'theme'
import { Check as CheckIcon } from 'react-feather'
import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Caption from 'components/patterns/Caption/Caption'
import { SignupLink } from 'components/patterns/SignupLink'
import { FREE_PLAN_REQUESTS_PER_DAY } from 'helpers/free-tier'

const FREE_KEY_PERKS = [
  `${FREE_PLAN_REQUESTS_PER_DAY} requests/day`,
  'Every Pro feature',
  'No credit card'
]

export const CallToAction = ({ id, outcome, cta, children }) => (
  <Container
    as='section'
    id={id}
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'white',
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: layout.normal,
        px: [4, 4, 4, 0],
        mx: 'auto'
      })}
    >
      <Subhead
        css={theme({
          textAlign: 'center'
        })}
      >
        Start free
      </Subhead>
      <Caption
        forwardedAs='div'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: [layout.small, layout.small, layout.normal, layout.normal],
          textAlign: 'center'
        })}
      >
        Sign up, add the key to your requests, and start {outcome}.
      </Caption>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: 'center'
        })}
      >
        <SignupLink cta={cta} css={theme({ fontSize: 2 })}>
          Get your free API key
        </SignupLink>
      </Flex>
      <Flex
        css={theme({
          pt: [4, 4, 5, 5],
          gap: [3, 3, 4, 4],
          flexWrap: 'wrap',
          justifyContent: 'center'
        })}
      >
        {FREE_KEY_PERKS.map(label => (
          <Flex
            key={label}
            css={theme({
              alignItems: 'center',
              gap: 1,
              color: 'black80',
              fontSize: [0, 0, 1, 1]
            })}
          >
            <CheckIcon size={16} color={colors.close} />
            <Text as='span'>{label}</Text>
          </Flex>
        ))}
      </Flex>
      {children && <Box css={theme({ pt: [4, 4, 5, 5] })}>{children}</Box>}
    </Flex>
  </Container>
)
