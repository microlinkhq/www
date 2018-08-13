import styled from 'styled-components'
import { transition } from 'theme'

import Card from './Card'

Card.defaultProps = {
  borderRadius: 3,
  boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)'
}

export default styled(Card)`
  transition: all ${transition.medium};
  &:hover {
    transform: translateY(-2px);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 30px 30px -30px;
  }
`
