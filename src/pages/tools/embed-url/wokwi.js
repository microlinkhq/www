import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Wokwi',
  slug: 'wokwi',
  color: '#2196F3',
  exampleUrl: 'https://wokwi.com/projects/297779324291908105',
  metaTitle: 'Wokwi Embed Code Generator — Embed Arduino & ESP32 Simulations',
  metaDescription:
    'Free Wokwi embed code generator. Paste any Wokwi project URL — get a ready-to-paste iframe for Arduino, ESP32, and Raspberry Pi Pico simulations. No signup.',
  keywords: [
    'embed wokwi',
    'wokwi embed code',
    'wokwi embed code generator',
    'embed wokwi project',
    'wokwi iframe code',
    'embed arduino simulation',
    'embed esp32 simulator'
  ],
  heroTitle: 'Wokwi Embed Code Generator',
  heroSubtitle:
    'Paste any Wokwi project URL — get a ready-to-paste iframe for Arduino, ESP32, and Raspberry Pi Pico simulations.',
  howItWorksHeading: 'How to embed a Wokwi project',
  howItWorksSteps: [
    {
      title: 'Paste a Wokwi link',
      description:
        'Copy any wokwi.com/projects URL — Arduino, ESP32, STM32, and Raspberry Pi Pico simulations.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the project and generates the right embed HTML.'
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
        'Skip writing the iframe by hand. Paste any Wokwi project link and get working embed HTML.'
    },
    {
      title: 'All Wokwi simulations',
      description:
        'Works with Arduino, ESP32, STM32, and Raspberry Pi Pico projects — the tool handles all Wokwi URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Wokwi embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Interactive simulator embed',
      description:
        'Get the real Wokwi iframe so readers can run the circuit and edit the code right on your page.'
    },
    {
      title: 'Microcontrollers & sensors',
      description:
        'Embeds projects built around ESP32, Arduino, STM32, and Raspberry Pi Pico with their wired-up parts.'
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
      question: 'How do I embed a Wokwi project on my website?',
      answer:
        'Paste any Wokwi project URL into the tool and click Generate. You will get a ready-to-paste iframe embed.'
    },
    {
      question: 'What kinds of Wokwi projects can I embed?',
      answer:
        'Arduino, ESP32, STM32, and Raspberry Pi Pico simulations — including their wiring, sensors, and displays.'
    },
    {
      question: 'Can readers run and edit the code in the embed?',
      answer:
        'Yes. The native Wokwi iframe is interactive, so visitors can start the simulation and tweak the code in place.'
    },
    {
      question: 'What if the Wokwi project is private?',
      answer:
        'Only public projects can be embedded. For restricted links the tool falls back to a styled preview card with the available metadata.'
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
