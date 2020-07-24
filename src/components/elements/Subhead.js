import styled from 'styled-components'
import Heading from './Heading'

const Subhead = styled(Heading)``

Subhead.defaultProps = {
  as: 'h2',
  variant: null,
  fontSize: [4, 4, 6, 6],
  color: 'black'
}

export default Subhead
