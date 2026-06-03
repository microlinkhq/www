import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Coub',
  slug: 'coub',
  color: '#002EFF',
  exampleUrl: 'https://coub.com/view/31p758',
  metaTitle: 'Coub Embed Code Generator — Embed Looping Videos',
  metaDescription:
    'Free Coub embed code generator. Paste any Coub URL — get a ready-to-paste iframe player for looping short videos with sound. No signup.',
  keywords: [
    'embed coub',
    'coub embed code',
    'coub embed code generator',
    'embed coub video',
    'coub iframe code',
    'coub looping video embed',
    'embed coub loop'
  ],
  heroTitle: 'Coub Embed Code Generator',
  heroSubtitle:
    'Paste any Coub URL — get a ready-to-paste iframe player for looping short videos with sound.',
  howItWorksHeading: 'How to embed a Coub video',
  howItWorksSteps: [
    {
      title: 'Paste a Coub link',
      description:
        'Copy any coub.com link — a /view URL for an individual looping video.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Coub and generates the right iframe embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Coub embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the share menu. Paste any Coub link and get working embed HTML.'
    },
    {
      title: 'Seamless looping playback',
      description:
        'The embed keeps Coub native short-loop playback with its synced audio track intact.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Coub embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Coub player',
      description:
        'Get the real Coub player with the seamless loop and its synchronized audio track.'
    },
    {
      title: 'Responsive iframe',
      description:
        'The looping video embed adapts to your layout so it fits cleanly on any page.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/youtube',
      label: 'YouTube'
    },
    {
      href: '/tools/embed-url/giphy',
      label: 'Giphy'
    },
    {
      href: '/tools/embed-url/vimeo',
      label: 'Vimeo'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Coub on my website?',
      answer:
        'Paste any coub.com /view URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'Does the embed keep the looping and sound?',
      answer:
        'Yes. The native Coub player loops the clip seamlessly and plays its synced audio track, just like on coub.com.'
    },
    {
      question: 'What if a Coub cannot be embedded natively?',
      answer:
        'If native embedding is restricted, switch to Card mode for a styled preview card with the title and image.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const CoubPage = () => <ProviderSubtool {...data} />

export default CoubPage
