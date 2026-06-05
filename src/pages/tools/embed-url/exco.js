import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'EX.CO',
  slug: 'exco',
  color: '#6B8EF7',
  exampleUrl: 'https://content.ex.co/glossary',
  metaTitle: 'EX.CO Embed Code Generator — Embed Video Units, Polls & Quizzes',
  metaDescription:
    'Free EX.CO embed code generator. Paste an EX.CO URL — get a ready-to-paste embed for video units, polls, and quizzes, or a preview card. No signup.',
  keywords: [
    'embed exco',
    'exco embed code',
    'exco embed generator',
    'embed exco video',
    'embed exco poll',
    'embed exco quiz',
    'exco player embed',
    'exco interactive content embed'
  ],
  heroTitle: 'EX.CO Embed Code Generator',
  heroSubtitle:
    'Paste an EX.CO URL to get ready-to-paste embed HTML for its video units, polls, and quizzes — or a preview card.',
  howItWorksHeading: 'How to embed EX.CO content',
  howItWorksSteps: [
    {
      title: 'Paste an EX.CO link',
      description:
        'Copy any ex.co, player.ex.co, or content.ex.co link to a video unit, poll, or quiz.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the EX.CO content and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our EX.CO embed code generator',
  reasons: [
    {
      title: 'No dashboard required',
      description:
        'Paste an EX.CO link and get working embed HTML — no need to copy tags from the EX.CO editor.'
    },
    {
      title: 'Interactive content ready',
      description:
        'Handles EX.CO video units, polls, and quizzes so the interactive experience stays intact.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 EX.CO embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native player embed',
      description:
        'Get the real EX.CO player with full interactivity for video units, polls, and quizzes when available.'
    },
    {
      title: 'Responsive output',
      description:
        'The embed adapts to its container so EX.CO content fits cleanly on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/ceros', label: 'Ceros' },
    { href: '/tools/embed-url/poll-daddy', label: 'Polldaddy' },
    { href: '/tools/embed-url/brightcove', label: 'Brightcove' }
  ],
  faq: [
    {
      question: 'How do I embed EX.CO content on my website?',
      answer:
        'Paste an EX.CO URL into the tool and click Generate. It returns ready-to-paste embed HTML for the video unit, poll, or quiz.'
    },
    {
      question: 'What types of EX.CO content can I embed?',
      answer:
        'EX.CO interactive units such as video players, polls, and quizzes, as well as their playlist-driven video experiences.'
    },
    {
      question: 'Does the embed keep EX.CO interactivity?',
      answer:
        'Yes. When a native embed is available, the EX.CO player loads with its full interactive experience like voting in polls or answering quizzes.'
    },
    {
      question: 'What if the EX.CO content is private or restricted?',
      answer:
        'The tool falls back to a styled preview card with the available title and image metadata.'
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
