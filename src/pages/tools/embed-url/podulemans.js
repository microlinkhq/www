import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Pod Le Mans',
  slug: 'podulemans',
  color: '#666666',
  exampleUrl: 'https://pod.univ-lemans.fr',
  metaTitle: 'Pod Le Mans Embed Code Generator — Embed Pod Le Mans Content',
  metaDescription:
    'Free Pod Le Mans embed code generator. Paste any Pod Le Mans URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed pod le mans',
    'pod le mans embed code',
    'pod le mans embed generator'
  ],
  heroTitle: 'Pod Le Mans Embed Code Generator',
  heroSubtitle:
    'Paste any Pod Le Mans URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Pod Le Mans content',
  howItWorksSteps: [
    {
      title: 'Paste a Pod Le Mans link',
      description: 'Copy any pod.univ-lemans.fr URL.'
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
  explanationHeading: 'Why use our Pod Le Mans embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Pod Le Mans link and get working embed HTML.'
    },
    {
      title: 'Pod Le Mans content',
      description: 'The tool handles all Pod Le Mans URL formats.'
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
        'Get the real Pod Le Mans embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Pod Le Mans URL formats and content types.'
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
      question: 'How do I embed Pod Le Mans content on my website?',
      answer: 'Paste any Pod Le Mans URL into the tool and click Generate.'
    },
    {
      question: 'Is the Pod Le Mans embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Pod Le Mans content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
