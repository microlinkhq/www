import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Demofly',
  slug: 'demofly',
  color: '#111111',
  exampleUrl: 'https://demofly.com',
  metaTitle: 'Demofly Embed Code Generator — Embed Interactive Demos',
  metaDescription:
    'Free Demofly embed code generator. Paste a Demofly demo URL — get ready-to-paste embed HTML or a styled preview card. No signup.',
  keywords: [
    'embed demofly',
    'demofly embed code',
    'demofly embed code generator',
    'embed demofly demo',
    'demofly iframe code',
    'demofly interactive demo embed',
    'demofly walkthrough embed'
  ],
  heroTitle: 'Demofly Embed Code Generator',
  heroSubtitle:
    'Paste a Demofly demo URL — get ready-to-paste embed HTML or a styled preview card.',
  howItWorksHeading: 'How to embed a Demofly demo',
  howItWorksSteps: [
    {
      title: 'Paste a Demofly link',
      description:
        'Copy the share URL of any demofly.com interactive demo or walkthrough.'
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
  explanationHeading: 'Why use our Demofly embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Demofly link and get working embed HTML — no code to write.'
    },
    {
      title: 'Interactive demos',
      description:
        'Built for sharing Demofly interactive product demos and walkthroughs on any page.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Demofly embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native demo embed',
      description:
        'Get the interactive Demofly demo embedded in-page when the provider allows it.'
    },
    {
      title: 'Responsive layout',
      description:
        'The embed adapts to your container width so demos stay readable on any screen.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/loom',
      label: 'Loom'
    },
    {
      href: '/tools/embed-url/clueso',
      label: 'Clueso'
    },
    {
      href: '/tools/embed-url/vidyard',
      label: 'Vidyard'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Demofly demo on my website?',
      answer:
        'Paste the Demofly demo URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'What kind of Demofly content can I embed?',
      answer:
        'Demofly interactive product demos and walkthroughs shared via a demofly.com link.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The embed adapts to its container so the demo stays readable across screen sizes.'
    },
    {
      question: 'What if the demo is private or cannot be embedded?',
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
