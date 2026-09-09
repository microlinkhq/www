import React from 'react'

import { Connector, Diagram, Node, Zone } from 'components/patterns/Diagram'

export const SearchPrimerVisual = () => (
  <Diagram
    id='search-steps'
    accent='red'
    viewBox='0 0 960 200'
    title='How Microlink Search stays lightweight'
    description='A query returns structured results first. Deeper markdown extraction runs only on the URLs you choose to fetch.'
  >
    <Zone x={32} y={32} width={224} height={136} label='QUERY' />
    <Zone x={704} y={32} width={224} height={136} label='ENRICH' />
    <Connector x1={236} y1={100} x2={380} y2={100} label='SEARCH' />
    <Connector x1={580} y1={100} x2={720} y2={100} dashed label='FETCH' />
    <Node x={52} y={68} width={184} height={64} tone='input' name='Query' />
    <Node x={380} y={68} width={200} height={64} tone='focal' name='Results' />
    <Node
      x={720}
      y={68}
      width={192}
      height={64}
      tone='optional'
      name='Markdown'
      note='only if needed'
    />
  </Diagram>
)
