import { borders, breakpoints, layout, colors } from 'theme'
import React, { useMemo, useState } from 'react'
import isUrl from 'is-url-http/lightweight'
import humanizeUrl from 'humanize-url'
import prependHttp from 'prepend-http'
import pickBy from 'lodash/pickBy'
import { getDomain } from 'tldts'
import chunk from 'lodash/chunk'
import { cdnUrl } from 'helpers'
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
  Iframe,
  Image,
  Input,
  InputIcon,
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
  useFeatures,
  useHealthcheck,
  useQueryState,
  useWindowSize
} from 'components/hook'

import TECHNOLOGIES from '../../data/technologies.json'

const SMALL_BREAKPOINT = Number(breakpoints[0].replace('px', ''))

const getMs = str => str.replace(/ms|s/, '')

const Wappalyzer = ({ data, ...props }) => (
  <Flex width={256} pr={3} flexDirection='row' alignItems='center' {...props}>
    <Box>
      <Image width='40px' alt={`${data.name} logo`} src={data.logo} />
    </Box>
    <Box pl={4}>
      <Link href={data.url}>{data.name}</Link>
      <Text fontSize={1} color='gray7'>
        {data.categories.join(', ')}
      </Text>
    </Box>
  </Flex>
)

const TechnologyStack = ({ technologies, ...props }) => (
  <Flex
    as='section'
    id='technology-stack'
    flexDirection='column'
    alignItems='flex-start'
    {...props}
  >
    <Subhead pb={[2, 2, 3, 3]} textAlign='left' fontSize={[3, 3, 4, 4]}>
      Technology Stack
    </Subhead>
    <Box>
      <Text maxWidth={layout.small}>
        Software detected under the target URL after analyzing source code,
        response headers, script variables and several other
      </Text>
      <Text mt={3}>
        Detected{' '}
        <Text as='span' fontWeight='bold'>
          {technologies.length}
        </Text>{' '}
        technologies behind the site.
      </Text>
    </Box>
    <Flex
      pt={3}
      pl={4}
      width={['100%', 'inherit', 'inherit', 'inherit']}
      flexDirection='column'
    >
      {chunk(technologies, 3).map((row, chunkIndex) => {
        return (
          <Flex
            flexDirection={['column', 'column', 'row', 'row']}
            key={`technologies_chunk_${chunkIndex}`}
          >
            {row.map((data, dataIndex) => {
              const pt = dataIndex === 0 && chunkIndex === 0 ? 0 : 3
              return <Wappalyzer pt={pt} key={data.name} data={data} />
            })}
          </Flex>
        )
      })}
    </Flex>
  </Flex>
)

const LighthousePlaceholder = props => {
  return (
    <Flex
      border={3}
      borderColor='black20'
      alignItems='center'
      flexDirection='column'
      justifyContent='center'
      {...props}
    >
      <Image
        width={[3, 3, '80%', '80%']}
        alt='Paste your URL'
        src='https://cdn.microlink.io/logo/lighthouse.png'
      />
      <Text pt={[2, 2, 4, 4]} fontSize={[2, 2, 4, 4]} color='black40'>
        Paste your URL
      </Text>
    </Flex>
  )
}

