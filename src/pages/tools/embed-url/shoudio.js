import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Shoudio',
  slug: 'shoudio',
  color: '#E91E63',
  exampleUrl: 'https://shoudio.com',
  metaTitle: 'Shoudio Embed Code Generator — Embed Geo-Tagged Audio',
  metaDescription:
    'Free Shoudio embed code generator. Paste any Shoudio URL — get a ready-to-paste player for location-based audio and soundscapes. No signup.',
  keywords: [
    'embed shoudio',
    'shoudio embed code',
    'shoudio embed code generator',
    'embed shoudio audio',
    'shoudio iframe code',
    'shoudio player embed',
    'embed shoudio soundscape'
  ],
  heroTitle: 'Shoudio Embed Code Generator',
  heroSubtitle:
    'Paste any Shoudio URL — get a ready-to-paste player for location-based audio and geo-tagged soundscapes.',
  howItWorksHeading: 'How to embed Shoudio audio',
  howItWorksSteps: [
    {
      title: 'Paste a Shoudio link',
      description:
        'Copy the URL of any Shoudio recording or soundscape and paste it into the tool.'
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
  explanationHeading: 'Why use our Shoudio embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Shoudio link and get working embed HTML without digging through share menus.'
    },
    {
      title: 'Built for geo-tagged audio',
      description:
        'Handles location-based recordings and soundscapes so the player loads cleanly on your page.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Location-based audio player',
      description:
        'Embeds Shoudio recordings tied to a place so listeners hear the soundscape in context.'
    },
    {
      title: 'Responsive player',
      description:
        'The generated embed scales to fit articles, sidebars, and mobile layouts.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/soundcloud', label: 'SoundCloud' },
    { href: '/tools/embed-url/spotify', label: 'Spotify' },
    { href: '/tools/embed-url/audiomack', label: 'Audiomack' }
  ],
  faq: [
    {
      question: 'How do I embed a Shoudio recording on my website?',
      answer:
        'Paste the Shoudio URL into the tool, click Generate, then copy the embed HTML into your page.'
    },
    {
      question: 'Can I embed location-based soundscapes?',
      answer:
        'Yes. The tool works with Shoudio geo-tagged audio and soundscapes, generating a player you can drop anywhere.'
    },
    {
      question: 'Does the player work on mobile?',
      answer:
        'Yes. The generated embed is responsive and adapts to phones, tablets, and desktop layouts.'
    },
    {
      question: 'What if the Shoudio audio is private?',
      answer:
        'The tool falls back to a styled preview card with whatever metadata is available.'
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
