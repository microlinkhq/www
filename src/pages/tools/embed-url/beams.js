import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Beams',
  slug: 'beams',
  color: '#666666',
  exampleUrl: 'https://beams.fm',
  metaTitle: 'Beams Embed Code Generator — Embed Beams Content',
  metaDescription:
    'Free Beams embed code generator. Paste any Beams URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed beams', 'beams embed code', 'beams embed generator'],
  heroTitle: 'Beams Embed Code Generator',
  heroSubtitle:
    'Paste any Beams URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Beams content',
  howItWorksSteps: [
    { title: 'Paste a Beams link', description: 'Copy any beams.fm URL.' },
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
  explanationHeading: 'Why use our Beams embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Beams link and get working embed HTML.'
    },
    {
      title: 'Beams content',
      description: 'The tool handles all Beams URL formats.'
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
        'Get the real Beams embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Beams URL formats and content types.'
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
      question: 'How do I embed Beams content on my website?',
      answer: 'Paste any Beams URL into the tool and click Generate.'
    },
    {
      question: 'Is the Beams embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Beams content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
