import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'University of Cambridge Map',
  slug: 'ucam-map',
  color: '#A3C1AD',
  exampleUrl: 'https://map.cam.ac.uk',
  metaTitle:
    'University of Cambridge Map Embed Code Generator — Embed Maps & Locations',
  metaDescription:
    'Free University of Cambridge Map embed code generator. Paste any Cambridge map URL — get a ready-to-paste embed for interactive maps and locations. No signup.',
  keywords: [
    'embed cambridge map',
    'university of cambridge map embed',
    'cambridge map embed code',
    'cambridge map embed code generator',
    'embed cambridge location',
    'cambridge map iframe code',
    'cambridge campus map embed'
  ],
  heroTitle: 'University of Cambridge Map Embed Code Generator',
  heroSubtitle:
    'Paste any Cambridge map URL — get a ready-to-paste embed for interactive maps and locations.',
  howItWorksHeading: 'How to embed a Cambridge map',
  howItWorksSteps: [
    {
      title: 'Paste a Cambridge map link',
      description: 'Copy a map.cam.ac.uk URL for a location or view.'
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
  explanationHeading: 'Why use our Cambridge map embed code generator',
  reasons: [
    {
      title: 'Show locations in context',
      description:
        'Embed an interactive Cambridge map so visitors can find a building or location without leaving your page.'
    },
    {
      title: 'No manual setup',
      description:
        'Paste a Cambridge map link and get working embed HTML in seconds — no markup to write by hand.'
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
        'Embed a pannable, zoomable Cambridge map so readers can explore the area right in your page.'
    },
    {
      title: 'Responsive sizing',
      description:
        'The map scales to your layout so it stays usable on desktop, tablet, and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/naturalatlas', label: 'Natural Atlas' },
    { href: '/tools/embed-url/scribblemaps', label: 'Scribble Maps' },
    { href: '/tools/embed-url/storymaps', label: 'StoryMaps' }
  ],
  faq: [
    {
      question: 'How do I embed a Cambridge map on my website?',
      answer:
        'Paste the map.cam.ac.uk URL into the tool, click Generate, then copy the HTML it produces into your page.'
    },
    {
      question: 'Can visitors pan and zoom the embedded map?',
      answer:
        'Yes. When the map supports it, viewers can pan and zoom to explore locations directly in the embed.'
    },
    {
      question: 'Will the Cambridge map stay responsive on mobile?',
      answer:
        'Yes. The generated embed scales to the width of your page so the map works on any screen size.'
    },
    {
      question: 'What if the Cambridge map cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card built from the available map metadata.'
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
