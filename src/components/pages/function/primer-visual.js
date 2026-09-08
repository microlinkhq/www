import React from 'react'

import { Connector, Diagram, Node, Zone } from 'components/patterns/Diagram'

import { ACCENT_NAME } from './product-shared'

export const FunctionPrimerVisual = () => (
  <Diagram
    id='function-flow'
    accent={ACCENT_NAME}
    viewBox='0 0 960 280'
    title='How Microlink Function runs'
    description='You send function code and a target URL. Microlink runs that code on the page and returns whatever it produced. A browser starts only if you need the page.'
  >
    <Zone x={32} y={16} width={240} height={248} label='INPUT' />
    <Zone x={704} y={68} width={232} height={160} label='OUTPUT' />
    <Connector
      d='M 252,84 H 312 Q 320,84 320,92 V 124 Q 320,132 328,132 H 400'
      label='EVAL'
      labelX={260}
      labelY={64}
    />
    <Connector
      d='M 252,200 H 312 Q 320,200 320,192 V 160 Q 320,152 328,152 H 400'
      label='FETCH'
      labelX={256}
      labelY={166}
    />
    <Connector x1={560} y1={142} x2={720} y2={142} label='VALUE' />
    <Node
      x={52}
      y={52}
      width={200}
      height={64}
      tone='input'
      name='Function code'
    />
    <Node
      x={52}
      y={168}
      width={200}
      height={64}
      tone='input'
      name='Target URL'
    />
    <Node
      x={400}
      y={110}
      width={160}
      height={64}
      tone='focal'
      name='Microlink'
    />
    <Node x={720} y={110} width={200} height={64} tone='store' name='Result' />
  </Diagram>
)
