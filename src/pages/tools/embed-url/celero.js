import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Celero',
  slug: 'celero',
  color: '#0E6EFF',
  exampleUrl: 'https://embeds.celero.io/s/4602bc43',
  metaTitle: 'Celero Embed Code Generator — Embed Celero Microsites',
  metaDescription:
    'Free Celero embed code generator. Paste a Celero microsite URL — get a ready-to-paste embed or styled preview card. No signup.',
  keywords: [
    'embed celero',
    'celero embed code',
    'celero embed code generator',
    'embed celero microsite',
    'celero iframe code',
    'celero oembed',
    'celero microsite embed'
  ],
  heroTitle: 'Celero Embed Code Generator',
  heroSubtitle:
    'Paste a Celero microsite URL — get a ready-to-paste embed or styled preview card.',
  howItWorksHeading: 'How to embed a Celero microsite',
  howItWorksSteps: [
    {
      title: 'Paste a Celero link',
      description:
        'Copy the share link to your published celero.io microsite — the URL from the Share menu or an embeds.celero.io link.'
    },
    {
      title: 'Get the embed code',
      description: 'The tool reads the page and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Celero embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Share menu and oEmbed options. Paste a Celero link and get working embed HTML.'
    },
    {
      title: 'Works with microsites',
      description:
        'Embed interactive Celero microsites built from your Canva, Figma, Adobe, Office, PDF, or Google Drive content.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Celero embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Interactive microsite embed',
      description:
        'Embed the Celero microsite so visitors can scroll, watch, and interact without leaving your site.'
    },
    {
      title: 'Responsive layout',
      description:
        'The embed adapts to your page width so it looks right on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' },
    { href: '/tools/embed-url/twitter-or-x', label: 'Twitter / X' }
  ],
  faq: [
    {
      question: 'How do I embed a Celero microsite on my website?',
      answer:
        'Open your Celero microsite, copy its share link, paste it into the tool, and click Generate to get ready-to-paste embed HTML.'
    },
    {
      question: 'What Celero content can I embed?',
      answer:
        'Published Celero microsites, including those built from Canva designs, Figma files, PDFs, slides, and other imported content.'
    },
    {
      question: 'What if the Celero microsite is private or unpublished?',
      answer:
        'Embedding needs a publicly accessible link. If the microsite cannot be reached, the tool falls back to a styled preview card with the available metadata.'
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
