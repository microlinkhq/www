import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'GIPHY',
  slug: 'giphy',
  color: '#00CCFF',
  exampleUrl: 'https://giphy.com/gifs/reaction-l3q2K5jinAlChoCLS',
  metaTitle: 'GIPHY Embed Code Generator — Embed GIFs & Stickers',
  metaDescription:
    'Free GIPHY embed code generator. Paste any GIPHY URL — get a ready-to-paste embed for GIFs, stickers, and Clips. No signup.',
  keywords: [
    'embed giphy',
    'giphy embed code',
    'giphy embed code generator',
    'embed giphy gif',
    'embed giphy sticker',
    'giphy gif embed html',
    'giphy embed for website'
  ],
  heroTitle: 'GIPHY Embed Code Generator',
  heroSubtitle:
    'Paste any GIPHY URL — get a ready-to-paste embed for GIFs, stickers, and Clips.',
  howItWorksHeading: 'How to embed a GIPHY GIF',
  howItWorksSteps: [
    {
      title: 'Paste a GIPHY link',
      description:
        'Copy any giphy.com URL — GIF pages, stickers, and GIPHY Clips all work.'
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
        'Skip digging through the share menu. Paste any GIPHY link and get working embed HTML.'
    },
    {
      title: 'GIFs, stickers & Clips',
      description:
        'Works with animated GIFs, transparent stickers, and GIPHY Clips — the tool handles all GIPHY URL formats.'
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
        'Get the real GIPHY embed with the auto-playing, looping GIF and GIPHY attribution.'
    },
    {
      title: 'Stickers and Clips',
      description:
        'Transparent stickers and short GIPHY Clips embed alongside standard animated GIFs.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/coub',
      label: 'Coub'
    },
    {
      href: '/tools/embed-url/gifnote',
      label: 'Gifnote'
    },
    {
      href: '/tools/embed-url/flickr',
      label: 'Flickr'
    }
  ],
  faq: [
    {
      question: 'How do I embed a GIPHY GIF on my website?',
      answer:
        'Paste any GIPHY URL into the tool and click Generate. You will get a ready-to-paste embed for the GIF.'
    },
    {
      question: 'Can I embed GIPHY stickers and Clips?',
      answer:
        'Yes. Animated GIFs, transparent stickers, and GIPHY Clips are all supported.'
    },
    {
      question: 'Does the GIF autoplay?',
      answer:
        'Yes. The embedded GIF plays automatically in a loop, just like on GIPHY.'
    },
    {
      question: 'What if a GIF cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card with the title and image so you always get something to paste.'
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
