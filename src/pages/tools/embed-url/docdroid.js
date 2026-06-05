import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'DocDroid',
  slug: 'docdroid',
  color: '#005757',
  exampleUrl:
    'https://www.docdroid.net/GvPeRnM/1327556010-50thingsyourenotsupposedtoknow-pdf',
  metaTitle: 'DocDroid Embed Code Generator — Embed PDFs & Documents',
  metaDescription:
    'Free DocDroid embed code generator. Paste any DocDroid URL — get a ready-to-paste iframe viewer for hosted PDF, DOC, and DOCX documents. No signup.',
  keywords: [
    'embed docdroid',
    'docdroid embed code',
    'docdroid embed code generator',
    'embed docdroid pdf',
    'docdroid iframe code',
    'docdroid document embed',
    'embed pdf document'
  ],
  heroTitle: 'DocDroid Embed Code Generator',
  heroSubtitle:
    'Paste any DocDroid URL — get a ready-to-paste iframe viewer for hosted PDF, DOC, and DOCX documents.',
  howItWorksHeading: 'How to embed DocDroid documents',
  howItWorksSteps: [
    {
      title: 'Paste a DocDroid link',
      description:
        'Copy any docdroid.net document link — hosted PDF, DOC, and DOCX files.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the document and generates the responsive iframe viewer HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our DocDroid embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building the iframe markup by hand. Paste any DocDroid link and get working embed HTML.'
    },
    {
      title: 'Responsive document viewer',
      description:
        'The generated iframe scales to fit your layout so documents stay readable on any screen.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 DocDroid embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native document viewer',
      description:
        'Get the real DocDroid viewer so readers can page through the document inline without downloading it.'
    },
    {
      title: 'PDF, DOC & DOCX',
      description:
        'Works with the document formats DocDroid hosts — PDFs, Word files, and other shared documents.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/scribd',
      label: 'Scribd'
    },
    {
      href: '/tools/embed-url/documentcloud',
      label: 'DocumentCloud'
    },
    {
      href: '/tools/embed-url/issuu',
      label: 'Issuu'
    }
  ],
  faq: [
    {
      question: 'How do I embed a DocDroid document on my website?',
      answer:
        'Paste any DocDroid URL into the tool and click Generate. You will get a ready-to-paste iframe viewer.'
    },
    {
      question: 'What document types does DocDroid embed?',
      answer:
        'DocDroid hosts and displays PDF, DOC, and DOCX files, and the viewer renders them in the browser without a download.'
    },
    {
      question: 'Is the embedded viewer responsive?',
      answer:
        'Yes. The iframe scales to the width of its container so the document stays readable on desktop and mobile.'
    },
    {
      question: 'What if the document is private or password protected?',
      answer:
        'Private or password-protected documents will not embed publicly. Use Card mode to generate a styled preview card instead.'
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
