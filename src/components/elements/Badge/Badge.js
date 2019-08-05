import styled from 'styled-components'
import { lighten } from 'polished'

import { BOX_SHADOW } from '../Button/ButtonBase'

const Badge = styled('span')`
  padding: 2px 6px;
  font-size: ${({ theme }) => theme.fontSizes[0]};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background: ${({ theme }) => theme.colors.secondary};
  box-shadow: ${BOX_SHADOW}
    ${({ theme }) => lighten(0.25, theme.colors.secondary)};
  text-transform: uppercase;
  border-radius: ${({ theme }) => theme.radii[5]};
  color: white;
  position: relative;
  bottom: 1px;
`

export default Badge
