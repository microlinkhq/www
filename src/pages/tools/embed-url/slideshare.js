import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'SlideShare',
  slug: 'slideshare',
  color: '#0077B5',
  exampleUrl:
    'https://www.slideshare.net/slideshow/unicef-branding-toolkit/5207527',
  metaTitle: 'SlideShare Embed Code Generator — Embed Slide Decks & Documents',
  metaDescription:
    'Free SlideShare embed code generator. Paste any SlideShare URL — get a ready-to-paste embed for slide decks, presentations, documents, and infographics. No signup.',
  keywords: [
    'embed slideshare',
    'slideshare embed code',
    'slideshare embed code generator',
    'embed slideshare presentation',
    'slideshare iframe code',
    'embed slideshare slides',
    'slideshare slide deck embed'
  ],
  heroTitle: 'SlideShare Embed Code Generator',
  heroSubtitle:
    'Paste any SlideShare URL — get a ready-to-paste embed for slide decks, presentations, documents, and infographics.',
  howItWorksHeading: 'How to embed a SlideShare presentation',
  howItWorksSteps: [
    {
      title: 'Paste a SlideShare link',
      description:
        'Copy any slideshare.net URL — slide decks, presentations, documents, and infographics.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the SlideShare deck and generates the right embed HTML.'
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
        'Skip digging through the SlideShare share menu. Paste any link and get working embed HTML.'
    },
    {
      title: 'All SlideShare content',
      description:
        'Works with slide decks, presentations, documents, and infographics — the tool handles all SlideShare URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 SlideShare embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native SlideShare viewer',
      description:
        'Get the real SlideShare player so readers can flip through every slide inline.'
    },
    {
      title: 'Responsive slide embed',
      description:
        'The embed scales to fit your layout — full-width on desktop and readable on mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/speakerdeck',
      label: 'Speaker Deck'
    },
    {
      href: '/tools/embed-url/scribd',
      label: 'Scribd'
    },
    {
      href: '/tools/embed-url/prezi',
      label: 'Prezi'
    }
  ],
  faq: [
    {
      question: 'How do I embed a SlideShare presentation on my website?',
      answer:
        'Paste any SlideShare URL into the tool and click Generate. You will get a ready-to-paste embed for the slide deck.'
    },
    {
      question: 'What SlideShare content can I embed?',
      answer:
        'Slide decks, presentations, documents, and infographics hosted on slideshare.net are all supported.'
    },
    {
      question: 'Can visitors flip through the slides in the embed?',
      answer:
        'Yes. The native SlideShare viewer lets readers page through every slide without leaving your site.'
    },
    {
      question: 'What if the SlideShare deck is private or restricted?',
      answer:
        'The tool falls back to a styled preview card with the available title and image.'
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
