import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Kurozora',
  slug: 'kurozora',
  color: '#FF9300',
  exampleUrl: 'https://kurozora.app',
  metaTitle: 'Kurozora Embed Code Generator — Embed Anime & Manga Pages',
  metaDescription:
    'Free Kurozora embed code generator. Paste any Kurozora URL — get a ready-to-paste embed or preview card for anime, manga, and series pages. No signup.',
  keywords: [
    'embed kurozora',
    'kurozora embed code',
    'kurozora embed code generator',
    'embed kurozora anime',
    'embed kurozora manga',
    'kurozora series embed',
    'kurozora iframe code'
  ],
  heroTitle: 'Kurozora Embed Code Generator',
  heroSubtitle:
    'Paste any Kurozora URL — get a ready-to-paste embed or preview card for anime, manga, and series pages.',
  howItWorksHeading: 'How to embed Kurozora content',
  howItWorksSteps: [
    {
      title: 'Paste a Kurozora link',
      description:
        'Copy any kurozora.app URL — an anime, manga, or series page — and paste it into the tool.'
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
  explanationHeading: 'Why use our Kurozora embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Kurozora link and get working embed HTML — no copying widget snippets by hand.'
    },
    {
      title: 'Built for anime & manga pages',
      description:
        'Recognizes Kurozora anime, manga, and series URLs and pulls the right title and cover art.'
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
      title: 'Anime & manga detection',
      description:
        'Identifies whether a link points to an anime, manga, or series page and builds the matching embed.'
    },
    {
      title: 'Cover art & metadata',
      description:
        'Pulls the title, cover image, and summary so the embed looks complete on any page.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/apple-music', label: 'Apple Music' },
    { href: '/tools/embed-url/soundcloud', label: 'SoundCloud' },
    { href: '/tools/embed-url/youtube', label: 'YouTube' }
  ],
  faq: [
    {
      question: 'How do I embed a Kurozora anime page on my website?',
      answer:
        'Paste the anime page URL from kurozora.app into the tool and click Generate to get the embed HTML.'
    },
    {
      question: 'Can I embed Kurozora manga and series pages too?',
      answer:
        'Yes — the tool handles anime, manga, and series pages and generates the right embed for each.'
    },
    {
      question: 'Will the embed show the cover art and title?',
      answer:
        'When the page exposes that metadata, the embed includes the title and cover image automatically.'
    },
    {
      question: 'What if a Kurozora page cannot be embedded directly?',
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
