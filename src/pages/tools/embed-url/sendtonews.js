import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'SendtoNews',
  slug: 'sendtonews',
  color: '#D32F2F',
  exampleUrl: 'https://sendtonews.com',
  metaTitle: 'SendtoNews Embed Code Generator — Embed Sports Highlights',
  metaDescription:
    'Free SendtoNews embed code generator. Paste any SendtoNews URL — get a ready-to-paste player for sports highlights and video clips. No signup.',
  keywords: [
    'embed sendtonews',
    'sendtonews embed code',
    'sendtonews embed code generator',
    'embed sendtonews video',
    'sendtonews iframe code',
    'embed sports highlights',
    'sendtonews player embed'
  ],
  heroTitle: 'SendtoNews Embed Code Generator',
  heroSubtitle:
    'Paste any SendtoNews URL — get a ready-to-paste player for sports highlights and video clips.',
  howItWorksHeading: 'How to embed SendtoNews clips',
  howItWorksSteps: [
    {
      title: 'Paste a SendtoNews link',
      description:
        'Copy the URL of any sports highlight or video clip distributed through SendtoNews and drop it in.'
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
  explanationHeading: 'Why use our SendtoNews embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'No need to wire up the distribution snippet by hand — paste a SendtoNews link and get working HTML instantly.'
    },
    {
      title: 'Built for sports clips',
      description:
        'SendtoNews is a video distribution platform known for sports highlights and clips for publishers, and the tool resolves its links for you.'
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
      title: 'Sports highlight player',
      description:
        'Turns a SendtoNews link into an embeddable player so visitors can watch highlights and clips inline.'
    },
    {
      title: 'Responsive output',
      description:
        'The generated embed scales to fit any container so clips look right on any device.'
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
    { href: '/tools/embed-url/streamable', label: 'Streamable' }
  ],
  faq: [
    {
      question: 'How do I embed a SendtoNews clip on my website?',
      answer:
        'Paste the SendtoNews URL into the tool and click Generate, then copy the HTML into your page.'
    },
    {
      question: 'What kind of content can I embed from SendtoNews?',
      answer:
        'SendtoNews distributes sports video, so you can embed highlights and clips made available through the platform.'
    },
    {
      question: 'Will the embedded player be responsive?',
      answer:
        'Yes — the generated code adapts to the width of its container so the player looks right on any device.'
    },
    {
      question: 'What if the SendtoNews clip is restricted?',
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
