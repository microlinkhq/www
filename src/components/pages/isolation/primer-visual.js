import React from 'react'

import { Connector, Diagram, Node, Zone } from 'components/patterns/Diagram'

export const IsolationPrimerVisual = () => (
  <Diagram
    id='isolation-gate'
    accent='blue'
    viewBox='0 0 960 280'
    title='How Microlink isolates every request'
    description='The target is checked for SSRF before navigation. Private addresses are refused. Public URLs get a fresh browser that is destroyed after the call.'
  >
    <Zone x={32} y={16} width={240} height={248} label='INPUT' />
    <Zone x={720} y={16} width={208} height={248} label='OUTPUT' />
    <Connector x1={252} y1={80} x2={320} y2={80} label='CHECK' />
    <Connector x1={480} y1={80} x2={520} y2={80} label='ALLOW' />
    <Connector x1={680} y1={80} x2={740} y2={80} label='VALUE' />
    <Connector
      d='M 400,112 V 176'
      dashed
      variant='muted'
      label='DENY'
      labelX={412}
      labelY={132}
    />
    <Node
      x={52}
      y={48}
      width={200}
      height={64}
      tone='input'
      name='Target URL'
    />
    <Node
      x={320}
      y={48}
      width={160}
      height={64}
      tone='focal'
      name='SSRF gate'
    />
    <Node
      x={520}
      y={48}
      width={160}
      height={64}
      tone='backend'
      name='Browser'
    />
    <Node x={740} y={48} width={168} height={64} tone='store' name='Result' />
    <Node
      x={300}
      y={176}
      width={200}
      height={64}
      tone='optional'
      name='EFORBIDDENURL'
    />
  </Diagram>
)
