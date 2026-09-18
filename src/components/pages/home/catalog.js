import { colors } from 'theme'
import GOOGLE_EXAMPLES from 'data/google-examples'
import { Focus } from 'components/icons/Focus'
import { Markdown } from 'components/icons/Markdown'
import { PDF } from 'components/icons/PDF'
import { Lighthouse } from 'components/icons/Lighthouse'
import { Terminal } from 'components/icons/Terminal'
import { Shapes } from 'components/icons/Shapes'
import {
  Link as LinkIcon,
  Code as CodeIcon,
  Search as SearchIcon,
  Layers as LayersIcon,
  Layout as LayoutIcon,
  AlignLeft as AlignLeftIcon,
  Tag as TagIcon,
  Video as VideoIcon,
  Film as FilmIcon,
  Music as MusicIcon
} from 'react-feather'

// Single source of truth for the product line-up. The hero's product menu and
// the homepage products grid both render from this, so they never drift.
//
// - label:       short name shown in the menu + grid title
// - icon:        glyph shown in the menu + example chips
// - href:        product page (marketing page where one exists, API doc else)
// - description: one-line subtitle shown in the grid
export const PRODUCTS = {
  screenshot: {
    label: 'Screenshot',
    icon: Focus,
    href: '/screenshot',
    description: 'Pixel-perfect captures of any page'
  },
  animated: {
    label: 'Animated Screenshot',
    icon: FilmIcon,
    href: '/screenshot',
    description: 'Any page recorded as a GIF or video'
  },
  preview: {
    label: 'Link preview',
    icon: LinkIcon,
    href: '/link-preview',
    description: 'Beautiful previews for any link'
  },
  embed: {
    label: 'Embed',
    icon: LayoutIcon,
    href: '/embed',
    description: 'Any page as an embeddable card'
  },
  markdown: {
    label: 'Markdown',
    icon: Markdown,
    href: '/markdown',
    description: 'Structured, AI-ready content from any page'
  },
  html: {
    label: 'HTML',
    icon: CodeIcon,
    href: '/html',
    description: 'Fully rendered HTML, JavaScript included'
  },
  text: {
    label: 'Text',
    icon: AlignLeftIcon,
    href: '/text',
    description: 'Clean, LLM-ready text from any page'
  },
  metadata: {
    label: 'Metadata',
    icon: TagIcon,
    href: '/metadata',
    description: 'Title, description & images from any page'
  },
  lighthouse: {
    label: 'Lighthouse',
    icon: Lighthouse,
    href: '/insights',
    description: 'Lighthouse performance audits at scale'
  },
  technologies: {
    label: 'Technologies',
    icon: LayersIcon,
    href: '/insights',
    description: 'The tech stack behind any site'
  },
  function: {
    label: 'Function',
    icon: Terminal,
    href: '/function',
    description: 'Custom browser code, run on any page'
  },
  search: {
    label: 'Search',
    icon: SearchIcon,
    href: '/search',
    description: 'Google results as structured data'
  },
  pdf: {
    label: 'PDF',
    icon: PDF,
    href: '/pdf',
    description: 'Print-ready documents from any page'
  },
  logo: {
    label: 'Logo',
    icon: Shapes,
    href: '/logo',
    description: 'Logos, favicons & brand palettes for any site'
  },
  video: {
    label: 'Video',
    icon: VideoIcon,
    href: '/media',
    description: 'Video assets from any page'
  },
  audio: {
    label: 'Audio',
    icon: MusicIcon,
    href: '/media',
    description: 'Audio assets from any page'
  }
}

// menu + grid order: products sorted alphabetically by their visible label, so
// adding a product to PRODUCTS keeps both surfaces sorted automatically
export const VERTICAL_ORDER = Object.keys(PRODUCTS).sort((a, b) =>
  PRODUCTS[a].label.localeCompare(PRODUCTS[b].label)
)

export const SEARCH_EXAMPLE = GOOGLE_EXAMPLES.search[0]

export const HOME_CONTENT_WIDTH = '1180px'

export const CAPACITY_REQUESTS_PER_MONTH = '188 million'

export const PRODUCT_TILES = {
  metadata: { bg: colors.violet0, color: colors.violet7 },
  screenshot: { bg: colors.pink0, color: colors.pink6 },
  markdown: { bg: colors.indigo0, color: colors.indigo7 },
  html: { bg: colors.violet0, color: colors.violet7 },
  embed: { bg: colors.blue0, color: colors.blue7 },
  preview: {
    bg: `linear-gradient(135deg, ${colors.violet0}, ${colors.pink0})`,
    color: colors.violet7
  },
  pdf: { bg: colors.red0, color: colors.red6 },
  logo: { bg: colors.yellow0, color: colors.yellow7 },
  search: { bg: colors.blue0, color: colors.blue7 },
  technologies: { bg: colors.violet0, color: colors.violet7 },
  function: { bg: colors.indigo0, color: colors.indigo8 },
  text: { bg: colors.orange0, color: colors.orange6 },
  lighthouse: { bg: colors.teal0, color: colors.teal7 },
  video: { bg: colors.violet0, color: colors.violet7 },
  audio: { bg: colors.pink0, color: colors.pink6 },
  animated: { bg: colors.indigo0, color: colors.indigo7 },
  automation: { bg: colors.pink0, color: colors.pink6 },
  sdk: { bg: colors.blue0, color: colors.blue7 },
  mcp: { bg: colors.teal0, color: colors.teal7 },
  conversion: { bg: colors.orange0, color: colors.orange8 }
}
