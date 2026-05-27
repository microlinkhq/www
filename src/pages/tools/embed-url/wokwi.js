import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Wokwi',
  slug: 'wokwi',
  color: '#3751C7',
  exampleUrl: 'https://wokwi.com',
  metaTitle: 'Wokwi Embed Code Generator — Embed Arduino and ESP32 simulations',
  metaDescription:
    'Free Wokwi embed code generator. Paste any Wokwi URL — get a ready-to-paste embed for Arduino and ESP32 simulations. No signup.',
  keywords: ['embed wokwi', 'wokwi embed code', 'wokwi simulation embed'],
  heroTitle: 'Wokwi Embed Code Generator',
  heroSubtitle:
    'Paste any Wokwi URL — get a ready-to-paste embed for Arduino and ESP32 simulations.',
  howItWorksHeading: 'How to embed Wokwi content',
  howItWorksSteps: [
    {
      title: 'Paste a Wokwi link',
      description: 'Copy any wokwi.com URL — Arduino and ESP32 simulations.'
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
  explanationHeading: 'Why use our Wokwi embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Wokwi link and get working embed HTML.'
    },
    {
      title: 'All Wokwi content',
      description:
        'Works with Arduino and ESP32 simulations — the tool handles all Wokwi URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Wokwi embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Wokwi embed with full interactivity when available.'
    },
    {
      title: 'All Arduino and ESP32 simulations',
      description:
        'Works with Arduino and ESP32 simulations — all Wokwi content types.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/embed/providers', label: 'All providers' }
  ],
  faq: [
    {
      question: 'How do I embed Wokwi content on my website?',
      answer:
        'Paste any Wokwi URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Wokwi embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Wokwi content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
