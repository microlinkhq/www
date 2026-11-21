import React from 'react'

import { Connector, Diagram, Node } from 'components/patterns/Diagram'

import { MIN_WIDTH } from './canvas'

export const EveryoneShipsVisual = () => (
  <Diagram
    id='manifesto-everyone-ships'
    viewBox='0 0 480 176'
    minWidth={MIN_WIDTH}
    title='Bring work, not ideas'
    description='An idea turns into a discussion and then into maybe later. A prototype ships the same day.'
  >
    <Connector x1={136} y1={40} x2={180} y2={40} dashed />
    <Connector x1={300} y1={40} x2={344} y2={40} dashed />
    <Connector x1={136} y1={136} x2={344} y2={136} label='SAME DAY' />
    <Node
      x={16}
      y={16}
      width={120}
      height={48}
      tone='optional'
      name='Idea'
      note='said in chat'
    />
    <Node
      x={180}
      y={16}
      width={120}
      height={48}
      tone='optional'
      name='Discussion'
      note='nobody owns it'
    />
    <Node
      x={344}
      y={16}
      width={120}
      height={48}
      tone='optional'
      name='Maybe later'
      note='never shipped'
    />
    <Node
      x={16}
      y={112}
      width={120}
      height={48}
      tone='backend'
      name='Prototype'
      note='draft · page · demo'
    />
    <Node
      x={344}
      y={112}
      width={120}
      height={48}
      tone='focal'
      name='Shipped'
      note='in production'
    />
  </Diagram>
)
