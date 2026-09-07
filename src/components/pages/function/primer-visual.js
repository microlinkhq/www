import React from 'react'
import styled from 'styled-components'
import { colors, fonts, layout, theme } from 'theme'

import Box from 'components/elements/Box'

const PAPER = colors.white
const INK = colors.black
const MUTED = colors.black60
const SOFT = colors.black40
const RULE = colors.black10
const ACCENT = colors.indigo8
const ACCENT_TINT = colors.indigo0
const LINK = colors.link
const INPUT_FILL = colors.black05

const Frame = styled(Box)(
  theme({
    width: '100%',
    bg: 'white',
    py: [3, 3, 4, 4],
    overflowX: 'auto',
    WebkitOverflowScrolling: 'touch'
  }),
  `font-family: ${fonts.sans};`
)

const Canvas = styled('svg')(
  theme({
    display: 'block',
    width: '100%',
    maxWidth: `min(${layout.large}, 80vw)`,
    height: 'auto',
    mx: 'auto'
  }),
  `
  text {
    font-family: ${fonts.sans};
  }

  .mono {
    font-family: ${fonts.mono};
  }
`
)

const NodeBox = ({ x, y, w, h, fill, stroke, name }) => {
  const cx = x + w / 2
  const cy = y + h / 2 + 4
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx='6' fill={PAPER} />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx='6'
        fill={fill}
        stroke={stroke}
        strokeWidth='1'
      />
      <text
        x={cx}
        y={cy}
        fill={INK}
        fontSize='12'
        fontWeight='600'
        textAnchor='middle'
      >
        {name}
      </text>
    </g>
  )
}

export const FunctionPrimerVisual = () => (
  <Frame>
    <Canvas
      viewBox='0 0 960 280'
      role='img'
      aria-labelledby='function-flow-title function-flow-desc'
    >
      <title id='function-flow-title'>How Microlink Function runs</title>
      <desc id='function-flow-desc'>
        You send function code and a target URL. Microlink runs that code on the
        page and returns whatever it produced. A browser starts only if you need
        the page.
      </desc>
      <defs>
        <marker
          id='function-arrow'
          markerWidth='8'
          markerHeight='6'
          refX='7'
          refY='3'
          orient='auto'
        >
          <polygon points='0 0, 8 3, 0 6' fill={LINK} />
        </marker>
      </defs>
      <rect width='100%' height='100%' fill={PAPER} />
      <rect
        x='32'
        y='16'
        width='240'
        height='248'
        rx='8'
        fill={INK}
        fillOpacity='0.02'
        stroke={RULE}
        strokeWidth='0.8'
      />
      <rect x='44' y='20' width='48' height='12' rx='2' fill={PAPER} />
      <text
        className='mono'
        x='68'
        y='29'
        fill={SOFT}
        fontSize='8'
        textAnchor='middle'
        letterSpacing='0.14em'
      >
        INPUT
      </text>
      <rect
        x='704'
        y='68'
        width='232'
        height='160'
        rx='8'
        fill={INK}
        fillOpacity='0.02'
        stroke={RULE}
        strokeWidth='0.8'
      />
      <rect x='716' y='72' width='56' height='12' rx='2' fill={PAPER} />
      <text
        className='mono'
        x='744'
        y='81'
        fill={SOFT}
        fontSize='8'
        textAnchor='middle'
        letterSpacing='0.14em'
      >
        OUTPUT
      </text>
      <path
        d='M 252,84 H 312 Q 320,84 320,92 V 124 Q 320,132 328,132 H 400'
        fill='none'
        stroke={LINK}
        strokeWidth='1.2'
        markerEnd='url(#function-arrow)'
      />
      <rect x='260' y='64' width='52' height='12' rx='2' fill={PAPER} />
      <text
        className='mono'
        x='286'
        y='73'
        fill={SOFT}
        fontSize='8'
        textAnchor='middle'
        letterSpacing='0.06em'
      >
        EVAL
      </text>
      <path
        d='M 252,200 H 312 Q 320,200 320,192 V 160 Q 320,152 328,152 H 400'
        fill='none'
        stroke={LINK}
        strokeWidth='1.2'
        markerEnd='url(#function-arrow)'
      />
      <rect x='256' y='166' width='56' height='12' rx='2' fill={PAPER} />
      <text
        className='mono'
        x='284'
        y='175'
        fill={SOFT}
        fontSize='8'
        textAnchor='middle'
        letterSpacing='0.06em'
      >
        FETCH
      </text>
      <line
        x1='560'
        y1='142'
        x2='720'
        y2='142'
        stroke={LINK}
        strokeWidth='1.2'
        markerEnd='url(#function-arrow)'
      />
      <rect x='612' y='122' width='56' height='12' rx='2' fill={PAPER} />
      <text
        className='mono'
        x='640'
        y='131'
        fill={SOFT}
        fontSize='8'
        textAnchor='middle'
        letterSpacing='0.06em'
      >
        VALUE
      </text>
      <NodeBox
        x={52}
        y={52}
        w={200}
        h={64}
        fill={INPUT_FILL}
        stroke={SOFT}
        name='Function code'
      />
      <NodeBox
        x={52}
        y={168}
        w={200}
        h={64}
        fill={INPUT_FILL}
        stroke={SOFT}
        name='Target URL'
      />
      <NodeBox
        x={400}
        y={110}
        w={160}
        h={64}
        fill={ACCENT_TINT}
        stroke={ACCENT}
        name='Microlink'
      />
      <NodeBox
        x={720}
        y={110}
        w={200}
        h={64}
        fill={INPUT_FILL}
        stroke={MUTED}
        name='Result'
      />
    </Canvas>
  </Frame>
)
