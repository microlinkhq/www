import {
  transition,
  theme as themeProp,
  colors,
  space,
  gradient,
  touchTargets
} from 'theme'
import styled, { css } from 'styled-components'
import Box from '../Box'
import React, { forwardRef } from 'react'
import { withSpinner } from 'helpers/hoc/with-spinner'
import { withAnalytics } from 'helpers/hoc/with-analytics'

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
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

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
      @media (prefers-reduced-motion: reduce) {
        transition: none;
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
      /*
       * WCAG/Apple HIG touch target: minimum 44px for comfortable tap interaction.
       * py: 12px + fontSize + lineHeight achieves the minHeight.
       */
      py: '12px',
      minHeight: touchTargets.minHeight,
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

const ButtonComponent = forwardRef((props, ref) => (
  <StyledButton as='button' ref={ref} {...props} />
))

ButtonComponent.displayName = 'Button'

const Button = withAnalytics(
  withSpinner(
    ButtonComponent,
    css`
      &:hover {
        background-color: ${props => props.theme.colors[props.bg]};
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
      }
    `
  )
)

export { Button }
export default ButtonComponent
