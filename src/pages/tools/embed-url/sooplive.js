import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'SOOP',
  slug: 'sooplive',
  color: '#0F62FE',
  exampleUrl: 'https://sooplive.co.kr',
  metaTitle: 'SOOP Embed Code Generator — Embed Live Streams & VODs',
  metaDescription:
    'Free SOOP embed code generator. Paste any SOOP (formerly AfreecaTV) URL — get a ready-to-paste embed for live streams and VODs. No signup.',
  keywords: [
    'embed soop',
    'soop embed code',
    'soop embed code generator',
    'embed soop live stream',
    'soop iframe code',
    'embed afreecatv',
    'embed soop vod'
  ],
  heroTitle: 'SOOP Embed Code Generator',
  heroSubtitle:
    'Paste any SOOP URL — get a ready-to-paste embed for live streams and VODs from the platform formerly known as AfreecaTV.',
  howItWorksHeading: 'How to embed SOOP content',
  howItWorksSteps: [
    {
      title: 'Paste a SOOP link',
      description: 'Copy any SOOP URL — a live broadcast or a saved VOD.'
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
  explanationHeading: 'Why use our SOOP embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any SOOP link and get working embed HTML without wrestling with the player markup.'
    },
    {
      title: 'Built for live and esports',
      description:
        'Drop live gaming broadcasts and esports streams straight into match pages, recaps, or team sites.'
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
      title: 'Live stream embeds',
      description:
        'Embed an in-progress SOOP broadcast so visitors can watch the live feed inline.'
    },
    {
      title: 'VOD playback',
      description:
        'Works with saved VODs so past streams stay watchable on your page.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/ustream', label: 'Ustream' },
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' }
  ],
  faq: [
    {
      question: 'How do I embed a SOOP live stream on my website?',
      answer:
        'Paste the SOOP broadcast URL into the tool and click Generate. You get ready-to-paste embed HTML for the live feed.'
    },
    {
      question: 'Can I embed a SOOP VOD?',
      answer:
        'Yes. Paste a VOD URL and the tool produces an embed that plays the recorded stream.'
    },
    {
      question: 'Is SOOP the same as AfreecaTV?',
      answer:
        'Yes. SOOP is the rebranded name of AfreecaTV, and the tool handles its stream and VOD URLs.'
    },
    {
      question: 'What if the SOOP stream is offline or restricted?',
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
