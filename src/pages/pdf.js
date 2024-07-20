import { Minimize as MinimizeIcon, Book as BookIcon } from 'react-feather'
import { borders, breakpoints, layout, colors, theme } from 'theme'
import React, { useMemo, useState } from 'react'
import isUrl from 'is-url-http/lightweight'
import { getApiUrl } from '@microlink/mql'
import { cdnUrl, trimMs } from 'helpers'
import humanizeUrl from 'humanize-url'
import prependHttp from 'prepend-http'
import pickBy from 'lodash/pickBy'
import get from 'dlv'

import {
  Box,
  Button,
  Caps,
  Card,
  Choose,
  Container,
  Flex,
  Heading,
  Hide,
  Iframe,
  Image,
  Input,
  InputIcon,
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
  Faq,
  Features,
  FetchProvider,
  Layout
} from 'components/patterns'

import {
  useClipboard,
  useFeaturesPdf,
  useHealthcheck,
  useQueryState,
  useWindowSize
} from 'components/hook'

const SMALL_BREAKPOINT = Number(breakpoints[0].replace('px', ''))

const SUGGESTIONS = [
  'https://basecamp.com/shapeup/0.3-chapter-01',
  'https://blog.alexmaccaw.com/advice-to-my-younger-self/',
  'https://css-tricks.com/nerds-guide-color-web/',
  'https://rauchg.com/2014/7-principles-of-rich-web-applications',
  'https://varnish-cache.org/docs/6.2/phk/thatslow.html'
].map(url => ({ url, value: humanizeUrl(url) }))

const getEmbedUrl = url => getApiUrl(url, { pdf: true, embed: 'pdf.url' })[0]

