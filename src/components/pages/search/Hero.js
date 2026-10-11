import React from 'react'

import { layout, theme } from 'theme'

import Box from 'components/elements/Box'
import { Button } from 'components/elements/Button/Button'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import List from 'components/patterns/List/List'
import { SignupLink } from 'components/patterns/SignupLink'

import { SEARCH_LAYOUT_WIDE_MAX_WIDTH } from './'

import Playground from './Playground'

const HERO_LAYOUT_MAX_WIDTH = [
  '100%',
  '100%',
  '100%',
  SEARCH_LAYOUT_WIDE_MAX_WIDTH
]

const HERO_HEADING_FONT_SIZE = ['36px', '36px', 5, 5]

const heroProofListItemCss = theme({
  m: 0,
  mb: 0,
  color: 'black80',
  fontSize: [1, 1, 2, 2],
  textAlign: 'left'
})

const HERO_PROOF_POINTS = [
  '10 supported search surfaces in one client.',
  'Structured results plus LLM-ready Markdown and HTML for top matches.',
  'Structured results for prices, ratings, coordinates, and citations.',
  'Proxy-backed requests from the first call.'
]

const HeroSection = () => (
  <Container
    as='section'
    id='google-verticals'
    css={theme({ pt: 0, maxWidth: HERO_LAYOUT_MAX_WIDTH })}
  >
    <Box css={theme({ width: '100%', mx: 'auto' })}>
      <Box
        css={theme({
          maxWidth: ['100%', '100%', layout.normal, layout.large],
          mx: 'auto'
        })}
      >
        <Text
          as='h1'
          css={theme({
            m: 0,
            color: 'black',
            fontWeight: 'bold',
            letterSpacing: 1,
            lineHeight: [1, 1, 0, 0],
            fontSize: HERO_HEADING_FONT_SIZE,
            textAlign: 'center'
          })}
        >
          Microlink Search <br />
          <Text
            as='span'
            variant='gradient'
            css={theme({
              fontSize: 'inherit',
              fontWeight: 'inherit',
              letterSpacing: 'inherit',
              lineHeight: 'inherit'
            })}
          >
            for AI Agents
          </Text>
        </Text>
        <Text
          as='p'
          css={theme({
            m: 0,
            mt: 3,
            maxWidth: '100%',
            mx: 'auto',
            color: 'black80',
            fontSize: [2, 2, 3, 3],
            lineHeight: 2,
            textAlign: 'center'
          })}
        >
          Search results in ~1s via a unified API. One client, normalized JSON
          for tools, prompts, and RAG pipelines.
        </Text>
        <Flex id='cta' css={theme({ justifyContent: 'center', pt: 4 })}>
          <SignupLink component={Button} as='a' cta='search:hero'>
            Get your free API key
          </SignupLink>
        </Flex>
      </Box>

      <Playground />

      <Box id='features' as='section' css={theme({ pt: [5, 5, 6, 6] })}>
        <Box
          as='ul'
          css={theme({
            listStyle: 'none',
            p: 0,
            m: 0,
            width: 'max-content',
            maxWidth: '100%',
            mx: 'auto'
          })}
        >
          {HERO_PROOF_POINTS.map((point, index) => (
            <List.Item
              key={point}
              alignItems='flex-start'
              css={heroProofListItemCss}
              $isLast={index === HERO_PROOF_POINTS.length - 1}
            >
              {point}
            </List.Item>
          ))}
        </Box>
      </Box>
    </Box>
  </Container>
)

export default HeroSection
