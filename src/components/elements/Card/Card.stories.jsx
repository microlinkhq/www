import Card from './Card'
import Box from '../Box'
import Flex from '../Flex'
import { Story } from 'story'
import { theme } from 'theme'
import React from 'react'

const RATIO = [0.7, 0.7, 0.7, 0.7]

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

export default { title: 'Elements/Card' }

export const Default = () => (
  <Story name='Card' code={code}>
    <Flex>
      <Card ratio={RATIO} css={theme({ p: 4 })} />
      <Box css={theme({ px: 3 })} />
      <Card ratio={RATIO} css={theme({ p: 4 })} />
      <Box css={theme({ px: 3 })} />
      <Card ratio={RATIO} css={theme({ p: 4 })} />
    </Flex>
  </Story>
)
