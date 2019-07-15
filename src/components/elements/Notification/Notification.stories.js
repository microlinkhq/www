import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { ButtonOutline, Notification, Box } from 'components/elements'
import { Choose } from 'react-extras'
import { Story } from 'story'

const storyName = 'Notification'

const code = `
import { Notification } from 'components/elements'

export default () => (
  <Notification.Success children='All is fine! Have a good day.' />
  <Notification.Danger children='Ops, something is wrong.' />
)`

const NotificationPreview = ({ type }) => {
  return (
    <Choose>
      <Choose.When condition={type === 'success'}>
        <Notification.Success children='all the things are fine' />
      </Choose.When>
      <Choose.When condition={type === 'danger'}>
        <Notification.Danger children='something bad happened' />
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
        <ButtonOutline onClick={() => setNotificationType('danger')} ml={3}>
          Danger
        </ButtonOutline>
        <NotificationPreview type={notificationType} />
      </Box>
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <NotificationStory />)
