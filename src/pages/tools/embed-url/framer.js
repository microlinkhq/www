import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Framer',
  slug: 'framer',
  color: '#0099FF',
  exampleUrl: 'https://pearl.framer.website/',
  metaTitle: 'Framer Embed Code Generator — Embed Published Sites & Prototypes',
  metaDescription:
    'Free Framer embed code generator. Paste a Framer URL — get a ready-to-paste iframe for published sites, landing pages, and prototypes. No signup.',
  keywords: [
    'embed framer',
    'framer embed code',
    'framer embed code generator',
    'embed framer site',
    'embed framer prototype',
    'framer iframe code',
    'embed framer website',
    'framer landing page embed'
  ],
  heroTitle: 'Framer Embed Code Generator',
  heroSubtitle:
    'Paste a Framer URL — get a ready-to-paste iframe for published sites, landing pages, and prototypes.',
  howItWorksHeading: 'How to embed Framer content',
  howItWorksSteps: [
    {
      title: 'Paste a Framer link',
      description:
        'Copy a published Framer URL — framer.website sites, custom domains, and live prototypes all work.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the page and generates a responsive iframe you can drop into any layout.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Framer embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing iframe markup by hand. Paste any Framer link and get working embed HTML.'
    },
    {
      title: 'Sites and prototypes',
      description:
        'Works with published Framer websites, landing pages, and interactive prototypes.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Framer embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Live, interactive embed',
      description:
        'Embed the real published Framer page so visitors can scroll and interact with it inline.'
    },
    {
      title: 'Responsive iframe',
      description:
        'The embed adapts to your container width so the Framer page looks right on any screen.'
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
      href: '/tools/embed-url/canva',
      label: 'Canva'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Framer site on my website?',
      answer:
        'Paste your published Framer URL into the tool and click Generate. You will get a ready-to-paste iframe.'
    },
    {
      question: 'Can I embed a Framer prototype?',
      answer:
        'Yes. Published Framer sites, landing pages, and interactive prototypes are all supported.'
    },
    {
      question: 'What if my Framer page cannot be embedded?',
      answer:
        'Some pages block iframe embedding through HTTP headers. When that happens, switch to Card mode to generate a styled preview card with the title and image instead.'
    },
    {
      question: 'Is the embedded Framer page interactive?',
      answer:
        'Yes. The native embed loads the live published page, so visitors can scroll and interact with it just like the original.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const FramerPage = () => <ProviderSubtool {...data} />

export default FramerPage
