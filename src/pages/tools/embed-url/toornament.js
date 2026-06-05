import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Toornament',
  slug: 'toornament',
  color: '#1E2A38',
  exampleUrl: 'https://toornament.com',
  metaTitle: 'Toornament Embed Code Generator — Embed Brackets & Schedules',
  metaDescription:
    'Free Toornament embed code generator. Paste any Toornament URL — get a ready-to-paste widget for tournament brackets, schedules, standings, and results. No signup.',
  keywords: [
    'embed toornament',
    'toornament embed code',
    'toornament embed code generator',
    'embed tournament bracket',
    'toornament iframe code',
    'toornament bracket embed',
    'embed esports schedule'
  ],
  heroTitle: 'Toornament Embed Code Generator',
  heroSubtitle:
    'Paste any Toornament URL — get a ready-to-paste widget for tournament brackets, schedules, standings, and results.',
  howItWorksHeading: 'How to embed Toornament content',
  howItWorksSteps: [
    {
      title: 'Paste a Toornament link',
      description:
        'Copy the URL of any Toornament bracket, schedule, or standings page and paste it in.'
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
  explanationHeading: 'Why use our Toornament embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the dashboard. Paste a Toornament link and get working embed HTML in one step.'
    },
    {
      title: 'Brackets and schedules',
      description:
        'Handles tournament brackets, match schedules, standings, and results from any Toornament URL.'
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
      title: 'Live bracket widget',
      description:
        'Embed an interactive tournament bracket that reflects results as matches are played.'
    },
    {
      title: 'Schedules and standings',
      description:
        'Drop in match schedules and standings tables so fans can follow the competition.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/znipe', label: 'Znipe' },
    { href: '/tools/embed-url/sooplive', label: 'SOOP Live' },
    { href: '/tools/embed-url/youtube', label: 'YouTube' }
  ],
  faq: [
    {
      question: 'How do I embed a Toornament bracket on my website?',
      answer:
        'Paste the Toornament URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Does the embedded bracket update as matches are played?',
      answer:
        'Yes. The native widget reflects schedules, standings, and results as the tournament progresses.'
    },
    {
      question: 'Can I embed schedules and standings too?',
      answer:
        'Yes. The tool supports brackets, match schedules, standings, and results from Toornament.'
    },
    {
      question: 'What if the Toornament page is private?',
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
