import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Flourish',
  slug: 'flourish',
  color: '#3654FF',
  exampleUrl: 'https://public.flourish.studio/visualisation/1234567/',
  metaTitle: 'Flourish Embed Code Generator — Embed Charts & Visualizations',
  metaDescription:
    'Free Flourish embed code generator. Paste any Flourish URL — get a ready-to-paste iframe for charts, maps, and data stories. No signup.',
  keywords: [
    'embed flourish',
    'flourish embed code',
    'flourish embed generator',
    'flourish iframe',
    'embed flourish chart',
    'flourish visualization embed'
  ],
  heroTitle: 'Flourish Embed Code Generator',
  heroSubtitle:
    'Paste any Flourish URL — get a ready-to-paste iframe for charts, maps, and data stories.',
  howItWorksHeading: 'How to embed Flourish content',
  howItWorksSteps: [
    {
      title: 'Paste a Flourish link',
      description: 'Copy any Flourish URL — charts, maps, and data stories.'
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
  explanationHeading: 'Why use our Flourish embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Flourish link and get working embed HTML.'
    },
    {
      title: 'All Flourish content',
      description:
        'Works with charts, maps, and data stories — the tool handles all Flourish URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Flourish embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Interactive visualizations',
      description:
        'Get a fully interactive Flourish embed — tooltips, animations, and filters all work.'
    },
    {
      title: 'Charts, maps & stories',
      description:
        'Bar charts, maps, scatter plots, and data stories — all Flourish visualization types work.'
    },
    {
      title: 'Responsive iframe',
      description: 'The embedded visualization adapts to any container width.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/datawrapper',
      label: 'Datawrapper'
    },
    {
      href: '/tools/embed-url/google-maps',
      label: 'Google Maps'
    },
    {
      href: '/tools/embed-url/airtable',
      label: 'Airtable'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Flourish chart?',
      answer: 'Paste any Flourish public URL into the tool and click Generate.'
    },
    {
      question: 'Are interactions preserved?',
      answer:
        'Yes. Tooltips, animations, and interactive features work in the embed.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const FlourishPage = () => <ProviderSubtool {...data} />

export default FlourishPage
