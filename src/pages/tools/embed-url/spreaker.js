import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Spreaker',
  slug: 'spreaker',
  color: '#C5202D',
  exampleUrl: 'https://www.spreaker.com/episode/12794242',
  metaTitle: 'Spreaker Embed Code Generator — Embed Podcast Episodes & Shows',
  metaDescription:
    'Free Spreaker embed code generator. Paste any Spreaker URL — get a ready-to-paste player for podcast episodes and shows. No signup.',
  keywords: [
    'embed spreaker',
    'spreaker embed code',
    'spreaker embed code generator',
    'embed spreaker episode',
    'embed spreaker podcast',
    'spreaker player embed',
    'spreaker iframe code'
  ],
  heroTitle: 'Spreaker Embed Code Generator',
  heroSubtitle:
    'Paste any Spreaker URL — get a ready-to-paste player for podcast episodes and shows.',
  howItWorksHeading: 'How to embed Spreaker content',
  howItWorksSteps: [
    {
      title: 'Paste a Spreaker link',
      description:
        'Copy any spreaker.com URL — single episode pages or full show pages.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects whether the link is an episode or a show and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Spreaker embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building the widget markup by hand. Paste any Spreaker link and get working embed HTML.'
    },
    {
      title: 'Episodes and shows',
      description:
        'Works with single-episode players and full-show players — the tool handles both Spreaker URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Spreaker embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Spreaker player',
      description:
        'Get the real Spreaker widget player with cover art and audio playback controls.'
    },
    {
      title: 'Responsive embeds',
      description:
        'The player fills its container width, so episode and show embeds fit any layout.'
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
      href: '/tools/embed-url/simplecast',
      label: 'Simplecast'
    },
    {
      href: '/tools/embed-url/soundcloud',
      label: 'SoundCloud'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Spreaker episode on my website?',
      answer:
        'Paste any Spreaker episode URL into the tool and click Generate. You will get a ready-to-paste player you can drop into any page.'
    },
    {
      question: 'Can I embed a whole Spreaker show?',
      answer:
        'Yes. Paste a show page URL and the tool generates a player for the show instead of a single episode.'
    },
    {
      question: 'Does the embed play the full episode?',
      answer:
        'Yes. The native Spreaker player streams the full episode audio with standard playback controls.'
    },
    {
      question: 'What if the episode is private or unlisted?',
      answer:
        'Native embedding needs a public episode. For restricted items, switch to Card mode to generate a styled preview card instead.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const SpreakerPage = () => <ProviderSubtool {...data} />

export default SpreakerPage
