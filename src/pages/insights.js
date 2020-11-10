import { borders, breakpoints, layout, colors } from 'theme'
import React, { useMemo, useState } from 'react'
import isUrl from 'is-url-http/lightweight'
import humanizeUrl from 'humanize-url'
import prependHttp from 'prepend-http'
import { Choose } from 'react-extras'
import { proxyImage } from 'helpers'
import pickBy from 'lodash/pickBy'
import { getDomain } from 'tldts'
import chunk from 'lodash/chunk'
import get from 'dlv'

import {
  Box,
  Button,
  Caps,
  Card,
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
      <Image width='40px' src={proxyImage(data.logo)} />
    </Box>
    <Box pl={4}>
      <Link href={data.url} children={data.name} />
      <Text fontSize={1} color='gray7' children={data.categories.join(', ')} />
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
    <Container alignItems='center' pt={5}>
      <Heading px={5} titleize={false} maxWidth={layout.large}>
        Automate web performance
      </Heading>
      <Caption
        pt={[3, 3, 4, 4]}
        px={[4, 4, 0, 0]}
        titleize={false}
        maxWidth={[layout.small, layout.small, layout.small, layout.small]}
      >
        Track site speed and website quality over time – Get performance
        insights powered by{' '}
        <Link icon href='https://developers.google.com/web/tools/lighthouse'>
          Lighthouse
        </Link>
        .
      </Caption>
      <Flex
        alignItems={['center', undefined, undefined, undefined]}
        flexDirection={['column', 'row', 'row', 'row']}
        pt={[3, 3, 4, 4]}
      >
        <ArrowLink
          pr={[0, 4, 4, 4]}
          href='/docs/api/parameters/insights'
          children='Get Started'
        />
        <ArrowLink
          pt={[3, 0, 0, 0]}
          href='https://github.com/microlinkhq/browserless'
          children='See on GitHub'
        />
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
              iconComponent={<InputIcon domain={domain} />}
              id='pdf-demo-url'
              placeholder='Visit URL'
              suggestions={suggestions.map(
                ({ cdnUrl, filename, ...suggestion }) => suggestion
              )}
              type='text'
              value={inputUrl}
              onChange={event => setInputUrl(event.target.value)}
              width={['100%', '100%', '128px', '128px']}
              autoFocus
            />
          </Box>

          <Button ml={[0, 0, 2, 2]} loading={isLoading}>
            <Caps fontSize={1} children='Get it' />
          </Button>
        </Flex>
      </Flex>

      <Flex pb={[4, 4, 5, 5]}>
        <Choose>
          <Choose.When condition={!!reportUrl}>
            <Flex flexDirection='column'>
              <Iframe width={cardWidth} src={reportUrl} />
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
    <Flex
      as='section'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Subhead
        fontSize={[3, 4, 6, 6]}
        color='white'
        titleize={false}
        children='Measure globally'
      />
      <Subhead
        fontSize={[3, 4, 6, 6]}
        px={[4, 0, 0, 0]}
        titleize={false}
        color='white60'
        children='Fast. Easy. Reliable.'
      />
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
            children='secs'
            titleize={false}
          />
        </Subhead>
        <Caption as='div' color='white60' fontWeight='bold' pt={2}>
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
            <Average value={healthcheck.insights.avg_pretty} />
          </Subhead>
          <Caption as='div' color='white60' fontWeight='bold' titleize={false}>
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
            children='%'
          />
        </Subhead>
        <Caption as='div' color='white60' mr={3} fontWeight='bold' pt={2}>
          <Caps fontSize={[0, 2, 2, 2]}>SLA</Caps>
          <Caps fontSize={[0, 2, 2, 2]}>Guaranteed</Caps>
        </Caption>
      </Flex>
    </Flex>
  )

  return (
    <Block
      id='timings'
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
    id='resume'
    alignItems='center'
    maxWidth={[layout.normal, layout.normal, layout.large, layout.large]}
    {...props}
  >
    <Subhead
      px={[3, 3, 4, 4]}
      variant='gradient'
      children='Global performance insights on click'
    />
    <Caption
      py={3}
      maxWidth={[layout.small, layout.small, layout.normal, layout.normal]}
      titleize={false}
    >
      <b>Microlink for Insights</b> provides first-class support for web
      performance monitoring, easy to integrate with any existing stack or cloud
      in just a few minutes.
    </Caption>

    <Block
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          alt='Metrics on demand'
          src='https://cdn.microlink.io/illustrations/popularity.svg'
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
            children='Audit on demand'
          />
          <Text
            pt={4}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
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
            children='Run on the edge'
          />
          <Text
            pt={4}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Never get worried about infrastructure again. Just hit{' '}
            <Link href='/docs/api/getting-started/overview'>Microlink API</Link>{' '}
            and we will run a cloud-based browsers for you.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          alt='Run on the edge'
          src='https://cdn.microlink.io/illustrations/networking.svg'
        />
      }
    />

    <Block
      pt={Container.defaultProps.pt}
      pb={Container.defaultProps.pt}
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          alt='Simple integration'
          src='https://cdn.microlink.io/illustrations/abstract-6.svg'
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
            children='Simple integration'
          />
          <Text
            pt={4}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Connect it with{' '}
            <Link icon href='https://lighthouse.microlink.io'>
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
      id='information'
      title='Product Information'
      caption='All the details you need to know about the product.'
      pb={Container.defaultProps.pt}
      questions={[
        {
          question: 'What is it?',
          answer: [
            <>
              <Text as='span' color='black' fontWeight='bold'>
                Microlink for Insights
              </Text>{' '}
              gives you web performance metrics in a simple way using{' '}
              <Link href='/docs/api/getting-started/overview'>
                Microlink API
              </Link>
              .
            </>
          ]
        },
        {
          question: 'How does it work?',
          answer: [
            <>
              The report is created after passing{' '}
              <Link href='/docs/api/parameters/insights'>insights</Link> query
              parameter to{' '}
              <Link href='/docs/api/getting-started/overview'>
                Microlink API
              </Link>
              .
            </>,
            <>
              For getting the report, we run{' '}
              <Link
                icon
                href='https://developers.google.com/web/tools/lighthouse'
              >
                Lighthouse
              </Link>{' '}
              in our cloud browser servers, giving you the report obtained from
              the target URL.
            </>,
            <>
              Additionally, we can also detect the technology stack behind the
              target URL, using{' '}
              <Link icon href='https://www.wappalyzer.com/'>
                Wappalyzer
              </Link>{' '}
              .
            </>,
            <>
              The data obtained will be returned as part of the HTTP response
              payload.
            </>
          ]
        },
        {
          question: 'Why not run my own solution?',
          answer: [
            <>
              The service aims to avoid headaches, preventing you for running
              and maintaining your own infrastructure.
            </>,
            <>
              Every URL on the Internet are different and browser are a complex
              piece of software, with unpredictable resources usage.
            </>,
            <>
              The fact of resolve any URL at scale in{' '}
              <Average size='tiny' value={healthcheck.insights.avg_pretty} />{' '}
              isn't a trivial thing.
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
}

export default () => {
  const [query] = useQueryState()
  return (
    <Layout>
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
                pt={Container.defaultProps.pt}
                pb={Container.defaultProps.pt}
                css={`
                  /* https://www.gradientmagic.com/collection/radialstripes */
                  background-image: radial-gradient(
                    circle at center right,
                    rgb(253, 97, 39) 0%,
                    rgb(253, 97, 39) 14.286%,
                    rgb(251, 108, 38) 14.286%,
                    rgb(251, 108, 38) 28.572%,
                    rgb(249, 118, 37) 28.572%,
                    rgb(249, 118, 37) 42.858%,
                    rgb(247, 129, 37) 42.858%,
                    rgb(247, 129, 37) 57.144%,
                    rgb(245, 140, 36) 57.144%,
                    rgb(245, 140, 36) 71.43%,
                    rgb(243, 150, 35) 71.43%,
                    rgb(243, 150, 35) 85.716%,
                    rgb(241, 161, 34) 85.716%,
                    rgb(241, 161, 34) 100.002%
                  );
                `}
                borderTop={`${borders[1]} ${colors.white20}`}
                borderBottom={`${borders[1]} ${colors.white20}`}
              />
              <Features
                title={
                  <>
                    <Subhead width='100%' textAlign='left'>
                      You call the API,
                    </Subhead>
                    <Subhead
                      color='rgb(241, 161, 34)'
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
                features={useFeatures()}
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
