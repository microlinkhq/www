import Caps from 'components/elements/Caps'
import FeatherIcon from 'components/icons/Feather'
import { WandSparkles } from 'components/icons/WandSparkles'
import { theme } from 'theme'
import React from 'react'
import styled, { keyframes } from 'styled-components'

import { reduceMotion } from './primitives'

const shimmer = keyframes`
  0% { background-position: 100% 0 }
  100% { background-position: 0% 0 }
`

const ShimmerText = styled.span`
  ${theme({
    position: 'relative',
    display: 'inline-block',
    color: 'grape7'
  })};

  &::before {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: linear-gradient(
      90deg,
      transparent 0%,
      transparent 40%,
      rgba(255, 255, 255, 0.95) 50%,
      transparent 60%,
      transparent 100%
    );
    background-size: 220% 100%;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    animation: ${shimmer} 3.2s ease-in-out infinite;
  }

  ${reduceMotion} {
    &::before {
      animation: none;
    }
  }
`

export const StatusLine = ({ liveStatus }) => (
  <Caps
    css={theme({
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      mt: 4,
      fontFamily: 'mono',
      fontSize: 0,
      color: liveStatus.color
    })}
  >
    <FeatherIcon icon={WandSparkles} size={0} color={liveStatus.color} />
    {liveStatus.live
      ? (
        <ShimmerText data-text={liveStatus.text}>{liveStatus.text}</ShimmerText>
        )
      : (
          liveStatus.text
        )}
  </Caps>
)
