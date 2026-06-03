import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'EthFiddle',
  slug: 'ethfiddle',
  color: '#1BC98E',
  exampleUrl: 'https://ethfiddle.com/2Rx8cQdEx3',
  metaTitle: 'EthFiddle Embed Code Generator — Embed Solidity Snippets',
  metaDescription:
    'Free EthFiddle embed code generator. Paste an ethfiddle.com URL — get ready-to-paste HTML for your syntax-highlighted Solidity smart contract snippets. No signup.',
  keywords: [
    'embed ethfiddle',
    'ethfiddle embed code',
    'ethfiddle embed code generator',
    'embed solidity code snippet',
    'ethfiddle iframe code',
    'embed smart contract code',
    'embed solidity ethfiddle'
  ],
  heroTitle: 'EthFiddle Embed Code Generator',
  heroSubtitle:
    'Paste an EthFiddle URL — get ready-to-paste HTML for your syntax-highlighted Solidity smart contract snippets.',
  howItWorksHeading: 'How to embed an EthFiddle snippet',
  howItWorksSteps: [
    {
      title: 'Paste an EthFiddle link',
      description:
        'Copy any ethfiddle.com snippet URL — the permalink to a shared Solidity fiddle.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the EthFiddle snippet and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our EthFiddle embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the oEmbed API call. Paste any EthFiddle link and get working embed HTML.'
    },
    {
      title: 'Built for Solidity',
      description:
        'Share syntax-highlighted Solidity smart contract code that readers can review inline.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 EthFiddle embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native EthFiddle snippet',
      description:
        'Get the real EthFiddle embed with syntax highlighting for your shared Solidity code.'
    },
    {
      title: 'Responsive embed',
      description:
        'The snippet embed scales to fit your column width, so code stays readable on any screen.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/codepen',
      label: 'CodePen'
    },
    {
      href: '/tools/embed-url/codesandbox',
      label: 'CodeSandbox'
    },
    {
      href: '/tools/embed-url/replit',
      label: 'Replit'
    }
  ],
  faq: [
    {
      question: 'How do I embed an EthFiddle snippet on my website?',
      answer:
        'Paste an ethfiddle.com snippet URL into the tool and click Generate. You will get a ready-to-paste embed for the snippet.'
    },
    {
      question: 'What can I embed from EthFiddle?',
      answer:
        'Shared Solidity code snippets — the syntax-highlighted smart contract fiddles you save and share on ethfiddle.com.'
    },
    {
      question: 'Does the embed keep syntax highlighting?',
      answer:
        'Yes. The native EthFiddle embed shows your Solidity code with the same syntax highlighting as the snippet page.'
    },
    {
      question: 'What if a snippet cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card with the snippet title and image so you still get a clean, shareable block.'
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
