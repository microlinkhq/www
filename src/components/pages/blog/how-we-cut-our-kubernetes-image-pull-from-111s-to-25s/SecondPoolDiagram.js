import React from 'react'

import { Connector, Diagram, Nest, Node } from 'components/patterns/Diagram'

export const NODE_POOLS = [
  {
    label: 'API-PRIMARY',
    priority: 'PRIORITY 100',
    name: 'Tried first',
    note: 'up to 60 nodes',
    tone: 'focal',
    y: 40
  },
  {
    label: 'API-SECONDARY',
    priority: 'PRIORITY 10',
    name: 'Only when the primary cannot grow',
    note: 'different machine type, same price, up to 60 nodes',
    tone: 'input',
    y: 200
  }
]

export const SecondPoolDiagram = () => (
  <Diagram
    id='second-pool'
    viewBox='0 0 960 340'
    title='A scale-up goes to the primary pool first and falls back to the secondary pool'
    description='The autoscaler sends every scale-up to api-primary, priority 100. Only when the cloud provider cannot add a node there does the scale-up go to api-secondary, priority 10, on a different machine type with the same price. Each pool grows to 60 nodes, so either one holds the whole fleet.'
  >
    <Node
      x={40}
      y={146}
      width={220}
      height={72}
      tone='backend'
      name='Autoscaler'
      note='a pod needs a new node'
    />
    <Connector x1={260} y1={170} x2={440} y2={100} label='FIRST' />
    <Connector
      d='M 260 194 L 440 260'
      dashed
      label='INSUFFICIENT CAPACITY'
      labelX={276}
      labelY={238}
    />
    {NODE_POOLS.map(pool => (
      <g key={pool.label}>
        <Nest
          x={440}
          y={pool.y}
          width={480}
          height={120}
          label={pool.label}
          note={pool.priority}
          tone='outer'
        />
        <Node
          x={464}
          y={pool.y + 28}
          width={432}
          height={72}
          tone={pool.tone}
          name={pool.name}
          note={pool.note}
        />
      </g>
    ))}
  </Diagram>
)
