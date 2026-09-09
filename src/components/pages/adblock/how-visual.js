import React from 'react'

import { Diagram, Nest } from 'components/patterns/Diagram'

export const AdblockHowVisual = () => (
  <Diagram
    id='adblock-nest'
    viewBox='0 0 960 320'
    title='How Microlink adblock cleans a page'
    description='Three layers run before capture: ads are refused at the network, cookie dialogs are opted out, and leftover overlays are hidden.'
  >
    <Nest
      x={32}
      y={24}
      width={896}
      height={280}
      label='NETWORK'
      note='ads refused'
    />
    <Nest
      x={64}
      y={60}
      width={832}
      height={208}
      label='CONSENT'
      note='banners dismissed'
      tone='mid'
    />
    <Nest
      x={96}
      y={96}
      width={768}
      height={136}
      label='COSMETIC'
      note='overlays hidden'
      name='Target URL'
      caption='no ads, no banners, no overlays'
      tone='focal'
    />
  </Diagram>
)
