import { Focus } from 'components/icons/Focus'
import { Markdown } from 'components/icons/Markdown'
import { PDF } from 'components/icons/PDF'
import { Lighthouse } from 'components/icons/Lighthouse'
import { Terminal } from 'components/icons/Terminal'
import {
  Link as LinkIcon,
  Code as CodeIcon,
  Search as SearchIcon,
  Image as ImageIcon,
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
// - api:         product name used in the hero CTA ("Open <api>")
// - icon:        glyph shown in the menu + example chips
// - href:        product page (marketing page where one exists, API doc else)
// - description: one-line subtitle shown in the grid
// - color:       accent reused for the grid card's hover border/glow/arrow
export const PRODUCTS = {
  screenshot: {
    label: 'Screenshot',
    api: 'Screenshot API',
    icon: Focus,
    href: '/screenshot',
    description: 'Pixel-perfect captures of any web page',
    color: '#fd494a'
  },
  animated: {
    label: 'Animated Screenshot',
    api: 'Screenshot API',
    icon: FilmIcon,
    href: '/screenshot',
    description: 'Record any web page as a GIF or video',
    color: '#fb5607'
  },
  preview: {
    label: 'Link preview',
    api: 'Link Preview API',
    icon: LinkIcon,
    href: '/link-preview',
    description: 'Beautiful previews for any URL',
    color: '#449bf8'
  },
  embed: {
    label: 'Embed',
    api: 'Embed API',
    icon: LayoutIcon,
    href: '/embed',
    description: 'Turn any URL into an embeddable card',
    color: '#4dabf7'
  },
  markdown: {
    label: 'Markdown',
    api: 'Markdown API',
    icon: Markdown,
    href: '/markdown',
    description: 'Structured, AI-ready page content',
    color: '#06c167'
  },
  html: {
    label: 'HTML',
    api: 'HTML API',
    icon: CodeIcon,
    href: '/docs/api/parameters/data',
    description: 'Fully rendered HTML for any page',
    color: '#e8743b'
  },
  text: {
    label: 'Text',
    api: 'Text API',
    icon: AlignLeftIcon,
    href: '/docs/api/parameters/data',
    description: 'Clean, readable text from any page',
    color: '#0e9488'
  },
  metadata: {
    label: 'Metadata',
    api: 'Metadata API',
    icon: TagIcon,
    href: '/metadata',
    description: 'Normalized data from any website',
    color: '#3e55ff'
  },
  lighthouse: {
    label: 'Lighthouse',
    api: 'Insights API',
    icon: Lighthouse,
    href: '/insights',
    description: 'Lighthouse performance audits at scale',
    color: '#f5a623'
  },
  technologies: {
    label: 'Technologies',
    api: 'Insights API',
    icon: LayersIcon,
    href: '/insights',
    description: 'Detect the tech stack behind any site',
    color: '#9c36b5'
  },
  function: {
    label: 'Function',
    api: 'Function API',
    icon: Terminal,
    href: '/docs/api/parameters/function',
    description: 'Run custom browser code on any page',
    color: '#6366f1'
  },
  search: {
    label: 'Search',
    api: 'Search API',
    icon: SearchIcon,
    href: '/search',
    description: 'Turn Google results into structured data',
    color: '#1c7ed6'
  },
  pdf: {
    label: 'PDF',
    api: 'PDF API',
    icon: PDF,
    href: '/pdf',
    description: 'Print-ready documents on demand',
    color: '#e000ac'
  },
  logo: {
    label: 'Logo',
    api: 'Logo API',
    icon: ImageIcon,
    href: '/logo',
    description: 'Favicons and brand marks at scale',
    color: '#d306aa'
  },
  video: {
    label: 'Video',
    api: 'Video API',
    icon: VideoIcon,
    href: '/docs/api/parameters/video',
    description: 'Extract video assets from any page',
    color: '#ef4444'
  },
  audio: {
    label: 'Audio',
    api: 'Audio API',
    icon: MusicIcon,
    href: '/docs/api/parameters/audio',
    description: 'Extract audio assets from any page',
    color: '#8b5cf6'
  }
}

// menu + grid order: products sorted alphabetically by their visible label, so
// adding a product to PRODUCTS keeps both surfaces sorted automatically
export const VERTICAL_ORDER = Object.keys(PRODUCTS).sort((a, b) =>
  PRODUCTS[a].label.localeCompare(PRODUCTS[b].label)
)
