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
  MultiCodeEditor,
  Subhead,
  Text
} from 'components/elements'

import {
  Block,
  Caption,
  CubeBackground,
  Faq,
  Microlink,
  SubHeadline
} from 'components/patterns'

import { useCheckly, useFeaturesMeta } from 'components/hook'
import { mqlCode, debounceComponent } from 'helpers'
import { transition, colors, borders } from 'theme'
import React, { useEffect, useState } from 'react'
import { fadeIn } from 'components/keyframes'
import isUrl from 'is-url-http/lightweight'
import prependHttp from 'prepend-http'
import styled from 'styled-components'
import { getDomain } from 'tldts'
import mql from '@microlink/mql'

import { Features } from '../screenshot/template'

const languages = mqlCode(
  {
    data: {
      audio: true,
      video: true,
      meta: true
    }
  },
  `audio: true,
    video: true,
    meta: true`
)

const MicrolinkDebounce = debounceComponent(Microlink)

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

const LiveDemo = ({ suggestions, demoLink, onSubmit, isLoading }) => {
  const [inputValue, setInputValue] = useState('')
  const [data, setData] = useState(demoLink.data)
  const [previewView, setPreviewView] = useState('preview')
  const [editorView, setEditorView] = useState('code')
  const domain = getDomain(inputValue)

  const fetchAndSetData = async url => {
    try {
      const { data } = await mql(url, { iframe: true })
      setData(data)
    } catch (err) {}
  }

  useEffect(() => {
    if (isLoading) return
    const value = prependHttp(inputValue)
    if (!isUrl(value)) return setData(demoLink.data)
    const item = suggestions.find(({ value }) => value === inputValue)
    if (item) setData(item.data)
    else fetchAndSetData(value)
  }, [inputValue])

  const media = [
    previewView === 'iframe' && 'iframe',
    'video',
    'audio',
    'image',
    'logo'
  ].filter(Boolean)

  const targetUrlPrepend = prependHttp(demoLink.data.url)

  return (
    <>
      <Container py={[4, 4, 5, 5]} px={4}>
        <SubHeadline
          title='Make any URL embeddable'
          caption='Turn websites into data'
        />

        <Flex justifyContent='center' alignItems='center'>
          <Flex
            pt={2}
            pb={3}
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
                iconComponent={<InputIcon value={inputValue} domain={domain} />}
                placeholder='Enter a URL...'
                type='text'
                suggestions={suggestions}
                value={inputValue}
                onChange={event => setInputValue(event.target.value)}
                width={['100%', '100%', '128px', '128px']}
                autoFocus
              />
            </Box>
            <Button ml={[0, 0, 2, 2]} width='100%' loading={isLoading}>
              <Caps fontSize={1} children='Embed it' />
            </Button>
          </Flex>
        </Flex>

        <Box textAlign='center'>
          <Box pb={3}>
            <Text fontSize={2}>into rich media</Text>
          </Box>

          <Flex
            flexDirection='column'
            mb={[4, 0]}
            maxWidth={CodeEditor.width}
            mx='auto'
          >
            <Box>
              <MicrolinkDebounce
                key={targetUrlPrepend + previewView}
                loading={isLoading}
                size='large'
                url={targetUrlPrepend}
                setData={() => data}
                media={media}
              />
              <Flex
                mx='auto'
                maxWidth='500px'
                alignItems='center'
                justifyContent='flex-end'
              >
                <Card.Option
                  children='preview'
                  value={previewView}
                  onClick={() => setPreviewView('preview')}
                />
                <Card.Option
                  children='iframe'
                  value={previewView}
                  onClick={() => setPreviewView('iframe')}
                />
              </Flex>
              <Flex pt={4} alignItems='center' justifyContent='center'>
                <MultiCodeEditor
                  languages={
                    editorView === 'data'
                      ? {
                          JSON: `// npm install @microlink/cli --global\n// microlink-api ${targetUrlPrepend}&meta&video&audio \n${JSON.stringify(
                            data,
                            null,
                            2
                          )}`
                        }
                      : languages
                  }
                />
              </Flex>
            </Box>
            <Flex justifyContent='flex-end'>
              <Card.Option
                children='code'
                value={editorView}
                onClick={() => setEditorView('code')}
              />
              <Card.Option
                children='data'
                value={editorView}
                onClick={() => setEditorView('data')}
              />
            </Flex>
          </Flex>
        </Box>
      </Container>
    </>
  )
}

