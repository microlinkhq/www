import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Audioclip',
  slug: 'audioclip',
  color: '#03C75A',
  exampleUrl: 'https://audioclip.naver.com/channels/8',
  metaTitle: 'Audioclip Embed Code Generator — Embed NAVER Audioclip Channels',
  metaDescription:
    'Free Audioclip embed code generator. Paste a NAVER Audioclip URL — get a clean, ready-to-paste preview card for audiobooks, podcasts, and ASMR channels. No signup.',
  keywords: [
    'embed audioclip',
    'audioclip embed code',
    'audioclip embed code generator',
    'embed naver audioclip',
    'audioclip preview card',
    'embed audioclip channel',
    'audioclip podcast embed'
  ],
  heroTitle: 'Audioclip Embed Code Generator',
  heroSubtitle:
    'Paste a NAVER Audioclip URL — get a ready-to-paste preview card for audiobooks, podcasts, audio dramas, and ASMR channels.',
  howItWorksHeading: 'How to embed an Audioclip link',
  howItWorksSteps: [
    {
      title: 'Paste an Audioclip link',
      description:
        'Copy any audioclip.naver.com URL — channels, audiobooks, podcasts, or ASMR clips.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page metadata and builds a styled preview card you can drop anywhere.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Audioclip embed code generator',
  reasons: [
    {
      title: 'No native embed needed',
      description:
        'Audioclip does not expose a public embed player, so the tool builds a clean preview card from the page metadata instead.'
    },
    {
      title: 'Works with any Audioclip URL',
      description:
        'Paste a link to a channel, audiobook, podcast, or ASMR clip and get a shareable card with title and artwork.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Audioclip embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Channel & clip previews',
      description:
        'Turn a NAVER Audioclip channel, audiobook, podcast, or ASMR link into a tidy card with title, description, and cover art.'
    },
    {
      title: 'Responsive layout',
      description:
        'The preview card scales to fit your column width and looks right on mobile and desktop.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/soundcloud', label: 'SoundCloud' },
    { href: '/tools/embed-url/clyp', label: 'Clyp' },
    { href: '/tools/embed-url/mixcloud', label: 'Mixcloud' }
  ],
  faq: [
    {
      question: 'How do I embed an Audioclip link on my website?',
      answer:
        'Paste any audioclip.naver.com URL into the tool and click Generate. You will get a ready-to-paste preview card.'
    },
    {
      question: 'Does this generate a playable Audioclip player?',
      answer:
        'No. NAVER Audioclip does not offer a public embeddable player, so the tool produces a styled preview card that links back to the original page instead.'
    },
    {
      question: 'What kind of Audioclip content can I embed?',
      answer:
        'Channels, audiobooks, podcasts, audio dramas, and ASMR clips — any Audioclip page with public metadata works.'
    },
    {
      question: 'What if the Audioclip page is private or unavailable?',
      answer:
        'The tool falls back to a styled preview card built from whatever metadata is available.'
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
