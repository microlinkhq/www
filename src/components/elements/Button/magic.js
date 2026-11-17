import { css, keyframes } from 'styled-components'
import { radii } from 'theme'

const HIGHLIGHT = '#fbfafd'
const PURPLE = '#a989f5'
const PINK = '#ffb9c9'
const ORANGE = '#fca326'
const RING_THICKNESS = '1px'
const GLOW_BLUR = '12px'
const GLOW_OPACITY = 0.9
const FADE = '0.2s cubic-bezier(0.22, 0.61, 0.36, 1)'
const SWEEP_DURATION = '3s'

const band = start => [
  `transparent ${start}%`,
  `${HIGHLIGHT} ${start + 15}%`,
  `${PURPLE} ${start + 20}%`,
  `${PINK} ${start + 25}%`,
  `${ORANGE} ${start + 30}%`,
  `transparent ${start + 36}%`
]

const SHIMMER = `linear-gradient(160deg, ${[
  ...band(0),
  ...band(40),
  'transparent 80%',
  `${HIGHLIGHT} 95%`,
  `${PURPLE} 100%`
].join(', ')})`

const sweep = keyframes`
  to { background-position: 75% 75%; }
`

export const magicStyle = css`
  &&& {
    position: relative;
    z-index: 1;
    transform-style: preserve-3d;
    --shimmer-opacity: 0;

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:disabled):not(:focus-visible) {
        --shimmer-opacity: 1;
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      &::before,
      &::after {
        content: '';
        position: absolute;
        pointer-events: none;
        background: ${SHIMMER} 15% 15% / 300% 300%;
        opacity: var(--shimmer-opacity);
        transition: opacity ${FADE};
        animation: ${sweep} ${SWEEP_DURATION} linear infinite;
      }

      &::before {
        inset: 0;
        border-radius: inherit;
        filter: blur(${GLOW_BLUR});
        transform: translateZ(-1px);
        opacity: calc(var(--shimmer-opacity) * ${GLOW_OPACITY});
      }

      &::after {
        inset: -${RING_THICKNESS};
        padding: ${RING_THICKNESS};
        border-radius: calc(${radii[2]} + ${RING_THICKNESS});
        mask: linear-gradient(#000 0 0) content-box exclude,
          linear-gradient(#000 0 0);
      }
    }

    @media (forced-colors: active) {
      &::before,
      &::after {
        display: none;
      }
    }
  }
`
