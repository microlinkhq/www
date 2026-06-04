import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Typlog',
  slug: 'typlog',
  color: '#1A1A1A',
  exampleUrl: 'https://typlog.com',
  metaTitle: 'Typlog Embed Code Generator — Embed Blog Posts & Podcasts',
  metaDescription:
    'Free Typlog embed code generator. Paste any Typlog URL — get a ready-to-paste embed for blog posts and podcast episodes. No signup.',
  keywords: [
    'embed typlog',
    'typlog embed code',
    'typlog embed code generator',
    'embed typlog podcast',
    'embed typlog blog post',
    'typlog iframe code',
    'typlog episode embed'
  ],
  heroTitle: 'Typlog Embed Code Generator',
  heroSubtitle:
    'Paste any Typlog URL — get a ready-to-paste embed for blog posts and podcast episodes.',
  howItWorksHeading: 'How to embed Typlog content',
  howItWorksSteps: [
    {
      title: 'Paste a Typlog link',
      description: 'Copy a Typlog blog post or podcast episode URL.'
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
  explanationHeading: 'Why use our Typlog embed code generator',
  reasons: [
    {
      title: 'Posts and podcasts in one tool',
      description:
        'Embed Typlog blog articles or podcast episodes from a single URL — the tool picks the right format.'
    },
    {
      title: 'No manual setup',
      description:
        'Paste a Typlog link and get working embed HTML in seconds — no markup to write by hand.'
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
      title: 'Podcast player embed',
      description:
        'Embed a Typlog episode with an inline audio player so visitors can listen without leaving your page.'
    },
    {
      title: 'Blog post embed',
      description:
        'Turn a Typlog article link into a clean embedded card with title, summary, and image.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/buttondown', label: 'Buttondown' },
    { href: '/tools/embed-url/soundcloud', label: 'SoundCloud' },
    { href: '/tools/embed-url/saooti', label: 'Saooti' }
  ],
  faq: [
    {
      question: 'How do I embed a Typlog podcast episode on my website?',
      answer:
        'Paste the episode URL into the tool, click Generate, then copy the HTML to add an inline audio player.'
    },
    {
      question: 'Can I embed a Typlog blog post too?',
      answer:
        'Yes. Paste a Typlog article URL and the tool builds an embedded card with the title, summary, and image.'
    },
    {
      question: 'Will the Typlog audio player work on mobile?',
      answer:
        'Yes. The generated player is responsive and works across desktop and mobile browsers.'
    },
    {
      question: 'What if the Typlog content cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card built from the available post or episode metadata.'
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
