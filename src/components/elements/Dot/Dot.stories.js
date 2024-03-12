import React from 'react'
import { storiesOf } from '@storybook/react'
import { Dot, Box } from 'components/elements'
import { Story } from 'story'
import { theme } from 'theme'

const storyName = 'Dot'

const code = `
import { Dot } from 'components/elements'

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

storiesOf('Elements', module).add(storyName, () => <DotStory />)
