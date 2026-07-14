import {
  breakpoints,
  colors,
  layout,
  radii,
  shadows,
  textGradient,
  theme,
  transition
} from 'theme'
import { Check } from 'react-feather'
import React from 'react'
import styled from 'styled-components'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import LineBreak from 'components/elements/LineBreak'
import Heading from 'components/elements/Heading'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import { InstallButtonInline } from 'components/patterns/ChromeExtensionBanner/ChromeExtensionBanner'
import {
  ACCENT,
  DashedGridOverlay,
  EXTENSIONS,
  Eyebrow,
  PLATFORMS,
  Section,
  SectionInner,
  StoryTag
} from 'components/patterns/ExtensionStory'
import Layout from 'components/patterns/Layout'

import { trackEvent } from 'helpers/plausible'

import analyticsData from '../../../data/analytics.json'

const [{ reqs_pretty: reqsPretty }] = analyticsData

/* ─── Hero ───────────────────────────────────────────────────────────────── */

const HeroGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  ${theme({ gap: [4, 4, 5, 5] })}
  align-items: start;

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: 2fr 3fr;
    align-items: center;
  }
`

/* The two side-panel mockups fan out like cards on a desk instead of
   sitting in a flat row. Layout is positional for two items — revisit
   FLOAT_LAYOUT when a third extension ships. */

const MockupStack = styled(Box)`
  position: relative;
  display: grid;
  width: 100%;
  max-width: 600px;
  ${theme({ mx: 'auto' })}

  > * {
    grid-area: 1 / 1;
  }
`

const HeroGlow = styled(Box)`
  position: absolute;
  border-radius: 50%;
  filter: blur(64px);
  pointer-events: none;
`

const MockupFloat = styled(Box)`
  width: min(300px, 58%);
  position: relative;
  justify-self: ${props => props.$justify};
  margin-top: ${props => props.$mt || 0};
  z-index: ${props => props.$z};
  transform: rotate(${props => props.$rotate});
`

const FLOAT_LAYOUT = [
  { justify: 'start', rotate: '-2.5deg', z: 2 },
  { justify: 'end', rotate: '2.5deg', z: 1, mt: '24%' }
]

const Hero = () => (
  <Section as='header' css={theme({ pt: [3, 3, 4, 4], pb: [3, 3, 4, 4] })}>
    <SectionInner>
      <HeroGrid>
        <Box>
          <StoryTag
            accent={ACCENT}
            css={theme({ mb: [3, 3, 4, 4], display: 'inline-flex' })}
          >
            Extensions
          </StoryTag>
          <Heading
            variant={null}
            css={theme({ textAlign: 'left', scrollMarginTop: 4 })}
          >
            Microlink, <LineBreak />
            <span css={textGradient}>right where you work.</span>
          </Heading>
          <Text as='p' css={theme({ pt: [3, 3, 4, 4] })}>
            Capture screenshots and convert web pages to PDF without leaving
            your browser — powered by the same Microlink API that processes
            millions of requests per week.
          </Text>
          <Caps
            as='p'
            css={theme({
              fontFamily: 'mono',
              fontSize: 0,
              fontWeight: 'bold',
              color: 'black50',
              letterSpacing: '0.08em',
              m: 0,
              pt: 3
            })}
          >
            Free to install · No account <LineBreak />· 25 requests a day
          </Caps>
          <Flex css={theme({ pt: [3, 3, 4, 4] })}>
            <ArrowLink
              href='#extensions'
              css={theme({
                color: 'link',
                fontWeight: 'bold',
                fontSize: [1, 2, 2, 2]
              })}
            >
              Browse extensions
            </ArrowLink>
          </Flex>
        </Box>

        <MockupStack aria-hidden='true'>
          <HeroGlow
            css={`
              background: ${colors.pink2};
              opacity: 0.45;
              width: 50%;
              height: 55%;
              top: 0;
              left: 0;
            `}
          />
          <HeroGlow
            css={`
              background: ${colors.violet2};
              opacity: 0.45;
              width: 50%;
              height: 55%;
              bottom: 0;
              right: 0;
            `}
          />
          {EXTENSIONS.slice(0, FLOAT_LAYOUT.length).map(
            ({ slug, mockup: Mockup }, index) => {
              const { justify, rotate, z, mt } = FLOAT_LAYOUT[index]
              return (
                <MockupFloat
                  key={slug}
                  $justify={justify}
                  $rotate={rotate}
                  $z={z}
                  $mt={mt}
                >
                  <Mockup />
                </MockupFloat>
              )
            }
          )}
        </MockupStack>
      </HeroGrid>
    </SectionInner>
  </Section>
)

/* ─── Extension cards ────────────────────────────────────────────────────── */

const CardsGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  ${theme({ gap: [3, 3, 4, 4] })}

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Card = styled(Box)`
  ${theme({
    position: 'relative',
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 3,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  })}
  box-shadow: ${shadows[1]};
  transition: box-shadow ${transition.medium}, transform ${transition.medium},
    border-color ${transition.medium};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    border-color: ${props => props.$edge};
    transform: translateY(-2px);
    box-shadow: 0 12px 32px -14px ${props => props.$glow};
  }
