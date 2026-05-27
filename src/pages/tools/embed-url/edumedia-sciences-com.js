import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'EduMedia',
  slug: 'edumedia-sciences-com',
  color: '#666666',
  exampleUrl: 'https://edumedia-sciences.com',
  metaTitle: 'EduMedia Embed Code Generator — Embed EduMedia Content',
  metaDescription:
    'Free EduMedia embed code generator. Paste any EduMedia URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed edumedia',
    'edumedia embed code',
    'edumedia embed generator'
  ],
  heroTitle: 'EduMedia Embed Code Generator',
  heroSubtitle:
    'Paste any EduMedia URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed EduMedia content',
  howItWorksSteps: [
    {
      title: 'Paste a EduMedia link',
      description: 'Copy any edumedia-sciences.com URL.'
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
  explanationHeading: 'Why use our EduMedia embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any EduMedia link and get working embed HTML.'
    },
    {
      title: 'EduMedia content',
      description: 'The tool handles all EduMedia URL formats.'
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
        'Get the real EduMedia embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all EduMedia URL formats and content types.'
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
      question: 'How do I embed EduMedia content on my website?',
      answer: 'Paste any EduMedia URL into the tool and click Generate.'
    },
    {
      question: 'Is the EduMedia embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the EduMedia content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
