import styled from 'styled-components'
import { theme } from 'theme'
import Image from '../Image/Image'

export const StyledImage = styled(Image)`
  max-width: inherit;
  height: 100%;
  ${theme({ borderRadius: 2 })};
`
