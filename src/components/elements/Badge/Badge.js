import styled from 'styled-components'
import { theme } from 'theme'

import Text from '../Text'

const Badge = styled(Text)`
  padding: 2px 12px;
  text-transform: uppercase;
  position: relative;
  vertical-align: middle;

  ${theme({
    letterSpacing: 2,
    border: '0.5px solid',
    fontSize: '12px',
    fontWeight: 'bold',
    bg: 'secondary',
    borderRadius: 5,
    fontFamily: 'sans',
    color: 'white'
  })}
`

Badge.defaultProps = {
  as: 'span'
}

export default Badge
