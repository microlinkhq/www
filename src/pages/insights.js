import { borders, breakpoints, layout, colors, theme } from 'theme'
import React, { useMemo, useState, useEffect } from 'react'
import { useMounted } from 'components/hook/use-mounted'
import isUrl from 'is-url-http/lightweight'
import { getApiUrl } from '@microlink/mql'
import { cdnUrl } from 'helpers/cdn-url'
import { trimMs } from 'helpers/trim-ms'
import humanizeUrl from 'humanize-url'
import prependHttp from 'prepend-http'
import pickBy from 'lodash/pickBy'
import get from 'dlv'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Card from 'components/elements/Card/Card'
import Choose from 'components/elements/Choose'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Hide from 'components/elements/Hide'
import { Iframe } from 'components/elements/Iframe/Iframe'
import Image from 'components/elements/Image/Image'
import Input from 'components/elements/Input/Input'
import InputIcon from 'components/elements/Input/InputIcon'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

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

import { useClipboard } from 'components/hook/use-clipboard'
import { useHealthcheck } from 'components/hook/use-healthcheck'
import { useQueryState } from 'components/hook/use-query-state'
import { useWindowSize } from 'components/hook/use-window-size'

const FEATURES = [
  {
    title: 'Powerful & Scalable',
    description:
      'Enterprise-grade performance monitoring at scale. Handle millions of Lighthouse audits with 99.9% uptime SLA.'
  },
  {
    title: 'Free to Start',
    description:
      'Begin monitoring web performance immediately. No setup fees, pay-as-you-grow pricing that scales with your traffic.'
  },
  {
    title: 'Global CDN Network',
    description:
      'Distributed across 240+ edge locations powered by Cloudflare. Lightning-fast performance insights from anywhere worldwide.'
  },
  {
    title: 'Developer-First API',
    description:
      'RESTful API designed for developers. Language-agnostic integration with comprehensive SDKs and documentation.'
  },
  {
    title: 'Fully Programmable',
    description:
      'Complete automation capabilities. Integrate performance monitoring into CI/CD pipelines, dashboards, and alerting systems.'
  },
  {
    title: 'Zero-Config Setup',
    description:
      'Interactive documentation with live code examples. Get started in minutes with copy-paste integration snippets.'
  },
  {
    title: 'Browser Isolation',
    description:
      'Dedicated browser instances per request. No shared resources, maximum security, and consistent performance.'
  },
  {
    title: 'Smart Caching Layer',
    description:
      'Intelligent caching reduces redundant audits. Faster response times while maintaining fresh performance data.'
  },
  {
    title: 'Enterprise Security',
    description:
      'Bank-grade security with request isolation. SOC 2 compliant infrastructure protecting your performance data.'
  }
]

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)

const Caption = withTitle(CaptionBase)

const SMALL_BREAKPOINT = Number(breakpoints[0].replace('px', ''))

const SUGGESTIONS = [
  'https://basecamp.com/shapeup/0.3-chapter-01',
  'https://blog.alexmaccaw.com/advice-to-my-younger-self/',
  'https://css-tricks.com/nerds-guide-color-web/',
  'https://rauchg.com/2014/7-principles-of-rich-web-applications',
  'https://varnish-cache.org/docs/6.2/phk/thatslow.html'
].map(url => ({ url, value: humanizeUrl(url) }))

const getEmbedUrl = (url, embed) => getApiUrl(url, { insights: true, embed })[0]

const Wappalyzer = ({ data }) => (
  <Flex
    css={theme({
      borderRadius: 2,
      border: 1,
      borderColor: 'black10',
      width: 256,
      height: 96,
      m: [1, null, 2],
      p: 3,
      flexDirection: 'row',
      alignItems: 'center'
    })}
  >
    <Box css={{ flexShrink: 0 }}>
      <Image
        css={theme({ width: [30, 30, 40, 40] })}
        alt={`${data.name} logo`}
        src={data.logo}
      />
    </Box>
    <Box css={theme({ pl: 3 })}>
      <Link href={data.url}>{data.name}</Link>
      <Text
        css={theme({
          fontSize: 1,
          color: 'gray7',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical'
        })}
        title={data.categories.join(', ')}
      >
        {data.categories.join(', ')}
      </Text>
    </Box>
  </Flex>
)

