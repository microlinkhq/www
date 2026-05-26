import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'SlideShare',
  slug: 'slideshare',
  color: '#008AB7',
  exampleUrl: 'https://slideshare.net',
  metaTitle: 'SlideShare Embed Code Generator — Embed Presentations',
  metaDescription:
    'Free SlideShare embed code generator. Paste any SlideShare URL — get a ready-to-paste embed for presentations, documents, and infographics. No signup.',
  keywords: [
    'embed slideshare',
    'slideshare embed code',
    'slideshare presentation embed'
  ],
  heroTitle: 'SlideShare Embed Code Generator',
  heroSubtitle:
    'Paste any SlideShare URL — get a ready-to-paste embed for presentations, documents, and infographics.',
  howItWorksHeading: 'How to embed SlideShare content',
  howItWorksSteps: [
    {
      title: 'Paste a SlideShare link',
      description:
        'Copy any slideshare.net URL — presentations, documents, and infographics.'
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
  explanationHeading: 'Why use our SlideShare embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any SlideShare link and get working embed HTML.'
    },
    {
      title: 'All SlideShare content',
      description:
        'Works with presentations, documents, and infographics — the tool handles all SlideShare URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 SlideShare embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real SlideShare embed with full interactivity when available.'
    },
    {
      title: 'All presentations',
      description:
        'Works with presentations, documents, and infographics — all SlideShare content types.'
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
      question: 'How do I embed SlideShare content on my website?',
      answer:
        'Paste any SlideShare URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the SlideShare embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the SlideShare content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
