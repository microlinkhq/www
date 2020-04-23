import {
  AnimatedBox,
  Box,
  Button,
  Caps,
  Container,
  Flex,
  Heading,
  Hide,
  Highlight,
  Image,
  Input,
  InputIcon,
  Link,
  Subhead,
  Text
} from 'components/elements'

import { cdnUrl, aspectRatio, screenshotUrl, debounceComponent } from 'helpers'

import { Compass as CompassIcon, Image as ImageIcon } from 'react-feather'

import { Faq, Caption, Block, SubHeadline } from 'components/patterns'
import { useCheckly, useFeaturesScreenshot } from 'components/hook'
import React, { useEffect, useState } from 'react'
import uniqueRandomArray from 'unique-random-array'
import { speed, colors, borders } from 'theme'
import { HourGlass } from 'components/icons'
import { useTransition } from 'react-spring'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import isEmpty from 'lodash/isEmpty'
import pickBy from 'lodash/pickBy'
import { getDomain } from 'tldts'
import range from 'lodash/range'
import isColor from 'is-color'
import get from 'dlv'
import ms from 'ms'

import {
  AnimatedImage,
  screenshotHeight
} from 'components/pages/home/screenshots'

import { Features, Screenshot } from './template'

const INTERVAL = 3500

const ScreenshotDebounce = debounceComponent(Screenshot)

const DemoSlider = ({ children: slides, ...props }) => {
  const [index, setIndex] = useState(0)

  const transitions = useTransition(index, p => p, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: speed.normal
    }
  })

  useEffect(() => {
    const interval = setInterval(
      () => setIndex(state => (state + 1) % slides.length),
      INTERVAL
    )
    return () => clearInterval(interval)
  }, [])

  return (
    <Flex
      style={{ position: 'relative' }}
      height={screenshotHeight.map(n => `calc(${n} * 1.25)`)}
      width={aspectRatio.width.map(n => `calc(${n} * 1.25)`)}
      {...props}
    >
      {transitions.map(({ item, props, key }) => (
        <AnimatedImage
          width='100%'
          alt='microlink screenshot example'
          key={key}
          style={props}
          src={slides[item].cdnUrl}
        />
      ))}
    </Flex>
  )
}

