import system from 'system-components'
import { Link as LinkBase } from 'rebass'

const Link = system({ is: LinkBase }, 'fontWeight', props => ({
  cursor: 'pointer',
  textDecoration: 'none',
  outline: 0,
  '&:hover': {
    textDecoration: 'underline'
  }
}))

Link.defaultProps = {
  color: 'link'
}

export default Link
