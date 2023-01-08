import { useQueryState, useWindowSize } from 'components/hook'
import { layout, breakpoints, transition } from 'theme'
import React, { useMemo, useState } from 'react'
import isUrl from 'is-url-http/lightweight'
import { cdnUrl, mqlCode } from 'helpers'
import * as Icons from 'components/icons'
import prependHttp from 'prepend-http'
import styled from 'styled-components'
import humanizeUrl from 'humanize-url'

import {
  Box,
  Choose,
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
  FetchProvider
} from 'components/patterns'

import demoLinks from '../../data/demo-links'

const INITIAL_SUGGESTION = 'youtube'

const DEMO_LINK = demoLinks.find(demoLink => demoLink.id === INITIAL_SUGGESTION)

const SUGGESTIONS = [
  'instagram',
  'soundcloud',
  'spotify',
  'theverge',
  'youtube'
].map(id => {
  const { data } = demoLinks.find(item => item.id === id)
  return { value: humanizeUrl(data.url) }
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

const HeroCard = styled(Card)`
  .microlink_card__iframe,
  .microlink_card__iframe iframe,
  .microlink_card {
    width: 100%;
    height: 100%;
  }
`

const LinkPreview = styled(Microlink)`
  --microlink-max-width: 100%;
  --microlink-border-style: transparent;
  --microlink-hover-background-color: white;
`

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

const LiveDemo = React.memo(function LiveDemo ({
  data,
  isInitialData,
  isLoading,
  onSubmit,
  query
}) {
  const size = useWindowSize()
  const [mode, setMode] = useState(MODES[0])
  const [type, setType] = useState(TYPES[0])

  const cardBase = size.width < SMALL_BREAKPOINT ? 1.2 : 3
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio
  const runkitHeight = cardHeight - 36 * 2 - 8 * 2

  const [inputUrl, setInputUrl] = useState(query.url || '')

  const url = useMemo(() => {
    const input = prependHttp(inputUrl)
    return isUrl(input) ? input : data.url
  }, [inputUrl, data])

  const media = [
    mode === 'iframe' && 'iframe',
    'video',
    'audio',
    'image',
    'logo'
  ].filter(Boolean)

  return (
    <Container as='section' alignItems='center' pt={2}>
      <Heading px={5} titleize={false} maxWidth={layout.large}>
        Embed any content
      </Heading>

      <Caption
        pt={[3, 3, 4, 4]}
        px={4}
        titleize={false}
        maxWidth={[layout.small, layout.small, layout.small, layout.small]}
      >
        Create beauty link previews — Turn your content into embeddable rich
        media.
      </Caption>

      <Flex
        alignItems={['center', undefined, undefined, undefined]}
        flexDirection={['column', 'row', 'row', 'row']}
        pt={[3, 3, 4, 4]}
      >
        <ArrowLink pr={[0, 4, 4, 4]} href='/docs/sdk/getting-started/overview/'>
          Get Started
        </ArrowLink>
        <ArrowLink pt={[3, 0, 0, 0]} href='https://github.com/microlinkhq/sdk'>
          See on GitHub
        </ArrowLink>
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
            const url = prependHttp(inputUrl)
            onSubmit(isUrl(url) ? url : undefined)
          }}
        >
          <Box>
            <Input
              id='sdk-demo-url'
              fontSize={2}
              iconComponent={
                <InputIcon
                  iconUrl={data?.logo?.url}
                  provider={!isInitialData && 'microlink'}
                  url={!isInitialData && url}
                />
              }
              placeholder='Visit URL'
              type='text'
              suggestions={SUGGESTIONS}
              value={inputUrl}
              onChange={event => {
                const url = event.target.value
                setInputUrl(url)
              }}
              width={['100%', '118px', '102px', '102px']}
              autoFocus
            />
          </Box>
          <Button mt={[3, 0, 0, 0]} ml={[0, 2, 2, 2]} loading={isLoading}>
            <Caps fontSize={1}>Embed it</Caps>
          </Button>
        </Flex>
      </Flex>

      <Flex
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
        mx='auto'
      >
        <HeroCard
          width={cardWidth}
          height={cardHeight}
          border={type === 'code' ? 'none' : 1}
        >
          <Choose>
            <Choose.When condition={type === 'render'}>
              <LinkPreview
                loading={isLoading ? true : undefined}
                size='large'
                url={data.url}
                fetchData={false}
                setData={() => data}
                media={media}
              />
            </Choose.When>
            <Choose.When condition={type === 'code'}>
              <MultiCodeEditor
                width='100%'
                interactive={{ minHeight: runkitHeight }}
                languages={mqlCode(
                  data.url,
                  {
                    audio: true,
                    video: true,
                    meta: true
                  },
                  `audio: true,
    video: true,
    iframe: ${mode === 'iframe'}
    meta: true`
                )}
              />
            </Choose.When>
          </Choose>
        </HeroCard>
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
                onClick={() => setMode(children)}
              >
                {children}
              </Card.Option>
            ))}
          </Box>
          <Box pt={[3, 4, 4, 4]}>
            {TYPES.map(children => (
              <Card.Option
                key={children}
                value={type}
                onClick={() => setType(children)}
              >
                {children}
              </Card.Option>
            ))}
          </Box>
        </Flex>
      </Flex>
    </Container>
  )
})

const Integrations = () => {
  return (
    <Container
      as='section'
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
                  <LogoComponent width='40px' />
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
        <ArrowLink href='/docs/sdk/getting-started/overview/'>
          See more integrations
        </ArrowLink>
      </Flex>
    </Container>
  )
}

const SdkPage = () => {
  const [query] = useQueryState()
  const hasQuery = !!query?.url

  return (
    <Layout
      head={{
        title: 'SDK',
        image: cdnUrl('banner/sdk.jpeg'),
        description:
          'Embed any content. Create beauty link previews. Turn your content into embeddable rich media.'
      }}
    >
      <FetchProvider>
        {({ status, doFetch, data }) => {
          const isLoading =
            (hasQuery && status === 'initial') || status === 'fetching'
          const unifiedData = data || DEMO_LINK.data
          const isInitialData = unifiedData.url === DEMO_LINK.data.url

          return (
            <>
              <LiveDemo
                data={unifiedData}
                isInitialData={isInitialData}
                isLoading={isLoading}
                onSubmit={doFetch}
                query={query}
              />
              <Integrations />
              {/* TODO: Add Hover banner */}
            </>
          )
        }}
      </FetchProvider>
    </Layout>
  )
}

export default SdkPage
