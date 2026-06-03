import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Dalexni',
  slug: 'dalexni',
  color: '#1A1A1A',
  exampleUrl: 'https://dalexni.com/i/sample',
  metaTitle: 'Dalexni Embed Code Generator — Embed Images & Videos',
  metaDescription:
    'Free Dalexni embed code generator. Paste a Dalexni URL — get a ready-to-paste embed for hosted images and videos, or a preview card. No signup.',
  keywords: [
    'embed dalexni',
    'dalexni embed code',
    'dalexni embed code generator',
    'embed dalexni image',
    'embed dalexni video',
    'dalexni iframe code',
    'dalexni image embed'
  ],
  heroTitle: 'Dalexni Embed Code Generator',
  heroSubtitle:
    'Paste a Dalexni URL — get a ready-to-paste embed for hosted images and videos.',
  howItWorksHeading: 'How to embed Dalexni content',
  howItWorksSteps: [
    {
      title: 'Paste a Dalexni link',
      description:
        'Copy a dalexni.com URL for a hosted image or video (for example, a dalexni.com/i/ link).'
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
  explanationHeading: 'Why use our Dalexni embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual markup. Paste a Dalexni link and get working embed HTML.'
    },
    {
      title: 'Images and videos',
      description:
        'Works with the images and videos hosted on Dalexni — paste the link and the tool handles the rest.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Dalexni embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Dalexni embed',
      description:
        'Get the real Dalexni embed for a hosted image or video when one is available.'
    },
    {
      title: 'Responsive output',
      description:
        'The embed adapts to your page width so media stays readable on any screen.'
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
    { href: '/tools/embed-url/twitter-or-x', label: 'Twitter / X' }
  ],
  faq: [
    {
      question: 'How do I embed Dalexni content on my website?',
      answer:
        'Paste a Dalexni URL into the tool and click Generate. You will get a ready-to-paste embed for the hosted image or video.'
    },
    {
      question: 'What can I embed from Dalexni?',
      answer:
        'Dalexni hosts images and videos, so you can embed the media behind a dalexni.com link.'
    },
    {
      question: 'What if the Dalexni content is private or unavailable?',
      answer:
        'The tool falls back to a styled preview card built from the available metadata, such as the title and image.'
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
