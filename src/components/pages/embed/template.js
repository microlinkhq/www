import { useFeatures } from 'components/hook'
import * as Logo from 'components/logos'
import { borders, colors } from 'theme'
import { getDomain } from 'helpers'
import { Plus } from 'react-feather'
import { navigate } from 'gatsby'
import get from 'dlv'
import React from 'react'

import {
  Box,
  Button,
  Caps,
  CodeEditor,
  Container,
  Flex,
  Hide,
  Image,
  Link,
  MultiCodeEditor,
  Subhead,
  Text
} from 'components/elements'

import {
  Legend,
  SubHeadline,
  Headline,
  Grid,
  Microlink
} from 'components/patterns'

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

const Hero = ({ domain, brand, data }) => {
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
      into structured data
    </Box>
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
      return <Image height='100%' width={['36px', '72px']} src={logoUrl} />
    }
  })()

  return (
    <Container id='hero'>
      <Flex pt={[0, 0, 4, 4]} alignItems='center' justifyContent='center'>
        <Logo.Microlink width={['36px', '72px']} />
        {logoProvider && <Box ml={3} mr={3} children={<Plus />} />}
        {logoProvider}
      </Flex>
      <SubHeadline pb={[0, 0, 3, 3]} caption={caption} />
    </Container>
  )
}

const Sdk = ({ domain, data }) => (
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
      <Legend sup='Microlink SDK' title='Make your content attractive' />

      <Box pb={[0, 0, 4, 4]} px={4} textAlign='center'>
        <Box pt={4}>
          <Text mb={[4, 4, 4, 0]} maxWidth={8}>
            <Link href='/docs/sdk/getting-started/overview/'>
              Microlink SDK
            </Link>{' '}
            converts{' '}
            <Text color='black' fontWeight='bold' as='span'>
              {domain}
            </Text>{' '}
            links into beautiful previews, engaging better your links.
          </Text>
        </Box>
        <Box pt={[0, 4]} textAlign='center'>
          <Button
            onClick={() => navigate('/docs/sdk/getting-started/overview/')}
          >
            <Caps fontSize={0} children='Explore Docs' />
          </Button>

          <Link ml={3} href='https://storybook.microlink.io' icon>
            <Caps fontWeight='regular' fontSize={0} children='See Examples' />
          </Link>
        </Box>
      </Box>
    </Flex>

    <Box as='section' pt={0} pb={[0, 0, 4, 4]}>
      {[{ size: 'large' }, { size: 'normal' }, { size: 'small' }].map(
        ({ docLink, ...props }, index) => (
          <Flex
            flexDirection={['column', 'column', 'column', 'row']}
            justifyContent='center'
            alignItems='center'
            key={JSON.stringify(props)}
            mr='auto'
            ml='auto'
            py={index === 1 ? [3, 3, 5, 5] : 0}
          >
            <Box width={['100%', '100%', '500px', '500px']} p={[4, 4, 0]}>
              <Subhead
                pb={[2, 2, 3, 3]}
                textAlign='left'
                fontSize={[1, 2]}
                children={props.size}
              />
              <Microlink
                setData={() => ({ ...data, logo: data.logo || DEFAULT_LOGO })}
                {...props}
              />
            </Box>
            <Box px={3} />
            <Box>
              <MultiCodeEditor
                languages={generateLanguages({ ...props, url: data.url })}
              />
            </Box>
          </Flex>
        )
      )}
    </Box>
  </Container>
)

const Features = ({ children }) => (
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
  return (
    <Container
      id='api'
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
        <Legend sup='Microlink API' title='Build APIs from websites' />

        <Box pb={4} px={4} textAlign='center'>
          <Box pt={4}>
            <Text mb={[4, 4, 4, 0]} maxWidth={8}>
              Microlink Query Language (
              <Link href='/docs/mql/getting-started/overview'>MQL</Link>) is a
              programmatic way to getting content from any URL.
            </Text>
          </Box>
          <Box pt={[0, 4]} textAlign='center'>
            <Button
              onClick={() => navigate('/docs/mql/getting-started/overview')}
            >
              <Caps fontSize={0} children='Explore Docs' />
            </Button>

            <Link ml={3} href='https://github.com/microlinkhq/mql-cli' icon>
              <Caps fontWeight='regular' fontSize={0} children='See Recipes' />
            </Link>
          </Box>
        </Box>
      </Flex>

      <Box as='section' pt={0} pb={[0, 0, 4, 4]}>
        <Flex
          flexDirection={['column', 'column', 'column', 'row']}
          justifyContent='center'
          alignItems={['center', 'center', 'baseline', 'baseline']}
          mr='auto'
          ml='auto'
        >
          <Box
            width={[CodeEditor.width[0], CodeEditor.width[1], '500px', '500px']}
          >
            <Subhead pb={[2, 2, 3, 3]} textAlign='left' fontSize={[1, 2]}>
              Using MQL (
              <Link href='/docs/mql/getting-started/overview'>docs</Link>)
            </Subhead>
            <CodeEditor
              language='javascript'
              children={generateMqlCode(data)}
            />
          </Box>
          <Box px={3} />
          <Box width={CodeEditor.width} pt={0}>
            <Subhead
              pt={[4, 4, 3, 3]}
              pb={[2, 2, 3, 3]}
              textAlign='left'
              fontSize={[1, 2]}
            >
              Using Microlink CLI (
              <Link href='/docs/api/getting-started/cli'>docs</Link>)
            </Subhead>
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
      </Box>
    </Container>
  )
}

export default props => {
  const domain = getDomain(props.data.url)
  return (
    <>
      <Hero domain={domain} {...props} />
      <Sdk domain={domain} {...props} />
      <Features children={useFeatures()} />
      <Api domain={domain} {...props} />
    </>
  )
}
