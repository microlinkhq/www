import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'V LIVE',
  slug: 'vlive',
  color: '#18D6B0',
  exampleUrl: 'https://vlive.tv',
  metaTitle: 'V LIVE Embed Code Generator — Embed V LIVE Broadcasts',
  metaDescription:
    'Free V LIVE embed code generator. Paste any V LIVE URL — get a ready-to-paste player for broadcasts and videos. No signup.',
  keywords: [
    'embed vlive',
    'vlive embed code',
    'vlive embed code generator',
    'embed vlive video',
    'vlive iframe code',
    'vlive player embed',
    'vlive broadcast embed'
  ],
  heroTitle: 'V LIVE Embed Code Generator',
  heroSubtitle:
    'Paste any V LIVE URL — get a ready-to-paste player for celebrity broadcasts and videos.',
  howItWorksHeading: 'How to embed V LIVE videos',
  howItWorksSteps: [
    {
      title: 'Paste a V LIVE link',
      description:
        'Copy the URL of any V LIVE broadcast or video and paste it into the box.'
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
  explanationHeading: 'Why use our V LIVE embed code generator',
  reasons: [
    {
      title: 'Made for fan posts',
      description:
        'Share celebrity and K-pop broadcasts in your fan blog or wiki without writing any embed markup.'
    },
    {
      title: 'Handles broadcasts and videos',
      description:
        'Works with both live broadcast replays and regular V LIVE videos from a single pasted link.'
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
      title: 'Native broadcast embed',
      description:
        'Get the real V LIVE player with full playback controls when embedding is supported.'
    },
    {
      title: 'Blog and wiki ready',
      description:
        'Lightweight iframe HTML drops cleanly into fan blogs, wikis, and CMS editors.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/sooplive', label: 'SOOP Live' },
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/znipe', label: 'Znipe' }
  ],
  faq: [
    {
      question: 'How do I embed a V LIVE video on my website?',
      answer:
        'Paste the V LIVE URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Can I embed both broadcasts and regular videos?',
      answer:
        'Yes. The tool handles live broadcast replays and standard V LIVE videos from a single link.'
    },
    {
      question: 'Will old V LIVE links still work?',
      answer:
        'When a video is no longer available, the tool falls back to a styled preview card with the saved metadata.'
    },
    {
      question: 'Can I customize how the embed looks?',
      answer:
        'Use Card mode to adjust colors, fonts, and layout, or use the native player for full playback controls.'
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
