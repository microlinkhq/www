import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Sketchfab',
  slug: 'sketchfab',
  color: '#1CAAD9',
  exampleUrl: 'https://sketchfab.com',
  metaTitle: 'Sketchfab Embed Code Generator — Embed 3D models and scenes',
  metaDescription:
    'Free Sketchfab embed code generator. Paste any Sketchfab URL — get a ready-to-paste embed for 3D models and scenes. No signup.',
  keywords: [
    'embed sketchfab',
    'sketchfab embed code',
    'sketchfab 3d model embed'
  ],
  heroTitle: 'Sketchfab Embed Code Generator',
  heroSubtitle:
    'Paste any Sketchfab URL — get a ready-to-paste embed for 3D models and scenes.',
  howItWorksHeading: 'How to embed Sketchfab content',
  howItWorksSteps: [
    {
      title: 'Paste a Sketchfab link',
      description: 'Copy any sketchfab.com URL — 3D models and scenes.'
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
  explanationHeading: 'Why use our Sketchfab embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Sketchfab link and get working embed HTML.'
    },
    {
      title: 'All Sketchfab content',
      description:
        'Works with 3D models and scenes — the tool handles all Sketchfab URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Sketchfab embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real Sketchfab embed with full interactivity when available.'
    },
    {
      title: 'All 3D models and scenes',
      description:
        'Works with 3D models and scenes — all Sketchfab content types.'
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
      question: 'How do I embed Sketchfab content on my website?',
      answer:
        'Paste any Sketchfab URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the Sketchfab embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the Sketchfab content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
