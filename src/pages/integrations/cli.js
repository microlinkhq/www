import React from 'react'
import { Clipboard, Code, Monitor } from 'react-feather'

import { cdnUrl } from 'helpers/cdn-url'
import { withTitle } from 'helpers/hoc/with-title'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Container from 'components/elements/Container'
import Terminal from 'components/elements/Terminal/Terminal'
import Flex from 'components/elements/Flex'
import LineBreak from 'components/elements/LineBreak'
import Meta from 'components/elements/Meta/Meta'
import Text from 'components/elements/Text'

import TerminalJsonView from 'components/pages/cli/TerminalJsonView'
import { GitHub as GitHubIcon } from 'components/icons/GitHub'
import { Terminal as TerminalPromptIcon } from 'components/icons/Terminal'
import { SectionCaption } from 'components/pages/search/Sections'
import { SEARCH_LAYOUT_WIDE_MAX_WIDTH } from 'components/pages/search'
import CaptionBase from 'components/patterns/Caption/Caption'
import Layout from 'components/patterns/Layout'

import { colors, layout, space, theme } from 'theme'

const Caption = withTitle(CaptionBase)

const ACCENT = 'red6'
const HERO_LAYOUT_MAX_WIDTH = [
  '100%',
  '100%',
  '100%',
  SEARCH_LAYOUT_WIDE_MAX_WIDTH
]
const CLI_REPOSITORY = 'https://github.com/microlinkhq/cli'
const CLI_COMMAND = 'microlink'
const CLI_URL = ' https://news.ycombinator.com/'
const CLI_FLAGS = ' --json'

const INSTALL_SNIPPET = 'npm install @microlink/cli --global'

const TerminalToken = ({ children, color }) => (
  <Text
    as='span'
    css={theme({
      color,
      fontFamily: 'mono',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      display: 'inline',
      p: 0,
      px: 0,
      m: 0
    })}
  >
    {children}
  </Text>
)

const TerminalLine = ({ children, indentCh, nowrap = false }) => (
  <Text
    as='div'
    css={theme({
      color: 'black80',
      fontFamily: 'mono',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      ...(indentCh !== undefined ? { pl: `${indentCh}ch` } : {}),
      ...(nowrap
        ? {
            whiteSpace: 'nowrap',
            wordBreak: 'normal',
            overflowWrap: 'normal'
          }
        : {
            whiteSpace: 'pre-wrap',
            overflowWrap: 'anywhere'
          })
    })}
  >
    {children}
  </Text>
)

const TerminalGap = () => <TerminalLine aria-hidden='true'>&nbsp;</TerminalLine>

const FEATURE_ICON_SIZE = 20

const featureIconProps = {
  size: FEATURE_ICON_SIZE,
  strokeWidth: 2.25,
  color: colors.red7
}

const HERO_FEATURES = [
  {
    title: 'One command',
    description: 'Pass a URL, and Microlink returns the API response.',
    icon: (
      <TerminalPromptIcon
        width={FEATURE_ICON_SIZE}
        height={FEATURE_ICON_SIZE}
        color={colors.red7}
        aria-hidden='true'
      />
    )
  },
  {
    title: 'JSON when you need it',
    description: 'Use --json for request and response payloads.',
    icon: <Code {...featureIconProps} aria-hidden='true' />
  },
  {
    title: 'Copy-ready output',
    description: 'Add --copy to put the parsed response on your clipboard.',
    icon: <Clipboard {...featureIconProps} aria-hidden='true' />
  },
  {
    title: 'Terminal previews',
    description:
      'Pretty output renders metadata, images, screenshots, PDFs, and timing details in place.',
    icon: <Monitor {...featureIconProps} aria-hidden='true' />
  }
]

const Section = ({ children, css: cssProp, ...props }) => (
  <Container
    as='section'
    css={theme({
      maxWidth: '100%',
      p: 0,
      position: 'relative',
      ...cssProp
    })}
    {...props}
  >
    {children}
  </Container>
)

const TerminalFooterOutput = () => (
  <>
    <TerminalLine indentCh={1}>
      <TerminalToken color='green7'>SUCCESS</TerminalToken>
      {'  '}
      598 B in 412ms
    </TerminalLine>
    <TerminalLine indentCh={3}>
      <TerminalToken color='green6'>timing</TerminalToken>{' '}
      total;dur=95,purge;dur=0
    </TerminalLine>
    <TerminalLine indentCh={4}>
      <TerminalToken color='green6'>cache</TerminalToken> HIT (21h 25m 13.8s)
    </TerminalLine>
    <TerminalLine indentCh={5}>
      <TerminalToken color='green6'>mode</TerminalToken> fetch (328ms)
    </TerminalLine>
    <TerminalLine indentCh={6} nowrap>
      <TerminalToken color='green6'>uri</TerminalToken>{' '}
      https://pro.microlink.io/?url=https%3A%2F%2Fnews.ycombinator.com%2F
    </TerminalLine>
    <TerminalLine indentCh={7}>
      <TerminalToken color='green6'>id</TerminalToken>{' '}
      iad:b1852aba-ebb5-4a17-abc0-1af09af8c171
    </TerminalLine>
  </>
)

