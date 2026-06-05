import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Quartr',
  slug: 'quartr',
  color: '#6A5BFF',
  exampleUrl: 'https://quartr.com',
  metaTitle:
    'Quartr Embed Code Generator — Embed Earnings Calls & Presentations',
  metaDescription:
    'Free Quartr embed code generator. Paste any Quartr URL — get a ready-to-paste embed for earnings calls, investor presentations, and transcripts. No signup.',
  keywords: [
    'embed quartr',
    'quartr embed code',
    'quartr embed code generator',
    'embed earnings call',
    'quartr iframe code',
    'embed investor presentation',
    'quartr transcript embed'
  ],
  heroTitle: 'Quartr Embed Code Generator',
  heroSubtitle:
    'Paste any Quartr URL — get a ready-to-paste embed for earnings calls, investor presentations, and transcripts.',
  howItWorksHeading: 'How to embed Quartr content',
  howItWorksSteps: [
    {
      title: 'Paste a Quartr link',
      description:
        'Copy the URL of any earnings call, investor presentation, or transcript and drop it in.'
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
  explanationHeading: 'Why use our Quartr embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Quartr link and get working embed HTML in seconds.'
    },
    {
      title: 'Built for investor-relations content',
      description:
        'Handles earnings calls, investor presentations, and transcripts for public companies.'
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
      title: 'Earnings call embeds',
      description:
        'Embed earnings calls so readers can listen and follow along inside your page.'
    },
    {
      title: 'Presentation & transcript embeds',
      description:
        'Drop investor presentations and transcripts into research notes, reports, or articles.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/datawrapper', label: 'Datawrapper' },
    { href: '/tools/embed-url/speakerdeck', label: 'Speaker Deck' },
    { href: '/tools/embed-url/chartblocks', label: 'ChartBlocks' }
  ],
  faq: [
    {
      question: 'How do I embed a Quartr earnings call on my site?',
      answer:
        'Paste the earnings call URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'Can I embed investor presentations and transcripts?',
      answer:
        'Yes. Paste the presentation or transcript URL and the generator produces an embed for it.'
    },
    {
      question: 'Which companies does this work with?',
      answer:
        'It works with any public-company content available on Quartr, across the supported URL formats.'
    },
    {
      question: 'What if the Quartr content is restricted?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
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
