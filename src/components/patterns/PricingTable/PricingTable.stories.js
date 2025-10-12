import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'

import { createPricingTable } from './PricingTable'
import Caps from '../../elements/Caps'
import Button from '../../elements/Button'

const Checkout = () => (
  <Button
    mt={[3, 3, 3, 3]}
    data-event-location='Checkout'
    data-event-name='Buy'
  >
    <Caps fontSize={0}>Buy</Caps>
  </Button>
)

const PricingTable = createPricingTable(Checkout)

const code = `
import PricingTable from 'components/patterns/PricingTable/PricingTable'

export default () => ( <PricingTable />)
`

storiesOf('Patterns', module).add('PricingTable', () => (
  <Story name='PricingTable' code={code} style={{ zoom: 0.8 }}>
    <PricingTable />
  </Story>
))
