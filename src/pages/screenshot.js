import { Compass as CompassIcon, Image as ImageIcon } from 'react-feather'
import React, { createElement, useMemo, useState } from 'react'
import { borders, breakpoints, layout, colors } from 'theme'
import { useTransition, animated } from '@react-spring/web'
import isUrl from 'is-url-http/lightweight'
import { getApiUrl } from '@microlink/mql'
import humanizeUrl from 'humanize-url'
import prependHttp from 'prepend-http'
import styled from 'styled-components'
import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import { getDomain } from 'tldts'
import { cdnUrl } from 'helpers'
import isColor from 'is-color'
import get from 'dlv'

import {
  Box,
  Button,
  Caps,
  Card,
  Choose,
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
  Subhead,
  Text
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
  useFeaturesScreenshot,
  useHealthcheck,
  useQueryState,
  useWindowSize
} from 'components/hook'

import demoLinks from '../../data/demo-links'

const SMALL_BREAKPOINT = Number(breakpoints[0].replace('px', ''))

const getMs = str => str.replace(/ms|s/, '')

const ColorPreview = ({ color }) => (
  <Box
    border={1}
    borderColor='black10'
    borderRadius={1}
    width='14px'
    height='14px'
    style={{ top: '-2px', position: 'relative', background: color }}
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

const DemoSlider = ({ children: slides, ...props }) => {
  const [index, setIndex] = useState(0)
  const next = index => ++index % slides.length

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
    <Flex style={{ position: 'relative' }} {...props}>
      {transitions((style, index) => {
        const url = slides[index].cdnUrl
        const src = url
        return (
          <AnimatedImage
            key={src}
            decoding='async'
            style={style}
            src={src}
            alt={`${slides[index].id} screenshot`}
          />
        )
      })}
    </Flex>
  )
}

const Screenshot = ({ domain, data, cardWidth, cardHeight, ...props }) => {
  const imageUrl = get(data, 'screenshot.url')

  return (
    <Link px={3} href={imageUrl} icon={false}>
      <Image
        alt={`${domain} screenshot`}
        pl={0}
        pr={0}
        key={imageUrl}
        src={imageUrl}
        height={imageUrl ? 'inherit' : cardHeight}
        width={cardWidth}
        style={isLoading => {
          if (isLoading) return
          return { filter: 'drop-shadow(rgba(0, 0, 0, 0.3) 0 16px 12px)' }
        }}
        {...props}
      />
    </Link>
  )
}

