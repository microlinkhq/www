import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Ndla',
  slug: 'ndla',
  color: '#666666',
  exampleUrl: 'https://ndla.no',
  metaTitle: 'Ndla Embed Code Generator — Embed Ndla Content',
  metaDescription:
    'Free Ndla embed code generator. Paste any Ndla URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed ndla', 'ndla embed code', 'ndla embed generator'],
  heroTitle: 'Ndla Embed Code Generator',
  heroSubtitle:
    'Paste any Ndla URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Ndla content',
  howItWorksSteps: [
    { title: 'Paste a Ndla link', description: 'Copy any ndla.no URL.' },
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
  explanationHeading: 'Why use our Ndla embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Ndla link and get working embed HTML.'
    },
    {
      title: 'Ndla content',
      description: 'The tool handles all Ndla URL formats.'
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
        'Get the real Ndla embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Ndla URL formats and content types.'
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
      question: 'How do I embed Ndla content on my website?',
      answer: 'Paste any Ndla URL into the tool and click Generate.'
    },
    {
      question: 'Is the Ndla embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Ndla content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
