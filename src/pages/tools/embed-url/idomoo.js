import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Idomoo',
  slug: 'idomoo',
  color: '#2D9CDB',
  exampleUrl: 'https://idomoo.com',
  metaTitle: 'Idomoo Embed Code Generator — Embed Personalized Videos',
  metaDescription:
    'Free Idomoo embed code generator. Paste any Idomoo URL — get a ready-to-paste player for personalized and data-driven videos. No signup.',
  keywords: [
    'embed idomoo',
    'idomoo embed code',
    'idomoo embed code generator',
    'embed personalized video',
    'idomoo iframe code',
    'idomoo video embed',
    'data-driven video embed'
  ],
  heroTitle: 'Idomoo Embed Code Generator',
  heroSubtitle:
    'Paste any Idomoo URL — get a ready-to-paste player for personalized and data-driven videos.',
  howItWorksHeading: 'How to embed Idomoo content',
  howItWorksSteps: [
    {
      title: 'Paste an Idomoo link',
      description:
        'Copy any Idomoo video URL — a personalized or data-driven video.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the video and generates the right player embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Idomoo embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Idomoo link and get working player embed HTML instantly.'
    },
    {
      title: 'Personalized video',
      description:
        'Works with Idomoo personalized and data-driven videos generated from its video platform.'
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
      title: 'Native Idomoo player',
      description:
        'Get the real Idomoo player with playback controls and any interactive elements intact.'
    },
    {
      title: 'Personalized & data-driven',
      description:
        'Personalized videos and data-driven scenes from the Idomoo platform all embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and thumbnail when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/vidyard',
      label: 'Vidyard'
    },
    {
      href: '/tools/embed-url/wistia',
      label: 'Wistia'
    },
    {
      href: '/tools/embed-url/sproutvideo',
      label: 'SproutVideo'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Idomoo video on my website?',
      answer:
        'Paste any Idomoo video URL into the tool and click Generate. You will get a ready-to-paste player.'
    },
    {
      question: 'What is Idomoo?',
      answer:
        'Idomoo is a video platform for generating personalized and data-driven videos at scale.'
    },
    {
      question: 'Does the embed use the real Idomoo player?',
      answer:
        'Yes. You get the native Idomoo player with its playback controls and interactive elements.'
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
