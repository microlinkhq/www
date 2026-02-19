import { layout, breakpoints, colors, borders, theme, fonts } from 'theme'
import React, { useMemo, useState, useEffect } from 'react'
import { useMounted } from 'components/hook/use-mounted'
import isUrl from 'is-url-http/lightweight'
import { getApiUrl } from '@microlink/mql'
import { trimMs } from 'helpers/trim-ms'
import { cdnUrl } from 'helpers/cdn-url'
import prependHttp from 'prepend-http'
import chunk from 'lodash/chunk'

import { useClipboard } from 'components/hook/use-clipboard'
import { useHealthcheck } from 'components/hook/use-healthcheck'
import { useQueryState } from 'components/hook/use-query-state'
import { useWindowSize } from 'components/hook/use-window-size'

import AnimatedBox from 'components/elements/AnimatedBox'
import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Card from 'components/elements/Card/Card'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Hide from 'components/elements/Hide'
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
import CubeBackground from 'components/patterns/CubeBackground/CubeBackground'
import Faq from 'components/patterns/Faq/Faq'
import Features from 'components/patterns/Features/Features'
import FetchProvider from 'components/patterns/FetchProvider'
import Layout from 'components/patterns/Layout'
import List from 'components/patterns/List/List'
import Tooltip from 'components/patterns/Tooltip/Tooltip'

import humanizeUrl from 'humanize-url'

import { findDemoLinkById } from 'helpers/demo-links'

const FEATURES = [
  {
    title: 'Enterprise-Grade Reliability',
    description:
      'Production-ready metadata extraction at scale. Handle millions of requests with 99.9% uptime SLA and guaranteed performance for business-critical applications.'
  },
  {
    title: 'Free to Start',
    description:
      'Begin extracting metadata immediately. No setup fees, pay-as-you-grow pricing that scales with your data needs.'
  },
  {
    title: 'Global CDN Network',
    description:
      'Distributed across 240+ edge locations powered by Cloudflare. Lightning-fast metadata extraction from anywhere worldwide.'
  },
  {
    title: 'Developer-First API',
    description:
      'RESTful API designed for developers. Language-agnostic integration with comprehensive SDKs and interactive documentation.'
  },
  {
    title: 'Smart Color Analysis',
    description:
      'Advanced color detection algorithms extract brand palettes, dominant colors, and complementary schemes automatically.'
  },
  {
    title: 'Universal Detection',
    description:
      'Extract metadata from any website, including social media profiles, favicons, and custom brand assets across all platforms.'
  },
  {
    title: 'Real-Time Updates',
    description:
      'Intelligent caching with automatic refresh. Stay current with website changes while maintaining optimal performance.'
  },
  {
    title: 'Complete Metadata',
    description:
      'Get comprehensive data including titles, descriptions, images, videos, and structured information from any URL.'
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

const INITIAL_SUGGESTION = 'youtube'

const DEMO_LINK = findDemoLinkById(INITIAL_SUGGESTION)

const trimPx = str => Number(str.replace('px', ''))

const SMALL_BREAKPOINT = trimPx(breakpoints[0])

const SUGGESTIONS = [
  'instagram',
  'soundcloud',
  'spotify',
  'theverge',
  'youtube'
].map(id => {
  const { data } = findDemoLinkById(id)
  return { value: humanizeUrl(data.url), data }
})

const JSON_KEYS = [
  'author',
  'audio',
  'date',
  'description',
  'iframe',
  'image',
  'lang',
  'logo',
  'publisher',
  'title',
  'url',
  'video'
]

const [JsonKeysFirstChunk, JsonKeysSecondChunk] = chunk(
  JSON_KEYS,
  JSON_KEYS.length / 2
)

const COLOR = '#3e55ff'

const JSONProperty = ({ property, data, ...props }) => {
  const children = data[property]
  const type = children !== null ? 'yes' : 'no'
  return (
    <List.Item
      css={theme({
        width: '100px',
        color: type === 'no' ? 'red' : undefined,
        fontFamily: 'mono',
        fontSize: 0
      })}
      type={type}
      {...props}
    >
      {property}
    </List.Item>
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

  const cardBase = !isMounted || size.width < SMALL_BREAKPOINT ? 1.2 : 2.2
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

  const [inputUrl, setInputUrl] = useState('')

  useEffect(() => {
    setInputUrl(query.url || '')
  }, [query])

  const url = useMemo(() => {
    const input = prependHttp(inputUrl)
    return isUrl(input) ? input : data.url
  }, [inputUrl, data])

  const jsonData = (() => {
    const suggestion = SUGGESTIONS.find(({ value }) => value === inputUrl)
    return suggestion ? suggestion.data : data
  })()

  const embedUrl = useMemo(() => {
    if (!data || !data.url) return
    const [embedUrl] = getApiUrl(data.url, {
      palette: true,
      audio: true,
      video: true,
      iframe: true
    })
    return embedUrl
  }, [data])

  const snippetText = `curl -sL ${embedUrl}`

  return (
    <Flex
      as='section'
      id='hero'
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        pb: [4, 4, 5, 5]
      })}
    >
      <Heading css={theme({ px: [4, 5, 5, 5], maxWidth: layout.large })}>
        Consistent structured <br /> unified metadata
      </Heading>

      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, 3, 4, 4],
          px: 4,
          maxWidth: layout.small
        })}
      >
        Transform any website into structured data instantly. Extract titles,
        descriptions, images, videos, and metadata from Open Graph, JSON-LD, and
        HTML markup automatically.
      </Caption>

      <Flex css={theme({ pt: [3, 3, 4, 4], fontSize: [2, 2, 3, 3] })}>
        <ArrowLink
          css={theme({ pr: [2, 4, 4, 4] })}
          href='/docs/api/parameters/meta'
        >
          Get Started
        </ArrowLink>
        <ArrowLink href='https://github.com/microlinkhq/sdk'>
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
            const url = prependHttp(inputUrl)
            onSubmit(isUrl(url) ? url : undefined)
          }}
        >
          <Box>
            <Input
              id='meta-demo-url'
              css={theme({
                fontSize: 2,
                width: ['100%', '100%', 128, 128]
              })}
              iconComponent={
                <InputIcon.Microlink url={!isInitialData && url} />
              }
              placeholder='Visit URL'
              type='text'
              suggestions={SUGGESTIONS}
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

      <Flex
        css={theme({
          mx: 'auto',
          flexDirection: ['column', 'column', 'row', 'row'],
          justifyContent: 'center',
          alignItems: 'center',
          maxWidth: layout.large
        })}
      >
        <Hide breakpoints={[0, 1]}>
          <List css={theme({ pr: 4, pl: 0 })}>
            {JsonKeysFirstChunk.map(children => (
              <JSONProperty
                key={children}
                property={children}
                data={jsonData}
              />
            ))}
          </List>
        </Hide>
        <Flex css={{ flexDirection: 'column', alignItems: 'center' }}>
          <CodeEditor
            css={theme({
              width: cardWidth,
              height: cardHeight,
              maxWidth: layout.normal
            })}
            language='json'
          >
            {JSON.stringify(jsonData, null, 2)}
          </CodeEditor>
          <Box
            css={theme({ pt: 3, width: cardWidth, maxWidth: layout.normal })}
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
        <Hide breakpoints={[0, 1]}>
          <List css={theme({ pl: 4 })}>
            {JsonKeysSecondChunk.map(children => (
              <JSONProperty
                key={children}
                property={children}
                data={jsonData}
              />
            ))}
          </List>
        </Hide>
        <Hide breakpoints={[2, 3]}>
          <List
            css={theme({
              justifyContent: 'center',
              flexDirection: ['row', 'row', 'column', 'column'],
              flexWrap: ['wrap', 'wrap', undefined, undefined],
              maxWidth: [layout.small, layout.small, undefined, undefined],
              pt: 4,
              m: 0,
              pr: [4, 4, 4, 4],
              pl: [4, 4, 0, 0]
            })}
          >
            {JSON_KEYS.map(children => (
              <JSONProperty key={children} property={children} data={data} />
            ))}
          </List>
        </Hide>
      </Flex>
      <ClipboardComponent />
    </Flex>
  )
})

