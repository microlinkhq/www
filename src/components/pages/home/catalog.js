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
    description: 'Pixel-perfect captures of any web page'
  },
  animated: {
    label: 'Animated Screenshot',
    icon: FilmIcon,
    href: '/screenshot',
    description: 'Record any web page as a GIF or video'
  },
  preview: {
    label: 'Link preview',
    icon: LinkIcon,
    href: '/link-preview',
    description: 'Beautiful previews for any URL'
  },
  embed: {
    label: 'Embed',
    icon: LayoutIcon,
    href: '/embed',
    description: 'Turn any URL into an embeddable card'
  },
  markdown: {
    label: 'Markdown',
    icon: Markdown,
    href: '/markdown',
    description: 'Structured, AI-ready page content'
  },
  html: {
    label: 'HTML',
    icon: CodeIcon,
    href: '/docs/api/parameters/data',
    description: 'Fully rendered HTML for any page'
  },
  text: {
    label: 'Text',
    icon: AlignLeftIcon,
    href: '/docs/api/parameters/data',
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
    description: 'Detect the tech stack behind any site'
  },
  function: {
    label: 'Function',
    icon: Terminal,
    href: '/docs/api/parameters/function',
    description: 'Run custom browser code on any page'
  },
  search: {
    label: 'Search',
    icon: SearchIcon,
    href: '/search',
    description: 'Turn Google results into structured data'
  },
  pdf: {
    label: 'PDF',
    icon: PDF,
    href: '/pdf',
    description: 'Print-ready documents on demand'
  },
  logo: {
    label: 'Logo',
    icon: Shapes,
    href: '/logo',
    description: 'Favicons and brand marks at scale'
  },
  video: {
    label: 'Video',
    icon: VideoIcon,
    href: '/docs/api/parameters/video',
    description: 'Extract video assets from any page'
  },
  audio: {
    label: 'Audio',
    icon: MusicIcon,
    href: '/docs/api/parameters/audio',
    description: 'Extract audio assets from any page'
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
