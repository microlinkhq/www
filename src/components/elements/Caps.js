import styled from 'styled-components'

import Text from './Text'

const Caps = styled(Text)``

Caps.defaultProps = {
  textTransform: 'uppercase',
  fontSize: 1,
  letterSpacing: 2
}

export default Caps
