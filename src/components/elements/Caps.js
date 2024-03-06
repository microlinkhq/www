import styled from 'styled-components'
import { theme } from 'theme'

import Text from './Text'

const Caps = styled(Text)(
  theme({
    textTransform: 'uppercase',
    fontSize: 1,
    letterSpacing: 2
  })
)

export default Caps
