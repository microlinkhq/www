import FlickeringBackground from 'components/patterns/FlickeringBackground/FlickeringBackground'
import { Clipboard as ClipboardIcon } from 'components/icons/Clipboard'
import { useClipboard } from 'components/hook/use-clipboard'
import Heading from 'components/elements/Heading'
import Meta from 'components/elements/Meta/Meta'
import Layout from 'components/patterns/Layout'
import Flex from 'components/elements/Flex'
import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import { layout, theme } from 'theme'
import { GitHub as GitHubIcon } from 'components/icons/GitHub'
import { Link } from 'components/elements/Link'
import React from 'react'
import {
  SKILLS_PAGE_URL,
  getBaseDescription,
  getRelatedSkills,
  getTriggerPhrases,
  stripFrontmatter
} from 'helpers/skills'

const SITE_URL = 'https://microlink.io'

const getDomainLabel = value => {
  if (!value) return ''

  try {
    return new URL(value).hostname.replace(/^www\./, '')
  } catch (_) {
    return value
  }
}

const toIsoDate = value => {
  if (!value) return undefined
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString()
}

const getInstallCommand = value =>
  `npx skills add https://github.com/microlinkhq/skills --skill ${value}`

export const Head = ({ pageContext }) => {
  const { frontmatter = {}, skillSlug, lastEdited } = pageContext
  const title = frontmatter.title || skillSlug || 'Skill'
  const websiteUrl = frontmatter.website
  const githubUrl = frontmatter.githubUrl
  const baseDescription = getBaseDescription(frontmatter.description)
  const triggerPhrases = getTriggerPhrases(frontmatter.description)
  const description =
    baseDescription && baseDescription.length >= 90
      ? baseDescription
      : `${
        baseDescription || title
      }. Reusable AI automation skill guide with install command, usage patterns, and workflow examples.`
  const publishedDate = toIsoDate(frontmatter.date || lastEdited)
  const modifiedDate = toIsoDate(lastEdited) || publishedDate
  const installTarget = skillSlug || title
  const installCommand = getInstallCommand(installTarget)
  const pageUrl = skillSlug
    ? `${SKILLS_PAGE_URL}/${skillSlug}`
    : SKILLS_PAGE_URL

  const skillSourceUrl = frontmatter.skillUrl
  const sourceUrls = [websiteUrl, githubUrl, skillSourceUrl].filter(Boolean)

  return (
    <Meta
      title={`${title} AI Agent Skill`}
      description={description}
      schemaType='TechArticle'
      publishedDate={publishedDate}
      modifiedDate={modifiedDate}
      structured={[
        {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: SITE_URL
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Skills',
              item: SKILLS_PAGE_URL
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: title,
              item: pageUrl
            }
          ]
        },
        {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          '@id': `${pageUrl}#installation`,
          url: pageUrl,
          name: `How to install ${title} skill`,
          description: `Install ${title} from the microlinkhq/skills repository with one command.`,
          step: [
            {
              '@type': 'HowToStep',
              name: 'Run installation command',
              text: `Run ${installCommand} in your terminal to install the skill.`
            }
          ]
        },
        {
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          '@id': `${pageUrl}#source`,
          url: pageUrl,
          name: `${title} skill`,
          description,
          codeRepository: githubUrl || skillSourceUrl,
          programmingLanguage: 'Markdown',
          sameAs: sourceUrls
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          '@id': `${pageUrl}#faq`,
          mainEntity: [
            {
              '@type': 'Question',
              name: `When should I use the ${title} skill?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: triggerPhrases.length
                  ? `Use this skill when you need ${triggerPhrases
                    .slice(0, 3)
                    .join(', ')}.`
                  : `Use this skill for ${baseDescription || title}.`
              }
            },
            {
              '@type': 'Question',
              name: `How do I install the ${title} skill?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `Run ${installCommand} in your terminal.`
              }
            }
          ]
        }
      ]}
    />
  )
}

const Separator = () => <Box css={theme({ color: 'black60', px: 2 })}>|</Box>

