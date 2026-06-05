import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Pinterest',
  slug: 'pinterest',
  color: '#E60023',
  exampleUrl: 'https://www.pinterest.com/pin/675751119058067486/',
  metaTitle: 'Pinterest Embed Code Generator — Embed Pins, Boards & Profiles',
  metaDescription:
    'Free Pinterest embed code generator. Paste any Pinterest URL — get a ready-to-paste embed for pins, boards, and profiles. No signup.',
  keywords: [
    'embed pinterest pin',
    'pinterest embed code',
    'pinterest embed code generator',
    'embed pinterest board',
    'embed pinterest profile',
    'pinterest pin embed html',
    'pinterest widget code',
    'pinterest embed for website'
  ],
  heroTitle: 'Pinterest Embed Code Generator',
  heroSubtitle:
    'Paste any Pinterest URL — get a ready-to-paste embed for pins, boards, and profiles.',
  howItWorksHeading: 'How to embed Pinterest content',
  howItWorksSteps: [
    {
      title: 'Paste a Pinterest link',
      description:
        'Copy any pinterest.com URL — individual pins, boards, or profile pages.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects whether the link is a pin, board, or profile and generates the right embed HTML.'
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
        'Skip the Pinterest widget builder and script tags. Paste any link and get working embed HTML.'
    },
    {
      title: 'Pins, boards & profiles',
      description:
        'Works with individual pins, full boards, and profile pages — the tool handles every Pinterest URL format.'
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
      title: 'Native pin embeds',
      description:
        'Get the real Pinterest embed showing the pin image, title, description, and Save button.'
    },
    {
      title: 'Boards and profiles',
      description:
        'Embed an entire board or a creator profile to surface a grid of pins alongside your content.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/instagram',
      label: 'Instagram'
    },
    {
      href: '/tools/embed-url/tumblr',
      label: 'Tumblr'
    },
    {
      href: '/tools/embed-url/flickr',
      label: 'Flickr'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Pinterest pin on my website?',
      answer:
        'Paste any Pinterest pin URL into the tool and click Generate. You will get a ready-to-paste embed showing the pin image and details.'
    },
    {
      question: 'Can I embed a Pinterest board or profile?',
      answer:
        'Yes. Board and profile URLs generate a widget or a preview card that surfaces pins from that board or creator.'
    },
    {
      question: 'Can I embed a private or secret pin?',
      answer:
        'No. Only public pins, boards, and profiles can be embedded. Secret boards and pins are not accessible to the embed.'
    },
    {
      question: 'What if the native Pinterest embed is blocked?',
      answer:
        'Switch to Card mode to get a styled preview card with the pin title and image that you can customize and paste anywhere.'
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
