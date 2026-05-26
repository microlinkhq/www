import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Microsoft Sway',
  slug: 'microsoft-sway',
  color: '#008272',
  exampleUrl: 'https://sway.office.com/1234567890',
  metaTitle: 'Microsoft Sway Embed Code Generator — Embed Presentations',
  metaDescription:
    'Free Microsoft Sway embed code generator. Paste any Sway URL — get a ready-to-paste iframe for presentations and stories. No signup.',
  keywords: [
    'embed microsoft sway',
    'sway embed code',
    'microsoft sway embed generator',
    'sway iframe',
    'embed sway presentation',
    'microsoft sway embed html'
  ],
  heroTitle: 'Microsoft Sway Embed Code Generator',
  heroSubtitle:
    'Free Microsoft Sway embed code generator. Paste any Sway URL — get a ready-to-paste iframe for presentations and stories.',
  howItWorksHeading: 'How to embed Microsoft Sway content',
  howItWorksSteps: [
    {
      title: 'Paste a Microsoft Sway link',
      description:
        'Copy any Microsoft Sway URL — presentations and interactive stories.'
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
  explanationHeading: 'Why use our Microsoft Sway embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Microsoft Sway link and get working embed HTML.'
    },
    {
      title: 'All Microsoft Sway content',
      description:
        'Works with presentations and interactive stories — the tool handles all Microsoft Sway URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Microsoft Sway embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Interactive presentations',
      description:
        'Get a fully interactive Sway presentation embed — viewers can scroll through content.'
    },
    {
      title: 'Stories & newsletters',
      description:
        'Presentations, interactive reports, and newsletters — all Sway content types work.'
    },
    {
      title: 'Responsive iframe',
      description:
        'The embedded Sway adapts to any container width and works on mobile.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/microsoft',
      label: 'Microsoft'
    },
    {
      href: '/tools/embed-url/microsoft-forms',
      label: 'Microsoft Forms'
    },
    {
      href: '/tools/embed-url/google-docs',
      label: 'Google Docs'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Microsoft Sway?',
      answer: 'Paste any Sway URL into the tool and click Generate.'
    },
    {
      question: 'Can viewers interact with the Sway?',
      answer:
        'Yes. The embedded Sway is fully interactive with scrolling and navigation.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const MicrosoftswayPage = () => <ProviderSubtool {...data} />

export default MicrosoftswayPage
