import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Insticator',
  slug: 'insticator',
  color: '#1F2A60',
  exampleUrl: 'https://insticator.com',
  metaTitle: 'Insticator Embed Code Generator — Embed Engagement Units',
  metaDescription:
    'Free Insticator embed code generator. Paste any Insticator URL — get a ready-to-paste embed for polls, quizzes, and community engagement units. No signup.',
  keywords: [
    'embed insticator',
    'insticator embed code',
    'insticator embed code generator',
    'embed insticator poll',
    'insticator iframe code',
    'insticator quiz embed',
    'engagement unit embed'
  ],
  heroTitle: 'Insticator Embed Code Generator',
  heroSubtitle:
    'Paste any Insticator URL — get a ready-to-paste embed for polls, quizzes, and community engagement units.',
  howItWorksHeading: 'How to embed Insticator content',
  howItWorksSteps: [
    {
      title: 'Paste an Insticator link',
      description:
        'Copy any insticator.com URL — a poll, quiz, or engagement unit.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the unit and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Insticator embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Insticator link and get working embed HTML instantly.'
    },
    {
      title: 'Polls & quizzes',
      description:
        'Works with the interactive polls, quizzes, and community units Insticator provides for publishers.'
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
      title: 'Interactive engagement unit',
      description:
        'Embed the live Insticator unit so visitors can vote, answer, and interact in place.'
    },
    {
      title: 'Polls, quizzes & comments',
      description:
        'Interactive polls, quizzes, and community comment units from Insticator all embed cleanly.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    {
      href: '/tools/embed-url/poll-daddy',
      label: 'Polldaddy'
    },
    {
      href: '/tools/embed-url/pinpoll',
      label: 'Pinpoll'
    },
    {
      href: '/tools/embed-url/quiz-biz',
      label: 'Quiz Biz'
    }
  ],
  faq: [
    {
      question: 'How do I embed an Insticator unit on my website?',
      answer:
        'Paste any Insticator URL into the tool and click Generate. You will get a ready-to-paste embed for the unit.'
    },
    {
      question: 'What is Insticator?',
      answer:
        'Insticator is an audience-engagement platform that gives publishers interactive units such as polls, quizzes, and community comments.'
    },
    {
      question: 'Can visitors interact with the embedded unit?',
      answer:
        'Yes. When the unit supports live embedding, visitors can vote and interact directly in the page.'
    },
    {
      question: 'What if the unit cannot be embedded?',
      answer:
        'Switch to Card mode to get a styled preview card with the title and image instead.'
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
