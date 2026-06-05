import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'ZingSoft',
  slug: 'zingsoft',
  color: '#FF6F61',
  exampleUrl: 'https://zingsoft.com',
  metaTitle: 'ZingSoft Embed Code Generator — Embed Interactive Charts',
  metaDescription:
    'Free ZingSoft embed code generator. Paste any ZingSoft URL — get a ready-to-paste embed for interactive charts and data visualizations built with ZingChart and ZingGrid. No signup.',
  keywords: [
    'embed zingsoft',
    'zingsoft embed code',
    'zingsoft embed code generator',
    'embed zingchart',
    'zingsoft iframe code',
    'zinggrid embed',
    'embed interactive chart'
  ],
  heroTitle: 'ZingSoft Embed Code Generator',
  heroSubtitle:
    'Paste any ZingSoft URL — get a ready-to-paste embed for interactive charts and data visualizations built with ZingChart and ZingGrid.',
  howItWorksHeading: 'How to embed ZingSoft charts',
  howItWorksSteps: [
    {
      title: 'Paste a ZingSoft link',
      description:
        'Copy the URL of any chart or visualization from zingsoft.com and paste it above.'
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
  explanationHeading: 'Why use our ZingSoft embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'No need to copy script tags or wire up the chart yourself. Paste a ZingSoft link and get working embed HTML.'
    },
    {
      title: 'Keeps charts interactive',
      description:
        'The embed preserves ZingChart and ZingGrid interactivity so readers can hover, sort, and explore the data in place.'
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
      title: 'Interactive chart embed',
      description:
        'Embed ZingChart visualizations so tooltips, zooming, and other interactions stay live inside your page.'
    },
    {
      title: 'Data grid support',
      description:
        'Works with ZingGrid data tables as well as charts, keeping sorting and filtering intact.'
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
    {
      href: '/tools/embed-url/amcharts-live-editor',
      label: 'amCharts Live Editor'
    }
  ],
  faq: [
    {
      question: 'How do I embed a ZingSoft chart on my website?',
      answer:
        'Paste the chart URL into the tool, click Generate, then copy the HTML into your page or CMS.'
    },
    {
      question: 'Will the embedded chart stay interactive?',
      answer:
        'Yes. The embed keeps ZingChart and ZingGrid interactions live so readers can hover, sort, and zoom in place.'
    },
    {
      question: 'Does it work with both ZingChart and ZingGrid?',
      answer:
        'It does. The tool embeds interactive charts as well as ZingGrid data tables.'
    },
    {
      question: 'What if the visualization is private?',
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
