import React from 'react'
import styled from 'styled-components'
import { Check as CheckIcon, X as XIcon } from 'react-feather'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import FeatherIcon from 'components/icons/Feather'
import CaptionBase from 'components/patterns/Caption/Caption'
import { withTitle } from 'helpers/hoc/with-title'
import { borders, colors, gradient, layout, theme } from 'theme'

const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const SECTION_VERTICAL_SPACING = [4, 4, 5, 5]

const BUILD_BULLETS = [
  'Spin up Chromium clusters and babysit browser pools.',
  '$200–$800 / month minimum on infra (browsers are RAM-hungry).',
  '~2 weeks to a working v1, then ~4 hrs / month maintenance.',
  'Build retries, caching, proxies, and adblock from scratch.',
  'Wake up at 3 a.m. when the cluster goes down.'
]

const BUY_BULLETS = [
  'One HTTP call. No SDK to install, no daemon to run.',
  'Start at €0. Pay only for the volume you actually use.',
  'Zero ops: cache, proxies, adblock, retries baked in.',
  '240+ edge nodes, 99.9% SLA, isolated browsers per request.',
  'Spend engineering time on your product, not on Chromium.'
]

const Card = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
    borderRadius: 3,
    px: [3, 3, 4, 4],
    py: [4, 4, 5, 5],
    bg: 'white'
  })}
  border: ${borders[1]};
`

const BuildCard = styled(Card)`
  ${theme({ bg: 'black05' })}
  border-color: ${colors.black10};
  box-shadow: 0 1px 4px ${colors.black05};
`

const BuyCard = styled(Card)`
  border: 2px solid transparent;
  background: linear-gradient(${colors.white}, ${colors.white}) padding-box,
    ${gradient} border-box;
  box-shadow: 0 12px 32px ${colors.black10};

  @media (min-width: 1024px) {
    transform: translateY(-8px);
  }
`

const Bullet = ({ children, kind }) => (
  <Flex
    css={theme({
      alignItems: 'flex-start',
      gap: 2,
      pt: [2, 2, 3, 3]
    })}
  >
    <FeatherIcon
      css={theme({
        flexShrink: 0,
        pt: '4px',
        color: kind === 'buy' ? 'pink7' : 'black40'
      })}
      icon={kind === 'buy' ? CheckIcon : XIcon}
      size='16px'
    />
    <Text
      as='span'
      css={theme({
        fontSize: [1, 1, '15px', '15px'],
        color: kind === 'buy' ? 'black' : 'black70',
        lineHeight: 2
      })}
    >
      {children}
    </Text>
  </Flex>
)

const BuildVsBuy = () => (
  <Container
    as='section'
    id='build-vs-buy'
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
        Build it,
        <LineBreak />
        or just <span css={theme({ color: 'pink7' })}>call it</span>.
      </Subhead>
      <Caption
        forwardedAs='div'
        titleize={false}
        css={theme({
          pt: [3, 3, 4, 4],
          fontSize: [1, 2, 2, 2]
        })}
      >
        We&apos;ve been running headless browsers in production since 2017. So
        you don&apos;t have to.
      </Caption>
    </Box>

    <Flex
      css={theme({
        width: '100%',
        maxWidth: layout.large,
        flexDirection: ['column', 'column', 'row', 'row'],
        alignItems: ['stretch', 'stretch', 'flex-start', 'flex-start'],
        gap: [3, 3, 4, 4]
      })}
    >
      <BuildCard>
        <Text
          as='span'
          css={theme({
            fontSize: 0,
            fontWeight: 'bold',
            letterSpacing: 2,
            color: 'black60',
            textTransform: 'uppercase'
          })}
        >
          Run it yourself
        </Text>
        <Text
          css={theme({
            pt: 2,
            fontSize: ['22px', '22px', '26px', '26px'],
            fontWeight: 'bold',
            color: 'black',
            lineHeight: 1
          })}
        >
          The DIY tax.
        </Text>
        <Box css={theme({ pt: [3, 3, 4, 4], flex: 1 })}>
          {BUILD_BULLETS.map(bullet => (
            <Bullet key={bullet} kind='build'>
              {bullet}
            </Bullet>
          ))}
        </Box>
      </BuildCard>

      <BuyCard>
        <Text
          as='span'
          css={theme({
            fontSize: 0,
            fontWeight: 'bold',
            letterSpacing: 2,
            color: 'pink7',
            textTransform: 'uppercase'
          })}
        >
          Use Microlink
        </Text>
        <Text
          css={theme({
            pt: 2,
            fontSize: ['22px', '22px', '26px', '26px'],
            fontWeight: 'bold',
            color: 'black',
            lineHeight: 1
          })}
        >
          Headless browsers, as a service.
        </Text>
        <Box css={theme({ pt: [3, 3, 4, 4], flex: 1 })}>
          {BUY_BULLETS.map(bullet => (
            <Bullet key={bullet} kind='buy'>
              {bullet}
            </Bullet>
          ))}
        </Box>
      </BuyCard>
    </Flex>
  </Container>
)

export default BuildVsBuy
