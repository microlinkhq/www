import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Pinpoll',
  slug: 'pinpoll',
  color: '#FF5A5F',
  exampleUrl: 'https://www.pinpoll.com',
  metaTitle: 'Pinpoll Embed Code Generator — Embed Polls & Quizzes',
  metaDescription:
    'Free Pinpoll embed code generator. Paste any Pinpoll URL — get a ready-to-paste widget for polls, quizzes, and surveys. No signup.',
  keywords: [
    'embed pinpoll',
    'pinpoll embed code',
    'pinpoll embed code generator',
    'embed pinpoll poll',
    'pinpoll quiz embed',
    'pinpoll survey embed',
    'pinpoll widget embed'
  ],
  heroTitle: 'Pinpoll Embed Code Generator',
  heroSubtitle:
    'Paste any Pinpoll URL — get a ready-to-paste widget for polls, quizzes, and surveys.',
  howItWorksHeading: 'How to embed Pinpoll content',
  howItWorksSteps: [
    {
      title: 'Paste a Pinpoll link',
      description:
        'Copy the URL of your Pinpoll poll, quiz, or survey and paste it in.'
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
  explanationHeading: 'Why use our Pinpoll embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Turn any Pinpoll link into a working interactive widget without touching the dashboard.'
    },
    {
      title: 'Keep readers engaged',
      description:
        'Drop live polls, quizzes, and surveys into your articles to boost reader interaction.'
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
      title: 'Interactive widget embed',
      description:
        'Get the live Pinpoll widget so visitors can vote and answer right inside your page.'
    },
    {
      title: 'Polls, quizzes, and surveys',
      description:
        'Works across Pinpoll content types, from quick single-question polls to full surveys.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/poll-daddy', label: 'Poll Daddy' },
    { href: '/tools/embed-url/quiz-biz', label: 'Quiz Biz' },
    { href: '/tools/embed-url/insticator', label: 'Insticator' }
  ],
  faq: [
    {
      question: 'How do I embed a Pinpoll poll on my website?',
      answer:
        'Paste the Pinpoll URL into the tool, click Generate, then copy the HTML and paste it into your page where you want the poll to appear.'
    },
    {
      question: 'Can readers vote directly in the embedded widget?',
      answer:
        'Yes. The native embed keeps the widget interactive so visitors can vote and answer without leaving your page.'
    },
    {
      question: 'Does this work with quizzes and surveys too?',
      answer:
        'It does. The tool handles Pinpoll polls, quizzes, and surveys and generates the right embed for each.'
    },
    {
      question: 'What if the widget cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card with the title and image and a link to the original content.'
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
