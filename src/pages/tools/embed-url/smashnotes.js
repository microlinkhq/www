import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Smashnotes',
  slug: 'smashnotes',
  color: '#FF5252',
  exampleUrl: 'https://smashnotes.com',
  metaTitle: 'Smashnotes Embed Code Generator — Embed Podcast Highlights',
  metaDescription:
    'Free Smashnotes embed code generator. Paste any Smashnotes URL — get a ready-to-paste player for podcast highlights and clips. No signup.',
  keywords: [
    'embed smashnotes',
    'smashnotes embed code',
    'smashnotes embed code generator',
    'embed smashnotes clip',
    'smashnotes iframe code',
    'smashnotes podcast embed',
    'embed podcast highlight'
  ],
  heroTitle: 'Smashnotes Embed Code Generator',
  heroSubtitle:
    'Paste any Smashnotes URL — get a ready-to-paste player for podcast highlights, clips, and key moments.',
  howItWorksHeading: 'How to embed Smashnotes clips',
  howItWorksSteps: [
    {
      title: 'Paste a Smashnotes link',
      description:
        'Copy the URL of any Smashnotes highlight or clip and paste it into the tool.'
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
  explanationHeading: 'Why use our Smashnotes embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Smashnotes link and get working embed HTML without copying share code by hand.'
    },
    {
      title: 'Built for podcast clips',
      description:
        'Handles Smashnotes highlights and key moments so short clips load cleanly on your page.'
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
      title: 'Podcast highlight player',
      description:
        'Embeds Smashnotes clips so readers can play the key moment without leaving your page.'
    },
    {
      title: 'Shareable short clips',
      description:
        'Drop a single highlight into articles or show notes instead of a full episode.'
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
    { href: '/tools/embed-url/saooti', label: 'Saooti' }
  ],
  faq: [
    {
      question: 'How do I embed a Smashnotes clip on my website?',
      answer:
        'Paste the Smashnotes URL into the tool, click Generate, then copy the embed HTML into your page.'
    },
    {
      question: 'Can I embed a single podcast highlight?',
      answer:
        'Yes. The tool works with Smashnotes highlights and clips so you can share one key moment at a time.'
    },
    {
      question: 'Does the clip player work on mobile?',
      answer:
        'Yes. The generated embed is responsive and adapts to phones, tablets, and desktop layouts.'
    },
    {
      question: 'What if the Smashnotes clip is unavailable?',
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