const LighthouseReport = props => (
  <Flex css={{ flexDirection: 'column', alignItems: 'flex-start' }}>
    <Subhead css={theme({ textAlign: 'left', fontSize: 3 })}>
      Lighthouse report
    </Subhead>
    <Box css={theme({ pt: 3 })}>
      <Text css={{ maxWidth: layout.normal }}>
        Powered by Google's{' '}
        <Link href='https://github.com/GoogleChrome/lighthouse'>
          Lighthouse
        </Link>{' '}
        auditing engine - the industry standard for web performance analysis
        used by Google Search Console, PageSpeed Insights, and Chrome DevTools.
        Get comprehensive performance metrics, Core Web Vitals scores, SEO
        analysis, and accessibility audits.
      </Text>
    </Box>
    <Flex css={theme({ justifyContent: 'center', pt: 4, width: '100%' })}>
      <Iframe {...props} />
    </Flex>
  </Flex>
)

const TechnologyStack = ({ technologies }) => (
  <Flex
    as='section'
    css={{ flexDirection: 'column', alignItems: 'flex-start' }}
  >
    <Subhead css={theme({ textAlign: 'left', fontSize: 3 })}>
      Technology Stack
    </Subhead>
    <Box css={theme({ pt: 3 })}>
      <Text css={{ maxWidth: layout.small }}>
        Comprehensive technology stack detection using advanced fingerprinting
        techniques. Analyzes HTML source code, HTTP response headers, JavaScript
        variables, CSS frameworks, and client-side libraries to identify your
        complete tech ecosystem.
      </Text>
      <Text css={theme({ pt: 3 })}>
        Identified{' '}
        <Text as='span' css={{ fontWeight: 'bold' }}>
          {technologies.length}
        </Text>{' '}
        technologies powering this website, including frameworks, analytics
        tools, content management systems, and server infrastructure.
      </Text>
    </Box>
    <Flex
      css={theme({
        pt: 4,
        mx: 'auto',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
      })}
    >
      {technologies.map(data => (
        <Wappalyzer key={data.name} data={data} />
      ))}
      {technologies.length % 2 === 1 && (
        <Box css={theme({ m: 2, width: 256 })} />
      )}
    </Flex>
  </Flex>
)

const LighthousePlaceholder = props => {
  return (
    <Flex
      css={theme({
        border: 3,
        borderColor: 'black20',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      })}
      {...props}
    >
      <Image
        css={theme({ width: [3, 3, '80%', '80%'] })}
        alt='Paste your URL'
        src='https://cdn.microlink.io/logo/lighthouse.png'
      />
      <Text
        css={theme({
          pt: [2, 2, 4, 4],
          fontSize: [2, 2, 4, 4],
          color: 'black40'
        })}
      >
        Paste your URL
      </Text>
    </Flex>
  )
}

