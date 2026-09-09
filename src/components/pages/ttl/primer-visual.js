import React from 'react'

import { Connector, Diagram, Node } from 'components/patterns/Diagram'

export const TtlPrimerVisual = () => (
  <Diagram
    id='ttl-cache'
    viewBox='0 0 960 280'
    title='How Microlink caching serves a request'
    description='A request hits the cache first. A hit is free and instant. A miss boots a browser and stores a fresh result.'
  >
    <Connector x1={480} y1={64} x2={480} y2={88} />
    <Connector
      d='M 400,128 H 188 Q 180,128 180,136 V 192 Q 180,200 188,200'
      label='HIT'
      labelX={248}
      labelY={108}
    />
    <Connector
      d='M 560,128 H 772 Q 780,128 780,136 V 192 Q 780,200 772,200'
      label='MISS'
      labelX={656}
      labelY={108}
    />
    <Node
      x={400}
      y={16}
      width={160}
      height={48}
      shape='oval'
      tone='input'
      name='Request'
    />
    <Node
      x={400}
      y={88}
      width={160}
      height={80}
      shape='diamond'
      tone='backend'
      name='Cached?'
    />
    <Node
      x={80}
      y={200}
      width={200}
      height={56}
      tone='focal'
      name='Serve cached'
      note='free · instant'
    />
    <Node
      x={680}
      y={200}
      width={200}
      height={56}
      tone='store'
      name='Boot browser'
      note='fresh render'
    />
  </Diagram>
)
