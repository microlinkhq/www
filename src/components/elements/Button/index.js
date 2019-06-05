import { css } from 'styled-components'
import { rgba } from 'polished'

import { withAnalytics } from 'helpers/hoc'
import withSpinner from './with-spinner'
import BaseButtonSecondary from './ButtonSecondary'
import BaseButtonOutline from './ButtonOutline'
import BaseButtonPrimary from './ButtonPrimary'

import { BOX_SHADOW } from './ButtonBase'

export const ButtonPrimary = withAnalytics(
  withSpinner(
    BaseButtonPrimary,
    css`
      &:hover {
        background-color: ${({ theme }) => props => theme.colors[props.bg]};
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
      }
    `
  )
)

export const ButtonOutline = withAnalytics(
  withSpinner(
    BaseButtonOutline,
    css`
      &:hover {
        background-color: ${({ theme }) => props => theme.colors[props.bg]};
        box-shadow: inset 0 0 0 2px
          ${({ theme }) => props => theme.colors[props.color]};
      }
    `
  )
)

export const ButtonSecondary = withAnalytics(
  withSpinner(
    BaseButtonSecondary,
    css`
      opacity: 0.8;
      &:hover {
        box-shadow: ${BOX_SHADOW} ${({ theme }) => rgba(theme.colors.link, 0.5)};
        background-color: ${({ theme }) => props => theme.colors[props.bg]};
      }
    `
  )
)
