import React from 'react'
import { storiesOf } from '@storybook/react'
import { Story } from 'story'
import { Tooltip, Flex, Text } from 'components/elements'
import { HelpCircle } from 'react-feather'
import { colors } from 'theme'

const code = `
import { Tooltip, Flex, Text } from 'components/elements'
import { HelpCircle } from 'react-feather'

export default () => (
  <Tooltip content='Maximum number of requests you can consume until reach the quota.'>
    <Flex alignItems='center'>
      <Text mr={1} fontSize={1} fontWeight='bold'>
        Rate Limit
      </Text>
      <HelpCircle size={12} color={colors.black50} />
    </Flex>
  </Tooltip>
)
`

storiesOf('Elements', module).add('Tooltip', () => (
  <Story name='Tooltip' code={code}>
    <Tooltip content='Maximum number of requests you can consume until reach the quota.'>
      <Flex alignItems='center'>
        <Text mr={1} fontSize={1} fontWeight='bold'>
          Rate Limit
        </Text>
        <HelpCircle size={12} color={colors.black50} />
      </Flex>
    </Tooltip>
  </Story>
))
