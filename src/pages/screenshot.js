import { Compass as CompassIcon, Image as ImageIcon } from 'react-feather'
import React, { createElement, useMemo, useState } from 'react'
import { borders, breakpoints, layout, colors, theme } from 'theme'
import { useTransition, animated } from '@react-spring/web'
import isUrl from 'is-url-http/lightweight'
import { getApiUrl } from '@microlink/mql'
import { cdnUrl, trimMs } from 'helpers'
import humanizeUrl from 'humanize-url'
import prependHttp from 'prepend-http'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import isColor from 'is-color'
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
  Faq,
  Features,
  FetchProvider,
  Layout
} from 'components/patterns'

import {
  useClipboard,
  useFeaturesScreenshot,
  useHealthcheck,
  useQueryState,
  useWindowSize
} from 'components/hook'

import demoLinks from '../../data/demo-links'

const SMALL_BREAKPOINT = Number(breakpoints[0].replace('px', ''))

const ColorPreview = ({ color }) => (
  <Box
    css={theme({
      border: 1,
      borderColor: 'black10',
      borderRadius: 1,
      width: '14px',
      height: '14px',
      top: '-2px',
      position: 'relative'
    })}
    style={{ background: color }}
  />
)

const AnimatedImage = styled(animated.img)`
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
`

const INTERVAL = 1500

const SUGGESTIONS = [
  { theme: 'dark', id: 'apple' },
  { theme: 'light', id: 'mdn' },
  { theme: 'light', id: 'stackoverflow' },
  { theme: 'light', id: 'producthunt' },
  { theme: 'dark', id: 'nasa' }
].map(({ theme, id }) => {
  const filename = `${id}.png`
  const { url } = demoLinks.find(item => item.id === id).data

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

  const { data } = demoLinks.find(item => item.id === suggestion.id)
  const theme = get(opts, 'overlay.browser')

  const screenshotUrl = cdnUrl(
    theme
      ? `screenshot/browser/${theme}/${suggestion.filename}`
      : `screenshot/${suggestion.filename}`
  )

  return { data: { ...data, screenshot: { url: screenshotUrl } } }
}

const getEmbedUrl = ({ url, ...opts }) =>
  getApiUrl(url, { ...opts, screenshot: true, embed: 'screenshot.url' })[0]

const DemoSlider = ({ height, width }) => {
  const [index, setIndex] = useState(0)
  const next = index => ++index % SUGGESTIONS.length

  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: INTERVAL, mass: 1, tension: 120, friction: 14 },
    onRest: (_a, _b, item) => {
      if (index === item) setTimeout(() => setIndex(next), 1500)
    }
  })

  return (
    <Box css={theme({ pt: 2 })}>
      <Flex css={{ position: 'relative', height, width }}>
        {transitions((style, index) => {
          const url = SUGGESTIONS[index].cdnUrl
          const src = url
          return (
            <AnimatedImage
              key={src}
              decoding='async'
              style={style}
              src={src}
              alt={`${SUGGESTIONS[index].id} screenshot`}
            />
          )
        })}
      </Flex>
    </Box>
  )
}

