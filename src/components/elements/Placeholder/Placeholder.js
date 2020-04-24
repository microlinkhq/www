import { shine } from 'components/keyframes'
import styled from 'styled-components'
import Box from '../Box'

const Placeholder = styled(Box)`
  animation-duration: 1s;
  animation-name: ${shine};
  animation-iteration-count: infinite;
  animation-direction: alternate-reverse;
`

export default Placeholder
