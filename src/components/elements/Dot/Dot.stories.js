import React from 'react'
import Dot from './Dot'
import Box from '../Box'
import { Story } from 'story'
import { theme } from 'theme'

const storyName = 'Dot'

const code = `
import Dot from './Dot'

export default () => (
  <Fragment>
    <Dot.Success />
    <Dot.Error />
    <Dot.Warning />
  </Fragment>
)`

const DotStory = () => {
  return (
    <Story name={storyName} code={code}>
      <Box css={theme({ mb: 4, width: 650 })}>
        <Dot.Success css={theme({ mr: 3 })} />
        <Dot.Error css={theme({ mr: 3 })} />
        <Dot.Warning />
      </Box>
    </Story>
  )
}

export default { title: 'Elements/Dot' }

export const Default = () => <DotStory />
