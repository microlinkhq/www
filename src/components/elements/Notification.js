import React from 'react'
import { Fixed } from './Position'

const createNotification = notificationProps => props => (
  <Fixed
    m={2}
    p={3}
    zIndex={3}
    right={0}
    bottom={0}
    {...notificationProps}
    {...props}
  />
)

const Success = createNotification({
  bg: 'green2',
  color: 'green8'
})

const Danger = createNotification({
  bg: 'red2',
  color: 'red8'
})

const Notification = createNotification()

Notification.Success = Success
Notification.Danger = Danger

export default Notification
