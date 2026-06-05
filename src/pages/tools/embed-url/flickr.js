import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Flickr',
  slug: 'flickr',
  color: '#0063DC',
  exampleUrl: 'https://www.flickr.com/photos/example/1234567890',
  metaTitle: 'Flickr Embed Code Generator — Embed Photos & Albums',
  metaDescription:
    'Free Flickr embed code generator. Paste any Flickr URL — get a ready-to-paste embed for photos and albums. No signup.',
  keywords: [
    'embed flickr',
    'flickr embed code',
    'flickr embed generator',
    'flickr photo embed',
    'embed flickr album',
    'flickr embed html'
  ],
  heroTitle: 'Flickr Embed Code Generator',
  heroSubtitle:
    'Paste any Flickr URL — get a ready-to-paste embed for photos and albums.',
  howItWorksHeading: 'How to embed Flickr content',
  howItWorksSteps: [
    {
      title: 'Paste a Flickr link',
      description: 'Copy any Flickr URL — photos, albums, and galleries.'
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
  explanationHeading: 'Why use our Flickr embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Flickr link and get working embed HTML.'
    },
    {
      title: 'All Flickr content',
      description:
        'Works with photos, albums, and galleries — the tool handles all Flickr URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Flickr embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Flickr embed',
      description:
        'Get the real Flickr photo embed with photographer credit and licensing info.'
    },
    {
      title: 'Photos & albums',
      description:
        'Individual photos, albums, and gallery links — all Flickr content types work.'
    },
    {
      title: 'High-resolution images',
      description:
        'The embed uses the best available image resolution from Flickr.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/smugmug',
      label: 'SmugMug'
    },
    {
      href: '/tools/embed-url/pinterest',
      label: 'Pinterest'
    },
    {
      href: '/tools/embed-url/instagram',
      label: 'Instagram'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Flickr photo?',
      answer: 'Paste any Flickr photo URL into the tool and click Generate.'
    },
    {
      question: 'Can I embed Flickr albums?',
      answer: 'Yes. Album and gallery URLs are supported.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const FlickrPage = () => <ProviderSubtool {...data} />

export default FlickrPage
