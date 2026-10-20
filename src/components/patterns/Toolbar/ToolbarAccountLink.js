import Caps from 'components/elements/Caps'
import FeatherIcon from 'components/icons/Feather'
import { DashboardLink } from 'components/patterns/SignupLink'
import { useDashboardSession } from 'components/hook/use-dashboard-session'
import { LOGIN_PATH } from 'helpers/dashboard-url'
import { Layout, LogIn } from 'react-feather'
import React from 'react'
import { theme } from 'theme'

import {
  DASHBOARD_NAV_ITEM,
  SIGN_IN_NAV_ITEM,
  ToolbarActionLink
} from './ToolbarLinks'
import { TOOLBAR_TOP_LEVEL_CAPS_STYLES } from './ToolbarStyles'

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

const ToolbarAccountLink = ({ ctaLocation, ...props }) => {
  const isSignedIn = useDashboardSession()
  const { item, icon, dashboardPath, ctaAction } = isSignedIn
    ? SIGNED_IN_LINK
    : SIGNED_OUT_LINK

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
      <FeatherIcon icon={icon} size='14px' />
      <Caps as='span' css={theme(TOOLBAR_TOP_LEVEL_CAPS_STYLES)}>
        {item.label}
      </Caps>
    </DashboardLink>
  )
}

export default ToolbarAccountLink
