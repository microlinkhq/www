import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Microsoft',
  slug: 'microsoft',
  color: '#5E5E5E',
  exampleUrl: 'https://www.microsoft.com/en-us/microsoft-365',
  metaTitle: 'Microsoft Embed Code Generator — Embed Microsoft Content',
  metaDescription:
    'Free Microsoft embed code generator. Paste any Microsoft URL — get a preview card with title, image, and description. No signup.',
  keywords: [
    'embed microsoft',
    'microsoft embed code',
    'microsoft embed generator',
    'microsoft preview card',
    'embed microsoft content',
    'microsoft embed html'
  ],
  heroTitle: 'Microsoft Embed Code Generator',
  heroSubtitle:
    'Paste any Microsoft URL — get a preview card with title, image, and description.',
  howItWorksHeading: 'How to embed Microsoft content',
  howItWorksSteps: [
    {
      title: 'Paste a Microsoft link',
      description: 'Copy any Microsoft URL — pages and documents.'
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
  explanationHeading: 'Why use our Microsoft embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Microsoft link and get working embed HTML.'
    },
    {
      title: 'All Microsoft content',
      description:
        'Works with pages and documents — the tool handles all Microsoft URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Microsoft embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Rich preview cards',
      description:
        'Get a styled preview card with title, image, and description from Microsoft pages.'
    },
    {
      title: 'Microsoft 365 & more',
      description:
        'Microsoft 365, Microsoft Learn, and product pages — all Microsoft domains work.'
    },
    {
      title: 'Clean metadata',
      description:
        'Title, description, and OpenGraph image are extracted from the page.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/microsoft-forms',
      label: 'Microsoft Forms'
    },
    {
      href: '/tools/embed-url/microsoft-sway',
      label: 'Microsoft Sway'
    },
    {
      href: '/tools/embed-url/google-docs',
      label: 'Google Docs'
    }
  ],
  faq: [
    {
      question: 'How do I embed Microsoft content?',
      answer: 'Paste any Microsoft URL into the tool and click Generate.'
    },
    {
      question: 'Does this work with Microsoft 365 documents?',
      answer:
        'For shareable documents, the tool generates the appropriate embed. Private docs show a preview card.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const MicrosoftPage = () => <ProviderSubtool {...data} />

export default MicrosoftPage
