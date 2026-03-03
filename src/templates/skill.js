import FlickeringBackground from 'components/patterns/FlickeringBackground/FlickeringBackground'
import { Clipboard as ClipboardIcon } from 'components/icons/Clipboard'
import { useClipboard } from 'components/hook/use-clipboard'
import Meta from 'components/elements/Meta/Meta'
import Layout from 'components/patterns/Layout'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import { cdnUrl } from 'helpers/cdn-url'
import { layout, theme } from 'theme'
import React from 'react'

export const Head = ({ pageContext }) => {
  const { frontmatter = {} } = pageContext
  return (
    <Meta
      title={`Microlink Skill: ${frontmatter.title || 'Skill'}`}
      description={frontmatter.description}
      image={cdnUrl('banner/recipes.jpeg')}
    />
  )
}

const SkillTemplate = ({ pageContext }) => {
  const { frontmatter = {}, rawContent = '', skillSlug } = pageContext
  const [ClipboardComponent, toClipboard] = useClipboard()

  const title = frontmatter.title || skillSlug || 'Skill'
  const description = frontmatter.description
  const useWhen = description
    ? description.split(/\s+Use when\s+/i)[0].trim()
    : ''
  const markdown = rawContent.trim()

  const installCommand = `npx skills add https://github.com/microlinkhq/skills --skill ${
    skillSlug || title
  }`

  return (
    <FlickeringBackground>
      <Layout footer={{ style: { background: 'transparent' } }}>
        <Flex
          css={theme({
            px: 3,
            pt: [2, null, 3],
            pb: [4, 5],
            width: '100%',
            flexDirection: 'column',
            alignItems: 'center'
          })}
        >
          <Box css={theme({ width: '100%', maxWidth: layout.large })}>
            <Text
              as='h1'
              css={theme({
                pb: 3,
                fontWeight: 'bold',
                fontSize: [1, 2]
              })}
            >
              {title}
            </Text>
            <Text
              css={theme({
                color: 'black60',
                fontSize: [2, 3]
              })}
            >
              {useWhen}
            </Text>
            <Text
              as='h2'
              css={theme({
                pt: 5,
                pb: 3,
                fontWeight: 'bold',
                fontSize: [1, 2]
              })}
            >
              Installation
            </Text>
            <Box
              css={theme({
                bg: 'white',
                border: 1,
                borderColor: 'black10',
                borderRadius: 3,
                p: [3, 4]
              })}
            >
              <Flex
                css={theme({
                  alignItems: 'center',
                  justifyContent: 'space-between'
                })}
              >
                <Text
                  as='pre'
                  css={theme({
                    m: 0,
                    color: 'black80',
                    fontFamily: 'mono',
                    fontSize: [0, 1]
                  })}
                  style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    flex: 1
                  }}
                >
                  {installCommand}
                </Text>
                <Text
                  as='button'
                  type='button'
                  aria-label='Copy install command'
                  title='Copy install command'
                  onClick={() => {
                    toClipboard({
                      copy: installCommand,
                      text: 'Install command copied'
                    })
                  }}
                  css={theme({
                    bg: 'transparent',
                    border: 0,
                    color: 'black40',
                    p: 0,
                    ml: 3,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center'
                  })}
                >
                  <ClipboardIcon />
                </Text>
              </Flex>
            </Box>

            <Box css={theme({ pt: 4 })}>
              <Box
                css={theme({
                  bg: 'white',
                  border: 1,
                  borderColor: 'black10',
                  borderRadius: 3,
                  p: [3, 4]
                })}
              >
                <Flex css={theme({ justifyContent: 'flex-end', pb: 2 })}>
                  <Text
                    as='button'
                    type='button'
                    aria-label='Copy markdown'
                    title='Copy markdown'
                    onClick={() => {
                      toClipboard({ copy: markdown, text: 'Markdown copied' })
                    }}
                    css={theme({
                      bg: 'transparent',
                      border: 0,
                      color: 'black40',
                      p: 0,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center'
                    })}
                  >
                    <ClipboardIcon />
                  </Text>
                </Flex>

                <Text
                  as='pre'
                  css={theme({
                    m: 0,
                    color: 'black80',
                    fontFamily: 'mono',
                    fontSize: [0, 1]
                  })}
                  style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                >
                  {markdown}
                </Text>
              </Box>
            </Box>

            <Box css={theme({ pt: 3 })}>
              <ClipboardComponent />
            </Box>
          </Box>
        </Flex>
      </Layout>
    </FlickeringBackground>
  )
}

export default SkillTemplate
