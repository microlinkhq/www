import React from 'react'

import { Connector, Diagram, Node } from 'components/patterns/Diagram'

export const IsolationPrimerVisual = () => (
  <Diagram
    id='isolation-gate'
    viewBox='0 0 960 256'
    title='How Microlink isolates every request'
    description='The target is checked for SSRF before navigation. Private addresses are refused. Public URLs get a fresh browser that is destroyed after the call.'
  >
    <Connector x1={252} y1={72} x2={320} y2={72} />
    <Connector x1={480} y1={72} x2={520} y2={72} />
    <Connector x1={680} y1={72} x2={740} y2={72} />
    <Connector d='M 400,104 V 168' dashed variant='muted' />
    <Node
      x={52}
      y={40}
      width={200}
      height={64}
      tone='input'
      name='Target URL'
    />
    <Node
      x={320}
      y={40}
      width={160}
      height={64}
      tone='focal'
      name='SSRF gate'
    />
    <Node
      x={520}
      y={40}
      width={160}
      height={64}
      tone='backend'
      name='Browser'
    />
    <Node x={740} y={40} width={168} height={64} tone='store' name='Result' />
    <Node
      x={300}
      y={168}
      width={200}
      height={64}
      tone='optional'
      name='EFORBIDDENURL'
    />
  </Diagram>
)
