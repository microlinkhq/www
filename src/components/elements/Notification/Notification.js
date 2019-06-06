import React from 'react'
import { Text, Flex } from 'components/elements'
import styled from 'styled-components'

const Wrapper = styled(Flex)`
  z-index: 3;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
`

const createNotification = notificationProps => props => (
  <Wrapper alignItems='center' justifyContent='center'>
    <Text
      boxShadow={3}
      m={3}
      p={3}
      borderRadius={2}
      {...notificationProps}
      {...props}
    />
  </Wrapper>
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
