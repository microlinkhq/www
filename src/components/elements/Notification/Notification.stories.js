import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import { Link, Button, Notification, Box } from 'components/elements'
import { Choose } from 'react-extras'
import { Story } from 'story'

const storyName = 'Notification'

const code = `
import { Notification } from 'components/elements'

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
        <Notification.Success>payment processed</Notification.Success>
      </Choose.When>
      <Choose.When condition={type === 'warning'}>
        <Notification.Warning>
          This action can be consecuences
        </Notification.Warning>
      </Choose.When>
      <Choose.When condition={type === 'error'}>
        <Notification.Error>oh no!</Notification.Error>
      </Choose.When>
    </Choose>
  )
}

const NotificationStory = () => {
  const [notificationType, setNotificationType] = useState('')

  return (
    <Story name={storyName} code={code}>
      <Box mb={4} width={650}>
        <Button bg='green' onClick={() => setNotificationType('success')}>
          Success
        </Button>
        <Button bg='red' onClick={() => setNotificationType('error')} ml={3}>
          Error
        </Button>
        <Button
          bg='yellow'
          onClick={() => setNotificationType('warning')}
          ml={3}
        >
          Warning
        </Button>
        <Link onClick={() => setNotificationType('')} ml={3}>
          clear
        </Link>
        <NotificationPreview type={notificationType} />
      </Box>
    </Story>
  )
}

storiesOf('Elements', module).add(storyName, () => <NotificationStory />)
