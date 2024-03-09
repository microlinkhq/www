import styled from 'styled-components'
import { theme } from 'theme'

import Text from './Text'

const Heading = styled(Text)(
  theme({
    letterSpacing: 1,
    lineHeight: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: [4, 6, 7, 7]
  })
)

Heading.defaultProps = {
  as: 'h1',
  variant: 'gradient'
}

export default Heading
