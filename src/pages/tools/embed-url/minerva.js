import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Minerva',
  slug: 'minerva',
  color: '#5A31F4',
  exampleUrl: 'https://minerva.com',
  metaTitle: 'Minerva Embed Code Generator — Embed Interactive How-To Guides',
  metaDescription:
    'Free Minerva embed code generator. Paste any Minerva URL — get a ready-to-paste embed for interactive, step-by-step how-to guides and walkthroughs. No signup.',
  keywords: [
    'embed minerva',
    'minerva embed code',
    'minerva embed code generator',
    'embed minerva guide',
    'minerva walkthrough embed',
    'embed how-to guide',
    'minerva iframe code'
  ],
  heroTitle: 'Minerva Embed Code Generator',
  heroSubtitle:
    'Paste any Minerva URL — get a ready-to-paste embed for interactive, step-by-step how-to guides and walkthroughs.',
  howItWorksHeading: 'How to embed Minerva guides',
  howItWorksSteps: [
    {
      title: 'Paste a Minerva link',
      description:
        'Copy the URL of the Minerva guide or walkthrough you want to share.'
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
  explanationHeading: 'Why use our Minerva embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any Minerva link and get working embed HTML without writing iframe markup yourself.'
    },
    {
      title: 'Built for interactive guides',
      description:
        'Embeds Minerva step-by-step how-to guides so readers can follow each step in place.'
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
      title: 'Step-by-step walkthroughs',
      description:
        'Embed interactive guides that walk readers through a task one step at a time.'
    },
    {
      title: 'Responsive embed',
      description:
        'The generated guide scales to fit the column width of your page or documentation.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/speakerdeck', label: 'Speaker Deck' },
    { href: '/tools/embed-url/learningapps-org', label: 'LearningApps' },
    { href: '/tools/embed-url/codehs', label: 'CodeHS' }
  ],
  faq: [
    {
      question: 'How do I embed a Minerva guide on my website?',
      answer:
        'Paste the Minerva URL into the tool, click Generate, and copy the embed HTML into your page.'
    },
    {
      question: 'What kind of content can I embed from Minerva?',
      answer:
        'Interactive, step-by-step how-to guides and walkthroughs created in Minerva.'
    },
    {
      question: 'Can readers follow the steps inside the embed?',
      answer:
        'Yes. The embedded guide keeps its interactive steps so readers can move through it without leaving your page.'
    },
    {
      question: 'What if a guide is private?',
      answer:
        'Private guides fall back to a styled preview card with the available metadata.'
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
