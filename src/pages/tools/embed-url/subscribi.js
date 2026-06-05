import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Subscribi',
  slug: 'subscribi',
  color: '#2D6CDF',
  exampleUrl: 'https://subscribi.io',
  metaTitle: 'Subscribi Embed Code Generator — Embed Subscription Forms',
  metaDescription:
    'Free Subscribi embed code generator. Paste any Subscribi URL — get a ready-to-paste embed for subscription forms and newsletter signups. No signup.',
  keywords: [
    'embed subscribi',
    'subscribi embed code',
    'subscribi embed code generator',
    'embed subscribi form',
    'subscribi iframe code',
    'subscribi newsletter embed',
    'embed subscription form'
  ],
  heroTitle: 'Subscribi Embed Code Generator',
  heroSubtitle:
    'Paste any Subscribi URL — get a ready-to-paste embed for subscription forms and newsletter signups.',
  howItWorksHeading: 'How to embed Subscribi forms',
  howItWorksSteps: [
    {
      title: 'Paste a Subscribi link',
      description: 'Copy the URL of any Subscribi form or newsletter page.'
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
  explanationHeading: 'Why use our Subscribi embed code generator',
  reasons: [
    {
      title: 'Capture signups inline',
      description:
        'Embed Subscribi subscription forms directly in your content so readers can subscribe without leaving the page.'
    },
    {
      title: 'Grow your newsletter',
      description:
        'Place newsletter signups across posts and landing pages to turn more visitors into subscribers.'
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
      title: 'Subscription form embeds',
      description:
        'Render Subscribi signup forms inline so visitors can join your list right where they are reading.'
    },
    {
      title: 'Responsive sizing',
      description:
        'Forms scale to fit blog posts, landing pages, and sidebars on any device.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/buttondown', label: 'Buttondown' },
    { href: '/tools/embed-url/curated', label: 'Curated' },
    { href: '/tools/embed-url/raindrop', label: 'Raindrop' }
  ],
  faq: [
    {
      question: 'How do I embed a Subscribi form on my website?',
      answer:
        'Paste the Subscribi URL into the tool and click Generate to get ready-to-paste embed HTML.'
    },
    {
      question: 'Can I embed newsletter signups?',
      answer:
        'Yes — paste a Subscribi subscription form or newsletter URL and the tool builds the right embed for it.'
    },
    {
      question: 'What if the Subscribi page is restricted?',
      answer:
        'Restricted pages fall back to a styled preview card built from the available metadata.'
    },
    {
      question: 'Where can I paste the Subscribi embed code?',
      answer:
        'Anywhere that accepts HTML — blog posts, landing pages, docs, and CMS pages.'
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
