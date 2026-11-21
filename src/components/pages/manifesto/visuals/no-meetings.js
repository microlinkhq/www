import React from 'react'

import { Connector, Diagram, Node } from 'components/patterns/Diagram'

import { MIN_WIDTH } from './canvas'

const READERS = [
  { y: 16, note: 'reads at 09:00' },
  { y: 72, note: 'reads at 15:00' },
  { y: 128, note: 'reads at 22:00' }
]

export const NoMeetingsVisual = () => (
  <Diagram
    id='manifesto-no-meetings'
    viewBox='0 0 480 184'
    minWidth={MIN_WIDTH}
    title='Write it. Decide. Ship.'
    description='A written proposal reaches three teammates who read it at different hours. The decision happens in the thread, then the work ships.'
  >
    <Connector d='M 104,80 H 112 Q 120,80 120,72 V 44 Q 120,36 128,36 H 136' />
    <Connector x1={104} y1={92} x2={136} y2={92} />
    <Connector d='M 104,104 H 112 Q 120,104 120,112 V 140 Q 120,148 128,148 H 136' />
    <Connector d='M 232,36 H 240 Q 248,36 248,44 V 72 Q 248,80 256,80 H 264' />
    <Connector x1={232} y1={92} x2={264} y2={92} />
    <Connector d='M 232,148 H 240 Q 248,148 248,140 V 112 Q 248,104 256,104 H 264' />
    <Connector x1={352} y1={92} x2={376} y2={92} />
    <Node
      x={16}
      y={68}
      width={88}
      height={48}
      tone='input'
      name='Write it'
      note='the proposal'
    />
    {READERS.map(({ y, note }) => (
      <Node
        key={note}
        x={136}
        y={y}
        width={96}
        height={40}
        tone='store'
        name='Teammate'
        note={note}
      />
    ))}
    <Node
      x={264}
      y={68}
      width={88}
      height={48}
      tone='backend'
      name='Decide'
      note='in the thread'
    />
    <Node x={376} y={68} width={88} height={48} tone='focal' name='Ship' />
  </Diagram>
)
