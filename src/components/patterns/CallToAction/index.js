import React from 'react'
import { SECTION_VERTICAL_SPACING, layout, theme } from 'theme'
import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Caption from 'components/patterns/Caption/Caption'
import { CUSTOMERS } from 'components/patterns/CustomerStory/customers'
import DotsBackground from 'components/patterns/DotsBackground/DotsBackground'
import { SignupLink } from 'components/patterns/SignupLink'
import { FREE_PLAN_REQUESTS_PER_DAY } from 'helpers/free-tier'
import analyticsData from '../../../../data/analytics.json'

const [{ reqs_pretty: reqsPretty }] = analyticsData

const FREE_KEY_FACTS = [
  `${FREE_PLAN_REQUESTS_PER_DAY} requests/day`,
  'Every Pro feature',
  'No credit card'
]

const AVATAR_SIZE = '40px'
const AVATAR_OVERLAP = '-10px'
const BUTTON_MIN_WIDTH = ['100%', '320px', '320px', '320px']

const CustomerAvatars = () => (
  <Flex as='ul' css={theme({ listStyle: 'none', m: 0, p: 0 })}>
    {CUSTOMERS.map(({ slug, author, name, avatar }, index) => (
      <Box
        as='li'
        key={slug}
        css={theme({ ml: index === 0 ? 0 : AVATAR_OVERLAP })}
      >
        <img
          src={avatar}
          alt={`${author}, ${name}`}
          width='40'
          height='40'
          loading='lazy'
          decoding='async'
          css={theme({
            display: 'block',
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: '50%',
            border: 2,
            borderColor: 'white',
            objectFit: 'cover'
          })}
        />
      </Box>
    ))}
  </Flex>
)

const SocialProof = () => (
  <Flex
    css={theme({
      pt: [4, 4, 5, 5],
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2
    })}
  >
    <CustomerAvatars />
    <Text css={theme({ color: 'black60', textWrap: 'balance' })}>
      Trusted with{' '}
      <Text
        as='span'
        css={theme({
          color: 'black',
          fontWeight: 'bold',
          fontVariantNumeric: 'tabular-nums'
        })}
      >
        {reqsPretty}+
      </Text>{' '}
      requests every month
    </Text>
  </Flex>
)

export const CallToAction = ({ id, outcome, cta, children }) => (
  <Container
    as='section'
    id={id}
    css={theme({
      alignItems: 'center',
      maxWidth: '100%',
      bg: 'white',
      px: [3, 3, 4, 4],
      py: SECTION_VERTICAL_SPACING
    })}
  >
    <Box
      css={theme({
        width: '100%',
        maxWidth: layout.large,
        p: 2,
        bg: 'gray0',
        border: 1,
        borderColor: 'black05',
        borderRadius: 5
      })}
    >
      <DotsBackground
        css={theme({
          minHeight: 'auto',
          overflow: 'hidden',
          isolation: 'isolate',
          bg: 'white',
          border: 1,
          borderColor: 'black10',
          borderRadius: 4,
          boxShadow: 2
        })}
      >
        <Flex
          css={theme({
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            px: [3, 4, 5, 5],
            py: [5, 5, 6, 6]
          })}
        >
          <Subhead>Start free</Subhead>
          <Caption
            forwardedAs='div'
            css={theme({
              pt: [3, 3, 4, 4],
              maxWidth: layout.small,
              color: 'black70'
            })}
          >
            Sign up, add the key to your requests, and start {outcome}.
          </Caption>
          <SignupLink
            component={Button}
            forwardedAs='a'
            cta={cta}
            css={theme({
              mt: [4, 4, 5, 5],
              minWidth: BUTTON_MIN_WIDTH,
              px: [3, 3, 5, 5],
              py: 3,
              fontSize: [1, 1, 2, 2],
              borderRadius: 3,
              boxShadow: 2,
              whiteSpace: 'normal'
            })}
          >
            Get your free API key
          </SignupLink>
          <Text
            css={theme({
              pt: 3,
              fontSize: 0,
              color: 'black60',
              textWrap: 'balance'
            })}
          >
            {FREE_KEY_FACTS.map((fact, index) => (
              <React.Fragment key={fact}>
                {index > 0 && ' · '}
                <Text
                  as='span'
                  css={theme({ fontSize: 'inherit', whiteSpace: 'nowrap' })}
                >
                  {fact}
                </Text>
              </React.Fragment>
            ))}
          </Text>
          <SocialProof />
          {children && <Box css={theme({ pt: [4, 4, 5, 5] })}>{children}</Box>}
        </Flex>
      </DotsBackground>
    </Box>
  </Container>
)
