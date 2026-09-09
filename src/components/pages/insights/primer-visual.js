import React from 'react'

import { Connector, Diagram, Node, Zone } from 'components/patterns/Diagram'

export const InsightsPrimerVisual = () => (
  <Diagram
    id='insights-flow'
    accent='grape'
    viewBox='0 0 960 280'
    title='How Microlink Insights audits a URL'
    description='An isolated Chrome instance opens the page, then Lighthouse and Wappalyzer run in parallel and return one JSON report.'
  >
    <Zone x={32} y={68} width={224} height={144} label='INPUT' />
    <Zone x={704} y={68} width={224} height={144} label='OUTPUT' />
    <Connector x1={236} y1={140} x2={280} y2={140} label='BOOT' />
    <Connector
      d='M 460,124 H 520 Q 528,124 528,116 V 80 Q 528,72 536,72 H 560'
      label='AUDIT'
      labelX={468}
      labelY={52}
    />
    <Connector
      d='M 460,156 H 520 Q 528,156 528,164 V 200 Q 528,208 536,208 H 560'
      label='STACK'
      labelX={468}
      labelY={176}
    />
    <Connector d='M 720,72 H 768 Q 776,72 776,80 V 116 Q 776,124 784,124 H 800' />
    <Connector d='M 720,208 H 768 Q 776,208 776,200 V 164 Q 776,156 784,156 H 800' />
    <Node x={52} y={108} width={184} height={64} tone='input' name='URL' />
    <Node
      x={280}
      y={108}
      width={180}
      height={64}
      tone='focal'
      name='Isolated Chrome'
    />
    <Node
      x={560}
      y={40}
      width={160}
      height={64}
      tone='backend'
      name='Lighthouse'
    />
    <Node
      x={560}
      y={176}
      width={160}
      height={64}
      tone='backend'
      name='Wappalyzer'
    />
    <Node x={800} y={108} width={112} height={64} tone='store' name='JSON' />
  </Diagram>
)
