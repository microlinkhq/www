import React from 'react'

import { Diagram, Nest, Node } from 'components/patterns/Diagram'

const PIXELS_PER_SECOND = 8.4
const BAR_X = 64
const BAR_GAP = 4
const BAR_HEIGHT = 56
const DOWNLOAD_SECONDS = 12

export const PULL_TIME_ROWS = [
  {
    label: 'GZIP LAYERS',
    total: '99S PULL',
    seconds: 99,
    codec: 'gzip',
    y: 40
  },
  {
    label: 'ZSTD LAYERS',
    total: '64S PULL',
    seconds: 64,
    codec: 'zstd level 3',
    y: 160
  }
]

const barY = rowY => rowY + (100 - BAR_HEIGHT) / 2

export const PullTimeDiagram = () => (
  <Diagram
    id='pull-time'
    viewBox='0 0 960 280'
    title='Where an image pull spends its time'
    description='The 2.09 GB image downloads in about 12 seconds. The rest of the pull is unpacking the layers and writing them to disk: a gzip pull took 99 seconds, a zstd pull of the same image took 64 seconds.'
  >
    {PULL_TIME_ROWS.map(row => {
      const downloadWidth = DOWNLOAD_SECONDS * PIXELS_PER_SECOND
      const unpackX = BAR_X + downloadWidth + BAR_GAP
      const unpackWidth =
        row.seconds * PIXELS_PER_SECOND - downloadWidth - BAR_GAP
      return (
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
          <Node
            x={BAR_X}
            y={barY(row.y)}
            width={downloadWidth}
            height={BAR_HEIGHT}
            tone='input'
            name='Download'
            note='~12s'
          />
          <Node
            x={unpackX}
            y={barY(row.y)}
            width={unpackWidth}
            height={BAR_HEIGHT}
            tone='focal'
            name='Unpack and write to disk'
            note={row.codec}
          />
        </g>
      )
    })}
  </Diagram>
)
