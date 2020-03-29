import styled from 'styled-components'
import Heading from './Heading'

const Subhead = styled(Heading)``

Subhead.defaultProps = {
  as: 'h2',
  lineHeight: 1,
  fontWeight: 'regular',
  variant: null,
  fontSize: [4, 5],
  color: 'black'
}

export default Subhead
