import React from 'react'

import { Connector, Diagram, Node } from 'components/patterns/Diagram'

import { MIN_WIDTH } from './canvas'

export const EveryoneProfitableVisual = () => (
  <Diagram
    id='manifesto-everyone-profitable'
    viewBox='0 0 480 168'
    minWidth={MIN_WIDTH}
    title='Every project pays for itself'
    description='Revenue, new customers or hours saved feed a project. A project that earns one keeps going. A project that earns none stops.'
  >
    <Connector d='M 128,36 H 144 Q 152,36 152,44 V 60 Q 152,68 160,68 H 176' />
    <Connector x1={128} y1={88} x2={176} y2={88} />
    <Connector d='M 128,140 H 144 Q 152,140 152,132 V 116 Q 152,108 160,108 H 176' />
    <Connector d='M 288,72 H 312 Q 320,72 320,64 V 52 Q 320,44 328,44 H 352' />
    <Connector
      d='M 288,104 H 312 Q 320,104 320,112 V 124 Q 320,132 328,132 H 352'
      dashed
    />
    <Node x={16} y={16} width={112} height={40} tone='input' name='Revenue' />
    <Node
      x={16}
      y={68}
      width={112}
      height={40}
      tone='input'
      name='New customers'
    />
    <Node
      x={16}
      y={120}
      width={112}
      height={40}
      tone='input'
      name='Hours saved'
    />
    <Node
      x={176}
      y={48}
      width={112}
      height={80}
      tone='backend'
      name='Project'
      note='must earn one'
    />
    <Node
      x={352}
      y={24}
      width={112}
      height={40}
      tone='focal'
      name='Keeps going'
      note='earns one'
    />
    <Node
      x={352}
      y={112}
      width={112}
      height={40}
      tone='optional'
      name='Stops'
      note='earns none'
    />
  </Diagram>
)
