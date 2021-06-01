import React, { createElement } from 'react'
import { Microlink } from 'components/logos'
import { navigate } from 'gatsby'

import NavLink from './NavLink'

const createNavItem = opts => props =>
  createElement(NavLink, {
    'data-event-category': 'Toolbar',
    'data-event-action': opts.children,
    linkProps: { rel: 'prerender' },
    ...opts,
    ...props
  })

const NavLogoMobile = props => (
  <NavLink
    width='32px'
    display='flex'
    href='/'
    style={{ flex: '0 0 auto' }}
    {...props}
  >
    <Microlink />
  </NavLink>
)

const NavLogoDesktop = props => (
  <NavLink
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
  </NavLink>
)

export const NavLogo = ({ mobile, ...props }) =>
  createElement(mobile ? NavLogoMobile : NavLogoDesktop, { px: 0, ...props })

NavLogo.defaultProps = {
  'data-event-category': 'Toolbar',
  'data-event-action': 'Logo'
}

export const NavPricing = createNavItem({
  children: 'Pricing',
  href: '/#pricing',
  actively: 'observer'
})

export const NavSDK = createNavItem({
  children: 'SDK',
  href: '/sdk',
  actively: 'partial'
})

export const NavMeta = createNavItem({
  children: 'meta',
  href: '/meta',
  actively: 'partial'
})

export const NavInsights = createNavItem({
  children: 'Insights',
  href: '/insights',
  actively: 'partial'
})

export const NavScreenshot = createNavItem({
  children: 'Screenshot',
  href: '/screenshot',
  actively: 'partial'
})

export const NavOpenSource = createNavItem({
  children: 'Open Source',
  href: '/oss',
  actively: 'partial'
})

export const NavPdf = createNavItem({
  children: 'PDF',
  href: '/pdf',
  actively: 'partial'
})

export const NavDocs = createNavItem({
  children: 'docs',
  href: '/docs',
  actively: 'partial'
})

export const NavChat = createNavItem({
  children: 'Chat',
  href: '/chat',
  actively: 'partial'
})

export const NavBlog = createNavItem({
  children: 'Blog',
  href: '/blog',
  actively: 'partial'
})

export const NavRecipes = createNavItem({
  children: 'Recipes',
  href: '/recipes',
  actively: 'partial'
})

export const NavChangelog = createNavItem({
  children: 'Changelog',
  href: '/changelog',
  actively: 'partial'
})

export const NavProducts = createNavItem({
  href: '/',
  children: 'Products',
  actively: ({ location }) =>
    NavProducts.pages.some(pagePath => location.pathname.startsWith(pagePath))
})

NavProducts.pages = [
  '/meta',
  '/sdk',
  '/pdf',
  '/screenshot',
  '/sdk',
  '/insights'
]

export const NavDevelopers = createNavItem({
  children: 'Developers',
  actively: ({ location }) =>
    NavDevelopers.pages.some(pagePath => location.pathname.startsWith(pagePath))
})

NavDevelopers.pages = ['/docs', '/changelog', '/recipes', '/chat', '/oss']

export const NavGitHub = createNavItem({
  children: 'GitHub',
  href: 'https://github.com/microlinkhq'
})

export const NavTwitter = createNavItem({
  children: 'Twitter',
  href: 'https://twitter.com/microlinkhq'
})
