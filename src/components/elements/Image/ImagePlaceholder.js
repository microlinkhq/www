import styled from 'styled-components'
import Box from '../Box'
import { shine } from 'components/keyframes'

const ImagePlaceholder = styled(Box)`
  animation-duration: 1s;
  animation-name: ${shine};
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
  will-change: background;
`

export default ImagePlaceholder
