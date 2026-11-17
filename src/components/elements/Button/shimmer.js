import { css, keyframes } from 'styled-components'
import { gradientStops, radii } from 'theme'

const BAND_COLORS = gradientStops.map(([, color]) => color)
const BAND_ANGLE = 160
const BAND_PERIOD = 98
const BAND_FIRST_COLOR = 0.375
const BAND_LAST_COLOR = 0.75
const BAND_FADE_OUT = 0.9
const SWEEP_SPEED = 60
const RING_THICKNESS = '1px'
const GLOW_BLUR = '12px'
const GLOW_OPACITY = 0.9
const FADE = '0.2s cubic-bezier(0.22, 0.61, 0.36, 1)'

const toPeriodPx = fraction => `${(BAND_PERIOD * fraction).toFixed(2)}px`

const bandColorStops = () => {
  const step = (BAND_LAST_COLOR - BAND_FIRST_COLOR) / (BAND_COLORS.length - 1)
  return BAND_COLORS.map(
    (color, index) => `${color} ${toPeriodPx(BAND_FIRST_COLOR + step * index)}`
  )
}

const SHIMMER = `repeating-linear-gradient(${BAND_ANGLE}deg, ${[
  'transparent 0px',
  ...bandColorStops(),
  `transparent ${toPeriodPx(BAND_FADE_OUT)}`,
  `transparent ${toPeriodPx(1)}`
].join(', ')})`

const SWEEP_DISTANCE = BAND_PERIOD / Math.sin((BAND_ANGLE * Math.PI) / 180)
const SWEEP_DURATION = `${(SWEEP_DISTANCE / SWEEP_SPEED).toFixed(2)}s`
const SWEEP_BACKGROUND = `${SHIMMER} 0 0 / calc(100% + ${SWEEP_DISTANCE.toFixed(
  2
)}px) 100% no-repeat`

const sweep = keyframes`
  to { background-position: 100% 0; }
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
        background: ${SWEEP_BACKGROUND};
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
