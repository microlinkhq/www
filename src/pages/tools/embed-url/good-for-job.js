import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Good for Job',
  slug: 'good-for-job',
  color: '#18181B',
  exampleUrl:
    'https://www.good-for-job.jp/slides/89821a75-bb64-4da5-983d-2419643b1a32',
  metaTitle: 'Good for Job Embed Code Generator — Embed Recruitment Slides',
  metaDescription:
    'Free Good for Job embed code generator. Paste a Good for Job slide URL — get a ready-to-paste iframe for recruitment pitch decks, or a preview card. No signup.',
  keywords: [
    'embed good for job',
    'good for job embed code',
    'good for job embed code generator',
    'embed good for job slides',
    'good for job iframe code',
    'good for job slide embed',
    'embed recruitment pitch deck'
  ],
  heroTitle: 'Good for Job Embed Code Generator',
  heroSubtitle:
    'Paste a Good for Job slide URL — get a ready-to-paste iframe for recruitment pitch decks.',
  howItWorksHeading: 'How to embed a Good for Job slide',
  howItWorksSteps: [
    {
      title: 'Paste a Good for Job link',
      description:
        'Copy a slide URL from good-for-job.jp, such as a /slides/ link.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the slide and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Good for Job embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip writing iframe markup by hand. Paste a Good for Job slide link and get working embed HTML.'
    },
    {
      title: 'Recruitment pitch decks',
      description:
        'Built for Good for Job slide decks — the presentation materials companies share to attract candidates.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Good for Job embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native slide embed',
      description:
        'Get the real Good for Job slide iframe so visitors can view the pitch deck inline.'
    },
    {
      title: 'Responsive layout',
      description:
        'The embed fits your page so the slide deck stays readable across screen sizes.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' },
    { href: '/tools/embed-url/behance', label: 'Behance' }
  ],
  faq: [
    {
      question: 'How do I embed a Good for Job slide on my website?',
      answer:
        'Paste a Good for Job slide URL into the tool and click Generate. You will get a ready-to-paste iframe embed.'
    },
    {
      question: 'What is Good for Job?',
      answer:
        'Good for Job (good-for-job.jp) is a Japanese platform where companies publish recruitment pitch decks to attract job candidates.'
    },
    {
      question: 'What if native embedding is not available?',
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
