import { borders, borderColor, space, color } from 'styled-system'
import styled from 'styled-components'

const Divider = styled('hr')(borders, borderColor, space, color)

Divider.defaultProps = {
  as: 'hr',
  mx: 0,
  my: 3,
  border: 0,
  borderBottom: 1,
  borderColor: 'gray'
}

export default Divider
