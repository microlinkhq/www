import React from 'react'

import { Connector, Diagram, Node } from 'components/patterns/Diagram'

export const AutomationPrimerVisual = () => (
  <Diagram
    id='automation-steps'
    accent='green'
    viewBox='0 0 960 200'
    title='How Microlink shapes a page before capture'
    description='Device, wait, and click run as declarative steps on the same request. The page is shaped first, then captured.'
  >
    <Connector x1={184} y1={100} x2={216} y2={100} />
    <Connector x1={360} y1={100} x2={392} y2={100} label='SETTLE' />
    <Connector x1={536} y1={100} x2={568} y2={100} />
    <Connector x1={712} y1={100} x2={744} y2={100} label='READ' />
    <Node x={40} y={68} width={144} height={64} tone='input' name='URL' />
    <Node x={216} y={68} width={144} height={64} tone='backend' name='Device' />
    <Node x={392} y={68} width={144} height={64} tone='backend' name='Wait' />
    <Node x={568} y={68} width={144} height={64} tone='backend' name='Click' />
    <Node x={744} y={68} width={176} height={64} tone='focal' name='Capture' />
  </Diagram>
)
