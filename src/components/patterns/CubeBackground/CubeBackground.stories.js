import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'

import CubeBackground from './CubeBackground'

storiesOf('Patterns', module).add('CubeBackground', () => (
  <Story name='CubeBackground' height='100vh' width='100%'>
    <CubeBackground bg='secondary' />
  </Story>
))
