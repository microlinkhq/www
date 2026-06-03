import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Balsamiq',
  slug: 'balsamiq',
  color: '#AE1C59',
  exampleUrl: 'https://balsamiq.cloud/s1xupvp/p9ozsjm',
  metaTitle: 'Balsamiq Embed Code Generator — Embed Wireframes & Mockups',
  metaDescription:
    'Free Balsamiq embed code generator. Paste a Balsamiq Cloud public review link — get a ready-to-paste embed for your wireframes and mockups. No signup.',
  keywords: [
    'embed balsamiq',
    'balsamiq embed code',
    'balsamiq embed code generator',
    'embed balsamiq wireframe',
    'balsamiq cloud embed',
    'embed balsamiq mockup',
    'balsamiq public review embed',
    'balsamiq iframe code'
  ],
  heroTitle: 'Balsamiq Embed Code Generator',
  heroSubtitle:
    'Paste a Balsamiq Cloud public review link — get a ready-to-paste embed for your wireframes and mockups.',
  howItWorksHeading: 'How to embed a Balsamiq wireframe',
  howItWorksSteps: [
    {
      title: 'Paste a Balsamiq link',
      description:
        'Copy a balsamiq.cloud public review, presentation, or board URL with public reviews enabled.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool resolves the oEmbed-supported link and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Balsamiq embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual oEmbed wiring. Paste any Balsamiq Cloud link and get working embed HTML.'
    },
    {
      title: 'Interactive wireframes',
      description:
        'Readers can navigate your low-fidelity mockups with zoom and full-screen controls, not a flat screenshot.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Balsamiq embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Balsamiq embed',
      description:
        'Get the real Balsamiq Cloud viewer with board navigation, zoom, and full-screen presentation mode.'
    },
    {
      title: 'Wireframes & mockups',
      description:
        'Works with public review projects, presentations, and individual boards — your low-fidelity designs stay interactive.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/figma', label: 'Figma' },
    { href: '/tools/embed-url/whimsical', label: 'Whimsical' },
    { href: '/tools/embed-url/cacoo', label: 'Cacoo' }
  ],
  faq: [
    {
      question: 'How do I embed a Balsamiq wireframe on my website?',
      answer:
        'Enable Public Reviews on your Balsamiq Cloud project, copy the public review link, paste it into the tool, and click Generate to get a ready-to-paste embed snippet.'
    },
    {
      question: 'What Balsamiq links can I embed?',
      answer:
        'Public review project links, full-screen presentation links, and individual board URLs all work, as long as Public Reviews is enabled on the project.'
    },
    {
      question: 'Why does my Balsamiq link not embed?',
      answer:
        'Balsamiq only allows embedding when Public Reviews is turned on in the project Sharing Settings. Private projects fall back to a styled preview card.'
    },
    {
      question: 'What if the Balsamiq project is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata, since private projects cannot be embedded natively.'
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
