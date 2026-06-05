import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Ustream',
  slug: 'ustream',
  color: '#3388FF',
  exampleUrl: 'https://video.ibm.com/recorded/132935304',
  metaTitle: 'Ustream Embed Code Generator — Embed Live Streams & Videos',
  metaDescription:
    'Free Ustream (IBM Video Streaming) embed code generator. Paste any video.ibm.com URL — get a ready-to-paste iframe player for live streams and recorded videos. No signup.',
  keywords: [
    'embed ustream',
    'ustream embed code',
    'ustream embed code generator',
    'embed ibm video streaming',
    'ustream iframe code',
    'ustream live stream embed',
    'embed ustream video'
  ],
  heroTitle: 'Ustream Embed Code Generator',
  heroSubtitle:
    'Paste any Ustream URL — now IBM Video Streaming — to get a ready-to-paste iframe player for live streams and recorded videos.',
  howItWorksHeading: 'How to embed a Ustream video',
  howItWorksSteps: [
    {
      title: 'Paste a Ustream link',
      description:
        'Copy any Ustream or IBM Video Streaming URL from video.ibm.com — live channels or recorded videos.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the stream or recording and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Ustream embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Share menu. Paste any Ustream link and get working embed HTML.'
    },
    {
      title: 'Live and recorded',
      description:
        'Works with live channels and recorded video-on-demand from IBM Video Streaming, the platform formerly known as Ustream.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Ustream embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native IBM Video player',
      description:
        'Get the real IBM Video Streaming player with playback controls and live or on-demand viewing.'
    },
    {
      title: 'Responsive iframe',
      description:
        'The embed scales to fit your layout so live streams and recordings look right on any screen.'
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
      href: '/tools/embed-url/vimeo',
      label: 'Vimeo'
    },
    {
      href: '/tools/embed-url/brightcove',
      label: 'Brightcove'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Ustream video on my website?',
      answer:
        'Paste any Ustream or IBM Video Streaming URL into the tool and click Generate. You will get a ready-to-paste iframe player.'
    },
    {
      question: 'Is Ustream the same as IBM Video Streaming?',
      answer:
        'Yes. Ustream was acquired by IBM and rebranded as IBM Video Streaming, so links now live on video.ibm.com. This tool handles both.'
    },
    {
      question: 'Can I embed live streams as well as recordings?',
      answer:
        'Yes. Both live channels and recorded videos-on-demand are supported.'
    },
    {
      question: 'What if a video cannot be embedded?',
      answer:
        'If native embedding is restricted, the tool falls back to a styled preview card with the title and thumbnail that links to the video.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const UstreamPage = () => <ProviderSubtool {...data} />

export default UstreamPage