const LiveDemo = ({
  response,
  data,
  query,
  suggestions,
  onSubmit,
  isLoading
}) => {
  const size = useWindowSize()

  const cardBase = size.width < SMALL_BREAKPOINT ? 1.2 : 2
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

  const [inputUrl, setInputUrl] = useState(query.url || '')

  const domain = useMemo(() => getDomain(inputUrl), [inputUrl])

  const values = useMemo(() => {
    const preprendUrl = prependHttp(inputUrl)
    return pickBy({ url: isUrl(preprendUrl) ? preprendUrl : undefined })
  }, [inputUrl])

  const [suggestionUrl, technologies] = React.useMemo(() => {
    const { url } = values
    const item = SUGGESTIONS.find(item => item.url === url)
    if (item) return [item.cdnUrl, TECHNOLOGIES[item.id]]
    if (data) return [response.url, get(data, 'insights.technologies')]
    return [undefined, undefined]
  }, [response, data, values])

  const handleSubmit = event => {
    event.preventDefault()
    const { url, ...opts } = values
    return onSubmit(url, opts)
  }

  const reportUrl = suggestionUrl
    ? `https://lighthouse.microlink.io/?url=${encodeURIComponent(
        suggestionUrl
      )}`
    : undefined

  return (
    <Container as='section' alignItems='center' pt={[2, 2, 3, 3]}>
      <Heading px={5} maxWidth={layout.large}>
        Automate web performance
      </Heading>
      <Caption
        pt={[3, 3, 4, 4]}
        px={[4, 4, 0, 0]}
        maxWidth={[layout.small, layout.small, layout.small, layout.small]}
      >
        Track site speed & website quality over time — Get performance insights
        powered by{' '}
        <Link href='https://developers.google.com/web/tools/lighthouse'>
          Lighthouse
        </Link>
        .
      </Caption>
      <Flex pt={[3, 3, 4, 4]}>
        <ArrowLink pr={[2, 4, 4, 4]} href='/docs/api/parameters/insights'>
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
          <Box ml={[0, 0, 2, 2]} mb={[3, 3, 0, 0]}>
            <Input
              fontSize={2}
              iconComponent={<InputIcon query={domain} />}
              id='pdf-demo-url'
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

          <Button ml={[0, 0, 2, 2]} loading={isLoading}>
            <Caps fontSize={1}>Get it</Caps>
          </Button>
        </Flex>
      </Flex>

      <Flex pb={[4, 4, 5, 5]}>
        <Choose>
          <Choose.When condition={!!reportUrl}>
            <Flex flexDirection='column'>
              <Iframe width={cardWidth} src={reportUrl} />
              <Box pt={4}>
                <CodeEditor width={cardWidth} language='html'>
                  {`<iframe src="${reportUrl}"></iframe>`}
                </CodeEditor>
              </Box>
              <Box pt={[3, 3, 4, 4]} maxWidth={cardWidth}>
                <TechnologyStack technologies={technologies} />
              </Box>
            </Flex>
          </Choose.When>
          <Choose.Otherwise>
            <LighthousePlaceholder height={cardHeight} width={cardWidth} />
          </Choose.Otherwise>
        </Choose>
      </Flex>
    </Container>
  )
}

const SUGGESTIONS = [
  { id: 'basecamp', url: 'https://basecamp.com/shapeup/0.3-chapter-01' },
  {
    id: 'alexmaccaw',
    url: 'https://blog.alexmaccaw.com/advice-to-my-younger-self'
  },
  {
    id: 'css-tricks',
    url: 'https://css-tricks.com/nerds-guide-color-web'
  },
  {
    id: 'rauchg',
    url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications'
  },
  {
    id: 'varnish-cache',
    url: 'https://varnish-cache.org/docs/6.2/phk/thatslow.html'
  }
].map(({ id, url }) => {
  const cdnUrl = `https://cdn.microlink.io/insights/${id}.json`
  return { cdnUrl, url, id, value: humanizeUrl(url) }
})

