import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Saooti',
  slug: 'saooti',
  color: '#FF6B35',
  exampleUrl: 'https://saooti.com',
  metaTitle: 'Saooti Embed Code Generator — Embed Podcasts & Audio',
  metaDescription:
    'Free Saooti embed code generator. Paste any Saooti URL — get a ready-to-paste audio player for podcasts and episodes. No signup.',
  keywords: [
    'embed saooti',
    'saooti embed code',
    'saooti embed code generator',
    'embed saooti podcast',
    'saooti iframe code',
    'saooti audio player embed',
    'embed saooti episode'
  ],
  heroTitle: 'Saooti Embed Code Generator',
  heroSubtitle:
    'Paste any Saooti URL — get a ready-to-paste audio player for podcasts and episodes.',
  howItWorksHeading: 'How to embed Saooti content',
  howItWorksSteps: [
    {
      title: 'Paste a Saooti link',
      description: 'Copy any saooti.com podcast or episode URL.'
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
  explanationHeading: 'Why use our Saooti embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Saooti link and get working embed HTML in one click — no markup to write by hand.'
    },
    {
      title: 'Podcast and audio ready',
      description:
        'Embed a Saooti podcast or single episode so visitors can press play directly on your page.'
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
      title: 'Audio player embeds',
      description:
        'Embed the Saooti player for a single episode so listeners can stream it inline.'
    },
    {
      title: 'Full podcast embeds',
      description:
        'Embed an entire Saooti podcast feed so visitors can browse and play any episode.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/soundcloud', label: 'SoundCloud' },
    { href: '/tools/embed-url/spotify', label: 'Spotify' },
    { href: '/tools/embed-url/audiomack', label: 'Audiomack' }
  ],
  faq: [
    {
      question: 'How do I embed a Saooti podcast on my website?',
      answer:
        'Paste the saooti.com URL into the tool, click Generate, then copy the embed HTML into your page.'
    },
    {
      question: 'Can I embed a single Saooti episode or a whole podcast?',
      answer:
        'Both. The tool detects whether the link points to one episode or a full podcast and builds the matching player.'
    },
    {
      question: 'Will visitors be able to play the audio inline?',
      answer:
        'Yes. The native embed includes the Saooti player so people can listen without leaving your page.'
    },
    {
      question: 'What if the audio cannot be embedded directly?',
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
