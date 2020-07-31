import React, { useEffect, useState } from 'react'
import { fadeIn } from 'components/keyframes'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import styled from 'styled-components'
import { getDomain } from 'tldts'

import {
  useWindowSize,
  useQueryState,
  useHealthcheck,
  useFeaturesMeta
} from 'components/hook'

import { layout, breakpoints, transition, colors, borders } from 'theme'

import {
  AnimatedBox,
  Box,
  Button,
  Caps,
  Container,
  CodeEditor,
  Flex,
  Image,
  Input,
  InputIcon,
  Heading,
  Card,
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
  Layout,
  FetchProvider,
  List
} from 'components/patterns'

import humanizeUrl from 'humanize-url'

import demoLinks from '../../data/demo-links'

const INITIAL_SUGGESTION = 'youtube'

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
  const { url } = data
  return { value: humanizeUrl(url) }
})

const SENTENCES_INTERVAL = 3500

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

const JSONProperty = ({ property, data, ...props }) => {
  const children = data[property]
  const type = children !== null ? 'yes' : 'no'
  return (
    <List.Item
      color={type === 'no' ? 'gray' : undefined}
      type={type}
      fontSize={1}
      children={property}
      {...props}
    />
  )
}

const LiveDemo = ({ query, suggestions, data, onSubmit, isLoading }) => {
  const size = useWindowSize({ width: 1440, height: 798 })
  const [inputValue, setInputValue] = useState(query.url || '')
  const domain = getDomain(inputValue)

  const cardBase = size.width < SMALL_BREAKPOINT ? 1.2 : 2.2
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

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
        Structured data normalized from Open Graph, JSON+LD, oEmbed & HTML for
        any website.
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
              id='meta-demo-url'
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
            <Caps fontSize={1} children='Get it' />
          </Button>
        </Flex>
      </Flex>

      <Flex
        mx='auto'
        justifyContent='center'
        alignItems='center'
        maxWidth={layout.large}
        style={{ position: 'relative', left: '-18px' }}
      >
        <List pr={4} pl={0}>
          {['author', 'audio', 'date', 'description', 'iframe', 'image'].map(
            children => (
              <JSONProperty key={children} property={children} data={data} />
            )
          )}
        </List>

        <CodeEditor
          width={cardWidth}
          height={cardHeight}
          language='json'
          children={JSON.stringify(data, null, 2)}
        />

        <List pl={4}>
          {['lang', 'logo', 'publisher', 'title', 'url', 'video'].map(
            children => (
              <JSONProperty key={children} property={children} data={data} />
            )
          )}
        </List>
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
