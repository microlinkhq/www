import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'VoxSnap',
  slug: 'voxsnap',
  color: '#FF6B35',
  exampleUrl: 'https://voxsnap.com',
  metaTitle: 'VoxSnap Embed Code Generator — Embed Audio Articles',
  metaDescription:
    'Free VoxSnap embed code generator. Paste any VoxSnap URL — get a ready-to-paste audio player for spoken versions of your articles. No signup.',
  keywords: [
    'embed voxsnap',
    'voxsnap embed code',
    'voxsnap embed code generator',
    'embed voxsnap audio',
    'voxsnap iframe code',
    'voxsnap audio player embed',
    'embed audio article'
  ],
  heroTitle: 'VoxSnap Embed Code Generator',
  heroSubtitle:
    'Paste any VoxSnap URL — get a ready-to-paste audio player for spoken versions of your articles.',
  howItWorksHeading: 'How to embed VoxSnap audio',
  howItWorksSteps: [
    {
      title: 'Paste a VoxSnap link',
      description:
        'Copy the URL of any VoxSnap audio article and drop it into the field.'
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
  explanationHeading: 'Why use our VoxSnap embed code generator',
  reasons: [
    {
      title: 'Made for audio articles',
      description:
        'Turn the spoken VoxSnap version of an article into an embeddable player so readers can listen instead of read.'
    },
    {
      title: 'No manual setup',
      description:
        'Skip the embed-snippet hunt. Paste a VoxSnap link and get working audio HTML in one step.'
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
      title: 'Inline audio player',
      description:
        'Embed the VoxSnap player so visitors can press play and hear the narrated article on the page.'
    },
    {
      title: 'Publisher-ready output',
      description:
        'Generates clean HTML that fits article templates, newsletters, and content management systems.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/trinityaudio', label: 'Trinity Audio' },
    { href: '/tools/embed-url/soundcloud', label: 'SoundCloud' },
    { href: '/tools/embed-url/spotify', label: 'Spotify' }
  ],
  faq: [
    {
      question: 'How do I embed a VoxSnap audio article on my site?',
      answer:
        'Paste the VoxSnap URL into the tool and click Generate. You will get a ready-to-paste audio player snippet.'
    },
    {
      question: 'Does the player keep playing the narrated article?',
      answer:
        'Yes. The embed loads the live VoxSnap player so the spoken article streams directly in your page.'
    },
    {
      question: 'Where can I paste the VoxSnap embed?',
      answer:
        'Anywhere that accepts HTML — blog posts, article templates, newsletters, or your CMS.'
    },
    {
      question: 'What if the VoxSnap audio is unavailable?',
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
