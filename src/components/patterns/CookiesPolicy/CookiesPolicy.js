import React, { useState } from 'react'
import { X } from 'react-feather'
import { useLocalStorage } from 'components/hook'
import { Flex, Text, Box, Link } from 'components/elements'
import styled, { keyframes } from 'styled-components'
import { transition, colors } from 'theme'

const LOCALSTORAGE_KEY = 'cookie_policy'

const animationHide = keyframes`
to {
  opacity: 0;
  transform: translateY(100%);
}
`

const CookiesWrapper = styled(Box)`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 2;

  will-change: transform;

  &[aria-hidden='true'] {
    animation: ${animationHide} ${transition.medium} forwards 1;
  }
`

const CloseButton = styled(Box)`
  display: inline-flex;
  position: relative;
  cursor: pointer;
  transition: stroke ${transition.medium};
  svg {
    stroke: ${colors.black50};
    &:hover {
      stroke: ${colors.black80};
    }
  }
`

export default () => {
  const [isHidden, setIsHidden] = useLocalStorage(LOCALSTORAGE_KEY, false)
  const [isClosed, setIsClosed] = useState(false)

  if (isClosed) return null

  return (
    <CookiesWrapper id='cookies-policy' aria-hidden={isHidden} m={3}>
      {
        <Flex
          alignItems='center'
          bg='white95'
          py={2}
          px={3}
          borderRadius={3}
          boxShadow={3}
        >
          <Text fontSize={['10px', 1]} color='black80'>
            <span>By using this website you agree to our</span>
            <Link ml={1} href='/privacy' children='privacy' />
            <span>.</span>
          </Text>
          <CloseButton
            ml={3}
            onClick={() => {
              setIsHidden(true)
              setTimeout(() => setIsClosed(true), 300)
            }}
          >
            <X size={16} color={colors.black80} />
          </CloseButton>
        </Flex>
      }
    </CookiesWrapper>
  )
}
