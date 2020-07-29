import { mqlCode, debounceComponent } from 'helpers'
import isUrl from 'is-url-http/lightweight'
import * as Icons from 'components/icons'
import React, { useState } from 'react'
import prependHttp from 'prepend-http'
import styled from 'styled-components'
import { Choose } from 'react-extras'
import { getDomain } from 'tldts'

import { useFeaturesMeta, useQueryState, useWindowSize } from 'components/hook'
import { layout, breakpoints, transition, shadows } from 'theme'

import {
  Box,
  Button,
  Caps,
  Card,
  Container,
  MultiCodeEditor,
  Flex,
  Input,
  InputIcon,
  Heading,
  Link,
  Subhead,
  Text
} from 'components/elements'

import {
  ArrowLink,
  Caption,
  Microlink,
  Layout,
  FetchProvider,
  Features
} from 'components/patterns'

import humanizeUrl from 'humanize-url'

import demoLinks from '../../data/demo-links'

const INITIAL_SUGGESTION = 'youtube'

const SUGGESTIONS = [
  'instagram',
  'soundcloud',
  'spotify',
  'theverge',
  'youtube'
].map(id => {
  const { data } = demoLinks.find(item => item.id === id)
  const { url } = data
  return { id, value: humanizeUrl(url), url, data }
})

const SMALL_BREAKPOINT = Number(breakpoints[0].replace('px', ''))
const MODES = ['preview', 'iframe']
const TYPES = ['render', 'code']

const INTEGRATIONS = [
  {
    logo: 'React',
    url: '/docs/sdk/integrations/react/'
  },
  {
    logo: 'Vue',
    url: '/docs/sdk/integrations/vue/'
  },
  {
    logo: 'JavaScript',
    url: '/docs/sdk/integrations/vanilla/'
  }
]

const MicrolinkCard = styled(Card)`
  &:hover {
    box-shadow: ${shadows[0]};
  }

  .microlink_card__iframe iframe {
    width: 100%;
    height: 100%;
  }
`

const MicrolinkDebounce = debounceComponent(styled(Microlink)`
  --microlink-max-width: 100%;
  --microlink-border-style: transparent;
  --microlink-hover-background-color: white;
`)

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

