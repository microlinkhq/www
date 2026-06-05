import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'FITE',
  slug: 'fite',
  color: '#E61414',
  exampleUrl: 'https://www.fite.tv/watch/gcw-tournament-of-survival-11/2pjpn/',
  metaTitle: 'FITE Embed Code Generator — Embed Combat Sports & PPV Events',
  metaDescription:
    'Free FITE embed code generator. Paste a FITE TV (TrillerTV) event URL — get a ready-to-paste preview card for boxing, MMA, wrestling, and PPV streams. No signup.',
  keywords: [
    'embed fite',
    'fite embed code',
    'fite embed code generator',
    'embed fite tv event',
    'fite tv preview card',
    'trillertv embed',
    'embed ppv event',
    'fite combat sports embed'
  ],
  heroTitle: 'FITE Embed Code Generator',
  heroSubtitle:
    'Paste a FITE TV event URL — get a ready-to-paste preview card for boxing, MMA, wrestling, and PPV streams.',
  howItWorksHeading: 'How to embed a FITE event',
  howItWorksSteps: [
    {
      title: 'Paste a FITE link',
      description:
        'Copy any fite.tv or trillertv.com event, watch, or category URL.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the event metadata and generates a styled preview card you can paste anywhere.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our FITE embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing markup by hand. Paste a FITE event link and get a clean, ready-to-paste embed.'
    },
    {
      title: 'Built for combat sports',
      description:
        'Works with FITE TV (now TrillerTV) pages for boxing, MMA, wrestling, kickboxing, and live PPV events.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 FITE embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Event preview card',
      description:
        'A styled card with the event title, poster art, and link back to FITE so readers can watch the stream.'
    },
    {
      title: 'Boxing, MMA & wrestling',
      description:
        'Point it at any FITE event or category page — combat sports, motorsports, and live music PPVs are all supported.'
    },
    {
      title: 'Preview card fallback',
      description:
        'FITE PPV streams are not publicly embeddable, so the tool builds a styled preview card with title and image instead.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/ustream', label: 'Ustream' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' }
  ],
  faq: [
    {
      question: 'How do I embed a FITE event on my website?',
      answer:
        'Paste a FITE TV (or TrillerTV) event URL into the tool and click Generate. You will get a ready-to-paste preview card linking to the event.'
    },
    {
      question: 'Can I embed the live FITE PPV stream itself?',
      answer:
        'No. FITE PPV and live streams require a purchase or subscription and are not publicly embeddable, so the tool generates a preview card that links viewers to FITE instead.'
    },
    {
      question: 'What does the preview card show?',
      answer:
        'It shows the event title, poster image, and a link back to the FITE page where visitors can watch or buy the stream.'
    },
    {
      question: 'Does it work with TrillerTV links?',
      answer:
        'Yes. FITE was rebranded as TrillerTV, so both fite.tv and trillertv.com event URLs work.'
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
