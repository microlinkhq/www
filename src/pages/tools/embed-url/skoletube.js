import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Skoletube',
  slug: 'skoletube',
  color: '#666666',
  exampleUrl: 'https://skoletube.dk',
  metaTitle: 'Skoletube Embed Code Generator — Embed Skoletube Content',
  metaDescription:
    'Free Skoletube embed code generator. Paste any Skoletube URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed skoletube',
    'skoletube embed code',
    'skoletube embed generator'
  ],
  heroTitle: 'Skoletube Embed Code Generator',
  heroSubtitle:
    'Paste any Skoletube URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Skoletube content',
  howItWorksSteps: [
    {
      title: 'Paste a Skoletube link',
      description: 'Copy any skoletube.dk URL.'
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
  explanationHeading: 'Why use our Skoletube embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Skoletube link and get working embed HTML.'
    },
    {
      title: 'Skoletube content',
      description: 'The tool handles all Skoletube URL formats.'
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
        'Get the real Skoletube embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Skoletube URL formats and content types.'
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
      question: 'How do I embed Skoletube content on my website?',
      answer: 'Paste any Skoletube URL into the tool and click Generate.'
    },
    {
      question: 'Is the Skoletube embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Skoletube content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
