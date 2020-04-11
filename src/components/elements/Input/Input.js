import React, { useMemo, useState } from 'react'
import { Box, Flex } from 'components/elements'
import { transition, colors, space, fontSizes } from 'theme'
import styled from 'styled-components'
import { lighten } from 'polished'
import noop from 'lodash/noop'

import Text from '../Text'

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
      outline: '0'
      // boxShadow: `inset 0 0 0 1px ${colors.blue500}`, Te lo comento por
    },
    '&:disabled': {
      opacity: 1 / 4
    },
    '&::placeholder': {
      opacity: 0
    }
  })
)

InputBase.defaultProps = {
  as: 'input',
  type: 'text',
  lineHeight: 'inherit',
  py: '12px',
  px: 2,
  width: 1,
  border: 0,
  color: 'inherit',
  bg: 'transparent'
}

const InputWrapper = styled(Flex)`
  border: 1px solid;
  position: relative;
  border-color: ${({ isFocusStyle }) =>
    isFocusStyle ? colors.primary : colors.black20};
  transition: border-color ${transition.medium}, stroke ${transition.medium},
    color ${transition.medium};

  ${props =>
    props.focus &&
    `
    outline: 0;
    border-color: ${lighten(0.15, colors.link)}

    svg  {
      stroke: ${lighten(0.15, colors.link)}
      color: ${lighten(0.15, colors.link)}
    }
  `}
`

const Label = styled(Text)`
  font-size: ${fontSizes[2]} !important; /* de donde viene esta mierda */
  position: absolute;
  background-color: red;
  transition: 0.15s ease-in-out;
  background-color: white;
  pointer-events: none;
  left: ${space[2]};
  top: ${props => (props.isFocusStyle ? '-14px' : space[2])};
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
  const [isFocusStyle, setFocusStyle] = useState(false)
  const checkInput = event => event.target.value.length > 0

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
      isFocusStyle={isFocusStyle}
    >
      <Label isFocusStyle={isFocusStyle}> {props.placeholder}</Label>
      {Icon && <Box pl={2} pt={1} children={Icon} />}
      <InputBase
        list={list}
        ref={innerRef}
        onFocus={event => {
          setFocusStyle(true)
          setFocus(true)
          return onFocus(event)
        }}
        onBlur={event => {
          setFocusStyle(checkInput(event))
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
