import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Bumper',
  slug: 'bumper',
  color: '#666666',
  exampleUrl: 'https://bumper.com',
  metaTitle: 'Bumper Embed Code Generator — Embed Bumper Content',
  metaDescription:
    'Free Bumper embed code generator. Paste any Bumper URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed bumper', 'bumper embed code', 'bumper embed generator'],
  heroTitle: 'Bumper Embed Code Generator',
  heroSubtitle:
    'Paste any Bumper URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Bumper content',
  howItWorksSteps: [
    { title: 'Paste a Bumper link', description: 'Copy any bumper.com URL.' },
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
  explanationHeading: 'Why use our Bumper embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Bumper link and get working embed HTML.'
    },
    {
      title: 'Bumper content',
      description: 'The tool handles all Bumper URL formats.'
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
        'Get the real Bumper embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Bumper URL formats and content types.'
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
      question: 'How do I embed Bumper content on my website?',
      answer: 'Paste any Bumper URL into the tool and click Generate.'
    },
    {
      question: 'Is the Bumper embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Bumper content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
