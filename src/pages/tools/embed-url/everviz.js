import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'everviz',
  slug: 'everviz',
  color: '#28277E',
  exampleUrl: 'https://app.everviz.com/embed/DBYC7mj-4/',
  metaTitle: 'everviz Embed Code Generator — Embed Charts, Maps & Tables',
  metaDescription:
    'Free everviz embed code generator. Paste any everviz URL — get a ready-to-paste iframe for interactive charts, maps, and tables. No signup.',
  keywords: [
    'embed everviz',
    'everviz embed code',
    'everviz embed code generator',
    'embed everviz chart',
    'everviz iframe code',
    'embed everviz map',
    'everviz interactive chart embed'
  ],
  heroTitle: 'everviz Embed Code Generator',
  heroSubtitle:
    'Paste any everviz URL — get a ready-to-paste iframe for interactive charts, maps, and tables.',
  howItWorksHeading: 'How to embed an everviz chart',
  howItWorksSteps: [
    {
      title: 'Paste an everviz link',
      description:
        'Copy any published app.everviz.com URL — interactive charts, maps, or tables.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the visualization and generates the right iframe embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our everviz embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the publishing panel. Paste any everviz link and get working embed HTML.'
    },
    {
      title: 'Charts, maps & tables',
      description:
        'Works with everviz interactive charts, maps, and data tables built on the Highcharts engine.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 everviz embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native interactive embed',
      description:
        'Get the real everviz iframe with tooltips, hover states, and full Highcharts interactivity.'
    },
    {
      title: 'Responsive visualizations',
      description:
        'Charts, maps, and tables scale to fit your layout across desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/datawrapper',
      label: 'Datawrapper'
    },
    {
      href: '/tools/embed-url/infogram',
      label: 'Infogram'
    },
    {
      href: '/tools/embed-url/chartblocks',
      label: 'ChartBlocks'
    }
  ],
  faq: [
    {
      question: 'How do I embed an everviz chart on my website?',
      answer:
        'Paste any published everviz URL into the tool and click Generate. You will get a ready-to-paste iframe embed.'
    },
    {
      question: 'What everviz content can I embed?',
      answer:
        'Interactive charts, maps, and data tables published from app.everviz.com are all supported.'
    },
    {
      question: 'Are the embedded charts interactive?',
      answer:
        'Yes. The native iframe keeps everviz tooltips, hover states, and Highcharts interactivity intact.'
    },
    {
      question: 'What if the everviz visualization is private?',
      answer:
        'If native embedding is restricted, the tool falls back to a styled preview card with the available metadata.'
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
