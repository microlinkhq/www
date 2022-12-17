import { useWindowSize, useHealthcheck, useFeaturesMeta } from 'components/hook'
import { layout, breakpoints, transition, colors, borders } from 'theme'
import React, { useMemo, useEffect, useState } from 'react'
import { fadeIn } from 'components/keyframes'
import isUrl from 'is-url-http/lightweight'
import { getApiUrl } from '@microlink/mql'
import prependHttp from 'prepend-http'
import styled from 'styled-components'
import { getDomain } from 'tldts'
import chunk from 'lodash/chunk'

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
  Link,
  Subhead,
  Text
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
  List,
  Average
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

const SENTENCES_INTERVAL = 3500

const SENTENCES = [
  'beauty link previews',
  'native embeds',
  'builtin media player',
  'easily customizable',
  'lazy fetching',
  'mobile ready'
]

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
      mr={[3, 3, 0, 0]}
      color={type === 'no' ? 'gray' : undefined}
      type={type}
      fontSize={1}
      {...props}
    >
      {property}
    </List.Item>
  )
}

const LiveDemo = ({
  data,
  isInitialData,
  isLoading,
  onSubmit,
  suggestions
}) => {
  const size = useWindowSize()

  const cardBase = size.width < SMALL_BREAKPOINT ? 1.2 : 2.2
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

  const [inputValue, setInputValue] = useState('')
  const domain = getDomain(inputValue)

  const jsonData = (() => {
    const suggestion = SUGGESTIONS.find(({ value }) => value === inputValue)
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

  useEffect(() => {
    if (!isInitialData) setInputValue(data.url)
  }, [data.url, isInitialData])

  return (
    <Container
      alignItems='center'
      pt={[2, 2, 3, 3]}
      pb={Container.defaultProps.pt}
    >
      <Heading px={5} titleize={false} maxWidth={layout.large}>
        Get unified metadata
      </Heading>

      <Caption
        as='h2'
        pt={[3, 3, 4, 4]}
        px={[4, 4, 0, 0]}
        titleize={false}
        maxWidth={[layout.small, layout.small, layout.small, layout.small]}
      >
        Structured and normalized data from Open Graph, Twitter, JSON+LD, oEmbed
        & HTML.
      </Caption>

      <Flex
        alignItems={['center', undefined, undefined, undefined]}
        flexDirection={['column', 'row', 'row', 'row']}
        pt={[3, 3, 4, 4]}
      >
        <ArrowLink pr={[0, 4, 4, 4]} href='/docs/api/parameters/meta'>
          Get Started
        </ArrowLink>
        <ArrowLink pt={[3, 0, 0, 0]} href='https://github.com/microlinkhq/sdk'>
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
              iconComponent={<InputIcon query={domain} />}
              placeholder='Visit URL'
              type='text'
              suggestions={suggestions}
              value={inputValue}
              onChange={event => setInputValue(event.target.value)}
              width={['100%', '100%', '102px', '102px']}
              autoFocus
            />
          </Box>
          <Button ml={[0, 0, 2, 2]} loading={isLoading}>
            <Caps fontSize={1}>Get it</Caps>
          </Button>
        </Flex>
      </Flex>

      <Flex
        mx='auto'
        flexDirection={['column', 'column', 'row', 'row']}
        justifyContent='center'
        alignItems='center'
        maxWidth={layout.large}
        style={{ position: 'relative', left: '-18px' }}
      >
        <Hide breakpoints={[0, 1]}>
          <List pr={4} pl={0}>
            {JsonKeysFirstChunk.map(children => (
              <JSONProperty
                key={children}
                property={children}
                data={jsonData}
              />
            ))}
          </List>
        </Hide>
        <Flex flexDirection='column' alignItems='center'>
          <CodeEditor width={cardWidth} height={cardHeight} language='json'>
            {JSON.stringify(jsonData, null, 2)}
          </CodeEditor>
          {inputValue && (
            <Box pt={4}>
              <CodeEditor width={cardWidth} language='bash'>
                {`curl -sL ${embedUrl}`}
              </CodeEditor>
            </Box>
          )}
        </Flex>
        <Hide breakpoints={[0, 1]}>
          <List pl={4}>
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
            justifyContent='center'
            flexDirection={['row', 'row', 'column', 'column']}
            flexWrap={['wrap', 'wrap', undefined, undefined]}
            maxWidth={[layout.small, layout.small, undefined, undefined]}
            pt={4}
            m={0}
            pr={[4, 4, 4, 4]}
            pl={[4, 4, 0, 0]}
          >
            {JSON_KEYS.map(children => (
              <JSONProperty key={children} property={children} data={data} />
            ))}
          </List>
        </Hide>
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
              <Subhead px={[3, 0, 0, 0]} fontSize={[3, 4, 6, 6]} color='white'>
                All the data. Unified. Effortless.
              </Subhead>
            </Flex>
            <Caption
              px={[4, 0, 0, 0]}
              pt={2}
              color='white80'
              maxWidth={[6, 7, 7, 'inherit']}
              fontSize={[2, 2, 4, 4]}
              fontWeight='regular'
            >
              Open Graph, JSON+LD, oEmbed & HTML.
            </Caption>
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
              >
                {SENTENCES[index]}
              </Subhead>
            </Flex>
            <Flex
              pt={[4, 4, 5, 5]}
              justifyContent={[
                'space-around',
                'space-around',
                'center',
                'center'
              ]}
              alignItems='baseline'
              px={[4, 4, 4, 0]}
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
                  {getMs(healthcheck.meta.p95_pretty)}
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
                <Caption as='div' color='white80' fontWeight='bold' pt={2}>
                  <Caps fontSize={[0, 2, 2, 2]}>P95</Caps>
                  <Caps fontSize={[0, 2, 2, 2]}>response time</Caps>
                </Caption>
              </Flex>
              <Hide breakpoints={[0, 1]}>
                <Flex
                  display='inline-flex'
                  px={[2, 2, 2, 5]}
                  alignItems='center'
                  justifyContent='center'
                  flexDirection='column'
                >
                  <Subhead as='div' color='white' fontWeight='bold'>
                    <Average value={healthcheck.meta.avg_pretty} />
                  </Subhead>
                  <Caption
                    as='div'
                    color='white80'
                    fontWeight='bold'
                    titleize={false}
                  >
                    <Caps fontSize={[0, 2, 2, 2]}>average</Caps>
                    <Caps fontSize={[0, 2, 2, 2]}>response time</Caps>
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
                <Caption
                  as='div'
                  color='white80'
                  mr={3}
                  fontWeight='bold'
                  pt={2}
                >
                  <Caps fontSize={[0, 2, 2, 2]}>SLA</Caps>
                  <Caps fontSize={[0, 2, 2, 2]}>Guaranteed</Caps>
                </Caption>
              </Flex>
            </Flex>
          </>
        }
      >
        <CubeBackground />
      </Block>
    </AnimatedBox>
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
    <Subhead px={[3, 3, 0, 0]} variant='gradient'>
      Turns websites into data
    </Subhead>
    <Caption
      py={3}
      maxWidth={[layout.small, layout.small, layout.normal, layout.normal]}
    >
      <b>Microlink meta</b> extracts structured data from any website. Enter a
      URL, receive information. Get relevant information from any link & easily
      create beautiful previews.
    </Caption>

    <Block
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          alt='Unified metadata'
          src='https://cdn.microlink.io/illustrations/abstract-delivery.svg'
        />
      }
      blockTwo={
        <Flex
          flexDirection='column'
          alignItems={['center', 'center', 'center', 'baseline']}
        >
          <Subhead pt={[5, 4, 4, 0]} fontSize={[3, 3, 4, 4]} textAlign='left'>
            Unified metadata
          </Subhead>
          <Text
            pt={4}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Get normalized data from multiple sources usingOpen Graph,
            Microdata, RDFa, Twitter Cards, JSON-LD, HTML, and more.
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
          <Subhead pt={[5, 4, 4, 0]} textAlign='left' fontSize={[3, 3, 4, 4]}>
            Contextual information
          </Subhead>
          <Text
            pt={4}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Whenever is possible data is expanded to bring you more, like file
            extension, dimensions, size, duration, etc.
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
      pb={Container.defaultProps.pt}
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          alt='Easily consumable'
          src='https://cdn.microlink.io/illustrations/abstract-page-is-under-construction.svg'
        />
      }
      blockTwo={
        <Flex
          flexDirection='column'
          alignItems={['center', 'center', 'center', 'baseline']}
        >
          <Subhead pt={[5, 4, 4, 0]} fontSize={[3, 3, 4, 4]} textAlign='left'>
            Easily consumable
          </Subhead>
          <Text
            pt={4}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
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

const ProductInformation = props => (
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
              It&#039;s a{' '}
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
              We&#039;re always available at{' '}
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

const MetaPage = () => {
  const features = useFeaturesMeta()

  return (
    <Layout>
      <FetchProvider
        mqlOpts={{ palette: true, audio: true, video: true, iframe: true }}
      >
        {({ status, doFetch, data }) => {
          const isLoading = status === 'fetching'
          const unifiedData = data || DEMO_LINK.data
          const isInitialData = unifiedData.url === DEMO_LINK.data.url

          return (
            <>
              <LiveDemo
                isLoading={isLoading}
                suggestions={SUGGESTIONS}
                data={unifiedData}
                isInitialData={isInitialData}
                onSubmit={doFetch}
              />
              <Timings />
              <Features
                title={
                  <>
                    <Subhead width='100%' textAlign='left'>
                      Great power,
                    </Subhead>
                    <Subhead
                      color={COLOR}
                      width='100%'
                      textAlign='left'
                      titleize={false}
                    >
                      less responsibility.
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

export default MetaPage
