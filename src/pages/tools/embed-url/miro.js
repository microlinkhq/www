import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Miro',
  slug: 'miro',
  color: '#050038',
  exampleUrl: 'https://miro.com/app/board/1234567890=/',
  metaTitle: 'Miro Embed Code Generator — Embed Boards & Whiteboards',
  metaDescription:
    'Free Miro embed code generator. Paste any Miro URL — get a ready-to-paste iframe for whiteboards and collaboration boards. No signup.',
  keywords: [
    'embed miro',
    'miro embed code',
    'miro embed generator',
    'miro iframe',
    'embed miro board',
    'miro whiteboard embed'
  ],
  heroTitle: 'Miro Embed Code Generator',
  heroSubtitle:
    'Paste any Miro URL — get a ready-to-paste iframe for whiteboards and collaboration boards.',
  howItWorksHeading: 'How to embed Miro content',
  howItWorksSteps: [
    {
      title: 'Paste a Miro link',
      description: 'Copy any Miro URL — boards and whiteboards.'
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
  explanationHeading: 'Why use our Miro embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Miro link and get working embed HTML.'
    },
    {
      title: 'All Miro content',
      description:
        'Works with boards and whiteboards — the tool handles all Miro URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Miro embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Interactive whiteboard',
      description:
        'Get an interactive Miro board embed — users can zoom, pan, and navigate.'
    },
    {
      title: 'Boards & templates',
      description:
        'Collaboration boards, templates, and shared views — all Miro link types work.'
    },
    {
      title: 'Responsive iframe',
      description:
        'The embedded board adapts to your layout and supports touch gestures.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/figma',
      label: 'Figma'
    },
    {
      href: '/tools/embed-url/lucid',
      label: 'Lucid'
    },
    {
      href: '/tools/embed-url/notion',
      label: 'Notion'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Miro board?',
      answer: 'Paste any Miro board URL into the tool and click Generate.'
    },
    {
      question: 'Can viewers interact with the board?',
      answer:
        'Yes. The embedded board supports zooming, panning, and navigation.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const MiroPage = () => <ProviderSubtool {...data} />

export default MiroPage
