import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Web3 is Going Just Great',
  slug: 'web3isgoinggreat',
  color: '#E8453C',
  exampleUrl: 'https://web3isgoinggreat.com',
  metaTitle:
    'Web3 is Going Just Great Embed Code Generator — Embed Timeline Entries',
  metaDescription:
    'Free embed code generator for Web3 is Going Just Great. Paste any timeline entry URL — get a ready-to-paste card for crypto scams, hacks, and failures. No signup.',
  keywords: [
    'embed web3 is going just great',
    'web3 is going just great embed code',
    'web3 is going just great embed code generator',
    'embed web3 timeline entry',
    'web3 is going just great iframe code',
    'molly white timeline embed',
    'embed crypto timeline'
  ],
  heroTitle: 'Web3 is Going Just Great Embed Code Generator',
  heroSubtitle:
    'Paste any timeline entry URL — get a ready-to-paste card for crypto scams, hacks, and failures tracked by Molly White.',
  howItWorksHeading: 'How to embed Web3 is Going Just Great entries',
  howItWorksSteps: [
    {
      title: 'Paste a timeline entry link',
      description:
        'Copy the URL of any Web3 is Going Just Great timeline entry and drop it into the field.'
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
  explanationHeading:
    'Why use our Web3 is Going Just Great embed code generator',
  reasons: [
    {
      title: 'Made for timeline entries',
      description:
        'Turn any entry from the crypto-and-web3 failure timeline into a clean card you can cite inside your own articles.'
    },
    {
      title: 'No manual setup',
      description:
        'Skip copying screenshots. Paste an entry link and get working embed HTML in one step.'
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
      title: 'Timeline entry card',
      description:
        'Embed a single entry with its headline, date, and summary so readers see the incident at a glance.'
    },
    {
      title: 'Source-friendly format',
      description:
        'Generates tidy HTML that fits reporting, newsletters, and reference posts that link back to the original entry.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/sutori', label: 'Sutori' },
    { href: '/tools/embed-url/storymaps', label: 'StoryMaps' },
    { href: '/tools/embed-url/raindrop', label: 'Raindrop' }
  ],
  faq: [
    {
      question: 'How do I embed a Web3 is Going Just Great entry?',
      answer:
        'Paste the timeline entry URL into the tool and click Generate. You will get a ready-to-paste card snippet.'
    },
    {
      question: 'Can I embed more than one timeline entry?',
      answer:
        'Run each entry URL through the tool to get a separate embed card for every incident you want to feature.'
    },
    {
      question: 'Where can I paste the entry embed?',
      answer:
        'Anywhere that accepts HTML — blog posts, reports, documentation, or your CMS.'
    },
    {
      question: 'Will the embed link back to the original entry?',
      answer:
        'Yes. The card keeps the source link so readers can open the full entry on the timeline.'
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
