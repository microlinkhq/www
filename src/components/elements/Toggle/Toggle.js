import { Text, Flex, Box, Caps } from 'components/elements'
import React, { useState } from 'react'
import styled from 'styled-components'
import { noop } from 'helpers'
import { theme } from 'theme'

import Button from '../Button/Button'

const ButtonToggle = styled(Button)`
  ${theme({
    bg: 'transparent',
    py: 0,
    px: 0,
    borderRadius: 0,
    _hover: {
      cursor: props => (props.$active ? 'auto' : 'pointer'),
      boxShadow: 'none'
    }
  })}
`

function Toggle ({ onChange, children, defaultValue, ...props }) {
  const [active, setActive] = useState(defaultValue || children[0])

  return (
    <Flex css={{ width: '100%' }} {...props}>
      <Box css={theme({ border: 1, borderColor: 'black05', borderRadius: 2 })}>
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
              css={theme({
                borderRight: !isLast ? 1 : undefined,
                borderColor: !isLast ? 'black05' : undefined,
                px: 3
              })}
            >
              <ButtonToggle $active={isActive} onClick={setAsActive(value)}>
                <Caps
                  css={theme({
                    fontWeight: !isActive ? 'normal' : 'bold',
                    color: isActive ? 'black80' : 'black40',
                    fontSize: 0
                  })}
                >
                  {value}
                </Caps>
              </ButtonToggle>
            </Text>
          )
        })}
      </Box>
    </Flex>
  )
}

Toggle.defaultProps = {
  onChange: noop
}

export default Toggle
