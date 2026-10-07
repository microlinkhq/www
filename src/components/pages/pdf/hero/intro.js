import React from 'react'
import { layout, theme } from 'theme'
import Flex from 'components/elements/Flex'
import Heading from 'components/elements/Heading'
import { Link } from 'components/elements/Link'
import { SignupLink } from 'components/patterns/SignupLink'
import { Caption, HERO_LAYOUT } from '../shared'

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
        gap: [3, 3, 4, 4],
        flexDirection: ['column', 'row', 'row', 'row'],
        alignItems: 'center',
        justifyContent: ['center', 'center', 'center', 'flex-start']
      })}
    >
      <SignupLink cta='pdf:hero'>Get Started</SignupLink>
      <Link href='/docs/guides/pdf'>Read the guide</Link>
    </Flex>
  </Flex>
)
