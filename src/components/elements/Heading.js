import styled from 'styled-components'

import Text from './Text'

const Heading = styled(Text)``

Heading.defaultProps = {
  as: 'h2',
  letterSpacing: 1,
  lineHeight: [0, 0, 1, 1],
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: [4, 4, 5, 7],
  variant: 'gradient'
}

export default Heading
