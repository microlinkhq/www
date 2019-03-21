import styled from 'styled-components'

import Text from './Text'

const Heading = styled(Text)([])

Heading.defaultProps = {
  ...Text.defaultProps,
  as: 'h2',
  lineHeight: 'inherit',
  textAlign: 'center',
  fontWeight: 'regular',
  fontSize: [4, 6],
  variant: 'gradient'
}

export default Heading
