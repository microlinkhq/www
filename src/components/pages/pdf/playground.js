import React from 'react'
import styled, { keyframes } from 'styled-components'
import { SECTION_VERTICAL_SPACING, layout, theme } from 'theme'
import Box from 'components/elements/Box'
import Container from 'components/elements/Container'
import Flex from 'components/elements/Flex'
import { FeaturedToolCard } from 'components/patterns/Tools/ToolCards'
import { TOOLS as TOOL_CATALOG } from 'components/patterns/Tools/toolCatalog'
import { ChromeExtensionBannerCompact } from 'components/patterns/ChromeExtensionBanner/ChromeExtensionBanner'
import { ACCENT, Subhead, Caption } from './shared'

const PLAYGROUND_TOOL_PATHS = [
  '/tools/website-to-pdf',
  '/tools/website-to-pdf/bulk'
]
const PDF_TOOLS =
  TOOL_CATALOG.find(section => section.category === 'PDF')?.tools ?? []
const PLAYGROUND_TOOLS = PLAYGROUND_TOOL_PATHS.flatMap(path => {
  const tool = PDF_TOOLS.find(tool => tool.href === path)
  return tool ? [tool] : []
})

const livePulse = keyframes`
  0%, 62% { color: inherit; }
  70%, 90% { color: ${ACCENT}; }
  100% { color: inherit; }
`

const LiveText = styled('span')`
  animation: ${livePulse} 1.5s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    color: ${ACCENT};
  }
`

export const Playground = () => (
  <Container
    as='section'
    id='playground'
    css={theme({
      alignItems: 'center',
      width: '100%',
      py: SECTION_VERTICAL_SPACING,
      px: [1, 1, 5, 5]
    })}
  >
    <Flex
      css={theme({
        width: '100%',
        mx: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3
      })}
    >
      <Subhead
        css={theme({
          textAlign: 'center'
        })}
      >
        Try it <LiveText>live</LiveText>, right now
      </Subhead>
      <Caption
        css={theme({
          px: [4, 4, 4, 0],
          maxWidth: layout.large,
          textAlign: 'center'
        })}
      >
        Skip the setup. Our interactive website to PDF tool lets you test the
        PDF API instantly paste any URL, configure options, and download the
        result in real time.
      </Caption>

      <Flex
        css={theme({
          width: '100%',
          justifyContent: 'center',
          maxWidth: layout.large,
          pt: 4,
          gap: [4, 4, 4, 4],
          flexDirection: ['column', 'column', 'row', 'row'],
          alignItems: ['center', 'center', 'stretch', 'stretch']
        })}
      >
        {PLAYGROUND_TOOLS.map(tool => (
          <Box
            key={tool.href}
            css={theme({
              width: '100%',
              maxWidth: ['550px', '550px', 'none', 'none'],
              flex: [null, null, 1, 1]
            })}
          >
            <FeaturedToolCard
              {...tool}
              cardCss={{ height: '100%' }}
              titleCss={{ fontSize: [2, 2, 2, 2] }}
              descriptionCss={{ color: 'black60' }}
            />
          </Box>
        ))}
      </Flex>

      <ChromeExtensionBannerCompact
        css={theme({
          mt: 3,
          maxWidth: ['550px', '550px', layout.normal, layout.normal]
        })}
      />
    </Flex>
  </Container>
)
