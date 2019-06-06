import React from 'react'
import { storiesOf } from '@storybook/react'
import { Notification, Box } from 'components/elements'
import { Story } from 'story'

const storyName = 'Notification'

const code = `
import { Notification } from 'components/elements'

export default () => (
  <Notification.Success children='All is fine! Have a good day.' />
  <Notification.Danger children='Ops, something is wrong.' />
)`

storiesOf('Elements', module).add(storyName, () => (
  <Story name={storyName} code={code}>
    <Box mb={4} width={650}>
      <Notification.Success children='All is fine! Have a good day.' />
    </Box>
  </Story>
))
