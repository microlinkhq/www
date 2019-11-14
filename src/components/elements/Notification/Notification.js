import React, { useState } from 'react'
import { Box, Text, Flex } from 'components/elements'
import styled, { keyframes } from 'styled-components'
import { X } from 'react-feather'
import { transition, colors } from 'theme'

const CloseButtonWrapper = styled(Box)`
  display: inline-flex;
  position: relative;
  cursor: pointer;
  transition: all 0.15s ease;
  color: ${colors.lightGray900};

  &:hover {
    color: ${colors.lightGray500};
  }
`

const animationShow = keyframes`
from {
  opacity: 0;
  transform: scale(0.5);
}
`

const animationHide = keyframes`
to {
  opacity: 0;
  transform: translateY(100%);
}
`

const Wrapper = styled(Flex)`
  z-index: 3;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  will-change: transform;
  animation: ${animationShow} ${transition.medium} forwards 1;

  &[aria-hidden='true'] {
    animation: ${animationHide} ${transition.medium} forwards 1;
  }
`

const CloseButton = ({ color, ...props }) => (
  <CloseButtonWrapper {...props}>
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
        boxShadow={3}
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
              setTimeout(() => setIsClosed(true), 1000)
            }}
            color={props.color}
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

const Info = createNotification({
  bg: 'blue2',
  color: 'blue8'
})

const Notification = createNotification()

Notification.Success = Success
Notification.Error = Error
Notification.Warning = Warning
Notification.Info = Info

export default Notification
