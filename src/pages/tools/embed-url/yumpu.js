import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Yumpu',
  slug: 'yumpu',
  color: '#4CAF50',
  exampleUrl: 'https://yumpu.com',
  metaTitle: 'Yumpu Embed Code Generator — Embed Digital Magazines & Flipbooks',
  metaDescription:
    'Free Yumpu embed code generator. Paste any Yumpu URL — get a ready-to-paste embed for digital flipbook magazines converted from PDFs. No signup.',
  keywords: [
    'embed yumpu',
    'yumpu embed code',
    'yumpu embed code generator',
    'embed yumpu flipbook',
    'yumpu iframe code',
    'yumpu magazine embed',
    'embed digital flipbook'
  ],
  heroTitle: 'Yumpu Embed Code Generator',
  heroSubtitle:
    'Paste any Yumpu URL — get a ready-to-paste embed for digital flipbook magazines converted from PDFs.',
  howItWorksHeading: 'How to embed Yumpu flipbooks',
  howItWorksSteps: [
    {
      title: 'Paste a Yumpu link',
      description:
        'Copy the URL of any published Yumpu magazine or flipbook from yumpu.com and paste it above.'
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
  explanationHeading: 'Why use our Yumpu embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the share dialog and iframe wrangling. Paste a Yumpu link and get working embed HTML instantly.'
    },
    {
      title: 'Page-flip reading experience',
      description:
        'The embed keeps the digital flipbook intact so visitors can flip through pages just like the original magazine.'
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
      title: 'Flipbook magazine embed',
      description:
        'Embed Yumpu digital magazines with the full page-turning flipbook viewer inside your page.'
    },
    {
      title: 'PDF-based publications',
      description:
        'Works with magazines and catalogs Yumpu converts from PDFs into digital flipbooks.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/speakerdeck', label: 'Speaker Deck' },
    { href: '/tools/embed-url/behance', label: 'Behance' },
    { href: '/tools/embed-url/smugmug', label: 'SmugMug' }
  ],
  faq: [
    {
      question: 'How do I embed a Yumpu flipbook on my website?',
      answer:
        'Paste the magazine URL into the tool, click Generate, then copy the HTML into your page or CMS.'
    },
    {
      question: 'Will readers be able to flip through the pages?',
      answer:
        'Yes. The embed keeps the flipbook viewer intact so visitors can turn pages as in the published edition.'
    },
    {
      question: 'Does it work with magazines made from PDFs?',
      answer:
        'It does. Yumpu turns PDFs into digital flipbooks, and the tool embeds those published magazines directly.'
    },
    {
      question: 'What if the publication is private?',
      answer:
        'The tool falls back to a styled preview card built from the available metadata.'
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
