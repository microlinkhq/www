import { Microlink as MicrolinkLogo } from 'components/logos'
import { useSiteMetadata } from 'components/hook'
import React, { Fragment } from 'react'
import { Plus } from 'react-feather'
import { colors } from 'theme'

import {
  Text,
  Box,
  Heading,
  Container as ContainerBase,
  Subhead,
  Hide,
  Flex,
  Link,
  Caps,
  MultiCodeEditor,
  CodeEditor,
  Image
} from 'components/elements'

import { Layout, Microlink } from 'components/patterns'

const serializeFmt = (props, { quotes = true } = {}) => {
  return Object.keys(props).reduce((acc, rawKey) => {
    const rawValue = props[rawKey]
    const key = rawValue === true ? rawKey : `${rawKey}=`
    const value =
      rawValue === true ? '' : `${quotes ? `'${rawValue}'` : rawValue}`
    return `${acc}${key}${value}`
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

const MOCK = {
  lang: 'en',
  author: 'futurism',
  title: 'Futurism on Twitter',
  publisher: 'Twitter',
  image: {
    url:
      'https://pbs.twimg.com/amplify_video_thumb/882986340605939712/img/k-NlEfo7z0Xvo9ab.jpg',
    width: 720,
    height: 720,
    type: 'jpg',
    size: 65648,
    size_pretty: '65.6 kB'
  },
  description: '“These tires can even climb stairs https://t.co/ymr4KK15oI”',
  date: '2019-05-31T10:09:57.000Z',
  logo: {
    url: 'https://abs.twimg.com/icons/apple-touch-icon-192x192.png',
    width: 192,
    height: 192,
    type: 'png',
    size: 2113,
    size_pretty: '2.11 kB'
  },
  url: 'https://twitter.com/futurism/status/882987478541533189'
}

const generateLanguages = props => {
  const langReact = () => `
import React from 'react'
import Microlink from '@microlink/react'

export default () => (
  <Microlink
    ${serializeFmt(props)}
    url='${MOCK.url}'
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
        px={4}
        color={colors.gray5}
        textAlign='center'
        children={caption}
      />
    </Flex>
  )
}

const Hero = ({ data }) => {
  const caption = `Turn any ${data.publisher} link into structured data.`

  const title = (
    <Box>
      <Flex alignItems='center' justifyContent='center'>
        <MicrolinkLogo size={72} />
        <Box mx={3}>
          <Plus color={colors.gray5} />
        </Box>
        <Image src={data.logo.url} size={96} />
      </Flex>
      <Heading py={3} color='primary'>
        Microlink for {data.publisher}
      </Heading>
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

const SDK = ({ data }) => (
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
          <Link>Microlink SDK</Link> converts {data.publisher} links into
          beautiful previews. Make your content attractive, engaging better your
          links.
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
            <Link href={docLink}>+docs</Link>)
          </Text>
          <Microlink setData={data} {...props} />
        </Box>
        <Box mt={[3, 3, 3, 0]} width={500}>
          <MultiCodeEditor languages={generateLanguages(props)} />
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
            <Link href={'/docs/mql/getting-started/overview'}>+docs</Link>)
          </Text>
          <CodeEditor language='javascript' children={generateMqlCode(data)} />
        </Box>
        <Box mt={[3, 3, 3, 0]} width={500}>
          <Text mb={1} color='gray8' fontSize={1}>
            Microlink API (
            <Link href={'/docs/api/getting-started/overview'}>+docs</Link>)
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

export default ({ pageContext }) => {
  const metadata = useSiteMetadata()
  const { data, slug, provider } = pageContext

  const meta = {
    url: `${metadata.siteUrl}${slug}`,
    headline: `Embed for ${data.publisher}`,
    image: `https://cdn.microlink.io/meta/${provider}.jpeg`
  }

  return (
    <Layout {...meta}>
      <Hero data={data} />
      <SDK data={data} />
      <API data={data} />
    </Layout>
  )
}
