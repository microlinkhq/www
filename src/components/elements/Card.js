import styled, { css } from 'styled-components'
import { transition } from 'theme'

import Box from './Box'

const style = css`
  transition: all ${transition.short};
  &:hover {
    opacity: 0.8;
  }
`

const Card = styled(Box)({ overflow: 'auto' }, style)

Card.defaultProps = {
  ...Box.defaultProps,
  bg: 'white',
  borderRadius: 3,
  boxShadow: 2
}

export default Card
