import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'iFixit',
  slug: 'ifixit',
  color: '#0071CE',
  exampleUrl: 'https://www.ifixit.com',
  metaTitle: 'iFixit Embed Code Generator — Embed Repair Guides & Teardowns',
  metaDescription:
    'Free iFixit embed code generator. Paste any iFixit URL — get a ready-to-paste embed for step-by-step repair guides and teardowns. No signup.',
  keywords: [
    'embed ifixit',
    'ifixit embed code',
    'ifixit embed code generator',
    'embed ifixit guide',
    'ifixit iframe code',
    'ifixit teardown embed',
    'repair guide embed'
  ],
  heroTitle: 'iFixit Embed Code Generator',
  heroSubtitle:
    'Paste any iFixit URL — get a ready-to-paste embed for step-by-step repair guides and teardowns.',
  howItWorksHeading: 'How to embed iFixit content',
  howItWorksSteps: [
    {
      title: 'Paste an iFixit link',
      description:
        'Copy any ifixit.com URL — a repair guide, teardown, or device page.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the guide and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our iFixit embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any iFixit link and get working embed HTML — no copying steps by hand.'
    },
    {
      title: 'Guides & teardowns',
      description:
        'Works with step-by-step repair guides, teardowns, and device pages across iFixit.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Step-by-step guide',
      description:
        'Keep the iFixit guide with its ordered steps and photos so readers can follow along.'
    },
    {
      title: 'Repairs & teardowns',
      description:
        'Repair guides, teardowns, and device overviews — every iFixit page type works.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/wokwi',
      label: 'Wokwi'
    },
    {
      href: '/tools/embed-url/circuitlab',
      label: 'CircuitLab'
    },
    {
      href: '/tools/embed-url/codesandbox',
      label: 'CodeSandbox'
    }
  ],
  faq: [
    {
      question: 'How do I embed an iFixit repair guide on my website?',
      answer:
        'Paste any iFixit URL into the tool and click Generate. You will get a ready-to-paste embed for the guide.'
    },
    {
      question: 'What iFixit content can I embed?',
      answer:
        'Step-by-step repair guides, teardowns, and device pages from ifixit.com.'
    },
    {
      question: 'Does the embed keep the guide steps?',
      answer:
        'Yes. When the guide supports embedding, its ordered steps and photos are preserved.'
    },
    {
      question: 'What if a guide cannot be embedded?',
      answer:
        'Switch to Card mode to get a styled preview card with the title and image instead.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
