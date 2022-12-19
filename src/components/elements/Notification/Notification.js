import { hideNotification, showNotification } from 'components/keyframes'
import React, { createElement, useState } from 'react'
import FeatherIcon from 'components/icons/Feather'
import { Text, Flex } from 'components/elements'
import styled from 'styled-components'
import { transition } from 'theme'

const Wrapper = styled(Flex)`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  z-index: 3;
  animation: ${showNotification} ${transition.medium} forwards 1;

  &[aria-hidden='true'] {
    animation: ${hideNotification} ${transition.medium} forwards 1;
  }
`

const Notification = ({ icon, iconColor, children, ...props }) => {
  const [isHidden, setIsHidden] = useState(false)
  const [isClosed, setIsClosed] = useState(false)

  if (isClosed) return null

  return (
    <Wrapper
      alignItems='center'
      justifyContent='center'
      aria-hidden={isHidden}
      my={3}
    >
      <Text
        fontSize={1}
        boxShadow={0}
        m={3}
        px={3}
        py='10px'
        borderRadius={2}
        border={1}
        borderColor='black10'
        color='black80'
        bg='white'
        {...props}
      >
        <Flex alignItems='center'>
          <FeatherIcon mr={3} icon={icon} color={iconColor} />
          {children}
          <FeatherIcon
            ml={3}
            icon='X'
            size='16px'
            color='black'
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setIsHidden(true)
              setTimeout(() => setIsClosed(true), 300)
            }}
          />
        </Flex>
      </Text>
    </Wrapper>
  )
}

const NotificationSuccess = props =>
  createElement(Notification, {
    icon: 'CheckCircle',
    iconColor: 'close',
    ...props
  })

const NotificationError = props =>
  createElement(Notification, {
    icon: 'XCircle',
    iconColor: 'fullscreen',
    ...props
  })

const NotificationWarning = props =>
  createElement(Notification, {
    icon: 'AlertTriangle',
    iconColor: 'minimize',
    ...props
  })

Notification.Success = NotificationSuccess
Notification.Error = NotificationError
Notification.Warning = NotificationWarning

export default Notification
