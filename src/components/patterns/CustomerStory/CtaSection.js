import { colors, layout, theme } from 'theme'
import React from 'react'

import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import ArrowLink from 'components/patterns/ArrowLink'

import { Section, SectionInner } from './primitives'

export const CtaSection = ({
  accent,
  headlinePrefix,
  headlineAccent,
  body,
  href,
  label,
  mt = 5
}) => {
  return (
    <Section
      css={`
        background-color: ${colors.link}0F;
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
        <Text
          as='h2'
          css={theme({
            color: 'black',
            fontSize: ['28px', '32px', '40px', '46px'],
            letterSpacing: '-0.01em',
            lineHeight: 0,
            fontWeight: 'bold'
          })}
        >
          {headlinePrefix}{' '}
          <span css={theme({ color: accent.text })}>{headlineAccent}</span>?
        </Text>
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
