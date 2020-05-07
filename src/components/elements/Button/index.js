import { css } from 'styled-components'

import { withSpinner, withAnalytics } from 'helpers/hoc'
import Button from './Button'

export default withAnalytics(
  withSpinner(
    Button,
    css`
      &:hover {
        background-color: ${({ theme }) => props => theme.colors[props.bg]};
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
      }
    `
  )
)
