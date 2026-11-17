import { radii, theme, touchTargets } from 'theme'
import styled, { css, keyframes } from 'styled-components'

import { Button } from 'components/elements/Button/Button'

const HIGHLIGHT = '#fbfafd'
const PURPLE = '#a989f5'
const PINK = '#ffb9c9'
const ORANGE = '#fca326'

const SHADOW = `linear-gradient(
  160deg,
  transparent 0%,
  ${HIGHLIGHT} 15%,
  ${PURPLE} 20%,
  ${PINK} 25%,
  ${ORANGE} 30%,
  transparent 36%,
  transparent 40%,
  ${HIGHLIGHT} 55%,
  ${PURPLE} 60%,
  ${PINK} 65%,
  ${ORANGE} 70%,
  transparent 76%,
  transparent 80%,
  ${HIGHLIGHT} 95%,
  ${PURPLE} 100%
)`

const shadowTravel = keyframes`
  to {
    background-position: 75% 75%;
  }
`

const FACE = '#ececef'
const FACE_HOVER = '#fbfafd'
const PRESSED = '#dcdcde'
const TEXT = '#18171d'
const HEIGHT = '32px'
const BORDER = '1px'
const THICKNESS = '1px'
const OFFSET = '1px'

const beam = css`
  content: '';
  position: absolute;
  pointer-events: none;
  background: ${SHADOW} 15% 15% / 300% 300%;
  opacity: var(--shimmer-opacity);
  transition: opacity 0.2s cubic-bezier(0.22, 0.61, 0.36, 1);
`

export const GenerateButton = styled(Button)`
  &&& {
    ${theme({
      position: 'relative',
      zIndex: 1,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: HEIGHT,
      minHeight: [touchTargets.minHeight, HEIGHT],
      py: 0,
      px: '12px',
      fontSize: '14px',
      fontWeight: 'normal',
      lineHeight: '16px',
      border: 1,
      borderRadius: 4,
      boxShadow: 'none'
    })}
    border-color: transparent;
    transition: none;
    --shimmer-opacity: 0;
    transform-style: preserve-3d;
    overflow: visible;
    background-color: ${FACE};
    background-image: none;
    color: ${TEXT};
    opacity: 1;

    &::before,
    &::after {
      ${beam}
    }

    &::before {
      inset: -${BORDER};
      border-radius: inherit;
      filter: blur(12px);
      transform: translateZ(-1px);
      opacity: calc(var(--shimmer-opacity) * 0.9);
    }

    &::after {
      inset: calc(-1 * (${OFFSET} + ${THICKNESS}) + 1px - ${BORDER});
      padding: ${THICKNESS};
      border-radius: calc(${radii[4]} + ${OFFSET} + ${THICKNESS});
      -webkit-mask: linear-gradient(#fff 0 0) content-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask: linear-gradient(#fff 0 0) content-box exclude,
        linear-gradient(#fff 0 0);
    }

    @media (prefers-reduced-motion: no-preference) {
      &::before,
      &::after {
        animation: ${shadowTravel} 3s linear infinite;
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:disabled) {
        background-color: ${FACE_HOVER};
        background-image: none;
        box-shadow: none;
        color: ${TEXT};
      }

      &:hover:not(:focus-within):not(:disabled) {
        --shimmer-opacity: 1;
      }

      &:active:not(:disabled) {
        transform: none;
        background-color: ${PRESSED};
        color: ${TEXT};
      }
    }

    &:disabled {
      cursor: wait;
      opacity: 1;
      background-color: ${FACE};
      background-image: none;
      box-shadow: none;
      color: ${TEXT};
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;

      &::before,
      &::after {
        transition: none;
      }
    }

    @media (forced-colors: active) {
      border: 1px solid ButtonText;
      background: ButtonFace;
      color: ButtonText;

      &::before,
      &::after {
        display: none;
      }
    }
  }
`
