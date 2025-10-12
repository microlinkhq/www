import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import { Story } from 'story'
import { theme } from 'theme'

import Caps from '../Caps'
import Choose from '../Choose'
import Button from '../Button'
import Notification from './Notification'
import Box from '../Box'
import Flex from '../Flex'

const storyName = 'Notification'

const code = `
import Notification from './Notification'

export default () => (
  <Fragment>
    <Notification.Success children='payment processed' />
    <Notification.Error children='oh no!' />
    <Notification.Warning children='This action can be consecuences' />
  </Fragment>
)`

const NotificationPreview = ({ type }) => {
  return (
    <Choose>
      <Choose.When condition={type === 'success'}>
        <Notification.Success>
          Payment updated! We sent you an email.
        </Notification.Success>
      </Choose.When>
      <Choose.When condition={type === 'warning'}>
        <Notification.Warning>
          This action cannot be undone.
        </Notification.Warning>
      </Choose.When>
      <Choose.When condition={type === 'error'}>
        <Notification.Error>Payment not updated.</Notification.Error>
      </Choose.When>
    </Choose>
  )
}

const NotificationStory = () => {
  const [notificationType, setNotificationType] = useState('')

  const triggerNotification = type => () => {
    setNotificationType('')
    queueMicrotask(() => setNotificationType(type))
  }

  return (
    <Story name={storyName} code={code}>
      <Flex css={theme({ mb: 4, width: 650 })}>
        <Button onClick={triggerNotification('success')}>
          <Caps css={theme({ fontSize: 0 })}>Success</Caps>
        </Button>
        <Box css={theme({ px: 1 })} />
        <Button onClick={triggerNotification('warning')}>
          <Caps css={theme({ fontSize: 0 })}>Warning</Caps>
        </Button>
        <Box css={theme({ px: 1 })} />
        <Button onClick={triggerNotification('error')}>
          <Caps css={theme({ fontSize: 0 })}>Error</Caps>
        </Button>
        <NotificationPreview type={notificationType} />
      </Flex>
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <NotificationStory />)
