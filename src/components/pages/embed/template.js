import { useFeatures } from 'components/hook'
import * as Logo from 'components/logos'
import React, { Fragment } from 'react'
import humanizeUrl from 'humanize-url'
import { getHostname } from 'helpers'
import { Plus } from 'react-feather'
import { navigate } from 'gatsby'
import { colors } from 'theme'
import { get } from 'lodash'

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
  MultiCodeEditor,
  CodeEditor,
  Hide,
  ButtonSecondary
} from 'components/elements'

import { Header, Grid, Microlink } from 'components/patterns'

import prettier, { serializeObject, serializeFmt } from 'helpers/prettier'

const DEFAULT_LOGO = {
  url: 'https://cdn.microlink.io/logo/trim.png',
  width: 500,
  height: 500,
  type: 'png',
  size: 1448,
  size_pretty: '1.45 kB'
}

const generateMqlCode = props => `
const mql = require('@microlink/mql')
const { status, response, data } = await mql(
  '${props.url}'
)

console.log('status', status)
console.log('headers', response.headers)
console.log('data', data)
`

const generateLanguages = props => {
  const langReact = () =>
    prettier.js(`
import React from 'react'
import Microlink from '@microlink/react'

export default () => (
  <Microlink ${serializeFmt(props)} />
)
`)

  langReact.language = 'jsx'

  const langVanilla = () =>
    prettier.html(`
<script src="https://cdn.jsdelivr.net/combine/npm/react@16/umd/react.production.min.js,npm/react-dom@16/umd/react-dom.production.min.js,npm/@microlink/vanilla@4.0.0-alpha.3/dist/microlink.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('.link-previews', { ${serializeObject(props)} })
  })
</script>
`)

  langVanilla.language = 'html'

  return { React: langReact, HTML: langVanilla }
}

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
      Turn any{' '}
      <Subhead as='span' color='black' fontWeight='bold'>
        {humanizedUrl}
      </Subhead>{' '}
      link into structured data
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
        {/* <Box textAlign='center'>
          <Box pt={2} pb={3}>
            <Link href={data.url}>{humanizeUrl(data.url)}</Link>
            <Text pt={2} fontSize={2}>
              into rich media
            </Text>
          </Box>
          <Microlink url={data.url} />
        </Box> */}
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

const SDK = ({ humanizedUrl, data }) => (
  <Container
    id='sdk'
    maxWidth='100%'
    borderColor='pinkest'
    borderTop='1px solid'
    borderBottom='1px solid'
    bg='pinky'
  >
    <Flex
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      as='header'
    >
      <Subheader children={['Microlink SDK', 'Make your content attractive']} />

      <Box pb={4} px={4} textAlign={['inherit', 'center']}>
        <Box pt={4}>
          <Text mb={[4, 4, 4, 0]} maxWidth={8}>
            <Link href='/docs/sdk/getting-started/overview/'>
              Microlink SDK
            </Link>{' '}
            converts{' '}
            <Text color='black' fontWeight='bold' as='span'>
              {humanizedUrl}
            </Text>{' '}
            links into beautiful previews, engaging better your links.
          </Text>
        </Box>
        <Box pt={4}>
          <ButtonSecondary
            onClick={() => navigate('/docs/sdk/getting-started/overview/')}
          >
            <Caps fontSize={0} children='Explore Docs' />
          </ButtonSecondary>

          <Link ml={3} href='https://storybook.microlink.io' icon>
            <Caps fontWeight='regular' fontSize={0} children='See Examples' />
          </Link>
        </Box>
      </Box>
    </Flex>

    {[{ size: 'normal' }, { size: 'large' }].map(({ docLink, ...props }) => (
      <Flex
        flexDirection={['column', 'column', 'column', 'row']}
        justifyContent='space-evenly'
        alignItems='center'
        key={JSON.stringify(props)}
        mx='auto'
        mt={4}
      >
        <Box width={500}>
          <Text mb={1} color='gray8' fontSize={1}>
            {props.size}
          </Text>
          <Microlink
            setData={{ ...data, logo: data.logo || DEFAULT_LOGO }}
            {...props}
          />
        </Box>
        <Box mt={[3, 3, 3, 0]} width={500}>
          <MultiCodeEditor
            languages={generateLanguages({ ...props, url: data.url })}
          />
        </Box>
      </Flex>
    ))}
  </Container>
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

const API = ({ data }) => {
  return (
    <Container
      id='api'
      maxWidth='100%'
      borderColor='pinkest'
      borderTop='1px solid'
      borderBottom='1px solid'
      bg='pinky'
    >
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        as='header'
      >
        <Subheader children={['Microlink API', 'Build APIs from websites']} />

        <Box pb={4} px={4} textAlign={['inherit', 'center']}>
          <Box pt={4}>
            <Text mb={[4, 4, 4, 0]} maxWidth={8}>
              Microlink Query Language (
              <Link href='/docs/mql/getting-started/overview'>MQL</Link>) is a
              programmatic way to getting content from any URL.
            </Text>
          </Box>
          <Box pt={4}>
            <ButtonSecondary
              onClick={() => navigate('/docs/mql/getting-started/overview')}
            >
              <Caps fontSize={0} children='Explore Docs' />
            </ButtonSecondary>

            <Link ml={3} href='https://github.com/microlinkhq/mql-cli' icon>
              <Caps fontWeight='regular' fontSize={0} children='See Recipes' />
            </Link>
          </Box>
        </Box>
      </Flex>

      <Flex
        justifyContent='space-evenly'
        alignItems='center'
        mx='auto'
        flexDirection={['column', 'column', 'column', 'row']}
      >
        <Box width={500}>
          <Text mb={1} color='gray8' fontSize={1}>
            using MQL (
            <Link href={'/docs/mql/getting-started/overview'}>docs</Link>)
          </Text>
          <CodeEditor language='javascript' children={generateMqlCode(data)} />
        </Box>
        <Box mt={[3, 3, 3, 0]} width={500}>
          <Text mb={1} color='gray8' fontSize={1}>
            using Microlink CLI (
            <Link href={'/docs/api/getting-started/cli'}>docs</Link>)
          </Text>
          <Box mb={3}>
            <CodeEditor
              language='bash'
              children={`$ microlink-api ${data.url}`}
            />
          </Box>
          <CodeEditor
            language='json'
            children={JSON.stringify(data, null, 2)}
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
      <SDK humanizedUrl={humanizedUrl} {...props} />
      <Features children={useFeatures()} />
      <API humanizedUrl={humanizedUrl} {...props} />
    </Fragment>
  )
}
