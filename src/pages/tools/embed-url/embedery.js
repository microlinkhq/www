import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Embedery',
  slug: 'embedery',
  color: '#111111',
  exampleUrl: 'https://embedery.com/gallery/goals/signup-modal',
  metaTitle: 'Embedery Embed Code Generator — Embed Popups & Widgets',
  metaDescription:
    'Free Embedery embed code generator. Paste an Embedery popup, widget, or gallery URL and get ready-to-paste embed HTML for popups, top bars, and surveys. No signup.',
  keywords: [
    'embed embedery',
    'embedery embed code',
    'embedery embed code generator',
    'embed embedery popup',
    'embedery iframe code',
    'embedery widget embed',
    'embed embedery survey'
  ],
  heroTitle: 'Embedery Embed Code Generator',
  heroSubtitle:
    'Paste an Embedery popup or widget URL — get ready-to-paste embed HTML for popups, top bars, and surveys.',
  howItWorksHeading: 'How to embed Embedery content',
  howItWorksSteps: [
    {
      title: 'Paste an Embedery link',
      description:
        'Copy any embedery.com URL — popups, widgets, top bars, micro surveys, and gallery templates.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the Embedery URL and generates the right embed HTML automatically.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Embedery embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the install snippet and dashboard steps. Paste an Embedery link and get working embed HTML.'
    },
    {
      title: 'All Embedery formats',
      description:
        'Works with popups, popovers, top bars, sidebars, and micro surveys — the tool handles the Embedery URL.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Embedery embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Embedery in-web messages',
      description:
        'Embed the interactive Embedery experience — popups, top bars, and surveys built to convert visitors.'
    },
    {
      title: 'Popups, surveys & widgets',
      description:
        'Lead-capture popups, feedback micro surveys, social proof, and promotional widgets are all supported.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/pinpoll',
      label: 'Pinpoll'
    },
    {
      href: '/tools/embed-url/poll-daddy',
      label: 'Poll Daddy'
    },
    {
      href: '/tools/embed-url/padlet',
      label: 'Padlet'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Embedery popup on my website?',
      answer:
        'Paste your Embedery URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'What Embedery content can I embed?',
      answer:
        'Popups, popovers, top bars, sidebars, micro surveys, and gallery templates are all supported.'
    },
    {
      question: 'Can I show a preview card instead of the live popup?',
      answer:
        'Yes. Switch to Card mode to generate a styled preview card with a title and image when native embedding is restricted.'
    },
    {
      question: 'Will the embed stay responsive on mobile?',
      answer:
        'Yes. The generated embed adapts to its container, so Embedery content stays usable on phones and tablets.'
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
