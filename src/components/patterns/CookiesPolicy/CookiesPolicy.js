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
  opacity: 0;
  animation: ${showNotification} ${transition.medium} forwards 1;
  animation-delay: 1s;

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

const CookiesPolicy = props => {
  const [isHidden, setIsHidden] = useLocalStorage(LOCALSTORAGE_KEY, false)
  const [isClosed, setIsClosed] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (el) el.setAttribute('aria-hidden', isClosed || isHidden)
  }, [isClosed, isHidden])

  if (isHidden) return

  return (
    <CookiesWrapper
      role='dialog'
      aria-modal='false'
      aria-label='cookie banner'
      ref={ref}
      id='cookies-policy'
      m={3}
      {...props}
    >
      <Flex
        boxShadow={0}
        m={3}
        px={3}
        py='10px'
        borderRadius={2}
        border={1}
        borderColor='black05'
        bg='white'
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
