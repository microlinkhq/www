import React from 'react'

import { Connector, Diagram, Node } from 'components/patterns/Diagram'

export const ProxyPrimerVisual = () => (
  <Diagram
    id='proxy-path'
    viewBox='0 0 960 280'
    title='How Microlink routes a blocked request'
    description='A direct request that is blocked returns EPROXYNEEDED. proxy true retries through a residential IP and reaches the target.'
  >
    <Connector x1={208} y1={140} x2={280} y2={140} />
    <Connector
      d='M 440,140 H 520 Q 528,140 528,132 V 80 Q 528,72 536,72 H 720'
      label='NO'
      labelX={560}
      labelY={52}
    />
    <Connector
      d='M 360,180 V 200 Q 360,208 368,208 H 600'
      label='YES'
      labelX={456}
      labelY={188}
    />
    <Connector d='M 800,208 H 832 Q 840,208 840,200 V 108' />
    <Node x={48} y={108} width={160} height={64} tone='input' name='Request' />
    <Node
      x={280}
      y={100}
      width={160}
      height={80}
      shape='diamond'
      tone='backend'
      name='Blocked?'
    />
    <Node
      x={720}
      y={40}
      width={200}
      height={64}
      tone='store'
      name='Target URL'
    />
    <Node
      x={600}
      y={176}
      width={200}
      height={64}
      tone='focal'
      name='Residential'
      note='proxy: true'
    />
  </Diagram>
)
