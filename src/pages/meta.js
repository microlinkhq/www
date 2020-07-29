import { mqlCode, debounceComponent } from 'helpers'
import React, { useEffect, useState } from 'react'
import { fadeIn } from 'components/keyframes'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import styled from 'styled-components'
import { Choose } from 'react-extras'
import { getDomain } from 'tldts'

import {
  useQueryState,
  useWindowSize,
  useHealthcheck,
  useFeaturesMeta
} from 'components/hook'

import {
  layout,
  breakpoints,
  transition,
  colors,
  borders,
  shadows
} from 'theme'

import {
  AnimatedBox,
  Box,
  Button,
  Caps,
  Card,
  Container,
  MultiCodeEditor,
  Flex,
  Image,
  Input,
  InputIcon,
  Heading,
  Link,
  Subhead,
  Text,
  Hide
} from 'components/elements'

import {
  Features,
  ArrowLink,
  Block,
  Caption,
  CubeBackground,
  Faq,
  Microlink,
  Layout,
  FetchProvider
} from 'components/patterns'

import humanizeUrl from 'humanize-url'

import demoLinks from '../../data/demo-links'

const INITIAL_SUGGESTION = 'youtube'

const SUGGESTIONS = [
  'instagram',
  'soundcloud',
  'spotify',
  'theverge',
  'youtube'
].map(id => {
  const { data } = demoLinks.find(item => item.id === id)
  const { url } = data
  return { id, value: humanizeUrl(url), url, data }
})

const SMALL_BREAKPOINT = Number(breakpoints[0].replace('px', ''))
const SENTENCES_INTERVAL = 3500
const MODES = ['preview', 'iframe']
const TYPES = ['render', 'code']

const SENTENCES = [
  'beauty link previews',
  'native embeds',
  'builtin media player',
  'easily customizable',
  'lazy fetching',
  'mobile ready'
]

const COLOR = '#3e55ff'

const getMs = str => str.replace(/ms|s/, '')

const MicrolinkCard = styled(Card)`
  &:hover {
    box-shadow: ${shadows[0]};
  }

  .microlink_card__iframe iframe {
    width: 100%;
    height: 100%;
  }
`

const MicrolinkDebounce = debounceComponent(styled(Microlink)`
  --microlink-max-width: 100%;
  --microlink-border-style: transparent;
  --microlink-hover-background-color: white;
`)

const LogoWrap = styled(Box)`
  cursor: pointer;
  opacity: 0.5;
  transition: opacity ${transition.medium};
  &:hover {
    opacity: 1;
  }
`

LogoWrap.defaultProps = {
  display: 'inline-block'
}

