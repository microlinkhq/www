import React, { useState } from 'react'
import { Box, Text, Flex } from 'components/elements'
import styled from 'styled-components'
import { X } from 'react-feather'
import { colors } from 'theme'

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

const Wrapper = styled(Flex)`
  z-index: 3;
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
`

const CloseButton = ({ color, ...props }) => (
  <CloseButtonWrapper {...props}>
    <X size={12} color={color} />
  </CloseButtonWrapper>
)

const createNotification = notificationProps => ({ children, ...props }) => {
  const [isClosed, setIsClosed] = useState(false)
  if (isClosed) return

  return (
    <Wrapper alignItems='center' justifyContent='center'>
      <Text
        boxShadow={3}
        m={3}
        p={3}
        borderRadius={2}
        {...notificationProps}
        {...props}
      >
        {children}
        <CloseButton
          onClick={() => setIsClosed(true)}
          color={props.color}
          pl={3}
        />
      </Text>
    </Wrapper>
  )
}

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
