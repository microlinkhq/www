import { borders, breakpoints, layout, colors, theme, fonts } from 'theme'
import FeatherIcon from 'components/icons/Feather'
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
import { Book, Minimize } from 'react-feather'

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
    title: 'Enterprise-Grade Reliability',
    description:
      'Production-ready PDF generation at scale. Handle millions of documents with 99.9% uptime SLA and guaranteed performance for business-critical workflows.'
  },
  {
    title: 'Free to Start',
    description:
      'Begin generating PDFs immediately. No setup fees, pay-as-you-grow pricing that scales with your document generation needs.'
  },
  {
    title: 'Global CDN Network',
    description:
      'Distributed across 240+ edge locations powered by Cloudflare. Lightning-fast PDF generation from anywhere worldwide.'
  },
  {
    title: 'Developer-First API',
    description:
      'RESTful API designed for developers. Language-agnostic integration with comprehensive SDKs and interactive documentation.'
  },
  {
    title: 'Advanced Content Control',
    description:
      'Advanced page range selection, custom scaling, and layout optimization. Generate exactly the content you need with precision control.'
  },
  {
    title: 'Flexible Output Formats',
    description:
      'Multiple paper sizes, orientation options, and margin controls. Perfect documents for any business requirement or compliance standard.'
  },
  {
    title: 'Real-Time Updates',
    description:
      'Automatic caching with refresh. Stay current with website changes while maintaining optimal performance.'
  },
  {
    title: 'Complete Customization',
    description:
      'CSS injection, JavaScript execution, and delay controls. Full customization capabilities for complex document generation needs.'
  },
  {
    title: 'Zero-Config Integration',
    description:
      'Interactive documentation with live code examples. Get started in minutes with copy-paste integration snippets and embed-ready code.'
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

const LiveDemo = ({ data, isInitialData, isLoading, onSubmit, query }) => {
  const isMounted = useMounted()
  const [ClipboardComponent, toClipboard] = useClipboard()
  const size = useWindowSize()
  const dataPdfUrl = get(data, 'pdf.url')
  const dataUrl = get(data, 'url')

  const cardBase = !isMounted || size.width < SMALL_BREAKPOINT ? 1.2 : 2.2
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

  const [inputFormat, setinputFormat] = useState('')
  const [inputUrl, setInputUrl] = useState('')
  const [inputMargin, setinputMargin] = useState('')

  useEffect(() => {
    if (query.url) {
      setInputUrl(query.url)
      setinputFormat(get(query, 'format') || '')
      setinputMargin(get(query, 'margin') || '')
    }
  }, [query])

  const values = useMemo(() => {
    const preprendUrl = prependHttp(inputUrl)

    return pickBy({
      url: isUrl(preprendUrl) ? preprendUrl : undefined,
      margin: inputMargin,
      format: inputFormat
    })
  }, [inputUrl, inputMargin, inputFormat])

  const embedUrl = useMemo(
    () => (dataUrl ? getEmbedUrl(dataUrl) : ''),
    [dataUrl]
  )
  const snippetText = embedUrl ? `curl -sL ${embedUrl}` : ''

  return (
    <Flex
      as='section'
      css={theme({
        flexDirection: 'column',
        alignItems: 'center',
        pb: [4, 4, 5, 5]
      })}
    >
      <Heading css={theme({ px: [4, 5, 5, 5], maxWidth: layout.large })}>
        Automated website <br /> PDF conversion
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
        Transform any website into a professional PDF with one API call.
        Enterprise-grade reliability, full customization, and instant
        generation.
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
                <FeatherIcon
                  icon={Minimize}
                  color='black50'
                  size={[0, 0, 1, 1]}
                />
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
              iconComponent={
                <FeatherIcon icon={Book} color='black50' size={[0, 0, 1, 1]} />
              }
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
              key={dataPdfUrl}
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
    <Subhead css={theme({ px: [3, 3, 0, 0] })} variant='gradient'>
      Instant PDF Generation
    </Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      <b>Microlink PDF</b> delivers enterprise-grade document generation through
      a developer-friendly API. Convert any website to PDF automatically with
      full customization and control. Perfect for reports, archiving,
      compliance, and automated document workflows.
    </Caption>

    <Block
      blockOne={
        <Image
          css={theme({
            px: [4, 0, 0, 0],
            width: ['100%', 6, 7, 8]
          })}
          alt='Lightning-Fast Performance'
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
            Lightning-Fast Performance
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Smart edge caching ensures instant PDF generation. Configure{' '}
            <Link href='/docs/api/parameters/ttl'>TTL settings</Link> for
            optimal performance while staying current with website changes. No
            infrastructure overhead.
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
            Complete Document Control
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Full customization for professional documents. Control paper sizes,
            margins, scaling, page ranges, and orientation. Generate perfect
            PDFs for reports, contracts, and compliance documentation with
            pixel-perfect precision.
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
            Seamless Integration
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Generate PDFs on-demand and{' '}
            <Link href='/docs/api/parameters/embed'>embed</Link> them directly
            in your applications. No infrastructure worries, no complex setup.
            Perfect for dynamic reports, user-generated content, and automated
            document workflows.
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
      caption='Everything you need to know about PDF generation with our API.'
      css={theme({
        pb: [5, 5, 6, 6],
        bg: 'pinky',
        borderTop: `${borders[1]} ${colors.pinkest}`,
        borderBottom: `${borders[1]} ${colors.pinkest}`
      })}
      questions={[
        {
          question: 'What can I build with PDF API?',
          answer: (
            <>
              <div>
                Build powerful document automation systems. Create report
                generators, compliance archives, content preservation tools, and
                automated document workflows. Perfect for SaaS platforms,
                content management systems, and business process automation.
              </div>
              <div>
                Generate PDFs for invoices, contracts, user manuals, marketing
                materials, and any web content that needs to be preserved in
                document format.
              </div>
            </>
          )
        },
        {
          question: 'How reliable is PDF generation?',
          answer: (
            <>
              <div>
                Enterprise-grade reliability with 99.9% uptime SLA. Our
                optimized Chromium infrastructure handles complex websites,
                dynamic content, and large documents with consistent
                performance.
              </div>
              <div>
                Every request runs in isolated browser instances for security
                and reliability. PDFs are generated server-side and delivered
                via global CDN for optimal performance worldwide.
              </div>
            </>
          )
        },
        {
          question: 'What about customization and control?',
          answer: (
            <>
              <div>
                Full control over document output. Customize paper sizes,
                margins, orientation, page ranges, scaling, and content
                selection. Inject custom CSS and JavaScript for complete
                document styling and behavior control.
              </div>
              <div>
                Perfect for generating professional reports, branded documents,
                and compliance-ready PDFs with pixel-perfect precision.
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
                for interactive examples, multiple language SDKs, and
                ready-to-use code snippets. No infrastructure setup required.
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

const PDF_MQL_OPTS = { pdf: true }
const noCacheFn = () => undefined

export const Head = () => (
  <Meta
    title='Automated Website PDF Conversion'
    description='Transform any website into a professional PDF with one API call. Enterprise-grade reliability, full customization, and instant generation for reports, archiving, compliance, and automated document workflows.'
    image={cdnUrl('banner/pdf.jpeg')}
    schemaType='SoftwareApplication'
    structured={{
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': 'https://microlink.io/pdf',
      name: 'Microlink PDF API',
      description:
        'Transform any website into a professional PDF with one API call. Enterprise-grade reliability, full customization, and instant generation.',
      url: 'https://microlink.io/pdf',
      applicationCategory: ['DeveloperApplication', 'API'],
      keywords: [
        'PDF API',
        'website to PDF',
        'PDF generation',
        'document automation',
        'web scraping PDF',
        'PDF conversion',
        'automated PDF',
        'document generation',
        'instant PDF',
        'one click PDF'
      ],
      about: [
        { '@type': 'Thing', name: 'PDF Generation API' },
        { '@type': 'Thing', name: 'Website to PDF Conversion' },
        { '@type': 'Thing', name: 'Document Automation' },
        { '@type': 'Thing', name: 'PDF Creation Service' }
      ]
    }}
  />
)

const PdfPage = () => {
  const [query] = useQueryState()
  const isMounted = useMounted()
  const hasQuery = isMounted && !!query?.url

  return (
    <Layout>
      <FetchProvider mqlOpts={PDF_MQL_OPTS} fromCache={noCacheFn}>
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

export default PdfPage
