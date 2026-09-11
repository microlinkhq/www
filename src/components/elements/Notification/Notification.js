import { CheckCircle, X, AlertTriangle } from 'react-feather' // TODO: XCircle is probably X
import React, { createElement, useState } from 'react'
import FeatherIcon from 'components/icons/Feather'
import { theme, transition, touchTargets, speed } from 'theme'
import styled from 'styled-components'
import Text from '../Text'
import Flex from '../Flex'

const TOAST_HIDDEN = 'translateY(100%) scale(0.95)'

const Wrapper = styled(Flex)`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  z-index: 3;
  padding-bottom: env(safe-area-inset-bottom, 0);
  opacity: 1;
  transform: translateY(0) scale(1);

  @media (prefers-reduced-motion: no-preference) {
    transition: opacity ${transition.medium}, transform ${transition.medium};

    @starting-style {
      opacity: 0;
      transform: ${TOAST_HIDDEN};
    }
  }

  &[aria-hidden='true'] {
    opacity: 0;

    @media (prefers-reduced-motion: no-preference) {
      transform: ${TOAST_HIDDEN};
    }
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
          pl: 3,
          py: '10px',
          borderRadius: 2,
          border: 1,
          borderColor: 'black05',
          bg: 'white'
        })}
        {...props}
      >
        <Flex css={theme({ alignItems: 'center' })}>
          <FeatherIcon
            css={theme({
              mr: 3,
              color: iconColor,
              display: 'flex',
              alignItems: 'center'
            })}
            icon={icon}
          />
          <Text css={theme({ color: 'black80', fontSize: ['10px', 1] })}>
            {children}
          </Text>
          <Flex
            as='button'
            type='button'
            aria-label='Close notification'
            css={theme({
              pl: 3,
              color: 'black50',
              cursor: 'pointer',
              border: 0,
              background: 'transparent',
              minWidth: touchTargets.minHeight,
              minHeight: touchTargets.minHeight,
              display: 'inline-flex',
              alignItems: 'center',
              _hover: {
                color: 'black80'
              },
              _focus: {
                outline: 'none',
                boxShadow: '0 0 0 2px var(--link)'
              }
            })}
            onClick={() => {
              setIsHidden(true)
              setTimeout(() => setIsClosed(true), speed.normal)
            }}
          >
            <X size={16} />
          </Flex>
        </Flex>
      </Flex>
    </Wrapper>
  )
}

const NotificationSuccess = props =>
  createElement(Notification, {
    icon: CheckCircle,
    iconColor: 'close',
    ...props
  })

const NotificationError = props =>
  createElement(Notification, {
    icon: X,
    iconColor: 'fullscreen',
    ...props
  })

const NotificationWarning = props =>
  createElement(Notification, {
    icon: AlertTriangle,
    iconColor: 'minimize',
    ...props
  })

Notification.Success = NotificationSuccess
Notification.Error = NotificationError
Notification.Warning = NotificationWarning

export default Notification
