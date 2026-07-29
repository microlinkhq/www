import { theme, shadows, transition, shadowInk, colors } from 'theme'
import React from 'react'
import styled, { css } from 'styled-components'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { Link } from 'components/elements/Link'
import Text from 'components/elements/Text'
import ProBadge from 'components/patterns/ProBadge/ProBadge'

import { FeatureIconTile } from './feature-icon'

const CARD_HOVER_SHADOW = `0 22px 46px -28px rgba(${shadowInk}, 0.35)`

const Card = styled(Link)(
  theme({
    bg: 'white',
    border: 1,
    borderRadius: 4,
    p: [3, 3, '18px', '18px'],
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    color: 'black',
    textDecoration: 'none',
    boxShadow: shadows[1],
    _hover: { color: 'black' }
  }),
  css`
    border-color: ${props => colors[props.$border] || colors.gray2};
    transition: border-color ${transition.medium},
      box-shadow ${transition.medium}, transform ${transition.medium};

    > a {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-width: 0;
      height: 100%;
      color: inherit;
      text-decoration: none;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        border-color: ${props => colors[props.$accent] || colors.gray4};
        box-shadow: ${CARD_HOVER_SHADOW};
      }

      @media (prefers-reduced-motion: no-preference) {
        &:hover {
          transform: translateY(-3px);
        }
      }
    }
  `
)

export const FeatureCard = ({ feature, showTeachLine = false }) => {
  const href = `/features/${feature.slug}`
  const teachLine = showTeachLine ? feature.teachLine : null

  return (
    <Card href={href} $accent={feature.iconBg} $border={feature.borderColor}>
      <Flex css={theme({ alignItems: 'center', gap: 3, pb: 2 })}>
        <FeatureIconTile name={feature.icon} bg={feature.iconBg} />
        <Text
          as='h3'
          css={theme({
            m: 0,
            color: 'black',
            fontSize: 2,
            fontWeight: 'bold',
            lineHeight: 1,
            minWidth: 0,
            flex: '1 1 auto'
          })}
        >
          {feature.name}
        </Text>
        {feature.tag === 'PRO' && (
          <Box
            css={theme({ flexShrink: 0 })}
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
            }}
            onMouseDown={e => e.stopPropagation()}
          >
            <ProBadge />
          </Box>
        )}
      </Flex>

      <Text
        css={theme({
          color: 'black70',
          fontSize: 1,
          lineHeight: 2,
          flex: teachLine ? '0 0 auto' : '1 1 auto',
          pb: teachLine ? 2 : 0
        })}
      >
        {feature.oneLiner}
      </Text>
      {teachLine && (
        <Text
          css={theme({
            color: 'black60',
            fontSize: 1,
            lineHeight: 2,
            flex: '1 1 auto',
            fontFamily: 'sans'
          })}
        >
          {teachLine}
        </Text>
      )}
    </Card>
  )
}