const LiveDemo = ({ query, suggestions, onSubmit, isLoading }) => {
  const [inputBg, setInputBg] = useState(get(query, 'overlay.background') || '')
  const [inputUrl, setInputUrl] = useState(query.url || '')
  const [inputWaitFor, setInputWaitFor] = useState(query.waitFor || '')
  const [inputOverlay, setInputOverlay] = useState(
    get(query, 'overlay.browser') || ''
  )
  const domain = React.useMemo(() => getDomain(inputUrl), [inputUrl])

  const getValues = React.useCallback(() => {
    const preprendUrl = prependHttp(inputUrl)
    const overlay = pickBy({ browser: inputOverlay, background: inputBg })
    return pickBy({
      url: isUrl(preprendUrl) ? preprendUrl : undefined,
      waitFor: ms(inputWaitFor || '0'),
      overlay: isEmpty(overlay) ? undefined : overlay
    })
  }, [inputUrl, inputOverlay, inputBg, inputWaitFor])

  const previewUrl = React.useMemo(() => {
    const { url, ...opts } = getValues() || {}
    if (!url) return undefined

    const item = suggestions.find(link => prependHttp(link.value) === url)

    if (item && !get(opts, 'overlay.background')) {
      const theme = get(opts, 'overlay.browser')
      const filename = item.filename
      return cdnUrl(
        theme
          ? `screenshot/browser/${theme}/${filename}`
          : `screenshot/${filename}`
      )
    }

    return url
      ? screenshotUrl(url, { ...opts, waitUntil: 'networkidle2' })
      : undefined
  }, [inputUrl, inputOverlay, inputBg, inputWaitFor])

  const handleSubmit = event => {
    event.preventDefault()
    const { url, ...opts } = getValues()
    return onSubmit(url, opts)
  }

  const backgroundIconComponent = isColor(inputBg) ? (
    <Box
      border={1}
      borderColor='black10'
      borderRadius={1}
      width='14px'
      height='14px'
      style={{ top: '-2px', position: 'relative', background: inputBg }}
    />
  ) : (
    <ImageIcon color={colors.black50} size='16px' />
  )

  return (
    <Container id='demo' pt={[4, 4, 5, 5]} pb={[0, 0, 4, 4]} px={4}>
      <SubHeadline
        title='Take a screenshot of any website'
        caption='Turn websites into a snapshot'
      />

      <Flex justifyContent='center' alignItems='center'>
        <Flex
          pt={2}
          pb={3}
          as='form'
          mx={[0, 0, 'auto', 'auto']}
          justifyContent='center'
          onSubmit={handleSubmit}
          flexDirection={['column', 'column', 'row', 'row']}
        >
          <Box ml={[0, 0, 2, 2]} mb={[3, 3, 0, 0]}>
            <Input
              fontSize={2}
              iconComponent={<InputIcon value={inputUrl} domain={domain} />}
              id='screenshot-demo-url'
              mr='6px'
              placeholder='Visit URL'
              suggestions={suggestions.map(
                ({ cdnUrl, filename, ...suggestion }) => suggestion
              )}
              type='text'
              value={inputUrl}
              onChange={event => setInputUrl(event.target.value)}
              width={['100%', '100%', '84px', '84px']}
              autoFocus
            />
          </Box>

          <Box ml={[0, 0, 2, 2]} mb={[3, 3, 0, 0]}>
            <Input
              placeholder='Wait'
              id='screenshot-demo-waitfor'
              type='text'
              fontSize={2}
              width={['100%', '100%', '48px', '48px']}
              mr='6px'
              value={inputWaitFor}
              onChange={event => setInputWaitFor(event.target.value)}
              iconComponent={<HourGlass color={colors.black50} width='11px' />}
              suggestions={[
                { value: '0s' },
                { value: '1.5s' },
                { value: '3s' }
              ]}
            />
          </Box>

          <Box ml={[0, 0, 2, 2]} mb={[3, 3, 0, 0]}>
            <Input
              placeholder='Overlay'
              id='screenshot-demo-overlay'
              type='text'
              fontSize={2}
              width={['100%', '100%', '73px', '73px']}
              mr='6px'
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
              width={['100%', '100%', '105px', '105px']}
              mr='6px'
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
            <Caps fontSize={1} children='Take it' />
          </Button>
        </Flex>
      </Flex>

      <Flex alignItems='center' justifyContent='center' flexDirection='column'>
        <Text fontSize={2}>into a snapshot</Text>
        {previewUrl ? (
          <ScreenshotDebounce
            alt='microlink screenshot preview'
            height={isLoading => (isLoading ? screenshotHeight : 'inherit')}
            data={{ screenshot: { url: previewUrl } }}
            query={getValues()}
          />
        ) : (
          <DemoSlider mt={[0, 0, '-13px', '-13px']} children={suggestions} />
        )}
      </Flex>
    </Container>
  )
}

export const Average = ({ size, queryParam }) => {
  const checkly = useCheckly()
  const avg = checkly[queryParam].avg_pretty

  const [average, setAverage] = useState(Number(avg.replace(/ms|s/, '')))
  const [averageHighlight, setAverageHighlight] = useState(false)
  const [unit] = useState(avg.includes('ms') ? 'mseg' : 'seg')

  const top = average * 0.3
  const bottom = average * 0.3 * -1
  const steps = average * 0.1

  const timingsRange = range(bottom, top, steps)
  const rand = uniqueRandomArray(timingsRange)

  useEffect(() => {
    const interval = setInterval(() => {
      const newAverage = average + rand(timingsRange)
      setAverage(newAverage.toFixed(unit === 'seg' ? 2 : 0))
      setAverageHighlight(true)
      setTimeout(() => setAverageHighlight(false), Highlight.HIGHLIGHT_DURATION)
    }, INTERVAL)
    return () => clearInterval(interval)
  }, [])

  if (size === 'tiny') {
    return (
      <Highlight display='inline' isHighlight={averageHighlight}>
        <Text as='span' color='black80' fontWeight='bold'>
          ~{average}
          {unit}
        </Text>
      </Highlight>
    )
  }

  return (
    <Highlight px={3} isHighlight={averageHighlight}>
      <span>~{average}</span>
      <Caption
        ml={2}
        color='white'
        display='inline'
        fontWeight='bold'
        titleize={false}
        children={unit}
      />
    </Highlight>
  )
}

