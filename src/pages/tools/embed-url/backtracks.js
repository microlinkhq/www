import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Backtracks',
  slug: 'backtracks',
  color: '#2EDBAD',
  exampleUrl:
    'https://player.backtracks.fm/backtracks/backtracks/m/player-example',
  metaTitle: 'Backtracks Embed Code Generator — Embed Podcast Players',
  metaDescription:
    'Free Backtracks embed code generator. Paste a Backtracks player URL — get a ready-to-paste podcast player for episodes and shows. No signup.',
  keywords: [
    'embed backtracks',
    'backtracks embed code',
    'backtracks embed code generator',
    'embed backtracks player',
    'backtracks podcast player embed',
    'backtracks iframe code',
    'embed backtracks episode'
  ],
  heroTitle: 'Backtracks Embed Code Generator',
  heroSubtitle:
    'Paste a Backtracks player URL — get a ready-to-paste podcast player for episodes and shows.',
  howItWorksHeading: 'How to embed a Backtracks podcast player',
  howItWorksSteps: [
    {
      title: 'Paste a Backtracks link',
      description:
        'Copy any player.backtracks.fm URL — episode pages and show players both work.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Backtracks player and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Backtracks embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the embedder script and data attributes. Paste any Backtracks link and get working embed HTML.'
    },
    {
      title: 'Episodes and shows',
      description:
        'Works with single episode players and full show players — the tool handles Backtracks player URLs.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Backtracks embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Backtracks player',
      description:
        'Get the real Backtracks audio player with cover art, playback controls, and timeline.'
    },
    {
      title: 'Responsive playback',
      description:
        'The player adapts to your layout so listeners can play episodes inline on any device.'
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
      question: 'How do I embed a Backtracks podcast player on my website?',
      answer:
        'Paste your Backtracks player URL into the tool and click Generate. You will get a ready-to-paste podcast player.'
    },
    {
      question: 'Can I embed a full show as well as a single episode?',
      answer:
        'Yes. Both single episode players and full show players from player.backtracks.fm are supported.'
    },
    {
      question: 'Will the player work on mobile?',
      answer:
        'Yes. The Backtracks player is responsive and adapts to your layout so listeners can play episodes on any device.'
    },
    {
      question: 'What if the player cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card with the title and cover image, which you can customize in Card mode.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const BacktracksPage = () => <ProviderSubtool {...data} />

export default BacktracksPage
