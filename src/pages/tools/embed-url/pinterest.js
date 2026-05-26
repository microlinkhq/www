import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Pinterest',
  slug: 'pinterest',
  color: '#BD081C',
  exampleUrl: 'https://www.pinterest.com/pin/1234567890',
  metaTitle: 'Pinterest Embed Code Generator — Embed Pins & Boards',
  metaDescription:
    'Free Pinterest embed code generator. Paste any Pinterest URL — get a ready-to-paste embed for pins, boards, and profiles. No signup.',
  keywords: [
    'embed pinterest pin',
    'pinterest embed code',
    'pinterest embed code generator',
    'embed pinterest board',
    'pinterest pin embed html',
    'pinterest embed for website'
  ],
  heroTitle: 'Pinterest Embed Code Generator',
  heroSubtitle:
    'Paste any Pinterest URL — get a ready-to-paste embed for pins, boards, and profiles.',
  howItWorksHeading: 'How to embed Pinterest content',
  howItWorksSteps: [
    {
      title: 'Paste a Pinterest link',
      description: 'Copy any Pinterest URL — pins, boards, and profiles.'
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
  explanationHeading: 'Why use our Pinterest embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Pinterest link and get working embed HTML.'
    },
    {
      title: 'All Pinterest content',
      description:
        'Works with pins, boards, and profiles — the tool handles all Pinterest URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Pinterest embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Rich pin embeds',
      description:
        'Get the real Pinterest pin embed with image, description, and save button.'
    },
    {
      title: 'Pins, boards & profiles',
      description:
        'Individual pins, boards, and profile URLs — the tool handles all Pinterest link formats.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled card with image and description when the native embed is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/instagram',
      label: 'Instagram'
    },
    {
      href: '/tools/embed-url/behance',
      label: 'Behance'
    },
    {
      href: '/tools/embed-url/flickr',
      label: 'Flickr'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Pinterest pin?',
      answer:
        'Paste any Pinterest pin URL into the tool and click Generate. You will get a ready-to-paste embed.'
    },
    {
      question: 'Can I embed a Pinterest board?',
      answer:
        'Yes. Board URLs generate a board widget or a preview card showing board details.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const PinterestPage = () => <ProviderSubtool {...data} />

export default PinterestPage
