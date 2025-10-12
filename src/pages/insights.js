import { borders, breakpoints, layout, colors, theme } from 'theme'
import React, { useMemo, useState } from 'react'
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
import Iframe from 'components/elements/Iframe/Iframe'
import Image from 'components/elements/Image/Image'
import Input from 'components/elements/Input/Input'
import InputIcon from 'components/elements/Input/InputIcon'
import { Link } from 'components/elements/Link/base'
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
import { useFeatures } from 'components/hook/use-features'
import { useHealthcheck } from 'components/hook/use-healthcheck'
import { useQueryState } from 'components/hook/use-query-state'
import { useWindowSize } from 'components/hook/use-window-size'

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
        <Link href='https://github.com/GoogleChrome/lighthouse'>
          Lighthouse
        </Link>{' '}
        is an open-source, automated tool for improving the quality of web
        pages.
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
        Software detected under the target URL after analyzing source code,
        response headers, script variables and several other
      </Text>
      <Text css={theme({ pt: 3 })}>
        Detected{' '}
        <Text as='span' css={{ fontWeight: 'bold' }}>
          {technologies.length}
        </Text>{' '}
        technologies behind the site.
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
  const [ClipboardComponent, toClipboard] = useClipboard()
  const size = useWindowSize()
  const technologies = get(data, 'insights.technologies')

  const cardBase = size.width < SMALL_BREAKPOINT ? 1.2 : 2.2
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

  const [inputUrl, setInputUrl] = useState(query.url || '')

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
    <Container
      as='section'
      css={theme({ alignItems: 'center', pt: 2, pb: [4, 4, 5, 5] })}
    >
      <Heading css={theme({ px: 5, maxWidth: layout.large })}>
        Automate web performance
      </Heading>
      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, 3, 4, 4],
          px: 4,
          maxWidth: [layout.small, layout.small, layout.small, layout.small]
        })}
      >
        Track site speed & website quality over time — Get performance insights
        powered by{' '}
        <Link href='https://developers.google.com/web/tools/lighthouse'>
          Lighthouse
        </Link>
        .
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
            <Caps css={theme({ fontSize: 1 })}>Get it</Caps>
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
    </Container>
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
        Measure at scale{' '}
        <span css={theme({ color: 'white60', display: 'block' })}>
          without compromises
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
      Global performance insights on click
    </Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      <b>Microlink insights</b> provides first-class support for web performance
      monitoring, easy to integrate with any existing stack or cloud in just a
      few minutes.
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
            Audit on-demand
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Enable <Link href='/docs/api/parameters/insights'>insights</Link>{' '}
            query parameter at{' '}
            <Link href='/docs/api/getting-started/overview'>Microlink API</Link>{' '}
            for getting a{' '}
            <Link href='https://developers.google.com/web/tools/lighthouse'>
              Lighthouse
            </Link>{' '}
            report and technologies detected over the target URL.
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
            Run on the edge
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Never get worried about infrastructure again. Just hit{' '}
            <Link href='/docs/api/getting-started/overview'>Microlink API</Link>{' '}
            and we will run a cloud-based browsers for you.
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
            Simple integration
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Connect it with{' '}
            <Link href='https://lighthouse.microlink.io'>Lighthouse</Link> or{' '}
            <Link href='https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/server.md'>
              Lighthouse CI
            </Link>{' '}
            for unleashing all the power without compromise.
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
      forwardedAs='section'
      id='information'
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
          question: 'What is it?',
          answer: (
            <>
              <div>
                <Text
                  as='span'
                  css={theme({ color: 'black', fontWeight: 'bold' })}
                >
                  Microlink insights
                </Text>{' '}
                gives you web performance metrics in a simple way using{' '}
                <Link href='/docs/api/getting-started/overview'>
                  Microlink API
                </Link>
                .
              </div>
            </>
          )
        },
        {
          question: 'How does it work?',
          answer: (
            <>
              <div>
                The report is created after passing{' '}
                <Link href='/docs/api/parameters/insights'>insights</Link> query
                parameter to{' '}
                <Link href='/docs/api/getting-started/overview'>
                  Microlink API
                </Link>
                .
              </div>
              <div>
                For getting the report, we run{' '}
                <Link href='https://developers.google.com/web/tools/lighthouse'>
                  Lighthouse
                </Link>{' '}
                in our cloud browser servers, giving you the report obtained
                from the target URL.
              </div>
              <div>
                Additionally, we can also detect the technology stack behind the
                target URL, using{' '}
                <Link href='https://www.wappalyzer.com/'>Wappalyzer</Link> .
              </div>
              <div>
                The data obtained will be returned as part of the HTTP response
                payload.
              </div>
            </>
          )
        },
        {
          question: 'Why not run my own solution?',
          answer: (
            <>
              <div>
                The service aims to avoid headaches, preventing you for running
                and maintaining your own infrastructure.
              </div>
              <div>
                Every URL on the Internet are different and browser are a
                complex piece of software, with unpredictable resources usage.
              </div>
              <div>
                The fact of resolve any URL at scale in{' '}
                <Average size='tiny' value={healthcheck.insights.avg_pretty} />{' '}
                isn’t a trivial thing.
              </div>
            </>
          )
        },
        {
          question: 'Other questions?',
          answer: (
            <>
              <div>
                We’re always available at{' '}
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
    description='Automate web performance. Track site speed & website quality over time. Get performance insights powered by Lighthouse.'
    image={cdnUrl('banner/insights.jpeg')}
  />
)

const InsightsPage = () => {
  const [query] = useQueryState()
  const features = useFeatures()
  const hasQuery = !!query?.url

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
                query={query}
              />
              <Timings />
              <Features
                css={theme({ px: 4 })}
                title={
                  <Subhead css={{ width: '100%', textAlign: 'left' }}>
                    You call the API,{' '}
                    <span
                      css={{
                        display: 'block',
                        color: 'rgb(181, 0, 237)',
                        width: '100%',
                        textAlign: 'left'
                      }}
                    >
                      we handle the rest.
                    </span>
                  </Subhead>
                }
                caption={
                  <>
                    No code to maintain, no servers to deploy, but always ready
                    — Microlink allows you spend more time building, less time
                    configuring, easy integration via{' '}
                    <Link href='/docs/api/getting-started/overview'>API</Link>.
                  </>
                }
                features={features}
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
