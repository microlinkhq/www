import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Scribble Maps',
  slug: 'scribblemaps',
  color: '#2E7D32',
  exampleUrl: 'https://www.scribblemaps.com',
  metaTitle: 'Scribble Maps Embed Code Generator — Embed Custom Maps',
  metaDescription:
    'Free Scribble Maps embed code generator. Paste any Scribble Maps URL — get a ready-to-paste embed for custom, annotated maps. No signup.',
  keywords: [
    'embed scribble maps',
    'scribble maps embed code',
    'scribble maps embed code generator',
    'embed custom map',
    'scribble maps iframe code',
    'embed annotated map',
    'scribble maps map embed'
  ],
  heroTitle: 'Scribble Maps Embed Code Generator',
  heroSubtitle:
    'Paste any Scribble Maps URL — get a ready-to-paste embed for custom, annotated maps.',
  howItWorksHeading: 'How to embed Scribble Maps maps',
  howItWorksSteps: [
    {
      title: 'Paste a Scribble Maps link',
      description:
        'Copy the URL of any custom map you have drawn or annotated in Scribble Maps and drop it in.'
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
  explanationHeading: 'Why use our Scribble Maps embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the export and share menus — paste a Scribble Maps link and get working embed HTML instantly.'
    },
    {
      title: 'Built for custom maps',
      description:
        'Scribble Maps lets you draw, annotate, and create custom maps, and the tool turns those map links into clean embeds.'
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
      title: 'Interactive map embed',
      description:
        'Keeps your drawings, markers, and annotations intact so visitors can pan and zoom the live map.'
    },
    {
      title: 'Responsive output',
      description:
        'The generated embed scales to fit any container so maps look right on any screen size.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/naturalatlas', label: 'Natural Atlas' },
    { href: '/tools/embed-url/storymaps', label: 'StoryMaps' },
    { href: '/tools/embed-url/datawrapper', label: 'Datawrapper' }
  ],
  faq: [
    {
      question: 'How do I embed a Scribble Maps map on my website?',
      answer:
        'Paste the Scribble Maps URL into the tool and click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Do my drawings and annotations stay on the embedded map?',
      answer:
        'Yes — the embed keeps the custom drawings, markers, and annotations from your Scribble Maps map.'
    },
    {
      question: 'Will the embedded map be responsive?',
      answer:
        'Yes — the generated code adapts to the width of its container so the map looks right on any device.'
    },
    {
      question: 'What if the Scribble Maps map is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata so your layout stays intact.'
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
