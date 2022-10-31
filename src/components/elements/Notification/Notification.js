import { hideNotification, showNotification } from 'components/keyframes'
import React, { createElement, useState } from 'react'
import { Box, Text, Flex } from 'components/elements'
import { cx, transition } from 'theme'
import styled from 'styled-components'
import { X } from 'react-feather'
import { darken } from 'polished'

const CloseButtonWrapper = styled(Box)`
  display: inline-flex;
  position: relative;
  cursor: pointer;
  transition: stroke ${transition.medium};
  svg {
    stroke: ${({ color }) => cx(color)};
    &:hover {
      stroke: ${({ color }) => darken(0.15, cx(color))};
    }
  }
`

const Wrapper = styled(Flex)`
  z-index: 3;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  animation: ${showNotification} ${transition.medium} forwards 1;

  &[aria-hidden='true'] {
    animation: ${hideNotification} ${transition.medium} forwards 1;
  }
`

const CloseButton = ({ color, ...props }) => (
  <CloseButtonWrapper color={color} {...props}>
    <X size={16} color={color} />
  </CloseButtonWrapper>
)

const Notification = ({ children, bg, color, ...props }) => {
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
        color={color}
        bg={bg}
        {...props}
      >
        <Flex alignItems='center'>
          {children}
          <CloseButton
            onClick={() => {
              setIsHidden(true)
              setTimeout(() => setIsClosed(true), 300)
            }}
            color={color}
            pl={3}
          />
        </Flex>
      </Text>
    </Wrapper>
  )
}

const NotificationSuccess = props =>
  createElement(Notification, { bg: 'green2', color: 'green8', ...props })

const NotificationError = props =>
  createElement(Notification, { bg: 'red2', color: 'red8', ...props })

const NotificationWarning = props =>
  createElement(Notification, { bg: 'yellow2', color: 'yellow8', ...props })

Notification.Success = NotificationSuccess
Notification.Error = NotificationError
Notification.Warning = NotificationWarning

export default Notification
