import React, { createElement } from 'react'
import { Microlink } from 'components/logos'
import { ToolbarNavLink } from './ToolbarLinks'

const NavLogoMobile = props => (
  <ToolbarNavLink
    href='/'
    data-event-location='Toolbar'
    data-event-name='Logo'
    {...props}
  >
    <Microlink
      css={{
        height: 16,
        width: 'auto'
      }}
    />
  </ToolbarNavLink>
)

const NavLogoDesktop = props => (
  <ToolbarNavLink
    data-event-location='Toolbar'
    data-event-name='Logo'
    href='/'
    css={{
      display: 'flex',
      width: '52px'
    }}
    {...props}
  >
    <Microlink />
  </ToolbarNavLink>
)

export const NavMicrolinkLogo = ({ isMobile, ...props }) =>
  createElement(isMobile ? NavLogoMobile : NavLogoDesktop, {
    forwardedAs: 'div',
    ...props
  })
