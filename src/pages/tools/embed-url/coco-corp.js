import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Coco Corp',
  slug: 'coco-corp',
  color: '#666666',
  exampleUrl: 'https://coco-corp.com',
  metaTitle: 'Coco Corp Embed Code Generator — Embed Coco Corp Content',
  metaDescription:
    'Free Coco Corp embed code generator. Paste any Coco Corp URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed coco corp',
    'coco corp embed code',
    'coco corp embed generator'
  ],
  heroTitle: 'Coco Corp Embed Code Generator',
  heroSubtitle:
    'Paste any Coco Corp URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Coco Corp content',
  howItWorksSteps: [
    {
      title: 'Paste a Coco Corp link',
      description: 'Copy any coco-corp.com URL.'
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
  explanationHeading: 'Why use our Coco Corp embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Coco Corp link and get working embed HTML.'
    },
    {
      title: 'Coco Corp content',
      description: 'The tool handles all Coco Corp URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description: 'Generate up to 50 embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Coco Corp embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description: 'Works with all Coco Corp URL formats and content types.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/embed/providers', label: 'All providers' }
  ],
  faq: [
    {
      question: 'How do I embed Coco Corp content on my website?',
      answer: 'Paste any Coco Corp URL into the tool and click Generate.'
    },
    {
      question: 'Is the Coco Corp embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Coco Corp content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
