import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Mermaid.ink',
  slug: 'mermaid-ink',
  color: '#FF3670',
  exampleUrl: 'https://mermaid.ink',
  metaTitle:
    'Mermaid.ink Embed Code Generator — Embed Mermaid Diagrams as Images',
  metaDescription:
    'Free Mermaid.ink embed code generator. Paste any mermaid.ink URL — get a ready-to-paste embed for flowcharts, sequence diagrams, gantt charts, and more. No signup.',
  keywords: [
    'embed mermaid ink',
    'mermaid ink embed code',
    'mermaid ink embed code generator',
    'embed mermaid diagram',
    'mermaid diagram image embed',
    'embed flowchart image',
    'mermaid ink iframe code'
  ],
  heroTitle: 'Mermaid.ink Embed Code Generator',
  heroSubtitle:
    'Paste any Mermaid.ink URL — get a ready-to-paste embed for Mermaid diagrams rendered as shareable images: flowcharts, sequence diagrams, gantt charts, and more.',
  howItWorksHeading: 'How to embed Mermaid.ink diagrams',
  howItWorksSteps: [
    {
      title: 'Paste a Mermaid.ink link',
      description:
        'Copy the mermaid.ink URL that renders your diagram definition.'
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
  explanationHeading: 'Why use our Mermaid.ink embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Mermaid.ink link and get working embed HTML without hand-writing image tags.'
    },
    {
      title: 'Built for Mermaid diagrams',
      description:
        'Embeds the rendered image of flowcharts, sequence diagrams, gantt charts, and other Mermaid definitions.'
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
      title: 'Diagram as image',
      description:
        'Mermaid.ink renders the diagram to an image, so it shows up anywhere that allows images.'
    },
    {
      title: 'All diagram types',
      description:
        'Works with flowcharts, sequence diagrams, gantt charts, and the rest of the Mermaid syntax.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/whimsical', label: 'Whimsical' },
    { href: '/tools/embed-url/cacoo', label: 'Cacoo' },
    { href: '/tools/embed-url/datawrapper', label: 'Datawrapper' }
  ],
  faq: [
    {
      question: 'How do I embed a Mermaid.ink diagram on my website?',
      answer:
        'Paste the mermaid.ink URL into the tool, click Generate, and copy the embed HTML into your page.'
    },
    {
      question: 'What diagram types does Mermaid.ink support?',
      answer:
        'Mermaid.ink renders flowcharts, sequence diagrams, gantt charts, and other diagram types from Mermaid definitions.'
    },
    {
      question: 'Is the diagram embedded as an image?',
      answer:
        'Yes. Mermaid.ink renders the Mermaid definition into an image, which you can embed anywhere images are allowed.'
    },
    {
      question: 'Will the diagram stay sharp when scaled?',
      answer:
        'Mermaid.ink can serve crisp output, so the embedded diagram stays readable across screen sizes.'
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
