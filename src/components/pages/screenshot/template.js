import { LogoBrand, Microlink as MicrolinkLogo } from 'components/logos'
import { useQueryState, useFeaturesScreenshot } from 'components/hook'
import { screenshotUrl, getDomain } from 'helpers'
import { borders, colors } from 'theme'
import styled from 'styled-components'
import { Plus } from 'react-feather'
import { navigate } from 'gatsby'
import get from 'dlv'
import React from 'react'

import {
  Text,
  Box,
  Container,
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

import { Legend, Headline, SubHeadline, Grid } from 'components/patterns'

import { screenshotHeight } from 'components/pages/home/screenshots'

export const Screenshot = ({ domain, data, ...props }) => {
  return (
    <Link px={3} mt={3} href={data.screenshot.url}>
      <Image
        alt={`${domain} screenshot`}
        pl={0}
        pr={0}
        height={isLoading => (isLoading ? screenshotHeight : 'inherit')}
        key={data.screenshot.url}
        src={data.screenshot.url}
        style={isLoading => {
          if (isLoading) return
          return {
            padding: 0,
            border: `1px solid ${colors.black20}`
          }
        }}
        {...props}
      />
    </Link>
  )
}

const Hero = ({ domain, id, data }) => {
  const caption = (
    <Box maxWidth={5} pt={[2, 2, 4, 4]} px={5}>
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
    </Box>
  )

  const logoProvider = (() => {
    const LogoProvider = LogoBrand[id]
    if (LogoProvider) {
      return (
        <LogoProvider height='100%' width={['36px', '72px']} state='hover' />
      )
    }

    const logoUrl = get(data, 'logo.url')

    if (logoUrl && !logoUrl.endsWith('ico')) {
      return (
        <Image
          alt={`${domain} logo`}
          height='100%'
          width={['36px', '72px']}
          src={logoUrl}
        />
      )
    }
  })()

  return (
    <Container id='hero'>
      <Flex pt={[0, 0, 4, 4]} alignItems='center' justifyContent='center'>
        <MicrolinkLogo width={['36px', '72px']} />
        {logoProvider && <Box ml={3} mr={3} children={<Plus />} />}
        {logoProvider}
      </Flex>
      <SubHeadline pb={0} caption={caption} />
      <Screenshot domain={domain} data={data} mx='auto' pl={4} pr={4} />
    </Container>
  )
}

export const Features = ({ children }) => (
  <Container id='features' pb={[0, 0, 4, 4]}>
    <Headline
      pt={[0, 0, 4, 4]}
      title='Features'
      caption='Capabilities under the hood.'
    />
    <Box as='section' mx='auto' pt={[3, 4]}>
      <Hide breakpoints={[0, 1]}>
        <Grid children={children} itemsPerRow={3} />
      </Hide>
      <Hide breakpoints={[2, 3]}>
        <Grid children={children} itemsPerRow={1} />
      </Hide>
    </Box>
  </Container>
)

const Api = ({ data }) => {
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
        pt={[0, 0, 4, 4]}
      >
        <Legend sup='Microlink API' title='Instant shareable content' />

        <Box pb={[0, 0, 4, 4]} px={4} textAlign='center'>
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

            <Link
              ml={3}
              onClick={() => navigate('/docs/api/parameters/embed')}
              display='inline-block'
            >
              <Caps fontWeight='regular' fontSize={0} children='How to embed' />
            </Link>
          </Box>
        </Box>

        <Box>
          <Subhead
            children='Using HTML'
            pt={[4, 4, 0, 0]}
            pb={3}
            textAlign='left'
            fontSize={[1, 2]}
          />
          <CodeEditor language='html' children={seoCode} prettier={false} />
        </Box>
        <Box>
          <Subhead
            children='Using CSS'
            pt={4}
            pb={3}
            textAlign='left'
            fontSize={[1, 2]}
          />
          <CodeEditor language='css' children={cssCode} prettier={false} />
        </Box>
        <Box pb={4}>
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
      <Image
        alt={`${domain} screenshot`}
        pt={3}
        width={300}
        src={data.screenshot.url}
      />
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
        pt={[0, 0, 4, 4]}
      >
        <Legend sup='Microlink CLI' title='Powerful command-line interface' />

        <Box pb={[0, 0, 4, 4]} px={4} textAlign='center'>
          <Box pt={4}>
            <Text mb={[4, 4, 4, 0]} maxWidth={8}>
              <Link href='/docs/api/getting-started/cli'>Microlink CLI</Link>{' '}
              enables third party integration for any software or platform from
              your friendly terminal.
            </Text>
          </Box>
          <Box pt={[0, 4]} pb={[4, 4, 0, 0]} textAlign='center'>
            <Button onClick={() => navigate('/docs/api/getting-started/cli')}>
              <Caps fontSize={0} children='Install CLI' />
            </Button>

            <Link
              ml={3}
              onClick={() => navigate('/docs/api/getting-started/overview')}
              display='inline-block'
            >
              <Caps fontWeight='regular' fontSize={0} children='Read Docs' />
            </Link>
          </Box>
        </Box>

        <Box pb={4}>
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
      <Api {...props} />
      <Hide breakpoints={[0, 1]}>
        <Features children={useFeaturesScreenshot()} />
      </Hide>
      <Cli domain={domain} {...props} />
    </>
  )
}
