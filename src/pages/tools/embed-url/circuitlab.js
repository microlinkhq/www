import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'CircuitLab',
  slug: 'circuitlab',
  color: '#0088cc',
  exampleUrl:
    'https://www.circuitlab.com/circuit/mp673a/two-leds-separate-vs-shared-resistor/',
  metaTitle:
    'CircuitLab Embed Code Generator — Embed Schematics & Circuit Simulations',
  metaDescription:
    'Free CircuitLab embed code generator. Paste a CircuitLab URL to embed interactive schematics and circuit simulations on your site. No signup.',
  keywords: [
    'embed circuitlab',
    'circuitlab embed code',
    'embed circuitlab schematic',
    'embed circuit simulation',
    'circuitlab iframe',
    'circuit schematic embed',
    'embed electronic schematic',
    'circuitlab embed generator'
  ],
  heroTitle: 'CircuitLab Embed Code Generator',
  heroSubtitle:
    'Paste a CircuitLab URL to get ready-to-paste embed code for interactive schematics and circuit simulations.',
  howItWorksHeading: 'How to embed a CircuitLab schematic',
  howItWorksSteps: [
    {
      title: 'Paste a CircuitLab link',
      description:
        'Copy any circuitlab.com circuit link — a public schematic, simulation, or shared circuit page.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the circuit and generates the embed HTML for the interactive schematic.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our CircuitLab embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building the iframe by hand. Paste a CircuitLab circuit link and get working embed HTML instantly.'
    },
    {
      title: 'Interactive simulations',
      description:
        'Embed live schematics readers can explore and simulate, not just a static screenshot of the circuit.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 CircuitLab embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native interactive embed',
      description:
        'Get the real CircuitLab embed so readers can view and run the simulation right on your page.'
    },
    {
      title: 'Schematics & simulations',
      description:
        'Works with CircuitLab schematic editor circuits and analog or digital circuit simulations.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/wokwi', label: 'Wokwi' },
    { href: '/tools/embed-url/altium', label: 'Altium' },
    { href: '/tools/embed-url/codepen', label: 'CodePen' }
  ],
  faq: [
    {
      question: 'How do I embed a CircuitLab circuit on my website?',
      answer:
        'Paste any CircuitLab circuit URL into the tool and click Generate. You will get a ready-to-paste embed snippet for the schematic and simulation.'
    },
    {
      question: 'What CircuitLab content can I embed?',
      answer:
        'Public CircuitLab circuit pages, including the schematic editor view and analog or digital circuit simulations shared from circuitlab.com.'
    },
    {
      question: 'Can readers run the simulation in the embed?',
      answer:
        'When CircuitLab serves an interactive embed, readers can view and run the circuit simulation directly inside your page.'
    },
    {
      question: 'What if the CircuitLab circuit is private?',
      answer:
        'Native embedding needs a public circuit. For private or unlisted circuits the tool falls back to a styled preview card with the available metadata.'
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
