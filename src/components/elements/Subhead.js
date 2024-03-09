import styled from 'styled-components'
import Heading from './Heading'
import { theme } from 'theme'

const Subhead = styled(Heading)(
  theme({
    fontSize: [4, 4, 6, 6],
    color: 'black'
  })
)

Subhead.defaultProps = {
  as: 'h2',
  variant: null
}

export default Subhead