const Screenshot = ({ data, cardWidth, cardHeight }) => {
  const imageUrl = get(data, 'screenshot.url')

  return (
    <Link px={3} href={imageUrl} icon={false}>
      <Image
        alt={`Microlink screenshot for ${data.url}`}
        css={theme({
          my: 4,
          pl: 0,
          pr: 0,
          height: cardHeight,
          width: cardWidth,
          border: 1,
          borderColor: 'black05',
          borderRadius: 3
        })}
        key={imageUrl}
        src={imageUrl}
        height={cardHeight}
        width={cardWidth}
        style={isLoading =>
          isLoading
            ? undefined
            : {
              filter: 'drop-shadow(rgba(0, 0, 0, 0.2) 0 16px 12px)'
            }
        }
      />
    </Link>
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

  const cardBase = size.width < SMALL_BREAKPOINT ? 1.2 : 2
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

  const [inputBg, setInputBg] = useState(get(query, 'overlay.background') || '')
  const [inputUrl, setInputUrl] = useState(query.url || '')
  const [inputOverlay, setInputOverlay] = useState(
    get(query, 'overlay.browser') || ''
  )

  const values = useMemo(() => {
    const preprendUrl = prependHttp(inputUrl)
    const overlay = pickBy({ browser: inputOverlay, background: inputBg })
    return pickBy({
      url: isUrl(preprendUrl) ? preprendUrl : undefined,
      overlay: isEmpty(overlay) ? undefined : overlay
    })
  }, [inputUrl, inputOverlay, inputBg])

  const embedUrl = useMemo(() => getEmbedUrl(values), [values])
  const snippetText = `curl -sL ${embedUrl}`

  const backgroundIconComponent = isColor(inputBg)
    ? createElement(ColorPreview, { color: inputBg })
    : createElement(ImageIcon, { color: colors.black50, size: '16px' })

  return (
    <Container as='section' css={theme({ alignItems: 'center', pt: 2 })}>
      <Heading css={theme({ px: [4, 5, 5, 5], maxWidth: layout.large })}>
        Easy peasy screenshots
      </Heading>
      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, 3, 4, 4],
          px: 4,
          maxWidth: layout.small
        })}
      >
        Say goodbye to complexity.
        <LineBreak />
        Turn websites into screenshots.
      </Caption>
      <Flex css={theme({ pt: [3, 3, 4, 4], fontSize: [2, 2, 3, 3] })}>
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
      <Flex css={{ justifyContent: 'center', alignItems: 'center' }}>
        <Flex
          as='form'
          css={theme({
            pt: [3, 3, 4, 4],
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
              id='screenshot-demo-url'
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
              placeholder='Overlay'
              id='screenshot-demo-overlay'
              type='text'
              css={theme({
                fontSize: 2,
                width: ['100%', '100%', '88px', '88px']
              })}
              value={inputOverlay}
              onChange={event => setInputOverlay(event.target.value)}
              iconComponent={
                <CompassIcon color={colors.black50} width='16px' />
              }
              suggestions={[{ value: 'dark' }, { value: 'light' }]}
            />
          </Box>

          <Box css={theme({ ml: [0, 0, 2, 2], mb: [3, 3, 0, 0] })}>
            <Input
              placeholder='Background'
              id='screenshot-demo-background'
              type='text'
              css={theme({
                fontSize: 2,
                width: ['100%', '100%', '128px', '128px']
              })}
              value={inputBg}
              onChange={event => setInputBg(event.target.value)}
              iconComponent={backgroundIconComponent}
              suggestions={[
                { value: '#c1c1c1' },
                {
                  value:
                    'linear-gradient(225deg, #FF057C 0%, #8D0B93 50%, #321575 100%)'
                },
                {
                  value: 'https://source.unsplash.com/random/2776x1910'
                }
              ]}
            />
          </Box>

          <Button css={theme({ ml: [0, 0, 2, 2] })} loading={isLoading}>
            <Caps css={theme({ fontSize: 1 })}>Take it</Caps>
          </Button>
        </Flex>
      </Flex>

      <Choose>
        <Choose.When condition={!!data}>
          <Flex
            css={theme({
              flexDirection: 'column',
              alignItems: 'center',
              pb: [4, 4, 5, 5]
            })}
          >
            <Screenshot
              cardWidth={cardWidth}
              cardHeight={cardHeight}
              data={data}
            />
            <Box css={theme({ px: 4 })} style={{ width: cardWidth / 1.5 }}>
              <Tooltip
                tooltipsOpts={Tooltip.TEXT.OPTIONS}
                content={
                  <Tooltip.Content>{Tooltip.TEXT.COPY.HTML}</Tooltip.Content>
                }
              >
                <Input
                  readOnly
                  onClick={event => {
                    event.target.select()
                    toClipboard({
                      copy: snippetText,
                      text: Tooltip.TEXT.COPIED.HTML
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
          <DemoSlider height={cardHeight} width={cardWidth} />
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
        Send the URL{' '}
        <span css={theme({ display: 'block', color: 'white60' })}>
          We do the rest
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
    <Subhead variant='gradient'>
      The fastest way for
      <LineBreak breakpoints={[1, 2]} /> taking screenshots
    </Subhead>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        maxWidth: [layout.small, layout.small, layout.normal, layout.normal]
      })}
    >
      <b>Microlink screenshot</b> provides a set of powerful features without
      the headaches of running your own infrastructure, giving you great power,
      less responsibilities.
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
            Browse automation
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Such as <Link href='/docs/api/parameters/device'>device</Link>{' '}
            emulation, <Link href='/docs/api/parameters/styles'>styles</Link>,{' '}
            <Link href='/docs/api/parameters/javascript'>javascript</Link> or{' '}
            <Link href='/docs/api/parameters/modules'>modules</Link> injection,
            partial or{' '}
            <Link href='/docs/api/parameters/screenshot/fullPage'>full</Link>{' '}
            page screenshot,{' '}
            <Link href='/docs/api/parameters/scroll'>scroll</Link> or{' '}
            <Link href='/docs/api/parameters/click'>click</Link> events, custom{' '}
            <Link href='/docs/api/parameters/viewport'>viewport</Link>, and
            more.
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
            Overlay composition
          </Subhead>
          <Text css={theme({ pt: [3, 3, 4, 4], maxWidth: 8 })}>
            Create truly{' '}
            <Link href='/docs/api/parameters/screenshot/overlay'>overlay</Link>{' '}
            compositions, setting up the background, browser window, color
            syntax highlight, and more.
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
                  Microlink screenshot
                </Text>{' '}
                is an easy way for taking an screenshot of any website in a
                programmatic way using{' '}
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
                For taking a screenshot, just you have to pass{' '}
                <Link href='/docs/api/parameters/screenshot'>screenshot</Link>{' '}
                query parameter against{' '}
                <Link href='/docs/api/getting-started/overview'>
                  Microlink API
                </Link>
                .
              </div>
              <div>
                The screenshot is taken running a chromium browser hosted on our
                own servers. Servers run the browser on top of optimized
                hardware to ensure the screenshot is taken fast as possible but
                also under security isolation condition, spawning a new browser
                per every new request, meaning no browsers are shared between
                requests.
              </div>
              <div>
                After that, the screenshot is uploaded into{' '}
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
                <Average
                  size='tiny'
                  value={healthcheck.screenshot.avg_pretty}
                />{' '}
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
    description='Easy peasy screenshots. Say goodbye to complexity. Turn websites into screenshots.'
    image={cdnUrl('banner/screenshot.jpeg')}
  />
)

const ScreenshotPage = () => {
  const [query] = useQueryState()
  const features = useFeaturesScreenshot()
  const hasQuery = !!query?.url

  return (
    <Layout>
      <FetchProvider fromCache={fromCache} mqlOpts={{ screenshot: true }}>
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
                    High performance,{' '}
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
                    capacity you don’t use — Microlink allows you spend more
                    time building, less time configuring, easy integration via{' '}
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

export default ScreenshotPage
