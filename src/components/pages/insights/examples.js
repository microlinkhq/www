import { screenshotHeight } from 'components/pages/home/screenshots'
import { Average } from 'components/pages/screenshot/examples'
import React, { useMemo, useCallback, useState } from 'react'
import { Faq, Block, SubHeadline } from 'components/patterns'
import isUrl from 'is-url-http/lightweight'
import { colors, borders } from 'theme'
import prependHttp from 'prepend-http'
import { aspectRatio } from 'helpers'
import { getDomain } from 'tldts'
import get from 'dlv'

import {
  Box,
  Button,
  Caps,
  Container,
  Flex,
  Image,
  Input,
  InputIcon,
  Iframe,
  Text,
  CodeEditor,
  Subhead,
  Link,
  Card
} from 'components/elements'

import Technologies from './Technologies'

const LiveDemo = ({
  isLoading,
  suggestions,
  onSubmit,
  query,
  data,
  response
}) => {
  const [inputUrl, setInputUrl] = useState(get(query, 'url') || '')
  const inputUrlDomain = useMemo(() => getDomain(inputUrl), [inputUrl])
  const [tab, setTab] = useState('html')

  const getValues = useCallback(() => {
    const urlOne = prependHttp(inputUrl)
    return { url: urlOne }
  }, [inputUrl])

  const insights = get(data, 'insights')
  const previewUrl = `${response.url}&embed=insights.lighthouse`

  const lighthouseViewerUrl = `https://lighthouse.microlink.io/?url=${encodeURIComponent(
    previewUrl
  )}`

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
    <Container id='demo' pt={[4, 4, 5, 5]} px={4}>
      <SubHeadline
        title='Automate Web Performance'
        caption='Powered by Lighthouse'
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
              id='insights-demo-url'
              fontSize={2}
              iconComponent={<InputIcon domain={inputUrlDomain} />}
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
            <Caps fontSize={1} children='Get it' />
          </Button>
        </Flex>
      </Flex>

      <Flex alignItems='center' justifyContent='center' flexDirection='column'>
        <Text fontSize={2} pb={3}>
          into metrics
        </Text>
        {insights ? (
          <>
            <Box>
              <Subhead
                pb={[2, 2, 3, 3]}
                textAlign='left'
                fontSize={[2, 2, 4, 4]}
              >
                Lighthouse Viewer
              </Subhead>
              <Box as='section' id='lighthouse' pb={4}>
                {tab === 'json' ? (
                  <CodeEditor
                    language='json'
                    width={aspectRatio.width}
                    height={aspectRatio.height}
                    children={JSON.stringify(data, null, 2)}
                  />
                ) : (
                  <Iframe mx='auto' src={lighthouseViewerUrl} />
                )}
                <Flex
                  mx='auto'
                  width={aspectRatio.width}
                  justifyContent='flex-end'
                >
                  <Card.Option
                    key='html'
                    children='html'
                    value={tab}
                    onClick={() => setTab('html')}
                  />
                  <Card.Option
                    key='json'
                    children='json'
                    value={tab}
                    onClick={() => setTab('json')}
                  />
                </Flex>
              </Box>
              <Flex
                as='section'
                id='technology-stack'
                flexDirection='column'
                alignItems='flex-start'
              >
                <Subhead
                  pb={[2, 2, 3, 3]}
                  textAlign='left'
                  fontSize={[2, 2, 4, 4]}
                >
                  Technology Stack
                </Subhead>
                <Box>
                  <Text maxWidth='650px'>
                    Software detected under the target URL after analyzing
                    source code, response headers, script variables and several
                    other
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
                  pb={4}
                  width={['100%', 'inherit', 'inherit', 'inherit']}
                  flexDirection='column'
                >
                  <Technologies technologies={technologies} />
                </Flex>
              </Flex>
              <Flex as='section' id='embed' justifyContent='center'>
                <Box>
                  <Subhead
                    pb={[2, 2, 3, 3]}
                    textAlign='left'
                    fontSize={[2, 2, 4, 4]}
                  >
                    Embed
                  </Subhead>
                  <CodeEditor
                    width={aspectRatio.width}
                    language='html'
                    children={`<iframe src="${lighthouseViewerUrl}"></iframe>`}
                  />
                </Box>
              </Flex>
              <Flex pt={4} alignItems='center' justifyContent='center'>
                <Button
                  bg='black'
                  color='white'
                  children='Download file'
                  onClick={() => {
                    const link = document.createElement('a')
                    link.download = `${Date.now()}.json`
                    link.href = previewUrl
                    window.open(link)
                  }}
                />
                <Link
                  ml={3}
                  onClick={() => "navigate('/docs/api/parameters/pdf')"}
                >
                  <Caps fontWeight='regular' fontSize={0} children='See docs' />
                </Link>
              </Flex>
            </Box>
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

const Resume = props => (
  <Container id='resume' {...props} pt={[4, 4, 0, 0]}>
    <Box pt={[0, 0, 4, 4]}>
      <SubHeadline title='Monitor & audit web performance' />
      <Text textAlign='center' mr='auto' ml='auto' maxWidth={9}>
        Performance is a feature. <b>Microlink for Insights</b> provides
        first-class support for web performance monitoring, easy to integrate
        with any existing stack or cloud in just a few minutes.
      </Text>
    </Box>

    <Block
      as='section'
      pt={5}
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
            children='Perfomance metrics on demand'
            pb={3}
          />
          <Text
            px={[2, 3, 0, 0]}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Enable <Link href='/docs/api/parameters/insights'>insights</Link> at{' '}
            <Link href='/docs/api/getting-started/overview'>Microlink API</Link>{' '}
            to get a full Lighthouse report on demand. Track performance metrics
            scores over time, keeping a perfomance budget and preventing
            regressions.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          pb={[4, 4, 4, 0]}
          alt='Data normalization'
          src='https://cdn.microlink.io/illustrations/popularity.svg'
        />
      }
    />

    <Block
      as='section'
      px={[0, 0, 6, 6]}
      flexDirection='row-reverse'
      blockTwo={
        <Flex
          pl={[0, 0, 4, 4]}
          flexDirection='column'
          alignItems={['center', 'center', 'center', 'end']}
        >
          <Subhead
            as='h3'
            fontSize={[3, 4]}
            children='Run directly on the edge'
            pb={3}
          />
          <Text
            px={[2, 3, 0, 0]}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            Just hit{' '}
            <Link href='/docs/api/getting-started/overview'>Microlink API</Link>{' '}
            for running cloud-based browsers for you. Never get worried about
            infrastructure again. Simplicity made easy.
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          pb={[4, 4, 4, 0]}
          alt='Contextual information'
          src='https://cdn.microlink.io/illustrations/networking.svg'
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
            children='Ecosystem compatible'
            pb={3}
          />
          <Text
            pl={[2, 3, 0, 0]}
            pr={[2, 3, 4, 4]}
            maxWidth={8}
            textAlign={['center', 'center', 'center', 'inherit']}
          >
            It works out of the box with any{' '}
            <Link
              icon
              href='https://developers.google.com/web/tools/lighthouse'
            >
              Lighthouse
            </Link>{' '}
            compatible tool, such as{' '}
            <Link icon href='https://lighthouse.microlink.io'>
              Lighthouse Viewer
            </Link>{' '}
            or{' '}
            <Link
              icon
              href='https://github.com/GoogleChrome/lighthouse-ci/blob/master/docs/server.md'
            >
              Lighthouse CI
            </Link>
            .
          </Text>
        </Flex>
      }
      blockOne={
        <Image
          width={[5, 6, 7, 8]}
          pb={[4, 4, 4, 0]}
          alt='Powered by Lighthouse'
          src='https://cdn.microlink.io/illustrations/abstract-6.svg'
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
              Microlink for Insights
            </Text>{' '}
            takes any URL as an input and returns a web perfomance audit report
            over the URL back.
          </>,
          <>
            Just enable it passing{' '}
            <Link href='/docs/api/parameters/insights'>insights</Link> query
            parameter to{' '}
            <Link href='/docs/api/getting-started/overview'>Microlink API</Link>
            .
          </>,
          <>
            The web perfomance audit is done using{' '}
            <Link
              icon
              href='https://developers.google.com/web/tools/lighthouse'
              children='Lighthouse'
            />
            , while technologies detection is done via{' '}
            <Link
              icon
              href='https://www.wappalyzer.com/'
              children='Wappalyzer'
            />
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
            using Chrome headless browser.
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
            <Average size='tiny' queryParam='pdf' /> is not a trivial thing.
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

export default ({
  isLoading,
  onSubmit,
  suggestions,
  query,
  data,
  response
}) => (
  <>
    <LiveDemo
      data={data}
      isLoading={isLoading}
      onSubmit={onSubmit}
      suggestions={suggestions}
      query={query}
      response={response}
    />
    <Resume />
    <Information
      bg='pinky'
      borderTop={`${borders[1]} ${colors.pinkest}`}
      borderBottom={`${borders[1]} ${colors.pinkest}`}
    />
  </>
)