const PDFPlaceholder = props => {
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
        css={theme({ width: [3, 3, '60%', '60%'] })}
        style={{ opacity: 0.3, filter: 'grayscale(100%)' }}
        alt='Paste your URL'
        src='https://cdn.microlink.io/illustrations/abstract-no-messages.svg'
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
  const dataPdfUrl = get(data, 'pdf.url')

  const cardBase = size.width < SMALL_BREAKPOINT ? 1.2 : 2.2
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

  const [inputFormat, setinputFormat] = useState(get(query, 'format'))
  const [inputUrl, setInputUrl] = useState(query.url || '')
  const [inputMargin, setinputMargin] = useState(get(query, 'margin'))

  const values = useMemo(() => {
    const preprendUrl = prependHttp(inputUrl)

    return pickBy({
      url: isUrl(preprendUrl) ? preprendUrl : undefined,
      margin: inputMargin,
      format: inputFormat
    })
  }, [inputUrl, inputMargin, inputFormat])

  const embedUrl = useMemo(() => getEmbedUrl(values.url), [values])
  const snippetText = `curl -sL ${embedUrl}`

  return (
    <Container
      as='section'
      css={theme({ alignItems: 'center', pt: 2, pb: [4, 4, 5, 5] })}
    >
      <Heading css={theme({ px: [4, 5, 5, 5], maxWidth: layout.large })}>
        PDF made simple
      </Heading>
      <Caption
        titleize={false}
        forwardedAs='h2'
        css={theme({
          pt: [3, 3, 4, 4],
          px: 4,
          maxWidth: layout.small
        })}
      >
        Simplify your workflow, use less to get — Turn websites into PDF, in an
        easy way.
      </Caption>
      <Flex css={theme({ pt: [3, 3, 4, 4], fontSize: [2, 2, 3, 3] })}>
        <ArrowLink
          css={theme({ pr: [2, 4, 4, 4] })}
          href='/docs/api/parameters/pdf'
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
          <Box css={theme({ mb: [3, 3, 0, 0] })}>
            <Input
              css={theme({
                fontSize: 2,
                width: ['100%', '100%', '102px', '102px']
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
              suggestions={SUGGESTIONS.map(
                ({ cdnUrl, filename, ...suggestion }) => suggestion
              )}
              type='text'
              value={inputUrl}
              onChange={event => setInputUrl(event.target.value)}
              autoFocus
            />
          </Box>

          <Box css={theme({ ml: [0, 0, 2, 2], mb: [3, 3, 0, 0] })}>
            <Input
              placeholder='Margin'
              id='pdf-demo-margin'
              type='text'
              css={theme({
                fontSize: 2,
                width: ['100%', '100%', '82px', '82px']
              })}
              value={inputMargin}
              onChange={event => setinputMargin(event.target.value)}
              iconComponent={
                <MinimizeIcon color={colors.black50} width='16px' />
              }
              suggestions={[
                { value: '0' },
                { value: '0.35cm' },
                { value: '4mm' }
              ]}
            />
          </Box>

          <Box css={theme({ ml: [0, 0, 2, 2], mb: [3, 3, 0, 0] })}>
            <Input
              placeholder='Format'
              id='pdf-demo-format'
              type='text'
              css={theme({
                fontSize: 2,
                width: ['100%', '100%', '84px', '84px']
              })}
              value={inputFormat}
              onChange={event => setinputFormat(event.target.value)}
              iconComponent={<BookIcon color={colors.black50} width='16px' />}
              suggestions={[
                { value: 'Letter' },
                { value: 'Legal' },
                { value: 'Tabloid' },
                { value: 'A0' },
                { value: 'A1' },
                { value: 'A2' },
                { value: 'A3' },
                { value: 'A4' },
                { value: 'A5' },
                { value: 'A6' }
              ]}
            />
          </Box>

          <Button css={theme({ ml: [0, 0, 2, 2] })} loading={isLoading}>
            <Caps css={theme({ fontSize: 1 })}>Get it</Caps>
          </Button>
        </Flex>
      </Flex>
      <Choose>
        <Choose.When condition={!!dataPdfUrl}>
          <Flex css={{ flexDirection: 'column', alignItems: 'center' }}>
            <Iframe
              maxWidth={layout.normal}
              width={cardWidth}
              height={cardHeight}
              src={`https://docs.google.com/viewer?url=${dataPdfUrl}&embedded=true`}
            />
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
                  style={{ cursor: 'copy' }}
                  css={theme({ width: '100%', color: 'black60' })}
                  value={snippetText}
                />
              </Tooltip>
            </Box>
          </Flex>
        </Choose.When>
        <Choose.Otherwise>
          <PDFPlaceholder
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
        Speed as feature{' '}
        <span css={theme({ display: 'block', color: 'white60' })}>
          Performance matters
        </span>
      </Subhead>
    </Flex>
  )

  const blockTwo = (
    <Flex
      css={theme({
        pt: [4, 4, 5, 5],
        px: [4, 4, 4, 0],
        justifyContent: ['space-around', 'space-around', 'center', 'center'],
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
          {trimMs(healthcheck.pdf.p95_pretty)}
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
            <Average value={healthcheck.pdf.avg_pretty} />
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
          circle at top right,
          rgb(62, 41, 84) 0%,
          rgb(62, 41, 84) 50%,
          rgb(108, 28, 108) 50%,
          rgb(108, 28, 108) 60%,
          rgb(155, 14, 131) 60%,
          rgb(155, 14, 131) 63%,
          rgb(201, 1, 155) 63%,
          rgb(201, 1, 155) 100%
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
    <Subhead css={theme({ px: [3, 3, 6, 6] })} variant='gradient'>
      Generate PDFs from any website
    </Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      <b>Microlink PDF</b> provides a set of powerful features without the
      headaches of running your own infrastructure, giving you great power, less
      responsibilities.
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
            Always fresh
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Consecutive requests will be cached on the edge, respecting{' '}
            <Link href='/docs/api/parameters/ttl'>ttl</Link>. Consuming cached
            responses doesn’t affect your plan.
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
            Fully adaptable
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Such as set the paper{' '}
            <Link href='/docs/api/parameters/pdf/format'>format</Link>,
            establish a{' '}
            <Link href='/docs/api/parameters/pdf/margin'>margin</Link>, change
            the <Link href='/docs/api/parameters/pdf/scale'>scale</Link>, set{' '}
            <Link href='/docs/api/parameters/pdf/pageRanges'>page ranges</Link>,
            use <Link href='/docs/api/parameters/pdf/landscape'>landscape</Link>{' '}
            orientation, and a lot more.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Browse automation'
          src='https://cdn.microlink.io/illustrations/abstract-2.svg'
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
          alt='Overlay composition'
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
            Embed directly
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Create PDFs on-demand and{' '}
            <Link href='/docs/api/parameters/embed'>embed</Link> them directly
            in your HTML markup, without being worried about code or
            infrastructure.
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
                  Microlink PDF
                </Text>{' '}
                is a simple way to generate a PDF from any website using{' '}
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
                The PDF will be generated after passing{' '}
                <Link href='/docs/api/parameters/pdf'>pdf</Link> query parameter
                to{' '}
                <Link href='/docs/api/getting-started/overview'>
                  Microlink API
                </Link>
                .
              </div>
              <div>
                For creating the file, a chromium browser will run on our own
                servers, getting a PDF file as output. Servers run the browser
                on top of optimized hardware to ensure the PDF is created as
                fast as possible but also under security isolation condition,
                spawning a new browser per every new request, meaning no
                browsers are shared between requests.
              </div>
              <div>
                After that, the PDF file is uploaded into{' '}
                <Link href='/blog/edge-cdn/'>Microlink CDN</Link> and served
                across +140 edges nodes to ensure the best worldwide access
                time.
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
                <Average size='tiny' value={healthcheck.pdf.avg_pretty} /> isn’t
                a trivial thing.
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
    title='PDF'
    description='PDF made simple. Simplify your workflow, use less to get. Turn websites into PDF, in an easy way.'
    image={cdnUrl('banner/pdf.jpeg')}
  />
)

const PdfPage = () => {
  const [query] = useQueryState()
  const features = useFeaturesPdf()
  const hasQuery = !!query?.url

  return (
    <Layout>
      <FetchProvider mqlOpts={{ pdf: true }}>
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
                        color: '#e000ac',
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

export default PdfPage
