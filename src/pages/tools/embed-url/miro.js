import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Miro',
  slug: 'miro',
  color: '#FFDD33',
  exampleUrl: 'https://miro.com/app/board/o9J_kkQxX78=/',
  metaTitle: 'Miro Embed Code Generator — Embed Boards & Whiteboards',
  metaDescription:
    'Free Miro embed code generator. Paste any Miro board URL — get a ready-to-paste iframe for interactive whiteboards, diagrams, and templates. No signup.',
  keywords: [
    'embed miro',
    'miro embed code',
    'miro embed code generator',
    'embed miro board',
    'miro whiteboard embed',
    'miro iframe code',
    'embed miro diagram'
  ],
  heroTitle: 'Miro Embed Code Generator',
  heroSubtitle:
    'Paste any Miro board URL — get a ready-to-paste iframe for interactive whiteboards, diagrams, and templates.',
  howItWorksHeading: 'How to embed a Miro board',
  howItWorksSteps: [
    {
      title: 'Paste a Miro link',
      description:
        'Copy any public miro.com board, diagram, or Miroverse template link.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the board and generates the right live-embed iframe.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Miro embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building the live-embed iframe by hand. Paste any Miro link and get working embed HTML.'
    },
    {
      title: 'All Miro boards',
      description:
        'Works with whiteboards, diagrams, and Miroverse templates — the tool handles Miro board URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Miro embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Interactive board embed',
      description:
        'Get the real Miro live embed so viewers can zoom, pan, and explore the board.'
    },
    {
      title: 'Whiteboards & diagrams',
      description:
        'Brainstorms, flowcharts, mind maps, and Miroverse templates all embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/figma',
      label: 'Figma'
    },
    {
      href: '/tools/embed-url/whimsical',
      label: 'Whimsical'
    },
    {
      href: '/tools/embed-url/cacoo',
      label: 'Cacoo'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Miro board on my website?',
      answer:
        'Paste any public Miro board URL into the tool and click Generate. You will get a ready-to-paste live-embed iframe.'
    },
    {
      question: 'Can viewers interact with the embedded board?',
      answer:
        'Yes. The Miro live embed lets viewers zoom, pan, and navigate the board directly inside the iframe.'
    },
    {
      question: 'Does the board need to be public?',
      answer:
        'The board must be shared publicly or set to anyone-with-the-link for the embed to display. Private boards will not load for viewers.'
    },
    {
      question: 'What if the board cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card showing the board title and image, which you can customize before copying.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const MiroPage = () => <ProviderSubtool {...data} />

export default MiroPage
