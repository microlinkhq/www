import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Spotlightr',
  slug: 'spotlightr',
  color: '#FF6F00',
  exampleUrl: 'https://spotlightr.com',
  metaTitle: 'Spotlightr Embed Code Generator — Embed Hosted Videos',
  metaDescription:
    'Free Spotlightr embed code generator. Paste any Spotlightr (formerly vooPlayer) URL — get a ready-to-paste embed for hosted videos. No signup.',
  keywords: [
    'embed spotlightr',
    'spotlightr embed code',
    'spotlightr embed code generator',
    'embed spotlightr video',
    'spotlightr iframe code',
    'embed vooplayer',
    'spotlightr player embed'
  ],
  heroTitle: 'Spotlightr Embed Code Generator',
  heroSubtitle:
    'Paste any Spotlightr URL — get a ready-to-paste embed for videos hosted on the interactive, marketing-focused player.',
  howItWorksHeading: 'How to embed Spotlightr content',
  howItWorksSteps: [
    {
      title: 'Paste a Spotlightr link',
      description:
        'Copy any Spotlightr URL for a hosted video, formerly served through vooPlayer.'
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
  explanationHeading: 'Why use our Spotlightr embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Spotlightr link and get working embed HTML without digging through player settings.'
    },
    {
      title: 'Marketing-ready video',
      description:
        'Keep the interactive, conversion-focused player on landing pages, funnels, and course sites.'
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
      title: 'Hosted video embeds',
      description:
        'Embed any Spotlightr-hosted video with its interactive player intact.'
    },
    {
      title: 'Responsive playback',
      description:
        'The generated embed scales cleanly across desktop and mobile layouts.'
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
    { href: '/tools/embed-url/sproutvideo', label: 'SproutVideo' }
  ],
  faq: [
    {
      question: 'How do I embed a Spotlightr video on my website?',
      answer:
        'Paste the Spotlightr video URL into the tool and click Generate. You get ready-to-paste embed HTML for the player.'
    },
    {
      question: 'Is Spotlightr the same as vooPlayer?',
      answer:
        'Yes. Spotlightr is the rebranded name of vooPlayer, and the tool handles its hosted video URLs.'
    },
    {
      question: 'Will the interactive player features still work?',
      answer:
        'When native embedding is supported, the player keeps its interactive, marketing-focused features inside your page.'
    },
    {
      question: 'What if the Spotlightr video is private or gated?',
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
