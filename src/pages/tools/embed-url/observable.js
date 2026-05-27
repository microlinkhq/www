import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Observable',
  slug: 'observable',
  color: '#3B5FC0',
  exampleUrl: 'https://observablehq.com',
  metaTitle:
    'Observable Embed Code Generator — Embed Notebooks and data visualizations',
  metaDescription:
    'Free Observable embed code generator. Paste any Observable URL — get a ready-to-paste embed for notebooks and data visualizations. No signup.',
  keywords: [
    'embed observable',
    'observable embed code',
    'observable notebook embed'
  ],
  heroTitle: 'Observable Embed Code Generator',
  heroSubtitle:
    'Paste any Observable URL — get a ready-to-paste embed for notebooks and data visualizations.',
  howItWorksHeading: 'How to embed Observable content',
  howItWorksSteps: [
    {
      title: 'Paste a Observable link',
      description:
        'Copy any observablehq.com URL — notebooks and data visualizations.'
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
  explanationHeading: 'Why use our Observable embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Observable link and get working embed HTML.'
    },
    {
      title: 'All Observable content',
      description:
        'Works with notebooks and data visualizations — the tool handles all Observable URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Observable embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Observable embed with full interactivity when available.'
    },
    {
      title: 'All notebooks and data visualizations',
      description:
        'Works with notebooks and data visualizations — all Observable content types.'
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
      question: 'How do I embed Observable content on my website?',
      answer:
        'Paste any Observable URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Observable embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Observable content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
