import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Social Explorer',
  slug: 'socialexplorer',
  color: '#1565C0',
  exampleUrl: 'https://socialexplorer.com',
  metaTitle: 'Social Explorer Embed Code Generator — Embed Maps & Reports',
  metaDescription:
    'Free Social Explorer embed code generator. Paste any Social Explorer URL — get a ready-to-paste embed for interactive data maps and demographic reports. No signup.',
  keywords: [
    'embed social explorer',
    'social explorer embed code',
    'social explorer embed code generator',
    'embed social explorer map',
    'social explorer iframe code',
    'demographic map embed',
    'embed census data map'
  ],
  heroTitle: 'Social Explorer Embed Code Generator',
  heroSubtitle:
    'Paste any Social Explorer URL — get a ready-to-paste embed for interactive data maps and demographic reports.',
  howItWorksHeading: 'How to embed Social Explorer content',
  howItWorksSteps: [
    {
      title: 'Paste a Social Explorer link',
      description:
        'Copy any socialexplorer.com URL — an interactive map or a demographic report.'
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
  explanationHeading: 'Why use our Social Explorer embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Social Explorer link and get working embed HTML — no share dialogs to hunt through.'
    },
    {
      title: 'Interactive data, intact',
      description:
        'Keep maps and reports fully interactive so readers can pan, zoom, and explore the demographics inline.'
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
      title: 'Interactive data maps',
      description:
        'Embed live Social Explorer maps so visitors can explore census and demographic layers.'
    },
    {
      title: 'Demographic reports',
      description:
        'Drop full data reports into articles, dashboards, or research pages.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/datawrapper', label: 'Datawrapper' },
    { href: '/tools/embed-url/naturalatlas', label: 'Natural Atlas' },
    { href: '/tools/embed-url/chartblocks', label: 'ChartBlocks' }
  ],
  faq: [
    {
      question: 'How do I embed a Social Explorer map on my website?',
      answer:
        'Paste the Social Explorer map URL into the tool and click Generate. You get ready-to-paste embed HTML for the interactive map.'
    },
    {
      question: 'Can I embed a demographic report too?',
      answer:
        'Yes. Paste the report URL and the tool produces an embed that keeps the data tables and visuals intact.'
    },
    {
      question: 'Will the embedded map stay interactive?',
      answer:
        'When native embedding is supported, readers can pan, zoom, and switch layers right inside your page.'
    },
    {
      question: 'What if the Social Explorer content needs a subscription?',
      answer:
        'The tool falls back to a styled preview card built from the available public metadata.'
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