const Timings = () => {
  const words = [
    'beauty link previews',
    'native embeds',
    'builtin media player',
    'easily customizable',
    'lazy fetching',
    'mobile ready'
  ]
  const [index, setIndex] = useState(0)

  const checkly = useCheckly()

  useEffect(() => {
    const interval = setInterval(
      () => setIndex(index => (index + 1) % words.length),
      3500
    )
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatedBox>
      <Block
        bg='#4e54c8'
        id='timings'
        flexDirection='column'
        blockOne={
          <Box>
            <Flex alignItems='center' justifyContent='center'>
              <Heading color='white' variant={null} mr={[1, 1, 3, 3]}>
                All the data. Unified. Effortless.
              </Heading>
            </Flex>
            <Caption
              color='white80'
              maxWidth={[6, 7, 7, 'inherit']}
              mt={[3, 3, 3, 0]}
              variant={null}
            >
              Open Graph, JSON+LD, oEmbed & HTML.
            </Caption>
          </Box>
        }
        blockTwo={
          <>
            <Flex
              width='100%'
              justifyContent='space-around'
              flexDirection='column'
            >
              <Heading
                pt={[4, 4, 5, 5]}
                pb={[3, 3, 0, 0]}
                key={words[index]}
                color='white'
                variant={null}
                fontWeight='bold'
                css={fadeIn}
                children={words[index]}
              />
            </Flex>
            <Flex alignItems='baseline'>
              <Flex
                alignItems='center'
                justifyContent='center'
                flexDirection='column'
              >
                <Heading
                  as='div'
                  color='white'
                  variant={null}
                  mr={3}
                  fontWeight='bold'
                >
                  {checkly.meta.avg_pretty.replace(/ms|s/, '')}
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
                </Heading>
                <Caption
                  as='div'
                  color='white80'
                  variant={null}
                  mr={3}
                  fontWeight='light'
                  titleize={false}
                >
                  avg. response time
                </Caption>
              </Flex>
              <Box px={3} mx='auto' />
              <Flex
                pt={[3, 3, 5, 5]}
                alignItems='center'
                justifyContent='center'
                flexDirection='column'
              >
                <Heading
                  as='div'
                  color='white'
                  variant={null}
                  mr={3}
                  fontWeight='bold'
                >
                  {checkly.meta.p95_pretty.replace(/ms|s/, '')}
                  <Caption
                    titleize={false}
                    as='div'
                    ml={2}
                    color='white'
                    display='inline'
                    fontWeight='bold'
                    children='seg'
                  />
                </Heading>
                <Caption
                  as='div'
                  color='white80'
                  variant={null}
                  mr={3}
                  fontWeight='light'
                  titleize={false}
                >
                  p95 response time
                </Caption>
              </Flex>
              <Box px={3} mx='auto' />
              <Flex
                pt={[3, 3, 5, 5]}
                alignItems='center'
                justifyContent='center'
                flexDirection='column'
              >
                <Heading
                  as='div'
                  color='white'
                  variant={null}
                  mr={3}
                  fontWeight='bold'
                >
                  {'99.9'}
                  <Caption
                    as='div'
                    ml={2}
                    color='white'
                    display='inline'
                    fontWeight='bold'
                    children='%'
                  />
                </Heading>
                <Caption
                  as='div'
                  color='white80'
                  variant={null}
                  mr={3}
                  fontWeight='light'
                  titleize={false}
                >
                  uptime
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
            <Link href='/docs/mql/getting-started/overview'>MQL</Link>.
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

const Resume = props => (
  <Container id='resume' {...props} pt={[4, 4, 0, 0]}>
    <Box pt={[0, 0, 4, 4]}>
      <SubHeadline title='Universal embed made simple' />
      <Text textAlign='center' mr='auto' ml='auto' maxWidth={9}>
        <b>Microlink</b> extracts structured data from any website. Enter a URL,
        receive information. Get relevant information from any link & easily
        create beautiful previews.
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
            children='Data normalization'
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
          alt='Data normalization'
          src='https://cdn.microlink.io/illustrations/abstract-delivery.svg'
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
            children='Contextual information'
            pb={3}
          />
          <Text
            px={[2, 3, 0, 0]}
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
          pb={[4, 4, 4, 0]}
          alt='Contextual information'
          src='https://cdn.microlink.io/illustrations/robots.svg'
        />
      }
    />

    <Block
      as='section'
      pb={0}
      px={[0, 0, 6, 6]}
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
          alt='Universal Embed'
          src='https://cdn.microlink.io/illustrations/abstract-page-is-under-construction.svg'
        />
      }
    />
  </Container>
)

export default ({
  suggestions,
  demoLink,
  demoLinks,
  onSubmit,
  url,
  isLoading
}) => (
  <>
    <LiveDemo
      demoLink={demoLink}
      isLoading={isLoading}
      onSubmit={onSubmit}
      suggestions={suggestions}
      url={url}
    />
    <Timings />
    <Hide breakpoints={[0, 1]}>
      <Features children={useFeaturesMeta()} />
    </Hide>
    <Resume />
    <Information
      bg='pinky'
      borderTop={`${borders[1]} ${colors.pinkest}`}
      borderBottom={`${borders[1]} ${colors.pinkest}`}
    />
  </>
)
