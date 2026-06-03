import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Ceros',
  slug: 'ceros',
  color: '#FF94D2',
  exampleUrl: 'https://view.ceros.com/medidata/magazine-training-experience',
  metaTitle: 'Ceros Embed Code Generator — Embed Interactive Experiences',
  metaDescription:
    'Free Ceros embed code generator. Paste any Ceros URL — get a ready-to-paste iframe for interactive experiences, infographics, and animated content. No signup.',
  keywords: [
    'embed ceros',
    'ceros embed code',
    'ceros embed code generator',
    'embed ceros experience',
    'ceros iframe code',
    'embed ceros interactive content',
    'ceros experience embed'
  ],
  heroTitle: 'Ceros Embed Code Generator',
  heroSubtitle:
    'Paste any Ceros URL — get a ready-to-paste iframe for interactive experiences, infographics, and animated content.',
  howItWorksHeading: 'How to embed a Ceros experience',
  howItWorksSteps: [
    {
      title: 'Paste a Ceros link',
      description:
        'Copy any published Ceros experience URL from view.ceros.com — interactive reports, infographics, and brand experiences.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the experience and generates the right responsive iframe embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Ceros embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Ceros publish dialog. Paste any view.ceros.com link and get working embed HTML.'
    },
    {
      title: 'Interactive experiences',
      description:
        'Works with Ceros interactive reports, infographics, presentations, and animated experiences.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Ceros embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Ceros embed',
      description:
        'Get the real Ceros experience with full animation and interactivity when the experience is public.'
    },
    {
      title: 'Responsive iframe',
      description:
        'The embed scales to fit the width of whatever container you place it in, on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/framer', label: 'Framer' },
    { href: '/tools/embed-url/canva', label: 'Canva' },
    { href: '/tools/embed-url/infogram', label: 'Infogram' }
  ],
  faq: [
    {
      question: 'How do I embed a Ceros experience on my website?',
      answer:
        'Paste any published view.ceros.com URL into the tool and click Generate. You will get a ready-to-paste responsive iframe.'
    },
    {
      question: 'What kind of Ceros content can I embed?',
      answer:
        'Interactive experiences such as reports, infographics, presentations, ebooks, and animated brand content published from Ceros Studio.'
    },
    {
      question: 'Will animations and interactions still work in the embed?',
      answer:
        'Yes. When the experience is public, the native embed preserves the full animation and interactivity of the original Ceros experience.'
    },
    {
      question: 'What if the Ceros experience is private or unpublished?',
      answer:
        'The tool falls back to a styled preview card with the available title and image metadata.'
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