const Timings = () => {
  const healthcheck = useHealthcheck()

  return (
    <AnimatedBox as='section' id='timings'>
      <Block
        id='timings'
        flexDirection='column'
        css={theme({
          bg: COLOR,
          px: 4,
          pb: [5, 5, 6, 6]
        })}
        blockOne={
          <Subhead css={theme({ fontSize: [3, 4, 6, 6], color: 'white' })}>
            On a built-in reliable,{' '}
            <span css={theme({ display: 'block', color: 'white60' })}>
              High performance API.
            </span>
          </Subhead>
        }
        blockTwo={
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
              <Caption
                forwardedAs='div'
                css={theme({ color: 'white60', pt: 2 })}
              >
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
                      css={theme({
                        fontWeight: 'bold',
                        fontSize: [0, 2, 2, 2]
                      })}
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
              <Caption
                forwardedAs='div'
                css={theme({ color: 'white60', pt: 2 })}
              >
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
        }
      >
        <CubeBackground />
      </Block>
    </AnimatedBox>
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
      Instant Link Intelligence
    </Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      <b>Microlink Metadata</b> delivers enterprise-grade metadata extraction
      through a developer-friendly API. Transform any URL into structured data
      automatically. Perfect for link previews, content management, social media
      automation, and rich media applications.
    </Caption>

    <Block
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Unified metadata'
          src='https://cdn.microlink.io/illustrations/abstract-delivery.svg'
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
            Unified metadata
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Get normalized data from multiple sources using Open Graph,
            Microdata, RDFa, Twitter Cards, JSON-LD, HTML, and more.
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
            Contextual information
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Whenever is possible data is expanded to bring you more, like file
            extension, dimensions, size, duration, etc.
          </Text>
        </Flex>
      }
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
    />

    <Block
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Easily consumable'
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
            Easily consumable
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Turn any link into a rich media and easily add it to your UI using{' '}
            <Link href='/sdk'>Microlink SDK</Link>, with{' '}
            <Link href='/docs/api/parameters/iframe/#providers-supported'>
              +250 verified providers
            </Link>{' '}
            supported.
          </Text>
        </Flex>
      }
    />
  </Container>
)

