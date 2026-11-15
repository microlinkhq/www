import React from 'react'

import { Diagram, Nest, Node } from 'components/patterns/Diagram'

export const THREADPOOL_TASKS = [
  {
    name: 'Compress a cache value',
    note: 'brotli, before the response is sent',
    tone: 'focal'
  },
  {
    name: 'Read a cache value',
    note: 'decompress on a cache hit',
    tone: 'input'
  },
  { name: 'DNS lookup', note: 'resolve the target URL', tone: 'input' },
  { name: 'File read', note: 'fs work from any request', tone: 'input' }
]

export const ThreadpoolDiagram = () => (
  <Diagram
    id='threadpool'
    viewBox='0 0 960 340'
    title='Every pod shares 4 libuv threads between compression, cache reads, DNS lookups and file reads'
    description='Each pod has a libuv threadpool of 4 threads. Compressing a cache value, reading a cache value, DNS lookups and file reads all take turns on the same 4 threads, so the time one compression takes is time the others wait.'
  >
    <Nest
      x={40}
      y={40}
      width={880}
      height={280}
      label='LIBUV THREADPOOL'
      note='4 THREADS PER POD'
      tone='mid'
    />
    {THREADPOOL_TASKS.map((task, index) => (
      <Node
        key={task.name}
        x={64}
        y={64 + index * 64}
        width={832}
        height={52}
        tone={task.tone}
        name={task.name}
        note={task.note}
      />
    ))}
  </Diagram>
)
