import styled, { css } from 'styled-components'
import { ChevronDown } from 'react-feather'
import { colors, theme } from 'theme'
import React from 'react'

import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

import { FOCUS_RING, TAB_DESCRIPTION_STYLE } from './styles'

const SELECT_LABEL = 'Choose an example'

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

const Select = styled.select(
  theme({
    appearance: 'none',
    cursor: 'pointer',
    touchAction: 'manipulation',
    width: '100%',
    bg: 'pinkest',
    border: 0,
    borderRadius: 0,
    boxShadow: 'none',
    fontFamily: 'sans',
    fontWeight: 'bold',
    fontSize: 1,
    lineHeight: 2,
    color: 'black',
    py: 0,
    pl: 0,
    pr: '28px',
    m: 0
  }),
  css`
    &:focus-visible {
      ${FOCUS_RING}
    }
  `
)

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
  <Card>
    <Box css={FIELD_STYLE}>
      <Select
        aria-label={SELECT_LABEL}
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
  </Card>
)

export default ExamplesSelect
