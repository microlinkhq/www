import React from 'react'
import { storiesOf } from '@storybook/react'
import { Dot, Box } from 'components/elements'
import { Story } from 'story'

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
      <Box mb={4} width={650}>
        <Dot.Success mr={3} />
        <Dot.Error mr={3} />
        <Dot.Warning />
      </Box>
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <DotStory />)
