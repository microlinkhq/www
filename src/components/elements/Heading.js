import styled from 'styled-components'

import Text from './Text'

const Heading = styled(Text)``

Heading.defaultProps = {
  as: 'h1',
  letterSpacing: 1,
  lineHeight: 0,
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: [4, 6, 7, 7],
  variant: 'gradient'
}

export default Heading
