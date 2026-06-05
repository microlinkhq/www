import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Polldaddy',
  slug: 'poll-daddy',
  color: '#F0821E',
  exampleUrl: 'https://polldaddy.com',
  metaTitle: 'Polldaddy Embed Code Generator — Embed Polls, Surveys & Quizzes',
  metaDescription:
    'Free Polldaddy embed code generator. Paste any Polldaddy URL — get a ready-to-paste embed for polls, surveys, and quizzes. No signup.',
  keywords: [
    'embed polldaddy',
    'polldaddy embed code',
    'polldaddy embed code generator',
    'embed polldaddy poll',
    'embed polldaddy survey',
    'polldaddy quiz embed',
    'polldaddy iframe code'
  ],
  heroTitle: 'Polldaddy Embed Code Generator',
  heroSubtitle:
    'Paste any Polldaddy URL — get a ready-to-paste embed for polls, surveys, and quizzes.',
  howItWorksHeading: 'How to embed Polldaddy content',
  howItWorksSteps: [
    {
      title: 'Paste a Polldaddy link',
      description:
        'Copy the URL of any Polldaddy poll, survey, or quiz and paste it into the field.'
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
  explanationHeading: 'Why use our Polldaddy embed code generator',
  reasons: [
    {
      title: 'Polls, surveys, and quizzes',
      description:
        'Detects whether your Polldaddy link is a poll, a survey, or a quiz and builds the matching interactive embed.'
    },
    {
      title: 'Works with Crowdsignal links too',
      description:
        'Polldaddy is now Crowdsignal, and the tool handles both URL formats so older and newer links keep working.'
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
      title: 'Interactive poll embeds',
      description:
        'Visitors can vote and see results directly inside the embedded Polldaddy widget on your page.'
    },
    {
      title: 'Survey and quiz support',
      description:
        'Longer surveys and scored quizzes embed with their full question flow intact.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/pinpoll', label: 'Pinpoll' },
    { href: '/tools/embed-url/quiz-biz', label: 'Quiz Biz' },
    { href: '/tools/embed-url/insticator', label: 'Insticator' }
  ],
  faq: [
    {
      question: 'How do I embed a Polldaddy poll on my website?',
      answer:
        'Paste the Polldaddy poll URL into the tool, click Generate, then copy the embed code into your page.'
    },
    {
      question: 'Can I embed surveys and quizzes too?',
      answer:
        'Yes. The tool supports Polldaddy polls, surveys, and quizzes, building the right embed for each type.'
    },
    {
      question: 'Does it work with Crowdsignal links?',
      answer:
        'Yes. Polldaddy rebranded to Crowdsignal, and the generator accepts both Polldaddy and Crowdsignal URLs.'
    },
    {
      question: 'Will visitors be able to vote inside the embed?',
      answer:
        'Yes. When native embedding is available, the widget stays fully interactive so people can vote and view results.'
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