const LiveDemo = ({ query, suggestions, data, onSubmit, isLoading }) => {
  const size = useWindowSize({ width: 1440, height: 798 })

  const [mode, setMode] = useState(MODES[0])
  const [type, setType] = useState(TYPES[0])

  const cardBase = size.width < SMALL_BREAKPOINT ? 1.2 : 2.2
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

  const [inputValue, setInputValue] = useState(query.url || '')
  const domain = getDomain(inputValue)

  const media = [
    mode === 'iframe' && 'iframe',
    'video',
    'audio',
    'image',
    'logo'
  ].filter(Boolean)

  const targetUrlPrepend = prependHttp(data.url)

  return (
    <Container alignItems='center' pt={5}>
      <Heading titleize={false} maxWidth={layout.large}>
        Embed any content
      </Heading>

      <Caption
        pt={[3, 3, 4, 4]}
        px={[4, 4, 0, 0]}
        titleize={false}
        maxWidth={[layout.small, layout.small, layout.small, layout.small]}
      >
        Create beauty link previews — Microlink SDK turn your content into
        embeddable rich media.
      </Caption>

      <Flex
        alignItems={['center', undefined, undefined, undefined]}
        flexDirection={['column', 'row', 'row', 'row']}
        pt={[3, 3, 4, 4]}
      >
        <ArrowLink
          pr={[0, 4, 4, 4]}
          href='/docs/sdk/getting-started/overview/'
          children='Get Started'
        />
        <ArrowLink
          pt={[3, 0, 0, 0]}
          href='https://github.com/microlinkhq/sdk'
          children='View on GitHub'
        />
      </Flex>

      <Flex justifyContent='center' alignItems='center'>
        <Flex
          pt={[3, 3, 4, 4]}
          pb={[3, 3, 4, 4]}
          as='form'
          mx={[0, 'auto', 'auto', 'auto']}
          justifyContent='center'
          flexDirection={['column', 'row', 'row', 'row']}
          onSubmit={event => {
            event.preventDefault()
            const url = prependHttp(inputValue)
            onSubmit(isUrl(url) ? url : undefined)
          }}
        >
          <Box>
            <Input
              id='embed-demo-url'
              fontSize={2}
              iconComponent={<InputIcon domain={domain} />}
              placeholder='Enter a URL...'
              type='text'
              suggestions={suggestions}
              value={inputValue}
              onChange={event => setInputValue(event.target.value)}
              width={['100%', '180px', '180px', '180px']}
              autoFocus
            />
          </Box>
          <Button mt={[3, 0, 0, 0]} ml={[0, 2, 2, 2]} loading={isLoading}>
            <Caps fontSize={1} children='Embed it' />
          </Button>
        </Flex>
      </Flex>

      <Flex
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
        mx='auto'
      >
        <MicrolinkCard
          width={cardWidth}
          height={cardHeight}
          mode={mode}
          type={type}
        >
          <Choose>
            <Choose.When condition={type === 'render'}>
              <MicrolinkDebounce
                style={{ width: cardWidth, height: cardHeight }}
                key={targetUrlPrepend + mode}
                loading={isLoading}
                size='large'
                url={targetUrlPrepend}
                setData={() => data}
                media={media}
              />
            </Choose.When>
            <Choose.When condition={type === 'code'}>
              <MultiCodeEditor
                width='100%'
                languages={mqlCode(
                  {
                    url: data.url,
                    data: {
                      audio: true,
                      video: true,
                      meta: true
                    }
                  },
                  `audio: true,
    video: true,
    meta: true`
                )}
              />
            </Choose.When>
          </Choose>
        </MicrolinkCard>
        <Flex
          width='100%'
          pl='15px'
          pr='7px'
          alignItems={['center', undefined, undefined, undefined]}
          justifyContent='space-between'
          flexDirection={['column', 'row', 'row', 'row']}
        >
          <Box pt={[3, 4, 4, 4]}>
            {MODES.map(children => (
              <Card.Option
                key={children}
                value={mode}
                children={children}
                onClick={() => setMode(children)}
              />
            ))}
          </Box>
          <Box pt={[3, 4, 4, 4]}>
            {TYPES.map(children => (
              <Card.Option
                key={children}
                children={children}
                value={type}
                onClick={() => setType(children)}
              />
            ))}
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
}

const Integrations = () => {
  return (
    <Container
      id='integrations'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      pt={5}
    >
      <Subhead width='100%'>Built for developers</Subhead>

      <Flex pt={5} justifyContent='center' flexWrap='wrap'>
        {INTEGRATIONS.map(({ url, logo }) => {
          const LogoComponent = Icons[logo]

          return (
            <Card
              key={logo}
              flexDirection='column'
              justifyContent='center'
              ratio={[0.45, 0.45, 0.45, 0.45]}
              mb={4}
              mr={4}
            >
              <Link href={url}>
                <Flex justifyContent='center'>
                  <LogoComponent width={['40px', '40px', '40px', '40px']} />
                </Flex>
                <Flex
                  pt={4}
                  width='100%'
                  justifyContent='center'
                  flexDirection='column'
                  alignItems='center'
                >
                  <Text color='black' fontWeight='bold'>
                    Microlink SDK
                  </Text>
                  <Text color='black'>for {logo}</Text>
                </Flex>
              </Link>
            </Card>
          )
        })}
      </Flex>

      <Flex
        alignItems={['center', undefined, undefined, undefined]}
        flexDirection={['column', 'row', 'row', 'row']}
        pt={[3, 3, 4, 4]}
      >
        <ArrowLink href='/docs/sdk/' children='See more integrations' />
      </Flex>
    </Container>
  )
}

export default () => {
  const demoLink = demoLinks.find(
    demoLink => demoLink.id === INITIAL_SUGGESTION
  )

  const [query] = useQueryState()

  return (
    <Layout>
      <FetchProvider
        mqlOpts={{ palette: true, audio: true, video: true, iframe: true }}
      >
        {({ status, doFetch, data }) => {
          const isLoading = status === 'fetching'
          return (
            <>
              <LiveDemo
                query={query}
                isLoading={isLoading}
                suggestions={SUGGESTIONS}
                data={data || demoLink.data}
                onSubmit={doFetch}
                url={query.url}
              />
              <Integrations />
              <Features
                title={
                  <>
                    <Subhead width='100%' textAlign='left'>
                      You call the API,
                    </Subhead>
                    <Subhead
                      color='secondary'
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
                    No more configuring auto-scaling, load balancers, or paying
                    for capacity you don’t use — Microlink is the fastest, cost
                    effective solution for data extraction at any scale, fully
                    customizable via{' '}
                    <Link href='/docs/api/getting-started/overview'>API</Link>.
                  </>
                }
                features={useFeaturesMeta()}
              />
            </>
          )
        }}
      </FetchProvider>
    </Layout>
  )
}
