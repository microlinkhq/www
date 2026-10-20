import Caps from 'components/elements/Caps'
import FeatherIcon from 'components/icons/Feather'
import { DashboardLink } from 'components/patterns/SignupLink'
import { useDashboardSession } from 'components/hook/use-dashboard-session'
import { LOGIN_PATH } from 'helpers/dashboard-url'
import { Layout, LogIn } from 'react-feather'
import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { space, speed, timings, theme } from 'theme'

import {
  DASHBOARD_NAV_ITEM,
  SIGN_IN_NAV_ITEM,
  ToolbarActionLink
} from './ToolbarLinks'
import { TOOLBAR_TOP_LEVEL_CAPS_STYLES } from './ToolbarStyles'

const SWAP_SHIFT = space[1]
const SWAP_ANIMATION = `${speed.quickly}ms ${timings.long} both`

const SIGNED_IN_LINK = {
  item: DASHBOARD_NAV_ITEM,
  icon: Layout,
  dashboardPath: '/',
  ctaAction: 'dashboard'
}

const SIGNED_OUT_LINK = {
  item: SIGN_IN_NAV_ITEM,
  icon: LogIn,
  dashboardPath: LOGIN_PATH,
  ctaAction: 'sign-in'
}

const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`

const fadeOut = keyframes`
  from { opacity: 1 }
  to { opacity: 0 }
`

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(${SWAP_SHIFT}) }
  to { opacity: 1; transform: translateY(0) }
`

const slideOut = keyframes`
  from { opacity: 1; transform: translateY(0) }
  to { opacity: 0; transform: translateY(-${SWAP_SHIFT}) }
`

const swapAnimation = ({ $isActive }) => css`
  animation: ${$isActive ? fadeIn : fadeOut} ${SWAP_ANIMATION};

  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${$isActive ? slideIn : slideOut};
  }
`

const LabelStack = styled.span`
  ${theme({ display: 'inline-grid', alignItems: 'center' })};
`

const Label = styled.span`
  ${({ $isActive }) =>
    theme({
      gridArea: '1 / 1',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      whiteSpace: 'nowrap',
      opacity: $isActive ? 1 : 0,
      pointerEvents: $isActive ? 'auto' : 'none',
      userSelect: $isActive ? 'auto' : 'none'
    })};
  ${({ $hasChanged }) => $hasChanged && swapAnimation};
`

const AccountLabel = ({ link: { item, icon }, isActive, hasChanged }) => (
  <Label
    $isActive={isActive}
    $hasChanged={hasChanged}
    aria-hidden={isActive ? undefined : 'true'}
  >
    <FeatherIcon icon={icon} size='14px' />
    <Caps as='span' css={theme(TOOLBAR_TOP_LEVEL_CAPS_STYLES)}>
      {item.label}
    </Caps>
  </Label>
)

const ToolbarAccountLink = ({ ctaLocation, ...props }) => {
  const { isSignedIn, hasChanged } = useDashboardSession()
  const activeLink = isSignedIn ? SIGNED_IN_LINK : SIGNED_OUT_LINK
  const { item, dashboardPath, ctaAction } = activeLink

  return (
    <DashboardLink
      component={ToolbarActionLink}
      cta={`${ctaLocation}:${ctaAction}`}
      dashboardPath={dashboardPath}
      forwardedAs='li'
      title={item.title}
      externalIcon={item.externalIcon}
      data-event-location='Toolbar'
      data-event-name={item.label}
      {...props}
    >
      <LabelStack>
        {[SIGNED_OUT_LINK, SIGNED_IN_LINK].map(link => (
          <AccountLabel
            key={link.ctaAction}
            link={link}
            isActive={link === activeLink}
            hasChanged={hasChanged}
          />
        ))}
      </LabelStack>
    </DashboardLink>
  )
}

export default ToolbarAccountLink
