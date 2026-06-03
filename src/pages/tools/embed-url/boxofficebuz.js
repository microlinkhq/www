import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Box Office Buz',
  slug: 'boxofficebuz',
  color: '#1A1A1A',
  exampleUrl: 'https://boxofficebuz.com/movie/home',
  metaTitle: 'Box Office Buz Embed Code Generator — Embed Movies & Trailers',
  metaDescription:
    'Free Box Office Buz embed code generator. Paste any boxofficebuz.com URL — get a ready-to-paste embed or preview card for movies, trailers, and celebrities. No signup.',
  keywords: [
    'embed box office buz',
    'box office buz embed code',
    'box office buz embed code generator',
    'embed boxofficebuz',
    'boxofficebuz embed code',
    'embed box office buz trailer',
    'box office buz movie embed'
  ],
  heroTitle: 'Box Office Buz Embed Code Generator',
  heroSubtitle:
    'Paste any Box Office Buz URL — get a ready-to-paste embed or preview card for movies, trailers, and celebrity coverage.',
  howItWorksHeading: 'How to embed Box Office Buz content',
  howItWorksSteps: [
    {
      title: 'Paste a Box Office Buz link',
      description:
        'Copy any boxofficebuz.com URL — movie pages, trailers, posters, and celebrity coverage.'
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
  explanationHeading: 'Why use our Box Office Buz embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Box Office Buz link and get working embed HTML — no markup to write by hand.'
    },
    {
      title: 'Movie and entertainment content',
      description:
        'Works with movie, TV, trailer, and celebrity pages from boxofficebuz.com.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Box Office Buz embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native embed when available',
      description:
        'Get the real Box Office Buz embed with its title, image, and link back to the source page.'
    },
    {
      title: 'Movies, trailers & celebrities',
      description:
        'Embed movie pages, trailers, posters, and celebrity coverage from boxofficebuz.com.'
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
    { href: '/tools/embed-url/twitter-or-x', label: 'X (Twitter)' }
  ],
  faq: [
    {
      question: 'How do I embed Box Office Buz content on my website?',
      answer:
        'Paste any boxofficebuz.com URL into the tool and click Generate. You will get a ready-to-paste embed or preview card.'
    },
    {
      question: 'What kind of Box Office Buz content can I embed?',
      answer:
        'Box Office Buz covers movies, TV, trailers, posters, and celebrity news, and those pages can be embedded.'
    },
    {
      question: 'What if a native embed is not available?',
      answer:
        'The tool falls back to a styled preview card with the available title, image, and link.'
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
