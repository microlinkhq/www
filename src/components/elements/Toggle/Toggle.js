import { Text, Box, Caps } from 'components/elements'
import React, { useState } from 'react'
import styled from 'styled-components'
import noop from 'lodash/noop'

import ButtonBase from '../Button/ButtonBase'

const ButtonToggle = styled(ButtonBase)`
  box-shadow: none;

  &:hover {
    cursor: ${props => (props.active ? 'auto' : 'pointer')};
  }
`

ButtonToggle.defaultProps = {
  bg: 'transparent',
  px: '24px',
  py: 0,
  borderRadius: 0
}

function Toggle ({ onChange, children, defaultValue }) {
  const [active, setActive] = useState(defaultValue || children[0])

  return (
    <Box border={1} borderColor='border' borderRadius={2}>
      {children.map((value, index) => {
        const isLast = index + 1 === children.length
        const isActive = active === value

        const setAsActive = value => () => {
          if (value !== active) {
            setActive(value)
            onChange(value)
          }
        }

        return (
          <Text
            as='span'
            key={value}
            borderRight={!isLast ? 1 : null}
            borderColor={!isLast ? 'border' : null}
          >
            <ButtonToggle active={isActive} onClick={setAsActive(value)}>
              <Caps
                fontWeight={!isActive ? 'normal' : 'bold'}
                color={isActive ? 'black80' : 'black40'}
                fontSize={0}
              >
                {value}
              </Caps>
            </ButtonToggle>
          </Text>
        )
      })}
    </Box>
  )
}

Toggle.defaultProps = {
  onChange: noop
}

export default Toggle
