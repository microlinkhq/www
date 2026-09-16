import { REDUCED_MOTION_MEDIA } from 'helpers/reduced-motion'
import { timings } from 'theme'
import { css, keyframes } from 'styled-components'

export const riseIn = keyframes`
  from { opacity: 0; transform: translateY(8px); filter: blur(3px) }
  to { opacity: 1; transform: translateY(0); filter: blur(0) }
`

export const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`

export const riseInAnimation = (delay = '0ms') => css`
  animation: ${riseIn} 440ms ${timings.short} ${delay} both;

  ${REDUCED_MOTION_MEDIA} {
    animation-name: ${fadeIn};
  }
`
