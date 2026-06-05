import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'TickCounter',
  slug: 'tickcounter',
  color: '#FF9800',
  exampleUrl: 'https://tickcounter.com',
  metaTitle: 'TickCounter Embed Code Generator — Embed Countdown Timers',
  metaDescription:
    'Free TickCounter embed code generator. Paste any TickCounter URL — get a ready-to-paste widget for countdown timers, count-up timers, and clocks. No signup.',
  keywords: [
    'embed tickcounter',
    'tickcounter embed code',
    'tickcounter embed code generator',
    'embed countdown timer',
    'tickcounter iframe code',
    'countdown timer embed',
    'embed tickcounter clock'
  ],
  heroTitle: 'TickCounter Embed Code Generator',
  heroSubtitle:
    'Paste any TickCounter URL — get a ready-to-paste widget for countdown timers, count-up timers, and clocks.',
  howItWorksHeading: 'How to embed TickCounter content',
  howItWorksSteps: [
    {
      title: 'Paste a TickCounter link',
      description:
        'Copy the URL of any TickCounter countdown, count-up timer, or clock and paste it in.'
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
  explanationHeading: 'Why use our TickCounter embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the dashboard. Paste a TickCounter link and get working embed HTML in one step.'
    },
    {
      title: 'Timers and clocks',
      description:
        'Handles countdown timers, count-up timers, and live clocks from any TickCounter URL.'
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
      title: 'Live countdown widget',
      description:
        'Embed a ticking countdown or count-up timer that updates in real time on your page.'
    },
    {
      title: 'Clock support',
      description:
        'Drop in a live clock for any time zone alongside your countdowns.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/raindrop', label: 'Raindrop' },
    { href: '/tools/embed-url/curated', label: 'Curated' },
    { href: '/tools/embed-url/datawrapper', label: 'Datawrapper' }
  ],
  faq: [
    {
      question: 'How do I embed a TickCounter countdown on my website?',
      answer:
        'Paste the TickCounter URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Does the embedded timer keep counting down live?',
      answer:
        'Yes. The native widget ticks in real time so visitors always see an accurate countdown.'
    },
    {
      question: 'Can I embed a count-up timer or a clock too?',
      answer:
        'Yes. The tool supports countdown timers, count-up timers, and live clocks from TickCounter.'
    },
    {
      question: 'What if the TickCounter timer is private?',
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
