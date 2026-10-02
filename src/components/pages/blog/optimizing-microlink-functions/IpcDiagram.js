import React from 'react'

import { Connector, Diagram, Nest, Node } from 'components/patterns/Diagram'

export const IpcDiagram = () => (
  <Diagram
    id='function-ipc'
    viewBox='0 0 960 280'
    title='How a function asks for the page'
    description='Your function runs in an isolated subprocess with no network. When it calls page.content(), it sends a request over the IPC channel to the Microlink API, which fetches the target URL through its proxies and antibot handling and sends the page back as the reply.'
  >
    <Nest
      x={40}
      y={40}
      width={300}
      height={200}
      label='ISOLATED SUBPROCESS'
      note='NO NETWORK'
      tone='outer'
    />
    <Nest
      x={500}
      y={40}
      width={300}
      height={200}
      label='MICROLINK API'
      tone='mid'
    />
    <Connector x1={300} y1={124} x2={540} y2={124} label='IPC REQUEST' />
    <Connector x1={540} y1={156} x2={300} y2={156} label='PAGE' />
    <Connector x1={760} y1={140} x2={840} y2={140} />
    <Node
      x={80}
      y={104}
      width={220}
      height={72}
      tone='focal'
      name='Your function'
      note='page.content()'
    />
    <Node
      x={540}
      y={104}
      width={220}
      height={72}
      tone='backend'
      name='Fetch the page'
      note='proxies + antibot'
    />
    <Node
      x={840}
      y={104}
      width={100}
      height={72}
      tone='input'
      name='Target URL'
    />
  </Diagram>
)
