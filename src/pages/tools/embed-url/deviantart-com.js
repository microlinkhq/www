import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'DeviantArt',
  slug: 'deviantart-com',
  color: '#05CC47',
  exampleUrl: 'https://deviantart.com',
  metaTitle: 'DeviantArt Embed Code Generator — Embed Artwork',
  metaDescription:
    'Free DeviantArt embed code generator. Paste any DeviantArt URL — get a ready-to-paste embed for artwork, photos, and literature. No signup.',
  keywords: [
    'embed deviantart',
    'deviantart embed code',
    'deviantart artwork embed'
  ],
  heroTitle: 'DeviantArt Embed Code Generator',
  heroSubtitle:
    'Paste any DeviantArt URL — get a ready-to-paste embed for artwork, photos, and literature.',
  howItWorksHeading: 'How to embed DeviantArt content',
  howItWorksSteps: [
    {
      title: 'Paste a DeviantArt link',
      description:
        'Copy any deviantart.com URL — artwork, photos, and literature.'
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
  explanationHeading: 'Why use our DeviantArt embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any DeviantArt link and get working embed HTML.'
    },
    {
      title: 'All DeviantArt content',
      description:
        'Works with artwork, photos, and literature — the tool handles all DeviantArt URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 DeviantArt embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real DeviantArt embed with full interactivity when available.'
    },
    {
      title: 'All artwork',
      description:
        'Works with artwork, photos, and literature — all DeviantArt content types.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/providers', label: 'All providers' }
  ],
  faq: [
    {
      question: 'How do I embed DeviantArt content on my website?',
      answer:
        'Paste any DeviantArt URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the DeviantArt embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the DeviantArt content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
