import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Acast',
  slug: 'acast',
  color: '#2F2FCB',
  exampleUrl: 'https://shows.acast.com/offmenu/episodes/ep1-scroobiuspip',
  metaTitle: 'Acast Embed Code Generator — Embed Podcast Episodes & Shows',
  metaDescription:
    'Free Acast embed code generator. Paste any Acast podcast URL — get a ready-to-paste player for episodes and shows. No signup.',
  keywords: [
    'embed acast',
    'acast embed code',
    'acast embed code generator',
    'embed acast podcast',
    'embed acast episode',
    'acast player embed',
    'acast iframe code'
  ],
  heroTitle: 'Acast Embed Code Generator',
  heroSubtitle:
    'Paste any Acast podcast URL — get a ready-to-paste player for episodes and full shows.',
  howItWorksHeading: 'How to embed Acast content',
  howItWorksSteps: [
    {
      title: 'Paste an Acast link',
      description:
        'Copy any shows.acast.com or embed.acast.com URL — individual episodes or whole shows.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the episode or show and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Acast embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Acast dashboard for the embed snippet. Paste a link and get working embed HTML.'
    },
    {
      title: 'Episodes and shows',
      description:
        'Works with single episodes and full show pages — the tool handles Acast URL formats for you.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Acast embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Acast player',
      description:
        'Get the real Acast embed player with cover art, playback controls, and episode details.'
    },
    {
      title: 'Responsive player',
      description:
        'The player adapts to your layout — compact for inline use or full-width for feature placement.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/podbean',
      label: 'Podbean'
    },
    {
      href: '/tools/embed-url/spreaker',
      label: 'Spreaker'
    },
    {
      href: '/tools/embed-url/simplecast',
      label: 'Simplecast'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Acast podcast on my website?',
      answer:
        'Paste any Acast podcast URL into the tool and click Generate. You will get a ready-to-paste player you can drop into any page.'
    },
    {
      question: 'Can I embed a single episode or a whole show?',
      answer:
        'Both. Paste an episode link to embed one episode, or a show link to embed the full show with its episode list.'
    },
    {
      question: 'Does the embedded player count listens toward my Acast stats?',
      answer:
        'Yes. Plays from the native Acast embed player are tracked as downloads in your Acast Insights.'
    },
    {
      question: 'What if a podcast cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card with the episode title and cover image that links back to the original page.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const AcastPage = () => <ProviderSubtool {...data} />

export default AcastPage
