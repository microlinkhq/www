import Caps from 'components/elements/Caps'
import FeatherIcon from 'components/icons/Feather'
import { DashboardLink } from 'components/patterns/SignupLink'
import { LogIn } from 'react-feather'
import React from 'react'
import { theme } from 'theme'

import { SIGN_IN_NAV_ITEM, ToolbarActionLink } from './ToolbarLinks'
import { TOOLBAR_TOP_LEVEL_CAPS_STYLES } from './ToolbarStyles'

const ToolbarSignInLink = ({ cta, ...props }) => (
  <DashboardLink
    component={ToolbarActionLink}
    cta={cta}
    forwardedAs='li'
    title={SIGN_IN_NAV_ITEM.title}
    externalIcon={SIGN_IN_NAV_ITEM.externalIcon}
    data-event-location='Toolbar'
    data-event-name={SIGN_IN_NAV_ITEM.label}
    {...props}
  >
    <FeatherIcon icon={LogIn} size='14px' />
    <Caps as='span' css={theme(TOOLBAR_TOP_LEVEL_CAPS_STYLES)}>
      {SIGN_IN_NAV_ITEM.label}
    </Caps>
  </DashboardLink>
)

export default ToolbarSignInLink
