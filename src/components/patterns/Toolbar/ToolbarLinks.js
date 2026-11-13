import { Markdown as MarkdownIcon } from 'components/icons/Markdown'
import { Bot as BotIcon } from 'components/icons/Bot'
import { Award as AwardIcon } from 'components/icons/Award'
import { Building2 as Building2Icon } from 'components/icons/Building2'
import { Bug as BugIcon } from 'components/icons/Bug'
import { Camera as CameraIcon } from 'components/icons/Camera'
import { Focus as FocusIcon } from 'components/icons/Focus'
import { Inbox as InboxIcon } from 'components/icons/Inbox'
import { BookImage as BookImageIcon } from 'components/icons/BookImage'
import {
  Layers,
  BarChart2,
  Chrome as ChromeIcon,
  Code,
  Image,
  Map,
  Search as SearchIcon,
  Sliders,
  Tag as TagIcon,
  Users,
  Activity,
  AlignLeft as AlignLeftIcon,
  Maximize,
  Server as ServerIcon,
  Package as PackageIcon,
  Share2 as Share2Icon,
  Repeat as RepeatIcon,
  Video as VideoIcon,
  Zap,
  FileText,
  Layout as LayoutIcon,
  Link as LinkIcon,
  Link2
} from 'react-feather'
import { Lighthouse as LighthouseIcon } from 'components/icons/Lighthouse'
import { PDF as PDFIcon } from 'components/icons/PDF'
import { ShieldUser as ShieldUserIcon } from 'components/icons/ShieldUser'
import { Terminal as TerminalIcon } from 'components/icons/Terminal'
import { WandSparkles as WandSparklesIcon } from 'components/icons/WandSparkles'
import { Sparkles as SparklesIcon } from 'components/icons/Sparkles'
import { Globe as GlobeIcon } from 'components/icons/Globe'
import { GitCompare as GitCompareIcon } from 'components/icons/GitCompare'
import { Grid as GridIcon } from 'components/icons/Grid'
import { Brain as BrainIcon } from 'components/icons/Brain'
import { theme, transition } from 'theme'
import styled from 'styled-components'
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

export const ToolbarActionLink = styled(ToolbarNavLink)`
  ${theme({
    border: 1,
    borderColor: 'black10',
    borderRadius: '999px',
    color: 'black80'
  })}
  transition: color ${transition.medium}, background-color ${transition.medium},
    border-color ${transition.medium};

  > a {
    ${theme({ px: 3 })}
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 100%;
    border-radius: inherit;
  }

  &:hover,
  &:focus-within {
    ${theme({ bg: 'black05', borderColor: 'black20', color: 'black' })}
  }
`

const docsMatcher = ({ location }) => location.pathname.startsWith('/docs')
const pricingMatcher = ({ location }) =>
  location.pathname.startsWith('/pricing')
const screenshotToolMatcher = ({ location }) =>
  [
    '/tools/website-screenshot',
    '/tools/website-screenshot/full-page',
    '/tools/website-screenshot/mobile'
  ].some(path => location.pathname === path)

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
  href: '/pricing',
  actively: pricingMatcher
})

export const DOCUMENTATION_NAV_ITEM = createNavigationItem({
  label: 'Docs',
  href: '/docs/api/getting-started/overview',
  actively: docsMatcher
})

export const SIGN_IN_NAV_ITEM = createNavigationItem({
  label: 'Sign In',
  title: 'Sign in to the Microlink dashboard',
  externalIcon: false
})

export const DASHBOARD_NAV_ITEM = createNavigationItem({
  label: 'Dashboard',
  title: 'Open the Microlink dashboard',
  externalIcon: false
})

export const DIRECT_NAV_ITEMS = [DOCUMENTATION_NAV_ITEM, PRICING_NAV_ITEM]

