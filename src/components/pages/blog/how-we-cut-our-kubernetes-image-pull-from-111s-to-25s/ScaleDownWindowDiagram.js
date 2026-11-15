import React from 'react'

import { Diagram, Nest, Node } from 'components/patterns/Diagram'

const PIXELS_PER_SECOND = 2.7
const BAR_X = 64
const BAR_GAP = 4
const BAR_HEIGHT = 56
const COLD_START_SECONDS = 225

export const SCALE_DOWN_ROWS = [
  {
    label: 'SCALE-DOWN WINDOW 120S',
    note: 'POD DELETED',
    y: 40,
    window: 120,
    steps: [
      {
        name: 'Starting on a new node',
        note: 'deleted at 120s, not Ready',
        seconds: 120,
        tone: 'focal'
      },
      {
        name: 'Never Ready',
        note: 'would be Ready at ~4 min',
        seconds: COLD_START_SECONDS - 120,
        tone: 'optional'
      }
    ]
  },
  {
    label: 'SCALE-DOWN WINDOW 300S',
    note: 'POD SERVES',
    y: 180,
    window: 300,
    steps: [
      {
        name: 'Starting on a new node',
        note: 'Ready at ~4 min',
        seconds: COLD_START_SECONDS,
        tone: 'input'
      },
      {
        name: 'Serving',
        note: 'inside the window',
        seconds: 300 - COLD_START_SECONDS,
        tone: 'backend'
      }
    ]
  }
]

const toBars = steps =>
  steps.reduce(
    ({ x, bars }, step) => {
      const width = step.seconds * PIXELS_PER_SECOND
      return {
        x: x + width,
        bars: [...bars, { ...step, x, width: width - BAR_GAP }]
      }
    },
    { x: BAR_X, bars: [] }
  ).bars

export const ScaleDownWindowDiagram = () => (
  <Diagram
    id='scale-down-window'
    viewBox='0 0 960 320'
    title='A scale-down window shorter than a cold start deletes the pod it bought a node for'
    description='A cold start took about 4 minutes. These bars line the window up with the start of that cold start. With a 120 second window, the HPA can scale down while the new pod is still starting, and a ReplicaSet deletes pods that are not Ready first. With a 300 second window, that same pod is Ready before the window ends.'
  >
    {SCALE_DOWN_ROWS.map(row => (
      <g key={row.label}>
        <Nest
          x={40}
          y={row.y}
          width={880}
          height={100}
          label={row.label}
          note={row.note}
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
            note={bar.note}
          />
        ))}
      </g>
    ))}
  </Diagram>
)
