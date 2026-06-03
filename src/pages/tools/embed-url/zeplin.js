import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Zeplin',
  slug: 'zeplin',
  color: '#F69833',
  exampleUrl: 'https://scene.zeplin.io/project/55e80ad1b0a7da160ff25004',
  metaTitle: 'Zeplin Embed Code Generator — Embed Design Handoffs',
  metaDescription:
    'Free Zeplin embed code generator. Paste a public Zeplin Scene project link — get a ready-to-paste embed of screens, specs, and styleguides. No signup.',
  keywords: [
    'embed zeplin',
    'zeplin embed code',
    'zeplin embed code generator',
    'embed zeplin project',
    'zeplin scene embed',
    'zeplin design handoff embed',
    'embed zeplin styleguide'
  ],
  heroTitle: 'Zeplin Embed Code Generator',
  heroSubtitle:
    'Paste a public Zeplin Scene project link — get a ready-to-paste embed of your design handoff, screens, and specs.',
  howItWorksHeading: 'How to embed Zeplin designs',
  howItWorksSteps: [
    {
      title: 'Paste a Zeplin link',
      description:
        'Copy a public scene.zeplin.io project link from the Share menu in Zeplin.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the shared project and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Zeplin embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through Zeplin share settings. Paste a public project link and get working embed HTML.'
    },
    {
      title: 'Share design handoffs anywhere',
      description:
        'Surface screens, specs, and styleguides in docs and posts without sending people back into Zeplin.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Zeplin embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Public Scene projects',
      description:
        'Works with publicly shared Zeplin Scene links so readers can browse the handoff in place.'
    },
    {
      title: 'Screens, specs & styleguides',
      description:
        'Show off connected screens, design specs, colors, and text styles from the shared project.'
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
      href: '/tools/embed-url/sketch',
      label: 'Sketch'
    },
    {
      href: '/tools/embed-url/framer',
      label: 'Framer'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Zeplin project on my website?',
      answer:
        'Share your Zeplin project publicly to get a Scene link, paste that URL into the tool, and click Generate to get ready-to-paste embed HTML.'
    },
    {
      question: 'What Zeplin content can I embed?',
      answer:
        'Publicly shared Scene projects, including their screens, design specs, colors, and styleguides.'
    },
    {
      question: 'Can I embed a private Zeplin project?',
      answer:
        'No. Only projects you have shared publicly via a Zeplin Scene link can be embedded, since private projects require a login.'
    },
    {
      question: 'What if the project will not embed?',
      answer:
        'Switch to Card mode to generate a styled preview card with the project title and image instead.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const ZeplinPage = () => <ProviderSubtool {...data} />

export default ZeplinPage
