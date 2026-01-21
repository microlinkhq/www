import { transition, colors, borders, theme, touchTargets } from 'theme'
import React, { useMemo, useState } from 'react'
import styled, { css } from 'styled-components'

import Text from '../Text'
import Flex from '../Flex'

const StyledInputBase = styled(Text)(
  {
    lineHeight: 'inherit',
    background: 'transparent',
    maxWidth: '100%',
    display: 'inline-block',
    verticalAlign: 'middle',
    appearance: 'none',
    color: 'inherit',
    fontSize: 1,
    '&:focus-visible': {
      outline: 'none'
    },
    '&:disabled': {
      opacity: 1 / 4
    }
  },
  theme({
    border: 0,
    p: 0,
    mx: 2
  })
)

const InputBase = props => <StyledInputBase as='input' type='text' {...props} />

const focusStyle = css`
  border-color: ${({ isDark }) => (isDark ? colors.white80 : colors.black80)};
  svg {
    stroke: ${({ isDark }) => (isDark ? colors.white80 : colors.black80)};
    color: ${({ isDark }) => (isDark ? colors.white80 : colors.black80)};
  }
`

const InputWrapper = styled(Flex).withConfig({
  shouldForwardProp: prop => !['focus', 'isDark'].includes(prop)
})`
  background: ${({ isDark }) => (isDark ? colors.black : colors.white)};
  border: ${borders[1]};
  border-color: ${({ isDark }) => (isDark ? colors.white20 : colors.black10)};
  color: ${({ isDark }) => (isDark ? colors.white80 : colors.black80)};
  transition: border-color, stroke, color, box-shadow ${transition.short};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  min-height: ${touchTargets.minHeight};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  ${props => props.focus && focusStyle}
  &:hover {
    ${focusStyle};
  }
  &:focus-within {
    ${focusStyle};
    box-shadow: 0px 0px 0px 4px ${colors.link}33;
  }
`

const Input = ({
  innerRef,
  iconComponent: Icon,
  suggestions,
  children,
  isDark,
  labelCss,
  autoComplete,
  inputMode,
  ...props
}) => {
  const [isFocus, setFocus] = useState(Boolean(props.autoFocus))

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
      css={theme({
        pr: suggestions ? 0 : 2,
        py: '12px',
        pl: 2,
        alignItems: 'center',
        borderRadius: 2,
        ...labelCss
      })}
    >
      {Icon && <Flex>{Icon}</Flex>}
      <InputBase
        list={list}
        ref={innerRef}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        autoComplete={autoComplete}
        inputMode={inputMode}
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

export default Input
