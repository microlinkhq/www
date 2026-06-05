import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Laude',
  slug: 'laude',
  color: '#666666',
  exampleUrl: 'https://laude.io',
  metaTitle: 'Laude Embed Code Generator — Embed Laude Pages',
  metaDescription:
    'Free Laude embed code generator. Paste any Laude URL — get a ready-to-paste embed or preview card for pages and shared content. No signup.',
  keywords: [
    'embed laude',
    'laude embed code',
    'laude embed code generator',
    'embed laude page',
    'laude iframe code',
    'laude link embed',
    'laude preview card'
  ],
  heroTitle: 'Laude Embed Code Generator',
  heroSubtitle:
    'Paste any Laude URL — get a ready-to-paste embed or preview card for pages and shared content.',
  howItWorksHeading: 'How to embed Laude content',
  howItWorksSteps: [
    {
      title: 'Paste a Laude link',
      description: 'Copy any laude.io URL and paste it into the tool.'
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
  explanationHeading: 'Why use our Laude embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Laude link and get working embed HTML — no copying snippets by hand.'
    },
    {
      title: 'Works with shared pages',
      description:
        'Handles Laude page and shared-content URLs and pulls the available title and preview.'
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
      title: 'Automatic link detection',
      description:
        'Reads any Laude URL and builds the right embed based on what the page exposes.'
    },
    {
      title: 'Title & preview metadata',
      description:
        'Pulls the page title and preview image so the embed looks complete on any site.'
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
      question: 'How do I embed a Laude page on my website?',
      answer:
        'Paste the Laude URL from laude.io into the tool and click Generate to get the embed HTML.'
    },
    {
      question: 'What kind of Laude links can I embed?',
      answer:
        'Paste any public Laude page or shared link and the tool generates the matching embed.'
    },
    {
      question: 'Will the embed show a title and preview image?',
      answer:
        'When the page exposes that metadata, the embed includes the title and preview image automatically.'
    },
    {
      question: 'What if a Laude page cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card with the available title and image.'
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
