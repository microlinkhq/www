import { useDashboardAccount } from 'components/hook/use-dashboard-account'
import { accountMenuMode } from 'helpers/dashboard-account'
import React, { useEffect, useRef } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { speed, theme, timings } from 'theme'

import { accountLayer } from './account-swap'
import ToolbarAccountAction from './ToolbarAccountAction'
import { AVATAR_SIZE } from './ToolbarAccountAvatar'
import { DASHBOARD_LINK, SIGN_IN_LINK } from './ToolbarAccountLinks'
import ToolbarAccountMenu from './ToolbarAccountMenu'
import { SwapLayer, SwapStack, useSwap } from './ToolbarAccountSwap'

const ACTION_HEIGHT = '36px'
const AVATAR_SLOT_SIZE = `${AVATAR_SIZE + 4}px`

const avatarFadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`

const AvatarSlot = styled.div`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: AVATAR_SLOT_SIZE,
    height: AVATAR_SLOT_SIZE
  })};
  ${({ $reveal }) =>
    $reveal &&
    css`
      animation: ${avatarFadeIn} ${speed.quickly}ms ${timings.long} both;
    `};
`

const AvatarPlaceholder = styled.span`
  ${theme({
    display: 'block',
    width: `${AVATAR_SIZE}px`,
    height: `${AVATAR_SIZE}px`,
    borderRadius: '50%',
    bg: 'black05'
  })};
`

const ACTION_STYLES = theme({ display: 'inline-flex', height: ACTION_HEIGHT })

const useFocusSignInAfterSignOut = (layer, signInRef) => {
  const signingOutRef = useRef(false)
  useEffect(() => {
    if (layer !== 'sign-in' || !signingOutRef.current) return
    signingOutRef.current = false
    signInRef.current?.querySelector('a')?.focus()
  }, [layer, signInRef])
  return () => {
    signingOutRef.current = true
  }
}

const ToolbarDesktopAccount = ({ ctaLocation, onClosePanel, ...props }) => {
  const { account, signedIn } = useDashboardAccount()
  const layer = accountLayer(accountMenuMode(account, signedIn))
  const swap = useSwap(layer)
  const avatar = useSwap(account ? 'avatar' : 'placeholder')
  const signInRef = useRef(null)
  const onSignOut = useFocusSignInAfterSignOut(layer, signInRef)

  return (
    <SwapStack as='li' {...props}>
      <SwapLayer layer='sign-in' swap={swap} ref={signInRef}>
        <ToolbarAccountAction
          link={SIGN_IN_LINK}
          ctaLocation={ctaLocation}
          onClick={onClosePanel}
          onMouseEnter={onClosePanel}
          css={ACTION_STYLES}
        />
      </SwapLayer>
      <SwapLayer layer='dashboard' swap={swap}>
        <ToolbarAccountAction
          link={DASHBOARD_LINK}
          ctaLocation={ctaLocation}
          onClick={onClosePanel}
          onMouseEnter={onClosePanel}
          css={ACTION_STYLES}
        />
        <AvatarSlot $reveal={avatar.previous !== null}>
          {account
            ? (
              <ToolbarAccountMenu
                account={account}
                ctaLocation={ctaLocation}
                onInteract={onClosePanel}
                onSignOut={onSignOut}
              />
              )
            : (
              <AvatarPlaceholder aria-hidden='true' />
              )}
        </AvatarSlot>
      </SwapLayer>
    </SwapStack>
  )
}

export default ToolbarDesktopAccount
