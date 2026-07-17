import { layout, theme, SECTION_VERTICAL_SPACING } from 'theme'
import Layout from 'components/patterns/Layout'
import { DashedGridOverlay } from 'components/patterns/CustomerStory/DashedGridOverlay'
import { Sparkles } from 'components/icons/Sparkles'
import FeatherIcon from 'components/icons/Feather'
import React from 'react'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Caps from 'components/elements/Caps'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import Meta from 'components/elements/Meta/Meta'
import SubheadBase from 'components/elements/Subhead'
import Text from 'components/elements/Text'
import { withTitle } from 'helpers/hoc/with-title'
import {
  enrichedSkills,
  getBaseDescription,
  SKILLS_PAGE_URL
} from 'helpers/skills'

import CategoryNav from 'components/pages/skills/CategoryNav'
import CategorySection from 'components/pages/skills/CategorySection'
import { groupedSkills } from 'components/pages/skills/catalog'

const Subhead = withTitle(SubheadBase)

const REQUEST_SKILL_URL = 'https://github.com/microlinkhq/skills/issues/new'
const SKILLS_PAGE_DESCRIPTION =
  'Browse reusable AI agent automation skills with installation commands, usage triggers, and implementation guides.'
const INSTALL_COMMAND_EXAMPLE =
  'npx skills add https://github.com/microlinkhq/skills --skill <skill-slug>'

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

const Hero = () => (
  <Flex
    css={theme({
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      pb: SECTION_VERTICAL_SPACING
    })}
  >
    <Heading variant={null} css={theme({ maxWidth: layout.normal })}>
      A curated set of reusable <Heading as='span'>skills</Heading> built for AI
      agents.
    </Heading>
    <Text
      css={theme({
        pt: 3,
        maxWidth: layout.small,
        color: 'black60'
      })}
    >
      Browse by workflow category, open individual skill pages for full
      implementation details, and copy install commands directly.
    </Text>
  </Flex>
)

const RequestSkill = () => (
  <Flex
    as='section'
    aria-labelledby='request-skill-title'
    css={theme({
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: ['column', 'column', 'row', 'row'],
      gap: 3,
      p: [3, 3, 4, 4],
      width: '100%',
      maxWidth: layout.large,
      borderRadius: 5,
      bg: 'gray0'
    })}
  >
    <Box css={theme({ textAlign: ['center', 'center', 'left', 'left'] })}>
      <Subhead
        id='request-skill-title'
        forwardedAs='h2'
        css={theme({
          textAlign: ['center', 'center', 'left', 'left'],
          m: 0
        })}
      >
        Miss a skill?
      </Subhead>
      <Text
        css={theme({
          color: 'black60',
          fontSize: 0,
          pt: 2,
          textAlign: ['center', 'center', 'left', 'left']
        })}
      >
        Request a skill and we’ll build it for you.
      </Text>
    </Box>
    <Button
      as='a'
      href={REQUEST_SKILL_URL}
      target='_blank'
      rel='noopener noreferrer'
    >
      <Flex
        css={theme({ alignItems: 'center', justifyContent: 'center', gap: 2 })}
      >
        <FeatherIcon icon={Sparkles} size={0} aria-hidden='true' />
        <Caps>Request a Skill</Caps>
      </Flex>
    </Button>
  </Flex>
)

const SkillsPage = () => (
  <Layout css={theme({ position: 'relative' })}>
    <DashedGridOverlay aria-hidden='true' />
    <Flex
      css={theme({
        position: 'relative',
        zIndex: 1,
        flexDirection: 'column',
        alignItems: 'center'
      })}
    >
      <Hero />
      <CategoryNav categories={groupedSkills} />
      <Flex
        css={theme({
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          pt: 4,
          pb: SECTION_VERTICAL_SPACING,
          width: '100%'
        })}
      >
        {groupedSkills.map(category => (
          <CategorySection key={category.id} category={category} />
        ))}
        <RequestSkill />
      </Flex>
    </Flex>
  </Layout>
)

export default SkillsPage
