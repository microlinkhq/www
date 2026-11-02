import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
import {
  SECTION_VERTICAL_SPACING,
  colors,
  layout,
  theme,
  toPx,
  transition
} from 'theme'
import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Caption from 'components/patterns/Caption/Caption'
import {
  CUSTOMERS,
  customerPath
} from 'components/patterns/CustomerStory/customers'
import DotsBackground from 'components/patterns/DotsBackground/DotsBackground'
import { SignupLink } from 'components/patterns/SignupLink'
import { FREE_PLAN_REQUESTS_PER_DAY } from 'helpers/free-tier'
import analyticsData from '../../../../data/analytics.json'

const [{ reqs_pretty: reqsPretty }] = analyticsData

export const FREE_KEY_FACTS = [
  `${FREE_PLAN_REQUESTS_PER_DAY} requests/day`,
  'Every Pro feature',
  'No credit card'
]

const AVATAR_SIZE = 40
const AVATAR_TOUCH_SIZE = 44
const AVATAR_OVERLAP = 10
const AVATAR_SIZES = [AVATAR_TOUCH_SIZE, AVATAR_SIZE, AVATAR_SIZE, AVATAR_SIZE]
const AVATAR_OVERLAPS = [0, AVATAR_OVERLAP, AVATAR_OVERLAP, AVATAR_OVERLAP]
const BUTTON_MIN_WIDTH = ['100%', '320px', '320px', '320px']

const AvatarLink = styled(GatsbyLink)`
  touch-action: manipulation;

  ${theme({
    position: 'relative',
    display: 'block',
    borderRadius: '50%',
    _hover: { zIndex: 1 },
    _focusVisible: {
      zIndex: 1,
      outline: `2px solid ${colors.link}`,
      outlineOffset: '2px'
    }
  })}

  @media (prefers-reduced-motion: no-preference) {
    transition: transform ${transition.short};

    &:hover,
    &:focus-visible {
      transform: translateY(-2px);
    }
  }
`

const CustomerAvatars = () => (
  <Flex
    as='ul'
    aria-label='Customer stories'
    css={theme({
      listStyle: 'none',
      m: 0,
      p: 0,
      pl: AVATAR_OVERLAPS.map(toPx),
      gap: [1, 0, 0, 0]
    })}
  >
    {CUSTOMERS.map(({ slug, author, name, avatar }) => (
      <Box
        as='li'
        key={slug}
        css={theme({ ml: AVATAR_OVERLAPS.map(overlap => toPx(-overlap)) })}
      >
        <AvatarLink
          to={customerPath(slug)}
          aria-label={`${name} customer story, with ${author}`}
          title={`${author}, ${name}`}
        >
          <img
            src={avatar}
            alt=''
            width={AVATAR_TOUCH_SIZE}
            height={AVATAR_TOUCH_SIZE}
            loading='lazy'
            decoding='async'
            css={theme({
              display: 'block',
              width: AVATAR_SIZES.map(toPx),
              height: AVATAR_SIZES.map(toPx),
              borderRadius: '50%',
              border: 2,
              borderColor: 'white',
              objectFit: 'cover'
            })}
          />
        </AvatarLink>
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

const ACTION_LABEL = 'Get your free API key'

const actionCss = theme({
  mt: [4, 4, 5, 5],
  minWidth: BUTTON_MIN_WIDTH,
  px: [3, 3, 5, 5],
  py: 3,
  fontSize: [1, 1, 2, 2],
  borderRadius: 3,
  boxShadow: 2,
  whiteSpace: 'normal'
})

const PrimaryAction = ({ action, cta }) =>
  action
    ? (
      <Button forwardedAs='a' href={action.href} css={actionCss}>
        {action.label}
      </Button>
      )
    : (
      <SignupLink component={Button} forwardedAs='a' cta={cta} css={actionCss}>
        {ACTION_LABEL}
      </SignupLink>
      )

const Facts = ({ facts }) => (
  <Text
    css={theme({
      pt: 3,
      fontSize: 0,
      color: 'black60',
      textWrap: 'balance'
    })}
  >
    {facts.map((fact, index) => (
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
)

const NextSteps = ({ links }) => (
  <Flex
    as='ul'
    aria-label='Other ways to start'
    css={theme({
      pt: [4, 4, 5, 5],
      gap: [3, 3, 4, 4],
      flexWrap: 'wrap',
      justifyContent: 'center',
      listStyle: 'none',
      m: 0,
      pl: 0
    })}
  >
    {links.map(({ href, label }) => (
      <Text as='li' key={href}>
        <Link href={href}>{label}</Link>
      </Text>
    ))}
  </Flex>
)

const captionFor = ({ caption, outcome }) =>
  caption || `Sign up, add the key to your requests, and start ${outcome}.`

export const CallToAction = ({
  id,
  outcome,
  caption,
  cta,
  action,
  facts = FREE_KEY_FACTS,
  links = [],
  children
}) => (
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
          <Subhead>Start building</Subhead>
          <Caption
            forwardedAs='div'
            css={theme({
              pt: [3, 3, 4, 4],
              maxWidth: layout.small,
              color: 'black70'
            })}
          >
            {captionFor({ caption, outcome })}
          </Caption>
          <PrimaryAction cta={cta} action={action} />
          {facts.length > 0 && <Facts facts={facts} />}
          <SocialProof />
          {links.length > 0 && <NextSteps links={links} />}
          {children && <Box css={theme({ pt: [4, 4, 5, 5] })}>{children}</Box>}
        </Flex>
      </DotsBackground>
    </Box>
  </Container>
)
