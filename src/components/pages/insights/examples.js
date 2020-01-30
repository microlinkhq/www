import {
  Box,
  Button,
  Caps,
  CodeEditor,
  Container,
  Flex,
  Hide,
  Iframe,
  Image,
  Input,
  InputIcon,
  Link,
  Radar,
  Stack,
  Subhead,
  Text
} from 'components/elements'

import {
  Minimize as MinimizeIcon,
  Book as BookIcon,
  Search as SearchIcon,
  File as FileIcon
} from 'react-feather'

import { Faq, Block, SubHeadline } from 'components/patterns'
import { pdfUrl, aspectRatio, getDomain } from 'helpers'
import { useFeaturesPdf } from 'components/hook'
import { HourGlass } from 'components/icons'
import { colors, borders } from 'theme'
import React, { useState } from 'react'
import prependHttp from 'prepend-http'
import pickBy from 'lodash/pickBy'
import chunk from 'lodash/chunk'
import compact from 'lodash/compact'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import { navigate } from 'gatsby'
import isUrl from 'is-url-http'
import get from 'dlv'
import ms from 'ms'

import { screenshotHeight } from 'components/pages/home/screenshots'
import { Average, Timings } from 'components/pages/screenshot/examples'
import { Features } from 'components/pages/screenshot/template'

const getRadarData = ({
  insights,
  inputUrlDomain,
  insightsBaselineDomain,
  insightsBaseline
}) => {
  const radarData = [
    'first-contentful-paint',
    'first-meaningful-paint',
    'speed-index',
    'first-cpu-idle',
    'interactive'
  ].reduce((acc, key) => {
    return [
      ...acc,
      {
        id: insights[key].title,
        [inputUrlDomain]: insights[key].score * 100,
        [insightsBaselineDomain]: insightsBaseline[key].score * 100
      }
    ]
  }, [])
  return radarData
}

const getStackData = ({
  insights,
  inputUrlDomain,
  insightsBaselineDomain,
  insightsBaseline
}) => {
  const keys = reduce(
    get(insights, 'resource-summary'),
    (acc, value, key) => {
      if (typeof value === 'string') return acc
      if (key === 'total') return acc
      return [...acc, key]
    },
    []
  )

  const getData = (insights, domain) => {
    const data = reduce(
      keys,
      (acc, key) => {
        const value = get(insights, `resource-summary.${key}`)
        return {
          ...acc,
          [key]: value.count,
          [`${key}Bytes`]: value.size_pretty
        }
      },
      {}
    )
    data.url = domain
    return data
  }

  return {
    keys,
    indexBy: 'url',
    label: e => e.data[`${e.id}Bytes`],
    data: [
      getData(insights, inputUrlDomain),
      getData(insightsBaseline, insightsBaselineDomain)
    ]
  }
}

