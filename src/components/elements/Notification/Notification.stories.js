import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import {
  ButtonPrimary,
  ButtonOutline,
  Notification,
  Box
} from 'components/elements'
import { Choose } from 'react-extras'
import { Story } from 'story'

const storyName = 'Notification'

const code = `
import { Notification } from 'components/elements'

export default () => (
  <Notification.Success children='All is fine! Have a good day.' />
  <Notification.Error children='Ops, something is wrong.' />
)`

const NotificationPreview = ({ type }) => {
  return (
    <Choose>
      <Choose.When condition={type === 'success'}>
        <Notification.Success children='payment processed' />
      </Choose.When>
      <Choose.When condition={type === 'info'}>
        <Notification.Info children='all the things are fine' />
      </Choose.When>
      <Choose.When condition={type === 'warning'}>
        <Notification.Warning children='This action can be consecuences' />
      </Choose.When>
      <Choose.When condition={type === 'error'}>
        <Notification.Error children='oh no!' />
      </Choose.When>
      <Choose.When condition={type === 'error'}>
        <Notification.Error children='oh no!' />
      </Choose.When>
    </Choose>
  )
}

const NotificationStory = () => {
  const [notificationType, setNotificationType] = useState('')

  return (
    <Story name={storyName} code={code}>
      <Box mb={4} width={650}>
        <ButtonOutline onClick={() => setNotificationType('success')}>
          Success
        </ButtonOutline>
        <ButtonOutline onClick={() => setNotificationType('error')} ml={3}>
          Error
        </ButtonOutline>
        <ButtonOutline onClick={() => setNotificationType('warning')} ml={3}>
          Warning
        </ButtonOutline>
        <ButtonOutline onClick={() => setNotificationType('info')} ml={3}>
          Info
        </ButtonOutline>
        <ButtonPrimary onClick={() => setNotificationType('')} ml={3}>
          clear
        </ButtonPrimary>
        <NotificationPreview type={notificationType} />
      </Box>
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <NotificationStory />)
