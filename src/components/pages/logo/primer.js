import React from 'react'

import { ProductPrimer } from 'components/patterns/ProductStory'

import { ACCENT } from './shared'
import { LogoPrimerVisual } from './primer-visual'

export const LogoPrimer = () => (
  <ProductPrimer
    accent={ACCENT}
    title='Markup, then DNS,'
    titleAccent='then the favicon.'
    caption='Sources are walked in order. The first match wins. When markup and DNS are empty, the favicon keeps coverage from dropping to zero.'
    visual={<LogoPrimerVisual />}
  />
)
