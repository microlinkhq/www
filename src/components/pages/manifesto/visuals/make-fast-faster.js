import React from 'react'

import { Connector, Diagram, Node } from 'components/patterns/Diagram'

import { MIN_WIDTH } from './canvas'

export const MakeFastFasterVisual = () => (
  <Diagram
    id='manifesto-make-fast-faster'
    viewBox='0 0 480 152'
    minWidth={MIN_WIDTH}
    title='Make fast faster'
    description='Before, work waits on a handoff and an approval before it ships. After those steps are removed, the same work goes straight from build to ship.'
  >
    <Connector x1={112} y1={36} x2={132} y2={36} />
    <Connector x1={228} y1={36} x2={248} y2={36} />
    <Connector x1={344} y1={36} x2={364} y2={36} />
    <Connector x1={112} y1={116} x2={364} y2={116} label='STEPS REMOVED' />
    <Node x={16} y={16} width={96} height={40} tone='store' name='Build' />
    <Node
      x={132}
      y={16}
      width={96}
      height={40}
      tone='optional'
      name='Handoff'
    />
    <Node
      x={248}
      y={16}
      width={96}
      height={40}
      tone='optional'
      name='Approval'
    />
    <Node x={364} y={16} width={96} height={40} tone='store' name='Ship' />
    <Node x={16} y={96} width={96} height={40} tone='store' name='Build' />
    <Node
      x={364}
      y={96}
      width={96}
      height={40}
      tone='focal'
      name='Ship'
      note='same work, sooner'
    />
  </Diagram>
)
