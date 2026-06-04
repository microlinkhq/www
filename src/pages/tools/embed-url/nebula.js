import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Nebula',
  slug: 'nebula',
  color: '#283655',
  exampleUrl: 'https://nebula.tv',
  metaTitle: 'Nebula Embed Code Generator — Embed Videos & Series',
  metaDescription:
    'Free Nebula embed code generator. Paste any nebula.tv URL — get a ready-to-paste player for videos and series from independent creators. No signup.',
  keywords: [
    'embed nebula',
    'nebula embed code',
    'nebula embed code generator',
    'embed nebula video',
    'embed nebula series',
    'nebula iframe code',
    'nebula player embed'
  ],
  heroTitle: 'Nebula Embed Code Generator',
  heroSubtitle:
    'Paste any Nebula URL — get a ready-to-paste player for videos and series from independent educational creators.',
  howItWorksHeading: 'How to embed Nebula content',
  howItWorksSteps: [
    {
      title: 'Paste a Nebula link',
      description:
        'Copy the URL of any nebula.tv video or series and paste it into the tool.'
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
  explanationHeading: 'Why use our Nebula embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Paste a Nebula link and get working player HTML — no hunting for share or embed buttons.'
    },
    {
      title: 'Built for creator video',
      description:
        'Tuned for Nebula content from independent creators, so videos and series render reliably inside your page.'
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
      title: 'Video player embeds',
      description:
        'Embed individual Nebula videos with a responsive player that fits any layout.'
    },
    {
      title: 'Series support',
      description:
        'Link to a Nebula series and surface it as a clean, shareable embed for your audience.'
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
    { href: '/tools/embed-url/vidyard', label: 'Vidyard' }
  ],
  faq: [
    {
      question: 'How do I embed a Nebula video on my website?',
      answer:
        'Copy the nebula.tv video URL, paste it into the tool, then copy the generated HTML into your page.'
    },
    {
      question: 'Can I embed a Nebula series?',
      answer:
        'Yes. Paste a series URL and the tool generates an embed that links viewers to the full series.'
    },
    {
      question: 'Will the embedded player be responsive?',
      answer:
        'Yes. The generated player scales to fit its container so it looks right on desktop and mobile.'
    },
    {
      question: 'What if a Nebula video requires a subscription?',
      answer:
        'When native playback is restricted, the tool falls back to a styled preview card linking to the original video.'
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
