import React from 'react'
import { Microlink } from 'components/logos'
import { navigate } from 'gatsby'

import NavLink from './NavLink'

const NavLinkDesktop = props => <NavLink pl={0} pr={3} {...props} />

const NavLinkMobile = props => <NavLink {...props} />

export const NavLogo = ({ mobile, ...props }) =>
  mobile ? (
    <NavLinkMobile
      width={32}
      lazy={false}
      display='flex'
      href='/'
      style={{ flex: '0 0 auto' }}
      {...props}
    >
      <Microlink />
    </NavLinkMobile>
  ) : (
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
      <Microlink size='100%' />
    </NavLinkDesktop>
  )

NavLogo.defaultProps = {
  'data-event-category': 'Toolbar',
  'data-event-action': 'Logo'
}

export const NavPrinciples = ({ mobile, ...props }) =>
  mobile ? <NavLinkMobile {...props} /> : <NavLinkDesktop {...props} />

NavPrinciples.defaultProps = {
  'data-event-category': 'Toolbar',
  'data-event-action': 'Principles',
  children: 'Principles',
  href: '/#principles',
  actively: 'observer'
}

export const NavPricing = ({ mobile, ...props }) =>
  mobile ? <NavLinkMobile {...props} /> : <NavLinkDesktop {...props} />

NavPricing.defaultProps = {
  'data-event-category': 'Toolbar',
  'data-event-action': 'Pricing',
  children: 'Pricing',
  href: '/#pricing',
  actively: 'observer'
}

export const NavEmbed = ({ mobile, ...props }) =>
  mobile ? <NavLinkMobile {...props} /> : <NavLinkDesktop {...props} />

NavEmbed.defaultProps = {
  'data-event-category': 'Toolbar',
  'data-event-action': 'Embed',
  children: 'Embed',
  href: '/embed',
  actively: 'partial'
}

export const NavScreenshot = ({ mobile, ...props }) =>
  mobile ? <NavLinkMobile {...props} /> : <NavLinkDesktop {...props} />

NavScreenshot.defaultProps = {
  'data-event-category': 'Toolbar',
  'data-event-action': 'Screenshot',
  children: 'Screenshot',
  href: '/screenshot',
  actively: 'partial'
}

export const NavDocs = ({ mobile, ...props }) =>
  mobile ? <NavLinkMobile {...props} /> : <NavLinkDesktop {...props} />

NavDocs.defaultProps = {
  'data-event-category': 'Toolbar',
  'data-event-action': 'Docs',
  children: 'Docs',
  href: '/docs/sdk/getting-started/overview/',
  actively: 'partial'
}

export const NavBlog = ({ mobile, ...props }) =>
  mobile ? <NavLinkMobile {...props} /> : <NavLinkDesktop {...props} />

NavBlog.defaultProps = {
  'data-event-category': 'Toolbar',
  'data-event-action': 'Blog',
  children: 'Blog',
  href: '/blog',
  actively: 'partial'
}

export const NavChat = ({ mobile, ...props }) =>
  mobile ? <NavLinkMobile {...props} /> : <NavLinkDesktop {...props} />

NavChat.defaultProps = {
  'data-event-category': 'Toolbar',
  'data-event-action': 'Chat',
  children: 'Chat',
  href: '/chat',
  actively: true
}
