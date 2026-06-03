import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'AfreecaTV',
  slug: 'afreecatv',
  color: '#0045FF',
  exampleUrl: 'https://vod.afreecatv.com/player/45221914',
  metaTitle: 'AfreecaTV Embed Code Generator — Embed Live Streams & VOD',
  metaDescription:
    'Free AfreecaTV (SOOP) embed code generator. Paste any AfreecaTV URL — get a ready-to-paste player for live streams and VOD replays. No signup.',
  keywords: [
    'embed afreecatv',
    'afreecatv embed code',
    'afreecatv embed code generator',
    'embed afreecatv live stream',
    'afreecatv iframe code',
    'afreecatv player embed',
    'embed afreecatv vod',
    'embed soop video'
  ],
  heroTitle: 'AfreecaTV Embed Code Generator',
  heroSubtitle:
    'Paste any AfreecaTV (SOOP) URL — get a ready-to-paste player for live streams and VOD replays.',
  howItWorksHeading: 'How to embed an AfreecaTV video',
  howItWorksSteps: [
    {
      title: 'Paste an AfreecaTV link',
      description:
        'Copy any afreecatv.com or sooplive.co.kr URL — live channels or VOD replays.'
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
  explanationHeading: 'Why use our AfreecaTV embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any AfreecaTV link and get working embed HTML.'
    },
    {
      title: 'Live streams and VOD',
      description:
        'Works with live broadcasts and on-demand replays — the tool handles AfreecaTV and SOOP URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 AfreecaTV embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native AfreecaTV player',
      description:
        'Get the real AfreecaTV player for live broadcasts and VOD replays with playback controls.'
    },
    {
      title: 'Responsive embed',
      description:
        'The player adapts to your layout so streams and replays look right on any screen size.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/sooplive',
      label: 'SoopLive'
    },
    {
      href: '/tools/embed-url/kakaotv',
      label: 'KakaoTV'
    },
    {
      href: '/tools/embed-url/naver-tv',
      label: 'Naver TV'
    }
  ],
  faq: [
    {
      question: 'How do I embed an AfreecaTV video on my website?',
      answer:
        'Paste any AfreecaTV URL into the tool and click Generate. You will get a ready-to-paste player.'
    },
    {
      question: 'Does it work with SOOP URLs?',
      answer:
        'Yes. AfreecaTV rebranded to SOOP, so both afreecatv.com and sooplive.co.kr links are supported.'
    },
    {
      question: 'Can I embed live streams and VOD replays?',
      answer:
        'Yes. Both live broadcasts and on-demand VOD replays are supported.'
    },
    {
      question: 'What if the AfreecaTV content is private or offline?',
      answer:
        'The tool falls back to a styled preview card with the available title and image.'
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
