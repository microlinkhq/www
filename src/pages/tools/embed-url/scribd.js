import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Scribd',
  slug: 'scribd',
  color: '#1A7BBA',
  exampleUrl: 'https://www.scribd.com/document/338475927',
  metaTitle: 'Scribd Embed Code Generator — Embed Documents & Presentations',
  metaDescription:
    'Free Scribd embed code generator. Paste any Scribd URL — get a ready-to-paste iframe for documents, PDFs, presentations, and ebooks. No signup.',
  keywords: [
    'embed scribd',
    'scribd embed code',
    'scribd embed code generator',
    'embed scribd document',
    'scribd iframe code',
    'embed scribd pdf',
    'embed scribd presentation'
  ],
  heroTitle: 'Scribd Embed Code Generator',
  heroSubtitle:
    'Paste any Scribd URL — get a ready-to-paste iframe for documents, PDFs, presentations, and ebooks.',
  howItWorksHeading: 'How to embed Scribd documents',
  howItWorksSteps: [
    {
      title: 'Paste a Scribd link',
      description:
        'Copy any scribd.com URL — documents, PDFs, presentations, and ebooks.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the document and generates the right iframe embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Scribd embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Scribd embed menu. Paste any link and get working embed HTML.'
    },
    {
      title: 'All Scribd documents',
      description:
        'Works with documents, PDFs, presentations, and ebooks — the tool handles all Scribd URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Scribd embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Scribd reader',
      description:
        'Get the real Scribd embedded reader with scrollable pages and zoom for public documents.'
    },
    {
      title: 'Documents & presentations',
      description:
        'PDFs, Word docs, slide decks, and ebooks — the responsive iframe fits your layout.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/slideshare', label: 'SlideShare' },
    { href: '/tools/embed-url/issuu', label: 'Issuu' },
    { href: '/tools/embed-url/documentcloud', label: 'DocumentCloud' }
  ],
  faq: [
    {
      question: 'How do I embed a Scribd document on my website?',
      answer:
        'Paste any Scribd URL into the tool and click Generate. You will get a ready-to-paste iframe for the document.'
    },
    {
      question: 'What Scribd content can I embed?',
      answer:
        'Public documents, PDFs, presentations, and ebooks hosted on scribd.com are all supported.'
    },
    {
      question: 'Can I embed a private Scribd document?',
      answer:
        'No. Scribd only allows public documents to be embedded. For private items the tool falls back to a styled preview card with the available metadata.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The native Scribd iframe scales to its container, so the document reader fits any layout width.'
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
