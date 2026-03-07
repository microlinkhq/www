import { borders, layout, colors, theme } from 'theme'
import React, { useState } from 'react'
import { cdnUrl } from 'helpers/cdn-url'
import { trimMs } from 'helpers/trim-ms'
import humanizeUrl from 'humanize-url'
import styled from 'styled-components'
import get from 'dlv'

import Box from 'components/elements/Box'
import Caps from 'components/elements/Caps'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Hide from 'components/elements/Hide'
import Image from 'components/elements/Image/Image'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import CodeCopy from 'components/elements/Codecopy'

import { TerminalButton } from 'components/elements/Terminal/Terminal'
import ArrowLink from 'components/patterns/ArrowLink'
import Average from 'components/patterns/Average/Average'
import Block from 'components/patterns/Block/Block'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import FetchProvider from 'components/patterns/FetchProvider'
import Layout from 'components/patterns/Layout'

import { useHealthcheck } from 'components/hook/use-healthcheck'

import { findDemoLinkById } from 'helpers/demo-links'

const FEATURES = [
  {
    title: 'Enterprise-Grade Screenshot Service',
    description:
      'Production-ready screenshot API service built for scale. Handle millions of web captures with 99.9% uptime SLA and guaranteed performance for business-critical workflows.'
  },
  {
    title: 'Free Screenshot API',
    description:
      'Start using the free website screenshot API immediately. No setup fees, pay-as-you-grow pricing that scales with your screen capture needs.'
  },
  {
    title: 'Global CDN Network',
    description:
      'Web screenshot service distributed across 240+ edge locations powered by Cloudflare. Lightning-fast site screenshot delivery from anywhere worldwide.'
  },
  {
    title: 'Developer-First URL Screenshot API',
    description:
      'RESTful screenshot API designed for developers. Language-agnostic integration with comprehensive SDKs to capture any URL as an image.'
  },
  {
    title: 'Browser Screenshot Control',
    description:
      'Full browser screenshot API with device emulation. Capture screenshots exactly as users see them across any device, viewport, or interaction.'
  },
  {
    title: 'HTML Screenshot & Customization',
    description:
      'Complete HTML screenshot API control. Custom CSS injection, JavaScript execution, overlays, and precise element targeting for pixel-perfect screen captures.'
  },
  {
    title: 'Always-Fresh Web Snapshots',
    description:
      'Smart caching with automatic refresh keeps your URL snapshots current. Stay up to date with website changes while maintaining optimal screenshot service performance.'
  },
  {
    title: 'Multiple Output Formats',
    description:
      'Flexible website capture API formats including WebP optimization. Full-page captures, custom viewports, and high-quality image exports for any use case.'
  },
  {
    title: 'Zero-Config Integration',
    description:
      'Interactive documentation with live code examples. Get started with our web API screenshot integration in minutes with copy-paste snippets and embed-ready code.'
  }
]

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)

const Caption = withTitle(CaptionBase)

const HERO_MQ = '@media (min-width: 1200px) and (max-width: 1550px)'

const BrowserWindow = styled('div')`
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #1c1c1e;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
`

const BrowserHeader = styled(Flex)`
  background: #2c2c2e;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  height: 44px;
  align-items: center;
  padding: 0 12px;
  gap: 8px;
  flex-shrink: 0;
`

const TrafficLights = styled(Flex)`
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
`

const NavButtons = styled(Flex)`
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
`

const NavArrow = styled('button')`
  background: none;
  border: none;
  padding: 4px 5px;
  cursor: default;
  color: rgba(255, 255, 255, 0.25);
  display: flex;
  align-items: center;
  border-radius: 4px;
  line-height: 1;
`

const AddressBar = styled(Flex)`
  flex: 1;
  background: rgba(255, 255, 255, 0.07);
  border-radius: 6px;
  height: 26px;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  gap: 5px;
  min-width: 0;

  &:focus-within {
    background: rgba(255, 255, 255, 0.11);
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.12);
  }
`

