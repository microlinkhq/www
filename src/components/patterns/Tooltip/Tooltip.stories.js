import Box from 'components/elements/Box'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { ProBadge } from 'components/markdown'
import { storiesOf } from '@storybook/react'
import { theme } from 'theme'
import { Story } from 'story'
import React from 'react'

const code = `
import Tooltip from '../Tooltip'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'

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
