import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'RCVis',
  slug: 'rcvis',
  color: '#2E86DE',
  exampleUrl: 'https://rcvis.com',
  metaTitle: 'RCVis Embed Code Generator — Embed Ranked-Choice Visualizations',
  metaDescription:
    'Free RCVis embed code generator. Paste any RCVis URL — get a ready-to-paste embed for round-by-round ranked-choice voting charts and tabulation visualizations. No signup.',
  keywords: [
    'embed rcvis',
    'rcvis embed code',
    'rcvis embed code generator',
    'embed ranked choice voting results',
    'rcvis iframe code',
    'embed rcv visualization',
    'ranked choice chart embed'
  ],
  heroTitle: 'RCVis Embed Code Generator',
  heroSubtitle:
    'Paste any RCVis URL — get a ready-to-paste embed for round-by-round ranked-choice voting charts and tabulation visualizations.',
  howItWorksHeading: 'How to embed RCVis content',
  howItWorksSteps: [
    {
      title: 'Paste an RCVis link',
      description: 'Copy any rcvis.com election visualization URL.'
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
  explanationHeading: 'Why use our RCVis embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste an RCVis election link and get working embed HTML in one click — no API keys or markup to write by hand.'
    },
    {
      title: 'Interactive round-by-round results',
      description:
        'Embed the live RCVis visualization so readers can step through each tabulation round and explore how votes transfer.'
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
      title: 'Ranked-choice charts',
      description:
        'Embed RCVis round-by-round charts that show vote transfers and eliminations across each tabulation round.'
    },
    {
      title: 'Tabulation visualizations',
      description:
        'Display full RCV tabulation results, including Sankey-style flows and bar charts, directly on your page.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/datawrapper', label: 'Datawrapper' },
    { href: '/tools/embed-url/chartblocks', label: 'ChartBlocks' },
    { href: '/tools/embed-url/infoveave', label: 'Infoveave' }
  ],
  faq: [
    {
      question: 'How do I embed an RCVis election visualization on my website?',
      answer:
        'Paste the rcvis.com URL of the visualization into the tool, click Generate, then copy the embed HTML into your page.'
    },
    {
      question: 'Can readers interact with the embedded ranked-choice charts?',
      answer:
        'Yes. The native embed keeps the round-by-round interactivity so visitors can step through each tabulation round.'
    },
    {
      question: 'Which RCVis content types are supported?',
      answer:
        'Ranked-choice voting result visualizations, including round-by-round charts and tabulation views.'
    },
    {
      question: 'What if a visualization is private or cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card built from the available metadata.'
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
