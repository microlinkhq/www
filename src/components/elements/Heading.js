import styled from 'styled-components'

import Text from './Text'

const Heading = styled(Text)``

Heading.defaultProps = {
  as: 'h2',
  lineHeight: [0, 1],
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: [4, 7],
  variant: 'gradient'
}

export default Heading