`

const CardStage = styled(Box)`
  ${theme({
    px: [3, 3, 4, 4],
    pt: [3, 3, 4, 4],
    pb: [3, 3, 4, 4],
    borderBottom: 1,
    borderColor: 'black05'
  })}
`

const CardBody = styled(Flex)`
  ${theme({
    flexDirection: 'column',
    gap: 3,
    p: [3, 3, 4, 4],
    flex: 1
  })}
`

const IconCircle = styled(Flex)`
  ${theme({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  })}
`

const ExtensionCard = ({ extension }) => {
  const {
    name,
    blurb,
    icon: Icon,
    accent,
    category,
    highlights,
    mockup: Mockup,
    href,
    apiHref
  } = extension

  return (
    <Card
      $edge={colors[accent.bgEdge]}
      $glow={colors[accent.highlight]}
      role='listitem'
    >
      <CardStage
        aria-hidden='true'
        style={{
          background: `linear-gradient(135deg, ${
            colors[accent.bgSoft]
          } 0%, #ffffff 85%)`
        }}
      >
        <Box css={theme({ maxWidth: '300px', mx: 'auto' })}>
          <Mockup />
        </Box>
      </CardStage>
      <CardBody>
        <Flex css={theme({ alignItems: 'center', gap: 2 })}>
          <IconCircle css={theme({ bg: accent.bgSoft })}>
            <Icon size={20} color={colors[accent.text]} />
          </IconCircle>
          <Text
            as='h3'
            css={theme({
              color: 'black',
              fontSize: 2,
              fontWeight: 'bold',
              lineHeight: 1,
              m: 0
            })}
          >
            {name}
          </Text>
        </Flex>
        <Text css={theme({ color: 'black70', fontSize: 1, lineHeight: 2 })}>
          {blurb}
        </Text>
        <Box
          css={theme({
            display: 'grid',
            gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr'],
            gap: 2
          })}
        >
          {highlights.map(highlight => (
            <Flex key={highlight} css={theme({ alignItems: 'center', gap: 1 })}>
              <Check
                size={14}
                color={colors[accent.highlight]}
                style={{ flexShrink: 0 }}
              />
              <Text as='span' css={theme({ fontSize: 0, color: 'black80' })}>
                {highlight}
              </Text>
            </Flex>
          ))}
        </Box>
        <Text css={theme({ fontSize: 0, color: 'black60' })}>
          Runs on the{' '}
          <Link href={apiHref} css={theme({ position: 'relative', zIndex: 2 })}>
            {category}
          </Link>{' '}
          — call the same endpoint from your own code.
        </Text>
        <Box css={theme({ mt: 'auto', pt: 2 })}>
          <ArrowLink
            href={href}
            css={`
              ${theme({
                color: accent.text,
                fontWeight: 'bold',
                fontSize: 1
              })}

              > a::after {
                content: '';
                position: absolute;
                inset: 0;
                z-index: 1;
                border-radius: ${radii[3]};
              }

              > a:focus-visible {
                outline: none;
              }

              > a:focus-visible::after {
                outline: 2px solid ${colors.link};
                outline-offset: 2px;
              }
            `}
          >
            See all features
          </ArrowLink>
        </Box>
      </CardBody>
    </Card>
  )
}

const ExtensionsGrid = () => (
  <Section id='extensions' css={theme({ scrollMarginTop: 4 })}>
    <SectionInner>
      {PLATFORMS.map(platform => {
        const list = EXTENSIONS.filter(
          extension => extension.platform === platform.id
        )
        if (list.length === 0) return null
        const PlatformIcon = platform.icon
        return (
          <Box key={platform.id} css={theme({ pb: [3, 3, 4, 4] })}>
            <Flex css={theme({ alignItems: 'center', gap: 2 })}>
              <PlatformIcon size={20} color={colors.black80} />
              <Subhead
                css={theme({
                  color: 'black',
                  m: 0,
                  textAlign: 'left'
                })}
              >
                {platform.label}
              </Subhead>
            </Flex>
            <Text
              as='p'
              css={theme({
                color: 'black70',
                fontSize: 1,
                lineHeight: 2,
                maxWidth: layout.small,
                pt: 2,
                pb: [3, 3, 4, 4]
              })}
            >
              {platform.description}
            </Text>
            <CardsGrid role='list' aria-label={platform.label}>
              {list.map(extension => (
                <ExtensionCard key={extension.slug} extension={extension} />
              ))}
            </CardsGrid>
          </Box>
        )
      })}
    </SectionInner>
  </Section>
)

/* ─── One API underneath ─────────────────────────────────────────────────── */

const BAND_ACCENT = { text: 'pink5' }

