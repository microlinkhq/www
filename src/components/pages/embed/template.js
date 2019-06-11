import * as Logo from 'components/logos'
import React, { Fragment } from 'react'
import humanizeUrl from 'humanize-url'
import { Plus } from 'react-feather'
import { colors } from 'theme'

import { get } from 'lodash'

import {
  Text,
  Box,
  Heading,
  Container as ContainerBase,
  Image,
  Subhead,
  Hide,
  Flex,
  Link,
  Caps,
  MultiCodeEditor,
  CodeEditor
} from 'components/elements'

import { Microlink } from 'components/patterns'

const DEFAULT_LOGO = {
  url: 'https://cdn.microlink.io/logo/trim.png',
  width: 500,
  height: 500,
  type: 'png',
  size: 1448,
  size_pretty: '1.45 kB'
}

const serializeFmt = (props, { quotes = true } = {}) => {
  return Object.keys(props).reduce((acc, rawKey) => {
    const rawValue = props[rawKey]
    const key = rawValue === true ? rawKey : `${rawKey}=`
    const value =
      rawValue === true ? '' : `${quotes ? `'${rawValue}'` : rawValue}`
    return `${acc}${key}${value} `
  }, '')
}

const serializeObject = props => {
  return Object.keys(props).reduce((acc, rawKey) => {
    const rawValue = props[rawKey]
    const key = rawValue === true ? rawKey : `${rawKey}: `
    const value = rawValue === true ? '' : `'${rawValue}'`
    return `${acc}${key}${value}`
  }, '')
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
  const langReact = () => `
import React from 'react'
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    ${serializeFmt(props)}
  />
)
`

  langReact.language = 'jsx'

  const langVanilla = () => `
<script src="https://cdn.jsdelivr.net/combine/npm/react@16/umd/react.production.min.js,npm/react-dom@16/umd/react-dom.production.min.js,npm/@microlink/vanilla@4.0.0-alpha.3/dist/microlink.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function (event) {
    microlink('.link-previews', { ${serializeObject(props)} })
  })
</script>
`

  langVanilla.language = 'html'

  return { React: langReact, HTML: langVanilla }
}

const Container = ({ children, maxWidth, ...props }) => (
  <Box as='article' px={4} pt={[4, 5]} pb={[4, 5]} {...props}>
    <ContainerBase children={children} maxWidth={maxWidth} />
  </Box>
)

const Header = ({ title, caption }) => {
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
        lineHeight={2}
        maxWidth={5}
        mt={4}
        px={4}
        color={colors.gray5}
        textAlign='center'
        children={caption}
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
    if (logoUrl && !logoUrl.endsWith('ico'))
      return <Image size={72} src={logoUrl} />
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
      <Hide breakpoints={[0, 1, 2]}>
        <Container id='hero'>
          <Header title={title} caption={caption} />
        </Container>
      </Hide>

      <Hide breakpoints={[3]}>
        <Box pb={[4, 5]}>
          <Container id='hero' pb={0}>
            <Header title={title} caption={caption} />
          </Container>
        </Box>
      </Hide>
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
    maxWidth='100%'
    bg='pinky'
    id='sdk'
    borderColor='pinkest'
    borderTop='1px solid'
    borderBottom='1px solid'
  >
    <Flex
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      as='header'
    >
      <Subheader
        children={['Microlink SDK', 'Turn websites into rich media']}
      />
      <Box px={4} textAlign={['inherit', 'center']}>
        <Text my={4} mb={[4, 4, 4, 0]} maxWidth={8}>
          <Link>Microlink SDK</Link> converts{' '}
          <Text color='black' fontWeight='bold' as='span'>
            {humanizedUrl}
          </Text>{' '}
          links into beautiful previews. Make your content attractive, engaging
          better your links.
        </Text>
      </Box>
    </Flex>

    {[
      { size: 'normal', docLink: '/docs/sdk/api-parameters/size/' },
      { size: 'large', docLink: '/docs/sdk/api-parameters/size/' }
    ].map(({ docLink, ...props }) => (
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
            {serializeFmt(props, { quotes: false })} (
            <Link href={docLink}>documentation</Link>
            {')'}
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

const API = ({ data }) => {
  return (
    <Container maxWidth='100%' id='api'>
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        as='header'
      >
        <Subheader
          children={['Microlink API', 'Turns websites into structured data']}
        />
        <Box px={4} textAlign={['inherit', 'center']}>
          <Text my={4} mb={[4, 4, 4, 0]} maxWidth={8}>
            <Link>Microlink Query Language</Link> (MQL) is a programmatic way to
            getting content from any URL. Build APIs from websites.
          </Text>
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
            Microlink Query Language (
            <Link href={'/docs/mql/getting-started/overview'}>
              documentation
            </Link>
            )
          </Text>
          <CodeEditor language='javascript' children={generateMqlCode(data)} />
        </Box>
        <Box mt={[3, 3, 3, 0]} width={500}>
          <Text mb={1} color='gray8' fontSize={1}>
            Microlink API (
            <Link href={'/docs/api/getting-started/overview'}>
              documentation
            </Link>
            )
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
  const humanizedUrl = humanizeUrl(new URL(props.data.url).hostname)
  return (
    <Fragment>
      <Hero humanizedUrl={humanizedUrl} {...props} />
      <SDK humanizedUrl={humanizedUrl} {...props} />
      <API humanizedUrl={humanizedUrl} {...props} />
    </Fragment>
  )
}
