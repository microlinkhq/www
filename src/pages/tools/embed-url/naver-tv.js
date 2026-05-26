import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Naver TV',
  slug: 'naver-tv',
  color: '#03C75A',
  exampleUrl: 'https://tv.naver.com/v/1234567',
  metaTitle: 'Naver TV Embed Code Generator — Embed Korean Videos',
  metaDescription:
    'Free Naver TV embed code generator. Paste any Naver TV URL — get a ready-to-paste iframe or preview card. No signup.',
  keywords: [
    'embed naver tv',
    'naver tv embed code',
    'naver tv embed generator',
    'naver video embed',
    'embed naver tv video',
    'naver tv iframe'
  ],
  heroTitle: 'Naver TV Embed Code Generator',
  heroSubtitle:
    'Free Naver TV embed code generator. Paste any Naver TV URL — get a ready-to-paste iframe or preview card.',
  howItWorksHeading: 'How to embed Naver TV content',
  howItWorksSteps: [
    {
      title: 'Paste a Naver TV link',
      description: 'Copy any Naver TV URL — videos and channels.'
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
  explanationHeading: 'Why use our Naver TV embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Naver TV link and get working embed HTML.'
    },
    {
      title: 'All Naver TV content',
      description:
        'Works with videos and channels — the tool handles all Naver TV URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Naver TV embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Naver player',
      description:
        'Get the real Naver TV video player with full playback controls.'
    },
    {
      title: 'Any Naver TV link',
      description:
        'Regular videos, live streams, and channel content — the tool handles all Naver TV formats.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled card with thumbnail and title when direct embedding is not available.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/youtube',
      label: 'YouTube'
    },
    {
      href: '/tools/embed-url/bilibili',
      label: 'Bilibili'
    },
    {
      href: '/tools/embed-url/vimeo',
      label: 'Vimeo'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Naver TV video?',
      answer:
        'Paste any Naver TV URL into the tool and click Generate to get the embed code.'
    },
    {
      question: 'Does this work with Naver TV live streams?',
      answer: 'Yes. Live streams and recorded videos are both supported.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const NavertvPage = () => <ProviderSubtool {...data} />

export default NavertvPage
