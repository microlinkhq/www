import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Supercut',
  slug: 'supercut',
  color: '#1E1E1E',
  exampleUrl: 'https://supercut.video',
  metaTitle: 'Supercut Embed Code Generator — Embed Video Clips',
  metaDescription:
    'Free Supercut embed code generator. Paste any Supercut URL — get a ready-to-paste player for video clips and supercuts. No signup.',
  keywords: [
    'embed supercut',
    'supercut embed code',
    'supercut embed code generator',
    'embed supercut video',
    'embed video clip',
    'supercut iframe code',
    'supercut video player embed'
  ],
  heroTitle: 'Supercut Embed Code Generator',
  heroSubtitle:
    'Paste any Supercut URL — get a ready-to-paste player for video clips and supercuts.',
  howItWorksHeading: 'How to embed Supercut clips',
  howItWorksSteps: [
    {
      title: 'Paste a Supercut link',
      description:
        'Copy the URL of any Supercut clip and drop it into the field.'
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
  explanationHeading: 'Why use our Supercut embed code generator',
  reasons: [
    {
      title: 'Built for video clips',
      description:
        'Turn any Supercut link into an inline video player without digging through share menus.'
    },
    {
      title: 'Responsive player',
      description:
        'The generated embed scales cleanly across desktop and mobile layouts.'
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
      title: 'Video clip player',
      description:
        'Embed Supercut video clips and supercuts with native playback controls.'
    },
    {
      title: 'Clean responsive frame',
      description:
        'The player fits any column width and keeps its aspect ratio on every screen.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/streamable', label: 'Streamable' },
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' }
  ],
  faq: [
    {
      question: 'How do I embed a Supercut clip on my website?',
      answer:
        'Paste the Supercut URL into the tool, click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Does the embed include playback controls?',
      answer:
        'Yes. When native embedding is available the player ships with standard play and seek controls.'
    },
    {
      question: 'Is the Supercut player responsive?',
      answer:
        'The embed keeps its aspect ratio and resizes to fit the container it sits in.'
    },
    {
      question: 'What happens if a clip cannot be embedded natively?',
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
