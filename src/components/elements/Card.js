import styled, { css } from 'styled-components'
import { transition } from 'theme'

import Box from './Box'

const style = css`
  transition: all ${transition.medium};
  &:hover {
    transform: translateY(-8px);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 30px 30px -30px;
  }
`

const Card = styled(Box)({ overflow: 'auto' }, style)

Card.defaultProps = {
  ...Box.defaultProps,
  bg: 'white',
  borderRadius: 3,
  boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)'
}

export default Card
