import React, { useState } from 'react'
import { Box, Text, Flex } from 'components/elements'
import { hideNotification, showNotification } from 'components/keyframes'
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

const createNotification = notificationProps => ({ children, ...props }) => {
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
        boxShadow={1}
        m={3}
        px={3}
        py='12px'
        borderRadius={2}
        {...notificationProps}
        {...props}
      >
        <Flex alignItems='center'>
          {children}
          <CloseButton
            onClick={() => {
              setIsHidden(true)
              setTimeout(() => setIsClosed(true), 300)
            }}
            {...notificationProps}
            pl={3}
          />
        </Flex>
      </Text>
    </Wrapper>
  )
}

const Success = createNotification({
  bg: 'green2',
  color: 'green8'
})

const Error = createNotification({
  bg: 'red2',
  color: 'red8'
})

const Warning = createNotification({
  bg: 'yellow2',
  color: 'yellow8'
})

const Notification = createNotification()

Notification.Success = Success
Notification.Error = Error
Notification.Warning = Warning

export default Notification
