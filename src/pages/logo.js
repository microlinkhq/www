import { toPx, borders, layout, colors, theme, fonts } from 'theme'
import React, { useMemo } from 'react'
import { issueUrl } from 'helpers/issue-url'
import { useUrlInput } from 'components/hook/use-url-input'
import { getApiUrl } from '@microlink/mql'
import { cdnUrl } from 'helpers/cdn-url'
import { trimMs } from 'helpers/trim-ms'
import humanizeUrl from 'humanize-url'
import styled from 'styled-components'
import { noop } from 'helpers/noop'

import logoUri from '../../static/logo.svg'

import { useClipboard } from 'components/hook/use-clipboard'
import { useHealthcheck } from 'components/hook/use-healthcheck'
import { useMounted } from 'components/hook/use-mounted'
import { useQueryState } from 'components/hook/use-query-state'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Choose from 'components/elements/Choose'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Hide from 'components/elements/Hide'
import Image from 'components/elements/Image/Image'
import Input from 'components/elements/Input/Input'
import InputIcon from 'components/elements/Input/InputIcon'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import Placeholder from 'components/elements/Placeholder/Placeholder'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import Announcement from 'components/patterns/Announcement/Announcement'
import ArrowLink from 'components/patterns/ArrowLink'
import Average from 'components/patterns/Average/Average'
import Block from 'components/patterns/Block/Block'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import FetchProvider from 'components/patterns/FetchProvider'
import Layout from 'components/patterns/Layout'
import Tooltip from 'components/patterns/Tooltip/Tooltip'

import { findDemoLinkById } from 'helpers/demo-links'

const FEATURES = [
  {
    title: 'Enterprise-Grade Reliability',
    description:
      'Production-ready logo detection at scale. Handle millions of requests with 99.9% uptime SLA and guaranteed performance.'
  },
  {
    title: 'Free to Start',
    description:
      'Begin extracting website logos immediately. No setup fees, pay-as-you-grow pricing that scales with your business needs.'
  },
  {
    title: 'Global CDN Network',
    description:
      'Distributed across 240+ edge locations powered by Cloudflare. Lightning-fast logo detection from anywhere worldwide.'
  },
  {
    title: 'Smart Color Analysis',
    description:
      'Advanced color detection algorithms extract brand palettes, dominant colors, and complementary schemes automatically.'
  },
  {
    title: 'Developer-First API',
    description:
      'RESTful API designed for developers. Language-agnostic integration with comprehensive SDKs and interactive documentation.'
  },
  {
    title: 'Real-Time Updates',
    description:
      'Intelligent caching with stale revalidation. Always fresh logo data with automatic updates when websites change.'
  },
  {
    title: 'Universal Detection',
    description:
      'Detect logos from any website, including favicons, social media profiles, and custom brand assets across all platforms.'
  },
  {
    title: 'Complete Metadata',
    description:
      'Get comprehensive logo information including dimensions, file formats, color schemes, and brand context data.'
  },
  {
    title: 'Zero-Config Integration',
    description:
      'Interactive documentation with live code examples. Get started in minutes with copy-paste integration snippets.'
  }
]

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)

const Caption = withTitle(CaptionBase)

const SUGGESTIONS = [
  'apple',
  'mdn',
  'stackoverflow',
  'producthunt',
  'nasa'
].map(id => {
  const { url, logo } = findDemoLinkById(id).data
  return {
    logo,
    id,
    url,
    humanizedUrl: humanizeUrl(url)
  }
})

const LOGO_SIZE = 128

const IMAGE_PREVIEW_STYLE = [
  LOGO_SIZE * 0.8,
  (LOGO_SIZE * 0.8) / 2,
  (LOGO_SIZE * 0.8) / 4
].map(width => ({ width }))

const getEmbedUrl = url =>
  getApiUrl(url, { palette: true, embed: 'logo.url' })[0]

const LogoBox = styled(Placeholder.Empty)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${toPx(LOGO_SIZE + 2)};
  width: ${toPx(LOGO_SIZE + 2)};
