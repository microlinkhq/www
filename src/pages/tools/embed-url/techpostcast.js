import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'TechPostCast',
  slug: 'techpostcast',
  color: '#5A31F4',
  exampleUrl: 'https://techpostcast.com',
  metaTitle: 'TechPostCast Embed Code Generator — Embed Podcast Episodes',
  metaDescription:
    'Free TechPostCast embed code generator. Paste any TechPostCast URL — get a ready-to-paste player for technology podcast episodes. No signup.',
  keywords: [
    'embed techpostcast',
    'techpostcast embed code',
    'techpostcast embed code generator',
    'embed techpostcast episode',
    'embed tech podcast',
    'techpostcast iframe code',
    'techpostcast podcast player embed'
  ],
  heroTitle: 'TechPostCast Embed Code Generator',
  heroSubtitle:
    'Paste any TechPostCast URL — get a ready-to-paste player for technology podcast episodes.',
  howItWorksHeading: 'How to embed TechPostCast episodes',
  howItWorksSteps: [
    {
      title: 'Paste a TechPostCast link',
      description:
        'Copy the URL of any TechPostCast episode and drop it into the field.'
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
  explanationHeading: 'Why use our TechPostCast embed code generator',
  reasons: [
    {
      title: 'Built for podcast episodes',
      description:
        'Turn any TechPostCast episode link into an inline audio player your readers can press play on.'
    },
    {
      title: 'Perfect for show notes',
      description:
        'Drop an episode player into a blog post, newsletter, or landing page next to your show notes.'
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
      title: 'Podcast episode player',
      description:
        'Embed individual TechPostCast technology episodes with native audio playback controls.'
    },
    {
      title: 'Lightweight audio embed',
      description:
        'A compact player that loads fast and fits neatly within an article or sidebar.'
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
    { href: '/tools/embed-url/saooti', label: 'Saooti' }
  ],
  faq: [
    {
      question: 'How do I embed a TechPostCast episode on my website?',
      answer:
        'Paste the episode URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Can listeners play the episode without leaving my page?',
      answer:
        'Yes. When native embedding is available the audio plays inline with standard controls.'
    },
    {
      question: 'Does the player work in newsletters and blog posts?',
      answer:
        'The embed drops into any HTML editor, so it fits posts, show notes, and most CMS templates.'
    },
    {
      question: 'What if an episode cannot be embedded natively?',
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
