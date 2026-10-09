import { colors, layout, theme } from 'theme'
import React from 'react'

import Flex from 'components/elements/Flex'
import Subhead from 'components/elements/Subhead'
import Text from 'components/elements/Text'

import { Link } from 'components/elements/Link'
import ArrowLink from 'components/patterns/ArrowLink'
import { SignupLink } from 'components/patterns/SignupLink'

import { Section, SectionInner } from './primitives'

export const CtaSection = ({
  accent,
  headlinePrefix,
  headlineAccent,
  body,
  href,
  label,
  signupCta,
  mt = 5
}) => {
  const linkCss = theme({
    color: 'link',
    fontWeight: 'bold',
    fontSize: [2, 2, 3, 3]
  })

  return (
    <Section
      css={`
        background-color: color-mix(in oklch, ${colors.link} 6%, transparent);
        ${theme({
          borderTop: 1,
          borderTopColor: accent.bgEdge,
          borderBottom: 1,
          borderBottomColor: accent.bgEdge,
          mt
        })}
      `}
    >
      <SectionInner css={theme({ textAlign: 'center' })}>
        <Subhead css={theme({ color: 'black' })}>
          {headlinePrefix}{' '}
          <span css={theme({ color: accent.text })}>{headlineAccent}</span>?
        </Subhead>
        <Text
          as='p'
          css={theme({
            color: 'black70',
            pt: [3, 3, 4, 4],
            maxWidth: layout.small,
            mx: 'auto'
          })}
        >
          {body}
        </Text>
        <Flex
          css={theme({
            pt: [3, 4, 4, 4],
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: ['column', 'row', 'row', 'row'],
            gap: [3, 3, 4, 4]
          })}
        >
          {signupCta
            ? (
              <>
                <SignupLink cta={signupCta} css={linkCss}>
                  Get your free API key
                </SignupLink>
                <Link href={href} css={theme({ fontSize: [2, 2, 3, 3] })}>
                  {label}
                </Link>
              </>
              )
            : (
              <ArrowLink href={href} css={linkCss}>
                {label}
              </ArrowLink>
              )}
        </Flex>
      </SectionInner>
    </Section>
  )
}
