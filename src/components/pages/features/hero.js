import { breakpoints, layout, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'
import { Link as LinkIcon, Lock, Shield, Zap } from 'react-feather'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Heading from 'components/elements/Heading'
import Text from 'components/elements/Text'

import {
  Caption,
  Eyebrow,
  Section,
  SectionInner
} from 'components/patterns/FeatureStory'

import { CompositionVisual } from './hero-visual'

const PILLARS = [
  { icon: LinkIcon, lead: 'Same', emphasis: 'endpoint' },
  { icon: Zap, lead: 'All in one', emphasis: 'response' },
  { icon: Shield, lead: 'No extra', emphasis: 'vendors' },
  { icon: Lock, lead: 'No secrets', emphasis: 'in the URL' }
]

const HeroGrid = styled(Box)`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  ${theme({ gap: [4, 4, 5, 5] })}
  align-items: start;

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.2fr);
    align-items: center;
  }
`

const Pillars = () => (
  <Box
    as='ul'
    css={theme({
      listStyle: 'none',
      m: 0,
      p: 0,
      pt: [4, 4, 5, 5],
      display: 'grid',
      gridTemplateColumns: [
        '1fr 1fr',
        '1fr 1fr',
        'repeat(4, minmax(0, 1fr))',
        'repeat(4, minmax(0, 1fr))'
      ],
      gap: [3, 3, 3, 3]
    })}
  >
    {PILLARS.map(({ icon: Icon, lead, emphasis }) => (
      <Flex
        as='li'
        key={emphasis}
        css={theme({
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 2,
          minWidth: 0
        })}
      >
        <Box
          aria-hidden='true'
          css={theme({ color: 'black', display: 'flex' })}
        >
          <Icon size={18} strokeWidth={1.75} />
        </Box>
        <Box>
          <Text
            css={theme({
              display: 'block',
              fontSize: 0,
              color: 'black60',
              lineHeight: 1
            })}
          >
            {lead}
          </Text>
          <Text
            css={theme({
              display: 'block',
              fontSize: 0,
              fontWeight: 'bold',
              color: 'black',
              lineHeight: 1,
              pt: 1
            })}
          >
            {emphasis}
          </Text>
        </Box>
      </Flex>
    ))}
  </Box>
)

export const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [4, 4, 5, 5] })}>
    <SectionInner
      css={theme({
        maxWidth: ['100%', '100%', '1080px', '1080px']
      })}
    >
      <HeroGrid>
        <Box>
          <Eyebrow css={theme({ pb: [3, 3, 3, 3], display: 'block' })}>
            Features
          </Eyebrow>
          <Heading variant={null} css={theme({ textAlign: 'left' })}>
            Explore the core capabilities
            <Text as='span' css={theme({ color: 'secondary' })}>
              .
            </Text>
          </Heading>
          <Caption
            forwardedAs='p'
            titleize={false}
            css={theme({
              pt: [3, 3, 3, 3],
              textAlign: 'left',
              maxWidth: layout.small,
              mx: 0,
              color: 'black70'
            })}
          >
            These engineering features power every Microlink product. One
            request. All features. No glue code.
          </Caption>
          <Box css={theme({ pt: [3, 3, 3, 3] })}>
            <Link
              href='#compose'
              css={theme({
                color: 'secondary',
                fontWeight: 'bold',
                fontSize: [1, 1, 2, 2],
                textDecoration: 'none'
              })}
            >
              See how it works →
            </Link>
          </Box>
          <Pillars />
        </Box>
        <CompositionVisual />
      </HeroGrid>
    </SectionInner>
  </Section>
)
