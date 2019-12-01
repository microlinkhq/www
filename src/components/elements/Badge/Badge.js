import styled from 'styled-components'

const Badge = styled('span')`
  padding: 2px 6px;
  font-size: ${({ theme }) => theme.fontSizes[0]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background: ${({ theme }) => theme.colors.secondary};
  text-transform: uppercase;
  border-radius: ${({ theme }) => theme.radii[5]};
  color: white;
  position: relative;
  vertical-align: middle;
`

export default Badge
