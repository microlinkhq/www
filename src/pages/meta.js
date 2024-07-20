import { layout, breakpoints, colors, borders, theme } from 'theme'
import React, { useMemo, useState } from 'react'
import isUrl from 'is-url-http/lightweight'
import { getApiUrl } from '@microlink/mql'
import { cdnUrl, trimMs } from 'helpers'
import prependHttp from 'prepend-http'
import chunk from 'lodash/chunk'

import {
  useClipboard,
  useFeaturesMeta,
  useHealthcheck,
  useQueryState,
  useWindowSize
} from 'components/hook'

import {
  AnimatedBox,
  Box,
  Button,
  Caps,
  Card,
  CodeEditor,
  Container,
  Flex,
  Heading,
  Hide,
  Image,
  Input,
  InputIcon,
  LineBreak,
  Link,
  Meta,
  Subhead,
  Text,
  Tooltip
} from 'components/elements'

import {
  ArrowLink,
  Average,
  Block,
  Caption,
  CubeBackground,
  Faq,
  Features,
  FetchProvider,
  Layout,
  List
} from 'components/patterns'

import humanizeUrl from 'humanize-url'

import demoLinks from '../../data/demo-links'

const INITIAL_SUGGESTION = 'youtube'

const DEMO_LINK = demoLinks.find(demoLink => demoLink.id === INITIAL_SUGGESTION)

const trimPx = str => Number(str.replace('px', ''))

const SMALL_BREAKPOINT = trimPx(breakpoints[0])

const SUGGESTIONS = [
  'instagram',
  'soundcloud',
  'spotify',
  'theverge',
  'youtube'
].map(id => {
  const { data } = demoLinks.find(item => item.id === id)
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
        color: type === 'no' ? 'gray' : undefined,
        fontSize: 1
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
  const [ClipboardComponent, toClipboard] = useClipboard()
  const size = useWindowSize()

  const cardBase = size.width < SMALL_BREAKPOINT ? 1.2 : 2.2
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

  const [inputUrl, setInputUrl] = useState(query.url || '')

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
    <Container
      as='section'
      css={theme({ alignItems: 'center', pt: 2, pb: [4, 4, 5, 5] })}
    >
      <Heading css={theme({ px: [4, 5, 5, 5], maxWidth: layout.large })}>
        Get unified metadata
      </Heading>

      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, 3, 4, 4],
          px: 4,
          maxWidth: layout.small
        })}
      >
        Structured and normalized data <LineBreak breakpoints={[0, 1]} /> from{' '}
        <LineBreak breakpoints={[2, 3]} />
        Open Graph, Microdata, RDFa, Twitter Cards, JSON-LD, HTML, and more.
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
                <InputIcon
                  src={data?.logo?.url}
                  provider={!isInitialData && 'microlink'}
                  url={!isInitialData && url}
                />
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
              pb: 4,
              width: cardWidth,
              height: cardHeight,
              maxWidth: layout.normal
            })}
            language='json'
          >
            {JSON.stringify(jsonData, null, 2)}
          </CodeEditor>
          <Box
            css={theme({ pt: 4, width: cardWidth, maxWidth: layout.normal })}
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
                css={theme({ cursor: 'copy', width: '100%', color: 'black60' })}
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
    </Container>
  )
})

const Timings = () => {
  const healthcheck = useHealthcheck()

  return (
    <AnimatedBox as='section'>
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
      Turns websites into data
    </Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      <b>Microlink meta</b> extracts structured data from any website. Enter a
      URL, receive information. Get relevant information from any link & easily
      create beautiful previews.
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
                Microlink meta
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
    description='Structured and normalized data from Open Graph, Microdata, RDFa, Twitter Cards, JSON-LD, HTML, and more.'
    image={cdnUrl('banner/meta.jpeg')}
  />
)

const MetaPage = () => {
  const [query] = useQueryState()
  const features = useFeaturesMeta()
  const hasQuery = !!query?.url

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
                query={query}
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

export default MetaPage
