import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'SmugMug',
  slug: 'smugmug',
  color: '#6DB33F',
  exampleUrl: 'https://smugmug.com',
  metaTitle: 'SmugMug Embed Code Generator — Embed Photos, Galleries & Videos',
  metaDescription:
    'Free SmugMug embed code generator. Paste any SmugMug URL — get a ready-to-paste embed for photos, galleries, and videos. No signup.',
  keywords: [
    'embed smugmug',
    'smugmug embed code',
    'smugmug embed code generator',
    'embed smugmug gallery',
    'smugmug photo embed',
    'smugmug iframe code',
    'embed smugmug video'
  ],
  heroTitle: 'SmugMug Embed Code Generator',
  heroSubtitle:
    'Paste any SmugMug URL — get a ready-to-paste embed for photos, galleries, and videos.',
  howItWorksHeading: 'How to embed SmugMug content',
  howItWorksSteps: [
    {
      title: 'Paste a SmugMug link',
      description:
        'Copy any smugmug.com URL — a single photo, a full gallery, or a hosted video.'
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
  explanationHeading: 'Why use our SmugMug embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through SmugMug share menus. Paste any link and get working embed HTML instantly.'
    },
    {
      title: 'Built for photographers',
      description:
        'Showcase high-resolution photo galleries and client work on any site without breaking your portfolio layout.'
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
      title: 'Galleries and slideshows',
      description:
        'Embed an entire SmugMug gallery so visitors can browse your shots inline.'
    },
    {
      title: 'Photos and hosted video',
      description:
        'Works with single images and SmugMug-hosted videos, preserving quality.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/behance', label: 'Behance' },
    { href: '/tools/embed-url/abraia', label: 'Abraia' },
    { href: '/tools/embed-url/orbitvu', label: 'Orbitvu' }
  ],
  faq: [
    {
      question: 'How do I embed a SmugMug gallery on my website?',
      answer:
        'Paste the SmugMug gallery URL into the tool and click Generate. You get ready-to-paste embed HTML for the whole gallery.'
    },
    {
      question: 'Can I embed a single SmugMug photo?',
      answer:
        'Yes. Paste the URL of any individual photo and the tool produces an embed for just that image.'
    },
    {
      question: 'Does it work with SmugMug-hosted videos?',
      answer:
        'It does. Video URLs are detected automatically and turned into a playable embed.'
    },
    {
      question: 'What if my SmugMug gallery is private or password protected?',
      answer:
        'The tool falls back to a styled preview card built from the available public metadata.'
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
