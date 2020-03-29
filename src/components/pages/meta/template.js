import {
  Box,
  Button,
  Caps,
  CodeEditor,
  Container,
  Flex,
  Image,
  Link,
  MultiCodeEditor,
  Subhead,
  Text
} from 'components/elements'

import { LogoBrand, Microlink as MicrolinkLogo } from 'components/logos'
import { Legend, SubHeadline, Microlink } from 'components/patterns'
import { Features } from 'components/pages/screenshot/template'
import { mqlCode, cdnUrl } from 'helpers'
import { useFeaturesMeta } from 'components/hook'
import { borders, colors } from 'theme'
import { Plus } from 'react-feather'
import { navigate } from 'gatsby'
import { getHostname } from 'tldts'
import React from 'react'
import get from 'dlv'

const DEFAULT_LOGO = {
  url: cdnUrl('logo/trim.png'),
  width: 500,
  height: 500,
  type: 'png',
  size: 1448,
  size_pretty: '1.45 kB'
}

const Hero = ({ domain, id, data }) => {
  const caption = (
    <Box maxWidth={5} pt={[2, 2, 4, 4]} px={5}>
      Turn{' '}
      <Subhead as='span' color='black' fontWeight='regular' titleize={false}>
        {domain}
      </Subhead>{' '}
      into structured data
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
      <SubHeadline pb={[0, 0, 3, 3]} caption={caption} />
    </Container>
  )
}

const Sdk = ({ domain, data }) => {
  const media = ['video', 'audio', 'image', 'logo']

  const variations = [
    data.iframe
      ? { style: { textAlign: 'center' }, media: ['iframe', ...media] }
      : null,
    { size: 'large', media },
    { size: 'normal', media },
    { size: 'small', media }
  ].filter(Boolean)

  const languages = mqlCode(
    data,
    `video: true,
    audio:true,
    palette: true,
    iframe: true`
  )

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
        {variations.map((props, index) => (
          <Flex
            flexDirection={['column', 'column', 'column', 'row']}
            justifyContent='center'
            alignItems='center'
            key={JSON.stringify(props)}
            mr='auto'
            ml='auto'
            pt={[3, 3, 4, 4]}
            pb={index === variations.length - 1 ? null : [3, 3, 4, 4]}
          >
            <Box width={['100%', '100%', '500px', '500px']} p={[4, 4, 0]}>
              <Subhead
                pb={[2, 2, 3, 3]}
                textAlign='left'
                fontSize={[1, 2]}
                children={props.size || 'iframe'}
                omitTitleize={[props.size || 'iframe']}
              />
              <Box
                css={`
                  * {
                    max-width: 500px;
                  }
                `}
              >
                <Microlink
                  setData={() => ({ ...data, logo: data.logo || DEFAULT_LOGO })}
                  {...props}
                />
              </Box>
            </Box>
            <Box px={3} />
            <Box>
              <MultiCodeEditor languages={languages} {...props} />
            </Box>
          </Flex>
        ))}
      </Box>
    </Container>
  )
}

const Api = ({ data }) => {
  const languages = mqlCode(
    data,
    `video: true,
    audio:true,
    palette: true,
    iframe: true`
  )

  delete languages.React
  delete languages.HTML

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
          <Box>
            <Subhead pb={[2, 2, 3, 3]} textAlign='left' fontSize={[1, 2]}>
              Using MQL (
              <Link href='/docs/mql/getting-started/overview'>docs</Link>)
            </Subhead>
            <MultiCodeEditor
              width={[
                CodeEditor.width[0],
                CodeEditor.width[1],
                '500px',
                '500px'
              ]}
              languages={languages}
            />
          </Box>
          <Box px={3} />
          <Box pt={0}>
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
  const domain = getHostname(props.data.url).replace('www.', '')
  return (
    <>
      <Hero domain={domain} {...props} />
      <Sdk domain={domain} {...props} />
      <Features children={useFeaturesMeta()} />
      <Api domain={domain} {...props} />
    </>
  )
}
