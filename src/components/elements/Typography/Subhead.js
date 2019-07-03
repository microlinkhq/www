import styled from 'styled-components'

import Heading from './Heading'

const Subhead = styled(Heading)([])

Subhead.defaultProps = {
  ...Heading.defaultProps,
  as: 'h3',
  lineHeight: [0, 1],
  fontWeight: 'regular',
  variant: null,
  fontSize: [4, 5]
}

export default Subhead
