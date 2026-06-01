import React from 'react'
import { theme } from 'theme'
import { Story } from 'story'

import CubeBackground from './CubeBackground'

export default { title: 'Patterns/CubeBackground' }

export const Default = () => (
  <Story name='CubeBackground' css={theme({ height: '100vh', width: '100%' })}>
    <CubeBackground bg='secondary' />
  </Story>
)
