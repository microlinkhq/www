import styled from 'styled-components'

import Heading from './Heading'

const Subhead = styled(Heading)([])

Subhead.defaultProps = {
  ...Heading.defaultProps,
  as: 'h3',
  lineHeight: [2, 4],
  fontWeight: 'normal',
  variant: null,
  fontSize: [2, 4]
}

export default Subhead
