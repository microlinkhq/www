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
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Link } from 'components/elements/Link'

import { BUILD, SectionBlock } from './shared'

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

export const Products = () => (
  <SectionBlock
    id='products'
    bg='pinky'
    title='Everything you can build with the API'
    caption='Each product is a parameter on the same endpoint. Pick a workflow, then read the page behind it.'
  >
    <Cards>
      {BUILD.map(product => {
        const Icon = product.icon
        return (
          <Box as='li' key={product.label} css={theme({ minWidth: 0 })}>
            <Card href={product.href}>
              <Flex css={theme({ alignItems: 'center', gap: 3, pb: 2 })}>
                <Flex
                  aria-hidden='true'
                  css={theme({
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'black80',
                    flexShrink: 0
                  })}
                >
                  <Icon size={20} />
                </Flex>
                <Text
                  as='h3'
                  css={theme({
                    m: 0,
                    color: 'black',
                    fontWeight: 'bold',
                    minWidth: 0
                  })}
                >
                  {product.label}
                </Text>
              </Flex>
              <Text
                css={theme({
                  color: 'black70',
                  fontSize: 1,
                  lineHeight: 2,
                  flex: 1
                })}
              >
                {product.description}
              </Text>
            </Card>
          </Box>
        )
      })}
    </Cards>
  </SectionBlock>
)
