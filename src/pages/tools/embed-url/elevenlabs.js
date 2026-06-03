import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'ElevenLabs',
  slug: 'elevenlabs',
  color: '#000000',
  exampleUrl: 'https://elevenlabs.io/text-to-speech',
  metaTitle: 'ElevenLabs Embed Code Generator — Embed AI Voice & Audio',
  metaDescription:
    'Free ElevenLabs embed code generator. Paste any ElevenLabs URL — get a clean, customizable preview card for AI voice, text-to-speech, and audio pages. No signup.',
  keywords: [
    'embed elevenlabs',
    'elevenlabs embed code',
    'elevenlabs embed code generator',
    'embed elevenlabs audio',
    'elevenlabs voice embed',
    'embed elevenlabs voice',
    'elevenlabs text to speech embed'
  ],
  heroTitle: 'ElevenLabs Embed Code Generator',
  heroSubtitle:
    'Paste any ElevenLabs URL — get a clean, customizable preview card for AI voice, text-to-speech, and audio pages.',
  howItWorksHeading: 'How to embed an ElevenLabs page',
  howItWorksSteps: [
    {
      title: 'Paste an ElevenLabs link',
      description:
        'Copy any elevenlabs.io URL — text-to-speech pages, voice library voices, or shared audio pages.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the page metadata and builds a styled preview card you can copy as HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our ElevenLabs embed code generator',
  reasons: [
    {
      title: 'Honest about native embeds',
      description:
        'ElevenLabs Audio Native players only embed projects you own and allowlist, so there is no public per-item embed for arbitrary links. This tool builds a shareable preview card instead.'
    },
    {
      title: 'Works with any ElevenLabs URL',
      description:
        'Point it at a text-to-speech page, a voice library voice, or a shared audio page and get a clean card with title and image.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 ElevenLabs embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Preview card for any link',
      description:
        'A styled card pulls the page title, description, and image from any elevenlabs.io URL — ideal when native embedding is not available.'
    },
    {
      title: 'AI voice & audio context',
      description:
        'Built for ElevenLabs text-to-speech, voice library, dubbing, and shared audio pages so the card reflects the right content.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/synthesia', label: 'Synthesia' },
    { href: '/tools/embed-url/typecast', label: 'Typecast' },
    { href: '/tools/embed-url/soundcloud', label: 'SoundCloud' }
  ],
  faq: [
    {
      question: 'How do I embed an ElevenLabs page on my website?',
      answer:
        'Paste any ElevenLabs URL into the tool and click Generate. You will get a ready-to-paste preview card you can drop into any HTML.'
    },
    {
      question: 'Can I embed an ElevenLabs audio player directly?',
      answer:
        'ElevenLabs Audio Native players only work for projects you own and configure with a domain allowlist, so there is no public per-item player embed. This tool generates a preview card that links back to the page instead.'
    },
    {
      question: 'What ElevenLabs content does it work with?',
      answer:
        'Any elevenlabs.io URL, including text-to-speech pages, voice library voices, dubbing pages, and shared audio pages.'
    },
    {
      question: 'What if the ElevenLabs content is private?',
      answer:
        'The tool can only read publicly accessible pages. For private or login-gated links it falls back to a basic card with whatever metadata is available.'
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
