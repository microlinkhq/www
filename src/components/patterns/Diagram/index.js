import React, { createContext, useContext, useMemo } from 'react'
import styled from 'styled-components'
import { accentBand, accentIcon, colors, fonts, layout, theme } from 'theme'

import Box from 'components/elements/Box'

const DiagramContext = createContext(null)

const useDiagram = () => {
  const ctx = useContext(DiagramContext)
  if (!ctx) {
    throw new Error('Diagram primitives must render inside <Diagram>')
  }
  return ctx
}

const diagramTokens = (accent = 'indigo') => ({
  paper: colors.white,
  ink: colors.black,
  muted: colors.black60,
  soft: colors.black40,
  rule: colors.black10,
  link: colors.link,
  inputFill: colors.black05,
  accent: colors[accentIcon(accent)],
  accentTint: colors[accentBand(accent)]
})

const TONES = {
  focal: t => ({ fill: t.accentTint, stroke: t.accent }),
  input: t => ({ fill: t.inputFill, stroke: t.soft }),
  store: t => ({ fill: t.inputFill, stroke: t.muted }),
  backend: t => ({ fill: t.paper, stroke: t.ink })
}

const MARKERS = [
  ['arrow', 'link'],
  ['arrow-accent', 'accent'],
  ['arrow-muted', 'muted']
]

const labelWidth = text => Math.ceil((text.length * 8 + 16) / 4) * 4

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
    width: layout.large,
    maxWidth: layout.large,
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

const Label = ({ x, y, width, text, wide }) => {
  const { tokens: t } = useDiagram()
  const w = width ?? labelWidth(text)
  return (
    <g>
      <rect x={x} y={y} width={w} height={12} rx='2' fill={t.paper} />
      <text
        className='mono'
        x={x + w / 2}
        y={y + 9}
        fill={t.soft}
        fontSize='8'
        textAnchor='middle'
        letterSpacing={wide ? '0.14em' : '0.06em'}
      >
        {text}
      </text>
    </g>
  )
}

export const Zone = ({ x, y, width, height, label }) => {
  const { tokens: t } = useDiagram()
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx='8'
        fill={t.ink}
        fillOpacity='0.02'
        stroke={t.rule}
        strokeWidth='0.8'
      />
      <Label
        x={x + 12}
        y={y + 4}
        width={label.length * 8 + 8}
        text={label}
        wide
      />
    </g>
  )
}

export const Connector = ({
  d,
  x1,
  y1,
  x2,
  y2,
  variant = 'link',
  label,
  labelX,
  labelY
}) => {
  const { id, tokens: t } = useDiagram()
  const markerId = variant === 'link' ? `${id}-arrow` : `${id}-arrow-${variant}`
  const common = {
    fill: 'none',
    stroke: t[variant],
    strokeWidth: '1.2',
    markerEnd: `url(#${markerId})`
  }
  const w = label ? labelWidth(label) : 0
  const lx = labelX ?? (x1 != null && x2 != null ? (x1 + x2) / 2 - w / 2 : null)
  const ly = labelY ?? (y1 != null ? y1 - 20 : null)
  return (
    <g>
      {d
        ? (
          <path d={d} {...common} />
          )
        : (
          <line x1={x1} y1={y1} x2={x2} y2={y2} {...common} />
          )}
      {label && lx != null && ly != null && (
        <Label x={lx} y={ly} width={w} text={label} />
      )}
    </g>
  )
}

export const Node = ({
  x,
  y,
  width,
  height,
  name,
  tone = 'input',
  fill,
  stroke
}) => {
  const { tokens: t } = useDiagram()
  const resolved = TONES[tone](t)
  const cx = x + width / 2
  const cy = y + height / 2 + 4
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx='6' fill={t.paper} />
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx='6'
        fill={fill ?? resolved.fill}
        stroke={stroke ?? resolved.stroke}
        strokeWidth='1'
      />
      <text
        x={cx}
        y={cy}
        fill={t.ink}
        fontSize='12'
        fontWeight='600'
        textAnchor='middle'
      >
        {name}
      </text>
    </g>
  )
}

export const Diagram = ({
  id,
  viewBox,
  title,
  description,
  accent = 'indigo',
  children
}) => {
  const tokens = useMemo(() => diagramTokens(accent), [accent])
  const value = useMemo(() => ({ id, tokens }), [id, tokens])
  return (
    <DiagramContext.Provider value={value}>
      <Frame>
        <Canvas
          viewBox={viewBox}
          role='img'
          aria-labelledby={`${id}-title ${id}-desc`}
        >
          <title id={`${id}-title`}>{title}</title>
          <desc id={`${id}-desc`}>{description}</desc>
          <defs>
            {MARKERS.map(([suffix, key]) => (
              <marker
                key={suffix}
                id={`${id}-${suffix}`}
                markerWidth='8'
                markerHeight='6'
                refX='7'
                refY='3'
                orient='auto'
              >
                <polygon points='0 0, 8 3, 0 6' fill={tokens[key]} />
              </marker>
            ))}
          </defs>
          <rect width='100%' height='100%' fill={tokens.paper} />
          {children}
        </Canvas>
      </Frame>
    </DiagramContext.Provider>
  )
}
