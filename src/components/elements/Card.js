import system from 'system-components'
import { Card as CardBase } from 'rebass'

// TODO: Unnecessary after https://github.com/jxnblk/rebass/pull/424
const Card = system({ is: CardBase }, 'width', 'height')

Card.defaultProps = {
  borderRadius: 3,
  boxShadow: '0 10px 40px -10px rgba(0, 0, 0, 0.5)'
}

export default Card
