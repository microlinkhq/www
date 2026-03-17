import styled, { keyframes } from 'styled-components'

const speedStreak = keyframes`
  0% {
    transform: translateX(-10vw);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    transform: translateX(100vw);
    opacity: 0;
  }
`

const SpeedLine = styled('div')`
  position: absolute;
  height: ${({ $h }) => $h || '2px'};
  border-radius: 2px;
  background: ${({ $color }) => $color || 'rgba(255, 255, 255, 0.3)'};
  top: ${({ $top }) => $top};
  animation: ${speedStreak} ${({ $dur }) => $dur || '2s'}
    ${({ $delay }) => $delay || '0s'} linear infinite;
  width: ${({ $w }) => $w || '800px'};
  box-shadow: 0 0 ${({ $glow }) => $glow || '4px'}
    ${({ $color }) => $color || 'rgba(255, 255, 255, 0.2)'};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`

export default SpeedLine
