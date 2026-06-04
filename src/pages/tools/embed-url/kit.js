import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Kit',
  slug: 'kit',
  color: '#1B1B1B',
  exampleUrl: 'https://kit.co',
  metaTitle: 'Kit Embed Code Generator — Embed Gear & Product Lists',
  metaDescription:
    'Free Kit embed code generator. Paste any Kit (kit.co) URL — get a ready-to-paste embed for curated gear and product lists. No signup.',
  keywords: [
    'embed kit',
    'kit co embed code',
    'kit embed code generator',
    'embed gear list',
    'kit co iframe code',
    'kit product list embed',
    'embed kit co'
  ],
  heroTitle: 'Kit Embed Code Generator',
  heroSubtitle:
    'Paste any Kit URL — get a ready-to-paste embed for curated gear and product lists.',
  howItWorksHeading: 'How to embed Kit content',
  howItWorksSteps: [
    {
      title: 'Paste a Kit link',
      description: 'Copy any kit.co URL — a curated gear or product kit.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the kit and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Kit embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Kit link and get working embed HTML instantly.'
    },
    {
      title: 'Curated gear lists',
      description:
        'Works with the curated kits of gear and product recommendations you build on kit.co.'
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
      title: 'Interactive gear kit',
      description:
        'Embed the live Kit so readers can browse every product in the list right on your page.'
    },
    {
      title: 'Kits & product lists',
      description:
        'Curated gear kits and product recommendation lists from kit.co all embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/curated',
      label: 'Curated'
    },
    {
      href: '/tools/embed-url/raindrop',
      label: 'Raindrop'
    },
    {
      href: '/tools/embed-url/smugmug',
      label: 'SmugMug'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Kit gear list on my website?',
      answer:
        'Paste any kit.co URL into the tool and click Generate. You will get a ready-to-paste embed for the kit.'
    },
    {
      question: 'What is Kit?',
      answer:
        'Kit (kit.co) is a platform for building and sharing curated kits of gear and product recommendations.'
    },
    {
      question: 'Can readers browse the products in the embed?',
      answer:
        'When the kit supports live embedding, readers can browse every product directly in the page.'
    },
    {
      question: 'What if the kit cannot be embedded?',
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
