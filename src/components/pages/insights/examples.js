import {
  Box,
  Button,
  Caps,
  Container,
  Flex,
  Image,
  Input,
  InputIcon,
  Pie,
  Text
} from 'components/elements'

import { LighthouseScore, Lighthouse, SubHeadline } from 'components/patterns'
import { aspectRatio } from 'helpers'

import { layout } from 'theme'
import React, { useMemo, useCallback, useState } from 'react'
import reduce from 'lodash/reduce'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import { getDomain } from 'tldts'
import get from 'dlv'

import { screenshotHeight } from 'components/pages/home/screenshots'
import ScreenshotThumbnail from './ScreenshotThumbnail'
import ConsoleErrors from './ConsoleErrors'
import Technologies from './Technologies'
import Table from './Table'

import Markdown from 'components/markdown'

const getResourceSummary = resourceSummary =>
  reduce(
    resourceSummary,
    (acc, value, key) => {
      if (key === 'total') {
        acc.total = value
      } else {
        const item = { ...value, value: value.count, id: key, label: key }
        acc.details.push(item)
      }

      return acc
    },
    { details: [], total: null }
  )

const LiveDemo = ({ isLoading, suggestions, onSubmit, query, data }) => {
  const [inputUrl, setInputUrl] = useState(get(query, 'url') || '')
  const inputUrlDomain = useMemo(() => getDomain(inputUrl), [inputUrl])

  const getValues = useCallback(() => {
    const urlOne = prependHttp(inputUrl)
    return { url: urlOne }
  }, [inputUrl])

  const insights = get(data, 'insights')

  const resourceSummary = React.useMemo(() => {
    return getResourceSummary(get(insights, 'resource-summary.details') || [])
  }, [insights])

  const bootupTime = React.useMemo(() => get(insights, 'bootup-time') || {}, [
    insights
  ])

  const network = React.useMemo(() => {
    const networkServerLatency = get(insights, 'network-server-latency') || {}
    const networkRTT = get(insights, 'network-rtt') || {}

    if (!networkRTT.details) return {}

    networkServerLatency.details.items = networkRTT.details.items.reduce(
      (acc, item) => {
        const { origin, duration_pretty: rtt } = item

        const {
          duration_pretty: serverResponseTime
        } = networkServerLatency.details.items.find(
          item => item.origin === origin
        )
        return [...acc, { origin, rtt, serverResponseTime }]
      },
      []
    )

    return networkServerLatency
  }, [insights])

  const httpVersion = React.useMemo(() => {
    return get(insights, 'uses-http2') || {}
  }, [insights])

  const technologies = React.useMemo(() => {
    return get(insights, 'technologies') || []
  }, [insights])

  const handleSubmit = event => {
    event.preventDefault()
    const urlOne = prependHttp(inputUrl)
    if (!isUrl(urlOne)) return onSubmit()
    const { url } = getValues()
    return onSubmit(url)
  }

  return (
    <Container id='demo' px={0}>
      {/* <Container id='demo' py={[4, 5]} px={4}> */}
      <SubHeadline
        title='Get perfomance insights'
        caption='Powered by Lighthouse'
        captionExclude={['Lighthouse']}
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
              iconComponent={
                <InputIcon value={inputUrl} domain={inputUrlDomain} />
              }
              id='insights-demo-url'
              mr='6px'
              placeholder='Visit URL'
              suggestions={suggestions}
              type='text'
              value={inputUrl}
              onChange={event => setInputUrl(event.target.value)}
              width={['100%', '100%', '128px', '128px']}
              autoFocus
            />
          </Box>
          <Button ml={[0, 0, 2, 2]} width='100%' loading={isLoading}>
            <Caps fontSize={1} children='Audit it' />
          </Button>
        </Flex>
      </Flex>

      <Flex alignItems='center' justifyContent='center' flexDirection='column'>
        {insights ? (
          <>
            <Flex
              maxWidth={layout.large}
              as='section'
              flexDirection='column'
              width='100%'
              alignItems='flex-start'
              px={4}
              py={4}
              id='perceptible-speed'
            >
              <Flex pb={3} alignItems='baseline' flexDirection='column'>
                <SubHeadline title='Perceptible speed' pb={0} slug />
                <Markdown>
                  {get(insights, 'screenshot-thumbnails.description')}
                </Markdown>
                <Text style={{ marginTop: '-16px' }}>
                  Visitors to your website see content in{' '}
                  <Text as='span' fontWeight='bold'>
                    {get(insights, 'first-contentful-paint.duration_pretty')}
                  </Text>
                  , being perception{' '}
                  <Text as='span' fontWeight='bold'>
                    {get(insights, 'first-contentful-paint.perception')}
                  </Text>
                  .
                </Text>
              </Flex>
              <Flex
                pt={3}
                width='100%'
                flexDirection={['column', 'column', 'row', 'row']}
              >
                <ScreenshotThumbnail insights={insights} />
              </Flex>
            </Flex>
            <Flex
              maxWidth={layout.large}
              as='section'
              flexDirection='column'
              width='100%'
              alignItems='flex-start'
              px={4}
              py={4}
              id='technology-stack'
            >
              <Flex pb={3} alignItems='baseline' flexDirection='column'>
                <SubHeadline title='Technology stack' pb={0} slug />
                <Box>
                  <Markdown>
                    Software detected under the target URL after analyzing
                    source code, response headers, script variables and several
                    other
                  </Markdown>
                  <Text style={{ marginTop: '-16px' }}>
                    Detected{' '}
                    <Text as='span' fontWeight='bold'>
                      {technologies.length}
                    </Text>{' '}
                    technologies behind the site.
                  </Text>
                </Box>
              </Flex>

              <Box pt={3} width='100%'>
                <Technologies technologies={technologies} />
              </Box>
            </Flex>
            <Flex
              maxWidth={layout.large}
              as='section'
              flexDirection='column'
              width='100%'
              alignItems='flex-start'
              px={4}
              py={4}
              id='lighthouse-score'
            >
              <Flex pb={3} alignItems='baseline' flexDirection='column'>
                <SubHeadline title='Lighthouse score' pb={0} slug />
                <Markdown
                  children={`[Lighthouse](https://developers.google.com/web/tools/lighthouse)
                  provides easy insights for your site's performance.`}
                />
                <Text style={{ marginTop: '-16px' }}>
                  The site has in overal a score of{' '}
                  <Text as='span' fontWeight='bold'>
                    {LighthouseScore.getScore(insights)}/100
                  </Text>
                  .
                </Text>
              </Flex>
              <Flex pt={3} width='100%' justifyContent='space-around'>
                <Lighthouse
                  // component={Card}
                  height='inherit'
                  mb={4}
                  data={insights}
                />
              </Flex>
            </Flex>
            <Flex
              maxWidth={layout.large}
              as='section'
              flexDirection='column'
              width='100%'
              alignItems='flex-start'
              px={4}
              py={4}
              id='errors-in-console'
            >
              <Flex pb={3} alignItems='baseline' flexDirection='column'>
                <SubHeadline title='Errors in console' pb={0} slug />
                <Markdown
                  children={`${get(
                    insights,
                    'errors-in-console.description'
                  )}.`}
                />
                <Text style={{ marginTop: '-16px' }}>
                  Found{' '}
                  <Text as='span' fontWeight='bold'>
                    {
                      (get(insights, 'errors-in-console.details.items') || [])
                        .length
                    }
                  </Text>{' '}
                  errors logged into the console.
                </Text>
              </Flex>
              <Flex pt={3} width='100%' justifyContent='space-around'>
                <ConsoleErrors title={inputUrl} insights={insights} />
              </Flex>
            </Flex>
            <Flex
              maxWidth={layout.large}
              as='section'
              flexDirection='column'
              width='100%'
              alignItems='flex-start'
              px={4}
              py={4}
              id='resource-summary'
            >
              <Flex pb={3} alignItems='baseline' flexDirection='column'>
                <SubHeadline title='Resource Summary' pb={0} slug />
                <Markdown
                  children={`${get(insights, 'resource-summary.title')}.`}
                />
                <Text style={{ marginTop: '-16px' }}>
                  Found{' '}
                  <Text as='span' fontWeight='bold'>
                    {resourceSummary.total.count}
                  </Text>{' '}
                  resources in{' '}
                  <Text as='span' fontWeight='bold'>
                    {resourceSummary.total.size_pretty}
                  </Text>
                  .
                </Text>
              </Flex>
              <Flex pt={3} width='100%' justifyContent='space-around'>
                <Pie
                  data={resourceSummary.details}
                  radialLabel={({ label, size_pretty: size }) =>
                    `${label} (${size})`
                  }
                />
              </Flex>
            </Flex>
            <Flex
              maxWidth={layout.large}
              as='section'
              flexDirection='column'
              width='100%'
              alignItems='flex-start'
              px={4}
              py={4}
              id='bootup-time'
            >
              <Flex pb={3} alignItems='baseline' flexDirection='column'>
                <SubHeadline title='Bootup time' pb={0} slug />
                <Markdown>{bootupTime.description}</Markdown>
                <Text style={{ marginTop: '-16px' }}>
                  JavaScript executes{' '}
                  <Text as='span' fontWeight='bold'>
                    {bootupTime.details.items.length}
                  </Text>{' '}
                  scripts in{' '}
                  <Text as='span' fontWeight='bold'>
                    {bootupTime.duration_pretty}
                  </Text>
                  .
                </Text>
              </Flex>
              <Table
                data={bootupTime}
                headers={[
                  'URL',
                  'Total CPU Time',
                  'Script Evaluation',
                  'Script Parse'
                ]}
                fields={[
                  'url',
                  'duration_pretty',
                  'script_pretty',
                  'parse_pretty'
                ]}
              />
            </Flex>
            <Flex
              maxWidth={layout.large}
              as='section'
              flexDirection='column'
              width='100%'
              alignItems='flex-start'
              px={4}
              py={4}
              id='network-perfomance'
            >
              <Flex pb={3} alignItems='baseline' flexDirection='column'>
                <SubHeadline title='Network Perfomance' pb={0} slug />
                <Markdown>
                  {get(insights, 'network-server-latency.description')}
                </Markdown>
                <Text style={{ marginTop: '-16px' }}>
                  Reached{' '}
                  <Text as='span' fontWeight='bold'>
                    {network.details.items.length}
                  </Text>{' '}
                  origins servers in{' '}
                  <Text as='span' fontWeight='bold'>
                    {network.duration_pretty}
                  </Text>
                  .
                </Text>
              </Flex>
              <Table
                data={network}
                headers={['URL', 'Round Trip Time', 'Response Time']}
                fields={['origin', 'rtt', 'serverResponseTime']}
              />
            </Flex>
            <Flex
              maxWidth={layout.large}
              as='section'
              flexDirection='column'
              width='100%'
              alignItems='flex-start'
              px={4}
              py={4}
              id='http-version'
            >
              <Flex pb={3} alignItems='baseline' flexDirection='column'>
                <SubHeadline title='HTTP Version' pb={0} slug />
                <Markdown>{httpVersion.description}</Markdown>
                <Text style={{ marginTop: '-16px' }}>
                  {httpVersion.score === 100 ? (
                    <>All your requests are served via HTTP/2.</>
                  ) : (
                    <>
                      <Text as='span' fontWeight='bold'>
                        {httpVersion.details.items.length}
                      </Text>{' '}
                      {httpVersion.details.items.length === 1
                        ? 'request'
                        : 'requests'}{' '}
                      are not served via HTTP/2.
                    </>
                  )}
                </Text>
              </Flex>
              {httpVersion.details && (
                <Table
                  data={httpVersion}
                  headers={['URL', 'Protocol']}
                  fields={['url', 'protocol']}
                />
              )}
            </Flex>
          </>
        ) : (
          <Flex
            border={3}
            borderColor='black20'
            alignItems='center'
            flexDirection='column'
            justifyContent='center'
            height={screenshotHeight.map(n => `calc(${n} * 0.85)`)}
            width={aspectRatio.width.map(n => `calc(${n} * 0.85)`)}
          >
            <Image
              width={[3, 3, '80%', '80%']}
              alt='Paste your URL'
              src='https://cdn.microlink.io/logo/lighthouse.png'
            />
            <Text fontSize={[2, 2, 4, 4]} color='black40'>
              Paste your URL
            </Text>
          </Flex>
        )}
      </Flex>
    </Container>
  )
}

