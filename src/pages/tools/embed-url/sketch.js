import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Sketch',
  slug: 'sketch',
  color: '#FDAD00',
  exampleUrl: 'https://www.sketch.com/s/GybzO',
  metaTitle: 'Sketch Embed Code Generator — Embed Designs & Prototypes',
  metaDescription:
    'Free Sketch embed code generator. Paste a Sketch share link — get a ready-to-paste embed for designs, frames, and prototypes. No signup.',
  keywords: [
    'embed sketch',
    'sketch embed code',
    'sketch embed code generator',
    'embed sketch prototype',
    'embed sketch design',
    'sketch iframe code',
    'sketch document embed'
  ],
  heroTitle: 'Sketch Embed Code Generator',
  heroSubtitle:
    'Paste a Sketch share link — get a ready-to-paste embed for designs, frames, and prototypes.',
  howItWorksHeading: 'How to embed a Sketch document',
  howItWorksSteps: [
    {
      title: 'Paste a Sketch link',
      description:
        'Copy a public sketch.com share link to a document, frame, or prototype.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the shared document and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Sketch embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip iFramely and oEmbed wrangling. Paste a Sketch link and get working embed HTML.'
    },
    {
      title: 'Designs & prototypes',
      description:
        'Works with shared documents, individual frames, and interactive prototypes from your Workspace.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Sketch embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Interactive Sketch embed',
      description:
        'Get the real interactive preview — viewers can browse frames, zoom, and toggle dark mode.'
    },
    {
      title: 'Documents, frames & prototypes',
      description:
        'Embed a full document, a single frame, or a clickable prototype shared from your Workspace.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/figma', label: 'Figma' },
    { href: '/tools/embed-url/framer', label: 'Framer' },
    { href: '/tools/embed-url/zeplin', label: 'Zeplin' }
  ],
  faq: [
    {
      question: 'How do I embed a Sketch document on my website?',
      answer:
        'Paste a public sketch.com share link into the tool and click Generate. You will get a ready-to-paste embed.'
    },
    {
      question: 'Can I embed a Sketch prototype?',
      answer:
        'Yes. Shared documents, individual frames, and interactive prototypes are all supported.'
    },
    {
      question: 'Does the embed stay interactive?',
      answer:
        'Yes. The native Sketch preview lets viewers browse frames, zoom, and toggle dark mode without a Workspace account.'
    },
    {
      question: 'What if my Sketch document is private?',
      answer:
        'The document must be set so anyone with the link can view it. Otherwise the tool falls back to a styled preview card with the available metadata.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const SketchPage = () => <ProviderSubtool {...data} />

export default SketchPage
