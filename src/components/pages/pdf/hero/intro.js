import React from 'react'
import { layout, theme } from 'theme'
import Flex from 'components/elements/Flex'
import HeadingBase from 'components/elements/Heading'
import ArrowLink from 'components/patterns/ArrowLink'
import { withTitle } from 'helpers/hoc/with-title'
import { Caption, HERO_LAYOUT } from '../shared'

const Heading = withTitle(HeadingBase)

export const HeroIntro = () => (
  <Flex
    css={theme({
      flexDirection: 'column',
      width: ['100%', '100%', '100%', HERO_LAYOUT.secondaryWidth],
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
      URL to PDF API for developers
    </Heading>
    <Caption
      forwardedAs='h2'
      css={theme({
        pt: [3, 3, 4, 4],
        px: [1, 2, 4, 0],
        maxWidth: ['100%', layout.small, layout.small, '640px'],
        textAlign: ['center', 'center', 'center', 'left']
      })}
    >
      The HTML to PDF service that turns any URL into a professional PDF
      document. Convert web pages to PDF with full browser control, custom
      formatting, and enterprise-grade reliability.
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
      <ArrowLink href='/docs/guides/pdf'>Get Started</ArrowLink>
    </Flex>
  </Flex>
)
