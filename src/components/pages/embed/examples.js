import {
  Box,
  Button,
  Caps,
  Card,
  Container,
  Flex,
  IframeInline,
  CodeEditor,
  Input,
  InputIcon,
  Text
} from 'components/elements'

import {
  Headline,
  SubHeadline,
  DemoLinks,
  Microlink
} from 'components/patterns'
import { debounceComponent, getDomain } from 'helpers'
import { borders, transition, colors } from 'theme'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import prependHttp from 'prepend-http'
import { navigate } from 'gatsby'
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

const Examples = ({ demoLinks }) => (
  <Container
    py={[4, 5]}
    px={4}
    maxWidth='100%'
    bg='pinky'
    borderTop={`${borders[1]} ${colors.pinkest}`}
    borderBottom={`${borders[1]} ${colors.pinkest}`}
  >
    <Headline
      pb={[3, 4]}
      title='Examples'
      caption='See real examples in action.'
    />
    <Box pt={[3, 4]}>
      <DemoLinks
        children={demoLinks}
        onClick={({ id }) => navigate(`/embed/${id}`)}
      />
    </Box>
  </Container>
)

const LiveDemo = ({ suggestions, demoLink, onSubmit, isLoading }) => {
  const [inputValue, setInputValue] = useState('')
  const [data, setData] = useState(demoLink.data)
  const [view, setView] = useState('sdk')
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
          title='Universal Embed'
          caption='Turn websites into rich media'
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
            {view === 'sdk' ? (
              <Box>
                <MicrolinkDebounce
                  loading={isLoading}
                  size='large'
                  url={prependHttp(inputValue)}
                  setData={() => data}
                  media={['audio', 'video', 'image', 'logo']}
                />
                <Flex pt={3} alignItems='center' justifyContent='center'>
                  <CodeEditor maxWidth={CodeEditor.width} language='bash'>
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
                  <CodeEditor
                    maxWidth={CodeEditor.width}
                    language='bash'
                    children={demoLink.data.iframe}
                  />
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
                children='sdk'
                value={view}
                onClick={() => setView('sdk')}
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
    <Examples demoLinks={demoLinks} />
  </>
)
