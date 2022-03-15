import { Flex, Text, Box, Link } from 'components/elements'
import React, { useState, useRef, useEffect } from 'react'
import { showNotification, hideNotification } from 'components/keyframes'
import { useLocalStorage } from 'components/hook'
import { transition, colors } from 'theme'
import styled from 'styled-components'
import { X } from 'react-feather'

const LOCALSTORAGE_KEY = 'cookie_policy'

const CookiesWrapper = styled(Box)`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 2;
  animation: ${showNotification} ${transition.medium} forwards 1;

  &[aria-hidden='true'] {
    animation: ${hideNotification} ${transition.medium} forwards 1;
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

const CookiesPolicy = () => {
  const [isHidden, setIsHidden] = useLocalStorage(LOCALSTORAGE_KEY, false)
  const [isClosed, setIsClosed] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (el) el.setAttribute('aria-hidden', isClosed || isHidden)
  }, [isClosed, isHidden])

  return (
    <CookiesWrapper
      ref={ref}
      id='cookies-policy'
      className='hidden-print'
      aria-hidden='true'
      m={3}
      css={isHidden && 'animation-duration: 0s !important;'}
    >
      <Flex
        alignItems='center'
        bg='white95'
        py={2}
        px={3}
        borderRadius={3}
        boxShadow={0}
      >
        <Text fontSize={['10px', 1]} color='black80'>
          <span>By using this website you agree to our</span>
          <Link ml={1} href='/privacy'>
            privacy
          </Link>
          <span>.</span>
        </Text>
        <CloseButton
          ml={3}
          onClick={() => {
            setIsClosed(true)
            setTimeout(() => setIsHidden(true), 300)
          }}
        >
          <X size={16} color={colors.black80} />
        </CloseButton>
      </Flex>
    </CookiesWrapper>
  )
}

export default CookiesPolicy