const TerminalPreview = () => (
  <Terminal
    title='@microlink/cli'
    text={`${CLI_COMMAND}${CLI_URL}${CLI_FLAGS}`}
    autoHeight
    showFade={false}
    blinkCursor={false}
    css={theme({ width: '100%', maxWidth: '100%' })}
    aria-label='Example Microlink CLI terminal output'
  >
    <Text
      as='span'
      css={theme({
        color: 'black80',
        fontFamily: 'mono',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        display: 'inline',
        whiteSpace: 'nowrap',
        p: 0,
        m: 0
      })}
    >
      <TerminalToken color='blue6'>{CLI_COMMAND}</TerminalToken>
      {CLI_URL}
      {CLI_FLAGS}
    </Text>
    <TerminalGap />
    <TerminalJsonView />
    <TerminalGap />
    <TerminalFooterOutput />
  </Terminal>
)

const HeroFeatureIcon = ({ children }) => (
  <Flex
    css={theme({
      width: space[4],
      height: space[4],
      flexShrink: 0,
      alignItems: 'center',
      justifyContent: 'center',
      bg: 'red0',
      border: 1,
      borderColor: 'red2',
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
  <Box id='install' css={theme({ width: '100%', minWidth: 0 })}>
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
        maxWidth: '100%'
      })}
      aria-label='Install Microlink CLI'
    >
      {INSTALL_SNIPPET}
    </CodeEditor>
  </Box>
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
          'minmax(0, 1fr) minmax(0, 1fr)'
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
        <Flex
          css={theme({
            justifyContent: ['center', 'center', 'flex-start', 'flex-start']
          })}
        >
          <SectionCaption bg='red0' color={colors.red7}>
            Microlink CLI
          </SectionCaption>
        </Flex>
        <Text
          as='h1'
          css={theme({
            m: 0,
            color: 'black',
            fontWeight: 'bold',
            letterSpacing: 1,
            lineHeight: [1, 1, 0, 0],
            textAlign: ['center', 'center', 'left', 'left'],
            fontSize: [3, 4, 4, 5]
          })}
        >
          The Microlink API
          <LineBreak />
          in your <span css={theme({ color: ACCENT })}>terminal</span>.
        </Text>
        <Caption
          forwardedAs='p'
          titleize={false}
          css={theme({
            pt: [3, 3, 4, 4],
            maxWidth: layout.small,
            mx: ['auto', 'auto', 0, 0],
            textAlign: ['center', 'center', 'left', 'left'],
            fontSize: [1, 1, 2, 2],
            lineHeight: 2
          })}
        >
          Install the global command, pass any URL, and inspect screenshots,
          metadata, PDFs, cache status, timing, headers, and JSON payloads
          without leaving your shell.
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
            href='#install'
            variant='black'
            data-event-location='CLI Hero'
            data-event-name='Install now'
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
              Install now
            </Flex>
          </Button>
          <Button
            as='a'
            href={CLI_REPOSITORY}
            variant='white'
            rel='noopener noreferrer'
            target='_blank'
            data-event-location='CLI Hero'
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
        <TerminalPreview />
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

      <Box
        as='ul'
        css={theme({
          gridArea: 'features',
          listStyle: 'none',
          m: 0,
          p: 0,
          minWidth: 0,
          maxWidth: ['100%', '100%', '520px', '540px'],
          mx: ['auto', 'auto', 0, 0],
          display: 'flex',
          flexDirection: 'column',
          gap: [3, 3, 3, 3],
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
    </Box>
  </Section>
)

export const Head = () => (
  <Meta
    title='CLI'
    description='Use the Microlink API from your terminal. Install @microlink/cli, pass any URL, inspect pretty output, JSON payloads, headers, cache status, and timing.'
    image={cdnUrl('banner/cli.png')}
    schemaType='SoftwareApplication'
    structured={[
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Microlink CLI',
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'macOS, Linux, Windows',
        description:
          'Command-line interface for interacting with the Microlink API from a terminal.',
        url: 'https://microlink.io/cli',
        downloadUrl: 'https://www.npmjs.com/package/@microlink/cli',
        softwareVersion: '2.1.56',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD'
        }
      }
    ]}
  />
)

const CliPage = () => (
  <Layout>
    <Box css={theme({ bg: 'white' })}>
      <Hero />
    </Box>
  </Layout>
)

export default CliPage
