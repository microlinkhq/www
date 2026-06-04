import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Sizzle',
  slug: 'sizzle',
  color: '#666666',
  exampleUrl: 'https://sizzle.gg',
  metaTitle: 'Sizzle Embed Code Generator — Embed Sizzle Pages',
  metaDescription:
    'Free Sizzle embed code generator. Paste any Sizzle URL — get a ready-to-paste embed for pages and shared content. No signup.',
  keywords: [
    'embed sizzle',
    'sizzle embed code',
    'sizzle embed code generator',
    'embed sizzle page',
    'sizzle iframe code',
    'sizzle embed link',
    'sizzle page embed'
  ],
  heroTitle: 'Sizzle Embed Code Generator',
  heroSubtitle:
    'Paste any Sizzle URL — get a ready-to-paste embed for pages and shared content.',
  howItWorksHeading: 'How to embed Sizzle content',
  howItWorksSteps: [
    {
      title: 'Paste a Sizzle link',
      description:
        'Copy any Sizzle page or shared URL and paste it into the tool.'
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
  explanationHeading: 'Why use our Sizzle embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Sizzle link and get working embed HTML without writing markup by hand.'
    },
    {
      title: 'Works with any Sizzle URL',
      description:
        'Handles Sizzle pages and shared content so the embed renders cleanly on your site.'
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
      title: 'Page and link embeds',
      description:
        'Turns any Sizzle URL into a clean embed you can place inside your own pages.'
    },
    {
      title: 'Responsive output',
      description:
        'The generated embed scales to fit articles, sidebars, and mobile layouts.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/raindrop', label: 'Raindrop' },
    { href: '/tools/embed-url/curated', label: 'Curated' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' }
  ],
  faq: [
    {
      question: 'How do I embed Sizzle content on my website?',
      answer:
        'Paste the Sizzle URL into the tool, click Generate, then copy the embed HTML into your page.'
    },
    {
      question: 'What kind of Sizzle links can I embed?',
      answer:
        'The tool accepts Sizzle pages and shared URLs and generates an embed you can drop anywhere.'
    },
    {
      question: 'Does the embed work on mobile?',
      answer:
        'Yes. The generated embed is responsive and adapts to phones, tablets, and desktop layouts.'
    },
    {
      question: 'What if the Sizzle content cannot be embedded directly?',
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
