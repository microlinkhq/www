import Box from 'components/elements/Box'
import styled from 'styled-components'

const FadeOverlay = styled(Box)`
  height: ${({ $position }) => ($position === 'top' ? '30px' : '34px')};
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  top: ${({ $position }) => ($position === 'top' ? '34px' : 'auto')};
  bottom: ${({ $position }) => ($position === 'bottom' ? '0' : 'auto')};

  &:before {
    background: linear-gradient(
      to ${({ $position }) => ($position === 'bottom' ? 'top' : 'bottom')},
      white ${({ $position }) => ($position === 'top' ? '50%' : '50%')},
      transparent 100%
    );
    bottom: 0px;
    content: '';
    height: ${({ $position }) => ($position === 'top' ? '30px' : '34px')};
    left: 0px;
    position: absolute;
    width: 100%;
  }
`

export default FadeOverlay
