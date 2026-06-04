import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Spyke',
  slug: 'spyke',
  color: '#666666',
  exampleUrl: 'https://spyke.social',
  metaTitle: 'Spyke Embed Code Generator — Embed Spyke Pages & Content',
  metaDescription:
    'Free Spyke embed code generator. Paste any Spyke URL — get a ready-to-paste embed or preview card for pages and shared content. No signup.',
  keywords: [
    'embed spyke',
    'spyke embed code',
    'spyke embed code generator',
    'embed spyke page',
    'spyke iframe code',
    'spyke link embed',
    'embed spyke content'
  ],
  heroTitle: 'Spyke Embed Code Generator',
  heroSubtitle:
    'Paste any Spyke URL — get a ready-to-paste embed or preview card for pages and shared content.',
  howItWorksHeading: 'How to embed Spyke content',
  howItWorksSteps: [
    {
      title: 'Paste a Spyke link',
      description: 'Copy the URL of any Spyke page or shared item.'
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
  explanationHeading: 'Why use our Spyke embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Spyke link and get working embed HTML — no markup to write by hand.'
    },
    {
      title: 'Works with any Spyke link',
      description:
        'Handles Spyke pages and shared content URLs and picks the best display automatically.'
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
      title: 'Auto-detected embeds',
      description:
        'Paste a Spyke URL and the tool builds the right embed for the linked page or content.'
    },
    {
      title: 'Responsive sizing',
      description:
        'Embeds adapt to fit articles, documentation, and pages on any device.'
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
    { href: '/tools/embed-url/pastery', label: 'Pastery' }
  ],
  faq: [
    {
      question: 'How do I embed Spyke content on my website?',
      answer:
        'Paste any Spyke URL into the tool and click Generate to get ready-to-paste embed HTML.'
    },
    {
      question: 'What kind of Spyke links can I embed?',
      answer:
        'You can embed Spyke pages and shared content links — the tool detects each one and builds the right embed.'
    },
    {
      question: 'What if the Spyke content is private?',
      answer:
        'Private or restricted links fall back to a styled preview card built from the available metadata.'
    },
    {
      question: 'Where can I paste the Spyke embed code?',
      answer:
        'Anywhere that accepts HTML — blog posts, docs, CMS pages, and knowledge bases.'
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
