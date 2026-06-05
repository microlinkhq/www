import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Lumiere',
  slug: 'lumiere',
  color: '#666666',
  exampleUrl: 'https://lumiere.com',
  metaTitle: 'Lumiere Embed Code Generator — Embed Videos',
  metaDescription:
    'Free Lumiere embed code generator. Paste any Lumiere URL — get a ready-to-paste video player or preview card. No signup.',
  keywords: [
    'embed lumiere',
    'lumiere embed code',
    'lumiere embed code generator',
    'embed lumiere video',
    'lumiere video embed',
    'lumiere iframe code',
    'lumiere player embed'
  ],
  heroTitle: 'Lumiere Embed Code Generator',
  heroSubtitle:
    'Paste any Lumiere URL — get a ready-to-paste video player or preview card.',
  howItWorksHeading: 'How to embed Lumiere videos',
  howItWorksSteps: [
    {
      title: 'Paste a Lumiere link',
      description: 'Copy the URL of any Lumiere video.'
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
  explanationHeading: 'Why use our Lumiere embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing the player markup by hand. Paste any Lumiere link and get working embed HTML instantly.'
    },
    {
      title: 'Video-ready output',
      description:
        'Lumiere videos embed as an inline player so visitors can watch without leaving your page.'
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
      title: 'Inline video player',
      description:
        'Embed the native Lumiere player with playback controls right inside your content.'
    },
    {
      title: 'Responsive sizing',
      description:
        'The player keeps its aspect ratio and scales cleanly across desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/vidyard', label: 'Vidyard' },
    { href: '/tools/embed-url/wistia', label: 'Wistia' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' }
  ],
  faq: [
    {
      question: 'How do I embed a Lumiere video on my website?',
      answer:
        'Paste the Lumiere video URL into the tool and click Generate, then copy the embed HTML into your site.'
    },
    {
      question: 'Will the video play directly in my page?',
      answer:
        'Yes. The native embed renders an inline player so visitors can watch without leaving your page.'
    },
    {
      question: 'Do I need a Lumiere account to embed a video?',
      answer:
        'No account is required. A public Lumiere video URL is enough to generate the embed code.'
    },
    {
      question: 'What if the Lumiere video is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
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