`

const DEFAULT_DATA = {
  url: 'https://microlink.io',
  logo: {
    url: 'https://cdn.microlink.io/logo/logo.png',
    type: 'png',
    size: 5050,
    height: 500,
    width: 500,
    size_pretty: '5.05 kB',
    palette: ['#EC427C', '#780C31', '#F286AB', '#644CA4', '#8B0D38'],
    background_color: '#EC427C',
    color: '#3D0618',
    alternative_color: '#3A0618'
  }
}

const LogoPreview = ({ toClipboard = noop, logo, style, ...props }) => {
  return (
    <LogoBox
      onClick={() => {
        toClipboard({ copy: logo.url, text: Tooltip.TEXT.COPIED('URL') })
      }}
      style={{ cursor: style.cursor }}
      {...props}
    >
      <Image
        alt={`logo preview for ${Math.round(style.width)}px`}
        style={style}
        src={logo.url === DEFAULT_DATA.logo.url ? logoUri : logo.url}
        css={{ margin: logo.url === DEFAULT_DATA.logo.url ? '2rem' : 0 }}
      />
    </LogoBox>
  )
}

const LogoEmpty = ({ style, ...props }) => (
  <LogoBox {...props}>
    <Box style={style} />
  </LogoBox>
)

const PreviewResponsive = React.memo(function PreviewResponsive ({
  isLoading,
  toClipboard,
  data
}) {
  const logo = data.logo || {}

  const colors = isLoading
    ? Array.from({ length: 6 }, () => '#fff')
    : [
        ...new Set(
          []
            .concat(
              logo.palette,
              logo.background_color,
              logo.color,
              logo.alternative_color
            )
            .filter(Boolean)
        )
      ]

  const LogoComponent = isLoading
    ? LogoEmpty
    : logo.url
      ? LogoPreview
      : LogoEmpty

  return (
    <>
      <Hide breakpoints={[1, 2, 3]}>
        <Flex css={theme({ justifyContent: 'center', pb: 4 })}>
          <LogoComponent logo={logo} style={IMAGE_PREVIEW_STYLE[0]} />
        </Flex>
        <Flex
          css={theme({
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: IMAGE_PREVIEW_STYLE[0].width * 2,
            pb: 4
          })}
        >
          <Choose>
            <Choose.When condition={colors.length > 0}>
              {colors.slice(0, 6).map((color, index) => {
                return (
                  <Box
                    key={`${color}_${index}`}
                    css={theme({
                      m: 1,
                      height: toPx(LOGO_SIZE / 3),
                      width: toPx((LOGO_SIZE * 3 * 1) / colors.length),
                      border: 1,
                      borderColor: 'black10'
                    })}
                    style={{ background: color }}
                  />
                )
              })}
            </Choose.When>
            <Choose.Otherwise>
              <Text>
                No logo/color detected.{' '}
                <Link href={issueUrl.bug()}>Report it</Link>.
              </Text>
            </Choose.Otherwise>
          </Choose>
        </Flex>
      </Hide>
      <Hide breakpoints={[0]}>
        <>
          <Flex css={theme({ pb: 4, gap: 3 })}>
            {IMAGE_PREVIEW_STYLE.map((imagePreviewStyle, index) => {
              return (
                <Tooltip
                  type='copy'
                  key={`${data.url}_${index}`}
                  tooltipsOpts={Tooltip.TEXT.OPTIONS}
                  content={
                    <Tooltip.Content>
                      {Tooltip.TEXT.COPY('URL')}
                    </Tooltip.Content>
                  }
                >
                  <LogoComponent
                    toClipboard={toClipboard}
                    logo={logo}
                    style={{ ...imagePreviewStyle }}
                  />
                </Tooltip>
              )
            })}
          </Flex>
          <Flex
            css={theme({
              justifyContent: 'space-between',
              alignItems: 'center',
              pb: 4
            })}
          >
            <Choose>
              <Choose.When condition={colors.length > 0}>
                {colors.map((color, index) => {
                  return (
                    <Tooltip
                      type='copy'
                      key={`${color}_${index}`}
                      tooltipsOpts={{
                        interactive: false,
                        hideOnClick: true
                      }}
                      content={
                        <Tooltip.Content>
                          {Tooltip.TEXT.COPY(color)}
                        </Tooltip.Content>
                      }
                      css={theme({
                        ml: index !== 0 ? 1 : 0,
                        cursor: 'default'
                      })}
                    >
                      <Box
                        css={theme({
                          height: toPx(LOGO_SIZE / 3),
                          width: toPx((LOGO_SIZE * 3 * 1) / colors.length),
                          border: 1,
                          borderColor: 'black10'
                        })}
                        title={color}
                        style={{ background: color }}
                        onClick={() =>
                          toClipboard({
                            copy: color,
                            text: Tooltip.TEXT.COPIED(color)
                          })}
                      />
                    </Tooltip>
                  )
                })}
              </Choose.When>
              <Choose.Otherwise>
                <Text>
                  No logo/color detected.{' '}
                  <Link href={issueUrl.bug()}>Report it</Link>.
                </Text>
              </Choose.Otherwise>
            </Choose>
          </Flex>
        </>
      </Hide>
    </>
  )
})

const LiveDemo = React.memo(function LiveDemo ({
  data,
  isLoading,
  onSubmit,
  query
}) {
  const [ClipboardComponent, toClipboard] = useClipboard()
  const queryUrl = query?.url || ''
  const { iconQuery, inputUrl, setInputUrl, validInputUrl } =
    useUrlInput(queryUrl)

  const embedUrl = useMemo(() => getEmbedUrl(data.url), [data.url])

  const snippetText = `curl -sL ${embedUrl}`

  return (
    <Flex
      as='section'
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        pb: [4, 4, 5, 5]
      })}
    >
      <Announcement
        data-event-location='Home'
        data-event-name='Announcement'
        href='https://logo.microlink.io/'
        css={theme({ pb: 3 })}
      >
        <span>Add logo to any website with </span>
        <b>Microlink for Logo</b>
      </Announcement>
      <Heading css={theme({ px: [4, 5, 5, 5], maxWidth: layout.large })}>
        Always guaranteed <br /> logo detection
      </Heading>
      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, 3, 4, 4],
          px: 4,
          maxWidth: [layout.small, layout.small, layout.small, layout.small]
        })}
      >
        Extract & embed website logos with reliable API. Get colors, dimensions,
        and metadata instantly. Perfect for brand directories, competitor
        analysis, social media integrations.
      </Caption>
      <Flex css={theme({ pt: [3, 3, 4, 4], fontSize: [2, 2, 3, 3] })}>
        <ArrowLink
          css={theme({ pr: [2, 4, 4, 4] })}
          href='/docs/api/parameters/meta'
        >
          Get Started
        </ArrowLink>
        <ArrowLink href='https://github.com/microlinkhq/metascraper'>
          See on GitHub
        </ArrowLink>
      </Flex>
      <Flex css={{ justifyContent: 'center', alignItems: 'center' }}>
        <Flex
          as='form'
          css={theme({
            pt: [3, 3, 4, 4],
            pb: 4,
            mx: [0, 0, 'auto', 'auto'],
            justifyContent: 'center',
            flexDirection: ['column', 'column', 'row', 'row']
          })}
          onSubmit={event => {
            event.preventDefault()
            const rawUrl = inputUrl.trim()
            onSubmit(validInputUrl, { queryUrl: rawUrl })
          }}
        >
          <Box>
            <Input
              css={theme({
                fontSize: 2,
                width: ['100%', '100%', 128, 128]
              })}
              iconComponent={
                <InputIcon.Microlink src={data.logo?.url} query={iconQuery} />
              }
              id='screenshot-demo-url'
              placeholder='Site URL'
              suggestions={SUGGESTIONS.map(suggestion => ({
                value: suggestion.humanizedUrl
              }))}
              type='text'
              value={inputUrl}
              onChange={event => setInputUrl(event.target.value)}
              autoFocus
            />
          </Box>

          <Button
            css={theme({ mt: [3, 0, 0, 0], ml: [0, 2, 2, 2] })}
            loading={isLoading}
          >
            <Caps css={theme({ fontSize: 1 })}>Get it</Caps>
          </Button>
        </Flex>
      </Flex>

      <Flex css={{ flexDirection: 'column', alignItems: 'center' }}>
        <PreviewResponsive
          isLoading={isLoading}
          toClipboard={toClipboard}
          data={data}
        />
        <Box css={theme({ width: '100%' })}>
          <Tooltip
            type='copy'
            tooltipsOpts={Tooltip.TEXT.OPTIONS}
            content={
              <Tooltip.Content>{Tooltip.TEXT.COPY('HTML')}</Tooltip.Content>
            }
          >
            <Input
              readOnly
              onClick={event => {
                event.target.select()
                toClipboard({
                  copy: snippetText,
                  text: Tooltip.TEXT.COPIED('HTML')
                })
              }}
              css={theme({
                fontSize: 1,
                fontFamily: fonts.mono,
                cursor: 'copy',
                width: '100%',
                color: 'black60'
              })}
              value={snippetText}
            />
          </Tooltip>
        </Box>
      </Flex>
      <ClipboardComponent />
    </Flex>
  )
})

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
        Ready to use.{' '}
        <span css={theme({ display: 'block', color: 'white60' })}>
          Fast. Easy. Reliable.
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
          {trimMs(healthcheck.meta.p95_pretty)}
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
            <Average value={healthcheck.meta.avg_pretty} />
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
      id='timings'
      forwardedAs='section'
      css={theme({
        px: 4,
        flexDirection: 'column',
        pb: [5, 5, 6, 6],
        width: '100%',
        // https://www.gradientmagic.com/collection/radialstripes
        backgroundImage: `
          radial-gradient(
            circle at 69% 86%,
            rgba(165, 165, 165, 0.06) 0%,
            rgba(165, 165, 165, 0.06) 25%,
            rgba(193, 193, 193, 0.06) 25%,
            rgba(193, 193, 193, 0.06) 50%,
            rgba(221, 221, 221, 0.06) 50%,
            rgba(221, 221, 221, 0.06) 75%,
            rgba(249, 249, 249, 0.06) 75%,
            rgba(249, 249, 249, 0.06) 100%
          ),
          radial-gradient(
            circle at 49% 76%,
            rgba(129, 129, 129, 0.06) 0%,
            rgba(129, 129, 129, 0.06) 25%,
            rgba(164, 164, 164, 0.06) 25%,
            rgba(164, 164, 164, 0.06) 50%,
            rgba(200, 200, 200, 0.06) 50%,
            rgba(200, 200, 200, 0.06) 75%,
            rgba(235, 235, 235, 0.06) 75%,
            rgba(235, 235, 235, 0.06) 100%
          ),
          radial-gradient(
            circle at 22% 64%,
            rgba(173, 173, 173, 0.06) 0%,
            rgba(173, 173, 173, 0.06) 25%,
            rgba(119, 119, 119, 0.06) 25%,
            rgba(119, 119, 119, 0.06) 50%,
            rgba(64, 64, 64, 0.06) 50%,
            rgba(64, 64, 64, 0.06) 75%,
            rgba(10, 10, 10, 0.06) 75%,
            rgba(10, 10, 10, 0.06) 100%
          ),
          linear-gradient(307deg, #d306aa, #030070);
        `,
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
    <Subhead css={theme({ px: [3, 3, 0, 0] })} variant='gradient'>
      Instant Logo Intelligence
    </Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      <b>Microlink Logo</b> delivers enterprise-grade logo detection through a
      developer-friendly API. Extract brand assets, color palettes, and metadata
      from any website automatically. Perfect for building brand directories,
      competitor analysis, and seamless logo integration across your
      applications.
    </Caption>
    <Block
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Always fresh'
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
            Intelligent Caching
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Smart edge caching with automatic updates. Get lightning-fast
            responses while staying current with website changes. Configure{' '}
            <Link href='/docs/api/parameters/ttl'>TTL settings</Link> to balance
            freshness and performance.
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
            Advanced Color Analysis
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Extract complete brand color palettes automatically. Get dominant
            colors, complementary schemes, and background colors with the{' '}
            <Link href='/docs/api/parameters/palette'>palette parameter</Link>{' '}
            for perfect brand representation.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Colors detection'
          src='https://cdn.microlink.io/illustrations/workshop.svg'
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
          alt='Contextual information'
          src='https://cdn.microlink.io/illustrations/robots.svg'
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
            Complete Logo Metadata
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Get comprehensive logo information including file formats, exact
            dimensions, file sizes, and brand context. Perfect for responsive
            design, asset management, and brand consistency across all your
            applications.
          </Text>
        </Flex>
      }
    />
  </Container>
)

const ProductInformation = () => {
  return (
    <Faq
      title='Product Information'
      caption='All the details you need to know about the product.'
      css={theme({
        pb: [5, 5, 6, 6],
        bg: 'pinky',
        borderTop: `${borders[1]} ${colors.pinkest}`,
        borderBottom: `${borders[1]} ${colors.pinkest}`
      })}
      questions={[
        {
          question: 'What can I build with Logo API?',
          answer: (
            <>
              <div>
                Build powerful applications that need accurate brand
                representation. Create brand directories, competitor analysis
                tools, social media integrations, content management systems,
                and marketing automation platforms that automatically extract
                and display company logos.
              </div>
              <div>
                Perfect for SaaS companies building brand intelligence features,
                agencies creating client portfolios, or developers adding visual
                brand recognition to their applications.
              </div>
            </>
          )
        },
        {
          question: 'How accurate is the logo detection?',
          answer: (
            <>
              <div>
                Our enterprise-grade detection engine finds logos across
                millions of websites with high accuracy. We detect favicons,
                brand assets, social media profiles, and custom logos from any
                public website.
              </div>
              <div>
                The API returns structured data with confidence scoring,
                allowing you to programmatically validate results and handle
                edge cases gracefully in your applications.
              </div>
            </>
          )
        },
        {
          question: 'What about performance and scale?',
          answer: (
            <>
              <div>
                Built for enterprise scale with 99.9% uptime SLA. Our global CDN
                network ensures lightning-fast responses from 240+ edge
                locations worldwide. Smart caching keeps you updated while
                maintaining optimal performance.
              </div>
              <div>
                Handle millions of requests daily without worrying about
                infrastructure, browser automation complexity, or scaling
                challenges.
              </div>
            </>
          )
        },
        {
          question: 'How do I get started?',
          answer: (
            <>
              <div>
                Start free with our comprehensive API. Visit our{' '}
                <Link href='/docs/api/getting-started/overview'>
                  documentation
                </Link>{' '}
                for interactive examples, SDKs in multiple languages, and
                copy-paste integration code. No setup fees, pay-as-you-grow
                pricing.
              </div>
              <div>
                Have questions? Reach out at{' '}
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
    title='Always guaranteed Logo detection'
    description='Extract & Embed Website Logos. Automatic detection with comprehensive metadata, color palettes, and sizing information. Zero setup required.'
    image={cdnUrl('banner/logo.jpeg')}
    schemaType='SoftwareApplication'
    structured={{
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://microlink.io/logo',
      name: 'Microlink Logo API',
      description:
        'Extract and embed website logos automatically. Includes color palettes, dimensions, and brand metadata.',
      url: 'https://microlink.io/logo',
      applicationCategory: ['DeveloperApplication', 'API'],
      keywords: [
        'logo API',
        'website logo extraction',
        'logo detection',
        'color palette API',
        'website branding',
        'logo metadata',
        'favicon API',
        'brand colors'
      ],
      about: [
        { '@type': 'Thing', name: 'Logo Detection API' },
        { '@type': 'Thing', name: 'Website Logo Extraction' },
        { '@type': 'Thing', name: 'Color Palette Detection' },
        { '@type': 'Thing', name: 'Brand Metadata API' }
      ]
    }}
  />
)

const LogoPage = () => {
  const [query] = useQueryState()
  const isMounted = useMounted()
  const hasQuery = isMounted && !!query?.url

  return (
    <Layout>
      <FetchProvider mqlOpts={{ palette: true }}>
        {({ status, doFetch, data }) => {
          const isLoading =
            (hasQuery && status === 'initial') || status === 'fetching'
          const unifiedData = data || DEFAULT_DATA

          return (
            <>
              <LiveDemo
                data={unifiedData}
                isLoading={isLoading}
                onSubmit={doFetch}
                query={isMounted ? query : {}}
              />
              <Timings />
              <Features
                css={theme({ px: 4 })}
                title={
                  <Subhead css={{ width: '100%', textAlign: 'left' }}>
                    Effortless API,{' '}
                    <span
                      css={{
                        display: 'block',
                        color: '#d306aa',
                        width: '100%',
                        textAlign: 'left'
                      }}
                    >
                      ready to be used.
                    </span>
                  </Subhead>
                }
                caption={
                  <>
                    No more servers to maintain, load balancers, or paying for
                    capacity you don’t use — Microlink allows you spend more
                    time building, less time configuring, easy integration via{' '}
                    <Link href='/docs/api/getting-started/overview'>API</Link>.
                  </>
                }
                features={FEATURES}
              />
              <Resume />
              <ProductInformation />
            </>
          )
        }}
      </FetchProvider>
    </Layout>
  )
}

export default LogoPage
