import styled from 'styled-components'

import Heading from './Heading'

const Subhead = styled(Heading)([])

Subhead.defaultProps = {
  ...Heading.defaultProps,
  as: 'h3',
  lineHeight: 4,
  fontWeight: 'regular',
  variant: null,
  fontSize: [2, 4]
}

Subhead.displayName = 'Subhead'

export default Subhead