export const Timings = ({ queryParam }) => {
  const checkly = useCheckly()
  const p95 = checkly[queryParam].p95_pretty.replace(/ms|s/, '')

  return (
    <AnimatedBox id='timings'>
      <Block
        id='average'
        flexDirection='column'
        bg='black'
        pb={0}
        blockOne={
          <Box>
            <Flex alignItems='center' justifyContent='center'>
              {['Just send the URL.', 'We do the rest.'].map(children => (
                <Heading
                  key={children}
                  color='white'
                  variant={null}
                  mr={[1, 1, 3, 3]}
                  fontSize={[3, 3, 5, 7]}
                  children={children}
                />
              ))}
            </Flex>
            <Caption
              color='white80'
              maxWidth={[6, 7, 7, 'inherit']}
              mt={[3, 3, 3, 0]}
              variant={null}
            >
              browser automation made simple at cost pricing, full control via
              API.
            </Caption>
          </Box>
        }
        bottom={
          <Box mx='auto'>
            <Image
              css='top: 32px; position: relative;'
              src='https://cdn.microlink.io/scenes/34.png'
            />
          </Box>
        }
        blockTwo={
          <Flex pt={[3, 3, 5, 5]} width='100%' justifyContent='space-around'>
            <Flex
              alignItems='center'
              justifyContent='center'
              flexDirection='column'
            >
              <Heading as='div' color='white' variant={null} mr={3}>
                <Average queryParam={queryParam} />
              </Heading>
              <Caption color='white80' variant={null} mr={3} titleize={false}>
                avg. response time.
              </Caption>
            </Flex>
            <Flex
              alignItems='center'
              justifyContent='center'
              flexDirection='column'
            >
              <Heading as='div' color='white' variant={null} mr={3}>
                ~{p95}
                <Caption
                  ml={2}
                  color='white'
                  display='inline'
                  titleize={false}
                  fontWeight='bold'
                >
                  seg
                </Caption>
              </Heading>
              <Caption color='white80' variant={null} mr={3} titleize={false}>
                p95 response time.
              </Caption>
            </Flex>
          </Flex>
        }
      />
    </AnimatedBox>
  )
}

export const Resume = props => (
  <Container id='resume' {...props} pt={[4, 4, 0, 0]}>
    <Box pt={[0, 0, 4, 4]}>
      <SubHeadline title='The Fastest Way for taking screenshots' />
      <Text
        textAlign='center'
        mr='auto'
        ml='auto'
        maxWidth={[9, 9, 10, 10]}
        pb={3}
      >
        <b>Microlink for Screenshot</b> provides a set of powerful features
        without the headaches of running your own infrastructure, bringing you
        the power in an affordable way.
      </Text>
    </Box>

    <Block
      as='section'
      px={[0, 0, 6, 6]}
      blockTwo={
        <Flex
          flexDirection='column'
          alignItems={['center', 'center', 'center', 'baseline']}
          pr={[0, 0, 4, 4]}
        >
          <Subhead
            as='h3'
            fontSize={[3, 4]}
            children='Always up to date'
            pb={3}
          />
          <Text
            px={[2, 3, 0, 0]}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Every screenshot has a{' '}
            <Link href='/docs/api/parameters/ttl'>ttl</Link> associated. After
            expiration, they will be automatically refreshed, reflecting any
            change present on the website.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          pb={[4, 4, 4, 0]}
          alt='Always up to date'
          src='https://cdn.microlink.io/illustrations/genius-idea.svg'
        />
      }
    />

    <Block
      as='section'
      px={[0, 0, 6, 6]}
      flexDirection='row-reverse'
      pt={0}
      pb={0}
      blockTwo={
        <Flex
          pl={[0, 0, 4, 4]}
          flexDirection='column'
          alignItems={['center', 'center', 'center', 'end']}
        >
          <Subhead
            as='h3'
            fontSize={[3, 4]}
            children='Fully Customizable'
            pb={3}
          />
          <Text
            px={[2, 3, 0, 0]}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Such as{' '}
            <Link href='/docs/api/parameters/screenshot/device'>device</Link>{' '}
            emulation, CSS/JS injection, partial or{' '}
            <Link href='/docs/api/parameters/screenshot/full-page'>full</Link>{' '}
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
          width={[5, 6, 7, 8]}
          pb={[4, 4, 4, 0]}
          alt='Fully Customizable'
          src='https://cdn.microlink.io/illustrations/abstract-2.svg'
        />
      }
    />

    <Block
      as='section'
      px={[0, 0, 6, 6]}
      pb={0}
      blockTwo={
        <Flex
          flexDirection='column'
          alignItems={['center', 'center', 'center', 'baseline']}
        >
          <Subhead
            as='h3'
            fontSize={[3, 4]}
            children='Overlay Composition'
            pb={3}
          />
          <Text
            pl={[2, 3, 0, 0]}
            pr={[2, 3, 4, 4]}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Create truly{' '}
            <Link href='/docs/api/parameters/screenshot/overlay'>overlay</Link>{' '}
            composition based on a browser and/or background overlay in a
            programmatic way. background.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          pb={[4, 4, 4, 0]}
          alt='Overlay Composition'
          src='https://cdn.microlink.io/illustrations/abstract-7.svg'
        />
      }
    />
  </Container>
)

