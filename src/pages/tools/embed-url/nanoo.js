import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'nanoo.tv',
  slug: 'nanoo',
  color: '#E2001A',
  exampleUrl: 'https://nanoo.tv',
  metaTitle: 'nanoo.tv Embed Code Generator — Embed Educational Video & Audio',
  metaDescription:
    'Free nanoo.tv embed code generator. Paste any nanoo.tv URL — get a ready-to-paste player for educational video and audio. No signup.',
  keywords: [
    'embed nanoo.tv',
    'nanoo.tv embed code',
    'nanoo.tv embed code generator',
    'embed nanoo video',
    'nanoo.tv iframe code',
    'nanoo.tv player embed',
    'embed educational video'
  ],
  heroTitle: 'nanoo.tv Embed Code Generator',
  heroSubtitle:
    'Paste any nanoo.tv URL — get a ready-to-paste player for educational video and audio.',
  howItWorksHeading: 'How to embed nanoo.tv content',
  howItWorksSteps: [
    {
      title: 'Paste a nanoo.tv link',
      description: 'Copy the URL of any nanoo.tv video or audio recording.'
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
  explanationHeading: 'Why use our nanoo.tv embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any nanoo.tv link and get working embed HTML in one step.'
    },
    {
      title: 'Made for teaching material',
      description:
        'Embed archived classroom video and audio so students can watch it inside your course page.'
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
      title: 'Video & audio player',
      description:
        'Embed nanoo.tv recordings as an inline player for video and audio teaching content.'
    },
    {
      title: 'Built for schools',
      description:
        'Drop archived media into learning platforms, course sites, and university pages.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' },
    { href: '/tools/embed-url/brightcove', label: 'Brightcove' },
    { href: '/tools/embed-url/vidyard', label: 'Vidyard' }
  ],
  faq: [
    {
      question: 'How do I embed nanoo.tv content on my website?',
      answer:
        'Paste the nanoo.tv URL into the tool and click Generate to get embeddable HTML.'
    },
    {
      question: 'What kind of nanoo.tv content can I embed?',
      answer:
        'Educational video and audio archived on nanoo.tv for teaching and learning.'
    },
    {
      question: 'Can I embed nanoo.tv media in a learning platform?',
      answer:
        'Yes — paste the generated HTML into your LMS, course page, or any HTML editor.'
    },
    {
      question: 'What if the nanoo.tv recording is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
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
