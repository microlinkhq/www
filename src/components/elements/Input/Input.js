import React, { useState } from 'react'
import { Box, Flex } from 'components/elements'
import { transition, colors } from 'theme'
import styled from 'styled-components'
import { lighten } from 'polished'

import Text from '../Typography/Text'

const Input = styled(Text)(
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
      outline: 'none',
      boxShadow: `inset 0 0 0 1px ${colors.blue500}`
    },
    '&:disabled': {
      opacity: 1 / 4
    }
  })
)

Input.defaultProps = {
  ...Text.defaultProps,
  as: 'input',
  type: 'text',
  lineHeight: 'inherit',
  py: '12px',
  px: 2,
  m: 0,
  width: 1,
  border: 0,
  borderColor: 'gray',
  color: 'inherit',
  bg: 'transparent'
}

const InputWrapper = styled(Flex)`
  transition: box-shadow, stroke ${transition.short};
  ${props =>
    props.focus &&
    `
  outline: none;
  box-shadow: inset 0 0 0 1px ${lighten(0.15, colors.link)};

  svg  {
    stroke: ${lighten(0.15, colors.link)}
  }
`}
`

export default ({ iconComponent: Icon, ...props }) => {
  const [isFocus, setFocus] = useState(false)
  const onFocus = () => setFocus(true)
  const onBlur = () => setFocus(false)

  return (
    <InputWrapper
      alignItems='center'
      borderRadius={2}
      boxShadow={1}
      focus={isFocus}
    >
      {Icon && (
        <Box pl={2} pt={1}>
          {Icon}
        </Box>
      )}
      <Input onFocus={onFocus} onBlur={onBlur} {...props} />
    </InputWrapper>
  )
}
