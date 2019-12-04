import { aspectRatio, screenshotUrl, getDomain } from 'helpers'
import * as Logo from 'components/logos'
import { borders, colors } from 'theme'
import styled from 'styled-components'
import { Plus } from 'react-feather'
import { navigate } from 'gatsby'
import get from 'dlv'
import React from 'react'

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
  Button,
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
        px={5}
        color={colors.gray}
        textAlign='center'
        children={caption}
        fontWeight='normal'
      />
    </Flex>
  )
}

const Hero = ({ domain, brand, data }) => {
  const caption = (
    <>
      Turn{' '}
      <Subhead
        as='span'
        color='black'
        fontWeight='regular'
        titleExclude={[domain]}
      >
        {domain}
      </Subhead>{' '}
      into a screenshot
    </>
  )

  const logoProvider = (() => {
    const LogoProvider = Logo[brand]
    if (LogoProvider) {
      return (
        <LogoProvider height='100%' width={['36px', '72px']} state='hover' />
      )
    }

    const logoUrl = get(data, 'logo.url')

    if (logoUrl && !logoUrl.endsWith('ico')) {
      return (
        <Image
          height='100%'
          width={['36px', '72px']}
          src={logoUrl}
          lazy={false}
        />
      )
    }
  })()

  const title = (
    <Box>
      <Flex alignItems='center' justifyContent='center'>
        <Logo.Microlink width={['36px', '72px']} />
        {logoProvider && (
          <Box ml={3} mr={3}>
            <Plus color={colors.gray} />
          </Box>
        )}

        {logoProvider}
      </Flex>
    </Box>
  )

  return (
    <>
      <Container id='hero'>
        <HeroHeader title={title} caption={caption} />
        <Link href={data.screenshot.url}>
          <Image
            lazy={false}
            key={data.screenshot.url}
            mt={4}
            pl={4}
            pr={4}
            src={data.screenshot.url}
          />
        </Link>
      </Container>
    </>
  )
}

const Subheader = ({ children }) => (
  <>
    <Subhead fontSize={1} color='secondary'>
      <Caps as='span' children={children[0]} />
    </Subhead>
    <Heading mt={1} fontSize={[3, 4]} variant={null} children={children[1]} />
  </>
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

const Api = ({ domain, data }) => {
  const [query] = useQueryState()
  const apiUrl = screenshotUrl(data.url, query)

  const seoCode = `
<!-- Meta & SEO Tags  -->
<meta name="image" content="${apiUrl}">
<meta itemprop="image" content="${apiUrl}">
<meta property="og:image" content="${apiUrl}">
<meta name="twitter:image" content="${apiUrl}">

<!-- regular HTML Tags  -->
<img src="${apiUrl}" />`

  const cssCode = `
.screenshot {
  background-image: url(${apiUrl});
}`

  const mdCode = `![Screenshot](${apiUrl})`

  return (
    <Container
      id='sdk'
      maxWidth='100%'
      borderTop={`${borders[1]} ${colors.pinkest}`}
      borderBottom={`${borders[1]} ${colors.pinkest}`}
      bg='pinky'
    >
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        as='header'
      >
        <Subheader children={['Microlink API', 'Instant shareable content']} />

        <Box pb={4} px={4} textAlign={['inherit', 'center']}>
          <Box pt={4}>
            <Text mb={[4, 4, 4, 0]} maxWidth={8}>
              <Link href='/docs/api/getting-started/overview'>
                Microlink API
              </Link>{' '}
              allows you embed API calls directly in your HTML, automagically
              refreshing snapshots every hour.
            </Text>
          </Box>
          <Box pt={[0, 4]} textAlign='center'>
            <Button onClick={() => navigate('/docs/api/parameters/embed')}>
              <Caps fontSize={0} children='Explore Docs' />
            </Button>
            <Button
              ml={3}
              onClick={() => navigate('/docs/api/parameters/embed')}
            >
              <Caps fontSize={0} children='How to Embed' />
            </Button>
          </Box>
        </Box>

        <Box width={[350, 500, 700]}>
          <Subhead
            children='Using HTML'
            pt={4}
            pb={3}
            textAlign='left'
            fontSize={[1, 2]}
          />
          <CodeEditor language='html' children={seoCode} prettier={false} />
        </Box>
        <Box width={[350, 500, 700]}>
          <Subhead
            children='Using CSS'
            pt={4}
            pb={3}
            textAlign='left'
            fontSize={[1, 2]}
          />
          <CodeEditor language='css' children={cssCode} prettier={false} />
        </Box>
        <Box width={[350, 500, 700]}>
          <Subhead
            children='Using Markdown'
            pt={4}
            pb={3}
            textAlign='left'
            fontSize={[1, 2]}
          />
          <CodeEditor language='markdown' children={mdCode} prettier={false} />
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

const Cli = ({ domain, data }) => {
  const [query] = useQueryState()
  const browser = query.browser ? `&overlay.browser=${query.browser}` : ''
  const waitFor = query.waitFor ? `&waitFor=${query.waitFor}` : ''
  const apiUrl = `https://api.microlink.io?url=${data.url}&screenshot${browser}${waitFor}&embed=screenshot.url`

  const cliCode = (
    <>
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
    </>
  )

  return (
    <Container
      id='cli'
      maxWidth='100%'
      borderTop={`${borders[1]} ${colors.pinkest}`}
      borderBottom={`${borders[1]} ${colors.pinkest}`}
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
            <Button onClick={() => navigate('/docs/api/getting-started/cli')}>
              <Caps fontSize={0} children='How to Use' />
            </Button>
            <Button
              ml={3}
              onClick={() => navigate('/docs/api/getting-started/overview')}
            >
              <Caps fontSize={0} children='See API Parameters' />
            </Button>
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
  const domain = getDomain(props.data.url)

  return (
    <>
      <Hero domain={domain} {...props} />
      <Api domain={domain} {...props} />
      <Features children={useFeatures()} />
      <Cli domain={domain} {...props} />
    </>
  )
}
