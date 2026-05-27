import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Pod Lille',
  slug: 'podulille',
  color: '#666666',
  exampleUrl: 'https://pod.univ-lille.fr',
  metaTitle: 'Pod Lille Embed Code Generator — Embed Pod Lille Content',
  metaDescription:
    'Free Pod Lille embed code generator. Paste any Pod Lille URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed pod lille',
    'pod lille embed code',
    'pod lille embed generator'
  ],
  heroTitle: 'Pod Lille Embed Code Generator',
  heroSubtitle:
    'Paste any Pod Lille URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Pod Lille content',
  howItWorksSteps: [
    {
      title: 'Paste a Pod Lille link',
      description: 'Copy any pod.univ-lille.fr URL.'
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
  explanationHeading: 'Why use our Pod Lille embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Pod Lille link and get working embed HTML.'
    },
    {
      title: 'Pod Lille content',
      description: 'The tool handles all Pod Lille URL formats.'
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
        'Get the real Pod Lille embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Pod Lille URL formats and content types.'
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
      question: 'How do I embed Pod Lille content on my website?',
      answer: 'Paste any Pod Lille URL into the tool and click Generate.'
    },
    {
      question: 'Is the Pod Lille embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Pod Lille content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
