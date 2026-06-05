import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Amtraker',
  slug: 'amtraker',
  color: '#111111',
  exampleUrl: 'https://amtraker.com/trains/4',
  metaTitle: 'Amtraker Embed Code Generator — Embed Live Amtrak Train Maps',
  metaDescription:
    'Free Amtraker embed code generator. Paste an amtraker.com train or station link to get a ready-to-paste live train map or preview card. No signup.',
  keywords: [
    'embed amtraker',
    'amtraker embed code',
    'embed amtraker train map',
    'embed amtrak train tracker',
    'amtraker live map embed',
    'embed live train tracker',
    'amtraker embed generator',
    'amtrak train tracking embed'
  ],
  heroTitle: 'Amtraker Embed Code Generator',
  heroSubtitle:
    'Paste an Amtraker train or station URL to get a ready-to-paste live train map or preview card.',
  howItWorksHeading: 'How to embed an Amtraker train map',
  howItWorksSteps: [
    {
      title: 'Paste an Amtraker link',
      description:
        'Copy any amtraker.com URL — a train page like /trains/4, a station, or a route on the live tracker.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Amtraker page and generates a responsive embed that shows the live train location and status.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Amtraker embed code generator',
  reasons: [
    {
      title: 'Live train tracking',
      description:
        'Embed the real-time map that follows Amtrak, Brightline, and VIA Rail trains with arrival times and status.'
    },
    {
      title: 'No manual setup',
      description:
        'Paste an amtraker.com link and get working embed HTML — no iframe wrangling required.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Amtraker embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Live map embed',
      description:
        'Show the interactive Amtraker map with the train position, route, and live arrival estimates.'
    },
    {
      title: 'Responsive sizing',
      description:
        'The embed scales to fit your layout so the train tracker stays usable on phones and desktops.'
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
      question: 'How do I embed an Amtraker train map on my website?',
      answer:
        'Paste an amtraker.com train or station URL into the tool and click Generate, then copy the embed code into your page.'
    },
    {
      question: 'What can I track with an embedded Amtraker map?',
      answer:
        'Amtraker tracks Amtrak, Brightline, and VIA Rail trains, so the embed can show a live train location, route, and estimated arrival times.'
    },
    {
      question: 'Does the embedded map stay live?',
      answer:
        'Yes — the native embed loads the live Amtraker tracker, so positions and arrival estimates update the same way they do on amtraker.com.'
    },
    {
      question: 'What if the map cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card with the page title and image so you still get a clean, shareable block.'
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
