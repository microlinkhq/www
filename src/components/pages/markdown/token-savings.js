import React from 'react'
import { SECTION_VERTICAL_SPACING, borders, colors, theme } from 'theme'
import Flex from 'components/elements/Flex'
import ArrowLink from 'components/patterns/ArrowLink'
import { Caption, Subhead } from './shared'

export const TokenSavings = () => (
  <section
    id='token-savings'
    css={theme({
      position: 'relative',
      overflow: 'hidden',
      width: '100%',
      py: SECTION_VERTICAL_SPACING,
      backgroundImage: `radial-gradient(
        circle at center right,
        ${colors.orange9} 0%,
        ${colors.orange9} 48%,
        ${colors.orange8} 48%,
        ${colors.orange8} 52%,
        ${colors.orange7} 52%,
        ${colors.orange7} 65%,
        ${colors.orange6} 65%,
        ${colors.orange6} 79%,
        ${colors.orange5} 79%,
        ${colors.orange5} 100%
      )`,
      borderTop: `${borders[1]} ${colors.white20}`,
      borderBottom: `${borders[1]} ${colors.white20}`
    })}
  >
    <Flex
      css={theme({
        position: 'relative',
        zIndex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 4,
        gap: [3, 3, 4, 4]
      })}
    >
      <Subhead
        css={theme({
          color: 'white',
          textAlign: 'center'
        })}
      >
        80% fewer tokens per page{' '}
        <span css={theme({ display: 'block', color: 'white60' })}>
          5x more content per context window
        </span>
      </Subhead>
      <Caption
        forwardedAs='div'
        css={theme({
          color: 'white80',
          textAlign: 'center',
          width: '100%',
          px: [4, 4, 4, 0]
        })}
      >
        A markdown converter for LLMs: 20,000 HTML tokens becomes 4,000 markdown
        tokens.
        <br />
        Feed more content into every LLM call and cut inference costs at scale.
      </Caption>
      <ArrowLink
        href='/docs/guides/content-conversion/url-to-markdown'
        css={theme({
          fontSize: ['22px', '24px', '26px', '26px'],
          color: 'white'
        })}
        style={{ color: 'white' }}
      >
        See how it works
      </ArrowLink>
    </Flex>
  </section>
)
