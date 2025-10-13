import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import DotsBackground from 'components/patterns/DotsBackground/DotsBackground'
import ArrowLink from 'components/patterns/ArrowLink'
import Layout from 'components/patterns/Layout'
import Meta from 'components/elements/Meta/Meta'
import Text from 'components/elements/Text'
import Box from 'components/elements/Box'
import CodeEditor from 'components/elements/CodeEditor/CodeEditor'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import { layout, theme } from 'theme'
import { formatNumber } from 'helpers/format-number'
import React, { useState, useEffect } from 'react'
import { Logo } from 'components/pages/recipes'
import { cdnUrl } from 'helpers/cdn-url'
import FeatherIcon from 'components/icons/Feather'

const Heading = withTitle(HeadingBase)

const Caption = withTitle(CaptionBase)

const Description = recipe => {
  const { description, domain } = recipe
  const children = []

  for (const str of description.split(domain)) {
    if (str !== '') {
      children.push(str.trim())
    } else {
      children.push(
        <Box key={domain} css={theme({ ml: 2, mr: 1 })}>
          <Logo {...recipe} />
        </Box>
      )
      children.push(domain)
    }
  }

  return children
}

const Name = ({ isProvider, name }) =>
  isProvider ? `Microlink × ${name}` : name

export const Head = ({ pageContext }) => (
  <Meta
    title={`Microlink Recipe: ${pageContext.name}`}
    description={pageContext.description}
    image={cdnUrl('banner/recipes.jpeg')}
  />
)

const RecipeTemplate = ({ pageContext: recipe }) => {
  const [count, setCount] = useState(null)
  const isLoaded = count !== null

  useEffect(() => {
    window
      .fetch(`https://count.vercel.app/recipes/${recipe.key}?incr`)
      .then(response => response.json())
      .then(setCount)
      .catch(() => undefined)
  }, [recipe.key])

  const gitHubUrl = `https://github.com/microlinkhq/recipes/blob/master/recipes/${
    recipe.isProvider ? 'by-provider' : 'by-feature'
  }/${recipe.slug}.js`

  return (
    <DotsBackground>
      <Layout footer={{ style: { background: 'transparent' } }}>
        <Flex
          css={theme({
            px: 3,
            pt: [2, null, 3],
            width: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          })}
        >
          <Heading
            css={theme({ fontSize: 4, pt: [3, null, 4] })}
            titleize={false}
          >
            <Name {...recipe} />
          </Heading>

          <Caption
            forwardedAs='h2'
            titleize={false}
            css={theme({
              pt: 3,
              px: [4, null, 0],
              maxWidth: [layout.small, null, layout.normal],
              display: 'flex',
              alignItems: 'center'
            })}
          >
            <Description {...recipe} />
          </Caption>

          {isLoaded && (
            <Flex css={theme({ pt: 2, alignItems: 'center' })}>
              <FeatherIcon icon='eye' color='black50' size={[1, 1, 2, 2]} />
              <Text css={theme({ pl: 2, color: 'black50' })}>
                {formatNumber(count)}
              </Text>
            </Flex>
          )}

          <Flex
            css={theme({
              pt: 4,
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            })}
          >
            <CodeEditor
              title={`${recipe.key}.js`}
              css={{ width: '100%', maxWidth: layout.small }}
              interactive
            >
              {recipe.code}
            </CodeEditor>
          </Flex>

          <Flex
            css={theme({
              alignItems: 'center',
              flexDirection: ['column', 'row'],
              pt: [3, null, 4],
              fontSize: [2, null, 3],
              gap: [3, 4]
            })}
          >
            <ArrowLink href='/docs/mql/getting-started/overview'>
              Read docs
            </ArrowLink>
            <ArrowLink href={gitHubUrl}>Edit on GitHub</ArrowLink>
          </Flex>
        </Flex>
      </Layout>
    </DotsBackground>
  )
}

export default RecipeTemplate
