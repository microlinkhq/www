import React from 'react'
import { Story } from 'story'
import Footer from './Footer'

const code = `
import Footer from 'components/patterns/Footer/Footer'

export default () => (
  <Footer />
)
`

export default { title: 'Patterns/Footer' }

export const Default = () => (
  <Story name='Footer' code={code} style={{ width: '100%' }}>
    <Footer />
  </Story>
)
