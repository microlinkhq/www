import { system } from 'helpers'
import { Link as LinkBase } from 'rebass'

const Link = system({ extend: LinkBase }, 'fontWeight', props => ({
  cursor: 'pointer',
  textDecoration: 'none',
  outline: 0
}))

Link.defaultProps = {
  as: 'span',
  color: 'link'
}

export default Link
