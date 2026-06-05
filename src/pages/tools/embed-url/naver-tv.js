import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Naver TV',
  slug: 'naver-tv',
  color: '#03C75A',
  exampleUrl: 'https://tv.naver.com/v/81652',
  metaTitle: 'Naver TV Embed Code Generator — Embed Videos & Channels',
  metaDescription:
    'Free Naver TV embed code generator. Paste any tv.naver.com URL — get ready-to-paste embed HTML for videos, clips, and channels. No signup.',
  keywords: [
    'embed naver tv',
    'naver tv embed code',
    'naver tv embed code generator',
    'embed naver tv video',
    'naver tv iframe code',
    'naver tv player embed',
    'embed tv.naver.com video',
    'naver tv channel embed'
  ],
  heroTitle: 'Naver TV Embed Code Generator',
  heroSubtitle:
    'Paste any Naver TV URL — get ready-to-paste embed HTML for videos, clips, and channels from tv.naver.com.',
  howItWorksHeading: 'How to embed a Naver TV video',
  howItWorksSteps: [
    {
      title: 'Paste a Naver TV link',
      description:
        'Copy any tv.naver.com URL — video and clip links like /v/, plus channel pages.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Naver TV content and generates the right embed HTML.'
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
      title: 'Korean video, made easy',
      description:
        'Naver TV is a Korean video platform — drop in a link and embed its videos and clips without a Korean account.'
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
      title: 'Native Naver TV player',
      description:
        'Get the real Naver TV player so visitors can watch the video right on your page.'
    },
    {
      title: 'Videos, clips & channels',
      description:
        'Works with Naver TV video and clip pages as well as channel links.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/kakaotv',
      label: 'Kakao TV'
    },
    {
      href: '/tools/embed-url/youtube',
      label: 'YouTube'
    },
    {
      href: '/tools/embed-url/afreecatv',
      label: 'AfreecaTV'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Naver TV video on my website?',
      answer:
        'Paste any tv.naver.com URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'Can I embed a Naver TV channel?',
      answer:
        'Yes. Both individual video and clip links and channel pages from tv.naver.com are supported.'
    },
    {
      question: 'What happens if a video cannot be embedded?',
      answer:
        'If native embedding is restricted, the tool falls back to a styled preview card with the video title and thumbnail that links back to Naver TV.'
    },
    {
      question: 'Do I need a Naver account to embed videos?',
      answer:
        'No. You just paste the public Naver TV URL — no Naver login or API key is required.'
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
