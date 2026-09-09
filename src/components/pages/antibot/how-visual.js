import React from 'react'

import { Connector, Diagram, Node, Zone } from 'components/patterns/Diagram'

export const AntibotHowVisual = () => (
  <Diagram
    id='antibot-classify'
    accent='pink'
    viewBox='0 0 960 280'
    title='How Microlink names an antibot challenge'
    description='The HTTP response is classified from status, headers, and body markers. Providers are checked in order and the first match wins.'
  >
    <Zone x={32} y={16} width={240} height={248} label='SIGNALS' />
    <Zone x={704} y={68} width={224} height={144} label='RESULT' />
    <Connector
      d='M 252,64 H 312 Q 320,64 320,72 V 112 Q 320,120 328,120 H 400'
      label='STATUS'
      labelX={248}
      labelY={44}
    />
    <Connector d='M 252,136 H 400' label='HEADER' labelX={280} labelY={116} />
    <Connector
      d='M 252,208 H 312 Q 320,208 320,200 V 168 Q 320,160 328,160 H 400'
      label='BODY'
      labelX={264}
      labelY={174}
    />
    <Connector x1={560} y1={140} x2={720} y2={140} label='MATCH' />
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
  </Diagram>
)
