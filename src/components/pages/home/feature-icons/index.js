import { theme, colors, gradientStops, speed, timings } from 'theme'
import styled from 'styled-components'
import React from 'react'

import GEOMETRY from './geometry.json'

export const FEATURE_CARD_ATTRIBUTE = 'data-feature-card'

const STROKE_PX = {
  outline: 1.4,
  edge: 1,
  detail: 0.75,
  texture: 0.5,
  axis: 0.75
}
const ROLE_INK = {
  outline: colors.gray8,
  edge: colors.gray7,
  detail: colors.gray7,
  texture: colors.gray7,
  axis: colors.gray7
}
const ACCENT_FILL_STOPS = [
  ['0%', colors.pink1],
  ['100%', colors.violet1]
]
const GLOW_COLOR = colors.violet3
const GLOW_OPACITY = { rest: 0.5, hover: 0.8 }
const STAGGER_MS = 40
const HOVER = `[${FEATURE_CARD_ATTRIBUTE}]:hover &`
const MOTION =
  '@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

const Svg = styled.svg(
  theme({
    display: 'block',
    width: 'auto',
    height: 'auto',
    maxWidth: '82%',
    maxHeight: '100%',
    overflow: 'visible'
  })
)

const Part = styled.g`
  transform-box: fill-box;

  ${MOTION} {
    transition: transform ${speed.slowly}ms ${timings.smooth};
    transition-delay: ${({ $order }) => $order * STAGGER_MS}ms;

    ${HOVER} {
      transform: translate(
        ${({ $shift }) => $shift[0]}px,
        ${({ $shift }) => $shift[1]}px
      );
    }
  }
`

const Glow = styled.ellipse`
  opacity: ${GLOW_OPACITY.rest};
  transform-box: fill-box;
  transform-origin: center;

  ${MOTION} {
    transition: opacity ${speed.slowly}ms ${timings.smooth},
      transform ${speed.slowly}ms ${timings.smooth};

    ${HOVER} {
      opacity: ${GLOW_OPACITY.hover};
      transform: scale(1.12);
    }
  }
`

const Stops = ({ stops }) =>
  stops.map(([offset, stopColor]) => (
    <stop key={offset} offset={offset} stopColor={stopColor} />
  ))

const FeatureIcon = ({ name }) => {
  const icon = GEOMETRY[name]
  const ids = {
    ink: `feature-icon-${name}-ink`,
    fill: `feature-icon-${name}-fill`,
    glow: `feature-icon-${name}-glow`
  }
  const [x1, x2] = icon.accentSpan
  const strokeWidth = role => STROKE_PX[role] * icon.unitsPerPx

  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      width={icon.width}
      height={icon.height}
      viewBox={icon.viewBox.join(' ')}
      aria-hidden='true'
      focusable='false'
    >
      <defs>
        <linearGradient
          id={ids.ink}
          gradientUnits='userSpaceOnUse'
          x1={x1}
          x2={x2}
          y1='0'
          y2='0'
        >
          <Stops stops={gradientStops} />
        </linearGradient>
        <linearGradient
          id={ids.fill}
          gradientUnits='userSpaceOnUse'
          x1={x1}
          x2={x2}
          y1='0'
          y2='0'
        >
          <Stops stops={ACCENT_FILL_STOPS} />
        </linearGradient>
        <radialGradient id={ids.glow}>
          <stop offset='0%' stopColor={GLOW_COLOR} />
          <stop offset='100%' stopColor={GLOW_COLOR} stopOpacity='0' />
        </radialGradient>
      </defs>
      <Glow {...icon.glow} fill={`url(#${ids.glow})`} />
      {icon.parts.map(({ id, accent, shift, fill, lines }, order) => (
        <Part key={id} $shift={shift} $order={order}>
          {fill && (
            <path d={fill} fill={accent ? `url(#${ids.fill})` : colors.white} />
          )}
          {Object.entries(lines).map(([role, d]) => (
            <path
              key={role}
              d={d}
              fill='none'
              stroke={accent ? `url(#${ids.ink})` : ROLE_INK[role]}
              strokeWidth={strokeWidth(role)}
              strokeLinecap={role === 'axis' ? 'butt' : 'round'}
              strokeLinejoin='round'
            />
          ))}
        </Part>
      ))}
    </Svg>
  )
}

export default FeatureIcon
