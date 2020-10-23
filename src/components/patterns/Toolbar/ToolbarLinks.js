import React, { createElement } from 'react'
import { Microlink } from 'components/logos'
import { navigate } from 'gatsby'

import NavLink from './NavLink'

const NavLinkDesktop = props => <NavLink pl={0} pr={3} {...props} />

const NavLinkMobile = props => <NavLink {...props} />

const createNavItem = ({ name, path, ...props }) => {
  const NavItem = ({ mobile, ...props }) =>
    mobile ? <NavLinkMobile {...props} /> : <NavLinkDesktop {...props} />

  NavItem.defaultProps = {
    'data-event-category': 'Toolbar',
    'data-event-action': name,
    children: name,
    href: path,
    ...props
  }

  return NavItem
}

const NavLogoMobile = props => (
  <NavLinkMobile
    width='32px'
    display='flex'
    href='/'
    style={{ flex: '0 0 auto' }}
    {...props}
  >
    <Microlink />
  </NavLinkMobile>
)

const NavLogoDesktop = props => (
  <NavLinkDesktop
    onContextMenu={event => {
      event.preventDefault()
      navigate('/design')
    }}
    href='/'
    width='40px'
    display='flex'
    {...props}
  >
    <Microlink />
  </NavLinkDesktop>
)

export const NavLogo = ({ mobile, ...props }) =>
  createElement(mobile ? NavLogoMobile : NavLogoDesktop, props)

NavLogo.defaultProps = {
  'data-event-category': 'Toolbar',
  'data-event-action': 'Logo'
}

export const NavPricing = createNavItem({
  name: 'Pricing',
  path: '/#pricing',
  actively: 'observer'
})

export const NavSDK = createNavItem({
  name: 'SDK',
  path: '/sdk',
  actively: 'partial'
})

export const NavMeta = createNavItem({
  name: 'Meta',
  path: '/meta',
  actively: 'partial'
})

export const NavInsights = createNavItem({
  name: 'Insights',
  path: '/insights',
  actively: 'partial'
})

export const NavScreenshot = createNavItem({
  name: 'Screenshot',
  path: '/screenshot',
  actively: 'partial'
})

export const NavPdf = createNavItem({
  name: 'PDF',
  path: '/pdf',
  actively: 'partial'
})

export const NavDocs = createNavItem({
  name: 'Docs',
  path: '/docs',
  actively: 'partial'
})

export const NavChat = createNavItem({
  name: 'Chat',
  path: '/chat',
  actively: 'partial'
})

export const NavBlog = createNavItem({
  name: 'Blog',
  path: '/blog',
  actively: 'partial'
})

export const NavRecipes = createNavItem({
  name: 'Recipes',
  path: '/recipes',
  actively: 'partial'
})

export const NavChangelog = createNavItem({
  name: 'Changelog',
  path: '/changelog',
  actively: 'partial'
})
