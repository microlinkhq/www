import { layout, theme } from 'theme'
import FlickeringBackground from 'components/patterns/FlickeringBackground/FlickeringBackground'
import Layout from 'components/patterns/Layout'
import { withTitle } from 'helpers/hoc/with-title'
import CaptionBase from 'components/patterns/Caption/Caption'
import React from 'react'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import Card from 'components/elements/Card/Card'
import {
  enrichedSkills,
  getBaseDescription,
  SKILLS_PAGE_URL
} from 'helpers/skills'

const Subhead = withTitle(SubheadBase)
const Caption = withTitle(CaptionBase)

const REQUEST_SKILL_URL = 'https://github.com/microlinkhq/skills/issues/new'
const SKILLS_PAGE_DESCRIPTION =
  'Browse reusable AI agent automation skills with installation commands, usage triggers, and implementation guides.'
const INSTALL_COMMAND_EXAMPLE =
  'npx skills add https://github.com/microlinkhq/skills --skill <skill-slug>'

const SKILL_CATEGORIES = [
  {
    id: 'web-automation',
    title: 'Web Automation & Scraping',
    description:
      'Skills for browser control, rendered HTML extraction, and page-level automation tasks.',
    match: /(browser|puppeteer|html|lighthouse|screenshot|rendered|scrap)/i
  },
  {
    id: 'metadata-and-apis',
    title: 'Metadata & API Extraction',
    description:
      'Skills focused on URL enrichment, metadata parsing, and API-driven extraction workflows.',
    match: /(metascraper|metadata|open graph|twitter|mql|api|json-ld|extract)/i
  },
  {
    id: 'infra-and-performance',
    title: 'Infrastructure & Performance',
    description:
      'Skills for backend reliability, caching, Kubernetes scaling, and Node.js performance tuning.',
    match:
      /(kubernetes|hpa|scale|cache|keyv|redis|postgres|mysql|latency|throughput|performance)/i
  },
  {
    id: 'media-and-assets',
    title: 'Media and Asset Optimization',
    description:
      'Skills for image/video optimization, format conversion, and media pipeline automation.',
    match: /(image|video|ffmpeg|optimo|pdf|asset)/i
  },
  {
    id: 'identity-and-profiles',
    title: 'Identity and Profile Data',
    description:
      'Skills for user identity helpers such as avatar resolution from usernames, emails, and domains.',
    match: /(avatar|profile|unavatar|email|username|domain)/i
  }
]

const groupedSkills = (() => {
  const groups = SKILL_CATEGORIES.map(category => ({ ...category, skills: [] }))
  const uncategorized = []

  enrichedSkills.forEach(skill => {
    const target = `${skill.slug} ${skill.name} ${skill.description}`
    const match = groups.find(category => category.match.test(target))

    if (match) {
      match.skills.push(skill)
      return
    }

    uncategorized.push(skill)
  })

  const nonEmptyGroups = groups.filter(category => category.skills.length > 0)
  if (uncategorized.length > 0) {
    nonEmptyGroups.push({
      id: 'other-skills',
      title: 'Other Skills',
      description: 'Additional skills for specialized workflows.',
      skills: uncategorized
    })
  }

  return nonEmptyGroups
})()

const skillsStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SKILLS_PAGE_URL}#collection`,
    url: SKILLS_PAGE_URL,
    name: 'Microlink Skills',
    description: SKILLS_PAGE_DESCRIPTION,
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://microlink.io',
      url: 'https://microlink.io',
      name: 'Microlink'
    },
    mainEntity: {
      '@id': `${SKILLS_PAGE_URL}#itemlist`
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SKILLS_PAGE_URL}#itemlist`,
    name: 'Microlink Skills Directory',
    url: SKILLS_PAGE_URL,
    numberOfItems: enrichedSkills.length,
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement: enrichedSkills.map((skill, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebPage',
        '@id': `${SKILLS_PAGE_URL}/${skill.slug}`,
        url: `${SKILLS_PAGE_URL}/${skill.slug}`,
        name: skill.name,
        description: getBaseDescription(skill.description)
      }
    }))
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SKILLS_PAGE_URL}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://microlink.io'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Skills',
        item: SKILLS_PAGE_URL
      }
    ]
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SKILLS_PAGE_URL}#faq`,
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are Microlink skills?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Microlink skills are reusable guides that tell AI agents when and how to run specific workflows.'
        }
      },
      {
        '@type': 'Question',
        name: 'How do I install a skill?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Run ${INSTALL_COMMAND_EXAMPLE} in your terminal.`
        }
      },
      {
        '@type': 'Question',
        name: 'How can I request a new skill?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Open a new issue in the microlinkhq/skills repository and describe the workflow you need.'
        }
      }
    ]
  }
]

