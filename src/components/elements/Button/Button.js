import {
  transition,
  theme as themeProp,
  colors,
  cx,
  radii,
  touchTargets
} from 'theme'
import styled, { css } from 'styled-components'
import Box from '../Box'
import React, { forwardRef } from 'react'
import { withSpinner } from 'helpers/hoc/with-spinner'
import { withAnalytics } from 'helpers/hoc/with-analytics'
import { shimmerStyle } from './shimmer'

const DEFAULT_VARIANT = 'default'

const getVariant = ({ theme, variant = DEFAULT_VARIANT }) =>
  theme.variants.buttons[variant] || theme.variants.buttons[DEFAULT_VARIANT]

export const hoverStyle = ({ theme, variant }) => {
  const { background, color } = getVariant({ theme, variant })
  const hoverBackground = cx(color)
  const hoverColor = cx(background)
  return {
    cursor: 'pointer',
    background: hoverBackground,
    color: hoverColor,
    boxShadow: `0 0 1px 1px ${hoverColor}`
  }
}

const StyledButton = styled(Box).withConfig({
  shouldForwardProp: prop => !['variant'].includes(prop)
})`
  transition: background-color ${transition.short}, color ${transition.short},
    box-shadow ${transition.short}, transform ${transition.short};
  --button-radius: ${radii[2]};
  border-radius: var(--button-radius);
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

  &[aria-busy='true'] {
    cursor: wait;
  }

  ${({ variant }) => variant === 'featured' && shimmerStyle}

  ${({ theme, variant }) => {
    const { background, color } = getVariant({ theme, variant })
    const hover = hoverStyle({ theme, variant })
    return css`
      &:focus-visible {
        outline: 2px solid ${cx(background)};
        outline-offset: 2px;
      }

      ${themeProp({
        fontFamily: 'sans',
        fontSize: 1,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
        px: 3,
        py: '12px',
        minHeight: touchTargets.minHeight,
        border: 0,
        background,
        color,
        cursor: 'pointer',
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
      @media (hover: hover) and (pointer: fine) {
        &:hover:not(:disabled) {
          cursor: ${hover.cursor};
          background: ${hover.background};
          color: ${hover.color};
          box-shadow: ${hover.boxShadow};
        }
      }
    `
  }}
`

const ButtonComponent = forwardRef((props, ref) => (
  <StyledButton as='button' ref={ref} {...props} />
))

ButtonComponent.displayName = 'Button'

const Button = withAnalytics(withSpinner(ButtonComponent))

export { Button }
export default ButtonComponent
