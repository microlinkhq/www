import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Pod Antilles',
  slug: 'poduantilles',
  color: '#666666',
  exampleUrl: 'https://pod.antilles.univ.fr',
  metaTitle: 'Pod Antilles Embed Code Generator — Embed Pod Antilles Content',
  metaDescription:
    'Free Pod Antilles embed code generator. Paste any Pod Antilles URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed pod antilles',
    'pod antilles embed code',
    'pod antilles embed generator'
  ],
  heroTitle: 'Pod Antilles Embed Code Generator',
  heroSubtitle:
    'Paste any Pod Antilles URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Pod Antilles content',
  howItWorksSteps: [
    {
      title: 'Paste a Pod Antilles link',
      description: 'Copy any pod.antilles.univ.fr URL.'
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
  explanationHeading: 'Why use our Pod Antilles embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Pod Antilles link and get working embed HTML.'
    },
    {
      title: 'Pod Antilles content',
      description: 'The tool handles all Pod Antilles URL formats.'
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
        'Get the real Pod Antilles embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Pod Antilles URL formats and content types.'
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
      question: 'How do I embed Pod Antilles content on my website?',
      answer: 'Paste any Pod Antilles URL into the tool and click Generate.'
    },
    {
      question: 'Is the Pod Antilles embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Pod Antilles content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
