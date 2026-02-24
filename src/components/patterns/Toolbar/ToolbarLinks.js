import React, { createElement } from 'react'
import { Microlink } from 'components/logos'
import { fontSizes, fontWeights } from 'theme'
import styled from 'styled-components'
import {
  BarChart2,
  Camera,
  Code,
  Database,
  File,
  FileText,
  Image,
  Share2,
  Shield,
  Clock,
  Users,
  Command
} from 'react-feather'
import NavLink from './NavLink'

export const ToolbarNavLink = styled(NavLink)`
  text-transform: none;
  letter-spacing: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${fontWeights.regular};
  line-height: 1.2;

  > a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
    width: 100%;
    font: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
  }
`

const docsMatcher = ({ location }) => location.pathname.startsWith('/docs')

const createNavigationItem = ({
  label,
  href,
  actively = 'partial',
  title,
  externalIcon,
  description,
  icon
}) => ({
  label,
  href,
  actively,
  title,
  externalIcon,
  description,
  icon
})

export const PRICING_NAV_ITEM = createNavigationItem({
  label: 'Pricing',
  href: '/#pricing',
  actively: 'observer'
})

export const DOCUMENTATION_NAV_ITEM = createNavigationItem({
  label: 'Docs',
  href: '/docs/api/getting-started/overview',
  actively: docsMatcher
})

export const SOCIAL_NAV_ITEMS = [
  createNavigationItem({
    label: 'Twitter',
    href: 'https://x.com/microlinkhq',
    title: '@microlinkhq on Twitter',
    externalIcon: false
  }),
  createNavigationItem({
    label: 'GitHub',
    href: 'https://github.com/microlinkhq',
    title: '@microlinkhq on GitHub',
    externalIcon: false
  })
]

export const NAVIGATION_SECTIONS = [
  {
    label: 'Products',
    description: 'APIs and tooling to turn any URL into structured output.',
    columns: 3,
    pages: [
      '/markdown',
      '/metadata',
      '/screenshot',
      '/pdf',
      '/insights',
      '/logo',
      '/sdk',
      'https://unavatar.io'
    ],
    items: [
      createNavigationItem({
        label: 'Markdown',
        href: '/markdown',
        description: 'Built for Agents',
        icon: FileText
      }),
      createNavigationItem({
        label: 'Metadata',
        href: '/metadata',
        description: 'Unified website data',
        icon: Database
      }),
      createNavigationItem({
        label: 'Screenshot',
        href: '/screenshot',
        description: 'Pixel-perfect captures',
        icon: Camera
      }),
      createNavigationItem({
        label: 'PDF',
        href: '/pdf',
        description: 'Production-ready docs',
        icon: File
      }),
      createNavigationItem({
        label: 'Insights',
        href: '/insights',
        description: 'Lighthouse at scale',
        icon: BarChart2
      }),
      createNavigationItem({
        label: 'Logo',
        href: '/logo',
        description: 'Favicons and brand assets',
        icon: Image
      }),
      createNavigationItem({
        label: 'SDK',
        href: '/sdk',
        description: 'Ship integrations fast',
        icon: Code
      }),
      createNavigationItem({
        label: 'Unavatar',
        href: 'https://unavatar.io',
        description: 'Avatar service',
        externalIcon: false,
        icon: Image
      })
    ]
  },
  {
    label: 'Tools',
    description: 'Utilities to test and validate your metadata integrations.',
    columns: 1,
    pages: ['/tools', '/user-agents'],
    items: [
      createNavigationItem({
        label: 'User Agents',
        href: '/user-agents',
        description: 'Curated browser strings',
        icon: Shield
      }),
      createNavigationItem({
        label: 'Sharing Debugger',
        href: '/tools/sharing-debugger',
        description: 'Preview social cards',
        icon: Share2
      })
    ]
  },
  {
    label: 'Resources',
    description: 'Guides and tools to support your development and growth.',
    columns: 3,
    pages: [
      '/blog',
      '/newsletter',
      '/oss',
      '/about',
      '/changelog',
      '/community',
      '/recipes'
    ],
    items: [
      createNavigationItem({
        label: 'Blog',
        href: '/blog',
        description: 'Guides and product notes',
        icon: BarChart2
      }),
      createNavigationItem({
        label: 'Newsletter',
        href: '/newsletter',
        description: 'Monthly release digest',
        icon: Share2
      }),
      createNavigationItem({
        label: 'Open Source',
        href: '/oss',
        description: 'Built in public',
        icon: Shield
      }),
      createNavigationItem({
        label: 'About',
        href: '/about',
        description: 'Who we are',
        icon: File
      }),
      createNavigationItem({
        label: 'Changelog',
        href: '/changelog',
        description: 'See what shipped',
        icon: Clock
      }),
      createNavigationItem({
        label: 'Community',
        href: '/community',
        description: 'Ask and share with devs',
        icon: Users
      }),
      createNavigationItem({
        label: 'Recipes',
        href: '/recipes',
        description: 'Copy-paste examples',
        icon: Command
      })
    ]
  }
]

export const getToolbarSectionFromPathname = pathname => {
  const section = NAVIGATION_SECTIONS.find(({ pages }) =>
    pages.some(pagePath => pathname.startsWith(pagePath))
  )

  return section ? section.label : ''
}

const NavLogoMobile = props => (
  <ToolbarNavLink
    href='/'
    data-event-location='Toolbar'
    data-event-name='Logo'
    {...props}
  >
    <Microlink
      css={{
        maxHeight: fontSizes[2],
        objectFit: 'cover',
        width: '100%',
        height: 'auto'
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
