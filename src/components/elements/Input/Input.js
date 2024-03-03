import { transition, colors, borders, themeCss } from 'theme'
import React, { useMemo, useState } from 'react'
import styled, { css } from 'styled-components'

import Text from '../Text'
import Flex from '../Flex'

const InputBase = styled(Text)(
  {
    lineHeight: 'inherit',
    background: 'transparent',
    maxWidth: '100%',
    display: 'inline-block',
    verticalAlign: 'middle',
    appearance: 'none',
    '&:focus': {
      outline: '0'
    },
    '&:disabled': {
      opacity: 1 / 4
    }
  },
  themeCss({
    border: 0,
    p: 0,
    mx: 2
  })
)

InputBase.defaultProps = {
  as: 'input',
  type: 'text'
}

const focusStyle = css`
  outline: 0;
  border-color: ${({ isDark }) => (isDark ? colors.white80 : colors.black80)};
  svg {
    stroke: ${({ isDark }) => (isDark ? colors.white80 : colors.black80)};
    color: ${({ isDark }) => (isDark ? colors.white80 : colors.black80)};
  }
`

const InputWrapper = styled(Flex)`
  background: ${({ isDark }) => (isDark ? colors.black : colors.white)};
  border: ${borders[1]};
  border-color: ${({ isDark }) => (isDark ? colors.white20 : colors.black10)};
  color: ${({ isDark }) => (isDark ? colors.white80 : colors.black80)};
  transition: border-color ${transition.medium}, stroke ${transition.medium},
    color ${transition.medium};
  ${props => props.focus && focusStyle}
  &:hover {
    ${focusStyle};
  }
`

const Input = ({
  innerRef,
  iconComponent: Icon,
  suggestions,
  children,
  isDark,
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
      focus={isFocus}
      isDark={isDark}
      css={themeCss({
        pr: suggestions ? 0 : 2,
        py: '12px',
        pl: 2,
        alignItems: 'center',
        borderRadius: 2
      })}
    >
      {Icon && <Flex>{Icon}</Flex>}
      <InputBase
        list={list}
        ref={innerRef}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
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
  autoFocus: false
}

export default Input
