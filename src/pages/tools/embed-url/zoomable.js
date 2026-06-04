import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Zoomable',
  slug: 'zoomable',
  color: '#2196F3',
  exampleUrl: 'https://zoomable.ca',
  metaTitle: 'Zoomable Embed Code Generator — Embed Deep-Zoom Images',
  metaDescription:
    'Free Zoomable embed code generator. Paste any Zoomable URL — get a ready-to-paste embed for very high-resolution, pannable and zoomable images. No signup.',
  keywords: [
    'embed zoomable',
    'zoomable embed code',
    'zoomable embed code generator',
    'embed zoomable image',
    'zoomable iframe code',
    'deep zoom image embed',
    'embed high resolution image'
  ],
  heroTitle: 'Zoomable Embed Code Generator',
  heroSubtitle:
    'Paste any Zoomable URL — get a ready-to-paste embed for very high-resolution, pannable and zoomable images.',
  howItWorksHeading: 'How to embed Zoomable images',
  howItWorksSteps: [
    {
      title: 'Paste a Zoomable link',
      description:
        'Copy the URL of any deep-zoom image hosted on Zoomable and paste it above.'
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
  explanationHeading: 'Why use our Zoomable embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'No need to configure the deep-zoom viewer by hand. Paste a Zoomable link and get working embed HTML.'
    },
    {
      title: 'Pan and zoom preserved',
      description:
        'The embed keeps the deep-zoom viewer intact so visitors can pan and zoom into very high-resolution detail in place.'
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
      title: 'Deep-zoom image embed',
      description:
        'Embed the Zoomable viewer so high-resolution images stay pannable and zoomable inside your page.'
    },
    {
      title: 'High-resolution support',
      description:
        'Works with very large images, serving detail on demand so the full picture loads smoothly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/smugmug', label: 'SmugMug' },
    { href: '/tools/embed-url/behance', label: 'Behance' },
    { href: '/tools/embed-url/abraia', label: 'Abraia' }
  ],
  faq: [
    {
      question: 'How do I embed a Zoomable image on my website?',
      answer:
        'Paste the image URL into the tool, click Generate, then copy the HTML into your page or CMS.'
    },
    {
      question: 'Can visitors pan and zoom the embedded image?',
      answer:
        'Yes. The embed keeps the deep-zoom viewer intact so viewers can pan and zoom into fine detail.'
    },
    {
      question: 'Does it handle very high-resolution images?',
      answer:
        'It does. Zoomable serves detail on demand, so large, high-resolution images load smoothly in the embed.'
    },
    {
      question: 'What if the image is private?',
      answer:
        'The tool falls back to a styled preview card built from the available metadata.'
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