export const Head = () => (
  <Meta
    title='AI Agent Skills Directory'
    description={SKILLS_PAGE_DESCRIPTION}
    schemaType='CollectionPage'
    structured={skillsStructuredData}
  />
)

const SkillCard = ({ skill }) => (
  <Flex
    key={skill.slug}
    id={`skill-${skill.slug}`}
    css={theme({
      width: ['100%', '100%', '49%'],
      mb: 3
    })}
  >
    <Card
      width='100%'
      height='100%'
      css={theme({
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      })}
    >
      <Link
        href={`/skills/${skill.slug}`}
        css={theme({
          color: 'black',
          display: 'block',
          height: '100%',
          width: '100%',
          _hover: { color: 'inherit' }
        })}
      >
        <Box
          css={theme({
            p: 4,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          })}
        >
          <Text as='h3' css={theme({ fontWeight: 'bold', fontSize: 2, m: 0 })}>
            {skill.name}
          </Text>
          <Text
            css={theme({
              color: 'black60',
              mt: 2,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            })}
          >
            {skill.summary}
          </Text>
          {skill.bestFor && (
            <Text
              css={theme({ color: 'black50', mt: 'auto', pt: 2, fontSize: 0 })}
            >
              {`Best for: ${skill.bestFor}`}
            </Text>
          )}
        </Box>
      </Link>
    </Card>
  </Flex>
)

const SkillsPage = () => (
  <FlickeringBackground>
    <Layout footer={{ style: { background: 'transparent' } }}>
      <Flex css={theme({ flexDirection: 'column', alignItems: 'center' })}>
        <Flex
          css={theme({
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          })}
        >
          <Heading variant={null} css={theme({ maxWidth: layout.large })}>
            Microlink{' '}
            <Heading titleize={false} as='span'>
              SKILLS
            </Heading>
          </Heading>
          <Caption
            forwardedAs='h2'
            titleize={false}
            css={theme({ pt: 3, px: 4, maxWidth: layout.small })}
          >
            A curated set of reusable skills built for AI agents.
          </Caption>
          <Text
            css={theme({
              pt: 3,
              px: 4,
              maxWidth: layout.normal,
              color: 'black60'
            })}
          >
            Browse by workflow category, open individual skill pages for full
            implementation details, and copy install commands directly.
          </Text>
        </Flex>

        <Flex
          as='nav'
          aria-label='Browse skills by workflow category'
          css={theme({
            justifyContent: 'center',
            pt: 3,
            width: '100%',
            maxWidth: layout.large,
            flexWrap: 'wrap',
            gap: 3
          })}
        >
          {groupedSkills.map(category => (
            <Link key={category.id} href={`/skills/#${category.id}`}>
              {`${category.title} (${category.skills.length})`}
            </Link>
          ))}
        </Flex>

        {groupedSkills.map(category => (
          <Flex
            key={category.id}
            id={category.id}
            css={theme({
              flexDirection: 'column',
              alignItems: 'center',
              pt: [4, null, 5],
              width: '100%',
              maxWidth: layout.large
            })}
          >
            <Box css={theme({ pb: 3, textAlign: 'center' })}>
              <Text
                as='h2'
                css={theme({
                  fontWeight: 'bold',
                  fontSize: [3, 4],
                  m: 0
                })}
              >
                {category.title}
              </Text>
              <Text
                css={theme({
                  color: 'black60'
                })}
              >
                {category.description}
              </Text>
            </Box>
            <Flex
              css={theme({
                pt: 3,
                width: '100%',
                flexWrap: 'wrap',
                justifyContent: 'space-between'
              })}
            >
              {category.skills.map(skill => (
                <SkillCard key={skill.slug} skill={skill} />
              ))}
            </Flex>
          </Flex>
        ))}

        <Flex
          css={theme({
            pt: [5, null, 6],
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: ['column', null, 'row'],
            width: '100%',
            maxWidth: layout.large
          })}
        >
          <Subhead>Miss a skill?</Subhead>
          <Box css={theme({ pt: [4, null, 0] })}>
            <Button
              onClick={() => {
                window.open(REQUEST_SKILL_URL, '_blank', 'noopener noreferrer')
              }}
            >
              <Caps>Request a Skill</Caps>
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Layout>
  </FlickeringBackground>
)

export default SkillsPage
