import styled, { keyframes } from 'styled-components'
import { colors } from 'theme'
import Box from '../Box'

const shine = keyframes`
0% {
  background: ${colors.gray2};
}

100% {
  background: ${colors.gray0};
}
`

const ImagePlaceholder = styled(Box)`
  animation-duration: 1s;
  animation-name: ${shine};
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
`

export default ImagePlaceholder
