import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Audio.com',
  slug: 'audiocom',
  color: '#666666',
  exampleUrl: 'https://audio.com',
  metaTitle: 'Audio.com Embed Code Generator — Embed Audio.com Content',
  metaDescription:
    'Free Audio.com embed code generator. Paste any Audio.com URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed audio.com',
    'audio.com embed code',
    'audio.com embed generator'
  ],
  heroTitle: 'Audio.com Embed Code Generator',
  heroSubtitle:
    'Paste any Audio.com URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Audio.com content',
  howItWorksSteps: [
    { title: 'Paste a Audio.com link', description: 'Copy any audio.com URL.' },
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
  explanationHeading: 'Why use our Audio.com embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Audio.com link and get working embed HTML.'
    },
    {
      title: 'Audio.com content',
      description: 'The tool handles all Audio.com URL formats.'
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
        'Get the real Audio.com embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Audio.com URL formats and content types.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/embed/providers', label: 'All providers' }
  ],
  faq: [
    {
      question: 'How do I embed Audio.com content on my website?',
      answer: 'Paste any Audio.com URL into the tool and click Generate.'
    },
    {
      question: 'Is the Audio.com embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Audio.com content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
