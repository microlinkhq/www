import React, { useMemo, useState } from 'react'
import { transition, colors } from 'theme'
import styled from 'styled-components'
import noop from 'lodash/noop'

import Text from '../Text'
import Flex from '../Flex'

const InputBase = styled(Text)(
  {
    display: 'block',
    maxWidth: '100%'
  },
  prop => ({
    display: 'inline-block',
    verticalAlign: 'middle',
    border: 0,
    appearance: 'none',
    '&:focus': {
      outline: '0',
      boxShadow: `inset 0 0 0 1px ${colors.blue500}`
    },
    '&:disabled': {
      opacity: 1 / 4
    }
  })
)

InputBase.defaultProps = {
  as: 'input',
  type: 'text',
  lineHeight: 'inherit',
  width: 1,
  border: 0,
  color: 'inherit',
  bg: 'transparent'
}

const InputWrapper = styled(Flex)`
  border: 1px solid;
  border-color: ${({ isDark }) => (isDark ? colors.white20 : colors.black20)};
  transition: border-color ${transition.medium}, stroke ${transition.medium},
    color ${transition.medium};
  ${props =>
    props.focus &&
    `
  outline: 0;
  border-color: ${colors.hoverLink};

  svg  {
    stroke: ${colors.hoverLink};
    color: ${colors.hoverLink};
  }
`}
`

const Input = ({
  innerRef,
  iconComponent: Icon,
  suggestions,
  children,
  onFocus,
  onBlur,
  theme,
  ...props
}) => {
  const [isFocus, setFocus] = useState(props.autoFocus)

  const list = useMemo(() => {
    if (!suggestions) return undefined
    if (!props.id) {
      throw new Error(
        'Need to provide an id to be associated with suggestions list.'
      )
    }
    return `${props.id}-suggestions`
  }, [props.id, suggestions])

  return (
    <InputWrapper
      as='label'
      alignItems='center'
      borderRadius={2}
      focus={isFocus}
      isDark={theme === 'dark'}
      py='12px'
      px={2}
    >
      {Icon && <Flex pr={1}>{Icon}</Flex>}
      <InputBase
        list={list}
        ref={innerRef}
        onFocus={event => {
          setFocus(true)
          return onFocus(event)
        }}
        onBlur={event => {
          setFocus(false)
          return onBlur(event)
        }}
        {...props}
      />

      {suggestions && (
        <datalist id={list}>
          {suggestions.map(props => (
            <option key={`${list}_${props.value}`} {...props} />
          ))}
        </datalist>
      )}
    </InputWrapper>
  )
}

Input.defaultProps = {
  onFocus: noop,
  onBlur: noop,
  autoFocus: false
}

export default Input
