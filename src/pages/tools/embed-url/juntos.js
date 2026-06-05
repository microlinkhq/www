import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Juntos',
  slug: 'juntos',
  color: '#7B2FF7',
  exampleUrl: 'https://juntos.live',
  metaTitle: 'Juntos Embed Code Generator — Embed Live Streams & Events',
  metaDescription:
    'Free Juntos embed code generator. Paste any Juntos URL — get a ready-to-paste player for live streams and virtual events. No signup.',
  keywords: [
    'embed juntos',
    'juntos embed code',
    'juntos embed code generator',
    'embed juntos live',
    'juntos iframe code',
    'juntos live stream embed',
    'embed virtual event'
  ],
  heroTitle: 'Juntos Embed Code Generator',
  heroSubtitle:
    'Paste any Juntos URL — get a ready-to-paste player for live streams and virtual events.',
  howItWorksHeading: 'How to embed Juntos content',
  howItWorksSteps: [
    {
      title: 'Paste a Juntos link',
      description: 'Copy any juntos.live URL — a live stream or event.'
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
  explanationHeading: 'Why use our Juntos embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Juntos link and get working player embed HTML instantly.'
    },
    {
      title: 'Streams & events',
      description:
        'Works with Juntos live streams and the virtual events hosted on the platform.'
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
      title: 'Native Juntos player',
      description:
        'Get the real Juntos player with its playback controls and live indicator.'
    },
    {
      title: 'Live & on-demand',
      description:
        'Live broadcasts and recorded events from Juntos both embed cleanly.'
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
      question: 'How do I embed a Juntos stream on my website?',
      answer:
        'Paste any Juntos URL into the tool and click Generate. You will get a ready-to-paste player.'
    },
    {
      question: 'What Juntos content can I embed?',
      answer: 'Live streams and virtual events hosted on Juntos.'
    },
    {
      question: 'Can I embed both live and recorded events?',
      answer:
        'Yes. Live broadcasts and recorded events are both supported — just paste the link.'
    },
    {
      question: 'What if a stream cannot be embedded?',
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
