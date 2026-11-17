import { colors, radii, transition } from 'theme'
import styled, { css, keyframes } from 'styled-components'

import { Button } from 'components/elements/Button/Button'

const BEAM_SPOTS = [
  { rgb: '255, 77, 148', size: '80px 19px', at: '27% 0%' },
  { rgb: '150, 80, 255', size: '74px 11px', at: '73% -1%' },
  { rgb: '112, 88, 255', size: '15px 44px', at: '100% 33%' },
  { rgb: '56, 132, 255', size: '19px 38px', at: '101% 72%' },
  { rgb: '88, 82, 255', size: '84px 13px', at: '67% 100%' },
  { rgb: '255, 140, 56', size: '60px 21px', at: '24% 101%' },
  { rgb: '40, 200, 170', size: '17px 40px', at: '0% 60%' },
  { rgb: '72, 120, 255', size: '13px 32px', at: '-1% 28%' }
]

const BEAM = BEAM_SPOTS.map(
  ({ rgb, size, at }) =>
    `radial-gradient(ellipse ${size} at ${at}, rgb(${rgb}), transparent)`
).join(', ')

const FACE_SHADOW =
  '0 2px 6px 0 rgba(0, 0, 0, 0.06), 0 4px 42px 0 rgba(0, 0, 0, 0.04)'
const RING_FILTER = 'brightness(1.7) saturate(0.6)'
const GLOW_BLUR = '16px'
const GLOW_OPACITY = 0.55
const GLOW_HOVER_OPACITY = 0.85
const HUE_DRIFT = '12deg'
const HUE_DRIFT_DURATION = '2.4s'

const ringHueDrift = keyframes`
  from { filter: ${RING_FILTER} hue-rotate(-${HUE_DRIFT}); }
  to { filter: ${RING_FILTER} hue-rotate(${HUE_DRIFT}); }
`

const glowHueDrift = keyframes`
  from { filter: blur(${GLOW_BLUR}) hue-rotate(-${HUE_DRIFT}); }
  to { filter: blur(${GLOW_BLUR}) hue-rotate(${HUE_DRIFT}); }
`

const beamLayer = css`
  content: '';
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
`

export const GenerateButton = styled(Button)`
  &&& {
    position: relative;
    isolation: isolate;
    width: 100%;
    max-width: 420px;
    margin-left: auto;
    margin-right: auto;
    justify-content: center;
    text-align: center;
    border: none;
    border-radius: ${radii[4]};
    background: transparent;
    box-shadow: none;
    color: ${colors.black};
    opacity: 1;

    &::before {
      ${beamLayer}
      inset: 0;
      z-index: -1;
      border: 1px solid transparent;
      background: linear-gradient(${colors.white}, ${colors.white}) padding-box,
        ${BEAM},
        linear-gradient(${colors.black10}, ${colors.black10}) border-box;
      box-shadow: ${FACE_SHADOW};
      filter: ${RING_FILTER};
    }

    &::after {
      ${beamLayer}
      inset: -6px;
      z-index: -2;
      background: ${BEAM};
      transform: scale(0.95, 0.9);
      filter: blur(${GLOW_BLUR});
      opacity: ${GLOW_OPACITY};
      transition: opacity ${transition.medium};
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:disabled) {
        background: transparent;
        box-shadow: none;
        color: ${colors.black};
      }

      &:hover:not(:disabled)::after {
        opacity: ${GLOW_HOVER_OPACITY};
      }
    }

    &:disabled {
      cursor: wait;
      background: transparent;
      box-shadow: none;
      color: ${colors.black};
    }

    @media (prefers-reduced-motion: no-preference) {
      &:disabled::before {
        animation: ${ringHueDrift} ${HUE_DRIFT_DURATION} ease-in-out infinite
          alternate;
      }

      &:disabled::after {
        animation: ${glowHueDrift} ${HUE_DRIFT_DURATION} ease-in-out infinite
          alternate;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;

      &::after {
        transition: none;
      }
    }

    @media (forced-colors: active) {
      border: 1px solid ButtonText;

      &::before,
      &::after {
        display: none;
      }
    }
  }
`
