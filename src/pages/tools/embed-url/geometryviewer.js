import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Geometry Viewer',
  slug: 'geometryviewer',
  color: '#666666',
  exampleUrl: 'https://geometryviewer.com',
  metaTitle:
    'Geometry Viewer Embed Code Generator — Embed Geometry Viewer Content',
  metaDescription:
    'Free Geometry Viewer embed code generator. Paste any Geometry Viewer URL — get a ready-to-paste embed or preview card. No signup.',
  keywords: [
    'embed geometry viewer',
    'geometry viewer embed code',
    'geometry viewer embed generator'
  ],
  heroTitle: 'Geometry Viewer Embed Code Generator',
  heroSubtitle:
    'Paste any Geometry Viewer URL — get a ready-to-paste embed or preview card.',
  howItWorksHeading: 'How to embed Geometry Viewer content',
  howItWorksSteps: [
    {
      title: 'Paste a Geometry Viewer link',
      description: 'Copy any geometryviewer.com URL.'
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
  explanationHeading: 'Why use our Geometry Viewer embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description: 'Paste any Geometry Viewer link and get working embed HTML.'
    },
    {
      title: 'Geometry Viewer content',
      description: 'The tool handles all Geometry Viewer URL formats.'
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
        'Get the real Geometry Viewer embed with full interactivity when available.'
    },
    {
      title: 'All content types',
      description:
        'Works with all Geometry Viewer URL formats and content types.'
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
      question: 'How do I embed Geometry Viewer content on my website?',
      answer: 'Paste any Geometry Viewer URL into the tool and click Generate.'
    },
    {
      question: 'Is the Geometry Viewer embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Geometry Viewer content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
