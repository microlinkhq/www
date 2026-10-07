import React from 'react'
import { layout, theme } from 'theme'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import { SignupLink } from 'components/patterns/SignupLink'
import { Caption } from '../shared'

export const HeroIntro = ({ heroLayout }) => (
  <Flex
    css={theme({
      flexDirection: 'column',
      width: ['100%', '100%', '100%', heroLayout.secondaryWidth],
      justifyContent: 'center',
      alignItems: ['center', 'center', 'center', 'flex-start']
    })}
  >
    <Heading
      css={theme({
        px: [2, 3, 4, 0],
        maxWidth: ['100%', '100%', '100%', '640px'],
        textAlign: ['center', 'center', 'center', 'left']
      })}
    >
      URL to markdown API for AI agents
    </Heading>
    <Caption
      css={theme({
        pt: [3, 3, 4, 4],
        px: [1, 2, 4, 0],
        maxWidth: ['100%', layout.small, layout.small, '640px'],
        textAlign: ['center', 'center', 'center', 'left']
      })}
    >
      The URL to markdown API that converts any web page to clean markdown with
      80% fewer tokens than raw HTML. Built for AI agent crawling, LLM
      ingestion, and RAG pipelines.
    </Caption>
    <Flex
      css={theme({
        pt: [3, 3, 4, 4],
        px: [4, 4, 4, 0],
        width: '100%',
        fontSize: [2, 2, 3, 3],
        justifyContent: ['center', 'center', 'center', 'flex-start']
      })}
    >
      <SignupLink cta='markdown:hero'>Get Started</SignupLink>
    </Flex>
  </Flex>
)
