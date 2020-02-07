import styled from 'styled-components'
import { Box } from 'components/elements'

import { slide } from 'components/keyframes'

const Dots = styled(Box)`
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    width: 400%;
    height: 100%;
    z-index: -1;

    background-image: radial-gradient(#d7d7d7 1px, transparent 0),
      radial-gradient(#d7d7d7 1px, transparent 0);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;

    animation: ${slide} 100s linear infinite;
    animation-direction: reverse;
  }
`

export default Dots
