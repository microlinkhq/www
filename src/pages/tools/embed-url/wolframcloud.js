import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Wolfram Cloud',
  slug: 'wolframcloud',
  color: '#666666',
  exampleUrl: 'https://wolframcloud.com',
  metaTitle: 'Wolfram Cloud Embed Code Generator — Embed Wolfram Cloud Content',
  metaDescription:
    'Free Wolfram Cloud embed code generator. Paste any Wolfram Cloud URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed wolfram cloud',
    'wolfram cloud embed code',
    'wolfram cloud embed generator'
  ],
  heroTitle: 'Wolfram Cloud Embed Code Generator',
  heroSubtitle:
    'Paste any Wolfram Cloud URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Wolfram Cloud content',
  howItWorksSteps: [
    {
      title: 'Paste a Wolfram Cloud link',
      description: 'Copy any wolframcloud.com URL.'
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
  explanationHeading: 'Why use our Wolfram Cloud embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Wolfram Cloud link and get working embed HTML.'
    },
    {
      title: 'Wolfram Cloud content',
      description: 'The tool handles all Wolfram Cloud URL formats.'
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
        'Get the real Wolfram Cloud embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Wolfram Cloud URL formats and content types.'
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
      question: 'How do I embed Wolfram Cloud content on my website?',
      answer: 'Paste any Wolfram Cloud URL into the tool and click Generate.'
    },
    {
      question: 'Is the Wolfram Cloud embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Wolfram Cloud content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
