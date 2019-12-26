import styled from 'styled-components'
import { Box } from 'components/elements'

const AnimatedBox = styled(Box)`
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    width: 200%;
    height: 100%;
    z-index: -1;
  }
`

export default AnimatedBox
