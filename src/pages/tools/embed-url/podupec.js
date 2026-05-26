import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Pod UPEC',
  slug: 'podupec',
  color: '#666666',
  exampleUrl: 'https://pod.u-pec.fr',
  metaTitle: 'Pod UPEC Embed Code Generator — Embed Pod UPEC Content',
  metaDescription:
    'Free Pod UPEC embed code generator. Paste any Pod UPEC URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed pod upec',
    'pod upec embed code',
    'pod upec embed generator'
  ],
  heroTitle: 'Pod UPEC Embed Code Generator',
  heroSubtitle:
    'Paste any Pod UPEC URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Pod UPEC content',
  howItWorksSteps: [
    {
      title: 'Paste a Pod UPEC link',
      description: 'Copy any pod.u-pec.fr URL.'
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
  explanationHeading: 'Why use our Pod UPEC embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Pod UPEC link and get working embed HTML.'
    },
    {
      title: 'Pod UPEC content',
      description: 'The tool handles all Pod UPEC URL formats.'
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
        'Get the real Pod UPEC embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Pod UPEC URL formats and content types.'
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
      question: 'How do I embed Pod UPEC content on my website?',
      answer: 'Paste any Pod UPEC URL into the tool and click Generate.'
    },
    {
      question: 'Is the Pod UPEC embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Pod UPEC content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
