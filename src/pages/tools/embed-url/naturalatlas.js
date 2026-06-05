import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Natural Atlas',
  slug: 'naturalatlas',
  color: '#2E7D32',
  exampleUrl: 'https://naturalatlas.com',
  metaTitle:
    'Natural Atlas Embed Code Generator — Embed Topo Maps & Place Pages',
  metaDescription:
    'Free Natural Atlas embed code generator. Paste any Natural Atlas URL — get a ready-to-paste embed for topographic maps and outdoor place pages. No signup.',
  keywords: [
    'embed natural atlas',
    'natural atlas embed code',
    'natural atlas embed code generator',
    'embed topo map',
    'natural atlas iframe code',
    'natural atlas map embed',
    'embed trail map'
  ],
  heroTitle: 'Natural Atlas Embed Code Generator',
  heroSubtitle:
    'Paste any Natural Atlas URL — get a ready-to-paste embed for topographic maps, trails, peaks, and outdoor place pages.',
  howItWorksHeading: 'How to embed Natural Atlas content',
  howItWorksSteps: [
    {
      title: 'Paste a Natural Atlas link',
      description: 'Copy the URL of any Natural Atlas map or place page.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the content type and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Natural Atlas embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Natural Atlas link and get working embed HTML in one step.'
    },
    {
      title: 'Built for maps & places',
      description:
        'Embed topographic maps and place pages for trails, peaks, and lakes right inside your content.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Topographic map embed',
      description:
        'Turn a Natural Atlas map link into an interactive topo map you can drop on any page.'
    },
    {
      title: 'Great for trip guides',
      description:
        'Embed trail, peak, and lake place pages into hiking blogs, travel guides, and outdoor sites.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/datawrapper', label: 'Datawrapper' },
    { href: '/tools/embed-url/smugmug', label: 'SmugMug' },
    { href: '/tools/embed-url/behance', label: 'Behance' }
  ],
  faq: [
    {
      question: 'How do I embed a Natural Atlas map on my website?',
      answer:
        'Paste the Natural Atlas URL into the tool and click Generate to get embeddable HTML.'
    },
    {
      question: 'What kind of Natural Atlas content can I embed?',
      answer:
        'Topographic maps and place pages for trails, peaks, lakes, and other outdoor locations.'
    },
    {
      question: 'Will the embedded map stay interactive?',
      answer:
        'When the source supports it, the native embed keeps panning and zoom; otherwise a preview card is shown.'
    },
    {
      question: 'What if the Natural Atlas page is unavailable?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
