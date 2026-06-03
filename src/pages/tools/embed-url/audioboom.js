import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Audioboom',
  slug: 'audioboom',
  color: '#1A1A1A',
  exampleUrl:
    'https://audioboom.com/posts/4285299-living-in-the-mountains-for-three-months',
  metaTitle: 'Audioboom Embed Code Generator — Embed Podcast Episodes',
  metaDescription:
    'Free Audioboom embed code generator. Paste an Audioboom URL — get a ready-to-paste player for podcast episodes and channels. No signup.',
  keywords: [
    'embed audioboom',
    'audioboom embed code',
    'audioboom embed code generator',
    'embed audioboom episode',
    'audioboom player embed',
    'audioboom iframe code',
    'embed audioboom podcast'
  ],
  heroTitle: 'Audioboom Embed Code Generator',
  heroSubtitle:
    'Paste an Audioboom URL — get a ready-to-paste player for podcast episodes and channels.',
  howItWorksHeading: 'How to embed Audioboom content',
  howItWorksSteps: [
    {
      title: 'Paste an Audioboom link',
      description:
        'Copy any audioboom.com URL — episode (post) links or channel pages.'
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
  explanationHeading: 'Why use our Audioboom embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip hunting for the embed button on Audioboom. Paste any link and get working embed HTML.'
    },
    {
      title: 'Episodes and channels',
      description:
        'Works with individual episodes and full podcast channels — the tool handles both Audioboom URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Audioboom embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Audioboom player',
      description:
        'Get the real Audioboom player with cover art, playback controls, and a scrubber.'
    },
    {
      title: 'Episodes and channels',
      description:
        'A single-episode player for inline listening or a channel player that lists a show’s latest episodes.'
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
      href: '/tools/embed-url/acast',
      label: 'Acast'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Audioboom episode on my website?',
      answer:
        'Paste an Audioboom episode URL into the tool and click Generate. You will get a ready-to-paste player you can drop into any page.'
    },
    {
      question: 'Can I embed a whole Audioboom channel?',
      answer:
        'Yes. Both individual episode (post) links and full channel pages are supported.'
    },
    {
      question: 'What happens if the native player cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card with the episode title and artwork, which you can customize in Card mode.'
    },
    {
      question: 'Is the embedded player responsive?',
      answer:
        'Yes. The Audioboom player scales to the width of its container, so it fits both desktop and mobile layouts.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const AudioboomPage = () => <ProviderSubtool {...data} />

export default AudioboomPage
