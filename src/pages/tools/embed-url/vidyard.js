import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Vidyard',
  slug: 'vidyard',
  color: '#3BCB85',
  exampleUrl: 'https://share.vidyard.com/watch/MWjYNu7koZ6SMhxcZqAM2s',
  metaTitle: 'Vidyard Embed Code Generator — Embed Sales & Marketing Videos',
  metaDescription:
    'Free Vidyard embed code generator. Paste any Vidyard share link — get a ready-to-paste player for sales, marketing, and webinar videos. No signup.',
  keywords: [
    'embed vidyard',
    'vidyard embed code',
    'vidyard embed code generator',
    'embed vidyard video',
    'vidyard iframe code',
    'vidyard player embed',
    'embed vidyard share link'
  ],
  heroTitle: 'Vidyard Embed Code Generator',
  heroSubtitle:
    'Paste any Vidyard share link — get a ready-to-paste player for your sales, marketing, and webinar videos.',
  howItWorksHeading: 'How to embed a Vidyard video',
  howItWorksSteps: [
    {
      title: 'Paste a Vidyard link',
      description:
        'Copy a share.vidyard.com/watch or play.vidyard.com video link from your Vidyard library.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Vidyard video and generates the right embed HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Vidyard embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through Vidyard share settings. Paste any video link and get working embed HTML.'
    },
    {
      title: 'Built for video selling',
      description:
        'Embed sales prospecting videos, product demos, marketing clips, and recorded webinars anywhere you publish.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Vidyard embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native Vidyard player',
      description:
        'Get the real Vidyard player with playback controls and the video thumbnail.'
    },
    {
      title: 'Responsive sizing',
      description:
        'The embed adapts to your layout so the video looks right on desktop and mobile.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/wistia', label: 'Wistia' },
    { href: '/tools/embed-url/loom', label: 'Loom' },
    { href: '/tools/embed-url/brightcove', label: 'Brightcove' }
  ],
  faq: [
    {
      question: 'How do I embed a Vidyard video on my website?',
      answer:
        'Paste any Vidyard share link into the tool and click Generate. You will get a ready-to-paste player embed.'
    },
    {
      question: 'What Vidyard links work?',
      answer:
        'Public share.vidyard.com/watch links and play.vidyard.com video links work. The tool detects the video and builds the embed.'
    },
    {
      question: 'Can I embed a private or unlisted Vidyard video?',
      answer:
        'The embed only works for videos your viewers can access. Private videos that require a login or gate will not play for everyone.'
    },
    {
      question: 'What if the video cannot be embedded?',
      answer:
        'The tool falls back to a styled preview card with the title and thumbnail that links to the original video.'
    },
    {
      question: 'Is this free?',
      answer: 'Yes — 50 requests per day, no login, no credit card.'
    }
  ]
}

export const Head = () => providerHead(data)

const VidyardPage = () => <ProviderSubtool {...data} />

export default VidyardPage
