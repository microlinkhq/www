import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Hippo Video',
  slug: 'hippovideo',
  color: '#666666',
  exampleUrl: 'https://hippovideo.io',
  metaTitle: 'Hippo Video Embed Code Generator — Embed Hippo Video Content',
  metaDescription:
    'Free Hippo Video embed code generator. Paste any Hippo Video URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed hippo video',
    'hippo video embed code',
    'hippo video embed generator'
  ],
  heroTitle: 'Hippo Video Embed Code Generator',
  heroSubtitle:
    'Paste any Hippo Video URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Hippo Video content',
  howItWorksSteps: [
    {
      title: 'Paste a Hippo Video link',
      description: 'Copy any hippovideo.io URL.'
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
  explanationHeading: 'Why use our Hippo Video embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Hippo Video link and get working embed HTML.'
    },
    {
      title: 'Hippo Video content',
      description: 'The tool handles all Hippo Video URL formats.'
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
        'Get the real Hippo Video embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Hippo Video URL formats and content types.'
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
      question: 'How do I embed Hippo Video content on my website?',
      answer: 'Paste any Hippo Video URL into the tool and click Generate.'
    },
    {
      question: 'Is the Hippo Video embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Hippo Video content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
