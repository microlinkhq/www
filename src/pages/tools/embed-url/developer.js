import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Developer',
  slug: 'developer',
  color: '#212121',
  exampleUrl: 'https://developer.li',
  metaTitle: 'Developer Embed Code Generator — Embed Developer Pages',
  metaDescription:
    'Free Developer embed code generator. Paste a developer.li URL — get a ready-to-paste embed or a styled preview card. No signup.',
  keywords: [
    'embed developer',
    'developer embed code',
    'developer embed code generator',
    'developer.li embed',
    'embed developer page',
    'developer link preview',
    'developer iframe code'
  ],
  heroTitle: 'Developer Embed Code Generator',
  heroSubtitle:
    'Paste a developer.li URL — get a ready-to-paste embed or a styled preview card.',
  howItWorksHeading: 'How to embed a Developer page',
  howItWorksSteps: [
    {
      title: 'Paste a Developer link',
      description: 'Copy any developer.li page URL and paste it into the tool.'
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
  explanationHeading: 'Why use our Developer embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing iframe markup by hand. Paste a developer.li link and get working embed HTML.'
    },
    {
      title: 'Works with any page',
      description:
        'Point it at any developer.li URL — the tool reads the page metadata and builds the embed for you.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Developer embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native embed when available',
      description:
        'When developer.li exposes an embeddable view, you get the real interactive embed.'
    },
    {
      title: 'Clean metadata extraction',
      description:
        'The tool pulls the page title, description, and image so the embed looks right anywhere.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/codepen', label: 'CodePen' },
    { href: '/tools/embed-url/codesandbox', label: 'CodeSandbox' },
    { href: '/tools/embed-url/replit', label: 'Replit' }
  ],
  faq: [
    {
      question: 'How do I embed a Developer page on my website?',
      answer:
        'Paste a developer.li URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'What does the embed include?',
      answer:
        'It uses the page metadata — title, description, and image — so the embed reflects the linked content.'
    },
    {
      question: 'What if the page cannot be embedded natively?',
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
