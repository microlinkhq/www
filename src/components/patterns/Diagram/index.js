import React, { createContext, useContext, useMemo } from 'react'
import styled from 'styled-components'
import { colors, fonts, layout, theme } from 'theme'

import Box from 'components/elements/Box'

const DiagramContext = createContext(null)

const useDiagram = () => {
  const ctx = useContext(DiagramContext)
  if (!ctx) {
    throw new Error('Diagram primitives must render inside <Diagram>')
  }
  return ctx
}

const TOKENS = {
  paper: colors.white,
  ink: colors.black,
  muted: colors.black60,
  soft: colors.black40,
  inputFill: colors.black05,
  nestOuterFill: colors.black0125,
  nestMidFill: colors.black025,
  nestOuterStroke: colors.black30,
  nestMidStroke: colors.black50,
  accent: colors.secondary
}

const TONES = {
  focal: t => ({ fill: t.accent, fillOpacity: 0.08, stroke: t.accent }),
  input: t => ({ fill: t.inputFill, stroke: t.soft }),
  store: t => ({ fill: t.inputFill, stroke: t.muted }),
  backend: t => ({ fill: t.paper, stroke: t.ink }),
  optional: t => ({ fill: t.paper, stroke: t.soft, dashed: true })
}

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
    width: '100%',
    maxWidth: layout.large,
    height: 'auto',
    mx: 'auto'
  }),
  `
  overflow: visible;

  text {
    font-family: ${fonts.sans};
  }

  .mono {
    font-family: ${fonts.mono};
  }
`
)

const Label = ({ x, y, width, text, wide, fill }) => {
  const { tokens: t } = useDiagram()
  const w = width ?? labelWidth(text)
  return (
    <g>
      <rect x={x} y={y} width={w} height={12} rx='2' fill={t.paper} />
      <text
        className='mono'
        x={x + w / 2}
        y={y + 9}
        fill={fill ?? t.soft}
        fontSize='8'
        textAnchor='middle'
        letterSpacing={wide ? '0.14em' : '0.06em'}
      >
        {text}
      </text>
    </g>
  )
}

export const Connector = ({
  d,
  x1,
  y1,
  x2,
  y2,
  dashed,
  label,
  labelX,
  labelY
}) => {
  const { id, tokens: t } = useDiagram()
  const common = {
    fill: 'none',
    stroke: t.muted,
    strokeWidth: dashed ? '1' : '1.2',
    strokeDasharray: dashed ? '4,3' : undefined,
    markerEnd: `url(#${id}-arrow)`
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

const diamondPoints = (x, y, width, height) => {
  const mx = x + width / 2
  const my = y + height / 2
  return `${mx},${y} ${x + width},${my} ${mx},${y + height} ${x},${my}`
}

const Shape = ({ x, y, width, height, shape, paper, overlay }) => {
  if (shape === 'diamond') {
    const points = diamondPoints(x, y, width, height)
    return (
      <>
        <polygon points={points} fill={paper} />
        <polygon points={points} {...overlay} />
      </>
    )
  }
  const rx = shape === 'oval' ? height / 2 : 6
  return (
    <>
      <rect x={x} y={y} width={width} height={height} rx={rx} fill={paper} />
      <rect x={x} y={y} width={width} height={height} rx={rx} {...overlay} />
    </>
  )
}

export const Node = ({
  x,
  y,
  width,
  height,
  name,
  note,
  shape = 'rect',
  tone = 'input'
}) => {
  const { tokens: t } = useDiagram()
  const resolved = TONES[tone](t)
  const cx = x + width / 2
  const cy = y + height / 2 + (note ? -2 : 4)
  return (
    <g>
      <Shape
        x={x}
        y={y}
        width={width}
        height={height}
        shape={shape}
        paper={t.paper}
        overlay={{
          fill: resolved.fill,
          fillOpacity: resolved.fillOpacity,
          stroke: resolved.stroke,
          strokeWidth: '1',
          strokeDasharray: resolved.dashed ? '4,3' : undefined
        }}
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
      {note && (
        <text
          className='mono'
          x={cx}
          y={cy + 14}
          fill={t.muted}
          fontSize='8'
          textAnchor='middle'
        >
          {note}
        </text>
      )}
    </g>
  )
}

const NEST_TONES = {
  outer: t => ({
    fill: t.nestOuterFill,
    stroke: t.nestOuterStroke,
    label: t.soft
  }),
  mid: t => ({
    fill: t.nestMidFill,
    stroke: t.nestMidStroke,
    label: t.muted
  }),
  focal: t => ({
    fill: t.accent,
    fillOpacity: 0.08,
    stroke: t.accent,
    label: t.accent
  })
}

export const Nest = ({
  x,
  y,
  width,
  height,
  label,
  note,
  name,
  caption,
  tone = 'outer'
}) => {
  const { tokens: t } = useDiagram()
  const resolved = NEST_TONES[tone](t)
  const lw = Math.ceil((label.length * 8 + 24) / 4) * 4
  const nw = note ? labelWidth(note) : 0
  const cx = x + width / 2
  const cy = y + height / 2 + (caption ? -4 : 4)
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx='8'
        fill={resolved.fill}
        fillOpacity={resolved.fillOpacity}
        stroke={resolved.stroke}
        strokeWidth='1'
      />
      <Label
        x={x + 16}
        y={y - 8}
        width={lw}
        text={label}
        wide
        fill={resolved.label}
      />
      {note && (
        <Label
          x={x + width - 16 - nw}
          y={y - 8}
          width={nw}
          text={note}
          fill={t.muted}
        />
      )}
      {name && (
        <text
          x={cx}
          y={cy}
          fill={t.ink}
          fontSize='16'
          fontWeight='600'
          textAnchor='middle'
        >
          {name}
        </text>
      )}
      {caption && (
        <text
          className='mono'
          x={cx}
          y={cy + 20}
          fill={t.muted}
          fontSize='8'
          textAnchor='middle'
          letterSpacing='0.08em'
        >
          {caption}
        </text>
      )}
    </g>
  )
}

export const Diagram = ({ id, viewBox, title, description, children }) => {
  const value = useMemo(() => ({ id, tokens: TOKENS }), [id])
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
            <marker
              id={`${id}-arrow`}
              markerWidth='8'
              markerHeight='6'
              refX='8'
              refY='3'
              markerUnits='userSpaceOnUse'
              orient='auto'
            >
              <polygon points='0 0, 8 3, 0 6' fill={TOKENS.muted} />
            </marker>
          </defs>
          <rect width='100%' height='100%' fill={TOKENS.paper} />
          {children}
        </Canvas>
      </Frame>
    </DiagramContext.Provider>
  )
}