const TOOLS_INTEGRATIONS_ITEMS = [
  createNavigationItem({
    label: 'AI',
    href: '/ai',
    actively: 'exact',
    description: 'Prompt your agent to use Microlink',
    icon: SparklesIcon
  }),
  createNavigationItem({
    label: 'SDK',
    href: '/integrations/sdk',
    description: 'Every product, one import',
    icon: PackageIcon
  }),
  createNavigationItem({
    label: 'MCP',
    href: '/integrations/mcp',
    description: 'Microlink for your AI agent',
    icon: BrainIcon
  }),
  createNavigationItem({
    label: 'CLI',
    href: '/integrations/cli',
    description: 'Microlink from your terminal',
    icon: TerminalIcon
  }),
  createNavigationItem({
    label: 'n8n',
    href: '/integrations/n8n',
    description: 'Microlink in your workflows',
    icon: Share2Icon
  }),
  createNavigationItem({
    label: 'Component Builder',
    href: '/integrations/builder',
    icon: LayoutIcon
  }),
  createNavigationItem({
    label: 'Embed Providers',
    href: '/embed/providers',
    description: '300+ embeddable sites',
    icon: GridIcon
  }),
  createNavigationItem({
    label: 'Extensions',
    href: '/extensions',
    description: 'Microlink in your browser',
    icon: ChromeIcon
  })
]

const UNAVATAR_LOGO =
  'data:image/png;base64,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'

const withGroupItems = section =>
  section.groups
    ? { ...section, items: section.groups.flatMap(({ items }) => items) }
    : section

