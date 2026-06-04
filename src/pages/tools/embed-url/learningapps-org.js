import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'LearningApps',
  slug: 'learningapps-org',
  color: '#E2001A',
  exampleUrl: 'https://learningapps.org',
  metaTitle: 'LearningApps Embed Code Generator — Embed Interactive Exercises',
  metaDescription:
    'Free LearningApps embed code generator. Paste any LearningApps URL — get a ready-to-paste embed or preview card for quizzes, matching games, and interactive exercises. No signup.',
  keywords: [
    'embed learningapps',
    'learningapps embed code',
    'learningapps embed code generator',
    'embed learningapps exercise',
    'learningapps iframe code',
    'embed interactive quiz',
    'learningapps lesson embed'
  ],
  heroTitle: 'LearningApps Embed Code Generator',
  heroSubtitle:
    'Paste any LearningApps URL — get a ready-to-paste embed or preview card for quizzes, matching games, and interactive exercises.',
  howItWorksHeading: 'How to embed LearningApps content',
  howItWorksSteps: [
    {
      title: 'Paste a LearningApps link',
      description:
        'Copy any learningapps.org URL — a quiz, matching game, or word grid — and paste it into the tool.'
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
  explanationHeading: 'Why use our LearningApps embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any LearningApps link and get working embed HTML — no hunting for the iframe snippet.'
    },
    {
      title: 'Built for interactive exercises',
      description:
        'Recognizes LearningApps quizzes, matching games, and word grids so the exercise stays playable when embedded.'
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
      title: 'Interactive exercise embeds',
      description:
        'Generates an iframe that keeps quizzes and games fully interactive inside your lesson or page.'
    },
    {
      title: 'Title & thumbnail metadata',
      description:
        'Pulls the exercise title and preview image so the embed reads clearly to students.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/quiz-biz', label: 'Quiz Biz' },
    { href: '/tools/embed-url/poll-daddy', label: 'Polldaddy' },
    { href: '/tools/embed-url/codehs', label: 'CodeHS' }
  ],
  faq: [
    {
      question: 'How do I embed a LearningApps exercise in my lesson?',
      answer:
        'Paste the exercise URL from learningapps.org into the tool and click Generate to get the embed HTML.'
    },
    {
      question: 'Will the embedded exercise stay interactive?',
      answer:
        'Yes — the generated iframe keeps quizzes, matching games, and word grids fully playable for students.'
    },
    {
      question: 'Can I embed any type of LearningApps exercise?',
      answer:
        'The tool handles the interactive exercise formats published on learningapps.org and builds the matching embed.'
    },
    {
      question: 'What if an exercise cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card with the available title and image.'
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
