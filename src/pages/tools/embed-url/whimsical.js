import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Whimsical',
  slug: 'whimsical',
  color: '#220A33',
  exampleUrl:
    'https://whimsical.com/simple-flowchart-example-DcDqomwqNHqo2xkPHyVw1n',
  metaTitle:
    'Whimsical Embed Code Generator — Embed Flowcharts, Wireframes & Mind Maps',
  metaDescription:
    'Free Whimsical embed code generator. Paste any Whimsical URL — get a ready-to-paste embed for flowcharts, wireframes, mind maps, and docs. No signup.',
  keywords: [
    'embed whimsical',
    'whimsical embed code',
    'whimsical embed code generator',
    'embed whimsical flowchart',
    'embed whimsical wireframe',
    'embed whimsical mind map',
    'whimsical iframe code',
    'embed whimsical board'
  ],
  heroTitle: 'Whimsical Embed Code Generator',
  heroSubtitle:
    'Paste any Whimsical URL — get a ready-to-paste embed for flowcharts, wireframes, mind maps, and docs.',
  howItWorksHeading: 'How to embed Whimsical content',
  howItWorksSteps: [
    {
      title: 'Paste a Whimsical link',
      description:
        'Copy any whimsical.com URL — flowcharts, wireframes, mind maps, and docs.'
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
  explanationHeading: 'Why use our Whimsical embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual embed configuration. Paste any Whimsical link and get working embed HTML.'
    },
    {
      title: 'All Whimsical content',
      description:
        'Works with flowcharts, wireframes, mind maps, and docs — the tool handles all Whimsical URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Whimsical embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Interactive board embed',
      description:
        'Get the real Whimsical embed so readers can pan and zoom the board right on your page.'
    },
    {
      title: 'Flowcharts, wireframes & mind maps',
      description:
        'Flowcharts, wireframes, mind maps, sticky notes, and docs — all Whimsical content types work.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/miro', label: 'Miro' },
    { href: '/tools/embed-url/figma', label: 'Figma' },
    { href: '/tools/embed-url/balsamiq', label: 'Balsamiq' }
  ],
  faq: [
    {
      question: 'How do I embed a Whimsical flowchart on my website?',
      answer:
        'Paste any Whimsical URL into the tool and click Generate. You will get a ready-to-paste embed snippet for your page.'
    },
    {
      question: 'What Whimsical content can I embed?',
      answer:
        'Flowcharts, wireframes, mind maps, sticky notes, and docs are all supported.'
    },
    {
      question: 'Does the embed stay interactive?',
      answer:
        'Yes. The native embed lets readers pan and zoom the board, and it scales to fit your layout.'
    },
    {
      question: 'What if the Whimsical board is private?',
      answer:
        'Native embedding needs public access enabled on the board. When it is restricted, the tool falls back to a styled preview card with the available metadata.'
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
