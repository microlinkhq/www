import styled from 'styled-components'
import system from 'system-components'
import { Card as CardBase } from 'rebass'
import { transition } from 'theme'

// TODO: Unnecessary after https://github.com/jxnblk/rebass/pull/424
const Card = system({ is: CardBase }, 'width', 'height')

Card.defaultProps = {
  borderRadius: 3,
  boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)'
}

export default styled(Card)`
  transition: all ${transition.medium};
  &:hover {
    box-shadow: 0 10px 40px 0px rgba(0, 0, 0, 0.5);
  }
`