const LiveDemo = ({ data, query, suggestions, onSubmit, isLoading }) => {
  const size = useWindowSize()

  const cardBase = size.width < SMALL_BREAKPOINT ? 1.2 : 2
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

  const [inputBg, setInputBg] = useState(get(query, 'overlay.background') || '')
  const [inputUrl, setInputUrl] = useState(query.url || '')
  const [inputOverlay, setInputOverlay] = useState(
    get(query, 'overlay.browser') || ''
  )

  const domain = useMemo(() => getDomain(inputUrl), [inputUrl])

  const values = useMemo(() => {
    const preprendUrl = prependHttp(inputUrl)
    const overlay = pickBy({ browser: inputOverlay, background: inputBg })
    return pickBy({
      url: isUrl(preprendUrl) ? preprendUrl : undefined,
      overlay: isEmpty(overlay) ? undefined : overlay
    })
  }, [inputUrl, inputOverlay, inputBg])

  const suggestionUrl = useMemo(() => {
    const suggestion = SUGGESTIONS.find(
      ({ value }) => humanizeUrl(value) === inputUrl
    )

    if (suggestion) {
      const theme = get(values, 'overlay.browser')

      return cdnUrl(
        theme
          ? `screenshot/browser/${theme}/${suggestion.filename}`
          : `screenshot/${suggestion.filename}`
      )
    }
  }, [inputUrl, values])

  const embedUrl = useMemo(() => {
    const { url, ...opts } = values
    if (!url) return
    const [embedUrl] = getApiUrl(url, {
      ...opts,
      screenshot: true,
      meta: false,
      embed: 'screenshot.url'
    })
    return embedUrl
  }, [values])

  const handleSubmit = event => {
    event.preventDefault()
    const { url, ...opts } = values
    return onSubmit(url, opts)
  }

  const backgroundIconComponent = isColor(inputBg)
    ? createElement(ColorPreview, { color: inputBg })
    : createElement(ImageIcon, { color: colors.black50, size: '16px' })

  return (
    <Container as='section' alignItems='center' pt={[2, 2, 3, 3]}>
      <Heading px={[4, 5, 5, 5]} maxWidth={layout.large}>
        Easy peasy screenshots
      </Heading>
      <Caption
        pt={[3, 3, 4, 4]}
        px={[4, 4, 4, 4]}
        maxWidth={[layout.small, layout.small, layout.small, layout.small]}
      >
        Say goodbye to complexity.
        <LineBreak />
        Turn websites into screenshots.
      </Caption>
      <Flex pt={[3, 3, 4, 4]}>
        <ArrowLink pr={[2, 4, 4, 4]} href='/docs/api/parameters/screenshot'>
          Get Started
        </ArrowLink>
        <ArrowLink href='https://github.com/microlinkhq/browserless'>
          See on GitHub
        </ArrowLink>
      </Flex>
      <Flex justifyContent='center' alignItems='center'>
        <Flex
          as='form'
          pt={[3, 3, 4, 4]}
          pb={4}
          mx={[0, 0, 'auto', 'auto']}
          justifyContent='center'
          flexDirection={['column', 'column', 'row', 'row']}
          onSubmit={handleSubmit}
        >
          <Box mb={[3, 3, 0, 0]}>
            <Input
              fontSize={2}
              iconComponent={<InputIcon query={domain} />}
              id='screenshot-demo-url'
              placeholder='Visit URL'
              suggestions={suggestions.map(
                ({ cdnUrl, filename, ...suggestion }) => suggestion
              )}
              type='text'
              value={inputUrl}
              onChange={event => setInputUrl(event.target.value)}
              width={['100%', '100%', '102px', '102px']}
              autoFocus
            />
          </Box>

          <Box ml={[0, 0, 2, 2]} mb={[3, 3, 0, 0]}>
            <Input
              placeholder='Overlay'
              id='screenshot-demo-overlay'
              type='text'
              fontSize={2}
              width={['100%', '100%', '88px', '88px']}
              value={inputOverlay}
              onChange={event => setInputOverlay(event.target.value)}
              iconComponent={
                <CompassIcon color={colors.black50} width='16px' />
              }
              suggestions={[
                { value: 'none' },
                { value: 'dark' },
                { value: 'light' }
              ]}
            />
          </Box>

          <Box ml={[0, 0, 2, 2]} mb={[3, 3, 0, 0]}>
            <Input
              placeholder='Background'
              id='screenshot-demo-background'
              type='text'
              fontSize={2}
              width={['100%', '100%', '128px', '128px']}
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

          <Button ml={[0, 0, 2, 2]} loading={isLoading}>
            <Caps fontSize={1}>Take it</Caps>
          </Button>
        </Flex>
      </Flex>

      <Flex>
        <Choose>
          <Choose.When condition={!!suggestionUrl}>
            <Flex flexDirection='column' alignItems='center' pb={[4, 4, 5, 5]}>
              <Screenshot
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                domain={domain}
                data={{ screenshot: { url: suggestionUrl } }}
                query={values}
              />
              <CodeEditor
                width={[
                  `calc(${cardWidth}px - 30px)`,
                  `calc(${cardWidth}px - 30px)`,
                  `calc(${cardWidth}px - 76px)`,
                  `calc(${cardWidth}px - 76px)`
                ]}
                mx='auto'
                language='html'
              >
                {`<img src="${embedUrl}"></img>`}
              </CodeEditor>
            </Flex>
          </Choose.When>
          <Choose.When condition={!!data}>
            <Flex flexDirection='column' alignItems='center' pb={[4, 4, 5, 5]}>
              <Screenshot
                domain={domain}
                cardWidth={cardWidth}
                cardHeight={cardHeight}
                data={data}
                query={values}
              />
              <Box pt={4}>
                <CodeEditor width={cardWidth} language='html'>
                  {`<img src="${embedUrl}"></img>`}
                </CodeEditor>
              </Box>
            </Flex>
          </Choose.When>
          <Choose.Otherwise>
            <DemoSlider height={cardHeight} width={cardWidth}>
              {suggestions}
            </DemoSlider>
          </Choose.Otherwise>
        </Choose>
      </Flex>
    </Container>
  )
}