const ProductInformation = () => (
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
        question: 'What is it?',
        answer: (
          <>
            <div>
              <Text
                as='span'
                css={theme({ color: 'black', fontWeight: 'bold' })}
              >
                Microlink metadata
              </Text>{' '}
              is a data extraction service that take a URL as input, giving you
              structured data as output.
            </div>
            <div>
              The data detected is unified and normalized from different data
              source providers present on the semantic markup of the target URL,
              such as Open Graph, JSON+LD, oEmbed, microformats or regular HTML.
            </div>
          </>
        )
      },
      {
        question: 'How does it work?',
        answer: (
          <>
            <div>
              It’s a{' '}
              <Link href='https://en.wikipedia.org/wiki/Rule-based_system'>
                rule-based system
              </Link>{' '}
              called <Link href='https://metascraper.js.org'>metascraper</Link>,
              where the desired value (e.g., the title) will be searched over
              the content according to a series of rules.
            </div>
            <div>
              Also, this process ensures the value extracted follows a specific
              data shape. So, not only the value should be present, it needs to
              satisfy a specific data shape as well.
            </div>
            <div>
              In this way, if the service detects the value, you can be sure
              that is what it claims to be.
            </div>
          </>
        )
      },
      {
        question: 'Why not run my own solution?',
        answer: (
          <>
            <div>
              You can always run your own solution; Most of our software is{' '}
              <Link href='/oss'>Open Source</Link>, so you can take them and
              hosted from scratch.
            </div>
            <div>
              What we offer as part of our value proposition is a production
              ready solution without the headaches of running your own
              infrastructure.
            </div>
            <div>
              No code to maintain, no servers to scale up, no dependencies to
              upgrade. Just an always ready{' '}
              <Link href='/docs/api/getting-started/overview'>API</Link> ready
              to use.
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
              <Link href='mailto:hello@microlink.io'>hello@microlink.io</Link>.
            </div>
          </>
        )
      }
    ]}
  />
)

export const Head = () => (
  <Meta
    title='Consistent Structured Unified Metadata'
    description='Transform any website into structured data instantly. Extract titles, descriptions, images, videos, and metadata from Open Graph, JSON-LD, and HTML markup automatically.'
    image={cdnUrl('banner/meta.jpeg')}
    schemaType='SoftwareApplication'
    structured={{
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://microlink.io/meta',
      name: 'Microlink Metadata API',
      description:
        'Get unified metadata from any website. Transform URLs into structured data with titles, descriptions, images, videos, and comprehensive metadata.',
      url: 'https://microlink.io/meta',
      applicationCategory: ['DeveloperApplication', 'API'],
      keywords: [
        'metadata API',
        'unified metadata',
        'structured data',
        'Open Graph',
        'JSON-LD',
        'link preview',
        'web scraping',
        'data extraction'
      ],
      about: [
        { '@type': 'Thing', name: 'Metadata Extraction' },
        { '@type': 'Thing', name: 'Structured Data API' },
        { '@type': 'Thing', name: 'Link Preview Service' },
        { '@type': 'Thing', name: 'Web Data Extraction' }
      ]
    }}
  />
)

const MetaPage = () => {
  const [query] = useQueryState()
  const isMounted = useMounted()
  const hasQuery = isMounted && !!query?.url

  return (
    <Layout>
      <FetchProvider
        mqlOpts={{ palette: true, audio: true, video: true, iframe: true }}
      >
        {({ status, doFetch, data }) => {
          const isLoading =
            (hasQuery && status === 'initial') || status === 'fetching'
          const unifiedData = data || DEMO_LINK.data
          const isInitialData = unifiedData.url === DEMO_LINK.data.url

          return (
            <>
              <LiveDemo
                data={unifiedData}
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
                    Great power,{' '}
                    <span
                      css={{
                        display: 'block',
                        color: COLOR,
                        width: '100%',
                        textAlign: 'left'
                      }}
                    >
                      less responsibility.
                    </span>
                  </Subhead>
                }
                caption={
                  <>
                    No more configuring auto-scaling, load balancers, or paying
                    for capacity you don’t use — Microlink is the fastest, cost
                    effective solution for data extraction at any scale, fully
                    customizable via{' '}
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

export default MetaPage
