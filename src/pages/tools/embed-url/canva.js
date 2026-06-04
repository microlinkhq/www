import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Canva',
  slug: 'canva',
  color: '#00C4CC',
  exampleUrl: 'https://www.canva.com/design/DAF1234567/view',
  metaTitle: 'Canva Embed Code Generator — Embed Designs & Presentations',
  metaDescription:
    'Free Canva embed code generator. Paste any Canva URL — get a ready-to-paste embed for designs, presentations, and documents. No signup.',
  keywords: [
    'embed canva',
    'canva embed code',
    'canva embed code generator',
    'embed canva design',
    'canva presentation embed',
    'canva embed html'
  ],
  heroTitle: 'Canva Embed Code Generator',
  heroSubtitle:
    'Paste any Canva URL — get a ready-to-paste embed for designs, presentations, and documents.',
  howItWorksHeading: 'How to embed Canva content',
  howItWorksSteps: [
    {
      title: 'Paste a Canva link',
      description: 'Copy any Canva URL — designs, presentations, and documents.'
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
  explanationHeading: 'Why use our Canva embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Canva link and get working embed HTML.'
    },
    {
      title: 'All Canva content',
      description:
        'Works with designs, presentations, and documents — the tool handles all Canva URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Canva embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Interactive designs',
      description:
        'Embedded Canva designs are interactive — viewers can navigate pages and zoom in.'
    },
    {
      title: 'Presentations & docs',
      description:
        'Designs, presentations, whiteboards, and documents — all Canva content types work.'
    },
    {
      title: 'Preview card fallback',
      description:
        'If the design is private, the tool returns a styled preview card with the available metadata.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/figma',
      label: 'Figma'
    },
    {
      href: '/tools/embed-url/behance',
      label: 'Behance'
    },
    {
      href: '/tools/embed-url/zeplin',
      label: 'Zeplin'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Canva design?',
      answer:
        'Paste any Canva share URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Does the design need to be published?',
      answer:
        'The design needs a shareable link. Published designs and shared links both work.'
    },
    {
      question: 'Can I embed Canva presentations?',
      answer:
        'Yes. Presentations, documents, and whiteboards are all supported.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const CanvaPage = () => <ProviderSubtool {...data} />

export default CanvaPage
