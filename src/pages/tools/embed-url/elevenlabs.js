import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'ElevenLabs',
  slug: 'elevenlabs',
  color: '#000000',
  exampleUrl: 'https://elevenlabs.io',
  metaTitle: 'ElevenLabs Embed Code Generator — Embed AI voice clips and audio',
  metaDescription:
    'Free ElevenLabs embed code generator. Paste any ElevenLabs URL — get a ready-to-paste embed for AI voice clips and audio. No signup.',
  keywords: [
    'embed elevenlabs',
    'elevenlabs embed code',
    'elevenlabs audio embed'
  ],
  heroTitle: 'ElevenLabs Embed Code Generator',
  heroSubtitle:
    'Paste any ElevenLabs URL — get a ready-to-paste embed for AI voice clips and audio.',
  howItWorksHeading: 'How to embed ElevenLabs content',
  howItWorksSteps: [
    {
      title: 'Paste a ElevenLabs link',
      description: 'Copy any elevenlabs.io URL — AI voice clips and audio.'
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
  explanationHeading: 'Why use our ElevenLabs embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any ElevenLabs link and get working embed HTML.'
    },
    {
      title: 'All ElevenLabs content',
      description:
        'Works with AI voice clips and audio — the tool handles all ElevenLabs URL formats.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 ElevenLabs embeds per day. No login, no API key.'
    }
  ],
  features: [
    {
      title: 'Native embed',
      description:
        'Get the real ElevenLabs embed with full interactivity when available.'
    },
    {
      title: 'All AI voice clips and audio',
      description:
        'Works with AI voice clips and audio — all ElevenLabs content types.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/embed/providers', label: 'All providers' }
  ],
  faq: [
    {
      question: 'How do I embed ElevenLabs content on my website?',
      answer:
        'Paste any ElevenLabs URL into the tool and click Generate. You will get a ready-to-paste embed snippet.'
    },
    {
      question: 'Is the ElevenLabs embed generator free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    },
    {
      question: 'What if the ElevenLabs content is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
    }
  ]
}

export const Head = () => providerHead(data)

const Page = () => <ProviderSubtool {...data} />

export default Page