const Timings = props => {
  const healthcheck = useHealthcheck()

  const blockOne = (
    <Flex flexDirection='column' justifyContent='center' alignItems='center'>
      <Subhead fontSize={[3, 4, 6, 6]} color='white'>
        Send the URL
      </Subhead>
      <Subhead fontSize={[3, 4, 6, 6]} color='white60'>
        We do the rest
      </Subhead>
    </Flex>
  )

  const blockTwo = (
    <Flex
      pt={[4, 4, 5, 5]}
      justifyContent='center'
      alignItems='baseline'
      width='100%'
      maxWidth={layout.normal}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      <Flex
        display='inline-flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
      >
        <Subhead
          as='div'
          fontSize={[3, 4, 4, 4]}
          color='white'
          fontWeight='bold'
        >
          {getMs(healthcheck.screenshot.p95_pretty)}
          <Caption
            as='div'
            ml={2}
            color='white'
            display='inline'
            fontWeight='bold'
            titleize={false}
          >
            secs
          </Caption>
        </Subhead>
        <Caption as='div' color='white60' pt={2}>
          {['P95', 'response time'].map(children => (
            <Caps key={children} fontWeight='bold' fontSize={[0, 2, 2, 2]}>
              {children}
            </Caps>
          ))}
        </Caption>
      </Flex>
      <Hide breakpoints={[1, 2, 3]}>
        <Box px={3} />
      </Hide>
      <Hide breakpoints={[0]}>
        <Flex
          display='inline-flex'
          px={[2, 2, 2, 5]}
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
        >
          <Subhead as='div' color='white' fontWeight='bold'>
            <Average value={healthcheck.screenshot.avg_pretty} />
          </Subhead>
          <Caption as='div' color='white60'>
            {['average', 'response time'].map(children => (
              <Caps key={children} fontWeight='bold' fontSize={[0, 2, 2, 2]}>
                {children}
              </Caps>
            ))}
          </Caption>
        </Flex>
      </Hide>
      <Flex
        display='inline-flex'
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
      >
        <Subhead
          as='div'
          fontSize={[3, 4, 4, 4]}
          color='white'
          fontWeight='bold'
        >
          99.9
          <Caption
            as='div'
            ml={2}
            color='white'
            fontWeight='bold'
            display='inline'
          >
            %
          </Caption>
        </Subhead>
        <Caption as='div' color='white60' mr={3} pt={2}>
          {['SLA', 'Guaranteed'].map(children => (
            <Caps key={children} fontWeight='bold' fontSize={[0, 2, 2, 2]}>
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
      px={4}
      flexDirection='column'
      blockOne={blockOne}
      blockTwo={blockTwo}
      {...props}
    />
  )
}

const Resume = props => (
  <Container
    as='section'
    id='resume'
    alignItems='center'
    maxWidth={[layout.normal, layout.normal, layout.large, layout.large]}
    {...props}
  >
    <Subhead variant='gradient'>
      The fastest way for
      <LineBreak breakpoints={[1, 2]} /> taking screenshots
    </Subhead>
    <Caption
      pt={[3, 3, 4, 4]}
      px={[4, 4, 4, 0]}
      maxWidth={[layout.small, layout.small, layout.normal, layout.normal]}
    >
      <b>Microlink screenshot</b> provides a set of powerful features without
      the headaches of running your own infrastructure, giving you great power,
      less responsibilities.
    </Caption>

    <Block
      blockOne={
        <Image
          px={[4, 0, 0, 0]}
          width={['100%', 6, 7, 8]}
          alt='Always fresh'
          src='https://cdn.microlink.io/illustrations/genius-idea.svg'
        />
      }
      blockTwo={
        <Flex px={[4, 0, 0, 0]} flexDirection='column' alignItems='baseline'>
          <Subhead pt={[4, 4, 4, 0]} fontSize={[3, 3, 4, 4]}>
            Always fresh
          </Subhead>
          <Text pt={[3, 3, 4, 4]} maxWidth={8}>
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
        <Flex px={[4, 0, 0, 0]} flexDirection='column' alignItems='baseline'>
          <Subhead pt={[4, 4, 4, 0]} textAlign='left' fontSize={[3, 3, 4, 4]}>
            Browse automation
          </Subhead>
          <Text pt={[3, 3, 4, 4]} maxWidth={8}>
            Such as{' '}
            <Link href='/docs/api/parameters/screenshot/device'>device</Link>{' '}
            emulation, CSS/JS injection, partial or{' '}
            <Link href='/docs/api/parameters/screenshot/fullPage'>full</Link>{' '}
            page screenshot,{' '}
            <Link href='/docs/api/parameters/screenshot/hide'>hide</Link>{' '}
            elements,{' '}
            <Link href='/docs/api/parameters/screenshot/scroll-to'>scroll</Link>{' '}
            or <Link href='/docs/api/parameters/screenshot/click'>click</Link>{' '}
            events, setup a custom{' '}
            <Link href='/docs/api/parameters/screenshot/viewport'>
              viewport
            </Link>
            , and a lot more.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          px={[4, 0, 0, 0]}
          width={['100%', 6, 7, 8]}
          alt='Browse automation'
          src='https://cdn.microlink.io/illustrations/robots.svg'
        />
      }
    />

    <Block
      pb={Container.defaultProps.pt}
      blockOne={
        <Image
          px={[4, 0, 0, 0]}
          width={['100%', 6, 7, 8]}
          alt='Overlay composition'
          src='https://cdn.microlink.io/illustrations/abstract-page-is-under-construction.svg'
        />
      }
      blockTwo={
        <Flex px={[4, 0, 0, 0]} flexDirection='column' alignItems='baseline'>
          <Subhead pt={[4, 4, 4, 0]} fontSize={[3, 3, 4, 4]} textAlign='left'>
            Overlay composition
          </Subhead>
          <Text pt={[3, 3, 4, 4]} maxWidth={8}>
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

const ProductInformation = props => {
  const healthcheck = useHealthcheck()

  return (
    <Faq
      as='section'
      id='information'
      title='Product Information'
      caption='All the details you need to know about the product.'
      pb={Container.defaultProps.pt}
      questions={[
        {
          question: 'What is it?',
          answer: (
            <>
              <div>
                <Text as='span' color='black' fontWeight='bold'>
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
                <Link display='inline' href='mailto:hello@microlink.io'>
                  hello@microlink.io
                </Link>
                .
              </div>
            </>
          )
        }
      ]}
      {...props}
    />
  )
}

const ScreenshotPage = () => {
  const [query] = useQueryState()
  const features = useFeaturesScreenshot()

  return (
    <Layout>
      <FetchProvider mqlOpts={{ meta: false, screenshot: true }}>
        {({ status, doFetch, data }) => {
          const isLoading = status === 'fetching'
          return (
            <>
              <LiveDemo
                query={query}
                onSubmit={doFetch}
                isLoading={isLoading}
                suggestions={SUGGESTIONS}
                data={data}
              />
              <Timings
                pb={Container.defaultProps.pt}
                css={`
                  /* https://www.gradientmagic.com/collection/radialstripes */
                  background-image: radial-gradient(
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
                  );
                `}
                borderTop={`${borders[1]} ${colors.white20}`}
                borderBottom={`${borders[1]} ${colors.white20}`}
              />
              <Features
                px={4}
                title={
                  <>
                    <Subhead width='100%' textAlign='left'>
                      High performance,
                    </Subhead>
                    <Subhead
                      color='#fd494a'
                      width='100%'
                      textAlign='left'
                      titleize={false}
                    >
                      with no compromises.
                    </Subhead>
                  </>
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
              <ProductInformation
                bg='pinky'
                borderTop={`${borders[1]} ${colors.pinkest}`}
                borderBottom={`${borders[1]} ${colors.pinkest}`}
              />
            </>
          )
        }}
      </FetchProvider>
    </Layout>
  )
}

export default ScreenshotPage
