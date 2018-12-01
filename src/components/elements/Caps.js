import Text from './Text'
import styled from 'styled-components'

const Caps = styled(Text)({
  letterSpacing: '0.5px',
  textTransform: 'uppercase'
})

Caps.defaultProps = {
  ...Text.defaultProps,
  m: 0,
  fontSize: [0, 1]
}

Caps.displayName = 'Caps'

export default Caps
