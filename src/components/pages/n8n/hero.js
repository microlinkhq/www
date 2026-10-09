import React from 'react'
import { Box as BoxIcon, Cpu, Download, Unlock } from 'react-feather'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import LineBreak from 'components/elements/LineBreak'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'

import { GitHub as GitHubIcon } from 'components/icons/GitHub'
import Caption from 'components/patterns/Caption/Caption'

import {
  ACCENT,
  ACCENT_CHIP,
  PACKAGE_NAME,
  REPOSITORY_URL,
  Section
} from 'components/pages/n8n/shared'

import { colors, layout, space, theme } from 'theme'

const featureIconProps = {
  size: 20,
  strokeWidth: 2.25,
  color: colors[ACCENT_CHIP.icon]
}

const HERO_FEATURES = [
  {
    title: 'Nine operations',
    description:
      'Extract, Screenshot, PDF, Markdown, Text, Audio, Video, Insights and Logo, from one node.',
    icon: <BoxIcon {...featureIconProps} aria-hidden='true' />
  },
  {
    title: 'No key to start',
    description:
      'Credentials are optional. Without one, the node calls the keyless endpoint at 25 requests per day.',
    icon: <Unlock {...featureIconProps} aria-hidden='true' />
  },
  {
    title: 'Files, not links',
    description:
      'Embed plus Binary mode attaches the screenshot or the PDF itself to the item, ready for the next node.',
    icon: <Download {...featureIconProps} aria-hidden='true' />
  },
  {
    title: 'Works as an agent tool',
    description:
      'Attach it to an n8n AI Agent and the agent calls it whenever it needs to read a page.',
    icon: <Cpu {...featureIconProps} aria-hidden='true' />
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
      bg: ACCENT_CHIP.bg,
      border: 1,
      borderColor: ACCENT_CHIP.border,
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
        css={theme({
          m: 0,
          color: 'black',
          fontSize: [1, 1, 2, 2],
          fontWeight: 'bold',
          lineHeight: 0
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
      width: space[3],
      height: space[3],
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
      Settings › Community Nodes › Install
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
      aria-label='Install the Microlink node in n8n'
    >
      {PACKAGE_NAME}
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
        Read any web page
        <LineBreak />
        inside <span css={theme({ color: ACCENT })}>n8n</span>.
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
        One community node turns a URL into metadata, a screenshot, a PDF,
        Markdown, plain text, media sources, performance insights or a logo.
        Microlink runs the browser. Your workflow gets the result.
      </Caption>
      <Box css={theme({ pt: [3, 3, 4, 4] })}>
        <Button
          as='a'
          href={REPOSITORY_URL}
          variant='white'
          rel='noopener noreferrer'
          target='_blank'
          data-event-location='n8n Hero'
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
      <Text
        css={theme({
          color: 'black60',
          fontSize: [0, 0, 1, 1],
          maxWidth: layout.small,
          mx: 'auto'
        })}
      >
        For self-hosted n8n. Every operation is a call to the{' '}
        <Link href='/api'>Microlink API</Link>, the same one behind the{' '}
        <Link href='/integrations/sdk'>SDK</Link> and the{' '}
        <Link href='/integrations/cli'>CLI</Link>.
      </Text>
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
          maxWidth: layout.normal,
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
