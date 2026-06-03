import React from 'react'
import { ProviderSubtool, providerHead } from 'components/pages/embed-url'

const data = {
  name: 'Hihaho',
  slug: 'hihaho',
  color: '#043348',
  exampleUrl:
    'https://player.hihaho.com/embed/59e19b46-9b93-4d37-856b-ee2c085dd88b',
  metaTitle: 'Hihaho Embed Code Generator — Embed Interactive Videos',
  metaDescription:
    'Free Hihaho embed code generator. Paste a Hihaho player URL — get a ready-to-paste iframe for interactive videos with questions, buttons, and links. No signup.',
  keywords: [
    'embed hihaho',
    'hihaho embed code',
    'hihaho embed code generator',
    'embed hihaho interactive video',
    'hihaho iframe code',
    'hihaho player embed',
    'embed interactive video'
  ],
  heroTitle: 'Hihaho Embed Code Generator',
  heroSubtitle:
    'Paste a Hihaho player URL — get a ready-to-paste iframe for interactive videos with questions, buttons, and clickable links.',
  howItWorksHeading: 'How to embed a Hihaho interactive video',
  howItWorksSteps: [
    {
      title: 'Paste a Hihaho link',
      description:
        'Copy a player.hihaho.com embed link or a hihaho.com showcase URL for your interactive video.'
    },
    {
      title: 'Get the embed code',
      description:
        'The tool detects the Hihaho player and generates the right responsive iframe HTML.'
    },
    {
      title: 'Copy & paste',
      description:
        'Click Copy code, then paste the HTML into your blog, docs, CMS, or any HTML editor.'
    }
  ],
  explanationHeading: 'Why use our Hihaho embed code generator',
  reasons: [
    {
      title: 'No manual setup',
      description:
        'Skip digging through the Hihaho dashboard for embed code. Paste a link and get working iframe HTML.'
    },
    {
      title: 'Keeps interactions intact',
      description:
        'The embed preserves Hihaho interactivity — questions, buttons, hotspots, menus, and clickable links.'
    },
    {
      title: 'Customizable preview card',
      description:
        'Switch to Card mode to customize colors, fonts, and layout before copying.'
    },
    {
      title: 'Free, no signup',
      description:
        'Generate up to 50 Hihaho embeds per day. No login, no API key, no watermarks.'
    }
  ],
  features: [
    {
      title: 'Native interactive player',
      description:
        'Get the real Hihaho player so viewers can answer questions, click buttons, and follow links inside the video.'
    },
    {
      title: 'Responsive iframe',
      description:
        'The generated embed scales to fit your layout, from mobile to full-width desktop placement.'
    },
    {
      title: 'Preview card fallback',
      description:
        'A styled preview card with title and image when native embedding is restricted.'
    }
  ],
  relatedLinks: [
    { href: '/tools/embed-url/vimeo', label: 'Vimeo' },
    { href: '/tools/embed-url/youtube', label: 'YouTube' },
    { href: '/tools/embed-url/vidyard', label: 'Vidyard' }
  ],
  faq: [
    {
      question: 'How do I embed a Hihaho interactive video on my website?',
      answer:
        'Paste your Hihaho player URL into the tool and click Generate. You will get a ready-to-paste responsive iframe.'
    },
    {
      question: 'Do the interactive elements still work after embedding?',
      answer:
        'Yes. The embedded Hihaho player keeps its interactions — questions, buttons, hotspots, menus, and clickable links all stay functional.'
    },
    {
      question: 'What if the Hihaho video is private or unlisted?',
      answer:
        'If native embedding is restricted, the tool falls back to a styled preview card with the available title and image.'
    },
    {
      question: 'Is the embed responsive on mobile?',
      answer:
        'Yes. The generated iframe scales to its container so the interactive video plays full-width on phones, tablets, and desktops.'
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
