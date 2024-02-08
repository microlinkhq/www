import styled from 'styled-components'
import { themeCss } from 'theme'

import Text from './Text'

const Caps = styled(Text)(
  themeCss({
    textTransform: 'uppercase',
    fontSize: 1,
    letterSpacing: 2
  })
)

export default Caps
