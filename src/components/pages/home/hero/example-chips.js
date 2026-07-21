import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import { transition, theme } from 'theme'
import React from 'react'
import styled from 'styled-components'

import { EXAMPLE_CHIPS } from './constants'
import { VertGlyph } from './primitives'

const ExampleChip = styled.button`
  cursor: pointer;
  transition: border-color ${transition.short}, color ${transition.short},
    transform ${transition.short};
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    fontFamily: 'sans',
    fontSize: '13px',
    bg: 'white',
    color: 'gray7',
    border: 1,
    borderColor: 'gray2',
    py: 2,
    px: '13px',
    borderRadius: '999px'
  })};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${props => props.$border};
      ${theme({ color: 'black' })};
    }
  }

  &:active {
    transform: scale(0.97);
  }
`

export const ExampleChips = ({ D, pickExample }) => (
  <Flex
    css={theme({
      gap: 2,
      mt: 3,
      flexWrap: 'wrap',
      justifyContent: 'center'
    })}
  >
    {EXAMPLE_CHIPS.map(({ text, vertical }) => (
      <ExampleChip
        key={text}
        $border={D.vertBorder}
        onClick={pickExample(text)}
      >
        <Box as='span' css={theme({ color: 'grape7', display: 'flex' })}>
          <VertGlyph vertical={vertical} size={15} />
        </Box>
        {text}
      </ExampleChip>
    ))}
  </Flex>
)
