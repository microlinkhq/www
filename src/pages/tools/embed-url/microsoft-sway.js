import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Microsoft Sway',
  slug: 'microsoft-sway',
  color: '#008272',
  exampleUrl: 'https://sway.cloud.microsoft/WR42BzNQhsCisIAW',
  metaTitle:
    'Microsoft Sway Embed Code Generator — Embed Presentations & Newsletters',
  metaDescription:
    'Free Microsoft Sway embed code generator. Paste any Sway URL — get a ready-to-paste iframe for interactive presentations, newsletters, and stories. No signup.',
  keywords: [
    'embed microsoft sway',
    'microsoft sway embed code',
    'microsoft sway embed code generator',
    'embed sway presentation',
    'embed sway newsletter',
    'sway iframe code',
    'microsoft sway embed html'
  ],
  heroTitle: 'Microsoft Sway Embed Code Generator',
  heroSubtitle:
    'Paste any Microsoft Sway URL — get a ready-to-paste iframe for interactive presentations, newsletters, and stories.',
  howItWorksHeading: 'How to embed Microsoft Sway content',
  howItWorksSteps: [
    {
      title: 'Paste a Microsoft Sway link',
      description:
        'Copy any sway.cloud.microsoft or sway.office.com URL — presentations, newsletters, reports, and stories.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Sway and generates a ready-to-paste iframe embed.'
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
        'Skip digging for the Get embed code option in Sway. Paste any Sway link and get working embed HTML.'
    },
    {
      title: 'Handles new and old URLs',
      description:
        'Works with both the new sway.cloud.microsoft links and the older sway.office.com format.'
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
      title: 'Interactive Sway embed',
      description:
        'Get a fully interactive Sway viewers can scroll and navigate through, right inside your page.'
    },
    {
      title: 'Presentations, newsletters & stories',
      description:
        'Interactive presentations, reports, newsletters, and personal stories — all Sway content works.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/prezi',
      label: 'Prezi'
    },
    {
      href: '/tools/embed-url/slideshare',
      label: 'SlideShare'
    },
    {
      href: '/tools/embed-url/microsoft',
      label: 'Microsoft'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Microsoft Sway on my website?',
      answer:
        'Paste any Sway URL into the tool and click Generate. You will get a ready-to-paste iframe embed.'
    },
    {
      question: 'Can viewers interact with the embedded Sway?',
      answer:
        'Yes. The embedded Sway is fully interactive, with scrolling and navigation just like the original.'
    },
    {
      question: 'Does it work with the new sway.cloud.microsoft links?',
      answer:
        'Yes. Both the new sway.cloud.microsoft URLs and the older sway.office.com links are supported.'
    },
    {
      question: 'What if my Sway is private?',
      answer:
        'Only Sways shared publicly with "Anyone with a link" can be embedded. Private Sways will fall back to a preview card.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const MicrosoftSwayPage = () => <ProviderSubtool {...data} />

export default MicrosoftSwayPage