const Information = props => (
  <Faq
    id='information'
    title='Product Information'
    caption='All you need to know.'
    questions={[
      {
        question: 'How does it work?',
        answer: [
          <>
            <Text as='span' fontWeight='bold' color='black'>
              Microlink for screenshot
            </Text>{' '}
            takes any URL as an input and returns a screenshot back, hosted at
            <Link href='/blog/edge-cdn/'>Microlink CDN</Link>.
          </>,
          <>
            It supports most of the common browser interactions, like clicks,
            wait for events, handle the scroll... but also some extra things,
            like markup injection or overlay composition, making it a more
            complete tool.
          </>,
          <>
            Check that in the{' '}
            <Link icon href='http://bit.ly/saasforscreenshot'>
              comparative table
            </Link>
            .
          </>
        ]
      },
      {
        question: 'How is it built?',
        answer: [
          <>
            The service is built on top of{' '}
            <Link icon href='https://github.com/puppeteer/puppeteer'>
              puppeteer
            </Link>{' '}
            using Chromium Headless browser.
          </>,
          <>
            The browser management is handled by our own driver called{' '}
            <Link icon href='https://browserless.js.org'>
              browserless
            </Link>
            .
          </>,
          <>(Yes, it's open source!).</>
        ]
      },
      {
        question: 'Why not run my own solution?',
        answer: [
          <>
            The service aims to avoid headaches, preventing you for running and
            maintaining your own infrastructure.
          </>,
          <>
            Every URL on the Internet are different and browser are a complex
            piece of software, with unpredictable resources usage.
          </>,
          <>
            The fact of resolve any URL at scale in{' '}
            <Average size='tiny' queryParam='screenshot' /> is not a trivial
            thing.
          </>
        ]
      },
      {
        question: 'Do you have a Service-Level Agreements (SLA)?',
        answer: [
          <>
            You can see our SLA level on{' '}
            <Link display='inline' href='/status' children='status' />
            {' page.'}
          </>
        ]
      },
      {
        question: 'Can I ask a question?',
        answer: [
          <>
            We're always available at{' '}
            <Link
              display='inline'
              href='mailto:hello@microlink.io'
              children='hello@microlink.io'
            />
            .
          </>
        ]
      }
    ]}
    {...props}
  />
)

export default ({
  isLoading,
  onSubmit,
  refBackground,
  refOverlay,
  refUrl,
  refWaitFor,
  suggestions,
  query
}) => (
  <>
    <LiveDemo
      isLoading={isLoading}
      onSubmit={onSubmit}
      refBackgroundthi={refBackground}
      refOverlay={refOverlay}
      refUrl={refUrl}
      refWaitFor={refWaitFor}
      suggestions={suggestions}
      query={query}
    />
    <Timings queryParam='screenshot' />
    <Hide breakpoints={[0, 1]}>
      <Features children={useFeaturesScreenshot()} />
    </Hide>
    <Resume />
    <Information
      bg='pinky'
      borderTop={`${borders[1]} ${colors.pinkest}`}
      borderBottom={`${borders[1]} ${colors.pinkest}`}
    />
  </>
)
