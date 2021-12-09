import { borders, breakpoints, layout, colors } from 'theme'
import React, { useMemo, useState } from 'react'
import isUrl from 'is-url-http/lightweight'
import { getApiUrl } from '@microlink/mql'
import humanizeUrl from 'humanize-url'
import prependHttp from 'prepend-http'
import pickBy from 'lodash/pickBy'
import { getDomain } from 'tldts'
import get from 'dlv'

import { Minimize as MinimizeIcon, Book as BookIcon } from 'react-feather'

import {
  Choose,
  Box,
  Button,
  Caps,
  Card,
  CodeEditor,
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
  Text
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

import { useHealthcheck, useQueryState, useWindowSize } from 'components/hook'

import demoLinks from '../../data/demo-links'

const SMALL_BREAKPOINT = Number(breakpoints[0].replace('px', ''))

const getMs = str => str.replace(/ms|s/, '')

const LogoPlaceholder = props => {
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
        width={[3, 3, '60%', '60%']}
        style={{ opacity: 0.3, filter: 'grayscale(100%)' }}
        alt='Paste your URL'
        src='https://cdn.microlink.io/illustrations/abstract-no-messages.svg'
      />
      <Text pt={[2, 2, 4, 4]} fontSize={[2, 2, 4, 4]} color='black40'>
        Paste your URL
      </Text>
    </Flex>
  )
}

const LiveDemo = ({ data, query, suggestions, onSubmit, isLoading }) => {
  const size = useWindowSize()
  const logoUrl = get(data, 'logo.url')

  const cardBase = size.width < SMALL_BREAKPOINT ? 1.2 : 2
  const cardWidth = size.width / cardBase
  const cardHeight = cardWidth / Card.ratio

  const [inputUrl, setInputUrl] = useState(query.url || '')

  const domain = useMemo(() => getDomain(inputUrl), [inputUrl])

  const values = useMemo(() => {
    const preprendUrl = prependHttp(inputUrl)

    return pickBy({
      url: isUrl(preprendUrl) ? preprendUrl : undefined
    })
  }, [inputUrl])

  const suggestionUrl = React.useMemo(() => {
    const { url } = values
    const item = SUGGESTIONS.find(item => item.url === url)
    return item ? item.cdnUrl : undefined
  }, [values])

  const embedUrl = useMemo(() => {
    const { url, ...opts } = values
    if (!url) return
    const [embedUrl] = getApiUrl(url, {
      ...opts,
      meta: true,
      embed: 'logo.url'
    })
    return embedUrl
  }, [values])

  const handleSubmit = event => {
    event.preventDefault()
    const { url, ...opts } = values
    return onSubmit(url, opts)
  }

  return (
    <Container alignItems='center' pt={[2, 2, 3, 3]}>
      <Heading px={5} titleize={false} maxWidth={layout.large}>
        Logo made simple
      </Heading>
      <Caption
        pt={[3, 3, 4, 4]}
        px={[4, 4, 0, 0]}
        titleize={false}
        maxWidth={[layout.small, layout.small, layout.small, layout.small]}
      >
        Simplify your workflow, use less to get more – Get the logo of any URL,
        in a simple way.
      </Caption>
      <Flex
        alignItems={['center', undefined, undefined, undefined]}
        flexDirection={['column', 'row', 'row', 'row']}
        pt={[3, 3, 4, 4]}
      >
        <ArrowLink pr={[0, 4, 4, 4]} href='/docs/api/parameters/meta'>
          Get Started
        </ArrowLink>
        <ArrowLink
          pt={[3, 0, 0, 0]}
          href='https://github.com/microlinkhq/browserless'
        >
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
          onSubmit={handleSubmit}
        >
          <Box mb={[3, 3, 0, 0]}>
            <Input
              fontSize={2}
              iconComponent={<InputIcon domain={domain} />}
              id='url-demo-url'
              placeholder='Visit URL'
              suggestions={suggestions.map(
                ({ cdnUrl, filename, ...suggestion }) => suggestion
              )}
              type='text'
              value={inputUrl}
              onChange={event => setInputUrl(event.target.value)}
              width={['100%', '100%', '118px', '118px']}
              autoFocus
            />
          </Box>

          <Button ml={[0, 0, 2, 2]} loading={isLoading}>
            <Caps fontSize={1}>Get it</Caps>
          </Button>
        </Flex>
      </Flex>

      <Flex pb={[4, 4, 5, 5]}>
        <Choose>
          <Choose.When condition={!!suggestionUrl || !!logoUrl}>
            <Flex flexDirection='column' alignItems='center'>
              <Flex flexDirection={['column', 'row']} alignItems='center'>
                {[128, 64, 32].map((size, i, sizes) => (
                  <Box
                    mb={[4, 0]}
                    mr={[0, i < sizes.length - 1 ? 4 : 0]}
                    key={size}
                  >
                    <Image width={`${size}px`} src={logoUrl} mx='auto' />
                    <Text fontFamily='mono' fontSize='12px' textAlign='center'>
                      {size}x{size}
                    </Text>
                  </Box>
                ))}
              </Flex>
              <Box pt={4}>
                <CodeEditor width={cardWidth} language='html'>
                  {`<iframe src="${embedUrl}"></iframe>`}
                </CodeEditor>
              </Box>
            </Flex>
          </Choose.When>
          <Choose.Otherwise>
            <LogoPlaceholder height={cardHeight} width={cardWidth} />
          </Choose.Otherwise>
        </Choose>
      </Flex>
    </Container>
  )
}

