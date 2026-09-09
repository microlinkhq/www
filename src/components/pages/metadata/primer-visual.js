import React from 'react'

import { Connector, Diagram, Node, Zone } from 'components/patterns/Diagram'

export const MetadataPrimerVisual = () => (
  <Diagram
    id='metadata-merge'
    accent='indigo'
    viewBox='0 0 960 280'
    title='How Microlink unifies website metadata'
    description='Open Graph, JSON-LD, and raw HTML tags are merged into one JSON response. Conflicting sources resolve to a single title, image, and description.'
  >
    <Zone x={32} y={16} width={240} height={248} label='SOURCES' />
    <Zone x={704} y={68} width={224} height={144} label='OUTPUT' />
    <Connector
      d='M 252,64 H 312 Q 320,64 320,72 V 112 Q 320,120 328,120 H 400'
      label='OG'
      labelX={272}
      labelY={44}
    />
    <Connector d='M 252,136 H 400' label='JSON-LD' labelX={280} labelY={116} />
    <Connector
      d='M 252,208 H 312 Q 320,208 320,200 V 168 Q 320,160 328,160 H 400'
      label='HTML'
      labelX={264}
      labelY={174}
    />
    <Connector x1={560} y1={140} x2={720} y2={140} label='MERGE' />
    <Node
      x={52}
      y={36}
      width={200}
      height={56}
      tone='input'
      name='Open Graph'
    />
    <Node x={52} y={108} width={200} height={56} tone='input' name='JSON-LD' />
    <Node
      x={52}
      y={180}
      width={200}
      height={56}
      tone='input'
      name='HTML tags'
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
      name='Unified JSON'
    />
  </Diagram>
)
