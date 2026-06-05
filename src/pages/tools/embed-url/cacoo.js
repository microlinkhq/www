import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Cacoo',
  slug: 'cacoo',
  color: '#4C7EBF',
  exampleUrl: 'https://cacoo.com/diagrams/00e77f4dc9973517',
  metaTitle: 'Cacoo Embed Code Generator — Embed Diagrams & Flowcharts',
  metaDescription:
    'Free Cacoo embed code generator. Paste any Cacoo diagram URL — get ready-to-paste embed HTML for flowcharts, wireframes, and diagrams. No signup.',
  keywords: [
    'embed cacoo',
    'cacoo embed code',
    'cacoo embed code generator',
    'embed cacoo diagram',
    'cacoo iframe code',
    'embed cacoo flowchart',
    'cacoo diagram embed'
  ],
  heroTitle: 'Cacoo Embed Code Generator',
  heroSubtitle:
    'Paste any Cacoo diagram URL — get ready-to-paste embed HTML for flowcharts, wireframes, and diagrams.',
  howItWorksHeading: 'How to embed Cacoo diagrams',
  howItWorksSteps: [
    {
      title: 'Paste a Cacoo link',
      description:
        'Copy a public diagram link from cacoo.com — flowcharts, wireframes, mind maps, and other diagrams.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Cacoo diagram and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Cacoo embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through Cacoo share menus. Paste any public diagram link and get working embed HTML.'
    },
    {
      title: 'All Cacoo diagrams',
      description:
        'Works with flowcharts, wireframes, mind maps, network diagrams, and more — any public Cacoo diagram URL.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Cacoo embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Live Cacoo diagram',
      description:
        'Get the real embedded Cacoo viewer so readers see the diagram directly on your page.'
    },
    {
      title: 'Flowcharts, wireframes & diagrams',
      description:
        'Flowcharts, wireframes, mind maps, and network diagrams — Cacoo diagram types embed the same way.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/miro',
      label: 'Miro'
    },
    {
      href: '/tools/embed-url/whimsical',
      label: 'Whimsical'
    },
    {
      href: '/tools/embed-url/balsamiq',
      label: 'Balsamiq'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Cacoo diagram on my website?',
      answer:
        'Paste a public Cacoo diagram URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'What Cacoo content can I embed?',
      answer:
        'Flowcharts, wireframes, mind maps, network diagrams, and other diagrams created in Cacoo are all supported.'
    },
    {
      question: 'Does the diagram need to be public?',
      answer:
        'Yes. The diagram must have a public link enabled in Cacoo so the embed can display it. Private diagrams will not render.'
    },
    {
      question: 'What if the diagram cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card with the title and image so you still have something to paste.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const CacooPage = () => <ProviderSubtool {...data} />

export default CacooPage