const LiveDemo = React.memo(function LiveDemo ({
  data,
  isInitialData,
  isLoading,
  onSubmit,
  query
}) {
  const isMounted = useMounted()
  const [ClipboardComponent, toClipboard] = useClipboard()
  const size = useWindowSize()
  const technologies = get(data, 'insights.technologies')

  const cardBase = !isMounted || size.width < SMALL_BREAKPOINT ? 1.2 : 2.2
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

  const [inputUrl, setInputUrl] = useState('')

  useEffect(() => {
    setInputUrl(query.url || '')
  }, [query])

  const values = useMemo(() => {
    const preprendUrl = prependHttp(inputUrl)
    return pickBy({ url: isUrl(preprendUrl) ? preprendUrl : undefined })
  }, [inputUrl])

  const embedTechnologiesUrl = useMemo(
    () => getEmbedUrl(values.url, 'insights.technologies'),
    [values]
  )

  const embedInsightsUrl = useMemo(
    () => getEmbedUrl(values.url, 'insights.lighthouse'),
    [values]
  )

  const snippetTechnologiesText = `curl -sL ${embedTechnologiesUrl}`
  const snippetInsightsText = `curl -sL ${embedInsightsUrl}`

  const reportUrl = `https://lighthouse.microlink.io/?url=${encodeURIComponent(
    embedInsightsUrl
  )}`

  return (
    <Flex
      as='section'
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        pb: [4, 4, 5, 5]
      })}
    >
      <Box>
        <Heading css={theme({ px: 5, maxWidth: layout.large })}>
          Automated web
          <br />
          performance insights
        </Heading>
      </Box>

      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, 3, 4, 4],
          px: 4,
          maxWidth: [layout.small, layout.small, layout.small, layout.small]
        })}
      >
        Monitor website performance automatically. Get Lighthouse-powered speed
        insights & quality metrics. Track Core Web Vitals, SEO scores, and
        performance trends.
      </Caption>
      <Flex css={theme({ pt: [3, 3, 4, 4], fontSize: [2, 2, 3, 3] })}>
        <ArrowLink
          css={theme({ pr: [2, 4, 4, 4] })}
          href='/docs/api/parameters/insights'
        >
          Get Started
        </ArrowLink>
        <ArrowLink href='https://github.com/microlinkhq/browserless'>
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
            const { url, ...opts } = values
            return onSubmit(url, opts)
          }}
        >
          <Box>
            <Input
              css={theme({
                fontSize: 2,
                width: ['100%', '100%', 128, 128]
              })}
              iconComponent={
                <InputIcon
                  src={data?.logo?.url}
                  provider={!isInitialData && 'microlink'}
                  url={!isInitialData && values.url}
                />
              }
              id='pdf-demo-url'
              placeholder='Visit URL'
              suggestions={SUGGESTIONS}
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
            <Caps css={theme({ fontSize: 1 })}>Analyze</Caps>
          </Button>
        </Flex>
      </Flex>

      <Choose>
        <Choose.When condition={!!reportUrl && !!technologies}>
          <Box
            as='section'
            id='technology-stack'
            css={{
              width: cardWidth,
              maxWidth: layout.normal,
              flexDirection: 'column'
            }}
          >
            <Box css={theme({ pt: 4 })}>
              <TechnologyStack technologies={technologies} />
            </Box>
            <Box
              css={theme({
                pt: [1, 1, 2, 2],
                width: [256, 256, 528, 528],
                mx: 'auto'
              })}
            >
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
                      copy: snippetTechnologiesText,
                      text: Tooltip.TEXT.COPIED('HTML')
                    })
                  }}
                  css={theme({
                    width: '100%',
                    color: 'black60',
                    cursor: 'copy'
                  })}
                  value={snippetTechnologiesText}
                />
              </Tooltip>
            </Box>
          </Box>
          <Box
            as='section'
            id='lighthouse-report'
            css={theme({ width: cardWidth, maxWidth: layout.normal, pt: 5 })}
          >
            <LighthouseReport
              maxWidth={layout.normal}
              width={cardWidth}
              height={cardHeight}
              src={reportUrl}
            />
            <Box css={theme({ pt: [2, 2, 3, 3], mx: 'auto' })}>
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
                      copy: snippetInsightsText,
                      text: Tooltip.TEXT.COPIED('HTML')
                    })
                  }}
                  css={theme({
                    width: '100%',
                    color: 'black60',
                    cursor: 'copy'
                  })}
                  value={snippetInsightsText}
                />
              </Tooltip>
            </Box>
          </Box>
        </Choose.When>
        <Choose.Otherwise>
          <LighthousePlaceholder
            style={{
              height: cardHeight,
              width: cardWidth,
              maxWidth: layout.normal
            }}
          />
        </Choose.Otherwise>
      </Choose>
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
        Performance metrics{' '}
        <span css={theme({ color: 'white60', display: 'block' })}>
          & SLA guarantees
        </span>
      </Subhead>
    </Flex>
  )

  const blockTwo = (
    <Flex
      css={theme({
        pt: [4, 4, 5, 5],
        justifyContent: ['space-around', 'space-around', 'center', 'center'],
        alignItems: 'baseline',
        px: [4, 4, 4, 0],
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
          {trimMs(healthcheck.insights.p95_pretty)}
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
            <Average value={healthcheck.insights.avg_pretty} />
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
      blockOne={blockOne}
      blockTwo={blockTwo}
      css={theme({
        pb: [5, 5, 6, 6],
        px: 4,
        width: '100%',
        borderTop: `${borders[1]} ${colors.white20}`,
        borderBottom: `${borders[1]} ${colors.white20}`,
        // https://www.gradientmagic.com/collection/radialstripes
        backgroundImage: `radial-gradient(
          circle at top right,
          rgb(36, 9, 119) 0%,
          rgb(36, 9, 119) 48%,
          rgb(72, 7, 149) 48%,
          rgb(72, 7, 149) 53%,
          rgb(109, 5, 178) 53%,
          rgb(109, 5, 178) 56%,
          rgb(145, 2, 208) 56%,
          rgb(145, 2, 208) 69%,
          rgb(181, 0, 237) 69%,
          rgb(181, 0, 237) 100%
        )`
      })}
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
    <Subhead css={theme({ px: [3, 3, 4, 4] })} variant='gradient'>
      Instant Web Performance Analytics
    </Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      <b>Microlink Insights</b> delivers enterprise-grade web performance
      monitoring through a developer-friendly API. Automate Lighthouse audits,
      track Core Web Vitals, detect technology stacks, and integrate performance
      monitoring into your CI/CD pipeline in minutes.
    </Caption>

    <Block
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Audit on-demand'
          src='https://cdn.microlink.io/illustrations/popularity.svg'
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
            On-Demand Audits
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Trigger comprehensive performance audits on-demand by adding the{' '}
            <Link href='/docs/api/parameters/insights'>
              <code>insights=true</code>
            </Link>{' '}
            parameter to any{' '}
            <Link href='/docs/api/getting-started/overview'>Microlink API</Link>{' '}
            request. Get detailed{' '}
            <Link href='https://developers.google.com/web/tools/lighthouse'>
              Lighthouse
            </Link>{' '}
            performance scores, Core Web Vitals metrics, SEO analysis, and
            complete technology stack detection instantly.
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
            Cloud-Native Infrastructure
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Enterprise-grade cloud infrastructure eliminates infrastructure
            headaches. Our globally distributed browser network handles
            Lighthouse execution, resource management, and scaling
            automatically. Focus on performance insights, not server maintenance
            or browser compatibility issues.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Run on the edge'
          src='https://cdn.microlink.io/illustrations/networking.svg'
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
          alt='Simple integration'
          src='https://cdn.microlink.io/illustrations/abstract-6.svg'
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
            Developer-Friendly Integration
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Seamlessly integrate with your existing development workflow.
            Connect with{' '}
            <Link href='https://lighthouse.microlink.io'>
              Lighthouse dashboards
            </Link>
            ,{' '}
            <Link href='https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/server.md'>
              Lighthouse CI
            </Link>
            , or custom monitoring solutions. RESTful API with comprehensive
            SDKs for JavaScript, Python, PHP, and more.
          </Text>
        </Flex>
      }
    />
  </Container>
)

const ProductInformation = () => {
  const healthcheck = useHealthcheck()

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
          question: 'What is Microlink Insights?',
          answer: (
            <>
              <div>
                <Text
                  as='span'
                  css={theme({ color: 'black', fontWeight: 'bold' })}
                >
                  Microlink Insights
                </Text>{' '}
                is a comprehensive web performance monitoring solution that
                provides automated Lighthouse audits and technology stack
                detection through our REST API. Get detailed performance
                metrics, Core Web Vitals scores, SEO analysis, and accessibility
                audits instantly for any website URL.
              </div>
              <div>
                Built on Google's industry-standard Lighthouse framework, it
                delivers the same performance insights used by Google Search
                Console, PageSpeed Insights, and Chrome DevTools - but
                programmatically accessible via API.
              </div>
            </>
          )
        },
        {
          question: 'How does Microlink Insights work?',
          answer: (
            <>
              <div>
                Simply append the{' '}
                <Link href='/docs/api/parameters/insights'>
                  <code>insights=true</code>
                </Link>{' '}
                parameter to any{' '}
                <Link href='/docs/api/getting-started/overview'>
                  Microlink API
                </Link>{' '}
                request. Our infrastructure automatically triggers a
                comprehensive audit process.
              </div>
              <div>
                We launch an isolated Chrome browser instance in our cloud
                infrastructure, navigate to your target URL, and execute
                Google's{' '}
                <Link href='https://developers.google.com/web/tools/lighthouse'>
                  Lighthouse
                </Link>{' '}
                auditing engine. This provides the same detailed performance
                analysis used by Google Search Console and PageSpeed Insights.
              </div>
              <div>
                Simultaneously, our system analyzes the website's source code,
                HTTP headers, and JavaScript variables using{' '}
                <Link href='https://www.wappalyzer.com/'>Wappalyzer</Link>{' '}
                technology detection engine to identify the complete technology
                stack - from frameworks and CMS platforms to analytics tools and
                server software.
              </div>
              <div>
                All performance metrics, audit scores, and technology data are
                compiled into a structured JSON response, delivered via HTTP
                with comprehensive error handling and retry logic for maximum
                reliability.
              </div>
            </>
          )
        },
        {
          question: 'Why choose Microlink over building your own?',
          answer: (
            <>
              <div>
                Running Lighthouse at scale requires significant infrastructure
                investment. Each audit needs isolated browser instances, proper
                resource management, and sophisticated error handling for the
                millions of edge cases across the modern web.
              </div>
              <div>
                Modern websites vary dramatically - from simple static sites to
                complex SPAs with JavaScript frameworks, authentication
                requirements, and dynamic content. Browser automation demands
                expertise in handling timeouts, JavaScript execution, network
                conditions, and security constraints.
              </div>
              <div>
                Our infrastructure delivers consistent{' '}
                <Average size='tiny' value={healthcheck.insights.avg_pretty} />{' '}
                response times across global regions, backed by 99.9% SLA. We've
                solved the complex engineering challenges so you can focus on
                using performance data, not generating it.
              </div>
              <div>
                Skip months of development time, infrastructure costs, and
                ongoing maintenance. Get enterprise-grade performance monitoring
                instantly with our battle-tested API that handles edge cases,
                security, and scaling automatically.
              </div>
            </>
          )
        },
        {
          question: 'Still have questions?',
          answer: (
            <>
              <div>
                Our developer-friendly team is here to help you succeed. Reach
                out at{' '}
                <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>{' '}
                for technical support, integration guidance, or custom
                enterprise solutions.
              </div>
              <div>
                Check our <Link href='/docs'>comprehensive documentation</Link>,{' '}
                <Link href='https://github.com/microlinkhq'>
                  GitHub repositories
                </Link>
                , and <Link href='/blog'>engineering blog</Link> for additional
                resources and examples.
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
    title='Automated Web Performance Insights'
    description='Track web speed & website quality over time. Monitor website performance automatically. Get Lighthouse-powered speed insights & quality metrics in real-time. Track Core Web Vitals, SEO scores & more.'
    image={cdnUrl('banner/insights.jpeg')}
    schemaType='SoftwareApplication'
    structured={{
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://microlink.io/insights',
      name: 'Microlink Insights API',
      description:
        'Monitor website performance automatically with Lighthouse-powered insights. Track Core Web Vitals, SEO scores, and quality metrics over time.',
      url: 'https://microlink.io/insights',
      applicationCategory: ['DeveloperApplication', 'API'],
      keywords: [
        'web performance monitoring',
        'Lighthouse audit',
        'Core Web Vitals',
        'website speed test',
        'performance insights',
        'SEO audit',
        'page speed analysis',
        'website optimization'
      ],
      about: [
        { '@type': 'Thing', name: 'Web Performance Monitoring' },
        { '@type': 'Thing', name: 'Lighthouse Audits' },
        { '@type': 'Thing', name: 'Core Web Vitals' }
      ]
    }}
  />
)

const InsightsPage = () => {
  const [query] = useQueryState()
  const isMounted = useMounted()
  const hasQuery = isMounted && !!query?.url

  return (
    <Layout>
      <FetchProvider mqlOpts={{ insights: true }}>
        {({ status, doFetch, data }) => {
          const isLoading =
            (hasQuery && status === 'initial') || status === 'fetching'
          const isInitialData = data === null

          return (
            <>
              <LiveDemo
                data={data}
                isInitialData={isInitialData}
                isLoading={isLoading}
                onSubmit={doFetch}
                query={isMounted ? query : {}}
              />
              <Timings />
              <Features
                css={theme({ px: 4 })}
                title={
                  <Subhead css={{ width: '100%', textAlign: 'left' }}>
                    Focus on performance,{' '}
                    <span
                      css={{
                        display: 'block',
                        color: 'rgb(181, 0, 237)',
                        width: '100%',
                        textAlign: 'left'
                      }}
                    >
                      not infrastructure
                    </span>
                  </Subhead>
                }
                caption={
                  <>
                    Zero infrastructure overhead. Deploy performance monitoring
                    instantly with our production-ready API. Focus on optimizing
                    user experience while we handle the complex browser
                    automation, scaling, and reliability. Start monitoring in
                    minutes with our{' '}
                    <Link href='/docs/api/getting-started/overview'>
                      comprehensive API documentation
                    </Link>
                    .
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

export default InsightsPage
