import system from 'system-components'
import { Card as CardBase } from 'rebass'

// TODO: Unnecessary after https://github.com/jxnblk/rebass/pull/424
const Card = system({ is: CardBase }, { overflow: 'auto' }, 'width', 'height')

Card.defaultProps = {
  borderRadius: 3,
  boxShadow: '0 50px 100px -30px rgba(0,0,0,.2)'
}

export default Card
