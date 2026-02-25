import React, { createElement } from 'react'
import Flex from 'components/elements/Flex'
import Text from 'components/elements/Text'
import { Microlink } from 'components/logos'
import { Markdown as MarkdownIcon } from 'components/icons/Markdown'
import { GitHub as GitHubBrand } from 'components/icons/GitHub'
import { useOssTotalStars } from 'components/hook/use-oss-total-stars'
import { theme } from 'theme'
import styled from 'styled-components'
import {
  BarChart2,
  Camera,
  Code,
  Database,
  File,
  Image,
  Share2,
  Shield,
  Clock,
  Users,
  Command,
  Activity,
  Layers
} from 'react-feather'
import NavLink from './NavLink'

export const ToolbarNavLink = styled(NavLink)`
  text-transform: none;
  letter-spacing: normal;

  > a {
    display: flex;
    justify-content: flex-start;
    gap: 12px;
    width: 100%;
    font: inherit;
    letter-spacing: inherit;
    text-transform: inherit;
  }

  ${theme({
    pl: 0
  })}
`

const docsMatcher = ({ location }) => location.pathname.startsWith('/docs')
const compactNumberFormatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  maximumFractionDigits: 0
})

const formatCompactNumber = number => compactNumberFormatter.format(number)

const GitHubSocialIcon = () => {
  const totalOssStars = useOssTotalStars()

  return (
    <Flex
      as='span'
      css={theme({
        alignItems: 'center',
        gap: 1,
        color: 'inherit'
      })}
    >
      <GitHubBrand width='14px' style={{ position: 'relative', top: '-1px' }} />
      <Text as='span' css={theme({ color: 'inherit', fontSize: 0, m: 0 })}>
        {formatCompactNumber(totalOssStars)}
      </Text>
    </Flex>
  )
}

const createNavigationItem = ({
  label,
  href,
  actively = 'partial',
  title,
  externalIcon,
  description,
  icon,
  logo
}) => ({
  label,
  href,
  actively,
  title,
  externalIcon,
  description,
  icon,
  logo
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

export const DIRECT_NAV_ITEMS = [DOCUMENTATION_NAV_ITEM, PRICING_NAV_ITEM]

export const SOCIAL_NAV_ITEMS = [
  createNavigationItem({
    label: 'GitHub',
    href: 'https://github.com/microlinkhq',
    title: '@microlinkhq on GitHub',
    externalIcon: false,
    icon: GitHubSocialIcon
  })
]

const UNAVATAR_LOGO =
  'data:image/png;base64,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'

export const NAVIGATION_SECTIONS = [
  {
    label: 'Products',
    description: 'APIs and tooling to turn any URL into structured output.',
    columns: 3,
    items: [
      createNavigationItem({
        label: 'Markdown',
        href: '/markdown',
        description: 'Built for agents handling website content',
        icon: MarkdownIcon
      }),
      createNavigationItem({
        label: 'Metadata',
        href: '/metadata',
        description: 'Extract normalized metadata from any website',
        icon: Database
      }),
      createNavigationItem({
        label: 'Screenshot',
        href: '/screenshot',
        description: 'Generate pixel-perfect captures for any URL',
        icon: Camera
      }),
      createNavigationItem({
        label: 'PDF',
        href: '/pdf',
        description: 'Create production-ready PDFs from live webpages',
        icon: File
      }),
      createNavigationItem({
        label: 'Insights',
        href: '/insights',
        description: 'Run lighthouse insights across pages at scale',
        icon: BarChart2
      }),
      createNavigationItem({
        label: 'Logo',
        href: '/logo',
        description: 'Fetch favicons and logos from websites',
        icon: Image
      }),
      createNavigationItem({
        label: 'Unavatar',
        href: 'https://unavatar.io',
        description: 'Serve reliable avatars from email domains',
        externalIcon: false,
        logo: UNAVATAR_LOGO
      })
    ]
  },
  {
    label: 'Tools',
    description: 'Utilities to test and validate your metadata integrations.',
    columns: 2,
    items: [
      createNavigationItem({
        label: 'User Agents',
        href: '/user-agents',
        description: 'Use curated browser signatures for testing',
        icon: Shield
      }),
      createNavigationItem({
        label: 'Sharing Debugger',
        href: '/tools/sharing-debugger',
        description: 'Preview social cards before publishing links',
        icon: Share2
      }),
      createNavigationItem({
        label: 'SDK',
        href: '/sdk',
        description: 'Ship API integrations faster across platforms',
        icon: Code
      })
    ]
  },
  {
    label: 'Resources',
    description: 'Guides and tools to support your development and growth.',
    columns: 3,
    items: [
      createNavigationItem({
        label: 'Blog',
        href: '/blog',
        description: 'Read product stories and technical deep dives',
        icon: BarChart2
      }),
      createNavigationItem({
        label: 'Newsletter',
        href: '/newsletter',
        description: 'Get monthly updates, launches, and tutorials',
        icon: Share2
      }),
      createNavigationItem({
        label: 'Open Source',
        href: '/oss',
        description: 'Explore public projects powering Microlink tools',
        icon: Shield
      }),
      createNavigationItem({
        label: 'About',
        href: '/about',
        description: 'Meet the team building Microlink products',
        icon: File
      }),
      createNavigationItem({
        label: 'Changelog',
        href: '/changelog',
        description: 'Track shipped improvements and platform releases',
        icon: Clock
      }),
      createNavigationItem({
        label: 'Community',
        href: '/community',
        description: 'Join discussions, ask questions, share solutions',
        icon: Users
      }),
      createNavigationItem({
        label: 'Status',
        href: '/status',
        description: 'Monitor uptime and incident history in real time',
        icon: Activity
      }),
      createNavigationItem({
        label: 'Formats',
        href: '/formats',
        description: 'See every supported format and coverage details',
        icon: Layers
      }),
      createNavigationItem({
        label: 'API',
        href: '/docs/api/getting-started/overview',
        description: 'Explore API guides, parameters and examples',
        icon: Code
      }),
      createNavigationItem({
        label: 'Recipes',
        href: '/recipes',
        description: 'Use ready-made recipes for common workflows',
        icon: Command
      })
    ]
  }
]

export const getToolbarSectionFromPathname = pathname => {
  const section = NAVIGATION_SECTIONS.find(({ items }) =>
    items.some(({ href }) => href.startsWith('/') && pathname.startsWith(href))
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