const LiveDemo = ({ query, suggestions, data, onSubmit, isLoading }) => {
  const size = useWindowSize({ width: 1440, height: 798 })

  const [mode, setMode] = useState(MODES[0])
  const [type, setType] = useState(TYPES[0])

  const cardBase = size.width < SMALL_BREAKPOINT ? 1.2 : 2.2
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

  const [inputValue, setInputValue] = useState(query.url || '')
  const domain = getDomain(inputValue)

  const media = [
    mode === 'iframe' && 'iframe',
    'video',
    'audio',
    'image',
    'logo'
  ].filter(Boolean)

  const targetUrlPrepend = prependHttp(data.url)

  return (
    <Container alignItems='center' pt={5} pb={Container.defaultProps.pt}>
      <Heading titleize={false} maxWidth={layout.large}>
        Get unified metadata
      </Heading>

      <Caption
        pt={[3, 3, 4, 4]}
        px={[4, 4, 0, 0]}
        titleize={false}
        maxWidth={[layout.small, layout.small, layout.small, layout.small]}
      >
        Create beauty link previews — Microlink SDK turn your content into
        embeddable rich media.
      </Caption>

      <Flex
        alignItems={['center', undefined, undefined, undefined]}
        flexDirection={['column', 'row', 'row', 'row']}
        pt={[3, 3, 4, 4]}
      >
        <ArrowLink
          pr={[0, 4, 4, 4]}
          href='/docs/sdk/getting-started/overview/'
          children='Get Started'
        />
        <ArrowLink
          pt={[3, 0, 0, 0]}
          href='https://github.com/microlinkhq/sdk'
          children='View the API'
        />
      </Flex>

      <Flex justifyContent='center' alignItems='center'>
        <Flex
          pt={[3, 3, 4, 4]}
          pb={4}
          as='form'
          mx={[0, 0, 'auto', 'auto']}
          justifyContent='center'
          flexDirection={['column', 'column', 'row', 'row']}
          onSubmit={event => {
            event.preventDefault()
            const url = prependHttp(inputValue)
            onSubmit(isUrl(url) ? url : undefined)
          }}
        >
          <Box mb={[3, 3, 0, 0]}>
            <Input
              id='embed-demo-url'
              fontSize={2}
              iconComponent={<InputIcon domain={domain} />}
              placeholder='Enter a URL...'
              type='text'
              suggestions={suggestions}
              value={inputValue}
              onChange={event => setInputValue(event.target.value)}
              width={['100%', '100%', '180px', '180px']}
              autoFocus
            />
          </Box>
          <Button ml={[0, 0, 2, 2]} loading={isLoading}>
            <Caps fontSize={1} children='Embed it' />
          </Button>
        </Flex>
      </Flex>

      <Flex
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
        mx='auto'
      >
        <MicrolinkCard
          width={cardWidth}
          height={cardHeight}
          mode={mode}
          type={type}
        >
          <Choose>
            <Choose.When condition={type === 'render'}>
              <MicrolinkDebounce
                style={{ width: cardWidth, height: cardHeight }}
                key={targetUrlPrepend + mode}
                loading={isLoading}
                size='large'
                url={targetUrlPrepend}
                setData={() => data}
                media={media}
              />
            </Choose.When>
            <Choose.When condition={type === 'code'}>
              <MultiCodeEditor
                width='100%'
                languages={mqlCode(
                  {
                    url: data.url,
                    data: {
                      audio: true,
                      video: true,
                      meta: true
                    }
                  },
                  `audio: true,
    video: true,
    meta: true`
                )}
              />
            </Choose.When>
          </Choose>
        </MicrolinkCard>
        <Flex
          width='100%'
          pl='15px'
          pr='7px'
          alignItems={['center', undefined, undefined, undefined]}
          justifyContent='space-between'
          flexDirection={['column', 'row', 'row', 'row']}
        >
          <Box pt={[5, 5, 4, 4]}>
            {MODES.map(children => (
              <Card.Option
                key={children}
                value={mode}
                children={children}
                onClick={() => setMode(children)}
              />
            ))}
          </Box>
          <Box pt={[3, 4, 4, 4]}>
            {TYPES.map(children => (
              <Card.Option
                key={children}
                children={children}
                value={type}
                onClick={() => setType(children)}
              />
            ))}
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}

const Timings = () => {
  const healthcheck = useHealthcheck()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(
      () => setIndex(index => (index + 1) % SENTENCES.length),
      SENTENCES_INTERVAL
    )
    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatedBox>
      <Block
        bg={COLOR}
        id='timings'
        flexDirection='column'
        pb={Container.defaultProps.pt}
        blockOne={
          <Box>
            <Flex alignItems='center' justifyContent='center'>
              <Subhead
                px={[3, 0, 0, 0]}
                fontSize={[3, 4, 6, 6]}
                color='white'
                children='All the data. Unified. Effortless.'
              />
            </Flex>
            <Caption
              px={[4, 0, 0, 0]}
              pt={3}
              color='white80'
              maxWidth={[6, 7, 7, 'inherit']}
              fontSize={[2, 2, 4, 4]}
              fontWeight='regular'
              children='Open Graph, JSON+LD, oEmbed & HTML.'
            />
          </Box>
        }
        blockTwo={
          <>
            <Flex width='100%' flexDirection='column'>
              <Subhead
                fontSize={[3, 4, 6, 6]}
                pt={[4, 4, 5, 5]}
                key={SENTENCES[index]}
                color='white'
                fontWeight='bold'
                css={fadeIn}
                children={SENTENCES[index]}
              />
            </Flex>
            <Flex
              pt={[4, 4, 5, 5]}
              justifyContent={[
                'space-around',
                'space-between',
                'space-between',
                'space-between'
              ]}
              alignItems='baseline'
              px={[4, 4, 4, 0]}
              width='100%'
              maxWidth={layout.normal}
            >
              <Hide breakpoints={[0]}>
                <Flex
                  display='inline-flex'
                  alignItems='center'
                  justifyContent='center'
                  flexDirection='column'
                >
                  <Subhead as='div' color='white' fontWeight='bold'>
                    {getMs(healthcheck.meta.avg_pretty)}
                    <Caption
                      titleize={false}
                      as='div'
                      ml={2}
                      color='white'
                      display='inline'
                      fontWeight='bold'
                    >
                      mseg
                    </Caption>
                  </Subhead>
                  <Caption
                    as='div'
                    color='white80'
                    fontWeight='bold'
                    titleize={false}
                  >
                    <Caps fontSize={[0, 2, 3, 3]}>avg. response time</Caps>
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
                  fontSize={[3, 4, 6, 6]}
                  color='white'
                  fontWeight='bold'
                >
                  {getMs(healthcheck.meta.p95_pretty)}
                  <Caption
                    as='div'
                    ml={2}
                    color='white'
                    display='inline'
                    fontWeight='bold'
                    children='seg'
                    titleize={false}
                  />
                </Subhead>
                <Caption as='div' color='white80' fontWeight='bold'>
                  <Hide breakpoints={[0]}>
                    <Caps fontSize={[0, 2, 3, 3]}>avg. response time</Caps>
                  </Hide>
                  <Hide breakpoints={[1, 2, 3]}>
                    <Caps fontSize={[0, 2, 3, 3]}>response time</Caps>
                  </Hide>
                </Caption>
              </Flex>
              <Flex
                display='inline-flex'
                alignItems='center'
                justifyContent='center'
                flexDirection='column'
              >
                <Subhead
                  as='div'
                  fontSize={[3, 4, 6, 6]}
                  color='white'
                  fontWeight='bold'
                >
                  {'99.9'}
                  <Caption
                    as='div'
                    ml={2}
                    color='white'
                    fontWeight='bold'
                    display='inline'
                    children='%'
                  />
                </Subhead>
                <Caption as='div' color='white80' mr={3} fontWeight='bold'>
                  <Caps fontSize={[0, 2, 3, 3]}>uptime</Caps>
                </Caption>
              </Flex>
            </Flex>
          </>
        }
        children={<CubeBackground />}
      />
    </AnimatedBox>
  )
}

