import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Geograph',
  slug: 'geograph',
  color: '#000066',
  exampleUrl: 'https://www.geograph.org.uk/photo/3390013',
  metaTitle: 'Geograph Embed Code Generator — Embed British Isles Photos',
  metaDescription:
    'Free Geograph embed code generator. Paste any geograph.org.uk photo URL — get a ready-to-paste embed for geographically tagged British Isles photographs. No signup.',
  keywords: [
    'embed geograph',
    'geograph embed code',
    'geograph embed code generator',
    'embed geograph photo',
    'geograph iframe code',
    'embed geograph grid square photo',
    'geograph britain ireland embed'
  ],
  heroTitle: 'Geograph Embed Code Generator',
  heroSubtitle:
    'Paste any Geograph URL — get a ready-to-paste embed for geographically tagged photographs of the British Isles.',
  howItWorksHeading: 'How to embed a Geograph photo',
  howItWorksSteps: [
    {
      title: 'Paste a Geograph link',
      description:
        'Copy any geograph.org.uk URL — individual photo pages and grid square references both work.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the photo page and generates the right embed HTML for it.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Geograph embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building markup by hand. Paste any Geograph link and get working embed HTML.'
    },
    {
      title: 'Keeps the photo credit',
      description:
        'Geograph photos are Creative Commons with attribution — the embed surfaces the title and photographer so credit stays intact.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Geograph embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'British Isles photography',
      description:
        'Embed geographically tagged photos covering every square kilometre of Great Britain and Ireland.'
    },
    {
      title: 'Responsive image embed',
      description:
        'The embed adapts to your layout so the photo scales cleanly on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/flickr',
      label: 'Flickr'
    },
    {
      href: '/tools/embed-url/naturalatlas',
      label: 'Natural Atlas'
    },
    {
      href: '/tools/embed-url/smugmug',
      label: 'SmugMug'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Geograph photo on my website?',
      answer:
        'Paste any geograph.org.uk photo URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'What can I embed from Geograph?',
      answer:
        'Individual photo pages and grid square references work — the geographically tagged photographs of the British Isles that Geograph hosts.'
    },
    {
      question: 'Does the embed keep the photographer attribution?',
      answer:
        'Yes. Geograph images are Creative Commons with attribution, so the embed surfaces the title and photographer credit.'
    },
    {
      question: 'What if a photo cannot be embedded natively?',
      answer:
        'The tool falls back to a styled preview card showing the photo title and image, which you can customize in Card mode.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const GeographPage = () => <ProviderSubtool {...data} />

export default GeographPage
