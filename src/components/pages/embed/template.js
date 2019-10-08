import { useFeatures } from 'components/hook'
import * as Logo from 'components/logos'
import { borders, colors } from 'theme'
import { getDomain } from 'helpers'
import { Plus } from 'react-feather'
import { navigate } from 'gatsby'
import { capitalize, get } from 'lodash'
import React from 'react'

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
        px={5}
        color='gray'
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
      <Subhead as='span' color='black' fontWeight='regular'>
        {domain}
      </Subhead>{' '}
      links into structured data
    </>
  )

  const logoProvider = (() => {
    const LogoProvider = Logo[brand]
    if (LogoProvider) {
      return <LogoProvider size={['36px', '72px']} state='hover' />
    }

    const logoUrl = get(data, 'logo.url')

    if (logoUrl && !logoUrl.endsWith('ico')) {
      return <Image size={['36px', '72px']} src={logoUrl} />
    }
  })()

  const title = (
    <Box>
      <Flex alignItems='center' justifyContent='center'>
        <Logo.Microlink width={['36px', '72px']} />
        {logoProvider && (
          <Box ml={3} mr={3}>
            <Plus color={colors.gray5} />
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

const Sdk = ({ domain, data }) => (
  <Container
    id='sdk'
    maxWidth='100%'
    borderTop={`${borders[1]} ${colors.pinkest}`}
    borderBottom={`${borders[1]} ${colors.pinkest}`}
    bg='pinky'
    pb={[0, 5]}
  >
    <Flex
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      as='header'
    >
      <Subheader children={['Microlink SDK', 'Make your content attractive']} />

      <Box pb={[0, 5]} px={4} textAlign={['inherit', 'center']}>
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

    <Container maxWidth={16} pt={0} pb={[4, 0]}>
      {[{ size: 'large' }, { size: 'normal' }, { size: 'small' }].map(
        ({ docLink, ...props }, index) => (
          <Flex
            flexDirection={['column', 'column', 'column', 'row']}
            justifyContent='space-evenly'
            alignItems='center'
            key={JSON.stringify(props)}
            mr='auto'
            ml='auto'
            py={index === 1 ? [3, 3, 5, 5] : 0}
          >
            <Box width={500} p={[4, 4, 0]}>
              <Subhead
                pb={[4, 3]}
                textAlign='left'
                fontSize={[1, 2]}
                children={capitalize(props.size)}
              />
              <Microlink
                setData={{ ...data, logo: data.logo || DEFAULT_LOGO }}
                {...props}
              />
            </Box>
            <Box width={500} px={4}>
              <MultiCodeEditor
                languages={generateLanguages({ ...props, url: data.url })}
              />
            </Box>
          </Flex>
        )
      )}
    </Container>
  </Container>
)

const Features = ({ children }) => (
  <Container id='features'>
    <Header title='Features' caption='Capabilities under the hood.' />
    <Box as='section' pt={[3, 4]}>
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
      pb={[0, 5]}
    >
      <Flex
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        as='header'
      >
        <Subheader children={['Microlink API', 'Build APIs from websites']} />

        <Box pb={[0, 5]} px={4} textAlign={['inherit', 'center']}>
          <Box pt={4}>
            <Text mb={[4, 4, 4, 0]} maxWidth={8}>
              Microlink Query Language (
              <Link href='/docs/mql/getting-started/overview'>MQL</Link>) is a
              programmatic way to getting content from any URL.
            </Text>
          </Box>
          <Box pt={[0, 4]} textAlign='center'>
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

      <Container maxWidth={16} pt={0} pb={0}>
        <Flex
          justifyContent='space-evenly'
          mr='auto'
          ml='auto'
          flexDirection={['column', 'column', 'column', 'row']}
          alignItems={['center', 'center', 'center', 'baseline']}
        >
          <Box width={500} p={[4, 4, 0]}>
            <Subhead pb={[4, 3]} textAlign='left' fontSize={[1, 2]}>
              Using MQL (
              <Link href='/docs/mql/getting-started/overview'>docs</Link>)
            </Subhead>
            <CodeEditor
              language='javascript'
              children={generateMqlCode(data)}
            />
          </Box>
          <Box width={500} p={[4, 4, 0]} pt={0}>
            <Subhead pb={[4, 3]} textAlign='left' fontSize={[1, 2]}>
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
      </Container>
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
