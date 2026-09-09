import React from 'react'

import { Connector, Diagram, Node } from 'components/patterns/Diagram'

export const AntibotHowVisual = () => (
  <Diagram
    id='antibot-classify'
    viewBox='0 0 960 280'
    title='How Microlink names an antibot challenge'
    description='The HTTP response is classified from status, headers, and body markers. Providers are checked in order and the first match wins.'
  >
    <Node
      x={52}
      y={36}
      width={200}
      height={56}
      tone='input'
      name='HTTP status'
    />
    <Node x={52} y={108} width={200} height={56} tone='input' name='Headers' />
    <Node x={52} y={180} width={200} height={56} tone='input' name='Body' />
    <Node
      x={400}
      y={108}
      width={160}
      height={64}
      tone='focal'
      name='First match'
    />
    <Node
      x={720}
      y={108}
      width={192}
      height={64}
      tone='store'
      name='Provider'
    />
    <Connector d='M 252,64 H 312 Q 320,64 320,72 V 116 Q 320,124 328,124 H 408' />
    <Connector x1={252} y1={136} x2={408} y2={136} />
    <Connector d='M 252,208 H 312 Q 320,208 320,200 V 164 Q 320,156 328,156 H 408' />
    <Connector x1={560} y1={140} x2={728} y2={140} />
  </Diagram>
)
