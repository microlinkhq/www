import React from 'react'

import {
  Connector,
  Diagram,
  Node,
  labelWidth
} from 'components/patterns/Diagram'

const NODE_WIDTH = 200
const LABEL_GAP = 6
const NODE_HEIGHT = 64

const center = node => node.y + NODE_HEIGHT / 2
const right = node => node.x + NODE_WIDTH

export const NODES = {
  open: {
    x: 30,
    y: 128,
    name: 'Open the goto link',
    note: 'google.com/goto?url=CAES…',
    tone: 'focal'
  },
  redirect: {
    x: 380,
    y: 40,
    name: '302 → destination',
    note: 'most links, right away',
    tone: 'backend'
  },
  hold: {
    x: 380,
    y: 216,
    name: '200 Verifying your request',
    note: 'wait N seconds, then open NEXT',
    tone: 'input'
  },
  early: {
    x: 730,
    y: 160,
    name: '400',
    note: 'NEXT opened before N seconds',
    tone: 'optional'
  },
  late: {
    x: 730,
    y: 272,
    name: '302 → destination',
    note: 'NEXT opened after N seconds',
    tone: 'backend'
  }
}

export const EDGES = [
  { from: 'open', to: 'redirect', label: 'REDIRECT' },
  { from: 'open', to: 'hold', label: 'HOLD' },
  { from: 'hold', to: 'early', label: 'TOO SOON' },
  { from: 'hold', to: 'late', label: 'AFTER WAIT' }
]

const bendOf = (from, to) => (right(from) + to.x) / 2

const elbow = (from, to) =>
  `M${right(from)} ${center(from)} H${bendOf(from, to)} V${center(to)} H${to.x}`

export const GotoDiagram = () => (
  <Diagram
    id='google-goto'
    viewBox='0 0 960 368'
    title='How Google answers a goto link'
    description='Opening a Google goto link usually answers a 302 redirect to the destination right away. When Google holds the link, it answers a 200 Verifying your request page that says to wait N seconds and then open a second goto link. Opening that second link before N seconds answers 400; opening it after N seconds answers a 302 redirect to the destination.'
  >
    {EDGES.map(({ from, to, label }) => {
      const source = NODES[from]
      const target = NODES[to]
      return (
        <Connector
          key={label}
          d={elbow(source, target)}
          label={label}
          labelX={bendOf(source, target) - labelWidth(label) - LABEL_GAP}
          labelY={center(target) - LABEL_GAP}
        />
      )
    })}
    {Object.values(NODES).map(node => (
      <Node
        key={`${node.name}-${node.y}`}
        x={node.x}
        y={node.y}
        width={NODE_WIDTH}
        height={NODE_HEIGHT}
        name={node.name}
        note={node.note}
        tone={node.tone}
      />
    ))}
  </Diagram>
)
