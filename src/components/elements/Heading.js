import styled from 'styled-components'

import Text from './Text'

const Heading = styled(Text)``

Heading.defaultProps = {
  as: 'h1',
  letterSpacing: 1,
  lineHeight: [0, 0, 1, 1],
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: [5, 5, 5, 6],
  variant: 'gradient'
}

export default Heading
