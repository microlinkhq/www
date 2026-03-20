import { transition } from 'theme'
import { Maximize, Layers, Smartphone, Film, FileText as FileTextIcon } from 'react-feather'

import { Camera as CameraIcon } from 'components/icons/Camera'
import { Bug as BugIcon } from 'components/icons/Bug'
import { cdnUrl } from 'helpers/cdn-url'

export const TOOLS = [
  {
    category: 'Screenshots',
    description:
      'Turn any URL into a pixel-perfect image. Choose the right tool for your workflow — single captures, full-page scrolls, bulk exports, or mobile viewports.',
    tools: [
      {
        title: 'Website Screenshot',
        description:
          'The fastest way to capture any website. Paste a URL, pick a viewport, and get a high-resolution PNG or JPEG in seconds. Supports custom overlays and backgrounds.',
        href: '/tools/website-screenshot',
        icon: CameraIcon,
        image: cdnUrl('screenshot/browser/dark/apple.png'),
        featured: true,
        animation: [
          'scale(1.67) translateY(16%)',
          'scale(1.35) translateY(15%)'
        ],
        styles: {
          maxHeight: '100%',
          objectFit: 'contain',
          transition: `transform ${transition.long}`
        }
      },
      {
        title: 'Full Page Screenshot',
        description:
          'Scroll-capture an entire page from top to bottom in one image. Perfect for design reviews, archiving, and documentation.',
        href: '/tools/website-screenshot/full-page',
        icon: Maximize,
        image: '/images/screenshot-scroll.png',
        animation: ['scale(1) translateY(-75%)', 'scale(1)'],
        styles: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          position: 'absolute',
          top: '10%',
          width: ['85%', '60%', '90%'],
          objectFit: 'cover',
          transition: 'transform 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
          transformOrigin: 'top center'
        }
      },
      {
        title: 'Bulk Screenshots',
        description:
          'Paste up to 50 URLs and capture them all at once. Download every screenshot as a ZIP file. Great for competitive analysis and monitoring.',
        href: '/tools/website-screenshot/bulk',
        icon: Layers,
        image: '/images/screenshot-bulk.png',
        animation: ['scale(1.5) rotate(0deg)', 'scale(1.3) rotate(-10deg)'],
        styles: {
          maxHeight: '100%',
          objectFit: 'contain',
          transition: `transform ${transition.long}`,
          transformOrigin: 'center center'
        }
      },
      {
        title: 'Mobile Screenshot',
        description:
          'Emulate real mobile devices and capture responsive layouts. Test how your site looks on iPhone, Pixel, and more.',
        href: '/tools/website-screenshot/mobile',
        icon: Smartphone,
        image: '/images/screenshot-mobile.png',
        animation: ['scale(1.1) translateY(-8%)', 'scale(1.4)'],
        styles: {
          mt: '310px',
          maxWidth: '290px',
          objectFit: 'contain',
          transition: `transform ${transition.long}`,
          transformOrigin: 'center center'
        }
      },
      {
        title: 'Animated Screenshot',
        description:
          'Capture an animated screenshot of any website. Get a GIF or MP4 file in seconds with the motion that the webpage has. Create rich previews.',
        href: '/tools/website-screenshot/animated',
        icon: Film,
        image: cdnUrl('www/tools/animated-screenshot.mp4'),
        animation: ['scale(1.2) translateY(10%)', 'scale(1)'],
        styles: {
          width: ['90%', '90%', '80%', '80%'],
          marginTop: ['60px', '200px', '50px', '75px'],
          transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }
      }
    ]
  },
  {
    category: 'Metadata',
    description:
      'Inspect, debug, and validate the metadata behind any URL. See exactly what search engines and social platforms see before you publish.',
    tools: [
      {
        title: 'Sharing Debugger',
        description:
          'Validate Open Graph, Twitter Cards, JSON-LD, microdata, and every other meta tag in one place. Preview how your URL renders on Facebook, X, LinkedIn, Slack, and more — before you hit publish.',
        href: '/tools/sharing-debugger',
        icon: BugIcon,
        image: '/images/sharing-debugger.png',
        featured: true,
        animation: ['scale(1) translateY(-70%)', 'scale(1)'],
        styles: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          position: 'absolute',
          top: ['25%', '10%'],
          width: ['300px', '450px', '550px'],
          objectFit: 'cover',
          transition: 'transform 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
          transformOrigin: 'top center'
        }
      }
    ]
  },
  {
    category: 'Markdown',
    description:
      'Convert any webpage into clean, structured markdown. Extract content from blogs, docs, and SPAs — edit, copy, or download the result instantly.',
    tools: [
      {
        title: 'URL to Markdown',
        description:
          'Turn any URL into clean, structured markdown. Supports ad blocking, HTML selectors, JavaScript rendering, and inline editing — copy or download the result. No login required.',
        href: '/tools/url-to-markdown',
        icon: FileTextIcon,
        image: '/images/url-to-markdown.png',
        featured: true,
        animation: [
          'scale(1.0) translateY(-6%) perspective(800px) rotateY(-8deg)',
          'scale(1) perspective(800px) rotateY(0deg)'
        ],
        styles: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          position: 'absolute',
          top: ['25%', '7%'],
          width: ['300px', '450px', '550px'],
          objectFit: 'cover',
          transition: 'transform 1200ms cubic-bezier(0.4, 0, 0.2, 1)',
          transformOrigin: 'top center'
        }
      }
    ]
  }
]