// const Resume = props => (
//   <Container id='resume' {...props} pt={[4, 4, 0, 0]}>
//     <Box pt={[0, 0, 4, 4]}>
//       <SubHeadline title='Easy Peasy PDF as a service' slug/>
//       <Text
//         textAlign='center'
//         mr='auto'
//         ml='auto'
//         maxWidth={[9, 9, 10, 10]}
//         pb={3}
//       >
//         <b>Microlink for PDF</b> turns any website into a PDF. Even if the
//         target URL hasn't been prepared to be exported, microlink can create a
//         PDF version of the URL, with a lot of customizable extra things.
//       </Text>
//     </Box>

//     <Block
//       as='section'
//       px={[0, 0, 6, 6]}
//       blockTwo={
//         <Flex
//           flexDirection='column'
//           alignItems={['center', 'center', 'center', 'baseline']}
//           pr={[0, 0, 4, 4]}
//         >
//           <Subhead
//             as='h3'
//             fontSize={[3, 4]}
//             children='Always up to date'
//             pb={3}
//           />
//           <Text
//             px={[2, 3, 0, 0]}
//             maxWidth={8}
//             textAlign={['center', 'center', 'center', 'inherit']}
//           >
//             Every PDF has a <Link href='/docs/api/parameters/ttl'>ttl</Link>{' '}
//             associated. After expiration, they will be automatically refreshed,
//             reflecting any change present on the website.
//           </Text>
//         </Flex>
//       }
//       blockOne={
//         <Image
//           width={[5, 6, 7, 8]}
//           pb={[4, 4, 4, 0]}
//           alt='Always up to date'
//           src='https://cdn.microlink.io/illustrations/genius-idea.svg'
//         />
//       }
//     />

