import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'VLIPSY',
  slug: 'vlipsy',
  color: '#6C5CE7',
  exampleUrl: 'https://vlipsy.com',
  metaTitle: 'VLIPSY Embed Code Generator — Embed Short Video Clips',
  metaDescription:
    'Free VLIPSY embed code generator. Paste any VLIPSY URL — get a ready-to-paste player for short, shareable video clips. No signup.',
  keywords: [
    'embed vlipsy',
    'vlipsy embed code',
    'vlipsy embed code generator',
    'embed vlipsy clip',
    'vlipsy iframe code',
    'vlipsy player embed',
    'vlipsy video clip embed'
  ],
  heroTitle: 'VLIPSY Embed Code Generator',
  heroSubtitle:
    'Paste any VLIPSY URL — get a ready-to-paste player for short, shareable clips, reactions, and quotes.',
  howItWorksHeading: 'How to embed VLIPSY clips',
  howItWorksSteps: [
    {
      title: 'Paste a VLIPSY link',
      description: 'Copy the URL of any VLIPSY clip and paste it into the box.'
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
  explanationHeading: 'Why use our VLIPSY embed code generator',
  reasons: [
    {
      title: 'Perfect for short clips',
      description:
        'Drop in reaction clips, quotes, and memorable moments without writing any markup yourself.'
    },
    {
      title: 'Lightweight player',
      description:
        'Short VLIPSY clips embed as a compact looping player that fits neatly inside posts and chats.'
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
      title: 'Native clip embed',
      description:
        'Get the real VLIPSY player with full playback controls when embedding is supported.'
    },
    {
      title: 'Compact responsive markup',
      description:
        'Lightweight iframe HTML keeps short clips snappy in blogs, forums, and CMS editors.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/streamable', label: 'Streamable' },
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/sudomemo', label: 'Sudomemo' }
  ],
  faq: [
    {
      question: 'How do I embed a VLIPSY clip on my website?',
      answer:
        'Paste the VLIPSY clip URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Are VLIPSY clips good for reactions and quotes?',
      answer:
        'Yes. VLIPSY focuses on short, shareable moments, and the compact player is ideal for posts and chats.'
    },
    {
      question: 'Can I customize how the embed looks?',
      answer:
        'Use Card mode to adjust colors, fonts, and layout, or use the native player for full playback controls.'
    },
    {
      question: 'What if the VLIPSY clip cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card built from the available metadata.'
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
