import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Infogram',
  slug: 'infogram',
  color: '#00C9A2',
  exampleUrl: 'https://infogram.com/world-blood-donor-day-1h0r6rz87xmzl4e',
  metaTitle:
    'Infogram Embed Code Generator — Embed Infographics, Charts & Reports',
  metaDescription:
    'Free Infogram embed code generator. Paste any Infogram URL — get a ready-to-paste embed for interactive infographics, charts, maps, and reports. No signup.',
  keywords: [
    'embed infogram',
    'infogram embed code',
    'infogram embed code generator',
    'embed infogram chart',
    'embed infogram infographic',
    'infogram iframe code',
    'embed infogram report',
    'infogram interactive chart embed'
  ],
  heroTitle: 'Infogram Embed Code Generator',
  heroSubtitle:
    'Paste any Infogram URL — get a ready-to-paste embed for interactive infographics, charts, maps, and reports.',
  howItWorksHeading: 'How to embed Infogram content',
  howItWorksSteps: [
    {
      title: 'Paste an Infogram link',
      description:
        'Copy any infogram.com URL — interactive infographics, charts, maps, and reports.'
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
  explanationHeading: 'Why use our Infogram embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Share menu. Paste any Infogram link and get working embed HTML.'
    },
    {
      title: 'All Infogram content',
      description:
        'Works with infographics, charts, maps, and reports — the tool handles all Infogram URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Infogram embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native interactive embed',
      description:
        'Get the real Infogram embed with hover tooltips, animated charts, and interactivity intact.'
    },
    {
      title: 'Infographics, charts & maps',
      description:
        'Interactive infographics, charts, maps, dashboards, and reports — all Infogram content types work.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/flourish', label: 'Flourish' },
    { href: '/tools/embed-url/datawrapper', label: 'Datawrapper' },
    { href: '/tools/embed-url/chartblocks', label: 'ChartBlocks' }
  ],
  faq: [
    {
      question: 'How do I embed an Infogram infographic on my website?',
      answer:
        'Paste any Infogram URL into the tool and click Generate. You will get a ready-to-paste embed you can drop into any HTML editor.'
    },
    {
      question: 'What types of Infogram content can I embed?',
      answer:
        'Interactive infographics, charts, maps, dashboards, and reports are all supported.'
    },
    {
      question: 'Does the embed stay interactive?',
      answer:
        'Yes. When the native embed is available, hover tooltips, animations, and clickable elements work just like on infogram.com.'
    },
    {
      question: 'What if the Infogram project is private?',
      answer:
        'Only public projects can be embedded. For private or unpublished projects, the tool falls back to a styled preview card with the available metadata.'
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
