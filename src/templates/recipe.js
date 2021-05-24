import { Caption, DotsBackground, ArrowLink, Layout } from 'components/patterns'
import { Microlink as MicrolinkLogo } from 'components/logos'
import { cx, fontSizes, layout } from 'theme'
import { Plus } from 'react-feather'
import React from 'react'

import {
  Box,
  CodeEditor,
  Flex,
  Heading,
  Image,
  Script,
  Unavatar
} from 'components/elements'

const LOGO_SIZE = ['32px', '32px', '48px', '48px']

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

const RecipeTemplate = ({ pageContext: recipe }) => {
  const meta = {
    title: `Microlink Recipe: ${recipe.name}`
  }

  const gitHubUrl = `https://github.com/microlinkhq/recipes/blob/master/recipes/${
    recipe.isGeneric ? 'by-feature' : 'by-provider'
  }/${recipe.slug}.js`

  return (
    <DotsBackground alignItems='center' justifyContent='center'>
      <Script async src='https://embed.runkit.com' />
      <Layout footer={{ bg: 'transparent' }} {...meta}>
        <Flex
          px={3}
          pt={[2, 2, 3, 3]}
          width='100%'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <Flex alignItems='center' justifyContent='center'>
            <MicrolinkLogo width={LOGO_SIZE} />
            {!recipe.isGeneric && (
              <Box ml={3} mr={3}>
                <Plus color={cx('gray8')} size={fontSizes[2]} />
              </Box>
            )}
            {!recipe.isGeneric && <Logo {...recipe} />}
          </Flex>

          <Heading pt={[3, 3, 4, 4]} titleize={false}>
            Microlink Recipe
          </Heading>

          <Caption
            titleize={false}
            pt={[3, 3, 4, 4]}
            px={[4, 4, 0, 0]}
            maxWidth={[
              layout.small,
              layout.small,
              layout.normal,
              layout.normal
            ]}
          >
            {recipe.description}
          </Caption>

          <Flex
            pt={4}
            width='100%'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <CodeEditor
              title={`${recipe.key}.js`}
              width='100%'
              maxWidth={layout.small}
              interactive
            >
              {recipe.code}
            </CodeEditor>
          </Flex>

          <Flex
            alignItems={['center', undefined, undefined, undefined]}
            flexDirection={['column', 'row', 'row', 'row']}
            pt={[3, 3, 4, 4]}
          >
            <ArrowLink
              pr={[0, 4, 4, 4]}
              href='/docs/mql/getting-started/overview'
            >
              Read docs
            </ArrowLink>
            <ArrowLink pt={[3, 0, 0, 0]} href={gitHubUrl}>
              Edit on GitHub
            </ArrowLink>
          </Flex>
        </Flex>
      </Layout>
    </DotsBackground>
  )
}

export default RecipeTemplate
