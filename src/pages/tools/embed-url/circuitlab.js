import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'CircuitLab',
  slug: 'circuitlab',
  color: '#2B70D4',
  exampleUrl: 'https://circuitlab.com',
  metaTitle:
    'CircuitLab Embed Code Generator — Embed Circuit schematics and simulations',
  metaDescription:
    'Free CircuitLab embed code generator. Paste any CircuitLab URL — get a ready-to-paste embed for circuit schematics and simulations. No signup.',
  keywords: [
    'embed circuitlab',
    'circuitlab embed code',
    'circuit schematic embed'
  ],
  heroTitle: 'CircuitLab Embed Code Generator',
  heroSubtitle:
    'Paste any CircuitLab URL — get a ready-to-paste embed for circuit schematics and simulations.',
  howItWorksHeading: 'How to embed CircuitLab content',
  howItWorksSteps: [
    {
      title: 'Paste a CircuitLab link',
      description:
        'Copy any circuitlab.com URL — circuit schematics and simulations.'
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
  explanationHeading: 'Why use our CircuitLab embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any CircuitLab link and get working embed HTML.'
    },
    {
      title: 'All CircuitLab content',
      description:
        'Works with circuit schematics and simulations — the tool handles all CircuitLab URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 CircuitLab embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real CircuitLab embed with full interactivity when available.'
    },
    {
      title: 'All circuit schematics and simulations',
      description:
        'Works with circuit schematics and simulations — all CircuitLab content types.'
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
      question: 'How do I embed CircuitLab content on my website?',
      answer:
        'Paste any CircuitLab URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the CircuitLab embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the CircuitLab content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
