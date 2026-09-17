import React from 'react'
import styled from 'styled-components'
import {
  ArrowRight as ArrowRightIcon,
  Camera as CameraIcon,
  Code as CodeIcon,
  Compass as CompassIcon,
  Cpu as CpuIcon,
  Eye as EyeIcon,
  GitHub as GitHubIcon,
  Layers as LayersIcon,
  Zap as ZapIcon
} from 'react-feather'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Caption from 'components/patterns/Caption/Caption'
import { HOME_CONTENT_WIDTH } from 'components/pages/home/catalog'
import { colors, shadows, theme, transition, SECTION_VERTICAL_SPACING } from 'theme'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.$columns || 2}, minmax(0, 1fr));
  gap: 16px;

  @media (max-width: 760px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Card = styled(Box)(
  theme({
    display: 'flex',
    flexDirection: 'column',
    p: [3, 4, 4, 4],
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 5,
    boxShadow: shadows[2]
  })
)

const IconTile = styled(Flex)(
  theme({
    width: '44px',
    height: '44px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    bg: 'violet0',
    color: 'violet7'
  })
)

const CardTitle = styled(Text).attrs({ as: 'h3' })(
  theme({ mt: 3, color: 'black', fontSize: 2, fontWeight: 'bold' })
)

const Body = styled(Text).attrs({ as: 'p' })(
  theme({ mt: 2, color: 'black70', fontSize: 1, lineHeight: 2 })
)

const Action = styled(Link)`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 2,
    mt: 3,
    fontWeight: 'bold',
    color: 'link'
  })}

  @media (prefers-reduced-motion: no-preference) {
    svg {
      transition: transform ${transition.short};
    }

    &:hover svg {
      transform: translateX(3px);
    }
  }
`

const SectionHeader = ({ eyebrow, title, children }) => (
  <Box css={theme({ textAlign: 'center', maxWidth: '760px', mx: 'auto', mb: 5 })}>
    <Text
      as='div'
      css={theme({
        color: 'secondary',
        fontSize: 0,
        fontWeight: 'bold',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        mb: 3
      })}
    >
      {eyebrow}
    </Text>
    <Subhead variant='gradient'>{title}</Subhead>
    {children && (
      <Caption forwardedAs='p' css={theme({ mt: 3, mx: 'auto' })}>
        {children}
      </Caption>
    )}
  </Box>
)

const Proof = () => (
  <Box
    as='section'
    aria-label='Microlink in production'
    css={theme({ px: [3, 3, 4], pb: SECTION_VERTICAL_SPACING })}
  >
    <Flex
      css={theme({
        maxWidth: HOME_CONTENT_WIDTH,
        mx: 'auto',
        py: 3,
        px: [3, 4],
        gap: [3, 4],
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        bg: 'gray0',
        border: 1,
        borderColor: 'gray2',
        borderRadius: 4,
        color: 'black70'
      })}
    >
      <Flex css={theme({ alignItems: 'center', gap: 2 })}>
        <ZapIcon size={18} color={colors.green7} />
        <Text css={theme({ fontWeight: 'bold' })}>50M+ requests every month</Text>
      </Flex>
      <Text aria-hidden css={theme({ display: ['none', 'block'], color: 'gray4' })}>
        •
      </Text>
      <Flex css={theme({ alignItems: 'center', gap: 2 })}>
        <GitHubIcon size={18} />
        <Text css={theme({ fontWeight: 'bold' })}>
          10K+ stars across our open source projects
        </Text>
      </Flex>
    </Flex>
  </Box>
)

export const AdoptionPaths = () => (
  <>
    <Proof />
    <Container
      as='section'
      id='start'
      css={theme({ maxWidth: HOME_CONTENT_WIDTH, px: [3, 3, 4], py: SECTION_VERTICAL_SPACING })}
    >
      <SectionHeader eyebrow='Built for developers and agents' title='Use the interface your workflow already speaks.'>
        The same web primitives, ready as agent tools or a straightforward API.
      </SectionHeader>
      <Grid>
        <Card>
          <IconTile css={theme({ bg: 'teal0', color: 'teal7' })}>
            <CpuIcon size={23} />
          </IconTile>
          <CardTitle>Give your agent the web</CardTitle>
          <Body>
            Connect Microlink MCP to Claude, Cursor, or any MCP client. Your
            agent gets screenshots, Markdown, metadata, search, PDFs, and more
            as tools.
          </Body>
          <Action href='/integrations/mcp'>
            Set up Microlink MCP <ArrowRightIcon size={17} />
          </Action>
        </Card>
        <Card>
          <IconTile css={theme({ bg: 'blue0', color: 'blue7' })}>
            <CodeIcon size={23} />
          </IconTile>
          <CardTitle>Call it from code</CardTitle>
          <Body>
            One HTTP endpoint, official SDKs, and a CLI. Turn a URL into the
            output you need without running browser infrastructure.
          </Body>
          <Action href='/docs/api/getting-started/overview'>
            Make your first API call <ArrowRightIcon size={17} />
          </Action>
        </Card>
      </Grid>
    </Container>
  </>
)

const Stack = styled(Box)(
  theme({
    p: [3, 4],
    bg: 'gray9',
    borderRadius: 5,
    color: 'white',
    fontFamily: 'mono',
    fontSize: [0, 1],
    lineHeight: 3
  })
)

const Result = styled(Flex)(
  theme({
    p: [3, 4],
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    bg: 'violet0',
    border: 1,
    borderColor: 'violet2',
    borderRadius: 5,
    color: 'violet8',
    fontFamily: 'mono',
    fontWeight: 'bold'
  })
)

const outcomes = [
  {
    title: 'Understand',
    text: 'Metadata, Markdown, text, HTML, and insights.',
    href: '/markdown',
    icon: EyeIcon,
    tone: { bg: 'indigo0', color: 'indigo7' }
  },
  {
    title: 'Capture',
    text: 'Screenshots, PDFs, and animated captures.',
    href: '/screenshot',
    icon: CameraIcon,
    tone: { bg: 'pink0', color: 'pink6' }
  },
  {
    title: 'Discover',
    text: 'Search results, logos, media, and link previews.',
    href: '/search',
    icon: CompassIcon,
    tone: { bg: 'blue0', color: 'blue7' }
  },
  {
    title: 'Automate',
    text: 'Custom browser functions, file conversion, and MCP.',
    href: '/function',
    icon: LayersIcon,
    tone: { bg: 'orange0', color: 'orange7' }
  }
]

export const Outcomes = () => (
  <Box as='section' css={theme({ px: [3, 3, 4], py: SECTION_VERTICAL_SPACING })}>
    <Container css={theme({ maxWidth: HOME_CONTENT_WIDTH, p: 0 })}>
      <SectionHeader eyebrow='The web is the hard part' title='Build the feature, not the browser stack.'>
        Pages render with JavaScript, change shape, and fail at scale. Microlink
        handles browsers, caching, retries, and extraction behind one stable
        interface.
      </SectionHeader>
      <Grid>
        <Stack>
          <Text css={theme({ color: 'white60', mb: 2 })}>Before Microlink</Text>
          <div>browser fleet + parsers + queues</div>
          <div>retries + proxies + cache</div>
          <div>monitoring + scaling + maintenance</div>
        </Stack>
        <Result>GET https://api.microlink.io?url=...</Result>
      </Grid>

      <Box css={theme({ mt: [5, 5, 6], mb: 5, textAlign: 'center' })}>
        <Subhead variant='gradient'>One URL in. The output your product needs.</Subhead>
        <Caption forwardedAs='p' css={theme({ mt: 3 })}>
          Start with the outcome. Go deeper in the complete product catalog.
        </Caption>
      </Box>
      <Grid $columns={4}>
        {outcomes.map(({ title, text, href, icon: Icon, tone }) => (
          <Card key={title}>
            <IconTile css={theme(tone)}>
              <Icon size={22} />
            </IconTile>
            <CardTitle>{title}</CardTitle>
            <Body>{text}</Body>
            <Action href={href} css={theme({ mt: 'auto', pt: 3 })}>
              Explore <ArrowRightIcon size={17} />
            </Action>
          </Card>
        ))}
      </Grid>
    </Container>
  </Box>
)

const CTAButton = styled(Link)`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '44px',
    px: 3,
    py: 2,
    borderRadius: 3,
    bg: 'black',
    color: 'white',
    fontWeight: 'bold',
    textDecoration: 'none'
  })}

  > a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 44px;
    padding: 8px 16px;
  }

  padding: 0;

  &:hover {
    color: ${colors.white};
    background: ${colors.gray8};
  }
`

export const FinalCta = () => (
  <Box as='section' css={theme({ px: [3, 3, 4], py: SECTION_VERTICAL_SPACING })}>
    <Container
      css={theme({
        maxWidth: HOME_CONTENT_WIDTH,
        py: [5, 5, 6],
        px: [3, 4, 5],
        alignItems: 'center',
        textAlign: 'center',
        borderRadius: 5,
        bg: 'gray0',
        border: 1,
        borderColor: 'gray2'
      })}
    >
      <Subhead variant='gradient'>Start with one URL. Scale to millions.</Subhead>
      <Caption forwardedAs='p' css={theme({ mt: 3, maxWidth: '680px' })}>
        Try Microlink with 25 free requests a day. No signup or credit card.
        Add an API key when you need Search, more volume, or paid features.
      </Caption>
      <Flex css={theme({ mt: 4, gap: 3, justifyContent: 'center', flexWrap: 'wrap' })}>
        <CTAButton href='/pricing'>Get your API key</CTAButton>
        <Action href='/pricing' css={theme({ mt: 0 })}>
          View pricing <ArrowRightIcon size={17} />
        </Action>
      </Flex>
      <Text css={theme({ mt: 3, color: 'black60', fontSize: 0 })}>
        Using an agent? It can choose a plan and create checkout. You complete
        payment and add the key to its config.
      </Text>
    </Container>
  </Box>
)
