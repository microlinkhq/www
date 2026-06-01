import React from 'react'
import { Story } from 'story'

import CubeBackground from './CubeBackground'

export default { title: 'Patterns/CubeBackground' }

export const Default = () => (
  <Story name='CubeBackground' height='100vh' width='100%'>
    <CubeBackground bg='secondary' />
  </Story>
)
