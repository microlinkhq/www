import * as Logo from 'components/logos'
import React, { Fragment } from 'react'
import { borders, colors } from 'theme'
import humanizeUrl from 'humanize-url'
import styled from 'styled-components'
import { getHostname } from 'helpers'
import { Plus } from 'react-feather'
import { navigate } from 'gatsby'
import { get } from 'lodash'

import { useQueryState, useFeatures } from 'components/hook'

import {
  Text,
  Box,
  Heading,
  Container as ContainerBase,
  Image,
  Subhead,
  Flex,
  Link,
  Caps,
  Terminal,
  ButtonSecondary,
  ButtonPrimary,
  CodeEditor,
  Hide
} from 'components/elements'

import { Header, Grid } from 'components/patterns'

const Container = ({ children, maxWidth, ...props }) => (
  <Box as='article' px={4} pt={[4, 5]} pb={[4, 5]} {...props}>
    <ContainerBase children={children} maxWidth={maxWidth} />
  </Box>
)

const HeroHeader = ({ title, caption }) => {
  return (
    <Flex
      as='header'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      px={0}
    >
      {title}
      <Subhead
        maxWidth={5}
        pt={4}
        px={4}
        color={colors.gray5}
        textAlign='center'
        children={caption}
        fontWeight='normal'
      />
    </Flex>
  )
}

const Hero = ({ humanizedUrl, brand, data }) => {
  const caption = (
    <Fragment>
      Take{' '}
      <Subhead as='span' color='black' fontWeight='bold'>
        {humanizedUrl}
      </Subhead>{' '}
      screenshot
    </Fragment>
  )

  const logoProvider = (() => {
    const LogoProvider = Logo[brand]
    if (LogoProvider) return <LogoProvider size={72} state='hover' />

    const logoUrl = get(data, 'logo.url')

    if (logoUrl && !logoUrl.endsWith('ico')) {
      return <Image size={72} src={logoUrl} />
    }
  })()

  const title = (
    <Box>
      <Flex alignItems='center' justifyContent='center'>
        <Logo.Microlink size={72} />
        {logoProvider && (
          <Box mx={3}>
            <Plus color={colors.gray5} />
          </Box>
        )}

        {logoProvider}
      </Flex>
    </Box>
  )

  return (
    <Fragment>
      <Container id='hero'>
        <HeroHeader title={title} caption={caption} />
        <Link href={data.screenshot.url}>
          <Image pt={4} px={4} src={data.screenshot.url} />
        </Link>
      </Container>
    </Fragment>
  )
}

const Subheader = ({ children }) => (
  <Fragment>
    <Subhead fontSize={1} color='secondary'>
      <Caps as='span' children={children[0]} />
    </Subhead>
    <Heading mt={1} fontSize={[3, 4]} variant={null} children={children[1]} />
  </Fragment>
)

const Features = ({ children }) => (
  <Container id='features'>
    <Header title='Features' caption='Capabilities under the hood.' />
    <Box as='section' pt={4}>
      <Hide breakpoints={[0, 1]}>
        <Grid children={children} itemsPerRow={3} />
      </Hide>
      <Hide breakpoints={[2, 3]}>
        <Grid children={children} itemsPerRow={1} />
      </Hide>
    </Box>
  </Container>
)

