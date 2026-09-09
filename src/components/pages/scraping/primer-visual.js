import React from 'react'

import { Connector, Diagram, Node, Zone } from 'components/patterns/Diagram'

export const ScrapingPrimerVisual = () => (
  <Diagram
    id='scraping-flow'
    accent='violet'
    viewBox='0 0 960 280'
    title='How Microlink extracts structured data'
    description='You send a URL and a data schema. Microlink fetches the page, runs a browser only if the content is client-rendered, and returns typed JSON.'
  >
    <Zone x={32} y={16} width={240} height={248} label='INPUT' />
    <Zone x={704} y={68} width={224} height={144} label='OUTPUT' />
    <Connector
      d='M 252,80 H 312 Q 320,80 320,88 V 124 Q 320,132 328,132 H 400'
      label='FETCH'
      labelX={260}
      labelY={60}
    />
    <Connector
      d='M 252,200 H 312 Q 320,200 320,192 V 160 Q 320,152 328,152 H 400'
      label='RULES'
      labelX={256}
      labelY={166}
    />
    <Connector x1={560} y1={140} x2={720} y2={140} label='JSON' />
    <Node
      x={52}
      y={48}
      width={200}
      height={64}
      tone='input'
      name='Target URL'
    />
    <Node
      x={52}
      y={168}
      width={200}
      height={64}
      tone='input'
      name='Data schema'
    />
    <Node
      x={400}
      y={108}
      width={160}
      height={64}
      tone='focal'
      name='Microlink'
    />
    <Node
      x={720}
      y={108}
      width={192}
      height={64}
      tone='store'
      name='Typed JSON'
    />
  </Diagram>
)
