import styled from 'styled-components'
import { colors, fontWeights, fontSizes } from 'theme'

const Badge = styled('span')`
  padding: 0 6px;
  font-size: ${fontSizes[0]}px;
  font-weight: ${fontWeights.bold};
  background: ${colors.secondary};
  text-transform: uppercase;
  border-radius: 10px;
  color: white;
  position: relative;
  bottom: 1px;
`

export default Badge
