import React from 'react'

import { Connector, Diagram, Node } from 'components/patterns/Diagram'

export const LogoPrimerVisual = () => (
  <Diagram
    id='logo-walk'
    accent='yellow'
    viewBox='0 0 960 200'
    title='How Microlink finds a logo'
    description='Markup is walked first. If nothing matches, the BIMI record in DNS is checked. The favicon is the last resort so coverage never drops to zero.'
  >
    <Connector x1={184} y1={100} x2={216} y2={100} label='WALK' />
    <Connector x1={360} y1={100} x2={392} y2={100} label='FIRST' />
    <Connector x1={536} y1={100} x2={568} y2={100} label='EMPTY' />
    <Connector x1={712} y1={100} x2={744} y2={100} label='FALLBACK' />
    <Node x={40} y={68} width={144} height={64} tone='input' name='URL' />
    <Node x={216} y={68} width={144} height={64} tone='focal' name='Markup' />
    <Node x={392} y={68} width={144} height={64} tone='backend' name='BIMI' />
    <Node
      x={568}
      y={68}
      width={144}
      height={64}
      tone='backend'
      name='Favicon'
    />
    <Node x={744} y={68} width={176} height={64} tone='store' name='Logo' />
  </Diagram>
)
