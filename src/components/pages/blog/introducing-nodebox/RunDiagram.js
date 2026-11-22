import React from 'react'

import { Connector, Diagram, Nest, Node } from 'components/patterns/Diagram'

const NEST_Y = 40
const NEST_HEIGHT = 200
const NODE_Y = 104
const NODE_HEIGHT = 72
const INSET = 24
const REQUEST_Y = 124
const REPLY_Y = 156

export const STAGES = [
  {
    x: 40,
    width: 240,
    label: 'YOUR PAGE',
    tone: 'outer',
    node: { name: 'Nodebox embed', note: 'editor + result', tone: 'focal' }
  },
  {
    x: 360,
    width: 240,
    label: 'MICROLINK API',
    tone: 'mid',
    node: {
      name: 'function',
      note: 'cache, install packages',
      tone: 'backend'
    }
  },
  {
    x: 680,
    width: 240,
    label: 'SANDBOX',
    note: 'THROWN AWAY',
    tone: 'outer',
    node: {
      name: 'Your code',
      note: 'Node.js, no host files, no disk',
      tone: 'backend'
    }
  }
]

export const HOPS = [
  { request: 'CODE', reply: 'RESULT' },
  { request: 'RUN', reply: 'VALUE + LOGS' }
]

const nodeLeft = stage => stage.x + INSET
const nodeRight = stage => stage.x + stage.width - INSET

export const RunDiagram = () => (
  <Diagram
    id='nodebox-run'
    viewBox='0 0 960 280'
    title='What happens when a reader presses run'
    description='The Nodebox embed on your page sends the code to the Microlink API function parameter. Microlink answers identical code from its cache, or installs the packages the code imports and runs it in a fresh sandbox with no access to host files or disk. The sandbox returns the value and the console output, Microlink sends the result back to the embed, and the sandbox is thrown away.'
  >
    {STAGES.map(stage => (
      <Nest
        key={stage.label}
        x={stage.x}
        y={NEST_Y}
        width={stage.width}
        height={NEST_HEIGHT}
        label={stage.label}
        note={stage.note}
        tone={stage.tone}
      />
    ))}
    {HOPS.map((hop, index) => {
      const from = STAGES[index]
      const to = STAGES[index + 1]
      return (
        <g key={hop.request}>
          <Connector
            x1={nodeRight(from)}
            y1={REQUEST_Y}
            x2={nodeLeft(to)}
            y2={REQUEST_Y}
            label={hop.request}
          />
          <Connector
            x1={nodeLeft(to)}
            y1={REPLY_Y}
            x2={nodeRight(from)}
            y2={REPLY_Y}
            label={hop.reply}
          />
        </g>
      )
    })}
    {STAGES.map(stage => (
      <Node
        key={stage.node.name}
        x={nodeLeft(stage)}
        y={NODE_Y}
        width={stage.width - INSET * 2}
        height={NODE_HEIGHT}
        tone={stage.node.tone}
        name={stage.node.name}
        note={stage.node.note}
      />
    ))}
  </Diagram>
)
