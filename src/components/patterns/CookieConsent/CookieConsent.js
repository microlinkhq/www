import React, { useEffect, useRef, useState } from 'react'
import { getStoredConsent, updateConsent } from 'helpers/gtag'
import { Button } from 'components/elements/Button/Button'
import { popIn, popOut, wiggle } from 'components/keyframes'
import { theme, transition, colors, touchTargets, speed } from 'theme'
import { Link } from 'components/elements/Link'
import styled from 'styled-components'
import Text from 'components/elements/Text'
import Flex from 'components/elements/Flex'

const Wrapper = styled(Flex)`
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  right: calc(16px + env(safe-area-inset-right, 0px));
  transform-origin: 100% 100%;

  ${theme({
    position: 'fixed',
    zIndex: 30,
    flexDirection: 'column',
    alignItems: 'flex-end'
  })}

  @media (prefers-reduced-motion: no-preference) {
    &[data-closing='true'] {
      animation: ${popOut} ${transition.medium} both;
    }
  }
`

const Bubble = styled('button')`
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  ${theme({
    width: '48px',
    height: '48px',
    p: 0,
    border: 1,
    borderColor: 'black05',
    borderRadius: '50%',
    bg: 'white',
    boxShadow: 3,
    fontSize: 2,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    _hover: {
      boxShadow: 4
    }
  })}

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: no-preference) {
    animation: ${popIn} ${transition.long} both;
    transition: transform ${transition.short}, box-shadow ${transition.short};

    &:hover {
      transform: translateY(-2px);
    }

    &:hover > span {
      animation: ${wiggle} ${transition.long};
    }
  }
`

const Panel = styled(Flex)`
  transform-origin: 100% 100%;

  ${theme({
    flexDirection: 'column',
    width: '288px',
    p: 3,
    border: 1,
    borderColor: 'black05',
    borderRadius: 4,
    bg: 'white',
    boxShadow: 3
  })}

  @media (prefers-reduced-motion: no-preference) {
    animation: ${popIn} ${transition.medium} both;

    &[data-closing='true'] {
      animation: ${popOut} ${transition.medium} both;
    }
  }
`

const DeclineButton = styled('button')`
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  ${theme({
    fontFamily: 'sans',
    fontSize: 1,
    fontWeight: 'bold',
    color: 'black60',
    bg: 'transparent',
    border: 0,
    borderRadius: 2,
    px: 3,
    py: '12px',
    minHeight: touchTargets.minHeight,
    cursor: 'pointer',
    _hover: {
      color: 'black'
    }
  })}

  &:focus-visible {
    outline: 2px solid ${colors.link};
    outline-offset: 2px;
  }
`

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const wasOpenRef = useRef(false)
  const restoreFocusRef = useRef(false)
  const closeTimerRef = useRef(null)
  const leaveTimerRef = useRef(null)
  const wrapperRef = useRef(null)
  const bubbleRef = useRef(null)
  const acceptRef = useRef(null)

  useEffect(() => {
    if (getStoredConsent() === undefined) setIsVisible(true)
  }, [])

  useEffect(
    () => () => {
      clearTimeout(closeTimerRef.current)
      clearTimeout(leaveTimerRef.current)
    },
    []
  )

  useEffect(() => {
    if (isOpen && acceptRef.current) acceptRef.current.focus()
    else if (wasOpenRef.current && restoreFocusRef.current && bubbleRef.current) {
      bubbleRef.current.focus()
    }
    wasOpenRef.current = isOpen
  }, [isOpen])

  const closePanel = restoreFocus => {
    if (closeTimerRef.current || leaveTimerRef.current) return
    restoreFocusRef.current = restoreFocus
    setIsClosing(true)
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null
      setIsClosing(false)
      setIsOpen(false)
    }, speed.normal)
  }

  useEffect(() => {
    if (!isOpen) return undefined

    const handlePointerDown = event => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        closePanel(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen])

  if (!isVisible) return null

  const choose = value => {
    if (leaveTimerRef.current) return
    updateConsent(value)
    setIsLeaving(true)
    leaveTimerRef.current = setTimeout(() => setIsVisible(false), speed.normal)
  }

  const handleKeyDown = event => {
    if (event.key === 'Escape') closePanel(true)
  }

  return (
    <Wrapper
      ref={wrapperRef}
      data-closing={isLeaving}
      className='hidden-print'
    >
      {isOpen
        ? (
          <Panel
            role='dialog'
            aria-label='Cookie preferences'
            data-closing={isClosing}
            onKeyDown={handleKeyDown}
          >
            <Text css={theme({ fontSize: 0, lineHeight: 2, color: 'black80' })}>
              <span aria-hidden='true'>🍪 </span>
              We use cookies to measure how the site is used — details in our{' '}
              <Link href='/privacy'>privacy policy</Link>.
            </Text>
            <Flex
              css={theme({ mt: 3, justifyContent: 'flex-end', alignItems: 'center' })}
            >
              <DeclineButton type='button' onClick={() => choose('denied')}>
                Decline
              </DeclineButton>
              <Button
                type='button'
                ref={acceptRef}
                css={theme({ ml: 2 })}
                onClick={() => choose('granted')}
              >
                Accept
              </Button>
            </Flex>
          </Panel>
          )
        : (
          <Bubble
            type='button'
            ref={bubbleRef}
            aria-label='Cookie preferences'
            aria-haspopup='dialog'
            onClick={() => setIsOpen(true)}
          >
            <span aria-hidden='true'>🍪</span>
          </Bubble>
          )}
    </Wrapper>
  )
}

export default CookieConsent
