import { css, keyframes } from 'styled-components'
import Box from 'components/elements/Box'
import { transition } from 'theme'
import { lighten } from 'polished'
import React from 'react'

const translation = keyframes`
0% {
  transform: translateY(0)
}

to {
  transform: translateY(calc(50% + 28px))
}
`

const absolute = css`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Overlay = ({ color }) => {
  const leftColor = color || '#8c1bab'
  const rightColor = color || '#f76698'

  return (
    <Box
      id='overlay'
      css={`
        ${absolute}
        overflow:hidden;
        z-index: -1;
      `}
    >
      <Box
        as='span'
        css={`
          background-image: linear-gradient(to top, #fff, transparent);
          width: 100%;
          height: 28rem;
          bottom: 0;
          left: 0;
          position: absolute;
        `}
      />
      <Box
        as='span'
        css={`
          opacity: 0.5;
          &::before,
          &::after {
            content: '';
            position: absolute;
            filter: blur(125px);
            will-change: filter;
            mix-blend-mode: normal;
          }
          &::before {
            width: 25%;
            height: 900px;
            left: -12.5%;
            top: calc(50% - 900px / 2 + 151px);
            opacity: 0.2;
            background: linear-gradient(
              180deg,
              ${leftColor},
              ${lighten(0.8, leftColor)}
            );
            transform: rotate(-15deg);
            border-bottom-left-radius: 25% 25%;
            border-bottom-right-radius: 25% 25%;
            border-top-left-radius: 100% 100%;
            border-top-right-radius: 100% 100%;
            z-index: 200;
          }
          &::after {
            width: 40%;
            height: 422px;
            left: 0;
            top: calc(50% - 422px / 2 + 298px);
            opacity: 0.5;
            background: linear-gradient(
              180deg,
              ${leftColor},
              ${lighten(0.8, leftColor)}
            );
          }
        `}
      />
      <Box
        as='span'
        css={`
          opacity: 0.5;
          &::before,
          &::after {
            content: '';
            position: absolute;
            pointer-events: none;
            filter: blur(125px);
            will-change: filter;
            mix-blend-mode: normal;
          }
          &::before {
            z-index: 200;
            width: 25%;
            height: 900px;
            right: -12.5%;
            top: calc(50% - 900px / 2 + 151px);
            background-image: linear-gradient(
              180deg,
              ${lighten(0.2, rightColor)},
              ${rightColor}
            );
            transform: rotate(15deg);
            border-bottom-left-radius: 25% 25%;
            border-bottom-right-radius: 25% 25%;
            border-top-left-radius: 100% 100%;
            border-top-right-radius: 100% 100%;
            opacity: 0.2;
            overflow: hidden;
          }
          &::after {
            width: 40%;
            height: 422px;
            right: 0;
            top: calc(50% - 422px / 2 + 298px);
            opacity: 0.25;
            background: linear-gradient(
              180deg,
              ${lighten(0.2, rightColor)},
              ${rightColor}
            );
            transform: matrix(-1, 0, 0, 1, 0, 0);
          }
        `}
      />
      <Box
        css={`
          ${absolute};
          z-index: -1;
          perspective: 1000px;
        `}
      >
        <Box
          css={`
            background: linear-gradient(to top, rgba(0, 0, 0, 0) 0px, #fff 50%);
            ${absolute};
            z-index: 1;
          `}
        />
        <Box
          css={`
            ${absolute};
            transform: rotateX(75deg);
          `}
        >
          <Box
            id='animation-overlay'
            css={`
              position: absolute;
              width: 200vw;
              margin-left: -50%;
              background: linear-gradient(90deg, ${leftColor}, ${rightColor});
              mask-image: linear-gradient(90deg, #000 2px, transparent 0),
                linear-gradient(180deg, #000 2px, transparent 0);
              mask-size: 80px 80px;
              mask-repeat: repeat;
              top: -100%;
              right: 0px;
              bottom: -100%;
              left: 0px;
              mask-position: 50% 0;
              animation: ${translation} 30s linear infinite;
              transition: background-image ${transition.medium};
            `}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Overlay
