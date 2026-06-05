import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Mediastream',
  slug: 'mediastream',
  color: '#00B5E2',
  exampleUrl: 'https://mediastream.com',
  metaTitle: 'Mediastream Embed Code Generator — Embed Live & On-Demand Video',
  metaDescription:
    'Free Mediastream embed code generator. Paste any Mediastream URL — get a ready-to-paste player for live and on-demand video. No signup.',
  keywords: [
    'embed mediastream',
    'mediastream embed code',
    'mediastream embed code generator',
    'embed mediastream video',
    'mediastream live stream embed',
    'mediastream iframe code',
    'mediastream player embed'
  ],
  heroTitle: 'Mediastream Embed Code Generator',
  heroSubtitle:
    'Paste any Mediastream URL — get a ready-to-paste player for live and on-demand video.',
  howItWorksHeading: 'How to embed Mediastream video',
  howItWorksSteps: [
    {
      title: 'Paste a Mediastream link',
      description:
        'Copy the URL of any Mediastream live stream or on-demand video.'
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
  explanationHeading: 'Why use our Mediastream embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip the player config by hand. Paste any Mediastream link and get working embed HTML instantly.'
    },
    {
      title: 'Live and on-demand',
      description:
        'Works for both Mediastream live streams and on-demand video, generating the right player either way.'
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
      title: 'Inline OTT player',
      description:
        'Embed the native Mediastream player with playback controls directly inside your content.'
    },
    {
      title: 'Live stream support',
      description:
        'Drop in a live broadcast and viewers can watch the stream in place as it airs.'
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
    { href: '/tools/embed-url/ustream', label: 'Ustream' }
  ],
  faq: [
    {
      question: 'How do I embed Mediastream video on my website?',
      answer:
        'Paste the Mediastream URL into the tool and click Generate, then copy the embed HTML into your site.'
    },
    {
      question: 'Can I embed a Mediastream live stream?',
      answer:
        'Yes. The tool generates a player for both live streams and on-demand video so viewers can watch in place.'
    },
    {
      question: 'Do I need a Mediastream account to embed video?',
      answer:
        'No account is required. A public Mediastream URL is enough to generate the embed code.'
    },
    {
      question: 'What if the Mediastream content is private?',
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
