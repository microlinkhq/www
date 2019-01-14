import styled from 'styled-components'
import Text from '../Text'

const Link = styled(Text)({
  cursor: 'pointer',
  textDecoration: 'none',
  outline: 0
})

Link.defaultProps = {
  ...Text.defaultProps,
  as: 'span',
  fontSize: 'inherit',
  color: 'link'
}

export default Link
