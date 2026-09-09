import React from 'react'

import { ProductPrimer } from 'components/patterns/ProductStory'

import { ACCENT } from './shared'
import { MetadataPrimerVisual } from './primer-visual'

export const MetadataPrimer = () => (
  <ProductPrimer
    accent={ACCENT}
    title='Every tag source,'
    titleAccent='one JSON shape.'
    caption='Open Graph, JSON-LD and raw HTML are merged into one predictable response. You stop picking a source and start reading a field.'
    visual={<MetadataPrimerVisual />}
  />
)
