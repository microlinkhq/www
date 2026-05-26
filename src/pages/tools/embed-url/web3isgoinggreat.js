import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Web3 Is Going Great',
  slug: 'web3isgoinggreat',
  color: '#666666',
  exampleUrl: 'https://web3isgoinggreat.com',
  metaTitle:
    'Web3 Is Going Great Embed Code Generator — Embed Web3 Is Going Great Content',
  metaDescription:
    'Free Web3 Is Going Great embed code generator. Paste any Web3 Is Going Great URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed web3 is going great',
    'web3 is going great embed code',
    'web3 is going great embed generator'
  ],
  heroTitle: 'Web3 Is Going Great Embed Code Generator',
  heroSubtitle:
    'Paste any Web3 Is Going Great URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Web3 Is Going Great content',
  howItWorksSteps: [
    {
      title: 'Paste a Web3 Is Going Great link',
      description: 'Copy any web3isgoinggreat.com URL.'
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
  explanationHeading: 'Why use our Web3 Is Going Great embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Web3 Is Going Great link and get working embed HTML.'
    },
    {
      title: 'Web3 Is Going Great content',
      description: 'The tool handles all Web3 Is Going Great URL formats.'
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
        'Get the real Web3 Is Going Great embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description:
        'Works with all Web3 Is Going Great URL formats and content types.'
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
      question: 'How do I embed Web3 Is Going Great content on my website?',
      answer:
        'Paste any Web3 Is Going Great URL into the tool and click Generate.'
    },
    {
      question: 'Is the Web3 Is Going Great embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Web3 Is Going Great content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
