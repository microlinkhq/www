import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'GIPHY',
  slug: 'giphy',
  color: '#FF6666',
  exampleUrl: 'https://giphy.com/gifs/reaction-l3q2K5jinAlChoCLS',
  metaTitle: 'GIPHY Embed Code Generator — Embed GIFs & Stickers',
  metaDescription:
    'Free GIPHY embed code generator. Paste any GIPHY URL — get a ready-to-paste embed for GIFs and stickers. No signup.',
  keywords: [
    'embed giphy',
    'giphy embed code',
    'giphy embed code generator',
    'embed gif',
    'giphy gif embed html',
    'giphy embed for website'
  ],
  heroTitle: 'GIPHY Embed Code Generator',
  heroSubtitle:
    'Paste any GIPHY URL — get a ready-to-paste embed for GIFs and stickers.',
  howItWorksHeading: 'How to embed GIPHY content',
  howItWorksSteps: [
    {
      title: 'Paste a GIPHY link',
      description: 'Copy any GIPHY URL — GIFs, stickers, and clips.'
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
  explanationHeading: 'Why use our GIPHY embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any GIPHY link and get working embed HTML.'
    },
    {
      title: 'All GIPHY content',
      description:
        'Works with GIFs, stickers, and clips — the tool handles all GIPHY URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 GIPHY embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native GIPHY embed',
      description:
        'Get the real GIPHY player with auto-playing GIF and attribution.'
    },
    {
      title: 'GIFs, stickers & clips',
      description:
        'Standard GIFs, stickers, and GIPHY Clips — all content types are supported.'
    },
    {
      title: 'Responsive sizing',
      description:
        'The embedded GIF scales to fit any container width while maintaining aspect ratio.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/imgur',
      label: 'Imgur'
    },
    {
      href: '/tools/embed-url/instagram',
      label: 'Instagram'
    },
    {
      href: '/tools/embed-url/tiktok',
      label: 'TikTok'
    }
  ],
  faq: [
    {
      question: 'How do I embed a GIPHY GIF?',
      answer:
        'Paste any GIPHY URL into the tool and click Generate. You will get a ready-to-paste embed.'
    },
    {
      question: 'Does the GIF autoplay?',
      answer:
        'Yes. The embedded GIF plays automatically in a loop, just like on GIPHY.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const GiphyPage = () => <ProviderSubtool {...data} />

export default GiphyPage
