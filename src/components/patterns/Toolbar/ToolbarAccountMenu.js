import { endSession } from 'components/hook/use-dashboard-account'
import { displayName, isFreeAccount } from 'helpers/dashboard-account'
import React, { useId } from 'react'
import { createPortal } from 'react-dom'
import styled, { css } from 'styled-components'
import { colors, shadows, speed, theme, timings, transition } from 'theme'

import ToolbarAccountAvatar, { AVATAR_SIZE } from './ToolbarAccountAvatar'
import {
  AccountDashboardItem,
  AccountItemButton,
  AccountProfile,
  ItemIcon,
  UpgradeItemLink
} from './ToolbarAccountItems'
import {
  ACCOUNT_MENU_LABEL,
  DASHBOARD_LINK,
  SETTINGS_LINK,
  SIGN_OUT_ACTION,
  UPGRADE_LINK
} from './ToolbarAccountLinks'
import { useAccountMenu } from './use-account-menu'

const MENU_WIDTH = '240px'
const MENU_OFFSET = 8
const POPUP_LAYER = 102
const TRIGGER_SIZE = `${AVATAR_SIZE + 4}px`
const MENU_TRANSITION = `${speed.quickly}ms ${timings.short}`
const MENU_ITEM_PROPS = { role: 'menuitem', tabIndex: -1 }

const Trigger = styled.button`
  ${theme({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: TRIGGER_SIZE,
    height: TRIGGER_SIZE,
    p: 0,
    border: 0,
    borderRadius: '50%',
    bg: 'transparent',
    cursor: 'pointer'
  })};
  touch-action: manipulation;
  transition: box-shadow ${transition.medium};

  &:hover,
  &[aria-expanded='true'] {
    box-shadow: 0 0 0 2px ${colors.black10};
  }
`

const closedPopup = css`
  opacity: 0;
  pointer-events: none;

  @media (prefers-reduced-motion: no-preference) {
    transform: translateY(-4px) scale(0.98);
  }
`

const openPopup = css`
  opacity: 1;

  @media (prefers-reduced-motion: no-preference) {
    transform: none;
  }
`

const Popup = styled.div`
  ${theme({
    position: 'fixed',
    zIndex: POPUP_LAYER,
    width: MENU_WIDTH,
    p: 1,
    bg: 'white',
    border: 1,
    borderColor: 'black10',
    borderRadius: 4,
    boxShadow: shadows[4],
    textAlign: 'left'
  })};
  transform-origin: top right;
  transition: opacity ${MENU_TRANSITION};
  ${({ $isOpen }) => ($isOpen ? openPopup : closedPopup)};

  @media (prefers-reduced-motion: no-preference) {
    transition: opacity ${MENU_TRANSITION}, transform ${MENU_TRANSITION};
  }
`

const MenuList = styled.ul`
  ${theme({ listStyle: 'none', m: 0, p: 0 })};
`

const Separator = styled.li`
  ${theme({ height: '1px', my: 1, mx: -1, bg: 'black10' })};
`

const MenuSeparator = () => <Separator role='separator' />

const ToolbarAccountMenu = ({
  account,
  ctaLocation,
  onInteract,
  onSignOut
}) => {
  const { profile } = account
  const menuId = useId()
  const profileId = useId()
  const {
    isOpen,
    position,
    close,
    triggerRef,
    popupRef,
    menuRef,
    onTriggerClick,
    onTriggerKeyDown,
    onMenuKeyDown
  } = useAccountMenu({ offset: MENU_OFFSET })

  const onSelect = () => close({ restoreFocus: true })

  const signOut = () => {
    close()
    onSignOut()
    endSession(document, account)
  }

  return (
    <>
      <Trigger
        ref={triggerRef}
        type='button'
        aria-label={`${ACCOUNT_MENU_LABEL}: ${displayName(profile)}`}
        aria-haspopup='menu'
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={onTriggerClick}
        onKeyDown={onTriggerKeyDown}
        onMouseEnter={onInteract}
        onFocus={onInteract}
      >
        <ToolbarAccountAvatar profile={profile} />
      </Trigger>
      {typeof document !== 'undefined' &&
        createPortal(
          <Popup
            ref={popupRef}
            $isOpen={isOpen}
            inert={isOpen ? undefined : ''}
            style={position ?? undefined}
          >
            <AccountProfile
              id={profileId}
              profile={profile}
              css={theme({ p: 2 })}
            />
            <MenuList
              ref={menuRef}
              id={menuId}
              role='menu'
              aria-label={ACCOUNT_MENU_LABEL}
              aria-describedby={profileId}
              onKeyDown={onMenuKeyDown}
            >
              <MenuSeparator />
              {[DASHBOARD_LINK, SETTINGS_LINK].map(link => (
                <li key={link.ctaAction} role='none'>
                  <AccountDashboardItem
                    link={link}
                    ctaLocation={ctaLocation}
                    onClick={onSelect}
                    {...MENU_ITEM_PROPS}
                  />
                </li>
              ))}
              <MenuSeparator />
              <li role='none'>
                <AccountItemButton
                  type='button'
                  data-event-location='Toolbar'
                  data-event-name={SIGN_OUT_ACTION.label}
                  onClick={signOut}
                  {...MENU_ITEM_PROPS}
                >
                  <ItemIcon icon={SIGN_OUT_ACTION.icon} />
                  {SIGN_OUT_ACTION.label}
                </AccountItemButton>
              </li>
              {isFreeAccount(account) && (
                <>
                  <MenuSeparator />
                  <li role='none'>
                    <AccountDashboardItem
                      link={UPGRADE_LINK}
                      ctaLocation={ctaLocation}
                      component={UpgradeItemLink}
                      onClick={onSelect}
                      {...MENU_ITEM_PROPS}
                    />
                  </li>
                </>
              )}
            </MenuList>
          </Popup>,
          document.body
        )}
    </>
  )
}

export default ToolbarAccountMenu
