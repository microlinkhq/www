import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Wave.video',
  slug: 'wavevideo',
  color: '#2D60FF',
  exampleUrl: 'https://wave.video',
  metaTitle: 'Wave.video Embed Code Generator — Embed Videos and live streams',
  metaDescription:
    'Free Wave.video embed code generator. Paste any Wave.video URL — get a ready-to-paste embed for videos and live streams. No signup.',
  keywords: ['embed wave video', 'wave video embed code', 'wave video embed'],
  heroTitle: 'Wave.video Embed Code Generator',
  heroSubtitle:
    'Paste any Wave.video URL — get a ready-to-paste embed for videos and live streams.',
  howItWorksHeading: 'How to embed Wave.video content',
  howItWorksSteps: [
    {
      title: 'Paste a Wave.video link',
      description: 'Copy any wave.video URL — videos and live streams.'
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
  explanationHeading: 'Why use our Wave.video embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Wave.video link and get working embed HTML.'
    },
    {
      title: 'All Wave.video content',
      description:
        'Works with videos and live streams — the tool handles all Wave.video URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Wave.video embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Wave.video embed with full interactivity when available.'
    },
    {
      title: 'All videos and live streams',
      description:
        'Works with videos and live streams — all Wave.video content types.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/embed/providers', label: 'All providers' }
  ],
  faq: [
    {
      question: 'How do I embed Wave.video content on my website?',
      answer:
        'Paste any Wave.video URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Wave.video embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Wave.video content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
