import React from 'react'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import Heading from 'components/elements/Heading'
import { Terminal as TerminalPromptIcon } from 'components/icons/Terminal'
import ArrowLink from 'components/patterns/ArrowLink'
import Caption from 'components/patterns/Caption/Caption'

import { layout, SECTION_VERTICAL_SPACING, theme } from 'theme'

import { HeroFeatures, HeroQuickStart } from './hero-aside'
import Playground from './playground'
import { ACCENT, HERO_LAYOUT_MAX_WIDTH } from './shared'

const Section = ({ children, css: cssProp, ...props }) => (
  <Container
    as='section'
    css={theme({
      maxWidth: '100%',
      pt: 0,
      px: 0,
      pb: SECTION_VERTICAL_SPACING,
      position: 'relative',
      ...cssProp
    })}
    {...props}
  >
    {children}
  </Container>
)

const ButtonIcon = ({ children }) => (
  <Flex
    css={theme({
      width: '16px',
      height: '16px',
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center'
    })}
    aria-hidden='true'
  >
    {children}
  </Flex>
)

const HERO_GRID_AREAS_MOBILE = `
  "copy"
  "demo"
  "install"
  "features"
`

const HERO_GRID_AREAS_DESKTOP = `
  "copy demo"
  "install demo"
  "features demo"
`

const Hero = () => (
  <Section
    id='hero'
    css={theme({
      maxWidth: HERO_LAYOUT_MAX_WIDTH
    })}
  >
    <Box
      css={theme({
        width: '100%',
        maxWidth: HERO_LAYOUT_MAX_WIDTH,
        mx: 'auto',
        display: 'grid',
        gridTemplateColumns: [
          'minmax(0, 1fr)',
          'minmax(0, 1fr)',
          'minmax(0, 1fr) minmax(0, 1fr)',
          'minmax(0, 540px) minmax(0, 1fr)'
        ],
        gridTemplateAreas: [
          HERO_GRID_AREAS_MOBILE,
          HERO_GRID_AREAS_MOBILE,
          HERO_GRID_AREAS_DESKTOP,
          HERO_GRID_AREAS_DESKTOP
        ],
        alignItems: ['stretch', 'stretch', 'start', 'start'],
        gap: [4, 4, 4, 5],
        columnGap: [0, 0, 5, 5]
      })}
    >
      <Box
        css={theme({
          gridArea: 'copy',
          minWidth: 0,
          maxWidth: ['100%', '100%', '520px', '540px'],
          mx: ['auto', 'auto', 0, 0],
          textAlign: ['center', 'center', 'left', 'left']
        })}
      >
        <Heading
          variant={null}
          css={theme({ textAlign: ['center', 'center', 'left', 'left'] })}
        >
          The Microlink API
          <LineBreak />
          in your <span css={theme({ color: ACCENT })}>terminal</span>.
        </Heading>
        <Caption
          forwardedAs='p'
          css={theme({
            pt: [3, 3, 4, 4],
            maxWidth: layout.small,
            mx: ['auto', 'auto', 0, 0],
            textAlign: ['center', 'center', 'left', 'left']
          })}
        >
          Type a URL. Get metadata as pretty JSON. Name screenshot, markdown, or
          pdf and get the file. Same flags as the API.
        </Caption>
        <Flex
          css={theme({
            pt: [3, 3, 4, 4],
            gap: [2, 2, 3, 3],
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: ['center', 'center', 'flex-start', 'flex-start']
          })}
        >
          <Button
            as='a'
            href='/terminal'
            variant='black'
            data-event-location='CLI Hero'
            data-event-name='Try now'
          >
            <Flex
              as='span'
              css={theme({
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                whiteSpace: 'nowrap'
              })}
            >
              <ButtonIcon>
                <TerminalPromptIcon width={16} height={16} />
              </ButtonIcon>
              Try now
            </Flex>
          </Button>
          <ArrowLink
            href='/docs/sdk/getting-started/cli'
            css={theme({ fontSize: 1 })}
            data-event-location='CLI Hero'
            data-event-name='Read the docs'
          >
            Read the docs
          </ArrowLink>
        </Flex>
      </Box>

      <Box
        css={theme({
          gridArea: 'demo',
          minWidth: 0,
          width: '100%',
          alignSelf: ['center', 'center', 'start', 'start'],
          position: ['static', 'static', 'sticky', 'sticky'],
          top: [0, 0, 4, 4]
        })}
      >
        <Playground />
      </Box>

      <Box
        css={theme({
          gridArea: 'install',
          minWidth: 0,
          maxWidth: ['100%', '100%', '520px', '540px'],
          mx: ['auto', 'auto', 0, 0],
          width: '100%'
        })}
      >
        <HeroQuickStart />
      </Box>

      <HeroFeatures />
    </Box>
  </Section>
)

export default Hero
