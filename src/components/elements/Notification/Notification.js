import { hideNotification, showNotification } from 'components/keyframes'
import React, { createElement, useState } from 'react'
import FeatherIcon from 'components/icons/Feather'
import { theme, transition } from 'theme'
import styled from 'styled-components'
import Text from '../Text'
import Flex from '../Flex'

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
      role='status'
      aria-live='polite'
      aria-atomic='true'
      aria-hidden={isHidden}
      css={theme({
        alignItems: 'center',
        justifyContent: 'center',
        my: 3
      })}
    >
      <Flex
        css={theme({
          boxShadow: 0,
          m: 3,
          px: 3,
          py: '10px',
          borderRadius: 2,
          border: 1,
          borderColor: 'black05',
          bg: 'white'
        })}
        {...props}
      >
        <Flex css={theme({ alignItems: 'center' })}>
          <FeatherIcon css={theme({ mr: 3, color: iconColor })} icon={icon} />
          <Text css={theme({ color: 'black80', fontSize: ['10px', 1] })}>
            {children}
          </Text>
          <FeatherIcon
            as='button'
            icon='x'
            size='16px'
            aria-label='Close notification'
            css={theme({
              ml: 3,
              color: 'black50',
              cursor: 'pointer',
              border: 0,
              background: 'transparent',
              padding: 0
            })}
            onClick={() => {
              setIsHidden(true)
              setTimeout(() => setIsClosed(true), 300)
            }}
          />
        </Flex>
      </Flex>
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
