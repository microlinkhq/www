import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Synthesia',
  slug: 'synthesia',
  color: '#3E57DA',
  exampleUrl: 'https://share.synthesia.io',
  metaTitle: 'Synthesia Embed Code Generator — Embed AI Avatar Videos',
  metaDescription:
    'Free Synthesia embed code generator. Paste a Synthesia share link — get a ready-to-paste embed for your AI avatar video, or a styled preview card. No signup.',
  keywords: [
    'embed synthesia',
    'synthesia embed code',
    'synthesia embed code generator',
    'embed synthesia video',
    'synthesia video embed',
    'embed ai avatar video',
    'synthesia share link embed'
  ],
  heroTitle: 'Synthesia Embed Code Generator',
  heroSubtitle:
    'Paste a Synthesia share link — get a ready-to-paste embed for your AI avatar video.',
  howItWorksHeading: 'How to embed a Synthesia video',
  howItWorksSteps: [
    {
      title: 'Paste a Synthesia link',
      description:
        'Copy your video share link from share.synthesia.io and paste it in.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool reads the share link and generates the right embed HTML for your AI avatar video.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Synthesia embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Synthesia share dialog. Paste the link and get working embed HTML.'
    },
    {
      title: 'Built for AI avatar videos',
      description:
        'Designed around Synthesia share links so your generated video plays inline wherever you paste it.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Synthesia embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native video player',
      description:
        'Get the real Synthesia player so your AI avatar video plays inline with full controls.'
    },
    {
      title: 'Responsive embed',
      description:
        'The video embed scales to fit your layout, from narrow sidebars to full-width articles.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/elevenlabs', label: 'ElevenLabs' },
    { href: '/tools/embed-url/typecast', label: 'Typecast' },
    { href: '/tools/embed-url/loom', label: 'Loom' }
  ],
  faq: [
    {
      question: 'How do I embed a Synthesia video on my website?',
      answer:
        'Open your video in Synthesia, create a share link, then paste that share.synthesia.io URL into the tool and click Generate to get ready-to-paste embed HTML.'
    },
    {
      question: 'What kind of videos can I embed?',
      answer:
        'Synthesia produces AI avatar videos generated from a script, and the tool embeds those videos using their public share links.'
    },
    {
      question: 'Will the embedded video be responsive?',
      answer:
        'Yes. The generated embed scales to the width of its container so the video looks right on desktop and mobile.'
    },
    {
      question: 'What if the Synthesia video is private or password protected?',
      answer:
        'Private, SSO-restricted, or password-protected videos cannot be embedded publicly, so the tool falls back to a styled preview card with the available metadata.'
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
