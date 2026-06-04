import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Wecandeo',
  slug: 'wecandeo',
  color: '#1E88E5',
  exampleUrl: 'https://wecandeo.com',
  metaTitle: 'Wecandeo Embed Code Generator — Embed Hosted Video',
  metaDescription:
    'Free Wecandeo embed code generator. Paste any Wecandeo URL — get a ready-to-paste player for hosted online video. No signup.',
  keywords: [
    'embed wecandeo',
    'wecandeo embed code',
    'wecandeo embed code generator',
    'embed wecandeo video',
    'wecandeo iframe code',
    'wecandeo video player embed',
    'embed hosted video'
  ],
  heroTitle: 'Wecandeo Embed Code Generator',
  heroSubtitle:
    'Paste any Wecandeo URL — get a ready-to-paste player for hosted online video.',
  howItWorksHeading: 'How to embed Wecandeo video',
  howItWorksSteps: [
    {
      title: 'Paste a Wecandeo link',
      description:
        'Copy the URL of any Wecandeo hosted video and drop it into the field.'
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
  explanationHeading: 'Why use our Wecandeo embed code generator',
  reasons: [
    {
      title: 'Made for hosted video',
      description:
        'Turn a Wecandeo video link into an embeddable player you can drop onto landing pages and product docs.'
    },
    {
      title: 'No manual setup',
      description:
        'Skip the share-menu steps. Paste a Wecandeo link and get working embed HTML in one go.'
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
      title: 'Hosted video player',
      description:
        'Embed the Wecandeo player so visitors can watch your hosted video inline on any page.'
    },
    {
      title: 'Delivery-ready output',
      description:
        'Generates clean HTML that fits websites, landing pages, and content management systems.'
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
      question: 'How do I embed a Wecandeo video on my site?',
      answer:
        'Paste the Wecandeo URL into the tool and click Generate. You will get a ready-to-paste player snippet.'
    },
    {
      question: 'Does the embed stream the hosted video directly?',
      answer:
        'Yes. The embed loads the live Wecandeo player so the video plays right inside your page.'
    },
    {
      question: 'Where can I paste the Wecandeo embed?',
      answer:
        'Anywhere that accepts HTML — blog posts, landing pages, documentation, or your CMS.'
    },
    {
      question: 'What if the Wecandeo video is private?',
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
