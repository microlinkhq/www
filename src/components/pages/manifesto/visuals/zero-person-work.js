import React from 'react'

import { Connector, Diagram, Node } from 'components/patterns/Diagram'

import { MIN_WIDTH } from './canvas'

export const ZeroPersonWorkVisual = () => (
  <Diagram
    id='manifesto-zero-person-work'
    viewBox='0 0 480 192'
    minWidth={MIN_WIDTH}
    title='Once, never twice'
    description='A new task is done by hand once, then automated into a script. Every time after, the script runs it.'
  >
    <Connector x1={112} y1={56} x2={144} y2={56} />
    <Connector x1={272} y1={56} x2={336} y2={56} label='YES' />
    <Connector
      x1={208}
      y1={96}
      x2={208}
      y2={128}
      label='NO'
      labelX={216}
      labelY={106}
    />
    <Connector
      d='M 272,152 H 392 Q 400,152 400,144 V 80'
      label='AUTOMATE'
      labelX={296}
      labelY={132}
    />
    <Node
      x={16}
      y={32}
      width={96}
      height={48}
      shape='oval'
      tone='input'
      name='Task'
    />
    <Node
      x={144}
      y={16}
      width={128}
      height={80}
      shape='diamond'
      tone='backend'
      name='Done before?'
    />
    <Node
      x={336}
      y={32}
      width={128}
      height={48}
      tone='focal'
      name='The script'
      note='runs it from now on'
    />
    <Node
      x={144}
      y={128}
      width={128}
      height={48}
      tone='store'
      name='By hand'
      note='first time only'
    />
  </Diagram>
)
