import React from 'react'

import { Diagram, Nest, Node } from 'components/patterns/Diagram'

export const LayerCopyDiagram = () => (
  <Diagram
    id='layer-copy'
    viewBox='0 0 960 380'
    title='Why one release shipped Chrome and node_modules twice'
    description='Before, one layer ran pnpm install and kept the 422MB pnpm store and 175MB of caches, and a later layer moved Chrome and chowned the app, which stored the same files again as a 399MB layer of copies. After, a single RUN installs, moves, chowns and removes the store, so every file is stored once.'
  >
    <Nest
      x={40}
      y={40}
      width={500}
      height={320}
      label='BEFORE: TWO LAYERS'
      tone='outer'
    />
    <Nest
      x={64}
      y={72}
      width={452}
      height={120}
      label='RUN PNPM INSTALL'
      tone='mid'
    />
    <Node
      x={84}
      y={100}
      width={168}
      height={72}
      tone='input'
      name='Chrome + node_modules'
      note='installed'
    />
    <Node
      x={264}
      y={100}
      width={120}
      height={72}
      tone='store'
      name='pnpm store'
      note='422MB, kept'
    />
    <Node
      x={396}
      y={100}
      width={100}
      height={72}
      tone='store'
      name='Caches'
      note='175MB, kept'
    />
    <Nest
      x={64}
      y={224}
      width={452}
      height={112}
      label='RUN MV + CHOWN -R'
      tone='mid'
    />
    <Node
      x={84}
      y={248}
      width={412}
      height={72}
      tone='focal'
      name='Chrome and node_modules again'
      note='399MB of copies'
    />
    <Nest
      x={580}
      y={40}
      width={340}
      height={320}
      label='AFTER: ONE LAYER'
      tone='outer'
    />
    <Nest
      x={604}
      y={72}
      width={292}
      height={120}
      label='RUN INSTALL + MV + CHOWN'
      tone='mid'
    />
    <Node
      x={624}
      y={100}
      width={252}
      height={72}
      tone='input'
      name='Chrome + node_modules'
      note='stored once, pnpm store removed'
    />
  </Diagram>
)
