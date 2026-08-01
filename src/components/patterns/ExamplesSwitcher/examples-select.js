import styled, { css } from 'styled-components'
import { ChevronDown } from 'react-feather'
import { colors, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import {
  MOBILE_ONLY,
  SECONDARY_FOCUS_RING,
  TAB_DESCRIPTION_STYLE,
  TAB_TITLE_STYLE
} from './styles'

const Select = styled.select(
  TAB_TITLE_STYLE,
  theme({
    appearance: 'none',
    cursor: 'pointer',
    touchAction: 'manipulation',
    width: '100%',
    bg: 'pinkest',
    color: 'black',
    border: 0,
    borderRadius: 0,
    boxShadow: 'none',
    p: 0,
    pr: '28px'
  }),
  css`
    -webkit-tap-highlight-color: transparent;

    &:focus-visible {
      ${SECONDARY_FOCUS_RING}
    }
  `
)

const CARD_STYLE = theme({
  display: MOBILE_ONLY,
  minWidth: 0,
  bg: 'pinkest',
  border: 1,
  borderColor: 'secondary',
  borderRadius: 3,
  boxShadow: `inset 0 0 0 1px ${colors.secondary}`,
  p: 3,
  textAlign: 'left'
})

const FIELD_STYLE = theme({ position: 'relative', mb: 1 })

const CHEVRON_STYLE = theme({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  alignItems: 'center',
  color: 'black',
  pointerEvents: 'none'
})

const ExamplesSelect = ({ panels, activeIndex, onSelect }) => (
  <Box css={CARD_STYLE}>
    <Box css={FIELD_STYLE}>
      <Select
        aria-label='Choose an example'
        value={activeIndex}
        onChange={event => onSelect(Number(event.target.value))}
      >
        {panels.map((panel, index) => (
          <option key={panel.id} value={index}>
            {panel.title}
          </option>
        ))}
      </Select>
      <Flex aria-hidden css={CHEVRON_STYLE}>
        <ChevronDown size={18} strokeWidth={2.25} />
      </Flex>
    </Box>
    <Text css={TAB_DESCRIPTION_STYLE}>{panels[activeIndex].description}</Text>
  </Box>
)

export default ExamplesSelect
