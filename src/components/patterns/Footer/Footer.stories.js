import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import Footer from './Footer'

const code = `
import Footer from 'components/patterns/Footer/Footer'

export default () => (
  <Footer />
)
`

storiesOf('Patterns', module).add('Footer', () => (
  <Story name='Footer' code={code} style={{ width: '100%' }}>
    <Footer />
  </Story>
))
