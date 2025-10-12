import Card from './Card'
import Box from '../Box'
import Flex from '../Flex'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import { theme } from 'theme'
import React from 'react'

const RATIO = [0.7, 0.7, 0.7, 0.7]

const storyName = 'Card'

const code = `
import Card from 'components/elements/Card/Card'
import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'

export default () => (
  <Flex>
    <Card ratio={RATIO} css={theme({ p: 4 })} />
    <Box css={theme({ px: 3 })} />
    <Card ratio={RATIO} css={theme({ p: 4 })} />
    <Box css={theme({ px: 3 })} />
    <Card ratio={RATIO} css={theme({ p: 4 })} />
  </Flex>
)`

const CardStory = () => {
  return (
    <Story name={storyName} code={code}>
      <Flex>
        <Card ratio={RATIO} css={theme({ p: 4 })} />
        <Box css={theme({ px: 3 })} />
        <Card ratio={RATIO} css={theme({ p: 4 })} />
        <Box css={theme({ px: 3 })} />
        <Card ratio={RATIO} css={theme({ p: 4 })} />
      </Flex>
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <CardStory />)
