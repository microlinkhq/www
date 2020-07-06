import React from 'react'
import { storiesOf } from '@storybook/react'
import { Card, Box, Flex } from 'components/elements'
import { Story } from 'story'

const RATIO = [0.7, 0.7, 0.7, 0.7]

const storyName = 'Card'

const code = `
import { Card } from 'components/elements'

export default () => (
  <Fragment>
    <Card />
    <Card />
    <Card />
    <Card />
  </Fragment>
)`

const CardStory = () => {
  return (
    <Story name={storyName} code={code}>
      <Flex>
        <Card ratio={RATIO} p={4} />
        <Box px={3} />
        <Card ratio={RATIO} p={4} />
        <Box px={3} />
        <Card ratio={RATIO} p={4} />
      </Flex>
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <CardStory />)
