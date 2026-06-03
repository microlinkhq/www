import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Docswell',
  slug: 'docswell',
  color: '#14A1DB',
  exampleUrl: 'https://www.docswell.com/s/ku-suke/LK7J5V-hello-docswell',
  metaTitle: 'Docswell Embed Code Generator — Embed Slides & PDFs',
  metaDescription:
    'Free Docswell embed code generator. Paste any Docswell URL — get a ready-to-paste iframe for slide decks, PDFs, and presentations. No signup.',
  keywords: [
    'embed docswell',
    'docswell embed code',
    'docswell embed code generator',
    'embed docswell slides',
    'docswell iframe code',
    'embed docswell presentation',
    'docswell slide embed'
  ],
  heroTitle: 'Docswell Embed Code Generator',
  heroSubtitle:
    'Paste any Docswell URL — get a ready-to-paste iframe for slide decks, PDFs, and presentations.',
  howItWorksHeading: 'How to embed Docswell content',
  howItWorksSteps: [
    {
      title: 'Paste a Docswell link',
      description:
        'Copy any docswell.com slide or document URL from your browser address bar.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the slide deck and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Docswell embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building the iframe by hand. Paste any Docswell link and get working embed HTML.'
    },
    {
      title: 'Slides, PDFs & documents',
      description:
        'Works with presentation decks, PDFs, and documents shared on Docswell.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Docswell embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Docswell viewer',
      description:
        'Get the real Docswell slide viewer with page navigation and full-screen support.'
    },
    {
      title: 'Responsive slide embed',
      description:
        'The iframe keeps the deck aspect ratio and scales to fit any column width.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/slideshare',
      label: 'SlideShare'
    },
    {
      href: '/tools/embed-url/speakerdeck',
      label: 'Speaker Deck'
    },
    {
      href: '/tools/embed-url/scribd',
      label: 'Scribd'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Docswell slide on my website?',
      answer:
        'Paste any Docswell slide URL into the tool and click Generate. You will get a ready-to-paste iframe viewer.'
    },
    {
      question: 'What Docswell content can I embed?',
      answer:
        'Presentation slide decks, PDFs, and documents published on Docswell are all supported.'
    },
    {
      question: 'Can I embed private Docswell slides?',
      answer:
        'Only slides set to public can be embedded. Private or limited-share documents will not load in the viewer.'
    },
    {
      question: 'What if the slide cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card with the title and thumbnail so you still get a clean, linkable result.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const DocswellPage = () => <ProviderSubtool {...data} />

export default DocswellPage