const SkillTemplate = ({ pageContext }) => {
  const { frontmatter = {}, rawContent = '', skillSlug } = pageContext
  const [ClipboardComponent, toClipboard] = useClipboard()

  const title = frontmatter.title || skillSlug || 'Skill'
  const websiteUrl = frontmatter.website
  const websiteLabel = getDomainLabel(websiteUrl)
  const githubUrl = frontmatter.githubUrl
  const skillSourceUrl = frontmatter.skillUrl
  const description = frontmatter.description
  const summary = getBaseDescription(description)
  const triggerPhrases = getTriggerPhrases(description)
  const markdown = stripFrontmatter(rawContent).trim()
  const relatedSkills = getRelatedSkills({ skillSlug, description })
  const installCommand = getInstallCommand(skillSlug || title)

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
            <Flex
              css={theme({
                alignItems: 'center',
                flexDirection: 'column',
                pb: 4
              })}
            >
              <Heading variant={null}>
                Skill for <Heading as='span'>{title}</Heading>
              </Heading>
              <Flex
                css={theme({
                  alignItems: 'center',
                  gap: 2,
                  pt: 3,
                  flexWrap: 'wrap',
                  justifyContent: 'center'
                })}
              >
                <Link href='/skills' css={theme({ fontSize: 1 })}>
                  Browse all skills
                </Link>

                {websiteUrl && (
                  <>
                    <Separator />
                    <Link
                      href={websiteUrl}
                      css={theme({ fontSize: 1 })}
                      title='Open project website'
                      prefetch={false}
                      isInternal={false}
                    >
                      {websiteLabel}
                    </Link>
                  </>
                )}
                {githubUrl && (
                  <>
                    <Separator />
                    <GitHubIcon css={theme({ color: 'gray8' })} />
                    <Link
                      href={githubUrl}
                      css={theme({ fontSize: 1 })}
                      title='Open project source code'
                      prefetch={false}
                      isInternal={false}
                    >
                      Project on GitHub
                    </Link>
                  </>
                )}

                {skillSourceUrl && (
                  <>
                    <Separator />
                    <Link
                      href={skillSourceUrl}
                      css={theme({ fontSize: 1 })}
                      title='Open skill definition source'
                      prefetch={false}
                      isInternal={false}
                    >
                      Edit this skill
                    </Link>
                  </>
                )}
              </Flex>
            </Flex>
            <Text
              css={theme({
                color: 'black60',
                fontSize: [2, 3]
              })}
            >
              {summary}
            </Text>

            {triggerPhrases.length > 0 && (
              <Box css={theme({ pt: 4 })}>
                <Text
                  as='h2'
                  css={theme({
                    m: 0,
                    fontWeight: 'bold',
                    fontSize: [1, 2]
                  })}
                >
                  Best for
                </Text>
                <Flex css={theme({ pt: 2, gap: 2, flexWrap: 'wrap' })}>
                  {triggerPhrases.map(trigger => (
                    <Text
                      as='span'
                      key={trigger}
                      css={theme({
                        px: 2,
                        py: 1,
                        bg: 'black5',
                        borderRadius: 2,
                        color: 'black70',
                        fontSize: 0
                      })}
                    >
                      {trigger}
                    </Text>
                  ))}
                </Flex>
              </Box>
            )}

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
                    fontSize: 0
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
                    fontSize: 0
                  })}
                  style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
                >
                  {markdown}
                </Text>
              </Box>
            </Box>

            {relatedSkills.length > 0 && (
              <Box css={theme({ pt: 5 })}>
                <Text
                  as='h2'
                  css={theme({
                    m: 0,
                    fontWeight: 'bold',
                    fontSize: [1, 2]
                  })}
                >
                  Related skills
                </Text>
                <Flex css={theme({ pt: 2, gap: 3, flexWrap: 'wrap' })}>
                  {relatedSkills.map(skill => (
                    <Link key={skill.slug} href={`/skills/${skill.slug}`}>
                      {skill.name}
                    </Link>
                  ))}
                </Flex>
              </Box>
            )}

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
