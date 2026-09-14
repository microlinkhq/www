import React from 'react'
import styled, { css } from 'styled-components'
import {
  breakpoints,
  colors,
  shadows,
  theme,
  transition,
  shadowInk
} from 'theme'

import Box from 'components/elements/Box'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'

import { INTEGRATIONS, SectionBlock } from './shared'

const CARD_HOVER_SHADOW = `0 22px 46px -28px rgba(${shadowInk}, 0.35)`

const Card = styled(Link)(
  theme({
    bg: 'white',
    border: 1,
    borderColor: 'gray2',
    borderRadius: 4,
    p: [3, 3, 4, 4],
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
        border-color: ${colors.gray4};
        box-shadow: ${CARD_HOVER_SHADOW};
      }

      @media (prefers-reduced-motion: no-preference) {
        &:hover {
          transform: translateY(-1px);
        }
      }
    }
  `
)

const Cards = styled(Box).attrs({ as: 'ul' })`
  ${theme({
    display: 'grid',
    gap: 3,
    width: '100%',
    listStyle: 'none',
    p: 0,
    m: 0
  })}
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: ${breakpoints[1]}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${breakpoints[2]}) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`

export const Integrations = () => (
  <SectionBlock
    id='integrations'
    bg='pinky'
    title='Use it from code, a terminal, or an agent'
    caption='The endpoint is HTTP. These are the wrappers when you do not want to compose the query string by hand.'
  >
    <Cards>
      {INTEGRATIONS.map(item => (
        <Box as='li' key={item.href} css={theme({ minWidth: 0 })}>
          <Card href={item.href}>
            <Text
              as='h3'
              css={theme({
                m: 0,
                color: 'black',
                fontWeight: 'bold'
              })}
            >
              {item.label}
            </Text>
            <Text
              css={theme({
                pt: 2,
                color: 'black70',
                fontSize: 1,
                lineHeight: 2,
                flex: 1
              })}
            >
              {item.description}
            </Text>
          </Card>
        </Box>
      ))}
    </Cards>
  </SectionBlock>
)
