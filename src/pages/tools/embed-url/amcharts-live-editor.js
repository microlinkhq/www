import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'amCharts Live Editor',
  slug: 'amcharts-live-editor',
  color: '#72ACD9',
  exampleUrl: 'https://live.amcharts.com/g4NWF/',
  metaTitle:
    'amCharts Live Editor Embed Code Generator — Embed Interactive Charts',
  metaDescription:
    'Free amCharts Live Editor embed code generator. Paste a live.amcharts.com URL — get a ready-to-paste iframe for interactive charts and data visualizations. No signup.',
  keywords: [
    'embed amcharts live editor',
    'amcharts live editor embed code',
    'amcharts embed code generator',
    'embed amcharts chart',
    'amcharts iframe code',
    'embed interactive chart',
    'amcharts chart embed'
  ],
  heroTitle: 'amCharts Live Editor Embed Code Generator',
  heroSubtitle:
    'Paste an amCharts Live Editor URL — get a ready-to-paste iframe for interactive charts and data visualizations.',
  howItWorksHeading: 'How to embed an amCharts Live Editor chart',
  howItWorksSteps: [
    {
      title: 'Paste an amCharts Live Editor link',
      description:
        'Copy any live.amcharts.com chart URL — line, bar, pie, and other interactive chart types.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the chart URL and generates the iframe embed HTML for you.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our amCharts Live Editor embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the share dialog. Paste a live.amcharts.com link and get working embed HTML.'
    },
    {
      title: 'Interactive charts intact',
      description:
        'The embedded chart keeps its tooltips, legends, and hover interactions exactly as built in the editor.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 amCharts Live Editor embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native interactive chart',
      description:
        'Get the real amCharts Live Editor chart with live tooltips, legends, and animations.'
    },
    {
      title: 'All chart types',
      description:
        'Line, column, bar, pie, and other data visualizations published from the Live Editor all work.'
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
      href: '/tools/embed-url/infogram',
      label: 'Infogram'
    },
    {
      href: '/tools/embed-url/chartblocks',
      label: 'ChartBlocks'
    }
  ],
  faq: [
    {
      question: 'How do I embed an amCharts Live Editor chart on my website?',
      answer:
        'Paste your live.amcharts.com chart URL into the tool and click Generate. You will get a ready-to-paste iframe embed.'
    },
    {
      question: 'Which amCharts chart types can I embed?',
      answer:
        'Any public chart published from the Live Editor — line, column, bar, pie, and other interactive visualizations.'
    },
    {
      question: 'Does the embedded chart stay interactive?',
      answer:
        'Yes. The native embed keeps tooltips, legends, and hover interactions just like the original chart.'
    },
    {
      question: 'What if the chart is private or unpublished?',
      answer:
        'Only public Live Editor charts can be embedded natively. For others the tool falls back to a styled preview card with the available metadata.'
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
