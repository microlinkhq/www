import { Text, Box, Caps } from 'components/elements'
import React, { useState } from 'react'
import styled from 'styled-components'
import { noop } from 'lodash'

import ButtonBase from '../../elements/Button/ButtonBase'

const ButtonToggle = styled(ButtonBase)`
  box-shadow: none;
`

ButtonToggle.defaultProps = {
  ...ButtonBase.defaultProps,
  px: '28px',
  py: 0,
  borderRadius: 0
}

function Toggle ({ onChange, children, defaultValue }) {
  const [active, setActive] = useState(defaultValue || children[0])

  return (
    <Box border={'1px solid'} borderColor={'border'} borderRadius={2}>
      {children.map((value, index) => {
        const isLast = index + 1 === children.length
        const isActive = active === value

        const setAsActive = value => event => {
          event.preventDefault()
          setActive(value)
          onChange(value)
        }

        return (
          <Text
            as='span'
            borderRight={!isLast && '1px solid'}
            borderColor={!isLast && 'border'}
          >
            <ButtonToggle onClick={setAsActive(value)}>
              <Caps
                fontWeight={!isActive && 'normal'}
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
