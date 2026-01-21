import { css, keyframes } from 'styled-components'
import { colors } from 'theme'

export const slide = keyframes`
from {
  transform: translate3d(0, 0, 0);
}
to {
  transform: translate3d(-25%, 0, 0);
}
`

export const highlight = keyframes`
  from {
    background-color: ${colors.yellow3};
  }
  to {
    background-color: transparent;
  }
`

export const shine = keyframes`
0% {
  background: ${colors.gray2};
}

100% {
  background: ${colors.gray0};
}
`

export const showNotification = keyframes`
from {
  opacity: 0;
  transform: scale(0.5);
} to {
  opacity: 1;
  transform: scale(1);
}
`

export const hideNotification = keyframes`
from {
  opacity: 1;
  transform: translateY(0);
} to {
  opacity: 0;
  transform: translateY(100%);
}
`

export const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

export const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`

export const blink = keyframes`
  from {
    opacity: 1.0;
  }

  to {
    opacity: 0.0;
  }
`

export const fadeInDown = keyframes`
from {
  opacity: 0;
  transform: translate3d(0, -50%, 0);
}

to {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
`

export const rotation = keyframes`
0%{
  transform: translateY(0) rotate(0deg);
  opacity: 1;
}

100%{
  transform: translateY(-1000px) rotate(720deg);
  opacity: 0;
}
`

export const dots = keyframes`
to { transform: translateY( -6.0em); }
`

export const fadeIn = css`
  animation: ${fadeInDown} 300ms;
  animation-fill-mode: both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`
