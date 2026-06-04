import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Infoveave',
  slug: 'infoveave',
  color: '#3F51B5',
  exampleUrl: 'https://infoveave.net',
  metaTitle: 'Infoveave Embed Code Generator — Embed Dashboards & Reports',
  metaDescription:
    'Free Infoveave embed code generator. Paste any Infoveave URL — get a ready-to-paste embed for interactive dashboards, reports, and infographics. No signup.',
  keywords: [
    'embed infoveave',
    'infoveave embed code',
    'infoveave embed code generator',
    'embed infoveave dashboard',
    'infoveave iframe code',
    'embed data dashboard',
    'infoveave report embed'
  ],
  heroTitle: 'Infoveave Embed Code Generator',
  heroSubtitle:
    'Paste any Infoveave URL — get a ready-to-paste embed for interactive dashboards, reports, and infographics.',
  howItWorksHeading: 'How to embed Infoveave content',
  howItWorksSteps: [
    {
      title: 'Paste an Infoveave link',
      description:
        'Copy any infoveave.net URL — a dashboard, report, or infographic.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the asset and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Infoveave embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Infoveave link and get working embed HTML — no exporting charts by hand.'
    },
    {
      title: 'Dashboards & reports',
      description:
        'Works with Infoveave dashboards, reports, and infographics built from your data.'
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
      title: 'Interactive dashboard',
      description:
        'Keep the live Infoveave dashboard so readers can filter and drill into the data.'
    },
    {
      title: 'Reports & infographics',
      description:
        'Dashboards, reports, and infographics from the Infoveave platform all embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/datawrapper',
      label: 'Datawrapper'
    },
    {
      href: '/tools/embed-url/chartblocks',
      label: 'ChartBlocks'
    },
    {
      href: '/tools/embed-url/amcharts-live-editor',
      label: 'amCharts'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Infoveave dashboard on my website?',
      answer:
        'Paste any Infoveave URL into the tool and click Generate. You will get a ready-to-paste embed for the dashboard.'
    },
    {
      question: 'What is Infoveave?',
      answer:
        'Infoveave is a data analytics platform for building dashboards, reports, and infographics from your data.'
    },
    {
      question: 'Can readers interact with the embedded dashboard?',
      answer:
        'When the dashboard supports live embedding, readers can filter and drill into the data directly in the page.'
    },
    {
      question: 'What if the dashboard cannot be embedded?',
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
