import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Official Fm',
  slug: 'official-fm',
  color: '#666666',
  exampleUrl: 'https://official.fm',
  metaTitle: 'Official Fm Embed Code Generator — Embed Official Fm Content',
  metaDescription:
    'Free Official Fm embed code generator. Paste any Official Fm URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed official fm',
    'official fm embed code',
    'official fm embed generator'
  ],
  heroTitle: 'Official Fm Embed Code Generator',
  heroSubtitle:
    'Paste any Official Fm URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Official Fm content',
  howItWorksSteps: [
    {
      title: 'Paste a Official Fm link',
      description: 'Copy any official.fm URL.'
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
  explanationHeading: 'Why use our Official Fm embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Official Fm link and get working embed HTML.'
    },
    {
      title: 'Official Fm content',
      description: 'The tool handles all Official Fm URL formats.'
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
        'Get the real Official Fm embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Official Fm URL formats and content types.'
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
      question: 'How do I embed Official Fm content on my website?',
      answer: 'Paste any Official Fm URL into the tool and click Generate.'
    },
    {
      question: 'Is the Official Fm embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Official Fm content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
