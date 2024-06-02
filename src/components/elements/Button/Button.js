import { transition, theme as themeProp, colors, space, gradient } from 'theme'
import styled from 'styled-components'
import Box from '../Box'
import React, { forwardRef } from 'react'

const getVariant = ({ theme, variant }) => {
  const { background = 'link', color = 'white' } =
    theme.variants.buttons[variant] || {}
  return { background, color }
}

export const hoverStyle = ({ theme, variant }) => {
  const { background, color } = getVariant({ theme, variant })
  return {
    cursor: 'pointer',
    background: color,
    color: background,
    boxShadow: `0 0 0 1px ${colors[background]}`
  }
}

const StyledButton = styled(Box).withConfig({
  shouldForwardProp: prop => !['variant'].includes(prop)
})`
  transition: background-color ${transition.medium}, color ${transition.medium},
    box-shadow ${transition.medium};
  appearance: none;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  white-space: nowrap;
  outline: 0;

  ${({ variant }) =>
    variant === 'gradient' &&
    `
    &&& {
      transition: filter ${transition.medium};
      background: ${gradient};
      padding: ${space[1]};
      &:hover {
        box-shadow: none;
        filter: hue-rotate(40deg);
      }
    }
  `}

  ${({ theme, variant }) => {
    const { background, color } = getVariant({ theme, variant })
    return themeProp({
      fontFamily: 'sans',
      fontSize: 1,
      fontWeight: 'bold',
      px: 3,
      py: 2,
      border: 0,
      borderRadius: 2,
      background,
      color,
      boxShadow: variant === 'white' ? `0 0 0 1px ${color}` : undefined,
      _hover: hoverStyle({ theme, variant }),
      _disabled: {
        opacity: 0.8,
        cursor: 'not-allowed',
        background: colors.black05,
        color: colors.black50,
        boxShadow: `0 0 0 1px ${colors.black20}`,
        '.path': {
          stroke: colors.black30
        }
      }
    })
  }}
`

const Button = forwardRef((props, ref) => (
  <StyledButton as='button' ref={ref} {...props} />
))

Button.displayName = 'Button'

export default Button
