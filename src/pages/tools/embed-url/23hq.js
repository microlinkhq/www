import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: '23hq',
  slug: '23hq',
  color: '#333333',
  exampleUrl: 'https://www.23hq.com/Guide/photo/68898389',
  metaTitle: '23hq Embed Code Generator — Embed Photos & Albums',
  metaDescription:
    'Free 23hq embed code generator. Paste any 23hq.com URL — get a ready-to-paste embed or preview card for photos and albums. No signup.',
  keywords: [
    'embed 23hq',
    '23hq embed code',
    '23hq embed code generator',
    'embed 23hq photo',
    'embed 23hq album',
    '23hq photo embed',
    '23hq iframe code'
  ],
  heroTitle: '23hq Embed Code Generator',
  heroSubtitle:
    'Paste a 23hq photo or album URL — get a ready-to-paste embed or preview card in seconds.',
  howItWorksHeading: 'How to embed 23hq photos',
  howItWorksSteps: [
    {
      title: 'Paste a 23hq link',
      description:
        'Copy any 23hq.com URL — individual photos, albums, or a member photoblog.'
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
  explanationHeading: 'Why use our 23hq embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building markup by hand. Paste any 23hq link and get working embed HTML.'
    },
    {
      title: 'Photos and albums',
      description:
        'Works with single photos and full albums shared on the 23 photo sharing community.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 23hq embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Photo preview with metadata',
      description:
        'Pull the photo image, title, and member details straight from the 23hq page.'
    },
    {
      title: 'Responsive layout',
      description:
        'The generated embed scales to fit your column width across desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/flickr', label: 'Flickr' },
    { href: '/tools/embed-url/smugmug', label: 'SmugMug' },
    { href: '/tools/embed-url/deviantart-com', label: 'DeviantArt' }
  ],
  faq: [
    {
      question: 'How do I embed a 23hq photo on my website?',
      answer:
        'Paste any 23hq.com photo URL into the tool and click Generate. You will get a ready-to-paste embed.'
    },
    {
      question: 'Can I embed a 23hq album?',
      answer:
        'Yes. Both individual photos and full albums shared on 23hq are supported.'
    },
    {
      question: 'What if the 23hq photo is private?',
      answer:
        'Private or restricted photos cannot be embedded. The tool falls back to a styled preview card with whatever public metadata is available.'
    },
    {
      question: 'Is the embed responsive?',
      answer:
        'Yes. The generated embed scales to fit the width of your blog, CMS, or page layout.'
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
