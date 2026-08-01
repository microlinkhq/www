import styled, { css } from 'styled-components'
import { ChevronDown } from 'react-feather'
import React from 'react'
import { colors, theme } from 'theme'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import { FOCUS_RING, TAB_DESCRIPTION_STYLE } from './styles'

const Select = styled.select(
  theme({
    width: '100%',
    bg: 'pinkest',
    border: 0,
    borderRadius: 0,
    boxShadow: 'none',
    fontFamily: 'sans',
    fontSize: 1,
    fontWeight: 'bold',
    color: 'black',
    lineHeight: 2,
    py: 0,
    pl: 0,
    pr: '28px',
    m: 0
  }),
  css`
    appearance: none;
    cursor: pointer;
    touch-action: manipulation;

    &:focus-visible {
      ${FOCUS_RING}
    }
  `
)

const Card = styled(Box)(
  theme({
    display: ['block', 'block', 'none', 'none'],
    minWidth: 0,
    bg: 'pinkest',
    border: 1,
    borderColor: 'secondary',
    borderRadius: 3,
    boxShadow: `inset 0 0 0 1px ${colors.secondary}`,
    p: 3,
    textAlign: 'left'
  })
)

const ExamplesSelect = ({ panels, active, label, onSelect }) => (
  <Card>
    <Box css={theme({ position: 'relative', mb: 1 })}>
      <Select
        aria-label={label}
        value={active.id}
        onChange={event => onSelect(event.target.selectedIndex)}
      >
        {panels.map(panel => (
          <option key={panel.id} value={panel.id}>
            {panel.title}
          </option>
        ))}
      </Select>
      <Flex
        aria-hidden
        css={theme({
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          color: 'black',
          pointerEvents: 'none'
        })}
      >
        <ChevronDown size={18} strokeWidth={2.25} />
      </Flex>
    </Box>
    <Text css={TAB_DESCRIPTION_STYLE}>{active.description}</Text>
  </Card>
)

export default ExamplesSelect
