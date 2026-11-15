import React from 'react'

import { Diagram, Nest, Node } from 'components/patterns/Diagram'

const PIXELS_PER_SECOND = 3.6
const BAR_X = 64
const BAR_GAP = 4
const BAR_HEIGHT = 56

export const COLD_START_ROWS = [
  {
    label: 'BEFORE: GZIP',
    total: 'ABOUT 4 MIN',
    y: 40,
    steps: [
      { name: 'Waiting for the node', seconds: 110, tone: 'input' },
      { name: 'Image pull', seconds: 111, tone: 'focal' }
    ]
  },
  {
    label: 'AFTER: ZSTD',
    total: 'ABOUT 2 MIN',
    y: 180,
    steps: [
      { name: 'Waiting for the node', seconds: 92, tone: 'input' },
      { name: 'Image pull', seconds: 25, tone: 'focal' }
    ]
  }
]

const toBars = steps =>
  steps.reduce(
    ({ x, bars }, step) => {
      const width = step.seconds * PIXELS_PER_SECOND
      return {
        x: x + width + BAR_GAP,
        bars: [...bars, { ...step, x, width }]
      }
    },
    { x: BAR_X, bars: [] }
  ).bars

export const ColdStartDiagram = () => (
  <Diagram
    id='cold-start'
    viewBox='0 0 960 300'
    title='A pod on a new node, from pending to Ready'
    description='Before, a pod on a new node waited 110 seconds for the node and 111 seconds for a gzip image pull, about 4 minutes. After, it waits 92 seconds for the node and 25 seconds for a zstd image pull, about 2 minutes.'
  >
    {COLD_START_ROWS.map(row => (
      <g key={row.label}>
        <Nest
          x={40}
          y={row.y}
          width={880}
          height={100}
          label={row.label}
          note={row.total}
          tone='outer'
        />
        {toBars(row.steps).map(bar => (
          <Node
            key={bar.name}
            x={bar.x}
            y={row.y + (100 - BAR_HEIGHT) / 2}
            width={bar.width}
            height={BAR_HEIGHT}
            tone={bar.tone}
            name={bar.name}
            note={`${bar.seconds}s`}
          />
        ))}
      </g>
    ))}
  </Diagram>
)
