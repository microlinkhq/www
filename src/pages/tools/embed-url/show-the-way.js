import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Show the Way',
  slug: 'show-the-way',
  color: '#2E7D32',
  exampleUrl: 'https://showtheway.io',
  metaTitle: 'Show the Way Embed Code Generator — Embed Maps & Directions',
  metaDescription:
    'Free Show the Way embed code generator. Paste any Show the Way URL — get a ready-to-paste embed for maps and directions. No signup.',
  keywords: [
    'embed show the way',
    'show the way embed code',
    'show the way embed code generator',
    'embed show the way map',
    'show the way iframe code',
    'embed show the way directions',
    'show the way map embed'
  ],
  heroTitle: 'Show the Way Embed Code Generator',
  heroSubtitle:
    'Paste any Show the Way URL — get a ready-to-paste embed for maps, directions, and wayfinding.',
  howItWorksHeading: 'How to embed Show the Way maps',
  howItWorksSteps: [
    {
      title: 'Paste a Show the Way link',
      description:
        'Copy the URL of any Show the Way map or set of directions and paste it into the tool.'
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
  explanationHeading: 'Why use our Show the Way embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Show the Way link and get working embed HTML without copying iframe code by hand.'
    },
    {
      title: 'Built for maps and directions',
      description:
        'Handles Show the Way maps and wayfinding so the interactive view loads correctly on your page.'
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
      title: 'Interactive map embed',
      description:
        'Embeds Show the Way maps with pan and zoom so readers can explore the route in place.'
    },
    {
      title: 'Responsive layout',
      description:
        'The generated embed scales to fit articles, landing pages, and mobile screens.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/naturalatlas', label: 'Natural Atlas' },
    { href: '/tools/embed-url/scribblemaps', label: 'Scribble Maps' },
    { href: '/tools/embed-url/storymaps', label: 'StoryMaps' }
  ],
  faq: [
    {
      question: 'How do I embed a Show the Way map on my website?',
      answer:
        'Paste the Show the Way URL into the tool, click Generate, then copy the embed HTML into your page.'
    },
    {
      question: 'Can I embed directions and wayfinding?',
      answer:
        'Yes. The tool works with Show the Way maps and directions, generating an embed you can drop anywhere.'
    },
    {
      question: 'Does the map stay interactive once embedded?',
      answer:
        'When native embedding is supported, the map keeps its pan and zoom controls inside your page.'
    },
    {
      question: 'What if the Show the Way map is private?',
      answer:
        'The tool falls back to a styled preview card with whatever metadata is available.'
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
