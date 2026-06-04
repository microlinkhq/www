import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Music Box Maniacs',
  slug: 'musicboxmaniacs-com',
  color: '#C0392B',
  exampleUrl: 'https://musicboxmaniacs.com',
  metaTitle:
    'Music Box Maniacs Embed Code Generator — Embed Music Box Melodies',
  metaDescription:
    'Free Music Box Maniacs embed code generator. Paste any musicboxmaniacs.com URL — get a ready-to-paste interactive player for music box melodies. No signup.',
  keywords: [
    'embed music box maniacs',
    'music box maniacs embed code',
    'music box maniacs embed code generator',
    'embed music box melody',
    'music box player embed',
    'embed music box maniacs player',
    'music box maniacs iframe code'
  ],
  heroTitle: 'Music Box Maniacs Embed Code Generator',
  heroSubtitle:
    'Paste any Music Box Maniacs URL — get a ready-to-paste interactive player for music box melodies created and shared by the community.',
  howItWorksHeading: 'How to embed Music Box Maniacs melodies',
  howItWorksSteps: [
    {
      title: 'Paste a Music Box Maniacs link',
      description:
        'Copy the musicboxmaniacs.com URL of the melody you want to share.'
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
  explanationHeading: 'Why use our Music Box Maniacs embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Music Box Maniacs link and get working embed HTML in seconds.'
    },
    {
      title: 'Built for music box melodies',
      description:
        'Embeds the community melodies from Music Box Maniacs with their interactive player intact.'
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
      title: 'Interactive player',
      description:
        'Embed the Music Box Maniacs player so visitors can play the melody right on your page.'
    },
    {
      title: 'Responsive embed',
      description:
        'The generated player scales to fit the column width of your page or article.'
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
      question: 'How do I embed a Music Box Maniacs melody on my website?',
      answer:
        'Paste the musicboxmaniacs.com URL into the tool, click Generate, and copy the embed HTML into your page.'
    },
    {
      question: 'Can visitors play the melody inside the embed?',
      answer:
        'Yes. The embed keeps the interactive player so visitors can play the music box melody without leaving your page.'
    },
    {
      question: 'What kind of content can I embed?',
      answer:
        'Music box melodies created, played, and shared by the Music Box Maniacs community.'
    },
    {
      question: 'Will the player stay responsive on mobile?',
      answer:
        'Yes. The generated embed adapts to the available width so it works on phones, tablets, and desktops.'
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
