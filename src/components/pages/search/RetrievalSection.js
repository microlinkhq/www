import React from 'react'

import { colors, layout, theme } from 'theme'

import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import { SEARCH_LAYOUT_WIDE_MAX_WIDTH } from './'
import { RetrievalFeatureCard, SectionCaption } from './Sections'
import { SECTION_HEADING_FONT_SIZE } from './constants'

const RetrievalSection = () => (
  <Box as='section' id='retrieval-workflows' css={theme({ py: [5, 5, 6, 6] })}>
    <Container
      css={theme({
        maxWidth: ['100%', '100%', layout.large, SEARCH_LAYOUT_WIDE_MAX_WIDTH],
        pt: 0,
        px: [3, 3, 0, 0]
      })}
    >
      <Flex
        css={theme({
          width: '100%',
          maxWidth: [
            '100%',
            '100%',
            layout.large,
            SEARCH_LAYOUT_WIDE_MAX_WIDTH
          ],
          mx: 'auto',
          minWidth: 0,
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: ['stretch', 'stretch', 'center', 'center'],
          gap: [4, 4, 0, 0]
        })}
      >
        <Box
          css={theme({
            width: ['100%', '100%', '42%', '42%'],
            flexShrink: 0,
            pt: [0, 0, 2, 2]
          })}
        >
          <SectionCaption color={colors.red7}>
            Automated SERP Data
          </SectionCaption>
          <Text
            as='h2'
            css={theme({
              m: 0,
              color: 'black',
              fontWeight: 'bold',
              letterSpacing: 1,
              lineHeight: [1, 1, 0, 0],
              fontSize: SECTION_HEADING_FONT_SIZE,
              textAlign: 'left'
            })}
          >
            Scrape Google first, <br />
            <span css={theme({ color: 'red7' })}>fetch later</span>
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
              maxWidth: ['100%', '100%', layout.small, layout.small]
            })}
          >
            Search stays lightweight on the first pass so technical workflows
            can stay fast under real production load.
          </Text>
        </Box>

        <Box
          css={theme({
            width: ['100%', '100%', '58%', '58%'],
            minWidth: 0,
            display: 'grid',
            ml: [0, 0, 6, 6],
            gap: 4
          })}
        >
          <RetrievalFeatureCard
            icon='markdown'
            accent='blue'
            title='Ship LLM-ready Markdown'
            css={theme({ pb: 4 })}
            description='RAG pipelines rarely want raw HTML. They want cleaner text that is easier to embed, rerank, cite, and pass into prompts without wasting context on navigation or markup noise.'
          />
          <RetrievalFeatureCard
            icon='bolt'
            accent='blue'
            title='Lazy-load the web'
            css={theme({ pb: 4 })}
            description='Search works best as a two-step system: lightweight results first, deeper content second. That keeps the browse step snappy, then spends the heavier extraction cost only where confidence is already high.'
          />
          <RetrievalFeatureCard
            icon='search'
            accent='teal'
            title='Turn Search into a document discovery engine'
            css={theme({ pb: 0 })}
            description={
              <>
                Combine operators like <code>site:</code> and{' '}
                <code>filetype:</code> to hunt for papers, docs, filings,
                changelogs, or PDFs before you enrich anything. That gives
                technical teams much tighter recall from the first query.
              </>
            }
          />
        </Box>
      </Flex>
    </Container>
  </Box>
)

export default RetrievalSection