const Timings = props => {
  const healthcheck = useHealthcheck()

  const blockOne = (
    <Flex flexDirection='column' justifyContent='center' alignItems='center'>
      <Subhead fontSize={[3, 4, 6, 6]} color='white'>
        Measure at scale
      </Subhead>
      <Subhead fontSize={[3, 4, 6, 6]} color='white60'>
        without compromises
      </Subhead>
    </Flex>
  )

  const blockTwo = (
    <Flex
      pt={[4, 4, 5, 5]}
      justifyContent={['space-around', 'space-around', 'center', 'center']}
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
          {getMs(healthcheck.insights.p95_pretty)}
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
            <Average value={healthcheck.insights.avg_pretty} />
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
      as='section'
      id='timings'
      px={4}
      width='100%'
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
    <Subhead px={[3, 3, 4, 4]} variant='gradient'>
      Global performance insights on click
    </Subhead>
    <Caption
      pt={[3, 3, 4, 4]}
      px={[4, 4, 4, 0]}
      maxWidth={[layout.small, layout.small, layout.normal, layout.normal]}
    >
      <b>Microlink insights</b> provides first-class support for web performance
      monitoring, easy to integrate with any existing stack or cloud in just a
      few minutes.
    </Caption>

    <Block
      blockOne={
        <Image
          px={[4, 0, 0, 0]}
          width={['100%', 6, 7, 8]}
          alt='Audit on-demand'
          src='https://cdn.microlink.io/illustrations/popularity.svg'
        />
      }
      blockTwo={
        <Flex px={[4, 0, 0, 0]} flexDirection='column' alignItems='baseline'>
          <Subhead pt={[4, 4, 4, 0]} fontSize={[3, 3, 4, 4]}>
            Audit on-demand
          </Subhead>
          <Text pt={[3, 3, 4, 4]} maxWidth={8}>
            Enable <Link href='/docs/api/parameters/insights'>insights</Link>{' '}
            query parameter at{' '}
            <Link href='/docs/api/getting-started/overview'>Microlink API</Link>{' '}
            for getting a{' '}
            <Link
              icon
              href='https://developers.google.com/web/tools/lighthouse'
            >
              Lighthouse
            </Link>{' '}
            report and technologies detected over the target URL.
          </Text>
        </Flex>
      }
    />

    <Block
      flexDirection='row-reverse'
      blockTwo={
        <Flex px={[4, 0, 0, 0]} flexDirection='column' alignItems='baseline'>
          <Subhead pt={[4, 4, 4, 0]} textAlign='left' fontSize={[3, 3, 4, 4]}>
            Run on the edge
          </Subhead>
          <Text pt={[3, 3, 4, 4]} maxWidth={8}>
            Never get worried about infrastructure again. Just hit{' '}
            <Link href='/docs/api/getting-started/overview'>Microlink API</Link>{' '}
            and we will run a cloud-based browsers for you.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          px={[4, 0, 0, 0]}
          width={['100%', 6, 7, 8]}
          alt='Run on the edge'
          src='https://cdn.microlink.io/illustrations/networking.svg'
        />
      }
    />

    <Block
      pb={Container.defaultProps.pt}
      blockOne={
        <Image
          px={[4, 0, 0, 0]}
          width={['100%', 6, 7, 8]}
          alt='Simple integration'
          src='https://cdn.microlink.io/illustrations/abstract-6.svg'
        />
      }
      blockTwo={
        <Flex px={[4, 0, 0, 0]} flexDirection='column' alignItems='baseline'>
          <Subhead pt={[4, 4, 4, 0]} fontSize={[3, 3, 4, 4]} textAlign='left'>
            Simple integration
          </Subhead>
          <Text pt={[3, 3, 4, 4]} maxWidth={8}>
            Connect it with{' '}
            <Link href='https://lighthouse.microlink.io'>
              Lighthouse Viewer
            </Link>{' '}
            or{' '}
            <Link
              icon
              href='https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/server.md'
            >
              Lighthouse CI
            </Link>{' '}
            for unleashing all the power without compromise.
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
                  Microlink insights
                </Text>{' '}
                gives you web performance metrics in a simple way using{' '}
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
                The report is created after passing{' '}
                <Link href='/docs/api/parameters/insights'>insights</Link> query
                parameter to{' '}
                <Link href='/docs/api/getting-started/overview'>
                  Microlink API
                </Link>
                .
              </div>
              <div>
                For getting the report, we run{' '}
                <Link
                  icon
                  href='https://developers.google.com/web/tools/lighthouse'
                >
                  Lighthouse
                </Link>{' '}
                in our cloud browser servers, giving you the report obtained
                from the target URL.
              </div>
              <div>
                Additionally, we can also detect the technology stack behind the
                target URL, using{' '}
                <Link href='https://www.wappalyzer.com/'>Wappalyzer</Link> .
              </div>
              <div>
                The data obtained will be returned as part of the HTTP response
                payload.
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
                <Average size='tiny' value={healthcheck.insights.avg_pretty} />{' '}
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

const InsightsPage = () => {
  const [query] = useQueryState()
  const features = useFeatures()
  return (
    <Layout
      head={{
        image: cdnUrl('banner/insights.jpeg'),
        description:
          'Automate web performance. Track site speed & website quality over time. Get performance insights powered by Lighthouse'
      }}
    >
      <FetchProvider mqlOpts={{ meta: false, insights: true }}>
        {({ status, doFetch, data, response }) => {
          const isLoading = status === 'fetching'
          return (
            <>
              <LiveDemo
                query={query}
                onSubmit={doFetch}
                isLoading={isLoading}
                suggestions={SUGGESTIONS}
                data={data}
                response={response}
              />
              <Timings
                pb={Container.defaultProps.pt}
                css={`
                  /* https://www.gradientmagic.com/collection/radialstripes */
                  background-image: radial-gradient(
                    circle at top right,
                    rgb(36, 9, 119) 0%,
                    rgb(36, 9, 119) 48%,
                    rgb(72, 7, 149) 48%,
                    rgb(72, 7, 149) 53%,
                    rgb(109, 5, 178) 53%,
                    rgb(109, 5, 178) 56%,
                    rgb(145, 2, 208) 56%,
                    rgb(145, 2, 208) 69%,
                    rgb(181, 0, 237) 69%,
                    rgb(181, 0, 237) 100%
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
                      You call the API,
                    </Subhead>
                    <Subhead
                      color='rgb(181, 0, 237)'
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
                    No code to maintain, no servers to deploy, but always ready
                    — Microlink allows you spend more time building, less time
                    configuring, easy integration via{' '}
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

export default InsightsPage
