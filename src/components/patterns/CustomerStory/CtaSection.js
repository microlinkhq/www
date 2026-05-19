import { layout, theme } from 'theme'
import React from 'react'

import Flex from 'components/elements/Flex'
import SubheadBase from 'components/elements/Subhead'

import ArrowLink from 'components/patterns/ArrowLink'
import CaptionBase from 'components/patterns/Caption/Caption'

import { withTitle } from 'helpers/hoc/with-title'

import { Section, SectionInner } from './primitives'

const Caption = withTitle(CaptionBase)

const ACCENT_RGB = {
  teal7: '12, 166, 120',
  blue7: '28, 126, 214',
  cyan7: '16, 152, 173',
  green7: '55, 178, 77',
  orange7: '247, 103, 7',
  yellow7: '245, 159, 0'
}

export const CtaSection = ({
  accent,
  headlinePrefix,
  headlineAccent,
  body,
  href,
  label,
  mt = 5
}) => {
  const rgb = ACCENT_RGB[accent.text]
  return (
    <Section
      css={`
        background-color: rgba(${rgb}, 0.06);
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
        <SubheadBase
          css={theme({
            color: 'black',
            fontSize: ['28px', '32px', '40px', '46px'],
            letterSpacing: '-0.01em',
            lineHeight: 0
          })}
        >
          {headlinePrefix}{' '}
          <span css={theme({ color: accent.text })}>{headlineAccent}</span>?
        </SubheadBase>
        <Caption
          forwardedAs='p'
          titleize={false}
          css={theme({
            color: 'black70',
            pt: [3, 3, 4, 4],
            fontSize: [1, 2, 2, 2],
            maxWidth: layout.small,
            mx: 'auto'
          })}
        >
          {body}
        </Caption>
        <Flex
          css={theme({
            pt: [3, 4, 4, 4],
            justifyContent: 'center',
            alignItems: 'center'
          })}
        >
          <ArrowLink
            href={href}
            css={theme({
              color: 'link',
              fontWeight: 'bold',
              fontSize: [2, 2, 3, 3]
            })}
          >
            {label}
          </ArrowLink>
        </Flex>
      </SectionInner>
    </Section>
  )
}
