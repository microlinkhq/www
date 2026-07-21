import React from 'react'
import { GitMerge, Hexagon, Target } from 'react-feather'

import { colors, layout, theme } from 'theme'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import ArrowLink from 'components/patterns/ArrowLink'

import { GUIDE_URL, PACKAGE_URL } from 'helpers/search-landing'

import { ActionRow, SEARCH_LAYOUT_WIDE_MAX_WIDTH, TutorialTimeline } from './'

import { SectionCaption, TutorialStep } from './Sections'

const SECTION_HEADING_FONT_SIZE_MEDIUM = ['36px', '42px', '36px', '36px']

const INTEGRATION_TUTORIAL_STEPS = [
  {
    step: '1',
    title: 'Install and initialize',
    icon: Target,
    description:
      'Install @microlink/google, add your Microlink API key, and create one client you can reuse across every supported search surface.',
    panel: {
      type: 'code',
      language: 'bash',
      content: 'pnpm add @microlink/google'
    }
  },
  {
    step: '2',
    title: 'Run the first query',
    icon: Hexagon,
    description:
      'Choose the surface you need with the type option and keep the same client shape for search, news, images, maps, shopping, and more.',
    panel: {
      type: 'code',
      language: 'javascript',
      content: `
      const google = require('@microlink/google')({
        apiKey: process.env.MICROLINK_API_KEY
      })

      const page = await google('ai agents', {
  type: 'search'
})

console.log(page.results)`
    }
  },
  {
    step: '3',
    title: 'Lazy-load the web',
    icon: GitMerge,
    description:
      'Keep the first pass fast, then enrich only the winners. Browse lightweight result pages first and call .markdown() or .html() only for the top matches that deserve deeper inspection.',
    panel: {
      type: 'features',
      items: [
        'Any result with a URL exposes .markdown() for LLM-ready Markdown on demand.',
        'Call .html() only when your workflow actually needs raw page markup.',
        'Just call .next() to fetch the next page.',
        'Lazy-load the web: scan results at ~1s latency, then enrich only the top 3 matches.'
      ]
    }
  }
]

const IntegrationSection = () => (
  <Box
    as='section'
    id='google-api-integration'
    css={theme({ py: [5, 5, 6, 6] })}
  >
    <Container
      css={theme({
        p: 0,
        maxWidth: ['100%', '100%', layout.large, SEARCH_LAYOUT_WIDE_MAX_WIDTH]
      })}
    >
      <Flex
        css={theme({
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: ['center', 'center', 'flex-start', 'flex-start'],
          width: '100%',
          minWidth: 0,
          gap: [4, 4, 0, 0]
        })}
      >
        <Box
          css={theme({
            width: ['100%', '100%', '48%', '48%'],
            flexShrink: 0,
            minWidth: 0
          })}
        >
          <SectionCaption color={colors.green7}>
            Google SERP Scraper
          </SectionCaption>
          <Text
            as='h2'
            css={theme({
              m: 0,
              color: 'black',
              fontWeight: 'bold',
              letterSpacing: 1,
              lineHeight: [1, 1, 0, 0],
              fontSize: SECTION_HEADING_FONT_SIZE_MEDIUM,
              textAlign: 'left'
            })}
          >
            Automate Web Discovery
            <br />
            <span css={theme({ color: 'green7' })}>without scraper debt</span>
          </Text>
          <Text
            as='p'
            css={theme({
              m: 0,
              mt: 3,
              color: 'black80',
              fontSize: [1, 1, 2, 2],
              lineHeight: 2,
              textAlign: 'left',
              maxWidth: layout.small
            })}
          >
            Initialize once, choose the surface you need, then paginate or
            enrich only when a workflow needs more context.
          </Text>
        </Box>

        <Box
          css={theme({
            width: ['100%', '100%', '52%', '52%'],
            minWidth: 0
          })}
        >
          <TutorialTimeline>
            {INTEGRATION_TUTORIAL_STEPS.map(step => (
              <TutorialStep key={step.step} step={step} />
            ))}
          </TutorialTimeline>

          <ActionRow
            css={theme({
              mt: [4, 4, 5, 5],
              ml: [0, 0, '104px', '104px'],
              flexDirection: 'row',
              flexWrap: 'nowrap',
              alignItems: 'center',
              justifyContent: ['center', 'center', 'flex-start', 'flex-start'],
              gap: [4, 4, 4, 4],
              '& > *': { flexShrink: 0 }
            })}
          >
            <Button as='a' href={PACKAGE_URL}>
              See @microlink/google
            </Button>
            <ArrowLink href={GUIDE_URL}>View docs</ArrowLink>
          </ActionRow>
        </Box>
      </Flex>
    </Container>
  </Box>
)

export default IntegrationSection
