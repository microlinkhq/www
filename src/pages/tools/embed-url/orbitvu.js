import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Orbitvu',
  slug: 'orbitvu',
  color: '#FF6600',
  exampleUrl: 'https://orbitvu.co',
  metaTitle: 'Orbitvu Embed Code Generator — Embed 360° Product Views',
  metaDescription:
    'Free Orbitvu embed code generator. Paste any Orbitvu URL — get a ready-to-paste embed for 360° interactive product views and spins. No signup.',
  keywords: [
    'embed orbitvu',
    'orbitvu embed code',
    'orbitvu embed code generator',
    'embed orbitvu 360',
    'orbitvu iframe code',
    'orbitvu spin embed',
    'embed orbitvu product view'
  ],
  heroTitle: 'Orbitvu Embed Code Generator',
  heroSubtitle:
    'Paste any Orbitvu URL — get a ready-to-paste embed for 360° interactive product views and spins.',
  howItWorksHeading: 'How to embed Orbitvu content',
  howItWorksSteps: [
    {
      title: 'Paste an Orbitvu link',
      description:
        'Copy the URL of an Orbitvu 360° product view or spin and paste it into the field.'
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
  explanationHeading: 'Why use our Orbitvu embed code generator',
  reasons: [
    {
      title: 'Interactive 360° views, no setup',
      description:
        'Paste an Orbitvu link and get an embed that lets shoppers rotate and zoom the product right on your page.'
    },
    {
      title: 'Built for product photography',
      description:
        'Drop spins straight into product pages so customers can inspect every angle before they buy.'
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
      title: 'Rotatable 360° spins',
      description:
        'Embed interactive Orbitvu spins so visitors can drag to rotate the product through a full turn.'
    },
    {
      title: 'Zoomable product views',
      description:
        'Keep zoom and pan controls intact so shoppers can study fine product detail inside your page.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/smugmug', label: 'SmugMug' },
    { href: '/tools/embed-url/behance', label: 'Behance' },
    { href: '/tools/embed-url/abraia', label: 'Abraia' }
  ],
  faq: [
    {
      question: 'How do I embed an Orbitvu 360° view on my website?',
      answer:
        'Paste the product view URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Can visitors rotate and zoom the embedded product?',
      answer:
        'Yes. The embed keeps the interactive spin controls so visitors can rotate and zoom the product.'
    },
    {
      question: 'Does the Orbitvu embed work on product pages and mobile?',
      answer:
        'Yes. The generated embed is responsive and runs on store product pages, phones, and tablets.'
    },
    {
      question: 'What if the Orbitvu view is private?',
      answer:
        'The tool falls back to a styled preview card with whatever metadata is still available.'
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