const BAND_STATS = [
  { value: '240', label: 'CDN edges' },
  { value: reqsPretty, label: 'reqs per month' },
  { value: '99.9%', label: 'uptime' },
  { value: '25', label: 'free reqs per day' }
]

const BandGrid = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;
  ${theme({ gap: [4, 4, 5, 5] })}
  align-items: center;

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: 3fr 2fr;
  }
`

const StatsGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  ${theme({ gap: [3, 3, 4, 4] })}
`

const ApiBand = () => (
  <Section
    css={theme({
      bg: 'black',
      borderTop: 1,
      borderTopColor: 'white10',
      borderBottom: 1,
      borderBottomColor: 'white10',
      mt: [3, 3, 4, 4]
    })}
  >
    <SectionInner>
      <BandGrid>
        <Box>
          <Eyebrow
            accent={BAND_ACCENT}
            css={theme({ pb: 3, display: 'block' })}
          >
            Under the hood
          </Eyebrow>
          <Subhead
            css={theme({
              color: 'white',
              m: 0,
              textAlign: 'left'
            })}
          >
            One API. Every surface.
          </Subhead>
          <Text
            as='p'
            css={theme({
              color: 'white70',
              lineHeight: 2,
              pt: 3,
              maxWidth: layout.small
            })}
          >
            Every extension is a thin client over the Microlink API — the same
            endpoints you can call from your own code, served by the same
            infrastructure paying customers rely on.
          </Text>
          <Flex css={theme({ pt: 3, gap: 4, flexWrap: 'wrap' })}>
            <ArrowLink
              href='/screenshot'
              css={theme({ color: 'white', fontWeight: 'bold', fontSize: 1 })}
            >
              Screenshot API
            </ArrowLink>
            <ArrowLink
              href='/pdf'
              css={theme({ color: 'white', fontWeight: 'bold', fontSize: 1 })}
            >
              PDF API
            </ArrowLink>
          </Flex>
        </Box>
        <StatsGrid>
          {BAND_STATS.map(stat => (
            <Box key={stat.label}>
              <Text
                css={theme({
                  color: 'white90',
                  fontSize: ['24px', '24px', '32px', '32px'],
                  fontWeight: 'bold',
                  lineHeight: 0
                })}
              >
                {stat.value}
              </Text>
              <Caps
                css={theme({
                  color: 'pink',
                  opacity: 0.8,
                  fontSize: 0,
                  fontWeight: 'bold',
                  pt: 1
                })}
              >
                {stat.label}
              </Caps>
            </Box>
          ))}
        </StatsGrid>
      </BandGrid>
    </SectionInner>
  </Section>
)

/* ─── Closing CTA ────────────────────────────────────────────────────────── */

const ClosingCta = () => (
  <Section
    css={`
      background-color: ${colors.pinky};
      ${theme({
        borderTop: 1,
        borderTopColor: ACCENT.bgEdge,
        borderBottom: 1,
        borderBottomColor: ACCENT.bgEdge,
        mt: [4, 4, 5, 5]
      })}
    `}
  >
    <SectionInner css={theme({ textAlign: 'center' })}>
      <Subhead
        css={theme({
          color: 'black',
          m: 0
        })}
      >
        Bring Microlink <span css={textGradient}>into your browser</span>
      </Subhead>
      <Text
        as='p'
        css={theme({
          color: 'black70',
          pt: [3, 3, 4, 4],
          maxWidth: layout.small,
          mx: 'auto'
        })}
      >
        Both extensions are free on the Chrome Web Store — install in seconds,
        no account needed, first capture one click away.
      </Text>
      <Flex
        css={theme({
          pt: [3, 3, 4, 4],
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 3
        })}
      >
        {EXTENSIONS.map(({ slug, name, icon: Icon, storeUrl, eventName }) => (
          <InstallButtonInline
            key={slug}
            href={storeUrl}
            target='_blank'
            rel='nofollow noopener noreferrer'
            onClick={() => trackEvent(eventName)}
          >
            <Icon size={18} style={{ flexShrink: 0 }} />
            Get {name}
          </InstallButtonInline>
        ))}
      </Flex>
      <Text css={theme({ pt: [3, 3, 4, 4], fontSize: 1, color: 'black60' })}>
        Want Microlink somewhere else?{' '}
        <Link href='mailto:hello@microlink.io'>Tell us where</Link>.
      </Text>
    </SectionInner>
  </Section>
)

/* ─── Page ───────────────────────────────────────────────────────────────── */

const ExtensionsIndexPage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Box css={theme({ position: 'relative', zIndex: 1 })}>
      <Hero />
      <ExtensionsGrid />
      <ApiBand />
      <ClosingCta />
    </Box>
  </Layout>
)

export const Head = () => (
  <Meta
    title='Extensions: Microlink in your browser'
    description='Official Microlink browser extensions — capture website screenshots and convert web pages to PDF in bulk, straight from Chrome’s side panel.'
    schemaType='WebPage'
  />
)

export default ExtensionsIndexPage
