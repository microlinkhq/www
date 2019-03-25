import BaseButtonSecondary from './ButtonSecondary'
import BaseButtonOutline from './ButtonOutline'
import ButtonBase from './ButtonBase'
import withSpinner from './with-spinner'
import { css } from 'styled-components'
import { rgba } from 'polished'

export const ButtonPrimary = withSpinner(
  ButtonBase,
  css`
    &:hover {
      background-color: ${({ theme }) => props => theme.colors[props.bg]};
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    }
  `
)

export const ButtonOutline = withSpinner(
  BaseButtonOutline,
  css`
    &:hover {
      background-color: ${({ theme }) => props => theme.colors[props.bg]};
      box-shadow: inset 0 0 0 2px
        ${({ theme }) => props => theme.colors[props.color]};
    }
  `
)

export const ButtonSecondary = withSpinner(
  BaseButtonSecondary,
  css`
    opacity: 0.8;
    &:hover {
      box-shadow: 0 2px 15px ${({ theme }) => rgba(theme.colors.link, 0.5)};
      background-color: ${({ theme }) => props => theme.colors[props.bg]};
    }
  `
)
