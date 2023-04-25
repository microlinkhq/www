import { shine } from 'components/keyframes'
import styled from 'styled-components'
import { cx, radii } from 'theme'

import Box from '../Box'

const Placeholder = styled(Box)`
  animation-duration: 1s;
  animation-name: ${shine};
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
`

Placeholder.Empty = styled(Box)`
  border: 1px solid ${cx('black10')};
  border-radius: ${radii[2]};
`

export default Placeholder
