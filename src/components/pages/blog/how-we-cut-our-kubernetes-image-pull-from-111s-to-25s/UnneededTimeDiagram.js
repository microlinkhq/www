import React from 'react'

import { Diagram, Nest, Node } from 'components/patterns/Diagram'

const BAR_X = 64
const BAR_WIDTH = 832
const BAR_GAP = 4
const MEMORY_REQUESTED = 0.42
const UNNEEDED_THRESHOLD = 0.5
const PIXELS_PER_MINUTE = BAR_WIDTH / 20

export const UNNEEDED_ROWS = [
  {
    label: 'BEFORE: 10M DEFAULT',
    minutes: 10,
    note: 'removed after 10 min underused'
  },
  { label: 'NOW: 20M', minutes: 20, note: 'removed after 20 min underused' }
]

const memoryBars = () => {
  const requested = BAR_WIDTH * MEMORY_REQUESTED
  const toThreshold = BAR_WIDTH * (UNNEEDED_THRESHOLD - MEMORY_REQUESTED)
  return [
    {
      name: '1 API pod',
      note: '42% of memory requested',
      x: BAR_X,
      width: requested - BAR_GAP,
      tone: 'focal'
    },
    {
      name: '',
      note: 'under 0.5',
      x: BAR_X + requested,
      width: toThreshold - BAR_GAP,
      tone: 'optional'
    },
    {
      name: 'Free',
      note: 'the node counts as unneeded',
      x: BAR_X + requested + toThreshold,
      width: BAR_WIDTH - requested - toThreshold,
      tone: 'input'
    }
  ]
}

export const UnneededTimeDiagram = () => (
  <Diagram
    id='unneeded-time'
    viewBox='0 0 960 420'
    title='A node with one API pod looks unneeded, so it now gets 20 minutes before removal'
    description='A node running one API pod requests about 42% of its memory, under the 0.5 threshold, so the autoscaler counts it as unneeded. At the 10 minute default it was removed after 10 minutes underused. It now waits 20 minutes.'
  >
    <Nest
      x={40}
      y={40}
      width={880}
      height={100}
      label='ONE NODE, MEMORY REQUESTS'
      note='UNNEEDED BELOW 0.5'
      tone='outer'
    />
    {memoryBars().map(bar => (
      <Node
        key={bar.note}
        x={bar.x}
        y={62}
        width={bar.width}
        height={56}
        tone={bar.tone}
        name={bar.name}
        note={bar.note}
      />
    ))}
    {UNNEEDED_ROWS.map((row, index) => (
      <g key={row.label}>
        <Nest
          x={40}
          y={180 + index * 120}
          width={880}
          height={100}
          label={row.label}
          tone='outer'
        />
        <Node
          x={BAR_X}
          y={202 + index * 120}
          width={row.minutes * PIXELS_PER_MINUTE}
          height={56}
          tone={index === 0 ? 'optional' : 'input'}
          name={`${row.minutes} min`}
          note={row.note}
        />
      </g>
    ))}
  </Diagram>
)
