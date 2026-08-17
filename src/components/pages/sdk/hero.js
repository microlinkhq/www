import React from 'react'
import { Globe, Package, Unlock, Zap } from 'react-feather'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import LineBreak from 'components/elements/LineBreak'
import Text from 'components/elements/Text'

import { GitHub as GitHubIcon } from 'components/icons/GitHub'
import Caption from 'components/patterns/Caption/Caption'

import {
  ACCENT,
  INSTALL_SNIPPET,
  REPOSITORY_URL,
  Section
} from 'components/pages/sdk/shared'

import { colors, layout, space, theme } from 'theme'

const FEATURE_ICON_SIZE = 20

const featureIconProps = {
  size: FEATURE_ICON_SIZE,
  strokeWidth: 2.25,
  color: colors.blue7
}

const HERO_FEATURES = [
  {
    title: 'One import',
    description:
      'Every Microlink product behind a single createClient() factory.',
    icon: <Package {...featureIconProps} aria-hidden='true' />
  },
  {
    title: 'Runs everywhere',
    description: 'Node.js, browsers, and Deno — same code, same responses.',
    icon: <Globe {...featureIconProps} aria-hidden='true' />
  },
  {
    title: 'Batteries included',
    description:
      'HTTP, auth, retries, errors, and binary handling already solved by @microlink/mql underneath.',
    icon: <Zap {...featureIconProps} aria-hidden='true' />
  },
  {
    title: 'Free to start',
    description: 'No API key needed; add one for search and pro quotas.',
    icon: <Unlock {...featureIconProps} aria-hidden='true' />
  }
]

const HeroFeatureIcon = ({ children }) => (
  <Flex
    css={theme({
      width: space[4],
      height: space[4],
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      bg: 'blue0',
      border: 1,
      borderColor: 'blue2',
      borderRadius: 3
    })}
    aria-hidden='true'
  >
    {children}
  </Flex>
)

const HeroFeature = ({ icon, title, description }) => (
  <Flex
    as='li'
    css={theme({
      gap: 3,
      alignItems: 'flex-start',
      minWidth: 0
    })}
  >
    <HeroFeatureIcon>{icon}</HeroFeatureIcon>
    <Box css={theme({ minWidth: 0 })}>
      <Text
        as='h2'
        css={theme({
          m: 0,
          color: 'black',
          fontSize: [1, 1, 2, 2],
          fontWeight: 'bold',
          lineHeight: 1.2
        })}
      >
        {title}
      </Text>
      <Text
        css={theme({
          m: 0,
          mt: 1,
          color: 'black80',
          fontSize: [0, 0, 1, 1],
          lineHeight: 2
        })}
      >
        {description}
      </Text>
    </Box>
  </Flex>
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

const HeroQuickStart = () => (
  <Box
    id='install'
    css={theme({
      pt: [4, 4, 5, 5],
      pb: [3, 3, 4, 4],
      width: '100%',
      maxWidth: '480px',
      minWidth: 0
    })}
  >
    <Caps
      css={theme({
        color: 'black50',
        fontWeight: 'bold',
        fontSize: 0,
        letterSpacing: 2,
        pb: 2
      })}
    >
      Quick start
    </Caps>
    <CodeEditor
      language='shell'
      autoHeight
      showFade={false}
      showTitle={false}
      blinkCursor
      css={theme({
        width: '100%',
        maxWidth: '100%',
        textAlign: 'left'
      })}
      aria-label='Install the Microlink SDK'
    >
      {INSTALL_SNIPPET}
    </CodeEditor>
  </Box>
)

const Hero = () => (
  <Section id='hero'>
    <Flex
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: layout.large,
        mx: 'auto',
        width: '100%'
      })}
    >
      <Heading variant={null} css={theme({ textAlign: 'center' })}>
        The official <span css={theme({ color: ACCENT })}>SDK</span>
        <LineBreak />
        for the Microlink API.
      </Heading>
      <Caption
        forwardedAs='p'
        css={theme({
          pt: [3, 3, 4, 4],
          maxWidth: layout.normal,
          mx: 'auto',
          textAlign: 'center'
        })}
      >
        One import gives you every Microlink product as a semantic method —
        screenshots, PDFs, metadata, scraping, search — in Node.js, browsers,
        and Deno.
      </Caption>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <Button
          as='a'
          href={REPOSITORY_URL}
          variant='white'
          rel='noopener noreferrer'
          target='_blank'
          data-event-location='SDK Hero'
          data-event-name='View on GitHub'
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
              <GitHubIcon width={16} height={16} />
            </ButtonIcon>
            View on GitHub
          </Flex>
        </Button>
      </Box>
      <HeroQuickStart />
      <Box
        as='ul'
        css={theme({
          display: 'grid',
          gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr'],
          gap: [3, 3, 4, 4],
          columnGap: [3, 3, 5, 5],
          pt: [4, 4, 5, 5],
          px: 0,
          pb: 0,
          m: 0,
          listStyle: 'none',
          maxWidth: '760px',
          width: '100%',
          textAlign: 'left'
        })}
      >
        {HERO_FEATURES.map(({ title, description, icon }) => (
          <HeroFeature
            key={title}
            icon={icon}
            title={title}
            description={description}
          />
        ))}
      </Box>
    </Flex>
  </Section>
)

export default Hero
