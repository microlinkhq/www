import React, { useMemo, useState, useEffect } from 'react'
import { useMounted } from 'components/hook/use-mounted'
import { useQueryState } from 'components/hook/use-query-state'
import isUrl from 'is-url-http/lightweight'
import { mqlCode } from 'helpers/mql-code'
import { HourGlass } from 'components/icons/HourGlass'
import { JavaScript } from 'components/icons/JavaScript'
import { Jekyll } from 'components/icons/Jekyll'
import { Vue } from 'components/icons/Vue'
import { Hugo } from 'components/icons/Hugo'
import { Eleventy } from 'components/icons/Eleventy'
import { _React as ReactIcon } from 'components/icons/React'
import { cdnUrl } from 'helpers/cdn-url'
import prependHttp from 'prepend-http'
import styled from 'styled-components'
import humanizeUrl from 'humanize-url'
import { layout, theme } from 'theme'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Card from 'components/elements/Card/Card'
import Choose from 'components/elements/Choose'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import Input from 'components/elements/Input/Input'
import InputIcon from 'components/elements/Input/InputIcon'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import FetchProvider from 'components/patterns/FetchProvider'
import Layout from 'components/patterns/Layout'
import Microlink from 'components/patterns/Microlink/Microlink'
import MultiCodeEditor from 'components/patterns/MultiCodeEditor/MultiCodeEditor'

import demoLinks from '../../data/demo-links'

const Icons = {
  HourGlass,
  JavaScript,
  Jekyll,
  Vue,
  Hugo,
  Eleventy,
  React: ReactIcon
}

const Heading = withTitle(HeadingBase)
const Subhead = withTitle(SubheadBase)

const Caption = withTitle(CaptionBase)

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
    maxw-width: 650px;
  }
`

const LinkPreview = styled(Microlink)`
  --microlink-max-width: 100%;
  --microlink-border-style: transparent;
  --microlink-hover-background-color: white;
`

const LiveDemo = React.memo(function LiveDemo ({
  data,
  isInitialData,
  isLoading,
  onSubmit,
  query
}) {
  const isMounted = useMounted()
  const [mode, setMode] = useState(MODES[0])
  const [type, setType] = useState(TYPES[0])
  const [minHeight, setMinHeight] = useState(0)

  useEffect(() => {
    if (isMounted) {
      const card = document.querySelector('.microlink_card')
      if (card) {
        setMinHeight(card.getBoundingClientRect().height - 36 * 2 - 8 * 2)
      }
    }
  }, [isMounted])

  const [inputUrl, setInputUrl] = useState('')

  useEffect(() => {
    setInputUrl(query.url || '')
  }, [query])

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
    <Flex
      as='section'
      css={theme({ flexDirection: 'column', alignItems: 'center' })}
    >
      <Heading css={theme({ px: 5, maxWidth: layout.large })} titleize={false}>
        Embed any content
      </Heading>

      <Caption
        forwardedAs='h2'
        css={theme({
          pt: [3, 3, 4, 4],
          px: 4,
          maxWidth: layout.small
        })}
        titleize={false}
      >
        Create beautiful link previews — Turn your content into embeddable rich
        media.
      </Caption>

      <Flex
        css={theme({
          alignItems: ['center', null],
          flexDirection: ['column', 'row'],
          pt: [3, 3, 4, 4],
          fontSize: [2, 2, 3, 3],
          gap: [3, 4]
        })}
      >
        <ArrowLink href='/docs/sdk/getting-started/overview/'>
          Get Started
        </ArrowLink>
        <ArrowLink href='https://github.com/microlinkhq/sdk'>
          See on GitHub
        </ArrowLink>
      </Flex>

      <Flex css={{ justifyContent: 'center', alignItems: 'center' }}>
        <Flex
          as='form'
          css={theme({
            py: [3, 3, 4, 4],
            mx: [0, 'auto'],
            justifyContent: 'center',
            flexDirection: ['column', 'row', 'row', 'row'],
            gap: [3, 2]
          })}
          onSubmit={event => {
            event.preventDefault()
            const url = prependHttp(inputUrl)
            onSubmit(isUrl(url) ? url : undefined)
          }}
        >
          <Box>
            <Input
              id='sdk-demo-url'
              css={theme({
                fontSize: 2,
                width: ['100%', '100%', 128, 128]
              })}
              iconComponent={
                <InputIcon
                  src={data?.logo?.url}
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
              autoFocus
            />
          </Box>
          <Button loading={isLoading}>
            <Caps css={theme({ fontSize: 1 })}>Embed it</Caps>
          </Button>
        </Flex>
      </Flex>

      <Flex
        css={theme({
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          mx: 'auto'
        })}
      >
        <HeroCard
          css={theme({
            maxWidth: layout.small,
            border: type === 'code' ? 'inherit' : undefined
          })}
        >
          <Choose>
            <Choose.When condition={type === 'render'}>
              <LinkPreview
                key={`${url}_${media.join('_')}`}
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
                css={{ width: '100%' }}
                interactive={{ minHeight }}
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
          css={theme({
            width: '100%',
            pl: '15px',
            pr: '7px',
            alignItems: ['center', undefined, undefined, undefined],
            justifyContent: 'space-between',
            flexDirection: 'row'
          })}
        >
          <Box css={theme({ pt: [3, 4] })}>
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
          <Box css={theme({ pt: [3, 4] })}>
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
    </Flex>
  )
})

const Integrations = () => {
  return (
    <Container
      as='section'
      id='integrations'
      css={theme({
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pt: 5
      })}
    >
      <Subhead css={{ width: '100%' }}>Built for developers</Subhead>

      <Flex
        css={theme({
          pt: 5,
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 4
        })}
      >
        {INTEGRATIONS.map(({ url, logo }) => {
          const LogoComponent = Icons[logo]

          return (
            <Card
              key={logo}
              css={{ flexDirection: 'column', justifyContent: 'center' }}
              ratio={[0.45, 0.45, 0.45, 0.45]}
            >
              <Link href={url}>
                <Flex css={{ justifyContent: 'center' }}>
                  <LogoComponent width='40px' />
                </Flex>
                <Flex
                  css={theme({
                    pt: 4,
                    width: '100%',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    alignItems: 'center'
                  })}
                >
                  <Text css={theme({ color: 'black', fontWeight: 'bold' })}>
                    Microlink SDK
                  </Text>
                  <Text css={theme({ color: 'black' })}>for {logo}</Text>
                </Flex>
              </Link>
            </Card>
          )
        })}
      </Flex>

      <Box css={theme({ fontSize: [2, 2, 3], pt: [3, 3, 4] })}>
        <ArrowLink href='/docs/sdk/getting-started/overview/'>
          See more integrations
        </ArrowLink>
      </Box>
    </Container>
  )
}

export const Head = () => (
  <Meta
    title='SDK'
    description='Embed any content. Create beauty link previews. Turn your content into embeddable rich media.'
    image={cdnUrl('banner/sdk.jpeg')}
  />
)

const SdkPage = () => {
  const [query] = useQueryState()
  const isMounted = useMounted()
  const hasQuery = isMounted && !!query?.url

  return (
    <Layout>
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
                query={isMounted ? query : {}}
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