const AddressInput = styled('input')`
  background: none;
  border: none;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  padding: 0;
  margin: 0;
  flex: 1;
  min-width: 0;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white80};
  letter-spacing: 0.01em;
  text-align: center;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  caret-color: rgba(255, 255, 255, 0.7);

  &::selection {
    background: rgba(255, 255, 255, 0.15);
    color: rgba(255, 255, 255, 0.9);
  }

  &:focus {
    outline: none;
    color: rgba(255, 255, 255, 0.85);
    text-align: left;
  }
`

const ScreenshotApiBar = styled(Flex)`
  background: #111113;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  .codecopy__button {
    top: 0;
    opacity: 0.85;
    transition: opacity 0.15s ease;

    &:hover {
      opacity: 1;
    }
  }

  .codecopy__icon {
    fill: rgba(255, 255, 255, 0.9) !important;
  }
`

const HeroTextContainer = styled(Flex)`
  ${HERO_MQ} {
    h1 {
      font-size: 48px !important;
    }
    h2 {
      font-size: 24px !important;
      padding-top: 20px !important;
    }
    & > div:last-child {
      font-size: 26px !important;
    }
  }
`

const SUGGESTIONS = [
  { theme: 'dark', id: 'apple' },
  { theme: 'light', id: 'mdn' },
  { theme: 'light', id: 'stackoverflow' },
  { theme: 'light', id: 'producthunt' },
  { theme: 'dark', id: 'nasa' }
].map(({ theme, id }) => {
  const filename = `${id}.png`
  const { url } = findDemoLinkById(id).data

  return {
    cdnUrl: cdnUrl(`screenshot/browser/${theme}/${filename}`),
    filename,
    id,
    url,
    value: humanizeUrl(url)
  }
})

const fromCache = (variations, opts) => {
  const suggestion = SUGGESTIONS.find(({ url }) => variations.includes(url))
  if (!suggestion) return

  const { data } = findDemoLinkById(suggestion.id)
  const theme = get(opts, 'overlay.browser')

  const screenshotUrl = cdnUrl(
    theme
      ? `screenshot/browser/${theme}/${suggestion.filename}`
      : `screenshot/${suggestion.filename}`
  )

  return { data: { ...data, screenshot: { url: screenshotUrl } } }
}