const API = ({ humanizedUrl, data }) => {
  const [query] = useQueryState()
  const browser = query.browser ? `&browser=${query.browser}` : ''
  const waitFor = query.waitFor ? `&waitFor=${query.waitFor}` : ''

  const apiUrl = `https://api.microlink.io?url=${
    data.url
  }&screenshot${browser}${waitFor}&embed=screenshot.url`

  const htmlCode = `
<!-- Shareable & SEO friendly screenshots  -->
<meta name="image" content="${apiUrl}">
<meta itemprop="image" content="${apiUrl}">
<meta property="og:image" content="${apiUrl}">
<meta name="twitter:image" content="${apiUrl}">`

  return (
    <Container
      id='sdk'
      maxWidth='100%'
      borderColor='pinkest'
      borderTop={borders[1]}
      borderBottom={borders[1]}
      bg='pinky'
    >
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        as='header'
      >
        <Subheader children={['Microlink API', 'Instant shareable content']} />

        <Box pb={5} px={4} textAlign={['inherit', 'center']}>
          <Box pt={4}>
            <Text mb={[4, 4, 4, 0]} maxWidth={8}>
              <Link href='/docs/api/getting-started/overview'>
                Microlink API
              </Link>{' '}
              allows you embed API calls directly in your HTML, automagically
              refreshing snapshots every hour.
            </Text>
          </Box>
          <Box pt={4}>
            <ButtonSecondary
              onClick={() => navigate('/docs/api/api-parameters/embed')}
            >
              <Caps fontSize={0} children='Explore Docs' />
            </ButtonSecondary>
            <ButtonPrimary
              ml={3}
              onClick={() => navigate('/docs/api/api-parameters/embed')}
            >
              <Caps fontSize={0} children='How to Embed' />
            </ButtonPrimary>
          </Box>
        </Box>

        <Box width={[350, 500, 700]}>
          <CodeEditor language='html' children={htmlCode} prettier={false} />
        </Box>
      </Flex>
    </Container>
  )
}

const SpanLabel = styled.span`
  background: ${colors.green5};
  color: white;
  padding: 0 8px;
  text-transform: uppercase;
`

const SpanKey = styled.span`
  color: ${colors.green5};
`

const Span = styled.span`
  color: ${colors.gray8};
`

const CLI = ({ humanizedUrl, data }) => {
  const [query] = useQueryState()
  const browser = query.browser ? `&browser=${query.browser}` : ''
  const waitFor = query.waitFor ? `&waitFor=${query.waitFor}` : ''
  const apiUrl = `https://api.microlink.io?url=${
    data.url
  }&screenshot${browser}${waitFor}&embed=screenshot.url`

  const cliCode = (
    <Fragment>
      <span>
        npx microlink-api {data.url}?&screenshot{browser}
        {waitFor}
        &embed=screenshot.url
      </span>
      <Image pt={3} width={300} src={data.screenshot.url} />
      <Box pt={3}>
        <SpanLabel>SUCCESS</SpanLabel> <Span>57.9 kB in 13830.018ms</Span>
      </Box>
      <Box pt={3}>
        <Box>
          <SpanKey>uri</SpanKey> <Span>{apiUrl}</Span>
        </Box>
        <Box>
          <SpanKey>cache</SpanKey> <Span>MISS</Span>
        </Box>
        <Box>
          <SpanKey>cache</SpanKey> <Span>prerender (4654.865ms)</Span>
        </Box>
      </Box>
    </Fragment>
  )

  return (
    <Container
      id='sdk'
      maxWidth='100%'
      borderColor='pinkest'
      borderTop={borders[1]}
      borderBottom={borders[1]}
      bg='pinky'
    >
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        as='header'
      >
        <Subheader
          children={['Microlink CLI', 'Powerful command-line interface']}
        />

        <Box pb={5} px={4} textAlign={['inherit', 'center']}>
          <Box pt={4}>
            <Text mb={[4, 4, 4, 0]} maxWidth={8}>
              Explore API Parameter using{' '}
              <Link href='/docs/api/getting-started/cli'>Microlink CLI</Link>{' '}
              from your terminal.
            </Text>
          </Box>
          <Box pt={4}>
            <ButtonSecondary
              onClick={() => navigate('/docs/api/getting-started/cli')}
            >
              <Caps fontSize={0} children='How to Use' />
            </ButtonSecondary>
            <ButtonPrimary
              ml={3}
              onClick={() => navigate('/docs/api/getting-started/overview')}
            >
              <Caps fontSize={0} children='See API Parameters' />
            </ButtonPrimary>
          </Box>
        </Box>

        <Box width={[350, 500, 700]}>
          <Terminal
            style={{ margin: '0' }}
            children={cliCode}
            blinkCursor={false}
          />
        </Box>
      </Flex>
    </Container>
  )
}

export default props => {
  const humanizedUrl = humanizeUrl(getHostname(props.data.url))

  return (
    <Fragment>
      <Hero humanizedUrl={humanizedUrl} {...props} />
      <API humanizedUrl={humanizedUrl} {...props} />
      <Features children={useFeatures()} />
      <CLI humanizedUrl={humanizedUrl} {...props} />
    </Fragment>
  )
}
