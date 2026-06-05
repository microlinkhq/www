import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Gloria.tv',
  slug: 'gloriatv',
  color: '#1A73E8',
  exampleUrl: 'https://gloria.tv/post/uufLZ3Xvo9hz33UBrRSSzjATS',
  metaTitle: 'Gloria.tv Embed Code Generator — Embed Catholic Videos',
  metaDescription:
    'Free Gloria.tv embed code generator. Paste any Gloria.tv URL — get ready-to-paste embed HTML for Catholic videos, homilies, and news posts. No signup.',
  keywords: [
    'embed gloria.tv',
    'gloria.tv embed code',
    'gloria.tv embed code generator',
    'embed gloria.tv video',
    'gloria.tv iframe code',
    'gloria.tv video embed',
    'embed catholic video'
  ],
  heroTitle: 'Gloria.tv Embed Code Generator',
  heroSubtitle:
    'Paste any Gloria.tv URL — get ready-to-paste embed HTML for Catholic videos, homilies, and news posts.',
  howItWorksHeading: 'How to embed a Gloria.tv video',
  howItWorksSteps: [
    {
      title: 'Paste a Gloria.tv link',
      description:
        'Copy any gloria.tv URL — video and post links from the Catholic video-sharing platform.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Gloria.tv content and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Gloria.tv embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual embed steps. Paste any Gloria.tv link and get working embed HTML.'
    },
    {
      title: 'Built for Catholic content',
      description:
        'Works with Gloria.tv videos, homilies, and news posts — the tool handles the URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Gloria.tv embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Gloria.tv player',
      description:
        'Get the real Gloria.tv player so visitors can watch the video right where you embed it.'
    },
    {
      title: 'Videos, homilies & news',
      description:
        'Embed homilies, Catholic news, and other content shared on the gloria.tv portal.'
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
      href: '/tools/embed-url/faithlifetv',
      label: 'Faithlife TV'
    },
    {
      href: '/tools/embed-url/dailymotion',
      label: 'Dailymotion'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Gloria.tv video on my website?',
      answer:
        'Paste any Gloria.tv URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'What kind of Gloria.tv content can I embed?',
      answer:
        'Gloria.tv is a Catholic video-sharing and news platform. You can embed its videos, homilies, and news posts.'
    },
    {
      question: 'What if the video cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card with the title and image that links to the original Gloria.tv page.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The generated embed adapts to the width of its container, so it works on desktop and mobile.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const GloriatvPage = () => <ProviderSubtool {...data} />

export default GloriatvPage
