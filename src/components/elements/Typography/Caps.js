import Text from './Text'
import styled from 'styled-components'

const Caps = styled(Text)({
  letterSpacing: '0.5px',
  textTransform: 'uppercase'
})

Caps.defaultProps = {
  ...Text.defaultProps,
  fontSize: [0, 1]
}

export default Caps
