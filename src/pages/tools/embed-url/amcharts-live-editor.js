import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'amCharts',
  slug: 'amcharts-live-editor',
  color: '#3CABFF',
  exampleUrl: 'https://live.amcharts.com',
  metaTitle:
    'amCharts Embed Code Generator — Embed Charts and data visualizations',
  metaDescription:
    'Free amCharts embed code generator. Paste any amCharts URL — get a ready-to-paste embed for charts and data visualizations. No signup.',
  keywords: ['embed amcharts', 'amcharts embed code', 'amcharts chart embed'],
  heroTitle: 'amCharts Embed Code Generator',
  heroSubtitle:
    'Paste any amCharts URL — get a ready-to-paste embed for charts and data visualizations.',
  howItWorksHeading: 'How to embed amCharts content',
  howItWorksSteps: [
    {
      title: 'Paste a amCharts link',
      description:
        'Copy any live.amcharts.com URL — charts and data visualizations.'
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
  explanationHeading: 'Why use our amCharts embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any amCharts link and get working embed HTML.'
    },
    {
      title: 'All amCharts content',
      description:
        'Works with charts and data visualizations — the tool handles all amCharts URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 amCharts embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real amCharts embed with full interactivity when available.'
    },
    {
      title: 'All charts and data visualizations',
      description:
        'Works with charts and data visualizations — all amCharts content types.'
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
      question: 'How do I embed amCharts content on my website?',
      answer:
        'Paste any amCharts URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the amCharts embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the amCharts content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
