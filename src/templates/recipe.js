import {
  Image,
  Box,
  Link,
  CodeEditor,
  Text,
  Unavatar,
  Flex
} from 'components/elements'
import { Microlink as MicrolinkLogo } from 'components/logos'
import { Headline, Layout } from 'components/patterns'
import { Plus } from 'react-feather'
import { layout } from 'theme'
import React from 'react'

const LOGO_SIZE = ['40px', '40px', '60px', '60px']

const Logo = ({ isGeneric, logo, domain }) => {
  if (!isGeneric || !logo) {
    return (
      <Unavatar
        style={{ borderRadius: '50%' }}
        height={LOGO_SIZE}
        width={LOGO_SIZE}
        query={domain}
      />
    )
  }
  return <Image height={LOGO_SIZE} width={LOGO_SIZE} src={logo} />
}

export default ({ pageContext: recipe }) => {
  const meta = {
    title: `Recipe for ${recipe.name}`
  }

  const gitHubUrl = `https://github.com/microlinkhq/recipes/blob/master/recipes/${
    recipe.isGeneric ? 'by-feature' : 'by-provider'
  }/${recipe.slug}.js`

  return (
    <Layout
      script={[{ src: 'https://embed.runkit.com', async: true }]}
      {...meta}
    >
      <Flex
        pt={[0, 0, 0, 3]}
        px={3}
        width='100%'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Box pb={4}>
          <Flex pt={[0, 0, 4, 4]} alignItems='center' justifyContent='center'>
            <MicrolinkLogo width={LOGO_SIZE} />
            {!recipe.isGeneric && <Box ml={3} mr={3} children={<Plus />} />}
            {!recipe.isGeneric && <Logo {...recipe} />}
          </Flex>
          <Headline
            pt={[0, 0, 3, 3]}
            pb={[0, 0, 1, 1]}
            caption={`Microlink Recipe for ${recipe.name}`}
          />
          <Text fontSize={[2, 2, 2, 3]} textAlign='center' maxWidth={10}>
            <Link href='/recipes'>View all recipes</Link>
            <Text px={2} as='span'>
              {' '}
              •{' '}
            </Text>
            <Link href='/docs/mql/getting-started/overview'>
              Read documentation
            </Link>
            <Text px={2} as='span'>
              {' '}
              •{' '}
            </Text>
            <Link href={gitHubUrl}>Edit on GitHub</Link>
          </Text>
        </Box>

        <Flex
          width='100%'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <CodeEditor
            title={`${recipe.key}.js`}
            width='100%'
            maxWidth={layout.small}
            children={recipe.code}
            interactive
          />
        </Flex>
      </Flex>
    </Layout>
  )
}