const Resume = props => (
  <Container
    id='resume'
    alignItems='center'
    maxWidth={[layout.normal, layout.normal, layout.large, layout.large]}
    {...props}
  >
    <Subhead variant='gradient' children='Turns websites into data' />
    <Caption
      py={3}
      maxWidth={[layout.small, layout.small, layout.normal, layout.normal]}
    >
      Microlink extracts structured data from any website. Enter a URL, receive
      information. Get relevant information from any link & easily create
      beautiful previews.
    </Caption>

    <Block
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          alt='Data normalization'
          src='https://cdn.microlink.io/illustrations/abstract-delivery.svg'
        />
      }
      blockTwo={
        <Flex
          flexDirection='column'
          alignItems={['center', 'center', 'center', 'baseline']}
        >
          <Subhead
            pt={[5, 4, 4, 0]}
            fontSize={[3, 3, 4, 4]}
            textAlign='left'
            children='Data normalization'
          />
          <Text
            pt={4}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Using{' '}
            <Link href='/docs/mql/getting-started/overview'>
              Microlink Query Language (MQL)
            </Link>{' '}
            you define data rules to turn any website into a programmatic API,
            getting <Link href='/docs/mql/data/type'>typified</Link> data back
            as a response.
          </Text>
        </Flex>
      }
    />

    <Block
      pt={Container.defaultProps.pt}
      flexDirection='row-reverse'
      blockTwo={
        <Flex
          flexDirection='column'
          alignItems={['center', 'center', 'center', 'end']}
        >
          <Subhead
            pt={[5, 4, 4, 0]}
            textAlign='left'
            fontSize={[3, 3, 4, 4]}
            children='Contextual information'
          />
          <Text
            pt={4}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Lot of actions supported, such as{' '}
            <Link href='/docs/api/parameters/screenshot/device'>device</Link>{' '}
            emulation, CSS/JS injection, partial or{' '}
            <Link href='/docs/api/parameters/screenshot/full-page'>full</Link>{' '}
            page snapshot,{' '}
            <Link href='/docs/api/parameters/screenshot/scroll-to'>scroll</Link>{' '}
            or <Link href='/docs/api/parameters/screenshot/click'>click</Link>{' '}
            events.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          alt='Contextual information'
          src='https://cdn.microlink.io/illustrations/robots.svg'
        />
      }
    />

    <Block
      pt={Container.defaultProps.pt}
      pb={Container.defaultProps.pt}
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          alt='Universal Embed'
          src='https://cdn.microlink.io/illustrations/abstract-page-is-under-construction.svg'
        />
      }
      blockTwo={
        <Flex
          flexDirection='column'
          alignItems={['center', 'center', 'center', 'baseline']}
        >
          <Subhead
            pt={[5, 4, 4, 0]}
            fontSize={[3, 3, 4, 4]}
            textAlign='left'
            children='Universal Embed'
          />
          <Text
            pt={4}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Add embeddable media to your site, in a simple way, with{' '}
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

const ProductInformation = props => (
  <Faq
    id='information'
    title='Product Information'
    caption='All the details you need to know about the product.'
    pb={Container.defaultProps.pt}
    questions={[
      {
        question: 'How does it work?',
        answer: [
          <>
            <Link href='/docs/api/getting-started/overview'>Microlink API</Link>{' '}
            turns any link into rich content, normalizing unstructured data
            coming from HTML markup behind the URL into structured.
          </>,
          <>
            Complementary,{' '}
            <Link href='/docs/sdk/getting-started/overview/'>
              Microlink SDK
            </Link>{' '}
            turns the data extracted in a beauty link preview, ready to be
            consumed by end users and embedded directly in any site.
          </>
        ]
      },
      {
        question: 'How is it built?',
        answer: [
          <>
            The service is built on top of{' '}
            <Link icon href='https://metascraper.js.org'>
              metascraper
            </Link>
            , a{' '}
            <Link icon href='https://en.wikipedia.org/wiki/Rule-based_system'>
              rule-based system
            </Link>{' '}
            for normalizing semantic markup coming from Twitter, Open Graph,
            JSON+LD, OEmbed, microformats, etc.
          </>,
          <>
            For creating the beauty links previews, it's built using{' '}
            <Link href='/docs/sdk/integrations/react/'>React</Link> and{' '}
            <Link href='/docs/sdk/integrations/vanilla/'>Vanilla</Link>.
          </>,
          <>
            If you are interested into interact with the API directly, check{' '}
            <Link href='/docs/mql/getting-started/overview'>
              Microlink Query Language (MQL)
            </Link>
            .
          </>
        ]
      },
      {
        question: 'Why not run my own solution?',
        answer: [
          <>
            Most of our pieces of software are publicly available on our{' '}
            <Link icon href='https://github.com/microlinkhq'>
              GitHub
            </Link>
            , so you can take them and create your own solution.
          </>,
          <>
            The value proposition we offer with our service is a costless
            solution, without the headaches of running your own infrastructure,
            maintained by the top notch people experts in the field.
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
        question: 'Other questions?',
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

export default () => {
  const demoLink = demoLinks.find(
    demoLink => demoLink.id === INITIAL_SUGGESTION
  )

  const [query] = useQueryState()

  return (
    <Layout>
      <FetchProvider
        mqlOpts={{ palette: true, audio: true, video: true, iframe: true }}
      >
        {({ status, doFetch, data }) => {
          const isLoading = status === 'fetching'
          return (
            <>
              <LiveDemo
                query={query}
                isLoading={isLoading}
                suggestions={SUGGESTIONS}
                data={data || demoLink.data}
                onSubmit={doFetch}
                url={query.url}
              />
              <Timings />
              <Features
                title={
                  <>
                    <Subhead width='100%' textAlign='left'>
                      You call the API,
                    </Subhead>
                    <Subhead
                      color={COLOR}
                      width='100%'
                      textAlign='left'
                      titleize={false}
                    >
                      we handle the rest.
                    </Subhead>
                  </>
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
                features={useFeaturesMeta()}
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
