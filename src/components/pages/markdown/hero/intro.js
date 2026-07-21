import React from 'react'
import { layout, theme } from 'theme'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import ArrowLink from 'components/patterns/ArrowLink'
import { withTitle } from 'helpers/hoc/with-title'
import { Caption } from '../shared'

const Heading = withTitle(HeadingBase)

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
      <ArrowLink href='/docs/guides/content-conversion/url-to-markdown'>
        Get Started
      </ArrowLink>
    </Flex>
  </Flex>
)
