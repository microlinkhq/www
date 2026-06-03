import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Rumble',
  slug: 'rumble',
  color: '#85C742',
  exampleUrl: 'https://rumble.com/embed/vn7nxp/',
  metaTitle: 'Rumble Embed Code Generator — Embed Videos & Channels',
  metaDescription:
    'Free Rumble embed code generator. Paste any Rumble URL — get a ready-to-paste video player for videos and channels. No signup.',
  keywords: [
    'embed rumble',
    'rumble embed code',
    'rumble embed code generator',
    'embed rumble video',
    'rumble video embed',
    'rumble iframe code',
    'rumble player embed'
  ],
  heroTitle: 'Rumble Embed Code Generator',
  heroSubtitle:
    'Paste any Rumble URL — get a ready-to-paste video player for videos and channels.',
  howItWorksHeading: 'How to embed a Rumble video',
  howItWorksSteps: [
    {
      title: 'Paste a Rumble link',
      description:
        'Copy any rumble.com URL — individual videos or channel pages.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the video and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Rumble embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Rumble embed menu. Paste any Rumble link and get working embed HTML.'
    },
    {
      title: 'Videos and channels',
      description:
        'Works with individual videos and channel pages — the tool handles Rumble URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Rumble embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Rumble player',
      description:
        'Get the real Rumble video player with playback controls and full interactivity.'
    },
    {
      title: 'Responsive video embed',
      description:
        'The player scales to fit your layout, from inline placement to full-width feature slots.'
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
      href: '/tools/embed-url/dailymotion',
      label: 'Dailymotion'
    },
    {
      href: '/tools/embed-url/odysee',
      label: 'Odysee'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Rumble video on my website?',
      answer:
        'Paste any Rumble URL into the tool and click Generate. You will get a ready-to-paste video player you can drop into any HTML editor.'
    },
    {
      question: 'Can I embed a Rumble channel?',
      answer:
        'Yes. Both individual videos and channel pages are supported — the tool detects the content and generates the right embed.'
    },
    {
      question: 'Is the Rumble player responsive?',
      answer:
        'Yes. The embedded player scales to the width of its container, so it stays watchable on phones, tablets, and desktops.'
    },
    {
      question: 'What if the Rumble video is private or restricted?',
      answer:
        'When native embedding is not available, the tool falls back to a styled preview card with the title and image.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const RumblePage = () => <ProviderSubtool {...data} />

export default RumblePage
