import React from 'react'

import { Diagram, Layer } from 'components/patterns/Diagram'

export const AdblockHowVisual = () => (
  <Diagram
    id='adblock-layers'
    accent='red'
    viewBox='0 0 960 248'
    title='How Microlink adblock cleans a page'
    description='Three layers run before capture: ads are refused at the network, cookie dialogs are opted out, and leftover overlays are hidden.'
  >
    <Layer
      x={32}
      y={24}
      width={896}
      height={56}
      index='01'
      name='Network'
      note='ads refused'
      tone='focal'
    />
    <Layer
      x={32}
      y={96}
      width={896}
      height={56}
      index='02'
      name='Consent'
      note='banners dismissed'
    />
    <Layer
      x={32}
      y={168}
      width={896}
      height={56}
      index='03'
      name='Cosmetic'
      note='overlays hidden'
    />
  </Diagram>
)
