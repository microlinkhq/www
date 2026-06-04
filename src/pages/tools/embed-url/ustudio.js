import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'uStudio',
  slug: 'ustudio',
  color: '#F26522',
  exampleUrl: 'https://ustudio.com',
  metaTitle: 'uStudio Embed Code Generator — Embed Business Video & Podcasts',
  metaDescription:
    'Free uStudio embed code generator. Paste any uStudio URL — get a ready-to-paste embed for business video and podcast content. No signup.',
  keywords: [
    'embed ustudio',
    'ustudio embed code',
    'ustudio embed code generator',
    'embed ustudio video',
    'embed ustudio podcast',
    'ustudio iframe code',
    'ustudio player embed'
  ],
  heroTitle: 'uStudio Embed Code Generator',
  heroSubtitle:
    'Paste any uStudio URL — get a ready-to-paste embed for business video and podcast content.',
  howItWorksHeading: 'How to embed uStudio content',
  howItWorksSteps: [
    {
      title: 'Paste a uStudio link',
      description: 'Copy the URL for a uStudio video or podcast.'
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
  explanationHeading: 'Why use our uStudio embed code generator',
  reasons: [
    {
      title: 'Video and podcasts in one tool',
      description:
        'Embed uStudio business video or podcast content from a single URL — the tool picks the right player.'
    },
    {
      title: 'No manual setup',
      description:
        'Paste a uStudio link and get working embed HTML in seconds — no markup to write by hand.'
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
      title: 'Business video embed',
      description:
        'Embed a uStudio video with full playback controls so teams can watch directly in your page.'
    },
    {
      title: 'Podcast player embed',
      description:
        'Turn a uStudio podcast link into an inline audio player visitors can listen to in place.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/vidyard', label: 'Vidyard' },
    { href: '/tools/embed-url/brightcove', label: 'Brightcove' },
    { href: '/tools/embed-url/wistia', label: 'Wistia' }
  ],
  faq: [
    {
      question: 'How do I embed a uStudio video on my website?',
      answer:
        'Paste the uStudio URL into the tool, click Generate, then copy the HTML it produces into your page.'
    },
    {
      question: 'Can I embed a uStudio podcast as well?',
      answer:
        'Yes. Paste a uStudio podcast URL and the tool builds an inline audio player for the episode.'
    },
    {
      question: 'Will the uStudio player be responsive on mobile?',
      answer:
        'Yes. The generated embed scales to the width of your page so it works on desktop and mobile.'
    },
    {
      question:
        'What if the uStudio content is restricted and cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card built from the available content metadata.'
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
