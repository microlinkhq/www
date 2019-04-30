import styled from 'styled-components'
import { letterSpacing } from 'styled-system'

import Text from './Text'

const Caps = styled(Text)(
  {
    textTransform: 'uppercase'
  },
  letterSpacing
)

Caps.defaultProps = {
  ...Text.defaultProps,
  fontSize: [0, 1],
  letterSpacing: 1
}

Caps.propTypes = {
  ...Text.propTypes,
  ...letterSpacing.propTypes
}

export default Caps
