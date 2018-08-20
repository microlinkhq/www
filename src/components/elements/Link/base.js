import system from 'system-components'
import { Link as LinkBase } from 'rebass'

const Link = system({ is: LinkBase }, 'fontWeight', props => ({
  cursor: 'pointer',
  textDecoration: 'none',
  outline: 0
}))

Link.defaultProps = {
  is: 'span',
  color: 'link'
}

export default Link
