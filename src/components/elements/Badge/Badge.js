import styled from 'styled-components'
import Text from '../Text'

const Badge = styled(Text)`
  padding: 2px 12px;
  text-transform: uppercase;
  position: relative;
  vertical-align: middle;
`

Badge.defaultProps = {
  letterSpacing: 2,
  border: '0.5px solid',
  as: 'span',
  fontSize: '12px',
  fontWeight: 'bold',
  bg: 'secondary',
  borderRadius: 5,
  fontFamily: 'sans',
  color: 'white'
}

export default Badge