const Timings = props => {
  const healthcheck = useHealthcheck()

  const blockOne = (
    <Flex
      as='section'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
    >
      <Subhead fontSize={[3, 4, 6, 6]} color='white' titleize={false}>
        Speed as feature
      </Subhead>
      <Subhead
        fontSize={[3, 4, 6, 6]}
        px={[4, 0, 0, 0]}
        titleize={false}
        color='white60'
      >
        Performance matters
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
          {getMs(healthcheck.pdf.p95_pretty)}
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
        <Caption as='div' color='white60' fontWeight='bold' pt={2}>
          <Caps fontSize={[0, 2, 2, 2]}>P95</Caps>
          <Caps fontSize={[0, 2, 2, 2]}>response time</Caps>
        </Caption>
      </Flex>
      <Hide breakpoints={[0, 1]}>
        <Flex
          display='inline-flex'
          px={[2, 2, 2, 5]}
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
        >
          <Subhead as='div' color='white' fontWeight='bold'>
            <Average value={healthcheck.pdf.avg_pretty} />
          </Subhead>
          <Caption as='div' color='white60' fontWeight='bold' titleize={false}>
            <Caps fontSize={[0, 2, 2, 2]}>average</Caps>
            <Caps fontSize={[0, 2, 2, 2]}>response time</Caps>
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
        <Caption as='div' color='white60' mr={3} fontWeight='bold' pt={2}>
          <Caps fontSize={[0, 2, 2, 2]}>SLA</Caps>
          <Caps fontSize={[0, 2, 2, 2]}>Guaranteed</Caps>
        </Caption>
      </Flex>
    </Flex>
  )

  return (
    <Block
      id='timings'
      width='100%'
      flexDirection='column'
      blockOne={blockOne}
      blockTwo={blockTwo}
      {...props}
    />
  )
}

const SUGGESTIONS = [
  'instagram',
  'soundcloud',
  'spotify',
  'theverge',
  'youtube'
].map(id => {
  const { data } = demoLinks.find(item => item.id === id)
  return { value: humanizeUrl(data.url), data }
})

const LogoPage = () => {
  const [query] = useQueryState()

  return (
    <Layout>
      <FetchProvider mqlOpts={{ meta: true }}>
        {({ status, doFetch, data }) => {
          const isLoading = status === 'fetching'

          return (
            <>
              <LiveDemo
                query={query}
                onSubmit={doFetch}
                isLoading={isLoading}
                suggestions={SUGGESTIONS}
                data={data}
              />
              <Timings
                pt={Container.defaultProps.pt}
                pb={Container.defaultProps.pt}
                backgroundColor='rgb(108, 28, 108)'
                borderTop={`${borders[1]} ${colors.white20}`}
                borderBottom={`${borders[1]} ${colors.white20}`}
              />
            </>
          )
        }}
      </FetchProvider>
    </Layout>
  )
}

export default LogoPage
