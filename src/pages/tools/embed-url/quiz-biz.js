import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Quiz-Biz',
  slug: 'quiz-biz',
  color: '#F39C12',
  exampleUrl: 'https://quiz.biz',
  metaTitle: 'Quiz-Biz Embed Code Generator — Embed Quizzes & Tests',
  metaDescription:
    'Free Quiz-Biz embed code generator. Paste any quiz.biz URL — get a ready-to-paste embed for quizzes and tests. No signup.',
  keywords: [
    'embed quiz.biz',
    'quiz.biz embed code',
    'quiz.biz embed code generator',
    'embed quiz',
    'quiz.biz iframe code',
    'embed online test',
    'quiz.biz quiz embed'
  ],
  heroTitle: 'Quiz-Biz Embed Code Generator',
  heroSubtitle:
    'Paste any quiz.biz URL — get a ready-to-paste embed for quizzes and tests.',
  howItWorksHeading: 'How to embed Quiz-Biz content',
  howItWorksSteps: [
    {
      title: 'Paste a Quiz-Biz link',
      description: 'Copy the URL of any quiz.biz quiz or test and drop it in.'
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
  explanationHeading: 'Why use our Quiz-Biz embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual URL conversion. Paste any quiz.biz link and get working embed HTML in seconds.'
    },
    {
      title: 'Built for quizzes and tests',
      description:
        'Handles quiz.biz quizzes and tests so visitors can play along right inside your page.'
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
      title: 'Quiz embeds',
      description:
        'Embed interactive quiz.biz quizzes so readers can take them without leaving your page.'
    },
    {
      title: 'Test embeds',
      description:
        'Drop quiz.biz tests into lessons, articles, or landing pages to engage your audience.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/poll-daddy', label: 'PollDaddy' },
    { href: '/tools/embed-url/pinpoll', label: 'Pinpoll' },
    { href: '/tools/embed-url/learningapps-org', label: 'LearningApps' }
  ],
  faq: [
    {
      question: 'How do I embed a quiz.biz quiz on my website?',
      answer:
        'Paste the quiz URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'Can I embed quiz.biz tests too?',
      answer:
        'Yes. Paste the test URL and the generator produces an embed you can drop into any page.'
    },
    {
      question: 'Can visitors take the quiz directly in my page?',
      answer:
        'When a native embed is available, the quiz stays interactive so visitors can answer in place.'
    },
    {
      question: 'What if the quiz.biz content is private?',
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
