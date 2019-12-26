import {
  AnimatedBox,
  Box,
  Button,
  Caps,
  Container,
  Flex,
  Input,
  InputIcon,
  Text,
  Heading,
  CodeEditor,
  IframeInline,
  Card
} from 'components/elements'

import {
  Caption,
  Block,
  SubHeadline,
  CubeBackground,
  Microlink
} from 'components/patterns'

import styled, { css } from 'styled-components'
import { debounceComponent, getDomain } from 'helpers'
import React, { useEffect, useState } from 'react'
import { fadeInDown } from 'components/keyframes'
import prependHttp from 'prepend-http'
import { transition } from 'theme'
import mql from '@microlink/mql'
import isUrl from 'is-url-http'

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
  const [view, setView] = useState('normal')
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
    if (!isUrl(value)) return
    const item = suggestions.find(({ value }) => value === inputValue)
    if (item) setData(item.data)
    else fetchAndSetData(value)
  }, [inputValue])

  return (
    <>
      <Container py={[4, 5]} px={4}>
        <SubHeadline
          title='Get data from any website'
          caption='Turn websites into rich content'
        />

        <Flex
          pt={2}
          pb={3}
          as='form'
          justifyContent='center'
          onSubmit={event => {
            event.preventDefault()
            const url = prependHttp(inputValue)
            onSubmit(isUrl(url) ? url : undefined)
          }}
        >
          <Input
            id='embed-demo-url'
            fontSize={2}
            iconComponent={<InputIcon value={inputValue} domain={domain} />}
            placeholder='Enter a URL...'
            suggestions={suggestions}
            value={inputValue}
            onChange={event => setInputValue(event.target.value)}
            width='12rem'
          />

          <Button ml={2} loading={isLoading}>
            <Caps fontSize={1} children='Embed it' />
          </Button>
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
            {view === 'normal' ? (
              <Box>
                <MicrolinkDebounce
                  loading={isLoading}
                  size='large'
                  url={prependHttp(inputValue)}
                  setData={() => data}
                  media={['video', 'audio', 'image', 'logo']}
                />
                <Flex pt={3} alignItems='center' justifyContent='center'>
                  <CodeEditor language='bash'>
                    {`<Microlink size='large' url='${inputValue ||
                      demoLink.data
                        .url}' media={['audio', 'video', 'image', 'logo']} />`}
                  </CodeEditor>
                </Flex>
              </Box>
            ) : data.iframe ? (
              <Flex
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
              >
                <IframeInline
                  dangerouslySetInnerHTML={{ __html: data.iframe }}
                />
                <Flex pt={3} alignItems='center' justifyContent='center'>
                  <CodeEditor language='bash' children={demoLink.data.iframe} />
                </Flex>
              </Flex>
            ) : (
              <Flex
                border={3}
                borderColor='gray5'
                justifyContent='center'
                alignItems='center'
                width={CodeEditor.width}
                height={CodeEditor.height}
              >
                <Text fontSize={2} color='gray6'>
                  not supported
                </Text>
              </Flex>
            )}
            <Flex justifyContent='flex-end'>
              <Card.Option
                children='normal'
                value={view}
                onClick={() => setView('normal')}
              />
              <Card.Option
                children='iframe'
                value={view}
                onClick={() => setView('iframe')}
              />
            </Flex>
          </Flex>
        </Box>
      </Container>
    </>
  )
}

const fadeIn = css`
  will-change: opacity, transform;
  animation: ${fadeInDown} 300ms;
  animation-fill-mode: both;
`

const AnimatedHeading = styled(Heading)`
  ${fadeIn};
`

const Resume = () => {
  const words = [
    'beauty link previews',
    'native embeds',
    'builtin media player',
    'easily customizable',
    'lazy fetching',
    'mobile ready'
  ]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setIndex(index => (index + 1) % words.length),
      2500
    )
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatedBox>
      <Block
        bg='#4e54c8'
        id='average'
        flexDirection='column'
        pb={0}
        blockOne={
          <Box>
            <Flex alignItems='center' justifyContent='center'>
              <Heading
                color='white'
                variant={null}
                mr={[1, 1, 3, 3]}
                fontWeight='light'
              >
                All the data. Unified. Effortless.
              </Heading>
            </Flex>
            <Caption
              color='white'
              maxWidth={[6, 7, 7, 'inherit']}
              mt={[3, 3, 3, 0]}
              variant={null}
              titleExclude={['Oembed', 'Meta Tags']}
            >
              Open Graph, JSON+LD, Oembed & HTML.
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
              <AnimatedHeading
                pt={[4, 4, 5, 5]}
                pb={[3, 3, 0, 0]}
                key={words[index]}
                color='white'
                variant={null}
                fontWeight='bold'
                children={words[index]}
              />
            </Flex>
            <Flex alignItems='baseline'>
              <Flex
                alignItems='center'
                justifyContent='center'
                flexDirection='column'
              >
                <Heading color='white' variant={null} mr={3} fontWeight='bold'>
                  {'<1'}
                  <Caption
                    ml={2}
                    color='white'
                    display='inline'
                    fontWeight='bold'
                    titleExclude={['seg']}
                  >
                    seg
                  </Caption>
                </Heading>
                <Caption
                  color='white'
                  variant={null}
                  mr={3}
                  fontWeight='light'
                  titleExclude={['p95']}
                >
                  response time.
                </Caption>
              </Flex>
              <Box px={4} mx='auto' />
              <Flex
                pt={[3, 3, 5, 5]}
                alignItems='center'
                justifyContent='center'
                flexDirection='column'
              >
                <Heading color='white' variant={null} mr={3} fontWeight='bold'>
                  {'99.9'}
                  <Caption
                    ml={2}
                    color='white'
                    display='inline'
                    fontWeight='bold'
                    children='%'
                  />
                </Heading>
                <Caption
                  color='white'
                  variant={null}
                  mr={3}
                  fontWeight='light'
                  titleExclude={['p95']}
                >
                  Uptime.
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
    <Resume />
    {/* <Examples demoLinks={demoLinks} /> */}
  </>
)
