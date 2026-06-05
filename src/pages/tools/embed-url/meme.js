import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Meme',
  slug: 'meme',
  color: '#FFCC00',
  exampleUrl: 'https://meme.com',
  metaTitle: 'Meme Embed Code Generator — Embed Memes & Images',
  metaDescription:
    'Free Meme embed code generator. Paste any meme URL — get a ready-to-paste embed for memes and images. No signup.',
  keywords: [
    'embed meme',
    'meme embed code',
    'meme embed code generator',
    'embed meme image',
    'meme iframe code',
    'embed funny image',
    'share meme embed'
  ],
  heroTitle: 'Meme Embed Code Generator',
  heroSubtitle:
    'Paste any meme URL — get a ready-to-paste embed for memes and images you can drop into any page.',
  howItWorksHeading: 'How to embed memes and images',
  howItWorksSteps: [
    {
      title: 'Paste a meme link',
      description: 'Copy the URL of the meme or image you want to share.'
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
  explanationHeading: 'Why use our Meme embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste any meme link and get working embed HTML without touching markup yourself.'
    },
    {
      title: 'Made for memes and images',
      description:
        'Optimized for sharing memes and images so they render crisp and centered on your page.'
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
      title: 'Memes and images',
      description:
        'Embed memes and images so they display at full quality inside your content.'
    },
    {
      title: 'Lightweight embed',
      description:
        'The generated snippet is clean HTML that loads fast and scales to your layout.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/smugmug', label: 'SmugMug' },
    { href: '/tools/embed-url/behance', label: 'Behance' },
    { href: '/tools/embed-url/abraia', label: 'Abraia' }
  ],
  faq: [
    {
      question: 'How do I embed a meme on my website?',
      answer:
        'Paste the meme URL into the tool, click Generate, and copy the embed HTML into your page.'
    },
    {
      question: 'Can I embed any image, not just memes?',
      answer:
        'Yes. The generator works with memes and images, so any supported image URL will render.'
    },
    {
      question: 'Will the meme stay sharp on high-resolution screens?',
      answer:
        'The embed serves the original image so it stays crisp on retina and high-resolution displays.'
    },
    {
      question: 'What if the image cannot be embedded directly?',
      answer:
        'The tool falls back to a styled preview card with the available metadata.'
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
