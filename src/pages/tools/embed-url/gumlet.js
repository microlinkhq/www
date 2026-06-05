import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Gumlet',
  slug: 'gumlet',
  color: '#5637F5',
  exampleUrl: 'https://play.gumlet.io/embed/64be6a1705ab8a164db198a5',
  metaTitle: 'Gumlet Embed Code Generator — Embed Gumlet Videos',
  metaDescription:
    'Free Gumlet embed code generator. Paste a Gumlet video URL — get a ready-to-paste iframe player for hosted and streamed videos. No signup.',
  keywords: [
    'embed gumlet',
    'gumlet embed code',
    'gumlet embed code generator',
    'embed gumlet video',
    'gumlet iframe code',
    'gumlet video player embed',
    'gumlet video embed'
  ],
  heroTitle: 'Gumlet Embed Code Generator',
  heroSubtitle:
    'Paste a Gumlet video URL — get a ready-to-paste iframe player for your hosted and streamed videos.',
  howItWorksHeading: 'How to embed a Gumlet video',
  howItWorksSteps: [
    {
      title: 'Paste a Gumlet link',
      description:
        'Copy a play.gumlet.io video link — the embed or share URL for any hosted video.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Gumlet video and generates the right iframe player HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Gumlet embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building the iframe by hand. Paste a Gumlet link and get working embed HTML.'
    },
    {
      title: 'Hosted & streamed video',
      description:
        'Works with Gumlet-hosted videos and adaptive streams delivered through their player.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Gumlet embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Gumlet player',
      description:
        'Get the real Gumlet video player with adaptive streaming and playback controls.'
    },
    {
      title: 'Responsive video embed',
      description:
        'The iframe player scales to fit your layout for clean playback on any screen size.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/bunnynet',
      label: 'Bunny.net'
    },
    {
      href: '/tools/embed-url/wistia',
      label: 'Wistia'
    },
    {
      href: '/tools/embed-url/vimeo',
      label: 'Vimeo'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Gumlet video on my website?',
      answer:
        'Paste a Gumlet video URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'What Gumlet content can I embed?',
      answer:
        'Videos hosted and streamed through Gumlet and served by their play.gumlet.io player.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The Gumlet iframe player scales to fit your layout and plays cleanly across devices.'
    },
    {
      question: 'What if the video cannot be embedded natively?',
      answer:
        'Switch to Card mode to generate a styled preview card with the video title and thumbnail instead.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const GumletPage = () => <ProviderSubtool {...data} />

export default GumletPage