//     <Block
//       as='section'
//       px={[0, 0, 6, 6]}
//       flexDirection='row-reverse'
//       pt={0}
//       pb={0}
//       blockTwo={
//         <Flex
//           pl={[0, 0, 4, 4]}
//           flexDirection='column'
//           alignItems={['center', 'center', 'center', 'end']}
//         >
//           <Subhead
//             as='h3'
//             fontSize={[3, 4]}
//             children='Fully Customizable'
//             pb={3}
//           />
//           <Text
//             px={[2, 3, 0, 0]}
//             maxWidth={8}
//             textAlign={['center', 'center', 'center', 'inherit']}
//           >
//             Such as set the paper{' '}
//             <Link href='/docs/api/parameters/pdf/format'>format</Link>,
//             establish a{' '}
//             <Link href='/docs/api/parameters/pdf/margin'>margin</Link>, change
//             the <Link href='/docs/api/parameters/pdf/scale'>scale</Link>, set{' '}
//             <Link href='/docs/api/parameters/pdf/page-ranges'>page ranges</Link>
//             , use{' '}
//             <Link href='/docs/api/parameters/pdf/landscape'>landscape</Link>{' '}
//             orientation, and a lot more.
//           </Text>
//         </Flex>
//       }
//       blockOne={
//         <Image
//           width={[5, 6, 7, 8]}
//           pb={[4, 4, 4, 0]}
//           alt='Fully Customizable'
//           src='https://cdn.microlink.io/illustrations/abstract-2.svg'
//         />
//       }
//     />

