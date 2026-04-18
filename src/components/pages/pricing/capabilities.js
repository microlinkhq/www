import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import { Link } from 'components/elements/Link'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import CaptionBase from 'components/patterns/Caption/Caption'
import { withTitle } from 'helpers/hoc/with-title'
import { layout, space, theme } from 'theme'

const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]

const ClockIcon = (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <circle cx='12' cy='12' r='10' />
    <polyline points='12 6 12 12 16 14' />
  </svg>
)

const HeaderIcon = (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <line x1='4' y1='9' x2='20' y2='9' />
    <line x1='4' y1='15' x2='20' y2='15' />
    <line x1='10' y1='3' x2='8' y2='21' />
    <line x1='16' y1='3' x2='14' y2='21' />
  </svg>
)

const ProxyIcon = (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <circle cx='12' cy='12' r='10' />
    <line x1='2' y1='12' x2='22' y2='12' />
    <path d='M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z' />
  </svg>
)

const ShieldXIcon = (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
    <line x1='9' y1='9' x2='15' y2='15' />
    <line x1='15' y1='9' x2='9' y2='15' />
  </svg>
)

const CdnIcon = (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <circle cx='12' cy='12' r='10' />
    <ellipse cx='12' cy='12' rx='4' ry='10' />
    <line x1='2' y1='12' x2='22' y2='12' />
  </svg>
)

const ActivityIcon = (
  <svg
    width='20'
    height='20'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    aria-hidden='true'
  >
    <polyline points='22 12 18 12 15 21 9 3 6 12 2 12' />
  </svg>
)

const CAPABILITIES = [
  {
    icon: ClockIcon,
    title: 'Configurable cache (TTL)',
    description:
      'Tune cache lifetime per request. Cached hits are served from the edge and billed at a fraction of the price.',
    href: '/docs/api/parameters/ttl'
  },
  {
    icon: HeaderIcon,
    title: 'Custom HTTP headers',
    description:
      'Forward auth tokens, cookies, or any custom headers. Reach private dashboards, gated content, and authenticated APIs.',
    href: '/docs/api/parameters/headers'
  },
  {
    icon: ProxyIcon,
    title: 'Automatic proxy resolution',
    description:
      'Bypass geo-restrictions and avoid IP blocks with rotating residential proxies. Pick the country, we handle the rest.',
    href: '/docs/api/parameters/proxy'
  },
  {
    icon: ShieldXIcon,
    title: 'Adblock & cookie banners',
    description:
      'Strip ads, trackers, and consent banners automatically so screenshots and previews stay clean and consistent.',
    href: '/docs/api/parameters/adblock'
  },
  {
    icon: CdnIcon,
    title: 'Global edge cache',
    description:
      'Responses cached across 240+ Cloudflare nodes. Users see results in milliseconds, no matter where they are.',
    href: '/docs/api/basics/cache'
  },
  {
    icon: ActivityIcon,
    title: '99.9% SLA & live status',
    description:
      'Three-nines uptime backed by isolated browser instances and real-time monitoring on a public status page.',
    href: '/status'
  }
]

const CapabilityIcon = styled(Flex)`
  ${theme({
    width: space[4],
    height: space[4],
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    color: 'pink7',
    bg: 'pinkest'
  })}
`

const CapabilityTile = ({ icon, title, description, href }) => (
  <Flex
    css={theme({
      gap: 3,
      alignItems: 'flex-start',
      flex: [
        '1 1 100%',
        '1 1 100%',
        '1 1 calc(50% - 16px)',
        '1 1 calc(33.333% - 24px)'
      ],
      minWidth: 0
    })}
  >
    <CapabilityIcon>{icon}</CapabilityIcon>
    <Flex
      css={theme({ flexDirection: 'column', gap: 1, flex: 1, minWidth: 0 })}
    >
      <Text
        css={theme({
          fontWeight: 'bold',
          fontSize: [2, 2, '18px', '18px'],
          color: 'black',
          lineHeight: 1
        })}
      >
        {title}
      </Text>
      <Text
        css={theme({
          fontSize: [1, 1, '15px', '15px'],
          color: 'black70',
          lineHeight: 2
        })}
      >
        {description}
      </Text>
      {href && (
        <Box css={theme({ pt: 1 })}>
          <Link
            href={href}
            css={theme({
              fontSize: [0, 0, 1, 1],
              fontWeight: 'bold',
              color: 'pink7'
            })}
          >
            Read the docs →
          </Link>
        </Box>
      )}
    </Flex>
  </Flex>
)

const Capabilities = () => (
  <Container
    as='section'
    id='capabilities'
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
        textAlign: 'left',
        width: '100%',
        maxWidth: layout.large,
        pb: [4, 4, 5, 5]
      })}
    >
      <Subhead
        titleize={false}
        css={theme({
          fontSize: ['28px', '34px', '42px', '46px'],
          textAlign: 'left'
        })}
      >
        Everything you need,
        <LineBreak />
        in <span css={theme({ color: 'pink7' })}>one API call</span>.
      </Subhead>
      <Caption
        forwardedAs='div'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          fontSize: [1, 2, 2, 2],
          textAlign: 'left',
          maxWidth: layout.normal
        })}
      >
        Every paid plan unlocks the same set of capabilities. Pay for the volume
        you need, not for features you don&apos;t.
      </Caption>
    </Box>

    <Flex
      css={theme({
        width: '100%',
        maxWidth: layout.large,
        flexWrap: 'wrap',
        rowGap: [4, 4, 4, 5],
        columnGap: [0, 0, 4, 5]
      })}
    >
      {CAPABILITIES.map(capability => (
        <CapabilityTile key={capability.title} {...capability} />
      ))}
    </Flex>
  </Container>
)

export default Capabilities