export const NAVIGATION_SECTIONS = [
  {
    label: 'Products',
    description: 'APIs and tooling to turn any URL into structured output.',
    groups: [
      {
        label: 'Capture',
        items: [
          createNavigationItem({
            label: 'Screenshot',
            href: '/screenshot',
            description: 'Pixel-perfect website captures',
            icon: FocusIcon
          }),
          createNavigationItem({
            label: 'PDF',
            href: '/pdf',
            description: 'PDFs from any webpage',
            icon: PDFIcon
          }),
          createNavigationItem({
            label: 'HTML',
            href: '/html',
            description: 'HTML after JavaScript runs',
            icon: Code
          }),
          createNavigationItem({
            label: 'Insights',
            href: '/insights',
            description: 'Lighthouse audits at scale',
            icon: LighthouseIcon
          })
        ]
      },
      {
        label: 'Extract',
        items: [
          createNavigationItem({
            label: 'Markdown',
            href: '/markdown',
            description: 'Website content for agents',
            icon: MarkdownIcon
          }),
          createNavigationItem({
            label: 'Text',
            href: '/text',
            description: 'Clean, LLM-ready page text',
            icon: AlignLeftIcon
          }),
          createNavigationItem({
            label: 'Metadata',
            href: '/metadata',
            description: 'Normalized website metadata',
            icon: TagIcon
          }),
          createNavigationItem({
            label: 'Logo',
            href: '/logo',
            description: 'Favicons and website logos',
            icon: Image
          }),
          createNavigationItem({
            label: 'Media',
            href: '/media',
            description: 'Direct video and audio files',
            icon: VideoIcon
          })
        ]
      },
      {
        label: 'Preview',
        items: [
          createNavigationItem({
            label: 'Link Preview',
            href: '/link-preview',
            description: 'Rich previews for any link',
            icon: LinkIcon
          }),
          createNavigationItem({
            label: 'Embed',
            href: '/embed',
            description: 'Rich cards from any URL',
            icon: Code
          }),
          createNavigationItem({
            label: 'Unavatar',
            href: 'https://unavatar.io',
            description: 'Avatars from email or domain',
            externalIcon: false,
            logo: UNAVATAR_LOGO
          })
        ]
      },
      {
        label: 'Build',
        items: [
          createNavigationItem({
            label: 'API',
            href: '/api',
            actively: 'exact',
            description: 'One endpoint, every product',
            icon: ServerIcon
          }),
          createNavigationItem({
            label: 'Function',
            href: '/function',
            description: 'Browser code on any page',
            icon: TerminalIcon
          }),
          createNavigationItem({
            label: 'Search',
            href: '/search',
            description: 'Google results as JSON',
            icon: SearchIcon
          }),
          createNavigationItem({
            label: 'File Conversion',
            href: '/file-conversion',
            description: 'Files to Markdown, HTML, text',
            icon: RepeatIcon
          })
        ]
      }
    ]
  },
  {
    label: 'Tools',
    description: 'Browse and use tools built on top of the Microlink API.',
    footer: { label: 'See all tools', href: '/tools' },
    groups: [
      {
        label: 'Capture',
        items: [
          createNavigationItem({
            label: 'Website Screenshot',
            href: '/tools/website-screenshot',
            actively: screenshotToolMatcher,
            description: 'Capture any site as an image',
            icon: CameraIcon
          }),
          createNavigationItem({
            label: 'Full Page Screenshot',
            href: '/tools/website-screenshot/full-page',
            actively: 'exact',
            description: 'Capture the entire page',
            icon: Maximize
          }),
          createNavigationItem({
            label: 'Bulk Screenshots',
            href: '/tools/website-screenshot/bulk',
            actively: 'exact',
            description: 'Capture many sites at once',
            icon: BookImageIcon
          })
        ]
      },
      {
        label: 'Convert',
        items: [
          createNavigationItem({
            label: 'Website to PDF',
            href: '/tools/website-to-pdf',
            actively: 'exact',
            description: 'Convert any URL to a PDF file',
            icon: FileText
          }),
          createNavigationItem({
            label: 'Bulk URLs to PDFs',
            href: '/tools/website-to-pdf/bulk',
            actively: 'exact',
            description: 'Convert many URLs to PDFs',
            icon: Layers
          }),
          createNavigationItem({
            label: 'URL to Markdown',
            href: '/tools/url-to-markdown',
            actively: 'exact',
            description: 'Convert any URL to markdown',
            icon: MarkdownIcon
          }),
          createNavigationItem({
            label: 'Embed URL',
            href: '/tools/embed-url',
            actively: 'exact',
            description: 'Turn any URL into a rich card',
            icon: Link2
          })
        ]
      },
      {
        label: 'Debug',
        items: [
          createNavigationItem({
            label: 'Editor',
            href: '/editor',
            actively: 'exact',
            description: 'Write and run Microlink code',
            icon: Code
          }),
          createNavigationItem({
            label: 'Sharing Debugger',
            href: '/tools/sharing-debugger',
            actively: 'exact',
            description: 'Preview social share cards',
            icon: BugIcon
          }),
          createNavigationItem({
            label: 'Sitemap URLs',
            href: '/tools/sitemap',
            actively: 'exact',
            description: 'List all URLs in a sitemap',
            icon: Map
          }),
          createNavigationItem({
            label: 'Difftool',
            href: 'https://difftool.microlink.io',
            externalIcon: false,
            description: 'Compare two URLs visually',
            icon: GitCompareIcon
          }),
          createNavigationItem({
            label: 'Geolocation',
            href: 'https://geolocation.microlink.io',
            description: 'IP & request insights',
            externalIcon: false,
            icon: GlobeIcon
          })
        ]
      },
      {
        label: 'Integrations',
        compact: true,
        items: TOOLS_INTEGRATIONS_ITEMS
      }
    ]
  },
  {
    label: 'Resources',
    description: 'Guides and tools to support your development and growth.',
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
        icon: InboxIcon
      }),
      createNavigationItem({
        label: 'Open Source',
        href: '/open-source',
        description: 'Explore public projects powering Microlink tools',
        icon: AwardIcon
      }),
      createNavigationItem({
        label: 'About',
        href: '/about',
        description: 'Meet the team building Microlink products',
        icon: Building2Icon
      }),
      createNavigationItem({
        label: 'Benchmark',
        href: '/benchmarks/screenshot-api',
        description: 'Compare screenshot API speed and reliability',
        icon: Zap
      }),
      createNavigationItem({
        label: 'Changelog',
        href: '/changelog',
        description: 'Track shipped improvements and platform releases',
        icon: Map
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
        label: 'Recipes',
        href: '/recipes',
        description: 'Use ready-made recipes for common workflows',
        icon: WandSparklesIcon
      }),
      createNavigationItem({
        label: 'Features',
        href: '/features',
        description: 'Explore API capabilities — scraping, functions, proxy',
        icon: Sliders
      }),
      createNavigationItem({
        label: 'Use cases',
        href: '/use-cases',
        description: 'See how teams build with Microlink',
        icon: Layers
      }),
      createNavigationItem({
        label: 'Skills',
        href: '/skills',
        description: 'Browse reusable workflow skills',
        icon: BotIcon
      }),
      createNavigationItem({
        label: 'User Agents',
        href: '/user-agents',
        description: 'Use curated browser signatures for testing',
        icon: ShieldUserIcon
      })
    ]
  }
].map(withGroupItems)

export const getToolbarSectionFromPathname = pathname => {
  const section = NAVIGATION_SECTIONS.find(section =>
    section.items.some(
      ({ href }) => href.startsWith('/') && pathname.startsWith(href)
    )
  )

  return section ? section.label : ''
}
