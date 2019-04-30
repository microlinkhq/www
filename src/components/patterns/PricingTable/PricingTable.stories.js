import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import PricingTable from './'

const code = `
import { PricingTable } from 'components/patterns'

export default () => (
  <PricingTable />
)
`

storiesOf('Patterns', module).add('PricingTable', () => (
  <Story name='PricingTable' code={code}>
    <PricingTable />
  </Story>
))
