import { Box, Flex, Text } from 'components/elements'
import { ProBadge } from 'components/markdown'
import { storiesOf } from '@storybook/react'
import { theme } from 'theme'
import { Story } from 'story'
import React from 'react'

const code = `
import { Tooltip, Flex, Text } from 'components/elements'
import { HelpCircle } from 'react-feather'

export default () => (
  <Tooltip
    display='inline'
    content={
      <Tooltip.Content tabIndex='0'>
        You have to buy{' '}
        <Link display='inline-block' href='https://microlink.io#pricing'>
          pro
        </Link>{' '}
        plan to use this feature.
      </Tooltip.Content>
    }
    {...props}
  >
    <Badge>PRO</Badge>
  </Tooltip>
)
`

const tooltipsOpts = {
  showOnCreate: true,
  trigger: 'manual'
}

storiesOf('Elements', module).add('Tooltip', () => (
  <Story name='Tooltip' code={code}>
    <Box css={theme({ pl: 5 })}>
      <Flex css={theme({ pt: 5 })}>
        <Text>
          This is a <ProBadge tooltipsOpts={tooltipsOpts} /> feature.
        </Text>
      </Flex>
    </Box>
  </Story>
))
