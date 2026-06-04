import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Wizer',
  slug: 'wizer-me',
  color: '#00B0D7',
  exampleUrl: 'https://app.wizer.me',
  metaTitle: 'Wizer Embed Code Generator — Embed Interactive Worksheets',
  metaDescription:
    'Free Wizer embed code generator. Paste any Wizer URL — get a ready-to-paste embed for interactive, digital worksheets with questions, images, audio, and video. No signup.',
  keywords: [
    'embed wizer',
    'wizer embed code',
    'wizer embed code generator',
    'embed wizer worksheet',
    'wizer iframe code',
    'wizer worksheet embed',
    'embed interactive worksheet'
  ],
  heroTitle: 'Wizer Embed Code Generator',
  heroSubtitle:
    'Paste any Wizer URL — get a ready-to-paste embed for interactive, digital worksheets with questions, images, audio, and video.',
  howItWorksHeading: 'How to embed Wizer worksheets',
  howItWorksSteps: [
    {
      title: 'Paste a Wizer link',
      description:
        'Copy the URL of any Wizer worksheet from wizer.me and drop it into the field above.'
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
  explanationHeading: 'Why use our Wizer embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip hunting for share menus and iframe snippets. Paste a worksheet link and get working embed HTML instantly.'
    },
    {
      title: 'Keeps worksheets interactive',
      description:
        'The embed preserves the live worksheet so students can answer questions, watch video, and listen to audio in place.'
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
      title: 'Interactive worksheet embed',
      description:
        'Embed the full Wizer worksheet so it stays clickable and answerable inside your page.'
    },
    {
      title: 'Rich media support',
      description:
        'Questions, images, audio, and video carry over into the embed exactly as built in Wizer.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/learningapps-org', label: 'LearningApps' },
    { href: '/tools/embed-url/sutori', label: 'Sutori' },
    { href: '/tools/embed-url/skoletube', label: 'Skoletube' }
  ],
  faq: [
    {
      question: 'How do I embed a Wizer worksheet on my website?',
      answer:
        'Paste the worksheet URL into the tool, click Generate, then copy the HTML into your page or learning platform.'
    },
    {
      question: 'Will students be able to answer questions in the embed?',
      answer:
        'Yes. The embed keeps the worksheet interactive, so learners can respond to questions directly within the page.'
    },
    {
      question: 'Does the embed support images, audio, and video?',
      answer:
        'It does. Any media you added in Wizer, including images, audio, and video, is included in the embed.'
    },
    {
      question: 'What if the worksheet is private or unpublished?',
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
