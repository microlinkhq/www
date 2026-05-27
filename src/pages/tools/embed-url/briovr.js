import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Briovr',
  slug: 'briovr',
  color: '#666666',
  exampleUrl: 'https://briovr.com',
  metaTitle: 'Briovr Embed Code Generator — Embed Briovr Content',
  metaDescription:
    'Free Briovr embed code generator. Paste any Briovr URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: ['embed briovr', 'briovr embed code', 'briovr embed generator'],
  heroTitle: 'Briovr Embed Code Generator',
  heroSubtitle:
    'Paste any Briovr URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Briovr content',
  howItWorksSteps: [
    { title: 'Paste a Briovr link', description: 'Copy any briovr.com URL.' },
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
  explanationHeading: 'Why use our Briovr embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Briovr link and get working embed HTML.'
    },
    {
      title: 'Briovr content',
      description: 'The tool handles all Briovr URL formats.'
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
        'Get the real Briovr embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Briovr URL formats and content types.'
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
      question: 'How do I embed Briovr content on my website?',
      answer: 'Paste any Briovr URL into the tool and click Generate.'
    },
    {
      question: 'Is the Briovr embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Briovr content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
