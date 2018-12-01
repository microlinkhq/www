import styled from 'styled-components'

import Text from './Text'

const Heading = styled(Text)([])

Heading.defaultProps = {
  ...Text.defaultProps,
  as: 'h2',
  lineHeight: 1,
  textAlign: 'center',
  fontWeight: 'regular',
  fontSize: [4, 6],
  variant: 'gradient'
}

Heading.displayName = 'Heading'

export default Heading
