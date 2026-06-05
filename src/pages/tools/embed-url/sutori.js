import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Sutori',
  slug: 'sutori',
  color: '#2EC4B6',
  exampleUrl: 'https://sutori.com',
  metaTitle: 'Sutori Embed Code Generator — Embed Interactive Timelines',
  metaDescription:
    'Free Sutori embed code generator. Paste any Sutori URL — get a ready-to-paste embed for interactive timelines and classroom stories. No signup.',
  keywords: [
    'embed sutori',
    'sutori embed code',
    'sutori embed code generator',
    'embed sutori timeline',
    'embed interactive timeline',
    'sutori iframe code',
    'sutori story embed'
  ],
  heroTitle: 'Sutori Embed Code Generator',
  heroSubtitle:
    'Paste any Sutori URL — get a ready-to-paste embed for interactive timelines and classroom stories.',
  howItWorksHeading: 'How to embed Sutori timelines',
  howItWorksSteps: [
    {
      title: 'Paste a Sutori link',
      description:
        'Copy the URL of any Sutori timeline or story and drop it into the field.'
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
  explanationHeading: 'Why use our Sutori embed code generator',
  reasons: [
    {
      title: 'Built for interactive timelines',
      description:
        'Turn any Sutori timeline or story into an embed your readers can scroll and explore.'
    },
    {
      title: 'Great for classrooms and LMS',
      description:
        'Drop instructional stories into a course page, learning platform, or class blog with one paste.'
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
      title: 'Interactive timeline embed',
      description:
        'Embed Sutori interactive timelines and stories so visitors can move through them in place.'
    },
    {
      title: 'Education-friendly',
      description:
        'Works well inside LMS pages and classroom sites where Sutori stories are commonly shared.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/learningapps-org', label: 'LearningApps' },
    { href: '/tools/embed-url/wizer-me', label: 'Wizer.me' },
    { href: '/tools/embed-url/storymaps', label: 'StoryMaps' }
  ],
  faq: [
    {
      question: 'How do I embed a Sutori timeline on my website?',
      answer:
        'Paste the Sutori URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Can students interact with the embedded timeline?',
      answer:
        'Yes. When native embedding is available, the timeline stays scrollable and interactive inline.'
    },
    {
      question: 'Will a Sutori embed work inside my LMS?',
      answer:
        'Most learning platforms accept iframe embeds, so the generated code drops in like any HTML block.'
    },
    {
      question: 'What if the Sutori story is set to private?',
      answer:
        'The tool falls back to a styled preview card built from the available metadata.'
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
