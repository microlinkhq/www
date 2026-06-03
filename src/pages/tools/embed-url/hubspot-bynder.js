import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'HubSpot Bynder',
  slug: 'hubspot-bynder',
  color: '#00AAFF',
  exampleUrl:
    'https://assets.getbynder.com/m/695ee06d2eccd8ca/original/Bynder-brand-asset.jpg',
  metaTitle: 'HubSpot Bynder Embed Code Generator — Embed Bynder DAM Assets',
  metaDescription:
    'Free HubSpot Bynder embed code generator. Paste a Bynder asset URL — get a clean, ready-to-paste preview card for images and videos. No signup.',
  keywords: [
    'embed bynder',
    'bynder embed code',
    'hubspot bynder embed',
    'embed bynder asset',
    'bynder dam embed',
    'embed bynder image',
    'bynder embed code generator'
  ],
  heroTitle: 'HubSpot Bynder Embed Code Generator',
  heroSubtitle:
    'Paste a Bynder asset URL — get a clean, ready-to-paste preview card for your digital asset management images and videos.',
  howItWorksHeading: 'How to embed a Bynder asset',
  howItWorksSteps: [
    {
      title: 'Paste a Bynder link',
      description:
        'Copy a public asset URL from your Bynder portal — typically a getbynder.com link to an image or video.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the asset and generates a styled preview card you can drop into any page.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our HubSpot Bynder embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing markup by hand. Paste a Bynder asset link and get working preview HTML.'
    },
    {
      title: 'Built for DAM assets',
      description:
        'Designed for Bynder digital asset management links — images and videos shared from your brand portal.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 HubSpot Bynder embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Clean preview card',
      description:
        'Turn a Bynder asset link into a tidy card with the asset title and image — no portal login required to view.'
    },
    {
      title: 'Images and videos',
      description:
        'Works with the image and video assets Bynder distributes, including HubSpot-synced brand files.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/hubspot',
      label: 'HubSpot'
    },
    {
      href: '/tools/embed-url/hivo',
      label: 'HIVO'
    },
    {
      href: '/tools/embed-url/getty-images',
      label: 'Getty Images'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Bynder asset on my website?',
      answer:
        'Paste a public Bynder asset URL into the tool and click Generate. You will get a ready-to-paste preview card for the image or video.'
    },
    {
      question: 'What Bynder content can I embed?',
      answer:
        'Public images and videos shared from a Bynder portal, including assets synced to HubSpot, work best with the preview card.'
    },
    {
      question: 'Does Bynder offer a native iframe embed?',
      answer:
        'Bynder assets are served as direct portal and CDN links rather than oEmbed players, so the tool generates a styled preview card instead.'
    },
    {
      question: 'Can I embed private or restricted assets?',
      answer:
        'No. The asset must be publicly accessible. Private or login-only Bynder assets cannot be read by the tool.'
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
