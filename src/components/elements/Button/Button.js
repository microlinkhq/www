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
  transition: background-color ${transition.short}, color ${transition.short},
    box-shadow ${transition.short}, transform ${transition.short};
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

  @media (prefers-reduced-motion: no-preference) {
    &:active:not(:disabled) {
      transform: scale(0.97);
    }
  }

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  ${({ variant }) =>
    variant === 'gradient' &&
    `
    &&& {
      transition: filter ${transition.short}, transform ${transition.short};
      background: ${gradient};
      padding: ${space[1]};
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          box-shadow: none;
          color: white;
          filter: hue-rotate(40deg);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    }
  `}

  ${({ theme, variant }) => {
    const { background, color } = getVariant({ theme, variant })
    const hover = hoverStyle({ theme, variant })
    return css`
      ${themeProp({
        fontFamily: 'sans',
        fontSize: 1,
        fontWeight: 'bold',
        px: 3,
        py: '12px',
        minHeight: touchTargets.minHeight,
        border: 0,
        borderRadius: 2,
        background,
        color,
        boxShadow: variant === 'white' ? `0 0 0 1px ${color}` : undefined,
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
      })}
      ${variant !== 'gradient' &&
      css`
        @media (hover: hover) and (pointer: fine) {
          &:hover:not(:disabled) {
            cursor: ${hover.cursor};
            background: ${colors[hover.background] || hover.background};
            color: ${colors[hover.color] || hover.color};
            box-shadow: ${hover.boxShadow};
          }
        }
      `}
    `
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
