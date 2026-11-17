import { css, keyframes } from 'styled-components'
import { gradientStops, radii } from 'theme'

const BAND_COLORS = gradientStops.map(([, color]) => color)
const BAND_OFFSET = 15
const BAND_WIDTH = 15
const BAND_FADE = 6
const BAND_PERIOD = 40
const RING_THICKNESS = '1px'
const GLOW_BLUR = '12px'
const GLOW_OPACITY = 0.9
const FADE = '0.2s cubic-bezier(0.22, 0.61, 0.36, 1)'
const SWEEP_DURATION = '3s'

const band = start => {
  const from = start + BAND_OFFSET
  const step = BAND_WIDTH / (BAND_COLORS.length - 1)
  return [
    `transparent ${start}%`,
    ...BAND_COLORS.map((color, index) => `${color} ${from + step * index}%`),
    `transparent ${from + BAND_WIDTH + BAND_FADE}%`
  ]
}

const SHIMMER = `linear-gradient(160deg, ${[
  ...band(0),
  ...band(BAND_PERIOD),
  ...band(BAND_PERIOD * 2)
].join(', ')})`

const sweep = keyframes`
  to { background-position: 75% 75%; }
`

export const shimmerStyle = css`
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
