import Caps from 'components/elements/Caps'
import FeatherIcon from 'components/icons/Feather'
import { DashboardLink } from 'components/patterns/SignupLink'
import React from 'react'
import { theme } from 'theme'

import { ToolbarActionLink } from './ToolbarLinks'
import { TOOLBAR_TOP_LEVEL_CAPS_STYLES } from './ToolbarStyles'

const ACTION_ICON_SIZE = '14px'

const ToolbarAccountAction = ({ link, ctaLocation, ...props }) => (
  <DashboardLink
    component={ToolbarActionLink}
    forwardedAs='div'
    cta={`${ctaLocation}:${link.ctaAction}`}
    dashboardPath={link.dashboardPath}
    title={link.title}
    externalIcon={false}
    data-event-location='Toolbar'
    data-event-name={link.label}
    {...props}
  >
    <FeatherIcon icon={link.icon} size={ACTION_ICON_SIZE} />
    <Caps as='span' css={theme(TOOLBAR_TOP_LEVEL_CAPS_STYLES)}>
      {link.label}
    </Caps>
  </DashboardLink>
)

export default ToolbarAccountAction
