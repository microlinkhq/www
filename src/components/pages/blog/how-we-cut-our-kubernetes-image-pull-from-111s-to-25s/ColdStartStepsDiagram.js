import React from 'react'

import { Diagram, Nest, Node } from 'components/patterns/Diagram'

const LABEL_X = 64
const LABEL_WIDTH = 320
const BAR_X = 404
const BAR_AREA = 492
const ROW_HEIGHT = 44
const ROW_GAP = 8
const FIRST_ROW_Y = 64

export const COLD_START_STEPS = [
  { name: 'Autoscaler notices the pod', seconds: 16 },
  { name: 'VM boots and joins', seconds: 41 },
  { name: 'Node network and setup', seconds: 28 },
  { name: 'Pod scheduled', seconds: 7 },
  { name: 'Image pull', seconds: 25, focal: true },
  { name: 'Container ready', seconds: 5 }
]

export const COLD_START_TOTAL_SECONDS = COLD_START_STEPS.reduce(
  (total, step) => total + step.seconds,
  0
)

const PIXELS_PER_SECOND = BAR_AREA / COLD_START_TOTAL_SECONDS

const toRows = () =>
  COLD_START_STEPS.reduce(
    ({ elapsed, rows }, step, index) => ({
      elapsed: elapsed + step.seconds,
      rows: [
        ...rows,
        {
          ...step,
          y: FIRST_ROW_Y + index * (ROW_HEIGHT + ROW_GAP),
          x: BAR_X + elapsed * PIXELS_PER_SECOND,
          width: step.seconds * PIXELS_PER_SECOND
        }
      ]
    }),
    { elapsed: 0, rows: [] }
  ).rows

export const ColdStartStepsDiagram = () => (
  <Diagram
    id='cold-start-steps'
    viewBox='0 0 960 400'
    title='Where the two minutes of a cold start go'
    description={`A pod on a new node waits ${COLD_START_TOTAL_SECONDS} seconds in ${
      COLD_START_STEPS.length
    } steps: ${COLD_START_STEPS.map(
      step => `${step.name.toLowerCase()} ${step.seconds} seconds`
    ).join(', ')}.`}
  >
    <Nest
      x={40}
      y={40}
      width={880}
      height={340}
      label='COLD START'
      note={`${COLD_START_TOTAL_SECONDS}S, ABOUT 2 MIN`}
      tone='outer'
    />
    {toRows().map(row => (
      <g key={row.name}>
        <Node
          x={LABEL_X}
          y={row.y}
          width={LABEL_WIDTH}
          height={ROW_HEIGHT}
          tone={row.focal ? 'focal' : 'backend'}
          name={row.name}
        />
        <Node
          x={row.x}
          y={row.y}
          width={row.width}
          height={ROW_HEIGHT}
          tone={row.focal ? 'focal' : 'input'}
          name={`${row.seconds}s`}
        />
      </g>
    ))}
  </Diagram>
)
