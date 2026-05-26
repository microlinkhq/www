import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Pod Paris 1',
  slug: 'poduparis1',
  color: '#666666',
  exampleUrl: 'https://mediatheque.univ-paris1.fr',
  metaTitle: 'Pod Paris 1 Embed Code Generator — Embed Pod Paris 1 Content',
  metaDescription:
    'Free Pod Paris 1 embed code generator. Paste any Pod Paris 1 URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed pod paris 1',
    'pod paris 1 embed code',
    'pod paris 1 embed generator'
  ],
  heroTitle: 'Pod Paris 1 Embed Code Generator',
  heroSubtitle:
    'Paste any Pod Paris 1 URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Pod Paris 1 content',
  howItWorksSteps: [
    {
      title: 'Paste a Pod Paris 1 link',
      description: 'Copy any mediatheque.univ-paris1.fr URL.'
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
  explanationHeading: 'Why use our Pod Paris 1 embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Pod Paris 1 link and get working embed HTML.'
    },
    {
      title: 'Pod Paris 1 content',
      description: 'The tool handles all Pod Paris 1 URL formats.'
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
        'Get the real Pod Paris 1 embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Pod Paris 1 URL formats and content types.'
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
      question: 'How do I embed Pod Paris 1 content on my website?',
      answer: 'Paste any Pod Paris 1 URL into the tool and click Generate.'
    },
    {
      question: 'Is the Pod Paris 1 embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Pod Paris 1 content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
