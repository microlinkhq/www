import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'KakaoTV',
  slug: 'kakaotv',
  color: '#666666',
  exampleUrl: 'https://tv.kakao.com',
  metaTitle: 'KakaoTV Embed Code Generator — Embed KakaoTV Content',
  metaDescription:
    'Free KakaoTV embed code generator. Paste any KakaoTV URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed kakaotv', 'kakaotv embed code', 'kakaotv embed generator'],
  heroTitle: 'KakaoTV Embed Code Generator',
  heroSubtitle:
    'Paste any KakaoTV URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed KakaoTV content',
  howItWorksSteps: [
    {
      title: 'Paste a KakaoTV link',
      description: 'Copy any tv.kakao.com URL.'
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
  explanationHeading: 'Why use our KakaoTV embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any KakaoTV link and get working embed HTML.'
    },
    {
      title: 'KakaoTV content',
      description: 'The tool handles all KakaoTV URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description: 'Generate up to 50 embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real KakaoTV embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all KakaoTV URL formats and content types.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/providers', label: 'All providers' }
  ],
  faq: [
    {
      question: 'How do I embed KakaoTV content on my website?',
      answer: 'Paste any KakaoTV URL into the tool and click Generate.'
    },
    {
      question: 'Is the KakaoTV embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the KakaoTV content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
