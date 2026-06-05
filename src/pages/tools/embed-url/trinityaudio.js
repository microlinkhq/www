import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Trinity Audio',
  slug: 'trinityaudio',
  color: '#00C2A8',
  exampleUrl: 'https://trinityaudio.ai',
  metaTitle: 'Trinity Audio Embed Code Generator — Embed Article Audio',
  metaDescription:
    'Free Trinity Audio embed code generator. Paste any Trinity Audio URL — get a ready-to-paste audio player for the spoken version of an article. No signup.',
  keywords: [
    'embed trinity audio',
    'trinity audio embed code',
    'trinity audio embed code generator',
    'embed article audio player',
    'trinity audio iframe code',
    'text to audio embed',
    'embed audio version of article'
  ],
  heroTitle: 'Trinity Audio Embed Code Generator',
  heroSubtitle:
    'Paste any Trinity Audio URL — get a ready-to-paste audio player for the spoken version of an article.',
  howItWorksHeading: 'How to embed Trinity Audio content',
  howItWorksSteps: [
    {
      title: 'Paste a Trinity Audio link',
      description:
        'Copy the URL of any Trinity Audio article player and paste it in.'
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
  explanationHeading: 'Why use our Trinity Audio embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the dashboard. Paste a Trinity Audio link and get working embed HTML in one step.'
    },
    {
      title: 'Listen to articles',
      description:
        'Give readers an audio version of your article with a player they can press play on.'
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
      title: 'Text-to-audio player',
      description:
        'Embed a player that reads the article aloud so visitors can listen instead of reading.'
    },
    {
      title: 'Publisher friendly',
      description:
        'Drop the player into any blog post or CMS to boost engagement and time on page.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/voxsnap', label: 'VoxSnap' },
    { href: '/tools/embed-url/soundcloud', label: 'SoundCloud' },
    { href: '/tools/embed-url/spotify', label: 'Spotify' }
  ],
  faq: [
    {
      question: 'How do I embed a Trinity Audio player on my website?',
      answer:
        'Paste the Trinity Audio URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Does the player read my article out loud?',
      answer:
        'Yes. Trinity Audio turns the article text into an audio version visitors can listen to.'
    },
    {
      question: 'Where can I place the embedded player?',
      answer:
        'Anywhere that accepts HTML — paste it into a blog post, article template, or CMS block.'
    },
    {
      question: 'What if the Trinity Audio content is private?',
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