const LiveDemo = ({ isLoading, suggestions, onSubmit, query, data }) => {
  const [inputUrl, setInputUrl] = useState(get(query, 'url.0') || '')
  const [inputBaselineUrl, setInputBaselineUrl] = useState(
    get(query, 'url.1') || ''
  )

  const inputUrlDomain = React.useMemo(() => getDomain(inputUrl), [inputUrl])

  const insightsBaselineDomain = React.useMemo(
    () => getDomain(inputBaselineUrl),
    [inputBaselineUrl]
  )

  const [urlSuggestions, baselineSuggestions] = chunk(
    suggestions,
    Math.floor(suggestions.length / 2)
  )

  const [insights, insightsBaseline] = map(data, data => get(data, 'insights'))

  return (
    <Container id='demo' py={[4, 5]} px={4}>
      <SubHeadline
        title='Get perfomance insights'
        caption='Powered by Lighthouse'
        titleExclude={['Lighthouse']}
      />

      <Flex justifyContent='center' alignItems='center'>
        <Flex
          pt={2}
          pb={3}
          as='form'
          mx={[0, 0, 'auto', 'auto']}
          justifyContent='center'
          onSubmit={event => {
            event.preventDefault()
            const urlOne = prependHttp(inputUrl)
            const urlTwo = prependHttp(inputBaselineUrl)
            if (!isUrl(urlOne) || !isUrl(urlTwo)) return undefined
            return onSubmit([urlOne, urlTwo])
          }}
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
              suggestions={urlSuggestions}
              type='text'
              value={inputUrl}
              onChange={event => setInputUrl(event.target.value)}
              width={['100%', '100%', '192px', '192px']}
              autoFocus
            />
            <Box py={2} />
            <Input
              fontSize={2}
              iconComponent={
                <InputIcon
                  value={inputBaselineUrl}
                  domain={insightsBaselineDomain}
                />
              }
              id='insights-demo-baseline-url'
              mr='6px'
              placeholder='Baseline URL'
              suggestions={baselineSuggestions}
              type='text'
              value={inputBaselineUrl}
              onChange={event => setInputBaselineUrl(event.target.value)}
              width={['100%', '100%', '192px', '192px']}
              autoFocus
            />
          </Box>

          <Button ml={[0, 0, 2, 2]} loading={isLoading}>
            <Caps fontSize={1} children='Audit it' />
          </Button>
        </Flex>
      </Flex>

      <Flex alignItems='center' justifyContent='center' flexDirection='column'>
        <Text fontSize={2} pb={3}>
          into metrics
        </Text>
        {insights ? (
          <Box>
            <Radar
              indexBy='id'
              keys={[inputUrlDomain, insightsBaselineDomain]}
              data={getRadarData({
                insights,
                inputUrlDomain,
                insightsBaselineDomain,
                insightsBaseline
              })}
            />
            <Stack
              {...getStackData({
                insights,
                inputUrlDomain,
                insightsBaselineDomain,
                insightsBaseline
              })}
            />
            {/* <Iframe
              border={1}
              borderColor='black20'
              height={screenshotHeight.map(n => `calc(${n} * 0.85)`)}
              width={aspectRatio.width.map(n => `calc(${n} * 0.85)`)}
              src={dataPdfUrl}
            />
            <Flex
              justifyContent='center
            '
            >
              <CodeEditor
                mt={4}
                language='html'
                children={`<iframe src="${previewUrl}"></iframe>`}
              />
            </Flex>
            <Flex pt={4} alignItems='center' justifyContent='center'>
              <a href={previewUrl}>
                <Button bg='black' color='white'>
                  Download File
                </Button>
              </a>
              <Link ml={3} onClick={() => navigate('/docs/api/parameters/pdf')}>
                <Caps fontWeight='regular' fontSize={0} children='See docs' />
              </Link>
            </Flex> */}
          </Box>
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
              mt='-92px'
              width={[3, 3, '80%', '80%']}
              style={{ opacity: 0.3, filter: 'grayscale(100%)' }}
              alt='Paste your URL'
              src='https://web.dev/images/collections/lighthouse-performance.svg'
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

const Resume = props => (
  <Container id='resume' {...props} pt={[4, 4, 0, 0]}>
    <Box pt={[0, 0, 4, 4]}>
      <SubHeadline title='Easy Peasy PDF as a service' />
      <Text
        textAlign='center'
        mr='auto'
        ml='auto'
        maxWidth={[9, 9, 10, 10]}
        pb={3}
      >
        <b>Microlink for PDF</b> turns any website into a PDF. Even if the
        target URL hasn't been prepared to be exported, microlink can create a
        PDF version of the URL, with a lot of customizable extra things.
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
            Every PDF has a <Link href='/docs/api/parameters/ttl'>ttl</Link>{' '}
            associated. After expiration, they will be automatically refreshed,
            reflecting any change present on the website.
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
            Such as set the paper{' '}
            <Link href='/docs/api/parameters/pdf/format'>format</Link>,
            establish a{' '}
            <Link href='/docs/api/parameters/pdf/margin'>margin</Link>, change
            the <Link href='/docs/api/parameters/pdf/scale'>scale</Link>, set{' '}
            <Link href='/docs/api/parameters/pdf/page-ranges'>page ranges</Link>
            , use{' '}
            <Link href='/docs/api/parameters/pdf/landscape'>landscape</Link>{' '}
            orientation, and a lot more.
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
            children='Universal Embed'
            pb={3}
          />
          <Text
            pr={[2, 3, 4, 4]}
            pl={[2, 3, 0, 0]}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Consume{' '}
            <Link href='/docs/api/getting-started/overview'>Microlik API</Link>{' '}
            directly from your HTML markup using{' '}
            <Link href='/docs/api/parameters/embed'>embed</Link> mode, creating
            PDFs on demand without being worried about code or infrastructure.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          pb={[4, 4, 4, 0]}
          alt='Universal Embed'
          src='https://cdn.microlink.io/illustrations/abstract-page-is-under-construction.svg'
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
              Microlink for PDF
            </Text>{' '}
            takes any URL as an input and returns a PDF back, hosted at
            Microlink CDN.
          </>,
          <>
            It supports most of the common PDF tweaks, like paper{' '}
            <Link href='/docs/api/parameters/pdf/format'>format</Link>,
            establish a{' '}
            <Link href='/docs/api/parameters/pdf/margin'>margin</Link>, change
            the <Link href='/docs/api/parameters/pdf/scale'>scale</Link>, set{' '}
            <Link href='/docs/api/parameters/pdf/page-ranges'>page ranges</Link>
            , use{' '}
            <Link href='/docs/api/parameters/pdf/landscape'>landscape</Link>{' '}
            orientation, etc, making it a more complete tool.
          </>,
          <>
            Check that in the{' '}
            <Link icon href='http://bit.ly/saasforpdf'>
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
            The fact of resolve any URL at scale in <Average size='tiny' /> is
            not a trivial thing.
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
