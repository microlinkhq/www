import { borders, breakpoints, layout, colors } from 'theme'
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
  useFeatures,
  useHealthcheck,
  useQueryState,
  useWindowSize
} from 'components/hook'

const SMALL_BREAKPOINT = Number(breakpoints[0].replace('px', ''))

const SUGGESTIONS = [
  { id: 'basecamp', url: 'https://basecamp.com/shapeup/0.3-chapter-01' },
  {
    id: 'alexmaccaw',
    url: 'https://blog.alexmaccaw.com/advice-to-my-younger-self/'
  },
  {
    id: 'css-tricks',
    url: 'https://css-tricks.com/nerds-guide-color-web/'
  },
  {
    id: 'rauchg',
    url: 'https://rauchg.com/2014/7-principles-of-rich-web-applications'
  },
  {
    id: 'varnish-cache',
    url: 'https://varnish-cache.org/docs/6.2/phk/thatslow.html'
  }
].map(item => ({ ...item, value: humanizeUrl(item.url) }))

const getEmbedUrl = (url, embed) => getApiUrl(url, { insights: true, embed })[0]

const Wappalyzer = ({ data, ...props }) => (
  <Flex
    borderRadius={2}
    border={1}
    borderColor='black10'
    width={256}
    height={96}
    m={[1, 1, 2, 2]}
    py={3}
    px={3}
    flexDirection='row'
    alignItems='center'
    {...props}
  >
    <Box>
      <Image
        width={[30, 30, 40, 40]}
        alt={`${data.name} logo`}
        src={data.logo}
      />
    </Box>
    <Box pl={3}>
      <Link href={data.url}>{data.name}</Link>
      <Text fontSize={1} color='gray7'>
        {data.categories.join(', ')}
      </Text>
    </Box>
  </Flex>
)

const LighthouseReport = props => (
  <Flex flexDirection='column' alignItems='flex-start'>
    <Subhead textAlign='left' fontSize={3}>
      Lighthouse report
    </Subhead>
    <Box pt={3}>
      <Text maxWidth={layout.normal}>
        <Link href='https://github.com/GoogleChrome/lighthouse'>
          Lighthouse
        </Link>{' '}
        is an open-source, automated tool for improving the quality of web
        pages.
      </Text>
    </Box>
    <Flex justifyContent='center' pt={4} width='100%'>
      <Iframe {...props} />
    </Flex>
  </Flex>
)

const TechnologyStack = ({ technologies, ...props }) => (
  <Flex as='section' flexDirection='column' alignItems='flex-start' {...props}>
    <Subhead textAlign='left' fontSize={3}>
      Technology Stack
    </Subhead>
    <Box pt={3}>
      <Text maxWidth={layout.small}>
        Software detected under the target URL after analyzing source code,
        response headers, script variables and several other
      </Text>
      <Text pt={3}>
        Detected{' '}
        <Text as='span' fontWeight='bold'>
          {technologies.length}
        </Text>{' '}
        technologies behind the site.
      </Text>
    </Box>
    <Flex
      pt={4}
      mx='auto'
      justifyContent='center'
      flexDirection='row'
      flexWrap='wrap'
      width={props.width}
    >
      {technologies.map(data => (
        <Wappalyzer key={data.name} data={data} />
      ))}
      {technologies.length % 2 === 1 && <Box m={2} width={256} />}
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

const LiveDemo = React.memo(function LiveDemo ({
  data,
  isInitialData,
  isLoading,
  onSubmit,
  query
}) {
  const [ClipboardComponent, toClipboard] = useClipboard()
  const size = useWindowSize()
  const technologies = get(data, 'insights.technologies')

  const cardBase = size.width < SMALL_BREAKPOINT ? 1.2 : 3
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

  const [inputUrl, setInputUrl] = useState(query.url || '')

  const values = useMemo(() => {
    const preprendUrl = prependHttp(inputUrl)
    return pickBy({ url: isUrl(preprendUrl) ? preprendUrl : undefined })
  }, [inputUrl])

  const embedTechnologiesUrl = useMemo(
    () => getEmbedUrl(values.url, 'insights.technologies'),
    [values]
  )

  const embedInsightsUrl = useMemo(
    () => getEmbedUrl(values.url, 'insights.lighthouse'),
    [values]
  )

  const snippetTechnologiesText = `curl -sL ${embedTechnologiesUrl}`
  const snippetInsightsText = `curl -sL ${embedInsightsUrl}`

  const reportUrl = `https://lighthouse.microlink.io/?url=${encodeURIComponent(
    embedInsightsUrl
  )}`

  return (
    <Container as='section' alignItems='center' pt={2} pb={[4, 4, 5, 5]}>
      <Heading px={5} maxWidth={layout.large}>
        Automate web performance
      </Heading>
      <Caption
        pt={[3, 3, 4, 4]}
        px={4}
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
          onSubmit={event => {
            event.preventDefault()
            const { url, ...opts } = values
            return onSubmit(url, opts)
          }}
        >
          <Box ml={[0, 0, 2, 2]} mb={[3, 3, 0, 0]}>
            <Input
              fontSize={2}
              iconComponent={
                <InputIcon
                  iconUrl={data?.logo?.url}
                  provider={!isInitialData && 'microlink'}
                  url={!isInitialData && values.url}
                />
              }
              id='pdf-demo-url'
              placeholder='Visit URL'
              suggestions={SUGGESTIONS}
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

      <Choose>
        <Choose.When condition={!!reportUrl && !!technologies}>
          <Box
            as='section'
            id='technology-stack'
            width={cardWidth}
            flexDirection='column'
          >
            <Box pt={4}>
              <TechnologyStack technologies={technologies} />
            </Box>
            <Box pt={[1, 1, 2, 2]} width={[256, 256, 528, 528]} mx='auto'>
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
                      copy: snippetTechnologiesText,
                      text: Tooltip.TEXT.COPIED.HTML
                    })
                  }}
                  width='100%'
                  color='black60'
                  value={snippetTechnologiesText}
                />
              </Tooltip>
            </Box>
          </Box>
          <Box as='section' id='lighthouse-report' width={cardWidth} pt={5}>
            <LighthouseReport width={528} src={reportUrl} />
            <Box pt={[2, 2, 3, 3]} mx='auto'>
              <Tooltip
                tooltipsOpts={Tooltip.TEXT.OPTIONS}
                content={
                  <Tooltip.Content>{Tooltip.TEXT.COPY.HTML}</Tooltip.Content>
                }
              >
                <Input
                  width='100%'
                  readOnly
                  onClick={event => {
                    event.target.select()
                    toClipboard({
                      copy: snippetInsightsText,
                      text: Tooltip.TEXT.COPIED.HTML
                    })
                  }}
                  color='black60'
                  value={snippetInsightsText}
                />
              </Tooltip>
            </Box>
          </Box>
        </Choose.When>
        <Choose.Otherwise>
          <LighthousePlaceholder height={cardHeight} width={cardWidth} />
        </Choose.Otherwise>
      </Choose>
      <ClipboardComponent />
    </Container>
  )
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
          {trimMs(healthcheck.insights.p95_pretty)}
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
            <Link href='https://lighthouse.microlink.io'>Lighthouse</Link> or{' '}
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
  const hasQuery = !!query?.url

  return (
    <Layout
      head={{
        image: cdnUrl('banner/insights.jpeg'),
        description:
          'Automate web performance. Track site speed & website quality over time. Get performance insights powered by Lighthouse'
      }}
    >
      <FetchProvider mqlOpts={{ insights: true }}>
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
