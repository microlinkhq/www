import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'NDLA',
  slug: 'ndla',
  color: '#1B6CA8',
  exampleUrl: 'https://ndla.no',
  metaTitle: 'NDLA Embed Code Generator — Embed Learning Resources & Videos',
  metaDescription:
    'Free NDLA embed code generator. Paste any ndla.no URL — get a ready-to-paste embed for learning resources, articles, and videos. No signup.',
  keywords: [
    'embed ndla',
    'ndla embed code',
    'ndla embed code generator',
    'embed ndla article',
    'embed ndla video',
    'ndla iframe code',
    'embed ndla learning resource'
  ],
  heroTitle: 'NDLA Embed Code Generator',
  heroSubtitle:
    'Paste any NDLA URL — get a ready-to-paste embed for learning resources, articles, and videos from the Norwegian Digital Learning Arena.',
  howItWorksHeading: 'How to embed NDLA content',
  howItWorksSteps: [
    {
      title: 'Paste an NDLA link',
      description:
        'Copy the URL of any ndla.no learning resource, article, or video and paste it into the tool.'
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
  explanationHeading: 'Why use our NDLA embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through page source for embed snippets — paste an NDLA link and get working HTML instantly.'
    },
    {
      title: 'Built for open educational resources',
      description:
        'Designed for NDLA free learning material, so articles, videos, and interactive resources render cleanly inside your page.'
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
      title: 'Learning resource embeds',
      description:
        'Embed full NDLA learning resources and articles so students can read and interact without leaving your site.'
    },
    {
      title: 'Video support',
      description:
        'Drop NDLA videos straight into lessons, course pages, or LMS modules with a responsive player.'
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
    { href: '/tools/embed-url/codehs', label: 'CodeHS' }
  ],
  faq: [
    {
      question: 'How do I embed an NDLA learning resource on my website?',
      answer:
        'Copy the ndla.no resource URL, paste it into the tool, then copy the generated HTML into your page.'
    },
    {
      question: 'Can I embed NDLA videos in my lessons?',
      answer:
        'Yes. Paste the video URL and the tool generates a responsive player you can drop into any lesson or LMS page.'
    },
    {
      question: 'Does it work with NDLA articles?',
      answer:
        'Yes. NDLA articles are detected automatically and embedded with their title, text, and media.'
    },
    {
      question: 'What if an NDLA resource cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card with the title, image, and a link to the original resource.'
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
