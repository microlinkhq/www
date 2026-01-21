import Flex from '../Flex'
import Box from '../Box'
import Caps from '../Caps'
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { noop } from 'helpers/noop'
import { theme, touchTargets } from 'theme'

import Button from '../Button/Button'

const ButtonToggle = styled(Button)`
  ${theme({
    bg: 'transparent',
    py: 0,
    px: 0,
    borderRadius: 0,
    minHeight: touchTargets.minHeight,
    _hover: {
      cursor: props => (props.$active ? 'auto' : 'pointer'),
      boxShadow: 'none'
    }
  })}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

function Toggle ({ onChange = noop, children, defaultValue, ...props }) {
  const [active, setActive] = useState(
    defaultValue ||
      (typeof children[0] === 'object' ? children[0].id : children[0])
  )

  const handleKeyDown = useCallback(
    (value, currentActive) => event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        if (value !== currentActive) {
          setActive(value)
          onChange(value)
        }
      }
    },
    [onChange]
  )

  const setAsActive = useCallback(
    value => () => {
      if (value !== active) {
        setActive(value)
        onChange(value)
      }
    },
    [active, onChange]
  )

  return (
    <Flex
      role='tablist'
      aria-label='Toggle options'
      css={{ width: '100%' }}
      {...props}
    >
      <Box
        css={theme({
          bg: 'white',
          border: 1,
          borderColor: 'black05',
          borderRadius: 2,
          display: 'inline-flex'
        })}
      >
        {children.map((item, index) => {
          const isLast = index + 1 === children.length
          const value = typeof item === 'object' ? item.id : item
          const label = typeof item === 'object' ? item.node : item
          const isActive = active === value

          return (
            <Flex
              as='span'
              key={value}
              css={theme({
                borderRight: !isLast ? 1 : undefined,
                borderColor: !isLast ? 'black05' : undefined,
                px: 3,
                alignItems: 'center',
                justifyContent: 'center'
              })}
            >
              <ButtonToggle
                role='tab'
                aria-selected={isActive}
                aria-controls={`panel-${value}`}
                tabIndex={isActive ? 0 : -1}
                $active={isActive}
                onClick={setAsActive(value)}
                onKeyDown={handleKeyDown(value, active)}
              >
                {typeof label === 'string' ? (
                  <Caps
                    css={theme({
                      fontWeight: !isActive ? 'normal' : 'bold',
                      color: isActive ? 'black80' : 'black40',
                      fontSize: 0
                    })}
                  >
                    {label}
                  </Caps>
                ) : (
                  <Box
                    css={theme({
                      color: isActive ? 'black80' : 'black40',
                      display: 'flex',
                      alignItems: 'center',
                      py: 1
                    })}
                  >
                    {label}
                  </Box>
                )}
              </ButtonToggle>
            </Flex>
          )
        })}
      </Box>
    </Flex>
  )
}

export default Toggle
