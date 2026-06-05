import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'neetoRecord',
  slug: 'neetorecord',
  color: '#4F46E5',
  exampleUrl: 'https://neetorecord.com',
  metaTitle: 'neetoRecord Embed Code Generator — Embed Screen Recordings',
  metaDescription:
    'Free neetoRecord embed code generator. Paste any neetoRecord URL — get a ready-to-paste player for screen recordings and video messages. No signup.',
  keywords: [
    'embed neetorecord',
    'neetorecord embed code',
    'neetorecord embed code generator',
    'embed neetorecord video',
    'embed screen recording',
    'neetorecord iframe code',
    'neetorecord player embed'
  ],
  heroTitle: 'neetoRecord Embed Code Generator',
  heroSubtitle:
    'Paste any neetoRecord URL — get a ready-to-paste player for screen recordings and async video messages.',
  howItWorksHeading: 'How to embed neetoRecord content',
  howItWorksSteps: [
    {
      title: 'Paste a neetoRecord link',
      description:
        'Copy the share URL of any neetoRecord screen recording or video message and paste it into the tool.'
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
  explanationHeading: 'Why use our neetoRecord embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste a neetoRecord share link and get working player HTML in one step.'
    },
    {
      title: 'Built for async video messages',
      description:
        'Tuned for neetoRecord screen and camera recordings, so quick walkthroughs play inline wherever you embed them.'
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
      title: 'Screen recording embeds',
      description:
        'Embed neetoRecord screen recordings directly in docs, tickets, or help articles with a responsive player.'
    },
    {
      title: 'Video message support',
      description:
        'Drop async video messages into emails, knowledge bases, or project pages so teammates can watch in place.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/vidyard', label: 'Vidyard' },
    { href: '/tools/embed-url/wistia', label: 'Wistia' },
    { href: '/tools/embed-url/dadan', label: 'Dadan' }
  ],
  faq: [
    {
      question: 'How do I embed a neetoRecord recording on my website?',
      answer:
        'Copy the neetoRecord share URL, paste it into the tool, then copy the generated HTML into your page.'
    },
    {
      question: 'Can I embed a neetoRecord video message in a help doc?',
      answer:
        'Yes. Paste the share link and the tool produces a responsive player you can drop into any HTML editor or knowledge base.'
    },
    {
      question: 'Will the embedded recording play inline?',
      answer:
        'Yes. The generated player lets viewers watch the screen recording directly on your page without leaving it.'
    },
    {
      question: 'What if a neetoRecord link is private?',
      answer:
        'When native embedding is restricted, the tool falls back to a styled preview card linking to the original recording.'
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