const ensureProtocol = value => {
  const trimmed = value.trim()
  if (!trimmed) return trimmed
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

const stripProtocol = url => url.replace(/^https?:\/\//i, '')

const Hero = function Hero () {
  const [inputUrl, setInputUrl] = useState('https://apple.com')
  const [isFocused, setIsFocused] = useState(false)

  const displayValue = isFocused ? inputUrl : stripProtocol(inputUrl)

  const apiUrl = `https://api.microlink.io/?url=${inputUrl}&screenshot`

  const handleChange = e => {
    setInputUrl(e.target.value)
  }

  const handleFocus = () => setIsFocused(true)

  const handleBlur = e => {
    const normalized = ensureProtocol(e.target.value)
    setInputUrl(normalized)
    setIsFocused(false)
  }

  return (
    <Flex
      as='section'
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        pt: [4, 4, 4, 4],
        pb: [4, 4, 4, 5]
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          mx: 'auto',
          flexDirection: ['column', 'column', 'column', 'row'],
          alignItems: ['center', 'center', 'center', 'stretch'],
          gap: [0, 0, 3, 4],
          px: [1, 1, 1, 5]
        })}
      >
        <HeroTextContainer
          css={theme({
            width: ['100%', '100%', '100%', '50%'],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: ['center', 'center', 'center', 'flex-start']
          })}
        >
          <Heading
            css={theme({
              maxWidth: layout.large,
              fontSize: [3, 4, 4, 5],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            Website screenshot API <br /> for developers
          </Heading>
          <Caption
            forwardedAs='h2'
            css={theme({
              pt: [3, 3, 3, 4],
              fontSize: [1, 2, '24px', 3],
              maxWidth: [
                layout.small,
                layout.small,
                layout.normal,
                layout.large
              ],
              textAlign: ['center', 'center', 'center', 'left']
            })}
          >
            The web screenshot service that turns any URL into a pixel-perfect
            image. Capture site screenshots with full browser control, device
            emulation, and professional output.
          </Caption>
          <Flex
            css={theme({
              pt: [3, 3, 4, 4],
              fontSize: [2, 2, '26px', 3],
              justifyContent: ['center', 'center', 'center', 'flex-start']
            })}
          >
            <ArrowLink
              css={theme({ pr: [2, 4, 4, 4] })}
              href='/docs/api/parameters/screenshot'
            >
              Get Started
            </ArrowLink>
            <ArrowLink href='https://github.com/microlinkhq/browserless'>
              See on GitHub
            </ArrowLink>
          </Flex>
        </HeroTextContainer>
        <Flex
          css={theme({
            width: ['100%', '100%', '100%', '50%'],
            pt: [4, 4, 4, 0],
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          })}
        >
          <Box
            css={theme({
              display: 'inline-flex',
              flexDirection: 'column',
              maxWidth: ['100%', '85%', '70%', '100%'],
              width: ['100%', '85%', '70%', '100%']
            })}
          >
            <BrowserWindow>
              <BrowserHeader>
                <TrafficLights>
                  <TerminalButton.Red />
                  <TerminalButton.Yellow />
                  <TerminalButton.Green />
                </TrafficLights>
                <NavButtons>
                  <NavArrow aria-hidden='true' tabIndex={-1}>
                    <svg
                      width='7'
                      height='12'
                      viewBox='0 0 7 12'
                      fill='none'
                      aria-hidden='true'
                    >
                      <path
                        d='M6 1L1 6l5 5'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </NavArrow>
                  <NavArrow
                    aria-hidden='true'
                    tabIndex={-1}
                    style={{ color: 'rgba(255,255,255,0.12)' }}
                  >
                    <svg
                      width='7'
                      height='12'
                      viewBox='0 0 7 12'
                      fill='none'
                      aria-hidden='true'
                    >
                      <path
                        d='M1 1l5 5-5 5'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </NavArrow>
                </NavButtons>
                <AddressBar>
                  <svg
                    width='10'
                    height='12'
                    viewBox='0 0 10 12'
                    fill='none'
                    aria-hidden='true'
                  >
                    <path
                      d='M5 1a3 3 0 00-3 3v1H1.5A.5.5 0 001 5.5v5a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-5A.5.5 0 008.5 5H8V4a3 3 0 00-3-3zm2 4V4a2 2 0 10-4 0v1h4z'
                      fill='rgba(255,255,255,0.3)'
                    />
                  </svg>
                  <AddressInput
                    type='text'
                    value={displayValue}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    aria-label='Browser address bar'
                    spellCheck={false}
                    autoComplete='off'
                    autoCorrect='off'
                    autoCapitalize='off'
                  />
                </AddressBar>
                <Box css={{ width: '52px', flexShrink: 0 }} />
              </BrowserHeader>
              <Image
                src={`https://api.microlink.io/?url=${inputUrl}&screenshot&embed=screenshot.url`}
                alt='Apple screenshot'
                css={{
                  display: 'block',
                  width: '100%',
                  verticalAlign: 'bottom'
                }}
              />
              <ScreenshotApiBar
                css={theme({
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: [2, 3, 3, 3],
                  py: '10px',
                  gap: 2
                })}
              >
                <Text
                  as='span'
                  css={theme({
                    fontSize: ['10px', '11px', '12px', '12px'],
                    fontFamily: 'mono',
                    letterSpacing: '0.01em',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    flex: 1,
                    minWidth: 0
                  })}
                  style={{ color: '#4ade80' }}
                >
                  {apiUrl}
                </Text>
                <CodeCopy isDark text={apiUrl} />
              </ScreenshotApiBar>
            </BrowserWindow>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

const Timings = () => {
  const healthcheck = useHealthcheck()

  const blockOne = (
    <Flex
      css={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Subhead css={theme({ fontSize: [3, 4, 6, 6], color: 'white' })}>
        Send the URL{' '}
        <span css={theme({ display: 'block', color: 'white60' })}>
          Get a screenshot back
        </span>
      </Subhead>
    </Flex>
  )

  const blockTwo = (
    <Flex
      css={theme({
        pt: [4, 4, 5, 5],
        justifyContent: 'center',
        alignItems: 'baseline',
        width: '100%',
        maxWidth: layout.normal
      })}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      <Flex
        css={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Subhead
          forwardedAs='div'
          css={theme({
            fontSize: [3, 4, 4, 4],
            color: 'white',
            fontWeight: 'bold'
          })}
        >
          {trimMs(healthcheck.screenshot.p95_pretty)}
          <Caption
            forwardedAs='div'
            css={theme({
              ml: 2,
              color: 'white',
              display: 'inline',
              fontWeight: 'bold'
            })}
            titleize={false}
          >
            secs
          </Caption>
        </Subhead>
        <Caption forwardedAs='div' css={theme({ color: 'white60', pt: 2 })}>
          {['P95', 'response time'].map(children => (
            <Caps
              key={children}
              css={theme({ fontWeight: 'bold', fontSize: [0, 2, 2, 2] })}
            >
              {children}
            </Caps>
          ))}
        </Caption>
      </Flex>
      <Hide breakpoints={[1, 2, 3]}>
        <Box css={theme({ px: 3 })} />
      </Hide>
      <Hide breakpoints={[0]}>
        <Flex
          css={theme({
            display: 'inline-flex',
            px: [2, 2, 2, 5],
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column'
          })}
        >
          <Subhead
            forwardedAs='div'
            css={theme({ color: 'white', fontWeight: 'bold' })}
          >
            <Average value={healthcheck.screenshot.avg_pretty} />
          </Subhead>
          <Caption forwardedAs='div' css={theme({ color: 'white60' })}>
            {['average', 'response time'].map(children => (
              <Caps
                key={children}
                css={theme({ fontWeight: 'bold', fontSize: [0, 2, 2, 2] })}
              >
                {children}
              </Caps>
            ))}
          </Caption>
        </Flex>
      </Hide>
      <Flex
        css={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Subhead
          forwardedAs='div'
          css={theme({
            fontSize: [3, 4, 4, 4],
            color: 'white',
            fontWeight: 'bold'
          })}
        >
          99.9
          <Caption
            forwardedAs='div'
            css={theme({
              ml: 2,
              color: 'white',
              display: 'inline',
              fontWeight: 'bold'
            })}
          >
            %
          </Caption>
        </Subhead>
        <Caption forwardedAs='div' css={theme({ color: 'white60', pt: 2 })}>
          {['SLA', 'Guaranteed'].map(children => (
            <Caps
              key={children}
              css={theme({ fontWeight: 'bold', fontSize: [0, 2, 2, 2] })}
            >
              {children}
            </Caps>
          ))}
        </Caption>
      </Flex>
    </Flex>
  )

  return (
    <Block
      forwardedAs='section'
      id='timings'
      flexDirection='column'
      css={theme({
        px: 4,
        pb: [5, 5, 6, 6],
        width: '100%',
        // https://www.gradientmagic.com/collection/radialstripes
        backgroundImage: `radial-gradient(
          circle at center right,
          #850ba7 0%,
          #850ba7 48%,
          #a31b91 48%,
          #a31b91 52%,
          #c12a78 52%,
          #c12a78 65%,
          #df3a61 65%,
          #df3a61 79%,
          #fd494a 79%,
          #fd494a 100%
        )`,
        borderTop: `${borders[1]} ${colors.white20}`,
        borderBottom: `${borders[1]} ${colors.white20}`
      })}
      blockOne={blockOne}
      blockTwo={blockTwo}
    />
  )
}

const Resume = () => (
  <Container
    as='section'
    id='resume'
    css={theme({
      alignItems: 'center',
      maxWidth: [layout.normal, layout.normal, layout.large, layout.large],
      pb: [5, 5, 6, 6]
    })}
  >
    <Subhead variant='gradient'>Website capture API for every use case</Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      <b>Microlink screenshot API</b> delivers enterprise-grade screen capture
      through a developer-friendly web API. Automatically take screenshots of
      any website for documentation, monitoring, archiving, and visual content
      creation.
    </Caption>

    <Block
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Always-fresh web snapshots from the screenshot API'
          src='https://cdn.microlink.io/illustrations/genius-idea.svg'
        />
      }
      blockTwo={
        <Flex
          css={theme({
            px: [4, 0, 0, 0],
            flexDirection: 'column',
            alignItems: 'baseline'
          })}
        >
          <Subhead
            css={theme({
              pt: [4, 4, 4, 0],
              fontSize: [3, 3, 4, 4],
              textAlign: 'left'
            })}
          >
            Always-fresh web snapshots
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Every URL snapshot is cached on the edge, respecting{' '}
            <Link href='/docs/api/parameters/ttl'>ttl</Link>. Consuming cached
            screenshot responses doesn’t affect your plan, keeping your web
            snapshots fast and cost-effective.
          </Text>
        </Flex>
      }
    />

    <Block
      flexDirection='row-reverse'
      blockTwo={
        <Flex
          css={theme({
            px: [4, 0, 0, 0],
            flexDirection: 'column',
            alignItems: 'baseline'
          })}
        >
          <Subhead
            css={theme({
              pt: [4, 4, 4, 0],
              fontSize: [3, 3, 4, 4],
              textAlign: 'left'
            })}
          >
            Browser screenshot API with full control
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Full browser automation and device emulation for automated website
            screenshots. Our site screenshot API captures pages exactly as users
            experience them with custom viewports, interactions, and responsive
            design testing across all devices and screen sizes.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Browser screenshot API with full device control'
          src='https://cdn.microlink.io/illustrations/robots.svg'
        />
      }
    />

    <Block
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Professional screen capture and website screenshot output'
          src='https://cdn.microlink.io/illustrations/abstract-page-is-under-construction.svg'
        />
      }
      blockTwo={
        <Flex
          css={theme({
            px: [4, 0, 0, 0],
            flexDirection: 'column',
            alignItems: 'baseline'
          })}
        >
          <Subhead
            css={theme({
              pt: [4, 4, 4, 0],
              fontSize: [3, 3, 4, 4],
              textAlign: 'left'
            })}
          >
            Professional screen capture output
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Create stunning visual compositions with{' '}
            <Link href='/docs/api/parameters/screenshot/overlay'>
              overlay effects
            </Link>
            , custom backgrounds, and professional presentation. The best
            website screenshot tool for marketing materials, documentation, and
            branded content creation.
          </Text>
        </Flex>
      }
    />
  </Container>
)

const USE_CASES = [
  {
    title: 'Automated Website Screenshots',
    description:
      'Automate website screenshots at scale. Set up scheduled captures to automatically take screenshots of any website for monitoring, archiving, or reporting workflows.'
  },
  {
    title: 'Programmatic Web Page Capture',
    description:
      'Programmatically take screenshots of web pages from your code. Integrate the URL screenshot API into CI/CD pipelines, testing suites, or backend services with a single HTTP call.'
  },
  {
    title: 'Screenshot URL Tool for Teams',
    description:
      'Give your team a reliable screenshot URL tool. Generate shareable web snapshots and URL snapshots for design reviews, bug reports, and stakeholder presentations.'
  },
  {
    title: 'Automated Screen Capture for Websites',
    description:
      'Build automated screen capture workflows for any website. Monitor visual changes, detect regressions, and create automated screenshots of web pages for quality assurance.'
  },
  {
    title: 'Web Snapshot & Archiving',
    description:
      'Create web snapshots and URL snapshots for compliance, legal, or archival purposes. Capture point-in-time website states with full-page or element-level precision.'
  },
  {
    title: 'Social Media & OG Image Generation',
    description:
      'Generate dynamic social media images and Open Graph previews. Use the website screenshot service to create branded visual content from any URL automatically.'
  }
]

const UseCases = () => (
  <Container
    as='section'
    id='use-cases'
    css={theme({
      alignItems: 'center',
      bg: 'pinky',
      maxWidth: '100%',
      pb: [4, 4, 5, 5]
    })}
  >
    <Subhead variant='gradient'>
      Automate website screenshots
      <br />
      for any workflow
    </Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      From automated screen capture to programmatic web page snapshots, our
      screenshot API service powers visual workflows across every industry.
    </Caption>
    <Flex
      css={theme({
        pt: [4, 4, 5, 5],
        px: [4, 4, 0, 0],
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: layout.large
      })}
    >
      {USE_CASES.map(({ title, description }) => (
        <Box
          key={title}
          css={theme({
            width: ['100%', '100%', '33.33%'],
            px: [0, 0, 3],
            pb: [4, 4, 5]
          })}
        >
          <Text css={theme({ fontWeight: 'bold', fontSize: [2, 2, 3], pb: 2 })}>
            {title}
          </Text>
          <Text css={theme({ color: 'black80', fontSize: [1, 1, 2] })}>
            {description}
          </Text>
        </Box>
      ))}
    </Flex>
  </Container>
)

const ProductInformation = () => {
  return (
    <Faq
      title='Screenshot API FAQ'
      caption='Everything you need to know about our website screenshot API and web screenshot service.'
      css={theme({
        pb: [5, 5, 6, 6],
        bg: 'pinky',
        borderTop: `${borders[1]} ${colors.pinkest}`,
        borderBottom: `${borders[1]} ${colors.pinkest}`
      })}
      questions={[
        {
          question: 'What is a screenshot API and what can I build with it?',
          answer: (
            <>
              <div>
                A screenshot API is a web service that programmatically captures
                screenshots of any URL or HTML page. Microlink's website
                screenshot API lets you build visual monitoring systems,
                automated screen capture workflows, visual regression testing,
                content archiving, and documentation generators at scale.
              </div>
              <div>
                Perfect for developers building visual testing suites, content
                management platforms, social media automation, and any
                application that needs a reliable site screenshot API.
              </div>
            </>
          )
        },
        {
          question: 'Is this a free screenshot API?',
          answer: (
            <>
              <div>
                Yes — Microlink offers a free website screenshot API tier to get
                started immediately. The free screenshot API includes full
                access to all features: browser screenshot capture, HTML
                screenshot rendering, device emulation, and custom overlays. No
                credit card required.
              </div>
              <div>
                As your screenshot needs grow, pay-as-you-grow pricing ensures
                you only pay for what you use. The website screenshot API free
                tier is perfect for prototyping and small projects.
              </div>
            </>
          )
        },
        {
          question: 'What makes this the best screenshot API?',
          answer: (
            <>
              <div>
                Microlink stands out as the best screenshot API for its
                combination of speed, reliability, and developer experience. Our
                screenshot service delivers sub-second captures with a 99.9%
                uptime SLA, distributed across 240+ edge locations worldwide.
              </div>
              <div>
                Unlike other screenshot API services, Microlink provides a
                unified web screenshot API with built-in browser automation,
                full device emulation, and advanced customization — all through
                a single REST endpoint. It's the best website screenshot tool
                for teams that need production-grade reliability.
              </div>
            </>
          )
        },
        {
          question: 'How do I automate website screenshots?',
          answer: (
            <>
              <div>
                Automate website screenshots by calling our URL screenshot API
                with any target page. The API lets you programmatically take
                screenshots of web pages with a simple HTTP request — no
                headless browser infrastructure to manage. Schedule automated
                screenshots of web pages using cron jobs, CI/CD pipelines, or
                event-driven webhooks.
              </div>
              <div>
                Whether you need to automatically take screenshots of a website
                on a schedule or capture an automatic screenshot of a website in
                response to events, our web API screenshot endpoint handles it.
              </div>
            </>
          )
        },
        {
          question:
            'Does the screenshot API support HTML rendering and browser control?',
          answer: (
            <>
              <div>
                Yes. The HTML screenshot API renders any markup with full
                Chromium support, including CSS, web fonts, and JavaScript
                execution. Our browser screenshot API provides complete control
                over viewports, device emulation, scroll position, element
                targeting, and wait conditions for dynamic content.
              </div>
              <div>
                You can inject custom CSS and JavaScript before capture, making
                it the most flexible screen capture API for complex pages that
                require interaction or authentication.
              </div>
            </>
          )
        },
        {
          question: 'How reliable is the web screenshot service?',
          answer: (
            <>
              <div>
                Enterprise-grade reliability with 99.9% uptime SLA. Our website
                screenshot service runs on optimized Chromium infrastructure
                that handles complex websites, dynamic content, and custom
                interactions with consistent high-quality results.
              </div>
              <div>
                Every request runs in isolated browser instances for security.
                Screenshots are delivered via global CDN for optimal web
                screenshot service performance worldwide.
              </div>
            </>
          )
        },
        {
          question: 'How do I get started with the screenshot API?',
          answer: (
            <>
              <div>
                Start free with our screenshot API service. Visit our{' '}
                <Link href='/docs/api/getting-started/overview'>
                  documentation
                </Link>{' '}
                for interactive examples, SDKs in multiple languages, and
                ready-to-use code snippets. No infrastructure setup required —
                just pass a URL and get a screenshot back.
              </div>
              <div>
                Have questions? Contact us at{' '}
                <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>
                .
              </div>
            </>
          )
        }
      ]}
    />
  )
}

export const Head = () => (
  <Meta
    title='Screenshot API — capture any website screenshot'
    description='The best screenshot API and web screenshot service to capture any URL as an image. Free website screenshot API with browser control, device emulation, and HTML screenshot support.'
    image={cdnUrl('banner/screenshot.jpeg')}
    schemaType='SoftwareApplication'
    structured={{
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://microlink.io/screenshot',
      name: 'Microlink Screenshot API',
      description:
        'Website screenshot API service to capture any site screenshot or web snapshot via a simple URL. Free screenshot API with browser automation and HTML rendering.',
      url: 'https://microlink.io/screenshot',
      applicationCategory: ['DeveloperApplication', 'API'],
      keywords: [
        'screenshot api',
        'website screenshot api',
        'web screenshot api',
        'site screenshot api',
        'screenshot service',
        'browser screenshot api',
        'url screenshot api',
        'html screenshot api',
        'free screenshot api',
        'website capture api',
        'screen capture api',
        'web screenshot service',
        'website screenshot service',
        'screenshot api service',
        'best screenshot api',
        'automated website screenshots',
        'web snapshot',
        'url snapshot',
        'screenshot url tool'
      ],
      about: [
        { '@type': 'Thing', name: 'Screenshot API' },
        { '@type': 'Thing', name: 'Website Screenshot Service' },
        { '@type': 'Thing', name: 'Website Capture API' },
        { '@type': 'Thing', name: 'Web Screenshot Service' },
        { '@type': 'Thing', name: 'Browser Screenshot API' }
      ]
    }}
  />
)

const ScreenshotPage = () => (
  <Layout>
    <FetchProvider fromCache={fromCache} mqlOpts={{ screenshot: true }}>
      {({ data }) => {
        return (
          <>
            <Hero data={data} />
            <Timings />
            <Features
              css={theme({ px: 4, pb: 6 })}
              title={
                <Subhead css={{ width: '100%', textAlign: 'left' }}>
                  The best screenshot API,{' '}
                  <span
                    css={{
                      display: 'block',
                      color: '#fd494a',
                      width: '100%',
                      textAlign: 'left'
                    }}
                  >
                    with no compromises.
                  </span>
                </Subhead>
              }
              caption={
                <>
                  No more servers to maintain, load balancers, or paying for
                  capacity you don’t use — our screenshot service lets you spend
                  more time building, less time configuring, with easy
                  integration via{' '}
                  <Link href='/docs/api/getting-started/overview'>
                    web screenshot API
                  </Link>
                  .
                </>
              }
              features={FEATURES}
            />
            <UseCases />
            <Resume />
            <ProductInformation />
          </>
        )
      }}
    </FetchProvider>
  </Layout>
)

export default ScreenshotPage
