import styled from 'styled-components'

import Box from './Box'

const Card = styled(Box)({ overflow: 'auto' })

Card.defaultProps = {
  ...Box.defaultProps,
  bg: 'white',
  borderRadius: 3,
  boxShadow: 3
}

export default Card
