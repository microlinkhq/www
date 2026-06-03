import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: '3Q',
  slug: '3q',
  color: '#0066CC',
  exampleUrl: 'https://3q.video/en',
  metaTitle: '3Q Embed Code Generator — Embed Videos & Live Streams',
  metaDescription:
    'Free 3Q embed code generator. Paste a 3q.video or 3qsdn.com URL — get a ready-to-paste iframe player for videos, live streams, and webcasts. No signup.',
  keywords: [
    'embed 3q',
    '3q embed code',
    '3q embed code generator',
    'embed 3q video',
    '3q iframe code',
    '3q player embed',
    'embed 3q live stream',
    '3qsdn embed'
  ],
  heroTitle: '3Q Embed Code Generator',
  heroSubtitle:
    'Paste a 3Q URL — get a ready-to-paste iframe player for videos, live streams, and webcasts.',
  howItWorksHeading: 'How to embed a 3Q video',
  howItWorksSteps: [
    {
      title: 'Paste a 3Q link',
      description:
        'Copy any 3q.video or 3qsdn.com URL — on-demand videos, live streams, and webcasts.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the 3Q player and generates the right iframe embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our 3Q embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the 3Q dashboard for embed snippets. Paste any 3Q link and get working iframe HTML.'
    },
    {
      title: 'Videos and live streams',
      description:
        'Works with on-demand videos, 24/7 live streams, and webcasts hosted on the 3Q streaming platform.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 3Q embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native 3Q player',
      description:
        'Get the real 3Q video player with playback controls and full-screen support.'
    },
    {
      title: 'On-demand and live',
      description:
        'Embed hosted video-on-demand, live streams, and webcasts — the GDPR-compliant 3Q content types.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/brightcove',
      label: 'Brightcove'
    },
    {
      href: '/tools/embed-url/vidyard',
      label: 'Vidyard'
    },
    {
      href: '/tools/embed-url/wistia',
      label: 'Wistia'
    }
  ],
  faq: [
    {
      question: 'How do I embed a 3Q video on my website?',
      answer:
        'Paste any 3q.video or 3qsdn.com URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'Can I embed 3Q live streams?',
      answer:
        'Yes. On-demand videos, live streams, and webcasts hosted on the 3Q platform are all supported.'
    },
    {
      question: 'What if the 3Q video is private or restricted?',
      answer:
        'The tool falls back to a styled preview card with the available title and image when native embedding is restricted.'
    },
    {
      question: 'Does the embed work responsively?',
      answer:
        'Yes. The 3Q player iframe scales to fit your layout on desktop and mobile.'
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
