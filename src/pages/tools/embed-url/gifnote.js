import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Gifnote',
  slug: 'gifnote',
  color: '#000000',
  exampleUrl: 'https://www.gifnote.com',
  metaTitle: 'Gifnote Embed Code Generator — Embed Music GIFs & Songbytes',
  metaDescription:
    'Free Gifnote embed code generator. Paste a Gifnote URL — get a ready-to-paste embed or preview card for music GIFs and Songbytes. No signup.',
  keywords: [
    'embed gifnote',
    'gifnote embed code',
    'gifnote embed code generator',
    'embed gifnote songbyte',
    'gifnote music gif embed',
    'embed gifnote gif',
    'gifnote iframe code'
  ],
  heroTitle: 'Gifnote Embed Code Generator',
  heroSubtitle:
    'Paste a Gifnote URL — get a ready-to-paste embed or preview card for music GIFs and Songbytes.',
  howItWorksHeading: 'How to embed Gifnote content',
  howItWorksSteps: [
    {
      title: 'Paste a Gifnote link',
      description:
        'Copy a gifnote.com URL for a music GIF or Songbyte — a short licensed music clip paired with a GIF, photo, or video.'
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
  explanationHeading: 'Why use our Gifnote embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the manual markup. Paste a Gifnote link and get working embed HTML.'
    },
    {
      title: 'Music GIFs and Songbytes',
      description:
        'Built for Gifnote content — GIFs paired with short, licensed music clips known as Songbytes.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Gifnote embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Gifnote embed',
      description:
        'Get the real Gifnote embed with the music GIF and its paired Songbyte clip when available.'
    },
    {
      title: 'Responsive output',
      description:
        'The embed adapts to your layout so it stays tidy on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/giphy', label: 'GIPHY' },
    { href: '/tools/embed-url/coub', label: 'Coub' },
    { href: '/tools/embed-url/songlink', label: 'Songlink' }
  ],
  faq: [
    {
      question: 'How do I embed Gifnote content on my website?',
      answer:
        'Paste a Gifnote URL into the tool and click Generate. You will get ready-to-paste embed HTML.'
    },
    {
      question: 'What is a Songbyte?',
      answer:
        'A Songbyte is a short, licensed music clip from Gifnote that can be paired with a GIF, photo, or video.'
    },
    {
      question: 'What if native embedding is not available?',
      answer:
        'The tool falls back to a styled preview card with the available title and image.'
    },
    {
      question: 'Will the embed be responsive?',
      answer:
        'Yes. The generated embed adapts to your layout so it displays well on desktop and mobile.'
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
