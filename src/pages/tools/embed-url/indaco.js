import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Indaco',
  slug: 'indaco',
  color: '#1B4F8A',
  exampleUrl: 'https://player.indacolive.com',
  metaTitle: 'Indaco Embed Code Generator — Embed Live & On-Demand Video',
  metaDescription:
    'Free Indaco embed code generator. Paste any Indaco Live URL — get a ready-to-paste player for live streams and on-demand video. No signup.',
  keywords: [
    'embed indaco',
    'indaco embed code',
    'indaco embed code generator',
    'embed indaco live',
    'indaco iframe code',
    'indaco live stream embed',
    'indaco video embed'
  ],
  heroTitle: 'Indaco Embed Code Generator',
  heroSubtitle:
    'Paste any Indaco Live URL — get a ready-to-paste player for live streams and on-demand video.',
  howItWorksHeading: 'How to embed Indaco content',
  howItWorksSteps: [
    {
      title: 'Paste an Indaco link',
      description:
        'Copy any player.indacolive.com URL — a live stream or on-demand video.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the stream and generates the right player embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Indaco embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Indaco Live link and get working player embed HTML instantly.'
    },
    {
      title: 'Live & on-demand',
      description:
        'Works with Indaco Live streams as well as recorded on-demand video.'
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
      title: 'Native Indaco player',
      description:
        'Get the real Indaco Live player with its playback controls and live indicator.'
    },
    {
      title: 'Streams & recordings',
      description:
        'Live broadcasts and on-demand recordings from Indaco Live both embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and thumbnail when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/ustream',
      label: 'Ustream'
    },
    {
      href: '/tools/embed-url/vidyard',
      label: 'Vidyard'
    },
    {
      href: '/tools/embed-url/brightcove',
      label: 'Brightcove'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Indaco video on my website?',
      answer:
        'Paste any Indaco Live URL into the tool and click Generate. You will get a ready-to-paste player.'
    },
    {
      question: 'What is Indaco?',
      answer:
        'Indaco Live is a streaming platform for broadcasting live events and serving on-demand video.'
    },
    {
      question: 'Can I embed both live streams and recordings?',
      answer:
        'Yes. Live broadcasts and on-demand recordings are both supported — just paste the link.'
    },
    {
      question: 'What if a video cannot be embedded?',
      answer:
        'Switch to Card mode to get a styled preview card with the title and thumbnail instead.'
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
