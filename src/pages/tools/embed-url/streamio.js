import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Streamio',
  slug: 'streamio',
  color: '#1E88E5',
  exampleUrl: 'https://streamio.com',
  metaTitle: 'Streamio Embed Code Generator — Embed Hosted Video',
  metaDescription:
    'Free Streamio embed code generator. Paste any Streamio URL — get a ready-to-paste video player for hosted video. No signup.',
  keywords: [
    'embed streamio',
    'streamio embed code',
    'streamio embed code generator',
    'embed streamio video',
    'streamio iframe code',
    'streamio video player embed',
    'streamio player embed'
  ],
  heroTitle: 'Streamio Embed Code Generator',
  heroSubtitle:
    'Paste any Streamio URL — get a ready-to-paste player for hosted video.',
  howItWorksHeading: 'How to embed Streamio video',
  howItWorksSteps: [
    {
      title: 'Paste a Streamio link',
      description: 'Copy the URL of any video hosted on Streamio.'
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
  explanationHeading: 'Why use our Streamio embed code generator',
  reasons: [
    {
      title: 'Drop-in video player',
      description:
        'Embed Streamio-hosted video with a working player — no need to dig through platform settings for markup.'
    },
    {
      title: 'Reliable delivery',
      description:
        'Built on Streamio video hosting, so playback stays smooth across blogs, landing pages, and product sites.'
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
      title: 'Native video embeds',
      description:
        'Render the real Streamio player with full playback controls inside your page.'
    },
    {
      title: 'Responsive sizing',
      description:
        'The player scales to fit articles, docs, and pages across desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/brightcove', label: 'Brightcove' },
    { href: '/tools/embed-url/vidyard', label: 'Vidyard' },
    { href: '/tools/embed-url/wistia', label: 'Wistia' }
  ],
  faq: [
    {
      question: 'How do I embed a Streamio video on my website?',
      answer:
        'Paste the Streamio video URL into the tool and click Generate to get ready-to-paste embed HTML.'
    },
    {
      question: 'Does the embed include playback controls?',
      answer:
        'Yes — native embeds render the Streamio player with standard playback controls.'
    },
    {
      question: 'What if the Streamio video is private?',
      answer:
        'Private or restricted videos fall back to a styled preview card built from the available metadata.'
    },
    {
      question: 'Where can I paste the Streamio embed code?',
      answer:
        'Anywhere that accepts HTML — blog posts, landing pages, docs, and CMS pages.'
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
