import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Typecast',
  slug: 'typecast',
  color: '#FE7E43',
  exampleUrl: 'https://typecast.ai/text-to-speech',
  metaTitle: 'Typecast Embed Code Generator — Embed AI voice and video pages',
  metaDescription:
    'Free Typecast embed code generator. Paste any Typecast URL — get a ready-to-paste preview card for AI voice, text-to-speech, and AI video pages. No signup.',
  keywords: [
    'embed typecast',
    'typecast embed code',
    'typecast embed code generator',
    'typecast preview card',
    'embed typecast ai voice',
    'typecast text to speech embed',
    'typecast link preview'
  ],
  heroTitle: 'Typecast Embed Code Generator',
  heroSubtitle:
    'Paste any Typecast URL — get a ready-to-paste preview card linking to AI voice, text-to-speech, and AI video pages.',
  howItWorksHeading: 'How to embed a Typecast page',
  howItWorksSteps: [
    {
      title: 'Paste a Typecast link',
      description:
        'Copy any typecast.ai URL — AI voice, text-to-speech, or AI avatar video pages.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page metadata and builds a clean, ready-to-paste preview card.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Typecast embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip building markup by hand. Paste any Typecast link and get a clean preview card you can drop anywhere.'
    },
    {
      title: 'Honest preview card',
      description:
        'Typecast does not publish per-item embed players, so the tool generates a styled preview card that links back to the page instead.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Typecast embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Preview card with title and image',
      description:
        'Pulls the page title, description, and thumbnail into a tidy card that links straight back to Typecast.'
    },
    {
      title: 'Works across Typecast pages',
      description:
        'AI voice generator, text-to-speech, and AI avatar video pages all resolve to a shareable preview.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/elevenlabs', label: 'ElevenLabs' },
    { href: '/tools/embed-url/synthesia', label: 'Synthesia' },
    { href: '/tools/embed-url/soundcloud', label: 'SoundCloud' }
  ],
  faq: [
    {
      question: 'How do I embed a Typecast page on my website?',
      answer:
        'Paste any Typecast URL into the tool and click Generate. You will get a ready-to-paste preview card that links back to the page.'
    },
    {
      question: 'Does Typecast offer a native embed player?',
      answer:
        'No. Typecast is built around exporting and downloading audio and video, so it does not expose public per-item embed players. The tool generates a styled preview card instead.'
    },
    {
      question: 'What does the preview card include?',
      answer:
        'The card shows the page title, description, and thumbnail, and links back to the original Typecast URL. You can customize its colors, fonts, and layout in Card mode.'
    },
    {
      question: 'Can I embed AI voice, text-to-speech, and AI video pages?',
      answer:
        'Yes. Any public typecast.ai URL works, including AI voice generator, text-to-speech, and AI avatar video pages.'
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
