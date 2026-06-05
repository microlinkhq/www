import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Flat',
  slug: 'flat',
  color: '#3981FF',
  exampleUrl:
    'https://flat.io/score/56ae21579a127715a02901a6-house-of-the-rising-sun',
  metaTitle: 'Flat Embed Code Generator — Embed Sheet Music & Tabs',
  metaDescription:
    'Free Flat.io embed code generator. Paste any Flat score URL — get a ready-to-paste interactive embed for sheet music, scores, and guitar tabs. No signup.',
  keywords: [
    'embed flat',
    'flat embed code',
    'flat.io embed code generator',
    'embed sheet music',
    'embed flat score',
    'interactive sheet music embed',
    'flat tablature embed'
  ],
  heroTitle: 'Flat Embed Code Generator',
  heroSubtitle:
    'Paste any Flat.io score URL — get a ready-to-paste interactive embed for sheet music, scores, and guitar tabs.',
  howItWorksHeading: 'How to embed a Flat score',
  howItWorksSteps: [
    {
      title: 'Paste a Flat link',
      description:
        'Copy any flat.io URL — public sheet music scores, arrangements, and guitar tablature.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the score and generates the right interactive embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Flat embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any Flat score link and get working embed HTML.'
    },
    {
      title: 'Interactive playback',
      description:
        'The native Flat embed keeps note playback, transposition, and zoom intact for your readers.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Flat embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native interactive score',
      description:
        'Get the real Flat embed with playback, instrument tracks, and responsive sheet music rendering.'
    },
    {
      title: 'Scores & tablature',
      description:
        'Works with sheet music, arrangements, and guitar tabs — all public Flat scores are supported.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/soundcloud',
      label: 'SoundCloud'
    },
    {
      href: '/tools/embed-url/musicboxmaniacs-com',
      label: 'Music Box Maniacs'
    },
    {
      href: '/tools/embed-url/codepen',
      label: 'CodePen'
    }
  ],
  faq: [
    {
      question: 'How do I embed a Flat score on my website?',
      answer:
        'Paste any public flat.io score URL into the tool and click Generate. You will get a ready-to-paste interactive embed.'
    },
    {
      question: 'Can I embed guitar tabs and full scores?',
      answer:
        'Yes. Sheet music, multi-instrument arrangements, and guitar tablature all work as interactive embeds.'
    },
    {
      question: 'Does the embed keep playback and transposition?',
      answer:
        'Yes. The native Flat embed preserves note playback, zoom, and the interactive score controls.'
    },
    {
      question: 'What if the Flat score is private?',
      answer:
        'Native embedding needs a public or sharing-link score. For private scores the tool falls back to a styled preview card with the available metadata.'
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