//     <Block
//       as='section'
//       px={[0, 0, 6, 6]}
//       pb={0}
//       blockTwo={
//         <Flex
//           flexDirection='column'
//           alignItems={['center', 'center', 'center', 'baseline']}
//         >
//           <Subhead
//             as='h3'
//             fontSize={[3, 4]}
//             children='Universal Embed'
//             pb={3}
//           />
//           <Text
//             pr={[2, 3, 4, 4]}
//             pl={[2, 3, 0, 0]}
//             maxWidth={8}
//             textAlign={['center', 'center', 'center', 'inherit']}
//           >
//             Consume{' '}
//             <Link href='/docs/api/getting-started/overview'>Microlik API</Link>{' '}
//             directly from your HTML markup using{' '}
//             <Link href='/docs/api/parameters/embed'>embed</Link> mode, creating
//             PDFs on demand without being worried about code or infrastructure.
//           </Text>
//         </Flex>
//       }
//       blockOne={
//         <Image
//           width={[5, 6, 7, 8]}
//           pb={[4, 4, 4, 0]}
//           alt='Universal Embed'
//           src='https://cdn.microlink.io/illustrations/abstract-page-is-under-construction.svg'
//         />
//       }
//     />
//   </Container>
// )

// const Information = props => (
//   <Faq
//     id='information'
//     title='Product Information'
//     caption='All you need to know.'
//     questions={[
//       {
//         question: 'How does it work?',
//         answer: [
//           <>
//             <Text as='span' fontWeight='bold' color='black'>
//               Microlink for PDF
//             </Text>{' '}
//             takes any URL as an input and returns a PDF back, hosted at
//             Microlink CDN.
//           </>,
//           <>
//             It supports most of the common PDF tweaks, like paper{' '}
//             <Link href='/docs/api/parameters/pdf/format'>format</Link>,
//             establish a{' '}
//             <Link href='/docs/api/parameters/pdf/margin'>margin</Link>, change
//             the <Link href='/docs/api/parameters/pdf/scale'>scale</Link>, set{' '}
//             <Link href='/docs/api/parameters/pdf/page-ranges'>page ranges</Link>
//             , use{' '}
//             <Link href='/docs/api/parameters/pdf/landscape'>landscape</Link>{' '}
//             orientation, etc, making it a more complete tool.
//           </>,
//           <>
//             Check that in the{' '}
//             <Link icon href='http://bit.ly/saasforpdf'>
//               comparative table
//             </Link>
//             .
//           </>
//         ]
//       },
//       {
//         question: 'How is it built?',
//         answer: [
//           <>
//             The service is built on top of{' '}
//             <Link icon href='https://github.com/puppeteer/puppeteer'>
//               puppeteer
//             </Link>{' '}
//             using Chromium Headless browser.
//           </>,
//           <>
//             The browser management is handled by our own driver called{' '}
//             <Link icon href='https://browserless.js.org'>
//               browserless
//             </Link>
//             .
//           </>,
//           <>(Yes, it's open source!).</>
//         ]
//       },
//       {
//         question: 'Why not run my own solution?',
//         answer: [
//           <>
//             The service aims to avoid headaches, preventing you for running and
//             maintaining your own infrastructure.
//           </>,
//           <>
//             Every URL on the Internet are different and browser are a complex
//             piece of software, with unpredictable resources usage.
//           </>,
//           <>
//             The fact of resolve any URL at scale in <Average size='tiny' /> is
//             not a trivial thing.
//           </>
//         ]
//       },
//       {
//         question: 'Do you have a Service-Level Agreements (SLA)?',
//         answer: [
//           <>
//             You can see our SLA level on{' '}
//             <Link display='inline' href='/status' children='status' />
//             {' page.'}
//           </>
//         ]
//       },
//       {
//         question: 'Can I ask a question?',
//         answer: [
//           <>
//             We're always available at{' '}
//             <Link
//               display='inline'
//               href='mailto:hello@microlink.io'
//               children='hello@microlink.io'
//             />
//             .
//           </>
//         ]
//       }
//     ]}
//     {...props}
//   />
// )

export default ({
  isLoading,
  onSubmit,
  refBackground,
  refOverlay,
  refUrl,
  refWaitFor,
  suggestions,
  query,
  data
}) => (
  <>
    <LiveDemo
      data={data}
      isLoading={isLoading}
      onSubmit={onSubmit}
      refBackgroundthi={refBackground}
      refOverlay={refOverlay}
      refUrl={refUrl}
      refWaitFor={refWaitFor}
      suggestions={suggestions}
      query={query}
    />
    {/* <Timings />
    <Hide breakpoints={[0, 1]}>
      <Features children={useFeaturesPdf()} />
    </Hide>
    <Resume />
    <Information
      bg='pinky'
      borderTop={`${borders[1]} ${colors.pinkest}`}
      borderBottom={`${borders[1]} ${colors.pinkest}`}
    /> */}
  </>
)
