import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Screencast.com',
  slug: 'screencast-com',
  color: '#1D9BD7',
  exampleUrl: 'https://www.screencast.com',
  metaTitle: 'Screencast.com Embed Code Generator — Embed Recordings & Images',
  metaDescription:
    'Free Screencast.com embed code generator. Paste any Screencast.com URL — get a ready-to-paste embed for screen recordings, videos, and images. No signup.',
  keywords: [
    'embed screencast.com',
    'screencast.com embed code',
    'screencast.com embed code generator',
    'embed screencast video',
    'screencast.com iframe code',
    'embed snagit recording',
    'embed camtasia video'
  ],
  heroTitle: 'Screencast.com Embed Code Generator',
  heroSubtitle:
    'Paste any Screencast.com URL — get a ready-to-paste embed for screen recordings, videos, and images.',
  howItWorksHeading: 'How to embed Screencast.com content',
  howItWorksSteps: [
    {
      title: 'Paste a Screencast.com link',
      description:
        'Copy the URL of any recording, video, or image hosted on Screencast.com and drop it in.'
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
  explanationHeading: 'Why use our Screencast.com embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'No need to hunt for share or embed options inside Screencast.com — paste a link and get working HTML instantly.'
    },
    {
      title: 'Made for Snagit and Camtasia',
      description:
        'Screencast.com hosts recordings and images created with TechSmith Snagit and Camtasia, and the tool resolves their URLs for you.'
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
      title: 'Recordings and images',
      description:
        'Handles screen recordings, videos, and images shared through Screencast.com in one tool.'
    },
    {
      title: 'Responsive output',
      description:
        'The generated embed scales to fit any container so your content looks right at any width.'
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
      question: 'How do I embed Screencast.com content on my website?',
      answer:
        'Paste the Screencast.com URL into the tool and click Generate, then copy the HTML into your page.'
    },
    {
      question: 'Can I embed both videos and images from Screencast.com?',
      answer:
        'Yes — the tool supports screen recordings, videos, and images hosted on Screencast.com.'
    },
    {
      question: 'Does this work with Snagit and Camtasia uploads?',
      answer:
        'Yes — Screencast.com is the TechSmith service for sharing Snagit and Camtasia content, and the tool handles those links.'
    },
    {
      question: 'What if the Screencast.com item is private?',
      answer:
        'The tool falls back to a styled preview card with the available metadata so your layout stays intact.'
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
