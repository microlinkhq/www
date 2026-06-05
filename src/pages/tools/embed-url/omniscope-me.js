import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Omniscope',
  slug: 'omniscope-me',
  color: '#F57C00',
  exampleUrl: 'https://omniscope.me',
  metaTitle: 'Omniscope Embed Code Generator — Embed Dashboards & Reports',
  metaDescription:
    'Free Omniscope embed code generator. Paste any Omniscope URL — get a ready-to-paste embed for interactive dashboards and data reports. No signup.',
  keywords: [
    'embed omniscope',
    'omniscope embed code',
    'omniscope embed code generator',
    'embed omniscope dashboard',
    'omniscope iframe code',
    'embed omniscope report',
    'omniscope dashboard embed'
  ],
  heroTitle: 'Omniscope Embed Code Generator',
  heroSubtitle:
    'Paste any Omniscope URL — get a ready-to-paste embed for interactive dashboards and data reports.',
  howItWorksHeading: 'How to embed Omniscope content',
  howItWorksSteps: [
    {
      title: 'Paste an Omniscope link',
      description:
        'Copy the URL of a published Omniscope dashboard or data report and paste it into the field.'
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
  explanationHeading: 'Why use our Omniscope embed code generator',
  reasons: [
    {
      title: 'Interactive dashboards, no setup',
      description:
        'Paste a published Omniscope dashboard link and get an embed that stays fully interactive on your page.'
    },
    {
      title: 'Built for data reports',
      description:
        'Share live business-intelligence reports so readers can explore the numbers instead of looking at a screenshot.'
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
      title: 'Live dashboard embed',
      description:
        'Embed an interactive Omniscope dashboard so viewers can filter and drill into the data in place.'
    },
    {
      title: 'Data report support',
      description:
        'Works with Visokio Omniscope data reports, keeping charts and tables responsive inside your page.'
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
      question: 'How do I embed an Omniscope dashboard on my website?',
      answer:
        'Paste the published dashboard URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Does the embedded dashboard stay interactive?',
      answer:
        'Yes. When the report is published for sharing, filters and drill-downs keep working inside the embed.'
    },
    {
      question: 'Can I embed an Omniscope data report as well as a dashboard?',
      answer:
        'Yes. The tool handles both interactive dashboards and data reports built in Omniscope.'
    },
    {
      question: 'What if the Omniscope report is private?',
      answer:
        'The tool falls back to a styled preview card with whatever metadata is still available.'
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
